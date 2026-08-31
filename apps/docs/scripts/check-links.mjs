import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const configuredBase = process.env.BASE_PATH ?? '/';
const baseName = configuredBase.replace(/^\/+|\/+$/g, '');
const baseRoot = baseName ? `/${baseName}` : '/';
const basePrefix = baseName ? `${baseRoot}/` : '/';

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

function resolveDistPath(pathname) {
  if (pathname === baseRoot || pathname === basePrefix) return join(DIST, 'index.html');
  if (!pathname.startsWith(basePrefix)) return null;

  const relativePath = pathname.slice(basePrefix.length);
  const directPath = join(DIST, relativePath);
  if (existsSync(directPath)) return directPath;

  if (!extname(relativePath)) return join(DIST, relativePath, 'index.html');
  return directPath;
}

if (!existsSync(DIST)) {
  console.error('[links] apps/docs/dist est absent. Lancez le build des docs.');
  process.exit(1);
}

const htmlPages = filesIn(DIST).filter((file) => file.endsWith('.html'));
const references =
  /<(a|area|base|form|iframe|img|link|script|source|audio|video)\b[^>]*(?:href|src|action)\s*=\s*["']([^"']+)["'][^>]*>/gi;
const invalidBase = [];
const missing = [];
let checked = 0;

for (const file of htmlPages) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(references)) {
    const reference = match[2].split('#', 1)[0].split('?', 1)[0];
    if (!reference.startsWith('/') || reference.startsWith('//') || reference === '/') continue;

    checked++;
    const target = resolveDistPath(reference);
    if (!target) {
      invalidBase.push(`${relative(DIST, file)} → ${reference}`);
    } else if (!existsSync(target)) {
      missing.push(`${relative(DIST, file)} → ${reference}`);
    }
  }
}

if (invalidBase.length || missing.length) {
  if (invalidBase.length) {
    console.error(`[links] ${invalidBase.length} URL(s) hors de la base ${basePrefix}:`);
    invalidBase.slice(0, 20).forEach((entry) => console.error(`  - ${entry}`));
  }
  if (missing.length) {
    console.error(`[links] ${missing.length} ressource(s) introuvable(s):`);
    missing.slice(0, 20).forEach((entry) => console.error(`  - ${entry}`));
  }
  process.exit(1);
}

console.log(
  `[links] ✅ ${checked} URL(s) internes vérifiées sur ${htmlPages.length} pages (base ${basePrefix})`
);
