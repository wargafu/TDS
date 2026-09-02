/** TDGS logo tokens — bloc de marque institutionnel. */
export const logo = {
  defaults: {
    color: 'var(--tds-logo-text)',
    muted: 'var(--tds-logo-muted)',
    accent: 'var(--tds-logo-accent)',
    markBackground: 'var(--tds-logo-mark-bg)',
  },
} as const;

export type LogoTokens = typeof logo;
export default logo;
