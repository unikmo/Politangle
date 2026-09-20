import type { CountryProfile, CountryTimelineEvent } from './countries';
import { deExtra, esExtra, frExtra, type LocalizedCountryContent } from './country-localization-extra';
import { deExpansion } from './country-localization-expansion-de';
import { esExpansion } from './country-localization-expansion-es';
import { frExpansion } from './country-localization-expansion-fr';
import { ptBrWave1 } from './country-localization-ptbr-wave1';
import { ptBrWave2 } from './country-localization-ptbr-wave2';
import { deWave3, esWave3, frWave3, ptBrWave3 } from './country-localization-wave3';
import type { Locale } from '../app/LocaleProvider';

const de: Record<string, LocalizedCountryContent> = {
  'united-states': {
    name: 'Vereinigte Staaten',
    atAGlance: [['System','Föderale präsidentielle Verfassungsrepublik'],['Exekutive','Präsident'],['Legislative','Kongress: Repräsentantenhaus und Senat'],['Gerichte','Oberster Gerichtshof und weitere Bundesgerichte'],['Territorialstruktur','Föderal: Macht ist zwischen Bund und Bundesstaaten verteilt']],
    power: [
      'Die Verfassung verteilt die Bundesgewalt auf Legislative, Exekutive und Judikative. Jede dieser Gewalten kann die anderen begrenzen.',
      'Der Präsident führt die Exekutive, sitzt aber nicht im Kongress. Der Kongress beschließt Bundesgesetze und kontrolliert Steuern und Ausgaben; Bundesgerichte legen Gesetze aus und können sie für verfassungswidrig erklären.',
      'Föderalismus ist ebenso wichtig wie die Gewaltenteilung: Die Bundesstaaten behalten erhebliche Gesetzgebungs- und Verwaltungsbefugnisse, unter anderem bei Wahlen.',
    ],
    vocabulary: [
      'In den USA bezeichnet „liberal“ meist eine mitte-linke oder progressive Position. In vielen europäischen Ländern können liberale Parteien wirtschaftlich marktorientiert und politisch eher in der Mitte liegen.',
      '„Conservative“ verbindet in den USA häufig gesellschaftlichen Traditionalismus, niedrigere Steuern, Waffenrechte und eine starke nationale Identität. In anderen Ländern treten diese Positionen nicht zwingend gemeinsam auf.',
    ],
    timeline: [
      { year:'1787–1789', title:'Verfassungsgründung', text:'Die Verfassung wurde ausgearbeitet, ratifiziert und in Kraft gesetzt; damit entstand der bis heute bestehende föderale Rahmen.' },
      { year:'1865–1870', title:'Reconstruction-Verfassungszusätze', text:'Der 13., 14. und 15. Verfassungszusatz schafften die Sklaverei ab, definierten die nationale Staatsbürgerschaft und verboten rassistische Diskriminierung beim Wahlrecht.' },
      { year:'1964–1965', title:'Bürgerrechtsgesetzgebung', text:'Bundesgesetze zu Bürger- und Wahlrechten verstärkten den rechtlichen Schutz vor rassistischer Ausgrenzung.' },
    ],
  },
  germany: {
    name: 'Deutschland',
    atAGlance: [['System','Föderale parlamentarische Republik'],['Staatsoberhaupt','Bundespräsident'],['Regierungschef','Bundeskanzler'],['Legislative','Bundestag; die Länder wirken über den Bundesrat an der Bundesgesetzgebung mit'],['Territorialstruktur','Föderal: 16 Länder']],
    power: [
      'Der Bundestag wählt den Bundeskanzler und kontrolliert die Bundesregierung. Ein Kanzler kann nur abgelöst werden, wenn der Bundestag gleichzeitig einen Nachfolger wählt – das konstruktive Misstrauensvotum.',
      'Der Bundesrat vertritt die Länder. Bei bestimmten Bundesgesetzen, die Länderzuständigkeiten besonders betreffen, ist seine Zustimmung erforderlich.',
      'Das Bundesverfassungsgericht kann staatliches Handeln am Grundgesetz prüfen. Föderalismus, Koalitionsregierungen und Verfassungsgerichtsbarkeit verteilen politische Macht auf mehrere Institutionen.',
    ],
    vocabulary: [
      'Deutscher Liberalismus ist eng mit Bürgerrechten und in der Parteipolitik häufig auch mit Marktwirtschaft verbunden. „Liberal“ ist daher kein Synonym für das gesamte Mitte-links-Spektrum.',
      'Christdemokratie verbindet eine gesellschaftlich konservative Tradition mit Sozialer Marktwirtschaft und sozialstaatlichen Elementen. Sie entspricht nicht einfach einem US-amerikanischen konservativen Leitbild eines möglichst kleinen Staates.',
    ],
    timeline: [
      { year:'1949', title:'Grundgesetz und zwei deutsche Staaten', text:'Die Bundesrepublik verabschiedete das Grundgesetz; in der sowjetischen Besatzungszone entstand die Deutsche Demokratische Republik.' },
      { year:'1989–1990', title:'Friedliche Revolution und Wiedervereinigung', text:'Nach Massenprotesten und der Öffnung der Grenzen brach das DDR-Regime zusammen; im Oktober 1990 folgte die deutsche Einheit.' },
      { year:'2023', title:'Wahlrechtsreform', text:'Eine Reform änderte den Mechanismus zur Sitzverteilung und legte die Größe des Bundestags auf 630 Sitze fest.' },
    ],
  },
  france: {
    name: 'Frankreich',
    atAGlance: [['System','Einheitsstaatliche semipräsidentielle Republik'],['Staatsoberhaupt','Präsident der Republik'],['Regierungschef','Premierminister'],['Legislative','Parlament: Nationalversammlung und Senat'],['Verfassung','Verfassung der Fünften Republik von 1958']],
    power: [
      'Die Exekutivgewalt ist zwischen einem direkt gewählten Präsidenten und einer vom Premierminister geführten Regierung geteilt. Das Kräfteverhältnis verändert sich, wenn Präsident und Mehrheit der Nationalversammlung unterschiedlichen politischen Lagern angehören.',
      'Die Regierung ist gegenüber der Nationalversammlung verantwortlich. Das Parlament beschließt Gesetze und kontrolliert die Regierung; der Präsident verfügt über wichtige verfassungsmäßige Befugnisse, darunter Ernennungen, Referenden und die Auflösung der Nationalversammlung.',
      'Der Verfassungsrat prüft Gesetze und Wahlfragen. Frankreich bleibt ein Einheitsstaat, auch wenn die Dezentralisierung Gebietskörperschaften gewählte Organe und eigene Zuständigkeiten gibt.',
    ],
    vocabulary: [
      'Das französische „libéralisme“ verweist häufig stärker auf marktwirtschaftliche Positionen als das amerikanische Wort „liberal“. Die politische Mitte hat zudem eigene republikanische und europapolitische Traditionen.',
      'Die Links-rechts-Unterscheidung hat französische historische Wurzeln, doch heutige Konfliktlinien betreffen zusätzlich unter anderem Souveränität, europäische Integration, Einwanderung und die Macht des Präsidenten.',
    ],
    timeline: [
      { year:'1789', title:'Revolution und Erklärung der Rechte', text:'Die Revolution stürzte das Ancien Régime; die Erklärung der Menschen- und Bürgerrechte wurde zu einem dauerhaften verfassungsrechtlichen Bezugspunkt.' },
      { year:'1958', title:'Fünfte Republik', text:'Eine neue Verfassung stärkte die Exekutive und schuf den bis heute geltenden institutionellen Rahmen.' },
      { year:'1962', title:'Direktwahl des Präsidenten', text:'Eine Verfassungsänderung führte die Wahl des Präsidenten durch allgemeine direkte Wahl ein.' },
      { year:'2000', title:'Fünfjährige Präsidentschaft', text:'Die Amtszeit des Präsidenten wurde von sieben auf fünf Jahre verkürzt und veränderte damit den Rhythmus von Präsidentschafts- und Parlamentswahlen.' },
    ],
  },
  'united-kingdom': {
    name: 'Vereinigtes Königreich',
    atAGlance: [['System','Einheitsstaat mit Devolution; parlamentarische konstitutionelle Monarchie'],['Staatsoberhaupt','Monarch'],['Regierungschef','Premierminister'],['Legislative','Parlament des Vereinigten Königreichs: Unterhaus (House of Commons), Oberhaus (House of Lords) und Krone'],['Verfassung','Nicht in einem einzigen Dokument kodifiziert: Gesetze, Konventionen, Gerichtsentscheidungen und weitere Quellen']],
    power: [
      'Eine Regierung wird von der Person gebildet, die das Vertrauen des Unterhauses (House of Commons) besitzt – normalerweise vom Vorsitzenden der Partei mit einer Mehrheit im Unterhaus.',
      'Das Parlament beschließt Gesetze, genehmigt Steuern und Ausgaben, debattiert öffentliche Fragen und kontrolliert die Regierung. Das nicht direkt gewählte Oberhaus (House of Lords) prüft Gesetze; die zentrale demokratische Rolle liegt beim gewählten Unterhaus (House of Commons).',
      'Devolution gibt Schottland, Wales und Nordirland eigene Institutionen und Zuständigkeiten. Die parlamentarische Souveränität bleibt ein zentrales Rechtsprinzip.',
    ],
    vocabulary: [
      'Britischer Liberalismus hat eigene Traditionen in Bürgerrechten, politischer Reform, Internationalismus und Sozialliberalismus und lässt sich nicht sauber auf eine der großen US-Parteien übertragen.',
      'Konservatismus umfasst sowohl marktliberale als auch kommunitaristische oder paternalistische Traditionen. Unionismus und Devolution sind zusätzliche britische Konfliktlinien.',
    ],
    timeline: [
      { year:'1688–1689', title:'Verfassungsordnung', text:'Glorious Revolution und Bill of Rights stärkten das Parlament und begrenzten die monarchische Macht.' },
      { year:'1918–1928', title:'Ausweitung des Wahlrechts', text:'Wahlrechtsreformen führten zu nahezu allgemeinem Erwachsenenwahlrecht und anschließend zu gleichen Wahlbedingungen für Frauen und Männer.' },
      { year:'1998–1999', title:'Moderne Devolution', text:'Gesetze errichteten beziehungsweise stellten gewählte Institutionen in Schottland, Wales und Nordirland wieder her.' },
      { year:'2016–2020', title:'Brexit', text:'Das Referendum von 2016 führte zum Austritt des Vereinigten Königreichs aus der Europäischen Union im Jahr 2020.' },
    ],
  },
};

const es: Record<string, LocalizedCountryContent> = {
  'united-states': {
    name:'Estados Unidos',
    atAGlance:[['Sistema','República constitucional presidencial federal'],['Ejecutivo','Presidente'],['Legislativo','Congreso: Cámara de Representantes y Senado'],['Tribunales','Tribunal Supremo y tribunales federales inferiores'],['Estructura territorial','Federal: el poder se divide entre la federación y los estados']],
    power:['La Constitución divide la autoridad federal entre los poderes legislativo, ejecutivo y judicial. Cada uno puede limitar las actuaciones de los demás.','El presidente dirige el ejecutivo pero no forma parte del Congreso. El Congreso aprueba leyes federales y controla los impuestos y el gasto; los tribunales federales interpretan las leyes y pueden declararlas inconstitucionales.','El federalismo importa tanto como la división en tres poderes: los estados conservan amplias competencias legislativas y administrativas, entre ellas responsabilidades importantes sobre las elecciones.'],
    vocabulary:['En el debate estadounidense, “liberal” suele significar centroizquierda o progresista. En gran parte de Europa, los partidos liberales pueden ser económicamente favorables al mercado y políticamente centristas.','“Conservative” suele combinar tradicionalismo social, impuestos más bajos, derechos sobre armas y una identidad nacional fuerte. Esos elementos no siempre van juntos en otros países.'],
    timeline:[{year:'1787–1789',title:'Fundación constitucional',text:'La Constitución fue redactada, ratificada y puesta en vigor, creando el marco federal actual.'},{year:'1865–1870',title:'Enmiendas de la Reconstrucción',text:'Las enmiendas 13, 14 y 15 abolieron la esclavitud, definieron la ciudadanía nacional y prohibieron la discriminación racial en el derecho de voto.'},{year:'1964–1965',title:'Legislación de derechos civiles',text:'Las leyes federales de derechos civiles y electorales reforzaron la protección jurídica frente a la exclusión racial.'}],
  },
  germany: {
    name:'Alemania',
    atAGlance:[['Sistema','República parlamentaria federal'],['Jefatura del Estado','Presidente Federal'],['Jefatura del Gobierno','Canciller Federal'],['Legislativo','Bundestag; los Länder participan en la legislación federal a través del Bundesrat'],['Estructura territorial','Federal: 16 Länder']],
    power:['El Bundestag elige al canciller federal y controla al gobierno federal. Un canciller solo puede ser destituido si el Bundestag elige al mismo tiempo a su sustituto.','El Bundesrat representa a los Länder. Su consentimiento es necesario para determinadas leyes federales que afectan especialmente a competencias de los Länder.','El Tribunal Constitucional Federal puede revisar la actuación pública conforme a la Ley Fundamental. El federalismo, los gobiernos de coalición y el control constitucional reparten el poder entre varias instituciones.'],
    vocabulary:['El liberalismo alemán se asocia estrechamente con las libertades civiles y, en la política de partidos, a menudo con la economía de mercado. No equivale a todo el espacio de centroizquierda.','La democracia cristiana combina una herencia socialmente conservadora con la economía social de mercado y compromisos de bienestar; no es simplemente conservadurismo estadounidense de gobierno mínimo.'],
    timeline:[{year:'1949',title:'Ley Fundamental y dos Estados alemanes',text:'La República Federal adoptó la Ley Fundamental y se creó una República Democrática Alemana separada en la zona de ocupación soviética.'},{year:'1989–1990',title:'Revolución pacífica y reunificación',text:'El régimen de Alemania Oriental se derrumbó tras protestas masivas y la apertura de las fronteras; la unidad alemana siguió en octubre de 1990.'},{year:'2023',title:'Reforma electoral',text:'Una reforma modificó el mecanismo electoral y fijó el Bundestag en 630 escaños.'}],
  },
  france: {
    name:'Francia',
    atAGlance:[['Sistema','República semipresidencial unitaria'],['Jefatura del Estado','Presidente de la República'],['Jefatura del Gobierno','Primer ministro'],['Legislativo','Parlamento: Asamblea Nacional y Senado'],['Constitución','Constitución de la Quinta República de 1958']],
    power:['La autoridad ejecutiva se divide entre un presidente elegido directamente y un gobierno dirigido por el primer ministro. El equilibrio cambia cuando el presidente y la mayoría de la Asamblea Nacional pertenecen a campos políticos opuestos.','El gobierno responde ante la Asamblea Nacional. El Parlamento aprueba leyes y controla al gobierno, mientras la Constitución atribuye al presidente importantes competencias, entre ellas nombramientos, referendos y la disolución de la Asamblea Nacional.','El Consejo Constitucional revisa legislación y asuntos electorales. Francia sigue siendo un Estado unitario, aunque la descentralización otorga órganos elegidos y competencias definidas a las entidades territoriales.'],
    vocabulary:['El “libéralisme” francés suele apuntar más directamente a la economía de mercado que la palabra estadounidense “liberal”. El centro político también tiene tradiciones republicanas y europeístas propias.','La división izquierda–derecha nació de la historia revolucionaria francesa, pero la competencia contemporánea también incluye fuertes desacuerdos sobre soberanía, integración europea, inmigración y poder presidencial.'],
    timeline:[{year:'1789',title:'Revolución y declaración de derechos',text:'La Revolución derribó el Antiguo Régimen; la Declaración de los Derechos del Hombre y del Ciudadano se convirtió en una referencia constitucional duradera.'},{year:'1958',title:'Quinta República',text:'Una nueva Constitución reforzó las instituciones ejecutivas y creó el marco que sigue vigente.'},{year:'1962',title:'Elección presidencial directa',text:'Una reforma constitucional estableció la elección del presidente por sufragio universal directo.'},{year:'2000',title:'Presidencia de cinco años',text:'El mandato presidencial se redujo de siete a cinco años, modificando el ritmo de las elecciones presidenciales y parlamentarias.'}],
  },
  'united-kingdom': {
    name:'Reino Unido',
    atAGlance:[['Sistema','Estado unitario con devolución; monarquía constitucional parlamentaria'],['Jefatura del Estado','Monarca'],['Jefatura del Gobierno','Primer ministro'],['Legislativo','Parlamento del Reino Unido: Cámara de los Comunes, Cámara de los Lores y la Corona'],['Constitución','No codificada en un único texto: leyes, convenciones, sentencias y otras fuentes']],
    power:['El gobierno lo forma la persona capaz de contar con la confianza de la Cámara de los Comunes, normalmente el líder del partido con mayoría en la Cámara.','El Parlamento legisla, aprueba impuestos y gasto, debate asuntos públicos y controla al gobierno. La Cámara de los Lores revisa la legislación, mientras que la Cámara de los Comunes elegida tiene el papel democrático decisivo.','La devolución otorga a Escocia, Gales e Irlanda del Norte instituciones y competencias propias. La soberanía parlamentaria sigue siendo un principio jurídico central.'],
    vocabulary:['La política liberal británica tiene raíces propias en las libertades civiles, la reforma política, el internacionalismo y el liberalismo social; no encaja limpiamente en ninguno de los dos grandes partidos estadounidenses.','El conservadurismo incluye tradiciones tanto liberales de mercado como comunitarias o paternalistas. El unionismo y la devolución añaden divisiones sin un equivalente directo en Estados Unidos.'],
    timeline:[{year:'1688–1689',title:'Acuerdo constitucional',text:'La Revolución Gloriosa y la Bill of Rights reforzaron al Parlamento y limitaron el poder monárquico.'},{year:'1918–1928',title:'Ampliación del sufragio',text:'Las reformas representativas crearon un sufragio adulto casi universal y después condiciones de voto iguales para mujeres y hombres.'},{year:'1998–1999',title:'Devolución moderna',text:'La legislación estableció o restauró instituciones elegidas en Escocia, Gales e Irlanda del Norte.'},{year:'2016–2020',title:'Brexit',text:'El referéndum de 2016 condujo a la salida del Reino Unido de la Unión Europea en 2020.'}],
  },
};

const fr: Record<string, LocalizedCountryContent> = {
  'united-states': {
    name:'États-Unis',
    atAGlance:[['Système','République constitutionnelle fédérale à régime présidentiel'],['Exécutif','Président'],['Législatif','Congrès : Chambre des représentants et Sénat'],['Juridictions','Cour suprême et juridictions fédérales inférieures'],['Structure territoriale','Fédérale : le pouvoir est partagé entre la fédération et les États']],
    power:['La Constitution répartit l’autorité fédérale entre les pouvoirs législatif, exécutif et judiciaire. Chacun peut limiter les actions des autres.','Le président dirige l’exécutif mais ne siège pas au Congrès. Le Congrès adopte les lois fédérales et contrôle la fiscalité et les dépenses ; les juridictions fédérales interprètent les lois et peuvent les juger inconstitutionnelles.','Le fédéralisme compte autant que la séparation en trois pouvoirs : les États conservent d’importantes compétences législatives et administratives, notamment en matière électorale.'],
    vocabulary:['Dans le débat américain, « liberal » signifie généralement centre gauche ou progressiste. Dans une grande partie de l’Europe, les partis libéraux peuvent être économiquement favorables au marché et politiquement centristes.','« Conservative » associe souvent traditionalisme social, baisse des impôts, droits liés aux armes à feu et forte identité nationale. Ces éléments ne vont pas nécessairement ensemble ailleurs.'],
    timeline:[{year:'1787–1789',title:'Fondation constitutionnelle',text:'La Constitution est rédigée, ratifiée puis mise en application, créant le cadre fédéral actuel.'},{year:'1865–1870',title:'Amendements de la Reconstruction',text:'Les 13e, 14e et 15e amendements abolissent l’esclavage, définissent la citoyenneté nationale et interdisent la discrimination raciale en matière de droit de vote.'},{year:'1964–1965',title:'Législation sur les droits civiques',text:'Les lois fédérales sur les droits civiques et le droit de vote renforcent la protection juridique contre l’exclusion raciale.'}],
  },
  germany: {
    name:'Allemagne',
    atAGlance:[['Système','République parlementaire fédérale'],['Chef de l’État','Président fédéral'],['Chef du gouvernement','Chancelier fédéral'],['Législatif','Bundestag ; les Länder participent à la législation fédérale par le Bundesrat'],['Structure territoriale','Fédérale : 16 Länder']],
    power:['Le Bundestag élit le chancelier fédéral et contrôle le gouvernement fédéral. Un chancelier ne peut être renversé que si le Bundestag élit en même temps son successeur.','Le Bundesrat représente les Länder. Son consentement est nécessaire pour certaines catégories de lois fédérales qui touchent particulièrement aux compétences des Länder.','La Cour constitutionnelle fédérale peut contrôler l’action publique au regard de la Loi fondamentale. Fédéralisme, gouvernements de coalition et contrôle constitutionnel répartissent le pouvoir entre plusieurs institutions.'],
    vocabulary:['Le libéralisme allemand est fortement associé aux libertés civiles et, dans la politique partisane, souvent à l’économie de marché. Il ne désigne donc pas l’ensemble du centre gauche.','La démocratie chrétienne associe un héritage socialement conservateur à l’économie sociale de marché et à des engagements de protection sociale ; elle ne correspond pas simplement au conservatisme américain de petit État.'],
    timeline:[{year:'1949',title:'Loi fondamentale et deux États allemands',text:'La République fédérale adopte la Loi fondamentale ; une République démocratique allemande distincte est créée dans la zone d’occupation soviétique.'},{year:'1989–1990',title:'Révolution pacifique et réunification',text:'Le régime est-allemand s’effondre après des manifestations massives et l’ouverture des frontières ; l’unité allemande suit en octobre 1990.'},{year:'2023',title:'Réforme électorale',text:'Une réforme modifie le mécanisme électoral et fixe le Bundestag à 630 sièges.'}],
  },
  france: {
    name:'France',
    atAGlance:[['Système','République unitaire semi-présidentielle'],['Chef de l’État','Président de la République'],['Chef du gouvernement','Premier ministre'],['Législatif','Parlement : Assemblée nationale et Sénat'],['Constitution','Constitution de la Ve République de 1958']],
    power:['Le pouvoir exécutif est partagé entre un président élu au suffrage direct et un gouvernement dirigé par le Premier ministre. L’équilibre change lorsque le président et la majorité de l’Assemblée nationale appartiennent à des camps politiques opposés.','Le gouvernement est responsable devant l’Assemblée nationale. Le Parlement vote la loi et contrôle le gouvernement, tandis que la Constitution donne au président d’importants pouvoirs, notamment de nomination, de référendum et de dissolution de l’Assemblée nationale.','Le Conseil constitutionnel contrôle la législation et les questions électorales. La France reste un État unitaire, même si la décentralisation donne aux collectivités territoriales des organes élus et des compétences définies.'],
    vocabulary:['Le « libéralisme » français renvoie souvent plus directement à l’économie de marché que le mot américain « liberal ». Le centre politique possède aussi ses propres traditions républicaines et européennes.','La distinction gauche–droite vient de l’histoire révolutionnaire française, mais la compétition contemporaine comprend aussi des débats importants sur la souveraineté, l’intégration européenne, l’immigration et le pouvoir présidentiel.'],
    timeline:[{year:'1789',title:'Révolution et déclaration des droits',text:'La Révolution renverse l’Ancien Régime ; la Déclaration des droits de l’homme et du citoyen devient une référence constitutionnelle durable.'},{year:'1958',title:'Ve République',text:'Une nouvelle Constitution renforce les institutions exécutives et crée le cadre toujours en vigueur.'},{year:'1962',title:'Élection présidentielle directe',text:'Une révision constitutionnelle établit l’élection du président au suffrage universel direct.'},{year:'2000',title:'Quinquennat présidentiel',text:'Le mandat présidentiel est réduit de sept à cinq ans, modifiant le rythme des élections présidentielles et législatives.'}],
  },
  'united-kingdom': {
    name:'Royaume-Uni',
    atAGlance:[['Système','État unitaire avec dévolution ; monarchie constitutionnelle parlementaire'],['Chef de l’État','Monarque'],['Chef du gouvernement','Premier ministre'],['Législatif','Parlement du Royaume-Uni : Chambre des communes, Chambre des lords et Couronne'],['Constitution','Non codifiée dans un texte unique : lois, conventions, décisions judiciaires et autres sources']],
    power:['Le gouvernement est formé par la personne capable d’obtenir la confiance de la Chambre des communes, normalement le chef du parti disposant d’une majorité à la Chambre.','Le Parlement fait la loi, approuve la fiscalité et les dépenses, débat des questions publiques et contrôle le gouvernement. La Chambre des lords révise les textes, mais la Chambre des communes élue joue le rôle démocratique décisif.','La dévolution donne à l’Écosse, au pays de Galles et à l’Irlande du Nord leurs propres institutions et compétences. La souveraineté parlementaire reste un principe juridique central.'],
    vocabulary:['Le libéralisme britannique a ses propres racines dans les libertés civiles, la réforme politique, l’internationalisme et le libéralisme social ; il ne correspond proprement à aucun des deux grands partis américains.','Le conservatisme comprend à la fois des traditions libérales de marché et des traditions communautaires ou paternalistes. L’unionisme et la dévolution ajoutent des clivages sans équivalent direct aux États-Unis.'],
    timeline:[{year:'1688–1689',title:'Règlement constitutionnel',text:'La Glorieuse Révolution et le Bill of Rights renforcent le Parlement et limitent le pouvoir monarchique.'},{year:'1918–1928',title:'Élargissement du suffrage',text:'Les réformes de la représentation instaurent un suffrage adulte presque universel puis des conditions électorales égales pour les femmes et les hommes.'},{year:'1998–1999',title:'Dévolution moderne',text:'Des lois créent ou rétablissent des institutions élues en Écosse, au pays de Galles et en Irlande du Nord.'},{year:'2016–2020',title:'Brexit',text:'Le référendum de 2016 conduit à la sortie du Royaume-Uni de l’Union européenne en 2020.'}],
  },
};

const tables: Partial<Record<Locale, Record<string, LocalizedCountryContent>>> = {
  de: { ...de, ...deExtra, ...deExpansion, ...deWave3 },
  es: { ...es, ...esExtra, ...esExpansion, ...esWave3 },
  fr: { ...fr, ...frExtra, ...frExpansion, ...frWave3 },
  'pt-br': { ...ptBrWave1, ...ptBrWave2, ...ptBrWave3 },
};

export const nativeCountrySlugs = ['united-states','germany','france','united-kingdom','netherlands','denmark','finland','iceland','norway','sweden','spain','mexico','canada','south-africa','india','nigeria','philippines','brazil','indonesia','japan','italy','poland','romania','portugal','belgium','switzerland','ireland','argentina','colombia','chile','peru','costa-rica','kenya','ghana','senegal','australia','new-zealand','south-korea','taiwan','malaysia','austria','czechia','greece','hungary','ukraine','turkiye','israel','uruguay','ecuador','dominican-republic','panama','cameroon','zambia','bangladesh','pakistan','thailand','egypt','ethiopia','democratic-republic-congo','serbia'] as const;

export function localizeCountryProfile(country: CountryProfile, locale: Locale): CountryProfile | null {
  if (locale === 'en') return country;
  const localized = tables[locale]?.[country.slug];
  if (!localized) return null;
  return { ...country, ...localized, timeline: localized.timeline as readonly CountryTimelineEvent[] };
}
