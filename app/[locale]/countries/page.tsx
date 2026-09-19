import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { countryBySlug } from '../../../lib/countries';
import { localizeCountryProfile, nativeCountrySlugs } from '../../../lib/country-localization';
import type { Locale } from '../../LocaleProvider';

const copy = {
  de: { eyebrow:'LÄNDERPERSPEKTIVEN', title:'Gleiche politische Begriffe. Anderer Länderkontext.', intro:'Alle 60 Länderperspektiven sind auf Deutsch verfügbar. Sie erklären nur den Kontext, der nötig ist, bevor politische Begriffe und Institutionen zwischen Ländern verglichen werden.', open:'Öffnen', note:'Aktuelle Momentaufnahmen erscheinen nur dort, wo die zugrunde liegenden Daten bereits quellengeprüft wurden.', metaTitle:'Länderperspektiven', metaDescription:'Politangle erklärt, wie politische Begriffe und Institutionen in 60 Ländern unterschiedlich funktionieren.', cardLabel:'KONTEXTLEITFADEN' },
  es: { eyebrow:'PERSPECTIVAS NACIONALES', title:'Las mismas palabras políticas. Otro contexto nacional.', intro:'Las 60 perspectivas nacionales están disponibles en español. Explican solo el contexto necesario antes de comparar etiquetas e instituciones políticas entre países.', open:'Abrir', note:'Los panoramas políticos actuales aparecen solo cuando los datos de base ya han sido verificados con fuentes.', metaTitle:'Perspectivas nacionales', metaDescription:'Politangle explica cómo cambian las etiquetas políticas y las instituciones en 60 países.', cardLabel:'GUÍA DE CONTEXTO' },
  fr: { eyebrow:'PERSPECTIVES NATIONALES', title:'Les mêmes mots politiques. Un autre contexte national.', intro:'Les 60 perspectives nationales sont disponibles en français. Elles donnent uniquement le contexte nécessaire avant de comparer les étiquettes et institutions politiques entre pays.', open:'Ouvrir', note:'Les instantanés politiques actuels n’apparaissent que lorsque les données sous-jacentes ont déjà été vérifiées par des sources.', metaTitle:'Perspectives nationales', metaDescription:'Politangle explique comment les étiquettes politiques et les institutions diffèrent dans 60 pays.', cardLabel:'GUIDE DE CONTEXTE' },
  'pt-br': { eyebrow:'PERSPECTIVAS POR PAÍS', title:'As mesmas palavras políticas. Outro contexto nacional.', intro:'As 60 perspectivas por país estão disponíveis em português do Brasil. Elas apresentam o contexto necessário antes de comparar rótulos políticos e instituições entre países.', open:'Abrir', note:'Panoramas políticos atuais só aparecem quando os dados de base já passaram por verificação de fontes.', metaTitle:'Perspectivas por país', metaDescription:'O Politangle explica como rótulos políticos e instituições funcionam de forma diferente em 60 países.', cardLabel:'GUIA DE CONTEXTO' },
} as const;

export const dynamicParams = false;
export function generateStaticParams() { return [{ locale:'de' },{ locale:'es' },{ locale:'fr' },{ locale:'pt-br' }]; }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!(locale in copy)) return {};
  return {
    title: copy[locale as keyof typeof copy].metaTitle,
    description: copy[locale as keyof typeof copy].metaDescription,
    alternates: {
      canonical: `/${locale}/countries`,
      languages: { 'en-US':'/countries', de:'/de/countries', es:'/es/countries', fr:'/fr/countries', 'pt-BR':'/pt-br/countries', 'x-default':'/countries' },
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
