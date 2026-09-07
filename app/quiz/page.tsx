import Link from 'next/link';
import PrismaticTriangle from '../../components/PrismaticTriangle';
import QuizClient from './QuizClient';

export default function QuizPage() {
  return (
    <main className="app-page quiz-page">
      <header className="minimal-header shell">
        <Link className="brand-lockup" href="/">
          <PrismaticTriangle compact />
          <span className="brand-copy"><strong>Politangle</strong><small>Politics from every angle.</small></span>
        </Link>
        <Link className="text-link" href="/">Exit quiz</Link>
      </header>

      <div className="quiz-intro shell">
        <p className="eyebrow">BELIEFS FIRST. LABELS LATER.</p>
        <h1>Where do you stand?</h1>
        <p>Twenty-six statements across economy, society, power and the world. The order is randomized so the experience does not cue an ideological direction.</p>
      </div>

      <QuizClient />
    </main>
  );
}
