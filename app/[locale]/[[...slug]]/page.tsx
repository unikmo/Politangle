import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hreflangForPath, seoCopy, type SeoLocale } from '../../../lib/seo-locales';
import { getSeoTopic, seoTopicSlugs, type SeoTopicSlug } from '../../../lib/seo-topics';
const locales = ['en', 'de', 'es', 'fr', 'pt-br'] as const;
const pageKeys = ['', 'about', 'account', 'classify', 'contact', 'deep', 'guides', 'imprint', 'learn', 'method', 'political-spectrum', 'left-vs-right-politics', 'political-ideologies', 'political-test', 'political-literacy', 'populism-quiz', 'practice', 'privacy', 'question-banks', 'quiz', 'quizzes', 'results', 'school', 'school/pilot', 'terms', 'understand', 'validation'] as const;
function routeKey(slug?: string[]) { return slug?.join('/') ?? ''; }

export function generateStaticParams() {
  return locales.flatMap((locale) => pageKeys.map((key) => ({ locale, slug: key ? key.split('/') : [] })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = routeKey(slug);
  if (!locales.includes(locale as typeof locales[number]) || !pageKeys.includes(key as typeof pageKeys[number])) return {};
  const suffix = key ? `/${key}` : '';
  const activeLocale = locale as SeoLocale;
  const isSeoTopic = seoTopicSlugs.includes(key as SeoTopicSlug);
  const topicSeo = isSeoTopic ? getSeoTopic(activeLocale, key as SeoTopicSlug) : null;
  const guideSeo = key === 'guides'
    ? {
        en: { title:'Political guides', description:'Neutral guides to political spectra, left and right, political ideologies, political tests and political literacy.' },
        de: { title:'Politische Leitfäden', description:'Neutrale Leitfäden zu politischem Spektrum, links und rechts, Ideologien, politischen Tests und politischer Bildung.' },
        es: { title:'Guías políticas', description:'Guías neutrales sobre espectro político, izquierda y derecha, ideologías, tests políticos y cultura política.' },
        fr: { title:'Guides politiques', description:'Guides neutres sur le spectre politique, la gauche et la droite, les idéologies, les tests politiques et la culture politique.' },
        'pt-br': { title:'Guias políticos', description:'Guias neutros sobre espectro político, esquerda e direita, ideologias, testes políticos e educação política.' },
      }[activeLocale]
    : null;
  const seo = topicSeo
    ? { title: topicSeo.metaTitle, description: topicSeo.metaDescription }
    : guideSeo ?? seoCopy[activeLocale]?.[key] ?? seoCopy.en[key];
  const noIndex = new Set(['account', 'results', 'contact', 'imprint']);
  const canonical = `/${locale}${suffix}`;
  const ogLocale: Record<SeoLocale, string> = { en: 'en_US', de: 'de_DE', es: 'es_ES', fr: 'fr_FR', 'pt-br': 'pt_BR' };

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: hreflangForPath(suffix),
    },
    robots: noIndex.has(key) ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: 'Politangle',
      title: seo.title,
      description: seo.description,
      url: canonical,
      locale: ogLocale[activeLocale],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function LocalizedPage({ params }: { params: Promise<{ locale: string; slug?: string[] }> }) {
  const { locale, slug } = await params;
  const key = routeKey(slug);
  if (!locales.includes(locale as typeof locales[number]) || !pageKeys.includes(key as typeof pageKeys[number])) notFound();
  const Page = await loadPage(key);
  return <Page />;
}

async function loadPage(key: string): Promise<React.ComponentType> {
  switch (key) {
    case '': return (await import('../../page')).default;
    case 'about': return (await import('../../about/page')).default;
    case 'account': return (await import('../../account/page')).default;
    case 'classify': return (await import('../../classify/page')).default;
    case 'contact': return (await import('../../contact/page')).default;
    case 'deep': return (await import('../../deep/page')).default;
    case 'guides': return (await import('../../guides/page')).default;
    case 'political-spectrum': return (await import('../../political-spectrum/page')).default;
    case 'left-vs-right-politics': return (await import('../../left-vs-right-politics/page')).default;
    case 'political-ideologies': return (await import('../../political-ideologies/page')).default;
    case 'political-test': return (await import('../../political-test/page')).default;
    case 'political-literacy': return (await import('../../political-literacy/page')).default;
    case 'imprint': return (await import('../../imprint/page')).default;
    case 'learn': return (await import('../../learn/page')).default;
    case 'method': return (await import('../../method/page')).default;
    case 'populism-quiz': return (await import('../../populism-quiz/page')).default;
    case 'practice': return (await import('../../practice/page')).default;
    case 'privacy': return (await import('../../privacy/page')).default;
    case 'question-banks': return (await import('../../question-banks/page')).default;
    case 'quiz': return (await import('../../quiz/page')).default;
    case 'quizzes': return (await import('../../quizzes/page')).default;
    case 'results': return (await import('../../results/page')).default;
    case 'school': return (await import('../../school/page')).default;
    case 'school/pilot': return (await import('../../school/pilot/page')).default;
    case 'terms': return (await import('../../terms/page')).default;
    case 'understand': return (await import('../../understand/page')).default;
    case 'validation': return (await import('../../validation/page')).default;
    default: notFound();
  }
}
