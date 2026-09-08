import Link from 'next/link';

export default function SchoolPage() {
  return (
    <main className="engine-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle</Link>
        <span>School mode · pilot</span>
      </header>
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Political literacy for classrooms</p>
          <h1>Measure learning. Protect beliefs.</h1>
          <p>School mode separates political knowledge from political opinion. Students can test what they know, learn the major traditions, practise with feedback and take a matched post-test.</p>
          <p className="engine-help">Teachers receive anonymous literacy aggregates only. Individual political-belief answers, ideology compatibility and personal polygons are not accepted by the school aggregation API.</p>
          <div className="engine-result-actions">
            <Link className="engine-primary-link" href="/school/student">Student mode</Link>
            <Link className="engine-primary-link" href="/school/teacher">Teacher mode</Link>
          </div>
        </article>
        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">Classroom learning loop</p>
          <h2>Baseline → Learn → Practice → Post-test</h2>
          <p className="engine-help">The post-test is a content-matched parallel-form candidate, not yet an empirically equated test form. School-age comprehension and classroom deployment still require cognitive testing and qualified legal/privacy review.</p>
          <p><strong>REQUIRES QUALIFIED LEGAL REVIEW</strong> before deployment with minors or real schools.</p>
        </article>
      </section>
    </main>
  );
}
