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
      sidebar: [
        {
          label: 'Démarrage',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Démarrage rapide', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Design Tokens',
          items: [
            { label: 'Couleurs', slug: 'tokens/colors' },
            { label: 'Typographie', slug: 'tokens/typography' },
            { label: 'Espacement', slug: 'tokens/spacing' },
            { label: 'Arrondis', slug: 'tokens/radius' },
            { label: 'Ombres', slug: 'tokens/shadow' },
            { label: 'Motion', slug: 'tokens/motion' },
            { label: 'Z-index', slug: 'tokens/z-index' },
          ],
        },
        {
          label: 'Composants',
          items: [
            { label: 'Button', slug: 'components/button' },
            { label: 'Input', slug: 'components/input' },
            { label: 'Alert', slug: 'components/alert' },
            { label: 'Badge', slug: 'components/badge' },
            { label: 'Card', slug: 'components/card' },
            { label: 'Link', slug: 'components/link' },
            { label: 'Table', slug: 'components/table' },
          ],
        },
        {
          label: 'Patterns',
          items: [
            { label: 'Aperçu', slug: 'patterns/overview' },
            { label: 'Formulaire de connexion', slug: 'patterns/login-form' },
            { label: 'Formulaire multi-étapes', slug: 'patterns/multi-step-form' },
            { label: 'Résumé d\'erreurs', slug: 'patterns/error-summary' },
            { label: 'Page de confirmation', slug: 'patterns/confirmation-page' },
          ],
        },
        {
          label: 'Accessibilité',
          items: [
            { label: 'Principes WCAG', slug: 'accessibility/wcag' },
            { label: 'Clavier & focus', slug: 'accessibility/keyboard' },
            { label: 'Lecteurs d\'écran', slug: 'accessibility/screen-readers' },
            { label: 'RTL & Arabe', slug: 'accessibility/rtl' },
          ],
        },
        {
          label: 'Directives',
          items: [
            { label: 'Quand utiliser TDS', slug: 'guidelines/when-to-use' },
            { label: 'Anti-patterns', slug: 'guidelines/anti-patterns' },
            { label: 'Contribution', slug: 'guidelines/contributing' },
          ],
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
