import { define } from './base';

export type ConsentChoice = 'all' | 'essential' | 'custom';
export interface ConsentState {
  choice: ConsentChoice;
  categories: Record<string, boolean>;
  date: string;
}

const STORAGE_KEY = 'tds-consent';

/**
 * `<tds-consent>` — bandeau de consentement (cookies / mesure d'audience).
 *
 * Structure attendue : un `role="dialog"` non modal avec des boutons portant
 * `data-consent="all|essential|custom"`. L'élément mémorise le choix
 * (localStorage), masque le bandeau tant qu'un choix valide existe, et émet
 * `tds-consent-change`.
 *
 * Sans JavaScript : le bandeau s'affiche (choix impossible à mémoriser — à
 * compléter côté serveur si nécessaire).
 */
export class TdsConsent extends HTMLElement {
  connectedCallback(): void {
    const existing = this.read();
    if (existing) {
      this.hidden = true;
      this.emit(existing);
      return;
    }
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-label', this.getAttribute('aria-label') ?? 'Gestion des cookies');
    this.setAttribute('aria-modal', 'false');
    this.hidden = false;
    this.querySelectorAll<HTMLElement>('[data-consent]').forEach((btn) => {
      btn.addEventListener('click', () => this.choose(btn.dataset.consent as ConsentChoice));
    });
  }

  private categories(): Record<string, boolean> {
    const cats: Record<string, boolean> = {};
    this.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name]').forEach((input) => {
      cats[input.name] = input.checked;
    });
    return cats;
  }

  choose(choice: ConsentChoice): void {
    const categories =
      choice === 'all'
        ? Object.fromEntries(Object.keys(this.categories()).map((k) => [k, true]))
        : choice === 'essential'
          ? Object.fromEntries(Object.keys(this.categories()).map((k) => [k, false]))
          : this.categories();
    const state: ConsentState = { choice, categories, date: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* stockage indisponible */
    }
    this.hidden = true;
    this.emit(state);
  }

  private read(): ConsentState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as ConsentState) : null;
    } catch {
      return null;
    }
  }

  private emit(state: ConsentState): void {
    this.dispatchEvent(new CustomEvent('tds-consent-change', { detail: state, bubbles: true }));
  }
}

define('tds-consent', TdsConsent);
