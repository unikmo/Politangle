import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { countryBySlug, countryProfiles } from '../../../lib/countries';

export const dynamicParams = false;
export function generateStaticParams() { return countryProfiles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const country = countryBySlug((await params).slug);
  return { title: country ? `${country.name} · editorial draft` : 'Country not found', robots: { index: false, follow: false } };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const country = countryBySlug((await params).slug);
  if (!country) notFound();
  return <main className="info-page countries-page"><header className="info-nav"><Link href="/" className="info-brand">Politangle<small>politangle.org</small></Link><Link href="/countries">All country drafts</Link></header><section className="country-hero"><div className="info-shell"><p>EDITORIAL DRAFT · NOT INDEXABLE</p><h1>{country.name}</h1><span>Sources checked {country.updatedAt}</span></div></section><section className="info-shell info-content"><article className="info-section"><h2>At a glance</h2><div><dl className="country-facts">{country.atAGlance.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></article><article className="info-section"><h2>How power works</h2><div>{country.power.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><article className="info-section"><h2>Left and right here</h2><div>{country.vocabulary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></article><article className="info-section"><h2>Political timeline</h2><div className="country-timeline">{country.timeline.map((event) => <div key={`${event.year}-${event.title}`}><time>{event.year}</time><strong>{event.title}</strong><p>{event.text}</p></div>)}</div></article><article className="info-section"><h2>Blocked before review</h2><div><ul>{country.incomplete.map((item) => <li key={item}>{item}</li>)}</ul><p>This page cannot move from editorial draft to reviewed until every item is completed from fresh authoritative or academic sources.</p></div></article><article className="info-section"><h2>Sources</h2><div><ul className="country-sources">{country.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.title}</a><span>{source.publisher} · checked {source.checkedAt}</span></li>)}</ul></div></article></section></main>;
}
