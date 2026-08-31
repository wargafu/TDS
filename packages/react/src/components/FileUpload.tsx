import { useId, useState } from 'react';
import type {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import { cx } from '../utils/cx';

export interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  chooseLabel?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: FileList | null) => void;
}

export function FileUpload({
  label,
  hint,
  error,
  chooseLabel = 'Choisir un fichier',
  id,
  required,
  disabled,
  className,
  onChange,
  onFilesChange,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...rest
}: FileUploadProps): ReactElement {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, hintId, errorId].filter(Boolean).join(' ') || undefined;
  const [fileNames, setFileNames] = useState<string[]>([]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    setFileNames(files ? Array.from(files, (file) => file.name) : []);
    onChange?.(event);
    onFilesChange?.(files);
  }

  return (
    <div className={cx('tds-file-upload', className)}>
      <label id={labelId} className="tds-field__label" htmlFor={inputId}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <p id={hintId} className="tds-file-upload__hint">
          {hint}
        </p>
      )}
      <input
        {...rest}
        id={inputId}
        className="tds-file-upload__input"
        type="file"
        required={required}
        disabled={disabled}
        aria-labelledby={labelId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : ariaInvalid}
        aria-required={required || undefined}
        onChange={handleChange}
      />
      <label className="tds-file-upload__label" htmlFor={inputId}>
        <span className="tds-file-upload__choose">{chooseLabel}</span>
        <span>{hint ?? 'Ajoutez un fichier depuis votre appareil.'}</span>
      </label>
      {fileNames.length > 0 && (
        <ul className="tds-file-upload__files" aria-live="polite">
          {fileNames.map((fileName) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      )}
      {error && (
        <p id={errorId} className="tds-file-upload__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
