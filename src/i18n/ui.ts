/**
 * Diccionario de textos de interfaz y utilidades de i18n.
 * El contenido editorial largo (secciones, posts) vive en cada página / colección;
 * aquí solo van etiquetas reutilizables de UI.
 */
import { SITE, type Locale } from '../consts';

export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.faq': 'Preguntas frecuentes',
    'nav.skipToContent': 'Saltar al contenido',
    'lang.switch': 'Cambiar idioma',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.updated': 'Última actualización',
    'blog.readMore': 'Leer más',
    'blog.backToList': 'Volver al blog',
    'blog.published': 'Publicado el',
    'cta.primary': 'Empezar ahora',
    'cta.secondary': 'Ver documentación',
    '404.title': 'Página no encontrada',
    '404.text': 'La página que buscas no existe o fue movida.',
    '404.back': 'Volver al inicio',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.skipToContent': 'Skip to content',
    'lang.switch': 'Switch language',
    'footer.rights': 'All rights reserved.',
    'footer.updated': 'Last updated',
    'blog.readMore': 'Read more',
    'blog.backToList': 'Back to blog',
    'blog.published': 'Published on',
    'cta.primary': 'Get started',
    'cta.secondary': 'Read the docs',
    '404.title': 'Page not found',
    '404.text': 'The page you are looking for does not exist or was moved.',
    '404.back': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];

/** Devuelve la función de traducción para un idioma dado. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[SITE.defaultLocale][key];
  };
}

/**
 * Antepone la subruta de despliegue (`base`) a una ruta absoluta del sitio.
 * Lee import.meta.env.BASE_URL (lo inyecta Astro desde `base`; siempre con
 * barras inicial y final, p. ej. "/" o "/mi-repo/").
 * Úsalo para TODO href/asset interno para que funcione bajo GitHub Pages.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // "" o "/mi-repo"
  const clean = `/${path}`.replace(/\/+/g, '/');
  const joined = `${base}${clean}`.replace(/\/+/g, '/');
  return joined === '' ? '/' : joined;
}

/**
 * Construye una ruta con el prefijo de idioma correcto Y la subruta base.
 * es (default) -> "{base}/ruta"; en -> "{base}/en/ruta".
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  const withLocale =
    locale === SITE.defaultLocale ? clean : clean === '/' ? `/${locale}` : `/${locale}${clean}`;
  return withBase(withLocale);
}
