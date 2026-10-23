import type { FamilyCompatibilityV2, FamilyId } from './belief-v2';
import { partySlug } from './country-parties';

/**
 * Editorially labelled broad political traditions; not party-position scores,
 * candidate endorsements, or probabilities of voting for a party.
 * Deliberately leave cross-cutting, regional, big-tent, and uncertain parties
 * unmapped rather than force them into the five headline families.
 * Version 2026-10. Revalidate against dedicated party sources before
 * upgrading any item to a quantitative issue-based comparison.
 */
export const partyTraditions: Readonly<Record<string,Readonly<Record<string,readonly FamilyId[]>>>>={
 germany:{
  'cdu-csu':['conservatism'],spd:['social-democracy'],afd:[],
  'bundnis-90-die-grunen':['green-politics'], 'die-linke':['socialism'],
  fdp:['liberalism'],bsw:[],
 },
 'united-states':{
  'democratic-party':['liberalism','social-democracy'],'republican-party':['conservatism'],
  'libertarian-party':[], 'green-party':['green-politics'],
 },
 france:{
  renaissance:['liberalism'],'rassemblement-national':[],
  'la-france-insoumise':['socialism'],'parti-socialiste':['social-democracy'],
  'les-republicains':['conservatism'],'les-ecologistes':['green-politics']
 },
 'united-kingdom':{
  'labour-party':['social-democracy'],'conservative-party':['conservatism'],
  'liberal-democrats':['liberalism'],'reform-uk':[],
  'green-party-of-england-and-wales':['green-politics'],'scottish-national-party':[]
 },
 netherlands:{
  pvv:[],'groenlinks-pvda':['green-politics','social-democracy'],
  vvd:['liberalism'],d66:['liberalism'],cda:['conservatism'],bbb:[],sp:['socialism']
 },
 denmark:{
  'social-democrats':['social-democracy'],venstre:['liberalism'],
  'socialist-people-s-party':['socialism','green-politics'],
  'liberal-alliance':['liberalism'],'denmark-democrats':[],
  'conservative-people-s-party':['conservatism']
 },
 finland:{
  'national-coalition-party':['conservatism'],'social-democratic-party':['social-democracy'],
  'finns-party':[],'centre-party':[],'green-league':['green-politics'],
  'left-alliance':['socialism']
 },
 iceland:{
  'independence-party':['conservatism'],'social-democratic-alliance':['social-democracy'],
  'progressive-party':[],'reform-party':['liberalism'],'left-green-movement':['green-politics','socialism']
 },
 norway:{
  'labour-party':['social-democracy'],'conservative-party':['conservatism'],
  'progress-party':[],'centre-party':[],'socialist-left-party':['socialism'],'green-party':['green-politics']
 },
 sweden:{
  'social-democrats':['social-democracy'],'sweden-democrats':[],'moderate-party':['conservatism'],
  'left-party':['socialism'],'centre-party':['liberalism'],
  'christian-democrats':['conservatism'],'green-party':['green-politics']
 },
 spain:{
  psoe:['social-democracy'],'partido-popular':['conservatism'],vox:[],
  sumar:['socialism'],podemos:['socialism'],'esquerra-republicana-de-catalunya':[]
 },
 mexico:{morena:[],pan:['conservatism'],pri:[],'movimiento-ciudadano':[],
  'partido-verde-ecologista-de-mexico':[],'partido-del-trabajo':['socialism']},
 canada:{'liberal-party':['liberalism'],'conservative-party':['conservatism'],
   'new-democratic-party':['social-democracy'],'bloc-quebecois':[],'green-party':['green-politics']},
 'south-africa':{'african-national-congress':[],'democratic-alliance':['liberalism'],
  'economic-freedom-fighters':['socialism'],'umkhonto-wesizwe':[],'inkatha-freedom-party':[]},
 india:{'bharatiya-janata-party':[],'indian-national-congress':[],
  'aam-aadmi-party':[],'all-india-trinamool-congress':[],'samajwadi-party':[]},
 nigeria:{'all-progressives-congress':[],'peoples-democratic-party':[],
  'labour-party':[],'new-nigeria-peoples-party':[]},
 philippines:{'partido-federal-ng-pilipinas':[],'lakas-cmd':[],
  'partido-demokratiko-pilipino':[],'liberal-party':[],'akbayan':['social-democracy']},
 brazil:{'partido-dos-trabalhadores':['social-democracy'],'partido-liberal':[],mdb:[],
  psd:[],'uniao-brasil':[],psol:['socialism']},
 indonesia:{'pdi-p':[],golkar:[],gerindra:[],pkb:[],nasdem:[],pks:[]},
 japan:{'liberal-democratic-party':['conservatism'],
  'constitutional-democratic-party':['liberalism'],
  'japan-innovation-party':[],komeito:[],
  'japanese-communist-party':['socialism'],
  'democratic-party-for-the-people':[]}
};

export type PartyComparison={name:string;key:string;traditions:readonly FamilyId[];
  strongestOverlap:FamilyCompatibilityV2|null;status:'shared-theme'|'limited-coverage'|'not-classified'};

export function compareCountryParties(country:string, names:readonly string[],families:readonly FamilyCompatibilityV2[]):PartyComparison[]{
 const familyMap=new Map(families.map(x=>[x.id,x]));
 return names.map(name=>{
  const key=partySlug(name), traditions=partyTraditions[country]?.[key]??[];
  const known=traditions.map(t=>familyMap.get(t)).filter((f):f is FamilyCompatibilityV2=>Boolean(f&&f.overall!==null&&f.coverage>=50));
  const strongestOverlap=known.sort((a,b)=>(b.overall??0)-(a.overall??0))[0]??null;
  return {name,key,traditions,strongestOverlap,status:!traditions.length?'not-classified':strongestOverlap?'shared-theme':'limited-coverage'};
 });
}
