import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';
const basePrefix = base === '/' ? '' : base.replace(/\/$/, '');
const publicAsset = (path) => `${basePrefix}/${path.replace(/^\//, '')}`;

export default defineConfig({
  integrations: [
    starlight({
      title: 'TDGS',
      description:
        'Système de design open source proposé pour les services numériques publics du Tchad.',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Français', lang: 'fr' },
      },
      logo: {
        light: './src/assets/tdgs-mark.svg',
        dark: './src/assets/tdgs-mark.svg',
        alt: 'TDGS — Tchad Design System',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/kisaigo/TDGS',
      },
      editLink: {
        baseUrl: 'https://github.com/kisaigo/TDGS/edit/main/apps/docs/',
      },
      customCss: ['./src/styles/custom.css'],
      head: [
        {
          tag: 'link',
          attrs: { rel: 'icon', href: publicAsset('favicon.svg'), type: 'image/svg+xml' },
        },
        {
          tag: 'link',
          attrs: { rel: 'icon', href: publicAsset('favicon-32.png'), sizes: '32x32', type: 'image/png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: publicAsset('apple-touch-icon.png') },
        },
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: publicAsset('site.webmanifest') },
        },
        { tag: 'meta', attrs: { name: 'theme-color', content: '#0B3A82' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `${site}${publicAsset('brand/og-image.png')}` },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: `${site}${publicAsset('brand/og-image.png')}` },
        },
      ],
      components: {
        Footer: './src/components/Footer.astro',
        Sidebar: './src/components/Sidebar.astro',
        PageFrame: './src/components/PageFrame.astro',
        PageTitle: './src/components/PageTitle.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeSelect: './src/components/ThemeToggle.astro',
      },
      sidebar: [
        {
          label: 'Premiers pas',
          items: [
            { label: 'Introduction', slug: 'premiers-pas/introduction' },
            { label: 'Installation', slug: 'premiers-pas/installation' },
            { label: 'Démarrage rapide', slug: 'premiers-pas/quick-start' },
          ],
        },
        {
          label: 'Fondamentaux',
          items: [
            { label: 'Couleurs', slug: 'fondamentaux/colors' },
            { label: 'Typographie', slug: 'fondamentaux/typography' },
            { label: 'Espacement', slug: 'fondamentaux/spacing' },
            { label: 'Arrondis', slug: 'fondamentaux/radius' },
            { label: 'Ombres', slug: 'fondamentaux/shadow' },
            { label: 'Motion', slug: 'fondamentaux/motion' },
            { label: 'Z-index', slug: 'fondamentaux/z-index' },
            { label: 'Principes WCAG', slug: 'fondamentaux/wcag' },
            { label: 'Clavier & focus', slug: 'fondamentaux/keyboard' },
            { label: "Lecteurs d'écran", slug: 'fondamentaux/screen-readers' },
            { label: 'RTL & Arabe', slug: 'fondamentaux/rtl' },
            { label: 'Quand utiliser TDGS', slug: 'fondamentaux/when-to-use' },
            { label: 'Anti-patterns', slug: 'fondamentaux/anti-patterns' },
          ],
        },
        {
          label: 'Composants',
          items: [
            { label: 'Catalogue', slug: 'components' },
            {
              label: 'Base',
              items: [
                { label: 'Button', slug: 'components/button' },
                { label: 'Badge', slug: 'components/badge' },
                { label: 'Card', slug: 'components/card' },
                { label: 'Link', slug: 'components/link' },
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
                { label: 'Bloc de marque', slug: 'components/logo' },
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
          items: [
            { label: 'Aperçu', slug: 'integrations/overview' },
            { label: 'HTML / CSS', slug: 'integrations/vanilla' },
            { label: 'React', slug: 'integrations/react' },
            { label: 'Vue', slug: 'integrations/vue' },
          ],
        },
        {
          label: 'Showcases',
          items: [{ label: 'Sites utilisant TDGS', slug: 'showcases/overview' }],
        },
        {
          label: 'Modèles',
          items: [
            { label: 'Aperçu', slug: 'modeles/overview' },
            { label: 'Formulaire de connexion', slug: 'modeles/login-form' },
            { label: 'Formulaire multi-étapes', slug: 'modeles/multi-step-form' },
            { label: "Résumé d'erreurs", slug: 'modeles/error-summary' },
            { label: 'Page de confirmation', slug: 'modeles/confirmation-page' },
          ],
        },
        {
          label: "Mesure d'audience",
          items: [{ label: 'Principes', slug: 'mesure-audience/apercu' }],
        },
        {
          label: 'Communauté',
          items: [
            { label: 'Contribution', slug: 'communaute/contribution' },
            { label: 'Roadmap', slug: 'communaute/roadmap' },
          ],
        },
        {
          label: 'Aide',
          items: [{ label: 'FAQ', slug: 'aide/faq' }],
        },
        {
          label: 'À propos',
          items: [
            { label: 'Mission', slug: 'about/mission' },
            { label: 'Versionnement', slug: 'about/versioning' },
          ],
        },
      ],
    }),
  ],
  site,
  base,
});
