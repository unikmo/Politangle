import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import { schoolBaselineQuestions, schoolLearningCards, schoolParallelPairs, schoolPostQuestions } from './school-literacy';

test('school baseline and post-test each preserve 9 CLASSIFY plus 6 UNDERSTAND targets', () => {
  for (const bank of [schoolBaselineQuestions, schoolPostQuestions]) {
    assert.equal(bank.length, 15);
    assert.equal(bank.filter((q) => q.section === 'classify').length, 9);
    assert.equal(bank.filter((q) => q.section === 'understand').length, 6);
  }
});

test('post-test is a one-to-one content-matched parallel-form candidate rather than repeated prompts', () => {
  assert.equal(schoolParallelPairs.length, 15);
  assert.equal(new Set(schoolParallelPairs.map((pair) => pair.baselineId)).size, 15);
  assert.equal(new Set(schoolParallelPairs.map((pair) => pair.postId)).size, 15);
  for (const pair of schoolParallelPairs) {
    const baseline = schoolBaselineQuestions.find((q) => q.id === pair.baselineId)!;
    const post = schoolPostQuestions.find((q) => q.id === pair.postId)!;
    assert.equal(baseline.section, post.section);
    assert.notEqual(baseline.prompt, post.prompt);
  }
});

test('school literacy and learning cards are evidence-bound', () => {
  for (const item of [...schoolPostQuestions, ...schoolLearningCards]) {
    assert.ok(item.evidenceIds.length > 0);
    for (const id of item.evidenceIds) assert.ok(evidenceById.has(id), `${item.id} references unknown evidence ${id}`);
  }
});

test('school learning keeps narrow concepts contextual instead of expanding the five headline families', () => {
  const titles = schoolLearningCards.map((card) => card.title);
  assert.ok(titles.includes('Liberalism'));
  assert.ok(titles.includes('Conservatism'));
  assert.ok(titles.includes('Social democracy'));
  assert.ok(titles.includes('Socialism'));
  assert.ok(titles.includes('Green politics'));
  assert.equal(titles.includes('Democratic socialism'), false);
});
