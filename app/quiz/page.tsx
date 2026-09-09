import Link from 'next/link';
import QuizClient from './QuizClient';

export default function QuizPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>Quick · 26 statements</span>
      </header>
      <QuizClient />
    </main>
  );
}
