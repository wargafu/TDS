/** Constantes globales du site de documentation. */
export const SITE = {
  name: 'TDGS',
  longName: 'TDGS — Tchad Design System',
  tagline: 'Système de design open source proposé pour les services numériques publics du Tchad.',
  repo: 'https://github.com/kisaigo/TDGS',
  editBase: 'https://github.com/kisaigo/TDGS/edit/main/apps/docs/src/content/docs/',
} as const;

/** Préfixe de base ('' ou '/TDGS'), sans slash final. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Construit une URL interne absolue tenant compte du base path. */
export function url(path = '/'): string {
  const clean = `/${path}`.replace(/\/{2,}/g, '/');
  return `${BASE}${clean}`;
}

/** Chemin d'une page de doc à partir de son slug de collection. */
export function docHref(slug: string): string {
  if (slug === 'index') return url('/');
  const s = slug.replace(/\/index$/, '');
  return url(`/${s}/`);
}
