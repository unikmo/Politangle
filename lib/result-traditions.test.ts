import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import { resultTraditions } from './result-traditions';

test('headline result table stays deliberately limited to seven major rows', () => {
  assert.equal(resultTraditions.length, 7);
  assert.deepEqual(
    resultTraditions.map((item) => item.id),
    ['liberalism', 'conservatism', 'social-democracy', 'socialism', 'green-politics', 'nationalism', 'populism'],
  );
});

test('every headline row explains nationhood membership and abortion', () => {
  for (const item of resultTraditions) {
    assert.ok(item.nationalMembership.trim().length > 0, `${item.id} lacks national-membership explanation`);
    assert.ok(item.abortion.trim().length > 0, `${item.id} lacks abortion explanation`);
  }
});

test('every headline row is bound to registered evidence', () => {
  for (const item of resultTraditions) {
    assert.ok(item.evidenceIds.length > 0, `${item.id} lacks evidence`);
    for (const evidenceId of item.evidenceIds) {
      assert.ok(evidenceById.has(evidenceId), `${item.id} references unknown evidence ${evidenceId}`);
    }
  }
});

test('social democracy and socialism retain the ownership discriminator without adding democratic socialism as a headline row', () => {
  const socialDemocracy = resultTraditions.find((item) => item.id === 'social-democracy')!;
  const socialism = resultTraditions.find((item) => item.id === 'socialism')!;
  assert.match(socialDemocracy.economy, /predominantly private ownership/i);
  assert.match(socialism.economy, /social, public, cooperative or worker ownership/i);
  assert.equal(resultTraditions.some((item) => item.id === ('democratic-socialism' as never)), false);
});

test('populism reports empirical authoritarian risk without defining every populist as authoritarian', () => {
  const populism = resultTraditions.find((item) => item.id === 'populism')!;
  assert.match(populism.statePower, /not inherently authoritarian/i);
  assert.match(populism.statePower, /weakened checks and civil liberties/i);
  assert.match(populism.statePower, /anti-pluralism/i);
  assert.ok(populism.evidenceIds.includes('VDEM-POPULISM-AUTOCRATIZATION'));
  assert.ok(populism.evidenceIds.includes('IDEA-POPULISM-DEMOCRACY'));
});