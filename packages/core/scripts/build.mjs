#!/usr/bin/env node
/**
 * TDGS Core — Build pipeline
 *
 * Steps:
 *   1. Clean dist/
 *   2. TypeScript compile (tsc --build)
 *   3. Copy non-TS assets (CSS, JSON) preserving src/ structure → dist/
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

log('Step 1/3 — Cleaning dist/...');
if (existsSync(DIST)) {
  rmSync(DIST, { recursive: true, force: true });
  log('  dist/ removed');
} else {
  log('  dist/ not found, skipping');
}

// ─── step 2: typescript ──────────────────────────────────────────────────────

log('Step 2/3 — Compiling TypeScript...');
if (!existsSync(TSC)) {
  err(`tsc not found at ${TSC} — run npm install first`);
  process.exit(1);
}
try {
  execSync(`"${TSC}" --build tsconfig.json`, {
    stdio: 'inherit',
    cwd: ROOT,
  });
  log('  TypeScript compiled');
} catch {
  err('TypeScript compilation failed — aborting build');
  process.exit(1);
}

// ─── step 3: copy assets ─────────────────────────────────────────────────────

log('Step 3/3 — Copying CSS & JSON assets...');
if (!existsSync(SRC)) {
  err(`src/ directory not found at ${SRC}`);
  process.exit(1);
}
copyAssets(SRC, DIST);

log('\nBuild complete.');
