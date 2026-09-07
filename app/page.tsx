import Link from 'next/link';
import PrismaticTriangle from '../components/PrismaticTriangle';
import SiteHeader from '../components/SiteHeader';

const sampleMeters = [
  { name: 'Economy', label: 'Moderately collective', value: 36, className: 'economy' },
  { name: 'Society', label: 'Moderately progressive', value: 42, className: 'society' },
  { name: 'Power', label: 'Strongly individualist', value: 22, className: 'power' },
  { name: 'World', label: 'Moderately internationalist', value: 38, className: 'world' },
];

export default function Home() {
  return (
    <main className="site-frame">
      <SiteHeader />

      <section className="home-hero" id="top">
        <div className="home-hero-photo" aria-hidden="true" />
        <div className="home-hero-wash" aria-hidden="true" />
        <div className="shell home-hero-grid">
          <div className="home-hero-copy">
            <h1>Different<br />views.<br />A stronger<br />tomorrow.</h1>
            <div className="short-rule" />
            <p>Explore your political angle, understand the bigger picture, and be part of a more open conversation.</p>
            <Link className="button button-dark hero-cta" href="/quiz">Take the Quiz <span aria-hidden="true">→</span></Link>
            <small>26 statements · about 3 minutes · free</small>
          </div>

          <div className="home-hero-prism">
            <PrismaticTriangle labelled />
          </div>
        </div>
      </section>

      <section className="home-result shell" id="result">
        <div className="section-copy">
          <p className="eyebrow">YOUR RESULT</p>
          <h2>A unique perspective.<br />Clearly visualized.</h2>
          <p>See where you stand across four political dimensions — without forcing your answers into a single party or ideology label.</p>
          <Link className="text-link" href="/quiz">Take Politangle Quick <span>→</span></Link>
        </div>

        <div className="sample-result-card" aria-label="Sample Politangle result">
          <div className="sample-card-head">
            <h3>Your political angle</h3>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="sample-card-body">
            <PrismaticTriangle className="sample-prism" point={{ x: 49, y: 47 }} />
            <div className="sample-meters">
              {sampleMeters.map((meter) => (
                <div className="sample-meter" key={meter.name}>
                  <div className="sample-meter-copy">
                    <strong>{meter.name}</strong>
                    <span>{meter.label}</span>
                  </div>
                  <div className={`sample-track ${meter.className}`}>
                    <span style={{ width: `${meter.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sample-card-note">Four dimensions. One profile. Your answers stay private by default in the validation demo.</div>
        </div>
      </section>

      <section className="home-deep" id="learn">
        <div className="deep-photo" aria-hidden="true" />
        <div className="deep-panel">
          <p className="eyebrow">GO FURTHER</p>
          <h2>Understand the why.</h2>
          <p>Explore deeper questions, see where political traditions overlap and diverge, and separate what you believe from what you understand about political ideas.</p>
          <div className="deep-action-row">
            <Link className="button button-dark" href="/deep">Go deeper</Link>
            <span className="deep-price"><strong>$4.99</strong><small>planned one-time unlock</small></span>
          </div>
        </div>
      </section>

      <section className="home-schools" id="schools">
        <div className="school-panel">
          <p className="eyebrow">FOR SCHOOLS</p>
          <h2>Better conversations.<br />Brighter futures.</h2>
          <p>Help students understand political ideas, recognize misconceptions and build critical thinking skills — while keeping individual political beliefs private from teachers.</p>
          <Link className="text-link" href="/deep#schools">Explore the school model <span>→</span></Link>
        </div>
        <div className="school-photo" aria-hidden="true" />
        <p className="school-script">Curious minds<br />build a stronger<br />tomorrow.</p>
      </section>

      <section className="trust-strip shell" aria-label="Politangle essentials">
        <div><strong>26 statements</strong><small>Quick political profile</small></div>
        <div><strong>4 dimensions</strong><small>Not a single left–right line</small></div>
        <div><strong>Private by default</strong><small>Quick scoring stays in your browser</small></div>
        <div><strong>Built for dialogue</strong><small>School model separates learning from beliefs</small></div>
      </section>

      <footer className="site-footer shell" id="about">
        <div className="footer-brand">
          <PrismaticTriangle compact />
          <span><strong>Politangle</strong><small>Politics from every angle.</small></span>
        </div>
        <p>Beliefs first. Labels later.</p>
        <small>Validation build · not a psychometrically validated diagnostic.</small>
      </footer>
    </main>
  );
}
