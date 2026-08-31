import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface SummaryItem {
  label: ReactNode;
  href: string;
}

export interface SummaryProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  items: SummaryItem[];
  title?: ReactNode;
  label?: string;
}

export function Summary({
  items,
  title = 'Sommaire',
  label = 'Sommaire de la page',
  className,
  ...rest
}: SummaryProps): ReactElement {
  return (
    <nav className={cx('tds-summary', className)} aria-label={label} {...rest}>
      <p className="tds-summary__title">{title}</p>
      <ol className="tds-summary__list">
        {items.map((item) => (
          <li key={item.href}>
            <a className="tds-summary__link" href={item.href}>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
