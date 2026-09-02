import { define, prefersReducedMotion } from './base';

/**
 * `<tds-back-to-top>` — bouton « revenir en haut », apparaît après défilement.
 * Enveloppe un `<a href="#top">` ou `<button>`. Sans JavaScript le lien reste
 * fonctionnel ; l'élément ne fait que gérer la visibilité et le défilement doux.
 */
export class TdsBackToTop extends HTMLElement {
  private control: HTMLElement | null = null;
  private threshold = 400;

  connectedCallback(): void {
    this.control = this.querySelector('a, button');
    if (!this.control) return;
    this.threshold = Number(this.getAttribute('data-threshold')) || this.threshold;
    this.hidden = true;
    this.control.addEventListener('click', this.toTop);
    addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
  }

  disconnectedCallback(): void {
    removeEventListener('scroll', this.onScroll);
    this.control?.removeEventListener('click', this.toTop);
  }

  private onScroll = (): void => {
    this.hidden = scrollY < this.threshold;
  };

  private toTop = (event: Event): void => {
    event.preventDefault();
    scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    const main = document.querySelector<HTMLElement>('main, [role="main"], h1');
    main?.focus({ preventScroll: true });
  };
}

define('tds-back-to-top', TdsBackToTop);
