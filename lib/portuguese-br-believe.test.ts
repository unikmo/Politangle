import assert from 'node:assert/strict';
import test from 'node:test';
import { PORTUGUESE_BR_BELIEVE_VERSION, portugueseBrBeliefPairCount, portugueseBrBeliefStatement } from './portuguese-br-believe';

test('pt-BR BELIEVE bank covers all 42 source items in both polarities', () => {
  assert.equal(PORTUGUESE_BR_BELIEVE_VERSION, 'pt-br-believe-2026.09-candidate-v1');
  assert.equal(portugueseBrBeliefPairCount, 42);
  for (const prefix of ['T','F','A']) {
    for (let i = 1; i <= 14; i += 1) {
      const id = prefix + String(i).padStart(2, '0');
      const negative = portugueseBrBeliefStatement(id, 'negative');
      const positive = portugueseBrBeliefStatement(id, 'positive');
      assert.ok(negative && negative.length > 25, id + ' negative missing');
      assert.ok(positive && positive.length > 25, id + ' positive missing');
      assert.notEqual(negative, positive, id + ' polarities must differ');
    }
  }
});

test('pt-BR BELIEVE bank does not invent unknown source items', () => {
  assert.equal(portugueseBrBeliefStatement('UNKNOWN', 'negative'), null);
});
