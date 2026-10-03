/**
 * robots.txt generado dinámicamente para incluir el dominio real en Sitemap.
 *
 * Política por defecto: PERMITIR TODO, incluidos los crawlers de IA, porque
 * esta plantilla quiere visibilidad en buscadores Y en motores de IA.
 *
 * Si algún día quieres aparecer en respuestas de IA pero NO ceder tu contenido
 * para ENTRENAMIENTO de modelos, bloquea solo los crawlers de entrenamiento
 * (GPTBot, ClaudeBot, Google-Extended) y deja los de búsqueda/usuario
 * (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot). Ejemplo
 * comentado abajo.
 */
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { withBase } from '../i18n/ui';

export function GET(context: APIContext) {
  const origin = (context.site ?? new URL(SITE.url)).origin;
  const sitemapUrl = new URL(withBase('/sitemap-index.xml'), origin).href;

  const body = `# robots.txt — ${SITE.name}
# Por defecto: todo permitido (SEO + AEO + GEO).
User-agent: *
Allow: /

# --- Opción: bloquear solo entrenamiento de IA (descomenta si lo necesitas) ---
# User-agent: GPTBot
# Disallow: /
# User-agent: Google-Extended
# Disallow: /
# User-agent: ClaudeBot
# Disallow: /
#
# User-agent: OAI-SearchBot
# Allow: /
# User-agent: ChatGPT-User
# Allow: /
# User-agent: PerplexityBot
# Allow: /
# User-agent: Claude-SearchBot
# Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
