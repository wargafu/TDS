import { useId } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type NoticeVariant = 'info' | 'success' | 'warning' | 'danger';

export interface NoticeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: NoticeVariant;
  title: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
}

export function Notice({
  variant = 'info',
  title,
  icon,
  onClose,
  closeLabel = 'Masquer ce bandeau',
  className,
  children,
  ...rest
}: NoticeProps): ReactElement {
  const titleId = useId();
  const urgent = variant === 'danger';

  return (
    <div
      className={cx('tds-notice', `tds-notice--${variant}`, className)}
      role={urgent ? 'alert' : 'status'}
      aria-live={urgent ? 'assertive' : 'polite'}
      aria-labelledby={titleId}
      {...rest}
    >
      {icon && (
        <span className="tds-notice__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <div className="tds-notice__content">
        <span className="tds-notice__title" id={titleId}>
          {title}
        </span>
        {children && <div className="tds-notice__body">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="tds-notice__close"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
}
