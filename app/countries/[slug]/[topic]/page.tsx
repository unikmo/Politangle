import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '../../../SiteChrome';
import { countryBySlug, countryProfiles } from '../../../../lib/countries';

export const dynamicParams = false;
export function generateStaticParams() {
  return countryProfiles.flatMap(country => (country.globalLabels?.localDimensions ?? []).map((_, index) => ({slug: country.slug, topic: String(index + 1)})));
}
export async function generateMetadata({params}: {params: Promise<{slug:string;topic:string}>}): Promise<Metadata> {
  const {slug,topic}=await params;
  const country=countryBySlug(slug);
  const label=country?.globalLabels?.localDimensions[Number(topic)-1];
  return label ? {title:`${label} · ${country!.name} | Politangle`,robots:{index:false,follow:true}} : {};
}
export default async function CountryTopicPage({params}: {params: Promise<{slug:string;topic:string}>}) {
  const {slug,topic}=await params;
  const country=countryBySlug(slug);
  const index=Number(topic)-1;
  if (!country || !Number.isInteger(index) || index<0 || !country.globalLabels?.localDimensions[index]) notFound();
  const label=country.globalLabels.localDimensions[index];
  return <main className="home info-page countries-page"><SiteHeader /><section className="info-shell country-guide">
    <p><Link href={`/countries/${slug}`}>← {country.name}</Link></p>
    <h1>{label}</h1>
    <p>{country.globalLabels.summary}</p>
    <h2>Political context in {country.name}</h2>
    {country.vocabulary.map((text,i)=><p key={i}>{text}</p>)}
    <h2>Sources for further reading</h2>
    <ul>{country.sources.map(source=><li key={source.url}><a href={source.url} rel="noopener noreferrer" target="_blank">{source.title} — {source.publisher}</a></li>)}</ul>
    <p><small>Editorial context, not a party recommendation. Specific topic research remains under review.</small></p>
  </section></main>;
}
