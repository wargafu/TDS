/**
 * TDS tabs tokens
 *
 * Nécessite un minimum de JavaScript (bascule de aria-selected/hidden et
 * navigation flèches gauche/droite — voir la doc pour le script de
 * référence WAI-ARIA Authoring Practices).
 */

export const tabs = {
  defaults: {
    borderColor: 'var(--tds-tabs-border)',
    gap: 'var(--tds-tabs-gap)',
    triggerPadding: 'var(--tds-tabs-trigger-padding)',
    triggerColor: 'var(--tds-tabs-trigger-color)',
    triggerHoverColor: 'var(--tds-tabs-trigger-hover-color)',
    panelPadding: 'var(--tds-tabs-panel-padding)',
  },
  current: {
    color: 'var(--tds-tabs-current-color)',
    borderColor: 'var(--tds-tabs-current-border)',
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-tabs-focus-outline)',
      outlineOffset: 'var(--tds-tabs-focus-outline-offset)',
    },
  },
} as const;

export type TabsTokens = typeof tabs;

export default tabs;
