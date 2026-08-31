import type { CSSProperties, ReactElement, SVGAttributes } from 'react';
import { iconPaths, type IconName } from '@tdgs/core/icons';
import { cx } from '../utils/cx';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | number;

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  name: IconName;
  size?: IconSize;
  title?: string;
}

export function Icon({
  name,
  size = 'md',
  title,
  className,
  style,
  'aria-hidden': ariaHidden,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...rest
}: IconProps): ReactElement {
  const labelled = Boolean(title || ariaLabel || ariaLabelledBy);
  const sizeStyle: CSSProperties =
    typeof size === 'number' ? { inlineSize: `${size}px`, blockSize: `${size}px` } : {};

  return (
    <svg
      {...rest}
      className={cx('tds-icon', typeof size === 'string' && `tds-icon--${size}`, className)}
      style={{ ...sizeStyle, ...style }}
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden ?? (!labelled ? true : undefined)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      role={labelled ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <path d={iconPaths[name]} />
    </svg>
  );
}
