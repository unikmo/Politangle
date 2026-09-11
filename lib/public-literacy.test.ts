import assert from 'node:assert/strict';
import test from 'node:test';
import { deClusterLiteracyOrder, publicLiteracyQuestions } from './public-literacy';

test('public literacy keeps 20 CLASSIFY and 20 UNDERSTAND questions', () => {
  const classify = publicLiteracyQuestions.filter((question) => question.section === 'classify');
  const understand = publicLiteracyQuestions.filter((question) => question.section === 'understand');
  assert.equal(classify.length, 20);
  assert.equal(understand.length, 20);
});

test('public CLASSIFY removes answer clues and known academic phrasing from prompts', () => {
  const prompts = publicLiteracyQuestions
    .filter((question) => question.section === 'classify')
    .map((question) => question.prompt.toLowerCase());
  for (const banned of ['center-left', 'far-right movement', 'comparative scholarship', 'coercion', 'subsidiarity']) {
    assert.ok(prompts.every((prompt) => !prompt.includes(banned)), `CLASSIFY prompt still contains ${banned}`);
  }
});

test('public UNDERSTAND uses plain-language stems instead of academic framing', () => {
  const prompts = publicLiteracyQuestions
    .filter((question) => question.section === 'understand')
    .map((question) => question.prompt.toLowerCase());
  for (const banned of ['comparative scholarship', 'thin-centered', 'coercive government', 'institutional obstruction']) {
    assert.ok(prompts.every((prompt) => !prompt.includes(banned)), `UNDERSTAND prompt still contains ${banned}`);
  }
});

test('CLASSIFY includes a direct communism item', () => {
  const question = publicLiteracyQuestions.find((item) => item.id === 'C16');
  assert.ok(question);
  assert.deepEqual(question.acceptedAnswerSets[0], ['communism']);
});

test('de-clustered CLASSIFY order avoids adjacent identical answer keys', () => {
  const classify = publicLiteracyQuestions.filter((question) => question.section === 'classify');
  const byId = new Map(classify.map((question) => [question.id, question]));
  const order = deClusterLiteracyOrder(classify.map((question) => question.id), classify);
  assert.equal(order.length, classify.length);
  assert.deepEqual(new Set(order), new Set(classify.map((question) => question.id)));
  for (let index = 1; index < order.length; index += 1) {
    const previous = byId.get(order[index - 1])!.acceptedAnswerSets[0].join('|');
    const current = byId.get(order[index])!.acceptedAnswerSets[0].join('|');
    assert.notEqual(current, previous, `adjacent CLASSIFY items ${order[index - 1]} and ${order[index]} share ${current}`);
  }
});
