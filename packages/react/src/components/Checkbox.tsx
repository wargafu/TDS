import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps): ReactElement {
  return (
    <label className={cx('tds-checkbox', className)}>
      <input type="checkbox" {...rest} />
      {label}
    </label>
  );
}
