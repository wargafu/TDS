/** TDGS share tokens — boutons de partage réseau. */
export const share = {
  defaults: {
    background: 'var(--tds-share-bg)',
    border: 'var(--tds-share-border)',
    color: 'var(--tds-share-text)',
    muted: 'var(--tds-share-muted)',
    hover: 'var(--tds-share-hover)',
  },
} as const;

export type ShareTokens = typeof share;
export default share;
