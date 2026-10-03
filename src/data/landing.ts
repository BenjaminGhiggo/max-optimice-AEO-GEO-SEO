/**
 * Contenido editorial de la landing, bilingüe.
 * Separar el contenido del markup permite reusar las mismas secciones en es/en
 * y editar textos sin tocar componentes. Sustituye por tu copy real.
 *
 * Nota de estilo (GEO/AEO): los textos usan "respuesta primero", cifras
 * concretas y respuestas de FAQ de 40-60 palabras a propósito.
 */
import type { Locale } from '../consts';

export interface LandingContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  features: {
    heading: string;
    intro: string;
    items: { stat: string; title: string; text: string }[];
  };
  proof: {
    heading: string;
    rating: { value: string; count: string };
    reviews: { quote: string; author: string; role: string }[];
  };
  faq: {
    heading: string;
    items: { question: string; answer: string }[];
  };
  cta: { heading: string; text: string };
}

const content: Record<Locale, LandingContent> = {
  es: {
    meta: {
      title: 'Plantilla optimizada para SEO, AEO y GEO',
      description:
        'Plantilla de landing en Astro optimizada para buscadores (SEO), motores de respuesta (AEO) y motores generativos de IA (GEO): HTML estático, datos estructurados y Core Web Vitals.',
    },
    hero: {
      eyebrow: 'SEO · AEO · GEO',
      title: 'La landing que buscadores y IAs leen, entienden y citan',
      lead: 'Max Optimice es una plantilla de página de aterrizaje construida en Astro que sirve HTML estático con datos estructurados, pensada para posicionar en Google y para ser citada por ChatGPT, Claude y Perplexity. Lista en minutos, sin JavaScript de más.',
    },
    features: {
      heading: '¿Por qué esta plantilla rinde en los tres frentes?',
      intro:
        'Cada decisión técnica está respaldada por estudios recientes de optimización (Princeton GEO, Semrush, Google Search Central).',
      items: [
        {
          stat: '0 KB',
          title: 'JavaScript por defecto',
          text: 'Astro genera HTML estático puro. El ~69% de los crawlers de IA no ejecuta JS, así que tu contenido siempre es visible para ellos.',
        },
        {
          stat: '≤2.5 s',
          title: 'LCP objetivo',
          text: 'Hero basado en texto, imágenes WebP/AVIF con dimensiones explícitas y CSS en línea: Core Web Vitals en verde desde el primer build.',
        },
        {
          stat: '+40%',
          title: 'Visibilidad en IAs',
          text: 'Estructura de respuesta-primero, estadísticas citables y datos estructurados: el mayor factor medido para que una IA cite tu página.',
        },
        {
          stat: '2',
          title: 'Idiomas con hreflang',
          text: 'Enrutamiento i18n nativo (es/en) con etiquetas hreflang bidireccionales y x-default correctamente configuradas.',
        },
        {
          stat: '6+',
          title: 'Tipos de schema.org',
          text: 'Organization, WebSite, Breadcrumb, FAQPage, Article y Product/Offer listos para usar, solo los que aportan valor hoy.',
        },
        {
          stat: '100%',
          title: 'Accesible y semántico',
          text: 'Un solo H1, jerarquía de encabezados, foco visible, enlace de salto y contraste AA. La accesibilidad también es SEO.',
        },
      ],
    },
    proof: {
      heading: 'Lo que dicen quienes la usan',
      rating: { value: '4.9', count: '128 reseñas' },
      reviews: [
        {
          quote: 'Pasamos de no aparecer en AI Overviews a ser citados en semanas. La estructura de FAQ marcó la diferencia.',
          author: 'María L.',
          role: 'Head of Growth',
        },
        {
          quote: 'Lighthouse 100 sin tocar nada. El equipo solo tuvo que cambiar los textos y el logo.',
          author: 'Diego R.',
          role: 'Desarrollador frontend',
        },
        {
          quote: 'El soporte bilingüe con hreflang nos ahorró semanas de configuración manual.',
          author: 'Ana P.',
          role: 'SEO Manager',
        },
      ],
    },
    faq: {
      heading: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Qué diferencia hay entre SEO, AEO y GEO?',
          answer:
            'El SEO posiciona tu página en los resultados clásicos de buscadores. El AEO optimiza para ser la respuesta directa en featured snippets y asistentes de voz. El GEO busca que los motores de IA generativa, como ChatGPT o Perplexity, citen tu contenido en sus respuestas.',
        },
        {
          question: '¿Por qué Astro y no un framework con más JavaScript?',
          answer:
            'Porque cerca del 69% de los crawlers de IA no ejecuta JavaScript. Astro genera HTML estático, así que tu contenido es visible para todos los buscadores y modelos de IA, con Core Web Vitals casi perfectos y sin configuración adicional.',
        },
        {
          question: '¿El schema FAQPage todavía genera resultados enriquecidos?',
          answer:
            'En Google ya no: retiró los rich results de FAQ en mayo de 2026. Aun así incluimos el marcado porque los motores de IA siguen leyéndolo para entender y citar tu contenido, de modo que conserva valor para AEO y GEO.',
        },
        {
          question: '¿Qué tengo que editar para usarla con mi marca?',
          answer:
            'Edita el archivo src/consts.ts con tu dominio, nombre y redes, reemplaza el contenido en src/data/landing.ts y cambia las imágenes de la carpeta public/og. Con eso la plantilla queda personalizada sin tocar la lógica de SEO.',
        },
        {
          question: '¿Incluye blog y feeds para mantener la frescura?',
          answer:
            'Sí. Trae un blog bilingüe con Content Collections, sitemap y RSS automáticos. El contenido fresco, actualizado en menos de dos meses, recibe hasta un 28% más de citas en motores de IA según Semrush.',
        },
      ],
    },
    cta: {
      heading: 'Empieza con una base optimizada',
      text: 'Clona la plantilla, edita tres archivos y publica una landing lista para buscadores y para la IA.',
    },
  },
  en: {
    meta: {
      title: 'Template optimized for SEO, AEO and GEO',
      description:
        'Astro landing page template optimized for search engines (SEO), answer engines (AEO) and generative AI engines (GEO): static HTML, structured data and strong Core Web Vitals.',
    },
    hero: {
      eyebrow: 'SEO · AEO · GEO',
      title: 'The landing page search engines and AIs read, understand and cite',
      lead: 'Max Optimice is an Astro-built landing page template that ships static HTML with structured data, designed to rank on Google and to be cited by ChatGPT, Claude and Perplexity. Ready in minutes, with no excess JavaScript.',
    },
    features: {
      heading: 'Why this template performs on all three fronts',
      intro:
        'Every technical choice is backed by recent optimization studies (Princeton GEO, Semrush, Google Search Central).',
      items: [
        {
          stat: '0 KB',
          title: 'JavaScript by default',
          text: 'Astro outputs pure static HTML. Around 69% of AI crawlers do not run JS, so your content is always visible to them.',
        },
        {
          stat: '≤2.5 s',
          title: 'Target LCP',
          text: 'Text-based hero, WebP/AVIF images with explicit dimensions and inlined CSS: green Core Web Vitals from the first build.',
        },
        {
          stat: '+40%',
          title: 'AI visibility',
          text: 'Answer-first structure, citable statistics and structured data: the single biggest measured factor for getting cited by an AI.',
        },
        {
          stat: '2',
          title: 'Languages with hreflang',
          text: 'Native i18n routing (es/en) with correctly configured bidirectional hreflang and x-default tags.',
        },
        {
          stat: '6+',
          title: 'schema.org types',
          text: 'Organization, WebSite, Breadcrumb, FAQPage, Article and Product/Offer ready to use — only the ones that add value today.',
        },
        {
          stat: '100%',
          title: 'Accessible & semantic',
          text: 'A single H1, heading hierarchy, visible focus, skip link and AA contrast. Accessibility is SEO too.',
        },
      ],
    },
    proof: {
      heading: 'What people who use it say',
      rating: { value: '4.9', count: '128 reviews' },
      reviews: [
        {
          quote: 'We went from invisible in AI Overviews to being cited within weeks. The FAQ structure made the difference.',
          author: 'María L.',
          role: 'Head of Growth',
        },
        {
          quote: 'Lighthouse 100 out of the box. The team only had to swap the copy and the logo.',
          author: 'Diego R.',
          role: 'Frontend developer',
        },
        {
          quote: 'The bilingual hreflang support saved us weeks of manual configuration.',
          author: 'Ana P.',
          role: 'SEO Manager',
        },
      ],
    },
    faq: {
      heading: 'Frequently asked questions',
      items: [
        {
          question: 'What is the difference between SEO, AEO and GEO?',
          answer:
            'SEO ranks your page in classic search engine results. AEO optimizes to become the direct answer in featured snippets and voice assistants. GEO aims for generative AI engines, such as ChatGPT or Perplexity, to cite your content in their answers.',
        },
        {
          question: 'Why Astro instead of a framework with more JavaScript?',
          answer:
            'Because roughly 69% of AI crawlers do not run JavaScript. Astro outputs static HTML, so your content is visible to every search engine and AI model, with near-perfect Core Web Vitals and no extra configuration required.',
        },
        {
          question: 'Does FAQPage schema still produce rich results?',
          answer:
            'Not on Google: it removed FAQ rich results in May 2026. We still include the markup because AI engines keep reading it to understand and cite your content, so it retains value for AEO and GEO.',
        },
        {
          question: 'What do I need to edit to use it with my brand?',
          answer:
            'Edit src/consts.ts with your domain, name and social profiles, replace the content in src/data/landing.ts, and swap the images in the public/og folder. That customizes the template without touching any SEO logic.',
        },
        {
          question: 'Does it include a blog and feeds to keep content fresh?',
          answer:
            'Yes. It ships a bilingual blog with Content Collections plus automatic sitemap and RSS. Fresh content updated within two months receives up to 28% more citations from AI engines according to Semrush.',
        },
      ],
    },
    cta: {
      heading: 'Start from an optimized foundation',
      text: 'Clone the template, edit three files and ship a landing page ready for search engines and for AI.',
    },
  },
};

export function getLanding(locale: Locale): LandingContent {
  return content[locale];
}
