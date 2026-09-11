import assert from 'node:assert/strict';
import test from 'node:test';
import { publicLiteracyQuestions } from './public-literacy-v2';
import { publicLiteracyExplanation, publicLiteracyOption, publicLiteracyPrompt } from './public-literacy-i18n';

test('UNDERSTAND keeps 20 questions and gives communism multiple direct distinctions', () => {
  const understand = publicLiteracyQuestions.filter((question) => question.section === 'understand');
  assert.equal(understand.length, 20);
  const communismItems = understand.filter((question) => /communis/i.test(`${question.prompt} ${question.explanation}`));
  assert.ok(communismItems.length >= 4, `expected at least 4 communism-focused UNDERSTAND items, got ${communismItems.length}`);
  for (const id of ['U11', 'U12', 'U17', 'U20']) assert.ok(communismItems.some((question) => question.id === id), `${id} should directly teach a communism distinction`);
});

test('new communism items distinguish socialism, public ownership, and theory from historical states', () => {
  const byId = new Map(publicLiteracyQuestions.map((question) => [question.id, question]));
  assert.match(byId.get('U12')!.prompt, /related to socialism/i);
  assert.match(byId.get('U17')!.prompt, /automatically make a country communist/i);
  assert.match(byId.get('U20')!.prompt, /communist theory.*historical communist-party governments/i);
  assert.deepEqual(byId.get('U12')!.acceptedAnswerSets[0], ['u12-b']);
  assert.deepEqual(byId.get('U17')!.acceptedAnswerSets[0], ['u17-c']);
  assert.deepEqual(byId.get('U20')!.acceptedAnswerSets[0], ['u20-b']);
  assert.deepEqual(byId.get('U12')!.evidenceIds, ['SEP-SOCIALISM', 'OXFORD-COMMUNISM']);
  assert.deepEqual(byId.get('U17')!.evidenceIds, ['SEP-SOCIALISM', 'OXFORD-COMMUNISM']);
  assert.deepEqual(byId.get('U20')!.evidenceIds, ['OXFORD-COMMUNISM', 'SEP-SOCIALISM']);
});

test('every public CLASSIFY and UNDERSTAND item is explicitly localized in DE ES FR', () => {
  assert.equal(publicLiteracyQuestions.length, 40);
  for (const question of publicLiteracyQuestions) {
    for (const locale of ['de', 'es', 'fr'] as const) {
      assert.notEqual(publicLiteracyPrompt(locale, question), question.prompt, `${question.id} prompt should be localized for ${locale}`);
      assert.notEqual(publicLiteracyExplanation(locale, question), question.explanation, `${question.id} explanation should be localized for ${locale}`);
      for (const option of question.options) {
        assert.notEqual(publicLiteracyOption(locale, question, option.id), option.label, `${question.id}/${option.id} should be localized for ${locale}`);
      }
    }
  }
});
