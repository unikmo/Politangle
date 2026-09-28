import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { evidenceById } from './evidence';
import { MIDDLE_CLASS_TRAP_READING } from './middle-class-trap-reading';
import { MIDDLE_CLASS_TRAP_ANGLES, MIDDLE_CLASS_TRAP_ANGLE_MEANINGS, MIDDLE_CLASS_TRAP_BLOCK_SIZE, MIDDLE_CLASS_TRAP_SIZE, middleClassTrapQuiz, selectMiddleClassTrapQuiz } from './middle-class-trap-quiz';

function words(value:string) { return value.trim().split(/\s+/).filter(Boolean).length; }

test('middle class trap contains ten understanding and ten solidarity questions', () => {
  assert.equal(middleClassTrapQuiz.length, MIDDLE_CLASS_TRAP_SIZE);
  assert.equal(new Set(middleClassTrapQuiz.map((question) => question.id)).size, MIDDLE_CLASS_TRAP_SIZE);
  const understanding = middleClassTrapQuiz.filter((question) => question.kind === 'understanding');
  const solidarity = middleClassTrapQuiz.filter((question) => question.kind === 'solidarity');
  assert.equal(understanding.length, MIDDLE_CLASS_TRAP_BLOCK_SIZE);
  assert.equal(solidarity.length, MIDDLE_CLASS_TRAP_BLOCK_SIZE);
  for (const angle of MIDDLE_CLASS_TRAP_ANGLES) {
    assert.equal(understanding.filter((question) => question.angle === angle).length, 2, angle);
    assert.ok(MIDDLE_CLASS_TRAP_ANGLE_MEANINGS[angle].length > 40, `${angle} needs a useful result explanation`);
  }
  assert.deepEqual(selectMiddleClassTrapQuiz().map((question) => question.id), middleClassTrapQuiz.map((question) => question.id));
});

test('every middle class trap question is plain, structurally valid and evidence-bound', () => {
  for (const question of middleClassTrapQuiz) {
    assert.equal(question.status, 'candidate');
    assert.equal(question.options.length, 4, question.id);
    if (question.kind === 'understanding') {
      assert.equal(question.options.filter((option) => option.id === question.answerId).length, 1, question.id);
    } else {
      assert.deepEqual([...question.options.map((option) => option.solidarity)].sort((a,b) => a-b), [-2,-1,1,2], question.id);
    }
    assert.ok(words(question.prompt) <= 24, `${question.id} prompt is too long`);
    assert.ok(words(question.hint) <= 20, `${question.id} hint is too long`);
    assert.ok(words(question.explanation) <= 30, `${question.id} explanation is too long`);
    for (const option of question.options) {
      assert.ok(words(option.label) <= 14, `${question.id}/${option.id} label is too long`);
      assert.ok(option.feedback.trim().length > 0, `${question.id}/${option.id} has no feedback`);
    }
    for (const evidenceId of question.evidenceIds) assert.ok(evidenceById.has(evidenceId), `${question.id} references ${evidenceId}`);
  }
});

test('quiz avoids directing votes or treating wealth and poverty as moral identities', () => {
  const copy = JSON.stringify(middleClassTrapQuiz).toLowerCase();
  for (const phrase of ['vote for', 'vote against', 'rich people are', 'poor people are', 'the elite always', 'the poor always']) assert.ok(!copy.includes(phrase), phrase);
});

test('reader-facing questions avoid academic policy language', () => {
  const copy = JSON.stringify(middleClassTrapQuiz).toLowerCase();
  for (const phrase of [
    'capital income',
    'distributional',
    'progressive by ability',
    'upward identification',
    'material vulnerability',
    'private replacement costs',
    'economic position',
  ]) assert.ok(!copy.includes(phrase), phrase);

  const understanding = middleClassTrapQuiz.filter((question) => question.kind === 'understanding');
  for (const question of understanding) {
    assert.match(question.prompt, /€|tax|salary|wages|home|family|state|campaign|company/i, `${question.id} needs a familiar anchor`);
  }
});

test('recommended reading gives every title a substantial introduction and destination', () => {
  assert.equal(MIDDLE_CLASS_TRAP_READING.length, 5);
  for (const item of MIDDLE_CLASS_TRAP_READING) {
    assert.equal(item.introduction.length, 6, `${item.title} needs six introductory sentences`);
    assert.ok(item.introduction.every((sentence) => sentence.trim().length >= 40), `${item.title} has an underdeveloped sentence`);
    assert.match(item.href, /^https:\/\//, `${item.title} needs a link`);
    assert.match(item.linkLabel, /buy|read/i, `${item.title} needs a clear link label`);
  }
});

test('quiz play withholds answers and scores until the final result', () => {
  const client = readFileSync(new URL('../app/middle-class-trap/MiddleClassTrapClient.tsx', import.meta.url), 'utf8');
  for (const oldCue of ['correct so far', 'Check answer', 'Record choice', 'NOT QUITE', '`SOLIDARITY ${']) {
    assert.ok(!client.includes(oldCue), `play flow still exposes ${oldCue}`);
  }
  assert.ok(client.includes('Choose one answer to continue.'));
  assert.ok(client.includes('COMPLETE ANSWER REVIEW'));
  assert.ok(client.includes('POLICY PRIORITY'));
});
