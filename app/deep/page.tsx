import Link from 'next/link';
import PrismaticTriangle from '../../components/PrismaticTriangle';

const deepLayers = [
  { tag: 'BELIEVE', title: 'What you believe', body: 'Deeper issue trade-offs test the strength and consistency of your own preferences without treating beliefs as right or wrong.' },
  { tag: 'CLASSIFY', title: 'What you recognize', body: 'Identify which political traditions can reasonably support an argument — including cases where more than one answer is defensible.' },
  { tag: 'UNDERSTAND', title: 'What you understand', body: 'Nuance questions test misconceptions, boundaries and differences between related political traditions.' },
];

export default function DeepPage() {
  return (
    <main className="app-page deep-page">
      <header className="minimal-header shell">
        <Link className="brand-lockup" href="/">
          <PrismaticTriangle compact />
          <span className="brand-copy"><strong>Politangle</strong><small>Politics from every angle.</small></span>
        </Link>
        <Link className="text-link" href="/results">Back to results</Link>
      </header>

      <section className="deep-hero shell">
        <div>
          <p className="eyebrow">POLITANGLE DEEP</p>
          <h1>Understand the why behind your political angle.</h1>
          <p>Quick maps your preferences. Deep is designed to add nuance: where your beliefs fit, where political traditions overlap, and where common labels oversimplify.</p>
          <div className="deep-hero-actions">
            <Link className="button button-dark" href="/quiz">Start with Quick</Link>
            <span><strong>$4.99</strong><small>planned one-time unlock after validation</small></span>
          </div>
        </div>
        <PrismaticTriangle labelled className="deep-hero-prism" />
      </section>

      <section className="deep-layers shell">
        {deepLayers.map((layer) => (
          <article key={layer.tag}>
            <span>{layer.tag}</span>
            <h2>{layer.title}</h2>
            <p>{layer.body}</p>
          </article>
        ))}
      </section>

      <section className="schools-detail shell" id="schools">
        <div>
          <p className="eyebrow">FOR SCHOOLS</p>
          <h2>Measure learning. Protect beliefs.</h2>
          <p>The school model is designed so students can see their own political profile while teachers receive only learning analytics and sufficiently aggregated class-level patterns — not individual political answers or profiles.</p>
        </div>
        <div className="school-principles">
          <div><strong>Student</strong><span>Sees their own result and learning feedback.</span></div>
          <div><strong>Teacher</strong><span>Sees completion and learning outcomes, not individual political profiles.</span></div>
          <div><strong>Class view</strong><span>Only aggregated political patterns above a minimum group threshold.</span></div>
        </div>
      </section>

      <section className="staging-banner shell">
        <strong>Staging note</strong>
        <p>Deep classification weights, school analytics thresholds and any storage of political-opinion data remain validation work. Political data involving minors requires qualified legal review before release.</p>
      </section>
    </main>
  );
}
