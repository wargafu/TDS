import type { ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type ShareNetwork = 'x' | 'linkedin' | 'facebook' | 'mail';

export interface ShareLink {
  network: ShareNetwork;
  /** Libellé accessible et visible (sauf en mode icon-only). */
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface ShareProps {
  /** Titre de la section « Partager ». */
  title?: string;
  links: ShareLink[];
  /** Affiche uniquement les icônes. */
  iconOnly?: boolean;
  className?: string;
}

export function Share({ title, links, iconOnly, className }: ShareProps): ReactElement {
  return (
    <div className={cx('tds-share', className)}>
      {title && <p className="tds-share__title">{title}</p>}
      <ul className="tds-share__list">
        {links.map((link) => (
          <li className="tds-share__item" key={`${link.network}-${link.href}`}>
            <a
              href={link.href}
              className={cx(
                'tds-share__link',
                `tds-share__link-${link.network}`,
                iconOnly ? 'tds-share__link-icon' : undefined
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
              {!iconOnly && <span>{link.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
