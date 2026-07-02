/**
 * TDS footer tokens
 *
 * Pied de page institutionnel : liens légaux, logo secondaire, mentions.
 */

export const footer = {
  defaults: {
    background: 'var(--tds-footer-bg)',
    color: 'var(--tds-footer-color)',
    borderColor: 'var(--tds-footer-border)',
    padding: 'var(--tds-footer-padding)',
    gap: 'var(--tds-footer-gap)',
  },
  link: {
    color: 'var(--tds-footer-link-color)',
    hoverColor: 'var(--tds-footer-link-hover-color)',
  },
} as const;

export type FooterTokens = typeof footer;

export default footer;
