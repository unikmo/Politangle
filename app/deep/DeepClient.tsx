'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  assessFamiliesV2Canonical,
  assessResponseConsistencyV2,
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
import { assessNuancesV2 } from '../../lib/nuance-model';
import { agreementAnswerOptions, type AnswerValue } from '../../lib/questions';
import { germanBeliefStatement } from '../../lib/german-believe';
import { romanceBeliefStatement } from '../../lib/romance-believe';
import { useLocale } from '../LocaleProvider';

const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const FULL_RESULT_KEY = 'politangle.full.result.v3';

type FullOutput = {
  polygon: ReturnType<typeof calculatePolygonV2Canonical>;
  thinkPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  feelPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  actPolygon: ReturnType<typeof calculatePolygonV2Canonical>;
  families: ReturnType<typeof assessFamiliesV2Canonical>;
  tendencies: ReturnType<typeof assessTendenciesV2>;
  nuances: ReturnType<typeof assessNuancesV2>;
  consistency: ReturnType<typeof assessResponseConsistencyV2>;
};

function familyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 75) return 'Strong match';
  if (score >= 60) return 'Broad match';
  if (score >= 40) return 'Mixed / overlapping';
  if (score >= 25) return 'Limited match';
  return 'Strong tension';
}

function consistencyBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 80) return 'Highly consistent';
  if (score >= 65) return 'Mostly consistent';
  if (score >= 45) return 'Context-sensitive';
  return 'Strongly mixed';
}

function directionLabel(score: number | null, low: string, high: string) {
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly toward ${low.toLowerCase()}`;
  if (score <= 39) return `Leans toward ${low.toLowerCase()}`;
  if (score <= 60) return 'Mixed / balanced';
  if (score <= 74) return `Leans toward ${high.toLowerCase()}`;
  return `Strongly toward ${high.toLowerCase()}`;
}

function referencePeople(familyId: string) {
  const groups: Record<string, readonly string[]> = {
    'social-democracy': ['Willy Brandt', 'Olof Palme', 'Clement Attlee'],
    liberalism: ['John Stuart Mill', 'John Rawls', 'Václav Havel'],
    'green-politics': ['Petra Kelly', 'Wangari Maathai', 'Gro Harlem Brundtland'],
    socialism: ['Aneurin Bevan', 'Salvador Allende', 'Michael Manley'],
    conservatism: ['Edmund Burke', 'Konrad Adenauer', 'Charles de Gaulle'],
  };
  return groups[familyId] ?? [];
}

function PoliticalShape({ axes }: { axes: ReturnType<typeof calculatePolygonV2Canonical> }) {
  const size = 520;
  const center = size / 2;
  const radius = 170;
  const labelRadius = 222;
  const known = axes.map((axis) => axis.score ?? 50);
  const point = (index: number, value: number, r = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
    const scaled = r * (0.22 + 0.78 * (value / 100));
    return [center + Math.cos(angle) * scaled, center + Math.sin(angle) * scaled] as const;
  };
  const polygon = known.map((value, index) => point(index, value)).map(([x, y]) => `${x},${y}`).join(' ');
  const rings = [25, 50, 75, 100].map((level) => axes.map((_, index) => point(index, level)).map(([x, y]) => `${x},${y}`).join(' '));

  return (
    <div className="shape-wrap">
      <svg className="political-shape" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Your completed eight-axis political shape">
        {rings.map((ring, index) => <polygon key={index} className="shape-ring" points={ring} />)}
        {axes.map((axis, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
          const [x, y] = point(index, 100);
          const lx = center + Math.cos(angle) * labelRadius;
          const ly = center + Math.sin(angle) * labelRadius;
          return (
            <g key={axis.id}>
              <line className="shape-spoke" x1={center} y1={center} x2={x} y2={y} />
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">{axis.name}</text>
            </g>
          );
        })}
        <polygon className="shape-area" points={polygon} />
        {known.map((value, index) => {
          const [x, y] = point(index, value);
          return <circle key={axes[index].id} className="shape-dot" cx={x} cy={y} r="5" />;
        })}
      </svg>
    </div>
  );
}

function firstUnansweredFull(session: BeliefV2Session) {
  const found = session.deepOrder.findIndex((id) => session.answers[id] === undefined);
  return found === -1 ? Math.max(0, session.deepOrder.length - 1) : found;
}

function buildOutput(belief: BeliefV2Session): FullOutput {
  const canonicalAnswers = collapseStatementAnswers(belief.answers, lockedBeliefStatementsV3);
  return {
    polygon: calculatePolygonV2Canonical(canonicalAnswers),
    thinkPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'think'),
    feelPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'feel'),
    actPolygon: calculatePolygonV2Canonical(canonicalAnswers, 'act'),
    families: assessFamiliesV2Canonical(canonicalAnswers),
    tendencies: assessTendenciesV2(canonicalAnswers),
    nuances: assessNuancesV2(canonicalAnswers),
    consistency: assessResponseConsistencyV2(canonicalAnswers),
  };
}

export default function DeepClient() {
  const { locale } = useLocale();
  const [beliefSession, setBeliefSession] = useState<BeliefV2Session | null | undefined>(undefined);
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState<FullOutput | null>(null);

  useEffect(() => {
    const belief = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
    setBeliefSession(belief);
    if (!belief || !beliefV2StageProgress(belief, 'quick').complete) return;

    const fullProgress = beliefV2StageProgress(belief, 'deep');
    if (fullProgress.complete) {
      setOutput(buildOutput(belief));
      return;
    }
    setIndex(firstUnansweredFull(belief));
  }, []);

  const currentBelief = useMemo(() => {
    if (!beliefSession || output) return null;
    return getBeliefV2Item(beliefSession.deepOrder[index]);
  }, [beliefSession, output, index]);

  if (beliefSession === undefined) {
    return <section className="engine-shell"><article className="engine-card"><p>Loading Full…</p></article></section>;
  }

  if (!beliefSession || !beliefV2StageProgress(beliefSession, 'quick').complete) {
    return (
      <section className="engine-shell">
        <article className="engine-card">
          <p className="engine-kicker">Quick comes first</p>
          <h1>Complete Politangle Quick before Full.</h1>
          <Link className="engine-primary-link" href="/quiz">Start Quick</Link>
        </article>
      </section>
    );
  }

  function saveBelief(next: BeliefV2Session) {
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    setBeliefSession(next);
  }

  function restartFull() {
    const fullIds = new Set(beliefSession.deepOrder);
    const quickAnswers = Object.fromEntries(Object.entries(beliefSession.answers).filter(([id]) => !fullIds.has(id)));
    const nextBelief: BeliefV2Session = { ...beliefSession, answers: quickAnswers, completedAt: undefined };
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(nextBelief));
    sessionStorage.removeItem(FULL_RESULT_KEY);
    setBeliefSession(nextBelief);
    setIndex(0);
    setOutput(null);
  }

  function finishFull(session: BeliefV2Session) {
    if (!beliefV2OverallProgress(session).complete) return;
    const completed = session.completedAt ? session : completeBeliefV2Session(session);
    const result = buildOutput(completed);
    saveBelief(completed);
    sessionStorage.setItem(FULL_RESULT_KEY, JSON.stringify(result));
    setOutput(result);
  }

  if (output) {
    const topFamily = output.families.find((family) => family.overall !== null) ?? output.families[0];
    const people = topFamily ? referencePeople(topFamily.id) : [];
    const gaps = output.thinkPolygon.map((axis, axisIndex) => {
      const think = axis.score;
      const feel = output.feelPolygon[axisIndex]?.score ?? null;
      const act = output.actPolygon[axisIndex]?.score ?? null;
      const known = [think, feel, act].filter((value): value is number => value !== null);
      return { ...axis, think, feel, act, gap: known.length > 1 ? Math.max(...known) - Math.min(...known) : 0 };
    }).sort((a, b) => b.gap - a.gap);
    const biggestGap = gaps[0];

    return (
      <section className="engine-shell">
        <article className="engine-card result-hero">
          <p className="engine-kicker">Your Full political shape</p>
          <h1>Your answers, checked from three angles.</h1>
          <p className="result-lede">Full compares what you think in principle, what feels important to you and what you say you would do when a trade-off becomes concrete.</p>
          <PoliticalShape axes={output.polygon} />
        </article>

        <article className="engine-card result-story-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">Response consistency</p>
          <div className="consistency-hero">
            <strong>{output.consistency.score ?? '—'}<small>/100</small></strong>
            <div>
              <h2>{consistencyBand(output.consistency.score)}</h2>
              <p>Your consistency score measures how closely your THINK, FEEL and ACT answers line up on the same topics.</p>
            </div>
          </div>
          <p className="engine-help">This is not a knowledge, honesty or conviction score. A lower score can mean genuine nuance, changing priorities between principle and practice, uncertainty, or question noise. A high score simply means your answers usually point in the same direction across contexts.</p>
          {biggestGap && biggestGap.gap >= 25 && (
            <div className="result-tension">
              <strong>Your biggest shift is on {biggestGap.name}.</strong>
              <p>THINK {biggestGap.think ?? '—'} · FEEL {biggestGap.feel ?? '—'} · ACT {biggestGap.act ?? '—'}. That gap is worth noticing because it shows where context changes your answer most.</p>
            </div>
          )}
        </article>

        <article className="engine-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">Closest political traditions</p>
          <h2>Where your answers overlap most.</h2>
          <div className="family-cards">
            {output.families.slice(0, 3).map((family) => (
              <section className="family-card" key={family.id}>
                <span>{family.overall ?? '—'}</span>
                <div><strong>{family.name}</strong><p>{familyBand(family.overall)} · {family.coverage}% measured</p></div>
              </section>
            ))}
          </div>
          {topFamily && people.length > 0 && (
            <div className="reference-people">
              <strong>Historical reference points</strong>
              <p>{people.join(' · ')}</p>
              <small>These are examples associated with {topFamily.name.toLowerCase()} traditions, not claims that they had your exact profile.</small>
            </div>
          )}
        </article>

        <article className="engine-card axis-detail-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">All eight axes</p>
          <h2>Your completed shape in detail.</h2>
          <div className="engine-results">
            {output.polygon.map((axis) => (
              <section className="engine-dimension" key={axis.id}>
                <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
                <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
                <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
                <div className="engine-dimension-meta"><span>{axis.score === null ? 'No score' : `${axis.score} / 100`}</span><span>{axis.coverage}% measured</span></div>
              </section>
            ))}
          </div>
        </article>

        {(output.tendencies.length > 0 || output.nuances.length > 0) && (
          <article className="engine-card" style={{ marginTop: 18 }}>
            <details className="engine-details">
              <summary>See additional patterns</summary>
              {output.tendencies.map((item) => (
                <div className="deep-literacy-line" key={item.id}><span>{item.id.replaceAll('-', ' ')}</span><strong>{item.score === null ? '—' : `${item.score} / 100`}</strong></div>
              ))}
              {output.nuances.map((nuance) => (
                <p className="engine-help" key={nuance.id}><strong>{nuance.name}</strong><br />{nuance.explanation}</p>
              ))}
            </details>
          </article>
        )}

        <div className="engine-result-actions">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="engine-primary-link" type="button" onClick={restartFull}>Retake Full</button>
            <Link className="engine-primary-link" href="/results">Back to Quick result</Link>
          </div>
          <span>Full is complete. CLASSIFY and UNDERSTAND are separate quizzes.</span>
        </div>
      </section>
    );
  }

  const fullProgress = beliefV2StageProgress(beliefSession, 'deep');
  const selected = currentBelief ? beliefSession.answers[currentBelief.id] : undefined;
  const localizedStatement = currentBelief
    ? locale === 'de'
      ? germanBeliefStatement(currentBelief.sourceItemId, currentBelief.polarity)
      : locale === 'es' || locale === 'fr'
        ? romanceBeliefStatement(locale, currentBelief.sourceItemId, currentBelief.polarity)
        : null
    : null;

  function chooseBelief(value: AnswerValue) {
    if (!currentBelief) return;
    saveBelief(answerBeliefV2(beliefSession, currentBelief.id, value));
  }

  function advanceBelief() {
    if (!currentBelief || beliefSession.answers[currentBelief.id] === undefined) return;
    if (index < beliefSession.deepOrder.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (!fullProgress.complete) return;
    finishFull(beliefSession);
  }

  if (!currentBelief) return null;

  return (
    <section className="engine-shell">
      <div className="engine-progress-row">
        <span>Full {fullProgress.answered} / {fullProgress.total}</span>
        <div className="engine-progress" aria-label={`${fullProgress.percent}% complete`}><span style={{ width: `${fullProgress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restartFull}>Restart Full</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker">{currentBelief.mode.toUpperCase()} · {currentBelief.construct.replaceAll('-', ' ')}</p>
        <div className="engine-statement"><p>{localizedStatement ?? currentBelief.statement}</p></div>
        <p className="engine-help">{locale === 'de' ? 'Es gibt keine politisch richtige Antwort.' : locale === 'es' ? 'No hay una respuesta política correcta.' : locale === 'fr' ? 'Il n’y a pas de bonne réponse politique.' : 'There is no correct political answer.'}</p>
        <div className="quick-scale" role="radiogroup" aria-label="Belief response">
          {agreementAnswerOptions.map((option) => (
            <button type="button" role="radio" aria-checked={selected === option.value} aria-label={option.label} className={selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'} key={String(option.value)} onClick={() => chooseBelief(option.value)}>{option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}</button>
          ))}
        </div>
        <div className="quick-scale-key"><span><b>−2</b> {locale === 'de' ? 'Nein, gar nicht' : locale === 'es' ? 'Totalmente en desacuerdo' : locale === 'fr' ? 'Pas du tout d’accord' : 'Strongly disagree'}</span><span><b>0</b> {locale === 'de' ? 'Teils teils / kommt darauf an' : locale === 'es' ? 'Neutral / depende' : locale === 'fr' ? 'Neutre / cela dépend' : 'Neither / depends'}</span><span><b>+2</b> {locale === 'de' ? 'Ja, völlig' : locale === 'es' ? 'Totalmente de acuerdo' : locale === 'fr' ? 'Tout à fait d’accord' : 'Strongly agree'}</span><span><b>?</b> {locale === 'de' ? 'Unsicher' : locale === 'es' ? 'No estoy seguro' : locale === 'fr' ? 'Je ne sais pas' : 'Not sure'}</span></div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>Previous</button>
        <span>{fullProgress.unsure ? `${fullProgress.unsure} marked not sure` : 'No unsure responses so far'}</span>
        <button type="button" onClick={advanceBelief} disabled={selected === undefined || (index === beliefSession.deepOrder.length - 1 && !fullProgress.complete)}>{index === beliefSession.deepOrder.length - 1 ? 'See Full result' : 'Next'}</button>
      </div>
    </section>
  );
}
