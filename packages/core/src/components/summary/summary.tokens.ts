/** TDGS summary tokens — navigation vers les sections d'une page. */
export const summary = {
  defaults: {
    background: 'var(--tds-summary-bg)',
    border: 'var(--tds-summary-border)',
    accent: 'var(--tds-summary-accent)',
    color: 'var(--tds-summary-color)',
  },
} as const;

export type SummaryTokens = typeof summary;
export default summary;
