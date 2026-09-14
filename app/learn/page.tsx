import type { Metadata } from 'next';
import Link from 'next/link';
import { InfoShell } from '../InfoShell';
import { glossaryEvidence, literacyGlossary, type GlossaryCategory } from '../../lib/literacy-glossary';

export const metadata: Metadata = {
  title: 'Learn political terms',
  description: 'Plain-English explanations of political traditions, democracy, power, ownership and political maps.',
  alternates: { canonical: '/learn' },
};

const categories: readonly GlossaryCategory[] = [
  'Political families',
  'Democracy and power',
  'Economy and society',
  'Reading political patterns',
];

export default function LearnPage() {
  return (
    <InfoShell
      eyebrow="LEARN · ENGLISH"
      title="Political words, explained plainly."
      intro="Start here before you practise. Each entry gives the short meaning first, then the distinction that usually causes confusion."
    >
      <div className="learn-intro-actions">
        <Link className="engine-primary-link" href="/practice">Try a free practice set →</Link>
        <p>No score is recorded here. Open any term whenever you need it.</p>
      </div>
      {categories.map((category) => (
        <section className="learn-group" key={category}>
          <h2>{category}</h2>
          <div className="learn-grid">
            {literacyGlossary.filter((entry) => entry.category === category).map((entry) => (
              <details className="learn-entry" id={entry.slug} key={entry.slug}>
                <summary>
                  <span>{entry.term}</span>
                  <small>{entry.shortDefinition}</small>
                </summary>
                <div>
                  <p>{entry.explanation}</p>
                  <p className="learn-sources">
                    <strong>Read the sources:</strong>{' '}
                    {glossaryEvidence(entry).map((source, index, sources) => (
                      <span key={source.id}><a href={source.url} rel="noreferrer" target="_blank">{source.publisher}</a>{index < sources.length - 1 ? ', ' : ''}</span>
                    ))}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </InfoShell>
  );
}
