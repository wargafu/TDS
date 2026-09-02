import { createElement, type ReactElement } from 'react';
import { toast, type ToastOptions, type ToastVariant } from '@tdgs/core/elements';

export { toast };
export type { ToastOptions, ToastVariant };

/**
 * Monte la région de toasts `<tds-toast-region>` et enregistre le custom
 * element (via l'import ci-dessus). Placer une seule instance près de la
 * racine de l'application ; appeler ensuite `toast('message', { variant })`.
 */
export function Toaster({ label = 'Notifications' }: { label?: string }): ReactElement {
  return createElement('tds-toast-region', { 'aria-label': label });
}
