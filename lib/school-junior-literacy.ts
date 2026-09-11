import type { LiteracyQuestion } from './deep-engine';

export type SchoolJuniorLiteracyLocale = 'en' | 'de' | 'es' | 'fr';

export const SCHOOL_JUNIOR_LITERACY_VERSION = 'school-junior-literacy-2026.09-v2' as const;

export const schoolJuniorLiteracyQuestions: readonly LiteracyQuestion[] = [
  {
    id: 'JQ1', section: 'classify',
    prompt: 'A movement wants workers or the public to own more big businesses. Which political family fits best?',
    options: [
      { id: 'socialism', label: 'Socialism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'nationalism', label: 'Nationalism' },
    ],
    acceptedAnswerSets: [['socialism']],
    explanation: 'Socialism gives social, public, cooperative or worker ownership an important role. It includes different ways of organizing an economy.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'JQ2', section: 'classify',
    prompt: 'One theory aims for no social classes, no state and no private owners of major businesses. Which idea is it?',
    options: [
      { id: 'communism', label: 'Communism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'liberalism', label: 'Liberalism' },
    ],
    acceptedAnswerSets: [['communism']],
    explanation: 'That is the Marxian communist ideal. In that end goal, social classes and the state disappear and major production is held in common rather than by private owners.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
  {
    id: 'JQ3', section: 'understand',
    prompt: 'A government wins an election. What else helps keep a democracy free?',
    options: [
      { id: 'win-only', label: 'Nothing. Winning an election is enough.' },
      { id: 'rights-checks', label: 'Rights, laws and independent checks on leaders.' },
      { id: 'ownership', label: 'The government owning most businesses.' },
      { id: 'one-party', label: 'Only one party being allowed to compete.' },
    ],
    acceptedAnswerSets: [['rights-checks']],
    explanation: 'Free democracy needs elections together with basic rights, laws that apply to leaders and real checks on government power.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'JQ4', section: 'understand',
    prompt: 'If government pays for healthcare, must it own every hospital?',
    options: [
      { id: 'yes-own', label: 'Yes. Paying for a service means owning it.' },
      { id: 'no-mix', label: 'No. Government can pay while different hospitals provide care.' },
      { id: 'tax', label: 'Only if taxes are high.' },
      { id: 'democracy', label: 'Only in a democracy.' },
    ],
    acceptedAnswerSets: [['no-mix']],
    explanation: 'Paying for a public service and owning the places that provide it are different choices. Public, private or mixed providers can all deliver publicly funded care.',
    evidenceIds: ['WVS-W7-DOCUMENTATION', 'ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'JQ5', section: 'understand',
    prompt: 'Does government owning a railway make a country communist?',
    options: [
      { id: 'any-public', label: 'Yes. Any public company means communism.' },
      { id: 'many-systems', label: 'No. Public companies can exist in many kinds of economy.' },
      { id: 'large', label: 'Yes, if the railway is very large.' },
      { id: 'private', label: 'No, because communism requires every company to be private.' },
    ],
    acceptedAnswerSets: [['many-systems']],
    explanation: 'No. Public ownership exists in many kinds of economy. Communism is a much broader idea about ownership, social class and the state.',
    evidenceIds: ['SEP-SOCIALISM', 'OXFORD-COMMUNISM'],
  },
  {
    id: 'JQ6', section: 'understand',
    prompt: 'If someone wants their country to make its own decisions, does that tell you whether they are left or right?',
    options: [
      { id: 'right', label: 'Yes. It always means right-wing.' },
      { id: 'left', label: 'Yes. It always means left-wing.' },
      { id: 'varies', label: 'No. Wanting national control can go with different economic and social views.' },
      { id: 'small', label: 'Only if the country is small.' },
    ],
    acceptedAnswerSets: [['varies']],
    explanation: 'Wanting a country to make its own decisions can matter to people from different political traditions. You need more information to understand their wider politics.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'JQ7', section: 'understand',
    prompt: 'A politician says ordinary people are good but a powerful elite is corrupt. Which idea is closest?',
    options: [
      { id: 'populism', label: 'Populism' },
      { id: 'green-politics', label: 'Green politics' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['populism']],
    explanation: 'A common definition of populism contrasts ordinary people with a corrupt or self-serving elite. Populism can combine with very different left- or right-wing programs.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'JQ8', section: 'understand',
    prompt: 'Most businesses are private, but government provides lots of healthcare and income help. Is the country automatically socialist?',
    options: [
      { id: 'welfare-enough', label: 'Yes. Lots of public help is enough.' },
      { id: 'private-can-remain', label: 'No. Public help can be large while businesses stay private.' },
      { id: 'healthcare', label: 'Yes, if healthcare is publicly funded.' },
      { id: 'no-welfare', label: 'No, because socialism never supports public help.' },
    ],
    acceptedAnswerSets: [['private-can-remain']],
    explanation: 'A large welfare state can exist in a mainly capitalist economy. Who owns or controls major businesses is a more important distinction when discussing socialism.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
] as const;

type LocalizedJuniorQuestion = { prompt: string; explanation: string; options: Record<string, string> };
type TranslationLocale = Exclude<SchoolJuniorLiteracyLocale, 'en'>;

const translations: Record<TranslationLocale, Record<string, LocalizedJuniorQuestion>> = {
  de: {
    JQ1: { prompt: 'Eine Bewegung will, dass Beschäftigte oder die Öffentlichkeit mehr große Unternehmen besitzen. Welche politische Richtung passt am besten?', explanation: 'Im Sozialismus spielen öffentliches, gemeinschaftliches, genossenschaftliches oder Eigentum der Beschäftigten eine wichtige Rolle. Es gibt unterschiedliche Modelle.', options: { socialism: 'Sozialismus', libertarianism: 'Libertarismus', conservatism: 'Konservatismus', nationalism: 'Nationalismus' } },
    JQ2: { prompt: 'Eine Theorie will keine sozialen Klassen, keinen Staat und keine privaten Eigentümer großer Unternehmen. Welche Idee ist das?', explanation: 'Das ist das marxistische kommunistische Ideal. Im Endziel verschwinden soziale Klassen und der Staat; große Produktionsmittel gehören nicht privaten Eigentümern.', options: { communism: 'Kommunismus', 'social-democracy': 'Sozialdemokratie', conservatism: 'Konservatismus', liberalism: 'Liberalismus' } },
    JQ3: { prompt: 'Eine Regierung gewinnt eine Wahl. Was hilft zusätzlich, eine Demokratie frei zu halten?', explanation: 'Eine freie Demokratie braucht Wahlen, Grundrechte, Regeln, die auch für Regierende gelten, und echte Kontrollen der Regierungsmacht.', options: { 'win-only': 'Nichts. Eine Wahl zu gewinnen reicht aus.', 'rights-checks': 'Rechte, Gesetze und unabhängige Kontrollen der Regierung.', ownership: 'Dass der Staat die meisten Unternehmen besitzt.', 'one-party': 'Dass nur eine Partei antreten darf.' } },
    JQ4: { prompt: 'Wenn der Staat Gesundheitsversorgung bezahlt, muss ihm dann jedes Krankenhaus gehören?', explanation: 'Eine öffentliche Leistung zu bezahlen und die Einrichtungen zu besitzen, die sie anbieten, sind verschiedene Entscheidungen. Öffentliche, private oder gemischte Anbieter sind möglich.', options: { 'yes-own': 'Ja. Bezahlen bedeutet auch besitzen.', 'no-mix': 'Nein. Der Staat kann zahlen, während verschiedene Krankenhäuser behandeln.', tax: 'Nur wenn die Steuern hoch sind.', democracy: 'Nur in einer Demokratie.' } },
    JQ5: { prompt: 'Macht eine staatliche Eisenbahn ein Land automatisch kommunistisch?', explanation: 'Nein. Staatseigentum gibt es in vielen Wirtschaftssystemen. Kommunismus ist eine viel umfassendere Idee über Eigentum, soziale Klassen und den Staat.', options: { 'any-public': 'Ja. Jedes staatliche Unternehmen bedeutet Kommunismus.', 'many-systems': 'Nein. Staatliche Unternehmen gibt es in vielen Wirtschaftssystemen.', large: 'Ja, wenn die Eisenbahn sehr groß ist.', private: 'Nein, weil im Kommunismus alle Unternehmen privat sein müssen.' } },
    JQ6: { prompt: 'Wenn jemand will, dass das eigene Land selbst entscheidet, sagt das schon links oder rechts?', explanation: 'Der Wunsch nach eigenen Entscheidungen des Landes kann Menschen aus verschiedenen politischen Richtungen wichtig sein. Für ihre übrige Politik braucht man mehr Informationen.', options: { right: 'Ja. Das bedeutet immer rechts.', left: 'Ja. Das bedeutet immer links.', varies: 'Nein. Nationale Kontrolle passt zu unterschiedlichen Wirtschafts- und Gesellschaftsideen.', small: 'Nur wenn das Land klein ist.' } },
    JQ7: { prompt: 'Ein Politiker sagt, normale Menschen seien gut, aber eine mächtige Elite sei korrupt. Welche Idee passt am besten?', explanation: 'Eine verbreitete Definition von Populismus stellt normale Menschen einer korrupten oder eigennützigen Elite gegenüber. Populismus kann mit sehr unterschiedlichen linken oder rechten Programmen verbunden sein.', options: { populism: 'Populismus', 'green-politics': 'Grüne Politik', 'social-democracy': 'Sozialdemokratie', libertarianism: 'Libertarismus' } },
    JQ8: { prompt: 'Die meisten Unternehmen sind privat, aber der Staat zahlt viel für Gesundheit und Einkommenshilfe. Ist das Land automatisch sozialistisch?', explanation: 'Ein großer Sozialstaat kann in einer überwiegend kapitalistischen Wirtschaft bestehen. Für Sozialismus ist wichtiger, wem große Unternehmen gehören oder wer sie kontrolliert.', options: { 'welfare-enough': 'Ja. Viel öffentliche Hilfe reicht aus.', 'private-can-remain': 'Nein. Öffentliche Hilfe kann groß sein, während Unternehmen privat bleiben.', healthcare: 'Ja, wenn Gesundheitsversorgung öffentlich finanziert wird.', 'no-welfare': 'Nein, weil Sozialismus öffentliche Hilfe nie unterstützt.' } },
  },
  es: {
    JQ1: { prompt: 'Un movimiento quiere que trabajadores o el público posean más empresas grandes. ¿Qué familia política encaja mejor?', explanation: 'En el socialismo, la propiedad social, pública, cooperativa o de los trabajadores tiene un papel importante. Existen distintos modelos.', options: { socialism: 'Socialismo', libertarianism: 'Libertarismo', conservatism: 'Conservadurismo', nationalism: 'Nacionalismo' } },
    JQ2: { prompt: 'Una teoría busca que no haya clases sociales, Estado ni dueños privados de grandes empresas. ¿Qué idea es?', explanation: 'Ese es el ideal comunista marxista. En ese objetivo final desaparecen las clases sociales y el Estado, y la gran producción no queda en manos de dueños privados.', options: { communism: 'Comunismo', 'social-democracy': 'Socialdemocracia', conservatism: 'Conservadurismo', liberalism: 'Liberalismo' } },
    JQ3: { prompt: 'Un gobierno gana unas elecciones. ¿Qué más ayuda a mantener libre una democracia?', explanation: 'Una democracia libre necesita elecciones, derechos básicos, leyes que también obliguen a quienes gobiernan y controles reales sobre el poder.', options: { 'win-only': 'Nada. Ganar unas elecciones basta.', 'rights-checks': 'Derechos, leyes y controles independientes sobre los gobernantes.', ownership: 'Que el gobierno posea la mayoría de las empresas.', 'one-party': 'Que solo un partido pueda competir.' } },
    JQ4: { prompt: 'Si el gobierno paga la sanidad, ¿tiene que ser dueño de todos los hospitales?', explanation: 'Pagar un servicio público y poseer los centros que lo prestan son decisiones diferentes. Puede haber proveedores públicos, privados o mixtos.', options: { 'yes-own': 'Sí. Pagar un servicio significa poseerlo.', 'no-mix': 'No. El gobierno puede pagar y distintos hospitales prestar la atención.', tax: 'Solo si los impuestos son altos.', democracy: 'Solo en una democracia.' } },
    JQ5: { prompt: '¿Que el gobierno posea un ferrocarril convierte al país en comunista?', explanation: 'No. La propiedad pública existe en muchos tipos de economía. El comunismo es una idea mucho más amplia sobre propiedad, clases sociales y Estado.', options: { 'any-public': 'Sí. Cualquier empresa pública significa comunismo.', 'many-systems': 'No. Puede haber empresas públicas en muchas economías.', large: 'Sí, si el ferrocarril es muy grande.', private: 'No, porque el comunismo exige que todas las empresas sean privadas.' } },
    JQ6: { prompt: 'Si alguien quiere que su país tome sus propias decisiones, ¿eso dice si es de izquierda o derecha?', explanation: 'Querer que el país tome sus propias decisiones puede importar a personas de tradiciones políticas distintas. Hace falta más información para entender sus demás ideas.', options: { right: 'Sí. Siempre significa derecha.', left: 'Sí. Siempre significa izquierda.', varies: 'No. Querer control nacional puede ir con ideas económicas y sociales distintas.', small: 'Solo si el país es pequeño.' } },
    JQ7: { prompt: 'Un político dice que la gente corriente es buena pero una élite poderosa es corrupta. ¿Qué idea encaja mejor?', explanation: 'Una definición común del populismo enfrenta a la gente corriente con una élite corrupta o egoísta. Puede combinarse con programas muy distintos de izquierda o derecha.', options: { populism: 'Populismo', 'green-politics': 'Política verde', 'social-democracy': 'Socialdemocracia', libertarianism: 'Libertarismo' } },
    JQ8: { prompt: 'La mayoría de empresas son privadas, pero el gobierno da mucha ayuda sanitaria y económica. ¿Es automáticamente socialista?', explanation: 'Un gran Estado de bienestar puede existir en una economía principalmente capitalista. Para hablar de socialismo importa más quién posee o controla las grandes empresas.', options: { 'welfare-enough': 'Sí. Mucha ayuda pública es suficiente.', 'private-can-remain': 'No. La ayuda pública puede ser amplia y las empresas seguir privadas.', healthcare: 'Sí, si la sanidad tiene financiación pública.', 'no-welfare': 'No, porque el socialismo nunca apoya la ayuda pública.' } },
  },
  fr: {
    JQ1: { prompt: 'Un mouvement veut que les salariés ou le public possèdent davantage de grandes entreprises. Quelle famille politique correspond le mieux ?', explanation: 'Dans le socialisme, la propriété sociale, publique, coopérative ou détenue par les travailleurs joue un rôle important. Plusieurs modèles existent.', options: { socialism: 'Socialisme', libertarianism: 'Libertarianisme', conservatism: 'Conservatisme', nationalism: 'Nationalisme' } },
    JQ2: { prompt: 'Une théorie vise une société sans classes sociales, sans État et sans propriétaires privés des grandes entreprises. Quelle idée est-ce ?', explanation: 'C’est l’idéal communiste marxiste. Dans cet objectif final, les classes sociales et l’État disparaissent et la grande production n’appartient pas à des propriétaires privés.', options: { communism: 'Communisme', 'social-democracy': 'Social-démocratie', conservatism: 'Conservatisme', liberalism: 'Libéralisme' } },
    JQ3: { prompt: 'Un gouvernement gagne une élection. Qu’est-ce qui aide aussi à garder une démocratie libre ?', explanation: 'Une démocratie libre a besoin d’élections, de droits fondamentaux, de lois qui s’appliquent aussi aux dirigeants et de vrais contrôles du pouvoir.', options: { 'win-only': 'Rien. Gagner une élection suffit.', 'rights-checks': 'Des droits, des lois et des contrôles indépendants des dirigeants.', ownership: 'Que le gouvernement possède la plupart des entreprises.', 'one-party': 'Qu’un seul parti soit autorisé à se présenter.' } },
    JQ4: { prompt: 'Si l’État finance les soins de santé, doit-il posséder tous les hôpitaux ?', explanation: 'Financer un service public et posséder les lieux qui le fournissent sont deux choix différents. Les prestataires peuvent être publics, privés ou mixtes.', options: { 'yes-own': 'Oui. Payer un service signifie le posséder.', 'no-mix': 'Non. L’État peut payer et différents hôpitaux fournir les soins.', tax: 'Seulement si les impôts sont élevés.', democracy: 'Seulement dans une démocratie.' } },
    JQ5: { prompt: 'Le fait que l’État possède une compagnie ferroviaire rend-il le pays communiste ?', explanation: 'Non. La propriété publique existe dans de nombreux types d’économie. Le communisme est une idée beaucoup plus large sur la propriété, les classes sociales et l’État.', options: { 'any-public': 'Oui. Toute entreprise publique signifie le communisme.', 'many-systems': 'Non. Des entreprises publiques existent dans de nombreuses économies.', large: 'Oui, si le réseau ferroviaire est très grand.', private: 'Non, car le communisme exige que toutes les entreprises soient privées.' } },
    JQ6: { prompt: 'Si quelqu’un veut que son pays décide lui-même, cela dit-il s’il est de gauche ou de droite ?', explanation: 'Vouloir que son pays prenne lui-même ses décisions peut compter pour des personnes de traditions politiques différentes. Il faut plus d’informations pour comprendre leurs autres idées.', options: { right: 'Oui. Cela signifie toujours la droite.', left: 'Oui. Cela signifie toujours la gauche.', varies: 'Non. Vouloir le contrôle national peut aller avec des idées économiques et sociales différentes.', small: 'Seulement si le pays est petit.' } },
    JQ7: { prompt: 'Un responsable dit que les gens ordinaires sont bons mais qu’une élite puissante est corrompue. Quelle idée correspond le mieux ?', explanation: 'Une définition courante du populisme oppose les gens ordinaires à une élite corrompue ou intéressée. Il peut se combiner avec des programmes très différents de gauche ou de droite.', options: { populism: 'Populisme', 'green-politics': 'Écologie politique', 'social-democracy': 'Social-démocratie', libertarianism: 'Libertarianisme' } },
    JQ8: { prompt: 'La plupart des entreprises sont privées, mais l’État fournit beaucoup d’aide pour la santé et les revenus. Est-ce automatiquement socialiste ?', explanation: 'Un grand État-providence peut exister dans une économie surtout capitaliste. Pour parler de socialisme, il importe davantage de savoir qui possède ou contrôle les grandes entreprises.', options: { 'welfare-enough': 'Oui. Beaucoup d’aide publique suffit.', 'private-can-remain': 'Non. L’aide publique peut être importante et les entreprises rester privées.', healthcare: 'Oui, si les soins sont financés publiquement.', 'no-welfare': 'Non, car le socialisme ne soutient jamais l’aide publique.' } },
  },
};

export function schoolJuniorLiteracyPrompt(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion) { return locale === 'en' ? question.prompt : translations[locale][question.id]?.prompt ?? question.prompt; }
export function schoolJuniorLiteracyExplanation(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion) { return locale === 'en' ? question.explanation : translations[locale][question.id]?.explanation ?? question.explanation; }
export function schoolJuniorLiteracyOption(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion, optionId: string) { const fallback = question.options.find((option) => option.id === optionId)?.label ?? optionId; return locale === 'en' ? fallback : translations[locale][question.id]?.options[optionId] ?? fallback; }
