import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { countryBySlug } from '../../../lib/countries';
import { localizeCountryProfile, nativeCountrySlugs } from '../../../lib/country-localization';
import type { Locale } from '../../LocaleProvider';

const copy = {
  de: { eyebrow:'POLITIK NACH LÄNDERN', title:'Politische Begriffe bedeuten nicht überall dasselbe.', intro:'Unsere 80 Länderporträts erklären, wie Institutionen, Geschichte und politische Sprache den jeweiligen nationalen Kontext prägen. So lassen sich Länder vergleichen, ohne ihre Besonderheiten zu übergehen.', open:'Land ansehen', note:'Aktuelle Angaben erscheinen nur, wenn sie mit verlässlichen Quellen geprüft wurden.', metaTitle:'Politik nach Ländern', metaDescription:'Politangle erklärt politische Begriffe, Institutionen und Entwicklungen in 80 Ländern.', cardLabel:'LÄNDERPORTRÄT' },
  es: { eyebrow:'PERSPECTIVAS NACIONALES', title:'Las mismas palabras políticas. Otro contexto nacional.', intro:'Las 80 perspectivas nacionales están disponibles en español. Explican solo el contexto necesario antes de comparar etiquetas e instituciones políticas entre países.', open:'Abrir', note:'Los panoramas políticos actuales aparecen solo cuando los datos de base ya han sido verificados con fuentes.', metaTitle:'Perspectivas nacionales', metaDescription:'Politangle explica cómo cambian las etiquetas políticas y las instituciones en 80 países.', cardLabel:'GUÍA DE CONTEXTO' },
  fr: { eyebrow:'LA POLITIQUE SELON LES PAYS', title:'Les mots politiques ne veulent pas dire la même chose partout.', intro:'Nos 80 guides expliquent comment les institutions, l’histoire et le vocabulaire politique façonnent le débat dans chaque pays. Ils permettent de comparer les pays sans effacer leurs particularités.', open:'Voir le pays', note:'Les informations actuelles ne sont publiées que lorsqu’elles ont été vérifiées à partir de sources fiables.', metaTitle:'La politique selon les pays', metaDescription:'Politangle explique les mots politiques, les institutions et les grandes évolutions dans 80 pays.', cardLabel:'GUIDE DU PAYS' },
  'pt-br': { eyebrow:'PERSPECTIVAS POR PAÍS', title:'As mesmas palavras políticas. Outro contexto nacional.', intro:'As 80 perspectivas por país estão disponíveis em português do Brasil. Elas apresentam o contexto necessário antes de comparar rótulos políticos e instituições entre países.', open:'Abrir', note:'Panoramas políticos atuais só aparecem quando os dados de base já passaram por verificação de fontes.', metaTitle:'Perspectivas por país', metaDescription:'O Politangle explica como rótulos políticos e instituições funcionam de forma diferente em 80 países.', cardLabel:'GUIA DE CONTEXTO' },
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
    robots: { index: true, follow: true },
    openGraph: { type:'website', siteName:'Politangle', title: copy[locale as keyof typeof copy].metaTitle, description: copy[locale as keyof typeof copy].metaDescription, url:`/${locale}/countries` },
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
