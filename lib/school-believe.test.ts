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
  assert.match(lockedBeliefItemsV2[0].negative, /essential services/i);
});

test('Youth wording has controlled reading load for cognitive testing', () => {
  const sides = schoolYouthBeliefItems.flatMap((item) => [item.negative, item.positive]);
  assert.ok(sides.every((side) => words(side) <= 30));
  assert.ok(sides.reduce((sum, side) => sum + words(side), 0) / sides.length <= 20);
});

test('Youth FEEL questions are complete standalone statements', () => {
  const text = schoolYouthBeliefItems.filter((item) => item.mode === 'feel').flatMap((item) => [item.negative, item.positive]).join(' ');
  assert.doesNotMatch(text, /\bI (?:feel |am )?more\b/i);
});

test('Youth political-influence wording avoids elite-versus-people repetition', () => {
  const text = schoolYouthBeliefItems.filter((item) => item.construct === 'populism').flatMap((item) => [item.negative, item.positive]).join(' ');
  assert.doesNotMatch(text, /\belites?\b/i);
  assert.match(text, /well-connected/i);
});

test('Junior bank is separately identified, short and construct-diverse', () => {
  assert.equal(schoolJuniorBeliefItems.length, 16);
  assert.equal(new Set(schoolJuniorBeliefItems.map((item) => item.id)).size, 16);
  assert.ok(schoolJuniorBeliefItems.every((item) => /^J\d{2}$/.test(item.id)));
  assert.equal(new Set(schoolJuniorBeliefItems.map((item) => item.construct)).size, 13);
  const sides = schoolJuniorBeliefItems.flatMap((item) => [item.negative, item.positive]);
  assert.ok(sides.every((side) => words(side) <= 18));
  assert.ok(sides.reduce((sum, side) => sum + words(side), 0) / sides.length <= 17);
});

function tokens(value: string) {
  const stop = new Set(['a','an','and','as','at','be','for','if','in','is','it','of','on','or','should','that','the','to','would']);
  return new Set(value.toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((word) => word.length > 2 && !stop.has(word)));
}

function similarity(left: string, right: string) {
  const a = tokens(left); const b = tokens(right);
  const shared = [...a].filter((word) => b.has(word)).length;
  return shared / new Set([...a, ...b]).size;
}

test('Youth Quick practical checks are scenarios, not near-duplicates of principle wording', () => {
  const byConstruct = new Map(schoolYouthBeliefItems.map((item) => [`${item.construct}:${item.mode}`, item]));
  for (const think of schoolYouthBeliefItems.filter((item) => item.mode === 'think').slice(0, 12)) {
    const act = byConstruct.get(`${think.construct}:act`)!;
    assert.ok(similarity(think.negative, act.negative) < 0.58, `${think.construct} negative wording is repetitive`);
    assert.ok(similarity(think.positive, act.positive) < 0.58, `${think.construct} positive wording is repetitive`);
  }
});
