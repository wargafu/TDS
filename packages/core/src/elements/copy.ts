import { define } from './base';

/**
 * `<tds-copy value="…">` — bouton « copier » avec retour annoncé.
 * Enveloppe un `<button>`. Sans JavaScript le bouton est masqué (`hidden`
 * ajouté par le CSS si l'élément n'est pas amélioré — voir icons.css n/a ;
 * ici on le retire à la connexion).
 *
 *   <tds-copy value="pnpm add @tdgs/core">
 *     <button type="button">Copier</button>
 *   </tds-copy>
 */
export class TdsCopy extends HTMLElement {
  private button: HTMLButtonElement | null = null;
  private status: HTMLElement | null = null;
  private defaultLabel = 'Copier';

  connectedCallback(): void {
    this.button = this.querySelector('button');
    if (!this.button) return;
    this.defaultLabel = this.button.textContent?.trim() || this.defaultLabel;

    this.status = document.createElement('span');
    this.status.className = 'tds-copy__status';
    this.status.setAttribute('role', 'status');
    this.status.setAttribute('aria-live', 'polite');
    this.append(this.status);

    this.hidden = !navigator.clipboard;
    this.button.addEventListener('click', this.copy);
  }

  disconnectedCallback(): void {
    this.button?.removeEventListener('click', this.copy);
  }

  private copy = async (): Promise<void> => {
    const value = this.getAttribute('value') ?? '';
    try {
      await navigator.clipboard.writeText(value);
      this.feedback('Copié');
    } catch {
      this.feedback('Échec de la copie');
    }
  };

  private feedback(message: string): void {
    if (this.status) this.status.textContent = message;
    this.setAttribute('data-copied', '');
    setTimeout(() => {
      this.removeAttribute('data-copied');
      if (this.status) this.status.textContent = '';
    }, 2000);
  }
}

define('tds-copy', TdsCopy);
