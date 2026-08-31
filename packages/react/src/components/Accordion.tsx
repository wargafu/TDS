import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {}

export function Accordion({ className, children, ...rest }: AccordionProps): ReactElement {
  return (
    <div className={cx('tds-accordion', className)} {...rest}>
      {children}
    </div>
  );
}

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function AccordionItem({ title, children, defaultOpen = false, className }: AccordionItemProps): ReactElement {
  return (
    <details className={cx('tds-accordion__item', className)} open={defaultOpen}>
      <summary className="tds-accordion__trigger">
        {title}
        <svg
          className="tds-accordion__icon"
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </summary>
      <div className="tds-accordion__content">{children}</div>
    </details>
  );
}

Accordion.Item = AccordionItem;
