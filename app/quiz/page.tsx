import Link from 'next/link';
import QuizClient from './QuizClient';
import { LanguageSelector } from '../LocaleProvider';

export default function QuizPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Quick · 52 statements</span><LanguageSelector />
      </header>
      <QuizClient />
    </main>
  );
}
