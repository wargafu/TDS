export const alert = {
  variants: {
    info: {
      background: 'var(--tds-semantic-info-bg)',
      border: 'var(--tds-semantic-info-border)',
      text: 'var(--tds-semantic-info-text)',
      icon: 'var(--tds-semantic-info-icon)',
    },
    success: {
      background: 'var(--tds-semantic-success-bg)',
      border: 'var(--tds-semantic-success-border)',
      text: 'var(--tds-semantic-success-text)',
      icon: 'var(--tds-semantic-success-icon)',
    },
    warning: {
      background: 'var(--tds-semantic-warning-bg)',
      border: 'var(--tds-semantic-warning-border)',
      text: 'var(--tds-semantic-warning-text)',
      icon: 'var(--tds-semantic-warning-icon)',
    },
    danger: {
      background: 'var(--tds-semantic-danger-bg)',
      border: 'var(--tds-semantic-danger-border)',
      text: 'var(--tds-semantic-danger-text)',
      icon: 'var(--tds-semantic-danger-icon)',
    },
  },
} as const;

export type AlertVariant = keyof typeof alert.variants;
export type AlertTokens = typeof alert;
export default alert;
