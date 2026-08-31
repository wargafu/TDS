import { useId, useRef } from 'react';
import type {
  FormEvent,
  FormEventHandler,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { cx } from '../utils/cx';

export interface SearchFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onSubmit'
> {
  label: ReactNode;
  hideLabel?: boolean;
  submitLabel?: string;
  clearLabel?: string;
  onClear?: () => void;
  onSearch?: (value: string) => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export function SearchField({
  label,
  hideLabel = false,
  submitLabel = 'Rechercher',
  clearLabel = 'Effacer la recherche',
  onClear,
  onSearch,
  onSubmit,
  id,
  disabled,
  className,
  ...rest
}: SearchFieldProps): ReactElement {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(event);
    onSearch?.(inputRef.current?.value ?? '');
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    onClear?.();
  }

  return (
    <form className={cx('tds-search', className)} onSubmit={handleSubmit}>
      <label
        className={cx('tds-search__label', hideLabel && 'tds-search--label-hidden')}
        htmlFor={inputId}
      >
        {label}
      </label>
      <div className="tds-search__controls">
        <input
          {...rest}
          ref={inputRef}
          id={inputId}
          type="search"
          className="tds-search__input"
          disabled={disabled}
        />
        {onClear && (
          <button
            type="button"
            className="tds-search__clear"
            aria-label={clearLabel}
            onClick={handleClear}
            disabled={disabled}
          >
            ×
          </button>
        )}
        <button type="submit" className="tds-search__submit" disabled={disabled}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
