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
import { romanceBeliefStatement } from '../../lib/romance-believe';
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
  'nationhood-membership': 'Belonging', populism: 'Political influence', 'ecology-growth': 'Environment and growth',
  'religion-public-role': 'Religion and law', subsidiarity: 'Local or national / regional',
};

const germanConstructs: Record<string, string> = {
  'public-provision': 'Wichtige Angebote', redistribution: 'Arm und Reich', ownership: 'Unternehmen', 'social-change': 'Gesellschaftlicher Wandel',
  'personal-autonomy': 'Persönliche Freiheit', abortion: 'Schwangerschaftsabbruch', 'authority-order': 'Sicherheit und Freiheit', pluralism: 'Kontrolle der Regierung',
  'world-sovereignty': 'Zusammenarbeit der Länder', 'nationhood-membership': 'Zugehörigkeit', populism: 'Politischer Einfluss',
  'ecology-growth': 'Umwelt und Wachstum', 'religion-public-role': 'Religion und Gesetze', subsidiarity: 'Lokal oder national / regional',
};
const spanishConstructs: Record<string, string> = {
  'public-provision':'Servicios esenciales', redistribution:'Ricos y pobres', ownership:'Empresas', 'social-change':'Cambio social', 'personal-autonomy':'Libertad personal', abortion:'Aborto', 'authority-order':'Seguridad y libertad', pluralism:'Control del gobierno', 'world-sovereignty':'Cooperación entre países', 'nationhood-membership':'Pertenencia', populism:'Influencia política', 'ecology-growth':'Ambiente y crecimiento', 'religion-public-role':'Religión y leyes', subsidiarity:'Local o nacional / regional',
};
const frenchConstructs: Record<string, string> = {
  'public-provision':'Services essentiels', redistribution:'Riches et pauvres', ownership:'Entreprises', 'social-change':'Changement social', 'personal-autonomy':'Liberté personnelle', abortion:'Avortement', 'authority-order':'Sécurité et liberté', pluralism:'Contrôle du gouvernement', 'world-sovereignty':'Coopération entre pays', 'nationhood-membership':'Appartenance', populism:'Influence politique', 'ecology-growth':'Environnement et croissance', 'religion-public-role':'Religion et lois', subsidiarity:'Local ou national / régional',
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
  const ui = locale === 'de' ? {
    topicPrefix: 'IN DER PRAXIS · ', restart: 'Neu starten', previous: 'Zurück', next: 'Weiter', result: 'Quick-Ergebnis anzeigen', missing: 'Fehlende Frage beantworten', none: 'Bisher keine unsicheren Antworten', marked: 'als unsicher markiert',
    labels: ['Nein, gar nicht','Eher nicht','Teils teils oder kommt darauf an','Eher ja','Ja, völlig','Unsicher oder nicht verstanden'], key: ['Nein, gar nicht','Teils teils / kommt darauf an','Ja, völlig','Unsicher'],
  } : locale === 'es' ? {
    topicPrefix: 'EN LA PRÁCTICA · ', restart: 'Reiniciar', previous: 'Anterior', next: 'Siguiente', result: 'Ver resultado Quick', missing: 'Responder pregunta pendiente', none: 'Ninguna respuesta insegura', marked: 'marcadas como inseguras',
    labels: ['Totalmente en desacuerdo','En desacuerdo','Ni de acuerdo ni en desacuerdo / depende','De acuerdo','Totalmente de acuerdo','No estoy seguro o no lo entiendo'], key: ['Totalmente en desacuerdo','Neutral / depende','Totalmente de acuerdo','No estoy seguro'],
  } : locale === 'fr' ? {
    topicPrefix: 'EN PRATIQUE · ', restart: 'Recommencer', previous: 'Précédent', next: 'Suivant', result: 'Voir le résultat Quick', missing: 'Répondre à la question manquante', none: 'Aucune réponse incertaine', marked: 'marquées comme incertaines',
    labels: ['Pas du tout d’accord','Pas d’accord','Ni d’accord ni pas d’accord / cela dépend','D’accord','Tout à fait d’accord','Je ne sais pas ou je ne comprends pas'], key: ['Pas du tout d’accord','Neutre / cela dépend','Tout à fait d’accord','Je ne sais pas'],
  } : {
    topicPrefix: 'IN PRACTICE · ', restart: 'Restart', previous: 'Previous', next: 'Next', result: 'See Quick result', missing: 'Answer missing question', none: 'No unsure responses so far', marked: 'marked not sure',
    labels: agreementAnswerOptions.map((option) => option.label), key: ['Strongly disagree','Neither / depends','Strongly agree','Not sure'],
  };
  const localizedStatement = locale === 'de'
    ? germanBeliefStatement(current.sourceItemId, current.polarity)
    : locale === 'es' || locale === 'fr'
      ? romanceBeliefStatement(locale, current.sourceItemId, current.polarity)
      : null;

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
        <button type="button" className="engine-link-button" onClick={restart}>{ui.restart}</button>
      </div>

      <article className="engine-card">
        <p className="engine-kicker quick-topic">{current.mode === 'act' ? ui.topicPrefix : ''}{(locale === 'de' ? germanConstructs : locale === 'es' ? spanishConstructs : locale === 'fr' ? frenchConstructs : simpleTopics)[current.construct] ?? constructLabel(current.construct)}</p>
        <div className="engine-statement"><p>{localizedStatement ?? current.statement}</p></div>
        <div className="quick-scale" role="radiogroup" aria-label="Response">
          {agreementAnswerOptions.map((option) => (
            <button
              type="button"
              role="radio"
              aria-checked={selected === option.value}
              aria-label={ui.labels[agreementAnswerOptions.indexOf(option)]}
              className={selected === option.value ? 'quick-scale-answer selected' : 'quick-scale-answer'}
              key={String(option.value)}
              onClick={() => choose(option.value)}
            >
              {option.value === 'unsure' ? '?' : option.value > 0 ? `+${option.value}` : String(option.value).replace('-', '−')}
            </button>
          ))}
        </div>
        <div className="quick-scale-key">
          <span><b>−2</b> {ui.key[0]}</span><span><b>0</b> {ui.key[1]}</span><span><b>+2</b> {ui.key[2]}</span><span><b>?</b> {ui.key[3]}</span>
        </div>
      </article>

      <div className="engine-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{ui.previous}</button>
        <span>{progress.unsure ? `${progress.unsure} ${ui.marked}` : ui.none}</span>
        {index === session.quickOrder.length - 1 ? (
          progress.complete ? <button type="button" onClick={finish}>{ui.result}</button> :
          <button type="button" onClick={() => setIndex(firstUnansweredIndex(session, 'quick') ?? index)}>{ui.missing}</button>
        ) : (
          <button type="button" disabled={selected === undefined} onClick={() => setIndex((value) => Math.min(session.quickOrder.length - 1, value + 1))}>{ui.next}</button>
        )}
      </div>
    </section>
  );
}
