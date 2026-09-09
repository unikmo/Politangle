import assert from 'node:assert/strict';
import test from 'node:test';
import { schoolBaselineQuestions, schoolPostQuestions } from './school-literacy';
import {
  answerSchoolQuestion,
  createSchoolSession,
  markSchoolSubmitted,
  parseSchoolSession,
  revealSchoolPractice,
  schoolAggregatePayload,
  schoolPhaseProgress,
  schoolQuestion,
  schoolResult,
  setSchoolPhase,
} from './school-session';

function answerAll(session = createSchoolSession(42, 'participant-123456', 'ABC234')) {
  let next = session;
  for (const question of schoolBaselineQuestions) next = answerSchoolQuestion(next, 'baseline', question.id, question.acceptedAnswerSets[0]);
  for (const question of schoolPostQuestions) next = answerSchoolQuestion(next, 'post', question.id, question.acceptedAnswerSets[0]);
  return next;
}

test('school session ordering is deterministic and keeps 15 baseline practice and post items', () => {
  const a = createSchoolSession(99, 'participant-123456');
  const b = createSchoolSession(99, 'participant-abcdef');
  assert.deepEqual(a.baselineOrder, b.baselineOrder);
  assert.deepEqual(a.practiceOrder, b.practiceOrder);
  assert.deepEqual(a.postOrder, b.postOrder);
  assert.equal(a.baselineOrder.length, 15);
  assert.equal(a.practiceOrder.length, 15);
  assert.equal(a.postOrder.length, 15);
});

test('baseline and post-test complete on answers while practice requires checked feedback', () => {
  let session = createSchoolSession(1, 'participant-123456');
  const baseline = schoolQuestion(session, 'baseline', 0)!;
  session = answerSchoolQuestion(session, 'baseline', baseline.id, baseline.acceptedAnswerSets[0]);
  assert.equal(schoolPhaseProgress(session, 'baseline').answered, 1);

  const practice = schoolQuestion(session, 'practice', 0)!;
  session = answerSchoolQuestion(session, 'practice', practice.id, practice.acceptedAnswerSets[0]);
  assert.equal(schoolPhaseProgress(session, 'practice').checked, 0);
  session = revealSchoolPractice(session, practice.id);
  assert.equal(schoolPhaseProgress(session, 'practice').checked, 1);
});

test('anonymous class payload contains correctness only and never raw option choices', () => {
  const session = answerAll();
  const payload = schoolAggregatePayload(session, 'baseline');
  assert.equal(payload.phase, 'baseline');
  assert.equal(payload.results?.length, 15);
  assert.ok(payload.results?.every((item) => typeof item.correct === 'boolean'));
  assert.equal(JSON.stringify(payload).includes('acceptedAnswerSets'), false);
  assert.equal(JSON.stringify(payload).includes('baselineAnswers'), false);
});

test('school result reports baseline post-test and change without ideology output', () => {
  const session = answerAll();
  const result = schoolResult(session);
  assert.equal(result.baseline.overall.percent, 100);
  assert.equal(result.post.overall.percent, 100);
  assert.equal(result.change, 0);
  assert.equal('families' in result, false);
  assert.equal('beliefs' in result, false);
});

test('school session round-trips safely and tracks submission flags', () => {
  let session = answerAll();
  session = markSchoolSubmitted(session, 'baseline');
  session = setSchoolPhase(session, 'learn');
  const parsed = parseSchoolSession(JSON.stringify(session));
  assert.ok(parsed);
  assert.equal(parsed?.baselineSubmitted, true);
  assert.equal(parsed?.phase, 'learn');
  assert.equal(parseSchoolSession('{bad json'), null);
});
