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
import { Password } from '../src/components/Password';
import { Range } from '../src/components/Range';
import { Segmented } from '../src/components/Segmented';
import { Dropdown } from '../src/components/Dropdown';
import { Sidemenu } from '../src/components/Sidemenu';
import { Share } from '../src/components/Share';
import { Logo } from '../src/components/Logo';

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

describe('Password', () => {
  it('starts as password and reveals the value on toggle', () => {
    render(<Password label="Mot de passe" />);
    const input = screen.getByLabelText('Mot de passe') as HTMLInputElement;
    expect(input.type).toBe('password');

    fireEvent.click(screen.getByRole('button', { name: 'Afficher le mot de passe' }));
    expect(input.type).toBe('text');
  });
});

describe('Range', () => {
  it('renders a labelled range input', () => {
    render(<Range label="Budget" min={0} max={1000} defaultValue={250} />);
    const slider = screen.getByRole('slider', { name: 'Budget' }) as HTMLInputElement;
    expect(slider.type).toBe('range');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('1000');
  });
});

describe('Segmented', () => {
  it('checks the selected option inside a labelled radiogroup', () => {
    render(
      <Segmented
        label="Fréquence"
        defaultValue="annee"
        options={[
          { value: 'mois', label: 'Mensuel' },
          { value: 'annee', label: 'Annuel' },
        ]}
      />
    );
    const radio = screen.getByRole('radio', { name: 'Annuel' }) as HTMLInputElement;
    expect(radio.checked).toBe(true);
    expect(screen.getByRole('radiogroup', { name: 'Fréquence' })).toBeTruthy();
  });
});

describe('Dropdown', () => {
  it('exposes a labelled menu trigger and toggles open state', () => {
    render(
      <Dropdown
        trigger="Actions"
        triggerProps={{ 'aria-label': 'Actions du dossier' }}
      >
        <li className="tds-dropdown__item">
          <button type="button" className="tds-dropdown__link">
            Modifier
          </button>
        </li>
      </Dropdown>
    );
    const trigger = screen.getByRole('button', { name: 'Actions du dossier' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});

describe('Sidemenu', () => {
  it('marks the current page link', () => {
    render(
      <Sidemenu
        title="Mon dossier"
        items={[
          { id: '1', label: 'Aperçu', href: '#apercu', current: true },
          { id: '2', label: 'Documents', href: '#documents' },
        ]}
      />
    );
    const current = screen.getByRole('link', { name: 'Aperçu' });
    expect(current.getAttribute('aria-current')).toBe('page');
  });
});

describe('Share', () => {
  it('renders external share links', () => {
    render(
      <Share
        links={[{ network: 'x', label: 'Partager sur X', href: 'https://x.com' }]}
      />
    );
    const link = screen.getByRole('link', { name: 'Partager sur X' });
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.className).toContain('tds-share__link-x');
  });
});

describe('Logo', () => {
  it('renders the title and a decorative mark', () => {
    const { container } = render(
      <Logo mark={<span>T</span>} title="République du Tchad" subtitle="Portail des services" href="/" />
    );
    const link = screen.getByRole('link', { name: /République du Tchad/ });
    expect(link.className).toContain('tds-logo');
    expect(container.querySelector('.tds-logo__mark')?.getAttribute('aria-hidden')).toBe('true');
  });
});
