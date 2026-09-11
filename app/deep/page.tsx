import Link from 'next/link';
import DeepClient from './DeepClient';
import { LanguageSelector } from '../LocaleProvider';

export default function DeepPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Full · 16 more questions</span><LanguageSelector />
      </header>
      <DeepClient />
    </main>
  );
}
