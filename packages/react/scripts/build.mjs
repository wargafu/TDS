#!/usr/bin/env node
/**
 * TDGS React — Build pipeline
 *
 * Steps:
 *   1. Clean dist/
 *   2. TypeScript compile (tsc --build)
 */

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const TSC = join(ROOT, 'node_modules', '.bin', 'tsc');

function log(msg) {
  process.stdout.write(`[build] ${msg}\n`);
}

function err(msg) {
  process.stderr.write(`[build] ERROR: ${msg}\n`);
}

log('Step 1/2 — Cleaning dist/...');
if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });

log('Step 2/2 — Compiling TypeScript...');
const tscBin = existsSync(TSC)
  ? `"${TSC}"`
  : join(ROOT, '..', '..', 'node_modules', '.bin', 'tsc');
try {
  execSync(`${tscBin} --build tsconfig.json --force`, {
    stdio: 'inherit',
    cwd: ROOT,
  });
  log('  TypeScript compiled');
} catch {
  err('TypeScript compilation failed — aborting build');
  process.exit(1);
}

log('\nBuild complete.');
