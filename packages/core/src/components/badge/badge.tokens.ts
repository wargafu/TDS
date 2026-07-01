export const badge = {
  variants: {
    default: { background: 'var(--tds-neutral-100)',           text: 'var(--tds-neutral-700)',           border: 'var(--tds-neutral-200)'           },
    info:    { background: 'var(--tds-semantic-info-bg)',    text: 'var(--tds-semantic-info-text)',    border: 'var(--tds-semantic-info-border)'    },
    success: { background: 'var(--tds-semantic-success-bg)', text: 'var(--tds-semantic-success-text)', border: 'var(--tds-semantic-success-border)' },
    warning: { background: 'var(--tds-semantic-warning-bg)', text: 'var(--tds-semantic-warning-text)', border: 'var(--tds-semantic-warning-border)' },
    danger:  { background: 'var(--tds-semantic-danger-bg)',  text: 'var(--tds-semantic-danger-text)',  border: 'var(--tds-semantic-danger-border)'  },
  },
  sizes: {
    sm: { fontSize: 'var(--tds-font-size-xs)', padding: '0.1rem 0.375rem' },
    md: { fontSize: 'var(--tds-font-size-xs)', padding: '0.2rem 0.5rem'   },
  },
} as const;

export type BadgeVariant = keyof typeof badge.variants;
export type BadgeSize = keyof typeof badge.sizes;
export type BadgeTokens = typeof badge;
export default badge;
