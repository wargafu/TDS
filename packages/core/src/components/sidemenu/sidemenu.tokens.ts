/** TDGS sidemenu tokens — navigation secondaire verticale. */
export const sidemenu = {
  defaults: {
    background: 'var(--tds-sidemenu-bg)',
    border: 'var(--tds-sidemenu-border)',
    color: 'var(--tds-sidemenu-text)',
    muted: 'var(--tds-sidemenu-muted)',
    active: 'var(--tds-sidemenu-active)',
    hoverBackground: 'var(--tds-sidemenu-hover-bg)',
  },
} as const;

export type SidemenuTokens = typeof sidemenu;
export default sidemenu;
