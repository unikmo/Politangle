import type { DeepBeliefQuestion } from './deep-engine';
import { literacyQuestions } from './literacy-questions';

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

export const deepLiteracyQuestions = literacyQuestions;
export const deepQuestions = [...deepBeliefQuestions, ...deepLiteracyQuestions] as const;
