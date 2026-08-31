/**
 * Icônes SVG minimales du TDGS.
 *
 * Les chemins sont volontairement indépendants de tout jeu d'icônes tiers.
 * Les bindings React et Vue ajoutent le SVG, les attributs d'accessibilité et
 * les classes de taille autour de cette source commune.
 */

export const iconPaths = {
  arrowRight: 'M5 12h14M13 6l6 6-6 6',
  check: 'M5 12l4 4L19 6',
  chevronDown: 'm6 9 6 6 6-6',
  close: 'M6 6l12 12M18 6 6 18',
  externalLink: 'M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
  info: 'M12 16v-4M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  menu: 'M4 6h16M4 12h16M4 18h16',
  minus: 'M5 12h14',
  plus: 'M12 5v14M5 12h14',
  search: 'm21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  upload: 'M12 16V4m0 0L7 9m5-5 5 5M5 20h14',
  warning: 'm12 4 9 16H3L12 4Zm0 6v4M12 17h.01',
} as const;

export type IconName = keyof typeof iconPaths;

export default iconPaths;
