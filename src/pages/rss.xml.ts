/**
 * Feed RSS con todos los posts (ambos idiomas).
 * Google acepta RSS como formato de sitemap para señalar contenido fresco.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { localizedPath } from '../i18n/ui';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', (p) => !p.data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.tagline[SITE.defaultLocale],
    site: context.site ?? SITE.url,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${localizedPath('/blog', post.data.lang)}/${post.data.slug}`,
      author: post.data.author,
    })),
    customData: `<language>${SITE.defaultLocale}</language>`,
  });
}
