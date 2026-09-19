import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const standard = readFileSync(join(root, 'docs/country-native-language-editorial-standard.md'), 'utf8');
const de = [
  readFileSync(join(root, 'lib/country-localization.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-extra.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-expansion-de.ts'), 'utf8'),
].join('\n');
const es = [
  readFileSync(join(root, 'lib/country-localization.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-extra.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-expansion-es.ts'), 'utf8'),
].join('\n');
const fr = [
  readFileSync(join(root, 'lib/country-localization.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-extra.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-expansion-fr.ts'), 'utf8'),
].join('\n');

test('country language standard requires native composition rather than literal translation', () => {
  assert.match(standard, /not sentence-by-sentence translations/i);
  assert.match(standard, /natural target-language prose/i);
  assert.match(standard, /cross-language factual-consistency checks/i);
  assert.match(standard, /not certification by an external human native-language editor/i);
});

test('reviewed German copy does not retain avoidable English institutional fallbacks', () => {
  assert.doesNotMatch(de, /Supreme Court/);
  assert.doesNotMatch(de, /Small-Government-Konservatismus/);
  assert.doesNotMatch(de, /Federal Capital Territory/);
});

test('reviewed Spanish and French copy removes literal English editorial leftovers', () => {
  assert.doesNotMatch(es, /pillarisation|Transición de People Power/);
  assert.doesNotMatch(fr, /Transition People Power/);
});
