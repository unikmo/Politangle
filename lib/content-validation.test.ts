import assert from 'node:assert/strict';
import test from 'node:test';
import { allDeepBeliefQuestions, deepLiteracyQuestions } from './deep-bank';
import { deepBeliefAxisMeta, validateDeepBeliefQuestion, validateLiteracyQuestion } from './deep-engine';
import { evidenceById } from './evidence';
import { quickQuestions } from './questions';

function assertEvidence(ids: readonly string[], label: string) {
  assert.ok(ids.length > 0, `${label} needs evidence`);
  for (const id of ids) assert.ok(evidenceById.has(id), `${label} references unknown evidence ${id}`);
}

function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

test('Quick v2 has 26 paired items with auditable evidence', () => {
  assert.equal(quickQuestions.length, 26);
  for (const question of quickQuestions) {
    assert.ok(question.negative.trim());
    assert.ok(question.positive.trim());
    assert.notEqual(question.negative, question.positive);
    assertEvidence(question.evidenceIds, `Quick ${question.id}`);
  }
});

test('Quick explicitly measures abortion as a balanced social-values item', () => {
  const abortion = quickQuestions.find((question) => question.construct === 'abortion and legal autonomy');
  assert.ok(abortion);
  assert.equal(abortion.dimension, 'society');
  assert.ok(abortion.negative.toLowerCase().includes('legally available'));
  assert.ok(abortion.positive.toLowerCase().includes('legal limits'));
  assertEvidence(abortion.evidenceIds, 'Quick abortion');
});

test('Deep belief bank validates every axis and keeps subtype additions deliberately short', () => {
  const axes = Object.keys(deepBeliefAxisMeta) as (keyof typeof deepBeliefAxisMeta)[];
  assert.equal(allDeepBeliefQuestions.length, 16);
  for (const axis of axes) {
    const items = allDeepBeliefQuestions.filter((question) => question.axis === axis);
    const expected = axis === 'religionPublicRole' || axis === 'subsidiarity' ? 1 : 2;
    assert.equal(items.length, expected, `${axis} should have ${expected} content-validation item(s)`);
    for (const question of items) {
      assert.deepEqual(validateDeepBeliefQuestion(question), { valid: true, errors: [] });
      assertEvidence(question.evidenceIds, `Deep belief ${question.id}`);
    }
  }
});

test('Deep explicitly measures citizenship at birth without collapsing it into immigration', () => {
  const citizenship = allDeepBeliefQuestions.find((question) => question.construct === 'citizenship at birth: birthplace versus parentage');
  assert.ok(citizenship);
  assert.equal(citizenship.axis, 'nationhood');
  assert.ok(citizenship.negative.toLowerCase().includes('birth in a country'));
  assert.ok(citizenship.positive.toLowerCase().includes('parent'));
  assertEvidence(citizenship.evidenceIds, 'Deep birthright citizenship');
});

test('Deep adds exactly two conservative-subtype discriminator questions', () => {
  const religion = allDeepBeliefQuestions.find((question) => question.axis === 'religionPublicRole');
  const subsidiarity = allDeepBeliefQuestions.find((question) => question.axis === 'subsidiarity');
  assert.ok(religion);
  assert.ok(subsidiarity);
  assertEvidence(religion.evidenceIds, 'Deep religion/public-role discriminator');
  assertEvidence(subsidiarity.evidenceIds, 'Deep subsidiarity discriminator');
});

test('CLASSIFY and UNDERSTAND each contain 20 independent questions', () => {
  assert.equal(deepLiteracyQuestions.filter((question) => question.section === 'classify').length, 20);
  assert.equal(deepLiteracyQuestions.filter((question) => question.section === 'understand').length, 20);
  assert.equal(deepLiteracyQuestions.length, 40);

  for (const question of deepLiteracyQuestions) {
    assert.deepEqual(validateLiteracyQuestion(question), { valid: true, errors: [] });
    assertEvidence(question.evidenceIds, `Literacy ${question.id}`);
  }
});

test('the generic social-market description is conservatism, not Christian democracy', () => {
  const item = deepLiteracyQuestions.find((question) => question.id === 'C5')!;
  assert.deepEqual(item.acceptedAnswerSets, [['conservatism']]);
  assert.doesNotMatch(item.prompt, /christian|religio|subsidiar/i);
});

test('Christian democracy is used only when distinctive religious and subsidiarity evidence is present', () => {
  const item = deepLiteracyQuestions.find((question) => question.id === 'C11')!;
  assert.deepEqual(item.acceptedAnswerSets, [['christian-democracy']]);
  assert.match(item.prompt, /Christian/i);
  assert.match(item.prompt, /subsidiarity/i);
});

test('UNDERSTAND distractors are substantive instead of making the longest answer obviously correct', () => {
  for (const question of deepLiteracyQuestions.filter((item) => item.section === 'understand')) {
    const correctId = question.acceptedAnswerSets[0][0];
    const correct = question.options.find((option) => option.id === correctId)!;
    const distractors = question.options.filter((option) => option.id !== correctId);
    const correctWords = wordCount(correct.label);
    assert.ok(correctWords >= 10, `${question.id} correct answer is too terse`);
    for (const option of distractors) {
      const words = wordCount(option.label);
      assert.ok(words >= 10, `${question.id} distractor ${option.id} is too terse`);
      assert.ok(Math.abs(words - correctWords) <= 9, `${question.id} option lengths make the key too visually obvious`);
    }
  }
});

test('CLASSIFY answer keys are distributed across source positions before runtime shuffling', () => {
  const positions = deepLiteracyQuestions
    .filter((question) => question.section === 'classify')
    .map((question) => question.options.findIndex((option) => option.id === question.acceptedAnswerSets[0][0]));
  assert.ok(new Set(positions).size >= 4);
  assert.ok(positions.filter((position) => position === 0).length < positions.length / 2);
});

test('public literacy training does not require democratic socialism as a headline concept', () => {
  const visibleText = deepLiteracyQuestions
    .flatMap((question) => [question.prompt, question.explanation, ...question.options.map((option) => option.label)])
    .join(' ')
    .toLowerCase();
  assert.equal(visibleText.includes('democratic socialism'), false);
});

test('narrow socialist concepts stay out of headline literacy while the broad socialism family remains present', () => {
  const classifyTargets = deepLiteracyQuestions
    .filter((question) => question.section === 'classify')
    .flatMap((question) => question.acceptedAnswerSets.flat());
  assert.equal(classifyTargets.includes('democratic-socialism'), false);
  assert.ok(classifyTargets.includes('socialism'));
});
