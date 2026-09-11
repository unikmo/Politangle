import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import {
  schoolJuniorLiteracyExplanation,
  schoolJuniorLiteracyOption,
  schoolJuniorLiteracyPrompt,
  schoolJuniorLiteracyQuestions,
} from './school-junior-literacy';

function words(value: string) { return value.trim().split(/\s+/).filter(Boolean).length; }

test('Junior literacy is a short independent bank for ages 10 to 13', () => {
  assert.equal(schoolJuniorLiteracyQuestions.length, 8);
  assert.equal(new Set(schoolJuniorLiteracyQuestions.map((question) => question.id)).size, 8);
  assert.ok(schoolJuniorLiteracyQuestions.every((question) => /^JQ\d+$/.test(question.id)));
  assert.ok(schoolJuniorLiteracyQuestions.every((question) => question.options.length === 4));
});

test('Junior literacy keeps an eleven-year-old reading load instead of reusing adult stems', () => {
  const banned = /subsidiarity|pluralism|nativism|means of production|thin-centered|autocratization|majoritarian|constitutionalism|establishment|welfare state|rule of law|liberal democracy/i;
  for (const question of schoolJuniorLiteracyQuestions) {
    assert.ok(words(question.prompt) <= 22, `${question.id} prompt is too long: ${words(question.prompt)} words`);
    assert.doesNotMatch(question.prompt, banned, `${question.id} uses specialist language in the prompt`);
    for (const option of question.options) {
      assert.ok(words(option.label) <= 15, `${question.id}/${option.id} option is too long`);
      assert.doesNotMatch(option.label, banned, `${question.id}/${option.id} uses specialist language`);
    }
  }
});

test('Junior literacy directly teaches democracy, communism, ownership and cross-cutting nationalism', () => {
  const text = schoolJuniorLiteracyQuestions.map((question) => `${question.prompt} ${question.explanation}`).join(' ');
  assert.match(text, /democracy/i);
  assert.match(text, /communis/i);
  assert.match(text, /public ownership|owning a railway/i);
  assert.match(text, /left or right/i);
});

test('every Junior literacy question is evidence-bound', () => {
  for (const question of schoolJuniorLiteracyQuestions) {
    assert.ok(question.evidenceIds.length > 0, `${question.id} needs evidence`);
    for (const id of question.evidenceIds) assert.ok(evidenceById.has(id), `${question.id} has unknown evidence ${id}`);
  }
});

test('Junior literacy has complete German Spanish and French question content', () => {
  for (const question of schoolJuniorLiteracyQuestions) {
    for (const locale of ['de', 'es', 'fr'] as const) {
      assert.notEqual(schoolJuniorLiteracyPrompt(locale, question), question.prompt, `${question.id} prompt missing ${locale}`);
      assert.notEqual(schoolJuniorLiteracyExplanation(locale, question), question.explanation, `${question.id} explanation missing ${locale}`);
      const translatedOptions = question.options.map((option) => schoolJuniorLiteracyOption(locale, question, option.id));
      assert.equal(translatedOptions.length, 4);
      assert.ok(translatedOptions.every(Boolean));
    }
  }
});
