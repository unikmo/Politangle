const Triangle = ({small=false}:{small?:boolean}) => <div className={small?'triangle small':'triangle'}><span className="dot"/></div>;

export default function Home(){
 return <main>
  <header className="nav wrap">
   <a className="brand" href="/"><Triangle small/><span><b>Politangle</b><small>Politics from every angle.</small></span></a>
   <nav><a href="/quiz">Take the Quiz</a><a href="#learn">Learn</a><a href="#schools">For Schools</a><a href="#about">About</a></nav>
   <div className="actions"><button className="lang">◎ &nbsp; EN⌄</button><a className="button dark" href="/quiz">Get Started</a></div>
  </header>

  <section className="hero" id="quiz">
   <div className="heroPhoto" aria-hidden="true"/>
   <div className="wrap heroGrid">
    <div className="heroCopy"><p className="eyebrow">PEOPLE. IDEAS. A BRIGHTER TOMORROW.</p><h1>Different<br/>views.<br/>A stronger<br/>tomorrow.</h1><div className="rule"/><p className="lede">Explore your political angle, understand the bigger picture, and be part of a more open conversation.</p><a className="button dark heroButton" href="/quiz">Take the Quiz <span>→</span></a><p className="micro">26 statements · about 3 minutes · free</p></div>
    <div className="heroVisual"><div className="axis top"><span>More collective<br/>solutions</span><span>More market<br/>freedom</span></div><Triangle/><div className="axis side left">More social<br/>progress</div><div className="axis side right">More tradition<br/>and continuity</div><div className="axis bottom">More individual freedom</div><p className="script">Curious minds<br/>build a stronger<br/>tomorrow.</p></div>
   </div>
  </section>

  <section className="section result wrap" id="result"><div><p className="eyebrow">YOUR RESULT</p><h2>A unique perspective.<br/>Clearly visualized.</h2><p className="bodyCopy">See where you stand on four political dimensions without forcing your answers into a party label.</p><a className="textLink" href="/quiz">Take Politangle Quick &nbsp;→</a></div><div className="resultCard" id="sample"><h3>Your political angle <span>↗</span></h3><div className="resultInner"><Triangle small/><div className="meters">{[['Economy','Example dimension','72'],['Society','Example dimension','48'],['Power','Example dimension','86'],['World','Example dimension','55']].map(([n,t,w],i)=><div className="meter" key={n}><div><b>{n}</b><span>{t}</span></div><i className={'m'+i}><em style={{width:w+'%'}}/></i></div>)}</div></div><div className="similar">Sample visualization only. Your real result is calculated from your responses.</div></div></section>

  <section className="deep" id="learn"><div className="deepPhoto"/><div className="deepCopy"><p className="eyebrow">GO FURTHER</p><h2>Understand the why.</h2><p>Politangle Deep is planned to separate what you believe from how well you understand political traditions and common misconceptions.</p><div className="deepAction"><a className="button dark" href="/quiz">Start with Quick</a><span><b>Deep</b><small>Planned after validation</small></span></div></div></section>

  <section className="schools" id="schools"><div className="schoolCopy"><p className="eyebrow">FOR SCHOOLS</p><h2>Better conversations.<br/>Brighter futures.</h2><p>The school model is being designed to measure learning while keeping individual political beliefs private from teachers.</p><a className="textLink" href="#schools">School model in development &nbsp;→</a></div><div className="schoolPhoto"/><p className="schoolScript">Curious minds<br/>build a stronger<br/>tomorrow.</p></section>

  <section className="stats wrap"><div><b>26 statements</b><small>Versioned Quick assessment</small></div><div><b>4 dimensions</b><small>Scored independently</small></div><div><b>Session-local</b><small>Raw answers are not written to Firestore in this build.</small></div><div><b>Versioned engine</b><small>Questionnaire and scoring versions travel with every result.</small></div></section>
  <footer className="wrap" id="about"><a className="brand" href="/"><Triangle small/><span><b>Politangle</b><small>Politics from every angle.</small></span></a><div><a href="#">Imprint</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div><small>Validation build.</small></footer>
 </main>
}
