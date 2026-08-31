import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const configuredBase = process.env.BASE_PATH ?? '/';
const baseName = configuredBase.replace(/^\/+|\/+$/g, '');
const baseRoot = baseName ? `/${baseName}` : '';
const basePrefix = baseName ? `${baseRoot}/` : '/';
const URL_SCHEME = /^[a-z][a-z\d+.-]*:/i;
const URL_ATTRIBUTE = /\b(href|src|action|poster)(\s*=\s*)(["'])([^"']+)\3/gi;

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

function prefixUrl(value) {
  if (
    !baseRoot ||
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    URL_SCHEME.test(value) ||
    value === baseRoot ||
    value.startsWith(basePrefix)
  ) {
    return value;
  }

  return `${baseRoot}${value}`;
}

let changedFiles = 0;
let changedUrls = 0;

for (const file of filesIn(DIST).filter((path) => path.endsWith('.html'))) {
  const source = readFileSync(file, 'utf8');
  const output = source.replace(URL_ATTRIBUTE, (match, attribute, separator, quote, value) => {
    const prefixed = prefixUrl(value);
    if (prefixed === value) return match;
    changedUrls++;
    return `${attribute}${separator}${quote}${prefixed}${quote}`;
  });

  if (output !== source) {
    writeFileSync(file, output);
    changedFiles++;
  }
}

console.log(
  `[links] ✅ ${changedUrls} URL(s) normalisée(s) dans ${changedFiles} page(s) (base ${basePrefix})`
);
