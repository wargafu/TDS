/** TDGS consent tokens — bandeau de gestion des cookies / mesure d'audience. */
export const consent = {
  defaults: {
    background: 'var(--tds-consent-bg)',
    color: 'var(--tds-consent-color)',
    border: 'var(--tds-consent-border)',
    radius: 'var(--tds-consent-radius)',
    shadow: 'var(--tds-consent-shadow)',
    maxWidth: 'var(--tds-consent-max)',
  },
} as const;

export type ConsentTokens = typeof consent;
export default consent;
