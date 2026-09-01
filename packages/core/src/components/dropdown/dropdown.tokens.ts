/** TDGS dropdown tokens — menu déroulant. */
export const dropdown = {
  defaults: {
    background: 'var(--tds-dropdown-bg)',
    border: 'var(--tds-dropdown-border)',
    color: 'var(--tds-dropdown-text)',
    muted: 'var(--tds-dropdown-muted)',
    hoverBackground: 'var(--tds-dropdown-hover-bg)',
    active: 'var(--tds-dropdown-active)',
  },
} as const;

export type DropdownTokens = typeof dropdown;
export default dropdown;
