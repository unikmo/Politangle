import assert from 'node:assert/strict';
import test from 'node:test';
import { countryProfiles } from './countries';
import { localizeCountryProfile, nativeCountrySlugs } from './country-localization';
import type { Locale } from '../app/LocaleProvider';

const locales: Locale[] = ['de','es','fr','pt-br'];

test('all forty country profiles have maintained native DE ES FR and pt-BR versions', () => {
  assert.equal(countryProfiles.length, 40);
  assert.equal(nativeCountrySlugs.length, 40);
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
