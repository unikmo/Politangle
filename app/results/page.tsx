import Link from 'next/link';
import PrismaticTriangle from '../../components/PrismaticTriangle';
import ResultsClient from './ResultsClient';

export default function ResultsPage() {
  return (
    <main className="app-page results-page">
      <header className="minimal-header shell">
        <Link className="brand-lockup" href="/">
          <PrismaticTriangle compact />
          <span className="brand-copy"><strong>Politangle</strong><small>Politics from every angle.</small></span>
        </Link>
        <Link className="text-link" href="/">Back home</Link>
      </header>
      <div className="shell">
        <ResultsClient />
      </div>
    </main>
  );
}
