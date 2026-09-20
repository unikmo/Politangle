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
  readFileSync(join(root, 'lib/country-localization-wave3-de.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave4-de.ts'), 'utf8'),
].join('\n');
const es = [
  readFileSync(join(root, 'lib/country-localization.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-extra.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-expansion-es.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave3-es.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave4-es.ts'), 'utf8'),
].join('\n');
const ptBr = [
  readFileSync(join(root, 'lib/country-localization-ptbr-wave1.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-ptbr-wave2.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave3-ptbr.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave4-ptbr.ts'), 'utf8'),
].join('\n');
const fr = [
  readFileSync(join(root, 'lib/country-localization.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-extra.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-expansion-fr.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave3-fr.ts'), 'utf8'),
  readFileSync(join(root, 'lib/country-localization-wave4-fr.ts'), 'utf8'),
].join('\n');

test('country language standard requires native composition rather than literal translation', () => {
  assert.match(standard, /not sentence-by-sentence translations/i);
  assert.match(standard, /natural target-language prose/i);
  assert.match(standard, /cross-language factual-consistency checks/i);
  assert.match(standard, /not certification by an external human native-language editor/i);
  assert.ok(ptBr.includes('Brasil'));
  assert.ok(ptBr.includes('português') || ptBr.includes('portugu'));
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


test('final country batch native copy contains nationally specific concepts', () => {
  assert.match(de, /Sozialpartnerschaft|Proporz/);
  assert.match(de, /muerte cruzada/);
  assert.match(es, /Metapolitefsi/);
  assert.match(es, /Congolité/);
  assert.match(fr, /lois cardinales|loi cardinale/);
  assert.match(fr, /House of the Federation|Chambre de la Fédération/);
  assert.match(ptBr, /Batllismo/);
  assert.match(ptBr, /caretaker government/i);
  assert.match(ptBr, /Kosovo/);
});


test('countries 61-80 native copy preserves country-specific political distinctions', () => {
  assert.match(de, /Đổi Mới/);
  assert.match(de, /Union–Sansibar|Zanzibar/);
  assert.match(de, /Muhasasa/);
  assert.match(es, /Ivoirité/);
  assert.match(es, /Madhesi/);
  assert.match(es, /Chavismo/);
  assert.match(fr, /Ivoirité/);
  assert.match(fr, /Muhasasa/);
  assert.match(fr, /Nuevas Ideas/);
  assert.match(ptBr, /Đổi Mới/);
  assert.match(ptBr, /Zanzibar/);
  assert.match(ptBr, /Chavismo/);
  assert.match(ptBr, /Abecásia|Ossétia/);
});
