import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
import { CountryGuide } from '../CountryGuide';
import { countryBySlug, countryProfiles } from '../../../lib/countries';

export const dynamicParams = false;
export function generateStaticParams() { return countryProfiles.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const country = countryBySlug((await params).slug);
  return {
    title: country ? `${country.name} · Country perspective | Politangle` : 'Country not found',
    description: country ? `A concise guide to how political institutions and labels work differently in ${country.name}.` : undefined,
    robots: country?.status === 'reviewed' ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const country = countryBySlug((await params).slug);
  if (!country) notFound();
  return <main className="home info-page countries-page"><SiteHeader /><CountryGuide country={country} locale="en" backHref="/countries" /></main>;
}
