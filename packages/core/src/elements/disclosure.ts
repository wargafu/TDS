import { define, uid } from './base';

/**
 * `<tds-disclosure>` — révèle / masque un contenu via un déclencheur.
 *
 * Structure attendue :
 *   <tds-disclosure>
 *     <button data-tds-disclosure-trigger>Actions</button>
 *     <div data-tds-disclosure-content hidden> … </div>
 *   </tds-disclosure>
 *
 * Sans JavaScript : afficher le contenu (retirer `hidden`) — il reste lisible.
 * Avec JavaScript : le déclencheur reçoit `aria-expanded` / `aria-controls`,
 * le contenu se ferme via `Échap` et au clic extérieur (si `data-dismiss`).
 */
export class TdsDisclosure extends HTMLElement {
  private trigger: HTMLElement | null = null;
  private content: HTMLElement | null = null;
  private onDocClick = (event: MouseEvent) => {
    if (!this.open) return;
    if (!this.contains(event.target as Node)) this.setOpen(false);
  };
  private onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.setOpen(false);
      this.trigger?.focus();
    }
  };

  connectedCallback(): void {
    this.trigger = this.querySelector('[data-tds-disclosure-trigger]');
    this.content = this.querySelector('[data-tds-disclosure-content]');
    if (!this.trigger || !this.content) return;

    if (!this.content.id) this.content.id = uid('tds-disclosure');
    this.trigger.setAttribute('aria-controls', this.content.id);
    this.trigger.setAttribute('aria-expanded', String(this.open));
    this.content.hidden = !this.open;

    this.trigger.addEventListener('click', this.toggle);
    document.addEventListener('keydown', this.onKeydown);
    if (this.hasAttribute('data-dismiss')) {
      document.addEventListener('click', this.onDocClick);
    }
  }

  disconnectedCallback(): void {
    this.trigger?.removeEventListener('click', this.toggle);
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('click', this.onDocClick);
  }

  get open(): boolean {
    return this.hasAttribute('open');
  }

  private toggle = (): void => this.setOpen(!this.open);

  setOpen(next: boolean): void {
    if (next === this.open) return;
    this.toggleAttribute('open', next);
    this.trigger?.setAttribute('aria-expanded', String(next));
    if (this.content) this.content.hidden = !next;
    this.dispatchEvent(new CustomEvent('tds-toggle', { detail: { open: next }, bubbles: true }));
  }
}

define('tds-disclosure', TdsDisclosure);
