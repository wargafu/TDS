#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const requiredFiles = ['index.html', 'site.css'];
const requiredMarkers = ['TDGS', 'tds-button', 'tds-input', 'tds-checkbox', 'tds-switch'];
let errors = 0;

for (const file of requiredFiles) {
  if (!existsSync(join(ROOT, file))) {
    console.error(`[tdgs-site] Fichier requis absent : ${file}`);
    errors++;
  }
}

if (errors === 0) {
  const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
  for (const marker of requiredMarkers) {
    if (!html.includes(marker)) {
      console.error(`[tdgs-site] Marqueur requis absent : ${marker}`);
      errors++;
    }
  }
}

if (errors > 0) process.exit(1);
console.log('[tdgs-site] Site statique valide.');
