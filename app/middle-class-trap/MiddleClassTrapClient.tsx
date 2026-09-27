'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  MIDDLE_CLASS_TRAP_ANGLES,
  MIDDLE_CLASS_TRAP_ANGLE_LABELS,
  MIDDLE_CLASS_TRAP_SIZE,
  selectMiddleClassTrapQuiz,
  type MiddleClassTrapQuestion,
} from '../../lib/middle-class-trap-quiz';

type Run = {
  seed: number;
  index: number;
  answers: Readonly<Record<string, string>>;
  revealed: readonly string[];
  hintShown: readonly string[];
  finished: boolean;
};

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
  const selectedId = run && current ? run.answers[current.id] : undefined;
  const selectedOption = current?.options.find((option) => option.id === selectedId);
  const checked = Boolean(run && current && run.revealed.includes(current.id));
  const answered = run ? run.revealed.map((id) => questions.find((question) => question.id === id)).filter((question): question is MiddleClassTrapQuestion => Boolean(question)) : [];
  const correct = run ? answered.filter((question) => run.answers[question.id] === question.answerId).length : 0;

  function start() {
    setRun({ seed:newSeed(), index:0, answers:{}, revealed:[], hintShown:[], finished:false });
  }
  function choose(optionId:string) {
    if (!run || !current || checked) return;
    setRun({ ...run, answers:{ ...run.answers, [current.id]:optionId } });
  }
  function check() {
    if (!run || !current || !selectedId || checked) return;
    setRun({ ...run, revealed:[...run.revealed,current.id] });
  }
  function next() {
    if (!run || !checked) return;
    if (run.index === questions.length - 1) setRun({ ...run, finished:true });
    else setRun({ ...run, index:run.index + 1 });
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
      <div className="populism-angle-list" aria-label="Quiz coverage">
        {MIDDLE_CLASS_TRAP_ANGLES.map((angle) => <span key={angle}>{MIDDLE_CLASS_TRAP_ANGLE_LABELS[angle]}</span>)}
      </div>
      <button className="engine-primary-link populism-start-button" type="button" onClick={start}>Start the quiz →</button>
      <p className="populism-candidate-note">English candidate for founder review. Free, private on this device and outside certification.</p>
    </section>
  </main>;

  if (run.finished) {
    const angleScores = MIDDLE_CLASS_TRAP_ANGLES.map((angle) => ({
      angle,
      score: answered.filter((question) => question.angle === angle && run.answers[question.id] === question.answerId).length,
    }));
    const resultTitle = correct >= 17 ? 'Strong policy reading' : correct >= 13 ? 'Developing policy reading' : 'Build the foundations';
    return <main className="engine-page practice-page populism-page middle-class-trap-page middle-class-result-state">
      <header className="engine-header"><Link href="/en" className="engine-brand">Politangle</Link><span>MIDDLE CLASS TRAP · RESULT</span><div className="engine-header-actions"><Link href="/en/quizzes">All quizzes</Link></div></header>
      <section className="engine-shell literacy-shell"><article className="engine-card literacy-result-card populism-result-card">
        <p className="engine-kicker">{resultTitle.toUpperCase()}</p><h1>{correct} / {MIDDLE_CLASS_TRAP_SIZE}</h1>
        <p className="result-lede">This measures policy literacy, not your income, class identity or political worth.</p>
        <div className="populism-score-grid">{angleScores.map(({angle,score}) => <div key={angle}><span>{MIDDLE_CLASS_TRAP_ANGLE_LABELS[angle]}</span><strong>{score}/4</strong></div>)}</div>
        <div className="engine-result-actions"><button className="engine-primary-link" type="button" onClick={start}>Try again</button><Link className="engine-primary-link secondary" href="/en/quizzes">Choose another quiz</Link></div>
      </article></section>
    </main>;
  }

  if (!current) return null;
  const hintShown = run.hintShown.includes(current.id);
  const correctLabel = current.options.find((option) => option.id === current.answerId)?.label;
  return <main className="engine-page practice-page populism-page middle-class-trap-page middle-class-play-state">
    <header className="engine-header"><Link href="/en" className="engine-brand">Politangle</Link><span>MIDDLE CLASS TRAP · ENGLISH</span><div className="engine-header-actions"><Link href="/en/quizzes">Exit quiz</Link></div></header>
    <section className="engine-shell literacy-shell">
      <div className="engine-progress-row"><span>{correct} correct so far</span><div className="engine-progress" aria-label={`${run.index + 1} of ${questions.length}`}><span style={{width:`${((run.index + 1) / questions.length) * 100}%`}}/></div><button type="button" className="engine-link-button" onClick={() => setRun(null)}>Start over</button></div>
      <article className="engine-card literacy-card">
        <div className="populism-question-meta"><p className="engine-kicker">QUESTION {run.index + 1} OF {questions.length}</p><span>{MIDDLE_CLASS_TRAP_ANGLE_LABELS[current.angle]}</span></div>
        <h1 className="literacy-prompt">{current.prompt}</h1>
        {!checked && <div className="populism-hint"><button type="button" onClick={showHint} aria-expanded={hintShown}>{hintShown ? 'Hint' : 'Need a clue?'}</button>{hintShown && <p>{current.hint}</p>}</div>}
        <div className="deep-options literacy-options">{orderedOptions(current,run.seed).map((option) => <button type="button" disabled={checked} className={selectedId === option.id ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{option.label}</button>)}</div>
        {checked && selectedOption && <div className="literacy-feedback" aria-live="polite"><p className="engine-kicker">{selectedId === current.answerId ? 'CORRECT' : 'NOT QUITE'}</p><p>{selectedOption.feedback}</p>{selectedId !== current.answerId && <p><strong>Best answer:</strong> {correctLabel}</p>}<p>{current.explanation}</p></div>}
      </article>
      <div className="engine-nav literacy-nav"><span>{run.index + 1} / {questions.length}</span>{checked ? <button type="button" onClick={next}>{run.index === questions.length - 1 ? 'See result' : 'Next question'}</button> : <button type="button" onClick={check} disabled={!selectedId}>Check answer</button>}</div>
    </section>
  </main>;
}
