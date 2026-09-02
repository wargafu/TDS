#!/usr/bin/env node
/**
 * Validation structurelle des modèles TDGS (sans dépendance).
 *
 * Contrôles génériques appliqués à chaque `templates/<nom>/index.html` :
 *   - doctype, <html lang> et dir cohérents ;
 *   - exactement un <main> avec un id ;
 *   - lien d'évitement en tête, pointant vers cet id ;
 *   - feuilles @tdgs/core + shared/template.css liées ;
 *   - aucune classe `tds-` manifestement fautive (double tiret orphelin, casse) ;
 *   - bandeau tricolore présent.
 * Plus des marqueurs propres à chaque modèle.
 *
 * L'audit d'accessibilité réel (axe, clavier, lecteur d'écran) reste hors de
 * ce script : voir tdgs-documentation/ACCESSIBILITY.md.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));

/** @type {Record<string, { dir?: 'ltr' | 'rtl'; lang?: string; markers: string[] }>} */
const TEMPLATES = {
  'citizen-portal': { markers: ['tds-skip-link', 'tds-search', 'tds-card', 'tds-template-footer'] },
  'admin-dashboard': {
    markers: ['tds-template-dashboard', 'tds-table', 'tds-badge', 'tds-template-kpi'],
  },
  'content-page': {
    markers: ['tds-template-breadcrumb', 'tds-template-article', 'tds-summary', 'tds-callout'],
  },
  'form-tunnel': {
    markers: ['tds-stepper', 'tds-field__error', 'aria-invalid="true"', 'role="alert"', '<fieldset'],
  },
  login: { markers: ['tds-template-panel', 'tds-password', 'autocomplete="current-password"'] },
  'login-ar': {
    dir: 'rtl',
    lang: 'ar',
    markers: ['tds-template-panel', 'tds-password', 'dir="rtl"'],
  },
  'error-page': { markers: ['tds-template-status', 'Erreur 404', 'tds-search'] },
};

const problems = [];
const note = (name, msg) => problems.push(`${name}: ${msg}`);

for (const [name, spec] of Object.entries(TEMPLATES)) {
  const file = join(ROOT, name, 'index.html');
  if (!existsSync(file)) {
    note(name, `index.html manquant`);
    continue;
  }
  const html = readFileSync(file, 'utf8');

  if (!/^<!doctype html>/i.test(html.trimStart())) note(name, 'doctype absent');

  const langMatch = html.match(/<html[^>]*\blang="([^"]+)"/i);
  if (!langMatch) note(name, 'attribut <html lang> absent');
  else if (spec.lang && langMatch[1] !== spec.lang) note(name, `lang attendu ${spec.lang}`);

  const dirMatch = html.match(/<html[^>]*\bdir="(ltr|rtl)"/i);
  if (!dirMatch) note(name, 'attribut <html dir> absent');
  else if (spec.dir && dirMatch[1] !== spec.dir) note(name, `dir attendu ${spec.dir}`);

  const mains = html.match(/<main\b[^>]*>/gi) ?? [];
  if (mains.length !== 1) note(name, `${mains.length} <main> (attendu : 1)`);
  const mainId = mains[0]?.match(/\bid="([^"]+)"/)?.[1];
  if (!mainId) note(name, '<main> sans id');

  const skip = html.match(/<a[^>]*class="[^"]*tds-skip-link[^"]*"[^>]*href="#([^"]+)"/i);
  if (!skip) note(name, 'lien d’évitement (tds-skip-link) absent');
  else if (mainId && skip[1] !== mainId) note(name, `lien d’évitement pointe #${skip[1]} ≠ #${mainId}`);

  if (!html.includes('packages/core/src/tdgs.css')) note(name, 'tdgs.css non lié');
  if (!html.includes('shared/template.css')) note(name, 'shared/template.css non lié');
  if (!html.includes('tds-template-band')) note(name, 'bandeau tricolore absent');

  // Classes tds- suspectes : double tiret sans modificateur, ou tds-- seul.
  const badClass = html.match(/class="[^"]*\btds-[a-z]+--(?:\s|")/i);
  if (badClass) note(name, `classe tds- incomplète : ${badClass[0].slice(0, 40)}…`);

  for (const marker of spec.markers) {
    if (!html.includes(marker)) note(name, `marqueur absent — ${marker}`);
  }
}

if (problems.length > 0) {
  for (const p of problems) process.stderr.write(`[templates] ✖ ${p}\n`);
  process.stderr.write(`\n[templates] ${problems.length} problème(s).\n`);
  process.exit(1);
}
process.stdout.write(`[templates] ${Object.keys(TEMPLATES).length} modèles valides.\n`);
