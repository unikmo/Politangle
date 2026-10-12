import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const provider = readFileSync(join(__dirname, '..', 'app', 'LocaleProvider.tsx'), 'utf8');
const practiceCss = readFileSync(join(__dirname, '..', 'app', 'literacy.css'), 'utf8');

test('a language named in the URL wins over a remembered or detected language', () => {
  // Without this, a shared /en/ link opens in German for anyone whose browser remembers German.
  assert.match(provider, /explicitLocale/);
  assert.match(provider, /\^\\\/\(en\|de\|es\|fr\|pt-br\)/);
  assert.match(provider, /initialLocale !== 'en' \|\| explicitLocale/);
});

test('practice and populism headers keep their controls readable on the orange band', () => {
  assert.match(practiceCss, /\.engine-header \.p-language-picker \.lang\{color:#2b150d\}/);
  assert.match(practiceCss, /\.engine-header-actions>a\{color:#2b150d/);
  assert.match(practiceCss, /--practice-band:360px/);
});
