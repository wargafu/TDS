/**
 * Arborescence de navigation du site — source unique pour le menu de l'en-tête,
 * la barre latérale, le fil d'Ariane et la pagination précédent/suivant.
 * Les `slug` correspondent aux entrées de la collection `docs` (sans extension).
 */

export interface NavItem {
  label: string;
  slug?: string;
  items?: NavItem[];
  badge?: string;
}

export interface NavSection {
  /** Libellé affiché dans le menu principal. */
  label: string;
  /** Slug de la page d'accueil de la section (sert à surligner le menu). */
  rootSlug: string;
  items: NavItem[];
}

export const SECTIONS: NavSection[] = [
  {
    label: 'Premiers pas',
    rootSlug: 'premiers-pas/index',
    items: [
      { label: 'Introduction', slug: 'premiers-pas/introduction' },
      { label: 'Installation', slug: 'premiers-pas/installation' },
      { label: 'Démarrage rapide', slug: 'premiers-pas/quick-start' },
    ],
  },
  {
    label: 'Fondamentaux',
    rootSlug: 'fondamentaux/index',
    items: [
      { label: 'Quand utiliser TDGS', slug: 'fondamentaux/when-to-use' },
      { label: 'Anti-patterns', slug: 'fondamentaux/anti-patterns' },
      {
        label: 'Tokens',
        items: [
          { label: 'Couleurs', slug: 'fondamentaux/colors' },
          { label: 'Typographie', slug: 'fondamentaux/typography' },
          { label: 'Espacement', slug: 'fondamentaux/spacing' },
          { label: 'Arrondis', slug: 'fondamentaux/radius' },
          { label: 'Ombres', slug: 'fondamentaux/shadow' },
          { label: 'Motion', slug: 'fondamentaux/motion' },
          { label: 'Z-index', slug: 'fondamentaux/z-index' },
        ],
      },
      {
        label: 'Accessibilité',
        items: [
          { label: 'Principes WCAG', slug: 'fondamentaux/wcag' },
          { label: 'Clavier & focus', slug: 'fondamentaux/keyboard' },
          { label: "Lecteurs d'écran", slug: 'fondamentaux/screen-readers' },
          { label: 'RTL & arabe', slug: 'fondamentaux/rtl' },
        ],
      },
    ],
  },
  {
    label: 'Composants',
    rootSlug: 'components/index',
    items: [
      { label: 'Catalogue', slug: 'components/index' },
      {
        label: 'Base',
        items: [
          { label: 'Button', slug: 'components/button' },
          { label: 'Badge', slug: 'components/badge' },
          { label: 'Card', slug: 'components/card' },
          { label: 'Link', slug: 'components/link' },
          { label: 'Bloc de marque', slug: 'components/logo' },
        ],
      },
      {
        label: 'Formulaires',
        items: [
          { label: 'Input', slug: 'components/input' },
          { label: 'Recherche', slug: 'components/search' },
          { label: 'Dépôt de fichier', slug: 'components/file-upload' },
          { label: 'Mot de passe', slug: 'components/password' },
          { label: 'Curseur de plage', slug: 'components/range' },
          { label: 'Contrôle segmenté', slug: 'components/segmented' },
        ],
      },
      {
        label: 'Navigation',
        items: [
          { label: 'Header', slug: 'components/header' },
          { label: 'Navigation', slug: 'components/nav' },
          { label: 'Breadcrumb', slug: 'components/breadcrumb' },
          { label: 'Pagination', slug: 'components/pagination' },
          { label: 'Skip Link', slug: 'components/skip-link' },
          { label: 'Footer', slug: 'components/footer' },
          { label: 'Menu latéral', slug: 'components/sidemenu' },
          { label: 'Menu déroulant', slug: 'components/dropdown' },
        ],
      },
      {
        label: 'Contenu',
        items: [
          { label: 'Alert', slug: 'components/alert' },
          { label: 'Table', slug: 'components/table' },
          { label: 'Accordion', slug: 'components/accordion' },
          { label: 'Callout', slug: 'components/callout' },
          { label: 'Notice', slug: 'components/notice' },
          { label: 'Tag', slug: 'components/tag' },
          { label: 'Tile', slug: 'components/tile' },
          { label: 'Téléchargement', slug: 'components/download' },
          { label: 'Citation', slug: 'components/quote' },
          { label: 'Sommaire', slug: 'components/summary' },
          { label: 'Partage', slug: 'components/share' },
        ],
      },
      {
        label: 'Interaction et progression',
        items: [
          { label: 'Modal', slug: 'components/modal' },
          { label: 'Tabs', slug: 'components/tabs' },
          { label: 'Tooltip', slug: 'components/tooltip' },
          { label: 'Étapes', slug: 'components/stepper' },
          { label: 'Progression', slug: 'components/progress' },
        ],
      },
      {
        label: 'Utilitaire',
        items: [{ label: 'Icon', slug: 'components/icon' }],
      },
    ],
  },
  {
    label: 'Intégrations',
    rootSlug: 'integrations/index',
    items: [
      { label: 'Aperçu', slug: 'integrations/overview' },
      { label: 'HTML / CSS', slug: 'integrations/vanilla' },
      { label: 'React', slug: 'integrations/react' },
      { label: 'Vue', slug: 'integrations/vue' },
    ],
  },
  {
    label: 'Modèles',
    rootSlug: 'modeles/index',
    items: [
      { label: 'Patterns gouvernementaux', slug: 'modeles/overview' },
      { label: 'Formulaire de connexion', slug: 'modeles/login-form' },
      { label: 'Formulaire multi-étapes', slug: 'modeles/multi-step-form' },
      { label: "Résumé d'erreurs", slug: 'modeles/error-summary' },
      { label: 'Page de confirmation', slug: 'modeles/confirmation-page' },
    ],
  },
  {
    label: 'Showcases',
    rootSlug: 'showcases/index',
    items: [{ label: 'Sites utilisant TDGS', slug: 'showcases/overview' }],
  },
  {
    label: 'Communauté',
    rootSlug: 'communaute/index',
    items: [
      { label: "Mesure d'audience", slug: 'mesure-audience/apercu' },
      { label: 'Contribution', slug: 'communaute/contribution' },
      { label: 'Roadmap', slug: 'communaute/roadmap' },
      { label: 'FAQ', slug: 'aide/faq' },
      { label: 'Mission', slug: 'about/mission' },
      { label: 'Versionnement', slug: 'about/versioning' },
      { label: 'État du projet', slug: 'about/statut' },
    ],
  },
];

/** Toutes les entrées « feuille » d'une section, dans l'ordre d'affichage. */
export function flattenItems(items: NavItem[]): Required<Pick<NavItem, 'label' | 'slug'>>[] {
  const out: Required<Pick<NavItem, 'label' | 'slug'>>[] = [];
  for (const item of items) {
    if (item.slug) out.push({ label: item.label, slug: item.slug });
    if (item.items) out.push(...flattenItems(item.items));
  }
  return out;
}

/** Section contenant un slug donné (ou dont c'est la racine). */
export function sectionForSlug(slug: string): NavSection | undefined {
  return SECTIONS.find(
    (section) =>
      section.rootSlug === slug || flattenItems(section.items).some((item) => item.slug === slug)
  );
}

/** Pagination précédent / suivant au sein de la section. */
export function siblingPages(slug: string): {
  prev?: { label: string; slug: string };
  next?: { label: string; slug: string };
} {
  const section = sectionForSlug(slug);
  if (!section) return {};
  const flat = flattenItems(section.items);
  const index = flat.findIndex((item) => item.slug === slug);
  if (index === -1) return {};
  return { prev: flat[index - 1], next: flat[index + 1] };
}

/** Fil d'Ariane depuis l'accueil jusqu'à la page courante. */
export function breadcrumbs(slug: string, title: string): { label: string; slug?: string }[] {
  const crumbs: { label: string; slug?: string }[] = [{ label: 'Accueil', slug: 'index' }];
  const section = sectionForSlug(slug);
  if (section && section.rootSlug !== slug) {
    crumbs.push({ label: section.label, slug: section.rootSlug });
  }
  crumbs.push({ label: title });
  return crumbs;
}
