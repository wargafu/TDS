#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');

let errors = 0;
let ok = 0;

function pass(msg) {
  process.stdout.write(`  ✅  ${msg}\n`);
  ok++;
}
function fail(msg) {
  process.stderr.write(`  ❌  ${msg}\n`);
  errors++;
}

function assertExists(p, label) {
  if (!existsSync(p)) {
    fail(`${label}  (missing)`);
    return false;
  }
  return true;
}

function assertNonEmpty(p, label) {
  if (!assertExists(p, label)) return;
  if (statSync(p).size === 0) {
    fail(`${label}  (empty)`);
    return;
  }
  pass(label);
}

function assertValidJson(p, label) {
  if (!assertExists(p, label)) return;
  try {
    JSON.parse(readFileSync(p, 'utf-8'));
    pass(label);
  } catch (e) {
    fail(`${label}  (invalid JSON: ${e.message})`);
  }
}

// ─── Primitive tokens ────────────────────────────────────────────
const PRIMITIVES = ['color', 'typography', 'spacing', 'radius', 'shadow', 'motion', 'z-index'];

process.stdout.write('[validate-tokens] Primitive tokens...\n\n');
for (const name of PRIMITIVES) {
  const base = join(SRC, 'tokens', name);
  assertNonEmpty(`${base}.ts`, `tokens/${name}.ts`);
  assertValidJson(`${base}.json`, `tokens/${name}.json`);
  assertNonEmpty(`${base}.css`, `tokens/${name}.css`);
}
assertNonEmpty(join(SRC, 'tokens', 'index.ts'), 'tokens/index.ts');

// ─── Composants ──────────────────────────────────────────────────
const COMPONENTS = [
  { name: 'button', tokenFile: 'button.tokens', cssFile: 'button' },
  { name: 'input', tokenFile: 'input.tokens', cssFile: 'input' },
  { name: 'alert', tokenFile: 'alert.tokens', cssFile: 'alert' },
  { name: 'badge', tokenFile: 'badge.tokens', cssFile: 'badge' },
  { name: 'card', tokenFile: 'card.tokens', cssFile: 'card' },
  { name: 'link', tokenFile: 'link.tokens', cssFile: 'link' },
  { name: 'table', tokenFile: 'table.tokens', cssFile: 'table' },
  { name: 'header', tokenFile: 'header.tokens', cssFile: 'header' },
  { name: 'nav', tokenFile: 'nav.tokens', cssFile: 'nav' },
  { name: 'breadcrumb', tokenFile: 'breadcrumb.tokens', cssFile: 'breadcrumb' },
  { name: 'pagination', tokenFile: 'pagination.tokens', cssFile: 'pagination' },
  { name: 'modal', tokenFile: 'modal.tokens', cssFile: 'modal' },
  { name: 'skip-link', tokenFile: 'skip-link.tokens', cssFile: 'skip-link' },
  { name: 'footer', tokenFile: 'footer.tokens', cssFile: 'footer' },
  { name: 'accordion', tokenFile: 'accordion.tokens', cssFile: 'accordion' },
  { name: 'tabs', tokenFile: 'tabs.tokens', cssFile: 'tabs' },
  { name: 'tooltip', tokenFile: 'tooltip.tokens', cssFile: 'tooltip' },
  { name: 'search', tokenFile: 'search.tokens', cssFile: 'search' },
  { name: 'stepper', tokenFile: 'stepper.tokens', cssFile: 'stepper' },
  { name: 'file-upload', tokenFile: 'file-upload.tokens', cssFile: 'file-upload' },
  { name: 'progress', tokenFile: 'progress.tokens', cssFile: 'progress' },
  { name: 'callout', tokenFile: 'callout.tokens', cssFile: 'callout' },
  { name: 'notice', tokenFile: 'notice.tokens', cssFile: 'notice' },
  { name: 'tag', tokenFile: 'tag.tokens', cssFile: 'tag' },
  { name: 'tile', tokenFile: 'tile.tokens', cssFile: 'tile' },
  { name: 'download', tokenFile: 'download.tokens', cssFile: 'download' },
  { name: 'quote', tokenFile: 'quote.tokens', cssFile: 'quote' },
  { name: 'summary', tokenFile: 'summary.tokens', cssFile: 'summary' },
];

process.stdout.write('\n[validate-tokens] Component tokens...\n\n');
for (const { name, tokenFile, cssFile } of COMPONENTS) {
  const base = join(SRC, 'components', name);
  assertNonEmpty(join(base, `${tokenFile}.ts`), `components/${name}/${tokenFile}.ts`);
  assertValidJson(join(base, `${tokenFile}.json`), `components/${name}/${tokenFile}.json`);
  assertNonEmpty(join(base, `${cssFile}.css`), `components/${name}/${cssFile}.css`);
  assertNonEmpty(join(base, 'index.ts'), `components/${name}/index.ts`);
}
assertNonEmpty(join(SRC, 'components', 'index.ts'), 'components/index.ts');

// ─── Base CSS ────────────────────────────────────────────────────
process.stdout.write('\n[validate-tokens] Base files...\n\n');
assertNonEmpty(join(SRC, 'base.css'), 'base.css');
assertNonEmpty(join(SRC, 'index.ts'), 'src/index.ts');

// ─── Résultat ────────────────────────────────────────────────────
process.stdout.write(`\n${ok} check(s) passed, ${errors} failed.\n`);
if (errors > 0) {
  process.stderr.write('[validate-tokens] FAILED.\n');
  process.exit(1);
}
process.stdout.write('[validate-tokens] All token files are valid.\n');
