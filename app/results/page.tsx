import Link from 'next/link';
import ResultsClient from './ResultsClient';
import ResultExtras from '../ResultExtras';
import { LanguageSelector } from '../LocaleProvider';

export default function ResultsPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Quick result</span><LanguageSelector />
      </header>
      <ResultsClient />
      <ResultExtras stage="quick" />
    </main>
  );
}
