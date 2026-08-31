import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type CalloutVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface CalloutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: CalloutVariant;
  title: ReactNode;
  icon?: ReactNode;
}

export function Callout({
  variant = 'neutral',
  title,
  icon,
  className,
  children,
  ...rest
}: CalloutProps): ReactElement {
  return (
    <div className={cx('tds-callout', `tds-callout--${variant}`, className)} {...rest}>
      {icon && (
        <span className="tds-callout__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="tds-callout__content">
        <h3 className="tds-callout__title">{title}</h3>
        {children && <div className="tds-callout__body">{children}</div>}
      </div>
    </div>
  );
}
