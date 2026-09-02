// @vitest-environment jsdom
import { describe, expect, it, beforeAll } from 'vitest';
import { iconPaths, ICON_NAMES, RTL_MIRRORED_ICONS } from '../src/icons/index';

describe('jeu d’icônes', () => {
  it('expose au moins 40 icônes', () => {
    expect(ICON_NAMES.length).toBeGreaterThanOrEqual(40);
  });

  it('chaque tracé est une donnée `d` plausible', () => {
    for (const [name, d] of Object.entries(iconPaths)) {
      expect(d, name).toMatch(/^[Mm]/);
      expect(d.length, name).toBeGreaterThan(4);
    }
  });

  it('les icônes miroir RTL existent toutes dans le jeu', () => {
    for (const name of RTL_MIRRORED_ICONS) {
      expect(iconPaths[name], name).toBeDefined();
    }
  });
});

describe('<tds-icon>', () => {
  beforeAll(async () => {
    await import('../src/elements/icon');
  });

  it('rend un SVG avec le bon tracé et masque par défaut', () => {
    document.body.innerHTML = '<tds-icon name="arrow-right"></tds-icon>';
    const svg = document.querySelector('tds-icon svg')!;
    expect(svg.getAttribute('aria-hidden')).toBe('true');
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(iconPaths.arrowRight);
    expect(svg.classList.contains('tds-icon--mirror')).toBe(true);
  });

  it('rend une icône signifiante avec label', () => {
    document.body.innerHTML = '<tds-icon name="check" label="Validé"></tds-icon>';
    const svg = document.querySelector('tds-icon svg')!;
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Validé');
  });

  it('accepte un nom camelCase et une taille numérique', () => {
    document.body.innerHTML = '<tds-icon name="fileText" size="32"></tds-icon>';
    const svg = document.querySelector('tds-icon svg') as SVGElement;
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(iconPaths.fileText);
    expect(svg.style.inlineSize).toBe('32px');
  });
});
