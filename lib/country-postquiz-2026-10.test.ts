import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {countryProfiles} from './countries';
import {countryPartyNames, partySlug} from './country-parties';
import {partyTraditions, compareCountryParties} from './country-party-comparison';
import type {FamilyCompatibilityV2} from './belief-v2';

const root=path.resolve(__dirname,'..');
const source=(p:string)=>fs.readFileSync(path.join(root,p),'utf8');
const families:FamilyCompatibilityV2[]=[
 {id:'social-democracy',name:'Social democracy',overall:78,think:80,feel:null,act:78,coverage:63,modeTension:null},
 {id:'liberalism',name:'Liberalism',overall:44,think:45,feel:null,act:42,coverage:63,modeTension:null},
 {id:'conservatism',name:'Conservatism',overall:33,think:33,feel:null,act:35,coverage:70,modeTension:null},
 {id:'socialism',name:'Socialism',overall:null,think:null,feel:null,act:null,coverage:20,modeTension:null},
 {id:'green-politics',name:'Green politics',overall:76,think:72,feel:75,act:78,coverage:75,modeTension:6},
];
test('party mapping is explicitly curated and never silently infers positions from party names',()=>{
 for(const [country,parties] of Object.entries(partyTraditions)){
  assert.ok(countryProfiles.some(x=>x.slug===country),'unknown country '+country);
  const known=countryPartyNames[country];
  assert.ok(known,'missing displayed parties '+country);
  for(const key of Object.keys(parties))assert.ok(known.some(x=>partySlug(x)===key),'unknown mapped party '+country+'/'+key);
 }
});
test('country-specific comparison is limited to the user broad-family score, not a fabricated party score',()=>{
 const party=compareCountryParties('germany',['SPD','AfD','FDP','Die Linke'],families);
 assert.equal(party[0].strongestOverlap?.overall,78);
 assert.equal(party[0].strongestOverlap?.id,'social-democracy');
 assert.equal(party[1].status,'not-classified');
 assert.equal(party[1].strongestOverlap,null);
 assert.equal(party[2].strongestOverlap?.id,'liberalism');
 assert.equal(party[3].status,'limited-coverage');
 assert.equal(party[3].strongestOverlap,null);
 assert.equal(compareCountryParties('singapore',['Some party'],families)[0].status,'not-classified');
});
test('Quick and Full share the interactive max-three selector without replacing the real scores',()=>{
 const quick=source('app/results/ResultsClient.tsx');
 const full=source('app/deep/DeepClient.tsx');
 const component=source('app/countries/CountryResultComparison.tsx');
 const choices=source('app/countries/result-country-options.ts');
 assert.match(quick,/CountryResultComparison options=\{countryOptions\} families=\{result\.families\}/);
 assert.match(full,/CountryResultComparison options=\{countryOptions\} families=\{output\.families\}/);
 assert.match(quick,/beliefV2StageProgress\(session, 'quick'\)\.complete/);
 assert.match(full,/if \(output\)/);
 assert.match(component,/v\.length>=3\|\|v\.includes\(chosen\)/);
 assert.match(component,/slice\(0,3\)/);
 assert.match(component,/sessionStorage\.setItem/);
 assert.match(component,/compareCountryParties\(country\.slug/);
 assert.match(component,/country\.parties\.length/);
 assert.match(choices,/countryProfiles\.map/);
 assert.match(choices,/countryPartyNames\[country\.slug\]/);
});
