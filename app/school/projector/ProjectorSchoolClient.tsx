'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  localizedSchoolBeliefStatement,
  localizedSchoolLiteracyExplanation,
  localizedSchoolLiteracyOption,
  localizedSchoolLiteracyPrompt,
  type LocalizableSchoolQuestion,
} from '../../../lib/school-question-i18n';
import { useLocale, type Locale } from '../../LocaleProvider';

type AgeBand = 'junior-10-13' | 'youth-14-18';
type PublicQuestion = LocalizableSchoolQuestion & { title: string };
type PublicRoom = {
  code: string;
  status: 'active' | 'closed';
  roomLabel: string;
  joinedCount: number;
  activity: { title: string; projectorMode: 'live' | 'reveal'; ageBand: AgeBand };
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  currentQuestion: PublicQuestion | null;
  projectorDistribution: { responses: number; distribution: { id: string; label: string; count: number; percent: number }[]; correctPercent: number | null } | null;
};

function projectorCopy(locale: Locale) {
  if (locale === 'de') return { unavailable: 'Klassenraum nicht verfügbar.', loading: 'Klassenraum wird geladen…', classWord: 'Klasse', joined: 'dabei', waiting: 'Warte, bis die Lehrkraft eine Frage startet.', join: 'BEITRETEN', agree: 'Wie sehr stimmst du zu?', yourView: 'Deine Meinung', knowHow: 'Politisches Wissen', coming: 'Antworten kommen gerade an.', later: 'Die Lehrkraft zeigt die Verteilung später.', explanation: 'Erklärung' };
  if (locale === 'es') return { unavailable: 'La clase no está disponible.', loading: 'Cargando la clase…', classWord: 'Clase', joined: 'participantes', waiting: 'Espera a que el docente lance una pregunta.', join: 'ENTRAR', agree: '¿Cuánto estás de acuerdo?', yourView: 'Tu opinión', knowHow: 'Conocimientos políticos', coming: 'Están llegando respuestas.', later: 'El docente mostrará la distribución más tarde.', explanation: 'Explicación' };
  if (locale === 'fr') return { unavailable: 'La classe n’est pas disponible.', loading: 'Chargement de la classe…', classWord: 'Classe', joined: 'participants', waiting: 'Attendez que l’enseignant lance une question.', join: 'REJOINDRE', agree: 'Dans quelle mesure êtes-vous d’accord ?', yourView: 'Votre avis', knowHow: 'Repères politiques', coming: 'Les réponses arrivent.', later: 'L’enseignant affichera la distribution plus tard.', explanation: 'Explication' };
  return { unavailable: 'Classroom not available.', loading: 'Loading classroom…', classWord: 'Class', joined: 'joined', waiting: 'Waiting for the teacher to launch a question.', join: 'JOIN', agree: 'How much do you agree?', yourView: 'Your view', knowHow: 'Political know-how', coming: 'Responses are coming in.', later: 'The teacher has chosen to reveal the distribution later.', explanation: 'Explanation' };
}

const beliefScale: Record<Locale, Record<string, string>> = {
  en: { '-2': 'Strongly disagree', '-1': 'Disagree', '0': 'It depends / neither', '1': 'Agree', '2': 'Strongly agree', unsure: 'Not sure / I do not understand' },
  de: { '-2': 'Stimme gar nicht zu', '-1': 'Stimme eher nicht zu', '0': 'Kommt darauf an / weder noch', '1': 'Stimme eher zu', '2': 'Stimme voll zu', unsure: 'Unsicher / nicht verstanden' },
  es: { '-2': 'Totalmente en desacuerdo', '-1': 'Más bien en desacuerdo', '0': 'Depende / ni una cosa ni otra', '1': 'Más bien de acuerdo', '2': 'Totalmente de acuerdo', unsure: 'No estoy seguro/a / no lo entiendo' },
  fr: { '-2': 'Pas du tout d’accord', '-1': 'Plutôt pas d’accord', '0': 'Ça dépend / ni l’un ni l’autre', '1': 'Plutôt d’accord', '2': 'Tout à fait d’accord', unsure: 'Je ne sais pas / je ne comprends pas' },
};

export default function ProjectorSchoolClient({ code }: { code: string }) {
  const { locale } = useLocale();
  const copy = useMemo(() => projectorCopy(locale), [locale]);
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    let cancelled = false;
    const load = async () => {
      const response = await fetch(`/api/school/classes/${encodeURIComponent(code)}`, { cache: 'no-store' }).catch(() => null);
      if (!response?.ok) { if (!cancelled) setError(copy.unavailable); return; }
      if (!cancelled) { setRoom(await response.json() as PublicRoom); setError(''); }
    };
    void load();
    const id = window.setInterval(load, 1200);
    return () => { cancelled = true; window.clearInterval(id); };
  }, [code, copy.unavailable]);

  if (error) return <section className="engine-shell"><article className="engine-card"><h1>{error}</h1></article></section>;
  if (!room) return <section className="engine-shell"><article className="engine-card"><p>{copy.loading}</p></article></section>;

  const question = room.currentQuestion;
  const ageBand = room.activity.ageBand ?? 'youth-14-18';
  const questionText = question?.kind === 'believe'
    ? localizedSchoolBeliefStatement(locale, question)
    : question ? localizedSchoolLiteracyPrompt(locale, question, ageBand) : '';
  const heading = question ? (ageBand === 'junior-10-13' ? (question.kind === 'believe' ? copy.yourView : copy.knowHow) : question.title) : '';
  const rowLabel = (row: { id: string; label: string }) => {
    if (!question) return row.label;
    if (question.kind === 'believe') return beliefScale[locale][row.id] ?? row.label;
    return localizedSchoolLiteracyOption(locale, question, row.id, ageBand);
  };

  return (
    <section className="engine-shell school-projector-shell">
      <div className="school-room-strip"><strong>{room.roomLabel || `${copy.classWord} ${room.code}`}</strong><span>{room.activity.title}</span><span>{room.joinedCount} {copy.joined}</span></div>
      {!question ? (
        <article className="engine-card school-projector-card"><p className="engine-kicker">Politangle School</p><h1>{copy.waiting}</h1><div className="school-code-display"><span>{copy.join}</span><strong>{room.code}</strong></div></article>
      ) : (
        <article className="engine-card school-projector-card">
          <p className="engine-kicker">{question.id} · {heading}</p>
          {question.kind === 'believe' ? <><h1>{copy.agree}</h1><div className="engine-statement"><p>{questionText}</p></div></> : <h1>{questionText}</h1>}
          {room.projectorDistribution ? <div className="school-distribution school-projector-distribution">{room.projectorDistribution.distribution.map((row) => <div className="school-bar-row" key={row.id}><div className="school-bar-label"><span>{rowLabel(row)}</span><strong>{row.percent}% · {row.count}</strong></div><div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div></div>)}</div> : <div className="school-projector-wait"><strong>{copy.coming}</strong><span>{copy.later}</span></div>}
          {room.revealed && question.kind === 'literacy' && question.explanation && <div className="deep-explanation"><strong>{copy.explanation}</strong><br />{localizedSchoolLiteracyExplanation(locale, question, ageBand)}</div>}
        </article>
      )}
    </section>
  );
}
