import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import rehypeArrowLinks from './src/lib/rehype-arrow-links.mjs';

const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  markdown: {
    // La coloration syntaxique est prise en charge par Expressive Code.
    syntaxHighlight: false,
    rehypePlugins: [rehypeArrowLinks],
  },
  integrations: [
    // Expressive Code doit précéder MDX pour intercepter les blocs de code.
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => `[data-code-theme='${theme.name}']`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: 'var(--tds-radius-md)',
        borderColor: 'var(--tds-border-subtle)',
        codeFontFamily: 'var(--tds-font-family-mono)',
        uiFontFamily: 'var(--tds-font-family-primary)',
        frames: {
          shadowColor: 'transparent',
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
});
