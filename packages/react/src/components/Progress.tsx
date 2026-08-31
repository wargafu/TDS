import { useId } from 'react';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  label?: ReactNode;
  showValue?: boolean;
  variant?: ProgressVariant;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'default',
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: ProgressProps): ReactElement {
  const labelId = useId();
  const determinate = typeof value === 'number' && Number.isFinite(value) && max > 0;
  const boundedValue = determinate ? Math.min(Math.max(value, 0), max) : undefined;
  const percentage = boundedValue === undefined ? 0 : (boundedValue / max) * 100;
  const progressStyle = { ...style, '--tds-progress-value': `${percentage}%` } as CSSProperties;

  return (
    <div
      className={cx(
        'tds-progress',
        !determinate && 'tds-progress--indeterminate',
        `tds-progress--${variant}`,
        className
      )}
      {...rest}
    >
      {label && (
        <div id={labelId} className="tds-progress__label">
          <span>{label}</span>
          {showValue && determinate && <span aria-hidden="true">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div
        className="tds-progress__track"
        role="progressbar"
        aria-label={!label && !ariaLabelledBy ? (ariaLabel ?? 'Progression') : undefined}
        aria-labelledby={label ? labelId : ariaLabelledBy}
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? max : undefined}
        aria-valuenow={determinate ? boundedValue : undefined}
      >
        <div className="tds-progress__indicator" style={progressStyle} />
      </div>
    </div>
  );
}
