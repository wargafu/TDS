import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative } from 'path';
import postcss from 'postcss';

const SRC_DIR = join(__dirname, '..', 'src');

function findCssFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...findCssFiles(full));
    } else if (entry.endsWith('.css')) {
      files.push(full);
    }
  }
  return files;
}

const cssFiles = findCssFiles(SRC_DIR);

describe('every shipped CSS file parses without error', () => {
  for (const file of cssFiles) {
    it(relative(SRC_DIR, file), () => {
      expect(() => postcss.parse(readFileSync(file, 'utf-8'))).not.toThrow();
    });
  }
});

describe('naming convention: custom properties and classes are prefixed tds-', () => {
  for (const file of cssFiles) {
    it(`${relative(SRC_DIR, file)} has no stray dstd- references`, () => {
      const text = readFileSync(file, 'utf-8');
      const strayMatches = text.match(/\bdstd-/gi) ?? [];
      expect(strayMatches).toEqual([]);
    });

    it(`${relative(SRC_DIR, file)}: every custom property starts with --tds-`, () => {
      const root = postcss.parse(readFileSync(file, 'utf-8'));
      root.walkDecls((decl) => {
        if (decl.prop.startsWith('--')) {
          expect(decl.prop.startsWith('--tds-')).toBe(true);
        }
      });
    });

    it(`${relative(SRC_DIR, file)}: every .class selector starts with .tds-`, () => {
      const root = postcss.parse(readFileSync(file, 'utf-8'));
      root.walkRules((rule) => {
        const classSelectors = rule.selector.match(/\.[\w-]+/g) ?? [];
        for (const selector of classSelectors) {
          if (selector.startsWith('.tds-')) continue;
          // Ignore selectors that aren't component classes (e.g. :root, framework hooks,
          // or well-known unprefixed a11y utility idioms like .sr-only).
          if (/^\.(sl-|starlight)/.test(selector)) continue;
          if (selector === '.sr-only') continue;
          expect(
            selector.startsWith('.tds-'),
            `unexpected class selector ${selector} in ${relative(SRC_DIR, file)}`
          ).toBe(true);
        }
      });
    });
  }
});

describe('RTL readiness', () => {
  // Propriétés physiques interdites : elles ne se retournent pas en RTL.
  // `::-webkit-slider-*` et `::-moz-range-*` échappent aux propriétés logiques
  // (pseudo-éléments non standard) — les rares `left/right` y sont tolérés.
  const PHYSICAL = new RegExp(
    [
      // positionnement et boîte
      '(?:^|[;{\\s])(?:left|right|margin-left|margin-right|padding-left|padding-right)\\s*:',
      // bordures physiques, y compris sous-propriétés (-width/-color/-style)
      'border-(?:left|right)(?:-(?:width|color|style))?\\s*:',
      'inset-(?:left|right)\\s*:',
      // valeurs directionnelles
      'text-align\\s*:\\s*(?:left|right)\\b',
      '(?:float|clear)\\s*:\\s*(?:left|right)\\b',
    ].join('|'),
    'gi'
  );

  it('does not ship physical left/right declarations in component CSS', () => {
    const physicalDeclarations = cssFiles.flatMap((file) => {
      const text = readFileSync(file, 'utf-8')
        // Retire les blocs de pseudo-éléments de curseur natif (non logiques).
        .replace(/::(?:-webkit-slider|-moz-range)[^{]*\{[^}]*\}/gi, '');
      return (text.match(PHYSICAL) ?? []).map((m) => `${relative(SRC_DIR, file)}: ${m.trim()}`);
    });

    expect(physicalDeclarations).toEqual([]);
  });

  it('exposes direction-aware hooks for controls with directional visuals', () => {
    const inputCss = readFileSync(join(SRC_DIR, 'components', 'input', 'input.css'), 'utf-8');
    const linkCss = readFileSync(join(SRC_DIR, 'components', 'link', 'link.css'), 'utf-8');

    expect(inputCss).toContain('.tds-select:dir(rtl)');
    expect(inputCss).toContain('.tds-switch input:dir(rtl):checked');
    expect(linkCss).toContain('.tds-link--standalone:dir(rtl)');
  });
});
