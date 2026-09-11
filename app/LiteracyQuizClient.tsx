'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { literacyQuestions as deepLiteracyQuestions } from '../lib/literacy-questions';
import { calculateDeepLiteracyResult, scoreLiteracyItem, type DeepSection } from '../lib/deep-engine';
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
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../lib/german-literacy';
import { useLocale, type Locale } from './LocaleProvider';

const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';

function newSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0];
  }
  return Date.now() >>> 0;
}

function firstUnchecked(session: LiteracySession, section: DeepSection) {
  const order = literacyOrder(session, section);
  const found = order.findIndex((id) => !session.revealed.includes(id));
  return found === -1 ? Math.max(0, order.length - 1) : found;
}

function copy(locale: Locale, section: DeepSection) {
  const title = section === 'classify' ? 'CLASSIFY' : 'UNDERSTAND';
  if (locale === 'de') return {
    title,
    loading:'Wird geladen…',
    description: section === 'classify' ? 'Ordne politische Beschreibungen der Tradition zu, zu der sie am besten passen.' : 'Unterscheide politische Begriffe, Abgrenzungen und typische Missverständnisse.',
    result:'Ergebnis', retake:`${title} neu starten`, back:'Zurück zu Politangle', correctOf:(correct:number,total:number) => `${correct} von ${total} richtig.`,
    restart:'Neu starten', question:(index:number,total:number) => `Frage ${index} von ${total}`, correct:'Richtig', notQuite:'Nicht ganz', best:'Beste Antwort:',
    previous:'Zurück', next:'Weiter', check:'Antwort prüfen', see:`${title}-Ergebnis ansehen`, complete:(percent:number) => `${percent}% abgeschlossen`,
    notice:null as string | null,
  };
  if (locale === 'es') return {
    title,
    loading:'Cargando…',
    description: section === 'classify' ? 'Relaciona cada descripción política con la tradición que mejor encaja.' : 'Distingue conceptos políticos, límites y confusiones habituales.',
    result:'Resultado', retake:`Repetir ${title}`, back:'Volver a Politangle', correctOf:(correct:number,total:number) => `${correct} de ${total} correctas.`,
    restart:'Reiniciar', question:(index:number,total:number) => `Pregunta ${index} de ${total}`, correct:'Correcto', notQuite:'No del todo', best:'Mejor respuesta:',
    previous:'Anterior', next:'Siguiente', check:'Comprobar respuesta', see:`Ver resultado de ${title}`, complete:(percent:number) => `${percent}% completado`,
    notice:'El banco de preguntas de CLASSIFY y UNDERSTAND todavía no tiene una versión española validada. La interfaz está en español, pero las preguntas permanecen en inglés hasta completar esa validación.',
  };
  if (locale === 'fr') return {
    title,
    loading:'Chargement…',
    description: section === 'classify' ? 'Associe chaque description politique à la tradition qui lui correspond le mieux.' : 'Distingue les notions politiques, leurs limites et les confusions courantes.',
    result:'Résultat', retake:`Refaire ${title}`, back:'Retour à Politangle', correctOf:(correct:number,total:number) => `${correct} sur ${total} bonnes réponses.`,
    restart:'Recommencer', question:(index:number,total:number) => `Question ${index} sur ${total}`, correct:'Correct', notQuite:'Pas tout à fait', best:'Meilleure réponse :',
    previous:'Précédent', next:'Suivant', check:'Vérifier la réponse', see:`Voir le résultat ${title}`, complete:(percent:number) => `${percent}% terminé`,
    notice:'Le questionnaire CLASSIFY / UNDERSTAND n’a pas encore de version française validée. L’interface est en français, mais les questions restent en anglais jusqu’à la fin de cette validation.',
  };
  return {
    title,
    loading:'Loading…',
    description: section === 'classify' ? 'Match political descriptions to the tradition that fits them best.' : 'Distinguish political concepts, boundaries and common misconceptions.',
    result:'result', retake:`Retake ${title}`, back:'Back to Politangle', correctOf:(correct:number,total:number) => `${correct} of ${total} correct.`,
    restart:'Restart', question:(index:number,total:number) => `Question ${index} of ${total}`, correct:'Correct', notQuite:'Not quite', best:'Best answer:',
    previous:'Previous', next:'Next', check:'Check answer', see:`See ${title} result`, complete:(percent:number) => `${percent}% complete`,
    notice:null as string | null,
  };
}

export default function LiteracyQuizClient({ section }: { section: DeepSection }) {
  const { locale } = useLocale();
  const ui = copy(locale, section);
  const [session, setSession] = useState<LiteracySession | null>(null);
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const restored = parseLiteracySession(sessionStorage.getItem(LITERACY_SESSION_KEY));
    const initial = restored ?? createLiteracySession(newSeed());
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(initial));
    setSession(initial);
    const progress = literacyPhaseProgress(initial, section);
    setShowResult(progress.complete);
    setIndex(firstUnchecked(initial, section));
  }, [section]);

  const current = useMemo(() => {
    if (!session || showResult) return null;
    const id = literacyOrder(session, section)[index];
    return deepLiteracyQuestions.find((question) => question.id === id) ?? null;
  }, [session, section, index, showResult]);

  const orderedOptions = useMemo(() => {
    if (!session || !current) return [];
    return literacyOptionOrder(session, current.id)
      .map((id) => current.options.find((option) => option.id === id))
      .filter((option): option is NonNullable<typeof option> => Boolean(option));
  }, [session, current]);

  if (!session) return <section className="engine-shell"><article className="engine-card"><p>{ui.loading}</p></article></section>;

  const progress = literacyPhaseProgress(session, section);
  const selected = current ? session.answers[current.id] ?? [] : [];
  const checked = current ? session.revealed.includes(current.id) : false;
  const itemResult = current && checked ? scoreLiteracyItem(current, selected) : null;
  const sectionResult = calculateDeepLiteracyResult(deepLiteracyQuestions, session.answers).sections[section];

  function save(next: LiteracySession) {
    sessionStorage.setItem(LITERACY_SESSION_KEY, JSON.stringify(next));
    setSession(next);
  }

  function choose(optionId: string) {
    if (!current || checked) return;
    const nextSelection = current.multiSelect
      ? selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]
      : [optionId];
    if (!nextSelection.length) return;
    save(answerLiteracy(session, current.id, nextSelection));
  }

  function check() {
    if (!current || !selected.length || checked) return;
    save(revealLiteracyAnswer(session, current.id));
  }

  function next() {
    if (!current || !checked) return;
    const order = literacyOrder(session, section);
    if (index < order.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
    if (literacyPhaseProgress(session, section).complete) setShowResult(true);
  }

  function restart() {
    const ids = new Set(literacyOrder(session, section));
    const answers = Object.fromEntries(Object.entries(session.answers).filter(([id]) => !ids.has(id)));
    const revealed = session.revealed.filter((id) => !ids.has(id));
    const next = { ...session, answers, revealed, completedAt: undefined };
    save(next);
    setIndex(0);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <section className="engine-shell literacy-shell">
        <article className="engine-card literacy-result-card">
          <p className="engine-kicker">{ui.title} · {ui.result}</p>
          <h1>{sectionResult.percent}%</h1>
          <p className="result-lede">{ui.correctOf(sectionResult.correct, sectionResult.total)} {ui.description}</p>
          {ui.notice && <p className="engine-help">{ui.notice}</p>}
          <div className="engine-result-actions">
            <button className="engine-primary-link" type="button" onClick={restart}>{ui.retake}</button>
            <Link className="engine-primary-link" href="/">{ui.back}</Link>
          </div>
        </article>
      </section>
    );
  }

  if (!current) return null;
  const germanPrompt = germanLiteracyPrompt(current.id);
  const useGerman = locale === 'de'
    && Boolean(germanPrompt)
    && current.options.every((option) => germanLiteracyOption(option.id, option.label) !== option.label)
    && germanLiteracyExplanation(current.id, current.explanation) !== current.explanation;
  const correctLabels = current.acceptedAnswerSets[0]
    .map((id) => {
      const option = current.options.find((candidate) => candidate.id === id);
      return option ? (useGerman ? germanLiteracyOption(option.id, option.label) : option.label) : undefined;
    })
    .filter(Boolean)
    .join(', ');
  const prompt = useGerman ? germanPrompt! : current.prompt;

  return (
    <section className="engine-shell literacy-shell">
      <div className="engine-progress-row">
        <span>{ui.title} · {progress.checked}/{progress.total}</span>
        <div className="engine-progress" aria-label={ui.complete(progress.percent)}><span style={{ width: `${progress.percent}%` }} /></div>
        <button type="button" className="engine-link-button" onClick={restart}>{ui.restart}</button>
      </div>

      {ui.notice && <div className="engine-card" style={{ marginBottom: 14 }}><p className="engine-help" style={{ margin: 0 }}>{ui.notice}</p></div>}

      <article className="engine-card literacy-card">
        <p className="engine-kicker">{ui.question(index + 1, progress.total)}</p>
        <h1 className="literacy-prompt">{prompt}</h1>
        <div className="deep-options literacy-options">
          {orderedOptions.map((option) => (
            <button type="button" disabled={checked} className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{useGerman ? germanLiteracyOption(option.id, option.label) : option.label}</button>
          ))}
        </div>

        {checked && itemResult && (
          <div className="literacy-feedback">
            <p className="engine-kicker">{itemResult.correct ? ui.correct : ui.notQuite}</p>
            {!itemResult.correct && <p><strong>{ui.best}</strong> {correctLabels}</p>}
            <p>{useGerman ? germanLiteracyExplanation(current.id, current.explanation) : current.explanation}</p>
          </div>
        )}
      </article>

      <div className="engine-nav literacy-nav">
        <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{ui.previous}</button>
        <span>{index + 1} / {progress.total}</span>
        {checked ? <button type="button" onClick={next}>{index === progress.total - 1 ? ui.see : ui.next}</button> : <button type="button" onClick={check} disabled={!selected.length}>{ui.check}</button>}
      </div>
    </section>
  );
}
