import type { AnchorHTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

export interface SkipLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
}

export function SkipLink({
  targetId = 'main-content',
  href,
  className,
  children = 'Aller au contenu principal',
  ...rest
}: SkipLinkProps): ReactElement {
  return (
    <a href={href ?? `#${targetId}`} className={cx('tds-skip-link', className)} {...rest}>
      {children}
    </a>
  );
}
