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
 * Construye una ruta con el prefijo de idioma correcto.
 * es (default) -> "/ruta"; en -> "/en/ruta".
 */
export function localizedPath(path: string, locale: Locale): string {
  const clean = `/${path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  if (locale === SITE.defaultLocale) return clean;
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`;
}
