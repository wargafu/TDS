#!/usr/bin/env node
/**
 * TDGS Core — Export validation
 *
 * Reads package.json exports and verifies every declared file exists in dist/.
 * Exits 1 if any export is broken.
 */

import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PKG = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));

let errors = 0;
let ok = 0;

function check(exportKey, condition, filePath) {
  const full = join(ROOT, filePath);
  if (!existsSync(full)) {
    process.stderr.write(
      `  ❌  exports["${exportKey}"]["${condition}"] → ${filePath}  (FILE NOT FOUND)\n`
    );
    errors++;
  } else {
    process.stdout.write(
      `  ✅  exports["${exportKey}"]["${condition}"] → ${filePath}\n`
    );
    ok++;
  }
}

process.stdout.write('[validate-exports] Checking package.json exports...\n\n');

const exports_ = PKG['exports'];

if (!exports_ || typeof exports_ !== 'object') {
  process.stderr.write('[validate-exports] ERROR: No "exports" field found in package.json\n');
  process.exit(1);
}

for (const [exportKey, conditions] of Object.entries(exports_)) {
  if (typeof conditions === 'string') {
    check(exportKey, 'default', conditions);
  } else if (typeof conditions === 'object') {
    for (const [condition, filePath] of Object.entries(conditions)) {
      if (typeof filePath === 'string') {
        check(exportKey, condition, filePath);
      }
    }
  }
}

process.stdout.write(`\n${ok} export(s) OK, ${errors} broken.\n`);

if (errors > 0) {
  process.stderr.write(
    '[validate-exports] FAILED — run `pnpm build` first, then re-check.\n'
  );
  process.exit(1);
}

process.stdout.write('[validate-exports] All exports are valid.\n');
