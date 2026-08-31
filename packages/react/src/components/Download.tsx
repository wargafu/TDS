import type { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface DownloadProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  label: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  icon?: ReactNode;
}

export function Download({
  label,
  description,
  meta,
  icon = '↓',
  className,
  ...rest
}: DownloadProps): ReactElement {
  return (
    <a className={cx('tds-download', className)} {...rest}>
      <span className="tds-download__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="tds-download__content">
        <span className="tds-download__label">{label}</span>
        {description && <span className="tds-download__description">{description}</span>}
        {meta && <span className="tds-download__meta">{meta}</span>}
      </span>
    </a>
  );
}
