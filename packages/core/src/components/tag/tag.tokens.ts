/** TDGS tag tokens — classification et état non interactifs. */
export const tag = {
  variants: {
    default: {
      background: 'var(--tds-neutral-100)',
      border: 'var(--tds-neutral-200)',
      color: 'var(--tds-neutral-700)',
    },
    info: {
      background: 'var(--tds-semantic-info-bg)',
      border: 'var(--tds-semantic-info-border)',
      color: 'var(--tds-semantic-info-text)',
    },
    success: {
      background: 'var(--tds-semantic-success-bg)',
      border: 'var(--tds-semantic-success-border)',
      color: 'var(--tds-semantic-success-text)',
    },
    warning: {
      background: 'var(--tds-semantic-warning-bg)',
      border: 'var(--tds-semantic-warning-border)',
      color: 'var(--tds-semantic-warning-text)',
    },
    danger: {
      background: 'var(--tds-semantic-danger-bg)',
      border: 'var(--tds-semantic-danger-border)',
      color: 'var(--tds-semantic-danger-text)',
    },
  },
  sizes: {
    sm: {
      fontSize: 'var(--tds-font-size-xs)',
      padding: 'var(--tds-spacing-1) var(--tds-spacing-2)',
    },
    md: {
      fontSize: 'var(--tds-font-size-sm)',
      padding: 'var(--tds-spacing-1) var(--tds-spacing-3)',
    },
  },
} as const;

export type TagVariant = keyof typeof tag.variants;
export type TagSize = keyof typeof tag.sizes;
export type TagTokens = typeof tag;
export default tag;
