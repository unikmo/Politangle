import assert from 'node:assert/strict';
import test from 'node:test';
import { deepLiteracyQuestions } from './deep-bank';
import { germanLiteracyExplanation, germanLiteracyOption, germanLiteracyPrompt, germanLiteracyQuestionCount } from './german-literacy';

test('German candidate form retains its translated core while the expanded bank can fall back cleanly to English', () => {
  assert.equal(germanLiteracyQuestionCount, 15);
  for (const id of ['C1','C2','C3','C4','C5','C6','C7','C8','C9']) {
    const question = deepLiteracyQuestions.find((item) => item.id === id)!;
    assert.ok(germanLiteracyPrompt(id));
    for (const option of question.options) assert.notEqual(germanLiteracyOption(option.id, option.label), option.label);
    assert.notEqual(germanLiteracyExplanation(id, question.explanation), question.explanation);
  }
});

test('German C5 now teaches broad conservatism rather than Christian democracy', () => {
  const question = deepLiteracyQuestions.find((item) => item.id === 'C5')!;
  assert.deepEqual(question.acceptedAnswerSets, [['conservatism']]);
  assert.match(germanLiteracyExplanation('C5', question.explanation), /Konservatismus/i);
});
