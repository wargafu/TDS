import { useId } from 'react';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface RangeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  min?: number;
  max?: number;
  step?: number;
  /** Formate la valeur affichée à côté du libellé. */
  valueLabel?: (value: number) => ReactNode;
}

export function Range({
  label,
  min = 0,
  max = 100,
  step = 1,
  valueLabel,
  id,
  className,
  value,
  defaultValue,
  ...rest
}: RangeProps): ReactElement {
  const generatedId = useId();
  const rangeId = id ?? generatedId;
  const numeric =
    typeof value === 'number'
      ? value
      : typeof defaultValue === 'number'
        ? defaultValue
        : Number(min);

  return (
    <div className={cx('tds-range', className)}>
      <div className="tds-range__header">
        <label className="tds-range__label" htmlFor={rangeId}>
          {label}
        </label>
        <span className="tds-range__value" aria-hidden="true">
          {valueLabel ? valueLabel(numeric) : numeric}
        </span>
      </div>
      <input
        {...rest}
        id={rangeId}
        className="tds-range__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        defaultValue={defaultValue}
      />
    </div>
  );
}
