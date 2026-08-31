import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type TileVariant = 'default' | 'elevated';

export interface TileProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  href: string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  variant?: TileVariant;
}

export function Tile({
  href,
  title,
  description,
  icon,
  variant = 'default',
  className,
  children,
  ...rest
}: TileProps): ReactElement {
  return (
    <a href={href} className={cx('tds-tile', `tds-tile--${variant}`, className)} {...rest}>
      {icon && (
        <span className="tds-tile__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="tds-tile__content">
        <span className="tds-tile__title">{title}</span>
        {description && <span className="tds-tile__description">{description}</span>}
        {children && <span className="tds-tile__body">{children}</span>}
      </span>
      <span className="tds-tile__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
