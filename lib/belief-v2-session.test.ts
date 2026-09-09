import assert from 'node:assert/strict';
import test from 'node:test';
import {
  answerBeliefV2,
  beliefV2OverallProgress,
  beliefV2StageProgress,
  completeBeliefV2Session,
  createBeliefV2Session,
  displayedToStoredBeliefV2Answer,
  getBeliefV2Item,
  isBeliefV2PoleFlipped,
  modeProgress,
  parseBeliefV2Session,
  storedToDisplayedBeliefV2Answer,
} from './belief-v2-session';
import { lockedBeliefItemsV2 } from './belief-v2-engine';

test('BELIEVE v2 session deterministically contains 26 Quick and 16 Deep items', () => {
  const first = createBeliefV2Session('same-seed', '2026-09-07T00:00:00.000Z');
  const second = createBeliefV2Session('same-seed', '2026-09-07T00:00:00.000Z');
  assert.deepEqual(first.quickOrder, second.quickOrder);
  assert.deepEqual(first.deepOrder, second.deepOrder);
  assert.equal(first.quickOrder.length, 26);
  assert.equal(first.deepOrder.length, 16);
  assert.equal(new Set([...first.quickOrder, ...first.deepOrder]).size, 42);
});

test('all forty-two locked items are required to complete BELIEVE v2', () => {
  let session = createBeliefV2Session('complete-test');
  assert.throws(() => completeBeliefV2Session(session));
  for (const item of lockedBeliefItemsV2) session = answerBeliefV2(session, item.id, 0);
  assert.deepEqual(beliefV2OverallProgress(session), { answered: 42, unsure: 0, total: 42, complete: true, percent: 100 });
  assert.doesNotThrow(() => completeBeliefV2Session(session));
});

test('Quick and Deep progress stay separate while overall progress joins them', () => {
  let session = createBeliefV2Session('progress-test');
  for (const id of session.quickOrder) session = answerBeliefV2(session, id, 0);
  assert.equal(beliefV2StageProgress(session, 'quick').complete, true);
  assert.equal(beliefV2StageProgress(session, 'deep').complete, false);
  assert.equal(beliefV2OverallProgress(session).answered, 26);
  assert.equal(beliefV2OverallProgress(session).total, 42);
});

test('Think Feel Act mode progress contains fourteen items each', () => {
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
