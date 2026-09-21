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
          <h1>Same political words. Different country context.</h1>
          <div>Choose a country to see only the context you need before comparing political labels and institutions. Country pages explain context; they do not change your Politangle score.</div>
        </div>
      </section>

      <section className="info-shell countries-content">
        <div className="country-card-grid">
          {countryProfiles.map((country) => (
            <article className="country-card" key={country.slug}>
              <span>{country.current ? `CONTEXT + CURRENT SNAPSHOT · ${country.current.asOf}` : 'CONTEXT GUIDE'}</span>
              <h2>{country.name}</h2>
              <p>See what is different here before comparing political labels across countries.</p>
              <Link href={`/countries/${country.slug}`}>Open {country.name} →</Link>
            </article>
          ))}
        </div>

        <p className="countries-method-note">Current-data sections appear only where they have been source-checked. Background context remains available without presenting unfinished current information as up to date.</p>
      </section>
    </main>
  );
}
