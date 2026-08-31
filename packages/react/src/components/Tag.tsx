import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type TagVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type TagSize = 'sm' | 'md';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  size?: TagSize;
  dot?: boolean;
  onRemove?: () => void;
  removeLabel?: string;
}

export function Tag({
  variant = 'default',
  size = 'md',
  dot = false,
  onRemove,
  removeLabel = 'Retirer',
  className,
  children,
  ...rest
}: TagProps): ReactElement {
  const removeProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: 'button',
    className: 'tds-tag__remove',
    'aria-label': removeLabel,
    onClick: onRemove,
  };

  return (
    <span className={cx('tds-tag', `tds-tag--${variant}`, `tds-tag--${size}`, className)} {...rest}>
      {dot && <span className="tds-tag__dot" aria-hidden="true" />}
      <span>{children as ReactNode}</span>
      {onRemove && (
        <button {...removeProps}>
          <span aria-hidden="true">×</span>
        </button>
      )}
    </span>
  );
}
