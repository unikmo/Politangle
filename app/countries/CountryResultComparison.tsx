'use client';

import Link from 'next/link';
import {useEffect,useMemo,useState} from 'react';
import type {FamilyCompatibilityV2,PolygonPointV2,FamilyId} from '../../lib/belief-v2';
import {compareCountryParties} from '../../lib/country-party-comparison';
import {germanyPartySummary} from '../../lib/germany-party-locales';
import type {Locale} from '../LocaleProvider';
import type {CountrySelectionOption} from './result-country-options';

const STORAGE='politangle.result-countries.v1';
const ui:Record<Locale,{kicker:string;title:string;intro:string;pick:string;add:string;limit:string;selected:string;remove:string;compare:string;why:string;context:string;parties:string;more:string;missing:string;shared:string;partial:string;unknown:string;footnote:string;source:string;partiesNote:string;strongest:string;none:string}> = {
 en:{kicker:'YOUR PROFILE, IN THE WORLD',title:'Where would your views fit in another country?',intro:'Choose up to 3 countries. See how your political values connect with local debates and the broad traditions associated with parties—without predicting your vote.',pick:'Choose a country',add:'Add country',limit:'Up to three countries',selected:'Selected countries',remove:'Remove',compare:'Your result in',why:'Where your views meet local debates',context:'National political context',parties:'Political parties and broad overlaps',more:'Read the country guide',missing:'There is not yet enough independently checked party-position data for a numerical comparison here. You can still explore the parties and local context.',shared:'Shared broad political tradition',partial:'Your family evidence is not complete',unknown:'Not mapped to one of the five broad traditions',footnote:'These are broad editorial family links—not party match scores, voting recommendations, or verified agreements on individual policies. Parties may disagree with you on important issues.',source:'Country source',partiesNote:'This country comparison preserves your quiz scores and shows differences in political meaning, not a new ideology score.',strongest:'Your two clearest dimensions',none:'No country selected yet.'},
 de:{kicker:'DEIN ERGEBNIS IM LÄNDERVERGLEICH',title:'Was bedeuten deine Ansichten in anderen Ländern?',intro:'Wähle bis zu 3 Länder. Sieh, welche lokalen Debatten und Parteitraditionen Berührungspunkte mit deinem Profil haben – ohne Wahlprognose.',pick:'Land auswählen',add:'Land hinzufügen',limit:'Maximal drei Länder',selected:'Ausgewählte Länder',remove:'Entfernen',compare:'Dein Profil in',why:'Deine Ansichten im lokalen Zusammenhang',context:'Politischer Hintergrund',parties:'Parteien und mögliche Berührungspunkte',more:'Länderporträt lesen',missing:'Für einen belastbaren zahlenbasierten Parteienvergleich fehlen derzeit unabhängig geprüfte Parteipositionen. Du kannst trotzdem die Parteien und den Länderkontext erkunden.',shared:'Gemeinsame übergeordnete Parteitradition',partial:'Für diese Einordnung fehlen Antworten',unknown:'Keiner der fünf großen Traditionen eindeutig zugeordnet',footnote:'Dies sind grobe redaktionelle Überschneidungen von Parteitraditionen – keine Partei-Match-Werte, Wahlempfehlungen oder überprüften Übereinstimmungen bei einzelnen Forderungen.',source:'Länderquelle',partiesNote:'Deine Testergebnisse bleiben unverändert. Der Vergleich erläutert ihren politischen Zusammenhang im jeweiligen Land.',strongest:'Deine zwei deutlichsten Achsen',none:'Du hast noch kein Land ausgewählt.'},
 es:{kicker:'TU PERFIL EN OTROS PAÍSES',title:'¿Qué significan tus ideas en otros países?',intro:'Elige hasta 3 países para explorar debates locales y puntos en común con las tradiciones de los partidos, sin predecir tu voto.',pick:'Elegir país',add:'Añadir país',limit:'Hasta tres países',selected:'Países elegidos',remove:'Quitar',compare:'Tu resultado en',why:'Tus ideas en el contexto local',context:'Contexto político',parties:'Partidos y afinidades generales',more:'Ver la guía del país',missing:'Aún no hay datos independientes suficientes para calcular coincidencias numéricas con los partidos. Puedes consultar sus perfiles y el contexto local.',shared:'Tradición política general compartida',partial:'Faltan respuestas para evaluar esta afinidad',unknown:'No clasificado en una de las cinco tradiciones',footnote:'Estas afinidades editoriales generales no son puntuaciones de partidos, recomendaciones de voto ni pruebas de acuerdo en políticas concretas.',source:'Fuente nacional',partiesNote:'Tu puntuación permanece igual; solo cambia el contexto político.',strongest:'Tus dos dimensiones más claras',none:'Todavía no has elegido un país.'},
 fr:{kicker:'TON PROFIL SELON LES PAYS',title:'Que signifient tes idées dans d’autres pays ?',intro:'Choisis jusqu’à 3 pays pour explorer les débats locaux et les traditions politiques des partis, sans prédiction de vote.',pick:'Choisir un pays',add:'Ajouter',limit:'Trois pays au maximum',selected:'Pays choisis',remove:'Retirer',compare:'Ton résultat en',why:'Tes idées dans leur contexte',context:'Contexte politique',parties:'Partis et affinités générales',more:'Voir le guide du pays',missing:'Les données indépendantes ne permettent pas encore de calculer une correspondance chiffrée avec les partis. Tu peux consulter leurs profils et le contexte national.',shared:'Tradition politique générale commune',partial:'Certaines réponses manquent',unknown:'Non classé dans les cinq grandes traditions',footnote:'Ces proximités éditoriales générales ne sont ni des scores de parti, ni des conseils de vote, ni des accords vérifiés sur des politiques précises.',source:'Source nationale',partiesNote:'Ton score reste inchangé : seul le contexte politique diffère.',strongest:'Tes deux dimensions les plus marquées',none:'Aucun pays choisi pour le moment.'},
 'pt-br':{kicker:'SEU PERFIL EM OUTROS PAÍSES',title:'O que suas ideias significam em outros países?',intro:'Escolha até 3 países para conhecer os debates locais e as tradições dos partidos, sem previsão de voto.',pick:'Escolher país',add:'Adicionar país',limit:'Até três países',selected:'Países escolhidos',remove:'Remover',compare:'Seu resultado em',why:'Suas ideias no contexto local',context:'Contexto político',parties:'Partidos e afinidades gerais',more:'Ver guia do país',missing:'Ainda faltam dados independentes suficientes para calcular uma correspondência numérica com partidos. É possível conhecer seus perfis e o contexto local.',shared:'Tradição política geral compartilhada',partial:'Faltam respostas para esta comparação',unknown:'Sem classificação em uma das cinco tradições',footnote:'Estas associações editoriais amplas não são pontuações de partido, recomendações de voto ou prova de concordância com políticas específicas.',source:'Fonte nacional',partiesNote:'Seu resultado não muda; apenas o contexto político.',strongest:'Suas duas dimensões mais claras',none:'Nenhum país selecionado.'}
};

const familyNames:Record<Locale,Record<FamilyId,string>>={
 en:{liberalism:'Liberalism',conservatism:'Conservatism','social-democracy':'Social democracy',socialism:'Socialism','green-politics':'Green politics'},
 de:{liberalism:'Liberalismus',conservatism:'Konservatismus','social-democracy':'Sozialdemokratie',socialism:'Sozialismus','green-politics':'Grüne Politik'},
 es:{liberalism:'Liberalismo',conservatism:'Conservadurismo','social-democracy':'Socialdemocracia',socialism:'Socialismo','green-politics':'Política verde'},
 fr:{liberalism:'Libéralisme',conservatism:'Conservatisme','social-democracy':'Social-démocratie',socialism:'Socialisme','green-politics':'Écologie politique'},
 'pt-br':{liberalism:'Liberalismo',conservatism:'Conservadorismo','social-democracy':'Social-democracia',socialism:'Socialismo','green-politics':'Política verde'}
};

export function CountryResultComparison({options,families,axes,locale,stage}:{
 options:readonly CountrySelectionOption[];families:readonly FamilyCompatibilityV2[];
 axes:readonly PolygonPointV2[];locale:Locale;stage:'quick'|'full';
}){
 const copy=ui[locale];
 const [selected,setSelected]=useState<string[]>([]);
 const [candidate,setCandidate]=useState('');
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{
  try{
   const value=JSON.parse(sessionStorage.getItem(STORAGE)??'[]');
   if(Array.isArray(value))setSelected(value.filter((x):x is string=>typeof x==='string'&&options.some(o=>o.slug===x)).slice(0,3));
  }catch{/* Ignore invalid browser state. */}
  setHydrated(true);
 },[options]);
 useEffect(()=>{if(hydrated)sessionStorage.setItem(STORAGE,JSON.stringify(selected));},[selected,hydrated]);
 const visible=useMemo(()=>selected.map(slug=>options.find(x=>x.slug===slug)).filter((x):x is CountrySelectionOption=>Boolean(x)),[options,selected]);
 const remaining=options.filter(x=>!selected.includes(x.slug));
 const strongest=axes.filter(a=>a.score!==null).map(a=>({...a,clarity:Math.abs((a.score??50)-50)})).sort((a,b)=>b.clarity-a.clarity).slice(0,2);
 const add=()=>{
  const chosen=candidate||remaining[0]?.slug;
  if(chosen&&selected.length<3&&!selected.includes(chosen))setSelected(v=>[...v,chosen]);
  setCandidate('');
 };
 const prefix=locale==='en'?'':`/${locale}`;
 return <article className="engine-card result-country-compare" id={stage==='quick'?'country-comparison':'full-country-comparison'}>
  <p className="engine-kicker">{copy.kicker} · {stage==='quick'?'QUICK 26':'FULL 42'}</p>
  <h2>{copy.title}</h2><p className="result-country-intro">{copy.intro}</p>
  <div className="country-compare-controls">
   <label className="country-compare-picker"><span>{copy.pick}</span>
    <select value={candidate} onChange={e=>setCandidate(e.target.value)} disabled={selected.length===3} aria-label={copy.pick}>
     <option value="">{copy.pick}…</option>
     {remaining.map(country=><option key={country.slug} value={country.slug}>{country.names[locale]}</option>)}
    </select>
   </label>
   <button className="engine-primary-link country-compare-add" type="button" onClick={add} disabled={selected.length>=3||!remaining.length}>{copy.add}</button>
   <span className="country-compare-counter" role="status">{selected.length}/3 · {copy.limit}</span>
  </div>
  <div className="country-selected-list" aria-label={copy.selected}>
   {visible.map(country=><button key={country.slug} type="button" className="country-selected-chip" onClick={()=>setSelected(v=>v.filter(x=>x!==country.slug))} aria-label={`${copy.remove}: ${country.names[locale]}`}>{country.names[locale]} <span aria-hidden="true">×</span></button>)}
  </div>
  {!visible.length&&<p className="country-compare-empty">{copy.none}</p>}
  <div className="country-compare-results">
   {visible.map(country=>{
    const partyComparisons=compareCountryParties(country.slug,country.parties,families);
    const mapped=partyComparisons.filter(p=>p.traditions.length>0);
    return <section className="country-compare-panel" key={country.slug} aria-label={`${copy.compare} ${country.names[locale]}`}>
     <div className="country-compare-heading"><p className="engine-kicker">{copy.compare}</p><h3>{country.names[locale]}</h3><Link href={`${prefix}/countries/${country.slug}`}>{copy.more} ↗</Link></div>
     <h4>{copy.why}</h4>
     <div className="country-compare-axes" aria-label={copy.strongest}>{strongest.map(axis=><span key={axis.id}>{axis.name}: {axis.score}/100</span>)}</div>
     <h4>{copy.context}</h4><p>{country.summaries[locale] || country.summaries.en}</p>
     <h4>{copy.parties}</h4>
     {!country.parties.length&&<p className="country-compare-note">{copy.missing}</p>}
     {country.parties.length>0&&<><p className="country-compare-note">{copy.partiesNote}</p>
      <div className="country-party-comparisons">{partyComparisons.map(party=>{
       const family=party.strongestOverlap;
       const desc=country.slug==='germany'?germanyPartySummary[party.key]?.[locale]:undefined;
       return <div className="country-party-comparison" key={party.key}>
        <div className="country-party-comparison-head"><strong>{party.name}</strong>
         <Link href={`${prefix}/countries/${country.slug}/parties/${party.key}`}>{copy.more} ↗</Link></div>
        {desc&&<p>{desc}</p>}
        {family?<p className="country-party-tradition"><b>{copy.shared}:</b> {familyNames[locale][family.id]} ({family.overall}/100 {locale==='de'?'dein Familienwert':'your family score'})</p>
        :<p className="country-party-unmapped">{party.traditions.length?copy.partial:copy.unknown}</p>}
       </div>;
      })}</div>
      <p className="country-compare-disclaimer">{copy.footnote}</p>
     </>}
     {country.sourceUrl&&<p className="country-compare-source"><a target="_blank" rel="noopener noreferrer" href={country.sourceUrl}>{copy.source} ↗</a></p>}
    </section>;
   })}
  </div>
 </article>;
}
