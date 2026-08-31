/**
 * TDGS breadcrumb tokens
 *
 * Fil d'Ariane. Le dernier élément est le texte courant (aria-current="page",
 * sans lien) ; les séparateurs sont générés en CSS, pas dans le HTML.
 */

export const breadcrumb = {
  defaults: {
    gap: 'var(--tds-breadcrumb-gap)',
    fontSize: 'var(--tds-font-size-sm)',
    linkColor: 'var(--tds-breadcrumb-link-color)',
    linkHoverColor: 'var(--tds-breadcrumb-link-hover-color)',
    currentColor: 'var(--tds-breadcrumb-current-color)',
    separatorColor: 'var(--tds-breadcrumb-separator-color)',
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-breadcrumb-focus-outline)',
      outlineOffset: 'var(--tds-breadcrumb-focus-outline-offset)',
    },
  },
} as const;

export type BreadcrumbTokens = typeof breadcrumb;

export default breadcrumb;
