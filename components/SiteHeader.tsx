import Link from 'next/link';
import PrismaticTriangle from './PrismaticTriangle';

export default function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="brand-lockup" href="/" aria-label="Politangle home">
        <PrismaticTriangle compact />
        <span className="brand-copy">
          <strong>Politangle</strong>
          <small>Politics from every angle.</small>
        </span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/quiz">Take the Quiz</Link>
        <Link href="/#learn">Learn</Link>
        <Link href="/#schools">For Schools</Link>
        <Link href="/#about">About</Link>
      </nav>

      <div className="header-actions">
        <span className="language-control" aria-label="English language">EN</span>
        <Link className="button button-dark button-small" href="/quiz">Get Started</Link>
      </div>
    </header>
  );
}
