'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  answerQuestion,
  calculateQuickResult,
  completeSession,
  createQuickSession,
  displayedToStoredAnswer,
  getDisplayedQuestion,
  getProgress,
  getQuestion,
  parseStoredSession,
  storedToDisplayedAnswer,
  type QuickSession,
} from '../../lib/engine';
import { pairedAnswerOptions, type AnswerValue } from '../../lib/questions';

const SESSION_KEY = 'politangle.quick.session.v2';
const RESULT_KEY = 'politangle.quick.result.v2';

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

export default function QuizClient() {
  const router = useRouter();
  const [session, setSession] = useState<QuickSession | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const restored = parseStoredSession(sessionStorage.getItem(SESSION_KEY));
    const initial = restored ?? createQuickSession(newSeed());
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(initial));
    setSession(initial);

    if (restored) {
      const firstUnanswered = restored.order.findIndex((id) => restored.answers[id] === undefined);
      setIndex(firstUnanswered === -1 ? restored.order.length - 1 : firstUnanswered);
    }
  }, []);

  const current = useMemo(() => {
    if (!session) return null;
    return getQuestion(session.order[index]);
  }, [session, index]);

  if (!session || !current) {
    return <section className="engine-card"><p>Loading assessment…</p></section>;
  }

  const progress = getProgress(session.answers);
  const display = getDisplayedQuestion(session, current);
  const selected = storedToDisplayedAnswer(session.answers[current.id], display.flipped);

  function choose(displayedValue: AnswerValue) {
    if (!session) return;
    const storedValue = displayedToStoredAnswer(displayedValue, display.flipped);
    const next = answerQuestion(session, current.id, storedValue);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    setSession(next);

    if (index < next.order.length - 1) {
      window.setTimeout(() => setIndex((value) => value + 1), 90);
    }
  }

  function restart() {
    const next = createQuickSession(newSeed());
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(next));
    sessionStorage.removeItem(RESULT_KEY);
    setSession(next);
    setIndex(0);
  }

  function finish() {
    if (!session || !progress.complete) return;
    const completed = completeSession(session);
    const result = calculateQuickResult(completed.answers);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(completed));
    sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
    router.push('/results');
  }

  return (
    <section className="engine-shell">
      <div className="engine-progress-row">
        <span>{progress.answeredCount} / {progress.total}</span>
        <div className="engine-progress" aria-label={`${progress.percent}% complete`}><span style={{ width: `${progress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>Restart</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker">Choice {index + 1} · {current.construct}</p>
        <h1>Which comes closer to your own view?</h1>
        <div className="engine-pair" aria-label="Two political views">
          <div><span>First view</span><p>{display.first}</p></div>
          <div><span>Second view</span><p>{display.second}</p></div>
        </div>
        <p className="engine-help">Choose the closer view, or the middle if your position is genuinely balanced or depends on the case. “Not sure / I do not understand” is separate and is excluded from scoring.</p>

        <div className="engine-answer-grid paired" role="radiogroup" aria-label="Response">
          {pairedAnswerOptions.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={selected === option.value}
              className={selected === option.value ? 'engine-answer selected' : 'engine-answer'}
              key={String(option.value)}
              onClick={() => choose(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{progress.unsureCount ? `${progress.unsureCount} marked not sure` : 'No unsure responses so far'}</span>
        {index === session.order.length - 1 ? (
          <button type="button" onClick={finish} disabled={!progress.complete}>See result</button>
        ) : (
          <button type="button" onClick={() => setIndex((value) => Math.min(session.order.length - 1, value + 1))}>Next</button>
        )}
      </div>
    </section>
  );
}
