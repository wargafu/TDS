/**
 * TDGS pagination tokens
 *
 * Liste de liens de pages + précédent/suivant. La page courante se marque
 * avec aria-current="page" ; précédent/suivant désactivés utilisent
 * aria-disabled="true" plutôt que de supprimer le lien (garde la sémantique).
 */

export const pagination = {
  defaults: {
    gap: 'var(--tds-pagination-gap)',
    itemSize: 'var(--tds-pagination-item-size)',
    itemColor: 'var(--tds-pagination-item-color)',
    itemHoverBackground: 'var(--tds-pagination-item-hover-bg)',
    radius: 'var(--tds-pagination-radius)',
  },
  current: {
    background: 'var(--tds-pagination-current-bg)',
    color: 'var(--tds-pagination-current-color)',
  },
  states: {
    disabled: {
      color: 'var(--tds-pagination-disabled-color)',
      cursor: 'not-allowed',
    },
    focusVisible: {
      outline: 'var(--tds-pagination-focus-outline)',
      outlineOffset: 'var(--tds-pagination-focus-outline-offset)',
    },
  },
} as const;

export type PaginationTokens = typeof pagination;

export default pagination;
