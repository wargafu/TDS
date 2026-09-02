#!/usr/bin/env node
/**
 * Vérifie la cohérence du manifeste de composants (src/manifest.ts) avec :
 *   - les dossiers src/components/<id>/ (et leur CSS) ;
 *   - les entrées "exports" de package.json ;
 *   - les custom elements src/elements/ pour les composants jsEnhanced
 *     (via une table de correspondance, un élément pouvant couvrir plusieurs
 *     composants).
 *
 * Échoue (exit 1) à la moindre divergence. Exécuté par `pnpm validate`.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = join(here, '..');
const SRC = join(ROOT, 'src');

let errors = 0;
const fail = (msg) => {
  process.stderr.write(`  ❌  ${msg}\n`);
  errors += 1;
};
const ok = (msg) => process.stdout.write(`  ✅  ${msg}\n`);

// ── Extraction des ids du manifeste sans exécuter le TS ──────────────────
const manifestSrc = readFileSync(join(SRC, 'manifest.ts'), 'utf-8');
const ids = [...manifestSrc.matchAll(/\bid:\s*'([a-z-]+)'/g)].map((m) => m[1]);
const jsEnhancedBlock = [...manifestSrc.matchAll(/id:\s*'([a-z-]+)'[^}]*jsEnhanced:\s*(true|false)/g)];
const jsEnhanced = jsEnhancedBlock.filter(([, , v]) => v === 'true').map(([, id]) => id);

if (ids.length === 0) {
  fail('aucun composant trouvé dans le manifeste');
  process.exit(1);
}
process.stdout.write(`[validate-manifest] ${ids.length} composants au manifeste.\n\n`);

// ── 1. manifeste → dossier + CSS ────────────────────────────────────────
for (const id of ids) {
  const dir = join(SRC, 'components', id);
  if (!existsSync(dir)) {
    fail(`manifest "${id}" : dossier src/components/${id}/ absent`);
    continue;
  }
  if (!existsSync(join(dir, `${id}.css`))) fail(`manifest "${id}" : ${id}.css absent`);
  else ok(`${id} — dossier + CSS`);
}

// ── 2. dossier → manifeste ─────────────────────────────────────────────
const dirs = readdirSync(join(SRC, 'components'), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);
for (const dir of dirs) {
  if (!ids.includes(dir)) fail(`dossier src/components/${dir}/ absent du manifeste`);
}

// ── 3. exports package.json ────────────────────────────────────────────
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf-8'));
for (const id of ids) {
  if (!pkg.exports?.[`./components/${id}`]) fail(`export "./components/${id}" absent de package.json`);
  if (!pkg.exports?.[`./components/${id}/${id}.css`])
    fail(`export "./components/${id}/${id}.css" absent de package.json`);
}

// ── 4. composants jsEnhanced → custom element ──────────────────────────
// Un élément peut couvrir plusieurs composants (disclosure ↔ dropdown, nav…).
const elementFor = {
  dropdown: 'disclosure',
  nav: 'disclosure',
  sidemenu: 'disclosure',
  share: 'copy',
  header: 'disclosure',
  password: 'disclosure',
  notice: 'disclosure',
  modal: 'modal',
  tabs: 'tabs',
  tooltip: 'tooltip',
  table: 'sortable-table',
  toast: 'toast',
  consent: 'consent',
};
for (const id of jsEnhanced) {
  const el = elementFor[id];
  if (!el) {
    fail(`composant jsEnhanced "${id}" sans correspondance d'élément (elementFor)`);
    continue;
  }
  if (el === 'modal') continue; // modal s'appuie sur <dialog> natif, pas d'élément dédié encore
  if (!existsSync(join(SRC, 'elements', `${el}.ts`)))
    fail(`composant jsEnhanced "${id}" → src/elements/${el}.ts absent`);
}
ok(`${jsEnhanced.length} composants jsEnhanced couverts`);

process.stdout.write(`\n${errors === 0 ? '[validate-manifest] OK.' : `[validate-manifest] ${errors} erreur(s).`}\n`);
process.exit(errors === 0 ? 0 : 1);
