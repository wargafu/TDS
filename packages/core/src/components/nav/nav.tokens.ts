/**
 * TDGS navigation tokens
 *
 * Navigation principale horizontale. L'état "current" (page active) se
 * marque via aria-current="page", pas une classe dédiée — cohérent avec
 * le HTML sémantique attendu du reste du système.
 */

export const nav = {
  defaults: {
    background: 'var(--tds-nav-bg)',
    borderColor: 'var(--tds-nav-border)',
    gap: 'var(--tds-nav-gap)',
    itemPadding: 'var(--tds-nav-item-padding)',
    itemColor: 'var(--tds-nav-item-color)',
    itemHoverColor: 'var(--tds-nav-item-hover-color)',
    itemHoverBackground: 'var(--tds-nav-item-hover-bg)',
  },
  current: {
    color: 'var(--tds-nav-current-color)',
    borderColor: 'var(--tds-nav-current-border)',
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-nav-focus-outline)',
      outlineOffset: 'var(--tds-nav-focus-outline-offset)',
    },
  },
} as const;

export type NavTokens = typeof nav;

export default nav;
