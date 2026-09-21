import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { CountryGuide } from '../CountryGuide';
import { countryBySlug, countryProfiles } from '../../../lib/countries';

export const dynamicParams = false;
export function generateStaticParams() { return countryProfiles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const country = countryBySlug((await params).slug);
  if (!country) return { title: 'Country not found' };
  const description = `How political institutions, global labels and local political dimensions work in ${country.name}.`;
  return {
    title: `${country.name} · Country perspective | Politangle`,
    description,
    alternates: {
      canonical: `/countries/${country.slug}`,
      languages: {
        'en-US': `/countries/${country.slug}`,
        de: `/de/countries/${country.slug}`,
        es: `/es/countries/${country.slug}`,
        fr: `/fr/countries/${country.slug}`,
        'pt-BR': `/pt-br/countries/${country.slug}`,
        'x-default': `/countries/${country.slug}`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: { type:'article', siteName:'Politangle', title:`${country.name} · Country perspective | Politangle`, description, url:`/countries/${country.slug}` },
    twitter: { card:'summary_large_image', title:`${country.name} · Country perspective | Politangle`, description },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const country = countryBySlug((await params).slug);
  if (!country) notFound();
  return <main className="home info-page countries-page"><SiteHeader /><CountryGuide country={country} locale="en" backHref="/countries" /></main>;
}
