import type { MetadataRoute } from 'next';
import { countryProfiles } from '../lib/countries';

const origin = 'https://politangle.org';
const locales = ['en', 'de', 'es', 'fr', 'pt-br'] as const;
const publicRoutes = ['', '/learn', '/guides', '/political-spectrum', '/left-vs-right-politics', '/political-ideologies', '/political-test', '/political-literacy', '/practice', '/populism-quiz', '/method', '/validation', '/question-banks', '/about', '/privacy', '/terms', '/school', '/quizzes', '/quiz', '/deep'];
const languageCode = { en:'en-US', de:'de', es:'es', fr:'fr', 'pt-br':'pt-BR' } as const;

function localizedAlternates(route: string) {
  return Object.fromEntries(locales.map((locale) => [languageCode[locale], `${origin}/${locale}${route}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = publicRoutes.flatMap((route) => locales.map((locale) => ({
    url: `${origin}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route === '/school' ? .8 : route === '/guides' ? .8 : route.startsWith('/political-') || route === '/left-vs-right-politics' ? .78 : .65,
    alternates: { languages: { ...localizedAlternates(route), 'x-default': `${origin}/en${route}` } },
  })));

  const countryHubLanguages = {
    'en-US': `${origin}/countries`,
    de: `${origin}/de/countries`,
    es: `${origin}/es/countries`,
    fr: `${origin}/fr/countries`,
    'pt-BR': `${origin}/pt-br/countries`,
    'x-default': `${origin}/countries`,
  };
  const countryHubs = [
    { url:`${origin}/countries`, locale:'en-US' },
    { url:`${origin}/de/countries`, locale:'de' },
    { url:`${origin}/es/countries`, locale:'es' },
    { url:`${origin}/fr/countries`, locale:'fr' },
    { url:`${origin}/pt-br/countries`, locale:'pt-BR' },
  ].map(({url}) => ({
    url,
    lastModified:new Date(),
    changeFrequency:'weekly' as const,
    priority:.85,
    alternates:{ languages:countryHubLanguages },
  }));

  const countryPages = countryProfiles.flatMap((country) => {
    const languages = {
      'en-US': `${origin}/countries/${country.slug}`,
      de: `${origin}/de/countries/${country.slug}`,
      es: `${origin}/es/countries/${country.slug}`,
      fr: `${origin}/fr/countries/${country.slug}`,
      'pt-BR': `${origin}/pt-br/countries/${country.slug}`,
      'x-default': `${origin}/countries/${country.slug}`,
    };
    return [
      languages['en-US'],
      languages.de,
      languages.es,
      languages.fr,
      languages['pt-BR'],
    ].map((url) => ({
      url,
      lastModified:new Date(country.updatedAt),
      changeFrequency:'monthly' as const,
      priority:.75,
      alternates:{ languages },
    }));
  });

  return [...staticPages, ...countryHubs, ...countryPages];
}
