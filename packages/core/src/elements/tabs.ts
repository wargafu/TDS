import { define, uid } from './base';

interface TabPair {
  tab: HTMLElement;
  panel: HTMLElement;
}

/**
 * `<tds-tabs>` — améliore un groupe d'onglets `.tds-tabs` selon le motif
 * WAI-ARIA APG (roving tabindex, flèches, Home/Fin).
 *
 * Structure attendue :
 *   <tds-tabs>
 *     <div class="tds-tabs__list">
 *       <button class="tds-tabs__tab" data-panel="p1">Onglet 1</button> …
 *     </div>
 *     <div class="tds-tabs__panel" id="p1"> … </div> …
 *   </tds-tabs>
 *
 * Sans JavaScript : tous les panneaux visibles (le CSS ne masque rien tant
 * que `data-enhanced` est absent).
 */
export class TdsTabs extends HTMLElement {
  private pairs: TabPair[] = [];

  connectedCallback(): void {
    const list = this.querySelector('.tds-tabs__list');
    const tabs = Array.from(this.querySelectorAll<HTMLElement>('.tds-tabs__tab'));
    const panels = Array.from(this.querySelectorAll<HTMLElement>('.tds-tabs__panel'));
    if (!list || tabs.length < 2 || tabs.length !== panels.length) return;

    this.pairs = tabs.map((tab, index) => ({ tab, panel: panels[index] as HTMLElement }));
    list.setAttribute('role', 'tablist');
    let initial = this.pairs.findIndex(({ tab }) => tab.getAttribute('aria-selected') === 'true');
    if (initial < 0) initial = 0;

    this.pairs.forEach(({ tab, panel }, index) => {
      if (!tab.id) tab.id = uid('tds-tab');
      if (!panel.id) panel.id = uid('tds-tabpanel');
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.tabIndex = 0;
      tab.addEventListener('click', () => this.select(index));
      tab.addEventListener('keydown', (event) => this.onKeydown(event, index));
    });

    this.setAttribute('data-enhanced', '');
    this.select(initial);
  }

  private onKeydown(event: KeyboardEvent, index: number): void {
    const last = this.pairs.length - 1;
    let next = index;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = index === last ? 0 : index + 1;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = index === 0 ? last : index - 1;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.select(next);
    this.pairs[next]?.tab.focus();
  }

  select(index: number): void {
    this.pairs.forEach(({ tab, panel }, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panel.hidden = !selected;
    });
    this.dispatchEvent(new CustomEvent('tds-tab-change', { detail: { index }, bubbles: true }));
  }
}

define('tds-tabs', TdsTabs);
