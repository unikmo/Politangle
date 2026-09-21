import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../SiteChrome';
import { CountryGuide } from '../../../countries/CountryGuide';
import { countryBySlug } from '../../../../lib/countries';
import { localizeCountryProfile, nativeCountrySlugs } from '../../../../lib/country-localization';
import type { Locale } from '../../../LocaleProvider';

const locales = new Set<Locale>(['de','es','fr','pt-br']);
const metadataDescription: Record<'de'|'es'|'fr'|'pt-br', (name: string) => string> = {
  de: (name) => `Politangle-Länderperspektive: politischer Kontext und Begriffe in ${name}.`,
  es: (name) => `Perspectiva nacional de Politangle: contexto político y vocabulario en ${name}.`,
  fr: (name) => `Perspective nationale Politangle : contexte politique et vocabulaire en ${name}.`,
  'pt-br': (name) => `Perspectiva do Politangle: contexto político e vocabulário em ${name}.`,
};

export const dynamicParams = false;
export function generateStaticParams() {
  return (['de','es','fr','pt-br'] as Locale[]).flatMap((locale) => nativeCountrySlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.has(locale as Locale)) return {};
  const base = countryBySlug(slug);
  const country = base ? localizeCountryProfile(base, locale as Locale) : null;
  if (!country) return {};
  return {
    title: `${country.name} · Politangle`,
    description: metadataDescription[locale as 'de'|'es'|'fr'|'pt-br'](country.name),
    alternates: {
      canonical: `/${locale}/countries/${slug}`,
      languages: {
        'en-US': `/countries/${slug}`,
        de: `/de/countries/${slug}`,
        es: `/es/countries/${slug}`,
        fr: `/fr/countries/${slug}`,
        'pt-BR': `/pt-br/countries/${slug}`,
        'x-default': `/countries/${slug}`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: { type:'article', siteName:'Politangle', title:`${country.name} · Politangle`, description: metadataDescription[locale as 'de'|'es'|'fr'|'pt-br'](country.name), url:`/${locale}/countries/${slug}` },
    twitter: { card:'summary_large_image', title:`${country.name} · Politangle`, description: metadataDescription[locale as 'de'|'es'|'fr'|'pt-br'](country.name) },
  };
}

export default async function LocalizedCountryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!locales.has(locale as Locale)) notFound();
  const base = countryBySlug(slug);
  const country = base ? localizeCountryProfile(base, locale as Locale) : null;
  if (!country) notFound();
  return <main className="home info-page countries-page"><SiteHeader /><CountryGuide country={country} locale={locale as Locale} backHref={`/${locale}/countries`} /></main>;
}
