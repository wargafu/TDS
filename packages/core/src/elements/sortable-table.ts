import { define } from './base';

/**
 * `<tds-sortable-table>` — tri d'un `.tds-table` par colonne, sans dépendance.
 *
 * Marquer les en-têtes triables : `<th data-sort>` (ou `data-sort="number"` /
 * `"date"`). Sans JavaScript le tableau reste lisible dans son ordre initial ;
 * avec JavaScript les en-têtes deviennent des boutons et `aria-sort` est
 * annoncé.
 */
export class TdsSortableTable extends HTMLElement {
  private table: HTMLTableElement | null = null;

  connectedCallback(): void {
    this.table = this.querySelector('table');
    const heads = Array.from(this.querySelectorAll<HTMLTableCellElement>('th[data-sort]'));
    if (!this.table || heads.length === 0) return;

    heads.forEach((th, columnIndex) => {
      const realIndex = Array.from(th.parentElement!.children).indexOf(th);
      th.setAttribute('aria-sort', 'none');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tds-table__sort';
      button.append(...Array.from(th.childNodes));
      th.append(button);
      button.addEventListener('click', () => this.sort(realIndex, th, th.dataset.sort || 'text'));
      void columnIndex;
    });
  }

  private sort(index: number, th: HTMLElement, type: string): void {
    const tbody = this.table!.tBodies[0];
    if (!tbody) return;
    const current = th.getAttribute('aria-sort');
    const dir = current === 'ascending' ? 'descending' : 'ascending';

    this.querySelectorAll('th[data-sort]').forEach((h) => h.setAttribute('aria-sort', 'none'));
    th.setAttribute('aria-sort', dir);

    const rows = Array.from(tbody.rows);
    const value = (row: HTMLTableRowElement): string => row.cells[index]?.textContent?.trim() ?? '';
    rows.sort((a, b) => {
      const av = value(a);
      const bv = value(b);
      let result: number;
      if (type === 'number') {
        result = parseFloat(av.replace(/[^\d.-]/g, '')) - parseFloat(bv.replace(/[^\d.-]/g, ''));
      } else if (type === 'date') {
        result = Date.parse(av) - Date.parse(bv);
      } else {
        result = av.localeCompare(bv, 'fr', { numeric: true });
      }
      return dir === 'ascending' ? result : -result;
    });
    rows.forEach((row) => tbody.append(row));
    this.dispatchEvent(
      new CustomEvent('tds-table-sort', { detail: { index, direction: dir }, bubbles: true })
    );
  }
}

define('tds-sortable-table', TdsSortableTable);
