/**
 * Envía las URLs del sitemap a IndexNow (Bing, Yandex, Seznam, Naver...).
 * IndexNow NO lo usa Google, pero Bing alimenta ChatGPT Search => es una
 * palanca real de descubrimiento rápido para AEO.
 *
 * Uso:  node scripts/indexnow.mjs
 * Requiere que exista `dist/` (corre después de `npm run build`) y un archivo
 * de clave en `public/<clave>.txt` (servido en la raíz del sitio).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const HOST = process.env.INDEXNOW_HOST || 'max.benjacode.com';
const ORIGIN = `https://${HOST}`;

// 1) Localiza la clave IndexNow (archivo public/<hex>.txt).
const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{8,}\.txt$/.test(f));
if (!keyFile) {
  console.error('IndexNow: no se encontró el archivo de clave en public/*.txt. Omitiendo.');
  process.exit(0);
}
const key = keyFile.replace(/\.txt$/, '');
const keyLocation = `${ORIGIN}/${keyFile}`;

// 2) Extrae las <loc> de los sitemaps generados en dist/.
function locsFrom(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}
const distDir = 'dist';
if (!existsSync(distDir)) {
  console.error('IndexNow: no existe dist/. Ejecuta `npm run build` antes. Omitiendo.');
  process.exit(0);
}
const sitemapFiles = readdirSync(distDir).filter((f) => /^sitemap.*\.xml$/.test(f));
let urls = new Set();
for (const f of sitemapFiles) {
  for (const loc of locsFrom(readFileSync(join(distDir, f), 'utf8'))) {
    // sitemap-index apunta a otros sitemaps; nos quedamos solo con páginas del host.
    if (loc.startsWith(ORIGIN) && !/sitemap.*\.xml$/.test(loc)) urls.add(loc);
  }
}
const urlList = [...urls];
if (urlList.length === 0) {
  console.error('IndexNow: no se encontraron URLs de páginas en el sitemap. Omitiendo.');
  process.exit(0);
}

// 3) Envía el lote a IndexNow.
const payload = { host: HOST, key, keyLocation, urlList };
console.log(`IndexNow: enviando ${urlList.length} URLs de ${HOST}...`);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});
console.log(`IndexNow: respuesta HTTP ${res.status} ${res.statusText}`);
// 200 = aceptado, 202 = aceptado (validación pendiente). Otros => aviso, no romper el deploy.
if (res.status !== 200 && res.status !== 202) {
  console.error('IndexNow: respuesta inesperada:', await res.text().catch(() => ''));
}
