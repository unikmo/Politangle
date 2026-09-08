import Link from 'next/link';

export default function PrivateSchoolPage() {
  return (
    <main className="engine-page school-page">
      <header className="engine-header"><Link href="/school" className="engine-brand">Politangle School</Link><span>Private Student Mode</span></header>
      <section className="engine-shell school-shell">
        <article className="engine-card"><p className="engine-kicker">Your device · your result</p><h1>Explore politics privately.</h1><p>No classroom code is needed. These activities do not send your individual political profile to a teacher.</p></article>
        <div className="school-entry-grid">
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Quick 26</h2><p>Start with 26 statements and see your broad multidimensional political shape.</p><Link className="engine-primary-link" href="/quiz">Start Quick 26</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">BELIEVE</p><h2>Full 42</h2><p>Full 42 continues from Quick and adds the remaining THINK, FEEL and ACT questions.</p><Link className="engine-primary-link" href="/quiz">Start Quick → Full</Link></article>
          <article className="engine-card school-entry-card"><p className="engine-kicker">Political literacy</p><h2>Private quiz</h2><p>Test CLASSIFY and UNDERSTAND without sharing an individual score with a classroom.</p><Link className="engine-primary-link" href="/school/private/literacy">Start literacy quiz</Link></article>
        </div>
      </section>
    </main>
  );
}
