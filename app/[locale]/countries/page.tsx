import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { countryBySlug } from '../../../lib/countries';
import { localizeCountryProfile, nativeCountrySlugs } from '../../../lib/country-localization';
import type { Locale } from '../../LocaleProvider';

const copy = {
  de: { eyebrow:'LÄNDERPERSPEKTIVEN', title:'Gleiche politische Begriffe. Anderer Länderkontext.', intro:'Alle 20 Länderperspektiven sind auf Deutsch verfügbar. Sie erklären nur den Kontext, der nötig ist, bevor politische Begriffe und Institutionen zwischen Ländern verglichen werden.', open:'Öffnen', note:'Aktuelle Momentaufnahmen erscheinen nur dort, wo die zugrunde liegenden Daten bereits quellengeprüft wurden.', metaTitle:'Länderperspektiven', metaDescription:'Politangle erklärt, wie politische Begriffe und Institutionen in 20 Ländern unterschiedlich funktionieren.', cardLabel:'KONTEXTLEITFADEN' },
  es: { eyebrow:'PERSPECTIVAS NACIONALES', title:'Las mismas palabras políticas. Otro contexto nacional.', intro:'Las 20 perspectivas nacionales están disponibles en español. Explican solo el contexto necesario antes de comparar etiquetas e instituciones políticas entre países.', open:'Abrir', note:'Los panoramas políticos actuales aparecen solo cuando los datos de base ya han sido verificados con fuentes.', metaTitle:'Perspectivas nacionales', metaDescription:'Politangle explica cómo cambian las etiquetas políticas y las instituciones en 20 países.', cardLabel:'GUÍA DE CONTEXTO' },
  fr: { eyebrow:'PERSPECTIVES NATIONALES', title:'Les mêmes mots politiques. Un autre contexte national.', intro:'Les 20 perspectives nationales sont disponibles en français. Elles donnent uniquement le contexte nécessaire avant de comparer les étiquettes et institutions politiques entre pays.', open:'Ouvrir', note:'Les instantanés politiques actuels n’apparaissent que lorsque les données sous-jacentes ont déjà été vérifiées par des sources.', metaTitle:'Perspectives nationales', metaDescription:'Politangle explique comment les étiquettes politiques et les institutions diffèrent dans 20 pays.', cardLabel:'GUIDE DE CONTEXTE' },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale:'de' },{ locale:'es' },{ locale:'fr' }]; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(locale in copy)) return {};
  return {
    title: copy[locale as keyof typeof copy].metaTitle,
    description: copy[locale as keyof typeof copy].metaDescription,
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
      <div className="country-card-grid">{countries.map((country) => <article className="country-card" key={country.slug}><span>{c.cardLabel}</span><h2>{country.name}</h2><p>{country.vocabulary[0]}</p><Link href={`/${locale}/countries/${country.slug}`}>{c.open} →</Link></article>)}</div>
      <p className="countries-method-note">{c.note}</p>
    </section>
  </main>;
}
