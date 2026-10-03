/**
 * Definición de colecciones de contenido (Astro 5 Content Layer).
 * El blog alimenta la frescura (señal GEO) y usa el mismo `slug` en ambos
 * idiomas para que hreflang enlace las versiones correctamente.
 */
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
    // ID explícito = ruta completa sin extensión (p. ej. "en/que-es-geo").
    // Evita que posts con el mismo nombre en distintos idiomas colisionen.
    generateId: ({ entry }) => entry.replace(/\.[^.]+$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().max(170),
      lang: z.enum(['es', 'en']),
      // Slug compartido entre idiomas (ej. "que-es-geo").
      slug: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Equipo Max Optimice'),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
