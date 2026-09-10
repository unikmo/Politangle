export const GERMAN_LITERACY_VERSION = 'de-literacy-2026.09-candidate-v1' as const;

const politicalTerms: Record<string, string> = {
  'social-democracy': 'Sozialdemokratie', socialism: 'Sozialismus', libertarianism: 'Libertarismus', communism: 'Kommunismus', conservatism: 'Konservatismus',
  'christian-democracy': 'Christdemokratie', 'green-politics': 'Grüne Politik', 'classical-liberalism': 'Klassischer Liberalismus', nationalism: 'Nationalismus', populism: 'Populismus', fascism: 'Faschismus',
};

const prompts: Record<string, string> = {
  C1: 'Eine Bewegung akzeptiert eine überwiegend kapitalistische Wirtschaft, unterstützt aber starke Sozialversicherungen, öffentliche Leistungen, Marktregulierung und Umverteilung. Welche Tradition passt am besten?',
  C2: 'Eine Bewegung möchte, dass ein erheblicher Teil der Produktionsmittel gesellschaftlich, öffentlich, genossenschaftlich oder durch Beschäftigte kontrolliert wird. Welche politische Familie passt am besten?',
  C3: 'Eine politische Philosophie stellt individuelle Freiheit ins Zentrum, schützt freiwilligen Austausch und Privateigentum und misstraut staatlichem Zwang. Welche Tradition passt am besten?',
  C4: 'Eine Bewegung schätzt gewachsene Institutionen und lebendige Traditionen und ist skeptisch gegenüber schnellen Reformen nach abstrakten Plänen. Welche Tradition passt am besten?',
  C5: 'Eine Bewegung unterstützt Privateigentum und Marktwirtschaft, aber auch starke soziale Pflichten, Wohlfahrt und Verteilungsgerechtigkeit. Welche Familie passt am besten?',
  C6: 'Eine Bewegung stellt ökologische Grenzen und eine nachhaltige Gesellschaft ins Zentrum und verbindet sie mit Dezentralisierung, Basisdemokratie und sozialer Gerechtigkeit. Welche Tradition passt?',
  C7: 'Eine Bewegung strebt in ihrer marxistischen Idealform eine klassenlose und schließlich staatenlose Gesellschaft ohne Privateigentum an Produktionsmitteln an. Welche Tradition ist gemeint?',
  C8: 'Eine Bewegung ist ultranationalistisch und autoritär, lehnt politischen Pluralismus und individuelle Rechte ab und bekämpft die repräsentative liberale Demokratie. Welche Ideologie passt?',
  C9: 'Eine Bewegung misst der Nation besonderen politischen Wert bei und fordert weitgehende Selbstbestimmung, sagt aber nichts über Wirtschaft oder Sozialpolitik. Was lässt sich folgern?',
  U1: 'Welche Aussage über Populismus ist am zutreffendsten?', U2: 'Welche Aussage über Nationalismus ist am besten belegt?',
  U3: 'Was unterscheidet liberale Demokratie von der bloßen Durchführung von Wahlen?',
  U4: 'Was unterscheidet in der vergleichenden Forschung die extreme Rechte am deutlichsten von der radikalen Rechten?',
  U5: 'Welche Aussage über Liberalismus ist am zutreffendsten?', U6: 'Welche Aussage über Sozialismus ist am zutreffendsten?',
};

const optionLabels: Record<string, string> = {
  'necessarily-right': 'Sie ist zwangsläufig rechts.', 'necessarily-left': 'Sie ist zwangsläufig links.', 'cross-cutting-nationalism': 'Sie drückt Nationalismus aus; das allein bestimmt aber keine Links-rechts-Position.', 'necessarily-fascist': 'Sie ist zwangsläufig faschistisch.',
  'always-right': 'Populismus ist immer eine rechte Ideologie.', 'always-left': 'Populismus ist immer eine linke Ideologie.', 'thin-host': 'Populismus gilt oft als dünne Ideologie, die sich mit linken oder rechten Wirtsideologien verbinden kann.', 'only-style': 'Populismus hat keinen ideologischen Inhalt und ist nur ein Sprechstil.',
  'always-fascism': 'Nationalismus ist ein anderes Wort für Faschismus.', 'cross-cutting': 'Nationalismus kann sich mit verschiedenen ideologischen Traditionen verbinden; für eine Einordnung sind weitere Überzeugungen nötig.', 'no-politics': 'Nationalismus hat keinen politischen Inhalt.',
  'elections-only': 'Nichts; Wahlen allein reichen aus.', 'rights-checks': 'Bürgerrechte, Rechtsstaatlichkeit und institutionelle Kontrollen der Exekutive sind ebenfalls zentral.', 'one-party': 'Eine Regierungspartei muss ohne Opposition handeln können.', 'markets-required': 'Jeder wichtige Wirtschaftszweig muss privat sein.',
  taxes: 'Die extreme Rechte befürwortet immer höhere Steuern.', democracy: 'Die extreme Rechte ist ausdrücklich antidemokratisch; die radikale Rechte kann Verfahrensdemokratie akzeptieren und zugleich liberaldemokratische Grenzen ablehnen.', environment: 'Die radikale Rechte priorisiert immer den Umweltschutz.', ownership: 'Die extreme Rechte unterstützt immer öffentliches Eigentum.',
  'single-economic': 'Alle Liberalen teilen ein festes Wirtschaftsprogramm.', 'diverse-family': 'Liberalismus ist eine vielfältige, auf Freiheit ausgerichtete Familie mit wichtigen Meinungsunterschieden über Freiheit und Staat.', 'anti-liberty': 'Individuelle Freiheit ist für den Liberalismus politisch unwichtig.', 'same-socialism': 'Liberalismus und Sozialismus sind identisch.',
  'broad-family': 'Sozialismus ist eine breite Familie mit demokratischen und nichtdemokratischen historischen Formen sowie verschiedenen Modellen gesellschaftlichen Eigentums.', 'same-welfare': 'Jeder Wohlfahrtsstaat ist automatisch sozialistisch.', 'private-only': 'Im Sozialismus müssen alle Produktionsmittel privat bleiben.',
};

const explanations: Record<string, string> = {
  C1: 'Moderne Sozialdemokratie behält überwiegend eine kapitalistische Wirtschaft bei, reguliert Märkte und nutzt Sozialstaat und Umverteilung für soziale Gerechtigkeit.',
  C2: 'Sozialismus wird wesentlich durch gesellschaftliche statt überwiegend private Kontrolle der Produktionsmittel geprägt; seine institutionellen Formen unterscheiden sich.',
  C3: 'Libertarismus gibt individueller Freiheit höchsten Stellenwert, schützt freiwilligen Austausch und Privateigentum und begrenzt staatlichen Zwang.',
  C4: 'Eine wichtige konservative Tradition betont Kontinuität, gewachsene Institutionen und Skepsis gegenüber schnellen, abstrakt geplanten Reformen.',
  C5: 'Christdemokratischer Sozialkapitalismus verbindet Privateigentum und Märkte mit Wohlfahrt, sozialen Pflichten und Verteilungsgerechtigkeit.',
  C6: 'Grüne Politik stellt ökologische Grenzen und Nachhaltigkeit ins Zentrum und verbindet sie häufig mit Basisdemokratie, Dezentralisierung und sozialer Gerechtigkeit.',
  C7: 'Das marxistische kommunistische Ideal ist klassen- und staatenlos und lehnt Privateigentum an Produktionsmitteln ab; es ist nicht mit moderner Sozialdemokratie gleichzusetzen.',
  C8: 'Faschismus verbindet Ultranationalismus, Autoritarismus und die Ablehnung pluralistischer liberaler Demokratie; Konservatismus oder Nationalismus allein sind nicht dasselbe.',
  C9: 'Nationalismus misst Nationen und politischer Selbstbestimmung Bedeutung bei, kann sich aber mit verschiedenen wirtschaftlichen und gesellschaftlichen Ideologien verbinden.',
  U1: 'Eine verbreitete wissenschaftliche Definition versteht Populismus als dünne Ideologie: ein reines Volk gegen eine korrupte Elite, verbunden mit unterschiedlichen Wirtsideologien.',
  U2: 'Nationalismus gibt Nationen politische Bedeutung, trat aber in konservativen, liberalen, sozialistischen und anderen Formen auf.',
  U3: 'Liberale Demokratie ergänzt Wahlen um Bürgerrechte, Rechtsstaatlichkeit sowie institutionelle Kontrolle und Gewaltenteilung.',
  U4: 'Eine verbreitete Unterscheidung betrifft die Demokratie: Die radikale Rechte kann illiberal, aber verfahrensdemokratisch sein; die extreme Rechte ist antidemokratisch.',
  U5: 'Liberalismus verbindet die Bedeutung von Freiheit, enthält aber unterschiedliche Auffassungen über Freiheit und die angemessene Rolle des Staates.',
  U6: 'Sozialismus ist eine breite Familie mit mehreren institutionellen Modellen gesellschaftlichen Eigentums. Moderne Sozialdemokratie behält überwiegend Privateigentum bei.',
};

export function germanLiteracyPrompt(id: string) { return prompts[id] ?? null; }
export function germanLiteracyOption(id: string, fallback: string) { return politicalTerms[id] ?? optionLabels[id] ?? fallback; }
export function germanLiteracyExplanation(id: string, fallback: string) { return explanations[id] ?? fallback; }
export const germanLiteracyQuestionCount = Object.keys(prompts).length;
