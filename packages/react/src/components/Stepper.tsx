import type { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export interface StepItem {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  href?: string;
  status?: StepStatus;
}

export interface StepperProps extends HTMLAttributes<HTMLElement> {
  items: StepItem[];
  currentId?: string;
  currentIndex?: number;
  label?: string;
  onStepChange?: (id: string) => void;
}

function statusFor(item: StepItem, index: number, activeIndex: number): StepStatus {
  return (
    item.status ??
    (index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'upcoming')
  );
}

export function Stepper({
  items,
  currentId,
  currentIndex,
  label = 'Étapes',
  onStepChange,
  className,
  ...rest
}: StepperProps): ReactElement {
  const currentItemIndex = currentId ? items.findIndex((item) => item.id === currentId) : -1;
  const explicitCurrentIndex = items.findIndex((item) => item.status === 'current');
  const activeIndex =
    currentItemIndex >= 0
      ? currentItemIndex
      : (currentIndex ?? (explicitCurrentIndex >= 0 ? explicitCurrentIndex : 0));

  return (
    <nav className={className} aria-label={label} {...rest}>
      <ol className="tds-stepper">
        {items.map((item, index) => {
          const status = statusFor(item, index, activeIndex);
          const labelClassName = cx('tds-stepper__label');
          const labelContent = item.href ? (
            <a className={labelClassName} href={item.href}>
              {item.label}
            </a>
          ) : onStepChange && status !== 'upcoming' ? (
            <button
              type="button"
              className={cx(labelClassName, 'tds-stepper__button')}
              onClick={() => onStepChange(item.id)}
            >
              {item.label}
            </button>
          ) : (
            <span className={labelClassName}>{item.label}</span>
          );

          return (
            <li
              key={item.id}
              className={cx('tds-stepper__item', `tds-stepper--${status}`)}
              aria-current={status === 'current' ? 'step' : undefined}
            >
              <span className="tds-stepper__marker" aria-hidden="true">
                {status === 'complete' ? '✓' : index + 1}
              </span>
              <span className="tds-stepper__content">
                {labelContent}
                {item.description && (
                  <span className="tds-stepper__description">{item.description}</span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
