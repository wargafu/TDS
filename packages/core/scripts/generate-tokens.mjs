#!/usr/bin/env node
/**
 * TDGS Core — Token generator
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

  // Variante sombre des couleurs sémantiques fonctionnelles (info/success/
  // warning/danger) — mêmes noms de variable CSS que `semantic`, appliquées
  // uniquement sous data-tds-theme="dark" / prefers-color-scheme: dark.
  const resolvedSemanticDark = {};
  for (const [key, props] of Object.entries(src.semanticDark)) {
    resolvedSemanticDark[key] = {};
    for (const [prop, ref] of Object.entries(props)) {
      resolvedSemanticDark[key][prop] = src.scales[ref.scale][ref.shade];
    }
  }

  // Résout le palier sémantique clair/sombre (theme.light / theme.dark) —
  // texte, fond, bordure, action, accent. Cf. fondamentaux/colors.mdx pour
  // le détail de cette architecture à deux niveaux (inspirée de DSBJ/Bénin).
  const resolvedTheme = {};
  for (const [mode, groups] of Object.entries(src.theme)) {
    resolvedTheme[mode] = {};
    for (const [group, props] of Object.entries(groups)) {
      resolvedTheme[mode][group] = {};
      for (const [prop, ref] of Object.entries(props)) {
        resolvedTheme[mode][group][prop] = src.scales[ref.scale][ref.shade];
      }
    }
  }

  const publicShape = {
    ...src.scales,
    semantic: resolvedSemantic,
    semanticDark: resolvedSemanticDark,
    theme: resolvedTheme,
  };
  const json = JSON.stringify(publicShape, null, 2) + '\n';

  const ts =
    GENERATED_HEADER +
    `export const color = ${JSON.stringify(publicShape, null, 2)} as const;\n\n` +
    `export type ColorTokens = typeof color;\n\n` +
    `export default color;\n`;

  // Groupe "background" génère des vars --tds-bg-*, tous les autres gardent leur nom.
  const themeVarGroup = { background: 'bg', text: 'text', border: 'border', action: 'action', accent: 'accent' };

  function themeDeclarations(mode) {
    const lines = [];
    for (const [group, props] of Object.entries(src.theme[mode])) {
      const varGroup = themeVarGroup[group] ?? group;
      for (const [prop, ref] of Object.entries(props)) {
        const suffix = prop === 'default' ? '' : `-${kebab(prop)}`;
        lines.push(
          `  --tds-${varGroup}${suffix}: var(--tds-${scaleCssPrefix[ref.scale]}-${ref.shade});`
        );
      }
    }
    return lines;
  }

  function semanticDarkDeclarations() {
    const lines = [];
    for (const [key, props] of Object.entries(src.semanticDark)) {
      for (const [prop, ref] of Object.entries(props)) {
        const varName = prop === 'background' ? 'bg' : prop;
        lines.push(
          `  --tds-semantic-${key}-${varName}: var(--tds-${scaleCssPrefix[ref.scale]}-${ref.shade});`
        );
      }
    }
    return lines;
  }

  const cssLines = ['/* TDGS color tokens - generated */', ':root{'];
  for (const [scaleName, shades] of Object.entries(src.scales)) {
    cssLines.push(`  /* ${scaleName[0].toUpperCase()}${scaleName.slice(1)} */`);
    for (const [shade, value] of Object.entries(shades)) {
      cssLines.push(`  --tds-${scaleCssPrefix[scaleName]}-${shade}: ${value};`);
    }
    cssLines.push('');
  }
  cssLines.push('  /* Semantic (fonctionnel) */');
  for (const [key, props] of Object.entries(src.semantic)) {
    for (const [prop, ref] of Object.entries(props)) {
      const varName = prop === 'background' ? 'bg' : prop;
      cssLines.push(`  --tds-semantic-${key}-${varName}: var(--tds-${scaleCssPrefix[ref.scale]}-${ref.shade});`);
    }
    cssLines.push('');
  }
  cssLines.push('  /* Theme (texte/fond/bordure/action/accent) — clair par défaut */');
  cssLines.push(...themeDeclarations('light'));
  while (cssLines[cssLines.length - 1] === '') cssLines.pop();
  cssLines.push('}');
  cssLines.push('');
  cssLines.push('/* Mode sombre — override explicite via data-tds-theme="dark" */');
  cssLines.push(':root[data-tds-theme="dark"]{');
  cssLines.push(...themeDeclarations('dark'));
  cssLines.push(...semanticDarkDeclarations());
  while (cssLines[cssLines.length - 1] === '') cssLines.pop();
  cssLines.push('}');
  cssLines.push('');
  cssLines.push('/* Mode sombre — préférence système, sauf override explicite en clair */');
  cssLines.push('@media (prefers-color-scheme: dark){');
  cssLines.push('  :root:not([data-tds-theme="light"]){');
  cssLines.push(...[...themeDeclarations('dark'), ...semanticDarkDeclarations()].map((l) => `  ${l}`));
  while (cssLines[cssLines.length - 1] === '  ') cssLines.pop();
  cssLines.push('  }');
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

  const cssLines = ['/* TDGS spacing tokens */', ':root{'];
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

  const cssLines = ['/* TDGS motion tokens */', ':root{'];
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

  const cssLines = ['/* TDGS z-index tokens */', ':root{'];
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

  const cssLines = ['/* TDGS typography tokens */', ':root{', '  /* font families */'];
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
writeOutputs('radius', generateFlatScale('radius', 'radius', 'TDGS radius tokens'));
writeOutputs('shadow', generateFlatScale('shadow', 'shadow', 'TDGS shadow tokens'));
writeOutputs('motion', generateMotion());
writeOutputs('z-index', generateZIndex());

log('done.');
