import { useId } from 'react';
import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode;
}

export function Tooltip({ content, className, children, tabIndex, ...rest }: TooltipProps): ReactElement {
  const bubbleId = useId();
  return (
    <span
      className={cx('tds-tooltip', className)}
      tabIndex={tabIndex ?? 0}
      aria-describedby={bubbleId}
      {...rest}
    >
      {children}
      <span className="tds-tooltip__bubble" id={bubbleId} role="tooltip">
        {content}
      </span>
    </span>
  );
}
