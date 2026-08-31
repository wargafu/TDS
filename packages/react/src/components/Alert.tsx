import { useId } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Alert({
  variant = 'info',
  title,
  icon,
  onClose,
  closeLabel = 'Fermer cette notification',
  className,
  children,
  ...rest
}: AlertProps): ReactElement {
  const titleId = useId();
  const isDanger = variant === 'danger';

  return (
    <div
      className={cx('tds-alert', `tds-alert--${variant}`, className)}
      role={isDanger ? 'alert' : 'status'}
      aria-live={isDanger ? 'assertive' : 'polite'}
      aria-labelledby={titleId}
      {...rest}
    >
      {icon && (
        <span className="tds-alert__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="tds-alert__content">
        <p className="tds-alert__title" id={titleId}>
          {title}
        </p>
        {children && <div className="tds-alert__body">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="tds-alert__close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
}
