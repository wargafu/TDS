import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parseCssVars, resolveVar } from './helpers/css';
import { color } from '../src/tokens/color';
import { typography } from '../src/tokens/typography';
import { spacing } from '../src/tokens/spacing';
import { radius } from '../src/tokens/radius';
import { shadow } from '../src/tokens/shadow';
import { motion } from '../src/tokens/motion';
import { zIndex } from '../src/tokens/z-index';

const TOKENS_DIR = join(__dirname, '..', 'src', 'tokens');

function readCss(name: string) {
  return parseCssVars(readFileSync(join(TOKENS_DIR, `${name}.css`), 'utf-8'));
}

function kebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

const SCALE_CSS_PREFIX: Record<string, string> = {
  blue: 'color-blue',
  yellow: 'color-yellow',
  red: 'color-red',
  green: 'color-green',
  neutral: 'neutral',
};

describe('color tokens: CSS matches TS', () => {
  const vars = readCss('color');

  for (const scaleName of ['blue', 'yellow', 'red', 'green', 'neutral'] as const) {
    for (const [shade, value] of Object.entries(color[scaleName])) {
      it(`--tds-${SCALE_CSS_PREFIX[scaleName]}-${shade} matches color.${scaleName}.${shade}`, () => {
        expect(vars.get(`--tds-${SCALE_CSS_PREFIX[scaleName]}-${shade}`)).toBe(value);
      });
    }
  }

  for (const [key, props] of Object.entries(color.semantic)) {
    for (const [prop, value] of Object.entries(props)) {
      const varName = prop === 'background' ? 'bg' : prop;
      it(`--tds-semantic-${key}-${varName} resolves to color.semantic.${key}.${prop}`, () => {
        const raw = vars.get(`--tds-semantic-${key}-${varName}`);
        expect(raw, `--tds-semantic-${key}-${varName} should exist in color.css`).toBeDefined();
        expect(resolveVar(vars, raw!)).toBe(value);
      });
    }
  }
});

describe('flat scale tokens: CSS matches TS', () => {
  const cases: Array<[string, string, Record<string, string>]> = [
    ['radius', 'radius', radius],
    ['shadow', 'shadow', shadow],
    ['z-index', 'z', zIndex as unknown as Record<string, string>],
  ];

  for (const [file, cssPrefix, tokens] of cases) {
    describe(file, () => {
      const vars = readCss(file);
      for (const [key, value] of Object.entries(tokens)) {
        it(`--tds-${cssPrefix}-${key} matches ${file}.${key}`, () => {
          expect(vars.get(`--tds-${cssPrefix}-${key}`)).toBe(String(value));
        });
      }
    });
  }

  it('spacing: --tds-spacing-{n} matches spacing.scale.{n}', () => {
    const vars = readCss('spacing');
    for (const [key, value] of Object.entries(spacing.scale)) {
      expect(vars.get(`--tds-spacing-${key}`)).toBe(value);
    }
  });
});

describe('motion tokens: CSS matches TS', () => {
  const vars = readCss('motion');

  for (const [key, value] of Object.entries(motion.durations)) {
    it(`--tds-motion-${kebab(key)} matches motion.durations.${key}`, () => {
      expect(vars.get(`--tds-motion-${kebab(key)}`)).toBe(value);
    });
  }

  for (const [key, value] of Object.entries(motion.easing)) {
    it(`--tds-easing-${kebab(key)} matches motion.easing.${key}`, () => {
      expect(vars.get(`--tds-easing-${kebab(key)}`)).toBe(value);
    });
  }
});

describe('typography tokens: CSS matches TS', () => {
  const vars = readCss('typography');
  const FAMILY_CSS_KEY: Record<string, string> = { primary: 'primary', arabic: 'ar', mono: 'mono' };

  for (const [key, value] of Object.entries(typography.families)) {
    it(`--tds-font-family-${FAMILY_CSS_KEY[key]} matches typography.families.${key}`, () => {
      expect(vars.get(`--tds-font-family-${FAMILY_CSS_KEY[key]}`)).toBe(value);
    });
  }

  for (const [key, value] of Object.entries(typography.sizes)) {
    it(`--tds-font-size-${key} matches typography.sizes.${key}`, () => {
      expect(vars.get(`--tds-font-size-${key}`)).toBe(value);
    });
  }

  for (const [key, value] of Object.entries(typography.lineHeights)) {
    it(`--tds-line-height-${key} matches typography.lineHeights.${key}`, () => {
      expect(vars.get(`--tds-line-height-${key}`)).toBe(String(value));
    });
  }

  for (const [key, value] of Object.entries(typography.weights)) {
    it(`--tds-font-weight-${key} matches typography.weights.${key}`, () => {
      expect(vars.get(`--tds-font-weight-${key}`)).toBe(String(value));
    });
  }

  for (const [styleName, style] of Object.entries(typography.styles)) {
    const base = `--tds-text-${kebab(styleName)}`;
    it(`${base}-size resolves to typography.sizes.${style.size}`, () => {
      expect(resolveVar(vars, vars.get(`${base}-size`)!)).toBe(typography.sizes[style.size]);
    });
    it(`${base}-line-height resolves to typography.lineHeights.${style.lineHeight}`, () => {
      expect(resolveVar(vars, vars.get(`${base}-line-height`)!)).toBe(String(typography.lineHeights[style.lineHeight]));
    });
    it(`${base}-weight resolves to typography.weights.${style.weight}`, () => {
      expect(resolveVar(vars, vars.get(`${base}-weight`)!)).toBe(String(typography.weights[style.weight]));
    });
  }
});
