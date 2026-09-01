import { useId, useState } from 'react';
import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';
import type { FieldSize } from '../types';

export interface PasswordProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  size?: FieldSize;
}

export function Password({
  label,
  hint,
  error,
  size = 'md',
  id,
  required,
  disabled,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  className,
  ...rest
}: PasswordProps): ReactElement {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [visible, setVisible] = useState(false);
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="tds-password">
      <label className="tds-field__label" htmlFor={fieldId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="tds-helper-text">
          {hint}
        </p>
      )}
      <div className="tds-password__control">
        <input
          {...rest}
          id={fieldId}
          type={visible ? 'text' : 'password'}
          className={cx(
            'tds-input',
            `tds-input--${size}`,
            error ? 'tds-input--error' : undefined,
            disabled ? 'tds-input--disabled' : undefined,
            className
          )}
          aria-describedby={describedBy}
          aria-invalid={error ? true : ariaInvalid}
          aria-required={required || undefined}
          required={required}
          disabled={disabled}
        />
        <button
          type="button"
          className="tds-password__toggle"
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={visible}
          disabled={disabled}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? (
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p id={errorId} className="tds-error-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
