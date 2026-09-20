import type { CountryProfile } from './countries';
import type { LocalizedCountryContent } from './country-localization-extra';
import { wave3CountryProfiles } from './countries-wave3';

type WaveLocale = 'de' | 'es' | 'fr' | 'pt-br';

const names: Record<WaveLocale, Record<string, string>> = {
  de: {
    austria:'Österreich', czechia:'Tschechien', greece:'Griechenland', hungary:'Ungarn', ukraine:'Ukraine', turkiye:'Türkei', israel:'Israel', uruguay:'Uruguay', ecuador:'Ecuador', 'dominican-republic':'Dominikanische Republik', panama:'Panama', cameroon:'Kamerun', zambia:'Sambia', bangladesh:'Bangladesch', pakistan:'Pakistan', thailand:'Thailand', egypt:'Ägypten', ethiopia:'Äthiopien', 'democratic-republic-congo':'Demokratische Republik Kongo', serbia:'Serbien',
  },
  es: {
    austria:'Austria', czechia:'Chequia', greece:'Grecia', hungary:'Hungría', ukraine:'Ucrania', turkiye:'Türkiye', israel:'Israel', uruguay:'Uruguay', ecuador:'Ecuador', 'dominican-republic':'República Dominicana', panama:'Panamá', cameroon:'Camerún', zambia:'Zambia', bangladesh:'Bangladés', pakistan:'Pakistán', thailand:'Tailandia', egypt:'Egipto', ethiopia:'Etiopía', 'democratic-republic-congo':'República Democrática del Congo', serbia:'Serbia',
  },
  fr: {
    austria:'Autriche', czechia:'Tchéquie', greece:'Grèce', hungary:'Hongrie', ukraine:'Ukraine', turkiye:'Türkiye', israel:'Israël', uruguay:'Uruguay', ecuador:'Équateur', 'dominican-republic':'République dominicaine', panama:'Panama', cameroon:'Cameroun', zambia:'Zambie', bangladesh:'Bangladesh', pakistan:'Pakistan', thailand:'Thaïlande', egypt:'Égypte', ethiopia:'Éthiopie', 'democratic-republic-congo':'République démocratique du Congo', serbia:'Serbie',
  },
  'pt-br': {
    austria:'Áustria', czechia:'Tchéquia', greece:'Grécia', hungary:'Hungria', ukraine:'Ucrânia', turkiye:'Türkiye', israel:'Israel', uruguay:'Uruguai', ecuador:'Equador', 'dominican-republic':'República Dominicana', panama:'Panamá', cameroon:'Camarões', zambia:'Zâmbia', bangladesh:'Bangladesh', pakistan:'Paquistão', thailand:'Tailândia', egypt:'Egito', ethiopia:'Etiópia', 'democratic-republic-congo':'República Democrática do Congo', serbia:'Sérvia',
  },
};

const systems: Record<WaveLocale, Record<string, string>> = {
  de: {
    'Federal parliamentary republic':'Föderale parlamentarische Republik',
    'Unitary parliamentary republic':'Einheitsstaatliche parlamentarische Republik',
    'Unitary semi-presidential republic':'Einheitsstaatliche semipräsidentielle Republik',
    'Unitary presidential republic':'Einheitsstaatliche präsidentielle Republik',
    'Parliamentary democracy under Basic Laws':'Parlamentarische Demokratie auf Grundlage der Grundgesetze',
    'Unitary parliamentary constitutional monarchy':'Einheitsstaatliche parlamentarische konstitutionelle Monarchie',
    'Unitary republic with a president, prime minister and bicameral legislature':'Einheitsstaatliche Republik mit Präsident, Premierminister und Zweikammerparlament',
    'Federal parliamentary republic':'Föderale parlamentarische Republik',
    'Semi-presidential republic with constitutionally decentralised provinces':'Semipräsidentielle Republik mit verfassungsrechtlich dezentralisierten Provinzen',
  },
  es: {
    'Federal parliamentary republic':'República parlamentaria federal',
    'Unitary parliamentary republic':'República parlamentaria unitaria',
    'Unitary semi-presidential republic':'República semipresidencial unitaria',
    'Unitary presidential republic':'República presidencial unitaria',
    'Parliamentary democracy under Basic Laws':'Democracia parlamentaria regida por Leyes Básicas',
    'Unitary parliamentary constitutional monarchy':'Monarquía constitucional parlamentaria unitaria',
    'Unitary republic with a president, prime minister and bicameral legislature':'República unitaria con presidente, primer ministro y parlamento bicameral',
    'Semi-presidential republic with constitutionally decentralised provinces':'República semipresidencial con provincias constitucionalmente descentralizadas',
  },
  fr: {
    'Federal parliamentary republic':'République parlementaire fédérale',
    'Unitary parliamentary republic':'République parlementaire unitaire',
    'Unitary semi-presidential republic':'République semi-présidentielle unitaire',
    'Unitary presidential republic':'République présidentielle unitaire',
    'Parliamentary democracy under Basic Laws':'Démocratie parlementaire régie par des Lois fondamentales',
    'Unitary parliamentary constitutional monarchy':'Monarchie constitutionnelle parlementaire unitaire',
    'Unitary republic with a president, prime minister and bicameral legislature':'République unitaire avec président, Premier ministre et parlement bicaméral',
    'Semi-presidential republic with constitutionally decentralised provinces':'République semi-présidentielle avec provinces constitutionnellement décentralisées',
  },
  'pt-br': {
    'Federal parliamentary republic':'República parlamentar federal',
    'Unitary parliamentary republic':'República parlamentar unitária',
    'Unitary semi-presidential republic':'República semipresidencial unitária',
    'Unitary presidential republic':'República presidencialista unitária',
    'Parliamentary democracy under Basic Laws':'Democracia parlamentar regida por Leis Básicas',
    'Unitary parliamentary constitutional monarchy':'Monarquia constitucional parlamentar unitária',
    'Unitary republic with a president, prime minister and bicameral legislature':'República unitária com presidente, primeiro-ministro e parlamento bicameral',
    'Semi-presidential republic with constitutionally decentralised provinces':'República semipresidencial com províncias constitucionalmente descentralizadas',
  },
};

function translateExecutive(locale: WaveLocale, value: string) {
  const direct: Record<WaveLocale, Record<string,string>> = {
    de: {
      'Federal President; Federal Chancellor and Federal Government':'Bundespräsident; Bundeskanzler und Bundesregierung',
      'President; Prime Minister and Government':'Präsident; Premierminister und Regierung',
      'President; Prime Minister and Cabinet of Ministers':'Präsident; Premierminister und Ministerkabinett',
      'President':'Präsident',
      'President and Council of Ministers':'Präsident und Ministerrat',
      'President and Ministers of State':'Präsident und Staatsminister',
      'President; Prime Minister and Cabinet':'Präsident; Premierminister und Kabinett',
      'President; Prime Minister and Federal Government':'Präsident; Premierminister und Bundesregierung',
      'King as head of state; Prime Minister and Council of Ministers':'König als Staatsoberhaupt; Premierminister und Ministerrat',
      'President; Prime Minister and Council of Ministers':'Präsident; Premierminister und Ministerrat',
    },
    es: {
      'Federal President; Federal Chancellor and Federal Government':'Presidente federal; canciller federal y Gobierno federal',
      'President; Prime Minister and Government':'Presidente; primer ministro y Gobierno',
      'President; Prime Minister and Cabinet of Ministers':'Presidente; primer ministro y Gabinete de Ministros',
      'President':'Presidente',
      'President and Council of Ministers':'Presidente y Consejo de Ministros',
      'President and Ministers of State':'Presidente y ministros de Estado',
      'President; Prime Minister and Cabinet':'Presidente; primer ministro y gabinete',
      'President; Prime Minister and Federal Government':'Presidente; primer ministro y Gobierno federal',
      'King as head of state; Prime Minister and Council of Ministers':'Rey como jefe del Estado; primer ministro y Consejo de Ministros',
      'President; Prime Minister and Council of Ministers':'Presidente; primer ministro y Consejo de Ministros',
    },
    fr: {
      'Federal President; Federal Chancellor and Federal Government':'Président fédéral ; chancelier fédéral et gouvernement fédéral',
      'President; Prime Minister and Government':'Président ; Premier ministre et gouvernement',
      'President; Prime Minister and Cabinet of Ministers':'Président ; Premier ministre et Cabinet des ministres',
      'President':'Président',
      'President and Council of Ministers':'Président et Conseil des ministres',
      'President and Ministers of State':'Président et ministres d’État',
      'President; Prime Minister and Cabinet':'Président ; Premier ministre et cabinet',
      'President; Prime Minister and Federal Government':'Président ; Premier ministre et gouvernement fédéral',
      'King as head of state; Prime Minister and Council of Ministers':'Roi comme chef de l’État ; Premier ministre et Conseil des ministres',
      'President; Prime Minister and Council of Ministers':'Président ; Premier ministre et Conseil des ministres',
    },
    'pt-br': {
      'Federal President; Federal Chancellor and Federal Government':'Presidente federal; chanceler federal e Governo federal',
      'President; Prime Minister and Government':'Presidente; primeiro-ministro e Governo',
      'President; Prime Minister and Cabinet of Ministers':'Presidente; primeiro-ministro e Gabinete de Ministros',
      'President':'Presidente',
      'President and Council of Ministers':'Presidente e Conselho de Ministros',
      'President and Ministers of State':'Presidente e ministros de Estado',
      'President; Prime Minister and Cabinet':'Presidente; primeiro-ministro e gabinete',
      'President; Prime Minister and Federal Government':'Presidente; primeiro-ministro e Governo federal',
      'King as head of state; Prime Minister and Council of Ministers':'Rei como chefe de Estado; primeiro-ministro e Conselho de Ministros',
      'President; Prime Minister and Council of Ministers':'Presidente; primeiro-ministro e Conselho de Ministros',
    },
  };
  return direct[locale][value] ?? value;
}

function translateLegislature(locale: WaveLocale, value: string) {
  const replacements: Record<WaveLocale, readonly [string,string][]> = {
    de: [['Parliament:','Parlament:'],['National Council','Nationalrat'],['Federal Council','Bundesrat'],['Chamber of Deputies','Abgeordnetenkammer'],['Senate','Senat'],['National Assembly','Nationalversammlung'],['Grand National Assembly of Türkiye','Große Nationalversammlung der Türkei'],['General Assembly:','Generalversammlung:'],['Chamber of Representatives','Repräsentantenkammer'],['National Congress:','Nationalkongress:'],['Parliament: President and National Assembly','Parlament: Präsident und Nationalversammlung'],['House of the Nation','Haus der Nation'],['Federal Parliamentary Assembly:','Föderale Parlamentarische Versammlung:'],["House of Peoples' Representatives",'Haus der Volksvertreter'],['House of Federation','Haus der Föderation'],['House of Representatives','Repräsentantenhaus']],
    es: [['Parliament:','Parlamento:'],['National Council','Consejo Nacional'],['Federal Council','Consejo Federal'],['Chamber of Deputies','Cámara de Diputados'],['Senate','Senado'],['National Assembly','Asamblea Nacional'],['Grand National Assembly of Türkiye','Gran Asamblea Nacional de Türkiye'],['General Assembly:','Asamblea General:'],['Chamber of Representatives','Cámara de Representantes'],['National Congress:','Congreso Nacional:'],['Parliament: President and National Assembly','Parlamento: presidente y Asamblea Nacional'],['House of the Nation','Cámara de la Nación'],['Federal Parliamentary Assembly:','Asamblea Parlamentaria Federal:'],["House of Peoples' Representatives",'Cámara de Representantes del Pueblo'],['House of Federation','Cámara de la Federación'],['House of Representatives','Cámara de Representantes']],
    fr: [['Parliament:','Parlement :'],['National Council','Conseil national'],['Federal Council','Conseil fédéral'],['Chamber of Deputies','Chambre des députés'],['Senate','Sénat'],['National Assembly','Assemblée nationale'],['Grand National Assembly of Türkiye','Grande Assemblée nationale de Türkiye'],['General Assembly:','Assemblée générale :'],['Chamber of Representatives','Chambre des représentants'],['National Congress:','Congrès national :'],['Parliament: President and National Assembly','Parlement : président et Assemblée nationale'],['House of the Nation','Chambre de la Nation'],['Federal Parliamentary Assembly:','Assemblée parlementaire fédérale :'],["House of Peoples' Representatives",'Chambre des représentants des peuples'],['House of Federation','Chambre de la Fédération'],['House of Representatives','Chambre des représentants']],
    'pt-br': [['Parliament:','Parlamento:'],['National Council','Conselho Nacional'],['Federal Council','Conselho Federal'],['Chamber of Deputies','Câmara dos Deputados'],['Senate','Senado'],['National Assembly','Assembleia Nacional'],['Grand National Assembly of Türkiye','Grande Assembleia Nacional da Türkiye'],['General Assembly:','Assembleia Geral:'],['Chamber of Representatives','Câmara dos Representantes'],['National Congress:','Congresso Nacional:'],['Parliament: President and National Assembly','Parlamento: presidente e Assembleia Nacional'],['House of the Nation','Casa da Nação'],['Federal Parliamentary Assembly:','Assembleia Parlamentar Federal:'],["House of Peoples' Representatives",'Câmara dos Representantes dos Povos'],['House of Federation','Câmara da Federação'],['House of Representatives','Câmara dos Representantes']],
  };
  return replacements[locale].reduce((text,[from,to]) => text.replaceAll(from,to), value);
}

const labels: Record<WaveLocale, Record<string,string>> = {
  de:{System:'System',Executive:'Exekutive',Legislature:'Legislative'},
  es:{System:'Sistema',Executive:'Ejecutivo',Legislature:'Legislativo'},
  fr:{System:'Système',Executive:'Exécutif',Legislature:'Législatif'},
  'pt-br':{System:'Sistema',Executive:'Executivo',Legislature:'Legislativo'},
};

const timelineTitles: Record<WaveLocale, Record<string,string>> = {
  de:{'Constitutional framework':'Verfassungsrahmen','Political transition':'Politischer Übergang','Independence and statehood':'Unabhängigkeit und Staatlichkeit','Institutional reform':'Institutionelle Reform'},
  es:{'Constitutional framework':'Marco constitucional','Political transition':'Transición política','Independence and statehood':'Independencia y formación del Estado','Institutional reform':'Reforma institucional'},
  fr:{'Constitutional framework':'Cadre constitutionnel','Political transition':'Transition politique','Independence and statehood':'Indépendance et construction de l’État','Institutional reform':'Réforme institutionnelle'},
  'pt-br':{'Constitutional framework':'Marco constitucional','Political transition':'Transição política','Independence and statehood':'Independência e formação do Estado','Institutional reform':'Reforma institucional'},
};

function timelineText(locale: WaveLocale, country: string, year: string, title: string) {
  const kind = title;
  if (locale === 'de') {
    if (kind === 'Constitutional framework') return `Ein verfassungsrechtlicher Meilenstein im Jahr ${year} schuf oder veränderte wesentliche Grundlagen des heutigen institutionellen Rahmens in ${country}.`;
    if (kind === 'Political transition') return `Der politische Wandel von ${year} veränderte die Funktionsweise der staatlichen Institutionen und bleibt ein wichtiger Bezugspunkt für das heutige System in ${country}.`;
    if (kind === 'Independence and statehood') return `Ein zentraler Schritt zu Unabhängigkeit oder Staatlichkeit im Jahr ${year} prägte die weitere Entwicklung der staatlichen Institutionen in ${country}.`;
    return `Eine institutionelle Reform im Jahr ${year} veränderte Aufbau oder Kräfteverhältnis der nationalen politischen Institutionen in ${country}.`;
  }
  if (locale === 'es') {
    if (kind === 'Constitutional framework') return `Un hito constitucional de ${year} creó o modificó de forma sustancial las bases del marco institucional actual de ${country}.`;
    if (kind === 'Political transition') return `El cambio político de ${year} alteró el funcionamiento de las instituciones del Estado y sigue siendo una referencia importante para el sistema actual de ${country}.`;
    if (kind === 'Independence and statehood') return `Un hito decisivo de independencia o formación estatal en ${year} marcó el desarrollo posterior de las instituciones nacionales de ${country}.`;
    return `Una reforma institucional de ${year} modificó la estructura o el equilibrio entre las instituciones políticas nacionales de ${country}.`;
  }
  if (locale === 'fr') {
    if (kind === 'Constitutional framework') return `Une étape constitutionnelle en ${year} a établi ou profondément modifié les bases du cadre institutionnel actuel de ${country}.`;
    if (kind === 'Political transition') return `Le changement politique de ${year} a modifié le fonctionnement des institutions de l’État et reste un repère important pour le système actuel de ${country}.`;
    if (kind === 'Independence and statehood') return `Une étape majeure d’indépendance ou de construction de l’État en ${year} a marqué le développement ultérieur des institutions nationales de ${country}.`;
    return `Une réforme institutionnelle en ${year} a modifié l’organisation ou l’équilibre des institutions politiques nationales de ${country}.`;
  }
  if (kind === 'Constitutional framework') return `Um marco constitucional em ${year} criou ou alterou de forma substancial as bases do atual arranjo institucional de ${country}.`;
  if (kind === 'Political transition') return `A mudança política de ${year} alterou o funcionamento das instituições do Estado e continua sendo uma referência importante para o sistema atual de ${country}.`;
  if (kind === 'Independence and statehood') return `Um marco importante de independência ou formação do Estado em ${year} influenciou o desenvolvimento posterior das instituições nacionais de ${country}.`;
  return `Uma reforma institucional em ${year} modificou a estrutura ou o equilíbrio entre as instituições políticas nacionais de ${country}.`;
}

function make(locale: WaveLocale, country: CountryProfile): LocalizedCountryContent {
  const countryName = names[locale][country.slug] ?? country.name;
  const system = systems[locale][country.atAGlance[0][1]] ?? country.atAGlance[0][1];
  const executive = translateExecutive(locale, country.atAGlance[1][1]);
  const legislature = translateLegislature(locale, country.atAGlance[2][1]);

  const power = locale === 'de' ? [
    `Der verfassungsrechtliche Rahmen von ${countryName} verteilt die nationale Staatsgewalt auf die oben genannten Institutionen. Gerichte und weitere öffentliche Organe nehmen die ihnen durch Verfassung und Gesetze zugewiesenen Aufgaben wahr.`,
    `${legislature} übt die nationale Gesetzgebungsfunktion aus. Das Verhältnis zwischen Exekutive, parlamentarischer Kontrolle, territorialer Verwaltung und Verfassungsaufsicht richtet sich nach der jeweiligen Verfassungsordnung und ihren späteren Reformen.`,
  ] : locale === 'es' ? [
    `El marco constitucional de ${countryName} distribuye la autoridad nacional entre las instituciones indicadas. Los tribunales y otros órganos públicos ejercen las competencias que les atribuyen la constitución y las leyes.`,
    `${legislature} desempeña la función legislativa nacional. El equilibrio entre el poder ejecutivo, el control parlamentario, el gobierno territorial y la supervisión constitucional depende del diseño constitucional y de sus reformas posteriores.`,
  ] : locale === 'fr' ? [
    `Le cadre constitutionnel de ${countryName} répartit l’autorité nationale entre les institutions indiquées. Les juridictions et les autres organes publics exercent les compétences que leur attribuent la constitution et la loi.`,
    `${legislature} exerce la fonction législative nationale. L’équilibre entre pouvoir exécutif, contrôle parlementaire, gouvernement territorial et contrôle constitutionnel dépend de l’architecture constitutionnelle et de ses réformes ultérieures.`,
  ] : [
    `O marco constitucional de ${countryName} distribui a autoridade nacional entre as instituições indicadas. Tribunais e outros órgãos públicos exercem as competências que a constituição e as leis lhes atribuem.`,
    `${legislature} exerce a função legislativa nacional. O equilíbrio entre poder executivo, controle parlamentar, governo territorial e fiscalização constitucional depende do desenho constitucional e de suas reformas posteriores.`,
  ];

  const vocabulary = locale === 'de'
    ? [`Politische Bezeichnungen haben in ${countryName} eine eigene nationale Geschichte. Begriffe wie liberal, konservativ, sozialistisch, nationalistisch oder populistisch sollten deshalb im jeweiligen Partei- und Institutionenkontext gelesen und nicht direkt auf das politische Spektrum eines anderen Landes übertragen werden.`]
    : locale === 'es'
      ? [`Las etiquetas políticas tienen una historia propia en ${countryName}. Términos como liberal, conservador, socialista, nacionalista o populista deben interpretarse dentro de su contexto partidista e institucional, no trasladarse directamente al espectro de otro país.`]
      : locale === 'fr'
        ? [`Les étiquettes politiques ont leur propre histoire en ${countryName}. Des termes comme libéral, conservateur, socialiste, nationaliste ou populiste doivent être lus dans leur contexte partisan et institutionnel, et non transposés directement sur le spectre d’un autre pays.`]
        : [`Os rótulos políticos têm uma história própria em ${countryName}. Termos como liberal, conservador, socialista, nacionalista ou populista devem ser entendidos no contexto partidário e institucional local, e não transferidos diretamente para o espectro de outro país.`];

  return {
    name: countryName,
    atAGlance: [
      [labels[locale].System, system],
      [labels[locale].Executive, executive],
      [labels[locale].Legislature, legislature],
    ],
    power,
    vocabulary,
    timeline: country.timeline.map((event) => ({
      year:event.year,
      title:timelineTitles[locale][event.title] ?? event.title,
      text:timelineText(locale, countryName, event.year, event.title),
    })),
  };
}

function build(locale: WaveLocale) {
  return Object.fromEntries(wave3CountryProfiles.map((country) => [country.slug, make(locale, country)])) as Record<string, LocalizedCountryContent>;
}

export const deWave3 = build('de');
export const esWave3 = build('es');
export const frWave3 = build('fr');
export const ptBrWave3 = build('pt-br');
