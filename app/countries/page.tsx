import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../SiteChrome';
import { countryProfiles } from '../../lib/countries';

export const metadata: Metadata = {
  title: 'Country perspectives | Politangle',
  description: 'Explore how political institutions, vocabulary and historical turning points differ across Politangle country perspectives.',
};

export default function CountriesPage() {
  const currentCount = countryProfiles.filter((country) => country.current).length;
  return (
    <main className="home info-page countries-page">
      <SiteHeader />
      <section className="info-hero countries-hero">
        <div className="info-shell">
          <p>COUNTRY PERSPECTIVES</p>
          <h1>Politics does not mean the same thing everywhere.</h1>
          <div>Explore how political systems, institutions, vocabulary and historical turning points shape debate across {countryProfiles.length} countries. Current-data snapshots are shown only where they have been source-checked.</div>
        </div>
      </section>

      <section className="info-shell info-content countries-content">
        <div className="countries-summary">
          <div><strong>{countryProfiles.length}</strong><span>country perspectives</span></div>
          <div><strong>{currentCount}</strong><span>with current-data snapshots</span></div>
        </div>

        <div className="country-card-grid">
          {countryProfiles.map((country) => (
            <article className="country-card" key={country.slug}>
              <span>{country.current ? `CURRENT SNAPSHOT · ${country.current.asOf}` : 'FOUNDATIONAL PROFILE'}</span>
              <h2>{country.name}</h2>
              <p>{country.atAGlance[0][1]}</p>
              <Link href={`/countries/${country.slug}`}>Explore perspective →</Link>
            </article>
          ))}
        </div>

        <article className="info-section country-methodology-note">
          <h2>How to read these pages</h2>
          <div>
            <p>Each perspective explains how power is organised, how familiar political words are used locally, and which historical developments matter for understanding the system.</p>
            <p>Where a current snapshot is not yet source-checked, Politangle shows the background profile without pretending that office-holder or election data is current.</p>
          </div>
        </article>
      </section>
    </main>
  );
}
