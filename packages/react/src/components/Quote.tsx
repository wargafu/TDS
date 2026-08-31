import type { BlockquoteHTMLAttributes, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface QuoteProps extends BlockquoteHTMLAttributes<HTMLElement> {
  author?: ReactNode;
  source?: ReactNode;
  sourceHref?: string;
}

export function Quote({
  author,
  source,
  sourceHref,
  className,
  children,
  ...rest
}: QuoteProps): ReactElement {
  return (
    <blockquote className={cx('tds-quote', className)} {...rest}>
      <p className="tds-quote__text">{children}</p>
      {(author || source) && (
        <footer className="tds-quote__footer">
          {author && <span className="tds-quote__author">{author}</span>}
          {source && (
            <cite className="tds-quote__source">
              {sourceHref ? <a href={sourceHref}>{source}</a> : source}
            </cite>
          )}
        </footer>
      )}
    </blockquote>
  );
}
