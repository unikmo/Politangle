import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../SiteChrome';
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

function firstSentence(text: string) {
  const match = text.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] ?? text;
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const country = countryBySlug((await params).slug);
  if (!country) notFound();

  return (
    <main className="home info-page countries-page">
      <SiteHeader />

      <section className="country-hero">
        <div className="info-shell">
          <p>COUNTRY PERSPECTIVE</p>
          <h1>{country.name}, in context.</h1>
          <div>What changes when you read political ideas in {country.name}? This page gives the minimum context you need before comparing labels across countries.</div>
        </div>
      </section>

      <section className="info-shell country-guide">
        <aside className="country-purpose">
          <strong>Why this page exists</strong>
          <p>Political words do not travel perfectly. “Liberal”, “conservative”, “left”, “right”, “national” or “federal” can point to different coalitions and institutions in different countries.</p>
          <p><b>This page does not change your Politangle score.</b> It helps you understand the local context behind the vocabulary.</p>
        </aside>

        <section className="country-quick-read">
          <div className="method-section-head">
            <h2>Three things to know first</h2>
            <p>The shortest useful version of how power works here.</p>
          </div>
          <div className="country-insight-grid">
            {country.power.slice(0, 3).map((paragraph, index) => (
              <article key={paragraph}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{firstSentence(paragraph)}</p>
                {firstSentence(paragraph) !== paragraph && <details><summary>Why this matters</summary><p>{paragraph}</p></details>}
              </article>
            ))}
          </div>
        </section>

        <section className="country-language">
          <div className="method-section-head">
            <h2>What familiar labels mean here</h2>
            <p>Some political words change meaning across countries. These are the two distinctions worth knowing first.</p>
          </div>
          <div className="country-language-grid">
            {country.vocabulary.map((paragraph) => (
              <article key={paragraph}>
                <p>{firstSentence(paragraph)}</p>
                {firstSentence(paragraph) !== paragraph && <details><summary>More context</summary><p>{paragraph}</p></details>}
              </article>
            ))}
          </div>
        </section>

        <section className="country-system">
          <div className="method-section-head">
            <h2>The system in 30 seconds</h2>
            <p>Enough structure to make the rest of the page intelligible.</p>
          </div>
          <dl className="country-facts">
            {country.atAGlance.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </section>

        <section className="country-history">
          <div className="method-section-head">
            <h2>Turning points worth knowing</h2>
            <p>Only the events that help explain how today’s system got here.</p>
          </div>
          <div className="country-timeline concise">
            {country.timeline.slice(0, 4).map((event) => (
              <details key={`${event.year}-${event.title}`}>
                <summary><time>{event.year}</time><strong>{event.title}</strong></summary>
                <p>{event.text}</p>
              </details>
            ))}
          </div>
        </section>

        {country.current && (
          <details className="country-current-details">
            <summary>Current political snapshot · checked {country.current.asOf}</summary>
            <div className="country-current-body">
              <dl className="country-facts">
                {country.current.officeholders.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <article>
                <h3>{country.current.election.title}</h3>
                <p>{country.current.election.summary}</p>
                <small>{country.current.election.date} · {country.current.election.turnout}</small>
              </article>
              <article>
                <h3>{country.current.rights.provider} · {country.current.rights.edition}</h3>
                <p>{country.current.rights.note}</p>
                <a href={country.current.rights.url} rel="noreferrer">Source and methodology →</a>
              </article>
            </div>
          </details>
        )}

        <details className="country-sources-details">
          <summary>Sources and update status</summary>
          <div>
            <ul className="country-sources">
              {country.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.title}</a><span>{source.publisher} · checked {source.checkedAt}</span></li>)}
            </ul>
            {country.incomplete.length > 0 && <p className="country-method-note">Current-data work still open: {country.incomplete.join(' · ')}. Politangle does not present those missing sections as current.</p>}
          </div>
        </details>

        <div className="country-back"><Link href="/countries">← All country perspectives</Link></div>
      </section>
    </main>
  );
}
