export const table = {
  defaults: {
    headerBackground: 'var(--dstd-neutral-100)',
    headerText: 'var(--dstd-neutral-800)',
    borderColor: 'var(--dstd-neutral-200)',
    stripedBackground: 'var(--dstd-neutral-100)',
    cellPadding: 'var(--dstd-spacing-3) var(--dstd-spacing-4)',
  },
} as const;

export type TableTokens = typeof table;
export default table;
