export const card = {
  defaults: {
    background: 'var(--tds-neutral-0)',
    border: 'var(--tds-neutral-200)',
    radius: 'var(--tds-radius-md)',
    padding: 'var(--tds-spacing-5)',
  },
  variants: {
    flat:     { shadow: 'none',                    border: 'var(--tds-neutral-200)' },
    elevated: { shadow: 'var(--tds-shadow-sm)',   border: 'var(--tds-neutral-200)' },
    outlined: { shadow: 'none',                    border: 'var(--tds-neutral-300)' },
  },
} as const;

export type CardVariant = keyof typeof card.variants;
export type CardTokens = typeof card;
export default card;
