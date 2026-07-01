#!/usr/bin/env node
/**
 * Copies the built @tds-tchad/core CSS (packages/core/dist) into
 * apps/docs/public/tds/ so the playground page can link the real shipped
 * artifact via plain <link> tags, without a cross-package Vite import.
 * Requires packages/core to be built first (pnpm build runs core before
 * docs via turbo's `dependsOn: ["^build"]`).
 */

import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE_DIST = join(__dirname, '..', '..', '..', 'packages', 'core', 'dist');
const DEST = join(__dirname, '..', 'public', 'tds');

if (!existsSync(CORE_DIST)) {
  process.stderr.write(
    '[copy-core-assets] ERROR: packages/core/dist not found — run `pnpm --filter @tds-tchad/core build` first.\n'
  );
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST, { recursive: true });
cpSync(CORE_DIST, DEST, {
  recursive: true,
  filter: (src) => src.endsWith('.css') || !src.includes('.'),
});

process.stdout.write('[copy-core-assets] copied packages/core/dist CSS → apps/docs/public/tds/\n');
