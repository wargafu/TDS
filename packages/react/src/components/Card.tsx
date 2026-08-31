import type { AnchorHTMLAttributes, HTMLAttributes, ReactElement } from 'react';
import { cx } from '../utils/cx';

export type CardVariant = 'flat' | 'elevated' | 'outlined';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  href?: undefined;
}

export interface CardLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: CardVariant;
  href: string;
}

export function Card({ variant = 'flat', href, className, children, ...rest }: CardProps | CardLinkProps): ReactElement {
  const classes = cx('tds-card', `tds-card--${variant}`, className);
  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <div className={classes} {...(rest as HTMLAttributes<HTMLDivElement>)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-card__header', className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-card__body', className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-card__footer', className)} {...rest} />;
}

export function CardMedia({ className, ...rest }: HTMLAttributes<HTMLDivElement>): ReactElement {
  return <div className={cx('tds-card__media', className)} {...rest} />;
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>): ReactElement {
  return <h3 className={cx('tds-card__title', className)} {...rest} />;
}

export function CardSubtitle({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return <p className={cx('tds-card__subtitle', className)} {...rest} />;
}

export function CardDescription({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>): ReactElement {
  return <p className={cx('tds-card__description', className)} {...rest} />;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Media = CardMedia;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Description = CardDescription;
