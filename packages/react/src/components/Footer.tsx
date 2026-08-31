import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface FooterProps extends HTMLAttributes<HTMLElement> {}

export function Footer({ className, children, ...rest }: FooterProps): ReactElement {
  return (
    <footer className={cx('tds-footer', className)} {...rest}>
      {children}
    </footer>
  );
}

export function FooterTop({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-footer__top', className)} {...rest} />;
}

export function FooterBottom({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-footer__bottom', className)} {...rest} />;
}

export function FooterBrand({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-footer__brand', className)} {...rest} />;
}

export interface FooterNavProps extends HTMLAttributes<HTMLElement> {
  label?: string;
}

export function FooterNav({ label = 'Liens du pied de page', className, ...rest }: FooterNavProps): ReactElement {
  return <nav className={cx('tds-footer__nav', className)} aria-label={label} {...rest} />;
}

export interface FooterNavGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  links: { label: string; href: string }[];
}

export function FooterNavGroup({ title, links, className, ...rest }: FooterNavGroupProps): ReactElement {
  return (
    <div className={cx('tds-footer__nav-group', className)} {...rest}>
      <div className="tds-footer__nav-title">{title}</div>
      {links.map((link) => (
        <a key={link.href} href={link.href} className="tds-footer__link">
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function FooterLink({ className, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>): ReactElement {
  return <a className={cx('tds-footer__link', className)} {...rest} />;
}

export function FooterLegal({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-footer__legal', className)} {...rest} />;
}

Footer.Top = FooterTop;
Footer.Bottom = FooterBottom;
Footer.Brand = FooterBrand;
Footer.Nav = FooterNav;
Footer.NavGroup = FooterNavGroup;
Footer.Link = FooterLink;
Footer.Legal = FooterLegal;
