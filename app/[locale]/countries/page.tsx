import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { countryBySlug } from '../../../lib/countries';
import { localizeCountryProfile, nativeCountrySlugs } from '../../../lib/country-localization';
import type { Locale } from '../../LocaleProvider';

const copy = {
  de: { eyebrow:'LÄNDERPERSPEKTIVEN', title:'Gleiche politische Begriffe. Anderer Länderkontext.', intro:'Diese vier Länderprofile sind vollständig in Deutsch verfügbar. Weitere Länder bleiben auf Englisch verfügbar, bis die Übersetzungen redaktionell gepflegt werden können.', open:'Öffnen', more:'Weitere Länder auf Englisch' },
  es: { eyebrow:'PERSPECTIVAS NACIONALES', title:'Las mismas palabras políticas. Otro contexto nacional.', intro:'Estas cuatro perspectivas están disponibles íntegramente en español. Los demás países siguen en inglés hasta que puedan mantenerse traducciones editoriales de calidad.', open:'Abrir', more:'Más países en inglés' },
  fr: { eyebrow:'PERSPECTIVES NATIONALES', title:'Les mêmes mots politiques. Un autre contexte national.', intro:'Ces quatre perspectives sont entièrement disponibles en français. Les autres pays restent en anglais tant que des traductions éditoriales de qualité ne peuvent pas être maintenues.', open:'Ouvrir', more:'Plus de pays en anglais' },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale:'de' },{ locale:'es' },{ locale:'fr' }]; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(locale in copy)) return {};
  return {
    title: 'Country perspectives',
    alternates: {
      canonical: `/${locale}/countries`,
      languages: { 'en-US':'/countries', de:'/de/countries', es:'/es/countries', fr:'/fr/countries', 'x-default':'/countries' },
    },
  };
}

export default async function LocalizedCountriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!(locale in copy)) notFound();
  const l = locale as keyof typeof copy;
  const c = copy[l];
  const countries = nativeCountrySlugs.map((slug) => {
    const base = countryBySlug(slug)!;
    return localizeCountryProfile(base, l as Locale)!;
  });

  return <main className="home info-page countries-page">
    <SiteHeader />
    <section className="info-hero countries-hero"><div className="info-shell"><p>{c.eyebrow}</p><h1>{c.title}</h1><div>{c.intro}</div></div></section>
    <section className="info-shell countries-content">
      <div className="country-card-grid">{countries.map((country) => <article className="country-card" key={country.slug}><span>CONTEXT GUIDE</span><h2>{country.name}</h2><p>{country.vocabulary[0]}</p><Link href={`/${locale}/countries/${country.slug}`}>{c.open} →</Link></article>)}</div>
      <p className="countries-method-note"><Link href="/countries">{c.more} →</Link></p>
    </section>
  </main>;
}
