#!/usr/bin/env node
/**
 * TDS Core — Token generator
 *
 * Source unique de vérité pour les tokens primitifs : lit tokens-src/*.json
 * et génère src/tokens/{name}.ts, {name}.json et {name}.css. Ces trois
 * fichiers de sortie ne doivent plus être édités à la main — toute
 * modification se fait dans tokens-src/.
 *
 * Portée : tokens primitifs uniquement (color, typography, spacing, radius,
 * shadow, motion, z-index). Les tokens de composants (button.tokens.ts,
 * etc.) restent maintenus à la main pour l'instant — leur structure
 * (wrappers sémantiques référençant des noms de variables CSS plutôt que
 * des valeurs) appelle une stratégie de génération différente.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'tokens-src');
const OUT_DIR = join(ROOT, 'src', 'tokens');

function log(msg) {
  process.stdout.write(`[generate-tokens] ${msg}\n`);
}

function readJson(name) {
  return JSON.parse(readFileSync(join(SRC_DIR, `${name}.json`), 'utf-8'));
}

function kebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function writeOutputs(name, { ts, json, css }) {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, `${name}.ts`), ts);
  writeFileSync(join(OUT_DIR, `${name}.json`), json);
  writeFileSync(join(OUT_DIR, `${name}.css`), css);
  log(`generated: tokens/${name}.{ts,json,css}`);
}

const GENERATED_HEADER =
  '// Fichier généré par scripts/generate-tokens.mjs à partir de tokens-src/ — ne pas éditer à la main.\n';

// ─── color ───────────────────────────────────────────────────────────────

function generateColor() {
  const src = readJson('color');
  const scaleCssPrefix = { blue: 'color-blue', yellow: 'color-yellow', red: 'color-red', green: 'color-green', neutral: 'neutral' };

  // Résout chaque référence sémantique { scale, shade } en valeur littérale.
  const resolvedSemantic = {};
  for (const [key, props] of Object.entries(src.semantic)) {
    resolvedSemantic[key] = {};
    for (const [prop, ref] of Object.entries(props)) {
      resolvedSemantic[key][prop] = src.scales[ref.scale][ref.shade];
    }
  }

  const publicShape = { ...src.scales, semantic: resolvedSemantic };
  const json = JSON.stringify(publicShape, null, 2) + '\n';

  const ts =
    GENERATED_HEADER +
    `export const color = ${JSON.stringify(publicShape, null, 2)} as const;\n\n` +
    `export type ColorTokens = typeof color;\n\n` +
    `export default color;\n`;

  const cssLines = ['/* TDS color tokens - generated */', ':root{'];
  for (const [scaleName, shades] of Object.entries(src.scales)) {
    cssLines.push(`  /* ${scaleName[0].toUpperCase()}${scaleName.slice(1)} */`);
    for (const [shade, value] of Object.entries(shades)) {
      cssLines.push(`  --tds-${scaleCssPrefix[scaleName]}-${shade}: ${value};`);
    }
    cssLines.push('');
  }
  cssLines.push('  /* Semantic */');
  for (const [key, props] of Object.entries(src.semantic)) {
    for (const [prop, ref] of Object.entries(props)) {
      const varName = prop === 'background' ? 'bg' : prop;
      cssLines.push(`  --tds-semantic-${key}-${varName}: var(--tds-${scaleCssPrefix[ref.scale]}-${ref.shade});`);
    }
    cssLines.push('');
  }
  while (cssLines[cssLines.length - 1] === '') cssLines.pop();
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

// ─── flat scale (radius, shadow) ────────────────────────────────────────

function generateFlatScale(name, cssPrefix, header) {
  const src = readJson(name);
  const json = JSON.stringify(src, null, 2) + '\n';
  const ts =
    GENERATED_HEADER +
    `export const ${name} = ${JSON.stringify(src, null, 2)} as const;\n\n` +
    `export type ${cap(name)}Tokens = typeof ${name};\n\n` +
    `export default ${name};\n`;

  const cssLines = [`/* ${header} */`, ':root{'];
  for (const [key, value] of Object.entries(src)) {
    cssLines.push(`  --tds-${cssPrefix}-${key}: ${value};`);
  }
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

function cap(str) {
  return str[0].toUpperCase() + str.slice(1);
}

// ─── spacing (scale + px) ────────────────────────────────────────────────

function generateSpacing() {
  const src = readJson('spacing');
  const json = JSON.stringify(src, null, 2) + '\n';
  const ts =
    GENERATED_HEADER +
    `export const spacing = ${JSON.stringify(src, null, 2)} as const;\n\n` +
    `export type SpacingTokens = typeof spacing;\n\n` +
    `export default spacing;\n`;

  const cssLines = ['/* TDS spacing tokens */', ':root{'];
  for (const [key, value] of Object.entries(src.scale)) {
    cssLines.push(`  --tds-spacing-${key}: ${value};`);
  }
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

// ─── motion (durations + easing) ────────────────────────────────────────

function generateMotion() {
  const src = readJson('motion');
  const json = JSON.stringify(src, null, 2) + '\n';
  const ts =
    GENERATED_HEADER +
    `export const motion = ${JSON.stringify(src, null, 2)} as const;\n\n` +
    `export type MotionTokens = typeof motion;\n\n` +
    `export default motion;\n`;

  const cssLines = ['/* TDS motion tokens */', ':root{'];
  for (const [key, value] of Object.entries(src.durations)) {
    cssLines.push(`  --tds-motion-${kebab(key)}: ${value};`);
  }
  cssLines.push('');
  for (const [key, value] of Object.entries(src.easing)) {
    cssLines.push(`  --tds-easing-${kebab(key)}: ${value};`);
  }
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

// ─── z-index ─────────────────────────────────────────────────────────────

function generateZIndex() {
  const src = readJson('z-index');
  const json = JSON.stringify(src, null, 2) + '\n';
  const ts =
    GENERATED_HEADER +
    `export const zIndex = ${JSON.stringify(src, null, 2)} as const;\n\n` +
    `export type ZIndexTokens = typeof zIndex;\n\n` +
    `export default zIndex;\n`;

  const cssLines = ['/* TDS z-index tokens */', ':root{'];
  for (const [key, value] of Object.entries(src)) {
    cssLines.push(`  --tds-z-${key}: ${value};`);
  }
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

// ─── typography ──────────────────────────────────────────────────────────

function generateTypography() {
  const src = readJson('typography');
  const json = JSON.stringify(src, null, 2) + '\n';
  const ts =
    GENERATED_HEADER +
    `export const typography = ${JSON.stringify(src, null, 2)} as const;\n\n` +
    `export type TypographyTokens = typeof typography;\n\n` +
    `export default typography;\n`;

  const familyCssKey = { primary: 'primary', arabic: 'ar', mono: 'mono' };

  const cssLines = ['/* TDS typography tokens */', ':root{', '  /* font families */'];
  for (const [key, value] of Object.entries(src.families)) {
    cssLines.push(`  --tds-font-family-${familyCssKey[key] ?? kebab(key)}: ${value};`);
  }
  cssLines.push('', '  /* sizes (rem) */');
  for (const [key, value] of Object.entries(src.sizes)) {
    cssLines.push(`  --tds-font-size-${key}: ${value};`);
  }
  cssLines.push('', '  /* line-heights */');
  for (const [key, value] of Object.entries(src.lineHeights)) {
    cssLines.push(`  --tds-line-height-${key}: ${value};`);
  }
  cssLines.push('', '  /* weights */');
  for (const [key, value] of Object.entries(src.weights)) {
    cssLines.push(`  --tds-font-weight-${key}: ${value};`);
  }
  cssLines.push('', '  /* text style snippets (font-size + line-height + weight) */');
  for (const [styleName, style] of Object.entries(src.styles)) {
    const base = `--tds-text-${kebab(styleName)}`;
    cssLines.push(`  ${base}-size: var(--tds-font-size-${style.size});`);
    cssLines.push(`  ${base}-line-height: var(--tds-line-height-${style.lineHeight});`);
    cssLines.push(`  ${base}-weight: var(--tds-font-weight-${style.weight});`);
    cssLines.push('');
  }
  while (cssLines[cssLines.length - 1] === '') cssLines.pop();
  cssLines.push('}');
  cssLines.push('');
  cssLines.push('/* RTL / Arabic usage helper */');
  cssLines.push(':root[lang="ar"], :root:lang(ar) {');
  cssLines.push('  --tds-default-line-height-ar: 1.6; /* recommend slightly larger line-height for Arabic */');
  cssLines.push('}');

  return { ts, json, css: cssLines.join('\n') + '\n' };
}

// ─── run ─────────────────────────────────────────────────────────────────

writeOutputs('color', generateColor());
writeOutputs('typography', generateTypography());
writeOutputs('spacing', generateSpacing());
writeOutputs('radius', generateFlatScale('radius', 'radius', 'TDS radius tokens'));
writeOutputs('shadow', generateFlatScale('shadow', 'shadow', 'TDS shadow tokens'));
writeOutputs('motion', generateMotion());
writeOutputs('z-index', generateZIndex());

log('done.');
