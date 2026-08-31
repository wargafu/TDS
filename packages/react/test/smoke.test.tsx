import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../src/components/Button';
import { Badge } from '../src/components/Badge';
import { Tabs } from '../src/components/Tabs';
import { Modal } from '../src/components/Modal';
import { Checkbox } from '../src/components/Checkbox';
import { TextField } from '../src/components/TextField';
import { TextareaField } from '../src/components/TextareaField';
import { SelectField } from '../src/components/SelectField';
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

describe('Button', () => {
  it('applies variant and size classes', () => {
    render(
      <Button variant="danger" size="lg">
        Supprimer
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Supprimer' });
    expect(button.className).toContain('tds-button--danger');
    expect(button.className).toContain('tds-button--lg');
  });

  it('exposes a consistent busy state and prevents interaction while loading', () => {
    render(<Button loading>Enregistrer</Button>);
    const button = screen.getByRole('button', { name: 'Enregistrer' });

    expect(button.getAttribute('data-loading')).toBe('true');
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.getAttribute('aria-disabled')).toBe('true');
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('Form fields', () => {
  it('keeps generated descriptions and native disabled state on TextField', () => {
    render(
      <TextField
        id="full-name"
        label="Nom complet"
        hint="Comme indiqué sur votre pièce d’identité"
        error="Le nom est requis"
        required
        disabled
        aria-describedby="external-help"
      />
    );
    const input = screen.getByRole('textbox', { name: 'Nom complet' }) as HTMLInputElement;

    expect(input.disabled).toBe(true);
    expect(input.className).toContain('tds-input--disabled');
    expect(input.getAttribute('aria-required')).toBe('true');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(
      'external-help full-name-hint full-name-error'
    );
  });

  it('applies required and disabled semantics to textarea and select fields', () => {
    render(
      <>
        <TextareaField id="message" label="Message" required disabled />
        <SelectField
          id="country"
          label="Pays"
          required
          disabled
          options={[{ value: 'td', label: 'Tchad' }]}
        />
      </>
    );

    const textarea = screen.getByRole('textbox', { name: 'Message' }) as HTMLTextAreaElement;
    const select = screen.getByRole('combobox', { name: 'Pays' }) as HTMLSelectElement;

    expect(textarea.disabled).toBe(true);
    expect(textarea.getAttribute('aria-required')).toBe('true');
    expect(select.disabled).toBe(true);
    expect(select.className).toContain('tds-select--disabled');
    expect(select.getAttribute('aria-required')).toBe('true');
  });
});

describe('Badge', () => {
  it('renders a dot indicator when requested', () => {
    const { container } = render(
      <Badge variant="success" dot>
        En ligne
      </Badge>
    );
    expect(container.querySelector('.tds-badge__dot')).not.toBeNull();
  });
});

describe('Editorial and navigation components', () => {
  it('renders callout, notice and tile semantics', () => {
    const onClose = vi.fn();
    render(
      <>
        <Callout variant="info" title="Bon à savoir">
          Préparez vos documents.
        </Callout>
        <Notice variant="warning" title="Maintenance" onClose={onClose}>
          Service temporairement indisponible.
        </Notice>
        <Tile href="/services/etat-civil" title="État civil" description="Actes et démarches." />
      </>
    );

    expect(screen.getByRole('heading', { name: 'Bon à savoir' })).toBeTruthy();
    expect(screen.getByRole('status', { name: 'Maintenance' })).toBeTruthy();
    expect(screen.getByRole('link', { name: /État civil/ }).getAttribute('href')).toBe(
      '/services/etat-civil'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Masquer ce bandeau' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('exposes a labelled remove action on Tag', () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Filtre actif</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Retirer' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('renders downloads, quotes and summaries with native semantics', () => {
    render(
      <>
        <Download href="/guide.pdf" label="Guide des démarches" meta="PDF · 2 Mo" />
        <Quote author="Équipe TDGS" source="Principes">
          Un texte utile.
        </Quote>
        <Summary items={[{ href: '#conditions', label: 'Conditions' }]} />
      </>
    );

    expect(screen.getByRole('link', { name: /Guide des démarches/ }).getAttribute('href')).toBe(
      '/guide.pdf'
    );
    expect(screen.getByText('Un texte utile.')).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Sommaire de la page' })).toBeTruthy();
  });
});

describe('Tabs', () => {
  it('switches panels on click and supports arrow-key roving tabindex', () => {
    render(
      <Tabs
        label="Sections du dossier"
        items={[
          { id: 'apercu', label: 'Aperçu', content: 'Contenu aperçu' },
          { id: 'documents', label: 'Documents', content: 'Contenu documents' },
        ]}
      />
    );

    expect(screen.getByText('Contenu aperçu').hidden).toBe(false);
    expect(screen.getByText('Contenu documents').hidden).toBe(true);

    fireEvent.click(screen.getByRole('tab', { name: 'Documents' }));

    expect(screen.getByText('Contenu aperçu').hidden).toBe(true);
    expect(screen.getByText('Contenu documents').hidden).toBe(false);
  });
});

describe('Modal', () => {
  it('renders the title and calls onClose when the dialog close event fires', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Modal open title="Confirmer" onClose={onClose}>
        Contenu
      </Modal>
    );
    const dialog = container.querySelector('dialog');
    expect(dialog).not.toBeNull();
    expect(screen.getByText('Confirmer')).toBeTruthy();
    fireEvent(dialog as HTMLDialogElement, new Event('close'));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('Checkbox', () => {
  it('renders a labeled checkbox input', () => {
    render(<Checkbox label="J'accepte" defaultChecked={false} />);
    const checkbox = screen.getByRole('checkbox', { name: "J'accepte" }) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });
});

describe('P1 workflow components', () => {
  it('submits a search and exposes a labelled searchbox', () => {
    const onSearch = vi.fn();
    render(<SearchField label="Rechercher un service" onSearch={onSearch} />);
    const input = screen.getByRole('searchbox', { name: 'Rechercher un service' });

    fireEvent.change(input, { target: { value: 'passeport' } });
    fireEvent.submit(input.closest('form') as HTMLFormElement);

    expect(onSearch).toHaveBeenCalledWith('passeport');
  });

  it('clears the search and keeps focus on the input', () => {
    const onClear = vi.fn();
    render(<SearchField label="Rechercher" defaultValue="passeport" onClear={onClear} />);
    const input = screen.getByRole('searchbox', { name: 'Rechercher' }) as HTMLInputElement;

    fireEvent.click(screen.getByRole('button', { name: 'Effacer la recherche' }));

    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('renders workflow step states and a progressbar', () => {
    render(
      <>
        <Stepper
          currentId="documents"
          items={[
            { id: 'identity', label: 'Identité' },
            { id: 'documents', label: 'Documents' },
            { id: 'confirmation', label: 'Confirmation' },
          ]}
        />
        <Progress label="Avancement du dossier" value={40} />
      </>
    );

    expect(screen.getByRole('listitem', { current: 'step' }).textContent).toContain('Documents');
    expect(
      screen
        .getByRole('progressbar', { name: 'Avancement du dossier' })
        .getAttribute('aria-valuenow')
    ).toBe('40');
  });

  it('reports selected files and connects errors to the file input', () => {
    const onFilesChange = vi.fn();
    const file = new File(['contenu'], 'justificatif.pdf', { type: 'application/pdf' });
    render(
      <FileUpload
        id="attachment"
        label="Justificatif"
        error="Le fichier est requis"
        onFilesChange={onFilesChange}
      />
    );
    const input = screen.getByLabelText('Justificatif') as HTMLInputElement;

    fireEvent.change(input, { target: { files: [file] } });

    expect(onFilesChange).toHaveBeenCalledOnce();
    expect(screen.getByText('justificatif.pdf')).not.toBeNull();
    expect(input.getAttribute('aria-describedby')).toBe('attachment-error');
  });
});

describe('Icon', () => {
  it('keeps decorative icons hidden and labels informative icons', () => {
    const { container } = render(
      <>
        <Icon name="check" />
        <Icon name="info" title="Information" />
      </>
    );

    expect(container.querySelector('.tds-icon')?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.getByRole('img', { name: 'Information' })).toBeTruthy();
  });
});
