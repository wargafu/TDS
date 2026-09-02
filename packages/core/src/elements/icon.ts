import { iconPaths, RTL_MIRRORED_ICONS, type IconName } from '../icons/index';
import { define } from './base';

const SVG_NS = 'http://www.w3.org/2000/svg';

function toCamel(name: string): string {
  return name.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

/**
 * `<tds-icon name="arrow-right" size="md" label="…">` — icône SVG pour les
 * usages HTML purs (les bindings React / Vue ont leur propre `<Icon>`).
 *
 * - `name` : nom kebab ou camelCase du jeu `@tdgs/core/icons`.
 * - `size` : `xs | sm | md | lg` ou un nombre de pixels.
 * - `label` : rend l'icône signifiante (`role="img"`) ; sinon `aria-hidden`.
 */
export class TdsIcon extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['name', 'size', 'label'];
  }

  attributeChangedCallback(): void {
    if (this.isConnected) this.render();
  }

  connectedCallback(): void {
    this.style.display = this.style.display || 'inline-flex';
    this.render();
  }

  private render(): void {
    const raw = this.getAttribute('name') ?? '';
    const key = toCamel(raw) as IconName;
    const d = iconPaths[key];
    this.textContent = '';
    if (!d) return;

    const size = this.getAttribute('size') ?? 'md';
    const label = this.getAttribute('label');
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute(
      'class',
      [
        'tds-icon',
        /^\d+$/.test(size) ? '' : `tds-icon--${size}`,
        mirrored(key) ? 'tds-icon--mirror' : '',
      ]
        .filter(Boolean)
        .join(' ')
    );
    if (/^\d+$/.test(size)) {
      svg.style.inlineSize = `${size}px`;
      svg.style.blockSize = `${size}px`;
    }
    if (label) {
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', label);
    } else {
      svg.setAttribute('aria-hidden', 'true');
    }
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', d);
    svg.append(path);
    this.append(svg);
  }
}

function mirrored(name: IconName): boolean {
  return RTL_MIRRORED_ICONS.includes(name);
}

define('tds-icon', TdsIcon);
