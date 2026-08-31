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
