# Max Optimice — Plantilla de landing SEO · AEO · GEO

Plantilla de **página de aterrizaje de marketing** construida en [Astro](https://astro.build), optimizada al máximo para los tres frentes de la búsqueda moderna:

- **SEO** — buscadores clásicos (Google, Bing).
- **AEO** — _Answer Engine Optimization_: featured snippets, "People Also Ask", asistentes de voz.
- **GEO** — _Generative Engine Optimization_: ser citado por ChatGPT, Claude, Perplexity y Google AI Overviews.

Bilingüe (**español + inglés**) con `hreflang`, HTML estático con **cero JavaScript por defecto**, datos estructurados y Core Web Vitals en verde desde el primer build.

---

## 🚀 Puesta en marcha

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # previsualiza el build
```

Requisitos: **Node 18.17+** (probado con Node 22).

## ✏️ Cómo personalizarla (3 pasos)

1. **`src/consts.ts`** — dominio, nombre de marca, redes sociales, datos de la organización. **Cambia `SITE.url` por tu dominio real** (es la base de canonical, OG, sitemap y hreflang).
2. **`src/data/landing.ts`** — todo el contenido editorial de la landing (hero, features, reseñas, FAQ, CTA), en es y en.
3. **`public/og/`** — añade `default.png` (1200×630) y `logo.png` (≥112×112). Ver `public/og/README.md`.

El blog se edita añadiendo archivos `.mdx` en `src/content/blog/es/` y `src/content/blog/en/`.

---

## 🧱 Estructura

```
src/
├── consts.ts                 # ⚙️ Configuración central (edita aquí)
├── content.config.ts         # Colección de blog (Content Layer)
├── data/landing.ts           # 📝 Contenido bilingüe de la landing
├── i18n/ui.ts                # Diccionario de UI + helpers de rutas
├── lib/schema.ts             # Constructores de JSON-LD (schema.org)
├── styles/global.css         # CSS mínimo neutro (claro/oscuro, accesible)
├── layouts/BaseLayout.astro  # Head + header + footer + selector de idioma
├── components/
│   ├── seo/BaseHead.astro    # meta, canonical, hreflang, OG, Twitter
│   ├── seo/JsonLd.astro      # inyector de @graph JSON-LD
│   ├── sections/             # Hero, Features, FAQ, SocialProof, CTA
│   ├── LandingPage.astro     # landing reutilizable (es/en)
│   ├── BlogList.astro        # listado del blog
│   └── BlogPost.astro        # post individual (Article schema)
├── content/blog/{es,en}/     # posts en MDX, mismo slug por idioma
└── pages/
    ├── index.astro           # landing ES  (/)
    ├── en/index.astro        # landing EN  (/en)
    ├── blog/ , en/blog/      # listados y posts
    ├── rss.xml.ts            # feed RSS
    ├── robots.txt.ts         # robots con reglas de IA
    ├── llms.txt.ts           # mapa para LLMs (llmstxt.org)
    └── 404.astro
public/favicon.svg
```

El `sitemap-index.xml` lo genera `@astrojs/sitemap` en cada build.

---

## ✅ Qué incluye y por qué (checklist con evidencia)

Cada decisión está respaldada por investigación reciente (2025–2026). **Lo marcado con ⚠️ corrige un mito común.**

### SEO técnico
- [x] HTML semántico, un solo `<h1>`, jerarquía de encabezados.
- [x] `<title>` único (50–60 car.) y meta description (140–160 car.) por página.
- [x] Canonical **absoluto** autorreferenciado en cada página.
- [x] `robots` con `max-snippet:-1, max-image-preview:large` (no limita lo que las IAs pueden citar).
- [x] Open Graph (1200×630) + Twitter Card `summary_large_image`, con **imagen OG única por página generada en build** (`astro-og-canvas`).
- [x] **Core Web Vitals**: LCP ≤2,5 s · INP ≤200 ms · CLS ≤0,1. Hero textual, CSS en línea, cero JS.
- [x] `sitemap-index.xml`, `robots.txt` y `rss.xml` automáticos.
- [x] **Lighthouse CI** en GitHub Actions: audita Core Web Vitals, SEO y accesibilidad en cada push/PR y falla si SEO o a11y bajan de 0.95 (`lighthouserc.json`).
- [x] Accesibilidad: foco visible, enlace "saltar al contenido", contraste AA, `prefers-reduced-motion`.
- ⚠️ **No** incluimos `SearchAction`/sitelinks searchbox: Google lo **deprecó en 2024**.

### AEO (motores de respuesta)
- [x] Secciones con patrón **pregunta (H2/H3) → respuesta de 40–60 palabras → detalle**.
- [x] FAQ con respuestas autocontenidas + schema `FAQPage`.
- [x] Tablas para comparativas/precios, listas para pasos (formatos que ganan snippets).
- ⚠️ **Google eliminó los rich results de FAQ y HowTo (mayo 2026).** Mantenemos el schema `FAQPage` **solo** porque las IAs lo siguen leyendo — **no esperes un "rich snippet de FAQ" en Google**.

### GEO (motores generativos / IA)
- [x] **Respuesta primero**: el 44 % de las citas de IA salen del primer 30 % de la página (Semrush).
- [x] **Estadísticas y cifras concretas** en features y posts (+30–41 % de visibilidad, estudio Princeton).
- [x] **Citas a fuentes** en los artículos del blog (+40 %, el mayor factor medido).
- [x] HTML estático: **~69 % de los crawlers de IA no ejecutan JS** — con Astro tu contenido siempre es visible.
- [x] `Organization` + `sameAs` (señal de entidad y corroboración multi-fuente).
- [x] Frescura: `datePublished`/`dateModified` visibles y en el schema (+28 % de citas si <2 meses).
- [x] `robots.txt` que permite crawlers de IA (con bloque comentado para bloquear solo entrenamiento).
- [x] `/llms.txt` según [llmstxt.org](https://llmstxt.org).
- ⚠️ **Honestidad sobre `llms.txt`:** ningún gran proveedor de IA ha confirmado que lo use, y no hay efecto medido en citas. Se incluye por ser barato y a prueba de futuro, **no** como palanca de posicionamiento. El contenido real pesa mucho más.

### Datos estructurados (JSON-LD) que **sí** aportan hoy
`Organization` · `WebSite` · `BreadcrumbList` · `FAQPage` (para IA) · `Article` · `Product`/`Offer` + `AggregateRating`.
Valida siempre con el [Rich Results Test](https://search.google.com/test/rich-results) de Google.

### i18n
- [x] Enrutamiento nativo Astro: `es` en `/`, `en` en `/en`.
- [x] `hreflang` **bidireccional** (return tags) + `x-default`, con códigos BCP-47 (`es-ES`, `en-US`).
- [x] Posts con el **mismo slug** en ambos idiomas para enlazar versiones correctamente.

---

## 🚀 Despliegue en Cloudflare Pages (esta rama)

> Esta es la rama **`deploy/cloudflare`**: producción en **`https://max.benjacode.com`** (`SITE.url` con dominio propio, `base: '/'`). El template neutro y reutilizable vive en `main`.

Flujo automatizado: **`git push` a `deploy/cloudflare` → GitHub Actions compila → despliega a Cloudflare Pages**.

```
git push (deploy/cloudflare) ──► GitHub Actions (npm run build) ──► Cloudflare Pages ──► max.benjacode.com
```

Lo gestiona `.github/workflows/cloudflare.yml` (acción oficial `cloudflare/wrangler-action`).

### Paso único de configuración (una sola vez)

Añade el token de Cloudflare como **secret** del repositorio:

1. GitHub → **Settings → Secrets and variables → Actions → New repository secret**.
2. Nombre: `CLOUDFLARE_API_TOKEN` · Valor: tu token de Cloudflare (con permisos *Account → Cloudflare Pages → Edit*).
3. A partir de ahí, cada push a `deploy/cloudflare` publica solo.

> El Account ID y el nombre del proyecto (`max-optimice`) van en el workflow (no son sensibles). El dominio `max.benjacode.com` ya está enlazado al proyecto vía CNAME proxied + SSL de Cloudflare.

### Despliegue manual (alternativo)

```bash
npm run build
npx wrangler pages deploy dist --project-name=max-optimice --branch=main
# requiere CLOUDFLARE_API_TOKEN y CLOUDFLARE_ACCOUNT_ID en el entorno
```

> Para otros hosts (Vercel/Netlify/dominio propio): el sitio es estático (`dist/`), `base: '/'`. Build `npm run build`, salida `dist`, Node 18.17+.

### Extras de esta rama (producción)

- **IndexNow**: tras cada deploy, el workflow ejecuta `npm run indexnow`, que envía las URLs del sitemap a Bing/Yandex (descubrimiento rápido; Bing alimenta ChatGPT Search). La clave pública vive en `public/<clave>.txt`.
- **`public/_headers`**: HSTS + cabeceras de seguridad + caché inmutable de `/_astro/*`.
- **Deduplicación de `*.pages.dev`**: Cloudflare siempre sirve el subdominio gratuito y un redirect por hostname no lo afecta. La protección real es el `<link rel="canonical">` (ya apunta al apex), que es el mecanismo que Google recomienda. Ver `public/_redirects` (incluye ejemplo www→apex para dominio propio).
- **Verificado en producción**: crawlers de IA (GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot) acceden con 200 — Cloudflare NO los bloquea en esta zona.

---

## 📌 Antes de publicar

- [ ] Cambiar `SITE.url` en `src/consts.ts` por el dominio real.
- [ ] Añadir `public/og/default.png` y `public/og/logo.png`.
- [ ] Reemplazar el contenido de ejemplo y las reseñas por datos **reales** (no inventes valoraciones).
- [ ] Enviar el sitemap en Google Search Console y Bing Webmaster Tools.
- [ ] Validar con Rich Results Test y PageSpeed Insights.

---

## 📚 Fuentes principales de la investigación

- Estudio GEO de Princeton (Aggarwal et al., 2023) — factores de citación en motores generativos.
- Semrush — _AI Search Statistics_ y dominios más citados por IA (2026).
- Google Search Central — _Structured data_, _Core Web Vitals_, _hreflang_, retirada de FAQ/HowTo rich results.
- web.dev — umbrales de Core Web Vitals (INP reemplazó a FID, 2024).
- llmstxt.org — especificación de `llms.txt`.
- searchviu — análisis de crawlers de IA y ejecución de JavaScript.

> Nota: varias cifras provienen de estudios de proveedores (Semrush, Ahrefs, BrightEdge); son **direccionales**, no revisadas por pares. Las de Princeton y Google Search Central son las más sólidas.

---

Licencia: MIT. Úsala, adáptala y publícala libremente.
