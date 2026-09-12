import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const header = readFileSync(join(root, 'app/AssessmentHeader.tsx'), 'utf8');
const wrappers = [
  'app/quiz/page.tsx',
  'app/results/page.tsx',
  'app/deep/page.tsx',
  'app/classify/page.tsx',
  'app/understand/page.tsx',
].map((path) => readFileSync(join(root, path), 'utf8')).join('\n');

test('assessment headers expose native DE ES FR route labels', () => {
  assert.match(header, /Quick · 26 Fragen/);
  assert.match(header, /Quick · 26 preguntas/);
  assert.match(header, /Quick-Ergebnis/);
  assert.match(header, /Resultado Quick/);
  assert.match(header, /Résultat Quick/);
  assert.match(header, /Full · 16 weitere Fragen/);
  assert.match(header, /Full · 16 preguntas más/);
  assert.match(header, /Full · 16 questions de plus/);
  assert.match(header, /20 Fragen/);
  assert.match(header, /20 preguntas/);
});

test('assessment route wrappers use the shared locale-aware header instead of hard-coded English chrome', () => {
  for (const kind of ['quick', 'quick-result', 'full', 'classify', 'understand']) {
    assert.match(wrappers, new RegExp(`kind="${kind}"`));
  }
  assert.doesNotMatch(wrappers, />Quick · 26 questions</);
  assert.doesNotMatch(wrappers, />Quick result</);
  assert.doesNotMatch(wrappers, />Full · 16 more questions</);
  assert.doesNotMatch(wrappers, />CLASSIFY · 20 questions</);
  assert.doesNotMatch(wrappers, />UNDERSTAND · 20 questions</);
});
