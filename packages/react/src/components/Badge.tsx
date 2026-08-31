import type { HTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  square?: boolean;
  dot?: boolean;
}

export function Badge({
  variant = 'default',
  size = 'md',
  square = false,
  dot = false,
  className,
  children,
  ...rest
}: BadgeProps): ReactElement {
  return (
    <span
      className={cx(
        'tds-badge',
        `tds-badge--${variant}`,
        `tds-badge--${size}`,
        square && 'tds-badge--square',
        className
      )}
      {...rest}
    >
      {dot && <span className="tds-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
