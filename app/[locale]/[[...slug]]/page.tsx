import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hreflangForPath, seoCopy, type SeoLocale } from '../../../lib/seo-locales';
const locales = ['en', 'de', 'es', 'fr', 'pt-br'] as const;
const pageKeys = ['', 'about', 'account', 'classify', 'contact', 'deep', 'imprint', 'learn', 'method', 'populism-quiz', 'practice', 'privacy', 'question-banks', 'quiz', 'quizzes', 'results', 'school', 'school/pilot', 'terms', 'understand', 'validation'] as const;
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
  const seo = seoCopy[activeLocale]?.[key] ?? seoCopy.en[key];
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
