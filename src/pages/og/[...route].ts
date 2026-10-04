/**
 * Generación de imágenes Open Graph (1200x630) por página, en build.
 * Usa astro-og-canvas (Skia/canvaskit) con una fuente local => sin red en build.
 * Cada página referencia su imagen vía el prop `image` de BaseLayout.
 *
 * Clave de ruta (route) = `${locale}` para home, `${locale}/blog` para el índice,
 * `${locale}/blog/${slug}` para posts. Se sirve en /og/<route>.png.
 */
import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { SITE, type Locale } from '../../consts';
import { getLanding } from '../../data/landing';

type Page = { title: string; description: string };
const pages: Record<string, Page> = {
  // Imagen OG por defecto (coincide con SITE.defaultOgImage = /og/default.png).
  default: { title: SITE.name, description: SITE.tagline[SITE.defaultLocale] },
};

// Home por idioma
for (const locale of SITE.locales as readonly Locale[]) {
  const c = getLanding(locale);
  pages[locale] = { title: c.meta.title, description: SITE.tagline[locale] };
  pages[`${locale}/blog`] = {
    title: locale === 'es' ? 'Blog — SEO, AEO y GEO' : 'Blog — SEO, AEO and GEO',
    description: c.meta.description,
  };
}

// Posts del blog
const posts = await getCollection('blog', (p) => !p.data.draft);
for (const post of posts) {
  pages[`${post.data.lang}/blog/${post.data.slug}`] = {
    title: post.data.title,
    description: post.data.description,
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page: Page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [
      [14, 17, 22],
      [31, 78, 216],
    ],
    padding: 70,
    fonts: ['./src/assets/fonts/Inter.ttf'],
    font: {
      title: {
        color: [255, 255, 255],
        size: 60,
        weight: 'Bold',
        lineHeight: 1.2,
        families: ['Inter'],
      },
      description: {
        color: [200, 205, 215],
        size: 30,
        weight: 'Normal',
        lineHeight: 1.4,
        families: ['Inter'],
      },
    },
  }),
});
