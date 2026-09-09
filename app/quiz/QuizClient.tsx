'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  answerBeliefV2,
  beliefV2StageProgress,
  createBeliefV2Session,
  displayedToStoredBeliefV2Answer,
  getBeliefV2Item,
  isBeliefV2PoleFlipped,
  parseBeliefV2Session,
  storedToDisplayedBeliefV2Answer,
  type BeliefV2Session,
} from '../../lib/belief-v2-session';
import { pairedAnswerOptions, type AnswerValue } from '../../lib/questions';

export const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';

function constructLabel(construct: string) {
  if (construct === 'nationhood-membership') return 'Nationhood';
  return construct.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

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
  const [session, setSession] = useState<BeliefV2Session | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const restored = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
    const initial = restored ?? createBeliefV2Session(newSeed());
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(initial));
    setSession(initial);

    const firstUnanswered = initial.quickOrder.findIndex((id) => initial.answers[id] === undefined);
    setIndex(firstUnanswered === -1 ? initial.quickOrder.length - 1 : firstUnanswered);
  }, []);

  const current = useMemo(() => {
    if (!session) return null;
    return getBeliefV2Item(session.quickOrder[index]);
  }, [session, index]);

  if (!session || !current) {
    return <section className="engine-card"><p>Loading assessment…</p></section>;
  }

  const progress = beliefV2StageProgress(session, 'quick');
  const flipped = isBeliefV2PoleFlipped(session.seed, current.id);
  const first = flipped ? current.positive : current.negative;
  const second = flipped ? current.negative : current.positive;
  const selected = storedToDisplayedBeliefV2Answer(session.answers[current.id], flipped);

  function save(next: BeliefV2Session) {
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function choose(displayedValue: AnswerValue) {
    const storedValue = displayedToStoredBeliefV2Answer(displayedValue, flipped);
    const next = answerBeliefV2(session, current.id, storedValue);
    save(next);
    if (index < next.quickOrder.length - 1) window.setTimeout(() => setIndex((value) => value + 1), 90);
  }

  function restart() {
    const next = createBeliefV2Session(newSeed());
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    sessionStorage.removeItem(LITERACY_SESSION_KEY);
    setSession(next);
    setIndex(0);
  }

  function finish() {
    if (!progress.complete) return;
    router.push('/results');
  }

  return (
    <section className="engine-shell">
      <div className="engine-progress-row">
        <span>{progress.answered} / {progress.total}</span>
        <div className="engine-progress" aria-label={`${progress.percent}% complete`}><span style={{ width: `${progress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>Restart</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker quick-topic">{constructLabel(current.construct)}</p>
        <h1>Which view is closer to yours?</h1>
        <div className="engine-pair" aria-label="Two political views">
          <div><span>First view</span><p>{first}</p></div>
          <div><span>Second view</span><p>{second}</p></div>
        </div>
        <div className="quick-scale" role="radiogroup" aria-label="Response">
          {pairedAnswerOptions.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={selected === option.value}
              aria-label={option.label}
              className={selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'}
              key={String(option.value)}
              onClick={() => choose(option.value)}
            >
              {option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}
            </button>
          ))}
        </div>
        <div className="quick-scale-key">
          <span><b>−2</b> First view</span>
          <span><b>0</b> Balanced / depends</span>
          <span><b>+2</b> Second view</span>
          <span><b>?</b> Not sure</span>
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{progress.unsure ? `${progress.unsure} marked not sure` : 'No unsure responses so far'}</span>
        {index === session.quickOrder.length - 1 ? (
          <button type="button" onClick={finish} disabled={!progress.complete}>See Quick result</button>
        ) : (
          <button type="button" onClick={() => setIndex((value) => Math.min(session.quickOrder.length - 1, value + 1))}>Next</button>
        )}
      </div>
    </section>
  );
}
