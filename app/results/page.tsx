import Link from 'next/link';
import ResultsClient from './ResultsClient';

export default function ResultsPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Quick result</span>
      </header>
      <ResultsClient />
    </main>
  );
}
