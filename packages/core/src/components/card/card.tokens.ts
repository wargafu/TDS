export const card = {
  defaults: {
    background: 'var(--dstd-neutral-0)',
    border: 'var(--dstd-neutral-200)',
    radius: 'var(--dstd-radius-md)',
    padding: 'var(--dstd-spacing-5)',
  },
  variants: {
    flat:     { shadow: 'none',                    border: 'var(--dstd-neutral-200)' },
    elevated: { shadow: 'var(--dstd-shadow-sm)',   border: 'var(--dstd-neutral-200)' },
    outlined: { shadow: 'none',                    border: 'var(--dstd-neutral-300)' },
  },
} as const;

export type CardVariant = keyof typeof card.variants;
export type CardTokens = typeof card;
export default card;
