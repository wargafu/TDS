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
          expect(selector.startsWith('.tds-'), `unexpected class selector ${selector} in ${relative(SRC_DIR, file)}`).toBe(true);
        }
      });
    });
  }
});
