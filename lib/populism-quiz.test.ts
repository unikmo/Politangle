import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import {
  POPULISM_QUIZ_ANGLES,
  POPULISM_QUIZ_SIZE,
  populismQuizBank,
  selectPopulismQuiz,
} from './populism-quiz';

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('populism bank has three candidate questions for every angle', () => {
  assert.equal(populismQuizBank.length, 18);
  assert.equal(new Set(populismQuizBank.map((question) => question.id)).size, 18);
  for (const angle of POPULISM_QUIZ_ANGLES) {
    assert.equal(populismQuizBank.filter((question) => question.angle === angle).length, 3, angle);
  }
});

test('every populism question is plain, single-answer and evidence-bound', () => {
  for (const question of populismQuizBank) {
    assert.equal(question.status, 'candidate');
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options.map((option) => option.id)).size, 4, question.id);
    assert.equal(question.options.filter((option) => option.id === question.answerId).length, 1, question.id);
    assert.ok(wordCount(question.prompt) <= 22, `${question.id} prompt is too long`);
    assert.ok(wordCount(question.explanation) <= 28, `${question.id} explanation is too long`);
    assert.ok(question.hint.trim().length > 0, `${question.id} has no hint`);
    for (const option of question.options) {
      assert.ok(wordCount(option.label) <= 16, `${question.id}/${option.id} is too long`);
      assert.ok(option.feedback.trim().length > 0, `${question.id}/${option.id} has no feedback`);
    }
    for (const evidenceId of question.evidenceIds) assert.ok(evidenceById.has(evidenceId), `${question.id} references ${evidenceId}`);
  }
});

test('each run draws twelve questions with two from every angle', () => {
  for (let seed = 0; seed < 50; seed += 1) {
    const selected = selectPopulismQuiz(seed);
    assert.equal(selected.length, POPULISM_QUIZ_SIZE);
    assert.equal(new Set(selected.map((question) => question.id)).size, POPULISM_QUIZ_SIZE);
    for (const angle of POPULISM_QUIZ_ANGLES) {
      assert.equal(selected.filter((question) => question.angle === angle).length, 2, `${angle} at seed ${seed}`);
    }
  }
});

test('balanced runs vary across seeds', () => {
  const runs = new Set(Array.from({ length: 50 }, (_, seed) => selectPopulismQuiz(seed).map((question) => question.id).sort().join(',')));
  assert.ok(runs.size >= 10, `only ${runs.size} distinct runs`);
});

