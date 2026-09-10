import { deepLiteracyQuestions } from './deep-bank';
import type { LiteracyQuestion } from './deep-engine';

export const SCHOOL_LITERACY_VERSION = 'school-literacy-2026.09-v2-reader' as const;

export type SchoolLiteracyQuestion = LiteracyQuestion & {
  parallelOf: string;
  topic: string;
};

// School baseline/practice stays deliberately shorter than the public 20+20
// literacy quizzes. It samples nine CLASSIFY and six UNDERSTAND targets so a
// teacher can use pre/post measures without turning a lesson into an 80-item test.
const schoolBaselineIds = [
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9',
  'U1', 'U2', 'U3', 'U4', 'U5', 'U6',
] as const;

export const schoolBaselineQuestions: readonly LiteracyQuestion[] = schoolBaselineIds
  .map((id) => deepLiteracyQuestions.find((question) => question.id === id))
  .filter((question): question is LiteracyQuestion => Boolean(question));

export const schoolPracticeQuestions = schoolBaselineQuestions;

/**
 * Parallel-form candidate for the school post-test.
 *
 * The post-test measures the same 9 CLASSIFY + 6 UNDERSTAND learning targets
 * as the baseline but uses different wording and scenarios. It is a content-
 * matched candidate, not yet an empirically equated test form.
 */
export const schoolPostQuestions: readonly SchoolLiteracyQuestion[] = [
  {
    id: 'SC1',
    parallelOf: 'C1',
    topic: 'social-democracy',
    section: 'classify',
    prompt: 'A party keeps most companies private but expands public healthcare, social insurance, worker protections and progressive taxes. Which tradition fits best?',
    options: [
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'socialism', label: 'Socialism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
    ],
    acceptedAnswerSets: [['social-democracy']],
    explanation: 'Social democracy generally keeps a mainly capitalist economy while using public services, regulation and redistribution to pursue social justice.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'SC2',
    parallelOf: 'C2',
    topic: 'socialism',
    section: 'classify',
    prompt: 'A movement wants much more worker, cooperative or public ownership of large companies instead of ownership being mainly private. Which broad family fits best?',
    options: [
      { id: 'socialism', label: 'Socialism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['socialism']],
    explanation: 'Socialism is the broad family in which social, public, cooperative or worker ownership plays a central role.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'SC3',
    parallelOf: 'C3',
    topic: 'libertarianism',
    section: 'classify',
    prompt: 'A philosophy puts individual freedom, private property and voluntary exchange first and wants government coercion kept very limited. Which tradition fits best?',
    options: [
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'christian-democracy', label: 'Christian democracy' },
      { id: 'green-politics', label: 'Green politics' },
    ],
    acceptedAnswerSets: [['libertarianism']],
    explanation: 'Libertarianism gives especially strong priority to individual freedom, property and voluntary exchange while limiting coercive state power.',
    evidenceIds: ['SEP-LIBERTARIANISM'],
  },
  {
    id: 'SC4',
    parallelOf: 'C4',
    topic: 'conservatism',
    section: 'classify',
    prompt: 'A movement trusts inherited institutions, prefers gradual change and is wary of sweeping reforms designed from abstract plans. Which tradition fits best?',
    options: [
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
      { id: 'populism', label: 'Populism' },
    ],
    acceptedAnswerSets: [['conservatism']],
    explanation: 'A major conservative tradition emphasizes continuity, inherited institutions and caution about rapid or abstractly designed reform.',
    evidenceIds: ['SEP-CONSERVATISM'],
  },
  {
    id: 'SC5',
    parallelOf: 'C5',
    topic: 'conservatism',
    section: 'classify',
    prompt: 'A movement supports markets and private property, prefers gradual social change, and accepts welfare or regulation when these help social stability. Which broad tradition fits best?',
    options: [
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
    ],
    acceptedAnswerSets: [['conservatism']],
    explanation: 'Conservatism can support private property while also accepting welfare and regulation for reasons of obligation, stability and social cohesion.',
    evidenceIds: ['SEP-CONSERVATISM', 'CHES-ECON-GALTAN'],
  },
  {
    id: 'SC6',
    parallelOf: 'C6',
    topic: 'green-politics',
    section: 'classify',
    prompt: 'A movement puts ecological limits and long-term sustainability near the center of politics and links them to participation and social justice. Which tradition fits best?',
    options: [
      { id: 'green-politics', label: 'Green politics' },
      { id: 'classical-liberalism', label: 'Classical liberalism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['green-politics']],
    explanation: 'Green political thought makes ecological limits and sustainability central and often connects them to participation, decentralization and social justice.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'SC7',
    parallelOf: 'C7',
    topic: 'communism',
    section: 'classify',
    prompt: 'A movement aims ultimately for a classless, stateless society with no private ownership of the means of production. Which tradition is being described?',
    options: [
      { id: 'communism', label: 'Communism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['communism']],
    explanation: 'That is the Marxian communist ideal: a classless and ultimately stateless society without private ownership of the means of production.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
  {
    id: 'SC8',
    parallelOf: 'C8',
    topic: 'fascism',
    section: 'classify',
    prompt: 'A movement combines ultranationalism, authoritarian rule, rejection of political pluralism and hostility to liberal democracy. Which ideology fits best?',
    options: [
      { id: 'fascism', label: 'Fascism' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['fascism']],
    explanation: 'Fascism combines authoritarian ultranationalism with rejection of pluralist liberal democracy; conservatism or nationalism alone is not fascism.',
    evidenceIds: ['USHMM-FASCISM'],
  },
  {
    id: 'SC9',
    parallelOf: 'C9',
    topic: 'nationalism',
    section: 'classify',
    prompt: 'A movement says nations have special political value and should be able to govern themselves, but gives no fixed economic program. Which concept fits best?',
    options: [
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'populism', label: 'Populism' },
      { id: 'social-democracy', label: 'Social democracy' },
    ],
    acceptedAnswerSets: [['nationalism']],
    explanation: 'Nationalism gives political importance to nations and national self-determination but can combine with different economic and social ideologies.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'SU1',
    parallelOf: 'U1',
    topic: 'populism',
    section: 'understand',
    prompt: 'Which explanation of populism is most accurate?',
    options: [
      { id: 'style-only', label: 'It is mainly a campaign style, so it has no recurring claim about who should hold political power.' },
      { id: 'host', label: 'It has a recurring people-versus-establishment idea but can combine with different left- or right-wing political programs.' },
      { id: 'economic', label: 'It is a complete economic ideology that normally requires protectionism, redistribution and public ownership of major businesses.' },
      { id: 'direct', label: 'It is the same as direct democracy because populist movements always reject representatives, parties and parliamentary government.' },
    ],
    acceptedAnswerSets: [['host']],
    explanation: 'A widely used academic approach treats populism as thin-centered: it has a recurring people-versus-establishment idea but can attach to different host ideologies.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'SU2',
    parallelOf: 'U2',
    topic: 'nationalism',
    section: 'understand',
    prompt: 'What can nationalism tell you by itself?',
    options: [
      { id: 'right', label: 'It normally tells you the movement is right-wing because national self-government goes together with conservative economics.' },
      { id: 'needs-more', label: 'It tells you nationhood matters politically, but you still need economic and social views to place the wider ideology.' },
      { id: 'borders', label: 'It mainly tells you the movement wants strict borders because nationalism is primarily a theory of immigration control.' },
      { id: 'culture', label: 'It tells you the movement is culturally traditional because progressive social views are incompatible with national self-determination.' },
    ],
    acceptedAnswerSets: [['needs-more']],
    explanation: 'Nationalism gives political significance to nations and self-determination, but it has appeared in several different ideological traditions.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'SU3',
    parallelOf: 'U3',
    topic: 'liberal-democracy',
    section: 'understand',
    prompt: 'A government wins an election and then weakens courts and civil liberties. Why can that still be a democratic problem?',
    options: [
      { id: 'elections-only', label: 'It is not a democratic problem as long as voters can still choose a government at regular elections.' },
      { id: 'markets', label: 'It is a democratic problem mainly because liberal democracy requires private ownership of most large businesses.' },
      { id: 'rights-checks', label: 'Liberal democracy requires elections together with civil liberties, rule of law and meaningful checks on executive power.' },
      { id: 'majority', label: 'It is a democratic problem only when the government no longer has support from an electoral majority.' },
    ],
    acceptedAnswerSets: [['rights-checks']],
    explanation: 'Liberal democracy combines competitive elections with civil liberties, rule of law and meaningful limits on executive power.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'SU4',
    parallelOf: 'U4',
    topic: 'far-right',
    section: 'understand',
    prompt: 'What most clearly separates the extreme right from the radical right in comparative research?',
    options: [
      { id: 'nationalism', label: 'The extreme right is simply more nationalist, while both remain equally committed to competitive democratic government.' },
      { id: 'democracy', label: 'The extreme right is explicitly anti-democratic, while the radical right can accept elections despite important illiberal positions.' },
      { id: 'economics', label: 'The radical right is mainly defined by lower taxes, while the extreme right is mainly defined by public ownership.' },
      { id: 'populism', label: 'The radical right is defined by using populist language, while the extreme right is defined by avoiding it.' },
    ],
    acceptedAnswerSets: [['democracy']],
    explanation: 'A common distinction places both under the far-right umbrella but treats explicit rejection of democracy as a key marker of the extreme right.',
    evidenceIds: ['PIRRO-FAR-RIGHT', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'SU5',
    parallelOf: 'U5',
    topic: 'liberalism',
    section: 'understand',
    prompt: 'Why is there no single economic program shared by every liberal tradition?',
    options: [
      { id: 'minimal', label: 'All liberals ultimately want a minimal state, so their economic disagreements are mostly about how quickly to reduce government.' },
      { id: 'diverse', label: 'Liberalism is a broad family centered on liberty, with real disagreements about markets, welfare and the role of government.' },
      { id: 'welfare', label: 'Modern liberalism is defined by a large welfare state, so market-oriented liberals no longer belong to the liberal family.' },
      { id: 'elections', label: 'Liberalism is only a theory of elections, so economic freedom and personal liberty belong to different political traditions.' },
    ],
    acceptedAnswerSets: [['diverse']],
    explanation: 'Liberal traditions share a concern with liberty but disagree substantially about property, markets, welfare and what government should do.',
    evidenceIds: ['SEP-LIBERALISM'],
  },
  {
    id: 'SU6',
    parallelOf: 'U6',
    topic: 'socialism',
    section: 'understand',
    prompt: 'Which statement best separates socialism from a generous welfare state?',
    options: [
      { id: 'welfare', label: 'A generous welfare state is already socialist even when most productive businesses remain privately owned and managed.' },
      { id: 'planning', label: 'Socialism requires central planning and state ownership, so cooperative or market-socialist forms fall outside the tradition.' },
      { id: 'ownership', label: 'Socialism gives social ownership or control a central role; welfare spending alone does not make an economy socialist.' },
      { id: 'one-party', label: 'Socialism requires one-party government because competitive political pluralism cannot coexist with meaningful forms of social ownership.' },
    ],
    acceptedAnswerSets: [['ownership']],
    explanation: 'Ownership and control of productive assets are central distinctions; a welfare state can remain mainly capitalist and social-democratic.',
    evidenceIds: ['SEP-SOCIALISM', 'ROUTLEDGE-SOCIAL-DEMOCRACY'],
  },
] as const;

export const schoolParallelPairs = schoolPostQuestions.map((question) => ({
  baselineId: question.parallelOf,
  postId: question.id,
  topic: question.topic,
})) as readonly { baselineId: string; postId: string; topic: string }[];

export type SchoolLearningCard = {
  id: string;
  title: string;
  summary: string;
  misconception: string;
  evidenceIds: readonly string[];
};

export const schoolLearningCards: readonly SchoolLearningCard[] = [
  {
    id: 'liberalism',
    title: 'Liberalism',
    summary: 'A broad family centered on liberty, equal legal status and limits on concentrated political power. Liberals disagree substantially about markets, welfare and government.',
    misconception: 'Not every liberal supports the same economic program.',
    evidenceIds: ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'conservatism',
    title: 'Conservatism',
    summary: 'Gives substantial weight to continuity, inherited institutions, practical experience and caution about rapid or abstractly designed reform.',
    misconception: 'Conservatism is not simply a synonym for low taxes or a minimal state.',
    evidenceIds: ['SEP-CONSERVATISM'],
  },
  {
    id: 'social-democracy',
    title: 'Social democracy',
    summary: 'Usually keeps a mainly capitalist ownership structure while using regulation, welfare, public services and redistribution to pursue social justice.',
    misconception: 'A large welfare state is not automatically socialism.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'socialism',
    title: 'Socialism',
    summary: 'A broad family that gives social, public, cooperative or worker ownership and control of productive assets a central role.',
    misconception: 'Socialism is broader than one historical regime and does not simply mean more welfare.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'green-politics',
    title: 'Green politics',
    summary: 'Makes ecological sustainability and limits central political concerns and often links them to participation, decentralization and social justice.',
    misconception: 'Green politics is broader than support for one environmental policy.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'libertarianism',
    title: 'Libertarianism',
    summary: 'Gives especially strong priority to individual liberty, voluntary exchange, private property and protection against coercive government action.',
    misconception: 'Libertarianism is a specific tradition, not another name for liberalism as a whole.',
    evidenceIds: ['SEP-LIBERTARIANISM'],
  },
  {
    id: 'christian-democracy',
    title: 'Christian democracy',
    summary: 'Combines Christian political inspiration with social-market ideas, social obligations and subsidiarity.',
    misconception: 'Markets plus welfare alone do not make a movement Christian democratic.',
    evidenceIds: ['CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-RELIGIOUS-INSPIRATION', 'CAMBRIDGE-CD-SUBSIDIARITY'],
  },
  {
    id: 'nationalism',
    title: 'Nationalism',
    summary: 'Gives special political significance to nations and national self-determination. It can combine with different economic and social ideologies.',
    misconception: 'Nationalism alone does not tell you whether a movement is left-wing, right-wing or fascist.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'populism',
    title: 'Populism',
    summary: 'Frames politics around a morally favored ordinary people and a corrupt or self-serving establishment, while emphasizing the people’s common will.',
    misconception: 'Populism can attach to different host ideologies and is not automatically authoritarian.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  },
  {
    id: 'liberal-democracy',
    title: 'Liberal democracy',
    summary: 'Requires more than elections: civil liberties, rule of law and meaningful limits on executive power are also central.',
    misconception: 'Winning an election does not make every later government action liberal-democratic.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'fascism-far-right',
    title: 'Fascism, radical right and extreme right',
    summary: 'Fascism is authoritarian and ultranationalist and rejects pluralist liberal democracy. Comparative research distinguishes the radical right from the explicitly anti-democratic extreme right.',
    misconception: 'Ordinary conservatism or nationalism is not automatically fascism or extreme-right politics.',
    evidenceIds: ['USHMM-FASCISM', 'PIRRO-FAR-RIGHT', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'communism',
    title: 'Communism',
    summary: 'In the Marxian ideal, communism is a classless and ultimately stateless society with no private ownership of the means of production.',
    misconception: 'Public healthcare, redistribution or social democracy are not by themselves communism.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
] as const;
