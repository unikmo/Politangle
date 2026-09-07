'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  answerQuestion,
  calculateQuickResult,
  completeSession,
  createQuickSession,
  getProgress,
  getQuestion,
  parseStoredSession,
  type QuickSession,
} from '../../lib/engine';
import { answerOptions, type AnswerValue } from '../../lib/questions';

const SESSION_KEY = 'politangle.quick.session.v1';
const RESULT_KEY = 'politangle.quick.result.v1';

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
  const selected = session.answers[current.id];

  function choose(value: AnswerValue) {
    if (!session) return;
    const next = answerQuestion(session, current.id, value);
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
        <p className="engine-kicker">Statement {index + 1}</p>
        <h1>{current.text}</h1>
        <p className="engine-help">Answer your own view. “Not sure” is allowed and is excluded from the score rather than treated as a neutral political position.</p>

        <div className="engine-answer-grid" role="radiogroup" aria-label="Response">
          {answerOptions.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={selected === option.value}
              className={selected === option.value ? 'engine-answer selected' : 'engine-answer'}
              key={option.value}
              onClick={() => choose(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{progress.unsureCount ? `${progress.unsureCount} marked not sure` : 'All scored answers so far'}</span>
        {index === session.order.length - 1 ? (
          <button type="button" onClick={finish} disabled={!progress.complete}>See result</button>
        ) : (
          <button type="button" onClick={() => setIndex((value) => Math.min(session.order.length - 1, value + 1))}>Next</button>
        )}
      </div>
    </section>
  );
}
