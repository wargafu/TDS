/**
 * DSTD input tokens
 *
 * Ce fichier formalise les variantes, tailles et états des champs de formulaire DSTD.
 * Il reste limité, accessible et aligné sur les tokens DSTD existants.
 */
export const input = {
  defaults: {
    variant: 'default' as const,
    size: 'md' as const,
    radius: 'var(--dstd-input-radius)',
    transition: 'border-color var(--dstd-motion-fast) var(--dstd-easing-standard), background-color var(--dstd-motion-fast) var(--dstd-easing-standard), color var(--dstd-motion-fast) var(--dstd-easing-standard)',
    focusOutline: 'var(--dstd-input-focus-outline)',
    focusOutlineOffset: '2px'
  },
  variants: {
    default: {
      border: 'var(--dstd-input-border)',
      background: 'var(--dstd-input-bg)',
      text: 'var(--dstd-input-text)',
      placeholder: 'var(--dstd-input-placeholder)',
      focusBorder: 'var(--dstd-input-border-focus)',
      icon: 'var(--dstd-input-icon-color)'
    },
    error: {
      border: 'var(--dstd-input-border-error)',
      background: 'var(--dstd-input-bg)',
      text: 'var(--dstd-input-text)',
      placeholder: 'var(--dstd-input-placeholder)',
      focusBorder: 'var(--dstd-input-border-error)',
      icon: 'var(--dstd-input-icon-error)'
    },
    success: {
      background: 'var(--dstd-input-bg)',
      border: 'var(--dstd-input-border-success)',
      text: 'var(--dstd-input-text)',
      placeholder: 'var(--dstd-input-placeholder)',
      focusBorder: 'var(--dstd-input-border-success)',
      icon: 'var(--dstd-input-icon-success)'
    },
    disabled: {
      border: 'var(--dstd-input-border-disabled)',
      background: 'var(--dstd-input-bg-disabled)',
      text: 'var(--dstd-input-text-disabled)',
      placeholder: 'var(--dstd-input-placeholder-disabled)',
      icon: 'var(--dstd-input-icon-disabled)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'var(--dstd-input-font-size-sm)',
      lineHeight: 'var(--dstd-input-line-height-sm)',
      padding: 'var(--dstd-input-padding-sm)',
      minHeight: 'var(--dstd-input-min-height)'
    },
    md: {
      fontSize: 'var(--dstd-input-font-size-md)',
      lineHeight: 'var(--dstd-input-line-height-md)',
      padding: 'var(--dstd-input-padding-md)',
      minHeight: 'var(--dstd-input-min-height)'
    },
    lg: {
      fontSize: 'var(--dstd-input-font-size-lg)',
      lineHeight: 'var(--dstd-input-line-height-lg)',
      padding: 'var(--dstd-input-padding-lg)',
      minHeight: 'var(--dstd-input-min-height-lg)'
    }
  },
  fieldset: {
    gap: 'var(--dstd-fieldset-gap)',
    elementGap: 'var(--dstd-fieldset-element-gap)',
    messagesGap: 'var(--dstd-messages-gap)'
  },
  states: {
    focus: {
      outline: 'var(--dstd-input-focus-outline)',
      outlineOffset: 'var(--dstd-input-focus-outline-offset)'
    },
    disabled: {
      cursor: 'not-allowed',
      opacity: '0.75'
    },
    readonly: {
      background: 'var(--dstd-input-bg-disabled)'
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
