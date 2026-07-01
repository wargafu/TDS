/**
 * TDGS input tokens
 *
 * Ce fichier formalise les variantes, tailles et états des champs de formulaire TDGS.
 * Il reste limité, accessible et aligné sur les tokens TDGS existants.
 */
export const input = {
  defaults: {
    variant: 'default' as const,
    size: 'md' as const,
    radius: 'var(--tdgs-input-radius)',
    transition: 'border-color var(--tdgs-motion-fast) var(--tdgs-easing-standard), background-color var(--tdgs-motion-fast) var(--tdgs-easing-standard), color var(--tdgs-motion-fast) var(--tdgs-easing-standard)',
    focusOutline: 'var(--tdgs-input-focus-outline)',
    focusOutlineOffset: '2px'
  },
  variants: {
    default: {
      border: 'var(--tdgs-input-border)',
      background: 'var(--tdgs-input-bg)',
      text: 'var(--tdgs-input-text)',
      placeholder: 'var(--tdgs-input-placeholder)',
      focusBorder: 'var(--tdgs-input-border-focus)',
      icon: 'var(--tdgs-input-icon-color)'
    },
    error: {
      border: 'var(--tdgs-input-border-error)',
      background: 'var(--tdgs-input-bg)',
      text: 'var(--tdgs-input-text)',
      placeholder: 'var(--tdgs-input-placeholder)',
      focusBorder: 'var(--tdgs-input-border-error)',
      icon: 'var(--tdgs-input-icon-error)'
    },
    success: {
      background: 'var(--tdgs-input-bg)',
      border: 'var(--tdgs-input-border-success)',
      text: 'var(--tdgs-input-text)',
      placeholder: 'var(--tdgs-input-placeholder)',
      focusBorder: 'var(--tdgs-input-border-success)',
      icon: 'var(--tdgs-input-icon-success)'
    },
    disabled: {
      border: 'var(--tdgs-input-border-disabled)',
      background: 'var(--tdgs-input-bg-disabled)',
      text: 'var(--tdgs-input-text-disabled)',
      placeholder: 'var(--tdgs-input-placeholder-disabled)',
      icon: 'var(--tdgs-input-icon-disabled)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'var(--tdgs-input-font-size-sm)',
      lineHeight: 'var(--tdgs-input-line-height-sm)',
      padding: 'var(--tdgs-input-padding-sm)',
      minHeight: 'var(--tdgs-input-min-height)'
    },
    md: {
      fontSize: 'var(--tdgs-input-font-size-md)',
      lineHeight: 'var(--tdgs-input-line-height-md)',
      padding: 'var(--tdgs-input-padding-md)',
      minHeight: 'var(--tdgs-input-min-height)'
    },
    lg: {
      fontSize: 'var(--tdgs-input-font-size-lg)',
      lineHeight: 'var(--tdgs-input-line-height-lg)',
      padding: 'var(--tdgs-input-padding-lg)',
      minHeight: 'var(--tdgs-input-min-height-lg)'
    }
  },
  states: {
    focus: {
      outline: 'var(--tdgs-input-focus-outline)',
      outlineOffset: 'var(--tdgs-input-focus-outline-offset)'
    },
    disabled: {
      cursor: 'not-allowed',
      opacity: '0.75'
    },
    readonly: {
      background: 'var(--tdgs-input-bg-disabled)'
    },
    loading: {
      cursor: 'progress'
    }
  }
} as const;

export type InputVariant = keyof typeof input.variants;
export type InputSize = keyof typeof input.sizes;
export type InputState = keyof typeof input.states;
export type InputTokens = typeof input;
export default input;
