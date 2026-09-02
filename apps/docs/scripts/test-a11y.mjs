#!/usr/bin/env node
/**
 * Accessibilité automatisée (axe-core + Puppeteer) sur **toutes** les pages
 * générées du site (dist/**\/index.html + racine), en clair ET en sombre.
 *
 * Usage : node scripts/test-a11y.mjs http://127.0.0.1:4322
 * (le serveur de preview doit servir dist/). Chromium fourni par Puppeteer.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const here = dirname(fileURLToPath(import.meta.url));
const DIST = join(here, '..', 'dist');
const AXE_SOURCE = readFileSync(
  join(here, '..', 'node_modules', 'axe-core', 'axe.min.js'),
  'utf-8'
);

const BASE = (process.argv[2] ?? 'http://127.0.0.1:4322').replace(/\/$/, '');
const IS_CI = process.env.CI === 'true' || process.env.CI === '1';
// Échantillon en sombre : évite de doubler la durée sur 90 pages.
const DARK_SAMPLE = new Set([
  '/',
  '/components/button/',
  '/components/modal/',
  '/components/table/',
  '/fondamentaux/colors/',
  '/modeles/login-form/',
  '/playground/',
]);

function routes() {
  if (!existsSync(DIST)) {
    process.stderr.write('[test-a11y] dist/ absent — lancez `pnpm --filter tds-docs build`.\n');
    process.exit(1);
  }
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'pagefind' || entry.name === '_astro') continue;
        walk(full);
      } else if (entry.name === 'index.html') {
        const rel = relative(DIST, dir).replaceAll('\\', '/');
        out.push(rel ? `/${rel}/` : '/');
      }
    }
  };
  walk(DIST);
  return out.sort();
}

async function runAxe(page, url, scheme) {
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('main, body', { timeout: 15_000 });
  await page.evaluate(AXE_SOURCE);
  return page.evaluate(async () => {
    // @ts-ignore
    return axe.run(document, {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
    });
  });
}

const list = routes();
process.stdout.write(`[test-a11y] ${list.length} routes (clair) + ${DARK_SAMPLE.size} en sombre.\n\n`);

let browser;
let total = 0;
try {
  browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 40_000,
    ...(IS_CI
      ? { args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'] }
      : {}),
  });

  for (const route of list) {
    const schemes = DARK_SAMPLE.has(route) ? ['light', 'dark'] : ['light'];
    for (const scheme of schemes) {
      const page = await browser.newPage();
      try {
        const { violations } = await runAxe(page, `${BASE}${route}`, scheme);
        if (violations.length) {
          total += violations.length;
          process.stderr.write(`✖ ${route} [${scheme}] — ${violations.length}\n`);
          for (const v of violations) {
            process.stderr.write(`    ${v.id} (${v.impact}) — ${v.help}\n`);
            for (const node of v.nodes.slice(0, 3)) {
              process.stderr.write(`      ${node.target.join(' ')}\n`);
            }
          }
        } else {
          process.stdout.write(`✓ ${route}${scheme === 'dark' ? ' [dark]' : ''}\n`);
        }
      } finally {
        await page.close();
      }
    }
  }
} catch (error) {
  process.stderr.write(`[test-a11y] Échec : ${error?.stack ?? error}\n`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
}

if (total > 0) {
  process.stderr.write(`\n[test-a11y] ${total} violation(s) au total.\n`);
  process.exitCode = 1;
} else if (process.exitCode !== 1) {
  process.stdout.write(`\n[test-a11y] 0 violation.\n`);
}
