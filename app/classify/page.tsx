import Link from 'next/link';
import LiteracyQuizClient from '../LiteracyQuizClient';
import { LanguageSelector } from '../LocaleProvider';

export default function ClassifyPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>CLASSIFY · 20 questions</span><LanguageSelector />
      </header>
      <LiteracyQuizClient section="classify" />
    </main>
  );
}
