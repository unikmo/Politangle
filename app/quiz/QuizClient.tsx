'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  answerBeliefV2,
  beliefV2StageProgress,
  createBeliefV2Session,
  firstUnansweredIndex,
  getBeliefV2Item,
  parseBeliefV2Session,
  type BeliefV2Session,
} from '../../lib/belief-v2-session';
import { agreementAnswerOptions, type AnswerValue } from '../../lib/questions';
import { germanBeliefStatement } from '../../lib/german-believe';
import { expandBeliefItems } from '../../lib/belief-statements';
import { schoolYouthBeliefItems } from '../../lib/school-believe';
import { useLocale } from '../LocaleProvider';

export const BELIEF_SESSION_KEY = 'politangle.believe.v2.session';
const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';

function constructLabel(construct: string) {
  if (construct === 'nationhood-membership') return 'Nationhood';
  return construct.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

const simpleTopics: Record<string, string> = {
  'public-provision': 'Essential services', redistribution: 'Income gap', ownership: 'Business ownership',
  'social-change': 'Social change', 'personal-autonomy': 'Personal freedom', abortion: 'Abortion',
  'authority-order': 'Safety and freedom', pluralism: 'Checks on government', 'world-sovereignty': 'Countries working together',
  'nationhood-membership': 'Belonging', populism: 'People and elites', 'ecology-growth': 'Environment and growth',
  'religion-public-role': 'Religion and law', subsidiarity: 'Local or national',
};
const youthStatements = new Map(expandBeliefItems(schoolYouthBeliefItems).map((item) => [item.id, item.statement]));

const germanConstructs: Record<string, string> = {
  'public-provision': 'Öffentliche Daseinsvorsorge', redistribution: 'Umverteilung', ownership: 'Eigentum', 'social-change': 'Gesellschaftlicher Wandel',
  'personal-autonomy': 'Persönliche Autonomie', abortion: 'Schwangerschaftsabbruch', 'authority-order': 'Freiheit und Ordnung', pluralism: 'Pluralismus',
  'world-sovereignty': 'Internationale Zusammenarbeit', 'nationhood-membership': 'Zugehörigkeit zur Nation', populism: 'Populismus',
  'ecology-growth': 'Ökologie und Wachstum', 'religion-public-role': 'Religion im öffentlichen Raum', subsidiarity: 'Subsidiarität',
};

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

export default function QuizClient() {
  const { locale } = useLocale();
  const router = useRouter();
  const [session, setSession] = useState<BeliefV2Session | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const restored = parseBeliefV2Session(sessionStorage.getItem(BELIEF_SESSION_KEY));
    const initial = restored ?? createBeliefV2Session(newSeed());
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(initial));
    setSession(initial);

    const firstUnanswered = firstUnansweredIndex(initial, 'quick');
    setIndex(firstUnanswered ?? initial.quickOrder.length - 1);
  }, []);

  const current = useMemo(() => {
    if (!session) return null;
    return getBeliefV2Item(session.quickOrder[index]);
  }, [session, index]);

  if (!session || !current) {
    return <section className="engine-card"><p>Loading assessment…</p></section>;
  }

  const progress = beliefV2StageProgress(session, 'quick');
  const selected = session.answers[current.id];

  function save(next: BeliefV2Session) {
    sessionStorage.setItem(BELIEF_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function choose(displayedValue: AnswerValue) {
    const next = answerBeliefV2(session, current.id, displayedValue);
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
        <button type="button" className="engine-link-button" onClick={restart}>{locale === 'de' ? 'Neu starten' : 'Restart'}</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker quick-topic">{current.mode === 'act' ? (locale === 'de' ? 'IN DER PRAXIS · ' : 'IN PRACTICE · ') : ''}{locale === 'de' ? germanConstructs[current.construct] ?? constructLabel(current.construct) : simpleTopics[current.construct] ?? constructLabel(current.construct)}</p>
        <h1>{locale === 'de' ? 'Stimmen Sie zu?' : 'Do you agree?'}</h1>
        <div className="engine-statement"><p>{locale === 'de' ? germanBeliefStatement(current.sourceItemId, current.polarity) ?? current.statement : youthStatements.get(current.id) ?? current.statement}</p></div>
        <div className="quick-scale" role="radiogroup" aria-label="Response">
          {agreementAnswerOptions.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={selected === option.value}
              aria-label={locale === 'de' ? ({ '-2': 'Stimme gar nicht zu', '-1': 'Stimme eher nicht zu', '0': 'Neutral oder kommt darauf an', '1': 'Stimme eher zu', '2': 'Stimme voll zu', unsure: 'Unsicher oder nicht verstanden' } as Record<string,string>)[String(option.value)] : option.label}
              className={selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'}
              key={String(option.value)}
              onClick={() => choose(option.value)}
            >
              {option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}
            </button>
          ))}
        </div>
        <div className="quick-scale-key">
          <span><b>−2</b> {locale === 'de' ? 'Stimme gar nicht zu' : 'Strongly disagree'}</span>
          <span><b>0</b> {locale === 'de' ? 'Neutral / kommt darauf an' : 'Neither / depends'}</span>
          <span><b>+2</b> {locale === 'de' ? 'Stimme voll zu' : 'Strongly agree'}</span>
          <span><b>?</b> {locale === 'de' ? 'Unsicher' : 'Not sure'}</span>
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{locale === 'de' ? 'Zurück' : 'Previous'}</button>
        <span>{progress.unsure ? (locale === 'de' ? `${progress.unsure} als unsicher markiert` : `${progress.unsure} marked not sure`) : (locale === 'de' ? 'Bisher keine unsicheren Antworten' : 'No unsure responses so far')}</span>
        {index === session.quickOrder.length - 1 ? (
          progress.complete ? <button type="button" onClick={finish}>{locale === 'de' ? 'Quick-Ergebnis anzeigen' : 'See Quick result'}</button> :
          <button type="button" onClick={() => setIndex(firstUnansweredIndex(session, 'quick') ?? index)}>{locale === 'de' ? 'Fehlende Frage beantworten' : 'Answer missing question'}</button>
        ) : (
          <button type="button" disabled={selected === undefined} onClick={() => setIndex((value) => Math.min(session.quickOrder.length - 1, value + 1))}>{locale === 'de' ? 'Weiter' : 'Next'}</button>
        )}
      </div>
    </section>
  );
}
