/**
 * Configuración central del sitio.
 * Edita SOLO este archivo para adaptar la plantilla a tu marca.
 * Todo (meta tags, JSON-LD, sitemap, OG, hreflang) lee de aquí.
 */

export const SITE = {
  // ⚠️ ORIGEN del sitio (protocolo + host), SIN subruta ni barra final.
  //   - Dominio propio:        'https://www.tudominio.com'
  //   - GitHub Pages proyecto: 'https://TU_USUARIO.github.io'
  url: 'https://www.example.com',
  // ⚠️ Subruta de despliegue (debe coincidir con `base` en astro.config.mjs).
  //   - Dominio propio, Vercel/Netlify/Cloudflare, o usuario.github.io: '/'
  //   - GitHub Pages de proyecto:                                       '/nombre-del-repo'
  base: '/',
  // Nombre de marca / organización.
  name: 'Max Optimice',
  // Eslogan corto (se usa como fallback de descripción).
  tagline: {
    es: 'La plantilla de landing optimizada al máximo para SEO, AEO y GEO.',
    en: 'The landing page template maximally optimized for SEO, AEO and GEO.',
  },
  // Idioma por defecto (coincide con astro.config.mjs).
  defaultLocale: 'es' as const,
  locales: ['es', 'en'] as const,
  // Logo para JSON-LD (ruta absoluta recomendada por Google: mínimo 112x112).
  logo: '/og/logo.png',
  // Imagen OG por defecto (1200x630).
  defaultOgImage: '/og/default.png',
  // Perfiles sociales -> alimentan "sameAs" de Organization (señal de entidad para GEO).
  social: {
    x: 'https://x.com/tu_marca',
    linkedin: 'https://www.linkedin.com/company/tu-marca',
    github: 'https://github.com/tu-marca',
  },
  // Handle de X/Twitter para las Twitter Cards (con @).
  twitterHandle: '@tu_marca',
  // Datos de contacto para Organization schema.
  organization: {
    legalName: 'Max Optimice S.A.C.',
    email: 'hola@example.com',
    telephone: '+51-999-999-999',
    foundingDate: '2024',
  },
} as const;

export type Locale = (typeof SITE.locales)[number];

/** Mapea el locale interno al código BCP-47 completo para hreflang / og:locale. */
export const LOCALE_BCP47: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en-US',
};

/** Etiqueta legible de cada idioma (para el selector). */
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};
