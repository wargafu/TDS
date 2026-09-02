import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** `splash` masque la barre latérale et le sommaire (pages d'accueil de section). */
    template: z.enum(['doc', 'splash']).default('doc'),
    /** Désactive le sommaire de droite pour cette page. */
    tableOfContents: z.boolean().default(true),
    /** Étiquette courte affichée à côté du titre (ex. « Bêta », « Stable »). */
    badge: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
