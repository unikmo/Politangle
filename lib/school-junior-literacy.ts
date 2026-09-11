import type { LiteracyQuestion } from './deep-engine';

export type SchoolJuniorLiteracyLocale = 'en' | 'de' | 'es' | 'fr';

export const SCHOOL_JUNIOR_LITERACY_VERSION = 'school-junior-literacy-2026.09-v1' as const;

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
    prompt: 'A theory aims for a classless society with no state and no private ownership of major production. Which is it?',
    options: [
      { id: 'communism', label: 'Communism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'liberalism', label: 'Liberalism' },
    ],
    acceptedAnswerSets: [['communism']],
    explanation: 'That is the Marxian communist ideal: a classless and ultimately stateless society without private ownership of the means of production.',
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
    explanation: 'Liberal democracy needs elections together with civil liberties, rule of law and meaningful checks on government power.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'JQ4', section: 'understand',
    prompt: 'If government pays for healthcare, must it own every hospital?',
    options: [
      { id: 'yes-own', label: 'Yes. Paying for a service means owning it.' },
      { id: 'no-mix', label: 'No. Government can pay while different organizations provide care.' },
      { id: 'tax', label: 'Only if taxes are high.' },
      { id: 'democracy', label: 'Only in a democracy.' },
    ],
    acceptedAnswerSets: [['no-mix']],
    explanation: 'Funding a public service and owning the organizations that deliver it are different choices. Public, private or mixed providers can deliver publicly funded care.',
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
    explanation: 'No. Public ownership exists in many kinds of economy. Communism is a much broader idea about ownership, class and the state.',
    evidenceIds: ['SEP-SOCIALISM', 'OXFORD-COMMUNISM'],
  },
  {
    id: 'JQ6', section: 'understand',
    prompt: 'If someone wants their country to make its own decisions, does that tell you whether they are left or right?',
    options: [
      { id: 'right', label: 'Yes. It always means right-wing.' },
      { id: 'left', label: 'Yes. It always means left-wing.' },
      { id: 'varies', label: 'No. National self-government can go with different economic and social views.' },
      { id: 'small', label: 'Only if the country is small.' },
    ],
    acceptedAnswerSets: [['varies']],
    explanation: 'National self-government can be important to people from different political traditions. You need more information to place their wider politics.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'JQ7', section: 'understand',
    prompt: 'A politician says ordinary people are good and the establishment is corrupt. Which idea is closest?',
    options: [
      { id: 'populism', label: 'Populism' },
      { id: 'green-politics', label: 'Green politics' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['populism']],
    explanation: 'A common definition of populism contrasts a good or authentic people with a corrupt establishment. Populism can combine with different left- or right-wing programs.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'JQ8', section: 'understand',
    prompt: 'A country has a large welfare state and mostly private businesses. Is it automatically socialist?',
    options: [
      { id: 'welfare-enough', label: 'Yes. A large welfare state is enough.' },
      { id: 'private-can-remain', label: 'No. Welfare can be large while most businesses stay privately owned.' },
      { id: 'healthcare', label: 'Yes, if healthcare is publicly funded.' },
      { id: 'no-welfare', label: 'No, because socialism never supports welfare.' },
    ],
    acceptedAnswerSets: [['private-can-remain']],
    explanation: 'A welfare state can exist in a mainly capitalist economy. Social ownership or control is a more important distinction when discussing socialism.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
] as const;

type LocalizedJuniorQuestion = {
  prompt: string;
  explanation: string;
  options: Record<string, string>;
};

type TranslationLocale = Exclude<SchoolJuniorLiteracyLocale, 'en'>;

const translations: Record<TranslationLocale, Record<string, LocalizedJuniorQuestion>> = {
  de: {
    JQ1: { prompt: 'Eine Bewegung will, dass Beschäftigte oder die Öffentlichkeit mehr große Unternehmen besitzen. Welche politische Richtung passt am besten?', explanation: 'Im Sozialismus spielen öffentliches, gemeinschaftliches, genossenschaftliches oder Eigentum der Beschäftigten eine wichtige Rolle. Es gibt unterschiedliche Modelle.', options: { socialism: 'Sozialismus', libertarianism: 'Libertarismus', conservatism: 'Konservatismus', nationalism: 'Nationalismus' } },
    JQ2: { prompt: 'Eine Theorie strebt eine klassenlose Gesellschaft ohne Staat und ohne Privateigentum an großen Produktionsmitteln an. Welche ist das?', explanation: 'Das ist das marxistische kommunistische Ideal: eine klassenlose und letztlich staatenlose Gesellschaft ohne Privateigentum an den Produktionsmitteln.', options: { communism: 'Kommunismus', 'social-democracy': 'Sozialdemokratie', conservatism: 'Konservatismus', liberalism: 'Liberalismus' } },
    JQ3: { prompt: 'Eine Regierung gewinnt eine Wahl. Was hilft zusätzlich, eine Demokratie frei zu halten?', explanation: 'Eine liberale Demokratie braucht Wahlen zusammen mit Grundrechten, Rechtsstaatlichkeit und wirksamen Kontrollen der Regierungsmacht.', options: { 'win-only': 'Nichts. Eine Wahl zu gewinnen reicht aus.', 'rights-checks': 'Rechte, Gesetze und unabhängige Kontrollen der Regierung.', ownership: 'Dass der Staat die meisten Unternehmen besitzt.', 'one-party': 'Dass nur eine Partei antreten darf.' } },
    JQ4: { prompt: 'Wenn der Staat Gesundheitsversorgung bezahlt, muss ihm dann jedes Krankenhaus gehören?', explanation: 'Eine öffentliche Leistung zu finanzieren und die Einrichtungen zu besitzen, die sie anbieten, sind verschiedene Entscheidungen. Öffentliche, private oder gemischte Anbieter sind möglich.', options: { 'yes-own': 'Ja. Bezahlen bedeutet auch besitzen.', 'no-mix': 'Nein. Der Staat kann zahlen, während verschiedene Einrichtungen behandeln.', tax: 'Nur wenn die Steuern hoch sind.', democracy: 'Nur in einer Demokratie.' } },
    JQ5: { prompt: 'Macht eine staatliche Eisenbahn ein Land automatisch kommunistisch?', explanation: 'Nein. Staatseigentum gibt es in vielen Wirtschaftssystemen. Kommunismus ist eine viel umfassendere Idee über Eigentum, Klassen und den Staat.', options: { 'any-public': 'Ja. Jedes staatliche Unternehmen bedeutet Kommunismus.', 'many-systems': 'Nein. Staatliche Unternehmen gibt es in vielen Wirtschaftssystemen.', large: 'Ja, wenn die Eisenbahn sehr groß ist.', private: 'Nein, weil im Kommunismus alle Unternehmen privat sein müssen.' } },
    JQ6: { prompt: 'Wenn jemand will, dass das eigene Land selbst entscheidet, sagt das schon links oder rechts?', explanation: 'Nationale Selbstbestimmung kann Menschen aus verschiedenen politischen Richtungen wichtig sein. Für ihre übrige Politik braucht man mehr Informationen.', options: { right: 'Ja. Das bedeutet immer rechts.', left: 'Ja. Das bedeutet immer links.', varies: 'Nein. Nationale Selbstbestimmung passt zu unterschiedlichen Wirtschafts- und Gesellschaftsideen.', small: 'Nur wenn das Land klein ist.' } },
    JQ7: { prompt: 'Ein Politiker sagt, normale Menschen seien gut und das Establishment sei korrupt. Welche Idee passt am besten?', explanation: 'Eine verbreitete Definition von Populismus stellt ein gutes oder echtes Volk einem korrupten Establishment gegenüber. Populismus kann mit linken oder rechten Programmen verbunden sein.', options: { populism: 'Populismus', 'green-politics': 'Grüne Politik', 'social-democracy': 'Sozialdemokratie', libertarianism: 'Libertarismus' } },
    JQ8: { prompt: 'Ein Land hat einen großen Sozialstaat und meist private Unternehmen. Ist es deshalb automatisch sozialistisch?', explanation: 'Ein großer Sozialstaat kann in einer überwiegend kapitalistischen Wirtschaft bestehen. Für Sozialismus ist gesellschaftliches Eigentum oder Kontrolle wichtiger.', options: { 'welfare-enough': 'Ja. Ein großer Sozialstaat reicht aus.', 'private-can-remain': 'Nein. Der Sozialstaat kann groß sein, obwohl Unternehmen meist privat bleiben.', healthcare: 'Ja, wenn Gesundheitsversorgung öffentlich finanziert wird.', 'no-welfare': 'Nein, weil Sozialismus nie einen Sozialstaat unterstützt.' } },
  },
  es: {
    JQ1: { prompt: 'Un movimiento quiere que trabajadores o el público posean más empresas grandes. ¿Qué familia política encaja mejor?', explanation: 'En el socialismo, la propiedad social, pública, cooperativa o de los trabajadores tiene un papel importante. Existen distintos modelos.', options: { socialism: 'Socialismo', libertarianism: 'Libertarismo', conservatism: 'Conservadurismo', nationalism: 'Nacionalismo' } },
    JQ2: { prompt: 'Una teoría busca una sociedad sin clases, sin Estado y sin propiedad privada de la gran producción. ¿Cuál es?', explanation: 'Ese es el ideal comunista marxista: una sociedad sin clases y finalmente sin Estado, sin propiedad privada de los medios de producción.', options: { communism: 'Comunismo', 'social-democracy': 'Socialdemocracia', conservatism: 'Conservadurismo', liberalism: 'Liberalismo' } },
    JQ3: { prompt: 'Un gobierno gana unas elecciones. ¿Qué más ayuda a mantener libre una democracia?', explanation: 'La democracia liberal necesita elecciones junto con derechos civiles, Estado de derecho y controles reales sobre el poder del gobierno.', options: { 'win-only': 'Nada. Ganar unas elecciones basta.', 'rights-checks': 'Derechos, leyes y controles independientes sobre los gobernantes.', ownership: 'Que el gobierno posea la mayoría de las empresas.', 'one-party': 'Que solo un partido pueda competir.' } },
    JQ4: { prompt: 'Si el gobierno paga la sanidad, ¿tiene que ser dueño de todos los hospitales?', explanation: 'Financiar un servicio público y poseer las organizaciones que lo prestan son decisiones diferentes. Puede haber proveedores públicos, privados o mixtos.', options: { 'yes-own': 'Sí. Pagar un servicio significa poseerlo.', 'no-mix': 'No. El gobierno puede pagar y distintos centros prestar la atención.', tax: 'Solo si los impuestos son altos.', democracy: 'Solo en una democracia.' } },
    JQ5: { prompt: '¿Que el gobierno posea un ferrocarril convierte al país en comunista?', explanation: 'No. La propiedad pública existe en muchos tipos de economía. El comunismo es una idea mucho más amplia sobre propiedad, clases y Estado.', options: { 'any-public': 'Sí. Cualquier empresa pública significa comunismo.', 'many-systems': 'No. Puede haber empresas públicas en muchas economías.', large: 'Sí, si el ferrocarril es muy grande.', private: 'No, porque el comunismo exige que todas las empresas sean privadas.' } },
    JQ6: { prompt: 'Si alguien quiere que su país tome sus propias decisiones, ¿eso dice si es de izquierda o derecha?', explanation: 'El autogobierno nacional puede importar a personas de tradiciones políticas distintas. Hace falta más información para situar sus demás ideas.', options: { right: 'Sí. Siempre significa derecha.', left: 'Sí. Siempre significa izquierda.', varies: 'No. El autogobierno nacional puede ir con ideas económicas y sociales distintas.', small: 'Solo si el país es pequeño.' } },
    JQ7: { prompt: 'Un político dice que la gente corriente es buena y el establishment es corrupto. ¿Qué idea encaja mejor?', explanation: 'Una definición común del populismo enfrenta a un pueblo bueno o auténtico con un establishment corrupto. Puede combinarse con programas de izquierda o derecha.', options: { populism: 'Populismo', 'green-politics': 'Política verde', 'social-democracy': 'Socialdemocracia', libertarianism: 'Libertarismo' } },
    JQ8: { prompt: 'Un país tiene un gran Estado de bienestar y empresas sobre todo privadas. ¿Es automáticamente socialista?', explanation: 'Puede existir un gran Estado de bienestar en una economía principalmente capitalista. La propiedad o control social es una distinción más importante para hablar de socialismo.', options: { 'welfare-enough': 'Sí. Un gran Estado de bienestar basta.', 'private-can-remain': 'No. El bienestar puede ser amplio y las empresas seguir siendo privadas.', healthcare: 'Sí, si la sanidad tiene financiación pública.', 'no-welfare': 'No, porque el socialismo nunca apoya el bienestar.' } },
  },
  fr: {
    JQ1: { prompt: 'Un mouvement veut que les salariés ou le public possèdent davantage de grandes entreprises. Quelle famille politique correspond le mieux ?', explanation: 'Dans le socialisme, la propriété sociale, publique, coopérative ou détenue par les travailleurs joue un rôle important. Plusieurs modèles existent.', options: { socialism: 'Socialisme', libertarianism: 'Libertarianisme', conservatism: 'Conservatisme', nationalism: 'Nationalisme' } },
    JQ2: { prompt: 'Une théorie vise une société sans classes, sans État et sans propriété privée des grands moyens de production. Laquelle ?', explanation: 'C’est l’idéal communiste marxiste : une société sans classes et finalement sans État, sans propriété privée des moyens de production.', options: { communism: 'Communisme', 'social-democracy': 'Social-démocratie', conservatism: 'Conservatisme', liberalism: 'Libéralisme' } },
    JQ3: { prompt: 'Un gouvernement gagne une élection. Qu’est-ce qui aide aussi à garder une démocratie libre ?', explanation: 'La démocratie libérale a besoin d’élections, mais aussi de libertés civiles, d’un État de droit et de contrôles réels du pouvoir.', options: { 'win-only': 'Rien. Gagner une élection suffit.', 'rights-checks': 'Des droits, des lois et des contrôles indépendants des dirigeants.', ownership: 'Que le gouvernement possède la plupart des entreprises.', 'one-party': 'Qu’un seul parti soit autorisé à se présenter.' } },
    JQ4: { prompt: 'Si l’État finance les soins de santé, doit-il posséder tous les hôpitaux ?', explanation: 'Financer un service public et posséder les organisations qui le fournissent sont deux choix différents. Les prestataires peuvent être publics, privés ou mixtes.', options: { 'yes-own': 'Oui. Payer un service signifie le posséder.', 'no-mix': 'Non. L’État peut payer et différents établissements fournir les soins.', tax: 'Seulement si les impôts sont élevés.', democracy: 'Seulement dans une démocratie.' } },
    JQ5: { prompt: 'Le fait que l’État possède une compagnie ferroviaire rend-il le pays communiste ?', explanation: 'Non. La propriété publique existe dans de nombreux types d’économie. Le communisme est une idée beaucoup plus large sur la propriété, les classes et l’État.', options: { 'any-public': 'Oui. Toute entreprise publique signifie le communisme.', 'many-systems': 'Non. Des entreprises publiques existent dans de nombreuses économies.', large: 'Oui, si le réseau ferroviaire est très grand.', private: 'Non, car le communisme exige que toutes les entreprises soient privées.' } },
    JQ6: { prompt: 'Si quelqu’un veut que son pays décide lui-même, cela dit-il s’il est de gauche ou de droite ?', explanation: 'L’autonomie nationale peut compter pour des personnes de traditions politiques différentes. Il faut plus d’informations pour situer leurs autres idées.', options: { right: 'Oui. Cela signifie toujours la droite.', left: 'Oui. Cela signifie toujours la gauche.', varies: 'Non. L’autonomie nationale peut aller avec des idées économiques et sociales différentes.', small: 'Seulement si le pays est petit.' } },
    JQ7: { prompt: 'Un responsable dit que les gens ordinaires sont bons et que l’establishment est corrompu. Quelle idée correspond le mieux ?', explanation: 'Une définition courante du populisme oppose un peuple bon ou authentique à un establishment corrompu. Il peut se combiner avec des programmes de gauche ou de droite.', options: { populism: 'Populisme', 'green-politics': 'Écologie politique', 'social-democracy': 'Social-démocratie', libertarianism: 'Libertarianisme' } },
    JQ8: { prompt: 'Un pays a un grand État-providence et surtout des entreprises privées. Est-il automatiquement socialiste ?', explanation: 'Un grand État-providence peut exister dans une économie surtout capitaliste. La propriété ou le contrôle social est une distinction plus importante pour parler de socialisme.', options: { 'welfare-enough': 'Oui. Un grand État-providence suffit.', 'private-can-remain': 'Non. La protection sociale peut être forte et les entreprises rester privées.', healthcare: 'Oui, si les soins sont financés publiquement.', 'no-welfare': 'Non, car le socialisme ne soutient jamais la protection sociale.' } },
  },
};

export function schoolJuniorLiteracyPrompt(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion) {
  return locale === 'en' ? question.prompt : translations[locale][question.id]?.prompt ?? question.prompt;
}

export function schoolJuniorLiteracyExplanation(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion) {
  return locale === 'en' ? question.explanation : translations[locale][question.id]?.explanation ?? question.explanation;
}

export function schoolJuniorLiteracyOption(locale: SchoolJuniorLiteracyLocale, question: LiteracyQuestion, optionId: string) {
  const fallback = question.options.find((option) => option.id === optionId)?.label ?? optionId;
  return locale === 'en' ? fallback : translations[locale][question.id]?.options[optionId] ?? fallback;
}
