import { useId } from 'react';
import type { ReactElement, ReactNode, SelectHTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import type { FieldSize } from '../types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: FieldSize;
  options: SelectOption[];
  placeholder?: string;
}

export function SelectField({
  label,
  hint,
  error,
  size = 'md',
  id,
  required,
  disabled,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  options,
  placeholder,
  className,
  ...rest
}: SelectFieldProps): ReactElement {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="tds-field">
      <label className="tds-field__label" htmlFor={fieldId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="tds-helper-text">
          {hint}
        </p>
      )}
      <select
        {...rest}
        id={fieldId}
        className={cx(
          'tds-select',
          `tds-select--${size}`,
          error ? 'tds-select--error' : undefined,
          disabled ? 'tds-select--disabled' : undefined,
          className
        )}
        aria-describedby={describedBy}
        aria-invalid={error ? true : ariaInvalid}
        aria-required={required || undefined}
        required={required}
        disabled={disabled}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="tds-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
