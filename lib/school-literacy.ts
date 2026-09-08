import { deepLiteracyQuestions } from './deep-bank';
import type { LiteracyQuestion } from './deep-engine';

export const SCHOOL_LITERACY_VERSION = 'school-literacy-2026.09-v1' as const;

export type SchoolLiteracyQuestion = LiteracyQuestion & {
  parallelOf: string;
  topic: string;
};

export const schoolBaselineQuestions = deepLiteracyQuestions;
export const schoolPracticeQuestions = deepLiteracyQuestions;

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
    prompt: 'A party wants private firms and markets to remain central, while also supporting universal social insurance, strong public services, regulation and progressive redistribution. Which tradition fits best?',
    options: [
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'socialism', label: 'Socialism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
    ],
    acceptedAnswerSets: [['social-democracy']],
    explanation: 'Social democracy generally keeps a predominantly capitalist ownership structure while using welfare, regulation, public services and redistribution to pursue social justice.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'SC2',
    parallelOf: 'C2',
    topic: 'socialism',
    section: 'classify',
    prompt: 'A movement wants major productive assets to move substantially from private shareholders toward public, cooperative or worker ownership. Which broad family fits best?',
    options: [
      { id: 'socialism', label: 'Socialism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['socialism']],
    explanation: 'Socialism is the broad family for substantially greater social, public, cooperative or worker control of productive assets.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'SC3',
    parallelOf: 'C3',
    topic: 'libertarianism',
    section: 'classify',
    prompt: 'A political philosophy gives very high priority to individual liberty, voluntary exchange and private property, and wants coercive government power kept narrowly limited. Which tradition fits best?',
    options: [
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'christian-democracy', label: 'Christian democracy' },
      { id: 'green-politics', label: 'Green politics' },
    ],
    acceptedAnswerSets: [['libertarianism']],
    explanation: 'Libertarianism places individual freedom and voluntary exchange at the center and is highly skeptical of coercive state intervention.',
    evidenceIds: ['SEP-LIBERTARIANISM'],
  },
  {
    id: 'SC4',
    parallelOf: 'C4',
    topic: 'conservatism',
    section: 'classify',
    prompt: 'A movement prefers gradual reform rooted in inherited institutions and practical experience and distrusts attempts to redesign society rapidly from abstract principles. Which tradition fits best?',
    options: [
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
      { id: 'populism', label: 'Populism' },
    ],
    acceptedAnswerSets: [['conservatism']],
    explanation: 'A major conservative tradition emphasizes continuity, inherited institutions, practical knowledge and caution toward rapid or abstractly designed reform.',
    evidenceIds: ['SEP-CONSERVATISM'],
  },
  {
    id: 'SC5',
    parallelOf: 'C5',
    topic: 'christian-democracy',
    section: 'classify',
    prompt: 'A movement supports markets and private property but also stresses social obligations, welfare, family and community institutions, and subsidiarity. Which tradition fits best?',
    options: [
      { id: 'christian-democracy', label: 'Christian democracy' },
      { id: 'libertarianism', label: 'Libertarianism' },
      { id: 'communism', label: 'Communism' },
      { id: 'fascism', label: 'Fascism' },
    ],
    acceptedAnswerSets: [['christian-democracy']],
    explanation: 'Christian democracy combines private property and markets with social obligations, welfare institutions, distributive justice and subsidiarity.',
    evidenceIds: ['CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-SUBSIDIARITY'],
  },
  {
    id: 'SC6',
    parallelOf: 'C6',
    topic: 'green-politics',
    section: 'classify',
    prompt: 'A movement treats ecological sustainability as a central limit on economic policy and commonly favors participation, decentralization and long-term environmental responsibility. Which tradition fits best?',
    options: [
      { id: 'green-politics', label: 'Green politics' },
      { id: 'classical-liberalism', label: 'Classical liberalism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['green-politics']],
    explanation: 'Green political thought makes ecological limits and sustainability central and often connects them to participatory and decentralized politics.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'SC7',
    parallelOf: 'C7',
    topic: 'communism',
    section: 'classify',
    prompt: 'In its Marxian end-state ideal, a movement seeks a classless and ultimately stateless society in which the means of production are no longer privately owned. Which tradition is this?',
    options: [
      { id: 'communism', label: 'Communism' },
      { id: 'social-democracy', label: 'Social democracy' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'libertarianism', label: 'Libertarianism' },
    ],
    acceptedAnswerSets: [['communism']],
    explanation: 'The Marxian communist ideal is classless and stateless and rejects private ownership of the means of production; it should not be confused with a welfare-state model.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
  {
    id: 'SC8',
    parallelOf: 'C8',
    topic: 'fascism',
    section: 'classify',
    prompt: 'A movement is authoritarian and ultranationalist, rejects pluralist representative democracy, and subordinates individual rights to an exclusionary national project. Which ideology fits best?',
    options: [
      { id: 'fascism', label: 'Fascism' },
      { id: 'conservatism', label: 'Conservatism' },
      { id: 'nationalism', label: 'Nationalism' },
      { id: 'christian-democracy', label: 'Christian democracy' },
    ],
    acceptedAnswerSets: [['fascism']],
    explanation: 'Fascism combines authoritarianism, ultranationalism and rejection of pluralist liberal democracy; conservatism or nationalism by itself is not fascism.',
    evidenceIds: ['USHMM-FASCISM'],
  },
  {
    id: 'SC9',
    parallelOf: 'C9',
    topic: 'nationalism',
    section: 'classify',
    prompt: 'A movement argues that a nation should have strong political self-determination, but you are told nothing about its economic or social policies. What can you conclude?',
    options: [
      { id: 'necessarily-right', label: 'It must be right-wing.' },
      { id: 'necessarily-left', label: 'It must be left-wing.' },
      { id: 'cross-cutting-nationalism', label: 'It expresses nationalism, but more information is needed to place its wider ideology.' },
      { id: 'necessarily-fascist', label: 'It must be fascist.' },
    ],
    acceptedAnswerSets: [['cross-cutting-nationalism']],
    explanation: 'Nationalism gives political significance to nations and self-determination but can combine with several different economic and social ideologies.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'SU1',
    parallelOf: 'U1',
    topic: 'populism',
    section: 'understand',
    prompt: 'Why is it misleading to describe populism as automatically left-wing or automatically right-wing?',
    options: [
      { id: 'host', label: 'Because populism can attach its people-versus-elite logic to different host ideologies.' },
      { id: 'no-content', label: 'Because populism has no political content at all.' },
      { id: 'always-center', label: 'Because populism is always centrist.' },
      { id: 'only-campaigning', label: 'Because populism means only energetic campaigning.' },
    ],
    acceptedAnswerSets: [['host']],
    explanation: 'A widely used academic approach treats populism as thin-centered: its people-versus-elite logic can attach to different host ideologies.',
    evidenceIds: ['MUDDE-POPULISM'],
  },
  {
    id: 'SU2',
    parallelOf: 'U2',
    topic: 'nationalism',
    section: 'understand',
    prompt: 'Which conclusion follows most safely when a movement is nationalist?',
    options: [
      { id: 'needs-more', label: 'You still need its economic, social and democratic positions to place its broader ideology.' },
      { id: 'right', label: 'It is automatically right-wing.' },
      { id: 'fascist', label: 'It is automatically fascist.' },
      { id: 'no-politics', label: 'It has no political content.' },
    ],
    acceptedAnswerSets: [['needs-more']],
    explanation: 'Nationalism has appeared in multiple ideological traditions. National self-determination alone does not determine the rest of a political program.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'SU3',
    parallelOf: 'U3',
    topic: 'liberal-democracy',
    section: 'understand',
    prompt: 'A government wins a competitive election but then weakens judicial independence and civil liberties. Why can this still be a liberal-democratic problem?',
    options: [
      { id: 'rights-checks', label: 'Because liberal democracy also requires rights, rule of law and meaningful constraints on executive power.' },
      { id: 'elections-only', label: 'It cannot be a problem once an election has been won.' },
      { id: 'ownership', label: 'Because liberal democracy requires every major company to be privately owned.' },
      { id: 'one-party', label: 'Because liberal democracy requires one governing party.' },
    ],
    acceptedAnswerSets: [['rights-checks']],
    explanation: 'Liberal democracy combines electoral competition with civil liberties, rule of law and institutional constraints on executive power.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'SU4',
    parallelOf: 'U4',
    topic: 'far-right',
    section: 'understand',
    prompt: 'Which comparison between the radical right and extreme right is best supported in comparative scholarship?',
    options: [
      { id: 'democracy', label: 'The radical right can accept procedural democracy while opposing liberal-democratic constraints; the extreme right is explicitly anti-democratic.' },
      { id: 'tax', label: 'They are mainly distinguished by tax rates.' },
      { id: 'ownership', label: 'They are mainly distinguished by public versus private ownership.' },
      { id: 'environment', label: 'They are mainly distinguished by environmental policy.' },
    ],
    acceptedAnswerSets: [['democracy']],
    explanation: 'A common distinction places the radical right inside procedural electoral politics while treating the extreme right as explicitly anti-democratic.',
    evidenceIds: ['PIRRO-FAR-RIGHT', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'SU5',
    parallelOf: 'U5',
    topic: 'liberalism',
    section: 'understand',
    prompt: 'Why is one fixed economic program not enough to define all liberalism?',
    options: [
      { id: 'diverse', label: 'Because liberalism is a family centered on liberty but contains major disagreements about property, markets, welfare and state action.' },
      { id: 'anti-liberty', label: 'Because liberty is not important to liberalism.' },
      { id: 'same-socialism', label: 'Because liberalism and socialism are identical.' },
      { id: 'one-program', label: 'It is enough; all liberals share one economic program.' },
    ],
    acceptedAnswerSets: [['diverse']],
    explanation: 'Liberalism is united by the political importance of liberty but divided over how liberty relates to markets, property, welfare and government action.',
    evidenceIds: ['SEP-LIBERALISM'],
  },
  {
    id: 'SU6',
    parallelOf: 'U6',
    topic: 'socialism',
    section: 'understand',
    prompt: 'Which statement best separates socialism from a generous welfare state?',
    options: [
      { id: 'ownership', label: 'Socialism places substantially greater weight on social ownership or control of productive assets; welfare spending alone does not make an economy socialist.' },
      { id: 'one-party', label: 'Socialism necessarily requires a one-party state.' },
      { id: 'welfare', label: 'Any country with public healthcare is socialist.' },
      { id: 'private-only', label: 'Socialism requires productive assets to remain predominantly privately owned.' },
    ],
    acceptedAnswerSets: [['ownership']],
    explanation: 'The ownership and control of productive assets is a central distinction. A welfare state can remain predominantly capitalist and social-democratic.',
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
    summary: 'A broad family centered on liberty, equal legal status and limits on concentrated political power. Liberal traditions disagree substantially about markets, welfare and the role of government.',
    misconception: 'Not every liberal supports the same economic program.',
    evidenceIds: ['SEP-LIBERALISM', 'VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'conservatism',
    title: 'Conservatism',
    summary: 'Places substantial weight on continuity, inherited institutions, practical knowledge and caution toward rapid or abstractly designed reform.',
    misconception: 'Conservatism is not reducible to low taxes or laissez-faire economics.',
    evidenceIds: ['SEP-CONSERVATISM'],
  },
  {
    id: 'social-democracy',
    title: 'Social democracy',
    summary: 'Keeps a predominantly capitalist ownership structure while using regulation, welfare, public services and redistribution to pursue social justice.',
    misconception: 'A large welfare state is not automatically Socialism.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },
  {
    id: 'socialism',
    title: 'Socialism',
    summary: 'A broad family that places substantially greater weight on social, public, cooperative or worker ownership and control of productive assets.',
    misconception: 'Socialism is broader than one historical regime and does not mean simply “more welfare”.',
    evidenceIds: ['SEP-SOCIALISM'],
  },
  {
    id: 'green-politics',
    title: 'Green politics',
    summary: 'Makes ecological sustainability and limits central political concerns and often links them to participation, decentralization and social justice.',
    misconception: 'Green politics is not only a single environmental policy preference.',
    evidenceIds: ['CAMBRIDGE-GREEN-POLITICS'],
  },
  {
    id: 'libertarianism',
    title: 'Libertarianism',
    summary: 'Gives exceptionally high priority to individual liberty, voluntary exchange and protection against coercion, including coercive government action.',
    misconception: 'Libertarianism is not simply another word for Liberalism as a whole.',
    evidenceIds: ['SEP-LIBERTARIANISM'],
  },
  {
    id: 'christian-democracy',
    title: 'Christian democracy',
    summary: 'Combines markets and private property with social obligations, welfare institutions, distributive justice and subsidiarity, historically shaped by Christian social thought.',
    misconception: 'It is not equivalent to laissez-faire Conservatism or to theocracy.',
    evidenceIds: ['CAMBRIDGE-CHRISTIAN-DEMOCRACY', 'CAMBRIDGE-CD-SUBSIDIARITY'],
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
    summary: 'Frames politics around ordinary or “real” people versus a self-serving elite and gives special weight to the people’s common will.',
    misconception: 'Populism can attach to different host ideologies and is not automatically authoritarian.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  },
  {
    id: 'liberal-democracy',
    title: 'Liberal democracy',
    summary: 'Requires more than elections: civil liberties, rule of law and meaningful constraints on executive power are also central.',
    misconception: 'Winning an election does not by itself make every later government action liberal-democratic.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 'fascism-far-right',
    title: 'Fascism, radical right and extreme right',
    summary: 'Fascism is authoritarian and ultranationalist and rejects pluralist liberal democracy. Comparative scholarship commonly distinguishes the radical right from the explicitly anti-democratic extreme right.',
    misconception: 'Ordinary Conservatism or Nationalism is not automatically Fascism or extreme-right politics.',
    evidenceIds: ['USHMM-FASCISM', 'PIRRO-FAR-RIGHT', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 'communism',
    title: 'Communism',
    summary: 'In the Marxian ideal, Communism describes a classless and ultimately stateless society with collective appropriation and no private ownership of the means of production.',
    misconception: 'Public healthcare, redistribution or Social democracy are not by themselves Communism.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
] as const;
