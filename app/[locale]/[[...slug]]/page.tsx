import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
const locales = ['en', 'de', 'es', 'fr', 'pt-br'] as const;
const pageKeys = ['', 'about', 'account', 'classify', 'contact', 'deep', 'imprint', 'learn', 'method', 'populism-quiz', 'practice', 'privacy', 'question-banks', 'quiz', 'quizzes', 'results', 'school', 'school/pilot', 'terms', 'understand', 'validation'] as const;
const titles: Record<string, string> = {
  '': 'Politangle', about: 'About', account: 'Account', classify: 'CLASSIFY', contact: 'Contact', deep: 'Politangle Full',
  imprint: 'Imprint', learn: 'Learn political language', method: 'Method', 'populism-quiz': 'Spot populism',
  practice: 'Political literacy practice', privacy: 'Privacy', 'question-banks': 'Question banks', quizzes: 'Quizzes',
  quiz: 'Politangle Quick', results: 'Your result', school: 'For schools', 'school/pilot': 'School pilot',
  terms: 'Terms', understand: 'UNDERSTAND', validation: 'Validation',
};

function routeKey(slug?: string[]) { return slug?.join('/') ?? ''; }

export function generateStaticParams() {
  return locales.flatMap((locale) => pageKeys.map((key) => ({ locale, slug: key ? key.split('/') : [] })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug?: string[] }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = routeKey(slug);
  if (!locales.includes(locale as typeof locales[number]) || !pageKeys.includes(key as typeof pageKeys[number])) return {};
  const suffix = key ? `/${key}` : '';
  return {
    title: titles[key],
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: { 'en-US': `/en${suffix}`, de: `/de${suffix}`, es: `/es${suffix}`, fr: `/fr${suffix}`, 'pt-BR': `/pt-br${suffix}`, 'x-default': `/en${suffix}` },
    },
    robots: key === 'results' ? { index: false, follow: false } : undefined,
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
