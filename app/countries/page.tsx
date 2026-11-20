import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../SiteChrome';
import { countryProfiles } from '../../lib/countries';

export const metadata: Metadata = {
  title: 'Country perspectives | Politangle',
  description: 'Compare how political institutions, labels and local political dimensions work across 80 countries.',
  alternates: { canonical:'/countries', languages:{ 'en-US':'/countries', de:'/de/countries', es:'/es/countries', fr:'/fr/countries', 'pt-BR':'/pt-br/countries', 'x-default':'/countries' } },
  robots: { index:true, follow:true },
  openGraph: { type:'website', siteName:'Politangle', title:'Country perspectives | Politangle', description:'Compare how political institutions, labels and local political dimensions work across 80 countries.', url:'/countries' },
};

export default function CountriesPage() {
  return (
    <main className="home info-page countries-page">
      <SiteHeader />
      <section className="info-hero countries-hero">
        <div className="info-shell">
          <p>COUNTRY PERSPECTIVES</p>
          <h1>Same label. Different country. Same meaning?</h1>
          <div>Choose a country to discover what its political vocabulary and institutions mean in context. The guide does not assign you a party or change your Politangle result.</div>
        </div>
      </section>

      <section className="info-shell countries-content">
        <div className="country-card-grid">
          {countryProfiles.map((country) => (
            <article className="country-card" key={country.slug}>
              <span>{country.current ? `CONTEXT + CURRENT SNAPSHOT · ${country.current.asOf}` : 'CONTEXT GUIDE'}</span>
              <h2>{country.name}</h2>
              <p>See which local distinctions matter before comparing familiar labels.</p>
              <Link href={`/countries/${country.slug}`}>Open {country.name} →</Link>
            </article>
          ))}
        </div>

        <p className="countries-method-note">Current-data sections appear only where they have been source-checked. Background context remains available without presenting unfinished current information as up to date.</p>
      </section>
      <p className="info-shell" style={{ marginBottom: 48 }}><Link href="/en/quiz">Discover your own eight dimensions →</Link> · <Link href="/en/faq">How to interpret the result →</Link></p>
    </main>
  );
}
