import type { LiteracyQuestion } from './deep-engine';
import { deClusterLiteracyOrder, publicLiteracyQuestions as basePublicLiteracyQuestions } from './public-literacy';

type QuestionOverride = Partial<Pick<LiteracyQuestion, 'prompt' | 'options' | 'acceptedAnswerSets' | 'explanation' | 'evidenceIds'>>;

// UNDERSTAND originally had only one direct communism item. Keep the quiz at 20
// questions, but use three additional high-value distinctions so communism is
// treated as a real topic rather than a single definition question.
const communismUpgrades: Record<string, QuestionOverride> = {
  U12: {
    prompt: 'How is communism related to socialism?',
    options: [
      { id: 'u12-a', label: 'They are exact synonyms and always describe the same political programme.' },
      { id: 'u12-b', label: 'Communism is one branch of the broader socialist tradition, with a long-term goal of common ownership and a classless society.' },
      { id: 'u12-c', label: 'Communism is mainly a welfare-state model that keeps most major businesses privately owned.' },
      { id: 'u12-d', label: 'Socialism is necessarily one-party rule, while communism is necessarily multiparty democracy.' },
    ],
    acceptedAnswerSets: [['u12-b']],
    explanation: 'Socialism is a broad family of ideas about social ownership and economic power. Communism developed within that broader family and, in Marxian theory, points toward a classless society based on common ownership.',
    evidenceIds: ['SEP-SOCIALISM', 'OXFORD-COMMUNISM'],
  },
  U17: {
    prompt: 'Does government ownership of some major industries automatically make a country communist?',
    options: [
      { id: 'u17-a', label: 'Yes. Any public ownership is enough to make an economy communist.' },
      { id: 'u17-b', label: 'Yes, as long as the government also provides a large welfare state.' },
      { id: 'u17-c', label: 'No. Public ownership can exist in many systems; communism involves a much broader transformation of ownership and class relations.' },
      { id: 'u17-d', label: 'No, because communism requires all economic activity to be privately owned.' },
    ],
    acceptedAnswerSets: [['u17-c']],
    explanation: 'Public ownership by itself does not define communism. Mixed economies and other systems can own major enterprises while retaining extensive private ownership and markets.',
    evidenceIds: ['SEP-SOCIALISM', 'OXFORD-COMMUNISM'],
  },
  U20: {
    prompt: 'Why should communist theory and historical communist-party governments not be treated as exactly the same thing?',
    options: [
      { id: 'u20-a', label: 'They are exactly the same: Marx defined the final communist ideal as a permanent centralized one-party state.' },
      { id: 'u20-b', label: 'Marxian communism describes a classless, ultimately stateless end goal, while historical communist-party governments were states and did not themselves match that final condition.' },
      { id: 'u20-c', label: 'Because communist theory is mainly about nationalism, while historical communist governments were mainly libertarian.' },
      { id: 'u20-d', label: 'Because communism is only an economic policy and has no ideas about class, ownership or the state.' },
    ],
    acceptedAnswerSets: [['u20-b']],
    explanation: 'The word communism is used both for a Marxian theoretical end state and for historical movements and governments associated with that tradition. The theoretical end state is classless and ultimately stateless, so those are not identical concepts.',
    evidenceIds: ['OXFORD-COMMUNISM', 'SEP-SOCIALISM'],
  },
};

export const publicLiteracyQuestions: readonly LiteracyQuestion[] = basePublicLiteracyQuestions.map((question) => {
  const override = communismUpgrades[question.id];
  return override ? { ...question, ...override } : question;
});

export { deClusterLiteracyOrder };
