import type { HTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getPaginationItems(
  current: number,
  total: number,
  siblingCount = 1
): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblingCount * 2), 'ellipsis', total];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...range(total - (3 + siblingCount * 2) + 1, total)];
  }
  return [1, 'ellipsis', ...range(leftSiblingIndex, rightSiblingIndex), 'ellipsis', total];
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  hrefFor?: (page: number) => string;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  hrefFor,
  onPageChange,
  siblingCount = 1,
  label = 'Pagination',
  previousLabel = 'Page précédente',
  nextLabel = 'Page suivante',
  className,
  ...rest
}: PaginationProps): ReactElement {
  const items = getPaginationItems(currentPage, totalPages, siblingCount);
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  function renderControl(page: number, content: string, ariaLabel: string, disabled: boolean) {
    if (hrefFor) {
      return (
        <a
          href={hrefFor(page)}
          className="tds-pagination__link"
          aria-disabled={disabled || undefined}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <button
        type="button"
        className="tds-pagination__link"
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={() => onPageChange?.(page)}
      >
        {content}
      </button>
    );
  }

  return (
    <nav className={cx(className)} aria-label={label} {...rest}>
      <ul className="tds-pagination__list">
        <li>{renderControl(currentPage - 1, '‹', previousLabel, isFirst)}</li>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`}>
              <span className="tds-pagination__ellipsis">…</span>
            </li>
          ) : (
            <li key={item}>
              {hrefFor ? (
                <a
                  href={hrefFor(item)}
                  className="tds-pagination__link"
                  aria-current={item === currentPage ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                >
                  {item}
                </a>
              ) : (
                <button
                  type="button"
                  className="tds-pagination__link"
                  aria-current={item === currentPage ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                  onClick={() => onPageChange?.(item)}
                >
                  {item}
                </button>
              )}
            </li>
          )
        )}
        <li>{renderControl(currentPage + 1, '›', nextLabel, isLast)}</li>
      </ul>
    </nav>
  );
}
