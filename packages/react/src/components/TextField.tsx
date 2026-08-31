import { useId } from 'react';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';
import type { FieldSize } from '../types';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: FieldSize;
}

export function TextField({
  label,
  hint,
  error,
  size = 'md',
  id,
  required,
  disabled,
  readOnly,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  ...rest
}: TextFieldProps): ReactElement {
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
      <input
        {...rest}
        id={fieldId}
        className={cx(
          'tds-input',
          `tds-input--${size}`,
          error ? 'tds-input--error' : undefined,
          disabled ? 'tds-input--disabled' : undefined,
          readOnly ? 'tds-input--readonly' : undefined,
          className
        )}
        aria-describedby={describedBy}
        aria-invalid={error ? true : ariaInvalid}
        aria-required={required || undefined}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      />
      {error && (
        <p id={errorId} className="tds-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
