import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/(\w):/, '$1:');

const templates = [
  {
    name: 'citizen-portal',
    required: [
      'tds-skip-link',
      'tds-search',
      'tds-card',
      'tds-template-footer',
      '<main',
      'lang="fr"',
    ],
  },
  {
    name: 'admin-dashboard',
    required: [
      'tds-skip-link',
      'tds-template-dashboard',
      'tds-table',
      'tds-card',
      'tds-template-footer',
      '<main',
      'lang="fr"',
    ],
  },
];

let failures = 0;
for (const template of templates) {
  const file = join(ROOT, template.name, 'index.html');
  if (!existsSync(file)) {
    console.error(`[templates] Fichier manquant : ${file}`);
    failures++;
    continue;
  }
  const html = readFileSync(file, 'utf8');
  for (const marker of template.required) {
    if (!html.includes(marker)) {
      console.error(`[templates] ${template.name}: marqueur absent — ${marker}`);
      failures++;
    }
  }
}

if (failures > 0) process.exit(1);
console.log(`[templates] ${templates.length} templates valides.`);
