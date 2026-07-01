export const table = {
  defaults: {
    headerBackground: 'var(--tds-neutral-100)',
    headerText: 'var(--tds-neutral-800)',
    borderColor: 'var(--tds-neutral-200)',
    stripedBackground: 'var(--tds-neutral-100)',
    cellPadding: 'var(--tds-spacing-3) var(--tds-spacing-4)',
  },
} as const;

export type TableTokens = typeof table;
export default table;
