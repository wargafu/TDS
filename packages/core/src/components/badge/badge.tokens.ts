export const badge = {
  variants: {
    default: { background: 'var(--dstd-neutral-100)',           text: 'var(--dstd-neutral-700)',           border: 'var(--dstd-neutral-200)'           },
    info:    { background: 'var(--dstd-semantic-info-bg)',    text: 'var(--dstd-semantic-info-text)',    border: 'var(--dstd-semantic-info-border)'    },
    success: { background: 'var(--dstd-semantic-success-bg)', text: 'var(--dstd-semantic-success-text)', border: 'var(--dstd-semantic-success-border)' },
    warning: { background: 'var(--dstd-semantic-warning-bg)', text: 'var(--dstd-semantic-warning-text)', border: 'var(--dstd-semantic-warning-border)' },
    danger:  { background: 'var(--dstd-semantic-danger-bg)',  text: 'var(--dstd-semantic-danger-text)',  border: 'var(--dstd-semantic-danger-border)'  },
  },
  sizes: {
    sm: { fontSize: 'var(--dstd-font-size-xs)', padding: '0.1rem 0.375rem' },
    md: { fontSize: 'var(--dstd-font-size-xs)', padding: '0.2rem 0.5rem'   },
  },
} as const;

export type BadgeVariant = keyof typeof badge.variants;
export type BadgeSize = keyof typeof badge.sizes;
export type BadgeTokens = typeof badge;
export default badge;
