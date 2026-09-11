import assert from 'node:assert/strict';
import test from 'node:test';
import {
  answerBeliefV2,
  beliefV2OverallProgress,
  beliefV2StageProgress,
  completeBeliefV2Session,
  createBeliefV2Session,
  displayedToStoredBeliefV2Answer,
  firstUnansweredIndex,
  getBeliefV2Item,
  isBeliefV2PoleFlipped,
  modeProgress,
  parseBeliefV2Session,
  storedToDisplayedBeliefV2Answer,
} from './belief-v2-session';

test('BELIEVE session deterministically contains 26 Quick and 16 Full questions', () => {
  const first = createBeliefV2Session('same-seed', '2026-09-07T00:00:00.000Z');
  const second = createBeliefV2Session('same-seed', '2026-09-07T00:00:00.000Z');
  assert.deepEqual(first.quickOrder, second.quickOrder);
  assert.deepEqual(first.deepOrder, second.deepOrder);
  assert.equal(first.quickOrder.length, 26);
  assert.equal(first.deepOrder.length, 16);
  assert.equal(new Set([...first.quickOrder, ...first.deepOrder]).size, 42);
});

test('Quick asks abortion and private-adult autonomy only once each', () => {
  const session = createBeliefV2Session('sensitive-construct-balance');
  const constructs = session.quickOrder.map((id) => getBeliefV2Item(id)!.construct);
  assert.equal(constructs.filter((construct) => construct === 'abortion').length, 1);
  assert.equal(constructs.filter((construct) => construct === 'personal-autonomy').length, 1);
  assert.equal(constructs.filter((construct) => construct === 'religion-public-role').length, 2);
  assert.equal(constructs.filter((construct) => construct === 'subsidiarity').length, 2);
});

test('the user sees each source item only once across Quick and Full', () => {
  const session = createBeliefV2Session('one-source-one-question');
  const sourceIds = [...session.quickOrder, ...session.deepOrder].map((id) => getBeliefV2Item(id)!.sourceItemId);
  assert.equal(sourceIds.length, 42);
  assert.equal(new Set(sourceIds).size, 42);
});

test('all forty-two selected questions are required to complete BELIEVE', () => {
  let session = createBeliefV2Session('complete-test');
  assert.throws(() => completeBeliefV2Session(session));
  for (const id of [...session.quickOrder, ...session.deepOrder]) session = answerBeliefV2(session, id, 0);
  assert.deepEqual(beliefV2OverallProgress(session), { answered: 42, unsure: 0, total: 42, complete: true, percent: 100 });
  assert.doesNotThrow(() => completeBeliefV2Session(session));
});

test('Quick and Full progress stay separate while overall progress joins them', () => {
  let session = createBeliefV2Session('progress-test');
  for (const id of session.quickOrder) session = answerBeliefV2(session, id, 0);
  assert.equal(beliefV2StageProgress(session, 'quick').complete, true);
  assert.equal(beliefV2StageProgress(session, 'deep').complete, false);
  assert.equal(beliefV2OverallProgress(session).answered, 26);
  assert.equal(beliefV2OverallProgress(session).total, 42);
});

test('a skipped Quick response can always be located from the final screen', () => {
  let session = createBeliefV2Session('missing-answer-test');
  const missing = session.quickOrder[7];
  for (const id of session.quickOrder) if (id !== missing) session = answerBeliefV2(session, id, 0);
  assert.equal(firstUnansweredIndex(session, 'quick'), 7);
  session = answerBeliefV2(session, missing, 0);
  assert.equal(firstUnansweredIndex(session, 'quick'), null);
});

test('Think Feel Act mode progress contains fourteen questions each', () => {
  const session = createBeliefV2Session('mode-test');
  assert.equal(modeProgress(session, 'think').total, 14);
  assert.equal(modeProgress(session, 'feel').total, 14);
  assert.equal(modeProgress(session, 'act').total, 14);
});

test('pole flipping preserves midpoint and unsure while reversing directional answers', () => {
  const session = createBeliefV2Session('flip-test');
  const item = getBeliefV2Item(session.quickOrder[0])!;
  const flipped = isBeliefV2PoleFlipped(session.seed, item.id);
  assert.equal(displayedToStoredBeliefV2Answer(-2, flipped), flipped ? 2 : -2);
  assert.equal(storedToDisplayedBeliefV2Answer(2, flipped), flipped ? -2 : 2);
  assert.equal(displayedToStoredBeliefV2Answer(0, flipped), 0);
  assert.equal(displayedToStoredBeliefV2Answer('unsure', flipped), 'unsure');
});

test('BELIEVE v2 session round-trips safely and rejects invalid stored data', () => {
  let session = createBeliefV2Session('parse-test', '2026-09-07T00:00:00.000Z');
  session = answerBeliefV2(session, session.quickOrder[0], 2);
  assert.deepEqual(parseBeliefV2Session(JSON.stringify(session)), session);
  const invalid = { ...session, quickOrder: [...session.quickOrder, 'UNKNOWN'] };
  assert.equal(parseBeliefV2Session(JSON.stringify(invalid)), null);
});
