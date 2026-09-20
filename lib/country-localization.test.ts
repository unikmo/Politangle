import assert from 'node:assert/strict';
import test from 'node:test';
import { countryProfiles } from './countries';
import { localizeCountryProfile, nativeCountrySlugs } from './country-localization';
import type { Locale } from '../app/LocaleProvider';
import { countrySpecificityAnchors } from './country-specificity-anchors';

const locales: Locale[] = ['de','es','fr','pt-br'];

test('all eighty country profiles have maintained native DE ES FR and pt-BR versions', () => {
  assert.equal(countryProfiles.length, 80);
  assert.equal(nativeCountrySlugs.length, 80);
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


test('countries 41-60 remain locked in their agreed order', () => {
  const expectedFinalBatch = [
    'austria','czechia','greece','hungary','ukraine','turkiye','israel','uruguay','ecuador','dominican-republic',
    'panama','cameroon','zambia','bangladesh','pakistan','thailand','egypt','ethiopia','democratic-republic-congo','serbia',
  ];
  assert.deepEqual(countryProfiles.slice(40, 60).map((country) => country.slug), expectedFinalBatch);
  assert.deepEqual([...nativeCountrySlugs].slice(40, 60), expectedFinalBatch);
});


test('countries 41-60 remain substantive country pages rather than generic scaffolds', () => {
  const finalTwenty = countryProfiles.slice(40, 60);
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
  assert.ok(bySlug.pakistan.timeline.some((event) => event.year === '2025'));
  assert.match(bySlug.pakistan.power.join(' '), /Federal Constitutional Court/i);
  assert.match(bySlug.thailand.vocabulary.join(' '), /People.?s Constitution/i);
  assert.match(bySlug.egypt.vocabulary.join(' '), /1952 Revolution/i);
  assert.match(bySlug.ethiopia.power.join(' '), /House of the Federation/i);
  assert.match(bySlug['democratic-republic-congo'].vocabulary.join(' '), /Congolité/i);
  assert.match(bySlug.serbia.vocabulary.join(' '), /Kosovo/i);
});


test('country expansion reaches the agreed eighty profiles in the exact 61-80 order', () => {
  const expectedWave4 = [
    'vietnam','morocco','algeria','tanzania','uganda','cote-divoire','angola','mozambique','sri-lanka','nepal',
    'iraq','guatemala','bolivia','paraguay','venezuela','honduras','el-salvador','singapore','tunisia','georgia',
  ];
  assert.deepEqual(countryProfiles.slice(60).map((country) => country.slug), expectedWave4);
  assert.deepEqual([...nativeCountrySlugs].slice(60), expectedWave4);
  assert.equal(countryProfiles.length, 80);
  assert.equal(nativeCountrySlugs.length, 80);
  assert.equal(new Set(countryProfiles.map((country) => country.slug)).size, 80);
});

test('countries 61-80 carry substantive local politics plus explicit global-label fit', () => {
  const wave4 = countryProfiles.slice(60);
  assert.equal(wave4.length, 20);

  for (const country of wave4) {
    assert.ok(country.atAGlance.length >= 5, `${country.slug} needs a real institutional overview`);
    assert.equal(country.power.length, 3, `${country.slug} needs three country-specific power explanations`);
    assert.equal(country.vocabulary.length, 2, `${country.slug} needs two country-specific political vocabulary entries`);
    assert.ok(country.globalLabels, `${country.slug} needs explicit global-label fit guidance`);
    assert.match(country.globalLabels!.fit, /^(strong|partial|limited)$/);
    assert.ok(country.globalLabels!.summary.length > 60, `${country.slug} needs a meaningful global-label explanation`);
    assert.ok(country.globalLabels!.localDimensions.length >= 4, `${country.slug} needs local political dimensions`);
    assert.ok(country.timeline.length >= 4, `${country.slug} needs a substantive political timeline`);
    assert.ok(country.sources.length >= 2, `${country.slug} needs at least two primary or institutional sources`);

    const combined = [
      ...country.power,
      ...country.vocabulary,
      country.globalLabels!.summary,
      ...country.globalLabels!.localDimensions,
      ...country.timeline.map((event) => event.text),
    ].join(' ');
    assert.doesNotMatch(combined, /political labels in .* have their own national histories/i);
    assert.doesNotMatch(combined, /constitutional framework distributes national authority/i);
  }

  const bySlug = Object.fromEntries(wave4.map((country) => [country.slug, country]));
  assert.equal(bySlug.vietnam.globalLabels!.fit, 'limited');
  assert.match(bySlug.vietnam.vocabulary.join(' '), /Đổi Mới/i);
  assert.match(bySlug.morocco.globalLabels!.localDimensions.join(' '), /monarchy/i);
  assert.match(bySlug.algeria.vocabulary.join(' '), /Hirak/i);
  assert.match(bySlug.tanzania.globalLabels!.localDimensions.join(' '), /Zanzibar/i);
  assert.match(bySlug.uganda.vocabulary.join(' '), /Movement/i);
  assert.match(bySlug['cote-divoire'].vocabulary.join(' '), /Ivoirité/i);
  assert.match(bySlug.angola.vocabulary.join(' '), /MPLA|UNITA/i);
  assert.match(bySlug.mozambique.vocabulary.join(' '), /FRELIMO|RENAMO/i);
  assert.match(bySlug['sri-lanka'].vocabulary.join(' '), /devolution/i);
  assert.match(bySlug.nepal.vocabulary.join(' '), /Madhesi/i);
  assert.equal(bySlug.iraq.globalLabels!.fit, 'limited');
  assert.match(bySlug.iraq.vocabulary.join(' '), /Muhasasa/i);
  assert.match(bySlug.guatemala.globalLabels!.localDimensions.join(' '), /Indigenous/i);
  assert.match(bySlug.bolivia.vocabulary.join(' '), /Plurinational|MAS/i);
  assert.match(bySlug.paraguay.timeline.map((event) => event.text).join(' '), /Stroessner|Colorado/i);
  assert.match(bySlug.venezuela.vocabulary.join(' '), /Chavismo/i);
  assert.ok(bySlug.honduras.timeline.some((event) => event.year === '2009'));
  assert.match(bySlug['el-salvador'].vocabulary.join(' '), /ARENA|FMLN|Nuevas Ideas/i);
  assert.equal(bySlug.singapore.globalLabels!.fit, 'limited');
  assert.match(bySlug.singapore.vocabulary.join(' '), /presiden|President|reserves/i);
  assert.ok(bySlug.tunisia.timeline.some((event) => event.year === '2022'));
  assert.match(bySlug.georgia.globalLabels!.localDimensions.join(' '), /EU|NATO|Russia/i);
});

test('wave 4 global-label guidance is localized rather than silently falling back to English', () => {
  for (const locale of locales) {
    for (const country of countryProfiles.slice(60)) {
      const localized = localizeCountryProfile(country, locale)!;
      assert.ok(localized.globalLabels, `${country.slug} missing localized global-label guidance in ${locale}`);
      assert.equal(localized.globalLabels!.fit, country.globalLabels!.fit);
      assert.notEqual(localized.globalLabels!.summary, country.globalLabels!.summary, `${country.slug} global-label summary fell back to English in ${locale}`);
      assert.equal(localized.globalLabels!.localDimensions.length, country.globalLabels!.localDimensions.length);
      assert.ok(
        localized.globalLabels!.localDimensions.some((value, index) => value !== country.globalLabels!.localDimensions[index]),
        `${country.slug} local dimensions fell back wholesale to English in ${locale}`,
      );
    }
  }
});


test('all eighty countries follow the same substantive country-perspective pattern', () => {
  assert.equal(countryProfiles.length, 80);
  for (const country of countryProfiles) {
    assert.ok(country.atAGlance.length >= 5, `${country.slug} needs at least five institutional facts`);
    assert.equal(country.power.length, 3, `${country.slug} needs exactly three power explanations`);
    assert.equal(country.vocabulary.length, 2, `${country.slug} needs exactly two local vocabulary explanations`);
    assert.ok(country.globalLabels, `${country.slug} needs global-label fit guidance`);
    assert.match(country.globalLabels!.fit, /^(strong|partial|limited)$/);
    assert.ok(country.globalLabels!.summary.trim().length >= 80, `${country.slug} global-label summary is too thin`);
    assert.ok(country.globalLabels!.localDimensions.length >= 4, `${country.slug} needs at least four local dimensions`);
    assert.ok(country.timeline.length >= 4, `${country.slug} needs at least four turning points`);
    assert.ok(country.sources.length >= 2, `${country.slug} needs at least two sources`);
  }
});

test('all eighty canonical pages retain nationally specific political substance', () => {
  assert.deepEqual(Object.keys(countrySpecificityAnchors).sort(), countryProfiles.map((country) => country.slug).sort());

  for (const country of countryProfiles) {
    const anchor = countrySpecificityAnchors[country.slug];
    assert.ok(anchor, `${country.slug} has no specificity anchor`);
    const combined = [
      ...country.power,
      ...country.vocabulary,
      ...(country.globalLabels?.localDimensions ?? []),
      ...country.timeline.flatMap((event) => [event.title, event.text]),
    ].join(' ');
    assert.match(combined, anchor, `${country.slug} lost its country-specific political anchor`);
    assert.doesNotMatch(combined, /political labels in .* have their own national histories/i);
    assert.doesNotMatch(combined, /constitutional framework distributes national authority/i);
    assert.doesNotMatch(combined, /balance among executive authority, legislative scrutiny, territorial government and constitutional oversight/i);
  }
});

test('global-label guidance is native in every maintained locale for all eighty countries', () => {
  for (const locale of locales) {
    for (const country of countryProfiles) {
      const localized = localizeCountryProfile(country, locale)!;
      assert.ok(localized.globalLabels, `${country.slug} missing global-label guidance in ${locale}`);
      assert.equal(localized.globalLabels!.fit, country.globalLabels!.fit, `${country.slug} changed fit classification in ${locale}`);
      assert.notEqual(localized.globalLabels!.summary, country.globalLabels!.summary, `${country.slug} global-label summary fell back to English in ${locale}`);
      assert.equal(localized.globalLabels!.localDimensions.length, country.globalLabels!.localDimensions.length);
      assert.ok(
        localized.globalLabels!.localDimensions.some((value, index) => value !== country.globalLabels!.localDimensions[index]),
        `${country.slug} local dimensions fell back wholesale to English in ${locale}`,
      );
    }
  }
});
