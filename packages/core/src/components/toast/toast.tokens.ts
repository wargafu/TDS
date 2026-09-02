/** TDGS toast tokens — retour d'information transitoire, non bloquant. */
export const toast = {
  defaults: {
    background: 'var(--tds-toast-bg)',
    color: 'var(--tds-toast-color)',
    border: 'var(--tds-toast-border)',
    accent: 'var(--tds-toast-accent)',
    radius: 'var(--tds-toast-radius)',
    shadow: 'var(--tds-toast-shadow)',
    width: 'var(--tds-toast-width)',
  },
  variants: {
    info: { accent: 'var(--tds-action-primary)' },
    success: { accent: 'var(--tds-semantic-success-icon)' },
    warning: { accent: 'var(--tds-semantic-warning-icon)' },
    danger: { accent: 'var(--tds-semantic-danger-icon)' },
  },
} as const;

export type ToastVariant = keyof typeof toast.variants;
export type ToastTokens = typeof toast;
export default toast;
