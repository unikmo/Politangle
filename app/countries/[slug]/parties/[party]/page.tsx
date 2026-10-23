import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteHeader } from '../../../../SiteChrome';
import { countryBySlug, countryProfiles } from '../../../../../lib/countries';
import { countryPartyNames, partySlug } from '../../../../../lib/country-parties';

export const dynamicParams = false;
export function generateStaticParams() {
  return countryProfiles.flatMap(country => (countryPartyNames[country.slug] ?? []).map(party => ({slug:country.slug, party:partySlug(party)})));
}
export async function generateMetadata({params}: {params:Promise<{slug:string;party:string}>}):Promise<Metadata>{
  const {slug,party}=await params;
  const name=(countryPartyNames[slug]??[]).find(p=>partySlug(p)===party);
  return name ? {title:`${name} · ${countryBySlug(slug)?.name} | Politangle`,robots:{index:false,follow:true}} : {};
}
export default async function PartyPage({params}: {params:Promise<{slug:string;party:string}>}){
  const {slug,party}=await params;
  const country=countryBySlug(slug);
  const name=(countryPartyNames[slug]??[]).find(p=>partySlug(p)===party);
  if(!country||!name) notFound();
  return <main className="home info-page countries-page"><SiteHeader/><section className="info-shell country-guide">
    <p><Link href={`/countries/${slug}`}>← {country.name}</Link></p>
    <h1>{name}</h1>
    <p>Political party in {country.name}. Political labels and electoral alliances have country-specific meanings; a Politangle profile does not determine party preference.</p>
    <h2>Understanding the political landscape</h2>
    {country.vocabulary.map((paragraph,index)=><p key={index}>{paragraph}</p>)}
    <h2>Country background and sources</h2>
    <ul>{country.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} — {source.publisher}</a></li>)}</ul>
    <p><small>Party-specific ideology, policies and electoral representation have not been independently verified. This page is not an endorsement.</small></p>
  </section></main>;
}
