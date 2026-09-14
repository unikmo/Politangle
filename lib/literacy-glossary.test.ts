import assert from 'node:assert/strict';
import test from 'node:test';
import { evidenceById } from './evidence';
import { glossaryEntriesForTags, literacyGlossary } from './literacy-glossary';

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

test('glossary has unique reader-safe entries with real evidence', () => {
  assert.ok(literacyGlossary.length >= 25);
  assert.equal(new Set(literacyGlossary.map((entry) => entry.slug)).size, literacyGlossary.length);
  for (const entry of literacyGlossary) {
    assert.ok(wordCount(entry.shortDefinition) <= 22, `${entry.slug} short definition is too long`);
    assert.ok(wordCount(entry.explanation) <= 45, `${entry.slug} explanation is too long`);
    assert.ok(entry.evidenceIds.length > 0, `${entry.slug} has no evidence`);
    for (const evidenceId of entry.evidenceIds) assert.ok(evidenceById.has(evidenceId), `${entry.slug} references missing ${evidenceId}`);
  }
});

test('glossary covers the concepts readers repeatedly meet in the 40+40 banks', () => {
  const slugs = new Set(literacyGlossary.map((entry) => entry.slug));
  for (const required of [
    'liberalism', 'conservatism', 'social-democracy', 'democratic-socialism', 'socialism',
    'communism', 'marxism-leninism', 'anarchism', 'green-politics', 'nationalism', 'populism',
    'fascism', 'liberal-democracy', 'authoritarianism', 'totalitarianism', 'subsidiarity',
    'social-ownership', 'left-and-right', 'multidimensional-profile',
  ]) assert.ok(slugs.has(required), `Missing glossary concept ${required}`);
});

test('question tags resolve to a short, non-repeating review list', () => {
  const entries = glossaryEntriesForTags(['social-democracy', 'redistribution', 'capitalism']);
  assert.ok(entries.length > 0 && entries.length <= 3);
  assert.equal(new Set(entries.map((entry) => entry.slug)).size, entries.length);
});
