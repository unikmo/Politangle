'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { literacyQuestions as deepLiteracyQuestions } from '../lib/literacy-questions';
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
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt } from '../lib/german-literacy';
import {
  deClusterLiteracyOrder,
  publicGermanLiteracyExplanation,
  publicGermanLiteracyPrompt,
  publicLiteracyQuestions,
} from '../lib/public-literacy';
import { useLocale } from './LocaleProvider';

const LITERACY_SESSION_KEY = 'politangle.literacy.v2.session';
const PUBLIC_LITERACY_SESSION_KEY = 'politangle.public.literacy.v1.session';

type FeedbackMode = 'end' | 'instant';

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

function resultBand(section: DeepSection, percent: number, german: boolean) {
  if (section === 'classify') {
    if (percent >= 90) return german ? 'Sehr starke Einordnung' : 'Very strong recognition';
    if (percent >= 75) return german ? 'Starke Einordnung' : 'Strong recognition';
    if (percent >= 60) return german ? 'Gute Grundlage' : 'Solid foundation';
    return german ? 'Noch im Aufbau' : 'Still building the map';
  }
  if (percent >= 90) return german ? 'Sehr starkes Verständnis' : 'Very strong understanding';
  if (percent >= 75) return german ? 'Starkes Verständnis' : 'Strong understanding';
  if (percent >= 60) return german ? 'Gute Grundlage' : 'Solid foundation';
  return german ? 'Noch im Aufbau' : 'Still building the map';
}

function interpretation(section: DeepSection, percent: number, german: boolean) {
  if (section === 'classify') {
    if (percent >= 90) return german
      ? 'Sie erkennen politische Traditionen meist an ihren prägenden Merkmalen, auch wenn das Etikett nicht in der Frage steht.'
      : 'You can usually identify political traditions from their defining features even when the label is removed from the question.';
    if (percent >= 75) return german
      ? 'Sie erkennen die meisten großen Traditionen sicher. Einige nahe verwandte Richtungen lassen sich noch leichter verwechseln.'
      : 'You recognise most major traditions confidently. A few close neighbours can still blur together.';
    if (percent >= 60) return german
      ? 'Die wichtigsten politischen Familien sitzen. Die schwierigeren Abgrenzungen zwischen verwandten Traditionen sind der nächste Schritt.'
      : 'You have the main political families in place. The harder boundaries between related traditions are the next step.';
    return german
      ? 'Sie bauen gerade Ihre politische Landkarte auf. Die verfehlten Fragen unten zeigen genau, welche Unterschiede sich als Nächstes lohnen.'
      : 'You are building the political map. The missed questions below show exactly which distinctions are worth sharpening next.';
  }

  if (percent >= 90) return german
    ? 'Sie unterscheiden politische Begriffe und typische Grenzfälle sehr sicher.'
    : 'You distinguish political concepts and common boundary cases very confidently.';
  if (percent >= 75) return german
    ? 'Sie verstehen die meisten Kernbegriffe gut; einige feinere Abgrenzungen bleiben anspruchsvoll.'
    : 'You understand most core concepts well; a few finer distinctions remain challenging.';
  if (percent >= 60) return german
    ? 'Die Grundlage ist da. Die verfehlten Fragen zeigen, wo Begriffe noch leicht ineinanderlaufen.'
    : 'The foundation is there. The missed questions show where concepts still run together.';
  return german
    ? 'Die Auswertung zeigt Ihnen die Begriffe, bei denen sich ein zweiter Blick besonders lohnt.'
    : 'The review shows which concepts are most worth a second look.';
}

export default function LiteracyQuizClient({ section, feedbackMode = 'end' }: { section: DeepSection; feedbackMode?: FeedbackMode }) {
  const { locale } = useLocale();
  const isGerman = locale === 'de';
  const [session, setSession] = useState<LiteracySession | null>(null);
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shared, setShared] = useState(false);

  const questionBank = feedbackMode === 'end' ? publicLiteracyQuestions : deepLiteracyQuestions;
  const sessionKey = feedbackMode === 'end' ? PUBLIC_LITERACY_SESSION_KEY : LITERACY_SESSION_KEY;

  useEffect(() => {
    const restored = parseLiteracySession(sessionStorage.getItem(sessionKey));
    let initial = restored ?? createLiteracySession(newSeed());
    const rawOrder = literacyOrder(initial, section);
    const displayOrder = feedbackMode === 'end' && section === 'classify'
      ? deClusterLiteracyOrder(rawOrder, publicLiteracyQuestions)
      : rawOrder;
    const progress = literacyPhaseProgress(initial, section);

    if (feedbackMode === 'end' && progress.answered === progress.total && !progress.complete) {
      initial = revealSection(initial, displayOrder);
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(initial));
    setSession(initial);
    const nextProgress = literacyPhaseProgress(initial, section);
    setShowResult(nextProgress.complete);
    setIndex(feedbackMode === 'end' ? firstUnanswered(initial, displayOrder) : firstUnchecked(initial, section, displayOrder));
  }, [section, feedbackMode, sessionKey]);

  const displayOrder = useMemo(() => {
    if (!session) return [];
    const raw = literacyOrder(session, section);
    return feedbackMode === 'end' && section === 'classify'
      ? deClusterLiteracyOrder(raw, questionBank)
      : raw;
  }, [session, section, feedbackMode, questionBank]);

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
  const description = section === 'classify'
    ? (isGerman ? 'Politische Traditionen anhand ihrer Merkmale erkennen.' : 'Recognise political traditions from their defining features.')
    : (isGerman ? 'Politische Begriffe, Unterschiede und typische Missverständnisse auseinanderhalten.' : 'Distinguish political concepts, boundaries and common misconceptions.');

  function localizedPrompt(question: LiteracyQuestion) {
    if (!isGerman) return question.prompt;
    if (feedbackMode === 'end' && question.section === 'classify') {
      return publicGermanLiteracyPrompt(question.id) ?? germanLiteracyPrompt(question.id) ?? question.prompt;
    }
    return germanLiteracyPrompt(question.id) ?? question.prompt;
  }

  function localizedExplanation(question: LiteracyQuestion) {
    if (!isGerman) return question.explanation;
    if (feedbackMode === 'end' && question.section === 'classify') {
      return publicGermanLiteracyExplanation(question.id) ?? germanLiteracyExplanation(question.id, question.explanation);
    }
    return germanLiteracyExplanation(question.id, question.explanation);
  }

  function localizedOption(question: LiteracyQuestion, optionId: string) {
    const option = question.options.find((candidate) => candidate.id === optionId);
    if (!option) return optionId;
    return isGerman ? germanLiteracyOption(option.id, option.label) : option.label;
  }

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
    if (later >= 0) {
      setIndex(later);
      return;
    }
    const anywhere = displayOrder.findIndex((id) => (next.answers[id]?.length ?? 0) === 0);
    if (anywhere >= 0) {
      setIndex(anywhere);
      return;
    }
    finishPublic(next);
  }

  function choose(optionId: string) {
    if (!current || (feedbackMode === 'instant' && checked)) return;
    const nextSelection = current.multiSelect
      ? selected.includes(optionId) ? selected.filter((id) => id !== optionId) : [...selected, optionId]
      : [optionId];
    if (!nextSelection.length) return;
    const answered = answerLiteracy(session, current.id, nextSelection);

    if (feedbackMode === 'end' && !current.multiSelect) {
      save(answered);
      moveToNextUnanswered(answered);
      return;
    }

    save(answered);
  }

  function check() {
    if (!current || !selected.length || checked) return;
    save(revealLiteracyAnswer(session, current.id));
  }

  function nextInstant() {
    if (!current || !checked) return;
    if (index < displayOrder.length - 1) {
      setIndex((value) => value + 1);
      return;
    }
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
    save(next);
    setIndex(0);
    setShowResult(false);
    setShared(false);
  }

  async function shareResult() {
    const text = isGerman
      ? `Ich habe ${sectionResult.percent}% bei Politangle ${title} erreicht — ${sectionResult.correct} von ${sectionResult.total} richtig.`
      : `I scored ${sectionResult.percent}% on Politangle ${title} — ${sectionResult.correct} of ${sectionResult.total} correct.`;
    try {
      if (navigator.share) await navigator.share({ title: `Politangle ${title}`, text, url: window.location.href });
      else await navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      // A cancelled native share sheet should simply leave the page unchanged.
    }
  }

  if (showResult) {
    const missed = displayOrder
      .map((id, orderIndex) => {
        const question = questionBank.find((candidate) => candidate.id === id);
        if (!question) return null;
        const answer = session.answers[id] ?? [];
        const scored = scoreLiteracyItem(question, answer);
        return scored.correct ? null : { question, answer, orderIndex };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    const level = resultBand(section, sectionResult.percent, isGerman);
    const meaning = interpretation(section, sectionResult.percent, isGerman);

    return (
      <section className="engine-shell literacy-shell literacy-result-shell">
        <article className="engine-card literacy-result-card">
          <div className="literacy-result-head">
            <div>
              <p className="engine-kicker">{title} · {isGerman ? 'Ergebnis' : 'result'}</p>
              <h1>{sectionResult.percent}%</h1>
              <strong className="literacy-result-band">{level}</strong>
            </div>
            <div className="literacy-result-stats">
              <div><span>{isGerman ? 'Richtig' : 'Correct'}</span><strong>{sectionResult.correct}/{sectionResult.total}</strong></div>
              <div><span>{isGerman ? 'Verfehlt' : 'Missed'}</span><strong>{sectionResult.total - sectionResult.correct}</strong></div>
            </div>
          </div>

          <div className="literacy-result-meaning">
            <p className="engine-kicker">{isGerman ? 'WAS DIE ZAHL AUSSAGT' : 'WHAT THE NUMBER SAYS'}</p>
            <h2>{meaning}</h2>
            <p>{description}</p>
            <p className="literacy-benchmark-note">{isGerman
              ? 'Einen Vergleich wie „besser als X %“ zeigen wir erst, wenn genügend echte, anonyme Ergebnisse für eine belastbare Vergleichsgruppe vorliegen.'
              : 'A “better than X% of players” comparison will appear only when enough real, anonymous attempts exist to make that benchmark meaningful.'}</p>
          </div>

          <div className="engine-result-actions literacy-result-actions">
            <button className="engine-primary-link" type="button" onClick={shareResult}>{shared ? (isGerman ? 'Kopiert' : 'Shared') : (isGerman ? 'Ergebnis teilen' : 'Share result')}</button>
            <button className="engine-primary-link secondary" type="button" onClick={restart}>{isGerman ? `${title} wiederholen` : `Retake ${title}`}</button>
            <Link className="engine-primary-link secondary" href="/">{isGerman ? 'Zurück zu Politangle' : 'Back to Politangle'}</Link>
          </div>
        </article>

        <article className="engine-card literacy-review-card">
          <p className="engine-kicker">{isGerman ? 'AUSWERTUNG' : 'REVIEW'}</p>
          <h2>{missed.length === 0 ? (isGerman ? 'Keine Fehler.' : 'No misses.') : (isGerman ? 'Die Fragen, die Sie verfehlt haben.' : 'The questions you missed.')}</h2>
          {missed.length === 0 ? (
            <p className="result-lede">{isGerman ? `Sie haben alle ${sectionResult.total} Fragen richtig beantwortet.` : `You got all ${sectionResult.total} questions right.`}</p>
          ) : (
            <div className="literacy-missed-list">
              {missed.map(({ question, answer, orderIndex }) => {
                const correct = question.acceptedAnswerSets[0];
                return (
                  <section className="literacy-missed-item" key={question.id}>
                    <span className="literacy-missed-number">{String(orderIndex + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{localizedPrompt(question)}</h3>
                      <div className="literacy-answer-review">
                        <p><span>{isGerman ? 'Ihre Antwort' : 'Your answer'}</span><strong>{answer.map((id) => localizedOption(question, id)).join(', ')}</strong></p>
                        <p><span>{isGerman ? 'Richtige Antwort' : 'Correct answer'}</span><strong>{correct.map((id) => localizedOption(question, id)).join(', ')}</strong></p>
                      </div>
                      <p className="literacy-review-explanation">{localizedExplanation(question)}</p>
                    </div>
                  </section>
                );
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
      <div className="engine-progress-row">
        <span>{title} · {feedbackMode === 'end' ? `${progress.answered}/${progress.total}` : `${progress.checked}/${progress.total}`}</span>
        <div className="engine-progress" aria-label={`${Math.round(((feedbackMode === 'end' ? progress.answered : progress.checked) / progress.total) * 100)}% complete`}>
          <span style={{ width: `${Math.round(((feedbackMode === 'end' ? progress.answered : progress.checked) / progress.total) * 100)}%` }} />
        </div>
        <button type="button" className="engine-link-button" onClick={restart}>{isGerman ? 'Neu starten' : 'Restart'}</button>
      </div>

      <article className="engine-card literacy-card">
        <p className="engine-kicker">{isGerman ? `Frage ${index + 1} von ${progress.total}` : `Question ${index + 1} of ${progress.total}`}</p>
        <h1 className="literacy-prompt">{prompt}</h1>
        <p className="literacy-instruction">{section === 'classify'
          ? (isGerman ? 'Wählen Sie die passendste Tradition.' : 'Choose the closest tradition.')
          : (isGerman ? 'Wählen Sie die beste Antwort.' : 'Choose the best answer.')}</p>
        <div className="deep-options literacy-options">
          {orderedOptions.map((option) => (
            <button type="button" disabled={feedbackMode === 'instant' && checked} className={selected.includes(option.id) ? 'deep-option selected' : 'deep-option'} key={option.id} onClick={() => choose(option.id)}>{localizedOption(current, option.id)}</button>
          ))}
        </div>

        {feedbackMode === 'instant' && checked && itemResult && (
          <div className="literacy-feedback">
            <p className="engine-kicker">{itemResult.correct ? (isGerman ? 'Richtig' : 'Correct') : (isGerman ? 'Nicht ganz' : 'Not quite')}</p>
            {!itemResult.correct && <p><strong>{isGerman ? 'Beste Antwort:' : 'Best answer:'}</strong> {correctLabels}</p>}
            <p>{localizedExplanation(current)}</p>
          </div>
        )}
      </article>

      {feedbackMode === 'instant' ? (
        <div className="engine-nav literacy-nav">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{isGerman ? 'Zurück' : 'Previous'}</button>
          <span>{index + 1} / {progress.total}</span>
          {checked
            ? <button type="button" onClick={nextInstant}>{index === progress.total - 1 ? (isGerman ? `${title}-Ergebnis` : `See ${title} result`) : (isGerman ? 'Weiter' : 'Next')}</button>
            : <button type="button" onClick={check} disabled={!selected.length}>{isGerman ? 'Antwort prüfen' : 'Check answer'}</button>}
        </div>
      ) : (
        <div className="engine-nav literacy-nav literacy-fast-nav">
          <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>{isGerman ? 'Zurück' : 'Back'}</button>
          <span>{index + 1} / {progress.total}</span>
          {current.multiSelect
            ? <button type="button" onClick={continuePublicMultiSelect} disabled={!selected.length}>{isGerman ? 'Weiter' : 'Continue'}</button>
            : <span className="literacy-auto-note">{isGerman ? 'Antwort wählen → weiter' : 'Choose an answer → next'}</span>}
        </div>
      )}
    </section>
  );
}
