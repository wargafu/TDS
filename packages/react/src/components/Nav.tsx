import type { HTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface NavProps extends HTMLAttributes<HTMLElement> {
  items: NavItem[];
  label?: string;
  muted?: boolean;
}

export function Nav({ items, label = 'Navigation principale', muted = false, className, ...rest }: NavProps): ReactElement {
  return (
    <nav className={cx('tds-nav', muted && 'tds-nav--muted', className)} aria-label={label} {...rest}>
      <ul className="tds-nav__list">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="tds-nav__link"
              aria-current={item.current ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
