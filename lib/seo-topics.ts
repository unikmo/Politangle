import type { Locale } from '../app/LocaleProvider';

export type SeoTopicSlug =
  | 'political-spectrum'
  | 'left-vs-right-politics'
  | 'political-ideologies'
  | 'political-test'
  | 'political-literacy';

export type SeoTopicSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type SeoTopicContent = {
  slug: SeoTopicSlug;
  eyebrow: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  answer: string;
  keyPoints: readonly string[];
  sections: readonly SeoTopicSection[];
  questions: readonly { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  sourceKeys: readonly string[];
};

export const seoSourceLibrary = {
  britannicaLeft: { title: 'Encyclopaedia Britannica — Left', url: 'https://www.britannica.com/topic/left' },
  sepIdeology: { title: 'Stanford Encyclopedia of Philosophy — Ideology', url: 'https://plato.stanford.edu/entries/ideology/' },
  sepLiberalism: { title: 'Stanford Encyclopedia of Philosophy — Liberalism', url: 'https://plato.stanford.edu/entries/liberalism/' },
  sepConservatism: { title: 'Stanford Encyclopedia of Philosophy — Conservatism', url: 'https://plato.stanford.edu/entries/conservatism/' },
  coeDemocracy: { title: 'Council of Europe — Competences for Democratic Culture', url: 'https://www.coe.int/en/web/reference-framework-of-competences-for-democratic-culture/rfcdc' },
} as const;

const en: Record<SeoTopicSlug, SeoTopicContent> = {
  'political-spectrum': {
    slug:'political-spectrum',
    eyebrow:'POLITICAL SPECTRUM EXPLAINED',
    title:'What is a political spectrum?',
    metaTitle:'Political spectrum explained: beyond one left–right line',
    metaDescription:'A neutral guide to political spectra, left and right, multidimensional politics and why country context changes the meaning of political labels.',
    answer:'A political spectrum is a model for organizing political positions so that similarities and differences are easier to compare. The familiar left–right line is one spectrum, but it is not the only possible model and it does not capture every political disagreement.',
    keyPoints:[
      'Left and right are useful shorthand, not complete identities.',
      'Economic, social, institutional, national and ecological questions can point in different directions.',
      'The meaning of a label changes across countries and historical periods.',
      'A multidimensional model keeps disagreements visible instead of compressing them into one score.',
    ],
    sections:[
      { heading:'Why left and right are still useful', paragraphs:[
        'The language of left and right remains one of the most widely understood ways to describe political disagreement. It can summarize broad patterns around equality, markets, redistribution, tradition, authority and social change.',
        'But shorthand works best when it is treated as shorthand. Two people who both call themselves “left”, “right”, “liberal” or “conservative” can disagree strongly on ownership, civil liberties, national sovereignty, immigration, institutional checks or environmental policy.'
      ]},
      { heading:'Why one line can hide important combinations', paragraphs:[
        'Political views do not always move together. Someone may support a large welfare state and private ownership, favour personal autonomy while preferring stronger public-order powers, or support national decision-making together with strict environmental limits.',
        'Politangle therefore separates recurring trade-offs instead of assuming that one answer predicts the next. The aim is not to abolish familiar political labels, but to show where they explain something and where they stop explaining.'
      ]},
      { heading:'Country context matters', paragraphs:[
        'Political labels travel unevenly. In some countries, conventional left–right competition is a strong organizing language. In others, territorial identity, religion, ethnicity, constitutional structure, security, regional alliances, liberation history or patronage networks may be equally important or more important.',
        'That is why Politangle keeps language and country context separate. The same assessment dimensions can be compared globally while country pages explain the local political features that should not be forced into a global label.'
      ]},
    ],
    questions:[
      { question:'Is the political spectrum always left versus right?', answer:'No. Left–right is the best-known spectrum, but political analysis can use several dimensions when one line hides meaningful differences.' },
      { question:'Can a person be left-wing on one issue and right-wing on another?', answer:'Yes. Real political views often combine positions that conventional party labels place on different sides of a spectrum.' },
      { question:'Does Politangle assign one ideology?', answer:'No. It shows separate dimensions first, then uses broad political traditions only as interpretive references.' },
    ],
    ctaTitle:'See your own political pattern',
    ctaText:'Politangle Quick uses 26 statements to map your views across eight separate dimensions.',
    ctaLabel:'Take Politangle Quick',
    ctaHref:'/quiz',
    sourceKeys:['britannicaLeft','sepIdeology'],
  },
  'left-vs-right-politics': {
    slug:'left-vs-right-politics',
    eyebrow:'LEFT VS RIGHT',
    title:'Left vs right in politics: what the labels mean—and what they miss',
    metaTitle:'Left vs right politics explained neutrally',
    metaDescription:'A neutral explanation of left-wing and right-wing politics, common differences, overlap, country variation and the limits of a single spectrum.',
    answer:'Left and right are broad political families rather than fixed checklists. In many contexts the left places more emphasis on equality and collective provision, while the right places more emphasis on continuity, property, markets, authority or inherited institutions—but the exact combination varies by country and tradition.',
    keyPoints:[
      'Neither side has one universal policy package.',
      'Economic left–right and social liberal–conservative differences are related but not identical.',
      'Liberalism, conservatism, socialism, nationalism and other traditions have internal disagreements.',
      'Country-specific political cleavages can cut across the left–right divide.',
    ],
    sections:[
      { heading:'What “left” usually captures', paragraphs:[
        'The political left is commonly associated with greater concern for equality, redistribution, labour interests and collective provision. Different left traditions disagree about how much change should come through markets, public ownership, regulation, unions, welfare institutions or democratic reform.',
        'Social democrats, democratic socialists, greens and social liberals can therefore share some goals while disagreeing sharply about ownership, growth, state power or the speed of change.'
      ]},
      { heading:'What “right” usually captures', paragraphs:[
        'The political right commonly includes traditions that place greater weight on private property, market coordination, continuity, authority, national institutions or inherited social practices. Those commitments do not always appear together.',
        'Market liberals, Christian democrats, traditional conservatives, national conservatives and libertarian currents can disagree over welfare, religion, civil liberties, trade, immigration, foreign policy and the proper scope of the state.'
      ]},
      { heading:'Where the labels break down', paragraphs:[
        'A left–right label becomes less informative when a country’s central conflict is primarily territorial, ethnic, religious, constitutional, regional or security-driven. It can also mislead when party competition is organized around personalities and broad electoral coalitions rather than stable ideological blocs.',
        'Politangle therefore treats left and right as useful comparative language, not as a rule that every country or every person must fit.'
      ]},
    ],
    questions:[
      { question:'Is liberal always left-wing?', answer:'No. “Liberal” can refer to different economic, social and constitutional traditions, and its placement varies substantially by country.' },
      { question:'Is conservative always right-wing?', answer:'Conservatism is normally associated with the political right, but conservative traditions differ over markets, welfare, nationalism, institutions and social policy.' },
      { question:'What is the political centre?', answer:'The centre usually describes positions between or combining established left and right traditions, but there is no single universal centrist programme.' },
    ],
    ctaTitle:'Move beyond the label',
    ctaText:'See whether your economic, social, institutional and national views actually point in the same direction.',
    ctaLabel:'Start the 26-question Quick',
    ctaHref:'/quiz',
    sourceKeys:['britannicaLeft','sepLiberalism','sepConservatism'],
  },
  'political-ideologies': {
    slug:'political-ideologies',
    eyebrow:'POLITICAL IDEOLOGIES',
    title:'Political ideologies explained without turning them into stereotypes',
    metaTitle:'Political ideologies explained: liberalism, conservatism and more',
    metaDescription:'Understand political ideologies as traditions with internal disagreements, not fixed personality labels. Learn how Politangle separates beliefs from political vocabulary.',
    answer:'A political ideology is a structured way of thinking about political institutions, power, rights, society and economic life. Ideologies are traditions of argument, not single policy checklists: liberal, conservative, socialist, social-democratic, green, nationalist and libertarian currents each contain important internal disagreements.',
    keyPoints:[
      'Ideologies combine values, assumptions and institutional preferences.',
      'The same ideology can develop differently in different countries.',
      'Party labels and ideology labels are not always interchangeable.',
      'Knowing an ideology is different from personally agreeing with it.',
    ],
    sections:[
      { heading:'Why ideology is more than a label', paragraphs:[
        'Political traditions give people recurring ways to answer questions about liberty, equality, property, authority, community, institutions and change. They help explain why separate policy positions sometimes cluster together.',
        'But political traditions are not internally uniform. Liberalism contains competing views of liberty and the state; conservatism contains different accounts of tradition, authority and markets; socialist traditions disagree over ownership, democracy and reform. A useful guide therefore explains the disagreement inside the label.'
      ]},
      { heading:'Belief and knowledge should stay separate', paragraphs:[
        'Someone can accurately describe socialism without being socialist, understand conservative arguments without being conservative, or recognize liberal principles while disagreeing with them. Political literacy is therefore different from ideological self-placement.',
        'Politangle separates BELIEVE from CLASSIFY and UNDERSTAND. BELIEVE maps your own positions. CLASSIFY and UNDERSTAND ask whether you can recognize traditions, concepts and distinctions.'
      ]},
      { heading:'Why country pages matter for ideology', paragraphs:[
        'An ideology name can travel internationally while changing emphasis. “Liberal”, “conservative”, “social democratic” or “nationalist” can refer to different coalitions, institutions and historical experiences from one country to another.',
        'For that reason Politangle uses broad global concepts for comparison and adds country perspectives where local vocabulary or political cleavages need separate explanation.'
      ]},
    ],
    questions:[
      { question:'What are the main political ideologies?', answer:'There is no final universal list. Common traditions include liberalism, conservatism, socialism, social democracy, green politics, nationalism, Christian democracy and libertarian currents, among others.' },
      { question:'Can someone combine several ideologies?', answer:'Yes. Individuals and parties often combine ideas associated with more than one tradition.' },
      { question:'Is ideology the same as party membership?', answer:'No. Parties are organizations competing for power; ideology is a tradition of political ideas. A party may contain several ideological currents.' },
    ],
    ctaTitle:'Learn the traditions before taking a knowledge test',
    ctaText:'Politangle’s learning section explains political terms separately from your personal assessment.',
    ctaLabel:'Open Learn',
    ctaHref:'/learn',
    sourceKeys:['sepIdeology','sepLiberalism','sepConservatism'],
  },
  'political-test': {
    slug:'political-test',
    eyebrow:'POLITICAL TEST',
    title:'What should a political test actually measure?',
    metaTitle:'Political ideology test: what a multidimensional test measures',
    metaDescription:'How to read a political ideology test responsibly: beliefs, dimensions, uncertainty, labels, scoring and the limits of a single left–right result.',
    answer:'A useful political test should make its questions, scoring logic and limits understandable. It should distinguish separate political trade-offs instead of assuming that every answer belongs on one hidden left–right score.',
    keyPoints:[
      'A test result is a model output, not a diagnosis.',
      'Question wording and scoring should be inspectable.',
      '“Not sure” should not silently become a political position.',
      'Broad ideology labels should come after the underlying dimensions, not replace them.',
    ],
    sections:[
      { heading:'Start with separate political questions', paragraphs:[
        'A person can hold economically interventionist views and socially conservative views, support strong constitutional checks while preferring national sovereignty, or combine market preferences with strict environmental limits. A single score can hide those combinations.',
        'Politangle uses eight recurring dimensions so that economic structure, ownership, social values, authority, pluralism, international cooperation, national belonging and ecology remain separately visible.'
      ]},
      { heading:'Treat uncertainty honestly', paragraphs:[
        'Political questions are not always easy, and respondents may lack information or feel genuinely divided. Treating “not sure” as if it meant the midpoint of an ideological scale can create false precision.',
        'Politangle keeps uncertainty distinct rather than silently turning it into a neutral political opinion. The result is intended as a structured summary of your answers, not a scientific probability that you “are” a particular ideology.'
      ]},
      { heading:'Use labels as interpretation, not verdicts', paragraphs:[
        'Ideology labels can help people navigate political language, but they should not erase the underlying disagreements. Two people can receive a similar broad description while differing substantially on authority, ownership, nationhood or ecology.',
        'That is why the detailed dimensions should be read before any tradition comparison. The method page also states what the assessment has and has not yet validated.'
      ]},
    ],
    questions:[
      { question:'Is Politangle a left–right test?', answer:'Not only. It retains familiar political language but maps eight dimensions separately before offering any broader interpretation.' },
      { question:'Does a score tell me how I should vote?', answer:'No. Politangle is an educational self-exploration tool and does not recommend candidates, parties or votes.' },
      { question:'Is the test scientifically diagnostic?', answer:'No. The current model is transparent about its technical checks and about the psychometric evidence that has not yet been established.' },
    ],
    ctaTitle:'Try the transparent version',
    ctaText:'Quick takes 26 questions. You can inspect the method and question-bank information separately.',
    ctaLabel:'Take Politangle Quick',
    ctaHref:'/quiz',
    sourceKeys:['sepIdeology'],
  },
  'political-literacy': {
    slug:'political-literacy',
    eyebrow:'POLITICAL LITERACY',
    title:'What is political literacy?',
    metaTitle:'Political literacy: concepts, critical understanding and civic learning',
    metaDescription:'Political literacy means more than knowing political facts. Learn how concepts, institutions, critical understanding and careful comparison support democratic participation.',
    answer:'Political literacy is the ability to understand political concepts, institutions, arguments and evidence well enough to interpret public debate and participate thoughtfully. It is not the same as holding a particular political opinion.',
    keyPoints:[
      'Political knowledge and political belief are different things.',
      'Understanding institutions matters alongside knowing ideological vocabulary.',
      'Critical reading includes recognizing framing, trade-offs and uncertainty.',
      'Political literacy should help people compare views without prescribing which view to adopt.',
    ],
    sections:[
      { heading:'Knowledge without telling people what to believe', paragraphs:[
        'A political-literacy tool should help someone distinguish concepts, recognize traditions and understand institutions without treating one political position as the correct answer. That distinction matters especially in classrooms.',
        'The Council of Europe’s democratic-culture framework separates knowledge and critical understanding from values, attitudes and skills. Politangle follows a related product principle: BELIEVE is separate from CLASSIFY and UNDERSTAND.'
      ]},
      { heading:'Why vocabulary matters', paragraphs:[
        'Words such as liberal, conservative, socialist, federal, populist, pluralist or nationalist carry histories and disagreements. Using them as insults or vague identities makes political discussion harder to inspect.',
        'Political literacy means being able to ask what a term refers to in a specific argument, which institutional trade-off is involved, and whether the same word means the same thing in another country.'
      ]},
      { heading:'Political literacy across countries', paragraphs:[
        'Institutions and political labels are not identical across national systems. Federalism, presidential power, monarchy, coalition government, territorial autonomy or party organization can change the practical meaning of a political claim.',
        'Politangle therefore combines general learning materials with country perspectives. The global concepts stay comparable, while local political vocabulary is explained rather than forced into a universal label.'
      ]},
    ],
    questions:[
      { question:'Is political literacy the same as political knowledge?', answer:'Knowledge is part of it, but political literacy also involves interpreting concepts, institutions, arguments, sources and context.' },
      { question:'Does political literacy require political neutrality?', answer:'Education can explain competing political ideas without telling a learner which political choice to make. Politangle’s design keeps personal belief assessment separate from knowledge questions.' },
      { question:'Why is country context important?', answer:'The same label can refer to different histories, institutions or party coalitions in different countries, so context is necessary for accurate comparison.' },
    ],
    ctaTitle:'Learn first, then test what you know',
    ctaText:'Use the glossary, practice sets and country perspectives without changing your personal BELIEVE result.',
    ctaLabel:'Explore political learning',
    ctaHref:'/learn',
    sourceKeys:['coeDemocracy','sepIdeology'],
  },
};

const de: Record<SeoTopicSlug, SeoTopicContent> = {
  'political-spectrum': {
    ...en['political-spectrum'],
    eyebrow:'POLITISCHES SPEKTRUM',
    title:'Was ist ein politisches Spektrum?',
    metaTitle:'Politisches Spektrum erklärt: mehr als links und rechts',
    metaDescription:'Neutrale Erklärung politischer Spektren, von links und rechts, mehrdimensionaler Politik und der Bedeutung des jeweiligen Länderkontexts.',
    answer:'Ein politisches Spektrum ist ein Modell, mit dem politische Positionen so geordnet werden, dass Gemeinsamkeiten und Unterschiede leichter vergleichbar werden. Die bekannte Links-rechts-Linie ist ein solches Modell – aber nicht das einzige und nicht für jeden politischen Konflikt ausreichend.',
    keyPoints:['Links und rechts sind nützliche Kurzbegriffe, keine vollständigen Identitäten.','Wirtschaft, Gesellschaft, Institutionen, Nation und Ökologie können in unterschiedliche Richtungen weisen.','Die Bedeutung politischer Etiketten verändert sich zwischen Ländern und historischen Phasen.','Ein mehrdimensionales Modell hält Unterschiede sichtbar, statt sie in einem einzigen Wert zu verstecken.'],
    sections:[
      { heading:'Warum links und rechts weiterhin nützlich sind', paragraphs:['Links und rechts gehören zu den bekanntesten Kurzbegriffen für politische Unterschiede. Sie können grobe Muster bei Gleichheit, Märkten, Umverteilung, Tradition, Autorität und gesellschaftlichem Wandel beschreiben.','Aber Kurzbegriffe bleiben Kurzbegriffe. Zwei Menschen, die sich beide als links, rechts, liberal oder konservativ bezeichnen, können bei Eigentum, Freiheitsrechten, staatlicher Macht, Souveränität oder Umweltpolitik weit auseinanderliegen.'] },
      { heading:'Warum eine einzige Linie wichtige Kombinationen verdecken kann', paragraphs:['Politische Ansichten bewegen sich nicht immer gemeinsam. Jemand kann einen starken Sozialstaat und privates Eigentum befürworten, persönliche Autonomie mit stärkeren Befugnissen für öffentliche Ordnung verbinden oder nationale Entscheidungshoheit zusammen mit strikten ökologischen Grenzen unterstützen.','Politangle trennt deshalb wiederkehrende Zielkonflikte. Bekannte politische Begriffe bleiben nutzbar, aber es wird sichtbar, wo sie erklären – und wo nicht.'] },
      { heading:'Der Länderkontext verändert die Bedeutung', paragraphs:['In manchen Ländern organisiert sich Parteienwettbewerb stark entlang einer Links-rechts-Achse. Anderswo sind territoriale Identität, Religion, Ethnizität, Verfassungsordnung, Sicherheit, regionale Bündnisse oder historische Befreiungsbewegungen eigenständige Hauptachsen.','Politangle trennt deshalb Sprache und Länderkontext. Globale Vergleichsdimensionen bleiben gleich, während Länderperspektiven erklären, welche lokalen Konfliktlinien nicht in globale Etiketten gepresst werden sollten.'] },
    ],
    questions:[
      { question:'Ist ein politisches Spektrum immer links gegen rechts?', answer:'Nein. Links–rechts ist das bekannteste Spektrum, aber mehrere Dimensionen können politische Unterschiede genauer sichtbar machen.' },
      { question:'Kann man bei einem Thema links und bei einem anderen rechts stehen?', answer:'Ja. Reale politische Ansichten kombinieren häufig Positionen, die Parteietiketten verschiedenen Seiten zuordnen.' },
      { question:'Ordnet Politangle mir eine einzige Ideologie zu?', answer:'Nein. Zuerst werden getrennte Dimensionen gezeigt; breite politische Traditionen dienen erst danach als Orientierung.' },
    ],
    ctaTitle:'Sieh dein eigenes politisches Muster',
    ctaText:'Politangle Quick nutzt 26 Aussagen und zeigt deine Ansichten auf acht getrennten Dimensionen.',
    ctaLabel:'Politangle Quick starten',
  },
  'left-vs-right-politics': {
    ...en['left-vs-right-politics'],
    eyebrow:'LINKS UND RECHTS',
    title:'Links und rechts in der Politik: Was die Begriffe erklären – und was nicht',
    metaTitle:'Links und rechts politisch neutral erklärt',
    metaDescription:'Neutrale Erklärung linker und rechter Politik, typischer Unterschiede, Überschneidungen, Länderunterschiede und der Grenzen einer einzigen Achse.',
    answer:'Links und rechts sind breite politische Familien und keine festen Checklisten. Häufig betont die Linke stärker Gleichheit und kollektive Absicherung, während die Rechte eher Kontinuität, Eigentum, Märkte, Autorität oder gewachsene Institutionen betont. Die genaue Mischung hängt jedoch vom Land und von der jeweiligen Tradition ab.',
    keyPoints:['Keine Seite besitzt ein weltweit einheitliches Politikpaket.','Wirtschaftliches Links–rechts und gesellschaftlich liberal–konservativ sind verwandt, aber nicht identisch.','Liberalismus, Konservatismus, Sozialismus und andere Traditionen enthalten interne Konflikte.','Nationale politische Konfliktlinien können quer zur Links-rechts-Achse verlaufen.'],
    sections:[
      { heading:'Was „links“ meist zusammenfasst', paragraphs:['Die politische Linke wird häufig mit stärkerer Betonung von Gleichheit, Umverteilung, Arbeitnehmerinteressen und kollektiver Daseinsvorsorge verbunden. Linke Traditionen unterscheiden sich jedoch darin, welche Rolle Märkte, öffentliches Eigentum, Regulierung, Gewerkschaften und Reformen spielen sollen.','Sozialdemokratische, sozialistische, grüne und sozialliberale Strömungen können einzelne Ziele teilen und trotzdem bei Eigentum, Wachstum, Staatsmacht oder Reformtempo deutlich auseinanderliegen.'] },
      { heading:'Was „rechts“ meist zusammenfasst', paragraphs:['Zur politischen Rechten gehören häufig Traditionen, die privatem Eigentum, Marktkoordination, Kontinuität, Autorität, nationalen Institutionen oder gewachsenen sozialen Praktiken mehr Gewicht geben. Diese Positionen treten nicht immer gemeinsam auf.','Marktliberale, christdemokratische, traditionell-konservative, nationalkonservative und libertäre Strömungen unterscheiden sich teils stark bei Wohlfahrt, Religion, Freiheitsrechten, Handel, Migration und Staatsumfang.'] },
      { heading:'Wo die Begriffe an Grenzen stoßen', paragraphs:['Links und rechts erklären weniger, wenn der zentrale politische Konflikt eines Landes vor allem territorial, ethnisch, religiös, verfassungsrechtlich, regional oder sicherheitspolitisch geprägt ist. Auch personenbezogene Bündnisse können ideologische Parteiblöcke überlagern.','Politangle behandelt links und rechts deshalb als nützliche Vergleichssprache – nicht als Zwangsschablone für jedes Land oder jede Person.'] },
    ],
    questions:[
      { question:'Ist liberal immer links?', answer:'Nein. „Liberal“ bezeichnet unterschiedliche wirtschaftliche, gesellschaftliche und verfassungsbezogene Traditionen und wird je nach Land anders eingeordnet.' },
      { question:'Ist konservativ immer rechts?', answer:'Konservatismus wird normalerweise der politischen Rechten zugeordnet, umfasst aber sehr unterschiedliche Positionen zu Märkten, Wohlfahrt, Nation, Institutionen und Gesellschaftspolitik.' },
      { question:'Was ist die politische Mitte?', answer:'Die Mitte beschreibt meist Positionen zwischen oder Kombinationen aus etablierten linken und rechten Traditionen. Ein weltweit einheitliches Mitte-Programm gibt es nicht.' },
    ],
    ctaTitle:'Geh über das Etikett hinaus',
    ctaText:'Prüfe, ob deine wirtschaftlichen, gesellschaftlichen, institutionellen und nationalen Ansichten tatsächlich in dieselbe Richtung weisen.',
    ctaLabel:'26-Fragen-Quick starten',
  },
  'political-ideologies': {
    ...en['political-ideologies'],
    eyebrow:'POLITISCHE IDEOLOGIEN',
    title:'Politische Ideologien verstehen – ohne sie zu Karikaturen zu machen',
    metaTitle:'Politische Ideologien erklärt: Liberalismus, Konservatismus und mehr',
    metaDescription:'Politische Ideologien als Traditionen mit internen Konflikten verstehen – nicht als starre Persönlichkeitsetiketten.',
    answer:'Eine politische Ideologie ist eine strukturierte Art, über Institutionen, Macht, Rechte, Gesellschaft und Wirtschaft nachzudenken. Ideologien sind Argumentationstraditionen und keine festen Politik-Checklisten.',
    keyPoints:['Ideologien verbinden Werte, Annahmen und institutionelle Vorstellungen.','Dieselbe Ideologie kann sich in verschiedenen Ländern unterschiedlich entwickeln.','Parteinamen und Ideologiebegriffe sind nicht automatisch identisch.','Eine Ideologie zu verstehen heißt nicht, ihr persönlich zuzustimmen.'],
    sections:[
      { heading:'Warum Ideologie mehr als ein Etikett ist', paragraphs:['Politische Traditionen bieten wiederkehrende Antworten auf Fragen nach Freiheit, Gleichheit, Eigentum, Autorität, Gemeinschaft, Institutionen und Wandel. Dadurch wird verständlich, warum manche politische Positionen häufig gemeinsam auftreten.','Gleichzeitig sind Traditionen intern umstritten. Liberalismus enthält unterschiedliche Freiheits- und Staatskonzepte, Konservatismus unterschiedliche Vorstellungen von Tradition und Markt, sozialistische Strömungen unterschiedliche Modelle von Eigentum, Demokratie und Reform.'] },
      { heading:'Überzeugung und Wissen getrennt halten', paragraphs:['Man kann Sozialismus korrekt erklären, ohne Sozialist zu sein, konservative Argumente verstehen, ohne konservativ zu sein, oder liberale Prinzipien erkennen und ihnen dennoch widersprechen. Politisches Wissen ist deshalb nicht dasselbe wie politische Selbsteinordnung.','Politangle trennt BELIEVE von CLASSIFY und UNDERSTAND: BELIEVE zeigt eigene Positionen; CLASSIFY und UNDERSTAND prüfen Begriffe, Traditionen und Abgrenzungen.'] },
      { heading:'Warum Ideologien Länderkontext brauchen', paragraphs:['Ein Ideologiebegriff kann international verwendet werden und trotzdem national andere Schwerpunkte haben. „Liberal“, „konservativ“, „sozialdemokratisch“ oder „nationalistisch“ kann sich auf unterschiedliche Parteien, Institutionen und historische Erfahrungen beziehen.','Darum verbindet Politangle globale Vergleichsbegriffe mit Länderperspektiven, wenn lokale politische Sprache oder Konfliktlinien zusätzliche Erklärung brauchen.'] },
    ],
    questions:[
      { question:'Welche politischen Ideologien gibt es?', answer:'Es gibt keine endgültige universelle Liste. Häufig genannt werden unter anderem Liberalismus, Konservatismus, Sozialismus, Sozialdemokratie, grüne Politik, Nationalismus, Christdemokratie und libertäre Strömungen.' },
      { question:'Kann man mehrere Ideologien kombinieren?', answer:'Ja. Menschen und Parteien verbinden häufig Ideen aus mehreren politischen Traditionen.' },
      { question:'Ist Ideologie dasselbe wie Parteimitgliedschaft?', answer:'Nein. Parteien sind Organisationen im politischen Wettbewerb; Ideologien sind politische Denktraditionen. Eine Partei kann mehrere Strömungen enthalten.' },
    ],
    ctaTitle:'Erst Traditionen verstehen, dann Wissen testen',
    ctaText:'Im Lernbereich werden politische Begriffe getrennt von deinem persönlichen Assessment erklärt.',
    ctaLabel:'Lernbereich öffnen',
  },
  'political-test': {
    ...en['political-test'],
    eyebrow:'POLITISCHER TEST',
    title:'Was sollte ein politischer Test eigentlich messen?',
    metaTitle:'Politischer Ideologie-Test: Was ein mehrdimensionaler Test misst',
    metaDescription:'Politische Tests richtig lesen: Überzeugungen, Dimensionen, Unsicherheit, Etiketten, Wertung und Grenzen eines einzigen Links-rechts-Ergebnisses.',
    answer:'Ein sinnvoller politischer Test sollte Fragen, Auswertungslogik und Grenzen nachvollziehbar machen. Er sollte getrennte politische Zielkonflikte sichtbar halten, statt jede Antwort in einen versteckten Links-rechts-Gesamtwert zu pressen.',
    keyPoints:['Ein Testergebnis ist ein Modellwert, keine Diagnose.','Fragen und Auswertungslogik sollten nachvollziehbar sein.','„Unsicher“ sollte nicht heimlich zu einer politischen Position werden.','Breite Ideologiebegriffe sollten erst nach den zugrunde liegenden Dimensionen kommen.'],
    sections:[
      { heading:'Mit getrennten politischen Fragen beginnen', paragraphs:['Wirtschaftliche, gesellschaftliche und institutionelle Positionen bewegen sich nicht zwingend gemeinsam. Eine Person kann staatliche Umverteilung und privates Eigentum kombinieren oder starke institutionelle Kontrollen zusammen mit nationaler Entscheidungshoheit unterstützen.','Politangle verwendet acht wiederkehrende Dimensionen, damit Wirtschaftsrolle, Eigentum, soziale Werte, Autorität, Pluralismus, internationale Zusammenarbeit, nationale Zugehörigkeit und Ökologie getrennt sichtbar bleiben.'] },
      { heading:'Unsicherheit ehrlich behandeln', paragraphs:['Politische Fragen sind nicht immer leicht. Menschen können Informationen vermissen oder zwischen Zielen abwägen. „Unsicher“ einfach als ideologische Mitte zu werten, erzeugt Scheingenauigkeit.','Politangle hält Unsicherheit getrennt. Das Ergebnis fasst Antworten strukturiert zusammen; es ist keine wissenschaftliche Wahrscheinlichkeit, dass jemand eine bestimmte Ideologie „ist“.'] },
      { heading:'Etiketten als Orientierung, nicht als Urteil', paragraphs:['Ideologiebegriffe können beim Einordnen helfen, sollten aber die darunterliegenden Unterschiede nicht verdecken. Zwei ähnliche Gesamtbeschreibungen können bei Autorität, Eigentum, nationaler Zugehörigkeit oder Ökologie sehr unterschiedliche Profile haben.','Darum sollten zuerst die einzelnen Achsen gelesen werden. Die Methodenseite zeigt außerdem transparent, welche Teile des Assessments technisch geprüft und welche wissenschaftlich noch nicht validiert sind.'] },
    ],
    questions:[
      { question:'Ist Politangle ein Links-rechts-Test?', answer:'Nicht nur. Vertraute politische Sprache bleibt erhalten, aber acht Dimensionen werden getrennt gezeigt, bevor eine breitere Einordnung erfolgt.' },
      { question:'Sagt mir das Ergebnis, wen ich wählen soll?', answer:'Nein. Politangle ist ein Bildungs- und Selbstreflexionswerkzeug und empfiehlt keine Parteien, Kandidaten oder Wahlentscheidungen.' },
      { question:'Ist der Test eine wissenschaftliche Diagnose?', answer:'Nein. Politangle legt technische Prüfungen und noch offene psychometrische Validierung ausdrücklich getrennt offen.' },
    ],
    ctaTitle:'Probier die transparente Variante',
    ctaText:'Quick hat 26 Fragen. Methode und Fragenversionen kannst du separat einsehen.',
    ctaLabel:'Politangle Quick starten',
  },
  'political-literacy': {
    ...en['political-literacy'],
    eyebrow:'POLITISCHE BILDUNG',
    title:'Was bedeutet politische Kompetenz?',
    metaTitle:'Politische Kompetenz: Begriffe, Institutionen und kritisches Verständnis',
    metaDescription:'Politische Kompetenz ist mehr als Faktenwissen: Begriffe, Institutionen, kritisches Verständnis und sorgfältiger Vergleich unterstützen demokratische Teilhabe.',
    answer:'Politische Kompetenz bedeutet, politische Begriffe, Institutionen, Argumente und Informationen so weit zu verstehen, dass öffentliche Debatten eingeordnet und Entscheidungen bewusst getroffen werden können. Sie ist nicht dasselbe wie eine bestimmte politische Meinung.',
    keyPoints:['Politisches Wissen und politische Überzeugung sind unterschiedliche Dinge.','Institutionen zu verstehen ist ebenso wichtig wie Ideologiebegriffe zu kennen.','Kritisches Lesen bedeutet auch, Framing, Zielkonflikte und Unsicherheit zu erkennen.','Politische Bildung sollte beim Vergleichen helfen, ohne vorzuschreiben, welche Position gewählt werden soll.'],
    sections:[
      { heading:'Wissen vermitteln, ohne politische Entscheidungen abzunehmen', paragraphs:['Politische Bildung sollte Begriffe erklären, Traditionen unterscheidbar machen und Institutionen verständlich machen, ohne eine politische Position zur richtigen Antwort zu erklären. Im Unterricht ist diese Trennung besonders wichtig.','Der Europarat unterscheidet in seinem Kompetenzrahmen Wissen und kritisches Verständnis von Werten, Einstellungen und Fähigkeiten. Politangle folgt einem verwandten Produktprinzip: BELIEVE bleibt von CLASSIFY und UNDERSTAND getrennt.'] },
      { heading:'Warum politische Sprache zählt', paragraphs:['Begriffe wie liberal, konservativ, sozialistisch, föderal, populistisch, pluralistisch oder nationalistisch haben Geschichte und interne Kontroversen. Werden sie nur als Schlagwörter genutzt, wird Debatte schwerer überprüfbar.','Politische Kompetenz heißt deshalb auch zu fragen, was ein Begriff im konkreten Argument bedeutet, welcher institutionelle Zielkonflikt dahintersteht und ob derselbe Begriff in einem anderen Land dasselbe bezeichnet.'] },
      { heading:'Politische Kompetenz über Ländergrenzen hinweg', paragraphs:['Institutionen und politische Begriffe funktionieren nicht in jedem Land gleich. Föderalismus, Präsidentenmacht, Monarchie, Koalitionsregierungen, Territorialautonomie oder Parteiorganisation können die praktische Bedeutung politischer Aussagen verändern.','Politangle verbindet daher allgemeine Lerninhalte mit Länderperspektiven. Globale Begriffe bleiben vergleichbar, lokale politische Sprache wird zusätzlich erklärt.'] },
    ],
    questions:[
      { question:'Ist politische Kompetenz dasselbe wie politisches Wissen?', answer:'Wissen gehört dazu, aber politische Kompetenz umfasst auch das Einordnen von Begriffen, Institutionen, Argumenten, Quellen und Kontext.' },
      { question:'Muss politische Bildung eine politische Position vorgeben?', answer:'Nein. Politische Ideen können vergleichend erklärt werden, ohne Lernenden eine Wahlentscheidung abzunehmen.' },
      { question:'Warum ist Länderkontext wichtig?', answer:'Dasselbe politische Etikett kann in verschiedenen Ländern andere historische Erfahrungen, Institutionen oder Parteibündnisse bezeichnen.' },
    ],
    ctaTitle:'Erst lernen, dann Wissen prüfen',
    ctaText:'Nutze Glossar, Übungen und Länderperspektiven, ohne dein persönliches BELIEVE-Ergebnis zu verändern.',
    ctaLabel:'Politisches Lernen öffnen',
  },
};

const es: Record<SeoTopicSlug, SeoTopicContent> = {
  'political-spectrum': {
    ...en['political-spectrum'],
    eyebrow:'ESPECTRO POLÍTICO',
    title:'¿Qué es un espectro político?',
    metaTitle:'Espectro político explicado: más allá de izquierda y derecha',
    metaDescription:'Guía neutral sobre el espectro político, izquierda y derecha, modelos multidimensionales y por qué el contexto de cada país cambia las etiquetas.',
    answer:'Un espectro político es un modelo para ordenar posiciones políticas y facilitar su comparación. La conocida línea izquierda–derecha es un espectro, pero no es el único modelo posible ni describe todos los desacuerdos políticos.',
    keyPoints:['Izquierda y derecha son atajos útiles, no identidades completas.','Economía, sociedad, instituciones, nación y ecología pueden apuntar en direcciones distintas.','El significado de una etiqueta cambia entre países y épocas.','Un modelo multidimensional mantiene visibles los desacuerdos en lugar de comprimirlos en una sola puntuación.'],
    sections:[
      { heading:'Por qué izquierda y derecha siguen siendo útiles', paragraphs:['Izquierda y derecha siguen siendo una de las formas más conocidas de resumir diferencias políticas. Pueden mostrar patrones generales sobre igualdad, mercados, redistribución, tradición, autoridad y cambio social.','Pero un atajo sigue siendo un atajo. Dos personas que se llaman de izquierda, derecha, liberales o conservadoras pueden discrepar mucho sobre propiedad, libertades civiles, soberanía, controles institucionales o política ambiental.'] },
      { heading:'Por qué una sola línea oculta combinaciones importantes', paragraphs:['Las ideas políticas no siempre se mueven juntas. Alguien puede apoyar un Estado social amplio y propiedad privada, autonomía personal y más poderes de orden público, o decisión nacional y límites ecológicos estrictos al mismo tiempo.','Por eso Politangle separa dilemas recurrentes. No elimina las etiquetas conocidas: muestra dónde ayudan y dónde dejan de explicar.'] },
      { heading:'El contexto nacional importa', paragraphs:['En algunos países la competencia izquierda–derecha organiza claramente la política. En otros, territorio, religión, etnia, diseño constitucional, seguridad, alianzas regionales, historia de liberación o redes de patronazgo pueden ser igual o más importantes.','Politangle separa idioma y contexto nacional. Las dimensiones globales siguen siendo comparables y las páginas de cada país explican lo que no debe forzarse dentro de una etiqueta universal.'] },
    ],
    questions:[
      { question:'¿El espectro político siempre es izquierda contra derecha?', answer:'No. Izquierda–derecha es el modelo más conocido, pero varias dimensiones pueden describir mejor diferencias que una sola línea oculta.' },
      { question:'¿Se puede ser de izquierda en un tema y de derecha en otro?', answer:'Sí. Las personas suelen combinar posiciones que las etiquetas partidistas colocan en lados distintos.' },
      { question:'¿Politangle asigna una sola ideología?', answer:'No. Primero muestra dimensiones separadas y después usa tradiciones políticas amplias solo como referencia interpretativa.' },
    ],
    ctaTitle:'Mira tu propio patrón político',
    ctaText:'Politangle Quick utiliza 26 afirmaciones para mostrar tus ideas en ocho dimensiones separadas.',
    ctaLabel:'Hacer Politangle Quick',
  },
  'left-vs-right-politics': {
    ...en['left-vs-right-politics'],
    eyebrow:'IZQUIERDA Y DERECHA',
    title:'Izquierda y derecha en política: qué explican y qué se dejan fuera',
    metaTitle:'Izquierda y derecha en política, explicadas de forma neutral',
    metaDescription:'Explicación neutral de izquierda y derecha, diferencias habituales, solapamientos, variación entre países y límites de un solo eje.',
    answer:'Izquierda y derecha son familias políticas amplias, no listas fijas. En muchos contextos la izquierda pone más énfasis en igualdad y provisión colectiva, mientras la derecha da más peso a continuidad, propiedad, mercados, autoridad o instituciones heredadas. La combinación concreta varía según país y tradición.',
    keyPoints:['Ningún lado tiene un programa universal.','El eje económico y el eje social liberal–conservador están relacionados, pero no son idénticos.','Liberalismo, conservadurismo, socialismo y otras tradiciones contienen desacuerdos internos.','Los conflictos políticos nacionales pueden cruzar el eje izquierda–derecha.'],
    sections:[
      { heading:'Qué suele resumir “la izquierda”', paragraphs:['La izquierda suele asociarse con mayor énfasis en igualdad, redistribución, intereses laborales y provisión colectiva. Sus distintas tradiciones discrepan sobre mercados, propiedad pública, regulación, sindicatos, bienestar y reforma.','Socialdemócratas, socialistas democráticos, verdes y social-liberales pueden compartir algunos objetivos y, aun así, diferir mucho sobre propiedad, crecimiento, poder estatal o ritmo del cambio.'] },
      { heading:'Qué suele resumir “la derecha”', paragraphs:['La derecha suele incluir tradiciones que dan más peso a propiedad privada, coordinación de mercado, continuidad, autoridad, instituciones nacionales o prácticas sociales heredadas. Esos compromisos no siempre aparecen juntos.','Liberales de mercado, democristianos, conservadores tradicionales, nacional-conservadores y corrientes libertarias pueden discrepar sobre bienestar, religión, libertades civiles, comercio, inmigración y alcance del Estado.'] },
      { heading:'Dónde dejan de funcionar bien las etiquetas', paragraphs:['Izquierda–derecha explica menos cuando el conflicto central de un país es principalmente territorial, étnico, religioso, constitucional, regional o de seguridad. También puede fallar cuando la política se organiza alrededor de personalidades y coaliciones amplias.','Politangle usa izquierda y derecha como lenguaje comparativo útil, no como una plantilla obligatoria para todos los países y todas las personas.'] },
    ],
    questions:[
      { question:'¿Liberal siempre significa izquierda?', answer:'No. “Liberal” puede referirse a tradiciones económicas, sociales y constitucionales distintas, y cambia mucho de posición según el país.' },
      { question:'¿Conservador siempre significa derecha?', answer:'El conservadurismo suele asociarse con la derecha, pero existen grandes diferencias sobre mercados, bienestar, nación, instituciones y política social.' },
      { question:'¿Qué es el centro político?', answer:'El centro suele describir posiciones intermedias o combinaciones de tradiciones de izquierda y derecha. No existe un programa centrista universal.' },
    ],
    ctaTitle:'Ve más allá de la etiqueta',
    ctaText:'Comprueba si tus ideas económicas, sociales, institucionales y nacionales realmente apuntan en la misma dirección.',
    ctaLabel:'Empezar Quick de 26 preguntas',
  },
  'political-ideologies': {
    ...en['political-ideologies'],
    eyebrow:'IDEOLOGÍAS POLÍTICAS',
    title:'Ideologías políticas explicadas sin convertirlas en estereotipos',
    metaTitle:'Ideologías políticas explicadas: liberalismo, conservadurismo y más',
    metaDescription:'Entiende las ideologías como tradiciones con desacuerdos internos, no como etiquetas rígidas de personalidad.',
    answer:'Una ideología política es una forma estructurada de pensar sobre instituciones, poder, derechos, sociedad y economía. Las ideologías son tradiciones de discusión, no listas cerradas de políticas.',
    keyPoints:['Las ideologías combinan valores, supuestos y preferencias institucionales.','La misma ideología puede desarrollarse de forma distinta según el país.','Etiqueta de partido y etiqueta ideológica no son lo mismo.','Entender una ideología no significa estar de acuerdo con ella.'],
    sections:[
      { heading:'Por qué una ideología es más que una etiqueta', paragraphs:['Las tradiciones políticas ofrecen respuestas recurrentes sobre libertad, igualdad, propiedad, autoridad, comunidad, instituciones y cambio. Ayudan a explicar por qué ciertas posiciones suelen agruparse.','Pero cada tradición contiene debates internos. El liberalismo discute sobre libertad y Estado; el conservadurismo sobre tradición, autoridad y mercados; las corrientes socialistas sobre propiedad, democracia y reforma.'] },
      { heading:'Separar creencias y conocimientos', paragraphs:['Se puede explicar correctamente el socialismo sin ser socialista, entender argumentos conservadores sin ser conservador o reconocer principios liberales y rechazarlos. La cultura política no es lo mismo que la identidad ideológica.','Politangle separa BELIEVE de CLASSIFY y UNDERSTAND. BELIEVE muestra tus propias posiciones; CLASSIFY y UNDERSTAND evalúan conceptos, tradiciones y diferencias.'] },
      { heading:'Por qué la ideología necesita contexto nacional', paragraphs:['Una etiqueta puede viajar entre países y cambiar de énfasis. “Liberal”, “conservador”, “socialdemócrata” o “nacionalista” puede describir coaliciones, instituciones e historias distintas.','Por eso Politangle combina conceptos globales comparables con perspectivas nacionales cuando el vocabulario local o las líneas de conflicto necesitan explicación adicional.'] },
    ],
    questions:[
      { question:'¿Cuáles son las principales ideologías políticas?', answer:'No existe una lista universal definitiva. Entre las tradiciones habituales están liberalismo, conservadurismo, socialismo, socialdemocracia, política verde, nacionalismo, democracia cristiana y corrientes libertarias.' },
      { question:'¿Se pueden combinar varias ideologías?', answer:'Sí. Personas y partidos combinan con frecuencia ideas asociadas a tradiciones distintas.' },
      { question:'¿Ideología es lo mismo que partido?', answer:'No. Un partido es una organización que compite por poder político; una ideología es una tradición de ideas. Un partido puede contener varias corrientes.' },
    ],
    ctaTitle:'Entiende las tradiciones antes de examinar tus conocimientos',
    ctaText:'La sección Aprender explica términos políticos por separado de tu evaluación personal.',
    ctaLabel:'Abrir Aprender',
  },
  'political-test': {
    ...en['political-test'],
    eyebrow:'TEST POLÍTICO',
    title:'¿Qué debería medir realmente un test político?',
    metaTitle:'Test de ideología política: qué mide un test multidimensional',
    metaDescription:'Cómo leer un test político con cuidado: creencias, dimensiones, incertidumbre, etiquetas, puntuación y límites de un resultado izquierda–derecha.',
    answer:'Un test político útil debería hacer comprensibles sus preguntas, su lógica de puntuación y sus límites. Debería mantener separados distintos dilemas políticos en lugar de colocar cada respuesta dentro de una única puntuación izquierda–derecha oculta.',
    keyPoints:['Un resultado es una salida de un modelo, no un diagnóstico.','Las preguntas y la puntuación deberían poder revisarse.','“No estoy seguro” no debería convertirse silenciosamente en una posición política.','Las etiquetas ideológicas amplias deben venir después de las dimensiones subyacentes.'],
    sections:[
      { heading:'Empezar con preguntas políticas separadas', paragraphs:['Las posiciones económicas, sociales e institucionales no tienen por qué moverse juntas. Se puede apoyar redistribución y propiedad privada, o fuertes controles institucionales y soberanía nacional al mismo tiempo.','Politangle usa ocho dimensiones recurrentes para mantener separadas función económica del Estado, propiedad, valores sociales, autoridad, pluralismo, cooperación internacional, pertenencia nacional y ecología.'] },
      { heading:'Tratar la incertidumbre con honestidad', paragraphs:['Las preguntas políticas no siempre son fáciles. Una persona puede carecer de información o estar realmente dividida entre objetivos. Convertir “no estoy seguro” en el punto medio ideológico crea una precisión falsa.','Politangle mantiene la incertidumbre separada. El resultado resume respuestas dentro de un modelo; no es una probabilidad científica de “ser” una ideología.'] },
      { heading:'Usar las etiquetas como orientación, no como veredicto', paragraphs:['Las etiquetas ayudan a navegar el lenguaje político, pero no deberían borrar las diferencias subyacentes. Dos perfiles parecidos pueden diferir mucho en autoridad, propiedad, nación o ecología.','Por eso conviene leer primero las dimensiones. La página de método también explica qué partes se han probado técnicamente y qué validación científica sigue pendiente.'] },
    ],
    questions:[
      { question:'¿Politangle es un test izquierda–derecha?', answer:'No únicamente. Mantiene el lenguaje político conocido, pero muestra ocho dimensiones por separado antes de cualquier interpretación amplia.' },
      { question:'¿El resultado me dice a quién votar?', answer:'No. Politangle es una herramienta educativa y de autoexploración; no recomienda candidatos, partidos ni votos.' },
      { question:'¿Es un diagnóstico científico?', answer:'No. Politangle distingue entre consistencia técnica y evidencia psicométrica todavía no establecida.' },
    ],
    ctaTitle:'Prueba la versión transparente',
    ctaText:'Quick tiene 26 preguntas. El método y las versiones de preguntas pueden revisarse por separado.',
    ctaLabel:'Hacer Politangle Quick',
  },
  'political-literacy': {
    ...en['political-literacy'],
    eyebrow:'CULTURA POLÍTICA',
    title:'¿Qué es la cultura política práctica?',
    metaTitle:'Cultura política: conceptos, instituciones y comprensión crítica',
    metaDescription:'La cultura política va más allá de saber datos: conceptos, instituciones, comprensión crítica y comparación cuidadosa apoyan la participación democrática.',
    answer:'La cultura política práctica es la capacidad de entender conceptos, instituciones, argumentos y evidencia política lo suficiente para interpretar el debate público y participar de forma reflexiva. No equivale a tener una opinión política concreta.',
    keyPoints:['Conocimiento político y creencia política son cosas distintas.','Entender instituciones importa tanto como conocer etiquetas ideológicas.','La lectura crítica incluye reconocer encuadres, dilemas e incertidumbre.','La educación política debería ayudar a comparar ideas sin decir qué opción adoptar.'],
    sections:[
      { heading:'Aprender sin decirle a nadie qué debe creer', paragraphs:['Una herramienta de cultura política debería ayudar a distinguir conceptos, reconocer tradiciones y entender instituciones sin tratar una posición política como la respuesta correcta. Esa separación es especialmente importante en el aula.','El marco de competencias democráticas del Consejo de Europa distingue conocimiento y comprensión crítica de valores, actitudes y capacidades. Politangle aplica un principio relacionado: BELIEVE está separado de CLASSIFY y UNDERSTAND.'] },
      { heading:'Por qué importa el vocabulario', paragraphs:['Palabras como liberal, conservador, socialista, federal, populista, pluralista o nacionalista tienen historia y controversias internas. Si se usan solo como insultos o identidades vagas, el debate resulta más difícil de analizar.','Tener cultura política también significa preguntar qué significa un término en un argumento concreto, qué dilema institucional está en juego y si la misma palabra significa lo mismo en otro país.'] },
      { heading:'Cultura política entre países', paragraphs:['Instituciones y etiquetas no funcionan igual en todos los sistemas. Federalismo, poder presidencial, monarquía, coaliciones, autonomía territorial u organización de partidos pueden cambiar el significado práctico de una afirmación política.','Politangle combina materiales generales con perspectivas nacionales: los conceptos globales siguen siendo comparables y el vocabulario local recibe una explicación propia.'] },
    ],
    questions:[
      { question:'¿Cultura política es lo mismo que conocimiento político?', answer:'El conocimiento forma parte de ella, pero también incluye interpretar conceptos, instituciones, argumentos, fuentes y contexto.' },
      { question:'¿La educación política debe decir qué posición es correcta?', answer:'No. Es posible explicar ideas políticas en comparación sin decidir por la persona qué opción política debe elegir.' },
      { question:'¿Por qué importa el contexto nacional?', answer:'La misma etiqueta puede referirse a historias, instituciones o coaliciones partidistas distintas en diferentes países.' },
    ],
    ctaTitle:'Aprende primero y después prueba lo que sabes',
    ctaText:'Usa el glosario, las prácticas y las perspectivas nacionales sin cambiar tu resultado personal de BELIEVE.',
    ctaLabel:'Explorar Aprender',
  },
};

const fr: Record<SeoTopicSlug, SeoTopicContent> = {
  'political-spectrum': {
    ...en['political-spectrum'],
    eyebrow:'SPECTRE POLITIQUE',
    title:'Qu’est-ce qu’un spectre politique ?',
    metaTitle:'Spectre politique expliqué : au-delà de gauche et droite',
    metaDescription:'Guide neutre du spectre politique, de la gauche et de la droite, des modèles multidimensionnels et du rôle du contexte national.',
    answer:'Un spectre politique est un modèle qui organise des positions politiques afin de rendre les ressemblances et les différences plus faciles à comparer. La ligne gauche–droite est le modèle le plus connu, mais elle n’est ni la seule possibilité ni suffisante pour tous les désaccords.',
    keyPoints:['Gauche et droite sont des raccourcis utiles, pas des identités complètes.','Économie, société, institutions, nation et écologie peuvent pointer dans des directions différentes.','Le sens d’une étiquette change selon le pays et la période historique.','Un modèle multidimensionnel garde les désaccords visibles au lieu de les comprimer dans un seul score.'],
    sections:[
      { heading:'Pourquoi gauche et droite restent utiles', paragraphs:['Gauche et droite sont parmi les façons les plus connues de résumer les différences politiques. Elles peuvent repérer de grands motifs autour de l’égalité, des marchés, de la redistribution, de la tradition, de l’autorité et du changement social.','Mais un raccourci reste un raccourci. Deux personnes qui se disent toutes deux de gauche, de droite, libérales ou conservatrices peuvent diverger fortement sur la propriété, les libertés civiles, la souveraineté, les contre-pouvoirs ou l’écologie.'] },
      { heading:'Pourquoi une seule ligne masque des combinaisons importantes', paragraphs:['Les opinions politiques ne se déplacent pas toujours ensemble. On peut soutenir un État social développé et la propriété privée, l’autonomie personnelle et des pouvoirs renforcés d’ordre public, ou encore la décision nationale et des limites écologiques strictes.','Politangle sépare donc plusieurs arbitrages récurrents. Il ne supprime pas les étiquettes connues : il montre où elles éclairent et où elles cessent d’être suffisantes.'] },
      { heading:'Le contexte national compte', paragraphs:['Dans certains pays, la compétition gauche–droite organise fortement la politique. Ailleurs, territoire, religion, ethnicité, institutions constitutionnelles, sécurité, alliances régionales, histoire de libération ou réseaux de patronage peuvent être aussi importants.','Politangle sépare donc la langue du contexte national. Les dimensions globales restent comparables tandis que les pages pays expliquent les clivages locaux qu’il serait trompeur de forcer dans une étiquette universelle.'] },
    ],
    questions:[
      { question:'Un spectre politique est-il toujours gauche contre droite ?', answer:'Non. Gauche–droite est le modèle le plus connu, mais plusieurs dimensions peuvent mieux rendre compte de différences qu’une seule ligne masque.' },
      { question:'Peut-on être à gauche sur un sujet et à droite sur un autre ?', answer:'Oui. Les opinions réelles combinent souvent des positions que les étiquettes partisanes placent de côtés différents.' },
      { question:'Politangle attribue-t-il une seule idéologie ?', answer:'Non. Les dimensions sont affichées d’abord ; les grandes traditions politiques servent ensuite de repères interprétatifs.' },
    ],
    ctaTitle:'Vois ton propre motif politique',
    ctaText:'Politangle Quick utilise 26 affirmations pour montrer tes idées sur huit dimensions distinctes.',
    ctaLabel:'Faire Politangle Quick',
  },
  'left-vs-right-politics': {
    ...en['left-vs-right-politics'],
    eyebrow:'GAUCHE ET DROITE',
    title:'Gauche et droite en politique : ce que ces mots expliquent — et ce qu’ils ratent',
    metaTitle:'Gauche et droite en politique expliquées de façon neutre',
    metaDescription:'Explication neutre de la gauche et de la droite, de leurs différences courantes, chevauchements, variations nationales et limites.',
    answer:'Gauche et droite désignent de grandes familles politiques, pas des listes fixes. Dans de nombreux contextes, la gauche met davantage l’accent sur l’égalité et la prise en charge collective, tandis que la droite accorde plus de poids à la continuité, la propriété, les marchés, l’autorité ou les institutions héritées. La combinaison varie selon les pays et traditions.',
    keyPoints:['Aucun camp ne possède un programme universel.','L’axe économique et l’axe social libéral–conservateur sont liés sans être identiques.','Libéralisme, conservatisme, socialisme et autres traditions contiennent des désaccords internes.','Des clivages nationaux peuvent traverser l’axe gauche–droite.'],
    sections:[
      { heading:'Ce que « la gauche » résume généralement', paragraphs:['La gauche est souvent associée à davantage d’égalité, de redistribution, de défense du travail et de services collectifs. Les traditions de gauche divergent cependant sur le rôle des marchés, de la propriété publique, de la réglementation, des syndicats et des réformes.','Sociaux-démocrates, socialistes démocratiques, écologistes et sociaux-libéraux peuvent partager certains objectifs tout en divergeant fortement sur la propriété, la croissance, le pouvoir de l’État ou le rythme du changement.'] },
      { heading:'Ce que « la droite » résume généralement', paragraphs:['La droite rassemble souvent des traditions qui donnent plus de poids à la propriété privée, aux marchés, à la continuité, à l’autorité, aux institutions nationales ou aux pratiques héritées. Ces engagements ne vont pas toujours ensemble.','Libéraux de marché, chrétiens-démocrates, conservateurs traditionnels, nationaux-conservateurs et courants libertariens peuvent diverger sur le social, la religion, les libertés publiques, le commerce, l’immigration et la taille de l’État.'] },
      { heading:'Quand ces étiquettes deviennent insuffisantes', paragraphs:['L’axe gauche–droite explique moins lorsque le conflit principal d’un pays est territorial, ethnique, religieux, constitutionnel, régional ou sécuritaire. Il peut aussi être faible lorsque les coalitions se structurent surtout autour de personnalités.','Politangle traite donc gauche et droite comme un langage comparatif utile, pas comme une grille obligatoire pour chaque pays ou chaque personne.'] },
    ],
    questions:[
      { question:'« Libéral » veut-il toujours dire gauche ?', answer:'Non. « Libéral » recouvre des traditions économiques, sociales et constitutionnelles différentes et change de position selon les pays.' },
      { question:'« Conservateur » veut-il toujours dire droite ?', answer:'Le conservatisme est généralement associé à la droite, mais ses courants diffèrent fortement sur les marchés, l’État social, la nation, les institutions et les questions de société.' },
      { question:'Qu’est-ce que le centre politique ?', answer:'Le centre décrit généralement des positions intermédiaires ou des combinaisons de traditions établies de gauche et de droite. Il n’existe pas de programme centriste universel.' },
    ],
    ctaTitle:'Va au-delà de l’étiquette',
    ctaText:'Vérifie si tes idées économiques, sociales, institutionnelles et nationales pointent réellement dans la même direction.',
    ctaLabel:'Commencer le Quick de 26 questions',
  },
  'political-ideologies': {
    ...en['political-ideologies'],
    eyebrow:'IDÉOLOGIES POLITIQUES',
    title:'Les idéologies politiques expliquées sans les transformer en stéréotypes',
    metaTitle:'Idéologies politiques : libéralisme, conservatisme et autres traditions',
    metaDescription:'Comprendre les idéologies comme des traditions traversées par des désaccords internes, et non comme des étiquettes fixes de personnalité.',
    answer:'Une idéologie politique est une manière structurée de penser les institutions, le pouvoir, les droits, la société et l’économie. Les idéologies sont des traditions d’argumentation, pas des listes fermées de politiques.',
    keyPoints:['Les idéologies combinent valeurs, hypothèses et préférences institutionnelles.','Une même idéologie peut évoluer différemment selon les pays.','Étiquette partisane et étiquette idéologique ne sont pas synonymes.','Comprendre une idéologie ne signifie pas y adhérer.'],
    sections:[
      { heading:'Pourquoi une idéologie est plus qu’une étiquette', paragraphs:['Les traditions politiques proposent des réponses récurrentes sur la liberté, l’égalité, la propriété, l’autorité, la communauté, les institutions et le changement. Elles aident à comprendre pourquoi certaines positions se regroupent.','Mais chaque tradition contient des débats internes : le libéralisme sur la liberté et l’État, le conservatisme sur la tradition, l’autorité et les marchés, les socialismes sur la propriété, la démocratie et la réforme.'] },
      { heading:'Séparer conviction et connaissance', paragraphs:['On peut décrire correctement le socialisme sans être socialiste, comprendre des arguments conservateurs sans être conservateur, ou reconnaître des principes libéraux tout en les contestant. La culture politique n’est donc pas une identité idéologique.','Politangle sépare BELIEVE de CLASSIFY et UNDERSTAND. BELIEVE cartographie tes positions ; CLASSIFY et UNDERSTAND évaluent concepts, traditions et distinctions.'] },
      { heading:'Pourquoi l’idéologie a besoin du contexte national', paragraphs:['Une étiquette peut voyager et changer de sens. « Libéral », « conservateur », « social-démocrate » ou « nationaliste » peut renvoyer à des coalitions, institutions et histoires différentes.','Politangle combine donc des concepts globaux comparables avec des perspectives nationales lorsque le vocabulaire local ou les clivages demandent une explication supplémentaire.'] },
    ],
    questions:[
      { question:'Quelles sont les principales idéologies politiques ?', answer:'Il n’existe pas de liste universelle définitive. Parmi les traditions courantes figurent libéralisme, conservatisme, socialisme, social-démocratie, écologie politique, nationalisme, démocratie chrétienne et courants libertariens.' },
      { question:'Peut-on combiner plusieurs idéologies ?', answer:'Oui. Les personnes comme les partis combinent souvent des idées issues de plusieurs traditions.' },
      { question:'Une idéologie est-elle la même chose qu’un parti ?', answer:'Non. Un parti est une organisation qui cherche du pouvoir politique ; une idéologie est une tradition d’idées. Un même parti peut contenir plusieurs courants.' },
    ],
    ctaTitle:'Comprends les traditions avant de tester tes connaissances',
    ctaText:'La section Apprendre explique les termes politiques séparément de ton évaluation personnelle.',
    ctaLabel:'Ouvrir Apprendre',
  },
  'political-test': {
    ...en['political-test'],
    eyebrow:'TEST POLITIQUE',
    title:'Que devrait réellement mesurer un test politique ?',
    metaTitle:'Test d’idéologie politique : ce que mesure un test multidimensionnel',
    metaDescription:'Comment lire un test politique avec prudence : convictions, dimensions, incertitude, étiquettes, scores et limites du gauche–droite.',
    answer:'Un test politique utile devrait rendre compréhensibles ses questions, sa logique de calcul et ses limites. Il devrait garder plusieurs arbitrages séparés au lieu de forcer chaque réponse dans un score gauche–droite caché.',
    keyPoints:['Un résultat est une sortie de modèle, pas un diagnostic.','Les questions et la logique de calcul devraient être inspectables.','« Je ne sais pas » ne devrait pas devenir silencieusement une position politique.','Les grandes étiquettes idéologiques devraient venir après les dimensions sous-jacentes.'],
    sections:[
      { heading:'Commencer par des questions politiques séparées', paragraphs:['Les positions économiques, sociales et institutionnelles ne se déplacent pas forcément ensemble. On peut soutenir la redistribution et la propriété privée, ou des contre-pouvoirs forts et la souveraineté nationale.','Politangle utilise huit dimensions récurrentes afin de garder séparés rôle économique de l’État, propriété, valeurs sociales, autorité, pluralisme, coopération internationale, appartenance nationale et écologie.'] },
      { heading:'Traiter l’incertitude honnêtement', paragraphs:['Les questions politiques ne sont pas toujours simples. Une personne peut manquer d’information ou hésiter entre deux objectifs. Transformer « je ne sais pas » en milieu idéologique crée une fausse précision.','Politangle garde l’incertitude distincte. Le résultat est un résumé structuré des réponses, pas une probabilité scientifique d’« être » une idéologie.'] },
      { heading:'Utiliser les étiquettes comme repères, pas comme verdicts', paragraphs:['Les étiquettes peuvent aider à naviguer dans le langage politique, mais elles ne doivent pas effacer les désaccords sous-jacents. Deux profils proches peuvent diverger fortement sur l’autorité, la propriété, la nation ou l’écologie.','C’est pourquoi les axes détaillés doivent être lus avant toute comparaison avec une tradition. La page Méthode distingue aussi les contrôles techniques de la validation scientifique encore à établir.'] },
    ],
    questions:[
      { question:'Politangle est-il un test gauche–droite ?', answer:'Pas seulement. Il conserve le vocabulaire politique familier mais affiche huit dimensions séparément avant toute interprétation plus large.' },
      { question:'Le résultat me dit-il pour qui voter ?', answer:'Non. Politangle est un outil éducatif d’exploration personnelle et ne recommande ni candidat, ni parti, ni vote.' },
      { question:'Est-ce un diagnostic scientifique ?', answer:'Non. Politangle distingue clairement la cohérence technique de la validation psychométrique qui reste à établir.' },
    ],
    ctaTitle:'Essaie la version transparente',
    ctaText:'Quick comporte 26 questions. La méthode et les versions des questions peuvent être consultées séparément.',
    ctaLabel:'Faire Politangle Quick',
  },
  'political-literacy': {
    ...en['political-literacy'],
    eyebrow:'CULTURE POLITIQUE',
    title:'Qu’est-ce que la culture politique ?',
    metaTitle:'Culture politique : concepts, institutions et compréhension critique',
    metaDescription:'La culture politique dépasse les faits : concepts, institutions, compréhension critique et comparaison rigoureuse soutiennent la participation démocratique.',
    answer:'La culture politique est la capacité de comprendre suffisamment les concepts, institutions, arguments et éléments de preuve politiques pour interpréter le débat public et y participer de manière réfléchie. Elle n’équivaut pas à une opinion politique particulière.',
    keyPoints:['Connaissance politique et conviction politique sont différentes.','Comprendre les institutions compte autant que connaître les étiquettes idéologiques.','La lecture critique comprend le cadrage, les arbitrages et l’incertitude.','L’éducation politique devrait aider à comparer les idées sans prescrire laquelle adopter.'],
    sections:[
      { heading:'Apprendre sans dire quoi penser', paragraphs:['Un outil de culture politique devrait aider à distinguer les concepts, reconnaître les traditions et comprendre les institutions sans présenter une position politique comme la bonne réponse. Cette séparation est particulièrement importante en classe.','Le cadre du Conseil de l’Europe distingue les connaissances et la compréhension critique des valeurs, attitudes et compétences. Politangle suit un principe proche : BELIEVE reste séparé de CLASSIFY et UNDERSTAND.'] },
      { heading:'Pourquoi le vocabulaire compte', paragraphs:['Des mots comme libéral, conservateur, socialiste, fédéral, populiste, pluraliste ou nationaliste ont une histoire et des débats internes. Utilisés comme simples insultes ou identités vagues, ils rendent la discussion plus difficile à examiner.','La culture politique consiste aussi à demander ce qu’un terme signifie dans un argument précis, quel arbitrage institutionnel est en jeu et si le même mot signifie la même chose dans un autre pays.'] },
      { heading:'La culture politique entre pays', paragraphs:['Institutions et étiquettes ne fonctionnent pas de façon identique partout. Fédéralisme, présidence, monarchie, coalitions, autonomie territoriale ou organisation partisane peuvent modifier la portée concrète d’une affirmation politique.','Politangle associe donc des contenus généraux à des perspectives nationales : les concepts globaux restent comparables, tandis que le vocabulaire politique local est expliqué séparément.'] },
    ],
    questions:[
      { question:'Culture politique et connaissance politique sont-elles identiques ?', answer:'La connaissance en fait partie, mais la culture politique inclut aussi l’interprétation des concepts, institutions, arguments, sources et contextes.' },
      { question:'L’éducation politique doit-elle dire quelle position est correcte ?', answer:'Non. On peut expliquer des idées concurrentes sans décider à la place de l’apprenant quelle option politique choisir.' },
      { question:'Pourquoi le contexte national est-il important ?', answer:'Une même étiquette peut renvoyer à des histoires, institutions ou coalitions partisanes différentes selon les pays.' },
    ],
    ctaTitle:'Apprends d’abord, puis teste tes connaissances',
    ctaText:'Utilise le glossaire, les exercices et les perspectives nationales sans modifier ton résultat personnel BELIEVE.',
    ctaLabel:'Explorer Apprendre',
  },
};

const ptBr: Record<SeoTopicSlug, SeoTopicContent> = {
  'political-spectrum': {
    ...en['political-spectrum'],
    eyebrow:'ESPECTRO POLÍTICO',
    title:'O que é um espectro político?',
    metaTitle:'Espectro político explicado: além de esquerda e direita',
    metaDescription:'Guia neutro sobre espectro político, esquerda e direita, modelos multidimensionais e por que o contexto de cada país muda os rótulos.',
    answer:'Um espectro político é um modelo que organiza posições políticas para facilitar a comparação entre semelhanças e diferenças. A linha esquerda–direita é o modelo mais conhecido, mas não é a única possibilidade e não descreve todos os desacordos políticos.',
    keyPoints:['Esquerda e direita são atalhos úteis, não identidades completas.','Economia, sociedade, instituições, nação e ecologia podem apontar em direções diferentes.','O significado de um rótulo muda entre países e períodos históricos.','Um modelo multidimensional mantém os desacordos visíveis em vez de comprimi-los em uma única nota.'],
    sections:[
      { heading:'Por que esquerda e direita continuam úteis', paragraphs:['Esquerda e direita são uma das formas mais conhecidas de resumir diferenças políticas. Podem mostrar padrões gerais sobre igualdade, mercados, redistribuição, tradição, autoridade e mudança social.','Mas um atalho continua sendo um atalho. Duas pessoas que se consideram de esquerda, direita, liberais ou conservadoras podem discordar muito sobre propriedade, liberdades civis, soberania, controles institucionais ou meio ambiente.'] },
      { heading:'Por que uma linha só esconde combinações importantes', paragraphs:['As opiniões políticas não se movem sempre juntas. Uma pessoa pode apoiar um Estado de bem-estar forte e propriedade privada, autonomia pessoal e mais poderes de ordem pública, ou decisão nacional e limites ecológicos rígidos.','Por isso o Politangle separa dilemas recorrentes. Os rótulos conhecidos continuam úteis, mas fica visível onde ajudam e onde param de explicar.'] },
      { heading:'O contexto do país importa', paragraphs:['Em alguns países, a disputa esquerda–direita organiza fortemente a política. Em outros, território, religião, etnia, desenho constitucional, segurança, alianças regionais, história de libertação ou redes de patronagem podem ser tão ou mais importantes.','O Politangle separa idioma e contexto nacional. As dimensões globais permanecem comparáveis, enquanto as páginas de países explicam o que não deve ser forçado dentro de um rótulo universal.'] },
    ],
    questions:[
      { question:'O espectro político é sempre esquerda contra direita?', answer:'Não. Esquerda–direita é o modelo mais conhecido, mas várias dimensões podem mostrar melhor diferenças que uma única linha esconde.' },
      { question:'Alguém pode ser de esquerda em um tema e de direita em outro?', answer:'Sim. Pessoas reais costumam combinar posições que os rótulos partidários colocam em lados diferentes.' },
      { question:'O Politangle atribui uma única ideologia?', answer:'Não. Primeiro mostra dimensões separadas e só depois usa tradições políticas amplas como referência interpretativa.' },
    ],
    ctaTitle:'Veja seu próprio padrão político',
    ctaText:'O Politangle Quick usa 26 afirmações para mostrar suas ideias em oito dimensões separadas.',
    ctaLabel:'Fazer Politangle Quick',
  },
  'left-vs-right-politics': {
    ...en['left-vs-right-politics'],
    eyebrow:'ESQUERDA E DIREITA',
    title:'Esquerda e direita na política: o que os rótulos explicam — e o que deixam de fora',
    metaTitle:'Esquerda e direita na política explicadas de forma neutra',
    metaDescription:'Explicação neutra de esquerda e direita, diferenças comuns, sobreposições, variação entre países e limites de um único eixo.',
    answer:'Esquerda e direita são grandes famílias políticas, não listas fixas. Em muitos contextos, a esquerda enfatiza mais igualdade e provisão coletiva; a direita, continuidade, propriedade, mercados, autoridade ou instituições herdadas. A combinação concreta varia por país e tradição.',
    keyPoints:['Nenhum lado possui um pacote político universal.','O eixo econômico e o eixo social liberal–conservador são relacionados, mas não idênticos.','Liberalismo, conservadorismo, socialismo e outras tradições têm debates internos.','Conflitos nacionais podem atravessar o eixo esquerda–direita.'],
    sections:[
      { heading:'O que “esquerda” costuma resumir', paragraphs:['A esquerda costuma ser associada a maior ênfase em igualdade, redistribuição, interesses trabalhistas e provisão coletiva. Diferentes tradições de esquerda discordam sobre mercados, propriedade pública, regulação, sindicatos, bem-estar e reforma.','Social-democratas, socialistas democráticos, verdes e social-liberais podem compartilhar alguns objetivos e ainda discordar fortemente sobre propriedade, crescimento, poder estatal ou velocidade da mudança.'] },
      { heading:'O que “direita” costuma resumir', paragraphs:['A direita costuma incluir tradições que dão mais peso à propriedade privada, coordenação de mercado, continuidade, autoridade, instituições nacionais ou práticas sociais herdadas. Esses compromissos não aparecem sempre juntos.','Liberais de mercado, democratas-cristãos, conservadores tradicionais, nacional-conservadores e correntes libertárias podem discordar sobre bem-estar, religião, liberdades civis, comércio, imigração e tamanho do Estado.'] },
      { heading:'Onde os rótulos deixam de funcionar bem', paragraphs:['Esquerda–direita explica menos quando o conflito central de um país é principalmente territorial, étnico, religioso, constitucional, regional ou de segurança. Também pode ser fraco quando a política gira em torno de personalidades e coalizões amplas.','O Politangle trata esquerda e direita como linguagem comparativa útil, não como uma forma obrigatória para todo país ou toda pessoa.'] },
    ],
    questions:[
      { question:'Liberal é sempre de esquerda?', answer:'Não. “Liberal” pode se referir a tradições econômicas, sociais e constitucionais diferentes e muda bastante de posição conforme o país.' },
      { question:'Conservador é sempre de direita?', answer:'O conservadorismo costuma ser associado à direita, mas suas correntes diferem muito sobre mercados, bem-estar, nação, instituições e política social.' },
      { question:'O que é o centro político?', answer:'O centro costuma descrever posições intermediárias ou combinações de tradições de esquerda e direita. Não existe um programa centrista universal.' },
    ],
    ctaTitle:'Vá além do rótulo',
    ctaText:'Veja se suas ideias econômicas, sociais, institucionais e nacionais realmente apontam na mesma direção.',
    ctaLabel:'Começar o Quick de 26 perguntas',
  },
  'political-ideologies': {
    ...en['political-ideologies'],
    eyebrow:'IDEOLOGIAS POLÍTICAS',
    title:'Ideologias políticas explicadas sem transformá-las em estereótipos',
    metaTitle:'Ideologias políticas explicadas: liberalismo, conservadorismo e mais',
    metaDescription:'Entenda ideologias como tradições com debates internos, não como rótulos rígidos de personalidade.',
    answer:'Uma ideologia política é uma forma estruturada de pensar sobre instituições, poder, direitos, sociedade e economia. Ideologias são tradições de argumento, não listas fechadas de políticas.',
    keyPoints:['Ideologias combinam valores, pressupostos e preferências institucionais.','A mesma ideologia pode se desenvolver de forma diferente em países distintos.','Rótulo partidário e rótulo ideológico não são a mesma coisa.','Entender uma ideologia não significa concordar com ela.'],
    sections:[
      { heading:'Por que ideologia é mais do que um rótulo', paragraphs:['Tradições políticas oferecem respostas recorrentes sobre liberdade, igualdade, propriedade, autoridade, comunidade, instituições e mudança. Elas ajudam a entender por que certas posições costumam aparecer juntas.','Mas cada tradição contém debates internos. O liberalismo discute liberdade e Estado; o conservadorismo, tradição, autoridade e mercados; correntes socialistas, propriedade, democracia e reforma.'] },
      { heading:'Separar crença e conhecimento', paragraphs:['É possível explicar corretamente o socialismo sem ser socialista, entender argumentos conservadores sem ser conservador ou reconhecer princípios liberais e discordar deles. Educação política não é o mesmo que identidade ideológica.','O Politangle separa BELIEVE de CLASSIFY e UNDERSTAND. BELIEVE mostra suas posições; CLASSIFY e UNDERSTAND testam conceitos, tradições e distinções.'] },
      { heading:'Por que ideologia precisa de contexto nacional', paragraphs:['Um rótulo pode viajar entre países e mudar de ênfase. “Liberal”, “conservador”, “social-democrata” ou “nacionalista” pode descrever coalizões, instituições e histórias diferentes.','Por isso o Politangle combina conceitos globais comparáveis com perspectivas por país quando o vocabulário local ou as linhas de conflito precisam de explicação adicional.'] },
    ],
    questions:[
      { question:'Quais são as principais ideologias políticas?', answer:'Não existe uma lista universal definitiva. Tradições comuns incluem liberalismo, conservadorismo, socialismo, social-democracia, política verde, nacionalismo, democracia cristã e correntes libertárias.' },
      { question:'É possível combinar várias ideologias?', answer:'Sim. Pessoas e partidos frequentemente combinam ideias associadas a mais de uma tradição.' },
      { question:'Ideologia é a mesma coisa que partido?', answer:'Não. Partido é uma organização que disputa poder político; ideologia é uma tradição de ideias. Um partido pode conter várias correntes.' },
    ],
    ctaTitle:'Entenda as tradições antes de testar seus conhecimentos',
    ctaText:'A seção Aprender explica termos políticos separadamente da sua avaliação pessoal.',
    ctaLabel:'Abrir Aprender',
  },
  'political-test': {
    ...en['political-test'],
    eyebrow:'TESTE POLÍTICO',
    title:'O que um teste político deveria medir de verdade?',
    metaTitle:'Teste de ideologia política: o que um teste multidimensional mede',
    metaDescription:'Como interpretar um teste político: crenças, dimensões, incerteza, rótulos, pontuação e limites de um único resultado esquerda–direita.',
    answer:'Um teste político útil deveria deixar claras suas perguntas, lógica de pontuação e limitações. Também deveria separar diferentes dilemas políticos em vez de forçar cada resposta para dentro de uma nota oculta de esquerda–direita.',
    keyPoints:['Um resultado é uma saída de modelo, não um diagnóstico.','Perguntas e lógica de pontuação deveriam ser examináveis.','“Não tenho certeza” não deveria virar silenciosamente uma posição política.','Rótulos ideológicos amplos deveriam vir depois das dimensões subjacentes.'],
    sections:[
      { heading:'Começar com perguntas políticas separadas', paragraphs:['Posições econômicas, sociais e institucionais não precisam se mover juntas. Uma pessoa pode apoiar redistribuição e propriedade privada, ou fortes controles institucionais e soberania nacional ao mesmo tempo.','O Politangle usa oito dimensões recorrentes para manter separados papel econômico do Estado, propriedade, valores sociais, autoridade, pluralismo, cooperação internacional, pertencimento nacional e ecologia.'] },
      { heading:'Tratar a incerteza com honestidade', paragraphs:['Questões políticas nem sempre são fáceis. A pessoa pode não ter informação suficiente ou estar realmente dividida entre objetivos. Transformar “não tenho certeza” em meio do espectro cria uma precisão falsa.','O Politangle mantém a incerteza separada. O resultado resume respostas dentro de um modelo; não é uma probabilidade científica de “ser” uma ideologia.'] },
      { heading:'Usar rótulos como orientação, não como veredicto', paragraphs:['Rótulos ajudam a navegar a linguagem política, mas não devem apagar diferenças por baixo deles. Dois perfis parecidos podem divergir bastante em autoridade, propriedade, nação ou ecologia.','Por isso as dimensões devem ser lidas primeiro. A página de método também separa claramente os testes técnicos da validação científica ainda não estabelecida.'] },
    ],
    questions:[
      { question:'O Politangle é um teste de esquerda–direita?', answer:'Não apenas. Ele mantém linguagem política conhecida, mas mostra oito dimensões separadamente antes de qualquer interpretação ampla.' },
      { question:'O resultado diz em quem devo votar?', answer:'Não. O Politangle é uma ferramenta educacional e de autoexploração; não recomenda candidatos, partidos ou votos.' },
      { question:'É um diagnóstico científico?', answer:'Não. O Politangle distingue consistência técnica de validade psicométrica ainda não estabelecida.' },
    ],
    ctaTitle:'Experimente a versão transparente',
    ctaText:'O Quick tem 26 perguntas. Método e versões das perguntas podem ser consultados separadamente.',
    ctaLabel:'Fazer Politangle Quick',
  },
  'political-literacy': {
    ...en['political-literacy'],
    eyebrow:'EDUCAÇÃO POLÍTICA',
    title:'O que é educação política prática?',
    metaTitle:'Educação política: conceitos, instituições e compreensão crítica',
    metaDescription:'Educação política vai além de fatos: conceitos, instituições, compreensão crítica e comparação cuidadosa apoiam a participação democrática.',
    answer:'Educação política prática é a capacidade de compreender conceitos, instituições, argumentos e evidências políticas o suficiente para interpretar o debate público e participar de forma refletida. Não é o mesmo que possuir uma opinião política específica.',
    keyPoints:['Conhecimento político e crença política são coisas diferentes.','Entender instituições importa tanto quanto conhecer rótulos ideológicos.','Leitura crítica inclui reconhecer enquadramento, dilemas e incerteza.','Educação política deve ajudar a comparar ideias sem dizer qual posição adotar.'],
    sections:[
      { heading:'Aprender sem dizer no que acreditar', paragraphs:['Uma ferramenta de educação política deve ajudar a distinguir conceitos, reconhecer tradições e entender instituições sem tratar uma posição como a resposta correta. Essa separação é especialmente importante em sala de aula.','O quadro de competências democráticas do Conselho da Europa separa conhecimento e compreensão crítica de valores, atitudes e habilidades. O Politangle segue um princípio relacionado: BELIEVE fica separado de CLASSIFY e UNDERSTAND.'] },
      { heading:'Por que o vocabulário importa', paragraphs:['Palavras como liberal, conservador, socialista, federal, populista, pluralista ou nacionalista têm história e debates internos. Quando viram apenas insultos ou identidades vagas, a discussão fica mais difícil de examinar.','Educação política também significa perguntar o que um termo quer dizer em um argumento específico, qual dilema institucional está envolvido e se a mesma palavra significa a mesma coisa em outro país.'] },
      { heading:'Educação política entre países', paragraphs:['Instituições e rótulos não funcionam igual em todos os sistemas. Federalismo, poder presidencial, monarquia, coalizões, autonomia territorial ou organização partidária podem mudar o sentido prático de uma afirmação política.','O Politangle combina materiais gerais com perspectivas nacionais: os conceitos globais continuam comparáveis e o vocabulário local recebe explicação própria.'] },
    ],
    questions:[
      { question:'Educação política é o mesmo que conhecimento político?', answer:'Conhecimento faz parte, mas educação política também envolve interpretar conceitos, instituições, argumentos, fontes e contexto.' },
      { question:'Educação política precisa dizer qual posição é correta?', answer:'Não. Ideias concorrentes podem ser explicadas comparativamente sem decidir pelo usuário qual escolha política fazer.' },
      { question:'Por que o contexto do país importa?', answer:'O mesmo rótulo pode representar histórias, instituições ou coalizões partidárias diferentes em países distintos.' },
    ],
    ctaTitle:'Aprenda primeiro e depois teste o que sabe',
    ctaText:'Use glossário, práticas e perspectivas por país sem alterar seu resultado pessoal de BELIEVE.',
    ctaLabel:'Explorar Aprender',
  },
};

export const seoTopicsByLocale: Record<Locale, Record<SeoTopicSlug, SeoTopicContent>> = { en, de, es, fr, 'pt-br': ptBr };

export const seoTopicSlugs = Object.keys(en) as SeoTopicSlug[];

export function getSeoTopic(locale: Locale, slug: SeoTopicSlug) {
  return seoTopicsByLocale[locale][slug];
}
