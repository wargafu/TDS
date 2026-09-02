/** TDGS password tokens — champ mot de passe avec révélation. */
export const password = {
  defaults: {
    background: 'var(--tds-password-bg)',
    border: 'var(--tds-password-border)',
    color: 'var(--tds-password-color)',
    radius: 'var(--tds-password-radius)',
  },
} as const;

export type PasswordTokens = typeof password;
export default password;
