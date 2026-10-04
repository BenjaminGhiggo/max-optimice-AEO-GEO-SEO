# Imágenes para redes sociales y JSON-LD

## Imágenes OG → AUTOMÁTICAS ✨

Las imágenes Open Graph (1200×630) se **generan solas en el build**, una por página,
con `astro-og-canvas` (ver `src/pages/og/[...route].ts` y la fuente en
`src/assets/fonts/`). No tienes que crear `default.png` ni las de cada página.

Para personalizar colores/tipografía, edita `getImageOptions` en
`src/pages/og/[...route].ts`.

## Lo único que debes añadir manualmente

- **`logo.png`** — logotipo de la organización para el JSON-LD `Organization`.
  Mínimo **112 × 112 px** (recomendado por Google), fondo transparente o sólido.
  Su ruta se configura en `src/consts.ts` (`SITE.logo`).

> Consejo AEO/GEO: el contenido multimodal (texto + imagen/vídeo) muestra tasas de
> selección por IA notablemente más altas que el texto solo. Usa imágenes reales y
> descriptivas, con `alt` significativo, en cada sección clave.
