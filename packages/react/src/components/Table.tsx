import type { HTMLAttributes, ReactElement, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cx } from '../utils/cx';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  wrapperClassName?: string;
}

export function Table({
  striped = false,
  bordered = false,
  compact = false,
  className,
  wrapperClassName,
  children,
  ...rest
}: TableProps): ReactElement {
  return (
    <div className={cx('tds-table-wrapper', wrapperClassName)}>
      <table
        className={cx(
          'tds-table',
          striped && 'tds-table--striped',
          bordered && 'tds-table--bordered',
          compact && 'tds-table--compact',
          className
        )}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}

export function TableActionsCell({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>): ReactElement {
  return <td className={cx('tds-table__actions', className)} {...rest} />;
}

export function TableActionsHeader({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>): ReactElement {
  return <th className={cx('tds-table__actions', className)} scope="col" {...rest} />;
}

Table.ActionsCell = TableActionsCell;
Table.ActionsHeader = TableActionsHeader;
