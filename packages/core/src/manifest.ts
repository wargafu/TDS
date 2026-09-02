/**
 * Manifeste des composants TDGS — source unique de vérité.
 *
 * Décrit chaque famille de composants livrée par `@tdgs/core`. Consommé par la
 * documentation (catalogue, navigation, terrain de jeu), les tests et la CI
 * (`scripts/validate-manifest.mjs`) pour empêcher toute divergence entre le
 * code, les exports npm et les fiches.
 */

export type ComponentCategory =
  'base' | 'formulaires' | 'navigation' | 'contenu' | 'interaction' | 'retour' | 'utilitaire';

export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

export interface ComponentMeta {
  /** Identifiant technique = nom du dossier `src/components/<id>/`. */
  id: string;
  /** Libellé d'affichage (français). */
  title: string;
  /** Classe CSS racine. */
  cssClass: string;
  category: ComponentCategory;
  status: ComponentStatus;
  /** Version d'introduction (semver de `@tdgs/core`). */
  since: string;
  /**
   * Un custom element `tds-*` (dans `@tdgs/core/elements`) améliore ce
   * composant. Le composant reste utilisable sans JavaScript.
   */
  jsEnhanced: boolean;
  /** Motif d'accessibilité de référence, pour la fiche. */
  a11y: string;
  /** Slug de la fiche de documentation (`apps/docs/src/content/docs/<slug>`). */
  docSlug: string;
}

export const COMPONENTS: ComponentMeta[] = [
  // ── Base ────────────────────────────────────────────────────────────────
  {
    id: 'button',
    title: 'Button',
    cssClass: 'tds-button',
    category: 'base',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: '<button> natif, focus visible, états',
    docSlug: 'components/button',
  },
  {
    id: 'badge',
    title: 'Badge',
    cssClass: 'tds-badge',
    category: 'base',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Texte explicite, variantes sémantiques',
    docSlug: 'components/badge',
  },
  {
    id: 'card',
    title: 'Card',
    cssClass: 'tds-card',
    category: 'base',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Titre structuré, zone cliquable unique',
    docSlug: 'components/card',
  },
  {
    id: 'link',
    title: 'Link',
    cssClass: 'tds-link',
    category: 'base',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Libellé explicite, focus visible',
    docSlug: 'components/link',
  },
  {
    id: 'logo',
    title: 'Bloc de marque',
    cssClass: 'tds-logo',
    category: 'base',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Marque décorative, variante fond sombre',
    docSlug: 'components/logo',
  },

  // ── Formulaires ─────────────────────────────────────────────────────────
  {
    id: 'input',
    title: 'Input',
    cssClass: 'tds-input',
    category: 'formulaires',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Label lié, erreurs via aria-describedby',
    docSlug: 'components/input',
  },
  {
    id: 'search',
    title: 'Recherche',
    cssClass: 'tds-search',
    category: 'formulaires',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'role=search, libellé obligatoire',
    docSlug: 'components/search',
  },
  {
    id: 'file-upload',
    title: 'Dépôt de fichier',
    cssClass: 'tds-file-upload',
    category: 'formulaires',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'input[type=file], erreurs associées',
    docSlug: 'components/file-upload',
  },
  {
    id: 'password',
    title: 'Mot de passe',
    cssClass: 'tds-password',
    category: 'formulaires',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'Bascule afficher/masquer annoncée',
    docSlug: 'components/password',
  },
  {
    id: 'range',
    title: 'Curseur de plage',
    cssClass: 'tds-range',
    category: 'formulaires',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: false,
    a11y: 'input[type=range] natif, valeur accessible',
    docSlug: 'components/range',
  },
  {
    id: 'segmented',
    title: 'Contrôle segmenté',
    cssClass: 'tds-segmented',
    category: 'formulaires',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: false,
    a11y: 'radiogroup natif, navigation clavier',
    docSlug: 'components/segmented',
  },

  // ── Navigation ──────────────────────────────────────────────────────────
  {
    id: 'header',
    title: 'Header',
    cssClass: 'tds-header',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: true,
    a11y: 'landmark banner, lien d’évitement',
    docSlug: 'components/header',
  },
  {
    id: 'nav',
    title: 'Navigation',
    cssClass: 'tds-nav',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: true,
    a11y: 'aria-current=page, menu mobile',
    docSlug: 'components/nav',
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    cssClass: 'tds-breadcrumb',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'nav[aria-label], aria-current=page',
    docSlug: 'components/breadcrumb',
  },
  {
    id: 'pagination',
    title: 'Pagination',
    cssClass: 'tds-pagination',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'nav[aria-label], aria-current',
    docSlug: 'components/pagination',
  },
  {
    id: 'skip-link',
    title: 'Skip Link',
    cssClass: 'tds-skip-link',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Premier élément focusable',
    docSlug: 'components/skip-link',
  },
  {
    id: 'footer',
    title: 'Footer',
    cssClass: 'tds-footer',
    category: 'navigation',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'landmark contentinfo',
    docSlug: 'components/footer',
  },
  {
    id: 'sidemenu',
    title: 'Menu latéral',
    cssClass: 'tds-sidemenu',
    category: 'navigation',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'aria-current=page, sections dépliables',
    docSlug: 'components/sidemenu',
  },
  {
    id: 'dropdown',
    title: 'Menu déroulant',
    cssClass: 'tds-dropdown',
    category: 'navigation',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'Disclosure : bouton aria-expanded + liste',
    docSlug: 'components/dropdown',
  },

  // ── Contenu ─────────────────────────────────────────────────────────────
  {
    id: 'alert',
    title: 'Alert',
    cssClass: 'tds-alert',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'role=alert / status',
    docSlug: 'components/alert',
  },
  {
    id: 'table',
    title: 'Table',
    cssClass: 'tds-table',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: true,
    a11y: 'scope, caption ; tri annoncé (aria-sort)',
    docSlug: 'components/table',
  },
  {
    id: 'accordion',
    title: 'Accordion',
    cssClass: 'tds-accordion',
    category: 'contenu',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: false,
    a11y: '<details>/<summary> natif, zéro JS',
    docSlug: 'components/accordion',
  },
  {
    id: 'callout',
    title: 'Callout',
    cssClass: 'tds-callout',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Titre structuré, variantes sémantiques',
    docSlug: 'components/callout',
  },
  {
    id: 'notice',
    title: 'Notice',
    cssClass: 'tds-notice',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: true,
    a11y: 'role=status/alert, fermeture accessible',
    docSlug: 'components/notice',
  },
  {
    id: 'tag',
    title: 'Tag',
    cssClass: 'tds-tag',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Texte explicite, suppression accessible',
    docSlug: 'components/tag',
  },
  {
    id: 'tile',
    title: 'Tile',
    cssClass: 'tds-tile',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Lien unique, focus visible',
    docSlug: 'components/tile',
  },
  {
    id: 'download',
    title: 'Téléchargement',
    cssClass: 'tds-download',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'Lien explicite + métadonnées',
    docSlug: 'components/download',
  },
  {
    id: 'quote',
    title: 'Citation',
    cssClass: 'tds-quote',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'blockquote + cite',
    docSlug: 'components/quote',
  },
  {
    id: 'summary',
    title: 'Sommaire',
    cssClass: 'tds-summary',
    category: 'contenu',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'nav[aria-label], liste ordonnée',
    docSlug: 'components/summary',
  },
  {
    id: 'share',
    title: 'Partage',
    cssClass: 'tds-share',
    category: 'contenu',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'Liens libellés ; copie de lien annoncée',
    docSlug: 'components/share',
  },

  // ── Interaction ─────────────────────────────────────────────────────────
  {
    id: 'modal',
    title: 'Modal',
    cssClass: 'tds-modal',
    category: 'interaction',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: true,
    a11y: '<dialog> natif, piège de focus, Esc',
    docSlug: 'components/modal',
  },
  {
    id: 'tabs',
    title: 'Tabs',
    cssClass: 'tds-tabs',
    category: 'interaction',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'WAI-ARIA APG, roving tabindex',
    docSlug: 'components/tabs',
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    cssClass: 'tds-tooltip',
    category: 'interaction',
    status: 'stable',
    since: '0.2.0',
    jsEnhanced: true,
    a11y: 'aria-describedby, Esc, repli CSS',
    docSlug: 'components/tooltip',
  },
  {
    id: 'stepper',
    title: 'Étapes',
    cssClass: 'tds-stepper',
    category: 'interaction',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'aria-current=step',
    docSlug: 'components/stepper',
  },
  {
    id: 'progress',
    title: 'Progression',
    cssClass: 'tds-progress',
    category: 'interaction',
    status: 'stable',
    since: '0.1.0',
    jsEnhanced: false,
    a11y: 'role=progressbar, valeurs ARIA',
    docSlug: 'components/progress',
  },

  // ── Retour d'information ────────────────────────────────────────────────
  {
    id: 'toast',
    title: 'Toast',
    cssClass: 'tds-toast',
    category: 'retour',
    status: 'beta',
    since: '0.3.0',
    jsEnhanced: true,
    a11y: 'Région live polie, focus non volé',
    docSlug: 'components/toast',
  },
  {
    id: 'consent',
    title: 'Bandeau de consentement',
    cssClass: 'tds-consent',
    category: 'retour',
    status: 'beta',
    since: '0.3.0',
    jsEnhanced: true,
    a11y: 'role=dialog non modal, choix explicite',
    docSlug: 'components/consent',
  },
];

/** Composant par identifiant. */
export function getComponent(id: string): ComponentMeta | undefined {
  return COMPONENTS.find((component) => component.id === id);
}

/** Composants d'une catégorie, dans l'ordre du manifeste. */
export function componentsByCategory(category: ComponentCategory): ComponentMeta[] {
  return COMPONENTS.filter((component) => component.category === category);
}

/** Identifiants des composants améliorés par un custom element. */
export const JS_ENHANCED_COMPONENTS = COMPONENTS.filter((c) => c.jsEnhanced).map((c) => c.id);
