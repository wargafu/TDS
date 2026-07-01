#!/usr/bin/env node
/**
 * TDS Core — Build pipeline
 *
 * Steps:
 *   1. Clean dist/
 *   2. Generate primitive tokens from tokens-src/ (see generate-tokens.mjs)
 *   3. TypeScript compile (tsc --build)
 *   4. Copy non-TS assets (CSS, JSON) preserving src/ structure → dist/
 */

import { execSync } from 'child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

// Chemin vers le tsc local — fonctionne même si tsc n'est pas dans PATH global
const TSC = join(ROOT, 'node_modules', '.bin', 'tsc');

const ASSET_EXTENSIONS = new Set(['.css', '.json']);

// ─── helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  process.stdout.write(`[build] ${msg}\n`);
}

function err(msg) {
  process.stderr.write(`[build] ERROR: ${msg}\n`);
}

function copyAssets(srcDir, destDir) {
  const entries = readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(srcDir, entry.name);
    const destPath = join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyAssets(srcPath, destPath);
    } else {
      const ext = entry.name.slice(entry.name.lastIndexOf('.'));
      if (ASSET_EXTENSIONS.has(ext)) {
        mkdirSync(destDir, { recursive: true });
        cpSync(srcPath, destPath);
        log(`  asset → ${relative(ROOT, destPath)}`);
      }
    }
  }
}

// ─── step 1: clean ───────────────────────────────────────────────────────────

log('Step 1/4 — Cleaning dist/...');
if (existsSync(DIST)) {
  rmSync(DIST, { recursive: true, force: true });
  log('  dist/ removed');
} else {
  log('  dist/ not found, skipping');
}

// ─── step 2: generate tokens ─────────────────────────────────────────────────

log('Step 2/4 — Generating primitive tokens from tokens-src/...');
try {
  execSync(`node "${join(__dirname, 'generate-tokens.mjs')}"`, {
    stdio: 'inherit',
    cwd: ROOT,
  });
} catch {
  err('Token generation failed — aborting build');
  process.exit(1);
}

// ─── step 3: typescript ──────────────────────────────────────────────────────

log('Step 3/4 — Compiling TypeScript...');
if (!existsSync(TSC)) {
  err(`tsc not found at ${TSC} — run npm install first`);
  process.exit(1);
}
try {
  // dist/ vient d'être supprimé : --force évite que le cache composite
  // considère malgré tout la compilation comme à jour.
  execSync(`"${TSC}" --build tsconfig.json --force`, {
    stdio: 'inherit',
    cwd: ROOT,
  });
  log('  TypeScript compiled');
} catch {
  err('TypeScript compilation failed — aborting build');
  process.exit(1);
}

// ─── step 4: copy assets ─────────────────────────────────────────────────────

log('Step 4/4 — Copying CSS & JSON assets...');
if (!existsSync(SRC)) {
  err(`src/ directory not found at ${SRC}`);
  process.exit(1);
}
copyAssets(SRC, DIST);

log('\nBuild complete.');
