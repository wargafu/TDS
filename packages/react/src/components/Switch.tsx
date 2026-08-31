import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function Switch({ label, className, checked, ...rest }: SwitchProps): ReactElement {
  return (
    <label className={cx('tds-switch', className)}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        aria-checked={typeof checked === 'boolean' ? checked : undefined}
        {...rest}
      />
      {label}
    </label>
  );
}
