import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { Button } from '../src/components/Button';
import { Badge } from '../src/components/Badge';
import { Checkbox } from '../src/components/Checkbox';
import { Tabs } from '../src/components/Tabs';
import { TextField } from '../src/components/TextField';
import { Link } from '../src/components/Link';
import { Table } from '../src/components/Table';
import { FileUpload } from '../src/components/FileUpload';
import { Progress } from '../src/components/Progress';
import { SearchField } from '../src/components/SearchField';
import { Stepper } from '../src/components/Stepper';
import { Icon } from '../src/components/Icon';
import { Callout } from '../src/components/Callout';
import { Notice } from '../src/components/Notice';
import { Tag } from '../src/components/Tag';
import { Tile } from '../src/components/Tile';
import { Download } from '../src/components/Download';
import { Quote } from '../src/components/Quote';
import { Summary } from '../src/components/Summary';
import { Password } from '../src/components/Password';
import { Range } from '../src/components/Range';
import { Segmented } from '../src/components/Segmented';
import { Dropdown } from '../src/components/Dropdown';
import { Sidemenu } from '../src/components/Sidemenu';
import { Share } from '../src/components/Share';
import { Logo } from '../src/components/Logo';

describe('Button', () => {
  it('applies variant and size classes', () => {
    const wrapper = mount(Button, {
      props: { variant: 'danger', size: 'lg' },
      slots: { default: 'Supprimer' },
    });
    expect(wrapper.classes()).toContain('tds-button--danger');
    expect(wrapper.classes()).toContain('tds-button--lg');
    expect(wrapper.text()).toBe('Supprimer');
  });

  it('exposes a busy state and disables interaction while loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: { default: 'Enregistrer' },
    });
    const button = wrapper.get('button');

    expect(button.attributes('data-loading')).toBe('true');
    expect(button.attributes('aria-busy')).toBe('true');
    expect(button.attributes('aria-disabled')).toBe('true');
    expect(button.attributes('disabled')).toBeDefined();
  });
});

describe('TextField', () => {
  it('forwards native attributes and exposes field semantics', () => {
    const wrapper = mount(TextField, {
      props: {
        id: 'full-name',
        label: 'Nom complet',
        hint: 'Votre nom légal',
        error: 'Le nom est requis',
        required: true,
      },
      attrs: {
        disabled: true,
        name: 'fullName',
        'aria-describedby': 'external-help',
      },
    });
    const input = wrapper.get('input');

    expect(input.attributes('disabled')).toBeDefined();
    expect(input.attributes('name')).toBe('fullName');
    expect(input.attributes('aria-required')).toBe('true');
    expect(input.attributes('aria-invalid')).toBe('true');
    expect(input.attributes('aria-describedby')).toBe(
      'external-help full-name-hint full-name-error'
    );
  });
});

describe('Link and Table', () => {
  it('forwards accessible link attributes and custom classes', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', variant: 'external' },
      attrs: { class: 'custom-link', 'aria-label': 'Documentation externe' },
      slots: { default: 'Documentation' },
    });
    const link = wrapper.get('a');

    expect(link.classes()).toContain('tds-link--external');
    expect(link.classes()).toContain('custom-link');
    expect(link.attributes('aria-label')).toBe('Documentation externe');
    expect(link.attributes('target')).toBe('_blank');
  });

  it('keeps table attributes on the table and wrapper classes on the wrapper', () => {
    const wrapper = mount(Table, {
      props: { wrapperClassName: 'table-scroll', bordered: true },
      attrs: { id: 'requests', 'aria-label': 'Demandes' },
      slots: { default: '<caption>Demandes récentes</caption>' },
    });
    const table = wrapper.get('table');

    expect(wrapper.classes()).toContain('table-scroll');
    expect(table.classes()).toContain('tds-table--bordered');
    expect(table.attributes('id')).toBe('requests');
    expect(table.attributes('aria-label')).toBe('Demandes');
  });
});

describe('Badge', () => {
  it('renders a dot indicator when requested', () => {
    const wrapper = mount(Badge, { props: { variant: 'success', dot: true } });
    expect(wrapper.find('.tds-badge__dot').exists()).toBe(true);
  });
});

describe('Editorial and navigation components', () => {
  it('renders callout, notice and tile semantics', async () => {
    const callout = mount(Callout, {
      props: { variant: 'info', title: 'Bon à savoir' },
      slots: { default: 'Préparez vos documents.' },
    });
    const notice = mount(Notice, {
      props: { variant: 'warning', title: 'Maintenance', closable: true },
      slots: { default: 'Service temporairement indisponible.' },
    });
    const tile = mount(Tile, {
      props: {
        href: '/services/etat-civil',
        title: 'État civil',
        description: 'Actes et démarches.',
      },
    });

    expect(callout.get('h3').text()).toBe('Bon à savoir');
    expect(notice.get('[role="status"]').text()).toContain('Maintenance');
    expect(tile.get('a').attributes('href')).toBe('/services/etat-civil');
    await notice.get('button').trigger('click');
    expect(notice.emitted('close')).toHaveLength(1);
  });

  it('emits remove from a removable Tag', async () => {
    const wrapper = mount(Tag, { props: { removable: true }, slots: { default: 'Filtre actif' } });
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('remove')).toHaveLength(1);
  });

  it('renders downloads, quotes and summaries with native semantics', () => {
    const download = mount(Download, {
      props: { href: '/guide.pdf', label: 'Guide des démarches', meta: 'PDF · 2 Mo' },
    });
    const quote = mount(Quote, {
      props: { author: 'Équipe TDGS', source: 'Principes' },
      slots: { default: 'Un texte utile.' },
    });
    const summary = mount(Summary, {
      props: { items: [{ href: '#conditions', label: 'Conditions' }] },
    });

    expect(download.get('a').attributes('href')).toBe('/guide.pdf');
    expect(quote.get('blockquote').text()).toContain('Un texte utile.');
    expect(summary.get('nav').attributes('aria-label')).toBe('Sommaire de la page');
  });
});

describe('Checkbox', () => {
  it('emits update:modelValue on change', async () => {
    const disabledWrapper = mount(Checkbox, {
      props: { label: "J'accepte", modelValue: false },
      attrs: { disabled: true, name: 'terms', 'aria-describedby': 'terms-help' },
    });
    const disabledInput = disabledWrapper.find('input[type="checkbox"]');
    expect(disabledInput.attributes('disabled')).toBeDefined();
    expect(disabledInput.attributes('name')).toBe('terms');
    expect(disabledInput.attributes('aria-describedby')).toBe('terms-help');

    const wrapper = mount(Checkbox, { props: { label: "J'accepte", modelValue: false } });
    const input = wrapper.find('input[type="checkbox"]');
    await input.setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });
});

describe('Tabs', () => {
  it('switches the visible panel when a tab is clicked', async () => {
    const wrapper = mount(Tabs, {
      props: {
        label: 'Sections du dossier',
        items: [
          { id: 'apercu', label: 'Aperçu' },
          { id: 'documents', label: 'Documents' },
        ],
      },
      slots: {
        'panel-apercu': 'Contenu aperçu',
        'panel-documents': 'Contenu documents',
      },
    });

    expect(wrapper.find('#panel-apercu').attributes('hidden')).toBeUndefined();
    expect(wrapper.find('#panel-documents').attributes('hidden')).toBeDefined();

    await wrapper.findAll('[role="tab"]')[1]?.trigger('click');

    expect(wrapper.find('#panel-apercu').attributes('hidden')).toBeDefined();
    expect(wrapper.find('#panel-documents').attributes('hidden')).toBeUndefined();
  });
});

describe('P1 workflow components', () => {
  it('emits a search event and updates the model', async () => {
    const wrapper = mount(SearchField, { props: { label: 'Rechercher', modelValue: '' } });
    const input = wrapper.get('input[type="search"]');

    await input.setValue('passeport');
    await wrapper.get('form').trigger('submit');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['passeport']);
    expect(wrapper.emitted('search')?.[0]).toEqual(['passeport']);
  });

  it('clears the search and emits the model update', async () => {
    const wrapper = mount(SearchField, { props: { label: 'Rechercher', modelValue: 'passeport' } });

    await wrapper.get('button[aria-label="Effacer la recherche"]').trigger('click');

    expect((wrapper.get('input').element as HTMLInputElement).value).toBe('');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['']);
    expect(wrapper.emitted('clear')).toHaveLength(1);
  });

  it('renders current step and progressbar semantics', () => {
    const stepper = mount(Stepper, {
      props: {
        currentId: 'documents',
        items: [
          { id: 'identity', label: 'Identité' },
          { id: 'documents', label: 'Documents' },
          { id: 'confirmation', label: 'Confirmation' },
        ],
      },
    });
    const progress = mount(Progress, { props: { label: 'Avancement', value: 40 } });

    expect(stepper.find('[aria-current="step"]').text()).toContain('Documents');
    expect(progress.get('[role="progressbar"]').attributes('aria-valuenow')).toBe('40');
  });

  it('emits the selected file and exposes the error description', async () => {
    const wrapper = mount(FileUpload, {
      props: { id: 'attachment', label: 'Justificatif', error: 'Le fichier est requis' },
    });
    const file = new File(['contenu'], 'justificatif.pdf', { type: 'application/pdf' });

    const input = wrapper.get('input[type="file"]');
    Object.defineProperty(input.element, 'files', { configurable: true, value: [file] });
    await input.trigger('change');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1);
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('attachment-error');
    expect(wrapper.text()).toContain('justificatif.pdf');
  });
});

describe('Icon', () => {
  it('keeps decorative icons hidden and labels informative icons', () => {
    const decorative = mount(Icon, { props: { name: 'check' } });
    const informative = mount(Icon, { props: { name: 'info', title: 'Information' } });

    expect(decorative.attributes('aria-hidden')).toBe('true');
    expect(informative.attributes('role')).toBe('img');
    expect(informative.text()).toBe('Information');
  });
});

describe('Password', () => {
  it('starts as password and reveals the value on toggle', async () => {
    const wrapper = mount(Password, { props: { label: 'Mot de passe', modelValue: 'secret' } });
    const input = wrapper.get('input');
    expect(input.attributes('type')).toBe('password');

    await wrapper.get('button[aria-label="Afficher le mot de passe"]').trigger('click');
    expect(input.attributes('type')).toBe('text');
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('true');
  });
});

describe('Range', () => {
  it('renders a labelled range input and emits the value', async () => {
    const wrapper = mount(Range, {
      props: { label: 'Budget', min: 0, max: 1000, modelValue: 250 },
    });
    const input = wrapper.get('input[type="range"]');
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('1000');
    expect(wrapper.text()).toContain('250');

    await input.setValue('500');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([500]);
  });
});

describe('Segmented', () => {
  it('renders a radiogroup and checks the current value', () => {
    const wrapper = mount(Segmented, {
      props: {
        label: 'Fréquence',
        modelValue: 'annee',
        options: [
          { value: 'mois', label: 'Mensuel' },
          { value: 'annee', label: 'Annuel' },
        ],
      },
    });
    expect(wrapper.get('[role="radiogroup"]').attributes('aria-label')).toBe('Fréquence');
    const radio = wrapper.get('input[value="annee"]') as unknown as { element: HTMLInputElement };
    expect(radio.element.checked).toBe(true);
  });
});

describe('Dropdown', () => {
  it('exposes a labelled menu trigger and toggles open state', async () => {
    const wrapper = mount(Dropdown, {
      props: { label: 'Actions du dossier' },
      slots: {
        default:
          '<li class="tds-dropdown__item"><button class="tds-dropdown__link">Modifier</button></li>',
      },
    });
    const trigger = wrapper.get('button');
    expect(trigger.attributes('aria-haspopup')).toBe('menu');
    expect(trigger.attributes('aria-expanded')).toBe('false');

    await trigger.trigger('click');
    expect(trigger.attributes('aria-expanded')).toBe('true');
    expect(wrapper.get('.tds-dropdown').attributes('data-open')).toBe('true');
  });
});

describe('Sidemenu', () => {
  it('marks the current page link', () => {
    const wrapper = mount(Sidemenu, {
      props: {
        title: 'Mon dossier',
        items: [
          { id: '1', label: 'Aperçu', href: '#apercu', current: true },
          { id: '2', label: 'Documents', href: '#documents' },
        ],
      },
    });
    expect(wrapper.get('a[href="#apercu"]').attributes('aria-current')).toBe('page');
    expect(wrapper.get('a[href="#documents"]').attributes('aria-current')).toBeUndefined();
  });
});

describe('Share', () => {
  it('renders external share links', () => {
    const wrapper = mount(Share, {
      props: {
        links: [{ network: 'x', label: 'Partager sur X', href: 'https://x.com' }],
      },
    });
    const link = wrapper.get('a');
    expect(link.attributes('target')).toBe('_blank');
    expect(link.classes()).toContain('tds-share__link-x');
  });
});

describe('Logo', () => {
  it('renders the title and a decorative mark', () => {
    const wrapper = mount(Logo, {
      props: { title: 'République du Tchad', subtitle: 'Portail des services', href: '/' },
      slots: { mark: '<span>T</span>' },
    });
    expect(wrapper.get('a').classes()).toContain('tds-logo');
    expect(wrapper.get('.tds-logo__mark').attributes('aria-hidden')).toBe('true');
    expect(wrapper.text()).toContain('République du Tchad');
  });
});
