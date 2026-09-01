import { useState } from 'react';
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface DropdownProps {
  /** Contenu du bouton déclencheur. */
  trigger: ReactNode;
  /** Éléments du menu — idéalement des <li className="tds-dropdown__item">. */
  children: ReactNode;
  /** Alignement du menu. */
  align?: 'start' | 'end';
  className?: string;
  triggerProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'aria-expanded'>;
}

export function Dropdown({
  trigger,
  children,
  align = 'start',
  className,
  triggerProps,
}: DropdownProps): ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cx('tds-dropdown', align === 'end' ? 'tds-dropdown--right' : undefined, className)}
    >
      <button
        type="button"
        className="tds-button tds-button--tertiary tds-button--md"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        {...triggerProps}
      >
        {trigger}
        <span aria-hidden="true"> ▾</span>
      </button>
      <ul className="tds-dropdown__menu" role="menu" data-open={open}>
        {children}
      </ul>
    </div>
  );
}
