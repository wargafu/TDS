/**
 * TDS button tokens
 *
 * Ce fichier formalise les variantes, tailles et comportements officiels du système
 * de boutons TDS. Il reste sobre, accessible et aligné sur les tokens existants.
 */
export const button = {
  defaults: {
    variant: 'primary' as const,
    size: 'md' as const,
    fontFamily: 'var(--tds-font-family-primary)',
    fontWeight: 'var(--tds-text-button-weight)',
    textTransform: 'none' as const,
    transition: 'background-color var(--tds-motion-fast) var(--tds-easing-standard), color var(--tds-motion-fast) var(--tds-easing-standard), border-color var(--tds-motion-fast) var(--tds-easing-standard), box-shadow var(--tds-motion-fast) var(--tds-easing-standard)',
    focusOutline: '2px solid var(--tds-color-blue-500)',
    focusOutlineOffset: '3px',
    minHeight: 'var(--tds-button-min-height)'
  },
  variants: {
    primary: {
      background: 'var(--tds-button-primary-bg)',
      text: 'var(--tds-button-primary-text)',
      border: 'var(--tds-button-primary-border)',
      hoverBackground: 'var(--tds-button-primary-hover-bg)',
      hoverBorder: 'var(--tds-button-primary-hover-border)',
      activeBackground: 'var(--tds-button-primary-active-bg)',
      activeBorder: 'var(--tds-button-primary-active-border)',
      disabledBackground: 'var(--tds-button-disabled-bg)',
      disabledText: 'var(--tds-button-disabled-text)',
      disabledBorder: 'var(--tds-button-disabled-border)'
    },
    secondary: {
      background: 'var(--tds-button-secondary-bg)',
      text: 'var(--tds-button-secondary-text)',
      border: 'var(--tds-button-secondary-border)',
      hoverBackground: 'var(--tds-button-secondary-hover-bg)',
      hoverBorder: 'var(--tds-button-secondary-hover-border)',
      activeBackground: 'var(--tds-button-secondary-active-bg)',
      activeBorder: 'var(--tds-button-secondary-active-border)',
      disabledBackground: 'var(--tds-button-disabled-bg)',
      disabledText: 'var(--tds-button-disabled-text)',
      disabledBorder: 'var(--tds-button-disabled-border)'
    },
    tertiary: {
      background: 'var(--tds-button-tertiary-bg)',
      text: 'var(--tds-button-tertiary-text)',
      border: 'var(--tds-button-tertiary-border)',
      hoverBackground: 'var(--tds-button-tertiary-hover-bg)',
      hoverBorder: 'var(--tds-button-tertiary-hover-border)',
      activeBackground: 'var(--tds-button-tertiary-active-bg)',
      activeBorder: 'var(--tds-button-tertiary-active-border)',
      disabledBackground: 'var(--tds-button-disabled-bg)',
      disabledText: 'var(--tds-button-disabled-text)',
      disabledBorder: 'var(--tds-button-disabled-border)'
    },
    danger: {
      background: 'var(--tds-button-danger-bg)',
      text: 'var(--tds-button-danger-text)',
      border: 'var(--tds-button-danger-border)',
      hoverBackground: 'var(--tds-button-danger-hover-bg)',
      hoverBorder: 'var(--tds-button-danger-hover-border)',
      activeBackground: 'var(--tds-button-danger-active-bg)',
      activeBorder: 'var(--tds-button-danger-active-border)',
      disabledBackground: 'var(--tds-button-disabled-bg)',
      disabledText: 'var(--tds-button-disabled-text)',
      disabledBorder: 'var(--tds-button-disabled-border)'
    },
    success: {
      background: 'var(--tds-button-success-bg)',
      text: 'var(--tds-button-success-text)',
      border: 'var(--tds-button-success-border)',
      hoverBackground: 'var(--tds-button-success-hover-bg)',
      hoverBorder: 'var(--tds-button-success-hover-border)',
      activeBackground: 'var(--tds-button-success-active-bg)',
      activeBorder: 'var(--tds-button-success-active-border)',
      disabledBackground: 'var(--tds-button-disabled-bg)',
      disabledText: 'var(--tds-button-disabled-text)',
      disabledBorder: 'var(--tds-button-disabled-border)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'var(--tds-button-font-size-sm)',
      lineHeight: 'var(--tds-button-line-height-sm)',
      padding: 'var(--tds-button-padding-sm)',
      minHeight: 'var(--tds-button-min-height)',
      radius: 'var(--tds-button-radius-sm)'
    },
    md: {
      fontSize: 'var(--tds-button-font-size-md)',
      lineHeight: 'var(--tds-button-line-height-md)',
      padding: 'var(--tds-button-padding-md)',
      minHeight: 'var(--tds-button-min-height)',
      radius: 'var(--tds-button-radius-md)'
    },
    lg: {
      fontSize: 'var(--tds-button-font-size-lg)',
      lineHeight: 'var(--tds-button-line-height-lg)',
      padding: 'var(--tds-button-padding-lg)',
      minHeight: 'var(--tds-button-min-height)',
      radius: 'var(--tds-button-radius-md)'
    }
  },
  states: {
    focus: {
      outline: 'var(--tds-button-focus-outline)',
      outlineOffset: 'var(--tds-button-focus-outline-offset)'
    },
    disabled: {
      cursor: 'not-allowed',
      opacity: '0.75'
    },
    loading: {
      cursor: 'progress'
    }
  }
} as const;

export type ButtonVariant = keyof typeof button.variants;
export type ButtonSize = keyof typeof button.sizes;
export type ButtonTokens = typeof button;
export default button;
