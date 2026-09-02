import { define, prefersReducedMotion, uid } from './base';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  variant?: ToastVariant;
  /** Durée d'affichage en ms. `0` = persistant (fermeture manuelle). */
  duration?: number;
  /** Libellé du bouton de fermeture. */
  dismissLabel?: string;
}

/**
 * `<tds-toast-region>` — conteneur unique des toasts, région live polie.
 * Placer une seule instance près de la fin du `<body>`.
 */
export class TdsToastRegion extends HTMLElement {
  connectedCallback(): void {
    this.setAttribute('role', 'region');
    this.setAttribute('aria-label', this.getAttribute('aria-label') ?? 'Notifications');
    this.setAttribute('aria-live', 'polite');
    this.classList.add('tds-toast-region');
  }

  push(message: string, options: ToastOptions = {}): () => void {
    const { variant = 'info', duration = 6000, dismissLabel = 'Fermer' } = options;
    const toast = document.createElement('div');
    toast.className = `tds-toast tds-toast--${variant}`;
    toast.setAttribute('role', variant === 'danger' ? 'alert' : 'status');
    toast.id = uid('tds-toast');

    const body = document.createElement('div');
    body.className = 'tds-toast__body';
    body.textContent = message;

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'tds-toast__close';
    close.setAttribute('aria-label', dismissLabel);
    close.innerHTML =
      '<svg viewBox="0 0 20 20" aria-hidden="true" width="16" height="16"><path fill="currentColor" d="M10 8.6 4.9 3.5 3.5 4.9 8.6 10l-5.1 5.1 1.4 1.4L10 11.4l5.1 5.1 1.4-1.4L11.4 10l5.1-5.1-1.4-1.4z"/></svg>';

    const remove = (): void => {
      if (!toast.isConnected) return;
      if (prefersReducedMotion()) {
        toast.remove();
        return;
      }
      toast.setAttribute('data-leaving', '');
      toast.addEventListener('animationend', () => toast.remove(), { once: true });
      setTimeout(() => toast.remove(), 400);
    };

    close.addEventListener('click', remove);
    toast.append(body, close);
    this.append(toast);

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (duration > 0) {
      timer = setTimeout(remove, duration);
      toast.addEventListener('pointerenter', () => timer && clearTimeout(timer));
      toast.addEventListener('pointerleave', () => {
        timer = setTimeout(remove, duration);
      });
    }
    return remove;
  }
}

define('tds-toast-region', TdsToastRegion);

/** Crée la région si nécessaire et affiche un toast. Retourne un `dismiss()`. */
export function toast(message: string, options?: ToastOptions): () => void {
  if (typeof document === 'undefined') return () => {};
  let region = document.querySelector<TdsToastRegion>('tds-toast-region');
  if (!region) {
    region = document.createElement('tds-toast-region') as TdsToastRegion;
    document.body.append(region);
  }
  return region.push(message, options);
}
