import { define, uid } from './base';

/**
 * `<tds-tooltip>` — infobulle au survol / focus, améliorant `.tds-tooltip`.
 *
 * Structure attendue :
 *   <tds-tooltip>
 *     <button aria-describedby="...">Aide</button>
 *     <span class="tds-tooltip__bubble" role="tooltip">Texte d'aide</span>
 *   </tds-tooltip>
 *
 * Sans JavaScript : le CSS `:hover`/`:focus-within` affiche la bulle (repli
 * documenté). Avec JavaScript : `Échap` masque, placement au-dessus/en dessous
 * selon l'espace disponible, pas d'ouverture au toucher (évite le piège).
 */
export class TdsTooltip extends HTMLElement {
  private anchor: HTMLElement | null = null;
  private bubble: HTMLElement | null = null;
  private visible = false;

  connectedCallback(): void {
    this.anchor = this.querySelector('button, a, [tabindex]');
    this.bubble = this.querySelector('.tds-tooltip__bubble');
    if (!this.anchor || !this.bubble) return;

    if (!this.bubble.id) this.bubble.id = uid('tds-tooltip');
    this.bubble.setAttribute('role', 'tooltip');
    this.anchor.setAttribute('aria-describedby', this.bubble.id);
    this.bubble.hidden = true;

    this.anchor.addEventListener('pointerenter', this.show);
    this.anchor.addEventListener('pointerleave', this.hide);
    this.anchor.addEventListener('focus', this.show);
    this.anchor.addEventListener('blur', this.hide);
    this.addEventListener('keydown', this.onKeydown);
  }

  disconnectedCallback(): void {
    this.anchor?.removeEventListener('pointerenter', this.show);
    this.anchor?.removeEventListener('pointerleave', this.hide);
    this.anchor?.removeEventListener('focus', this.show);
    this.anchor?.removeEventListener('blur', this.hide);
    this.removeEventListener('keydown', this.onKeydown);
  }

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') this.hide();
  };

  private show = (event?: Event): void => {
    if (event && (event as PointerEvent).pointerType === 'touch') return;
    if (this.visible || !this.bubble) return;
    this.visible = true;
    this.bubble.hidden = false;
    this.setAttribute('data-open', '');
    const rect = this.anchor!.getBoundingClientRect();
    const below = rect.top < this.bubble.offsetHeight + 12;
    this.bubble.setAttribute('data-placement', below ? 'bottom' : 'top');
  };

  private hide = (): void => {
    if (!this.visible || !this.bubble) return;
    this.visible = false;
    this.bubble.hidden = true;
    this.removeAttribute('data-open');
  };
}

define('tds-tooltip', TdsTooltip);
