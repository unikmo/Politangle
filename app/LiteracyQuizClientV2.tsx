'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { calculateDeepLiteracyResult, scoreLiteracyItem, type DeepSection, type LiteracyQuestion } from '../lib/deep-engine';
import {
  answerLiteracy,
  createLiteracySession,
  literacyOptionOrder,
  literacyOrder,
  literacyPhaseProgress,
  parseLiteracySession,
  revealLiteracyAnswer,
  type LiteracySession,
} from '../lib/literacy-session';
import { deClusterLiteracyOrder, publicLiteracyQuestions } from '../lib/public-literacy-v2';
import { publicLiteracyExplanation, publicLiteracyOption, publicLiteracyPrompt } from '../lib/public-literacy-i18n';
import { useLocale, type Locale } from './LocaleProvider';

const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';
const PUBLIC_LITERACY_SESSION_KEY = 'politangle.public.literacy.v2.session';

type FeedbackMode = 'end' | 'instant';

type UiCopy = {
  hookTitle: string; hookDescription: string; description: string;
  result: string; correct: string; missed: string; whatNumber: string; benchmark: string;
  share: string; shared: string; backPolitangle: string; review: string; noMisses: string; missedHeading: string;
  allCorrect: (total: number) => string; yourAnswer: string; correctAnswer: string; restart: string;
  questionOf: (n: number, total: number) => string; classifyInstruction: string; understandInstruction: string;
  correctFeedback: string; notQuite: string; bestAnswer: string; previous: string; next: string; seeResult: (title: string) => string;
  checkAnswer: string; back: string; continue: string; autoNote: string; retake: (title: string) => string;
  classifyBands: readonly [string, string, string, string]; understandBands: readonly [string, string, string, string];
  classifyMeanings: readonly [string, string, string, string]; understandMeanings: readonly [string, string, string, string];
};

function uiCopy(locale: Locale, section: DeepSection): UiCopy {
  if (locale === 'de') return {
    hookTitle: section === 'classify' ? 'Erkennen Sie die politische Richtung ohne Etikett?' : 'Können Sie ähnliche politische Ideen auseinanderhalten?',
    hookDescription: section === 'classify' ? 'Lesen Sie, wofür eine Partei oder Bewegung steht, und wählen Sie die Richtung, die am besten passt.' : 'Testen Sie Unterschiede, die in politischen Debatten häufig verwechselt werden.',
    description: section === 'classify' ? 'CLASSIFY misst, ob Sie eine politische Richtung an ihren Inhalten erkennen, ohne dass der Name vorher genannt wird.' : 'UNDERSTAND misst, ob Sie politische Ideen unterscheiden können, die häufig verwechselt werden.',
    result: 'Ergebnis', correct: 'Richtig', missed: 'Verfehlt', whatNumber: 'WAS DIE ZAHL AUSSAGT',
    benchmark: 'Einen Vergleich wie „besser als X %“ zeigen wir erst, wenn genügend echte, anonyme Ergebnisse für eine belastbare Vergleichsgruppe vorliegen.',
    share: 'Ergebnis teilen', shared: 'Geteilt', backPolitangle: 'Zurück zu Politangle', review: 'AUSWERTUNG', noMisses: 'Keine Fehler.', missedHeading: 'Die Fragen, die Sie verfehlt haben.',
    allCorrect: (total) => `Sie haben alle ${total} Fragen richtig beantwortet.`, yourAnswer: 'Ihre Antwort', correctAnswer: 'Richtige Antwort', restart: 'Neu starten',
    questionOf: (n, total) => `Frage ${n} von ${total}`, classifyInstruction: 'Wählen Sie die passendste Tradition.', understandInstruction: 'Wählen Sie die beste Antwort.',
    correctFeedback: 'Richtig', notQuite: 'Nicht ganz', bestAnswer: 'Beste Antwort:', previous: 'Zurück', next: 'Weiter', seeResult: (title) => `${title}-Ergebnis`,
    checkAnswer: 'Antwort prüfen', back: 'Zurück', continue: 'Weiter', autoNote: 'Antwort wählen → weiter', retake: (title) => `${title} wiederholen`,
    classifyBands: ['Sehr starke Einordnung', 'Starke Einordnung', 'Gute Grundlage', 'Noch im Aufbau'], understandBands: ['Sehr starkes Verständnis', 'Starkes Verständnis', 'Gute Grundlage', 'Noch im Aufbau'],
    classifyMeanings: ['Sie erkennen politische Traditionen meist an ihren prägenden Merkmalen, auch wenn das Etikett nicht in der Frage steht.', 'Sie erkennen die meisten großen Traditionen sicher. Einige nahe verwandte Richtungen lassen sich noch leichter verwechseln.', 'Die wichtigsten politischen Familien sitzen. Die schwierigeren Abgrenzungen zwischen verwandten Traditionen sind der nächste Schritt.', 'Sie bauen gerade Ihre politische Landkarte auf. Die verfehlten Fragen unten zeigen genau, welche Unterschiede sich als Nächstes lohnen.'],
    understandMeanings: ['Sie unterscheiden politische Begriffe und typische Grenzfälle sehr sicher.', 'Sie verstehen die meisten Kernbegriffe gut; einige feinere Abgrenzungen bleiben anspruchsvoll.', 'Die Grundlage ist da. Die verfehlten Fragen zeigen, wo Begriffe noch leicht ineinanderlaufen.', 'Die Auswertung zeigt Ihnen die Begriffe, bei denen sich ein zweiter Blick besonders lohnt.'],
  };
  if (locale === 'es') return {
    hookTitle: section === 'classify' ? '¿Puedes reconocer la política sin la etiqueta?' : '¿Puedes distinguir ideas políticas que se parecen?',
    hookDescription: section === 'classify' ? 'Lee lo que defiende un partido o movimiento y elige la tradición que mejor encaja.' : 'Pon a prueba diferencias que suelen confundirse en el debate político.',
    description: section === 'classify' ? 'CLASSIFY mide si puedes reconocer una tradición política por sus ideas sin ver primero su nombre.' : 'UNDERSTAND mide si puedes distinguir ideas políticas que suelen confundirse.',
    result: 'resultado', correct: 'Correctas', missed: 'Falladas', whatNumber: 'QUÉ SIGNIFICA LA PUNTUACIÓN',
    benchmark: 'Solo mostraremos comparaciones como «mejor que X %» cuando haya suficientes intentos reales y anónimos para que la referencia sea fiable.',
    share: 'Compartir resultado', shared: 'Compartido', backPolitangle: 'Volver a Politangle', review: 'REVISIÓN', noMisses: 'Ningún error.', missedHeading: 'Las preguntas que fallaste.',
    allCorrect: (total) => `Has acertado las ${total} preguntas.`, yourAnswer: 'Tu respuesta', correctAnswer: 'Respuesta correcta', restart: 'Reiniciar',
    questionOf: (n, total) => `Pregunta ${n} de ${total}`, classifyInstruction: 'Elige la tradición que mejor encaja.', understandInstruction: 'Elige la mejor respuesta.',
    correctFeedback: 'Correcto', notQuite: 'No del todo', bestAnswer: 'Mejor respuesta:', previous: 'Anterior', next: 'Siguiente', seeResult: (title) => `Ver resultado de ${title}`,
    checkAnswer: 'Comprobar respuesta', back: 'Atrás', continue: 'Continuar', autoNote: 'Elige una respuesta → siguiente', retake: (title) => `Repetir ${title}`,
    classifyBands: ['Reconocimiento muy fuerte', 'Reconocimiento fuerte', 'Buena base', 'Mapa aún en construcción'], understandBands: ['Comprensión muy fuerte', 'Comprensión fuerte', 'Buena base', 'Aún en construcción'],
    classifyMeanings: ['Sueles reconocer las tradiciones políticas por sus rasgos definitorios aunque no aparezca la etiqueta.', 'Reconoces con seguridad la mayoría de las grandes tradiciones. Algunas corrientes cercanas todavía pueden confundirse.', 'Tienes bien situadas las principales familias políticas. El siguiente paso son las fronteras más difíciles entre tradiciones cercanas.', 'Estás construyendo el mapa político. Las preguntas falladas muestran qué diferencias merece la pena afinar.'],
    understandMeanings: ['Distingues con mucha seguridad conceptos políticos y casos límite comunes.', 'Entiendes bien la mayoría de los conceptos centrales; algunas diferencias más finas siguen siendo difíciles.', 'La base está. Las preguntas falladas muestran dónde algunos conceptos todavía se mezclan.', 'La revisión muestra qué conceptos merece especialmente la pena volver a mirar.'],
  };
  if (locale === 'fr') return {
    hookTitle: section === 'classify' ? 'Reconnaissez-vous la politique sans l’étiquette ?' : 'Savez-vous distinguer des idées politiques proches ?',
    hookDescription: section === 'classify' ? 'Lisez ce que défend un parti ou un mouvement, puis choisissez la tradition qui correspond le mieux.' : 'Testez les différences que l’on confond souvent dans le débat politique.',
    description: section === 'classify' ? 'CLASSIFY mesure votre capacité à reconnaître une tradition politique à partir de ses idées, sans voir son nom d’abord.' : 'UNDERSTAND mesure votre capacité à distinguer des idées politiques souvent confondues.',
    result: 'résultat', correct: 'Correctes', missed: 'Ratées', whatNumber: 'CE QUE DIT LE SCORE',
    benchmark: 'Une comparaison du type « meilleur que X % » n’apparaîtra que lorsqu’il y aura assez de tentatives réelles et anonymes pour fournir une référence solide.',
    share: 'Partager le résultat', shared: 'Partagé', backPolitangle: 'Retour à Politangle', review: 'RÉVISION', noMisses: 'Aucune erreur.', missedHeading: 'Les questions que vous avez ratées.',
    allCorrect: (total) => `Vous avez réussi les ${total} questions.`, yourAnswer: 'Votre réponse', correctAnswer: 'Bonne réponse', restart: 'Recommencer',
    questionOf: (n, total) => `Question ${n} sur ${total}`, classifyInstruction: 'Choisissez la tradition la plus proche.', understandInstruction: 'Choisissez la meilleure réponse.',
    correctFeedback: 'Correct', notQuite: 'Pas tout à fait', bestAnswer: 'Meilleure réponse :', previous: 'Précédent', next: 'Suivant', seeResult: (title) => `Voir le résultat ${title}`,
    checkAnswer: 'Vérifier la réponse', back: 'Retour', continue: 'Continuer', autoNote: 'Choisissez une réponse → suivant', retake: (title) => `Refaire ${title}`,
    classifyBands: ['Reconnaissance très forte', 'Reconnaissance forte', 'Bonne base', 'Carte encore en construction'], understandBands: ['Compréhension très forte', 'Compréhension forte', 'Bonne base', 'Encore en construction'],
    classifyMeanings: ['Vous reconnaissez généralement les traditions politiques à leurs traits distinctifs même lorsque l’étiquette est absente.', 'Vous reconnaissez avec assurance la plupart des grandes traditions. Quelques courants proches peuvent encore se confondre.', 'Les grandes familles politiques sont bien en place. L’étape suivante concerne les frontières plus difficiles entre traditions proches.', 'Vous construisez votre carte politique. Les questions ratées montrent précisément quelles différences méritent d’être affinées.'],
    understandMeanings: ['Vous distinguez avec beaucoup d’assurance les concepts politiques et les cas limites courants.', 'Vous comprenez bien la plupart des concepts centraux ; quelques distinctions plus fines restent difficiles.', 'La base est là. Les questions ratées montrent où certains concepts se mélangent encore.', 'La révision montre les concepts qui méritent le plus un second regard.'],
  };
  return {
    hookTitle: section === 'classify' ? 'Can you spot the politics without the label?' : 'Can you tell similar political ideas apart?',
    hookDescription: section === 'classify' ? 'Read what a party or movement stands for, then choose the political tradition that fits best.' : 'Test the differences that people often mix up in political debate.',
    description: section === 'classify' ? 'CLASSIFY measures whether you can recognise a political tradition from what it stands for, without being given the label first.' : 'UNDERSTAND measures whether you can tell apart political ideas that are often confused.',
    result: 'result', correct: 'Correct', missed: 'Missed', whatNumber: 'WHAT THE NUMBER SAYS',
    benchmark: 'A “better than X% of players” comparison will appear only when enough real, anonymous attempts exist to make that benchmark meaningful.',
    share: 'Share result', shared: 'Shared', backPolitangle: 'Back to Politangle', review: 'REVIEW', noMisses: 'No misses.', missedHeading: 'The questions you missed.',
    allCorrect: (total) => `You got all ${total} questions right.`, yourAnswer: 'Your answer', correctAnswer: 'Correct answer', restart: 'Restart',
    questionOf: (n, total) => `Question ${n} of ${total}`, classifyInstruction: 'Choose the closest tradition.', understandInstruction: 'Choose the best answer.',
    correctFeedback: 'Correct', notQuite: 'Not quite', bestAnswer: 'Best answer:', previous: 'Previous', next: 'Next', seeResult: (title) => `See ${title} result`,
    checkAnswer: 'Check answer', back: 'Back', continue: 'Continue', autoNote: 'Choose an answer → next', retake: (title) => `Retake ${title}`,
    classifyBands: ['Very strong recognition', 'Strong recognition', 'Solid foundation', 'Still building the map'], understandBands: ['Very strong understanding', 'Strong understanding', 'Solid foundation', 'Still building the map'],
    classifyMeanings: ['You can usually identify political traditions from their defining features even when the label is removed from the question.', 'You recognise most major traditions confidently. A few close neighbours can still blur together.', 'You have the main political families in place. The harder boundaries between related traditions are the next step.', 'You are building the political map. The missed questions below show exactly which distinctions are worth sharpening next.'],
    understandMeanings: ['You distinguish political concepts and common boundary cases very confidently.', 'You understand most core concepts well; a few finer distinctions remain challenging.', 'The foundation is there. The missed questions show where concepts still run together.', 'The review shows which concepts are most worth a second look.'],
  };
}

function bandAndMeaning(section: DeepSection, percent: number, ui: UiCopy) {
  const index = percent >= 90 ? 0 : percent >= 75 ? 1 : percent >= 60 ? 2 : 3;
  return {
    band: (section === 'classify' ? ui.classifyBands : ui.understandBands)[index],
    meaning: (section === 'classify' ? ui.classifyMeanings : ui.understandMeanings)[index],
  };
}

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function firstUnchecked(session: LiteracySession, section: DeepSection, order = literacyOrder(session, section)) {
  const found = order.findIndex((id) => !session.revealed.includes(id));
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

function firstUnanswered(session: LiteracySession, order: readonly string[]) {
  const found = order.findIndex((id) => (session.answers[id]?.length ?? 0) === 0);
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

function revealSection(session: LiteracySession, order: readonly string[]) {
  return order.reduce((next, id) => {
    if ((next.answers[id]?.length ?? 0) === 0 || next.revealed.includes(id)) return next;
    return revealLiteracyAnswer(next, id);
  }, session);
}

export default function LiteracyQuizClientV2({ section, feedbackMode = 'end' }: { section: DeepSection; feedbackMode?: FeedbackMode }) {
  const { locale } = useLocale();
  const ui = uiCopy(locale, section);
  const [session, setSession] = useState<LiteracySession | null>(null);
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shared, setShared] = useState(false);
  const questionBank = publicLiteracyQuestions;
  const sessionKey = feedbackMode === 'end' ? PUBLIC_LITERACY_SESSION_KEY : LITERACY_SESSION_KEY;

  useEffect(() => {
    const restored = parseLiteracySession(sessionStorage.getItem(sessionKey));
    let initial = restored ?? createLiteracySession(newSeed());
    const rawOrder = literacyOrder(initial, section);
    const displayOrder = section === 'classify' ? deClusterLiteracyOrder(rawOrder, questionBank) : rawOrder;
    const progress = literacyPhaseProgress(initial, section);
    if (feedbackMode === 'end' && progress.answered === progress.total && !progress.complete) initial = revealSection(initial, displayOrder);
    sessionStorage.setItem(sessionKey, JSON.stringify(initial));
    setSession(initial);
    const nextProgress = literacyPhaseProgress(initial, section);
    setShowResult(nextProgress.complete);
    setIndex(feedbackMode === 'end' ? firstUnanswered(initial, displayOrder) : firstUnchecked(initial, section, displayOrder));
  }, [section, feedbackMode, sessionKey, questionBank]);

  const displayOrder = useMemo(() => {
    if (!session) return [];
    const raw = literacyOrder(session, section);
    return section === 'classify' ? deClusterLiteracyOrder(raw, questionBank) : raw;
  }, [session, section, questionBank]);

  const current = useMemo(() => {
    if (!session || showResult) return null;
    const id = displayOrder[index];
    return questionBank.find((question) => question.id === id) ?? null;
  }, [session, displayOrder, index, showResult, questionBank]);

  const orderedOptions = useMemo(() => {
    if (!session || !current) return [];
    return literacyOptionOrder(session, current.id)
      .map((id) => current.options.find((option) => option.id === id))
      .filter((option): option is NonNullable<typeof option> => Boolean(option));
  }, [session, current]);

  if (!session) return <section className="engine-shell"><article className="engine-card"><p>Loading…</p></article></section>;

  const progress = literacyPhaseProgress(session, section);
  const selected = current ? session.answers[current.id] ?? [] : [];
  const checked = current ? session.revealed.includes(current.id) : false;
  const itemResult = current && checked ? scoreLiteracyItem(current, selected) : null;
  const sectionResult = calculateDeepLiteracyResult(questionBank, session.answers).sections[section];
  const title = section === 'classify' ? 'CLASSIFY' : 'UNDERSTAND';

  const localizedPrompt = (question: LiteracyQuestion) => publicLiteracyPrompt(locale, question);
  const localizedExplanation = (question: LiteracyQuestion) => publicLiteracyExplanation(locale, question);
  const localizedOption = (question: LiteracyQuestion, optionId: string) => publicLiteracyOption(locale, question, optionId);

  function save(next: LiteracySession) {
    sessionStorage.setItem(sessionKey, JSON.stringify(next));
    setSession(next);
  }

  function finishPublic(next: LiteracySession) {
    const completed = revealSection(next, displayOrder);
    save(completed);
    setShowResult(true);
  }

  function moveToNextUnanswered(next: LiteracySession) {
    const later = displayOrder.findIndex((id, position) => position > index && (next.answers[id]?.length ?? 0) === 0);
    if (later >= 0) { setIndex(later); return; }
    const anywhere = displayOrder.findIndex((id) => (next.answers[id]?.length ?? 0) === 0);
    if (anywhere >= 0) { setIndex(anywhere); return; }
    finishPublic(next);
  }

  function choose(optionId: string) {
    if (!current || (feedbackMode === 'instant' && checked)) return;
    const nextSelection = current.multiSelect
      ? selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]
      : [optionId];
    if (!nextSelection.length) return;
    const answered = answerLiteracy(session, current.id, nextSelection);
    if (feedbackMode === 'end' && !current.multiSelect) { save(answered); moveToNextUnanswered(answered); return; }
    save(answered);
  }

  function check() {
    if (!current || !selected.length || checked) return;
    save(revealLiteracyAnswer(session, current.id));
  }

  function nextInstant() {
    if (!current || !checked) return;
    if (index < displayOrder.length - 1) { setIndex((value) => value + 1); return; }
    if (literacyPhaseProgress(session, section).complete) setShowResult(true);
  }

  function continuePublicMultiSelect() {
    if (!current || !current.multiSelect || !selected.length) return;
    moveToNextUnanswered(session);
  }

  function restart() {
    const ids = new Set(literacyOrder(session, section));
    const answers = Object.fromEntries(Object.entries(session.answers).filter(([id]) => !ids.has(id)));
    const revealed = session.revealed.filter((id) => !ids.has(id));
    const next = { ...session, answers, revealed, completedAt: undefined };
    save(next); setIndex(0); setShowResult(false); setShared(false);
  }

  async function shareResult() {
    const text = locale === 'de'
      ? `Ich habe ${sectionResult.percent}% bei Politangle ${title} erreicht — ${sectionResult.correct} von ${sectionResult.total} richtig.`
      : locale === 'es'
        ? `He conseguido ${sectionResult.percent}% en Politangle ${title}: ${sectionResult.correct} de ${sectionResult.total} correctas.`
        : locale === 'fr'
          ? `J’ai obtenu ${sectionResult.percent}% à Politangle ${title} : ${sectionResult.correct} bonnes réponses sur ${sectionResult.total}.`
          : `I scored ${sectionResult.percent}% on Politangle ${title} — ${sectionResult.correct} of ${sectionResult.total} correct.`;
    try {
      if (navigator.share) await navigator.share({ title: `Politangle ${title}`, text, url: window.location.href });
      else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setShared(true); window.setTimeout(() => setShared(false), 1800);
    } catch { /* cancelled native share sheet */ }
  }

  if (showResult) {
    const missed = displayOrder.map((id, orderIndex) => {
      const question = questionBank.find((candidate) => candidate.id === id);
      if (!question) return null;
      const answer = session.answers[id] ?? [];
      const scored = scoreLiteracyItem(question, answer);
      return scored.correct ? null : { question, answer, orderIndex };
    }).filter((item): item is NonNullable<typeof item> => Boolean(item));
    const { band, meaning } = bandAndMeaning(section, sectionResult.percent, ui);

    return (
      <section className="engine-shell literacy-shell literacy-result-shell">
        <article className="engine-card literacy-result-card">
          <div className="literacy-result-head">
            <div><p className="engine-kicker">{title} · {ui.result}</p><h1>{sectionResult.percent}%</h1><strong className="literacy-result-band">{band}</strong></div>
            <div className="literacy-result-stats"><div><span>{ui.correct}</span><strong>{sectionResult.correct}/{sectionResult.total}</strong></div><div><span>{ui.missed}</span><strong>{sectionResult.total - sectionResult.correct}</strong></div></div>
          </div>
          <div className="literacy-result-meaning"><p className="engine-kicker">{ui.whatNumber}</p><h2>{meaning}</h2><p>{ui.description}</p><p className="literacy-benchmark-note">{ui.benchmark}</p></div>
          <div className="engine-result-actions literacy-result-actions">
            <button className="engine-primary-link" type="button" onClick={shareResult}>{shared ? ui.shared : ui.share}</button>
            <button className="engine-primary-link secondary" type="button" onClick={restart}>{ui.retake(title)}</button>
            <Link className="engine-primary-link secondary" href="/">{ui.backPolitangle}</Link>
          </div>
        </article>

        <article className="engine-card literacy-review-card">
          <p className="engine-kicker">{ui.review}</p>
          <h2>{missed.length === 0 ? ui.noMisses : ui.missedHeading}</h2>
          {missed.length === 0 ? <p className="result-lede">{ui.allCorrect(sectionResult.total)}</p> : (
            <div className="literacy-missed-list">
              {missed.map(({ question, answer, orderIndex }) => {
                const correct = question.acceptedAnswerSets[0];
                return <section className="literacy-missed-item" key={question.id}><span className="literacy-missed-number">{String(orderIndex + 1).padStart(2, '0')}</span><div>
                  <h3>{localizedPrompt(question)}</h3>
                  <div className="literacy-answer-review"><p><span>{ui.yourAnswer}</span><strong>{answer.map((id) => localizedOption(question, id)).join(', ')}</strong></p><p><span>{ui.correctAnswer}</span><strong>{correct.map((id) => localizedOption(question, id)).join(', ')}</strong></p></div>
                  <p className="literacy-review-explanation">{localizedExplanation(question)}</p>
                </div></section>;
              })}
            </div>
          )}
        </article>
      </section>
    );
  }

  if (!current) return null;
  const prompt = localizedPrompt(current);
  const correctLabels = current.acceptedAnswerSets[0].map((id) => localizedOption(current, id)).join(', ');

  return (
    <section className="engine-shell literacy-shell">
      {feedbackMode === 'end' && index === 0 && progress.answered === 0 && <div className="literacy-hook"><strong>{ui.hookTitle}</strong><span>{ui.hookDescription}</span></div>}
      <div className="engine-progress-row">
        <span>{title} · {feedbackMode === 'end' ? `${progress.answered}/${progress.total}` : `${progress.checked}/${progress.total}`}</span>
        <div className="engine-progress" aria-label={`${Math.round(((feedbackMode === 'end' ? progress.answered : progress.checked) / progress.total) * 100)}% complete`}><span style={{ width: `${Math.round(((feedbackMode === 'end' ? progress.answered : progress.checked) / progress.total) * 100)}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>{ui.restart}</button>
      </div>

      <article className="engine-card literacy-card">
        <p className="engine-kicker">{ui.questionOf(index + 1, progress.total)}</p>
        <h1 className="literacy-prompt">{prompt}</h1>
        <p className="literacy-instruction">{section === 'classify' ? ui.classifyInstruction : ui.understandInstruction}</p>
        <div className="deep-options literacy-options">{orderedOptions.map((option) => <button type="button" disabled={feedbackMode === 'instant' && checked} className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{localizedOption(current, option.id)}</button>)}</div>
        {feedbackMode === 'instant' && checked && itemResult && <div className="literacy-feedback"><p className="engine-kicker">{itemResult.correct ? ui.correctFeedback : ui.notQuite}</p>{!itemResult.correct && <p><strong>{ui.bestAnswer}</strong> {correctLabels}</p>}<p>{localizedExplanation(current)}</p></div>}
      </article>

      {feedbackMode === 'instant' ? (
        <div className="engine-nav literacy-nav"><button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{ui.previous}</button><span>{index + 1} / {progress.total}</span>{checked ? <button type="button" onClick={nextInstant}>{index === progress.total - 1 ? ui.seeResult(title) : ui.next}</button> : <button type="button" onClick={check} disabled={!selected.length}>{ui.checkAnswer}</button>}</div>
      ) : (
        <div className="engine-nav literacy-nav literacy-fast-nav"><button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{ui.back}</button><span>{index + 1} / {progress.total}</span>{current.multiSelect ? <button type="button" onClick={continuePublicMultiSelect} disabled={!selected.length}>{ui.continue}</button> : <span className="literacy-auto-note">{ui.autoNote}</span>}</div>
      )}
    </section>
  );
}
