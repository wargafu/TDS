/** TDGS segmented tokens — contrôle segmenté. */
export const segmented = {
  defaults: {
    background: 'var(--tds-segmented-bg)',
    border: 'var(--tds-segmented-border)',
    selectedBackground: 'var(--tds-segmented-selected-bg)',
    selectedText: 'var(--tds-segmented-selected-text)',
    color: 'var(--tds-segmented-text)',
  },
} as const;

export type SegmentedTokens = typeof segmented;
export default segmented;
