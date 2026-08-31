import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    type = 'button',
    loading = false,
    disabled,
    className,
    children,
    'aria-disabled': ariaDisabled,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      className={cx('tds-button', `tds-button--${variant}`, `tds-button--${size}`, className)}
      {...rest}
      disabled={isDisabled || undefined}
      aria-disabled={isDisabled || ariaDisabled || undefined}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
    >
      {children}
    </button>
  );
});
