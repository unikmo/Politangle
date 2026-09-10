import type { DeepBeliefQuestion, LiteracyQuestion } from './deep-engine';

export const DEEP_QUESTIONNAIRE_VERSION = 'deep-2026.09-v1.2' as const;

export const deepBeliefQuestions: readonly DeepBeliefQuestion[] = [
  {
    id: 'B1', section: 'believe', axis: 'pluralism', construct: 'constitutional constraints on electoral majorities',
    negative: 'Winning an election gives a government a mandate, but courts, rights and constitutional rules should still be able to block some actions.',
    positive: 'Once a government has clearly won an election, unelected institutions should rarely prevent it from carrying out its program.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'B2', section: 'believe', axis: 'pluralism', construct: 'opposition and institutional pluralism',
    negative: 'A healthy political system should protect strong opposition parties, independent media and civic groups even when they obstruct the government.',
    positive: 'When political conflict becomes severe, government may need stronger powers to limit institutions or groups that continually obstruct the majority mandate.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'USHMM-FASCISM'],
  },
  {
    id: 'B3', section: 'believe', axis: 'ownership', construct: 'ownership of large enterprises',
    negative: 'A larger share of major enterprises should be publicly, cooperatively or socially owned rather than controlled mainly by private shareholders.',
    positive: 'Major enterprises should normally remain privately owned, even when government regulates them strongly.',
    evidenceIds: ['SEP-SOCIALISM', 'ROUTLEDGE-SOCIAL-DEMOCRACY', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY'],
  },
  {
    id: 'B4', section: 'believe', axis: 'ownership', construct: 'control of firms',
    negative: 'Workers should have substantially more democratic control over the major decisions of the firms in which they work.',
    positive: 'Owners and their appointed managers should retain final control of firms, while workers receive legal protections and a voice on workplace issues.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'B5', section: 'believe', axis: 'nativism', construct: 'basis of national membership',
    negative: 'People who become citizens should be regarded as equally belonging to the nation regardless of ancestry, religion or family origin.',
    positive: 'Historic cultural or ancestral belonging should carry additional weight in deciding who is fully part of the nation.',
    evidenceIds: ['SEP-NATIONALISM', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'B6', section: 'believe', axis: 'nativism', construct: 'national identity and cultural diversity',
    negative: 'A strong national identity can be shared by citizens who keep substantially different cultural traditions.',
    positive: 'National identity is strongest when citizens share a common inherited culture and newcomers adapt closely to it.',
    evidenceIds: ['SEP-NATIONALISM', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'B7', section: 'believe', axis: 'populism', construct: 'people versus elite framing',
    negative: 'Political conflict usually involves several legitimate interests and values, so no single side can claim to represent “the real people.”',
    positive: 'The central political conflict is often between ordinary people and a self-serving elite that ignores the people’s common interests.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'B8', section: 'believe', axis: 'populism', construct: 'general will versus compromise',
    negative: 'Political compromise among competing groups is a normal and legitimate part of democracy.',
    positive: 'When the people’s common will is clear, leaders should implement it even when established institutions and organized interests resist.',
    evidenceIds: ['MUDDE-POPULISM', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'B9', section: 'believe', axis: 'ecology', construct: 'ecological limits and growth',
    negative: 'In wealthy societies, ecological limits can justify deliberately accepting lower material growth or consumption.',
    positive: 'Economic growth should remain a central goal, with environmental harm addressed mainly through technology, pricing and regulation.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'B10', section: 'believe', axis: 'ecology', construct: 'depth of ecological change',
    negative: 'Serious environmental problems may require deeper changes to production, consumption and economic institutions, not only cleaner versions of current systems.',
    positive: 'Environmental problems can usually be addressed by improving existing markets, technology and regulation without major changes to economic institutions.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
] as const;

/**
 * Compact 15-question literacy form retained for the school baseline/practice
 * and its matched post-test. The public CLASSIFY and UNDERSTAND quizzes use
 * the separate 20+20 bank in literacy-questions.ts.
 */
export const deepLiteracyQuestions: readonly LiteracyQuestion[] = [
  {
    id: 'C1', section: 'classify',
    prompt: 'A movement accepts a predominantly capitalist economy but supports strong social insurance, public services, market regulation and redistribution to reduce inequality. Which tradition is the best fit?',
    options: [
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'socialism', label: 'Socialism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
    ],
    acceptedAnswerSets: [['social-democracy']],
    explanation: 'Modern social democracy generally retains a predominantly capitalist economy while regulating markets and using welfare and redistribution for social justice.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'C2', section: 'classify',
    prompt: 'A movement wants a substantial share of productive assets to be socially, publicly, cooperatively or worker controlled rather than mainly privately owned. Which broad political family best fits?',
    options: [
      { id: 'socialism', label: 'Socialism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['socialism']],
    explanation: 'Socialism is a broad political family defined in large part by social rather than predominantly private control of productive assets. Its institutional forms vary, so the broad family is the useful concept here.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'C3', section: 'classify',
    prompt: 'A political philosophy makes individual liberty central, strongly protects voluntary exchange and private property, and is highly skeptical of coercive state intervention. Which tradition is the best fit?',
    options: [
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'christian-democracy', label: 'Christian democracy' },
      { id: 'green-politics', label: 'Green politics' },
    ],
    acceptedAnswerSets: [['libertarianism']],
    explanation: 'Libertarianism treats individual freedom as paramount and generally gives strong protection to voluntary exchange and private property while limiting coercion.',
    evidenceIds: ['SEP-LIBERTARIANISM'],
  },
  {
    id: 'C4', section: 'classify',
    prompt: 'A movement values inherited institutions and living traditions and is skeptical of rapid reform based on abstract plans. Which tradition is the best fit?',
    options: [
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
      { id: 'populism', label: 'Populism' },
    ],
    acceptedAnswerSets: [['conservatism']],
    explanation: 'A major conservative tradition emphasizes continuity, inherited institutions and skepticism toward rapid or abstractly designed reform.',
    evidenceIds: ['SEP-CONSERVATISM'],
  },
  {
    id: 'C5', section: 'classify',
    prompt: 'A movement supports private property and markets, prefers gradual social change, and accepts welfare programs or regulation when they help preserve social cohesion. Which broad tradition fits best?',
    options: [
      { id: 'christian-democracy', label: 'Christian democracy' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'fascism', label: 'Fascism' },
    ],
    acceptedAnswerSets: [['conservatism']],
    explanation: 'Conservatism need not mean a minimal state. Conservative traditions can accept welfare institutions and regulation while retaining private property, continuity and gradual social change.',
    evidenceIds: ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN'],
  },
  {
    id: 'C6', section: 'classify',
    prompt: 'A movement treats ecological limits and a sustainable society as central political concerns and often links them to decentralization, grassroots democracy and social justice. Which tradition is the best fit?',
    options: [
      { id: 'green-politics', label: 'Green politics' },
      { id: 'classical-liberalism', label: 'Classical liberalism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['green-politics']],
    explanation: 'Green political thought centers ecological limits and sustainability and commonly connects them to grassroots democracy, decentralization, social justice and non-violence.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'C7', section: 'classify',
    prompt: 'In its Marxian ideal form, a movement seeks a classless and ultimately stateless society with collective appropriation and no private ownership of the means of production. Which tradition is being described?',
    options: [
      { id: 'communism', label: 'Communism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['communism']],
    explanation: 'The Marxian communist ideal is classless and stateless and rejects private ownership of the means of production; that ideal should not be collapsed into modern social democracy.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
  {
    id: 'C8', section: 'classify',
    prompt: 'A movement is ultranationalist and authoritarian, rejects political pluralism and individual rights, and opposes representative liberal democracy. Which ideology is the best fit?',
    options: [
      { id: 'fascism', label: 'Fascism' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['fascism']],
    explanation: 'Fascism is defined by a combination of ultranationalism, authoritarianism and rejection of pluralist liberal democracy; conservatism or nationalism alone is not equivalent to fascism.',
    evidenceIds: ['USHMM-FASCISM'],
  },
  {
    id: 'C9', section: 'classify',
    prompt: 'A movement says the nation has special political value and should have substantial self-determination, but tells you nothing else about markets, welfare or social policy. What can you conclude?',
    options: [
      { id: 'necessarily-right', label: 'It is necessarily right-wing.' },
      { id: 'necessarily-left', label: 'It is necessarily left-wing.' },
      { id: 'cross-cutting-nationalism', label: 'It expresses nationalism, but that alone does not determine a left-right position.' },
      { id: 'necessarily-fascist', label: 'It is necessarily fascist.' },
    ],
    acceptedAnswerSets: [['cross-cutting-nationalism']],
    explanation: 'Nationalism is a family of beliefs about nations and political self-determination that can combine with different economic and social ideologies.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'U1', section: 'understand',
    prompt: 'Which statement about populism is most accurate?',
    options: [
      { id: 'always-right', label: 'Populism is always a right-wing ideology.' },
      { id: 'always-left', label: 'Populism is always a left-wing ideology.' },
      { id: 'thin-host', label: 'Populism is often treated as a thin-centered ideology that can attach to different left- or right-wing host ideologies.' },
      { id: 'only-style', label: 'Populism has no ideological content and is only a speaking style.' },
    ],
    acceptedAnswerSets: [['thin-host']],
    explanation: 'A widely used academic definition treats populism as thin-centered: it opposes a pure people to a corrupt elite and can attach to different host ideologies.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'U2', section: 'understand',
    prompt: 'Which statement about nationalism is best supported?',
    options: [
      { id: 'always-fascism', label: 'Nationalism is another word for fascism.' },
      { id: 'always-right', label: 'Nationalism is inherently right-wing.' },
      { id: 'cross-cutting', label: 'Nationalism can combine with several ideological traditions, so additional beliefs are needed to place it politically.' },
      { id: 'no-politics', label: 'Nationalism has no political content.' },
    ],
    acceptedAnswerSets: [['cross-cutting']],
    explanation: 'Nationalism gives political significance to nations, but it has appeared in conservative, liberal, socialist and other forms; additional positions are needed to classify a broader ideology.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'U3', section: 'understand',
    prompt: 'What distinguishes liberal democracy from the minimal idea that elections are held?',
    options: [
      { id: 'elections-only', label: 'Nothing; elections alone are sufficient.' },
      { id: 'rights-checks', label: 'Civil liberties, rule of law and institutional checks on executive power are also central.' },
      { id: 'one-party', label: 'A single governing party must be able to act without opposition.' },
      { id: 'markets-required', label: 'Every major industry must be privately owned.' },
    ],
    acceptedAnswerSets: [['rights-checks']],
    explanation: 'Liberal-democracy measures add civil liberties, rule of law and checks and balances to electoral democracy.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'U4', section: 'understand',
    prompt: 'In much comparative far-right scholarship, what most clearly distinguishes the extreme right from the radical right?',
    options: [
      { id: 'taxes', label: 'The extreme right always favors higher taxes.' },
      { id: 'democracy', label: 'The extreme right is explicitly anti-democratic, whereas the radical right can accept procedural democracy while opposing important liberal-democratic constraints.' },
      { id: 'environment', label: 'The radical right always prioritizes environmental protection.' },
      { id: 'ownership', label: 'The extreme right always supports public ownership.' },
    ],
    acceptedAnswerSets: [['democracy']],
    explanation: 'A common distinction within the far-right umbrella turns on democracy: radical-right positions can be illiberal yet procedurally democratic, while the extreme right is anti-democratic.',
    evidenceIds: ['PIRRO-FAR-RIGHT', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'U5', section: 'understand',
    prompt: 'Which statement about liberalism is most accurate?',
    options: [
      { id: 'single-economic', label: 'Liberalism has one fixed economic program shared by all liberals.' },
      { id: 'diverse-family', label: 'Liberalism is a diverse family centered on liberty, with important disagreements about the meaning of liberty and the role of government.' },
      { id: 'anti-liberty', label: 'Liberalism treats individual liberty as politically unimportant.' },
      { id: 'same-socialism', label: 'Liberalism and socialism are identical traditions.' },
    ],
    acceptedAnswerSets: [['diverse-family']],
    explanation: 'Liberalism is a family of views united by the importance of liberty but divided over negative and positive liberty and the appropriate role of government.',
    evidenceIds: ['SEP-LIBERALISM'],
  },
  {
    id: 'U6', section: 'understand',
    prompt: 'Which statement about socialism is most accurate?',
    options: [
      { id: 'one-party', label: 'Socialism necessarily means a one-party state.' },
      { id: 'broad-family', label: 'Socialism is a broad family containing democratic as well as non-democratic historical forms and several models of social ownership.' },
      { id: 'same-welfare', label: 'Any welfare state is automatically socialist.' },
      { id: 'private-only', label: 'Socialism requires all productive assets to remain privately owned.' },
    ],
    acceptedAnswerSets: [['broad-family']],
    explanation: 'Socialism is a broad family with multiple institutional designs and forms of social ownership. Modern social democracy generally retains predominantly private ownership rather than replacing it.',
    evidenceIds: ['SEP-SOCIALISM', 'ROUTLEDGE-SOCIAL-DEMOCRACY'],
  },
] as const;

export const deepQuestions = [...deepBeliefQuestions, ...deepLiteracyQuestions] as const;
