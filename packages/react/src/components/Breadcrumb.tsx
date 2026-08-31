import type { HTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  label?: string;
}

export function Breadcrumb({
  items,
  label = "Fil d'Ariane",
  className,
  ...rest
}: BreadcrumbProps): ReactElement {
  return (
    <nav className={cx('tds-breadcrumb', className)} aria-label={label} {...rest}>
      <ol className="tds-breadcrumb__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li className="tds-breadcrumb__item" key={`${item.label}-${index}`}>
              {isCurrent || !item.href ? (
                <span className="tds-breadcrumb__current" aria-current={isCurrent ? 'page' : undefined}>
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="tds-breadcrumb__link">
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
