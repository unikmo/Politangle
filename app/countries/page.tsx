import type { Metadata } from 'next';
import Link from 'next/link';
import { countryProfiles, lockedCountryQueue } from '../../lib/countries';

export const metadata: Metadata = { title: 'Countries editorial preview', robots: { index: false, follow: false } };

export default function CountriesPage() {
  return <main className="info-page countries-page"><header className="info-nav"><Link href="/" className="info-brand">Politangle<small>politangle.org</small></Link><span>Countries · editorial workbench</span></header><section className="info-hero"><div className="info-shell"><p>POLITANGLE COUNTRIES · MVP2</p><h1>How political ideas work in real systems.</h1><div>These pages are source-backed editorial drafts, not published country guides. Dynamic facts remain blocked until their freshness and review controls are complete.</div></div></section><section className="info-shell info-content"><p className="info-callout">No country profile is indexable or labelled reviewed yet. Four schema-proving drafts come first; the locked six-country queue follows only after the quality gate.</p><div className="country-card-grid">{countryProfiles.map((country) => <article className="country-card" key={country.slug}><span>{country.status.replace('-', ' ')}</span><h2>{country.name}</h2><p>{country.atAGlance[0][1]}</p><Link href={`/countries/${country.slug}`}>Inspect draft →</Link></article>)}</div><article className="info-section"><h2>Locked next group</h2><div><p>{lockedCountryQueue.join(' · ')}</p><p>The additional countries needed to approach twenty remain an explicit editorial decision; they are not silently selected here.</p></div></article></section></main>;
}
