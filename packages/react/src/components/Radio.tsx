import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function Radio({ label, className, ...rest }: RadioProps): ReactElement {
  return (
    <label className={cx('tds-radio', className)}>
      <input type="radio" {...rest} />
      {label}
    </label>
  );
}
