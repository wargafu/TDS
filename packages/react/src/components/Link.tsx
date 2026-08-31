import { forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export type LinkVariant = 'default' | 'muted' | 'danger' | 'external' | 'nav' | 'standalone';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = 'default', className, target, rel, children, ...rest },
  ref
) {
  const isExternal = variant === 'external';
  return (
    <a
      ref={ref}
      className={cx('tds-link', variant !== 'default' && `tds-link--${variant}`, className)}
      target={isExternal ? (target ?? '_blank') : target}
      rel={isExternal ? (rel ?? 'noopener noreferrer') : rel}
      {...rest}
    >
      {children}
    </a>
  );
});
