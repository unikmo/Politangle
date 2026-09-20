import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/learn', '/practice', '/populism-quiz', '/method', '/validation', '/question-banks', '/about', '/privacy', '/imprint', '/terms', '/contact', '/school'];
  const languages = { 'en-US': 'https://politangle.org/en', de: 'https://politangle.org/de', es: 'https://politangle.org/es', fr: 'https://politangle.org/fr', 'pt-BR': 'https://politangle.org/pt-br' };
  return routes.flatMap((route) => ['en', 'de', 'es', 'fr', 'pt-br'].map((locale) => ({
    url: `https://politangle.org/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route === '/school' ? .8 : .6,
    alternates: { languages: Object.fromEntries(Object.entries(languages).map(([language, base]) => [language, `${base}${route}`])) },
  })));
}
