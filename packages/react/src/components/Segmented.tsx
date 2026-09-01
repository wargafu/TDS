import { useId } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SegmentedProps {
  /** Libellé accessible du groupe (aria-label du radiogroup). */
  label: string;
  name?: string;
  /** Mode contrôlé. */
  value?: string;
  /** Mode non contrôlé. */
  defaultValue?: string;
  options: SegmentedOption[];
  onChange?: (value: string) => void;
  className?: string;
}

export function Segmented({
  label,
  name,
  value,
  defaultValue,
  options,
  onChange,
  className,
}: SegmentedProps): ReactElement {
  const generatedId = useId();
  const groupName = name ?? generatedId;

  return (
    <div className={cx('tds-segmented', className)} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <div className="tds-segmented__item" key={option.value}>
          <input
            id={`${groupName}-${option.value}`}
            type="radio"
            name={groupName}
            value={option.value}
            className="tds-segmented__input"
            checked={value !== undefined ? value === option.value : undefined}
            defaultChecked={value === undefined ? defaultValue === option.value : undefined}
            disabled={option.disabled}
            onChange={onChange ? () => onChange(option.value) : undefined}
          />
          <label className="tds-segmented__label" htmlFor={`${groupName}-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}
