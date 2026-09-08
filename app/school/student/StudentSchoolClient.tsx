'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { scoreLiteracyItem, type LiteracyQuestion } from '../../../lib/deep-engine';
import { schoolLearningCards } from '../../../lib/school-literacy';
import {
  answerSchoolQuestion,
  createSchoolSession,
  markSchoolSubmitted,
  parseSchoolSession,
  revealSchoolPractice,
  schoolAggregatePayload,
  schoolOrder,
  schoolPhaseProgress,
  schoolQuestion,
  schoolResult,
  setSchoolPhase,
  type SchoolPhase,
  type SchoolSession,
} from '../../../lib/school-session';

const STORAGE_KEY = 'politangle.school.student.v1';

type JoinState = 'idle' | 'checking' | 'ready' | 'error';

function firstOpenIndex(session: SchoolSession, phase: 'baseline' | 'practice' | 'post') {
  const order = schoolOrder(session, phase);
  if (phase === 'practice') {
    const found = order.findIndex((id) => !session.practiceRevealed.includes(id));
    return found === -1 ? Math.max(0, order.length - 1) : found;
  }
  const answers = phase === 'baseline' ? session.baselineAnswers : session.postAnswers;
  const found = order.findIndex((id) => (answers[id]?.length ?? 0) === 0);
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

function phaseNumber(phase: SchoolPhase) {
  return ['baseline', 'learn', 'practice', 'post', 'result'].indexOf(phase) + 1;
}

export default function StudentSchoolClient({ initialCode }: { initialCode: string }) {
  const [session, setSession] = useState<SchoolSession | null | undefined>(undefined);
  const [entryCode, setEntryCode] = useState(initialCode.toUpperCase());
  const [joinState, setJoinState] = useState<JoinState>('idle');
  const [joinMessage, setJoinMessage] = useState('');
  const [index, setIndex] = useState(0);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const restored = parseSchoolSession(sessionStorage.getItem(STORAGE_KEY));
    if (!restored) {
      setSession(null);
      return;
    }
    setSession(restored);
    if (restored.phase === 'baseline' || restored.phase === 'practice' || restored.phase === 'post') setIndex(firstOpenIndex(restored, restored.phase));
  }, []);

  function save(next: SchoolSession) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
  }

  async function start(codeValue: string) {
    const code = codeValue.trim().toUpperCase();
    setJoinMessage('');
    if (code) {
      setJoinState('checking');
      const response = await fetch(`/api/school/classes/${encodeURIComponent(code)}`).catch(() => null);
      if (!response?.ok) {
        setJoinState('error');
        setJoinMessage('Class code not found or unavailable.');
        return;
      }
      const data = await response.json() as { active?: boolean };
      if (!data.active) {
        setJoinState('error');
        setJoinMessage('This class is closed.');
        return;
      }
    }
    const next = createSchoolSession(Date.now(), crypto.randomUUID(), code || undefined);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    setIndex(0);
    setJoinState('ready');
  }

  function restart() {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
    setIndex(0);
    setSubmitMessage('');
  }

  async function submit(next: SchoolSession, phase: 'baseline' | 'practice' | 'post') {
    if (!next.classCode) return markSchoolSubmitted(next, phase);
    setSubmitMessage('Submitting anonymous class aggregate…');
    const response = await fetch(`/api/school/classes/${encodeURIComponent(next.classCode)}/submit`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(schoolAggregatePayload(next, phase)),
    }).catch(() => null);
    if (!response?.ok) {
      setSubmitMessage('Class aggregate could not be submitted. Try again before continuing.');
      return null;
    }
    setSubmitMessage('Anonymous class aggregate submitted.');
    return markSchoolSubmitted(next, phase);
  }

  const activeQuestion = useMemo(() => {
    if (!session || !['baseline', 'practice', 'post'].includes(session.phase)) return null;
    return schoolQuestion(session, session.phase as 'baseline' | 'practice' | 'post', index);
  }, [session, index]);

  if (session === undefined) return <section className="engine-shell"><article className="engine-card"><p>Loading School mode…</p></article></section>;

  if (!session) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Start student mode</p>
          <h1>Learn the political landscape without giving your teacher your politics.</h1>
          <p className="engine-help">Enter a class code if your teacher gave you one. You can also continue independently. No name or email is requested.</p>
          <label style={{ display: 'block', marginTop: 18 }}>
            <span>Class code (optional)</span>
            <input value={entryCode} onChange={(event) => setEntryCode(event.target.value.toUpperCase())} maxLength={6} placeholder="ABC234" style={{ display: 'block', marginTop: 8, padding: 12, width: '100%', maxWidth: 280 }} />
          </label>
          {joinMessage && <p className="engine-help">{joinMessage}</p>}
          <div className="engine-result-actions">
            <button className="engine-primary-link" type="button" disabled={joinState === 'checking'} onClick={() => start(entryCode)}>{joinState === 'checking' ? 'Checking…' : entryCode.trim() ? 'Join class' : 'Continue independently'}</button>
          </div>
          <p className="engine-disclaimer">School BELIEVE/political-opinion answers are not sent to the class aggregation service. Classroom deployment with minors still REQUIRES QUALIFIED LEGAL REVIEW.</p>
        </article>
      </section>
    );
  }

  const progress = session.phase === 'baseline' || session.phase === 'practice' || session.phase === 'post' ? schoolPhaseProgress(session, session.phase) : null;
  const answers = session.phase === 'baseline' ? session.baselineAnswers : session.phase === 'practice' ? session.practiceAnswers : session.postAnswers;
  const selected = activeQuestion ? answers[activeQuestion.id] ?? [] : [];
  const practiceChecked = Boolean(activeQuestion && session.phase === 'practice' && session.practiceRevealed.includes(activeQuestion.id));
  const practiceResult = activeQuestion && practiceChecked ? scoreLiteracyItem(activeQuestion, selected) : null;

  function choose(question: LiteracyQuestion, optionId: string) {
    if (!session || !['baseline', 'practice', 'post'].includes(session.phase)) return;
    if (session.phase === 'practice' && session.practiceRevealed.includes(question.id)) return;
    const currentAnswers = session.phase === 'baseline' ? session.baselineAnswers : session.phase === 'practice' ? session.practiceAnswers : session.postAnswers;
    const existing = currentAnswers[question.id] ?? [];
    const nextSelection = question.multiSelect
      ? existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId]
      : [optionId];
    if (nextSelection.length === 0) return;
    save(answerSchoolQuestion(session, session.phase as 'baseline' | 'practice' | 'post', question.id, nextSelection));
  }

  async function finishBaseline() {
    if (!schoolPhaseProgress(session, 'baseline').complete) return;
    const submitted = await submit(session, 'baseline');
    if (!submitted) return;
    save(setSchoolPhase(submitted, 'learn'));
    setIndex(0);
  }

  async function finishPractice() {
    if (!schoolPhaseProgress(session, 'practice').complete) return;
    const submitted = await submit(session, 'practice');
    if (!submitted) return;
    save(setSchoolPhase(submitted, 'post'));
    setIndex(0);
  }

  async function finishPost() {
    if (!schoolPhaseProgress(session, 'post').complete) return;
    const submitted = await submit(session, 'post');
    if (!submitted) return;
    save(setSchoolPhase(submitted, 'result'));
    setIndex(0);
  }

  function nextQuestion() {
    if (!activeQuestion || selected.length === 0 || !progress) return;
    const order = schoolOrder(session, session.phase as 'baseline' | 'practice' | 'post');
    if (index < order.length - 1) setIndex((value) => value + 1);
  }

  function checkPractice() {
    if (!activeQuestion || selected.length === 0) return;
    save(revealSchoolPractice(session, activeQuestion.id));
  }

  const phaseLabels: SchoolPhase[] = ['baseline', 'learn', 'practice', 'post', 'result'];

  return (
    <section className="engine-shell">
      <div className="deep-phase-tabs">
        {phaseLabels.map((item) => <span className={item === session.phase ? 'active' : ''} key={item}>{item.toUpperCase()}</span>)}
      </div>
      <div className="engine-progress-row">
        <span>Step {phaseNumber(session.phase)} of 5 {session.classCode ? `· Class ${session.classCode}` : '· Independent'}</span>
        <button type="button" className="engine-link-button" onClick={restart}>Restart</button>
      </div>

      {(session.phase === 'baseline' || session.phase === 'post') && activeQuestion && progress && (
        <article className="engine-card">
          <p className="engine-kicker">{session.phase === 'baseline' ? 'Baseline' : 'Post-test'} · {index + 1} of {progress.total}</p>
          <h1>{activeQuestion.prompt}</h1>
          <p className="engine-help">Choose the best answer. Feedback is withheld during the test so the score reflects what you know before seeing the explanation.</p>
          <div className="deep-options">
            {activeQuestion.options.map((option) => <button type="button" className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(activeQuestion, option.id)}>{option.label}</button>)}
          </div>
          <div className="engine-nav">
            <button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>Previous</button>
            <span>{progress.answered}/{progress.total} answered</span>
            {index === progress.total - 1
              ? <button type="button" disabled={!progress.complete} onClick={session.phase === 'baseline' ? finishBaseline : finishPost}>{session.phase === 'baseline' ? 'Finish baseline' : 'Finish post-test'}</button>
              : <button type="button" disabled={selected.length === 0} onClick={nextQuestion}>Next</button>}
          </div>
          {submitMessage && <p className="engine-help">{submitMessage}</p>}
        </article>
      )}

      {session.phase === 'learn' && (
        <article className="engine-card">
          <p className="engine-kicker">Learn · card {session.learnIndex + 1} of {schoolLearningCards.length}</p>
          <h1>{schoolLearningCards[session.learnIndex].title}</h1>
          <p>{schoolLearningCards[session.learnIndex].summary}</p>
          <p className="engine-help"><strong>Common misconception:</strong> {schoolLearningCards[session.learnIndex].misconception}</p>
          <div className="engine-nav">
            <button type="button" disabled={session.learnIndex === 0} onClick={() => save({ ...session, learnIndex: Math.max(0, session.learnIndex - 1) })}>Previous</button>
            <span>{session.learnIndex + 1}/{schoolLearningCards.length}</span>
            {session.learnIndex === schoolLearningCards.length - 1
              ? <button type="button" onClick={() => { save(setSchoolPhase({ ...session, learnIndex: 0 }, 'practice')); setIndex(0); }}>Start practice</button>
              : <button type="button" onClick={() => save({ ...session, learnIndex: session.learnIndex + 1 })}>Next</button>}
          </div>
        </article>
      )}

      {session.phase === 'practice' && activeQuestion && progress && (
        <article className="engine-card">
          <p className="engine-kicker">Practice · {index + 1} of {progress.total}</p>
          <h1>{activeQuestion.prompt}</h1>
          <p className="engine-help">Practice gives immediate feedback. Your teacher receives completion only, not your individual practice answers.</p>
          <div className="deep-options">
            {activeQuestion.options.map((option) => <button type="button" disabled={practiceChecked} className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(activeQuestion, option.id)}>{option.label}</button>)}
          </div>
          {practiceChecked && practiceResult && <div className="engine-card" style={{ marginTop: 16 }}><p className="engine-kicker">{practiceResult.correct ? 'Correct' : 'Not quite'}</p><p>{activeQuestion.explanation}</p></div>}
          <div className="engine-nav">
            <button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>Previous</button>
            <span>{progress.checked}/{progress.total} checked</span>
            {!practiceChecked
              ? <button type="button" disabled={selected.length === 0} onClick={checkPractice}>Check answer</button>
              : index === progress.total - 1
                ? <button type="button" disabled={!progress.complete} onClick={finishPractice}>Continue to post-test</button>
                : <button type="button" onClick={() => setIndex((value) => value + 1)}>Next</button>}
          </div>
          {submitMessage && <p className="engine-help">{submitMessage}</p>}
        </article>
      )}

      {session.phase === 'result' && (() => {
        const result = schoolResult(session);
        return (
          <>
            <article className="engine-card">
              <p className="engine-kicker">Your political-literacy result</p>
              <h1>{result.post.overall.percent}% after training</h1>
              <div className="deep-literacy-line"><span>Baseline</span><strong>{result.baseline.overall.percent}%</strong></div>
              <div className="deep-literacy-line"><span>Post-test</span><strong>{result.post.overall.percent}%</strong></div>
              <div className="deep-literacy-line"><span>Change</span><strong>{result.change >= 0 ? '+' : ''}{result.change} points</strong></div>
              <div className="deep-literacy-line"><span>CLASSIFY change</span><strong>{result.classifyChange >= 0 ? '+' : ''}{result.classifyChange}</strong></div>
              <div className="deep-literacy-line"><span>UNDERSTAND change</span><strong>{result.understandChange >= 0 ? '+' : ''}{result.understandChange}</strong></div>
              <p className="engine-help">The baseline and post-test are content-matched forms. They are not yet empirically equated, so the change is a pilot learning indicator rather than a standardized educational measure.</p>
            </article>
            <article className="engine-card" style={{ marginTop: 18 }}>
              <p className="engine-kicker">Optional private self-map</p>
              <h2>Your beliefs are a separate activity.</h2>
              <p className="engine-help">Politangle BELIEVE has no correct political answers. If you explore your political shape, those answers stay in your browser session and are not sent to the school class aggregation service.</p>
              <Link className="engine-primary-link" href="/quiz">Open private Politangle Quick</Link>
            </article>
          </>
        );
      })()}
    </section>
  );
}
