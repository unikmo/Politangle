'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  assessFamiliesV2Canonical,
  assessTendenciesV2,
  calculatePolygonV2Canonical,
} from '../../lib/belief-v2-engine';
import {
  answerBeliefV2,
  beliefV2OverallProgress,
  beliefV2StageProgress,
  completeBeliefV2Session,
  getBeliefV2Item,
  parseBeliefV2Session,
  lockedBeliefStatementsV3,
  type BeliefV2Session,
} from '../../lib/belief-v2-session';
import { collapseStatementAnswers } from '../../lib/belief-statements';
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
import { assessNuancesV2 } from '../../lib/nuance-model';
import { agreementAnswerOptions, type AnswerValue } from '../../lib/questions';
import { resultTraditions } from '../../lib/result-traditions';
import { germanBeliefStatement } from '../../lib/german-believe';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../../lib/german-literacy';
import { useLocale } from '../LocaleProvider';

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
  nuances: ReturnType<typeof assessNuancesV2>;
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

function tendencyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 75) return 'Strong tendency';
  if (score >= 60) return 'Leans toward this tendency';
  if (score >= 40) return 'Mixed / balanced';
  if (score >= 25) return 'Leans away from this tendency';
  return 'Strongly away from this tendency';
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
  const canonicalAnswers = collapseStatementAnswers(belief.answers, lockedBeliefStatementsV3);
  return {
    polygon: calculatePolygonV2Canonical(canonicalAnswers),
    families: assessFamiliesV2Canonical(canonicalAnswers),
    tendencies: assessTendenciesV2(canonicalAnswers),
    nuances: assessNuancesV2(canonicalAnswers),
    literacy: calculateDeepLiteracyResult(deepLiteracyQuestions, literacy.answers),
  };
}

export default function DeepClient() {
  const { locale } = useLocale();
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
          <p>Quick contains 52 statements. Deep adds the remaining 32 BELIEVE statements and the political-literacy training block.</p>
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
    const familyById = new Map(output.families.map((family) => [family.id, family]));
    const tendencyById = new Map(output.tendencies.map((tendency) => [tendency.id, tendency]));

    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">1 · Your completed political shape</p>
          <h1>84 BELIEVE statements: THINK, FEEL and ACT.</h1>
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
          <p className="engine-kicker">2 · Your result against the main political traditions</p>
          <h2>What the major traditions generally stand for — and where your answers sit.</h2>
          <p className="engine-help">Scores of 75–100 are anchored as a strong match for the five broad political families. Populism is shown as a scored cross-cutting tendency. Nationalism remains contextual in this pilot because national membership and national self-determination cannot be reduced defensibly to one number from the current two axes.</p>
          <div className="engine-table-wrap">
            <table className="engine-table">
              <thead>
                <tr>
                  <th>Tradition / tendency</th>
                  <th>Your score</th>
                  <th>Core idea</th>
                  <th>Economy</th>
                  <th>Society</th>
                  <th>State power</th>
                  <th>Nationhood / membership</th>
                  <th>Abortion</th>
                  <th>World</th>
                </tr>
              </thead>
              <tbody>
                {resultTraditions.map((tradition) => {
                  const family = tradition.kind === 'political-family'
                    ? familyById.get(tradition.id as 'liberalism' | 'conservatism' | 'social-democracy' | 'socialism' | 'green-politics')
                    : undefined;
                  const tendency = tradition.id === 'populism' ? tendencyById.get('populism') : undefined;
                  const score = family?.overall ?? tendency?.score ?? null;
                  const scoreLabel = tradition.kind === 'political-family' ? familyBand(score) : tendencyBand(score);
                  const scoreText = tradition.scored
                    ? score === null ? '—' : `${score} · ${scoreLabel}`
                    : 'Context only · see Nationhood and World axes';
                  return (
                    <tr key={tradition.id}>
                      <td><strong>{tradition.name}</strong><br /><span>{tradition.kind === 'political-family' ? 'Broad political family' : tradition.scored ? 'Cross-cutting tendency' : 'Cross-cutting context'}</span></td>
                      <td>
                        {scoreText}
                        {family && <><br /><span>THINK {family.think ?? '—'} · FEEL {family.feel ?? '—'} · ACT {family.act ?? '—'}</span></>}
                      </td>
                      <td>{tradition.coreIdea}</td>
                      <td>{tradition.economy}</td>
                      <td>{tradition.society}</td>
                      <td>{tradition.statePower}</td>
                      <td>{tradition.nationalMembership}</td>
                      <td>{tradition.abortion}</td>
                      <td>{tradition.world}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="engine-help">The model deliberately separates Social democracy from Socialism through ownership: Social democracy retains a predominantly capitalist ownership structure, while Socialism places substantially more weight on social, public, cooperative or worker ownership. Narrower labels such as democratic socialism are kept as explanatory nuance rather than a separate headline row.</p>
          <p className="engine-help">Nationalism is not assigned a single pilot score. The Nationhood / membership axis and World / sovereignty axis remain separate because inclusive civic nationalism and more restrictive national membership can combine with different views of international cooperation and state sovereignty.</p>
          <p className="engine-help">Populism is not automatically coded as authoritarian. International IDEA finds that populist governments are empirically associated with weakened democratic checks and civil liberties, while V-Dem finds anti-pluralism is a stronger predictor of autocratization than the populist label alone. Politangle therefore measures populism and authority / democratic constraints separately.</p>
        </article>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">3 · Cross-cutting tendencies and conditional nuances</p>
          {output.tendencies.map((item) => (
            <div className="deep-literacy-line" key={item.id}><span>{item.id.replaceAll('-', ' ')}</span><strong>{item.score === null ? '—' : `${item.score} / 100`}</strong></div>
          ))}
          {output.nuances.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {output.nuances.map((nuance) => (
                <div className="engine-help" key={nuance.id} style={{ marginTop: 12 }}>
                  <strong>{nuance.name}</strong> · {nuance.anchorFamily.replaceAll('-', ' ')} side · {nuance.strength === 'clear' ? 'clear signal' : 'emerging signal'}
                  <br />
                  {nuance.explanation}
                  {nuance.caution && <><br /><span>{nuance.caution}</span></>}
                </div>
              ))}
            </div>
          )}
          <p className="engine-help">Nuanced labels are shown only when the dedicated answer pattern supports them. They do not add sectors to the five-family headline model. National membership and sovereignty remain visible as separate polygon axes rather than being averaged into a nationalism score.</p>
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
        <p className="engine-disclaimer">Content-validation build. Family loadings, nuance thresholds and numeric bands remain evidence-informed priors pending respondent calibration, reliability testing and cross-national validation.</p>
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
    saveBelief(answerBeliefV2(beliefSession, currentBelief.id, displayedValue));
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

  const beliefDisplay = currentBelief ? { statement: currentBelief.statement, selected: beliefSelected } : null;

  const literacyItemResult = currentLiteracy && literacyChecked ? scoreLiteracyItem(currentLiteracy, literacySelected) : null;
  const correctLabels = currentLiteracy
    ? currentLiteracy.acceptedAnswerSets[0].map((id) => { const option = currentLiteracy.options.find((candidate) => candidate.id === id); return option ? (locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label) : undefined; }).filter(Boolean).join(', ')
    : '';

  return (
    <section className="engine-shell">
      <div className="deep-phase-tabs">
        {phaseOrder.map((item) => <span className={item === phase ? 'active' : ''} key={item}>{phaseTitle[item]}</span>)}
      </div>
      <div className="engine-progress-row">
        <span>BELIEVE {deepProgress.answered}/32 · CLASSIFY {classifyProgress.checked}/9 · UNDERSTAND {understandProgress.checked}/6</span>
        <div className="engine-progress" aria-label="Deep progress"><span style={{ width: `${Math.round(((deepProgress.answered + classifyProgress.checked + understandProgress.checked) / 47) * 100)}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restartDeep}>Restart Deep</button>
      </div>

      {phase === 'believe' && currentBelief && beliefDisplay && (
        <article className="engine-card">
          <p className="engine-kicker">BELIEVE · {currentBelief.mode.toUpperCase()} · {currentBelief.construct.replaceAll('-', ' ')}</p>
          <h1>{locale === 'de' ? 'Wie sehr stimmen Sie zu?' : 'How much do you agree?'}</h1>
          <div className="engine-statement"><p>{locale === 'de' ? germanBeliefStatement(currentBelief.sourceItemId, currentBelief.polarity) ?? beliefDisplay.statement : beliefDisplay.statement}</p></div>
          <p className="engine-help">{locale === 'de' ? 'Dies sind die verbleibenden 32 Aussagen des 84-Aussagen-Modells. Es gibt keine politisch richtige Antwort.' : 'These are the remaining 32 statements of the 84-statement BELIEVE model. There is no correct political answer.'}</p>
          <div className="quick-scale" role="radiogroup" aria-label="Belief response">
            {agreementAnswerOptions.map((option) => (
              <button type="button" role="radio" aria-checked={beliefDisplay.selected === option.value} aria-label={option.label} className={beliefDisplay.selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'} key={String(option.value)} onClick={() => chooseBelief(option.value)}>{option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}</button>
            ))}
          </div>
          <div className="quick-scale-key"><span><b>−2</b> {locale === 'de' ? 'Stimme gar nicht zu' : 'Strongly disagree'}</span><span><b>0</b> {locale === 'de' ? 'Neutral / kommt darauf an' : 'Neither / depends'}</span><span><b>+2</b> {locale === 'de' ? 'Stimme voll zu' : 'Strongly agree'}</span><span><b>?</b> {locale === 'de' ? 'Unsicher' : 'Not sure'}</span></div>
        </article>
      )}

      {phase !== 'believe' && currentLiteracy && (
        <article className="engine-card">
          <p className="engine-kicker">{phaseTitle[phase]} · training question {index + 1} of {literacyOrder(literacySession, phase).length}</p>
          <h1>{locale === 'de' ? germanLiteracyPrompt(currentLiteracy.id) ?? currentLiteracy.prompt : currentLiteracy.prompt}</h1>
          <p className="engine-help">{phase === 'classify' ? 'Match the description to the best-fitting political tradition.' : 'Choose the best-supported explanation.'} Check your answer to reveal the evidence-backed teaching explanation.</p>
          <div className="deep-options">
            {currentLiteracy.options.map((option) => (
              <button type="button" disabled={literacyChecked} className={literacySelected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => chooseLiteracy(option.id)}>{locale === 'de' ? germanLiteracyOption(option.id, option.label) : option.label}</button>
            ))}
          </div>

          {literacyChecked && literacyItemResult && (
            <div className="engine-card" style={{ marginTop: 16 }}>
              <p className="engine-kicker">{literacyItemResult.correct ? 'Correct' : 'Not quite'}</p>
              {!literacyItemResult.correct && <p><strong>Best answer:</strong> {correctLabels}</p>}
              <p>{locale === 'de' ? germanLiteracyExplanation(currentLiteracy.id, currentLiteracy.explanation) : currentLiteracy.explanation}</p>
            </div>
          )}
        </article>
      )}

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{phase === 'believe' ? `BELIEVE ${deepProgress.answered}/32` : `${phaseTitle[phase]} ${phase === 'classify' ? classifyProgress.checked : understandProgress.checked}/${literacyOrder(literacySession, phase).length}`}</span>
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
