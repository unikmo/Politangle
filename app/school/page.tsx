import Link from 'next/link';

export default function SchoolPage() {
  return (
    <main className="engine-page school-page">
      <header className="engine-header">
        <Link href="/" className="engine-brand">Politangle School</Link>
        <span>Young people · classroom + private</span>
      </header>
      <section className="engine-shell school-shell">
        <article className="engine-card school-hero-card">
          <p className="engine-kicker">Political literacy for young people</p>
          <h1>Understand politics. See the room. Keep the individual private.</h1>
          <p>Politangle School is designed for secondary-school learning. Students can explore privately or join an anonymous teacher-led classroom where the teacher sees only the class totals and distributions.</p>
          <p className="engine-callout"><strong>Classroom privacy:</strong> the teacher sees the room, never which student gave which answer.</p>
        </article>

        <div className="school-entry-grid">
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">Students · private</p>
            <h2>Explore on your own device</h2>
            <p>Take Quick 26, continue to Full 42, or practise political literacy. Your individual result is not sent to a teacher.</p>
            <Link className="engine-primary-link" href="/school/private">Private Student Mode</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">Students · classroom</p>
            <h2>Join an anonymous classroom</h2>
            <p>Enter the six-character session code from your teacher. No name, email, username or student ID is required.</p>
            <Link className="engine-primary-link" href="/school/student">Join classroom</Link>
          </article>
          <article className="engine-card school-entry-card">
            <p className="engine-kicker">Teachers</p>
            <h2>Run a live lesson</h2>
            <p>School pack: <strong>$300 for 10 teacher licenses.</strong> A licensed teacher can generate temporary session codes and run Quick 26, Full 42, literacy, guided or custom activities.</p>
            <Link className="engine-primary-link" href="/school/teacher">Teacher classroom</Link>
          </article>
        </div>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">What the teacher can see</p>
          <div className="school-principle-grid">
            <div><strong>YES</strong><span>Joined count, response totals, live class distributions, aggregate political shape, literacy patterns and lesson summary.</span></div>
            <div><strong>NEVER</strong><span>Student names, who chose an answer, an individual political profile, individual polygon or individual literacy score.</span></div>
          </div>
          <p className="engine-disclaimer"><strong>REQUIRES QUALIFIED LEGAL REVIEW</strong> before real deployment with minors or schools. The current implementation is a non-production pilot.</p>
        </article>
      </section>
    </main>
  );
}
