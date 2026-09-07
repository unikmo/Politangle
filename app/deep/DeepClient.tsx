'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { allDeepBeliefQuestions, deepLiteracyQuestions } from '../../lib/deep-bank';
import { calculateDeepBeliefResult, calculateDeepLiteracyResult, type DeepBeliefResult, type DeepLiteracyResult } from '../../lib/deep-engine';
import {
  answerDeepBelief,
  answerDeepLiteracy,
  completeDeepSession,
  createDeepSession,
  deepOverallProgress,
  deepPhaseProgress,
  displayedToStoredDeepAnswer,
  isDeepPoleFlipped,
  parseStoredDeepSession,
  storedToDisplayedDeepAnswer,
  type DeepPhase,
  type DeepSession,
} from '../../lib/deep-session';
import { assessAllTraditions, type TraditionAssessment } from '../../lib/ideology-model';
import { parseStoredResult, type QuickResult } from '../../lib/engine';
import { pairedAnswerOptions, type AnswerValue } from '../../lib/questions';

const QUICK_RESULT_KEY = 'politangle.quick.result.v2';
const DEEP_SESSION_KEY = 'politangle.deep.session.v1';
const DEEP_RESULT_KEY = 'politangle.deep.result.v1';
const phaseOrder: DeepPhase[] = ['believe', 'classify', 'understand'];

const phaseTitle: Record<DeepPhase, string> = {
  believe: 'BELIEVE',
  classify: 'CLASSIFY',
  understand: 'UNDERSTAND',
};

type DeepOutput = {
  belief: DeepBeliefResult;
  literacy: DeepLiteracyResult;
  compatibility: TraditionAssessment[];
};

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function orderFor(session: DeepSession, phase: DeepPhase) {
  if (phase === 'believe') return session.beliefOrder;
  if (phase === 'classify') return session.classifyOrder;
  return session.understandOrder;
}

function firstUnanswered(session: DeepSession, phase: DeepPhase) {
  const order = orderFor(session, phase);
  const found = order.findIndex((id) => phase === 'believe'
    ? session.beliefAnswers[id] === undefined
    : (session.literacyAnswers[id]?.length ?? 0) === 0);
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

export default function DeepClient() {
  const [quick, setQuick] = useState<QuickResult | null | undefined>(undefined);
  const [session, setSession] = useState<DeepSession | null>(null);
  const [phase, setPhase] = useState<DeepPhase>('believe');
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState<DeepOutput | null>(null);

  useEffect(() => {
    const quickResult = parseStoredResult(sessionStorage.getItem(QUICK_RESULT_KEY));
    setQuick(quickResult);
    if (!quickResult) return;

    const restored = parseStoredDeepSession(sessionStorage.getItem(DEEP_SESSION_KEY));
    const initial = restored ?? createDeepSession(newSeed());
    sessionStorage.setItem(DEEP_SESSION_KEY, JSON.stringify(initial));
    setSession(initial);

    const firstIncomplete = phaseOrder.find((candidate) => !deepPhaseProgress(initial, candidate).complete) ?? 'understand';
    setPhase(firstIncomplete);
    setIndex(firstUnanswered(initial, firstIncomplete));
  }, []);

  const currentBelief = useMemo(() => {
    if (!session || phase !== 'believe') return null;
    const id = session.beliefOrder[index];
    return allDeepBeliefQuestions.find((question) => question.id === id) ?? null;
  }, [session, phase, index]);

  const currentLiteracy = useMemo(() => {
    if (!session || phase === 'believe') return null;
    const id = orderFor(session, phase)[index];
    return deepLiteracyQuestions.find((question) => question.id === id) ?? null;
  }, [session, phase, index]);

  if (quick === undefined) {
    return <section className="engine-shell"><article className="engine-card"><p>Loading Deep…</p></article></section>;
  }

  if (!quick) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Quick comes first</p>
          <h1>Complete Politangle Quick before Deep.</h1>
          <p>Deep is designed to add discriminating belief dimensions and political-literacy questions to the four Quick dimensions.</p>
          <Link className="engine-primary-link" href="/quiz">Start Quick</Link>
        </article>
      </section>
    );
  }

  if (!session) {
    return <section className="engine-shell"><article className="engine-card"><p>Loading Deep session…</p></article></section>;
  }

  if (output) {
    const ordinary = output.compatibility.filter((item) => item.kind !== 'anti-pluralist-pattern' && item.status !== 'insufficient');
    const patterns = output.compatibility.filter((item) => item.kind === 'anti-pluralist-pattern' && item.status !== 'insufficient');

    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Deep validation result</p>
          <h1>Beliefs and literacy are reported separately.</h1>
          <p className="engine-help">Belief axes have no correct answer. CLASSIFY and UNDERSTAND are literacy questions and can be scored against an evidence-backed answer key.</p>

          <div className="engine-results">
            {Object.values(output.belief.axes).map((axis) => (
              <section className="engine-dimension" key={axis.axis}>
                <div className="engine-dimension-head"><strong>{axis.axis}</strong><span>{axis.label}</span></div>
                <div className="engine-poles"><span>{axis.negative}</span><span>{axis.positive}</span></div>
                <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
                <div className="engine-dimension-meta"><span>{axis.score === null ? 'No score' : `${axis.score} / 100`}</span><span>{axis.coverage}% scored coverage</span></div>
              </section>
            ))}
          </div>
        </article>

        <div className="deep-summary-grid">
          <article className="engine-card">
            <p className="engine-kicker">Political literacy</p>
            <h2>{output.literacy.overall.percent}% overall</h2>
            <div className="deep-literacy-line"><span>CLASSIFY</span><strong>{output.literacy.sections.classify.percent}%</strong></div>
            <div className="deep-literacy-line"><span>UNDERSTAND</span><strong>{output.literacy.sections.understand.percent}%</strong></div>
            <p className="engine-help">Coverage: {output.literacy.overall.coverage}%</p>
          </article>

          <article className="engine-card">
            <p className="engine-kicker">Tradition compatibility</p>
            <h2>Qualitative, not percentages</h2>
            {ordinary.length === 0 && <p className="engine-help">No tradition has enough modeled support to surface yet.</p>}
            {ordinary.map((item) => (
              <div className="deep-literacy-line" key={item.profileId}><span>{item.name}</span><strong>{item.status}</strong></div>
            ))}
          </article>
        </div>

        {patterns.length > 0 && (
          <article className="engine-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">Pattern-level signals</p>
            <p className="engine-help">These are combinations of attitudes defined in the cited scholarship. They are not party membership, identity or extremism diagnoses.</p>
            {patterns.map((item) => <div className="deep-literacy-line" key={item.profileId}><span>{item.name}</span><strong>{item.status}</strong></div>)}
          </article>
        )}

        <div className="engine-result-actions">
          <button className="engine-primary-link" type="button" onClick={() => restart()}>Restart Deep</button>
          <span>Raw political answers remain in this browser session and are not written to Firestore.</span>
        </div>
        <p className="engine-disclaimer">Content-validation build. The question model and tradition mappings are evidence-backed but not yet psychometrically validated. “Consistent with” does not mean “you are.”</p>
      </section>
    );
  }

  const currentOrder = orderFor(session, phase);
  const progress = deepPhaseProgress(session, phase);
  const overall = deepOverallProgress(session);
  const selectedBelief = currentBelief ? session.beliefAnswers[currentBelief.id] : undefined;
  const selectedLiteracy = currentLiteracy ? session.literacyAnswers[currentLiteracy.id] ?? [] : [];

  function save(next: DeepSession) {
    sessionStorage.setItem(DEEP_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function chooseBelief(displayedValue: AnswerValue) {
    if (!currentBelief) return;
    const flipped = isDeepPoleFlipped(session.seed, currentBelief.id);
    const stored = displayedToStoredDeepAnswer(displayedValue, flipped);
    save(answerDeepBelief(session, currentBelief.id, stored));
  }

  function chooseLiteracy(optionId: string) {
    if (!currentLiteracy) return;
    const existing = selectedLiteracy;
    const nextSelection = currentLiteracy.multiSelect
      ? existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId]
      : [optionId];
    if (nextSelection.length === 0) {
      const next = { ...session, literacyAnswers: { ...session.literacyAnswers } };
      delete next.literacyAnswers[currentLiteracy.id];
      save(next);
      return;
    }
    save(answerDeepLiteracy(session, currentLiteracy.id, nextSelection));
  }

  function restart() {
    const next = createDeepSession(newSeed());
    sessionStorage.setItem(DEEP_SESSION_KEY, JSON.stringify(next));
    sessionStorage.removeItem(DEEP_RESULT_KEY);
    setSession(next);
    setPhase('believe');
    setIndex(0);
    setOutput(null);
  }

  function advance() {
    if (index < currentOrder.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (!progress.complete) return;
    const phaseIndex = phaseOrder.indexOf(phase);
    if (phaseIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[phaseIndex + 1];
      setPhase(nextPhase);
      setIndex(firstUnanswered(session, nextPhase));
      return;
    }
    finish();
  }

  function finish() {
    if (!deepOverallProgress(session).complete) return;
    const completed = completeDeepSession(session);
    const belief = calculateDeepBeliefResult(allDeepBeliefQuestions, completed.beliefAnswers);
    const literacy = calculateDeepLiteracyResult(deepLiteracyQuestions, completed.literacyAnswers);
    const compatibility = assessAllTraditions({ quick, deep: belief });
    const result: DeepOutput = { belief, literacy, compatibility };
    sessionStorage.setItem(DEEP_SESSION_KEY, JSON.stringify(completed));
    sessionStorage.setItem(DEEP_RESULT_KEY, JSON.stringify(result));
    setSession(completed);
    setOutput(result);
  }

  const currentAnswered = phase === 'believe'
    ? currentBelief !== null && session.beliefAnswers[currentBelief.id] !== undefined
    : currentLiteracy !== null && (session.literacyAnswers[currentLiteracy.id]?.length ?? 0) > 0;

  const beliefDisplay = currentBelief ? (() => {
    const flipped = isDeepPoleFlipped(session.seed, currentBelief.id);
    return {
      flipped,
      first: flipped ? currentBelief.positive : currentBelief.negative,
      second: flipped ? currentBelief.negative : currentBelief.positive,
      selected: storedToDisplayedDeepAnswer(selectedBelief, flipped),
    };
  })() : null;

  return (
    <section className="engine-shell">
      <div className="deep-phase-tabs">
        {phaseOrder.map((item) => <span className={item === phase ? 'active' : ''} key={item}>{phaseTitle[item]}</span>)}
      </div>
      <div className="engine-progress-row">
        <span>{overall.answered} / {overall.total}</span>
        <div className="engine-progress" aria-label={`${overall.percent}% complete`}><span style={{ width: `${overall.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>Restart</button>
      </div>

      {phase === 'believe' && currentBelief && beliefDisplay && (
        <article className="engine-card">
          <p className="engine-kicker">BELIEVE · {currentBelief.construct}</p>
          <h1>Which comes closer to your own view?</h1>
          <div className="engine-pair">
            <div><span>First view</span><p>{beliefDisplay.first}</p></div>
            <div><span>Second view</span><p>{beliefDisplay.second}</p></div>
          </div>
          <div className="engine-answer-grid paired" role="radiogroup" aria-label="Belief response">
            {pairedAnswerOptions.map((option) => (
              <button type="button" role="radio" aria-checked={beliefDisplay.selected === option.value} className={beliefDisplay.selected === option.value ? 'engine-answer selected' : 'engine-answer'} key={String(option.value)} onClick={() => chooseBelief(option.value)}>{option.label}</button>
            ))}
          </div>
        </article>
      )}

      {phase !== 'believe' && currentLiteracy && (
        <article className="engine-card">
          <p className="engine-kicker">{phaseTitle[phase]} · question {index + 1} of {currentOrder.length}</p>
          <h1>{currentLiteracy.prompt}</h1>
          <p className="engine-help">{currentLiteracy.multiSelect ? 'Select every option that applies.' : 'Choose the best answer.'} No belief is being scored here; this section measures political-literacy recognition.</p>
          <div className="deep-options">
            {currentLiteracy.options.map((option) => (
              <button type="button" className={selectedLiteracy.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => chooseLiteracy(option.id)}>{option.label}</button>
            ))}
          </div>
        </article>
      )}

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{phaseTitle[phase]} {progress.answered}/{progress.total}</span>
        <button type="button" onClick={advance} disabled={!currentAnswered || (index === currentOrder.length - 1 && !progress.complete)}>{phase === 'understand' && index === currentOrder.length - 1 ? 'See Deep result' : index === currentOrder.length - 1 ? `Continue from ${phaseTitle[phase]}` : 'Next'}</button>
      </div>
    </section>
  );
}
