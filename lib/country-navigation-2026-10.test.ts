import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { countryProfiles, countryBySlug } from './countries';
import { nativeCountrySlugs, localizeCountryProfile } from './country-localization';
import { countryPartyNames,partySlug } from './country-parties';
import { germanPartyInfo } from '../app/countries/CountryDetail';

const dir=path.resolve(__dirname,'..');
const read=(file:string)=>fs.readFileSync(path.join(dir,file),'utf8');

test('all 80 country topic links resolve to a real country dimension',()=>{
 assert.equal(countryProfiles.length,80);
 for(const country of countryProfiles){
  assert.equal(country.globalLabels?.localDimensions?.length,5,country.slug);
  for(let n=1;n<=5;n++) assert.ok(countryBySlug(country.slug)?.globalLabels?.localDimensions[n-1],country.slug+'/'+n);
 }
});

test('all localized country-topic paths use translated source data and preserve the dimension order',()=>{
 assert.equal(nativeCountrySlugs.length,80);
 for(const slug of nativeCountrySlugs){
  const country=countryBySlug(slug)!;
  for(const locale of ['de','es','fr','pt-br'] as const){
   const translated=localizeCountryProfile(country,locale);
   assert.ok(translated,locale+'/'+slug);
   assert.equal(translated!.globalLabels?.localDimensions?.length,country.globalLabels?.localDimensions?.length,locale+'/'+slug);
  }
 }
});

test('party slugs are unique, map to known countries and include German CDU/CSU, Greens, Left and AfD',()=>{
 for(const [slug,names] of Object.entries(countryPartyNames)){
  assert.ok(countryBySlug(slug),'party names for unknown country '+slug);
  assert.equal(new Set(names.map(partySlug)).size,names.length,'collision '+slug);
  for(const name of names) assert.ok(partySlug(name),'empty party slug '+slug);
 }
 for(const name of ['CDU/CSU','AfD','Bündnis 90/Die Grünen','Die Linke'])
  assert.ok(countryPartyNames.germany.includes(name));
 for(const name of countryPartyNames.germany)assert.ok(germanPartyInfo[partySlug(name)],'missing sourced German profile '+name);
});

test('country detail pages preserve the locale, provide accessible links and noindex until independent validation',()=>{
 const guide=read('app/countries/CountryGuide.tsx');
 const detail=read('app/countries/CountryDetail.tsx');
 assert.match(guide,/country-topic-link/);
 assert.match(guide,/locale === 'en'/);
 assert.match(guide,/partySlug\(name\)/);
 assert.match(detail,/country\.sources\.map/);
 for(const page of [
  'app/countries/[slug]/[topic]/page.tsx',
  'app/countries/[slug]/parties/[party]/page.tsx',
  'app/[locale]/countries/[slug]/[topic]/page.tsx',
  'app/[locale]/countries/[slug]/parties/[party]/page.tsx'
 ]){const src=read(page);assert.match(src,/robots:\{index:false/);assert.match(src,/notFound\(\)/);}
});
