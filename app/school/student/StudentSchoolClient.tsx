'use client';

import { useEffect, useMemo, useState } from 'react';
import type { LiteracyQuestion } from '../../../lib/deep-engine';
import { germanBeliefStatement } from '../../../lib/german-believe';
import { romanceBeliefStatement } from '../../../lib/romance-believe';
import { publicLiteracyExplanation, publicLiteracyOption, publicLiteracyPrompt } from '../../../lib/public-literacy-i18n';
import { schoolJuniorLiteracyExplanation, schoolJuniorLiteracyOption, schoolJuniorLiteracyPrompt } from '../../../lib/school-junior-literacy';
import { useLocale, type Locale } from '../../LocaleProvider';

type SchoolAgeBand = 'junior-10-13' | 'youth-14-18';

type ClassroomQuestion = {
  id: string;
  kind: 'believe' | 'literacy';
  title: string;
  construct?: string;
  mode?: string;
  sourceItemId?: string;
  polarity?: 'negative' | 'positive';
  section?: string;
  statement?: string;
  prompt?: string;
  multiSelect?: boolean;
  options: readonly { id: string; label: string }[];
  explanation?: string;
  acceptedAnswerSets?: readonly (readonly string[])[];
};

type Distribution = {
  id: string;
  kind: string;
  title: string;
  responses: number;
  distribution: { id: string; label: string; count: number; percent: number }[];
  correct: number | null;
  correctPercent: number | null;
};

type PublicRoom = {
  code: string;
  status: 'active' | 'closed';
  active: boolean;
  roomLabel: string;
  joinedCount: number;
  activity: { type: string; title: string; questionIds: string[]; pacing: 'teacher' | 'student'; projectorMode: 'live' | 'reveal'; ageBand: SchoolAgeBand; lessonId?: string };
  currentIndex: number;
  currentQuestionId: string | null;
  questionOpen: boolean;
  revealed: boolean;
  currentQuestion: ClassroomQuestion | null;
  activityQuestions: ClassroomQuestion[];
  projectorDistribution: Distribution | null;
};

const CODE_KEY = 'politangle.school.classroom.code';
function tokenKey(code: string) { return `politangle.school.classroom.token.${code}`; }
function answerKey(code: string) { return `politangle.school.classroom.local.${code}`; }

function studentCopy(locale: Locale) {
  if (locale === 'de') return {
    joinKicker: 'Klassenraum beitreten', joinTitle: 'Gib den Raumcode ein.', joinHelp: 'Du brauchst keinen Namen und keine E-Mail. Deine Lehrkraft sieht die Antworten der Klasse, aber nicht, welche Antwort von dir ist.', codeLabel: 'Raumcode', join: 'Anonym beitreten', joining: 'Beitritt…', codeError: 'Gib den sechsstelligen Raumcode ein.', roomMissing: 'Dieser Klassenraum wurde nicht gefunden.', roomClosed: 'Dieser Klassenraum ist geschlossen.', joinError: 'Beitritt nicht möglich. Bitte prüfe den Code oder frage deine Lehrkraft.', joined: 'Du bist anonym dabei. Deine Lehrkraft sieht nur die Ergebnisse der Klasse.', loading: 'Klassenraum wird geladen…',
    classWord: 'Klasse', joinedCount: 'dabei', sessionEnded: 'Aktivität beendet', closedTitle: 'Diese Klassenaktivität ist beendet.', closedBody: 'Deine Antworten wurden nur zur Klassenübersicht hinzugefügt.', complete: 'Fertig', completeTitle: (n: number) => `Alle ${n} Antworten sind abgegeben.`, completeBody: 'Deine Lehrkraft erhält die Ergebnisse der Klasse, keinen persönlichen Bericht über dich.',
    liveQuestion: (n: number) => `Live-Frage ${n}`, questionOf: (n: number, total: number) => `Frage ${n} von ${total}`, yourView: 'Deine Meinung', politicalKnowHow: 'Politisches Wissen', noCorrect: 'Es gibt keine politisch richtige Antwort.', submit: 'Anonym abgeben', submitting: 'Wird gesendet…', submitError: 'Deine Antwort konnte nicht gesendet werden. Bitte versuche es noch einmal.', received: 'Antwort angekommen.', receivedBody: 'Deine Antwort wurde zur Klassenübersicht hinzugefügt.', waitingClass: 'Warte auf die Klasse oder deine Lehrkraft.', waitingOpen: 'Warte, bis deine Lehrkraft diese Frage öffnet.', roomAnswers: 'So hat die Klasse geantwortet', explanation: 'Erklärung', previous: 'Zurück', next: 'Weiter', submitted: 'abgegeben', lobby: 'Warteraum', youreIn: 'Du bist drin.', waitingNext: 'Warte, bis deine Lehrkraft die nächste Frage startet.',
  };
  if (locale === 'es') return {
    joinKicker: 'Entrar en clase', joinTitle: 'Escribe el código de la sala.', joinHelp: 'No necesitas nombre ni correo. Tu docente ve las respuestas de la clase, pero no qué respuesta es la tuya.', codeLabel: 'Código de la sala', join: 'Entrar de forma anónima', joining: 'Entrando…', codeError: 'Escribe el código de seis caracteres.', roomMissing: 'No encontramos esta clase.', roomClosed: 'Esta clase está cerrada.', joinError: 'No se pudo entrar. Comprueba el código o pregunta a tu docente.', joined: 'Has entrado de forma anónima. Tu docente solo ve los resultados de la clase.', loading: 'Cargando la clase…',
    classWord: 'Clase', joinedCount: 'participantes', sessionEnded: 'Actividad terminada', closedTitle: 'Esta actividad de clase ha terminado.', closedBody: 'Tus respuestas solo se añadieron al resultado conjunto de la clase.', complete: 'Terminado', completeTitle: (n: number) => `Has enviado las ${n} respuestas.`, completeBody: 'Tu docente recibe los resultados de la clase, no un informe personal sobre ti.',
    liveQuestion: (n: number) => `Pregunta en directo ${n}`, questionOf: (n: number, total: number) => `Pregunta ${n} de ${total}`, yourView: 'Tu opinión', politicalKnowHow: 'Conocimientos políticos', noCorrect: 'No hay una respuesta política correcta.', submit: 'Enviar de forma anónima', submitting: 'Enviando…', submitError: 'No se pudo enviar tu respuesta. Inténtalo de nuevo.', received: 'Respuesta recibida.', receivedBody: 'Tu respuesta se añadió al resultado conjunto de la clase.', waitingClass: 'Espera a la clase o a tu docente.', waitingOpen: 'Espera a que tu docente abra esta pregunta.', roomAnswers: 'Así respondió la clase', explanation: 'Explicación', previous: 'Anterior', next: 'Siguiente', submitted: 'enviadas', lobby: 'Sala de espera', youreIn: 'Ya estás dentro.', waitingNext: 'Espera a que tu docente lance la siguiente pregunta.',
  };
  if (locale === 'fr') return {
    joinKicker: 'Rejoindre la classe', joinTitle: 'Entre le code de la salle.', joinHelp: 'Tu n’as besoin ni de nom ni d’e-mail. Ton enseignant voit les réponses de la classe, pas laquelle est la tienne.', codeLabel: 'Code de la salle', join: 'Rejoindre anonymement', joining: 'Connexion…', codeError: 'Entre le code à six caractères.', roomMissing: 'Cette classe est introuvable.', roomClosed: 'Cette classe est fermée.', joinError: 'Impossible de rejoindre la classe. Vérifie le code ou demande à ton enseignant.', joined: 'Tu as rejoint la classe anonymement. Ton enseignant ne voit que les résultats de la classe.', loading: 'Chargement de la classe…',
    classWord: 'Classe', joinedCount: 'participants', sessionEnded: 'Activité terminée', closedTitle: 'Cette activité de classe est terminée.', closedBody: 'Tes réponses ont seulement été ajoutées au résultat collectif de la classe.', complete: 'Terminé', completeTitle: (n: number) => `Les ${n} réponses ont été envoyées.`, completeBody: 'Ton enseignant reçoit les résultats de la classe, pas un rapport personnel sur toi.',
    liveQuestion: (n: number) => `Question en direct ${n}`, questionOf: (n: number, total: number) => `Question ${n} sur ${total}`, yourView: 'Ton avis', politicalKnowHow: 'Repères politiques', noCorrect: 'Il n’y a pas de bonne réponse politique.', submit: 'Envoyer anonymement', submitting: 'Envoi…', submitError: 'Ta réponse n’a pas pu être envoyée. Réessaie.', received: 'Réponse reçue.', receivedBody: 'Ta réponse a été ajoutée au résultat collectif de la classe.', waitingClass: 'Attends la classe ou ton enseignant.', waitingOpen: 'Attends que ton enseignant ouvre cette question.', roomAnswers: 'Voici comment la classe a répondu', explanation: 'Explication', previous: 'Précédent', next: 'Suivant', submitted: 'envoyées', lobby: 'Salle d’attente', youreIn: 'Tu es connecté.', waitingNext: 'Attends que ton enseignant lance la prochaine question.',
  };
  return {
    joinKicker: 'Join classroom', joinTitle: 'Enter the room code.', joinHelp: 'You do not need a name or email. Your teacher sees how the class answers, not which answer is yours.', codeLabel: 'Room code', join: 'Join anonymously', joining: 'Joining…', codeError: 'Enter the six-character room code.', roomMissing: 'We could not find this classroom.', roomClosed: 'This classroom is closed.', joinError: 'Could not join. Check the code or ask your teacher.', joined: 'You joined anonymously. Your teacher only sees the class results.', loading: 'Loading classroom…',
    classWord: 'Class', joinedCount: 'joined', sessionEnded: 'Activity ended', closedTitle: 'This classroom activity is finished.', closedBody: 'Your answers were only added to the class result.', complete: 'Finished', completeTitle: (n: number) => `All ${n} answers are submitted.`, completeBody: 'Your teacher receives the class results, not a personal report about you.',
    liveQuestion: (n: number) => `Live question ${n}`, questionOf: (n: number, total: number) => `Question ${n} of ${total}`, yourView: 'Your view', politicalKnowHow: 'Political know-how', noCorrect: 'There is no correct political answer.', submit: 'Submit anonymously', submitting: 'Submitting…', submitError: 'Your answer could not be sent. Please try again.', received: 'Answer received.', receivedBody: 'Your answer was added to the class result.', waitingClass: 'Waiting for the class or your teacher.', waitingOpen: 'Wait for your teacher to open this question.', roomAnswers: 'How the class answered', explanation: 'Explanation', previous: 'Previous', next: 'Next', submitted: 'submitted', lobby: 'Waiting room', youreIn: 'You’re in.', waitingNext: 'Wait for your teacher to start the next question.',
  };
}

const youthScale: Record<Locale, Record<string, string>> = {
  en: { '-2': 'Strongly disagree', '-1': 'Disagree', '0': 'It depends / neither', '1': 'Agree', '2': 'Strongly agree', unsure: 'Not sure / I do not understand' },
  de: { '-2': 'Stimme gar nicht zu', '-1': 'Stimme eher nicht zu', '0': 'Kommt darauf an / weder noch', '1': 'Stimme eher zu', '2': 'Stimme voll zu', unsure: 'Unsicher / ich verstehe es nicht' },
  es: { '-2': 'Totalmente en desacuerdo', '-1': 'Más bien en desacuerdo', '0': 'Depende / ni una cosa ni otra', '1': 'Más bien de acuerdo', '2': 'Totalmente de acuerdo', unsure: 'No estoy seguro/a / no lo entiendo' },
  fr: { '-2': 'Pas du tout d’accord', '-1': 'Plutôt pas d’accord', '0': 'Ça dépend / ni l’un ni l’autre', '1': 'Plutôt d’accord', '2': 'Tout à fait d’accord', unsure: 'Je ne sais pas / je ne comprends pas' },
};

const juniorScale: Record<Locale, Record<string, string>> = {
  en: { '-2': 'No, definitely not', '-1': 'Mostly no', '0': 'It depends', '1': 'Mostly yes', '2': 'Yes, definitely', unsure: 'I’m not sure / I don’t understand' },
  de: { '-2': 'Nein, ganz sicher nicht', '-1': 'Eher nein', '0': 'Kommt darauf an', '1': 'Eher ja', '2': 'Ja, ganz sicher', unsure: 'Ich bin unsicher / verstehe es nicht' },
  es: { '-2': 'No, seguro que no', '-1': 'Más bien no', '0': 'Depende', '1': 'Más bien sí', '2': 'Sí, seguro', unsure: 'No estoy seguro/a / no lo entiendo' },
  fr: { '-2': 'Non, pas du tout', '-1': 'Plutôt non', '0': 'Ça dépend', '1': 'Plutôt oui', '2': 'Oui, tout à fait', unsure: 'Je ne sais pas / je ne comprends pas' },
};

function localizedBeliefStatement(locale: Locale, question: ClassroomQuestion) {
  if (!question.sourceItemId || !question.polarity) return question.statement ?? '';
  if (locale === 'de') return germanBeliefStatement(question.sourceItemId, question.polarity) ?? question.statement ?? '';
  if (locale === 'es' || locale === 'fr') return romanceBeliefStatement(locale, question.sourceItemId, question.polarity) ?? question.statement ?? '';
  return question.statement ?? '';
}

function localizedLiteracyPrompt(locale: Locale, question: ClassroomQuestion, isJunior: boolean) {
  const typed = question as LiteracyQuestion;
  return isJunior ? schoolJuniorLiteracyPrompt(locale, typed) : publicLiteracyPrompt(locale, typed);
}

function localizedLiteracyOption(locale: Locale, question: ClassroomQuestion, optionId: string, isJunior: boolean) {
  const typed = question as LiteracyQuestion;
  return isJunior ? schoolJuniorLiteracyOption(locale, typed, optionId) : publicLiteracyOption(locale, typed, optionId);
}

function localizedLiteracyExplanation(locale: Locale, question: ClassroomQuestion, isJunior: boolean) {
  const typed = question as LiteracyQuestion;
  return isJunior ? schoolJuniorLiteracyExplanation(locale, typed) : publicLiteracyExplanation(locale, typed);
}

function DistributionChart({ data, optionLabel }: { data: Distribution; optionLabel: (id: string, fallback: string) => string }) {
  return (
    <div className="school-distribution">
      {data.distribution.map((row) => (
        <div className="school-bar-row" key={row.id}>
          <div className="school-bar-label"><span>{optionLabel(row.id, row.label)}</span><strong>{row.percent}% · {row.count}</strong></div>
          <div className="school-bar-track"><span style={{ width: `${row.percent}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

export default function StudentSchoolClient({ initialCode }: { initialCode: string }) {
  const { locale } = useLocale();
  const copy = useMemo(() => studentCopy(locale), [locale]);
  const [entryCode, setEntryCode] = useState(initialCode.toUpperCase());
  const [code, setCode] = useState('');
  const [token, setToken] = useState('');
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [studentIndex, setStudentIndex] = useState(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string | string[]>>({});
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem(CODE_KEY) ?? '';
    if (!initialCode && stored) setEntryCode(stored);
  }, [initialCode]);

  useEffect(() => {
    if (!code || !token) return;
    let cancelled = false;
    const refresh = async () => {
      const response = await fetch(`/api/school/classes/${encodeURIComponent(code)}`, { cache: 'no-store' }).catch(() => null);
      if (!cancelled && response?.ok) setRoom(await response.json() as PublicRoom);
    };
    void refresh();
    const id = window.setInterval(refresh, 1200);
    return () => { cancelled = true; window.clearInterval(id); };
  }, [code, token]);

  async function join() {
    const normalized = entryCode.trim().toUpperCase();
    if (normalized.length !== 6) { setMessage(copy.codeError); return; }
    setBusy(true);
    setMessage(copy.joining);
    const status = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}`, { cache: 'no-store' }).catch(() => null);
    if (!status?.ok) { setBusy(false); setMessage(copy.roomMissing); return; }
    const preview = await status.json() as PublicRoom;
    if (!preview.active) { setBusy(false); setMessage(copy.roomClosed); return; }
    let nextToken = sessionStorage.getItem(tokenKey(normalized)) ?? '';
    if (!nextToken) {
      nextToken = crypto.randomUUID();
      sessionStorage.setItem(tokenKey(normalized), nextToken);
    }
    const response = await fetch(`/api/school/classes/${encodeURIComponent(normalized)}/join`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ participantToken: nextToken }),
    }).catch(() => null);
    if (!response?.ok) { setBusy(false); setMessage(copy.joinError); return; }
    const saved = JSON.parse(sessionStorage.getItem(answerKey(normalized)) ?? '{}') as { answers?: Record<string, string | string[]>; submitted?: string[] };
    setLocalAnswers(saved.answers ?? {});
    setSubmittedIds(saved.submitted ?? []);
    sessionStorage.setItem(CODE_KEY, normalized);
    setCode(normalized);
    setToken(nextToken);
    setRoom(preview);
    setMessage(copy.joined);
    setBusy(false);
  }

  function saveLocal(nextAnswers: Record<string, string | string[]>, nextSubmitted = submittedIds) {
    setLocalAnswers(nextAnswers);
    setSubmittedIds(nextSubmitted);
    if (code) sessionStorage.setItem(answerKey(code), JSON.stringify({ answers: nextAnswers, submitted: nextSubmitted }));
  }

  const question = useMemo(() => {
    if (!room) return null;
    if (room.activity.pacing === 'teacher') return room.currentQuestion;
    return room.activityQuestions[studentIndex] ?? null;
  }, [room, studentIndex]);

  const selected = question ? localAnswers[question.id] : undefined;
  const alreadySubmitted = question ? submittedIds.includes(question.id) : false;
  const isJunior = room?.activity.ageBand === 'junior-10-13';
  const scale = isJunior ? juniorScale[locale] : youthScale[locale];

  function choose(optionId: string) {
    if (!question || alreadySubmitted) return;
    let answer: string | string[];
    if (question.kind === 'believe') answer = optionId;
    else if (question.multiSelect) {
      const existing = Array.isArray(selected) ? selected : [];
      answer = existing.includes(optionId) ? existing.filter((id) => id !== optionId) : [...existing, optionId];
    } else answer = [optionId];
    if (Array.isArray(answer) && !answer.length) return;
    saveLocal({ ...localAnswers, [question.id]: answer });
  }

  async function submit() {
    if (!room || !question || selected === undefined || alreadySubmitted) return;
    setBusy(true);
    const response = await fetch(`/api/school/classes/${encodeURIComponent(room.code)}/submit`, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ participantToken: token, questionId: question.id, answer: selected }),
    }).catch(() => null);
    if (!response?.ok) {
      setMessage(copy.submitError);
      setBusy(false);
      return;
    }
    const nextSubmitted = [...new Set([...submittedIds, question.id])];
    saveLocal(localAnswers, nextSubmitted);
    setMessage(`${copy.received} ${copy.receivedBody}`);
    setBusy(false);
  }

  if (!code || !token) {
    return (
      <section className="engine-shell school-shell school-student-shell">
        <article className="engine-card school-join-card student-simple-card">
          <p className="engine-kicker">{copy.joinKicker}</p>
          <h1>{copy.joinTitle}</h1>
          <p className="student-privacy-note">{copy.joinHelp}</p>
          <input className="school-code-input" value={entryCode} maxLength={6} onChange={(event) => setEntryCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} placeholder="ABC234" aria-label={copy.codeLabel} />
          <div className="engine-result-actions"><button className="engine-primary-link" type="button" disabled={busy} onClick={join}>{busy ? copy.joining : copy.join}</button></div>
          {message && <p className="school-status-message">{message}</p>}
        </article>
      </section>
    );
  }

  if (!room) return <section className="engine-shell school-shell school-student-shell"><article className="engine-card student-simple-card"><p>{copy.loading}</p></article></section>;

  const studentPacedComplete = room.activity.pacing === 'student' && room.activity.questionIds.every((id) => submittedIds.includes(id));
  const revealForCurrent = room.activity.pacing === 'teacher' && room.revealed && room.currentQuestionId === question?.id;
  const answeredCount = submittedIds.filter((id) => room.activity.questionIds.includes(id)).length;

  const optionLabel = (id: string, fallback: string) => {
    if (!question) return fallback;
    if (question.kind === 'believe') return scale[id] ?? fallback;
    return localizedLiteracyOption(locale, question, id, Boolean(isJunior));
  };

  return (
    <section className={`engine-shell school-shell school-student-shell ${isJunior ? 'school-junior-student' : 'school-youth-student'}`}>
      <div className="school-room-strip"><strong>{room.roomLabel || `${copy.classWord} ${room.code}`}</strong><span>{room.activity.title}</span><span>{room.joinedCount} {copy.joinedCount}</span></div>
      {message && <p className="school-status-message">{message}</p>}
      {room.status === 'closed' ? (
        <article className="engine-card student-simple-card"><p className="engine-kicker">{copy.sessionEnded}</p><h1>{copy.closedTitle}</h1><p>{copy.closedBody}</p></article>
      ) : studentPacedComplete ? (
        <article className="engine-card student-simple-card"><p className="engine-kicker">{copy.complete}</p><h1>{copy.completeTitle(room.activity.questionIds.length)}</h1><p>{copy.completeBody}</p></article>
      ) : question ? (
        <article className="engine-card school-question-card student-question-card">
          <p className="engine-kicker">{room.activity.pacing === 'teacher' ? copy.liveQuestion(room.currentIndex + 1) : copy.questionOf(studentIndex + 1, room.activity.questionIds.length)} · {isJunior ? (question.kind === 'believe' ? copy.yourView : copy.politicalKnowHow) : question.title}</p>
          {question.kind === 'believe' ? (
            <>
              <div className="engine-statement student-belief-statement"><p>{localizedBeliefStatement(locale, question)}</p></div>
              <p className="student-no-correct">{copy.noCorrect}</p>
            </>
          ) : <h1 className="student-literacy-question">{localizedLiteracyPrompt(locale, question, Boolean(isJunior))}</h1>}

          {!alreadySubmitted && (room.activity.pacing === 'student' || room.questionOpen) ? (
            <>
              <div className={question.kind === 'believe' ? (isJunior ? 'junior-response-options' : 'school-believe-options student-believe-options') : 'deep-options student-literacy-options'}>
                {question.options.map((option) => {
                  const active = Array.isArray(selected) ? selected.includes(option.id) : selected === option.id;
                  const label = optionLabel(option.id, option.label);
                  return <button key={option.id} type="button" aria-label={label} className={active ? 'deep-option selected' : 'deep-option'} onClick={() => choose(option.id)}>{question.kind === 'believe' && !isJunior ? <><b>{option.id === 'unsure' ? '?' : Number(option.id) > 0 ? `+${option.id}` : option.id.replace('-', '−')}</b><span>{label}</span></> : label}</button>;
                })}
              </div>
              <div className="engine-result-actions"><button className="engine-primary-link student-submit" type="button" disabled={busy || selected === undefined || (Array.isArray(selected) && !selected.length)} onClick={submit}>{busy ? copy.submitting : copy.submit}</button></div>
            </>
          ) : alreadySubmitted ? <div className="school-submitted"><strong>{copy.received}</strong><span>{copy.waitingClass}</span></div> : <p className="engine-callout">{copy.waitingOpen}</p>}

          {revealForCurrent && room.projectorDistribution && <div className="school-reveal-panel"><p className="engine-kicker">{copy.roomAnswers} · {room.projectorDistribution.responses}</p><DistributionChart data={room.projectorDistribution} optionLabel={optionLabel} />{question.kind === 'literacy' && question.explanation && <div className="deep-explanation"><strong>{copy.explanation}</strong><br />{localizedLiteracyExplanation(locale, question, Boolean(isJunior))}</div>}</div>}

          {room.activity.pacing === 'student' && alreadySubmitted && <div className="engine-nav"><button type="button" disabled={studentIndex === 0} onClick={() => setStudentIndex((value) => Math.max(0, value - 1))}>{copy.previous}</button><span>{answeredCount}/{room.activity.questionIds.length} {copy.submitted}</span><button type="button" disabled={studentIndex >= room.activity.questionIds.length - 1} onClick={() => setStudentIndex((value) => Math.min(room.activity.questionIds.length - 1, value + 1))}>{copy.next}</button></div>}
        </article>
      ) : <article className="engine-card student-simple-card"><p className="engine-kicker">{copy.lobby}</p><h1>{copy.youreIn}</h1><p>{copy.waitingNext}</p></article>}
    </section>
  );
}
