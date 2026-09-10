import assert from 'node:assert/strict';
import test from 'node:test';
import { deepLiteracyQuestions } from './deep-bank';
import { germanLiteracyOption, germanLiteracyPrompt, germanLiteracyQuestionCount } from './german-literacy';

test('German literacy candidate form covers all 15 questions and their options', () => {
  assert.equal(germanLiteracyQuestionCount, 15);
  for (const question of deepLiteracyQuestions) {
    assert.ok(germanLiteracyPrompt(question.id));
    for (const option of question.options) assert.notEqual(germanLiteracyOption(option.id, option.label), option.label);
  }
});
