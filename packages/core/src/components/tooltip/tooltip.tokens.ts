/**
 * TDS tooltip tokens
 *
 * CSS pur, basé sur :hover/:focus-visible + attribut natif title en repli.
 * Ne s'affiche pas au simple tap tactile — limitation connue documentée.
 */

export const tooltip = {
  defaults: {
    background: 'var(--tds-tooltip-bg)',
    color: 'var(--tds-tooltip-color)',
    padding: 'var(--tds-tooltip-padding)',
    radius: 'var(--tds-tooltip-radius)',
    fontSize: 'var(--tds-tooltip-font-size)',
    maxWidth: 'var(--tds-tooltip-max-width)',
    zIndex: 'var(--tds-z-tooltip)',
    offset: 'var(--tds-tooltip-offset)',
  },
} as const;

export type TooltipTokens = typeof tooltip;

export default tooltip;
