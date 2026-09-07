import type { DeepBeliefQuestion } from './deep-engine';

export const deepDiscriminatorQuestions: readonly DeepBeliefQuestion[] = [
  {
    id: 'B11', section: 'believe', axis: 'nationhood', construct: 'nation as primary political community',
    negative: 'Political authority can legitimately be shared across national and international institutions when citizens have accepted those arrangements.',
    positive: 'The nation should remain the primary political community and should retain the strongest claim to collective self-rule.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'B12', section: 'believe', axis: 'nationhood', construct: 'political value of national self-determination',
    negative: 'National self-determination is one political value among several and can reasonably be limited by broader institutions and obligations.',
    positive: 'National self-determination has special political importance and should normally take priority when it conflicts with broader institutions.',
    evidenceIds: ['SEP-NATIONALISM'],
  },
  {
    id: 'B13', section: 'believe', axis: 'democracyRejection', construct: 'competitive elections as necessary',
    negative: 'Regular genuinely competitive elections are necessary even when they produce unstable or ineffective governments.',
    positive: 'In some circumstances a country may be better governed without genuinely competitive elections if a strong leadership can act effectively.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'PIRRO-FAR-RIGHT', 'USHMM-FASCISM'],
  },
  {
    id: 'B14', section: 'believe', axis: 'democracyRejection', construct: 'right of opposition to compete for power',
    negative: 'Peaceful political opponents should retain a genuine opportunity to organize, campaign and replace the government through elections.',
    positive: 'A government may legitimately prevent peaceful political opponents from competing for power when it believes national unity or stability requires it.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'PIRRO-FAR-RIGHT', 'USHMM-FASCISM'],
  },
] as const;
