/**
 * /llms.txt — mapa en Markdown de las páginas clave para modelos de lenguaje.
 * Sigue la especificación de llmstxt.org (H1 + blockquote + secciones con listas).
 *
 * Nota honesta: ningún gran proveedor de IA ha confirmado que priorice este
 * archivo hoy, y los estudios no le atribuyen efecto medible en las citas.
 * Lo incluimos porque es barato, lo usan agentes y herramientas de IA, y es
 * una apuesta de futuro. No sustituye al contenido real ni al sitemap.
 */
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { localizedPath } from '../i18n/ui';

export async function GET(context: APIContext) {
  const site = (context.site ?? new URL(SITE.url)).toString().replace(/\/$/, '');
  const posts = (await getCollection('blog', (p) => p.data.lang === SITE.defaultLocale && !p.data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const postLines = posts
    .map((p) => `- [${p.data.title}](${site}${localizedPath('/blog', p.data.lang)}/${p.data.slug}): ${p.data.description}`)
    .join('\n');

  const body = `# ${SITE.name}

> ${SITE.tagline[SITE.defaultLocale]}

${SITE.name} es una plantilla de landing de marketing construida en Astro y optimizada para SEO, AEO y GEO. Sirve HTML estático con datos estructurados para ser indexada por buscadores y citada por motores de IA.

## Páginas principales
- [Inicio (ES)](${site}${localizedPath('/', 'es')}): landing principal en español.
- [Home (EN)](${site}${localizedPath('/', 'en')}): main landing in English.
- [Blog (ES)](${site}${localizedPath('/blog', 'es')}): guías de SEO, AEO y GEO.
- [Blog (EN)](${site}${localizedPath('/blog', 'en')}): SEO, AEO and GEO guides.

## Artículos
${postLines}

## Optional
- [RSS](${site}/rss.xml)
- [Sitemap](${site}/sitemap-index.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
