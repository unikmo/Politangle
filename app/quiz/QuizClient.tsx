'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { answerOptions, quickQuestions } from '../../lib/questions';
import { calculateQuickResult, type Answers } from '../../lib/scoring';

function shuffledQuestions() {
  return [...quickQuestions]
    .map((question) => ({ question, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ question }) => question);
}

export default function QuizClient() {
  const router = useRouter();
  const questions = useMemo(() => shuffledQuestions(), []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const current = questions[index];
  const selected = answers[current.id];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  function choose(value: number) {
    const next = { ...answers, [current.id]: value };
    setAnswers(next);

    if (index < questions.length - 1) {
      window.setTimeout(() => setIndex((value) => value + 1), 120);
    }
  }

  function finish() {
    if (answeredCount < questions.length) return;
    const result = calculateQuickResult(answers);
    sessionStorage.setItem('politangle.quick.result', JSON.stringify(result));
    sessionStorage.setItem('politangle.quick.answers', JSON.stringify(answers));
    router.push('/results');
  }

  return (
    <div className="quiz-shell">
      <div className="quiz-progress-row">
        <span>{answeredCount} of {questions.length}</span>
        <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
        <span>{progress}%</span>
      </div>

      <section className="quiz-card">
        <div className="quiz-kicker">POLITANGLE QUICK · VALIDATION EDITION</div>
        <p className="quiz-dimension">Statement {index + 1}</p>
        <h1>{current.text}</h1>
        <p className="quiz-help">Answer what you believe, not what you think a political group would say.</p>

        <div className="answer-grid" role="radiogroup" aria-label="Answer options">
          {answerOptions.map((option) => (
            <button
              type="button"
              key={option.label}
              className={selected === option.value ? 'answer-option selected' : 'answer-option'}
              onClick={() => choose(option.value)}
              role="radio"
              aria-checked={selected === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <div className="quiz-nav-row">
        <button type="button" className="text-button" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>← Previous</button>
        <span>Your raw answers are kept in this browser session for this staging demo.</span>
        {index === questions.length - 1 ? (
          <button type="button" className="button button-dark" disabled={answeredCount < questions.length} onClick={finish}>See my result</button>
        ) : (
          <button type="button" className="text-button" onClick={() => setIndex((value) => Math.min(questions.length - 1, value + 1))}>Next →</button>
        )}
      </div>
    </div>
  );
}
