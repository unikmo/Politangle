export type Dimension = 'economy' | 'society' | 'power' | 'world';

export type Question = {
  id: number;
  text: string;
  dimension: Dimension;
  direction: -1 | 1;
};

export const quickQuestions: Question[] = [
  { id: 1, text: 'Essential utilities should usually be publicly owned when meaningful competition is not possible.', dimension: 'economy', direction: -1 },
  { id: 2, text: 'Lower taxes and fewer economic regulations should generally be preferred, even if public services are more limited.', dimension: 'economy', direction: 1 },
  { id: 3, text: 'Government should guarantee a basic level of healthcare even when this requires higher taxation.', dimension: 'economy', direction: -1 },
  { id: 4, text: 'Private companies generally deserve more freedom to decide how capital and resources are used.', dimension: 'economy', direction: 1 },
  { id: 5, text: 'Workers should have strong legal protections for collective bargaining and workplace representation.', dimension: 'economy', direction: -1 },
  { id: 6, text: 'People should be allowed to keep most of the income they earn, even if economic inequality increases.', dimension: 'economy', direction: 1 },
  { id: 7, text: 'Strategic industries can justify public ownership when national resilience or essential access is at stake.', dimension: 'economy', direction: -1 },

  { id: 8, text: 'Social institutions should adapt relatively quickly when cultural norms and expectations change.', dimension: 'society', direction: -1 },
  { id: 9, text: 'Long-standing traditions deserve a presumption of continuity unless there is a strong reason to change them.', dimension: 'society', direction: 1 },
  { id: 10, text: 'Public institutions should avoid favoring traditional family or cultural models over newer ones.', dimension: 'society', direction: -1 },
  { id: 11, text: 'Schools should expose students to changing social norms and identities as part of civic education.', dimension: 'society', direction: -1 },
  { id: 12, text: 'Rapid cultural change can weaken social cohesion and should therefore be approached cautiously.', dimension: 'society', direction: 1 },
  { id: 13, text: 'Adults should generally be free to make personal lifestyle choices even when many people disapprove of them.', dimension: 'society', direction: -1 },
  { id: 14, text: 'Preserving national cultural traditions is an important public goal.', dimension: 'society', direction: 1 },

  { id: 15, text: 'Government should need a strong justification before restricting individual liberty in the name of public order.', dimension: 'power', direction: -1 },
  { id: 16, text: 'Police should have broader powers when serious public disorder is likely.', dimension: 'power', direction: 1 },
  { id: 17, text: 'Emergency powers should expire automatically unless elected lawmakers renew them.', dimension: 'power', direction: -1 },
  { id: 18, text: 'For public safety, some limits on privacy can be justified even without individual suspicion.', dimension: 'power', direction: 1 },
  { id: 19, text: 'Peaceful but offensive speech should generally remain legally protected.', dimension: 'power', direction: -1 },
  { id: 20, text: 'Courts should be able to block elected governments when constitutional rights are violated.', dimension: 'power', direction: -1 },
  { id: 21, text: 'In serious crises, decisive executive action can be more important than lengthy procedural safeguards.', dimension: 'power', direction: 1 },

  { id: 22, text: 'Countries should accept some limits on national freedom of action when this is necessary to solve global problems jointly.', dimension: 'world', direction: -1 },
  { id: 23, text: 'National governments should retain final control over most laws, even when international coordination becomes harder.', dimension: 'world', direction: 1 },
  { id: 24, text: 'International institutions are stronger when member states agree to binding common rules.', dimension: 'world', direction: -1 },
  { id: 25, text: 'Immigration policy should prioritize national control even when this reduces cross-border mobility.', dimension: 'world', direction: 1 },
  { id: 26, text: 'Countries should generally favor trade and diplomatic cooperation over economic self-reliance and unilateral action.', dimension: 'world', direction: -1 },
];

export const dimensionMeta = {
  economy: { name: 'Economy', negative: 'Collective / public provision', positive: 'Market / private provision' },
  society: { name: 'Society', negative: 'Social change / progressive', positive: 'Tradition / continuity' },
  power: { name: 'Power', negative: 'Individual autonomy', positive: 'State authority / order' },
  world: { name: 'World', negative: 'International cooperation', positive: 'National sovereignty' },
} as const;

export const answerOptions = [
  { label: 'Strongly disagree', value: -2 },
  { label: 'Somewhat disagree', value: -1 },
  { label: 'Not sure', value: 0 },
  { label: 'Somewhat agree', value: 1 },
  { label: 'Strongly agree', value: 2 },
] as const;
