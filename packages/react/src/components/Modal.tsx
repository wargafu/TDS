import { useEffect, useId, useRef } from 'react';
import type { HTMLAttributes, MouseEvent, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'title'> {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  size?: ModalSize;
  closeLabel?: string;
  closeOnBackdropClick?: boolean;
  footer?: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  closeLabel = 'Fermer',
  closeOnBackdropClick = true,
  footer,
  className,
  children,
  ...rest
}: ModalProps): ReactElement {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  function closeDialog() {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (closeOnBackdropClick && event.target === dialogRef.current) {
      closeDialog();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={cx('tds-modal', size !== 'md' && `tds-modal--${size}`, className)}
      aria-labelledby={titleId}
      onClick={handleClick}
      {...rest}
    >
      <div className="tds-modal__header">
        <h2 id={titleId} className="tds-modal__title">
          {title}
        </h2>
        <button
          type="button"
          className="tds-modal__close"
          aria-label={closeLabel}
          onClick={closeDialog}
        >
          ✕
        </button>
      </div>
      <div className="tds-modal__body">{children}</div>
      {footer && <div className="tds-modal__footer">{footer}</div>}
    </dialog>
  );
}
