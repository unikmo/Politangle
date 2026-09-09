import assert from 'node:assert/strict';
import test from 'node:test';
import { lockedBeliefItemsV2 } from './belief-v2-engine';
import { schoolJuniorBeliefItems, schoolYouthBeliefItems } from './school-believe';

function words(value: string) { return value.trim().split(/\s+/).length; }

test('Youth form preserves all 42 adult scoring coordinates while changing wording', () => {
  assert.equal(schoolYouthBeliefItems.length, 42);
  for (const adult of lockedBeliefItemsV2) {
    const youth = schoolYouthBeliefItems.find((item) => item.id === adult.id);
    assert.ok(youth);
    assert.equal(youth.construct, adult.construct);
    assert.equal(youth.mode, adult.mode);
    assert.equal(youth.stage, adult.stage);
    assert.equal(youth.quickDimension, adult.quickDimension);
    assert.deepEqual(youth.evidenceIds, adult.evidenceIds);
    assert.notEqual(youth.negative, adult.negative);
    assert.notEqual(youth.positive, adult.positive);
  }
  assert.equal(lockedBeliefItemsV2[0].negative, 'Government should take broad responsibility for ensuring that everyone can obtain essential services.');
});

test('Youth wording has controlled reading load for cognitive testing', () => {
  const sides = schoolYouthBeliefItems.flatMap((item) => [item.negative, item.positive]);
  assert.ok(sides.every((side) => words(side) <= 30));
  assert.ok(sides.reduce((sum, side) => sum + words(side), 0) / sides.length <= 20);
});

test('Junior bank is separately identified, short and construct-diverse', () => {
  assert.equal(schoolJuniorBeliefItems.length, 16);
  assert.equal(new Set(schoolJuniorBeliefItems.map((item) => item.id)).size, 16);
  assert.ok(schoolJuniorBeliefItems.every((item) => /^J\d{2}$/.test(item.id)));
  assert.equal(new Set(schoolJuniorBeliefItems.map((item) => item.construct)).size, 13);
  const sides = schoolJuniorBeliefItems.flatMap((item) => [item.negative, item.positive]);
  assert.ok(sides.every((side) => words(side) <= 25));
  assert.ok(sides.reduce((sum, side) => sum + words(side), 0) / sides.length <= 17);
});
