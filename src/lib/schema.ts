/**
 * Constructores de JSON-LD (schema.org).
 *
 * Priorizamos los tipos que SIGUEN produciendo rich results en Google (2026)
 * y/o que las IAs usan para comprender la página:
 *   - Organization  -> knowledge panel / entidad (señal fuerte para GEO)
 *   - WebSite       -> "Site Names" (ya NO sitelinks searchbox, deprecado 2024)
 *   - BreadcrumbList -> migas en SERP
 *   - FAQPage       -> ya NO da rich result en Google (removido mayo 2026),
 *                      pero las IAs lo parsean => valor AEO/GEO. Lo incluimos
 *                      sin prometer rich snippet.
 *   - Article       -> frescura (datePublished/dateModified) + E-E-A-T
 *   - Product/Offer + AggregateRating -> estrellas y precio (rich result vigente)
 */
import { SITE, type Locale, LOCALE_BCP47 } from '../consts';
import { withBase } from '../i18n/ui';

// URL absoluta a partir de una ruta que YA incluye la subruta base
// (p. ej. la que devuelve localizedPath).
const abs = (path: string) => new URL(path, SITE.url).href;
// URL absoluta a partir de una ruta de asset CRUDA (sin base), p. ej. "/og/logo.png".
const absAsset = (path: string) => new URL(withBase(path), SITE.url).href;
// Raíz desplegada real (origen + base).
const homeUrl = new URL(withBase('/'), SITE.url).href;

/** Nodo Organization reutilizable (id estable para enlazar desde otros nodos). */
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.organization.legalName,
    url: homeUrl,
    logo: {
      '@type': 'ImageObject',
      url: absAsset(SITE.logo),
    },
    email: SITE.organization.email,
    telephone: SITE.organization.telephone,
    foundingDate: SITE.organization.foundingDate,
    // sameAs: perfiles oficiales => corroboración multi-fuente (clave en GEO).
    sameAs: Object.values(SITE.social).filter(Boolean),
  };
}

/** Nodo WebSite (enlaza al publisher Organization). */
export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: homeUrl,
    name: SITE.name,
    description: SITE.tagline[locale],
    inLanguage: LOCALE_BCP47[locale],
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export interface Crumb {
  name: string;
  path: string; // ruta ya localizada
}

/** Migas de pan -> rich result de breadcrumb vigente. */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export interface QA {
  question: string;
  answer: string;
}

/** FAQPage: parseable por IAs (sin rich result en Google desde 2026). */
export function faqSchema(items: QA[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  };
}

export interface ArticleInput {
  title: string;
  description: string;
  path: string; // ruta localizada
  locale: Locale;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}

/** Article con autor + fechas (E-E-A-T y frescura). */
export function articleSchema(a: ArticleInput) {
  return {
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    inLanguage: LOCALE_BCP47[a.locale],
    image: absAsset(a.image ?? SITE.defaultOgImage),
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: {
      '@type': 'Person',
      name: a.authorName,
    },
    publisher: { '@id': `${SITE.url}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': abs(a.path),
    },
  };
}

export interface ProductInput {
  name: string;
  description: string;
  image?: string;
  price: string;
  priceCurrency: string;
  availability?: string; // p. ej. "https://schema.org/InStock"
  ratingValue?: string;
  reviewCount?: string;
}

/** Product/Offer (+AggregateRating): estrellas y precio, rich result vigente. */
export function productSchema(p: ProductInput) {
  const node: Record<string, unknown> = {
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: absAsset(p.image ?? SITE.defaultOgImage),
    brand: { '@type': 'Brand', name: SITE.name },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: p.priceCurrency,
      availability: p.availability ?? 'https://schema.org/InStock',
      url: homeUrl,
    },
  };
  if (p.ratingValue && p.reviewCount) {
    node.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: p.ratingValue,
      reviewCount: p.reviewCount,
    };
  }
  return node;
}
