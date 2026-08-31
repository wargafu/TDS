import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  compact?: boolean;
}

export function Header({ compact = false, className, children, ...rest }: HeaderProps): ReactElement {
  return (
    <header className={cx('tds-header', compact && 'tds-header--compact', className)} {...rest}>
      {children}
    </header>
  );
}

export interface HeaderBrandProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'title'> {
  href?: string;
  logoSrc: string;
  logoAlt: string;
  title: ReactNode;
  tagline?: ReactNode;
}

export function HeaderBrand({
  href = '/',
  logoSrc,
  logoAlt,
  title,
  tagline,
  className,
  ...rest
}: HeaderBrandProps): ReactElement {
  return (
    <a href={href} className={cx('tds-header__brand', className)} {...rest}>
      <img src={logoSrc} alt={logoAlt} className="tds-header__logo" />
      <div className="tds-header__titles">
        <span className="tds-header__title">{title}</span>
        {tagline && <span className="tds-header__tagline">{tagline}</span>}
      </div>
    </a>
  );
}

export function HeaderActions({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-header__actions', className)} {...rest} />;
}

export function HeaderStripe(): ReactElement {
  return (
    <div className="tds-header__stripe" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

Header.Brand = HeaderBrand;
Header.Actions = HeaderActions;
Header.Stripe = HeaderStripe;
