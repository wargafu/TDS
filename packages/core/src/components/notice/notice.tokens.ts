/** TDGS notice tokens — bandeau d'information prioritaire. */
export const notice = {
  defaults: {
    background: 'var(--tds-notice-bg)',
    border: 'var(--tds-notice-border)',
    accent: 'var(--tds-notice-accent)',
    color: 'var(--tds-notice-color)',
  },
  variants: {
    info: {
      background: 'var(--tds-semantic-info-bg)',
      border: 'var(--tds-semantic-info-border)',
      accent: 'var(--tds-semantic-info-icon)',
      color: 'var(--tds-semantic-info-text)',
    },
    success: {
      background: 'var(--tds-semantic-success-bg)',
      border: 'var(--tds-semantic-success-border)',
      accent: 'var(--tds-semantic-success-icon)',
      color: 'var(--tds-semantic-success-text)',
    },
    warning: {
      background: 'var(--tds-semantic-warning-bg)',
      border: 'var(--tds-semantic-warning-border)',
      accent: 'var(--tds-semantic-warning-icon)',
      color: 'var(--tds-semantic-warning-text)',
    },
    danger: {
      background: 'var(--tds-semantic-danger-bg)',
      border: 'var(--tds-semantic-danger-border)',
      accent: 'var(--tds-semantic-danger-icon)',
      color: 'var(--tds-semantic-danger-text)',
    },
  },
} as const;

export type NoticeVariant = keyof typeof notice.variants;
export type NoticeTokens = typeof notice;
export default notice;
