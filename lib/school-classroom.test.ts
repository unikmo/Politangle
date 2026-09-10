import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildClassroomActivity,
  classroomActivityOptions,
  classroomFullIds,
  classroomLiteracyIds,
  classroomQuickIds,
  getClassroomQuestion,
  publicClassroomQuestion,
  validateClassroomResponse,
} from './school-classroom';
import { lockedBeliefItemsV2 } from './belief-v2-engine';

test('classroom exposes locked Quick 26, Full 42 and 15 literacy questions', () => {
  assert.equal(classroomQuickIds.length, 26);
  assert.equal(classroomFullIds.length, 42);
  assert.equal(classroomLiteracyIds.length, 15);
  assert.equal(new Set(classroomFullIds).size, 42);
});

test('teacher can configure all core classroom activity types', () => {
  assert.equal(buildClassroomActivity({ type: 'quick26', pacing: 'teacher', projectorMode: 'reveal' })?.questionIds.length, 26);
  assert.equal(buildClassroomActivity({ type: 'full42', pacing: 'student', projectorMode: 'live' })?.questionIds.length, 42);
  assert.equal(buildClassroomActivity({ type: 'literacy' })?.questionIds.length, 15);
  assert.equal(buildClassroomActivity({ type: 'guided', lessonId: 'room-stand' })?.questionIds.length, 7);
  assert.equal(buildClassroomActivity({ type: 'guided', lessonId: 'quick26-lab' })?.questionIds.length, 26);
  assert.equal(buildClassroomActivity({ type: 'guided', lessonId: 'junior-social-media' })?.ageBand, 'junior-10-13');
  assert.equal(buildClassroomActivity({ type: 'custom', title: 'Two questions', questionIds: ['T01', 'C1'] })?.questionIds.length, 2);
  assert.equal(buildClassroomActivity({ type: 'custom', questionIds: ['bad-id'] }), null);
});

test('classroom exposes separate Junior and Youth candidate forms', () => {
  const junior = buildClassroomActivity({ type: 'junior', ageBand: 'junior-10-13' })!;
  assert.equal(junior.questionIds.length, 16);
  assert.equal(junior.ageBand, 'junior-10-13');
  assert.ok(junior.questionIds.every((id) => id.startsWith('J')));
  const youth = buildClassroomActivity({ type: 'full42', ageBand: 'youth-14-18' })!;
  assert.equal(youth.questionIds.length, 42);
  assert.equal(youth.ageBand, 'youth-14-18');
  assert.notEqual(getClassroomQuestion('T01', 'youth-14-18')?.statement, lockedBeliefItemsV2.find((item) => item.id === 'T01')?.positive);
});

test('public BELIEVE questions expose exactly one statement and an agreement scale', () => {
  const question = publicClassroomQuestion('T01', false, 'youth-14-18')!;
  assert.ok(question.statement);
  assert.equal('negative' in question, false);
  assert.equal('positive' in question, false);
  assert.deepEqual(question.options.map((option) => option.label), [
    'Strongly disagree', 'Disagree', 'Neither / it depends', 'Agree', 'Strongly agree', 'Not sure / I do not understand',
  ]);
});

test('legacy Junior rooms migrate to the 10-13 band', () => {
  const migrated = buildClassroomActivity({ type: 'junior', ageBand: 'junior-12-13' })!;
  assert.equal(migrated.ageBand, 'junior-10-13');
});

test('student-safe literacy question does not expose answer key before reveal', () => {
  const hidden = publicClassroomQuestion('C1', false)!;
  assert.equal(hidden.kind, 'literacy');
  assert.equal(hidden.acceptedAnswerSets, undefined);
  assert.equal(hidden.explanation, undefined);
  const revealed = publicClassroomQuestion('C1', true)!;
  assert.ok(revealed.acceptedAnswerSets?.length);
  assert.ok(revealed.explanation);
});

test('BELIEVE classroom responses accept five-point scale plus unsure', () => {
  for (const answer of ['-2', '-1', '0', '1', '2', 'unsure']) {
    assert.ok(validateClassroomResponse({ participantToken: 'anonymous-browser-123', questionId: 'T01', answer }));
  }
  assert.equal(validateClassroomResponse({ participantToken: 'anonymous-browser-123', questionId: 'T01', answer: '7' }), null);
});

test('literacy classroom responses are validated against canonical options', () => {
  const q = getClassroomQuestion('C1')!;
  const option = q.options[0].id;
  assert.ok(validateClassroomResponse({ participantToken: 'anonymous-browser-123', questionId: 'C1', answer: [option] }));
  assert.equal(validateClassroomResponse({ participantToken: 'anonymous-browser-123', questionId: 'C1', answer: ['not-an-option'] }), null);
});

test('activity metadata exposes guided lesson choices without student identities', () => {
  const options = classroomActivityOptions();
  assert.equal(options.quick26.length, 26);
  assert.equal(options.full42.length, 42);
  assert.equal(options.literacy.length, 15);
  assert.equal(options.junior.length, 16);
  assert.equal(options.lessons.length, 8);
});
