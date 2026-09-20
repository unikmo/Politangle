import type { CountryCurrentSnapshot, CountryProfile } from './countries';

export type LocalizedCountryContent = Pick<CountryProfile, 'name' | 'atAGlance' | 'power' | 'vocabulary' | 'timeline'> & {
  globalLabels?: CountryProfile['globalLabels'];
  current?: CountryCurrentSnapshot;
};

export const deExtra: Record<string, LocalizedCountryContent> = {
  netherlands: {
    name: "Niederlande",
    atAGlance: [["System","Einheitsstaatliche parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch"],["Regierungschef","Premierminister"],["Legislative","Generalstaaten: Zweite Kammer und Erste Kammer"],["Wahlen","Verhältniswahl führt regelmäßig zu Mehrparteien-Koalitionen"]],
    power: [
      "Die Regierung braucht das Vertrauen der direkt gewählten Zweiten Kammer. Sie debattiert und ändert Gesetzentwürfe und kontrolliert die Minister.",
      "Die Erste Kammer wird indirekt über die Provinzen gewählt. Sie kann Gesetze nicht ändern, sondern nur annehmen oder ablehnen, nachdem die Zweite Kammer sie beschlossen hat.",
      "Der Staatsrat berät zu Gesetzen und entscheidet wichtige verwaltungsrechtliche Fälle. Niederländische Gerichte können ein Parlamentsgesetz nicht allein wegen eines Widerspruchs zur Verfassung außer Anwendung setzen.",
    ],
    vocabulary: [
      "Niederländische liberale Parteien umfassen sowohl marktliberale als auch sozialliberale Traditionen. „Liberal“ bezeichnet daher keine einheitliche Position zu allen politischen Fragen.",
      "Das „Poldermodell“ steht für Verhandlung und Kompromiss zwischen Staat, Arbeitgebern und Gewerkschaften. „Versäulung“ bezeichnet die frühere Organisation der Gesellschaft in religiöse und politische Milieus.",
    ],
    timeline: [
      { year:"1815", title:"Königreich gegründet", text:"Nach der napoleonischen Zeit entstand das Königreich der Niederlande." },
      { year:"1848", title:"Parlamentarische Verfassungsordnung", text:"Eine Verfassungsreform machte Minister gegenüber dem Parlament verantwortlich und stärkte die repräsentative Regierung." },
      { year:"1917–1919", title:"Wahlrechtliche Neuordnung", text:"Verhältniswahl und allgemeines Männerwahlrecht wurden eingeführt; kurz darauf erhielten Frauen das volle Wahlrecht." },
      { year:"1983", title:"Verfassung revidiert", text:"Eine umfassende Verfassungsrevision modernisierte Grundrechte und die staatliche Organisation." },
    ],
  },
  denmark: {
    name: "Dänemark",
    atAGlance: [["System","Einheitsstaatliche parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch"],["Regierungschef","Premierminister"],["Legislative","Folketing: eine gewählte Kammer"],["Reichsgemeinschaft","Dänemark, Färöer und Grönland; beide Gebiete besitzen weitreichende Selbstverwaltung"]],
    power: [
      "Eine Regierung kann im Amt bleiben, solange sich keine Mehrheit im Folketing gegen sie stellt. Dieser negative Parlamentarismus macht Minderheitsregierungen häufig.",
      "Das Folketing beschließt Gesetze und öffentliche Finanzen und kontrolliert die Minister. Verhältniswahl zwingt Parteien oft dazu, Unterstützung über politische Blöcke hinweg auszuhandeln.",
      "Der Monarch erfüllt formelle Verfassungsaufgaben, politische Macht wird jedoch von gewählten Ministern ausgeübt. Die Färöer und Grönland regeln viele Angelegenheiten selbst.",
    ],
    vocabulary: [
      "Dänemarks Partei Venstre heißt wörtlich „Links“, ist heute aber eine liberale Mitte-rechts-Partei. Historische Parteinamen können bei wörtlicher Übersetzung irreführen.",
      "Die dänische Sozialdemokratie entwickelte einen breit ausgebauten Wohlfahrtsstaat. Liberale, konservative und national orientierte Parteien streiten vor allem über Umfang, Bedingungen und Zugang.",
    ],
    timeline: [
      { year:"1849", title:"Konstitutionelle Monarchie", text:"Die erste demokratische Verfassung begrenzte die absolute Monarchie und schuf repräsentative Institutionen." },
      { year:"1901", title:"Parlamentarische Regierung", text:"Es setzte sich das Prinzip durch, dass eine Regierung nicht gegen eine Parlamentsmehrheit regieren kann." },
      { year:"1953", title:"Heutiger Verfassungsrahmen", text:"Ein neues Grundgesetz schuf ein Einkammerparlament und änderte die Thronfolgeregeln." },
      { year:"1973", title:"Beitritt zu den Europäischen Gemeinschaften", text:"Dänemark trat nach einem Referendum den Europäischen Gemeinschaften bei." },
    ],
  },
  finland: {
    name: "Finnland",
    atAGlance: [["System","Einheitsstaatliche parlamentarische Republik"],["Staatsoberhaupt","Präsident der Republik"],["Regierungschef","Premierminister"],["Legislative","Eduskunta: eine gewählte Kammer"],["Territorialstruktur","Einheitsstaat; Åland besitzt verfassungsrechtlich geschützte Autonomie"]],
    power: [
      "Das Parlament wählt den Premierminister, beschließt Gesetze und den Haushalt und kontrolliert die Regierung. Koalitionsregierungen sind der Normalfall.",
      "Der Präsident leitet die Außenpolitik gemeinsam mit der Regierung und ist Oberbefehlshaber; der Premierminister führt die Innenpolitik und die Politik gegenüber der Europäischen Union.",
      "Der Verfassungsausschuss des Parlaments prüft Gesetzentwürfe auf ihre Vereinbarkeit mit der Verfassung. Gerichte können der Verfassung bei einem eindeutigen Konflikt Vorrang geben.",
    ],
    vocabulary: [
      "Die Zentrumspartei entstand aus einer agrarischen Bewegung, ist aber nicht auf Landwirtschaft beschränkt. Sie verbindet regionale Dezentralisierung mit Positionen, die wirtschafts- und gesellschaftspolitisch variieren.",
      "Die Nationale Sammlungspartei ist liberal-konservativ und Mitte-rechts. Ihr Name bezeichnet keine vorübergehende Koalition aller Parteien.",
    ],
    timeline: [
      { year:"1906", title:"Parlamentsreform", text:"Finnland schuf ein Einkammerparlament und führte allgemeines und gleiches Wahlrecht ein." },
      { year:"1917–1919", title:"Unabhängigkeit und Republik", text:"Finnland erklärte seine Unabhängigkeit und verabschiedete anschließend eine republikanische Verfassung." },
      { year:"1995", title:"EU-Mitgliedschaft", text:"Finnland trat nach einem konsultativen Referendum der Europäischen Union bei." },
      { year:"2000", title:"Einheitliche Verfassung", text:"Eine neue Verfassung stärkte die parlamentarische Regierung und führte ältere Verfassungsgesetze zusammen." },
    ],
  },
  iceland: {
    name: "Island",
    atAGlance: [["System","Einheitsstaatliche parlamentarische Republik"],["Staatsoberhaupt","Präsident Islands"],["Regierungschef","Premierminister"],["Legislative","Althingi: eine gewählte Kammer"],["Wahlen","Verhältniswahl in Mehrpersonenwahlkreisen"]],
    power: [
      "Die Regierung muss das Vertrauen des Althingi behalten. Koalitionsregierungen sind üblich, weil die Verhältniswahl mehrere Parlamentsparteien hervorbringt.",
      "Der Präsident ist Staatsoberhaupt und handelt gewöhnlich auf Rat der Minister, kann aber die Unterzeichnung eines Gesetzes verweigern und es einer Volksabstimmung vorlegen.",
      "Das Althingi beschließt Gesetze und kontrolliert die öffentlichen Finanzen. Die Gerichte sind unabhängig und können prüfen, ob Gesetze mit der Verfassung vereinbar sind.",
    ],
    vocabulary: [
      "Die Unabhängigkeitspartei verbindet konservative und marktliberale Traditionen. Ihr Name bezieht sich auf die Geschichte Islands und nicht auf eine heutige Sezessionsbewegung.",
      "Isländische Parteipolitik verläuft auch entlang älterer Stadt-Land-, Umwelt-, Wohlfahrts- und Europafragen. Eine einzige Links-rechts-Achse reicht daher nicht aus.",
    ],
    timeline: [
      { year:"930", title:"Althing gegründet", text:"Das Althing entstand als nationale Versammlung und gehört zu den ältesten parlamentarischen Institutionen der Welt." },
      { year:"1918", title:"Souveränes Königreich", text:"Island wurde ein souveräner Staat in Personalunion mit Dänemark." },
      { year:"1944", title:"Republik gegründet", text:"Ein Referendum beendete die Union mit Dänemark und gründete die Republik Island." },
      { year:"1994", title:"Europäischer Wirtschaftsraum", text:"Island trat dem Europäischen Wirtschaftsraum bei, ohne Mitglied der Europäischen Union zu werden." },
    ],
  },
  norway: {
    name: "Norwegen",
    atAGlance: [["System","Einheitsstaatliche parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch"],["Regierungschef","Premierminister"],["Legislative","Storting: eine gewählte Kammer"],["Wahlen","Verhältniswahl in Wahlbezirken"]],
    power: [
      "Eine Regierung kann im Amt bleiben, solange sie nicht von einer Parlamentsmehrheit gestürzt wird. Minderheits- und Koalitionsregierungen sind deshalb beide üblich.",
      "Das Storting beschließt Gesetze, Steuern und Ausgaben und kontrolliert die Regierung. Der Monarch erfüllt formelle Aufgaben, während die Minister die politische Macht ausüben.",
      "Gerichte können Gesetze an der Verfassung prüfen. Kommunale Selbstverwaltung und das Sameting ergänzen die nationalen Institutionen um territoriale und samische Perspektiven.",
    ],
    vocabulary: [
      "Norwegens Zentrumspartei entstand aus der Agrarpolitik und betont heute ländliche Interessen und Dezentralisierung. „Zentrum“ bedeutet nicht Neutralität in allen politischen Fragen.",
      "Die Fortschrittspartei verbindet niedrigere Steuern und marktwirtschaftliche Positionen mit einer restriktiveren Einwanderungspolitik. Diese Elemente sollten getrennt betrachtet werden.",
    ],
    timeline: [
      { year:"1814", title:"Verfassung verabschiedet", text:"Norwegen verabschiedete in Eidsvoll seine Verfassung und trat anschließend in eine Union mit Schweden ein." },
      { year:"1884", title:"Parlamentarismus etabliert", text:"Ein politischer Konflikt setzte das Prinzip durch, dass Regierungen parlamentarische Unterstützung benötigen." },
      { year:"1905", title:"Unabhängige Monarchie", text:"Die Union mit Schweden endete und Norwegen wurde vollständig unabhängig." },
      { year:"1972 und 1994", title:"EU-Beitritt abgelehnt", text:"Norwegische Wähler lehnten in zwei Referenden den Beitritt zur Europäischen Gemeinschaft beziehungsweise Europäischen Union ab." },
    ],
  },
  sweden: {
    name: "Schweden",
    atAGlance: [["System","Einheitsstaatliche parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch"],["Regierungschef","Premierminister"],["Legislative","Riksdag: eine gewählte Kammer"],["Territorialstruktur","Einheitsstaat mit starken gewählten Kommunen und Regionen"]],
    power: [
      "Der Parlamentspräsident schlägt einen Premierminister vor. Der Kandidat gilt als angenommen, solange nicht die Mehrheit aller Mitglieder des Riksdag gegen ihn stimmt.",
      "Der Monarch hat zeremonielle Aufgaben und keine politische Macht. Der Riksdag beschließt Gesetze und Haushalte, kontrolliert die Regierung und kann Ministern das Vertrauen entziehen.",
      "Behörden sind organisatorisch von Ministerien getrennt. Minister können allgemeine Politik vorgeben, aber keine Behörde in einem konkreten Einzelfall anweisen.",
    ],
    vocabulary: [
      "Die Sozialdemokraten prägten die Wohlfahrtstradition des „Volksheims“. Über die konkrete Ausgestaltung des Wohlfahrtsstaats wird jedoch im gesamten politischen Spektrum gestritten.",
      "Die Moderaten sind liberal-konservativ. Die Schwedendemokraten verbinden Nationalismus und Sozialkonservatismus; beide sollten nicht allein deshalb gleichgesetzt werden, weil sie rechts eingeordnet werden.",
    ],
    timeline: [
      { year:"1809", title:"Verfassungsordnung", text:"Ein neues Regierungsinstrument begrenzte die königliche Macht und teilte die öffentliche Gewalt." },
      { year:"1921", title:"Gleiches nationales Wahlrecht", text:"Frauen und Männer wählten bei einer nationalen Parlamentswahl unter gleichen Bedingungen." },
      { year:"1974–1975", title:"Moderne parlamentarische Verfassung", text:"Ein neues Regierungsinstrument bestätigte die parlamentarische Demokratie und die rein zeremonielle Rolle des Monarchen." },
      { year:"1995", title:"EU-Mitgliedschaft", text:"Schweden trat nach einem Referendum der Europäischen Union bei." },
    ],
  },
  spain: {
    name: "Spanien",
    atAGlance: [["System","Dezentralisierte parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch"],["Regierungschef","Ministerpräsident"],["Legislative","Cortes Generales: Abgeordnetenkongress und Senat"],["Territorialstruktur","17 autonome Gemeinschaften und zwei autonome Städte"]],
    power: [
      "Der Abgeordnetenkongress wählt den Ministerpräsidenten in einem Investiturvotum und kann eine Regierung nur abwählen, indem er gleichzeitig einen Nachfolger wählt.",
      "Kongress und Senat beschließen nationale Gesetze, doch der Kongress hat die stärkere Rolle bei der Regierungsbildung und bei vielen legislativen Konflikten.",
      "Die autonomen Gemeinschaften regeln wichtige Bereiche wie Gesundheit und Bildung. Das Verfassungsgericht entscheidet über Grundrechte und Kompetenzstreitigkeiten.",
    ],
    vocabulary: [
      "Spanische Politik lässt sich nicht allein mit links und rechts erklären. Parteien streiten auch darüber, wie viel Macht beim Gesamtstaat, bei Regionen und historischen Nationalitäten liegen soll.",
      "Regionaler Nationalismus kann links, zentristisch oder konservativ sein. Unterstützung für katalanische oder baskische Autonomie sagt allein nichts über eine vollständige wirtschafts- oder gesellschaftspolitische Ideologie aus.",
    ],
    timeline: [
      { year:"1936–1939", title:"Bürgerkrieg", text:"Der Bürgerkrieg endete mit der Diktatur Francisco Francos, die bis zu seinem Tod 1975 dauerte." },
      { year:"1978", title:"Demokratische Verfassung", text:"Die Wähler billigten eine Verfassung mit parlamentarischer Demokratie, Grundrechten, autonomen Gemeinschaften und konstitutioneller Monarchie." },
      { year:"1986", title:"Beitritt zu den Europäischen Gemeinschaften", text:"Spanien trat den Europäischen Gemeinschaften, der heutigen Europäischen Union, bei." },
      { year:"2017", title:"Katalanische Verfassungskrise", text:"Eine nicht genehmigte Unabhängigkeitsabstimmung und die Reaktion des Zentralstaats machten tiefe Konflikte über Souveränität und territoriale Macht sichtbar." },
    ],
    current: {
      asOf: "2026-09-15",
      officeholders: [["Staatsoberhaupt","König Felipe VI."],["Regierungschef","Pedro Sánchez, Spanische Sozialistische Arbeiterpartei (PSOE)"]],
      election: {
        title:"Parlamentswahl 2023", date:"23. Juli 2023", turnout:"66,59 % der registrierten Wähler",
        summary:"Keine Partei gewann eine Mehrheit im 350 Sitze umfassenden Kongress. Die Volkspartei erhielt die meisten Sitze, Pedro Sánchez sicherte sich jedoch die parlamentarische Investitur für eine von der PSOE geführte Koalitionsregierung.",
        representation:[["Volkspartei (PP)","137 Sitze"],["Spanische Sozialistische Arbeiterpartei (PSOE)","121 Sitze"],["Vox","33 Sitze"],["Sumar","31 Sitze"],["Regionale und andere Parteien","28 Sitze"]],
      },
      rights: {
        provider:"Freedom House", edition:"Freedom in the World 2026", score:"91/100", status:"Frei", comparison:"Ein Punkt mehr als in der Ausgabe 2025",
        note:"Dies ist die Bewertung einer Organisation und kein Urteil von Politangle. Sie kombiniert 40 Punkte zu politischen Rechten und 60 Punkte zu bürgerlichen Freiheiten.",
        url:"https://freedomhouse.org/country/spain/freedom-world/2026",
      },
      trends: [
        "Die nationale Politik bleibt fragmentiert: Regierungsbildungen können sowohl von kleineren Regionalparteien als auch von landesweiten Parteien abhängen.",
        "Freedom House erhöhte Spaniens Wert 2026 um einen Punkt und verwies auf Fortschritte bei der Besetzung richterlicher Stellen, während der Bericht weiterhin Korruption und Einschränkungen bei Meinungs- und Versammlungsfreiheit nennt.",
      ],
    },
  },
  mexico: {
    name: "Mexiko",
    atAGlance: [["System","Föderale präsidentielle Republik"],["Exekutive","Präsident"],["Legislative","Kongress der Union: Abgeordnetenkammer und Senat"],["Gerichte","Oberster Gerichtshof und Bundesjustiz"],["Territorialstruktur","Föderal: 31 Bundesstaaten und Mexiko-Stadt"]],
    power: [
      "Der Präsident führt die Exekutive unabhängig vom Kongress und wird für eine einmalige sechsjährige Amtszeit ohne Wiederwahl gewählt.",
      "Der Kongress beschließt Bundesgesetze, Steuern und Ausgaben und kontrolliert die Regierung. Abgeordnete und Senatoren werden über eine Mischung aus Direkt- und Verhältniswahlmandaten gewählt.",
      "Die Bundesstaaten besitzen eigene Verfassungen und gewählte Institutionen. Der Oberste Gerichtshof übt Verfassungskontrolle aus; autonome Wahlorgane organisieren und überwachen Wahlen.",
    ],
    vocabulary: [
      "Mexikos revolutionäre und nationalistische Traditionen verbanden Sozialreformen, staatliche Führung und Wirtschaftsinteressen. Parteinamen aus dieser Geschichte lassen sich nicht sauber auf eine europäische Links-rechts-Achse übertragen.",
      "Kritik an Korruption, Steuerprivilegien oder konzentriertem Einfluss ist nicht automatisch populistisch. Populismus beginnt dort, wo Politik als Kampf eines moralisch reinen Volkes gegen eine vollständig illegitime Elite dargestellt wird.",
    ],
    timeline: [
      { year:"1910–1917", title:"Revolution und Verfassung", text:"Revolutionäre Konflikte führten zur Verfassung von 1917 mit föderalen Institutionen und weitreichenden sozialen Rechten." },
      { year:"1929–2000", title:"Lange Ära einer dominierenden Partei", text:"Eine politische Organisation und ihre Nachfolger dominierten sieben Jahrzehnte lang die Präsidentschaft, während Wahlen und Institutionen schrittweise wettbewerblicher wurden." },
      { year:"1990–1996", title:"Wahlinstitutionen gestärkt", text:"Reformen schufen die nationale Wahlbehörde und erhöhten anschließend ihre Unabhängigkeit." },
      { year:"2000", title:"Machtwechsel im Präsidentenamt", text:"Ein Oppositionskandidat gewann die Präsidentschaft und beendete sieben Jahrzehnte ununterbrochener Kontrolle durch die Regierungspartei." },
    ],
    current: {
      asOf:"2026-09-15",
      officeholders:[["Präsidentin","Claudia Sheinbaum, Nationale Regenerationsbewegung (Morena)"],["Amtszeit","1. Oktober 2024 bis 30. September 2030; unmittelbare Wiederwahl ist verboten"]],
      election: {
        title:"Bundeswahl 2024", date:"2. Juni 2024", turnout:"61,05 % bei der Präsidentschaftswahl",
        summary:"Claudia Sheinbaum gewann die Präsidentschaft mit rund 59,8 % der gültigen Stimmen. Morena und ihre Verbündeten aus Grüner Partei und Arbeiterpartei erhielten zudem eine große Mehrheit in der Abgeordnetenkammer.",
        representation:[["Morena","236 Sitze nach der Wahl"],["Ökologische Grüne Partei (PVEM)","77 Sitze"],["Arbeiterpartei (PT)","51 Sitze"],["Nationale Aktionspartei (PAN)","72 Sitze"],["Institutionell-Revolutionäre Partei (PRI)","35 Sitze"],["Bürgerbewegung (MC)","27 Sitze"],["Sonstige","2 Sitze"]],
      },
      rights: {
        provider:"Freedom House", edition:"Freedom in the World 2026", score:"58/100", status:"Teilweise frei", comparison:"Ein Punkt weniger als in der Ausgabe 2025",
        note:"Dies ist die Bewertung einer Organisation und kein Urteil von Politangle. Der Bericht 2026 hebt wettbewerbliche Wahlen hervor, nennt aber zugleich erhebliche Probleme bei Rechtsstaatlichkeit, Gewalt, Korruption und Straflosigkeit.",
        url:"https://freedomhouse.org/country/mexico/freedom-world/2026",
      },
      trends: [
        "Die Wahl 2024 stärkte Morena und ihre Verbündeten. Konzentrierte Wahlmacht sollte getrennt davon betrachtet werden, ob einzelne politische Maßnahmen beliebt oder wirksam sind.",
        "Freedom House senkte Mexikos Wert 2026 um einen Punkt und verband die Änderung ausdrücklich mit Bedenken hinsichtlich der Unabhängigkeit der Justiz nach Einführung des neuen Systems zur Richterwahl.",
        "Kritik an Korruption, Steuerprivilegien, Einfluss der organisierten Kriminalität oder ungleichem Zugang zu Macht ist nicht an sich populistisch. Populistisch wird die Darstellung, wenn ein moralisch reines Volk mit einem einzigen Willen behauptet und Gegner grundsätzlich für illegitim erklärt werden.",
      ],
    },
  },
  canada: {
    name: "Kanada",
    atAGlance: [["System","Föderale parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Monarch, auf Bundesebene vertreten durch den Generalgouverneur"],["Regierungschef","Premierminister"],["Legislative","Parlament: Krone, Senat und Unterhaus"],["Territorialstruktur","Föderal: 10 Provinzen und drei Territorien"]],
    power: [
      "Eine Regierung muss das Vertrauen des gewählten Unterhauses behalten. Premierminister und Kabinett üben die Exekutivgewalt aus und bleiben dem Parlament verantwortlich.",
      "Der ernannte Senat prüft Gesetze und repräsentiert Regionen, doch das Unterhaus hat die zentrale demokratische Rolle und Vorrang bei Steuer- und Ausgabengesetzen.",
      "Die Verfassung teilt Zuständigkeiten zwischen Bund und Provinzen. Gerichte können Gesetze an der Verfassung und der Kanadischen Charta der Rechte und Freiheiten prüfen.",
    ],
    vocabulary: [
      "Die Liberale Partei ist eine konkrete zentristische bis mitte-linke Organisation; „liberal“ kann zugleich eine breitere Tradition von Rechten, Märkten oder Sozialreformen bezeichnen.",
      "Kanadischer Konservatismus umfasst marktorientierte, sozialkonservative, regionale und ältere kommunitaristische Traditionen. Québec-Nationalismus und indigene Selbstregierung bilden zusätzliche politische Dimensionen.",
    ],
    timeline: [
      { year:"1867", title:"Konföderation", text:"Der Constitution Act schuf den kanadischen Bundesstaat und seine parlamentarischen Institutionen." },
      { year:"1931", title:"Gesetzgeberische Unabhängigkeit", text:"Das Statut von Westminster bestätigte Kanadas gesetzgeberische Autonomie gegenüber dem Vereinigten Königreich." },
      { year:"1982", title:"Verfassung und Charta", text:"Kanada übernahm die volle Verfassungshoheit und ergänzte die Charta der Rechte und Freiheiten." },
      { year:"1999", title:"Nunavut gegründet", text:"Nunavut wurde infolge einer bedeutenden indigenen Landrechtsvereinbarung zu einem Territorium." },
    ],
    current: {
      asOf:"2026-09-15",
      officeholders:[["Staatsoberhaupt","König Charles III."],["Generalgouverneurin","Mary Simon"],["Premierminister","Mark Carney, Liberale Partei"]],
      election: {
        title:"Bundeswahl 2025", date:"28. April 2025", turnout:"69,5 % der registrierten Wahlberechtigten",
        summary:"Die Liberale Partei gewann die meisten Sitze, verfehlte aber die Mehrheit im auf 343 Sitze erweiterten Unterhaus. Mark Carney blieb daher Premierminister einer Minderheitsregierung.",
        representation:[["Liberale Partei","169 Sitze im bestätigten Wahlergebnis"],["Konservative Partei","144 Sitze"],["Bloc Québécois","22 Sitze"],["Neue Demokratische Partei","7 Sitze"],["Grüne Partei","1 Sitz"]],
      },
      rights: {
        provider:"Freedom House", edition:"Freedom in the World 2026", score:"97/100", status:"Frei", comparison:"Unverändert gegenüber der Ausgabe 2025",
        note:"Dies ist die Bewertung einer Organisation und kein Urteil von Politangle. Der Bericht erkennt starke Rechtsschutzmechanismen an und nennt zugleich fortbestehende Diskriminierung und sozioökonomische Hürden für indigene und schwarze Kanadier.",
        url:"https://freedomhouse.org/country/canada/freedom-world/2026",
      },
      trends: [
        "Die Wahl 2025 führte zu einer liberalen Minderheitsregierung und zur höchsten Beteiligung an einer Bundeswahl seit 1993.",
        "Die beiden größten Parteien erhielten zusammen den Großteil der Stimmen und Sitze; regionale und kleinere Parteien blieben in einem Parlament ohne Mehrheitspartei dennoch relevant.",
        "Kanadas Freedom-House-Gesamtwert blieb bei 97. Ein hoher Wert beseitigt jedoch nicht Konflikte über indigene Rechte, Diskriminierung, Transparenz oder provinzielle Beschränkungen religiöser Symbole.",
      ],
    },
  },
  'south-africa': {
    name: "Südafrika",
    atAGlance: [["System","Konstitutionelle parlamentarische Republik"],["Staats- und Regierungschef","Präsident, gewählt von der Nationalversammlung"],["Legislative","Parlament: Nationalversammlung und Nationalrat der Provinzen"],["Gerichte","Verfassungsgericht und weitere unabhängige Gerichte"],["Territorialstruktur","Nationale, provinzielle und kommunale Regierungsebenen"]],
    power: [
      "Die Wähler bestimmen die Nationalversammlung, die den Präsidenten wählt. Die Versammlung kann Präsident oder Kabinett durch verfassungsrechtlich geregelte Abstimmungen absetzen.",
      "Der Nationalrat der Provinzen vertritt provinzielle Interessen. Nationale, provinzielle und kommunale Regierungen haben verfassungsrechtlich zugewiesene Aufgaben und müssen zusammenarbeiten.",
      "Die Verfassung steht über allen anderen Rechtsnormen. Gerichte können Gesetze oder staatliches Handeln für ungültig erklären; unabhängige Institutionen sollen Verfassungsdemokratie und Rechenschaft sichern.",
    ],
    vocabulary: [
      "Der African National Congress entstand als Befreiungsbewegung und vereint gewerkschaftliche, nationalistische, sozialdemokratische und andere Strömungen. Seine Geschichte macht nicht jede Politik automatisch links.",
      "Wirtschaftspolitische Debatten sind stark von den fortwirkenden Ungleichheiten der Apartheid geprägt. Unterstützung für Umverteilung oder stärkere Maßnahmen gegen konzentrierten Reichtum ist für sich genommen kein Beleg für Populismus.",
    ],
    timeline: [
      { year:"1910", title:"Union Südafrika", text:"Die Union zentralisierte die Regierung der weißen Minderheit und schloss den Großteil der Bevölkerung von nationaler politischer Macht aus." },
      { year:"1948", title:"Apartheid formalisiert", text:"Die Regierung der National Party weitete systematische rassische Klassifizierung, Trennung und Entrechtung aus." },
      { year:"1994", title:"Erste inklusive nationale Wahl", text:"Südafrikaner stimmten erstmals bei einer nationalen Wahl auf Grundlage allgemeinen Erwachsenenwahlrechts ab." },
      { year:"1996", title:"Endgültige Verfassung", text:"Die demokratische Verfassung schuf einklagbare Rechte, kooperative Regierung und eine starke Verfassungsgerichtsbarkeit." },
    ],
    current: {
      asOf:"2026-09-15",
      officeholders:[["Präsident","Cyril Ramaphosa, African National Congress (ANC)"],["Regierung","Mehrparteien-Regierung der Nationalen Einheit, gebildet nach der Wahl 2024"]],
      election: {
        title:"Nationale und provinzielle Wahlen 2024", date:"29. Mai 2024", turnout:"58,64 % der registrierten Wähler",
        summary:"Der ANC blieb stärkste Partei, verlor aber erstmals seit 1994 seine Mehrheit in der Nationalversammlung. Das Parlament wählte Cyril Ramaphosa erneut zum Präsidenten, nachdem mehrere Parteien eine Regierung der Nationalen Einheit gebildet hatten.",
        representation:[["African National Congress (ANC)","159 Sitze"],["Democratic Alliance (DA)","87 Sitze"],["uMkhonto weSizwe Party (MK)","58 Sitze"],["Economic Freedom Fighters (EFF)","39 Sitze"],["Inkatha Freedom Party (IFP)","17 Sitze"],["Andere Parteien","40 Sitze"]],
      },
      rights: {
        provider:"Freedom House", edition:"Freedom in the World 2026", score:"81/100", status:"Frei", comparison:"Unverändert gegenüber der Ausgabe 2025",
        note:"Dies ist die Bewertung einer Organisation und kein Urteil von Politangle. Demokratiebewertungen messen Rechte und Institutionen; sie sagen nicht, ob Ungleichheit, Arbeitslosigkeit oder öffentliche Leistungen akzeptabel sind.",
        url:"https://freedomhouse.org/country/south-africa/freedom-world/2026",
      },
      trends: [
        "Der Verlust der ANC-Mehrheit verlagerte die nationale Regierung von Einparteien-Dominanz zu formellen Mehrparteien-Verhandlungen.",
        "Die offizielle Wahlberichterstattung verzeichnete einen Rückgang der Beteiligung von 65,99 % im Jahr 2019 auf 58,64 % im Jahr 2024.",
        "Freedom House beließ Südafrika bei 81/100. Dieser institutionelle Wert muss zusammen mit hoher Ungleichheit, Arbeitslosigkeit und ungleichen öffentlichen Leistungen gelesen werden.",
      ],
    },
  },
  india: {
    name: "Indien",
    atAGlance: [["System","Föderale parlamentarische Republik"],["Staatsoberhaupt","Präsident von Indien"],["Regierungschef","Premierminister"],["Legislative","Parlament: Präsident, Lok Sabha und Rajya Sabha"],["Territorialstruktur","Föderale Union aus Bundesstaaten und Unionsterritorien"]],
    power: [
      "Der Premierminister führt eine Regierung, die das Vertrauen der direkt gewählten Lok Sabha behalten muss. Der Präsident handelt normalerweise auf Rat der Minister.",
      "Die Rajya Sabha vertritt die Bundesstaaten, während die Lok Sabha die entscheidende Rolle bei der Regierungsmehrheit und größere Befugnisse bei Finanzgesetzen besitzt.",
      "Die Verfassung teilt Zuständigkeiten zwischen Union und Bundesstaaten, gibt der Union aber wichtige Vorrang- und Notstandsbefugnisse. Der Oberste Gerichtshof kann Gesetze prüfen und die Grundstruktur der Verfassung schützen.",
    ],
    vocabulary: [
      "Indischer Säkularismus bedeutet nicht immer eine strikte Trennung von Religion und Staat. Häufig geht es um Gleichbehandlung, Religionsfreiheit und staatliche Eingriffe zum Schutz von Rechten oder zur Reform bestimmter Praktiken.",
      "Hindu-Nationalismus, wirtschaftliche Liberalisierung, Wohlfahrtspolitik, Kastenrepräsentation und föderale Autonomie sind getrennte Dimensionen. Eine einzige Links-rechts-Zahl würde wichtige Unterschiede verdecken.",
    ],
    timeline: [
      { year:"1947", title:"Unabhängigkeit und Teilung", text:"Die britische Herrschaft endete und der Subkontinent wurde unter massiver Vertreibung und Gewalt in Indien und Pakistan geteilt." },
      { year:"1950", title:"Verfassung tritt in Kraft", text:"Indien wurde eine Republik mit einer detaillierten Verfassung, die Grundrechte, parlamentarische Regierung und föderale Institutionen festlegte." },
      { year:"1975–1977", title:"Nationaler Ausnahmezustand", text:"Der Ausnahmezustand beschränkte Bürgerrechte und politische Opposition, bevor Wahlen wieder einen Regierungswechsel ermöglichten." },
      { year:"1992–1993", title:"Lokale Demokratie gestärkt", text:"Verfassungsänderungen gaben gewählten dörflichen und städtischen Selbstverwaltungen eine stärkere landesweite Grundlage." },
    ],
  },
  nigeria: {
    name: "Nigeria",
    atAGlance: [["System","Föderale präsidentielle Republik"],["Exekutive","Präsident"],["Legislative","Nationalversammlung: Repräsentantenhaus und Senat"],["Gerichte","Oberster Gerichtshof sowie Bundes- und Staatsgerichte"],["Territorialstruktur","Föderal: 36 Bundesstaaten und Bundeshauptstadtterritorium"]],
    power: [
      "Der Präsident führt die Exekutive unabhängig von der Nationalversammlung. Bundesgesetzgebung, Steuern, Ausgaben und Kontrolle werden von zwei gewählten Kammern getragen.",
      "Jeder Bundesstaat besitzt einen gewählten Gouverneur und ein Parlament. Die Verfassung teilt Zuständigkeiten, doch Öleinnahmen und nationale Finanzzuweisungen machen die Beziehungen zwischen Bundes-, Staats- und Kommunalebene besonders wichtig.",
      "Gerichte können staatliches Handeln und Wahlstreitigkeiten überprüfen. Unabhängige Kommissionen organisieren Wahlen und erfüllen weitere Verfassungsaufgaben; formelle Unabhängigkeit und praktische Leistungsfähigkeit müssen jedoch getrennt beurteilt werden.",
    ],
    vocabulary: [
      "Nigerias größte Parteien sind breite nationale Koalitionen und keine klaren ideologischen Blöcke. Region, Religion, Ethnizität, Patronagenetzwerke und Kandidatenbündnisse durchkreuzen häufig wirtschaftspolitische Links-rechts-Muster.",
      "Öffentliche Wut über Korruption, Steuervermeidung oder Machtkonzentration kann sachlich begründet sein. Populistisch wird sie erst, wenn legitime Meinungsverschiedenheit auf ein reines Volk gegen eine vollständig korrupte Elite reduziert wird.",
    ],
    timeline: [
      { year:"1960", title:"Unabhängigkeit", text:"Nigeria wurde mit einer föderalen parlamentarischen Verfassung unabhängig." },
      { year:"1966–1970", title:"Putsche und Bürgerkrieg", text:"Auf Militärputsche folgten die Abspaltung Biafras und ein verheerender Bürgerkrieg." },
      { year:"1999", title:"Vierte Republik", text:"Die Militärherrschaft endete und die heutige präsidentielle Verfassungsordnung begann." },
      { year:"2015", title:"Erster oppositioneller Präsidentensieg", text:"Zum ersten Mal verlor ein amtierender Präsident eine Wahl und übergab die Macht an einen Oppositionskandidaten." },
    ],
  },
  philippines: {
    name: "Philippinen",
    atAGlance: [["System","Einheitsstaatliche präsidentielle Republik"],["Exekutive","Präsident"],["Legislative","Kongress: Repräsentantenhaus und Senat"],["Gerichte","Oberster Gerichtshof und nachgeordnete Gerichte"],["Territorialstruktur","Einheitsstaat mit gewählten Kommunalregierungen und einer autonomen Bangsamoro-Region"]],
    power: [
      "Der Präsident führt die Exekutive getrennt vom Kongress und dient eine einzige sechsjährige Amtszeit ohne spätere Wiederwahl als Präsident.",
      "Senatoren werden landesweit gewählt. Das Repräsentantenhaus verbindet geografische Wahlkreise mit Parteilistenmandaten, die sektorale und gesellschaftliche Repräsentation verbreitern sollen.",
      "Der Oberste Gerichtshof entscheidet Verfassungsstreitigkeiten. Unabhängige Verfassungskommissionen überwachen Wahlen, öffentlichen Dienst und staatliche Rechnungsprüfung; Kommunalregierungen üben vom nationalen Recht übertragene Befugnisse aus.",
    ],
    vocabulary: [
      "Parteinamen sind oft weniger verlässliche Wegweiser als Kandidatenbündnisse, regionale Netzwerke und politische Familien. Ein Parteiwechsel bedeutet daher nicht zwingend einen ideologischen Wechsel.",
      "Ein direkter, anti-establishment Stil kann populistisch sein, doch populäre Politik oder berechtigte Kritik an oligarchischem Einfluss reichen dafür nicht aus. Entscheidend ist, ob Pluralismus und legitime Opposition abgesprochen werden.",
    ],
    timeline: [
      { year:"1946", title:"Unabhängigkeit", text:"Die Philippinen wurden nach Kolonialherrschaft und Kriegsbesatzung eine unabhängige Republik." },
      { year:"1972", title:"Kriegsrecht", text:"Präsident Ferdinand Marcos verhängte das Kriegsrecht, konzentrierte Macht und beschränkte Opposition und Bürgerrechte." },
      { year:"1986", title:"People-Power-Bewegung und demokratischer Übergang", text:"Massenproteste und eine umstrittene Wahl beendeten die Marcos-Präsidentschaft und stellten wettbewerbliche demokratische Regierung wieder her." },
      { year:"1987", title:"Heutige Verfassung", text:"Eine neue Verfassung stellte Gewaltenteilung, Grundrechtsschutz und präsidentielle Amtszeitbegrenzungen wieder her." },
    ],
  },
  brazil: {
    name: "Brasilien",
    atAGlance: [["System","Föderale präsidentielle Republik"],["Exekutive","Präsident"],["Legislative","Nationalkongress: Abgeordnetenkammer und Bundessenat"],["Gerichte","Bundesverfassungsgericht und weitere Bundes- und Staatsgerichte"],["Territorialstruktur","Föderal: 26 Bundesstaaten, Gemeinden und Bundesdistrikt"]],
    power: [
      "Der Präsident führt die Exekutive getrennt vom Kongress. Regieren erfordert gewöhnlich Vereinbarungen mit mehreren Parteien in beiden Kammern.",
      "Abgeordnete werden innerhalb der Bundesstaaten proportional gewählt, Senatoren vertreten die Bundesstaaten und den Bundesdistrikt gleichberechtigt. Der Kongress beschließt Gesetze, kontrolliert den Haushalt und untersucht Regierungshandeln.",
      "Die Verfassung verleiht Gerichten starke Kontrollbefugnisse und schützt eine unabhängige Staatsanwaltschaft. Bundesstaaten und Gemeinden wählen eigene Regierungen und erbringen wichtige öffentliche Leistungen.",
    ],
    vocabulary: [
      "Brasilianische Parteipolitik verbindet wirtschaftspolitische Links-rechts-Unterschiede mit regionalen Interessen, religiösen Bewegungen, Sicherheitspolitik und flexiblen Bündnissen im Kongress.",
      "Antikorruptionspolitik kann sich auf Beweise und rechtsstaatliche Verantwortlichkeit stützen. Populistisch wird sie, wenn ein einzelner Führer exklusive moralische Autorität beansprucht und Gerichte, Medien oder Opposition allein wegen Widerspruchs zu Feinden erklärt.",
    ],
    timeline: [
      { year:"1822–1889", title:"Unabhängigkeit und Kaiserreich", text:"Brasilien wurde unter einer konstitutionellen Monarchie unabhängig, bevor eine militärisch geführte Bewegung eine Republik errichtete." },
      { year:"1964–1985", title:"Militärdiktatur", text:"Militärregierungen beschränkten mehr als zwei Jahrzehnte lang politischen Wettbewerb, Rechte und Zivilgesellschaft." },
      { year:"1988", title:"Demokratische Verfassung", text:"Die heutige Verfassung schuf umfassende Rechte, föderale Demokratie und starke öffentliche Institutionen." },
      { year:"1989", title:"Direkte Präsidentschaftswahl wiederhergestellt", text:"Brasilien führte erstmals seit 1960 wieder eine direkte Präsidentschaftswahl durch." },
    ],
  },
  indonesia: {
    name: "Indonesien",
    atAGlance: [["System","Einheitsstaatliche präsidentielle Republik"],["Exekutive","Präsident"],["Nationale Vertretung","Beratende Volksversammlung: Repräsentantenrat und Regionalvertretungsrat"],["Gerichte","Oberster Gerichtshof und Verfassungsgericht"],["Territorialstruktur","Einheitsstaat mit weitreichender Dezentralisierung auf Provinz- und Kommunalebene"]],
    power: [
      "Präsident und Vizepräsident werden direkt gewählt und sind nicht vom fortlaufenden Vertrauen des Parlaments abhängig. Der Präsident ernennt das Kabinett und führt die Exekutive.",
      "Der Repräsentantenrat beschließt gemeinsam mit dem Präsidenten Gesetze und kontrolliert die Regierung. Der Regionalvertretungsrat repräsentiert die Provinzen, besitzt aber begrenztere Gesetzgebungsbefugnisse.",
      "Das Verfassungsgericht prüft Gesetze und Wahlstreitigkeiten. Seit dem demokratischen Übergang wurden erhebliche Zuständigkeiten und Haushalte auf gewählte Provinz- und Kommunalregierungen verlagert.",
    ],
    vocabulary: [
      "Pancasila ist die Staatsphilosophie aus Gottesglauben, Humanität, nationaler Einheit, deliberativer Demokratie und sozialer Gerechtigkeit. Sie lässt sich keiner einzelnen westlichen Ideologie zuordnen.",
      "Nationalismus wird von großen Teilen der indonesischen Politik geteilt. Religiöser Pluralismus, die Rolle des Islam, Dezentralisierung, Wohlfahrt und wirtschaftliche Entwicklung bilden eigene Konfliktlinien.",
    ],
    timeline: [
      { year:"1945", title:"Unabhängigkeit und Verfassung", text:"Die Unabhängigkeit wurde ausgerufen und die Verfassung von 1945 legte den grundlegenden Rahmen der Republik fest." },
      { year:"1965–1998", title:"Neue Ordnung", text:"Suhartos autoritäre Regierung konzentrierte politische Macht und begleitete zugleich tiefgreifenden wirtschaftlichen und sozialen Wandel." },
      { year:"1998–2002", title:"Reformasi und Verfassungsänderungen", text:"Auf Suhartos Sturz folgten wettbewerbliche Politik, Dezentralisierung und vier Runden von Verfassungsänderungen." },
      { year:"2004", title:"Direkte Präsidentschaftswahl", text:"Die Bürger wählten den Präsidenten erstmals direkt." },
    ],
  },
  japan: {
    name: "Japan",
    atAGlance: [["System","Einheitsstaatliche parlamentarische konstitutionelle Monarchie"],["Staatsoberhaupt","Kaiser, verfassungsrechtlich als Symbol des Staates definiert"],["Regierungschef","Premierminister"],["Legislative","Nationalversammlung: Repräsentantenhaus und Rätehaus"],["Territorialstruktur","Einheitsstaat mit 47 gewählten Präfekturregierungen"]],
    power: [
      "Das Parlament bestimmt den Premierminister, der Mitglied der Legislative sein muss. Das Kabinett ist kollektiv dem Repräsentantenhaus verantwortlich.",
      "Beide Kammern beschließen Gesetze, doch das Repräsentantenhaus hat Vorrang bei der Wahl des Premierministers und stärkere Befugnisse bei Haushalten, Verträgen und bestimmten Gesetzeskonflikten.",
      "Der Kaiser übt nur verfassungsmäßige Staatsakte aus und besitzt keine Regierungsgewalt. Gerichte können die Verfassungsmäßigkeit prüfen; Präfekturen und Gemeinden verwalten wichtige öffentliche Leistungen.",
    ],
    vocabulary: [
      "Die Liberaldemokratische Partei ist trotz ihres Namens im Allgemeinen konservativ. „Liberal“ in einem Parteinamen sollte daher nicht im US-Sinn von Mitte-links gelesen werden.",
      "Die Nachkriegspolitik dreht sich außerdem um Pazifismus, Verfassungsänderung, das Sicherheitsbündnis, Verwaltungsreformen und den Entwicklungsstaat – nicht nur um Steuern und gesellschaftliche Werte.",
    ],
    timeline: [
      { year:"1868", title:"Meiji-Restauration", text:"Die politische Ordnung wurde um den Kaiser neu organisiert und Japan begann einen raschen Prozess von Staatsaufbau und Industrialisierung." },
      { year:"1945–1947", title:"Niederlage und demokratische Verfassung", text:"Nach der Kriegsniederlage etablierte eine neue Verfassung Volkssouveränität, parlamentarische Regierung, Grundrechte und die symbolische Rolle des Kaisers." },
      { year:"1955", title:"Beginn des langfristig dominanten Parteiensystems", text:"Konservative Parteien vereinigten sich zur Liberaldemokratischen Partei, die danach den größten Teil der Nachkriegszeit regierte." },
      { year:"1994", title:"Wahlsystem reformiert", text:"Japan ersetzte Mehrpersonenwahlkreise für das Unterhaus durch ein gemischtes System aus Einerwahlkreisen und Verhältniswahl." },
    ],
  },
};

export const esExtra: Record<string, LocalizedCountryContent> = {
  netherlands: {
    name:"Países Bajos",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria unitaria"],["Jefatura del Estado","Monarca"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Estados Generales: Cámara de Representantes y Senado"],["Elecciones","La representación proporcional suele producir coaliciones multipartidistas"]],
    power:["El gobierno necesita la confianza de la Cámara de Representantes, elegida directamente. La Cámara debate y modifica proyectos de ley y exige responsabilidades a los ministros.","El Senado es elegido indirectamente por representantes provinciales. No puede enmendar una ley: la acepta o la rechaza después de que la Cámara la haya aprobado.","El Consejo de Estado asesora sobre legislación y conoce importantes casos de derecho administrativo. Los tribunales neerlandeses no pueden dejar sin efecto una ley del Parlamento únicamente por ser contraria a la Constitución."],
    vocabulary:["Los partidos liberales neerlandeses incluyen tradiciones tanto liberales de mercado como socioliberales. Por tanto, “liberal” no identifica una posición fija sobre todas las cuestiones.","El “modelo de pólder” describe la negociación y el compromiso entre gobierno, empleadores y sindicatos. La segmentación histórica en “pilares” sociales y políticos alude a la antigua organización de la sociedad en comunidades religiosas y políticas."],
    timeline:[{year:"1815",title:"Creación del Reino",text:"El Reino de los Países Bajos se creó tras el periodo napoleónico."},{year:"1848",title:"Constitución parlamentaria",text:"Una reforma constitucional hizo a los ministros responsables ante el Parlamento y reforzó el gobierno representativo."},{year:"1917–1919",title:"Reforma electoral",text:"Se introdujeron la representación proporcional y el sufragio masculino universal; las mujeres obtuvieron poco después plenos derechos de voto."},{year:"1983",title:"Revisión constitucional",text:"Una amplia reforma constitucional modernizó los derechos y la organización del Estado."}],
  },
  denmark: {
    name:"Dinamarca",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria unitaria"],["Jefatura del Estado","Monarca"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Folketing: una cámara elegida"],["Reino","Dinamarca, Islas Feroe y Groenlandia; ambos territorios tienen amplio autogobierno"]],
    power:["Un gobierno puede seguir en el poder mientras no exista una mayoría del Folketing en su contra. Este parlamentarismo negativo hace frecuentes los gobiernos minoritarios.","El Folketing aprueba leyes y finanzas públicas y controla a los ministros. Las elecciones proporcionales suelen obligar a negociar apoyos entre distintos bloques.","El monarca tiene funciones constitucionales formales, pero la autoridad política la ejercen ministros elegidos. Las Islas Feroe y Groenlandia gestionan por sí mismas muchas materias."],
    vocabulary:["Venstre significa literalmente “Izquierda”, pero hoy es un partido liberal de centroderecha. Los nombres históricos de los partidos pueden engañar si se traducen literalmente.","La socialdemocracia danesa desarrolló un amplio Estado de bienestar, mientras liberales, conservadores y nacionalistas discrepan sobre su escala, condiciones y acceso."],
    timeline:[{year:"1849",title:"Monarquía constitucional",text:"La primera Constitución democrática limitó la monarquía absoluta y creó instituciones representativas."},{year:"1901",title:"Gobierno parlamentario",text:"Se consolidó el principio de que un gobierno no podía gobernar contra una mayoría parlamentaria."},{year:"1953",title:"Marco constitucional actual",text:"Una nueva Constitución creó un Parlamento unicameral y modificó las reglas de sucesión."},{year:"1973",title:"Ingreso en las Comunidades Europeas",text:"Dinamarca ingresó en las Comunidades Europeas tras un referéndum."}],
  },
  finland: {
    name:"Finlandia",
    atAGlance:[["Sistema","República parlamentaria unitaria"],["Jefatura del Estado","Presidente de la República"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Eduskunta: una cámara elegida"],["Estructura territorial","Estado unitario; Åland tiene autonomía protegida constitucionalmente"]],
    power:["El Parlamento elige al primer ministro, aprueba leyes y presupuesto y controla al gobierno. Los gobiernos de coalición son la norma.","El presidente dirige la política exterior junto con el gobierno y es comandante en jefe, mientras el primer ministro dirige la política interior y la política de la Unión Europea.","La Comisión de Derecho Constitucional del Parlamento revisa si los proyectos de ley son compatibles con la Constitución. Los tribunales pueden dar prioridad a la Constitución ante un conflicto claro."],
    vocabulary:["El Partido del Centro nació de un movimiento agrario, pero no se limita a la agricultura. Combina descentralización regional con posiciones variables en asuntos económicos y sociales.","El Partido de Coalición Nacional es liberal-conservador y de centroderecha; su nombre no significa una coalición temporal de todos los partidos."],
    timeline:[{year:"1906",title:"Reforma parlamentaria",text:"Finlandia creó un Parlamento unicameral e introdujo sufragio universal e igual."},{year:"1917–1919",title:"Independencia y república",text:"Finlandia declaró su independencia y después adoptó una Constitución republicana."},{year:"1995",title:"Ingreso en la Unión Europea",text:"Finlandia se incorporó a la Unión Europea tras un referéndum consultivo."},{year:"2000",title:"Constitución unificada",text:"Una nueva Constitución reforzó el gobierno parlamentario y reunió anteriores leyes constitucionales."}],
  },
  iceland: {
    name:"Islandia",
    atAGlance:[["Sistema","República parlamentaria unitaria"],["Jefatura del Estado","Presidente de Islandia"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Althingi: una cámara elegida"],["Elecciones","Representación proporcional en circunscripciones plurinominales"]],
    power:["El gobierno debe conservar la confianza del Althingi. Los gobiernos de coalición son habituales porque las elecciones proporcionales producen varios partidos parlamentarios.","El presidente es jefe del Estado y normalmente actúa siguiendo el consejo ministerial, pero puede negarse a firmar una ley y someterla a votación nacional.","El Althingi aprueba leyes y controla las finanzas públicas. Los tribunales son independientes y pueden revisar si la legislación es compatible con la Constitución."],
    vocabulary:["El Partido de la Independencia combina tradiciones conservadoras y liberales de mercado; su nombre alude a la historia islandesa y no a una campaña actual de secesión.","La competencia política islandesa también atraviesa divisiones urbano-rurales, ambientales, de bienestar e integración europea, por lo que una sola línea izquierda-derecha resulta incompleta."],
    timeline:[{year:"930",title:"Fundación del Althing",text:"El Althing comenzó como asamblea nacional y figura entre las instituciones parlamentarias más antiguas del mundo."},{year:"1918",title:"Reino soberano",text:"Islandia se convirtió en Estado soberano en unión personal con Dinamarca."},{year:"1944",title:"Fundación de la república",text:"Un referéndum puso fin a la unión con Dinamarca y creó la República de Islandia."},{year:"1994",title:"Espacio Económico Europeo",text:"Islandia ingresó en el Espacio Económico Europeo sin entrar en la Unión Europea."}],
  },
  norway: {
    name:"Noruega",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria unitaria"],["Jefatura del Estado","Monarca"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Storting: una cámara elegida"],["Elecciones","Representación proporcional por distritos electorales"]],
    power:["Un gobierno puede seguir en el poder mientras una mayoría parlamentaria no vote para derribarlo. Por ello son frecuentes tanto los gobiernos minoritarios como los de coalición.","El Storting aprueba leyes, impuestos y gasto y controla al gobierno. El monarca desempeña funciones formales, mientras los ministros ejercen el poder político.","Los tribunales pueden revisar leyes conforme a la Constitución. El gobierno local y el Parlamento Sami añaden importantes dimensiones territoriales e indígenas a las instituciones nacionales."],
    vocabulary:["El Partido del Centro noruego nació de la política agraria y hoy destaca intereses rurales y descentralización; “centro” no significa neutralidad en todos los temas.","El Partido del Progreso combina posiciones de impuestos más bajos y mercado con una política de inmigración restrictiva. Conviene analizar esos elementos por separado."],
    timeline:[{year:"1814",title:"Adopción de la Constitución",text:"Noruega adoptó su Constitución en Eidsvoll y entró en una unión con Suecia."},{year:"1884",title:"Consolidación del parlamentarismo",text:"Una lucha política estableció que los gobiernos dependían del apoyo parlamentario."},{year:"1905",title:"Monarquía independiente",text:"La unión con Suecia terminó y Noruega pasó a ser plenamente independiente."},{year:"1972 y 1994",title:"Rechazo de la Unión Europea",text:"Los votantes noruegos rechazaron en dos referendos la pertenencia a la Comunidad Europea o a la Unión Europea."}],
  },
  sweden: {
    name:"Suecia",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria unitaria"],["Jefatura del Estado","Monarca"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Riksdag: una cámara elegida"],["Estructura territorial","Estado unitario con municipios y regiones elegidos de amplia capacidad"]],
    power:["El presidente del Parlamento propone un primer ministro. El candidato queda aceptado salvo que una mayoría de todos los miembros del Riksdag vote en contra.","El monarca tiene funciones ceremoniales y carece de poder político. El Riksdag aprueba leyes y presupuestos, controla al gobierno y puede retirar la confianza a un ministro.","Las agencias públicas están separadas organizativamente de los ministerios. Los ministros pueden fijar políticas generales, pero no ordenar a una agencia cómo decidir un caso individual."],
    vocabulary:["Los socialdemócratas dieron forma a la tradición de bienestar del “hogar del pueblo”, pero la política social sueca se debate y modifica desde todo el espectro político.","Los Moderados son liberal-conservadores. Los Demócratas de Suecia combinan nacionalismo y conservadurismo social; no deben confundirse solo porque ambos se sitúen a la derecha."],
    timeline:[{year:"1809",title:"Acuerdo constitucional",text:"Un nuevo Instrumento de Gobierno limitó la autoridad real y dividió el poder público."},{year:"1921",title:"Sufragio nacional igual",text:"Mujeres y hombres votaron en igualdad de condiciones en unas elecciones parlamentarias nacionales."},{year:"1974–1975",title:"Constitución parlamentaria moderna",text:"Un nuevo Instrumento de Gobierno confirmó la democracia parlamentaria y el papel ceremonial del monarca."},{year:"1995",title:"Ingreso en la Unión Europea",text:"Suecia se incorporó a la Unión Europea tras un referéndum."}],
  },
  spain: {
    name:"España",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria descentralizada"],["Jefatura del Estado","Monarca"],["Jefatura del Gobierno","Presidente del Gobierno"],["Legislativo","Cortes Generales: Congreso de los Diputados y Senado"],["Estructura territorial","17 comunidades autónomas y dos ciudades autónomas"]],
    power:["El Congreso de los Diputados elige al presidente del Gobierno mediante una votación de investidura y solo puede destituirlo eligiendo al mismo tiempo a un sustituto.","Congreso y Senado elaboran las leyes nacionales, pero el Congreso tiene el papel más fuerte en la formación del gobierno y en la resolución de muchas discrepancias legislativas.","Las comunidades autónomas gestionan ámbitos importantes como sanidad y educación. El Tribunal Constitucional resuelve conflictos sobre derechos y reparto de competencias."],
    vocabulary:["La política española no se entiende solo mediante izquierda y derecha. Los partidos también discrepan sobre cuánta autoridad debe corresponder al Estado, a las regiones y a las nacionalidades históricas.","El nacionalismo regional puede ser de izquierda, centrista o conservador. Apoyar la autonomía catalana o vasca no define por sí solo una ideología económica o social completa."],
    timeline:[{year:"1936–1939",title:"Guerra Civil",text:"La guerra terminó con la dictadura de Francisco Franco, que duró hasta su muerte en 1975."},{year:"1978",title:"Constitución democrática",text:"Los votantes aprobaron una Constitución que estableció democracia parlamentaria, derechos, comunidades autónomas y monarquía constitucional."},{year:"1986",title:"Ingreso en las Comunidades Europeas",text:"España ingresó en las Comunidades Europeas, hoy Unión Europea."},{year:"2017",title:"Crisis constitucional catalana",text:"Una votación independentista no autorizada y la respuesta del Estado expusieron profundos desacuerdos sobre soberanía y poder territorial."}],
    current: {
      asOf:"2026-09-15",
      officeholders:[["Jefatura del Estado","Rey Felipe VI"],["Jefatura del Gobierno","Pedro Sánchez, Partido Socialista Obrero Español (PSOE)"]],
      election:{title:"Elecciones generales de 2023",date:"23 de julio de 2023",turnout:"66,59 % del censo",summary:"Ningún partido obtuvo mayoría en el Congreso de 350 escaños. El Partido Popular consiguió más escaños, pero Pedro Sánchez logró la investidura parlamentaria para un gobierno de coalición encabezado por el PSOE.",representation:[["Partido Popular (PP)","137 escaños"],["Partido Socialista Obrero Español (PSOE)","121 escaños"],["Vox","33 escaños"],["Sumar","31 escaños"],["Partidos regionales y otros","28 escaños"]]},
      rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"91/100",status:"Libre",comparison:"Un punto más que en la edición de 2025",note:"Es la evaluación de una organización, no un veredicto de Politangle. Combina 40 puntos de derechos políticos y 60 de libertades civiles.",url:"https://freedomhouse.org/country/spain/freedom-world/2026"},
      trends:["La política nacional sigue fragmentada: formar gobierno puede depender de acuerdos con partidos regionales pequeños además de los partidos estatales.","Freedom House elevó la puntuación de España un punto en 2026 por avances en la cobertura de vacantes judiciales, aunque el informe siguió señalando corrupción y restricciones que afectan a expresión y reunión."],
    },
  },
  mexico: {
    name:"México",
    atAGlance:[["Sistema","República presidencial federal"],["Ejecutivo","Presidente"],["Legislativo","Congreso de la Unión: Cámara de Diputados y Senado"],["Tribunales","Suprema Corte y poder judicial federal"],["Estructura territorial","Federal: 31 estados y Ciudad de México"]],
    power:["El presidente dirige el ejecutivo separado del Congreso y es elegido para un único mandato de seis años sin reelección.","El Congreso aprueba leyes federales, impuestos y gasto y controla al gobierno. Diputados y senadores se eligen mediante una combinación de distritos y representación proporcional.","Los estados tienen constituciones e instituciones elegidas propias. La Suprema Corte ejerce control constitucional, mientras organismos electorales autónomos administran y supervisan las elecciones."],
    vocabulary:["Las tradiciones revolucionarias y nacionalistas mexicanas mezclaron reforma social, liderazgo estatal e intereses empresariales. Los nombres de partidos heredados de esa historia no encajan limpiamente en una línea europea izquierda-derecha.","Criticar corrupción, privilegios fiscales o influencia concentrada no es automáticamente populista. El populismo aparece cuando la política se presenta como un pueblo moralmente puro frente a una élite totalmente ilegítima."],
    timeline:[{year:"1910–1917",title:"Revolución y Constitución",text:"El conflicto revolucionario condujo a la Constitución de 1917, con instituciones federales y amplios derechos sociales."},{year:"1929–2000",title:"Larga era de partido dominante",text:"Una organización política y sus sucesoras dominaron la presidencia durante siete décadas, mientras elecciones e instituciones se volvieron gradualmente más competitivas."},{year:"1990–1996",title:"Fortalecimiento de las instituciones electorales",text:"Las reformas crearon y después ampliaron la independencia de la autoridad electoral nacional."},{year:"2000",title:"Alternancia presidencial",text:"Un candidato opositor ganó la presidencia y puso fin a siete décadas de control ininterrumpido del partido gobernante."}],
    current:{asOf:"2026-09-15",officeholders:[["Presidenta","Claudia Sheinbaum, Movimiento Regeneración Nacional (Morena)"],["Mandato presidencial","1 de octubre de 2024 a 30 de septiembre de 2030; la reelección inmediata está prohibida"]],election:{title:"Elección federal de 2024",date:"2 de junio de 2024",turnout:"61,05 % en la elección presidencial",summary:"Claudia Sheinbaum ganó la presidencia con aproximadamente el 59,8 % de los votos válidos. Morena y sus aliados del Partido Verde y el Partido del Trabajo también obtuvieron una amplia mayoría en la Cámara de Diputados.",representation:[["Morena","236 escaños asignados tras la elección"],["Partido Verde Ecologista de México (PVEM)","77 escaños"],["Partido del Trabajo (PT)","51 escaños"],["Partido Acción Nacional (PAN)","72 escaños"],["Partido Revolucionario Institucional (PRI)","35 escaños"],["Movimiento Ciudadano (MC)","27 escaños"],["Otros","2 escaños"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"58/100",status:"Parcialmente libre",comparison:"Un punto menos que en la edición de 2025",note:"Es la evaluación de una organización, no un veredicto de Politangle. Su informe de 2026 destaca elecciones competitivas junto con graves problemas de Estado de derecho, violencia, corrupción e impunidad.",url:"https://freedomhouse.org/country/mexico/freedom-world/2026"},trends:["La elección de 2024 reforzó a Morena y sus aliados. La concentración de poder electoral debe analizarse por separado de si políticas concretas son populares o eficaces.","Freedom House redujo la puntuación de México un punto en 2026 y vinculó expresamente el cambio a preocupaciones sobre la independencia judicial tras el nuevo sistema de elección de jueces.","Criticar corrupción, privilegios fiscales, influencia del crimen organizado o acceso desigual al poder no es en sí populista. El giro populista consiste en afirmar que existe un único pueblo moralmente puro y que los opositores son intrínsecamente ilegítimos."]},
  },
  canada: {
    name:"Canadá",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria federal"],["Jefatura del Estado","Monarca, representado a nivel federal por el gobernador general"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Parlamento: Corona, Senado y Cámara de los Comunes"],["Estructura territorial","Federal: 10 provincias y tres territorios"]],
    power:["Un gobierno debe conservar la confianza de la Cámara de los Comunes elegida. El primer ministro y el gabinete ejercen la autoridad ejecutiva y responden ante el Parlamento.","El Senado designado revisa la legislación y representa regiones, pero la Cámara de los Comunes tiene el papel democrático central y prioridad exclusiva en proyectos de impuestos y gasto.","La Constitución divide competencias entre los gobiernos federal y provinciales. Los tribunales pueden revisar leyes conforme a la Constitución y la Carta Canadiense de Derechos y Libertades."],
    vocabulary:["El Partido Liberal es una organización concreta del centro al centroizquierda; “liberal” también puede describir una tradición más amplia de derechos, mercados o reforma social.","El conservadurismo canadiense incluye tradiciones orientadas al mercado, socialconservadoras, regionales y comunitarias. El nacionalismo quebequés y el autogobierno indígena añaden dimensiones políticas distintas."],
    timeline:[{year:"1867",title:"Confederación",text:"La Ley Constitucional creó la federación canadiense y sus instituciones parlamentarias."},{year:"1931",title:"Independencia legislativa",text:"El Estatuto de Westminster confirmó la autonomía legislativa de Canadá respecto del Reino Unido."},{year:"1982",title:"Constitución y Carta",text:"Canadá repatrió su Constitución e incorporó la Carta de Derechos y Libertades."},{year:"1999",title:"Creación de Nunavut",text:"Nunavut se convirtió en territorio tras un importante acuerdo de reclamación territorial indígena."}],
    current:{asOf:"2026-09-15",officeholders:[["Jefatura del Estado","Rey Carlos III"],["Gobernadora general","Mary Simon"],["Primer ministro","Mark Carney, Partido Liberal"]],election:{title:"Elección federal de 2025",date:"28 de abril de 2025",turnout:"69,5 % de los electores registrados",summary:"El Partido Liberal obtuvo más escaños pero no una mayoría en la Cámara de los Comunes ampliada a 343 escaños, por lo que Mark Carney continuó como primer ministro con un gobierno minoritario.",representation:[["Partido Liberal","169 escaños en el resultado validado"],["Partido Conservador","144 escaños"],["Bloc Québécois","22 escaños"],["Nuevo Partido Democrático","7 escaños"],["Partido Verde","1 escaño"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"97/100",status:"Libre",comparison:"Sin cambios respecto de la edición de 2025",note:"Es la evaluación de una organización, no un veredicto de Politangle. El informe reconoce fuertes protecciones de derechos y también persistentes discriminaciones y barreras socioeconómicas que afectan a canadienses indígenas y negros.",url:"https://freedomhouse.org/country/canada/freedom-world/2026"},trends:["La elección de 2025 produjo un gobierno liberal minoritario y la participación federal más alta desde 1993.","Los dos partidos mayores reunieron la mayoría de votos y escaños, mientras partidos regionales y pequeños siguieron siendo relevantes en un Parlamento sin mayoría absoluta.","La puntuación agregada de Freedom House se mantuvo en 97, pero una cifra alta no elimina disputas sobre derechos indígenas, discriminación, transparencia o restricciones provinciales a símbolos religiosos."]},
  },
  'south-africa': {
    name:"Sudáfrica",
    atAGlance:[["Sistema","República parlamentaria constitucional"],["Jefatura del Estado y del Gobierno","Presidente, elegido por la Asamblea Nacional"],["Legislativo","Parlamento: Asamblea Nacional y Consejo Nacional de Provincias"],["Tribunales","Tribunal Constitucional y otros tribunales independientes"],["Estructura territorial","Esferas nacional, provincial y local de gobierno"]],
    power:["Los votantes eligen la Asamblea Nacional, que elige al presidente. La Asamblea puede destituir al presidente o al gabinete mediante votaciones definidas por la Constitución.","El Consejo Nacional de Provincias representa los intereses provinciales. Los gobiernos nacional, provincial y local tienen responsabilidades asignadas por la Constitución y deben cooperar.","La Constitución es suprema. Los tribunales pueden invalidar leyes o actuaciones gubernamentales incompatibles con ella, y organismos independientes apoyan la democracia constitucional y la rendición de cuentas."],
    vocabulary:["El Congreso Nacional Africano nació como movimiento de liberación y contiene corrientes sindicales, nacionalistas, socialdemócratas y otras. Su historia no convierte automáticamente cada política en izquierda.","Los debates económicos están marcados por las desigualdades persistentes del apartheid. Apoyar redistribución o medidas más firmes frente a la concentración de riqueza no constituye por sí solo populismo."],
    timeline:[{year:"1910",title:"Unión Sudafricana",text:"La Unión centralizó un gobierno de minoría blanca mientras excluía a la mayoría de la población del poder político nacional."},{year:"1948",title:"Formalización del apartheid",text:"El gobierno del Partido Nacional amplió la clasificación racial sistemática, la segregación y la privación de derechos."},{year:"1994",title:"Primera elección nacional inclusiva",text:"Los sudafricanos votaron en la primera elección nacional basada en sufragio adulto universal."},{year:"1996",title:"Constitución definitiva",text:"La Constitución democrática estableció derechos exigibles, gobierno cooperativo y un fuerte control constitucional."}],
    current:{asOf:"2026-09-15",officeholders:[["Presidente","Cyril Ramaphosa, Congreso Nacional Africano (ANC)"],["Gobierno","Gobierno multipartidista de Unidad Nacional formado tras la elección de 2024"]],election:{title:"Elecciones nacionales y provinciales de 2024",date:"29 de mayo de 2024",turnout:"58,64 % de los votantes registrados",summary:"El ANC siguió siendo el mayor partido, pero perdió por primera vez desde 1994 su mayoría en la Asamblea Nacional. El Parlamento reeligió a Cyril Ramaphosa después de que varios partidos formaran un Gobierno de Unidad Nacional.",representation:[["Congreso Nacional Africano (ANC)","159 escaños"],["Alianza Democrática (DA)","87 escaños"],["uMkhonto weSizwe Party (MK)","58 escaños"],["Economic Freedom Fighters (EFF)","39 escaños"],["Inkatha Freedom Party (IFP)","17 escaños"],["Otros partidos","40 escaños"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"81/100",status:"Libre",comparison:"Sin cambios respecto de la edición de 2025",note:"Es la evaluación de una organización, no un veredicto de Politangle. Las puntuaciones de democracia miden derechos e instituciones; no dicen si la desigualdad, el desempleo o los servicios públicos son aceptables.",url:"https://freedomhouse.org/country/south-africa/freedom-world/2026"},trends:["La pérdida de la mayoría del ANC trasladó el gobierno nacional de la dominación de un solo partido a una negociación multipartidista formal.","El informe electoral oficial registró una caída de la participación del 65,99 % en 2019 al 58,64 % en 2024.","Freedom House mantuvo a Sudáfrica en 81/100. Esa medida institucional debe leerse junto con la fuerte desigualdad, el desempleo y la prestación desigual de servicios públicos."]},
  },
  india: {
    name:"India",
    atAGlance:[["Sistema","República parlamentaria federal"],["Jefatura del Estado","Presidente de India"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Parlamento: Presidente, Lok Sabha y Rajya Sabha"],["Estructura territorial","Unión federal de estados y territorios de la Unión"]],
    power:["El primer ministro dirige un gobierno que debe conservar la confianza de la Lok Sabha elegida directamente. El presidente normalmente actúa siguiendo el consejo de los ministros.","La Rajya Sabha representa a los estados, mientras la Lok Sabha tiene el papel decisivo en la confianza del gobierno y mayor autoridad sobre proyectos de ley financieros.","La Constitución divide competencias entre la Unión y los estados, pero concede a la Unión importantes poderes de prevalencia y emergencia. El Tribunal Supremo puede revisar leyes y proteger la estructura básica de la Constitución."],
    vocabulary:["El secularismo indio no siempre significa un muro estricto entre religión y gobierno. A menudo supone respeto igual, libertad religiosa e intervención estatal para proteger derechos o reformar prácticas.","El nacionalismo hindú, la liberalización económica, la política de bienestar, la representación de castas y la autonomía federal son dimensiones distintas. Una única puntuación izquierda-derecha ocultaría diferencias importantes."],
    timeline:[{year:"1947",title:"Independencia y partición",text:"Terminó el dominio británico y el subcontinente se dividió entre India y Pakistán en medio de desplazamientos masivos y violencia."},{year:"1950",title:"Entrada en vigor de la Constitución",text:"India se convirtió en república bajo una Constitución detallada que estableció derechos, gobierno parlamentario e instituciones federales."},{year:"1975–1977",title:"Emergencia nacional",text:"El estado de emergencia restringió libertades civiles y oposición política antes de que unas elecciones restauraran un cambio de gobierno."},{year:"1992–1993",title:"Fortalecimiento de la democracia local",text:"Reformas constitucionales dieron una base nacional más sólida a órganos locales elegidos en pueblos y ciudades."}],
  },
  nigeria: {
    name:"Nigeria",
    atAGlance:[["Sistema","República presidencial federal"],["Ejecutivo","Presidente"],["Legislativo","Asamblea Nacional: Cámara de Representantes y Senado"],["Tribunales","Tribunal Supremo y tribunales federales y estatales"],["Estructura territorial","Federal: 36 estados y el Territorio de la Capital Federal"]],
    power:["El presidente dirige el ejecutivo separado de la Asamblea Nacional. La legislación federal, los impuestos, el gasto y el control se comparten entre dos cámaras elegidas.","Cada estado tiene gobernador y legislatura elegidos. La Constitución reparte responsabilidades, pero los ingresos petroleros y la asignación nacional hacen especialmente importantes las relaciones entre niveles federal, estatal y local.","Los tribunales pueden revisar la actuación pública y las disputas electorales. Comisiones independientes administran elecciones y otras funciones constitucionales, aunque la independencia formal y la capacidad práctica deben evaluarse por separado."],
    vocabulary:["Los mayores partidos de Nigeria son amplias coaliciones nacionales más que bloques ideológicos claros. Región, religión, etnia, patronazgo y redes de candidatos suelen cruzar la izquierda y la derecha económicas.","La indignación pública por corrupción, evasión fiscal o captura por un grupo reducido puede estar justificada por hechos. Solo se convierte en encuadre populista cuando todo desacuerdo legítimo se reduce a un pueblo puro frente a una élite totalmente corrupta."],
    timeline:[{year:"1960",title:"Independencia",text:"Nigeria se independizó con una Constitución parlamentaria federal."},{year:"1966–1970",title:"Golpes y guerra civil",text:"Golpes militares fueron seguidos por la secesión de Biafra y una devastadora guerra civil."},{year:"1999",title:"Cuarta República",text:"Terminó el gobierno militar y comenzó el actual orden constitucional presidencial."},{year:"2015",title:"Primera victoria presidencial opositora",text:"Por primera vez un presidente en ejercicio perdió una elección y transfirió el poder a un candidato opositor."}],
  },
  philippines: {
    name:"Filipinas",
    atAGlance:[["Sistema","República presidencial unitaria"],["Ejecutivo","Presidente"],["Legislativo","Congreso: Cámara de Representantes y Senado"],["Tribunales","Tribunal Supremo y tribunales inferiores"],["Estructura territorial","Estado unitario con gobiernos locales elegidos y una región autónoma de Bangsamoro"]],
    power:["El presidente dirige el ejecutivo separado del Congreso y cumple un único mandato de seis años sin reelección presidencial posterior.","Los senadores son elegidos a escala nacional. La Cámara combina distritos geográficos con escaños de listas de partidos destinados a ampliar la representación sectorial y de grupos.","El Tribunal Supremo revisa controversias constitucionales. Comisiones constitucionales independientes supervisan elecciones, función pública y auditoría estatal, mientras los gobiernos locales ejercen competencias otorgadas por la ley nacional."],
    vocabulary:["Las etiquetas partidistas suelen ser menos fiables que las alianzas de candidatos, redes regionales y familias políticas. Cambiar de partido no implica necesariamente una conversión ideológica.","El estilo directo y antiestablishment de un líder puede ser populista, pero las políticas populares o las críticas fundadas a la influencia oligárquica no bastan. La clave es si se niegan el pluralismo y la oposición legítima."],
    timeline:[{year:"1946",title:"Independencia",text:"Filipinas se convirtió en república independiente tras el dominio colonial y la ocupación durante la guerra."},{year:"1972",title:"Ley marcial",text:"El presidente Ferdinand Marcos declaró la ley marcial, concentrando poder y restringiendo oposición y libertades civiles."},{year:"1986",title:"Revolución del Poder Popular (People Power)",text:"Las protestas masivas y una elección disputada pusieron fin a la presidencia de Marcos y restauraron un gobierno democrático competitivo."},{year:"1987",title:"Constitución vigente",text:"Una nueva Constitución restauró controles y contrapesos, protección de derechos y límites de mandato presidencial."}],
  },
  brazil: {
    name:"Brasil",
    atAGlance:[["Sistema","República presidencial federal"],["Ejecutivo","Presidente"],["Legislativo","Congreso Nacional: Cámara de Diputados y Senado Federal"],["Tribunales","Supremo Tribunal Federal y otros tribunales federales y estatales"],["Estructura territorial","Federal: 26 estados, municipios y Distrito Federal"]],
    power:["El presidente dirige el ejecutivo separado del Congreso. Gobernar suele exigir acuerdos entre varios partidos representados en las dos cámaras.","Los diputados se eligen proporcionalmente dentro de los estados, mientras los senadores representan por igual a los estados y al Distrito Federal. El Congreso legisla, controla el presupuesto e investiga al gobierno.","La Constitución otorga amplios poderes de revisión a los tribunales y protege un ministerio público independiente. Estados y municipios eligen sus propios gobiernos y prestan importantes servicios públicos."],
    vocabulary:["La competencia partidista brasileña combina izquierda y derecha económicas con intereses regionales, movimientos religiosos, política de seguridad pública y alianzas flexibles en el Congreso.","La política anticorrupción puede basarse en pruebas y rendición de cuentas legal. Se vuelve populista cuando un dirigente reclama autoridad moral exclusiva y trata a tribunales, medios u oposición como enemigos solo por discrepar."],
    timeline:[{year:"1822–1889",title:"Independencia e imperio",text:"Brasil se independizó bajo una monarquía constitucional antes de que un movimiento liderado por militares estableciera una república."},{year:"1964–1985",title:"Dictadura militar",text:"Gobiernos militares restringieron durante más de dos décadas la competencia política, los derechos y la sociedad civil."},{year:"1988",title:"Constitución democrática",text:"La Constitución vigente estableció amplios derechos, democracia federal e instituciones públicas fuertes."},{year:"1989",title:"Restablecimiento de la elección presidencial directa",text:"Brasil celebró su primera elección presidencial directa desde 1960."}],
  },
  indonesia: {
    name:"Indonesia",
    atAGlance:[["Sistema","República presidencial unitaria"],["Ejecutivo","Presidente"],["Representación nacional","Asamblea Consultiva Popular: Consejo Representativo del Pueblo y Consejo Representativo Regional"],["Tribunales","Tribunal Supremo y Tribunal Constitucional"],["Estructura territorial","Estado unitario con amplia descentralización provincial y local"]],
    power:["El presidente y el vicepresidente son elegidos directamente y no dependen de la confianza continua del Parlamento. El presidente nombra al gabinete y dirige el ejecutivo.","El Consejo Representativo del Pueblo legisla y controla al gobierno junto con el presidente. El Consejo Representativo Regional representa a las provincias, pero tiene competencias legislativas más limitadas.","El Tribunal Constitucional revisa leyes y disputas electorales. Desde la transición democrática, importantes competencias y presupuestos se han transferido a gobiernos provinciales y locales elegidos."],
    vocabulary:["Pancasila es la filosofía estatal basada en creencia en Dios, humanidad, unidad nacional, democracia deliberativa y justicia social. No corresponde a una sola ideología occidental.","El nacionalismo es compartido por gran parte de la política indonesia. El pluralismo religioso, el papel del islam, la descentralización, el bienestar y el desarrollo económico crean desacuerdos políticos distintos."],
    timeline:[{year:"1945",title:"Independencia y Constitución",text:"Se proclamó la independencia y la Constitución de 1945 estableció el marco fundamental de la república."},{year:"1965–1998",title:"Nuevo Orden",text:"El gobierno autoritario de Suharto concentró el poder político mientras supervisaba profundos cambios económicos y sociales."},{year:"1998–2002",title:"Reformasi y cambio constitucional",text:"La caída de Suharto fue seguida por política competitiva, descentralización y cuatro rondas de reformas constitucionales."},{year:"2004",title:"Elección presidencial directa",text:"Los ciudadanos eligieron directamente al presidente por primera vez."}],
  },
  japan: {
    name:"Japón",
    atAGlance:[["Sistema","Monarquía constitucional parlamentaria unitaria"],["Jefatura del Estado","Emperador, definido constitucionalmente como símbolo del Estado"],["Jefatura del Gobierno","Primer ministro"],["Legislativo","Dieta Nacional: Cámara de Representantes y Cámara de Consejeros"],["Estructura territorial","Estado unitario con 47 gobiernos prefecturales elegidos"]],
    power:["La Dieta designa al primer ministro, que debe ser miembro del legislativo. El gabinete responde colectivamente ante la Cámara de Representantes.","Ambas cámaras legislan, pero la Cámara de Representantes tiene prioridad para elegir al primer ministro y mayor autoridad en presupuestos, tratados y algunos desacuerdos legislativos.","El emperador realiza únicamente funciones estatales constitucionales y no posee poderes de gobierno. Los tribunales pueden revisar la constitucionalidad, mientras prefecturas y municipios administran servicios importantes."],
    vocabulary:["El Partido Liberal Democrático es generalmente conservador pese a su nombre. “Liberal” en el nombre de un partido no debe interpretarse automáticamente con el sentido estadounidense de centroizquierda.","La política de posguerra también gira en torno al pacifismo, la reforma constitucional, la alianza de seguridad, la reforma administrativa y el Estado desarrollista, no solo impuestos y valores sociales."],
    timeline:[{year:"1868",title:"Restauración Meiji",text:"La autoridad política se reorganizó alrededor del emperador y Japón inició una rápida construcción estatal e industrialización."},{year:"1945–1947",title:"Derrota y Constitución democrática",text:"Tras la derrota bélica, una nueva Constitución estableció soberanía popular, gobierno parlamentario, derechos y el papel simbólico del emperador."},{year:"1955",title:"Inicio del sistema de partido dominante",text:"Partidos conservadores se unieron en el Partido Liberal Democrático, que gobernó durante la mayor parte del periodo de posguerra."},{year:"1994",title:"Reforma electoral",text:"Japón sustituyó los distritos plurinominales de la cámara baja por un sistema mixto de distritos uninominales y representación proporcional."}],
  },
};

export const frExtra: Record<string, LocalizedCountryContent> = {
  netherlands: {
    name:"Pays-Bas",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire unitaire"],["Chef de l’État","Monarque"],["Chef du gouvernement","Premier ministre"],["Législatif","États généraux : Chambre des représentants et Sénat"],["Élections","La représentation proportionnelle conduit généralement à des coalitions multipartites"]],
    power:["Le gouvernement doit conserver la confiance de la Chambre des représentants élue directement. Celle-ci débat et amende les projets de loi et demande des comptes aux ministres.","Le Sénat est élu indirectement par des représentants provinciaux. Il ne peut pas modifier un texte : il l’accepte ou le rejette après son adoption par la Chambre.","Le Conseil d’État conseille sur les textes et juge d’importantes affaires de droit administratif. Les tribunaux néerlandais ne peuvent pas écarter une loi du Parlement uniquement parce qu’elle serait contraire à la Constitution."],
    vocabulary:["Les partis libéraux néerlandais comprennent des traditions libérales de marché et social-libérales. « Libéral » ne désigne donc pas une position fixe sur toutes les questions.","Le « modèle du polder » désigne la négociation et le compromis entre État, employeurs et syndicats. La « pilarisation » renvoie à l’ancienne organisation de la société en communautés religieuses et politiques."],
    timeline:[{year:"1815",title:"Création du Royaume",text:"Le Royaume des Pays-Bas est créé après la période napoléonienne."},{year:"1848",title:"Constitution parlementaire",text:"Une réforme constitutionnelle rend les ministres responsables devant le Parlement et renforce le gouvernement représentatif."},{year:"1917–1919",title:"Réforme électorale",text:"La représentation proportionnelle et le suffrage universel masculin sont instaurés ; les femmes obtiennent peu après le plein droit de vote."},{year:"1983",title:"Révision de la Constitution",text:"Une vaste révision constitutionnelle modernise les droits et l’organisation de l’État."}],
  },
  denmark: {
    name:"Danemark",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire unitaire"],["Chef de l’État","Monarque"],["Chef du gouvernement","Premier ministre"],["Législatif","Folketing : une chambre élue"],["Royaume","Danemark, îles Féroé et Groenland ; les deux territoires disposent d’une large autonomie"]],
    power:["Un gouvernement peut rester en fonction tant qu’une majorité du Folketing ne s’y oppose pas. Ce parlementarisme négatif rend fréquents les gouvernements minoritaires.","Le Folketing vote les lois et les finances publiques et contrôle les ministres. La proportionnelle oblige souvent les partis à négocier des soutiens entre blocs.","Le monarque exerce des fonctions constitutionnelles formelles, mais l’autorité politique appartient aux ministres élus. Les îles Féroé et le Groenland gèrent eux-mêmes de nombreux domaines."],
    vocabulary:["Venstre signifie littéralement « Gauche », mais c’est aujourd’hui un parti libéral de centre droit. Les noms historiques peuvent induire en erreur lorsqu’on les traduit littéralement.","La social-démocratie danoise a développé un vaste État-providence, tandis que libéraux, conservateurs et nationalistes débattent de son ampleur, de ses conditions et de son accès."],
    timeline:[{year:"1849",title:"Monarchie constitutionnelle",text:"La première Constitution démocratique limite la monarchie absolue et crée des institutions représentatives."},{year:"1901",title:"Gouvernement parlementaire",text:"Le principe selon lequel un gouvernement ne peut gouverner contre une majorité parlementaire s’impose."},{year:"1953",title:"Cadre constitutionnel actuel",text:"Une nouvelle Constitution crée un Parlement monocaméral et modifie les règles de succession."},{year:"1973",title:"Adhésion aux Communautés européennes",text:"Le Danemark rejoint les Communautés européennes après un référendum."}],
  },
  finland: {
    name:"Finlande",
    atAGlance:[["Système","République parlementaire unitaire"],["Chef de l’État","Président de la République"],["Chef du gouvernement","Premier ministre"],["Législatif","Eduskunta : une chambre élue"],["Structure territoriale","État unitaire ; Åland dispose d’une autonomie protégée par la Constitution"]],
    power:["Le Parlement élit le Premier ministre, vote les lois et le budget et contrôle le gouvernement. Les gouvernements de coalition sont la norme.","Le président dirige la politique étrangère avec le gouvernement et commande les forces armées, tandis que le Premier ministre conduit la politique intérieure et la politique de l’Union européenne.","La commission constitutionnelle du Parlement vérifie la conformité des projets de loi à la Constitution. Les tribunaux peuvent donner priorité à la Constitution en cas de conflit manifeste."],
    vocabulary:["Le Parti du Centre vient d’un mouvement agraire mais ne se limite pas à l’agriculture. Il associe décentralisation régionale et positions variables sur les questions économiques et sociales.","Le Parti de la Coalition nationale est libéral-conservateur et de centre droit ; son nom ne signifie pas une coalition temporaire de tous les partis."],
    timeline:[{year:"1906",title:"Réforme parlementaire",text:"La Finlande crée un Parlement monocaméral et instaure le suffrage universel et égal."},{year:"1917–1919",title:"Indépendance et république",text:"La Finlande déclare son indépendance puis adopte une Constitution républicaine."},{year:"1995",title:"Adhésion à l’Union européenne",text:"La Finlande rejoint l’Union européenne après un référendum consultatif."},{year:"2000",title:"Constitution unifiée",text:"Une nouvelle Constitution renforce le gouvernement parlementaire et réunit d’anciens textes constitutionnels."}],
  },
  iceland: {
    name:"Islande",
    atAGlance:[["Système","République parlementaire unitaire"],["Chef de l’État","Président d’Islande"],["Chef du gouvernement","Premier ministre"],["Législatif","Althingi : une chambre élue"],["Élections","Représentation proportionnelle dans des circonscriptions plurinominales"]],
    power:["Le gouvernement doit conserver la confiance de l’Althingi. Les coalitions sont habituelles, car la proportionnelle fait entrer plusieurs partis au Parlement.","Le président est chef de l’État et agit généralement sur avis ministériel, mais il peut refuser de signer une loi et la soumettre à un vote national.","L’Althingi vote les lois et contrôle les finances publiques. Les tribunaux sont indépendants et peuvent vérifier la compatibilité des lois avec la Constitution."],
    vocabulary:["Le Parti de l’indépendance associe traditions conservatrices et libérales de marché ; son nom renvoie à l’histoire islandaise, pas à une campagne actuelle de séparation.","La compétition politique islandaise traverse aussi des clivages urbain-rural, environnementaux, sociaux et européens ; une seule ligne gauche-droite est donc insuffisante."],
    timeline:[{year:"930",title:"Création de l’Althing",text:"L’Althing naît comme assemblée nationale et compte parmi les plus anciennes institutions parlementaires du monde."},{year:"1918",title:"Royaume souverain",text:"L’Islande devient un État souverain en union personnelle avec le Danemark."},{year:"1944",title:"Fondation de la République",text:"Un référendum met fin à l’union avec le Danemark et fonde la République d’Islande."},{year:"1994",title:"Espace économique européen",text:"L’Islande rejoint l’Espace économique européen tout en restant hors de l’Union européenne."}],
  },
  norway: {
    name:"Norvège",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire unitaire"],["Chef de l’État","Monarque"],["Chef du gouvernement","Premier ministre"],["Législatif","Storting : une chambre élue"],["Élections","Représentation proportionnelle par circonscriptions"]],
    power:["Un gouvernement peut rester en fonction tant qu’une majorité parlementaire ne le renverse pas. Gouvernements minoritaires et coalitions sont donc tous deux fréquents.","Le Storting vote les lois, la fiscalité et les dépenses et contrôle le gouvernement. Le monarque exerce des fonctions formelles, tandis que les ministres détiennent le pouvoir politique.","Les tribunaux peuvent contrôler les lois au regard de la Constitution. Le gouvernement local et le Parlement sami ajoutent des dimensions territoriales et autochtones importantes aux institutions nationales."],
    vocabulary:["Le Parti du Centre norvégien vient de la politique agraire et met aujourd’hui l’accent sur les intérêts ruraux et la décentralisation ; « centre » ne signifie pas neutralité sur tous les sujets.","Le Parti du progrès combine baisse des impôts et positions de marché avec une politique d’immigration restrictive. Ces éléments doivent être analysés séparément."],
    timeline:[{year:"1814",title:"Adoption de la Constitution",text:"La Norvège adopte sa Constitution à Eidsvoll et entre dans une union avec la Suède."},{year:"1884",title:"Établissement du parlementarisme",text:"Une lutte politique impose le principe selon lequel les gouvernements dépendent du soutien parlementaire."},{year:"1905",title:"Monarchie indépendante",text:"L’union avec la Suède prend fin et la Norvège devient pleinement indépendante."},{year:"1972 et 1994",title:"Refus de l’Union européenne",text:"Les électeurs norvégiens rejettent à deux reprises l’adhésion à la Communauté européenne puis à l’Union européenne."}],
  },
  sweden: {
    name:"Suède",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire unitaire"],["Chef de l’État","Monarque"],["Chef du gouvernement","Premier ministre"],["Législatif","Riksdag : une chambre élue"],["Structure territoriale","État unitaire avec des communes et régions élues disposant de pouvoirs importants"]],
    power:["Le président du Riksdag propose un Premier ministre. Le candidat est accepté sauf si une majorité de tous les députés vote contre lui.","Le monarque a des fonctions cérémonielles et aucun pouvoir politique. Le Riksdag vote les lois et budgets, contrôle le gouvernement et peut renverser un ministre par une motion de défiance.","Les agences publiques sont séparées des ministères. Les ministres peuvent fixer la politique générale mais ne peuvent pas dicter à une agence sa décision dans un cas individuel."],
    vocabulary:["Les sociaux-démocrates ont façonné la tradition de l’« État-providence du foyer du peuple », mais la politique sociale suédoise est débattue et modifiée par l’ensemble du spectre politique.","Les Modérés sont libéraux-conservateurs. Les Démocrates de Suède associent nationalisme et conservatisme social ; les deux ne doivent pas être confondus simplement parce qu’ils sont classés à droite."],
    timeline:[{year:"1809",title:"Règlement constitutionnel",text:"Un nouvel Instrument de gouvernement limite l’autorité royale et répartit le pouvoir public."},{year:"1921",title:"Suffrage national égal",text:"Femmes et hommes votent à égalité lors d’une élection parlementaire nationale."},{year:"1974–1975",title:"Constitution parlementaire moderne",text:"Un nouvel Instrument de gouvernement confirme la démocratie parlementaire et le rôle cérémoniel du monarque."},{year:"1995",title:"Adhésion à l’Union européenne",text:"La Suède rejoint l’Union européenne après un référendum."}],
  },
  spain: {
    name:"Espagne",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire décentralisée"],["Chef de l’État","Monarque"],["Chef du gouvernement","Président du gouvernement"],["Législatif","Cortes Generales : Congrès des députés et Sénat"],["Structure territoriale","17 communautés autonomes et deux villes autonomes"]],
    power:["Le Congrès des députés choisit le président du gouvernement par un vote d’investiture et ne peut renverser le gouvernement qu’en élisant simultanément un successeur.","Le Congrès et le Sénat votent la loi nationale, mais le Congrès joue le rôle le plus important dans la formation du gouvernement et dans le règlement de nombreux désaccords législatifs.","Les communautés autonomes gèrent des domaines importants comme la santé et l’éducation. Le Tribunal constitutionnel tranche les conflits relatifs aux droits et au partage des compétences."],
    vocabulary:["La politique espagnole ne se comprend pas uniquement par la gauche et la droite. Les partis s’opposent aussi sur la répartition de l’autorité entre l’Espagne, ses régions et ses nationalités historiques.","Le nationalisme régional peut être de gauche, centriste ou conservateur. Soutenir l’autonomie catalane ou basque ne définit pas à lui seul une idéologie économique ou sociale complète."],
    timeline:[{year:"1936–1939",title:"Guerre civile",text:"La guerre civile se termine par la dictature de Francisco Franco, qui dure jusqu’à sa mort en 1975."},{year:"1978",title:"Constitution démocratique",text:"Les électeurs approuvent une Constitution instituant démocratie parlementaire, droits, communautés autonomes et monarchie constitutionnelle."},{year:"1986",title:"Adhésion aux Communautés européennes",text:"L’Espagne rejoint les Communautés européennes, aujourd’hui Union européenne."},{year:"2017",title:"Crise constitutionnelle catalane",text:"Un vote d’indépendance non autorisé et la réaction de l’État révèlent de profonds désaccords sur la souveraineté et le pouvoir territorial."}],
    current:{asOf:"2026-09-15",officeholders:[["Chef de l’État","Roi Felipe VI"],["Chef du gouvernement","Pedro Sánchez, Parti socialiste ouvrier espagnol (PSOE)"]],election:{title:"Élections générales de 2023",date:"23 juillet 2023",turnout:"66,59 % des électeurs inscrits",summary:"Aucun parti n’obtient la majorité au Congrès de 350 sièges. Le Parti populaire remporte le plus de sièges, mais Pedro Sánchez obtient l’investiture parlementaire pour un gouvernement de coalition dirigé par le PSOE.",representation:[["Parti populaire (PP)","137 sièges"],["Parti socialiste ouvrier espagnol (PSOE)","121 sièges"],["Vox","33 sièges"],["Sumar","31 sièges"],["Partis régionaux et autres","28 sièges"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"91/100",status:"Libre",comparison:"Un point de plus que dans l’édition 2025",note:"Il s’agit de l’évaluation d’une organisation, pas d’un verdict de Politangle. Elle combine 40 points de droits politiques et 60 points de libertés civiles.",url:"https://freedomhouse.org/country/spain/freedom-world/2026"},trends:["La politique nationale reste fragmentée : former un gouvernement peut dépendre d’accords avec de petits partis régionaux autant qu’avec les partis nationaux.","Freedom House augmente le score de l’Espagne d’un point en 2026 après des progrès dans la nomination de juges, tout en continuant de signaler corruption et restrictions affectant expression et réunion."]},
  },
  mexico: {
    name:"Mexique",
    atAGlance:[["Système","République présidentielle fédérale"],["Exécutif","Président"],["Législatif","Congrès de l’Union : Chambre des députés et Sénat"],["Juridictions","Cour suprême et justice fédérale"],["Structure territoriale","Fédérale : 31 États et Mexico"]],
    power:["Le président dirige l’exécutif séparément du Congrès et est élu pour un mandat unique de six ans sans réélection.","Le Congrès vote la loi fédérale, la fiscalité et les dépenses et contrôle le gouvernement. Députés et sénateurs sont élus par un mélange de circonscriptions et de sièges proportionnels.","Les États disposent de leurs propres constitutions et institutions élues. La Cour suprême exerce le contrôle constitutionnel, tandis que des organismes électoraux autonomes administrent et surveillent les élections."],
    vocabulary:["Les traditions révolutionnaires et nationalistes mexicaines ont mêlé réforme sociale, direction de l’État et intérêts économiques. Les noms de partis hérités de cette histoire ne se superposent pas proprement à une ligne gauche-droite européenne.","Critiquer la corruption, les privilèges fiscaux ou l’influence concentrée n’est pas automatiquement populiste. Le populisme apparaît lorsque la politique est présentée comme un peuple moralement pur face à une élite entièrement illégitime."],
    timeline:[{year:"1910–1917",title:"Révolution et Constitution",text:"Le conflit révolutionnaire conduit à la Constitution de 1917, qui comprend institutions fédérales et importants droits sociaux."},{year:"1929–2000",title:"Longue période de parti dominant",text:"Une organisation politique et ses successeurs dominent la présidence pendant sept décennies, tandis que les élections et institutions deviennent progressivement plus compétitives."},{year:"1990–1996",title:"Renforcement des institutions électorales",text:"Des réformes créent puis accroissent l’indépendance de l’autorité électorale nationale."},{year:"2000",title:"Alternance présidentielle",text:"Un candidat d’opposition remporte la présidence, mettant fin à sept décennies de contrôle ininterrompu du parti au pouvoir."}],
    current:{asOf:"2026-09-15",officeholders:[["Présidente","Claudia Sheinbaum, Mouvement de régénération nationale (Morena)"],["Mandat présidentiel","1er octobre 2024 au 30 septembre 2030 ; la réélection immédiate est interdite"]],election:{title:"Élection fédérale de 2024",date:"2 juin 2024",turnout:"61,05 % à l’élection présidentielle",summary:"Claudia Sheinbaum remporte la présidence avec environ 59,8 % des suffrages valides. Morena et ses alliés du Parti vert et du Parti du travail obtiennent aussi une large majorité à la Chambre des députés.",representation:[["Morena","236 sièges attribués après l’élection"],["Parti vert écologiste (PVEM)","77 sièges"],["Parti du travail (PT)","51 sièges"],["Parti action nationale (PAN)","72 sièges"],["Parti révolutionnaire institutionnel (PRI)","35 sièges"],["Mouvement citoyen (MC)","27 sièges"],["Autres","2 sièges"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"58/100",status:"Partiellement libre",comparison:"Un point de moins que dans l’édition 2025",note:"Il s’agit de l’évaluation d’une organisation, pas d’un verdict de Politangle. Son rapport 2026 souligne des élections compétitives mais aussi de graves problèmes d’État de droit, de violence, de corruption et d’impunité.",url:"https://freedomhouse.org/country/mexico/freedom-world/2026"},trends:["L’élection de 2024 renforce Morena et ses alliés. La concentration du pouvoir électoral doit être analysée séparément de la popularité ou de l’efficacité de politiques particulières.","Freedom House réduit le score du Mexique d’un point en 2026 et relie explicitement ce changement aux préoccupations concernant l’indépendance judiciaire après le nouveau système d’élection des juges.","Critiquer corruption, privilèges fiscaux, influence du crime organisé ou accès inégal au pouvoir n’est pas en soi populiste. Le basculement populiste consiste à affirmer qu’un peuple moralement pur aurait une volonté unique et que ses opposants seraient par nature illégitimes."]},
  },
  canada: {
    name:"Canada",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire fédérale"],["Chef de l’État","Monarque, représenté au niveau fédéral par le gouverneur général"],["Chef du gouvernement","Premier ministre"],["Législatif","Parlement : Couronne, Sénat et Chambre des communes"],["Structure territoriale","Fédérale : 10 provinces et trois territoires"]],
    power:["Un gouvernement doit conserver la confiance de la Chambre des communes élue. Le Premier ministre et le cabinet exercent l’autorité exécutive tout en restant responsables devant le Parlement.","Le Sénat nommé révise la législation et représente les régions, mais la Chambre des communes joue le rôle démocratique central et possède la priorité exclusive sur les projets fiscaux et budgétaires.","La Constitution répartit les compétences entre gouvernements fédéral et provinciaux. Les tribunaux peuvent contrôler les lois au regard de la Constitution et de la Charte canadienne des droits et libertés."],
    vocabulary:["Le Parti libéral est une organisation précise du centre au centre gauche ; « libéral » peut aussi désigner une tradition plus large de droits, de marchés ou de réforme sociale.","Le conservatisme canadien comprend des traditions de marché, socialement conservatrices, régionales et communautaires. Le nationalisme québécois et l’autonomie gouvernementale autochtone ajoutent d’autres dimensions."],
    timeline:[{year:"1867",title:"Confédération",text:"L’Acte constitutionnel crée la fédération canadienne et ses institutions parlementaires."},{year:"1931",title:"Indépendance législative",text:"Le Statut de Westminster confirme l’autonomie législative du Canada vis-à-vis du Royaume-Uni."},{year:"1982",title:"Constitution et Charte",text:"Le Canada rapatrie sa Constitution et ajoute la Charte des droits et libertés."},{year:"1999",title:"Création du Nunavut",text:"Le Nunavut devient un territoire à la suite d’un important accord de revendication territoriale autochtone."}],
    current:{asOf:"2026-09-15",officeholders:[["Chef de l’État","Roi Charles III"],["Gouverneure générale","Mary Simon"],["Premier ministre","Mark Carney, Parti libéral"]],election:{title:"Élection fédérale de 2025",date:"28 avril 2025",turnout:"69,5 % des électeurs inscrits",summary:"Le Parti libéral remporte le plus de sièges sans obtenir la majorité dans une Chambre des communes portée à 343 sièges. Mark Carney reste donc Premier ministre à la tête d’un gouvernement minoritaire.",representation:[["Parti libéral","169 sièges dans le résultat validé"],["Parti conservateur","144 sièges"],["Bloc Québécois","22 sièges"],["Nouveau Parti démocratique","7 sièges"],["Parti vert","1 siège"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"97/100",status:"Libre",comparison:"Inchangé par rapport à l’édition 2025",note:"Il s’agit de l’évaluation d’une organisation, pas d’un verdict de Politangle. Le rapport reconnaît de solides protections des droits tout en signalant des discriminations persistantes et des obstacles socio-économiques touchant les Canadiens autochtones et noirs.",url:"https://freedomhouse.org/country/canada/freedom-world/2026"},trends:["L’élection de 2025 produit un gouvernement libéral minoritaire et la participation fédérale la plus élevée depuis 1993.","Les deux principaux partis recueillent ensemble la majorité des voix et des sièges, tandis que les partis régionaux et plus petits restent importants dans un Parlement sans majorité absolue.","Le score global du Canada chez Freedom House reste à 97, mais un score élevé n’efface pas les débats sur les droits autochtones, la discrimination, la transparence ou certaines restrictions provinciales sur les symboles religieux."]},
  },
  'south-africa': {
    name:"Afrique du Sud",
    atAGlance:[["Système","République parlementaire constitutionnelle"],["Chef de l’État et du gouvernement","Président, élu par l’Assemblée nationale"],["Législatif","Parlement : Assemblée nationale et Conseil national des provinces"],["Juridictions","Cour constitutionnelle et autres tribunaux indépendants"],["Structure territoriale","Échelons national, provincial et local de gouvernement"]],
    power:["Les électeurs élisent l’Assemblée nationale, qui élit le président. L’Assemblée peut révoquer le président ou le cabinet au moyen de votes prévus par la Constitution.","Le Conseil national des provinces représente les intérêts provinciaux. Les gouvernements national, provinciaux et locaux disposent de compétences constitutionnelles et doivent coopérer.","La Constitution est suprême. Les tribunaux peuvent invalider lois ou actes publics qui lui sont contraires, et des institutions indépendantes soutiennent la démocratie constitutionnelle et la responsabilité publique."],
    vocabulary:["L’African National Congress vient d’un mouvement de libération et rassemble des courants syndicaux, nationalistes, sociaux-démocrates et autres. Son histoire ne rend pas automatiquement chaque politique de gauche.","Les débats économiques restent marqués par les inégalités héritées de l’apartheid. Soutenir la redistribution ou une action plus forte contre la concentration de richesse n’est pas, à lui seul, une preuve de populisme."],
    timeline:[{year:"1910",title:"Union sud-africaine",text:"L’Union centralise un gouvernement de minorité blanche tout en excluant la majorité de la population du pouvoir politique national."},{year:"1948",title:"Formalisation de l’apartheid",text:"Le gouvernement du Parti national étend la classification raciale systématique, la ségrégation et la privation de droits."},{year:"1994",title:"Première élection nationale inclusive",text:"Les Sud-Africains votent lors de la première élection nationale fondée sur le suffrage universel adulte."},{year:"1996",title:"Constitution définitive",text:"La Constitution démocratique établit des droits opposables, un gouvernement coopératif et un contrôle constitutionnel fort."}],
    current:{asOf:"2026-09-15",officeholders:[["Président","Cyril Ramaphosa, African National Congress (ANC)"],["Gouvernement","Gouvernement multipartite d’unité nationale formé après l’élection de 2024"]],election:{title:"Élections nationales et provinciales de 2024",date:"29 mai 2024",turnout:"58,64 % des électeurs inscrits",summary:"L’ANC reste le premier parti mais perd pour la première fois depuis 1994 sa majorité à l’Assemblée nationale. Le Parlement réélit Cyril Ramaphosa après la formation d’un gouvernement d’unité nationale par plusieurs partis.",representation:[["African National Congress (ANC)","159 sièges"],["Democratic Alliance (DA)","87 sièges"],["uMkhonto weSizwe Party (MK)","58 sièges"],["Economic Freedom Fighters (EFF)","39 sièges"],["Inkatha Freedom Party (IFP)","17 sièges"],["Autres partis","40 sièges"]]},rights:{provider:"Freedom House",edition:"Freedom in the World 2026",score:"81/100",status:"Libre",comparison:"Inchangé par rapport à l’édition 2025",note:"Il s’agit de l’évaluation d’une organisation, pas d’un verdict de Politangle. Les scores de démocratie mesurent droits et institutions ; ils ne disent pas si les inégalités, le chômage ou les services publics sont acceptables.",url:"https://freedomhouse.org/country/south-africa/freedom-world/2026"},trends:["La perte de la majorité de l’ANC fait passer le gouvernement national d’une domination d’un seul parti à une négociation multipartite formelle.","Le rapport électoral officiel fait état d’une participation passant de 65,99 % en 2019 à 58,64 % en 2024.","Freedom House maintient l’Afrique du Sud à 81/100. Cette mesure institutionnelle doit être lue parallèlement aux fortes inégalités, au chômage et aux écarts de qualité des services publics."]},
  },
  india: {
    name:"Inde",
    atAGlance:[["Système","République parlementaire fédérale"],["Chef de l’État","Président de l’Inde"],["Chef du gouvernement","Premier ministre"],["Législatif","Parlement : Président, Lok Sabha et Rajya Sabha"],["Structure territoriale","Union fédérale d’États et de territoires de l’Union"]],
    power:["Le Premier ministre dirige un gouvernement qui doit conserver la confiance de la Lok Sabha élue directement. Le président agit normalement sur avis ministériel.","La Rajya Sabha représente les États, tandis que la Lok Sabha joue le rôle décisif pour la confiance gouvernementale et dispose de pouvoirs plus importants sur les textes financiers.","La Constitution répartit les compétences entre l’Union et les États mais confère à l’Union d’importants pouvoirs de prééminence et d’urgence. La Cour suprême peut contrôler les lois et protéger la structure fondamentale de la Constitution."],
    vocabulary:["La laïcité indienne ne signifie pas toujours un mur strict entre religion et gouvernement. Elle renvoie souvent à un respect égal, à la liberté religieuse et à l’intervention de l’État pour protéger les droits ou réformer certaines pratiques.","Nationalisme hindou, libéralisation économique, politique sociale, représentation des castes et autonomie fédérale sont des dimensions distinctes. Les condenser en un seul score gauche-droite masquerait des différences importantes."],
    timeline:[{year:"1947",title:"Indépendance et partition",text:"La domination britannique prend fin et le sous-continent est partagé entre l’Inde et le Pakistan au milieu de déplacements massifs et de violences."},{year:"1950",title:"Entrée en vigueur de la Constitution",text:"L’Inde devient une république sous une Constitution détaillée établissant droits, gouvernement parlementaire et institutions fédérales."},{year:"1975–1977",title:"État d’urgence national",text:"L’état d’urgence restreint libertés civiles et opposition politique avant que des élections ne rétablissent l’alternance."},{year:"1992–1993",title:"Renforcement de la démocratie locale",text:"Des amendements constitutionnels donnent une base nationale plus forte aux organes locaux élus des villages et des villes."}],
  },
  nigeria: {
    name:"Nigeria",
    atAGlance:[["Système","République présidentielle fédérale"],["Exécutif","Président"],["Législatif","Assemblée nationale : Chambre des représentants et Sénat"],["Juridictions","Cour suprême et tribunaux fédéraux et des États"],["Structure territoriale","Fédérale : 36 États et Territoire de la capitale fédérale"]],
    power:["Le président dirige l’exécutif séparément de l’Assemblée nationale. La loi fédérale, la fiscalité, les dépenses et le contrôle sont partagés entre deux chambres élues.","Chaque État dispose d’un gouverneur et d’une assemblée élus. La Constitution répartit les compétences, mais les revenus pétroliers et les allocations nationales rendent particulièrement importantes les relations entre niveaux fédéral, étatique et local.","Les tribunaux peuvent contrôler l’action publique et les litiges électoraux. Des commissions indépendantes organisent les élections et exercent d’autres fonctions constitutionnelles, même si indépendance formelle et capacité réelle doivent être évaluées séparément."],
    vocabulary:["Les principaux partis nigérians sont de larges coalitions nationales plutôt que des blocs idéologiques nets. Région, religion, ethnicité, patronage et réseaux de candidats traversent souvent la gauche et la droite économiques.","La colère publique face à la corruption, à l’évasion fiscale ou à la capture du pouvoir par un petit groupe peut être factuellement fondée. Elle ne devient populiste que lorsque tout désaccord légitime est réduit à un peuple pur face à une élite entièrement corrompue."],
    timeline:[{year:"1960",title:"Indépendance",text:"Le Nigeria devient indépendant avec une Constitution parlementaire fédérale."},{year:"1966–1970",title:"Coups d’État et guerre civile",text:"Des coups militaires sont suivis de la sécession du Biafra et d’une guerre civile dévastatrice."},{year:"1999",title:"Quatrième République",text:"Le régime militaire prend fin et l’actuel ordre constitutionnel présidentiel commence."},{year:"2015",title:"Première victoire présidentielle de l’opposition",text:"Pour la première fois, un président sortant perd une élection et transmet le pouvoir à un candidat de l’opposition."}],
  },
  philippines: {
    name:"Philippines",
    atAGlance:[["Système","République présidentielle unitaire"],["Exécutif","Président"],["Législatif","Congrès : Chambre des représentants et Sénat"],["Juridictions","Cour suprême et tribunaux inférieurs"],["Structure territoriale","État unitaire avec gouvernements locaux élus et région autonome du Bangsamoro"]],
    power:["Le président dirige l’exécutif séparément du Congrès et exerce un mandat unique de six ans sans possibilité d’un nouveau mandat présidentiel.","Les sénateurs sont élus à l’échelle nationale. La Chambre associe circonscriptions géographiques et sièges de listes de partis destinés à élargir la représentation sectorielle et de groupes.","La Cour suprême tranche les litiges constitutionnels. Des commissions constitutionnelles indépendantes supervisent élections, fonction publique et audit public, tandis que les gouvernements locaux exercent les compétences accordées par la loi nationale."],
    vocabulary:["Les étiquettes partisanes sont souvent moins fiables que les alliances de candidats, réseaux régionaux et familles politiques. Changer de parti n’indique donc pas forcément un changement idéologique.","Le style direct et anti-establishment d’un dirigeant peut être populiste, mais des politiques populaires ou une critique exacte de l’influence oligarchique ne suffisent pas. La question centrale est de savoir si le pluralisme et l’opposition légitime sont niés."],
    timeline:[{year:"1946",title:"Indépendance",text:"Les Philippines deviennent une république indépendante après domination coloniale et occupation de guerre."},{year:"1972",title:"Loi martiale",text:"Le président Ferdinand Marcos proclame la loi martiale, concentre le pouvoir et restreint opposition et libertés civiles."},{year:"1986",title:"Révolution EDSA (« People Power »)",text:"Des manifestations de masse et une élection contestée mettent fin à la présidence Marcos et rétablissent un gouvernement démocratique compétitif."},{year:"1987",title:"Constitution actuelle",text:"Une nouvelle Constitution rétablit contrôles et contre-pouvoirs, protection des droits et limites du mandat présidentiel."}],
  },
  brazil: {
    name:"Brésil",
    atAGlance:[["Système","République présidentielle fédérale"],["Exécutif","Président"],["Législatif","Congrès national : Chambre des députés et Sénat fédéral"],["Juridictions","Cour suprême fédérale et autres tribunaux fédéraux et étatiques"],["Structure territoriale","Fédérale : 26 États, municipalités et District fédéral"]],
    power:["Le président dirige l’exécutif séparément du Congrès. Gouverner exige généralement des accords entre plusieurs partis représentés dans les deux chambres.","Les députés sont élus à la proportionnelle dans les États, tandis que les sénateurs représentent à égalité les États et le District fédéral. Le Congrès légifère, contrôle le budget et enquête sur le gouvernement.","La Constitution donne de forts pouvoirs de contrôle aux tribunaux et protège un ministère public indépendant. États et municipalités élisent leurs propres gouvernements et assurent de grands services publics."],
    vocabulary:["La compétition partisane brésilienne combine gauche et droite économiques avec intérêts régionaux, mouvements religieux, politique de sécurité publique et alliances parlementaires flexibles.","La lutte anticorruption peut reposer sur des preuves et une responsabilité conforme au droit. Elle devient populiste lorsqu’un dirigeant revendique une autorité morale exclusive et traite tribunaux, médias ou opposition d’ennemis simplement parce qu’ils contestent ses positions."],
    timeline:[{year:"1822–1889",title:"Indépendance et empire",text:"Le Brésil devient indépendant sous une monarchie constitutionnelle avant qu’un mouvement conduit par l’armée n’établisse une république."},{year:"1964–1985",title:"Dictature militaire",text:"Des gouvernements militaires restreignent pendant plus de deux décennies compétition politique, droits et société civile."},{year:"1988",title:"Constitution démocratique",text:"La Constitution actuelle établit de nombreux droits, une démocratie fédérale et de fortes institutions publiques."},{year:"1989",title:"Retour de l’élection présidentielle directe",text:"Le Brésil tient sa première élection présidentielle directe depuis 1960."}],
  },
  indonesia: {
    name:"Indonésie",
    atAGlance:[["Système","République présidentielle unitaire"],["Exécutif","Président"],["Représentation nationale","Assemblée consultative du peuple : Conseil représentatif du peuple et Conseil représentatif régional"],["Juridictions","Cour suprême et Cour constitutionnelle"],["Structure territoriale","État unitaire avec forte décentralisation provinciale et locale"]],
    power:["Le président et le vice-président sont élus directement et ne dépendent pas de la confiance continue du Parlement. Le président nomme le cabinet et dirige l’exécutif.","Le Conseil représentatif du peuple légifère et contrôle le gouvernement avec le président. Le Conseil représentatif régional représente les provinces mais dispose de pouvoirs législatifs plus limités.","La Cour constitutionnelle contrôle les lois et les litiges électoraux. Depuis la transition démocratique, d’importantes compétences et ressources ont été transférées à des gouvernements provinciaux et locaux élus."],
    vocabulary:["Pancasila est la philosophie de l’État fondée sur la croyance en Dieu, l’humanisme, l’unité nationale, la démocratie délibérative et la justice sociale. Elle ne correspond pas à une seule idéologie occidentale.","Le nationalisme est partagé par une grande partie de la politique indonésienne. Pluralisme religieux, rôle de l’islam, décentralisation, protection sociale et développement économique forment des lignes de désaccord distinctes."],
    timeline:[{year:"1945",title:"Indépendance et Constitution",text:"L’indépendance est proclamée et la Constitution de 1945 établit le cadre fondateur de la République."},{year:"1965–1998",title:"Nouvel Ordre",text:"Le gouvernement autoritaire de Suharto concentre le pouvoir politique tout en supervisant d’importantes transformations économiques et sociales."},{year:"1998–2002",title:"Reformasi et changements constitutionnels",text:"La chute de Suharto est suivie d’une politique compétitive, de la décentralisation et de quatre séries d’amendements constitutionnels."},{year:"2004",title:"Élection présidentielle directe",text:"Les citoyens élisent directement le président pour la première fois."}],
  },
  japan: {
    name:"Japon",
    atAGlance:[["Système","Monarchie constitutionnelle parlementaire unitaire"],["Chef de l’État","Empereur, défini par la Constitution comme symbole de l’État"],["Chef du gouvernement","Premier ministre"],["Législatif","Diète nationale : Chambre des représentants et Chambre des conseillers"],["Structure territoriale","État unitaire avec 47 gouvernements préfectoraux élus"]],
    power:["La Diète désigne le Premier ministre, qui doit être membre du Parlement. Le cabinet est collectivement responsable devant la Chambre des représentants.","Les deux chambres légifèrent, mais la Chambre des représentants a priorité pour choisir le Premier ministre et davantage de pouvoir sur budgets, traités et certains désaccords législatifs.","L’empereur n’exerce que les fonctions d’État prévues par la Constitution et n’a aucun pouvoir gouvernemental. Les tribunaux peuvent contrôler la constitutionnalité, tandis que préfectures et municipalités administrent d’importants services."],
    vocabulary:["Le Parti libéral-démocrate est généralement conservateur malgré son nom. « Libéral » dans un nom de parti ne doit donc pas être lu automatiquement au sens américain de centre gauche.","La politique d’après-guerre porte aussi sur le pacifisme, la révision constitutionnelle, l’alliance de sécurité, la réforme administrative et l’État développeur, pas seulement sur les impôts et les valeurs sociales."],
    timeline:[{year:"1868",title:"Restauration de Meiji",text:"L’autorité politique est réorganisée autour de l’empereur et le Japon entreprend une construction rapide de l’État et une industrialisation accélérée."},{year:"1945–1947",title:"Défaite et Constitution démocratique",text:"Après la défaite, une nouvelle Constitution établit souveraineté populaire, gouvernement parlementaire, droits et rôle symbolique de l’empereur."},{year:"1955",title:"Début du système de parti dominant",text:"Les partis conservateurs fusionnent dans le Parti libéral-démocrate, qui gouverne ensuite pendant la majeure partie de l’après-guerre."},{year:"1994",title:"Réforme du système électoral",text:"Le Japon remplace les circonscriptions plurinominales de la chambre basse par un système mixte de circonscriptions uninominales et de proportionnelle."}],
  },
};
