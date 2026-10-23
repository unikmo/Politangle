import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applySchoolJoin,
  applySchoolResponse,
  closeSchoolQuestion,
  configureSchoolClass,
  createSchoolClassRecord,
  hashSchoolSecret,
  launchSchoolQuestion,
  nextSchoolQuestion,
  publicSchoolClassSummary,
  revealSchoolQuestion,
  schoolClassSummary,
  teacherSchoolClassSummary,
  verifyTeacherKey,
} from './school-aggregate';
import { buildClassroomActivity, validateClassroomResponse } from './school-classroom';

function record() {
  return createSchoolClassRecord('ABC234', hashSchoolSecret('teacher-key'), buildClassroomActivity({ type: 'quick26' })!, 'Year 10');
}

function belief(questionId: string, answer: string, participant = 'anonymous-participant-123') {
  return validateClassroomResponse({ participantToken: participant, questionId, answer })!;
}

function literacy(questionId: string, answer: string, participant = 'anonymous-participant-123') {
  return validateClassroomResponse({ participantToken: participant, questionId, answer: [answer] })!;
}

test('class room has no roster and teacher key is never returned', () => {
  const created = record();
  assert.equal(verifyTeacherKey(created, 'teacher-key'), true);
  assert.equal(verifyTeacherKey(created, 'wrong'), false);
  const pub = publicSchoolClassSummary(created);
  const teacher = teacherSchoolClassSummary(created);
  assert.equal('teacherKeyHash' in pub, false);
  assert.equal('teacherKeyHash' in teacher, false);
  assert.equal('students' in teacher, false);
  assert.deepEqual(teacher.privacy, {
    individualStudentsVisible: false,
    participantAnswerMappingsStored: false,
    politicalAnswersAggregated: true,
    rawParticipantPoliticalProfilesStored: false,
  });
});

test('anonymous joins increase only the room total', () => {
  const joined = applySchoolJoin(applySchoolJoin(record()));
  assert.equal(joined.joinedCount, 2);
  assert.equal('participants' in joined, false);
});

test('teacher can configure and launch Quick, Full, literacy or custom activities', () => {
  let current = record();
  current = configureSchoolClass(current, { type: 'full42', pacing: 'student', projectorMode: 'live' });
  assert.equal(current.activity.questionIds.length, 42);
  assert.equal(current.activity.pacing, 'student');
  current = configureSchoolClass(current, { type: 'custom', questionIds: ['T01-P', 'C1'] });
  current = launchSchoolQuestion(current, 'T01-P');
  assert.equal(current.currentQuestionId, 'T01-P');
  assert.equal(current.questionOpen, true);
  current = closeSchoolQuestion(current);
  assert.equal(current.questionOpen, false);
  current = revealSchoolQuestion(current, true);
  assert.equal(current.revealed, true);
  current = nextSchoolQuestion(current);
  assert.equal(current.currentQuestionId, 'C1');
});

test('BELIEVE answers are stored only as aggregate option buckets', () => {
  let current = record();
  current = applySchoolResponse(current, belief('T01-P', '-2', 'browser-a'));
  current = applySchoolResponse(current, belief('T01-P', '2', 'browser-b'));
  assert.equal(current.questions['T01-P'].responses, 2);
  assert.equal(current.questions['T01-P'].optionCounts['-2'], 1);
  assert.equal(current.questions['T01-P'].optionCounts['2'], 1);
  assert.equal('participantToken' in current.questions['T01-P'], false);
  assert.equal('answers' in current, false);
});

test('teacher suppresses single and four-person political distributions', () => {
 let current=launchSchoolQuestion(record(),'T01-P');
 for(let i=0;i<4;i++){
  current=applySchoolJoin(current);
  current=applySchoolResponse(current,belief('T01-P','-1',`joined-participant-${i}`));
 }
 const teacher=teacherSchoolClassSummary(current);
 assert.equal(teacher.currentDistribution,null);
 assert.equal(teacher.classSummary.questions.find(q=>q.id==='T01-P')!.responses,0);
 assert.ok(teacher.classSummary.families.every(f=>f.overall===null));
 current=applySchoolJoin(current);
 current=applySchoolResponse(current,belief('T01-P','1','joined-participant-4'));
 const allowed=teacherSchoolClassSummary(current);
 assert.equal(allowed.currentDistribution?.responses,5);
 assert.equal(allowed.currentDistribution?.distribution.find(x=>x.id==='-1')?.count,4);
});

test('projector reveal requires a five-response cohort after teacher reveal', () => {
 let current=launchSchoolQuestion(record(),'T01-P');
 current=applySchoolJoin(current);
 current=applySchoolResponse(current,belief('T01-P','1','joined-a'));
 current=revealSchoolQuestion(current,true);
 assert.equal(publicSchoolClassSummary(current).projectorDistribution,null);
 for(let i=0;i<4;i++){
  current=applySchoolJoin(current);
  current=applySchoolResponse(current,belief('T01-P','1',`joined-${i}`));
 }
 assert.equal(publicSchoolClassSummary(current).projectorDistribution?.responses,5);
});

test('live projector also applies the same minimum cohort', () => {
 let current=configureSchoolClass(record(),{type:'quick26',projectorMode:'live'});
 current=launchSchoolQuestion(current,'T01-P');
 current=applySchoolJoin(current);
 current=applySchoolResponse(current,belief('T01-P','0','joined-0'));
 assert.equal(publicSchoolClassSummary(current).projectorDistribution,null);
 for(let i=1;i<5;i++){
  current=applySchoolJoin(current);
  current=applySchoolResponse(current,belief('T01-P','0',`joined-${i}`));
 }
 assert.equal(publicSchoolClassSummary(current).projectorDistribution?.responses,5);
});

test('literacy aggregates expose option distribution and correctness, not individual scores', () => {
  let current = configureSchoolClass(record(), { type: 'literacy' });
  const currentQuestion = teacherSchoolClassSummary(launchSchoolQuestion(current, 'C1')).currentQuestion!;
  const correct = currentQuestion.acceptedAnswerSets![0][0];
  current = applySchoolResponse(current, literacy('C1', correct, 'browser-a'));
  const summary = schoolClassSummary(current);
  assert.equal(summary.literacy.percent, 100);
  assert.equal(summary.questions[0].correctPercent, 100);
});

test('class summary retains split distributions and produces aggregate political views', () => {
  let current = configureSchoolClass(record(), { type: 'full42' });
  for (const id of current.activity.questionIds) {
    current = applySchoolResponse(current, belief(id, '-2', `participant-a-${id}`));
    current = applySchoolResponse(current, belief(id, '2', `participant-b-${id}`));
  }
  const summary = schoolClassSummary(current);
  assert.equal(summary.answeredQuestions, 42);
  assert.equal(summary.polygon.length, 8);
  assert.equal(summary.families.length, 5);
  assert.ok(summary.families.every((family) => family.overall !== null));
  assert.ok(summary.constructModes.every((row) => row.think !== null && row.feel !== null && row.act !== null));
  const first = summary.questions.find((q) => q.id === 'T01-P')!;
  assert.equal(first.distribution.find((item) => item.id === '-2')?.percent, 50);
  assert.equal(first.distribution.find((item) => item.id === '2')?.percent, 50);
});
