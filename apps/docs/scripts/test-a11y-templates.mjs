#!/usr/bin/env node
/**
 * Accessibilité automatisée (axe-core) des modèles `templates/*` chargés en
 * `file://` — pas de serveur requis. Les modèles lient
 * `../../packages/core/src/tdgs.css` : `@tdgs/core` n'a pas besoin d'être buildé.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const here = dirname(fileURLToPath(import.meta.url));
const TEMPLATES = join(here, '..', '..', '..', 'templates');
const AXE_SOURCE = readFileSync(
  join(here, '..', 'node_modules', 'axe-core', 'axe.min.js'),
  'utf-8'
);
const IS_CI = process.env.CI === 'true' || process.env.CI === '1';

const dirs = readdirSync(TEMPLATES, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== 'shared')
  .map((e) => e.name)
  .filter((name) => existsSync(join(TEMPLATES, name, 'index.html')));

let browser;
let total = 0;
try {
  browser = await puppeteer.launch({
    headless: true,
    ...(IS_CI
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'] }
      : { args: ['--allow-file-access-from-files'] }),
  });

  for (const name of dirs) {
    const url = pathToFileURL(join(TEMPLATES, name, 'index.html')).href;
    const page = await browser.newPage();
    try {
      // Les modèles n'ont pas de bascule de thème : on teste le rendu clair
      // (préférence système par défaut de la majorité des postes).
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('main', { timeout: 15_000 });
      await page.evaluate(AXE_SOURCE);
      const { violations } = await page.evaluate(async () => {
        // @ts-ignore
        return axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        });
      });
      if (violations.length) {
        total += violations.length;
        process.stderr.write(`✖ ${name} — ${violations.length}\n`);
        for (const v of violations) {
          process.stderr.write(`    ${v.id} (${v.impact}) — ${v.help}\n`);
          for (const node of v.nodes.slice(0, 4)) {
            process.stderr.write(`      ${node.target.join(' ')}\n`);
          }
        }
      } else {
        process.stdout.write(`✓ ${name}\n`);
      }
    } finally {
      await page.close();
    }
  }
} catch (error) {
  process.stderr.write(`[test-a11y-templates] Échec : ${error?.stack ?? error}\n`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}

if (total > 0) {
  process.stderr.write(`\n[test-a11y-templates] ${total} violation(s).\n`);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  process.stdout.write(`\n[test-a11y-templates] 0 violation sur ${dirs.length} modèles.\n`);
}
