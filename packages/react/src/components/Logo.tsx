import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface LogoProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /** Pictogramme / armoiries (slot décoratif). */
  mark: ReactNode;
  /** Nom de l'institution. */
  title: ReactNode;
  subtitle?: ReactNode;
  /** Version pour fonds sombres (en-tête institutionnel). */
  onDark?: boolean;
  /** URL optionnelle : rend un lien. */
  href?: string;
}

export function Logo({
  mark,
  title,
  subtitle,
  onDark,
  href,
  className,
  ...rest
}: LogoProps): ReactElement {
  const content = (
    <>
      <span className="tds-logo__mark" aria-hidden="true">
        {mark}
      </span>
      <span className="tds-logo__text">
        <span className="tds-logo__title">{title}</span>
        {subtitle && <span className="tds-logo__subtitle">{subtitle}</span>}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cx('tds-logo', onDark ? 'tds-logo--on-dark' : undefined, className)}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={cx('tds-logo', onDark ? 'tds-logo--on-dark' : undefined, className)}>
      {content}
    </span>
  );
}
