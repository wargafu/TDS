/** TDGS tile tokens — entrée de navigation vers un service ou une rubrique. */
export const tile = {
  defaults: {
    background: 'var(--tds-tile-bg)',
    border: 'var(--tds-tile-border)',
    color: 'var(--tds-tile-color)',
    padding: 'var(--tds-tile-padding)',
  },
  variants: {
    default: { shadow: 'none' },
    elevated: { shadow: 'var(--tds-shadow-sm)' },
  },
} as const;

export type TileVariant = keyof typeof tile.variants;
export type TileTokens = typeof tile;
export default tile;
