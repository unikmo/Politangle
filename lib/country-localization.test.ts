import assert from 'node:assert/strict';
import test from 'node:test';
import { countryProfiles } from './countries';
import { localizeCountryProfile, nativeCountrySlugs } from './country-localization';
import type { Locale } from '../app/LocaleProvider';

const locales: Locale[] = ['de','es','fr','pt-br'];

test('all sixty country profiles have maintained native DE ES FR and pt-BR versions', () => {
  assert.equal(countryProfiles.length, 60);
  assert.equal(nativeCountrySlugs.length, 60);
  assert.deepEqual([...nativeCountrySlugs], countryProfiles.map((country) => country.slug));

  for (const locale of locales) {
    for (const country of countryProfiles) {
      const localized = localizeCountryProfile(country, locale);
      assert.ok(localized, `${country.slug} missing ${locale}`);
      assert.equal(localized.slug, country.slug);
      assert.equal(localized.power.length, country.power.length);
      assert.equal(localized.vocabulary.length, country.vocabulary.length);
      assert.equal(localized.timeline.length, country.timeline.length);
      assert.equal(localized.atAGlance.length, country.atAGlance.length);
      assert.ok(localized.name.trim().length > 0);
      assert.ok(localized.power.every((value) => value.trim().length > 20));
      assert.ok(localized.vocabulary.every((value) => value.trim().length > 20));
      localized.power.forEach((value, index) => assert.notEqual(value, country.power[index], `${country.slug} power ${index + 1} fell back to English in ${locale}`));
      localized.vocabulary.forEach((value, index) => assert.notEqual(value, country.vocabulary[index], `${country.slug} vocabulary ${index + 1} fell back to English in ${locale}`));
      localized.timeline.forEach((event, index) => assert.notEqual(event.text, country.timeline[index].text, `${country.slug} timeline ${index + 1} fell back to English in ${locale}`));
    }
  }
});

test('localized profiles preserve source provenance and editorial status', () => {
  for (const locale of locales) {
    for (const country of countryProfiles) {
      const localized = localizeCountryProfile(country, locale)!;
      assert.equal(localized.status, country.status);
      assert.equal(localized.updatedAt, country.updatedAt);
      assert.deepEqual(localized.sources, country.sources);
    }
  }
});

test('existing current snapshots are localized where exposed', () => {
  const current = countryProfiles.filter((country) => country.current);
  assert.deepEqual(current.map((country) => country.slug).sort(), ['canada','mexico','south-africa','spain']);

  for (const locale of locales) {
    for (const country of current) {
      const localized = localizeCountryProfile(country, locale)!;
      assert.ok(localized.current, `${country.slug} missing localized current snapshot for ${locale}`);
      assert.notEqual(localized.current!.election.summary, country.current!.election.summary);
      assert.notEqual(localized.current!.rights.note, country.current!.rights.note);
      assert.equal(localized.current!.rights.url, country.current!.rights.url);
    }
  }
});

test('country localization does not fabricate current snapshots for contextual-only profiles', () => {
  for (const locale of locales) {
    for (const country of countryProfiles.filter((item) => !item.current)) {
      assert.equal(localizeCountryProfile(country, locale)!.current, undefined);
    }
  }
});


test('country expansion stops at the agreed sixty profiles', () => {
  const expectedFinalBatch = [
    'austria','czechia','greece','hungary','ukraine','turkiye','israel','uruguay','ecuador','dominican-republic',
    'panama','cameroon','zambia','bangladesh','pakistan','thailand','egypt','ethiopia','democratic-republic-congo','serbia',
  ];
  assert.deepEqual(countryProfiles.slice(40).map((country) => country.slug), expectedFinalBatch);
  assert.deepEqual([...nativeCountrySlugs].slice(40), expectedFinalBatch);
  assert.equal(new Set(countryProfiles.map((country) => country.slug)).size, 60);
});


test('final twenty are substantive country pages rather than generic scaffolds', () => {
  const finalTwenty = countryProfiles.slice(40);
  assert.equal(finalTwenty.length, 20);

  for (const country of finalTwenty) {
    assert.ok(country.atAGlance.length >= 5, `${country.slug} needs a real institutional overview`);
    assert.equal(country.power.length, 3, `${country.slug} needs three country-specific power explanations`);
    assert.equal(country.vocabulary.length, 2, `${country.slug} needs two country-specific political vocabulary entries`);
    assert.ok(country.timeline.length >= 4, `${country.slug} needs a substantive political timeline`);
    assert.ok(country.sources.length >= 2, `${country.slug} needs at least two official or primary institutional sources`);
    const combined = [...country.power, ...country.vocabulary, ...country.timeline.map((event) => event.text)].join(' ');
    assert.doesNotMatch(combined, /constitutional framework distributes national authority among the institutions identified above/i);
    assert.doesNotMatch(combined, /political labels in .* have their own national histories/i);
    assert.doesNotMatch(combined, /balance among executive authority, legislative scrutiny, territorial government and constitutional oversight/i);
  }

  const bySlug = Object.fromEntries(finalTwenty.map((country) => [country.slug, country]));
  assert.match(bySlug.austria.vocabulary.join(' '), /social partnership|Proporz/i);
  assert.match(bySlug.greece.vocabulary.join(' '), /Metapolitefsi/i);
  assert.match(bySlug.hungary.power.join(' '), /cardinal laws/i);
  assert.match(bySlug.ukraine.power.join(' '), /martial law/i);
  assert.match(bySlug.turkiye.vocabulary.join(' '), /Laiklik|Kemalism/i);
  assert.match(bySlug.israel.power.join(' '), /Basic Laws/i);
  assert.match(bySlug.uruguay.vocabulary.join(' '), /Batllismo/i);
  assert.match(bySlug.ecuador.power.join(' '), /muerte cruzada/i);
  assert.match(bySlug['dominican-republic'].timeline.map((event) => event.text).join(' '), /2024/);
  assert.match(bySlug.panama.vocabulary.join(' '), /Canal|comarca/i);
  assert.match(bySlug.cameroon.vocabulary.join(' '), /Anglophone|Francophone/i);
  assert.ok(bySlug.zambia.timeline.some((event) => event.year === '2025'));
  assert.match(bySlug.bangladesh.vocabulary.join(' '), /caretaker/i);
  assert.match(bySlug.pakistan.timeline.map((event) => event.text).join(' '), /Twenty-Seventh|2025/i);
  assert.match(bySlug.thailand.vocabulary.join(' '), /People.?s Constitution/i);
  assert.match(bySlug.egypt.vocabulary.join(' '), /1952 Revolution/i);
  assert.match(bySlug.ethiopia.power.join(' '), /House of the Federation/i);
  assert.match(bySlug['democratic-republic-congo'].vocabulary.join(' '), /Congolité/i);
  assert.match(bySlug.serbia.vocabulary.join(' '), /Kosovo/i);
});
