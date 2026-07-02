// Même ordre que les groupes définis dans le `sidebar` de astro.config.mjs —
// sert à SectionNav.astro (barre horizontale) et Sidebar.astro (menu
// latéral scopé) pour retrouver la section active à partir de l'URL et la
// page d'atterrissage de chaque section.
export const SECTION_PREFIXES = [
  'premiers-pas',
  'fondamentaux',
  'components',
  'modeles',
  'mesure-audience',
  'communaute',
  'aide',
  'about',
];
