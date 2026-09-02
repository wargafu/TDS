// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';

beforeAll(async () => {
  await import('../src/elements/index');
});

describe('enregistrement des custom elements', () => {
  for (const tag of [
    'tds-disclosure',
    'tds-tabs',
    'tds-tooltip',
    'tds-toast-region',
    'tds-copy',
    'tds-back-to-top',
    'tds-sortable-table',
    'tds-consent',
  ]) {
    it(`${tag} est défini`, () => {
      expect(customElements.get(tag)).toBeTypeOf('function');
    });
  }
});

describe('tds-disclosure', () => {
  it('câble aria-expanded / aria-controls et bascule', () => {
    document.body.innerHTML = `
      <tds-disclosure>
        <button data-tds-disclosure-trigger>Actions</button>
        <div data-tds-disclosure-content hidden>menu</div>
      </tds-disclosure>`;
    const el = document.querySelector('tds-disclosure')!;
    const trigger = el.querySelector('button')!;
    const content = el.querySelector('div')!;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(content.hidden).toBe(true);

    trigger.click();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(content.hidden).toBe(false);

    trigger.click();
    expect(content.hidden).toBe(true);
  });
});

describe('tds-tabs', () => {
  it('applique les rôles ARIA et n’affiche qu’un panneau', () => {
    document.body.innerHTML = `
      <tds-tabs>
        <div class="tds-tabs__list">
          <button class="tds-tabs__tab" aria-selected="true">Un</button>
          <button class="tds-tabs__tab">Deux</button>
        </div>
        <div class="tds-tabs__panel">contenu un</div>
        <div class="tds-tabs__panel">contenu deux</div>
      </tds-tabs>`;
    const el = document.querySelector('tds-tabs')!;
    const tabs = el.querySelectorAll<HTMLElement>('.tds-tabs__tab');
    const panels = el.querySelectorAll<HTMLElement>('.tds-tabs__panel');

    expect(el.hasAttribute('data-enhanced')).toBe(true);
    expect(tabs[0]!.getAttribute('role')).toBe('tab');
    expect(panels[0]!.hidden).toBe(false);
    expect(panels[1]!.hidden).toBe(true);

    tabs[1]!.click();
    expect(tabs[1]!.getAttribute('aria-selected')).toBe('true');
    expect(panels[1]!.hidden).toBe(false);
    expect(panels[0]!.hidden).toBe(true);
  });
});

describe('toast()', () => {
  it('crée une région live et un toast avec le bon rôle', async () => {
    const { toast } = await import('../src/elements/toast');
    const dismiss = toast('Dossier enregistré', { variant: 'success', duration: 0 });
    const region = document.querySelector('tds-toast-region')!;
    expect(region.getAttribute('aria-live')).toBe('polite');
    const node = region.querySelector('.tds-toast')!;
    expect(node.classList.contains('tds-toast--success')).toBe(true);
    expect(node.getAttribute('role')).toBe('status');
    dismiss();
  });

  it('un toast danger prend role=alert', async () => {
    const { toast } = await import('../src/elements/toast');
    toast('Erreur', { variant: 'danger', duration: 0 });
    const node = document.querySelector('.tds-toast--danger')!;
    expect(node.getAttribute('role')).toBe('alert');
  });
});

describe('tds-sortable-table', () => {
  it('trie les lignes et annonce aria-sort', () => {
    document.body.innerHTML = `
      <tds-sortable-table>
        <table class="tds-table">
          <thead><tr><th data-sort>Nom</th><th data-sort="number">Age</th></tr></thead>
          <tbody>
            <tr><td>Zara</td><td>30</td></tr>
            <tr><td>Ali</td><td>25</td></tr>
          </tbody>
        </table>
      </tds-sortable-table>`;
    const el = document.querySelector('tds-sortable-table')!;
    const nameButton = el.querySelectorAll('th button')[0] as HTMLButtonElement;
    nameButton.click();
    const firstCell = el.querySelectorAll('tbody tr td')[0]!;
    expect(firstCell.textContent).toBe('Ali');
    expect(el.querySelectorAll('th')[0]!.getAttribute('aria-sort')).toBe('ascending');
  });
});

describe('tds-consent', () => {
  it('mémorise le choix et masque le bandeau', () => {
    localStorage.clear();
    document.body.innerHTML = `
      <tds-consent>
        <button data-consent="all">Tout accepter</button>
        <button data-consent="essential">Refuser</button>
      </tds-consent>`;
    const el = document.querySelector('tds-consent') as HTMLElement;
    expect(el.hidden).toBe(false);
    (el.querySelector('[data-consent="essential"]') as HTMLButtonElement).click();
    expect(el.hidden).toBe(true);
    expect(JSON.parse(localStorage.getItem('tds-consent')!).choice).toBe('essential');
  });
});
