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
const AXE_SOURCE = readFileSync(join(__dirname, '..', 'node_modules', 'axe-core', 'axe.min.js'), 'utf-8');
const URL = process.argv[2] ?? 'http://localhost:4322/playground/';

const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.evaluate(AXE_SOURCE);

  const results = await page.evaluate(async () => {
    // @ts-ignore — axe injecté globalement par la ligne évaluée ci-dessus
    return await axe.run();
  });

  if (results.violations.length > 0) {
    process.stderr.write(`[test-a11y] ${results.violations.length} violation(s) trouvée(s) sur ${URL} :\n\n`);
    for (const violation of results.violations) {
      process.stderr.write(`  ✖ ${violation.id} (${violation.impact}) — ${violation.help}\n`);
      for (const node of violation.nodes) {
        process.stderr.write(`      ${node.target.join(' ')}\n`);
      }
    }
    process.exit(1);
  }

  process.stdout.write(`[test-a11y] 0 violation sur ${URL} (${results.passes.length} règles passées).\n`);
} finally {
  await browser.close();
}
