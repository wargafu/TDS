import postcss from 'postcss';

/** Parses every `--name: value;` custom property declared under `:root` selectors in a CSS file. */
export function parseCssVars(cssText: string): Map<string, string> {
  const root = postcss.parse(cssText);
  const vars = new Map<string, string>();
  root.walkRules((rule) => {
    if (!rule.selector.includes(':root')) return;
    rule.walkDecls((decl) => {
      if (decl.prop.startsWith('--')) {
        vars.set(decl.prop, decl.value.trim());
      }
    });
  });
  return vars;
}

/** Resolves a single-level `var(--name)` reference against a parsed custom-property map. */
export function resolveVar(vars: Map<string, string>, rawValue: string): string {
  const match = rawValue.match(/^var\((--[\w-]+)\)$/);
  if (!match) return rawValue;
  const resolved = vars.get(match[1]);
  if (resolved === undefined) {
    throw new Error(`Unresolved CSS variable reference: ${rawValue}`);
  }
  return resolved;
}
