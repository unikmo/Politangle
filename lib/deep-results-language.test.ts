import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const deepClient = readFileSync(join(root, 'app/deep/DeepClient.tsx'), 'utf8');
const deepNative = readFileSync(join(root, 'app/deep/deep-native.ts'), 'utf8');

test('Full result cards explain strongest positions with real-world questions and questionnaire evidence', () => {
  assert.match(deepNative, /Where your views are clearest/);
  assert.match(deepNative, /Who fully belongs to the nation\?/);
  assert.match(deepNative, /Who should own and control major businesses\?/);
  assert.match(deepClient, /Example from your answers|exampleFromAnswers/);
  assert.match(deepClient, /evidenceForAxis\(beliefSession/);
  assert.doesNotMatch(deepClient, /<strong>\{display\.name\}<\/strong>\s*<span>\{axis\.score\} \/ 100<\/span>/);
});

test('THINK FEEL ACT differences lead with actual questionnaire wording rather than three raw scores', () => {
  assert.match(deepNative, /Where your thinking, instincts and choices differ/);
  assert.match(deepNative, /What you believe in principle/);
  assert.match(deepNative, /Your instinctive reaction/);
  assert.match(deepNative, /What you would actually support/);
  assert.match(deepClient, /coherence-mode-statement/);
  assert.match(deepClient, /coherence-mode-response/);
  assert.match(deepClient, /What this shows:|whatThisShows/);
  assert.doesNotMatch(deepClient, /<div><b>THINK<\/b><strong>\{gap\.think/);
});

test('Technical scores remain available only as secondary disclosure in the rewritten sections', () => {
  assert.match(deepClient, /className="result-score-details"/);
  assert.match(deepNative, /seeScoring:'See scoring'/);
  assert.match(deepClient, /Politangle dimension|dimensionLabel/);
});


test('Full result interpretation has native pt-BR copy instead of English fallbacks', () => {
  assert.match(deepNative, /Ainda não há respostas comparáveis suficientes/);
  assert.match(deepNative, /Influência política & representação/);
  assert.match(deepNative, /Poder eleito & controles democráticos/);
  assert.match(deepNative, /Tendência socialista democrática/);
  assert.match(deepNative, /Padrão de triagem: direita radical populista/);
  assert.match(deepNative, /Seu perfil político continua misto/);
  assert.match(deepNative, /Nenhuma tradição política domina claramente suas respostas/);
});
