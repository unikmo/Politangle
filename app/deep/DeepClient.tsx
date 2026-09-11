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
import { describePolitangleHome, familyMeaningText } from '../../lib/politangle-home';
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
  coherence: ReturnType<typeof assessResponseConsistencyV2>;
};

function coherenceBand(score: number | null) {
  if (score === null) return 'Not enough information';
  if (score >= 80) return 'Highly coherent';
  if (score >= 65) return 'Mostly coherent';
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

function modeDirection(score: number | null, low: string, high: string) {
  if (score === null) return 'Not enough information';
  if (score <= 24) return `Strongly ${low.toLowerCase()}`;
  if (score <= 39) return `Leans ${low.toLowerCase()}`;
  if (score <= 60) return 'Between both poles';
  if (score <= 74) return `Leans ${high.toLowerCase()}`;
  return `Strongly ${high.toLowerCase()}`;
}

function axisSentence(score: number | null, low: string, high: string) {
  if (score === null) return 'This part of your profile needs more information.';
  if (score <= 24) return `${low} is one of the strongest features of your political profile.`;
  if (score <= 39) return `You lean toward ${low.toLowerCase()} while retaining some balance.`;
  if (score <= 60) return `You are comparatively balanced between ${low.toLowerCase()} and ${high.toLowerCase()}.`;
  if (score <= 74) return `You lean toward ${high.toLowerCase()} while retaining some balance.`;
  return `${high} is one of the strongest features of your political profile.`;
}

function explainGap(think: number | null, feel: number | null, act: number | null) {
  const entries: { key: 'THINK' | 'FEEL' | 'ACT'; value: number }[] = [];
  if (think !== null) entries.push({ key: 'THINK', value: think });
  if (feel !== null) entries.push({ key: 'FEEL', value: feel });
  if (act !== null) entries.push({ key: 'ACT', value: act });
  if (entries.length < 2) return 'There are not enough comparable answers to interpret this difference.';
  if (entries.length === 2) return 'The available modes point in different directions, so this topic is more context-dependent than your overall score alone suggests.';

  const pairs = [
    { keys: ['THINK', 'FEEL'] as const, distance: Math.abs(think! - feel!) },
    { keys: ['THINK', 'ACT'] as const, distance: Math.abs(think! - act!) },
    { keys: ['FEEL', 'ACT'] as const, distance: Math.abs(feel! - act!) },
  ].sort((a, b) => a.distance - b.distance);
  const closest = pairs[0];
  const outsider = entries.find((entry) => !closest.keys.includes(entry.key as never));

  if (closest.distance <= 30 && outsider) {
    if (outsider.key === 'THINK') return 'Your stated principle is the outlier while instinct and practical choice are closer. The general rule you endorse may shift when the issue is felt or applied concretely.';
    if (outsider.key === 'FEEL') return 'Your instinctive reaction is the outlier while principle and practical choice are closer. The issue may create an emotional pull that you do not fully carry into your rule or action.';
    return 'Your practical choice is the outlier while principle and instinct are closer. Consequences, feasibility or trade-offs may change what you would actually do.';
  }

  return 'No single mode explains the gap: THINK, FEEL and ACT are spread across the scale. Treat this as a genuinely context-dependent position rather than a simple contradiction.';
}

function tendencyReading(id: string, score: number | null) {
  if (id === 'populism') {
    if (score === null) return { title: 'Political influence & representation', explanation: 'Not enough information for a stable reading.' };
    if (score >= 70) return { title: 'Political influence & representation', explanation: 'You often suspect that well-connected groups are heard more than ordinary voters. That is a populist-style signal about representation, not a political-family label.' };
    if (score <= 30) return { title: 'Political influence & representation', explanation: 'You tend to see political conflict as competition among legitimate interests and values rather than mainly as ordinary voters versus powerful groups.' };
    return { title: 'Political influence & representation', explanation: 'You combine some suspicion of unequal political influence with a belief that genuine conflicts among interests and values also matter.' };
  }

  if (score === null) return { title: 'Elected power & democratic checks', explanation: 'Not enough information for a stable reading.' };
  if (score >= 70) return { title: 'Elected power & democratic checks', explanation: 'You are relatively willing to give elected authorities more room to act, even when that can reduce some institutional checks or procedural safeguards.' };
  if (score <= 30) return { title: 'Elected power & democratic checks', explanation: 'You strongly prioritize legal safeguards, institutional checks and limits on concentrated government power, even when they slow action.' };
  return { title: 'Elected power & democratic checks', explanation: 'You balance effective elected authority with courts, opposition rights and procedural safeguards rather than consistently favoring one side.' };
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
  const size = 500;
  const center = size / 2;
  const radius = 162;
  const labelRadius = 214;
  const known = axes.map((axis) => axis.score ?? 50);
  const point = (index: number, value: number, r = radius) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / axes.length;
    const scaled = r * (value / 100);
    return [center + Math.cos(angle) * scaled, center + Math.sin(angle) * scaled] as const;
  };
  const polygon = known.map((value, index) => point(index, value)).map(([x, y]) => `${x},${y}`).join(' ');
  const rings = [25, 50, 75, 100].map((level) => axes.map((_, index) => point(index, level)).map(([x, y]) => `${x},${y}`).join(' '));

  return (
    <div className="shape-wrap compact-shape">
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
              <text className="shape-label" x={lx} y={ly} textAnchor={lx < center - 12 ? 'end' : lx > center + 12 ? 'start' : 'middle'} dominantBaseline="middle">
                <tspan x={lx} dy="-0.25em">{axis.name}</tspan>
                <tspan className="shape-axis-score" x={lx} dy="1.35em">{axis.score ?? '—'}</tspan>
              </text>
            </g>
          );
        })}
        <polygon className="shape-area" points={polygon} />
        {known.map((value, index) => {
          const [x, y] = point(index, value);
          return <circle key={axes[index].id} className="shape-dot" cx={x} cy={y} r="5" />;
        })}
      </svg>
      <p className="shape-scale-note">Each spoke is one political dimension. Your political home comes from the overall pattern—not simply from whichever spoke happens to be longest.</p>
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
    coherence: assessResponseConsistencyV2(canonicalAnswers),
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
    const home = describePolitangleHome(output.families, output.polygon, true);
    const people = home.primary ? referencePeople(home.primary.id) : [];
    const topFamilies = [home.primary, home.secondary, home.tertiary].filter((family): family is NonNullable<typeof family> => Boolean(family && family.overall !== null));
    const gaps = output.thinkPolygon.map((axis, axisIndex) => {
      const think = axis.score;
      const feel = output.feelPolygon[axisIndex]?.score ?? null;
      const act = output.actPolygon[axisIndex]?.score ?? null;
      const known = [think, feel, act].filter((value): value is number => value !== null);
      return { ...axis, think, feel, act, gap: known.length > 1 ? Math.max(...known) - Math.min(...known) : 0 };
    }).sort((a, b) => b.gap - a.gap);
    const meaningfulGaps = gaps.filter((gap) => gap.gap >= 20).slice(0, 3);

    return (
      <section className="engine-shell result-shell">
        <article className="engine-card politangle-home-card">
          <p className="engine-kicker">Your Politangle · Full</p>
          <h1>{home.headline}</h1>
          <p className="result-lede">{home.summary}</p>

          <div className="politangle-family-story" aria-label="Your political home">
            {topFamilies.map((family, familyIndex) => (
              <p key={family.id}>
                <strong>{familyIndex === 0 ? 'Main home' : familyIndex === 1 ? 'Significant leaning' : 'Additional influence'} · {family.name} · {family.overall}/100</strong>
                <span>{familyMeaningText(family.id)}.</span>
              </p>
            ))}
          </div>

          {people.length > 0 && home.primary && (
            <p className="home-reference"><strong>Historical reference points for {home.primary.name}:</strong> {people.join(' · ')}. They illustrate the tradition, not your exact personal profile.</p>
          )}

          <PoliticalShape axes={output.polygon} />
        </article>

        <article className="engine-card result-story-card compact-result-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">What defines your political home</p>
          <h2>The strongest edges of your profile.</h2>
          <div className="result-insight-grid">
            {home.strongestAxes.map((axis) => (
              <section key={axis.id} className="result-insight">
                <strong>{axis.name}</strong>
                <span>{axis.score} / 100</span>
                <p>{axisSentence(axis.score, axis.low, axis.high)}</p>
              </section>
            ))}
          </div>
        </article>

        <article className="engine-card compact-result-card coherence-card" style={{ marginTop: 18 }}>
          <p className="engine-kicker">Response coherence</p>
          <div className="consistency-hero">
            <strong>{output.coherence.score ?? '—'}<small>/100</small></strong>
            <div>
              <h2>{coherenceBand(output.coherence.score)}</h2>
              <p>The score is only the summary. The useful part is seeing where your principle, instinct and practical choice move apart.</p>
            </div>
          </div>
          <p className="engine-help">Coherence is not a knowledge, intelligence, honesty or conviction score. Differences can reflect genuine nuance, uncertainty or changing trade-offs.</p>

          {meaningfulGaps.length > 0 ? (
            <div className="coherence-gap-list">
              {meaningfulGaps.map((gap, gapIndex) => (
                <section className="coherence-gap-card" key={gap.id}>
                  <div className="coherence-gap-head">
                    <strong>{gapIndex === 0 ? 'Biggest shift' : 'Another shift'} · {gap.name}</strong>
                    <span>{gap.gap}-point spread</span>
                  </div>
                  <div className="coherence-mode-grid">
                    <div><b>THINK</b><strong>{gap.think ?? '—'}</strong><span>{modeDirection(gap.think, gap.low, gap.high)}</span></div>
                    <div><b>FEEL</b><strong>{gap.feel ?? '—'}</strong><span>{modeDirection(gap.feel, gap.low, gap.high)}</span></div>
                    <div><b>ACT</b><strong>{gap.act ?? '—'}</strong><span>{modeDirection(gap.act, gap.low, gap.high)}</span></div>
                  </div>
                  <p><b>What may explain the gap:</b> {explainGap(gap.think, gap.feel, gap.act)}</p>
                </section>
              ))}
            </div>
          ) : (
            <div className="result-tension coherence-steady">
              <strong>No large principle–instinct–choice shifts stand out.</strong>
              <p>Your THINK, FEEL and ACT positions stay within 20 points of one another across the eight dimensions.</p>
            </div>
          )}
        </article>

        <details className="engine-card result-details-card" style={{ marginTop: 18 }}>
          <summary>See all eight political axes</summary>
          <div className="engine-results compact-axis-results">
            {output.polygon.map((axis) => (
              <section className="engine-dimension" key={axis.id}>
                <div className="engine-dimension-head"><strong>{axis.name}</strong><span>{directionLabel(axis.score, axis.low, axis.high)}</span></div>
                <div className="engine-poles"><span>{axis.low}</span><span>{axis.high}</span></div>
                <div className="engine-score-track">{axis.score !== null && <span style={{ left: `${axis.score}%` }} />}</div>
              </section>
            ))}
          </div>
        </details>

        {(output.tendencies.length > 0 || output.nuances.length > 0) && (
          <article className="engine-card compact-result-card political-style-card" style={{ marginTop: 18 }}>
            <p className="engine-kicker">Power & political style</p>
            <h2>Patterns that do not fit neatly into one axis.</h2>
            <p className="result-lede">These patterns describe how you think about representation and political power. They add context to your main Politangle; they are not separate political homes.</p>
            <div className="tendency-grid">
              {output.tendencies.map((item) => {
                const reading = tendencyReading(item.id, item.score);
                return (
                  <section className="tendency-card" key={item.id}>
                    <div><strong>{reading.title}</strong><span>{item.score === null ? '—' : `${item.score}/100`}</span></div>
                    <p>{reading.explanation}</p>
                  </section>
                );
              })}
            </div>
            {output.nuances.length > 0 && (
              <div className="nuance-readings">
                <strong>Specific combinations in your answers</strong>
                {output.nuances.map((nuance) => (
                  <p key={nuance.id}><b>{nuance.name}.</b> {nuance.explanation}</p>
                ))}
              </div>
            )}
          </article>
        )}

        <div className="engine-result-actions">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="engine-primary-link" type="button" onClick={restartFull}>Retake Full</button>
            <Link className="engine-primary-link" href="/results">Back to Quick result</Link>
          </div>
          <span>Your Full Politangle is complete. CLASSIFY and UNDERSTAND are available whenever you want to test political knowledge.</span>
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
