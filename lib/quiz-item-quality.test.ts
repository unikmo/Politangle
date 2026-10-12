import assert from 'node:assert/strict';
import test from 'node:test';
import { populismQuizBank } from './populism-quiz';
import { literacyMasterBankCandidates } from './literacy-master-bank';
import { middleClassTrapQuiz } from './middle-class-trap-quiz';

// Item-writing checks for the multiple-choice quizzes. They guard against two giveaways that let a
// test-wise reader pick the right answer without knowing the content: the correct option being
// noticeably the longest, and wrong options being the ones that contain "always / only / every".

type Item = { id: string; options: readonly { id: string; label: string }[]; correct: string };

const absolute = /\b(always|never|only|every|all|any|entirely|completely|no one|nobody|cannot|must|exactly|automatically|simply|necessarily|permanently)\b/i;

function lengthGapShare(items: Item[]) {
  const gaps = items.filter((item) => {
    const correct = item.options.find((option) => option.id === item.correct)!.label.length;
    const longestWrong = Math.max(...item.options.filter((option) => option.id !== item.correct).map((option) => option.label.length));
    return correct >= longestWrong * 1.2;
  });
  return gaps.length / items.length;
}

function absoluteShares(items: Item[]) {
  let wrong = 0; let wrongAbsolute = 0; let correctAbsolute = 0;
  for (const item of items) {
    for (const option of item.options) {
      if (option.id === item.correct) { if (absolute.test(option.label)) correctAbsolute += 1; continue; }
      wrong += 1; if (absolute.test(option.label)) wrongAbsolute += 1;
    }
  }
  return { wrongShare: wrongAbsolute / wrong, correctShare: correctAbsolute / items.length };
}

const populism: Item[] = populismQuizBank.map((q) => ({ id: q.id, options: q.options, correct: q.answerId }));
const understand: Item[] = literacyMasterBankCandidates.filter((q) => q.section === 'understand').map((q) => ({ id: q.id, options: q.options, correct: (q.acceptedAnswerSets as readonly (readonly string[])[])[0][0] }));
const trap: Item[] = middleClassTrapQuiz.filter((q) => q.kind === 'understanding').map((q) => ({ id: q.id, options: q.options, correct: q.answerId }));
const classify: Item[] = literacyMasterBankCandidates.filter((q) => q.section === 'classify').map((q) => ({ id: q.id, options: q.options, correct: (q.acceptedAnswerSets as readonly (readonly string[])[])[0][0] }));

test('the correct option is not noticeably longer than every wrong option', () => {
  assert.ok(lengthGapShare(populism) <= 0.15, 'populism: correct answers stand out by length');
  assert.ok(lengthGapShare(understand) <= 0.1, 'UNDERSTAND: correct answers stand out by length');
});

test('absolute words do not mark the wrong options', () => {
  for (const [name, items] of [['populism', populism], ['UNDERSTAND', understand], ['CLASSIFY', classify], ['Middle Class Trap', trap]] as const) {
    const { wrongShare, correctShare } = absoluteShares([...items]);
    assert.ok(
      wrongShare - correctShare <= 0.1,
      `${name}: wrong options use absolute words ${Math.round(wrongShare * 100)}% of the time, correct ones ${Math.round(correctShare * 100)}%`,
    );
  }
});

test('quiz banks use US spelling consistently', () => {
  const text = JSON.stringify([populismQuizBank, literacyMasterBankCandidates, middleClassTrapQuiz]);
  assert.doesNotMatch(text, /\b(?:favour|honour|colour|labour|behaviour|neighbour|recognis|organis|centre\b|programme)/i);
});

test('Middle Class Trap solidarity scale: both ends are worded with similar length and weight', () => {
  const solidarity = middleClassTrapQuiz.filter((question) => question.kind === 'solidarity');
  assert.equal(solidarity.length, 10);
  for (const question of solidarity) {
    const low = question.options.find((option) => option.solidarity === -2)!;
    const high = question.options.find((option) => option.solidarity === 2)!;
    assert.ok(Math.abs(low.label.length - high.label.length) <= 15, `${question.id}: the two ends differ too much in length`);
  }
});
