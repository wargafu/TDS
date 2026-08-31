/** TDGS progress indicator tokens. */
export const progress = {
  layout: { gap: 'var(--tds-progress-gap)' },
  track: {
    background: 'var(--tds-progress-track)',
    height: 'var(--tds-progress-height)',
  },
  indicator: {
    background: 'var(--tds-progress-indicator)',
    successBackground: 'var(--tds-progress-success)',
    warningBackground: 'var(--tds-progress-warning)',
    dangerBackground: 'var(--tds-progress-danger)',
  },
} as const;

export type ProgressTokens = typeof progress;
export default progress;
