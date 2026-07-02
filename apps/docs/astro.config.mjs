import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  integrations: [
    starlight({
      title: 'TDS',
      description: 'Système de Design de l’État — République du Tchad',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Français', lang: 'fr' },
      },
      logo: {
        light: './src/assets/tds-logo-official.png',
        dark: './src/assets/tds-logo-official.png',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/wargafu/TDS',
      },
      editLink: {
        baseUrl: 'https://github.com/wargafu/TDS/edit/main/apps/docs/',
      },
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/Footer.astro',
        Sidebar: './src/components/Sidebar.astro',
        PageFrame: './src/components/PageFrame.astro',
      },
      sidebar: [
        {
          label: 'Premiers pas',
          items: [
            { label: 'Vue d\'ensemble', slug: 'premiers-pas' },
            { label: 'Introduction', slug: 'premiers-pas/introduction' },
            { label: 'Installation', slug: 'premiers-pas/installation' },
            { label: 'Démarrage rapide', slug: 'premiers-pas/quick-start' },
          ],
        },
        {
          label: 'Fondamentaux',
          items: [
            { label: 'Vue d\'ensemble', slug: 'fondamentaux' },
            { label: 'Couleurs', slug: 'fondamentaux/colors' },
            { label: 'Typographie', slug: 'fondamentaux/typography' },
            { label: 'Espacement', slug: 'fondamentaux/spacing' },
            { label: 'Arrondis', slug: 'fondamentaux/radius' },
            { label: 'Ombres', slug: 'fondamentaux/shadow' },
            { label: 'Motion', slug: 'fondamentaux/motion' },
            { label: 'Z-index', slug: 'fondamentaux/z-index' },
            { label: 'Principes WCAG', slug: 'fondamentaux/wcag' },
            { label: 'Clavier & focus', slug: 'fondamentaux/keyboard' },
            { label: 'Lecteurs d\'écran', slug: 'fondamentaux/screen-readers' },
            { label: 'RTL & Arabe', slug: 'fondamentaux/rtl' },
            { label: 'Quand utiliser TDS', slug: 'fondamentaux/when-to-use' },
            { label: 'Anti-patterns', slug: 'fondamentaux/anti-patterns' },
          ],
        },
        {
          label: 'Composants',
          items: [
            { label: 'Vue d\'ensemble', slug: 'components' },
            { label: 'Button', slug: 'components/button' },
            { label: 'Input', slug: 'components/input' },
            { label: 'Alert', slug: 'components/alert' },
            { label: 'Badge', slug: 'components/badge' },
            { label: 'Card', slug: 'components/card' },
            { label: 'Link', slug: 'components/link' },
            { label: 'Table', slug: 'components/table' },
            { label: 'Header', slug: 'components/header' },
            { label: 'Navigation', slug: 'components/nav' },
            { label: 'Breadcrumb', slug: 'components/breadcrumb' },
            { label: 'Pagination', slug: 'components/pagination' },
            { label: 'Modal', slug: 'components/modal' },
            { label: 'Skip Link', slug: 'components/skip-link' },
            { label: 'Footer', slug: 'components/footer' },
            { label: 'Accordion', slug: 'components/accordion' },
            { label: 'Tabs', slug: 'components/tabs' },
            { label: 'Tooltip', slug: 'components/tooltip' },
          ],
        },
        {
          label: 'Modèles',
          items: [
            { label: 'Vue d\'ensemble', slug: 'modeles' },
            { label: 'Aperçu', slug: 'modeles/overview' },
            { label: 'Formulaire de connexion', slug: 'modeles/login-form' },
            { label: 'Formulaire multi-étapes', slug: 'modeles/multi-step-form' },
            { label: 'Résumé d\'erreurs', slug: 'modeles/error-summary' },
            { label: 'Page de confirmation', slug: 'modeles/confirmation-page' },
          ],
        },
        {
          label: 'Mesure d\'audience',
          items: [
            { label: 'Vue d\'ensemble', slug: 'mesure-audience' },
            { label: 'Principes', slug: 'mesure-audience/apercu' },
          ],
        },
        {
          label: 'Communauté',
          items: [
            { label: 'Vue d\'ensemble', slug: 'communaute' },
            { label: 'Contribution', slug: 'communaute/contribution' },
            { label: 'Roadmap', slug: 'communaute/roadmap' },
          ],
        },
        {
          label: 'Aide',
          items: [
            { label: 'Vue d\'ensemble', slug: 'aide' },
            { label: 'FAQ', slug: 'aide/faq' },
          ],
        },
        {
          label: 'À propos',
          items: [
            { label: 'Vue d\'ensemble', slug: 'about' },
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
