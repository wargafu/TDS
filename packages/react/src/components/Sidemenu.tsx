import type { ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface SidemenuItem {
  id: string;
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface SidemenuProps {
  /** Titre de la section (facultatif). */
  title?: string;
  /** Libellé accessible de la navigation. */
  ariaLabel?: string;
  items: SidemenuItem[];
  /** Version sans fond ni bordure (pour une colonne de contenu). */
  inline?: boolean;
  className?: string;
}

export function Sidemenu({
  title,
  ariaLabel,
  items,
  inline,
  className,
}: SidemenuProps): ReactElement {
  return (
    <nav
      className={cx('tds-sidemenu', inline ? 'tds-sidemenu--inline' : undefined, className)}
      aria-label={ariaLabel ?? title}
    >
      {title && <p className="tds-sidemenu__title">{title}</p>}
      <ul className="tds-sidemenu__list">
        {items.map((item) => (
          <li className="tds-sidemenu__item" key={item.id}>
            <a
              href={item.href}
              className="tds-sidemenu__link"
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
