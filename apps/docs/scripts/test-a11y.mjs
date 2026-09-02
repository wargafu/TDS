#!/usr/bin/env node
/**
 * Vérification d'accessibilité automatisée (axe-core + Puppeteer) sur un
 * échantillon de routes représentatives du site : accueil, fondamentaux,
 * fiche composant, catalogue, terrain de jeu, page « à propos » et 404.
 *
 * Usage : node scripts/test-a11y.mjs http://127.0.0.1:4322
 * Chromium est fourni par Puppeteer — reproductible en local et en CI.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const here = dirname(fileURLToPath(import.meta.url));
const AXE_SOURCE = readFileSync(
  join(here, '..', 'node_modules', 'axe-core', 'axe.min.js'),
  'utf-8'
);

const BASE = (process.argv[2] ?? 'http://127.0.0.1:4322').replace(/\/$/, '');
const IS_CI = process.env.CI === 'true' || process.env.CI === '1';

const ROUTES = [
  '/',
  '/premiers-pas/introduction/',
  '/fondamentaux/colors/',
  '/fondamentaux/rtl/',
  '/components/',
  '/components/button/',
  '/components/modal/',
  '/integrations/react/',
  '/modeles/login-form/',
  '/about/statut/',
  '/playground/',
  '/404/',
];

let browser;
let totalViolations = 0;

try {
  browser = await puppeteer.launch({
    headless: true,
    timeout: 30_000,
    protocolTimeout: 30_000,
    waitForInitialPage: false,
    ...(IS_CI
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] }
      : {}),
  });

  for (const route of ROUTES) {
    const url = `${BASE}${route}`;
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(30_000);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('main, body', { timeout: 15_000 });
      await page.evaluate(AXE_SOURCE);
      const results = await page.evaluate(async () => {
        // @ts-ignore
        return await axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        });
      });
      if (results.violations.length > 0) {
        totalViolations += results.violations.length;
        process.stderr.write(`\n✖ ${route} — ${results.violations.length} violation(s)\n`);
        for (const v of results.violations) {
          process.stderr.write(`    ${v.id} (${v.impact}) — ${v.help}\n`);
          for (const node of v.nodes.slice(0, 4)) {
            process.stderr.write(`      ${node.target.join(' ')}\n`);
          }
        }
      } else {
        process.stdout.write(`✓ ${route} (${results.passes.length} règles passées)\n`);
      }
    } finally {
      await page.close();
    }
  }
} catch (error) {
  const details = error instanceof Error ? (error.stack ?? error.message) : String(error);
  process.stderr.write(`[test-a11y] Échec : ${details}\n`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}

if (totalViolations > 0) {
  process.stderr.write(`\n[test-a11y] ${totalViolations} violation(s) au total.\n`);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  process.stdout.write(`\n[test-a11y] 0 violation sur ${ROUTES.length} routes.\n`);
}
