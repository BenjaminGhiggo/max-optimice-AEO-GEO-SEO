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
- [x] Open Graph (1200×630) + Twitter Card `summary_large_image`.
- [x] **Core Web Vitals**: LCP ≤2,5 s · INP ≤200 ms · CLS ≤0,1. Hero textual, CSS en línea, cero JS.
- [x] `sitemap-index.xml`, `robots.txt` y `rss.xml` automáticos.
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

## 🚀 Despliegue en GitHub Pages (esta rama)

> Esta es la rama **`deploy/github-pages`**: `main` + la configuración específica de GitHub Pages de proyecto (subruta `/max-optimice-AEO-GEO-SEO` + workflow de Actions). El template genérico y reutilizable vive en `main` con `base: '/'`.

Incluye el workflow `.github/workflows/deploy.yml` (acción oficial `withastro/action`), que compila y publica en cada push a esta rama.

### Pasos

1. En GitHub: **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.
2. Haz push a la rama `deploy/github-pages` (o lánzalo a mano en **Actions → Deploy to GitHub Pages → Run workflow**).
3. El sitio queda en `https://benjaminghiggo.github.io/max-optimice-AEO-GEO-SEO/`.

Si cambias de usuario/repo, actualiza `SITE.url` y `SITE.base` en `src/consts.ts`.

### ⚠️ Limitación de GitHub Pages de **proyecto** (subruta)

Los crawlers solo leen `robots.txt` y `llms.txt` en la **raíz del dominio** (`https://TU_USUARIO.github.io/robots.txt`), que en un repo de proyecto **no controlas**. Bajo subruta esta plantilla los sirve en `…/nombre-del-repo/robots.txt`, que los buscadores ignoran.

Todo lo demás (HTML, canonical, hreflang, JSON-LD, OG, sitemap) funciona perfecto en subruta. El sitemap puedes enviarlo por su URL completa en Search Console.

**Para control total de SEO:** usa un **dominio propio** o un hosting en la raíz (Cloudflare Pages / Vercel / Netlify). Cambia a `SITE.base = '/'` (como en `main`) y `robots.txt`/`llms.txt` quedarán en la raíz real.

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
