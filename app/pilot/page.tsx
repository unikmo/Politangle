import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../SiteChrome';

export const metadata: Metadata = {
  title: 'Pilot with a group',
  description: 'Help shape Politangle: a free, non-partisan political-learning tool for clearer questions and better conversations.',
  alternates: { canonical: '/pilot' },
  robots: { index: false, follow: true },
};

const feedback = [
  ['Clarity', 'Are the questions, explanations and choices easy to understand?'],
  ['Appropriateness', 'Which examples, terms or question wordings need revision for your group?'],
  ['Fairness', 'Does the material feel balanced, transparent and open to disagreement?'],
  ['Privacy', 'Is it clear what stays private and what a facilitator can see?'],
  ['Facilitation', 'Would the guide make a group conversation workable, useful and safe?'],
] as const;

export default function PilotPage() {
  return (
    <main className="home pilot-page">
      <SiteHeader />

      <section className="pilot-hero">
        <div className="p-shell pilot-hero-grid">
          <div>
            <p className="p-kicker">POLITANGLE / DESIGN PARTNER PILOT</p>
            <h1>Help shape a better way to talk about politics.</h1>
            <p className="pilot-lede">We are looking for a class, seminar, youth group, volunteer group or community organisation to take part in a coordinated usability and education pilot.</p>
            <p className="pilot-hero-note">Politangle is a free, non-partisan tool for exploring political trade-offs, testing political knowledge and discussing disagreement without reducing people to a single label.</p>
            <div className="pilot-hero-actions">
              <a className="p-button" href="#what-we-need">See what we need <span aria-hidden="true">↓</span></a>
              <Link className="p-text-link" href="/contact">Express interest →</Link>
            </div>
          </div>
          <aside className="pilot-privacy-card" aria-label="Privacy promise">
            <p>THE STARTING POINT</p>
            <strong>Political answers stay private.</strong>
            <span>The group discusses the experience and the material - not anyone's individual political profile or result.</span>
          </aside>
        </div>
      </section>

      <section className="pilot-section p-shell" aria-labelledby="pilot-fit-title">
        <div className="pilot-section-heading">
          <p className="p-kicker">A GOOD FIT</p>
          <h2 id="pilot-fit-title">Bring an existing group. Help make the tool clearer for the next one.</h2>
          <p>This is for people who work with learners, volunteers or communities and are willing to give candid, structured feedback. A small group is welcome; a larger seminar, class or association can work too.</p>
        </div>
        <div className="pilot-fit-grid">
          <article><b>Schools and educators</b><span>Test the teacher-facing material and whether a classroom model is neutral, comprehensible and workable.</span></article>
          <article><b>Universities and student groups</b><span>Test language, flow and whether the format supports curiosity rather than political labelling.</span></article>
          <article><b>Youth, volunteer and community groups</b><span>Test examples, accessibility and the practical conditions for a respectful group conversation.</span></article>
        </div>
      </section>

      <section className="pilot-section pilot-process" aria-labelledby="pilot-process-title">
        <div className="p-shell">
          <div className="pilot-section-heading">
            <p className="p-kicker">HOW THE PILOT WORKS</p>
            <h2 id="pilot-process-title">A light, coordinated test - not a political lesson or a marketing session.</h2>
          </div>
          <ol className="pilot-steps">
            <li><span>01</span><div><h3>Agree the setting</h3><p>We clarify the group, the audience, what is useful to test and who will facilitate. The format is adapted together; it is not a one-size-fits-all package.</p></div></li>
            <li><span>02</span><div><h3>Try Politangle privately</h3><p>Participants can explore the tool in their own time before the group session. The purpose is to notice what is clear, confusing, missing or uncomfortable - not to compare personal results.</p></div></li>
            <li><span>03</span><div><h3>Reflect together</h3><p>The group tests the questions, explanations and facilitation materials. The conversation is about the product experience and learning setting, not about asking anyone to disclose political beliefs.</p></div></li>
            <li><span>04</span><div><h3>Turn feedback into improvements</h3><p>We document the feedback, identify changes and share back what we revise. Where appropriate, partners can help review the revised material.</p></div></li>
          </ol>
        </div>
      </section>

      <section id="what-we-need" className="pilot-section p-shell" aria-labelledby="pilot-feedback-title">
        <div className="pilot-section-heading pilot-feedback-heading">
          <p className="p-kicker">WHAT WE NEED FROM YOU</p>
          <h2 id="pilot-feedback-title">Practical feedback that improves the questions, the experience and the group model.</h2>
          <p>You do not need to endorse Politangle or arrive with a finished research plan. We need honest observations from people who know their own learners and context.</p>
        </div>
        <div className="pilot-feedback-grid">
          {feedback.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="pilot-section pilot-exchange" aria-labelledby="pilot-exchange-title">
        <div className="p-shell pilot-exchange-grid">
          <div>
            <p className="p-kicker">A CLEAR EXCHANGE</p>
            <h2 id="pilot-exchange-title">What Politangle provides.</h2>
            <ul>
              <li>Free access to the relevant public or preview material.</li>
              <li>A short facilitator guide and a clear feedback structure.</li>
              <li>A named contact for adapting the session to the setting.</li>
              <li>A written summary of what we heard and what we change.</li>
            </ul>
          </div>
          <div>
            <p className="p-kicker">WHAT A PARTNER BRINGS</p>
            <h2>A real-world learning context.</h2>
            <ul>
              <li>An existing group and an adult contact or facilitator.</li>
              <li>Context on the audience, language and local considerations.</li>
              <li>Structured feedback after the test - including criticism.</li>
              <li>For a formal funded collaboration, a separately agreed role and scope.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pilot-section p-shell" aria-labelledby="pilot-schools-title">
        <div className="pilot-schools">
          <p className="p-kicker">FOR SCHOOLS</p>
          <h2 id="pilot-schools-title">The school question is not only “does it work?” It is “is it appropriate, neutral and safe?”</h2>
          <p>We first want educators and relevant specialists to test the classroom model, question wording and facilitation material. Any use with real students remains subject to the legal, safeguarding, accessibility and educational checks described on the school-pilot page, plus a school-specific agreement.</p>
          <Link className="p-text-link" href="/school/pilot">Read the school-pilot safeguards →</Link>
        </div>
      </section>

      <section className="pilot-contact">
        <div className="p-shell pilot-contact-inner">
          <div>
            <p className="p-kicker">INTERESTED?</p>
            <h2>A short message is enough.</h2>
            <p>Tell us your group type, country or city, approximate age range and the one thing you would most like to help test.</p>
          </div>
          <Link className="p-button" href="/contact">Contact Politangle <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}

