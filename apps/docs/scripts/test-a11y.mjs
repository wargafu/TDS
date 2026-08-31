#!/usr/bin/env node
/**
 * Vérification d'accessibilité automatisée (axe-core) contre le terrain de
 * jeu des composants. Utilise Puppeteer (Chromium embarqué) plutôt qu'un
 * pilotage via le Chrome système + chromedriver, pour éviter toute
 * dépendance à une version de navigateur installée localement — reproductible
 * à l'identique en local et en CI.
 *
 * Prérequis : le serveur de preview doit tourner (voir script npm
 * "test:a11y" qui orchestre démarrage + test via start-server-and-test).
 */

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const AXE_SOURCE = readFileSync(
  join(__dirname, '..', 'node_modules', 'axe-core', 'axe.min.js'),
  'utf-8'
);
const URL = process.argv[2] ?? 'http://localhost:4322/playground/';
const IS_CI = process.env.CI === 'true' || process.env.CI === '1';

let browser;
try {
  browser = await puppeteer.launch({
    headless: true,
    timeout: 30_000,
    protocolTimeout: 30_000,
    waitForInitialPage: false,
    ...(IS_CI
      ? {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
          ],
          dumpio: true,
        }
      : {}),
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(30_000);
  page.setDefaultTimeout(30_000);
  // `networkidle0` peut ne jamais être atteint lorsqu’un serveur conserve une
  // connexion ouverte. Le contrôle axe porte sur le DOM rendu, donc
  // `domcontentloaded` est plus déterministe en local comme en CI.
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('main', { timeout: 30_000 });
  await page.evaluate(AXE_SOURCE);

  const results = await page.evaluate(async () => {
    // @ts-ignore — axe injecté globalement par la ligne évaluée ci-dessus
    return await axe.run();
  });

  if (results.violations.length > 0) {
    process.stderr.write(
      `[test-a11y] ${results.violations.length} violation(s) trouvée(s) sur ${URL} :\n\n`
    );
    for (const violation of results.violations) {
      process.stderr.write(`  ✖ ${violation.id} (${violation.impact}) — ${violation.help}\n`);
      for (const node of violation.nodes) {
        process.stderr.write(`      ${node.target.join(' ')}\n`);
      }
    }
    process.exitCode = 1;
  } else {
    process.stdout.write(
      `[test-a11y] 0 violation sur ${URL} (${results.passes.length} règles passées).\n`
    );
  }
} catch (error) {
  const details = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`[test-a11y] Échec du contrôle sur ${URL} :\n${details}\n`);
  process.exitCode = 1;
} finally {
  if (browser) {
    await browser.close();
  }
}
