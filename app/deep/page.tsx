import Link from 'next/link';
import DeepClient from './DeepClient';
import ResultExtras from '../ResultExtras';
import { LanguageSelector } from '../LocaleProvider';

export default function DeepPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Full · 16 more questions</span><LanguageSelector />
      </header>
      <DeepClient />
      <ResultExtras stage="full" />
    </main>
  );
}
