#!/usr/bin/env node
import { existsSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const targets = [join(ROOT, 'dist'), join(ROOT, 'tsconfig.tsbuildinfo')];

for (const target of targets) {
  if (existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
    process.stdout.write(`[clean] removed ${target}\n`);
  }
}

process.stdout.write('[clean] done\n');
