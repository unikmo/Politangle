'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  assessConservativeSubtypeV2,
  assessFamiliesV2Canonical,
  assessTendenciesV2,
  calculatePolygonV2Canonical,
} from '../../lib/belief-v2-engine';
import {
  answerBeliefV2,
  beliefV2OverallProgress,
  beliefV2StageProgress,
  completeBeliefV2Session,
  displayedToStoredBeliefV2Answer,
  getBeliefV2Item,
  isBeliefV2PoleFlipped,
  parseBeliefV2Session,
  storedToDisplayedBeliefV2Answer,
  type BeliefV2Session,
} from '../../lib/belief-v2-session';
import { deepLiteracyQuestions } from '../../lib/deep-bank';
import { calculateDeepLiteracyResult, scoreLiteracyItem, type DeepLiteracyResult, type DeepSection } from '../../lib/deep-engine';
import {
  answerLiteracy,
  completeLiteracySession,
  createLiteracySession,
  literacyOrder,
  literacyPhaseProgress,
  parseLiteracySession,
  revealLiteracyAnswer,
  type LiteracySession,
} from '../../lib/literacy-session';
import { pairedAnswerOptions, type AnswerValue } from '../../lib/questions';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';
const DEEP_RESULT_KEY = 'politangle.deep.result.v2';

type DeepPhase = 'believe' | DeepSection;
const phaseOrder: DeepPhase[] = ['believe', 'classify', 'understand'];
const phaseTitle: Record<DeepPhase, string> = {
  believe: 'BELIEVE',
  classify: 'CLASSIFY',
  understand: 'UNDERSTAND',
};

type DeepOutput = {
  polygon: ReturnType<typeof calculatePolygonV2Canonical>;
  families: ReturnType<typeof assessFamiliesV2Canonical>;
  tendencies: ReturnType<typeof assessTendenciesV2>;
  subtype: ReturnType<typeof assessConservativeSubtypeV2>;
  literacy: DeepLiteracyResult;
};

function familyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 75) return 'Strong match';
  if (score >= 60) return 'Broad match';
  if (score >= 40) return 'Mixed / overlapping';
  if (score >= 25) return 'Limited match';
  return 'Strong tension';
}

function directionLabel(score: number | null, low: string, high: string) {
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly toward ${low.toLowerCase()}`;
  if (score <= 39) return `Leans toward ${low.toLowerCase()}`;
  if (score <= 60) return 'Mixed / balanced';
  if (score <= 74) return `Leans toward ${high.toLowerCase()}`;
  return `Strongly toward ${high.toLowerCase()}`;
}

function firstUnansweredBelief(session: BeliefV2Session) {
  const found = session.deepOrder.findIndex((id) => session.answers[id] === undefined);
  return found === -1 ? Math.max(0, session.deepOrder.length - 1) : found;
}

function firstUncheckedLiteracy(session: LiteracySession, section: DeepSection) {
  const order = literacyOrder(session, section);
  const found = order.findIndex((id) => !session.revealed.includes(id));
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

function buildOutput(belief: BeliefV2Session, literacy: LiteracySession): DeepOutput {
  return {
    polygon: calculatePolygonV2Canonical(belief.answers),
    families: assessFamiliesV2Canonical(belief.answers),
    tendencies: assessTendenciesV2(belief.answers),
    subtype: assessConservativeSubtypeV2(belief.answers),
    literacy: calculateDeepLiteracyResult(deepLiteracyQuestions, literacy.answers),
  };
}

export default function DeepClient() {
  const [beliefSession, setBeliefSession] = useState<BeliefV2Session | null | undefined>(undefined);
  const [literacySession, setLiteracySession] = useState<LiteracySession | null>(null);
  const [phase, setPhase] = useState<DeepPhase>('believe');
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState<DeepOutput | null>(null);

  useEffect(() => {
    const belief = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
    setBeliefSession(belief);
    if (!belief || !beliefV2StageProgress(belief, 'quick').complete) return;

    const restoredLiteracy = parseLiteracySession(sessionStorage.getItem(LITERACY_SESSION_KEY));
    const literacy = restoredLiteracy ?? createLiteracySession(belief.seed);
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(literacy));
    setLiteracySession(literacy);

    const deepProgress = beliefV2StageProgress(belief, 'deep');
    if (!deepProgress.complete) {
      setPhase('believe');
      setIndex(firstUnansweredBelief(belief));
      return;
    }

    const classify = literacyPhaseProgress(literacy, 'classify');
    if (!classify.complete) {
      setPhase('classify');
      setIndex(firstUncheckedLiteracy(literacy, 'classify'));
      return;
    }

    const understand = literacyPhaseProgress(literacy, 'understand');
    if (!understand.complete) {
      setPhase('understand');
      setIndex(firstUncheckedLiteracy(literacy, 'understand'));
      return;
    }

    setOutput(buildOutput(belief, literacy));
  }, []);

  const currentBelief = useMemo(() => {
    if (!beliefSession || phase !== 'believe') return null;
    return getBeliefV2Item(beliefSession.deepOrder[index]);
  }, [beliefSession, phase, index]);

  const currentLiteracy = useMemo(() => {
    if (!literacySession || phase === 'believe') return null;
    const id = literacyOrder(literacySession, phase)[index];
    return deepLiteracyQuestions.find((question) => question.id === id) ?? null;
  }, [literacySession, phase, index]);

  if (beliefSession === undefined) {
    return <section className="engine-shell"><article className="engine-card"><p>Loading Deep…</p></article></section>;
  }

  if (!beliefSession || !beliefV2StageProgress(beliefSession, 'quick').complete) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Quick comes first</p>
          <h1>Complete Politangle Quick before Deep.</h1>
          <p>Quick contains the first 26 items of the locked 42-item BELIEVE model. Deep adds the remaining 16 BELIEVE items and the political-literacy training block.</p>
          <Link className="engine-primary-link" href="/quiz">Start Quick</Link>
        </article>
      </section>
    );
  }

  if (!literacySession) {
    return <section className="engine-shell"><article className="engine-card"><p>Loading Deep session…</p></article></section>;
  }

  function saveBelief(next: BeliefV2Session) {
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    setBeliefSession(next);
  }

  function saveLiteracy(next: LiteracySession) {
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(next));
    setLiteracySession(next);
  }

  function restartDeep() {
    if (!beliefSession) return;
    const deepIds = new Set(beliefSession.deepOrder);
    const quickAnswers = Object.fromEntries(Object.entries(beliefSession.answers).filter(([id]) => !deepIds.has(id)));
    const nextBelief: BeliefV2Session = { ...beliefSession, answers: quickAnswers, completedAt: undefined };
    const nextLiteracy = createLiteracySession(beliefSession.seed);
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(nextBelief));
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(nextLiteracy));
    sessionStorage.removeItem(DEEP_RESULT_KEY);
    setBeliefSession(nextBelief);
    setLiteracySession(nextLiteracy);
    setPhase('believe');
    setIndex(0);
    setOutput(null);
  }

  function finishDeep() {
    if (!beliefSession || !literacySession) return;
    if (!beliefV2OverallProgress(beliefSession).complete) return;
    if (!literacyPhaseProgress(literacySession, 'classify').complete || !literacyPhaseProgress(literacySession, 'understand').complete) return;

    const completedBelief = beliefSession.completedAt ? beliefSession : completeBeliefV2Session(beliefSession);
    const completedLiteracy = literacySession.completedAt ? literacySession : completeLiteracySession(literacySession);
    const result = buildOutput(completedBelief, completedLiteracy);
    saveBelief(completedBelief);
    saveLiteracy(completedLiteracy);
    sessionStorage.setItem(DEEP_RESULT_KEY, JSON.stringify(result));
    setOutput(result);
  }

  if (output) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">1 · Your completed political shape</p>
          <h1>42 BELIEVE items: THINK, FEEL and ACT.</h1>
          <p className="engine-help">The polygon is a multidimensional profile, not an ideology box. ACT reflects stated choices or intentions, not independently observed real-world behavior.</p>
          <div className="engine-results">
            {output.polygon.map((axis) => (
              <section className="engine-dimension" key={axis.id}>
                <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
                <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
                <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
                <div className="engine-dimension-meta"><span>{axis.score === null ? 'No score' : `${axis.score} / 100 position`}</span><span>{axis.coverage}% coverage</span></div>
              </section>
            ))}
          </div>
        </article>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">2 · Political-family compatibility</p>
          <h2>Compatibility can overlap across families.</h2>
          <div className="engine-table-wrap">
            <table className="engine-table">
              <thead><tr><th>Family</th><th>Overall</th><th>THINK</th><th>FEEL</th><th>ACT</th><th>Think/Feel/Act tension</th></tr></thead>
              <tbody>
                {output.families.map((family) => (
                  <tr key={family.id}>
                    <td><strong>{family.name}</strong></td>
                    <td>{family.overall === null ? '—' : `${family.overall} · ${familyBand(family.overall)}`}</td>
                    <td>{family.think ?? '—'}</td>
                    <td>{family.feel ?? '—'}</td>
                    <td>{family.act ?? '—'}</td>
                    <td>{family.modeTension === null ? '—' : family.modeTension}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="engine-help">A large Think/Feel/Act spread is reported as a tension to explore, not as hypocrisy or a failed consistency test.</p>
        </article>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">3 · Cross-cutting tendencies and subtype</p>
          {output.tendencies.map((item) => (
            <div className="deep-literacy-line" key={item.id}><span>{item.id.replaceAll('-', ' ')}</span><strong>{item.score === null ? '—' : `${item.score} / 100`}</strong></div>
          ))}
          {output.subtype && <p className="engine-help"><strong>{output.subtype.name}:</strong> {output.subtype.explanation}</p>}
        </article>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">4 · Political-literacy training</p>
          <h2>{output.literacy.overall.percent}% overall</h2>
          <div className="deep-literacy-line"><span>CLASSIFY — match a political description to the best-fitting tradition</span><strong>{output.literacy.sections.classify.percent}%</strong></div>
          <div className="deep-literacy-line"><span>UNDERSTAND — distinguish political concepts and common misconceptions</span><strong>{output.literacy.sections.understand.percent}%</strong></div>
          <p className="engine-help">Belief answers have no correct answer. Only the literacy block is scored for factual/political-literacy knowledge.</p>
        </article>

        <div className="engine-result-actions">
          <button className="engine-primary-link" type="button" onClick={restartDeep}>Restart Deep + training</button>
          <span>Raw political answers remain in this browser session and are not written to Firestore.</span>
        </div>
        <p className="engine-disclaimer">Content-validation build. Family loadings and numeric bands remain evidence-informed priors pending respondent calibration, reliability testing and cross-national validation.</p>
      </section>
    );
  }

  const deepProgress = beliefV2StageProgress(beliefSession, 'deep');
  const classifyProgress = literacyPhaseProgress(literacySession, 'classify');
  const understandProgress = literacyPhaseProgress(literacySession, 'understand');
  const beliefSelected = currentBelief ? beliefSession.answers[currentBelief.id] : undefined;
  const literacySelected = currentLiteracy ? literacySession.answers[currentLiteracy.id] ?? [] : [];
  const literacyChecked = currentLiteracy ? literacySession.revealed.includes(currentLiteracy.id) : false;

  function chooseBelief(displayedValue: AnswerValue) {
    if (!currentBelief) return;
    const flipped = isBeliefV2PoleFlipped(beliefSession.seed, currentBelief.id);
    const stored = displayedToStoredBeliefV2Answer(displayedValue, flipped);
    saveBelief(answerBeliefV2(beliefSession, currentBelief.id, stored));
  }

  function chooseLiteracy(optionId: string) {
    if (!currentLiteracy || literacyChecked) return;
    const existing = literacySelected;
    const nextSelection = currentLiteracy.multiSelect
      ? existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId]
      : [optionId];
    if (nextSelection.length === 0) return;
    saveLiteracy(answerLiteracy(literacySession, currentLiteracy.id, nextSelection));
  }

  function checkLiteracy() {
    if (!currentLiteracy || literacySelected.length === 0 || literacyChecked) return;
    saveLiteracy(revealLiteracyAnswer(literacySession, currentLiteracy.id));
  }

  function advanceBelief() {
    if (!currentBelief || beliefSession.answers[currentBelief.id] === undefined) return;
    if (index < beliefSession.deepOrder.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (!deepProgress.complete) return;
    setPhase('classify');
    setIndex(firstUncheckedLiteracy(literacySession, 'classify'));
  }

  function advanceLiteracy() {
    if (!currentLiteracy || !literacyChecked || phase === 'believe') return;
    const order = literacyOrder(literacySession, phase);
    if (index < order.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    const progress = literacyPhaseProgress(literacySession, phase);
    if (!progress.complete) return;
    if (phase === 'classify') {
      setPhase('understand');
      setIndex(firstUncheckedLiteracy(literacySession, 'understand'));
      return;
    }
    finishDeep();
  }

  const beliefDisplay = currentBelief ? (() => {
    const flipped = isBeliefV2PoleFlipped(beliefSession.seed, currentBelief.id);
    return {
      first: flipped ? currentBelief.positive : currentBelief.negative,
      second: flipped ? currentBelief.negative : currentBelief.positive,
      selected: storedToDisplayedBeliefV2Answer(beliefSelected, flipped),
    };
  })() : null;

  const literacyItemResult = currentLiteracy && literacyChecked ? scoreLiteracyItem(currentLiteracy, literacySelected) : null;
  const correctLabels = currentLiteracy
    ? currentLiteracy.acceptedAnswerSets[0].map((id) => currentLiteracy.options.find((option) => option.id === id)?.label).filter(Boolean).join(', ')
    : '';

  return (
    <section className="engine-shell">
      <div className="deep-phase-tabs">
        {phaseOrder.map((item) => <span className={item === phase ? 'active' : ''} key={item}>{phaseTitle[item]}</span>)}
      </div>
      <div className="engine-progress-row">
        <span>BELIEVE {deepProgress.answered}/16 · CLASSIFY {classifyProgress.checked}/9 · UNDERSTAND {understandProgress.checked}/6</span>
        <div className="engine-progress" aria-label="Deep progress"><span style={{ width: `${Math.round(((deepProgress.answered + classifyProgress.checked + understandProgress.checked) / 31) * 100)}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restartDeep}>Restart Deep</button>
      </div>

      {phase === 'believe' && currentBelief && beliefDisplay && (
        <article className="engine-card">
          <p className="engine-kicker">BELIEVE · {currentBelief.mode.toUpperCase()} · {currentBelief.construct.replaceAll('-', ' ')}</p>
          <h1>Which comes closer to your own view?</h1>
          <div className="engine-pair">
            <div><span>First view</span><p>{beliefDisplay.first}</p></div>
            <div><span>Second view</span><p>{beliefDisplay.second}</p></div>
          </div>
          <p className="engine-help">These are the remaining 16 items of the locked 42-question BELIEVE model. There is no correct political answer.</p>
          <div className="engine-answer-grid paired" role="radiogroup" aria-label="Belief response">
            {pairedAnswerOptions.map((option) => (
              <button type="button" role="radio" aria-checked={beliefDisplay.selected === option.value} className={beliefDisplay.selected === option.value ? 'engine-answer selected' : 'engine-answer'} key={String(option.value)} onClick={() => chooseBelief(option.value)}>{option.label}</button>
            ))}
          </div>
        </article>
      )}

      {phase !== 'believe' && currentLiteracy && (
        <article className="engine-card">
          <p className="engine-kicker">{phaseTitle[phase]} · training question {index + 1} of {literacyOrder(literacySession, phase).length}</p>
          <h1>{currentLiteracy.prompt}</h1>
          <p className="engine-help">{phase === 'classify' ? 'Match the description to the best-fitting political tradition.' : 'Choose the best-supported explanation.'} Check your answer to reveal the evidence-backed teaching explanation.</p>
          <div className="deep-options">
            {currentLiteracy.options.map((option) => (
              <button type="button" disabled={literacyChecked} className={literacySelected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => chooseLiteracy(option.id)}>{option.label}</button>
            ))}
          </div>

          {literacyChecked && literacyItemResult && (
            <div className="engine-card" style={{ marginTop: 16 }}>
              <p className="engine-kicker">{literacyItemResult.correct ? 'Correct' : 'Not quite'}</p>
              {!literacyItemResult.correct && <p><strong>Best answer:</strong> {correctLabels}</p>}
              <p>{currentLiteracy.explanation}</p>
            </div>
          )}
        </article>
      )}

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{phase === 'believe' ? `BELIEVE ${deepProgress.answered}/16` : `${phaseTitle[phase]} ${phase === 'classify' ? classifyProgress.checked : understandProgress.checked}/${literacyOrder(literacySession, phase).length}`}</span>
        {phase === 'believe' ? (
          <button type="button" onClick={advanceBelief} disabled={!currentBelief || beliefSession.answers[currentBelief.id] === undefined || (index === beliefSession.deepOrder.length - 1 && !deepProgress.complete)}>{index === beliefSession.deepOrder.length - 1 ? 'Continue to CLASSIFY' : 'Next'}</button>
        ) : literacyChecked ? (
          <button type="button" onClick={advanceLiteracy}>{phase === 'understand' && index === literacyOrder(literacySession, phase).length - 1 ? 'See Deep result' : index === literacyOrder(literacySession, phase).length - 1 ? 'Continue to UNDERSTAND' : 'Next'}</button>
        ) : (
          <button type="button" onClick={checkLiteracy} disabled={literacySelected.length === 0}>Check answer</button>
        )}
      </div>
    </section>
  );
}
