/**
 * TDGS modal tokens
 *
 * Habille l'élément HTML natif <dialog> (showModal()/close() côté
 * consommateur — le CSS seul ne peut pas ouvrir un dialog natif).
 * Le focus trap et la fermeture Échap sont gérés nativement par <dialog>.
 */

export const modal = {
  defaults: {
    background: 'var(--tds-modal-bg)',
    radius: 'var(--tds-modal-radius)',
    padding: 'var(--tds-modal-padding)',
    shadow: 'var(--tds-modal-shadow)',
    backdropBackground: 'var(--tds-modal-backdrop-bg)',
    gap: 'var(--tds-modal-gap)',
  },
  sizes: {
    sm: {
      maxWidth: 'var(--tds-modal-max-width-sm)',
    },
    md: {
      maxWidth: 'var(--tds-modal-max-width-md)',
    },
    lg: {
      maxWidth: 'var(--tds-modal-max-width-lg)',
    },
  },
  states: {
    focusVisible: {
      outline: 'var(--tds-modal-focus-outline)',
      outlineOffset: 'var(--tds-modal-focus-outline-offset)',
    },
  },
} as const;

export type ModalSize = keyof typeof modal.sizes;
export type ModalTokens = typeof modal;

export default modal;
