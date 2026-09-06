const Triangle = ({small=false}:{small?:boolean}) => <div className={small?'triangle small':'triangle'}><span className="dot"/></div>;

export default function Home(){
 return <main>
  <header className="nav wrap">
   <a className="brand" href="#"><Triangle small/><span><b>Politangle</b><small>Politics from every angle.</small></span></a>
   <nav><a href="#quiz">Take the Quiz</a><a href="#learn">Learn</a><a href="#schools">For Schools</a><a href="#about">About</a></nav>
   <div className="actions"><button className="lang">◎ &nbsp; EN⌄</button><a className="button dark" href="#quiz">Get Started</a></div>
  </header>

  <section className="hero" id="quiz">
   <div className="heroPhoto" aria-hidden="true"/>
   <div className="wrap heroGrid">
    <div className="heroCopy"><p className="eyebrow">PEOPLE. IDEAS. A BRIGHTER TOMORROW.</p><h1>Different<br/>views.<br/>A stronger<br/>tomorrow.</h1><div className="rule"/><p className="lede">Explore your political angle, understand the bigger picture, and be part of a more open conversation.</p><a className="button dark heroButton" href="#result">Take the Quiz <span>→</span></a><p className="micro">26 statements · 3 minutes · Free</p></div>
    <div className="heroVisual"><div className="axis top"><span>More collective<br/>solutions</span><span>More market<br/>freedom</span></div><Triangle/><div className="axis side left">More social<br/>progress</div><div className="axis side right">More tradition<br/>and continuity</div><div className="axis bottom">More individual freedom</div><p className="script">Curious minds<br/>build a stronger<br/>tomorrow.</p></div>
   </div>
  </section>

  <section className="section result wrap" id="result"><div><p className="eyebrow">YOUR RESULT</p><h2>A unique perspective.<br/>Clearly visualized.</h2><p className="bodyCopy">See where you stand on key political dimensions and how your views compare to others — without labels or judgment.</p><a className="textLink" href="#sample">See a sample result &nbsp;→</a></div><div className="resultCard" id="sample"><h3>Your political angle <span>↗</span></h3><div className="resultInner"><Triangle small/><div className="meters">{[['Economy','Moderately collective','72'],['Society','Moderately progressive','48'],['Authority','Strongly individualist','86'],['World','Moderately internationalist','55']].map(([n,t,w],i)=><div className="meter" key={n}><div><b>{n}</b><span>{t}</span></div><i className={'m'+i}><em style={{width:w+'%'}}/></i></div>)}</div></div><div className="similar">♙ &nbsp; About 18% of Politangle respondents have a similar profile.</div></div></section>

  <section className="deep" id="learn"><div className="deepPhoto"/><div className="deepCopy"><p className="eyebrow">GO FURTHER</p><h2>Understand the why.</h2><p>Explore deeper questions, see how different political traditions approach the same issues, and get your personalized analysis.</p><div className="deepAction"><a className="button dark" href="#">▣ &nbsp; Go deeper</a><span><b>$4.99</b><small>One-time unlock</small></span></div></div></section>

  <section className="schools" id="schools"><div className="schoolCopy"><p className="eyebrow">FOR SCHOOLS</p><h2>Better conversations.<br/>Brighter futures.</h2><p>Help students understand political ideas, recognize misconceptions and build critical thinking skills.</p><a className="textLink" href="#">Learn about our school version &nbsp;→</a></div><div className="schoolPhoto"/><p className="schoolScript">Curious minds<br/>build a stronger<br/>tomorrow.</p></section>

  <section className="stats wrap"><div><b>♙ &nbsp; 18,420+</b><small>People have taken Politangle</small></div><div><b>◎ &nbsp; 30+</b><small>Countries</small></div><div><b>◇ &nbsp; Your privacy</b><small>Your answers are private and never shared.</small></div><div><b>⌂ &nbsp; For a more open society</b><small>Different views. A shared future.</small></div></section>
  <footer className="wrap" id="about"><a className="brand" href="#"><Triangle small/><span><b>Politangle</b><small>Politics from every angle.</small></span></a><div><a href="#">Imprint</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Contact</a></div><small>Different views. A shared future.</small></footer>
 </main>
}
