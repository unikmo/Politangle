import Link from 'next/link';
import LiteracyQuizClient from '../LiteracyQuizClient';
import { LanguageSelector } from '../LocaleProvider';

export default function UnderstandPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>UNDERSTAND · 20 questions</span><LanguageSelector />
      </header>
      <LiteracyQuizClient section="understand" />
    </main>
  );
}
