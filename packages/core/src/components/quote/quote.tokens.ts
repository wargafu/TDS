/** TDGS quote tokens — citation ou témoignage contextualisé. */
export const quote = {
  defaults: {
    background: 'var(--tds-quote-bg)',
    border: 'var(--tds-quote-border)',
    accent: 'var(--tds-quote-accent)',
    color: 'var(--tds-quote-color)',
  },
} as const;

export type QuoteTokens = typeof quote;
export default quote;
