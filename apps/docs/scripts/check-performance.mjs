import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const budgets = [
  { label: 'CSS', extensions: ['.css'], limit: 500_000 },
  { label: 'JavaScript total', extensions: ['.js'], limit: 1_000_000 },
];

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

const files = filesIn(DIST);
const htmlPages = files.filter((file) => file.endsWith('.html'));
if (htmlPages.length === 0) {
  console.error('[performance] Aucun fichier HTML dans apps/docs/dist. Lancez le build des docs.');
  process.exit(1);
}

let failures = 0;
for (const budget of budgets) {
  const total = files
    .filter((file) => budget.extensions.some((extension) => file.endsWith(extension)))
    .reduce((sum, file) => sum + statSync(file).size, 0);
  const status = total <= budget.limit ? '✅' : '❌';
  console.log(
    `[performance] ${status} ${budget.label}: ${total} / ${budget.limit} octets (${htmlPages.length} pages)`
  );
  if (total > budget.limit) failures++;
}

if (failures > 0) process.exit(1);
