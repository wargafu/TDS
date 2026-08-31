import { useId } from 'react';
import type { ReactElement, ReactNode, TextareaHTMLAttributes } from 'react';
import { cx } from '../utils/cx';
import type { FieldSize } from '../types';

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: FieldSize;
}

export function TextareaField({
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
}: TextareaFieldProps): ReactElement {
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
      <textarea
        {...rest}
        id={fieldId}
        className={cx(
          'tds-textarea',
          `tds-textarea--${size}`,
          error ? 'tds-textarea--error' : undefined,
          disabled ? 'tds-textarea--disabled' : undefined,
          readOnly ? 'tds-textarea--readonly' : undefined,
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
