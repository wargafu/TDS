/**
 * TDS input tokens
 *
 * Ce fichier formalise les variantes, tailles et états des champs de formulaire TDS.
 * Il reste limité, accessible et aligné sur les tokens TDS existants.
 */
export const input = {
  defaults: {
    variant: 'default' as const,
    size: 'md' as const,
    radius: 'var(--tds-input-radius)',
    transition: 'border-color var(--tds-motion-fast) var(--tds-easing-standard), background-color var(--tds-motion-fast) var(--tds-easing-standard), color var(--tds-motion-fast) var(--tds-easing-standard)',
    focusOutline: 'var(--tds-input-focus-outline)',
    focusOutlineOffset: '2px'
  },
  variants: {
    default: {
      border: 'var(--tds-input-border)',
      background: 'var(--tds-input-bg)',
      text: 'var(--tds-input-text)',
      placeholder: 'var(--tds-input-placeholder)',
      focusBorder: 'var(--tds-input-border-focus)',
      icon: 'var(--tds-input-icon-color)'
    },
    error: {
      border: 'var(--tds-input-border-error)',
      background: 'var(--tds-input-bg)',
      text: 'var(--tds-input-text)',
      placeholder: 'var(--tds-input-placeholder)',
      focusBorder: 'var(--tds-input-border-error)',
      icon: 'var(--tds-input-icon-error)'
    },
    success: {
      background: 'var(--tds-input-bg)',
      border: 'var(--tds-input-border-success)',
      text: 'var(--tds-input-text)',
      placeholder: 'var(--tds-input-placeholder)',
      focusBorder: 'var(--tds-input-border-success)',
      icon: 'var(--tds-input-icon-success)'
    },
    disabled: {
      border: 'var(--tds-input-border-disabled)',
      background: 'var(--tds-input-bg-disabled)',
      text: 'var(--tds-input-text-disabled)',
      placeholder: 'var(--tds-input-placeholder-disabled)',
      icon: 'var(--tds-input-icon-disabled)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'var(--tds-input-font-size-sm)',
      lineHeight: 'var(--tds-input-line-height-sm)',
      padding: 'var(--tds-input-padding-sm)',
      minHeight: 'var(--tds-input-min-height)'
    },
    md: {
      fontSize: 'var(--tds-input-font-size-md)',
      lineHeight: 'var(--tds-input-line-height-md)',
      padding: 'var(--tds-input-padding-md)',
      minHeight: 'var(--tds-input-min-height)'
    },
    lg: {
      fontSize: 'var(--tds-input-font-size-lg)',
      lineHeight: 'var(--tds-input-line-height-lg)',
      padding: 'var(--tds-input-padding-lg)',
      minHeight: 'var(--tds-input-min-height-lg)'
    }
  },
  fieldset: {
    gap: 'var(--tds-fieldset-gap)',
    elementGap: 'var(--tds-fieldset-element-gap)',
    messagesGap: 'var(--tds-messages-gap)'
  },
  states: {
    focus: {
      outline: 'var(--tds-input-focus-outline)',
      outlineOffset: 'var(--tds-input-focus-outline-offset)'
    },
    disabled: {
      cursor: 'not-allowed',
      opacity: '0.75'
    },
    readonly: {
      background: 'var(--tds-input-bg-disabled)'
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
