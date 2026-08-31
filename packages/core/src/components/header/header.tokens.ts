/**
 * TDGS header tokens
 *
 * En-tête institutionnel : zone de marque (logo + titre + tagline) et bandeau
 * tricolore. Reste sobre et laisse la navigation/actions en zone libre.
 */

export const header = {
  defaults: {
    background: 'var(--tds-header-bg)',
    borderColor: 'var(--tds-header-border)',
    minHeight: 'var(--tds-header-min-height)',
    padding: 'var(--tds-header-padding)',
  },
  brand: {
    gap: 'var(--tds-header-brand-gap)',
    titleColor: 'var(--tds-header-title-color)',
    titleWeight: 'var(--tds-font-weight-semibold)',
    titleSize: 'var(--tds-font-size-lg)',
    taglineColor: 'var(--tds-header-tagline-color)',
    taglineSize: 'var(--tds-font-size-sm)',
  },
  stripe: {
    height: 'var(--tds-header-stripe-height)',
    blue: 'var(--tds-color-blue-500)',
    yellow: 'var(--tds-color-yellow-500)',
    red: 'var(--tds-color-red-500)',
  },
  variants: {
    default: {
      minHeight: 'var(--tds-header-min-height)',
    },
    compact: {
      minHeight: 'var(--tds-header-min-height-compact)',
    },
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-header-focus-outline)',
      outlineOffset: 'var(--tds-header-focus-outline-offset)',
    },
  },
} as const;

export type HeaderVariant = keyof typeof header.variants;
export type HeaderTokens = typeof header;

export default header;
