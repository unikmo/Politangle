import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../SiteChrome';

export const metadata: Metadata = {
  title: 'Help test Politangle',
  description: 'Try Politangle and share honest feedback. Individuals and groups welcome, with no formal commitment.',
  alternates: { canonical: '/pilot' },
  robots: { index: false, follow: true },
};

export default function PilotPage() {
  return <main className="home pilot-page">
    <SiteHeader />
    <section className="pilot-hero">
      <div className="p-shell pilot-hero-grid">
        <div>
          <p className="p-kicker">HELP SHAPE POLITANGLE</p>
          <h1>Try it. Tell us what you think.</h1>
          <p className="pilot-lede">Help us make political learning clearer, fairer and easier to use.</p>
          <div className="pilot-hero-actions">
            <Link className="p-button" href="/quiz">Try Politangle →</Link>
            <Link className="p-text-link" href="/contact">Give feedback →</Link>
          </div>
          <p className="pilot-quiet">Free to try. No formal commitment. Your political answers stay private.</p>
        </div>
      </div>
    </section>

    <section className="pilot-section p-shell">
      <p className="p-kicker">HOW TO TAKE PART</p>
      <h2>Choose what works for you.</h2>
      <div className="pilot-fit-grid">
        <article>
          <span className="pilot-number">01</span>
          <h3>Try it yourself</h3>
          <p>Explore the tool and tell us what feels clear, confusing or worth improving.</p>
          <Link className="p-text-link" href="/quiz">Start a test →</Link>
        </article>
        <article>
          <span className="pilot-number">02</span>
          <h3>Share it with others</h3>
          <p>Student groups, teachers and organisations can simply pass on the invitation. Organising a session is optional.</p>
          <Link className="p-text-link" href="/contact">Contact us →</Link>
        </article>
      </div>
    </section>

    <section className="pilot-section pilot-process">
      <div className="p-shell pilot-feedback-inner">
        <div>
          <p className="p-kicker">YOUR FEEDBACK</p>
          <h2>What could be better?</h2>
        </div>
        <p>Are the questions easy to understand? Does the experience feel fair? Did it help you understand politics? Even a few comments help.</p>
      </div>
    </section>

    <section className="pilot-section p-shell pilot-faq">
      <p className="p-kicker">GOOD TO KNOW</p>
      <h2>Common questions</h2>
      <details><summary>Do I need to commit to a pilot?</summary><p>No. Individuals can test independently and leave optional feedback. There are no required meetings or formal partnership arrangements.</p></details>
      <details><summary>Can my Fachschaft or organisation just share the flyer?</summary><p>Yes. Sharing the invitation is enough. A coordinated group session is entirely optional.</p></details>
      <details><summary>What about personal political results?</summary><p>Do not send us your answers or political profile. We only ask for feedback on the wording, experience and educational usefulness.</p></details>
      <details><summary>Can schools test with children?</summary><p>Educators can review the learning design and materials. Organised testing with real minors needs prior legal, safeguarding, accessibility and educational checks, and an agreed school pilot.</p><Link href="/school/pilot">School pilot safeguards →</Link></details>
      <details><summary>How is the feedback used?</summary><p>We review comments to improve the questions, explanations and accessibility. We do not ask participants to endorse Politangle or agree with a particular political position.</p></details>
    </section>

    <section className="pilot-contact">
      <div className="p-shell pilot-contact-inner">
        <div>
          <p className="p-kicker">INTERESTED?</p>
          <h2>A short message is enough.</h2>
        </div>
        <Link className="p-button" href="/contact">Get in touch →</Link>
      </div>
    </section>
  </main>;
}
