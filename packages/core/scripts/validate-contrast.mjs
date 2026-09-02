#!/usr/bin/env node
/**
 * TDGS Core — Contrôle de contraste WCAG.
 *
 * Lit la forme résolue des tokens de couleur (src/tokens/color.ts, où
 * `semantic`, `semanticDark` et `theme` sont déjà des valeurs littérales) et
 * vérifie que les paires texte/fond et élément/fond réellement utilisées par
 * le système atteignent le seuil WCAG 2.2 AA attendu.
 *
 * Seuils : 4.5 pour le texte courant, 3.0 pour le texte large, les éléments
 * d'interface et les icônes. Exécuté par `pnpm --filter @tdgs/core validate`.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const COLOR_TS = join(here, '..', 'src', 'tokens', 'color.ts');

// Le fichier généré est `export const color = { ... } as const;` — on isole
// l'objet littéral sans exécuter le module.
const raw = readFileSync(COLOR_TS, 'utf-8');
const start = raw.indexOf('{');
const end = raw.lastIndexOf('} as const');
const color = JSON.parse(raw.slice(start, end + 1));

function toRgb(hex) {
  const h = hex.replace('#', '').trim();
  const n = parseInt(
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h,
    16
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relLuminance(hex) {
  const [r, g, b] = toRgb(hex).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const l1 = relLuminance(fg);
  const l2 = relLuminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** @type {{ label: string, fg: string, bg: string, min: number }[]} */
const pairs = [];
const add = (label, fg, bg, min) => pairs.push({ label, fg, bg, min });

for (const [mode, theme] of Object.entries(color.theme)) {
  const t = theme;
  add(`${mode}: text.default / bg.default`, t.text.default, t.background.default, 4.5);
  add(`${mode}: text.default / bg.subtle`, t.text.default, t.background.subtle, 4.5);
  add(`${mode}: text.default / bg.elevated`, t.text.default, t.background.elevated, 4.5);
  add(`${mode}: text.muted / bg.default`, t.text.muted, t.background.default, 4.5);
  add(`${mode}: text.inverted / action.primary`, t.text.inverted, t.action.primary, 4.5);
  add(`${mode}: action.primary / bg.default (UI)`, t.action.primary, t.background.default, 3);
  // Remarque : border.default est un filet décoratif subtil, exempté de WCAG
  // 1.4.11 ; le cas porteur de sens utilise border.strong.
  add(`${mode}: border.strong / bg.default (UI)`, t.border.strong, t.background.default, 3);
  add(`${mode}: accent.text / bg.default`, t.accent.text, t.background.default, 4.5);
}

for (const [name, s] of Object.entries(color.semantic)) {
  add(`semantic light: ${name}.text / ${name}.background`, s.text, s.background, 4.5);
  add(`semantic light: ${name}.icon / ${name}.background (UI)`, s.icon, s.background, 3);
}
for (const [name, s] of Object.entries(color.semanticDark ?? {})) {
  add(`semantic dark: ${name}.text / ${name}.background`, s.text, s.background, 4.5);
  add(`semantic dark: ${name}.icon / ${name}.background (UI)`, s.icon, s.background, 3);
}

let failures = 0;
process.stdout.write('[validate-contrast] Paires de couleurs WCAG 2.2 AA...\n\n');
for (const { label, fg, bg, min } of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failures++;
  process.stdout.write(
    `  ${ok ? '✅' : '❌'}  ${label} — ${r.toFixed(2)}:1 (min ${min}) ${fg} / ${bg}\n`
  );
}

process.stdout.write(`\n${pairs.length - failures}/${pairs.length} paire(s) conformes.\n`);
if (failures > 0) {
  process.stderr.write('[validate-contrast] ÉCHEC — contraste insuffisant.\n');
  process.exit(1);
}
process.stdout.write('[validate-contrast] Toutes les paires atteignent le seuil AA.\n');
