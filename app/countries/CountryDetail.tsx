import Link from 'next/link';
import type { CountryProfile } from '../../lib/countries';
import type { Locale } from '../LocaleProvider';
import { germanyPartySummary } from '../../lib/germany-party-locales';

const labels = {
  en: { return:'Country guide', meaning:'Why this topic matters', institutions:'How institutions shape the question', turning:'Relevant turning point', explore:'Explore another dimension', sources:'Country sources', verified:'The sources below document the country context; they do not independently verify every interpretation of this topic.', party:'Political party', comparison:'How to read this party', context:'The country context', partySource:'Evidence and source dates', note:'A country guide cannot determine your party preference. Programmes and coalition positions may change between elections.', election:'Parliamentary context', noElection:'The country dataset does not yet contain a verified party-level election result.' },
  de: { return:'Zum Länderporträt', meaning:'Warum dieses Thema wichtig ist', institutions:'Welche Rolle die Institutionen spielen', turning:'Wichtiger Wendepunkt', explore:'Weitere Themen', sources:'Quellen zum Land', verified:'Die Quellen belegen den Länderhintergrund. Nicht jede Deutung dieses Themas ist damit einzeln überprüft.', party:'Politische Partei', comparison:'Die Partei einordnen', context:'Der politische Rahmen', partySource:'Belege und Datenstand', note:'Ein Länderporträt sagt nichts darüber aus, welche Partei du wählen würdest. Programme und Koalitionen können sich ändern.', election:'Parlamentarischer Kontext', noElection:'Im Länderdatensatz fehlt ein unabhängig geprüfter Wahleintrag zu dieser Partei.' },
  es: { return:'Volver al país', meaning:'Por qué importa este tema', institutions:'Instituciones y decisiones', turning:'Un punto de inflexión', explore:'Otros temas', sources:'Fuentes nacionales', verified:'Las fuentes documentan el contexto nacional, pero no verifican cada interpretación de este tema.', party:'Partido político', comparison:'Cómo entender este partido', context:'El contexto nacional', partySource:'Fuentes y fecha de revisión', note:'Esta guía no predice qué partido votarías. Los programas y alianzas pueden cambiar.', election:'Contexto parlamentario', noElection:'Los datos del país no incluyen todavía un resultado electoral verificado de este partido.' },
  fr: { return:'Retour au pays', meaning:'Pourquoi ce sujet compte', institutions:'Le rôle des institutions', turning:'Un tournant utile', explore:'Autres sujets', sources:'Sources nationales', verified:'Les sources présentent le contexte national, sans vérifier séparément chaque interprétation de ce sujet.', party:'Parti politique', comparison:'Comprendre ce parti', context:'Contexte national', partySource:'Sources et date de vérification', note:'Ce guide ne prédit pas un choix de parti. Les programmes et les alliances peuvent évoluer.', election:'Contexte parlementaire', noElection:'Les données nationales ne contiennent pas encore de résultat électoral vérifié pour ce parti.' },
  'pt-br': { return:'Voltar ao país', meaning:'Por que este tema importa', institutions:'O papel das instituições', turning:'Um momento decisivo', explore:'Outros temas', sources:'Fontes do país', verified:'As fontes documentam o contexto nacional, mas não verificam cada interpretação deste tema.', party:'Partido político', comparison:'Como entender este partido', context:'Contexto nacional', partySource:'Fontes e data de verificação', note:'Este guia não prevê seu voto. Programas e alianças podem mudar entre eleições.', election:'Contexto parlamentar', noElection:'Os dados nacionais ainda não incluem resultado eleitoral verificado deste partido.' },
} as const;

const focused: Record<string, Partial<Record<Locale, readonly string[]>>> = {
  germany: {
    en: [
      'Germany combines competitive private enterprise with social insurance, collective bargaining and regulation. Parties disagree about the balance between market freedom, public protection and redistribution.',
      'Christian democracy has influenced German social-market institutions. It connects religious and community traditions with constitutional democracy, welfare provision and private enterprise.',
      'Germany has 16 Länder. Their governments participate in federal legislation through the Bundesrat; responsibilities for education and administration are shared across levels.',
      'Federal coalition politics requires parties to negotiate a parliamentary majority. The Bundestag elects the chancellor, so party programmes must often be translated into coalition agreements.',
      'The Federal Constitutional Court reviews public authority under the Basic Law. This provides a legal check on government and parliament rather than a second elected legislature.'
    ],
    de: [
      'Die Soziale Marktwirtschaft verbindet privaten Wettbewerb mit Sozialversicherungen, Tarifverträgen und staatlichen Regeln. Politisch umstritten ist, wie viel Wettbewerb, Schutz und Umverteilung nötig sind.',
      'Die Christdemokratie verbindet in Deutschland gesellschaftliche und religiöse Traditionen mit Sozialer Marktwirtschaft, Sozialstaat und parlamentarischer Demokratie. Sie ist nicht einfach mit US-Konservatismus gleichzusetzen.',
      'Deutschland hat 16 Bundesländer. Über den Bundesrat wirken ihre Regierungen an Bundesgesetzen mit. Für Schule, Verwaltung und viele weitere Aufgaben gelten geteilte Zuständigkeiten.',
      'Im Bundestag braucht die Regierung eine tragfähige Mehrheit. Deshalb handeln Parteien häufig Koalitionsverträge aus. Der Bundestag wählt den Bundeskanzler.',
      'Das Bundesverfassungsgericht prüft staatliches Handeln am Grundgesetz. Seine Aufgabe ist die rechtliche Kontrolle, nicht das politische Regieren.'
    ]
  },
  denmark: {
    en: [
      'Negative parliamentarism means a Danish government may take office and remain in office unless a majority of the Folketing actively opposes it. It need not first win a positive majority vote of confidence.',
      'Minority cabinets negotiate support bill by bill. Cooperation can change by issue without automatically forming a new government.',
      'Denmark has a broad welfare tradition, but parties differ over taxation, public services, eligibility and the balance of state and private responsibility.',
      'Immigration policy intersects with citizenship, access to public services and national identity; these issues do not always follow a simple economic left–right division.',
      'Greenland and the Faroe Islands are self-governing parts of the Danish Realm. Their relationships with Denmark raise questions of self-government, responsibility and sovereignty.'
    ],
    de: [
      'Beim negativen Parlamentarismus kann eine Regierung im Amt bleiben, solange sich im Folketing keine Mehrheit ausdrücklich gegen sie stellt. Sie benötigt also nicht zunächst eine zustimmende Mehrheit.',
      'Minderheitsregierungen suchen für Gesetze wechselnde Mehrheiten. Eine Einigung bei einem Thema bedeutet nicht automatisch eine feste Koalition.',
      'Dänemark hat einen umfangreichen Sozialstaat. Parteien streiten über Steuern, Leistungen, Anspruchsvoraussetzungen und die Aufgaben von Staat und Privatwirtschaft.',
      'Die Einwanderungspolitik berührt Staatsbürgerschaft, Sozialleistungen und nationale Zugehörigkeit. Diese Fragen verlaufen nicht immer entlang der wirtschaftlichen Links-rechts-Achse.',
      'Grönland und die Färöer besitzen weitreichende Selbstverwaltung innerhalb des dänischen Reichsverbands. Es geht dabei auch um Zuständigkeiten und Souveränität.'
    ]
  }
};
const significant = new Set(['and','the','with','from','that','this','what','versus','politics','political','policy','policies','state','national','government','history','party','system','und','oder','der','die','das','mit','den','des','ein','eine','auf','für','von','bei','zur','aux','des','les','dans','del','los','las','para','con','uma','das','dos','por','que','est','são']);
function words(text: string) { return text.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').split(/[^a-z0-9]+/).filter(x=>x.length>3 && !significant.has(x)); }
function relevant(texts: readonly string[], heading: string): string | undefined {
  const topic = words(heading);
  const ranked = texts.map((text,index)=>({text,index,score:topic.reduce((n,word)=>n+(words(text).some(t=>t.startsWith(word.slice(0,5)))?1:0),0)})).sort((a,b)=>b.score-a.score || a.index-b.index);
  return ranked[0]?.score ? ranked[0].text : undefined;
}
const urlBase=(locale:Locale,country:string)=> `${locale==='en'?'':`/${locale}`}/countries/${country}`;

export function TopicDetail({country,index,locale}:{country:CountryProfile;index:number;locale:Locale}) {
  const copy=labels[locale], subject=country.globalLabels!.localDimensions[index], root=urlBase(locale,country.slug);
  const curated=focused[country.slug]?.[locale]?.[index];
  const evidence = relevant([...country.power,...country.vocabulary],subject) ?? country.power[0];
  const event = country.timeline.find(e=>words(subject).some(word=>words(e.title+' '+e.text).some(t=>t.startsWith(word.slice(0,5)))));
  return <main className="home info-page countries-page"><section className="info-shell country-guide country-topic-detail">
    <p className="country-detail-back"><Link href={root}>← {copy.return}: {country.name}</Link></p>
    <span className="country-detail-eyebrow">{country.name} / {copy.meaning}</span><h1>{subject}</h1>
    <section className="country-detail-lead"><h2>{copy.meaning}</h2><p>{curated ?? evidence}</p></section>
    {curated && evidence!==curated && <section><h2>{copy.institutions}</h2><p>{evidence}</p></section>}
    {event && <section className="country-topic-turn"><h2>{copy.turning}</h2><p><strong>{event.year} · {event.title}</strong></p><p>{event.text}</p></section>}
    <nav aria-label={copy.explore} className="country-detail-related"><h2>{copy.explore}</h2><div className="country-party-links">{country.globalLabels!.localDimensions.map((label,i)=>i!==index&&<Link key={i} href={`${root}/${i+1}`}>{label} ↗</Link>)}</div></nav>
    <section><h2>{copy.sources}</h2><ul className="country-detail-sources">{country.sources.map(src=><li key={src.url}><a href={src.url} target="_blank" rel="noopener noreferrer">{src.title} — {src.publisher} ↗</a></li>)}</ul><p className="country-detail-disclaimer">{copy.verified}</p></section>
  </section></main>;
}

export type PartyInfo = { summary: string; questions: readonly string[]; source?: string; election2025?: string };
export const germanPartyInfo: Record<string,PartyInfo> = {
 'cdu-csu': {summary:'CDU und CSU bilden im Bundestag eine gemeinsame Fraktion. Die CSU tritt in Bayern an, die CDU in den übrigen Bundesländern. Beide stehen in der Tradition der Christdemokratie und der Sozialen Marktwirtschaft.',questions:['Wie verbinden CDU und CSU Marktwirtschaft und soziale Absicherung?','Welche Positionen vertreten sie zu Migration, Sicherheit und europäischen Institutionen?'],election2025:'2025: CDU 164 und CSU 44 Bundestagssitze.'},
 'spd': {summary:'Die SPD gehört zur Tradition der Sozialdemokratie und der organisierten Arbeiterbewegung. Sozialstaat, Tarifverträge und Teilhabe sind zentrale Themen ihrer politischen Geschichte.',questions:['Wie gewichtet die SPD Tarifbindung, Umverteilung und Investitionen?','Welche Rolle sollen öffentliche und private Anbieter übernehmen?'],election2025:'2025: 120 Bundestagssitze.'},
 'afd': {summary:'Die AfD wurde 2013 gegründet. Zentrale Konfliktfelder sind Einwanderung, nationale Identität, EU-Integration und die Rolle politischer Institutionen. Für ihre ideologische Einordnung und Entwicklung bietet die Bundeszentrale für politische Bildung eine gesonderte Analyse.',questions:['Welche konkreten Forderungen stellt die Partei zu Einwanderung und Europa?','Wie verhalten sich Wahlprogramm und parlamentarisches Abstimmungsverhalten zueinander?'],election2025:'2025: 152 Bundestagssitze.'},
 'bundnis-90-die-grunen': {summary:'Bündnis 90/Die Grünen entstand aus Umwelt-, Friedens- und Bürgerrechtsbewegungen. Klimaschutz, Energiepolitik, gesellschaftliche Teilhabe und internationale Zusammenarbeit gehören zu den prägenden Themen.',questions:['Welche Instrumente bevorzugt die Partei beim Klimaschutz?','Wie verbindet sie Freiheitsrechte und staatliche Regulierung?'],election2025:'2025: 85 Bundestagssitze.'},
 'die-linke': {summary:'Die Linke entstand aus PDS und WASG. Sie stellt soziale Ungleichheit, Vermögens- und Einkommensverteilung, Mieten und öffentliche Daseinsvorsorge ins Zentrum vieler politischer Debatten.',questions:['Welche Rolle sollen öffentliche Dienstleistungen spielen?','Wie sollen Wohnen, Vermögen und Arbeit politisch geregelt werden?'],election2025:'2025: 64 Bundestagssitze.'},
 'fdp': {summary:'Die FDP vertritt eine liberale Parteitradition mit Schwerpunkten auf individuellen Freiheitsrechten, Marktwirtschaft, wirtschaftlicher Selbstbestimmung und Bürokratieabbau.',questions:['Wie verbindet die Partei Steuersenkungen und staatliche Leistungen?','Welche Freiheitsrechte und marktwirtschaftlichen Reformen betont sie?'],election2025:'2025: kein Sitz im Bundestag.'},
 'bsw': {summary:'Das Bündnis Sahra Wagenknecht entstand 2024. Wirtschaftliche Umverteilung und soziale Sicherheit werden mit Positionen zu Migration, Außenpolitik und nationaler Entscheidungsfreiheit verbunden.',questions:['Welche wirtschaftspolitischen Positionen unterscheiden das BSW von SPD und Linke?','Wie begründet die Partei ihre Positionen zu Einwanderung und internationalen Bündnissen?'],election2025:'2025: kein Sitz im Bundestag.'},
};
export function PartyDetail({country,locale,name,partyKey}:{country:CountryProfile;locale:Locale;name:string;partyKey:string}) {
 const copy=labels[locale],root=urlBase(locale,country.slug),party = country.slug==='germany'?germanPartyInfo[partyKey]:undefined;
 const context = germanyPartySummary[partyKey]?.[locale] ?? country.vocabulary.find(p=>words(name).some(token=>words(p).some(w=>w.startsWith(token.slice(0,5))))) ?? country.vocabulary[0];
 const sourceLinks=country.slug==='germany'?[
  {title:'Parteien in Deutschland — Bundeszentrale für politische Bildung',url:'https://www.bpb.de/themen/parteien/parteien-in-deutschland/'},
  {title:'Bundestagswahl 2025 — Die Bundeswahlleiterin',url:'https://www.bundeswahlleiterin.de/info/presse/mitteilungen/bundestagswahl-2025/29_25_endgueltiges-ergebnis.html'}
 ]:country.sources.map(s=>({title:`${s.publisher}: ${s.title}`,url:s.url}));
 return <main className="home info-page countries-page"><section className="info-shell country-guide country-topic-detail">
   <p className="country-detail-back"><Link href={root}>← {copy.return}: {country.name}</Link></p>
   <span className="country-detail-eyebrow">{country.name} / {copy.party}</span><h1>{name}</h1>
   {party ? <section className="country-detail-lead"><h2>{copy.comparison}</h2><p>{locale==='de'?party.summary:context}</p><p><strong>{locale==='de'?party.election2025:(locale==='en'?'2025 federal election: ':locale==='es'?'Elecciones federales de 2025: ':locale==='fr'?'Élections fédérales de 2025 : ':'Eleições federais de 2025: ')+(partyKey==='cdu-csu'?'CDU 164 + CSU 44':partyKey==='afd'?'AfD 152':partyKey==='spd'?'SPD 120':partyKey==='bundnis-90-die-grunen'?'Grüne 85':partyKey==='die-linke'?'Die Linke 64':partyKey==='fdp'?'FDP 0':'BSW 0')}</strong></p>{locale==='de'&&<ul>{party.questions.map(q=><li key={q}>{q}</li>)}</ul>}</section> : <section className="country-detail-lead"><h2>{copy.context}</h2><p>{context}</p><p>{copy.noElection}</p></section>}
   <section><h2>{copy.context}</h2>{country.power.slice(0,2).map(p=><p key={p}>{p}</p>)}</section>
   <section><h2>{copy.partySource}</h2><ul className="country-detail-sources">{sourceLinks.map(s=><li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.title} ↗</a></li>)}</ul><p className="country-detail-disclaimer">{copy.note}</p></section>
 </section></main>;
}
