export type Dimension = 'economy' | 'society' | 'power' | 'world';
export type ScoredAnswerValue = -2 | -1 | 0 | 1 | 2;
export type AnswerValue = ScoredAnswerValue | 'unsure';

export type Question = {
  id: number;
  dimension: Dimension;
  construct: string;
  negative: string;
  positive: string;
  evidenceIds: readonly string[];
};

export const QUICK_QUESTIONNAIRE_VERSION = 'quick-2026.09-v2' as const;

export const quickQuestions: readonly Question[] = [
  {
    id: 1,
    dimension: 'economy',
    construct: 'public versus private provision',
    negative: 'Essential services such as water, electricity and public transport should rely more on public or community provision.',
    positive: 'Essential services should rely more on private providers, with government mainly setting and enforcing the rules.',
    evidenceIds: ['CHES-ECON-GALTAN'],
  },
  {
    id: 2,
    dimension: 'economy',
    construct: 'taxation and public services',
    negative: 'It is worth paying higher taxes when that funds broader public services and social protection.',
    positive: 'Lower taxes are usually preferable even when that means narrower public services and social protection.',
    evidenceIds: ['CHES-ECON-GALTAN'],
  },
  {
    id: 3,
    dimension: 'economy',
    construct: 'redistribution',
    negative: 'Government should do more to reduce large differences in income and wealth.',
    positive: 'Government should do less to alter differences in income and wealth that result from the economy.',
    evidenceIds: ['CHES-2024', 'ROUTLEDGE-SOCIAL-DEMOCRACY'],
  },
  {
    id: 4,
    dimension: 'economy',
    construct: 'collective bargaining',
    negative: 'Law should give workers stronger collective bargaining and workplace representation rights.',
    positive: 'Law should give employers more flexibility to set workplace terms without collective bargaining requirements.',
    evidenceIds: ['CHES-ECON-GALTAN', 'SEP-SOCIALISM'],
  },
  {
    id: 5,
    dimension: 'economy',
    construct: 'ownership of strategic industries',
    negative: 'Public ownership can be appropriate for some strategic industries or natural monopolies.',
    positive: 'Strategic industries and natural monopolies should normally remain privately owned under regulation.',
    evidenceIds: ['CHES-ECON-GALTAN', 'SEP-SOCIALISM'],
  },
  {
    id: 6,
    dimension: 'economy',
    construct: 'economic regulation',
    negative: 'When regulation involves a trade-off, policy should lean more toward protecting workers and consumers even if business costs rise.',
    positive: 'When regulation involves a trade-off, policy should lean more toward business flexibility and competition even if protections are lighter.',
    evidenceIds: ['CHES-ECON-GALTAN'],
  },
  {
    id: 7,
    dimension: 'economy',
    construct: 'social insurance',
    negative: 'Government should provide broad social insurance against risks such as unemployment, illness and old age.',
    positive: 'Individuals and families should carry more responsibility for insuring themselves against unemployment, illness and old age.',
    evidenceIds: ['ROUTLEDGE-SOCIAL-DEMOCRACY', 'SEP-SOCIALISM'],
  },

  {
    id: 8,
    dimension: 'society',
    construct: 'pace of social change',
    negative: 'Public institutions should adapt relatively quickly when social norms change.',
    positive: 'Public institutions should change cautiously so that continuity and social cohesion are preserved.',
    evidenceIds: ['CHES-ECON-GALTAN', 'SEP-CONSERVATISM'],
  },
  {
    id: 9,
    dimension: 'society',
    construct: 'family policy',
    negative: 'Public policy should treat different adult family and relationship forms on equal terms.',
    positive: 'Public policy may legitimately give some preference to long-established family forms.',
    evidenceIds: ['CHES-ECON-GALTAN'],
  },
  {
    id: 10,
    dimension: 'society',
    construct: 'personal morality and public norms',
    negative: 'Adults should generally be free to make personal lifestyle choices that others disapprove of, as long as they do not harm others.',
    positive: 'Society may legitimately use law or public policy to discourage some personal choices in order to uphold shared moral norms.',
    evidenceIds: ['CHES-ECON-GALTAN', 'SEP-LIBERALISM'],
  },
  {
    id: 11,
    dimension: 'society',
    construct: 'civic education and social change',
    negative: 'Schools should expose students to a broad range of changing social identities and viewpoints.',
    positive: 'Schools should place more emphasis on established social norms and shared traditions.',
    evidenceIds: ['CHES-ECON-GALTAN'],
  },
  {
    id: 12,
    dimension: 'society',
    construct: 'cultural neutrality of public institutions',
    negative: 'Public institutions should remain neutral between inherited cultural traditions and newer ways of life.',
    positive: 'Public institutions should actively preserve inherited cultural traditions.',
    evidenceIds: ['CHES-ECON-GALTAN', 'SEP-CONSERVATISM'],
  },
  {
    id: 13,
    dimension: 'society',
    construct: 'religion and tradition in public policy',
    negative: 'Government should avoid giving religious or cultural traditions a special role in public policy.',
    positive: 'Long-established religious or cultural traditions may deserve a special role in public policy.',
    evidenceIds: ['SEP-LIBERALISM', 'SEP-CONSERVATISM', 'CAMBRIDGE-CHRISTIAN-DEMOCRACY'],
  },

  {
    id: 14,
    dimension: 'power',
    construct: 'liberty versus preventive order',
    negative: 'Government should have to show a specific and serious risk of harm before restricting individual liberty.',
    positive: 'Government should be able to restrict some liberties preventively when it reasonably expects serious disorder.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'SEP-LIBERTARIANISM'],
  },
  {
    id: 15,
    dimension: 'power',
    construct: 'police discretion',
    negative: 'Police powers should remain tightly limited by procedural safeguards even during periods of serious disorder.',
    positive: 'Police should have broader discretion during periods of serious disorder even if some procedural safeguards are reduced.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'MUDDE-RADICAL-RIGHT'],
  },
  {
    id: 16,
    dimension: 'power',
    construct: 'emergency powers',
    negative: 'Emergency powers should expire automatically unless elected lawmakers renew them.',
    positive: 'Emergency powers should be able to remain in force until the executive judges that the emergency has passed.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 17,
    dimension: 'power',
    construct: 'surveillance and privacy',
    negative: 'State surveillance should normally require individualized suspicion or independent authorization.',
    positive: 'Broader state surveillance can be justified for public safety even without individualized suspicion.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'SEP-LIBERTARIANISM'],
  },
  {
    id: 18,
    dimension: 'power',
    construct: 'political speech',
    negative: 'Peaceful political speech should remain legal even when it is deeply offensive.',
    positive: 'The state may restrict some deeply offensive political speech in order to protect public order or vulnerable groups.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'SEP-LIBERALISM'],
  },
  {
    id: 19,
    dimension: 'power',
    construct: 'judicial constraints on elected government',
    negative: 'Independent courts should be able to block elected governments when constitutional rights are violated.',
    positive: 'Elected majorities should usually prevail over unelected courts when the two conflict.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },
  {
    id: 20,
    dimension: 'power',
    construct: 'protest and public order',
    negative: 'Peaceful protest should receive strong legal protection even when it causes major disruption.',
    positive: 'Authorities should be able to place stronger limits on disruptive protest to protect everyday public order.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY'],
  },

  {
    id: 21,
    dimension: 'world',
    construct: 'binding international cooperation',
    negative: 'Countries should accept binding international rules when joint action is needed on cross-border problems.',
    positive: 'Countries should keep final national discretion even when that makes joint action on cross-border problems harder.',
    evidenceIds: ['CHES-2024', 'SEP-NATIONALISM'],
  },
  {
    id: 22,
    dimension: 'world',
    construct: 'trade and economic interdependence',
    negative: 'Countries should generally favor open trade and economic interdependence.',
    positive: 'Countries should generally favor more domestic self-reliance even when that restricts trade.',
    evidenceIds: ['CHES-2024'],
  },
  {
    id: 23,
    dimension: 'world',
    construct: 'immigration and national control',
    negative: 'Immigration rules should give substantial weight to cross-border mobility and opportunities for newcomers.',
    positive: 'Immigration rules should give greater weight to national control and limiting the pace of entry.',
    evidenceIds: ['CHES-2024', 'SEP-NATIONALISM'],
  },
  {
    id: 24,
    dimension: 'world',
    construct: 'multilateral foreign policy',
    negative: 'Foreign policy should usually seek multilateral agreement before acting on major international disputes.',
    positive: 'A country should preserve the option to act independently when it believes its interests require it.',
    evidenceIds: ['CHES-2024', 'SEP-NATIONALISM'],
  },
  {
    id: 25,
    dimension: 'world',
    construct: 'international legal constraints',
    negative: 'International courts and agreements should be able to constrain governments when those governments have accepted the rules.',
    positive: 'National governments should retain the final say even after joining international legal arrangements.',
    evidenceIds: ['CHES-2024', 'SEP-NATIONALISM'],
  },
  {
    id: 26,
    dimension: 'world',
    construct: 'national interest versus global responsibility',
    negative: 'Governments should sometimes accept domestic costs when that is necessary to meet shared global responsibilities.',
    positive: 'Governments should prioritize their own citizens\' immediate interests even when that weakens shared global action.',
    evidenceIds: ['CHES-2024', 'SEP-NATIONALISM'],
  },
] as const;

export const dimensionMeta = {
  economy: { name: 'Economy', negative: 'Collective / public provision', positive: 'Market / private provision' },
  society: { name: 'Society', negative: 'Social change / progressive', positive: 'Tradition / continuity' },
  power: { name: 'Power', negative: 'Individual autonomy / constraints on power', positive: 'State authority / order' },
  world: { name: 'World', negative: 'International cooperation', positive: 'National sovereignty' },
} as const;

export const pairedAnswerOptions: readonly { label: string; value: AnswerValue; scored: boolean }[] = [
  { label: 'Much closer to the first view', value: -2, scored: true },
  { label: 'Somewhat closer to the first view', value: -1, scored: true },
  { label: 'About equally / it depends', value: 0, scored: true },
  { label: 'Somewhat closer to the second view', value: 1, scored: true },
  { label: 'Much closer to the second view', value: 2, scored: true },
  { label: 'Not sure / I do not understand', value: 'unsure', scored: false },
] as const;
