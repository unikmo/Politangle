import type { LiteracyQuestion } from './deep-engine';
import { deClusterLiteracyOrder, publicLiteracyQuestions as basePublicLiteracyQuestions } from './public-literacy';

type QuestionOverride = Partial<Pick<LiteracyQuestion, 'prompt' | 'options' | 'acceptedAnswerSets' | 'explanation'>>;

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
    explanation: 'Public ownership by itself does not define communism. Mixed economies, social democracies and other systems can own major enterprises while retaining extensive private ownership and markets.',
  },
  U20: {
    prompt: 'Why can “communism” mean different things when people talk about theory and history?',
    options: [
      { id: 'u20-a', label: 'Because Marx defined communism as a permanent one-party state, while later governments rejected that idea.' },
      { id: 'u20-b', label: 'Because Marxian communism describes a classless, ultimately stateless end goal, while historical communist parties often governed centralized one-party states they described as transitional.' },
      { id: 'u20-c', label: 'Because communist theory is mainly about nationalism, while historical communist governments were mainly libertarian.' },
      { id: 'u20-d', label: 'There is no meaningful difference: every government led by a communist party already matched the final communist ideal.' },
    ],
    acceptedAnswerSets: [['u20-b']],
    explanation: 'It is useful to separate the theoretical end goal from governments led by communist parties. Marxian communism is classless and ultimately stateless; historical communist states generally presented themselves as socialist transitions toward that goal rather than the completed end state.',
  },
};

export const publicLiteracyQuestions: readonly LiteracyQuestion[] = basePublicLiteracyQuestions.map((question) => {
  const override = communismUpgrades[question.id];
  return override ? { ...question, ...override } : question;
});

export { deClusterLiteracyOrder };
