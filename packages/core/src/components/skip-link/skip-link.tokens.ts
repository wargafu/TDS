/**
 * TDS skip-link tokens
 *
 * Lien d'évitement : invisible par défaut, apparaît en haut à gauche au
 * focus clavier. Doit être le tout premier élément focusable du <body>.
 */

export const skipLink = {
  defaults: {
    background: 'var(--tds-skip-link-bg)',
    color: 'var(--tds-skip-link-color)',
    padding: 'var(--tds-skip-link-padding)',
    radius: 'var(--tds-skip-link-radius)',
    zIndex: 'var(--tds-z-modal)',
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-skip-link-focus-outline)',
      outlineOffset: 'var(--tds-skip-link-focus-outline-offset)',
    },
  },
} as const;

export type SkipLinkTokens = typeof skipLink;

export default skipLink;
