// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { SITE } from './src/consts';

// https://astro.build/config
export default defineConfig({
  // ⚠️ CAMBIA esto por tu dominio real. Es la base para canonical, OG, sitemap y hreflang.
  site: SITE.url,

  // i18n nativo de Astro. El español vive en la raíz (/) y el inglés en /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false, // es -> "/", en -> "/en/"
    },
  },

  integrations: [
    mdx(),
    sitemap({
      // Declara los idiomas alternativos en el sitemap (refuerza hreflang).
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US' },
      },
    }),
  ],

  // HTML comprimido: menos bytes => mejor LCP (sin tocar el markup que leen los crawlers).
  compressHTML: true,

  build: {
    // CSS en línea cuando es pequeño: elimina un round-trip y ayuda al LCP.
    inlineStylesheets: 'auto',
  },
});
