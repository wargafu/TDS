export const alert = {
  variants: {
    info: {
      background: 'var(--dstd-semantic-info-bg)',
      border: 'var(--dstd-semantic-info-border)',
      text: 'var(--dstd-semantic-info-text)',
      icon: 'var(--dstd-semantic-info-icon)',
    },
    success: {
      background: 'var(--dstd-semantic-success-bg)',
      border: 'var(--dstd-semantic-success-border)',
      text: 'var(--dstd-semantic-success-text)',
      icon: 'var(--dstd-semantic-success-icon)',
    },
    warning: {
      background: 'var(--dstd-semantic-warning-bg)',
      border: 'var(--dstd-semantic-warning-border)',
      text: 'var(--dstd-semantic-warning-text)',
      icon: 'var(--dstd-semantic-warning-icon)',
    },
    danger: {
      background: 'var(--dstd-semantic-danger-bg)',
      border: 'var(--dstd-semantic-danger-border)',
      text: 'var(--dstd-semantic-danger-text)',
      icon: 'var(--dstd-semantic-danger-icon)',
    },
  },
} as const;

export type AlertVariant = keyof typeof alert.variants;
export type AlertTokens = typeof alert;
export default alert;
