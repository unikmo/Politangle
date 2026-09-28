'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  MIDDLE_CLASS_TRAP_ANGLES,
  MIDDLE_CLASS_TRAP_ANGLE_LABELS,
  MIDDLE_CLASS_TRAP_ANGLE_MEANINGS,
  MIDDLE_CLASS_TRAP_BLOCK_SIZE,
  MIDDLE_CLASS_TRAP_SIZE,
  selectMiddleClassTrapQuiz,
  type MiddleClassTrapQuestion,
} from '../../lib/middle-class-trap-quiz';
import { MIDDLE_CLASS_TRAP_READING } from '../../lib/middle-class-trap-reading';

type Run = {
  seed: number;
  index: number;
  answers: Readonly<Record<string, string>>;
  hintShown: readonly string[];
  finished: boolean;
};

const THEORY_MECHANISMS = [
  {
    title: 'Income is not the same as wealth',
    text: 'A good salary can support a comfortable life, but inherited assets, low debt and investment income usually provide much stronger long-term security.',
  },
  {
    title: 'A middle-class label can hide who gains most',
    text: 'A policy may mention homes, families or small businesses while its largest financial gains flow to households with very large estates, companies or investments.',
  },
  {
    title: 'Attention can be directed downward',
    text: 'Visible misuse by poorer households may receive more anger than larger, less visible advantages created through tax rules, ownership or privileged access.',
  },
  {
    title: 'The household balance is bigger than the tax bill',
    text: 'Schools, healthcare, transport, insurance and legal protections have value. Cutting them can leave a household paying more privately than it saves in tax.',
  },
] as const;

const EVIDENCE_POINTS = [
  {
    title: 'Middle-income security is under pressure',
    text: 'Across OECD countries, middle incomes have often grown more slowly than high incomes while housing and other essential costs have put increasing pressure on household budgets.',
    note: 'OECD, 2019 · comparative institutional evidence',
    href: 'https://www.oecd.org/en/publications/under-pressure-the-squeezed-middle-class_689afed1-en.html',
  },
  {
    title: 'People can misread the distribution of wealth',
    text: 'A US survey study found that respondents greatly underestimated wealth concentration and preferred a substantially more equal distribution than the one they believed existed.',
    note: 'Norton & Ariely, 2011 · US survey study',
    href: 'https://journals.sagepub.com/doi/10.1177/1745691610393524',
  },
  {
    title: 'Government support is not always visible to its users',
    text: 'Research on the “submerged state” shows how benefits delivered through tax breaks and private systems can be difficult for citizens to recognise as public policy.',
    note: 'Suzanne Mettler, 2011 · US political science',
    href: 'https://press.uchicago.edu/ucp/books/book/chicago/S/bo12244559.html',
  },
  {
    title: 'Political influence is unequally distributed',
    text: 'A major study of US policy decisions from 1981–2002 found that economic elites and organised business interests had substantial independent associations with policy outcomes. This finding is specific to its country, period and method; it does not make every lobby or policy corrupt.',
    note: 'Gilens & Page, 2014 · US policy-outcome study',
    href: 'https://www.cambridge.org/core/journals/perspectives-on-politics/article/testing-theories-of-american-politics-elites-interest-groups-and-average-citizens/62327F513959D0A304D4893B382B992B',
  },
] as const;

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

function orderedOptions(question: MiddleClassTrapQuestion, seed: number) {
  return [...question.options].sort((left, right) => hash(`${seed}:${question.id}:${left.id}`) - hash(`${seed}:${question.id}:${right.id}`));
}

export default function MiddleClassTrapClient() {
  const questions = useMemo(() => selectMiddleClassTrapQuiz(), []);
  const [run, setRun] = useState<Run | null>(null);
  const current = run ? questions[run.index] ?? null : null;
  const answered = run ? questions.filter((question) => Boolean(run.answers[question.id])) : [];
  const understandingAnswered = answered.filter((question) => question.kind === 'understanding');
  const correct = run ? understandingAnswered.filter((question) => run.answers[question.id] === question.answerId).length : 0;
  const solidarityAnswered = answered.filter((question) => question.kind === 'solidarity');
  const priorityScore = run ? solidarityAnswered.reduce((sum,question) => {
    const option = question.options.find((candidate) => candidate.id === run.answers[question.id]);
    return sum + (option?.solidarity ?? 0);
  },0) : 0;

  function start() {
    setRun({ seed:newSeed(), index:0, answers:{}, hintShown:[], finished:false });
  }
  function choose(optionId:string) {
    if (!run || !current || run.answers[current.id]) return;
    const answers = { ...run.answers, [current.id]:optionId };
    if (run.index === questions.length - 1) setRun({ ...run, answers, finished:true });
    else setRun({ ...run, answers, index:run.index + 1 });
  }
  function showHint() {
    if (!run || !current || run.hintShown.includes(current.id)) return;
    setRun({ ...run, hintShown:[...run.hintShown,current.id] });
  }

  if (!run) return <main className="engine-page practice-page populism-page middle-class-trap-page middle-class-start-state">
    <header className="engine-header"><Link href="/en" className="engine-brand">Politangle</Link><span>MIDDLE CLASS TRAP · ENGLISH</span><div className="engine-header-actions"><Link href="/en/quizzes">All quizzes</Link></div></header>
    <section className="engine-shell populism-start middle-class-start">
      <p className="engine-kicker">FREE · 20 QUESTIONS · ABOUT 8 MINUTES</p>
      <h1>The Middle Class Trap</h1>
      <p className="practice-lede">See how taxes, public services, wealth and political stories interact—without assuming that every wealthy person is corrupt or every public benefit is waste.</p>
      <div className="populism-principle"><strong>This quiz does not tell you how to vote.</strong><p>It helps you test who really bears a cost, what a household gains or loses overall, and when blame is being redirected instead of power being examined.</p></div>
      <div className="mct-block-overview" aria-label="Quiz structure">
        <article><span>01 · 10 QUESTIONS</span><strong>Understanding the trap</strong><p>Can you identify who gains, who pays and which costs or protections a political story leaves out?</p></article>
        <article><span>02 · 10 CHOICES</span><strong>Your policy priorities</strong><p>When interests conflict, which concerns receive more weight in your choices?</p></article>
      </div>
      <button className="engine-primary-link populism-start-button" type="button" onClick={start}>Start the quiz →</button>
      <p className="populism-candidate-note">English candidate for founder review. Free, private on this device and outside certification.</p>
    </section>
  </main>;

  if (run.finished) {
    const angleScores = MIDDLE_CLASS_TRAP_ANGLES.map((angle) => ({
      angle,
      score: understandingAnswered.filter((question) => question.angle === angle && run.answers[question.id] === question.answerId).length,
    }));
    const resultTitle = correct >= 9 ? 'Clear understanding' : correct >= 7 ? 'Good understanding' : 'Developing understanding';
    const resultSummary = correct >= 9
      ? `You correctly identified ${correct} of ${MIDDLE_CLASS_TRAP_BLOCK_SIZE} mechanisms behind the middle-class trap.`
      : correct >= 7
        ? `You correctly answered ${correct} of ${MIDDLE_CLASS_TRAP_BLOCK_SIZE}. The missed examples show where a friendly policy name can hide who receives most of the money.`
        : `You correctly identified ${correct} of ${MIDDLE_CLASS_TRAP_BLOCK_SIZE} mechanisms. Review the missed scenarios before interpreting the priorities result.`;
    const priorityLabel = priorityScore >= 8
      ? 'You usually protect less-secure households first'
      : priorityScore <= -8
        ? 'You usually protect ownership first'
        : 'Your priority depends on the issue';
    const priorityText = priorityScore >= 8
      ? 'When interests conflicted, you usually chose workers, tenants or households with less money and fewer alternatives.'
      : priorityScore <= -8
        ? 'When interests conflicted, you usually chose property rights, investment returns or lower charges on owners first.'
        : 'Your choices changed with the situation. You did not consistently put either ownership or less-secure households first.';
    const combinedReading = correct >= 7
      ? priorityScore >= 8
        ? 'You usually spotted who really gains and pays. When forced to choose, you also tended to protect people with less financial security first.'
        : priorityScore <= -8
          ? 'You usually spotted who really gains and pays, but still preferred stronger protection of ownership. That is a value choice, not a wrong answer.'
          : 'You usually spotted who really gains and pays. Who you protect first changes with the situation.'
      : priorityScore >= 8
        ? 'You tend to give more weight to households facing greater vulnerability, but some policy mechanisms remain unclear. Policy priorities and policy understanding are not the same thing.'
        : priorityScore <= -8
          ? 'You tend to protect ownership first, while some of the money flows remain unclear. The quiz cannot tell whether more information would change those choices.'
          : 'Your policy understanding is still developing and your priorities vary by issue. Review the missed mechanisms before interpreting this as a stable political position.';
    return <main className="engine-page practice-page populism-page middle-class-trap-page middle-class-result-state">
      <header className="engine-header"><Link href="/en" className="engine-brand">Politangle</Link><span>MIDDLE CLASS TRAP · RESULT</span><div className="engine-header-actions"><Link href="/en/quizzes">All quizzes</Link></div></header>
      <section className="engine-shell literacy-shell"><article className="engine-card literacy-result-card populism-result-card">
        <p className="engine-kicker">YOUR TWO-PART RESULT</p><h1>{resultTitle}</h1>
        <div className="mct-two-results">
          <article><span>01 · UNDERSTANDING</span><strong>{correct} / {MIDDLE_CLASS_TRAP_BLOCK_SIZE}</strong><h2>{resultTitle}</h2><p>{resultSummary}</p></article>
          <article><span>02 · POLICY PRIORITIES</span><strong>{priorityScore > 0 ? '+' : ''}{priorityScore}</strong><h2>{priorityLabel}</h2><p>{priorityText}</p><div className="mct-solidarity-scale"><span>Ownership and contribution</span><i><b style={{left:`${((priorityScore + 20) / 40) * 100}%`}}/></i><span>Need and fewer alternatives</span></div></article>
        </div>
        <div className="mct-result-intro"><strong>How the two results fit together</strong><p>{combinedReading}</p><p>This describes your answers to these scenarios. It does not determine your class, morality, ideology or how you should vote.</p></div>
        <div className="populism-score-grid">{angleScores.map(({angle,score}) => <div key={angle}><span><b>{MIDDLE_CLASS_TRAP_ANGLE_LABELS[angle]}</b><small>{MIDDLE_CLASS_TRAP_ANGLE_MEANINGS[angle]}</small></span><strong>{score}/2</strong></div>)}</div>
        <section className="mct-answer-review" aria-labelledby="mct-answer-review-title">
          <p className="engine-kicker">COMPLETE ANSWER REVIEW</p>
          <h2 id="mct-answer-review-title">Your answers</h2>
          <p className="mct-review-intro">Answers and explanations appear here only after all 20 questions are complete.</p>
          <div className="mct-review-list">{understandingAnswered.map((question,index) => {
            const chosen = question.options.find((option) => option.id === run.answers[question.id]);
            const best = question.options.find((option) => option.id === question.answerId);
            const isCorrect = chosen?.id === question.answerId;
            return <article key={question.id} className={isCorrect ? 'correct' : 'incorrect'}>
              <span>{String(index + 1).padStart(2,'0')} · {isCorrect ? 'Correct' : 'Review this'}</span>
              <h3>{question.prompt}</h3>
              <p><strong>Your answer:</strong> {chosen?.label}</p>
              {!isCorrect && <p><strong>Best answer:</strong> {best?.label}</p>}
              <p>{chosen?.feedback}</p><p>{question.explanation}</p>
            </article>;
          })}</div>
          <h3 className="mct-priority-review-title">Your policy-priority choices</h3>
          <p className="mct-review-intro">These choices have no correct answer. They show which concern you gave more weight in each scenario.</p>
          <div className="mct-review-list priority">{solidarityAnswered.map((question,index) => {
            const chosen = question.options.find((option) => option.id === run.answers[question.id]);
            return <article key={question.id}><span>{String(index + 1).padStart(2,'0')} · Choice</span><h3>{question.prompt}</h3><p><strong>Your choice:</strong> {chosen?.label}</p><p>{chosen?.feedback}</p></article>;
          })}</div>
        </section>
        <section className="mct-theory" aria-labelledby="mct-theory-title">
          <p className="engine-kicker">THE IDEA BEHIND THE QUIZ</p>
          <h2 id="mct-theory-title">The “middle-class trap” in plain English</h2>
          <p className="mct-theory-lede">The theory is not that middle-income people are foolish, or that wealthy people are automatically dishonest. It is that people who depend mainly on work may sometimes judge policy from the imagined position of the very wealthy, while overlooking the public systems and protections on which their own security depends.</p>
          <p className="mct-theory-lede">That can produce a political mismatch: a household supports a policy because of its label or aspiration, even though the largest material gains go much further up the wealth distribution—or it directs anger toward people below while larger advantages elsewhere remain less visible.</p>
          <div className="mct-mechanism-grid">{THEORY_MECHANISMS.map((mechanism,index) => <article key={mechanism.title}><span>{String(index + 1).padStart(2,'0')}</span><div><h3>{mechanism.title}</h3><p>{mechanism.text}</p></div></article>)}</div>
        </section>
        <section className="mct-evidence" aria-labelledby="mct-evidence-title">
          <p className="engine-kicker">WHAT RESEARCH SUPPORTS</p>
          <h2 id="mct-evidence-title">Evidence for the building blocks</h2>
          <p className="mct-evidence-boundary"><strong>The honest scientific claim:</strong> no single study proves the entire theory as a universal law. Research supports several of its mechanisms, but results vary by country, policy area and period.</p>
          <div className="mct-evidence-list">{EVIDENCE_POINTS.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p><a href={item.href} target="_blank" rel="noreferrer">{item.note} ↗</a></article>)}</div>
        </section>
        <section className="mct-reading" aria-labelledby="mct-reading-title">
          <p className="engine-kicker">GO FURTHER</p>
          <h2 id="mct-reading-title">Further reading</h2>
          <div className="mct-reading-list">{MIDDLE_CLASS_TRAP_READING.map((book) => <article key={book.title}><h3>{book.title}</h3><small>{book.author}</small><div>{book.introduction.map((sentence) => <p key={sentence}>{sentence}</p>)}</div><a href={book.href} target="_blank" rel="noreferrer">{book.linkLabel} ↗</a></article>)}</div>
        </section>
        <div className="engine-result-actions"><button className="engine-primary-link" type="button" onClick={start}>Try again</button><Link className="engine-primary-link secondary" href="/en/quizzes">Choose another quiz</Link></div>
      </article></section>
    </main>;
  }

  if (!current) return null;
  const hintShown = run.hintShown.includes(current.id);
  return <main className="engine-page practice-page populism-page middle-class-trap-page middle-class-play-state">
    <header className="engine-header"><Link href="/en" className="engine-brand">Politangle</Link><span>MIDDLE CLASS TRAP · ENGLISH</span><div className="engine-header-actions"><Link href="/en/quizzes">Exit quiz</Link></div></header>
    <section className="engine-shell literacy-shell">
      <div className="engine-progress-row"><span>Question {run.index + 1} of {questions.length}</span><div className="engine-progress" aria-label={`${run.index + 1} of ${questions.length}`}><span style={{width:`${((run.index + 1) / questions.length) * 100}%`}}/></div><button type="button" className="engine-link-button" onClick={() => setRun(null)}>Start over</button></div>
      <article className="engine-card literacy-card">
        <div className="populism-question-meta"><p className="engine-kicker">{current.kind === 'understanding' ? `UNDERSTANDING ${run.index + 1} OF ${MIDDLE_CLASS_TRAP_BLOCK_SIZE}` : `POLICY PRIORITY ${run.index + 1 - MIDDLE_CLASS_TRAP_BLOCK_SIZE} OF ${MIDDLE_CLASS_TRAP_BLOCK_SIZE}`}</p><span>{current.kind === 'understanding' ? MIDDLE_CLASS_TRAP_ANGLE_LABELS[current.angle] : 'No correct answer'}</span></div>
        <h1 className="literacy-prompt">{current.prompt}</h1>
        <div className="populism-hint"><button type="button" onClick={showHint} aria-expanded={hintShown}>{hintShown ? 'Hint' : 'Need a clue?'}</button>{hintShown && <p>{current.hint}</p>}</div>
        <div className="deep-options literacy-options">{orderedOptions(current,run.seed).map((option) => <button type="button" className="deep-option" key={option.id} onClick={() => choose(option.id)}>{option.label}</button>)}</div>
      </article>
      <p className="mct-auto-advance-note">Choose one answer to continue.</p>
    </section>
  </main>;
}
