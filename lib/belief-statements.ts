import type { BeliefAnswersV2, BeliefItem } from './belief-v2';
import type { AnswerValue } from './questions';

export type BeliefPolarity = 'negative' | 'positive';

export type BeliefStatement = Omit<BeliefItem, 'negative' | 'positive'> & {
  sourceItemId: string;
  polarity: BeliefPolarity;
  statement: string;
};

export function statementId(sourceItemId: string, polarity: BeliefPolarity) {
  return `${sourceItemId}-${polarity === 'negative' ? 'N' : 'P'}`;
}

export function expandBeliefItems(items: readonly BeliefItem[]): readonly BeliefStatement[] {
  return items.flatMap((item) => {
    const { negative, positive, ...metadata } = item;
    return [
      { ...metadata, id: statementId(item.id, 'negative'), sourceItemId: item.id, polarity: 'negative' as const, statement: negative },
      { ...metadata, id: statementId(item.id, 'positive'), sourceItemId: item.id, polarity: 'positive' as const, statement: positive },
    ];
  });
}

export function canonicalizeStatementAnswer(value: AnswerValue, polarity: BeliefPolarity): AnswerValue {
  if (value === 'unsure' || value === 0 || polarity === 'positive') return value;
  return (-value) as -2 | -1 | 1 | 2;
}

export function collapseStatementAnswers(
  answers: Partial<Record<string, AnswerValue>>,
  statements: readonly BeliefStatement[],
): BeliefAnswersV2 {
  const grouped = new Map<string, (-2 | -1 | 0 | 1 | 2)[]>();
  for (const statement of statements) {
    const answer = answers[statement.id];
    if (answer === undefined || answer === 'unsure') continue;
    const canonical = canonicalizeStatementAnswer(answer, statement.polarity);
    if (canonical === 'unsure') continue;
    grouped.set(statement.sourceItemId, [...(grouped.get(statement.sourceItemId) ?? []), canonical]);
  }
  const collapsed: BeliefAnswersV2 = {};
  for (const [id, values] of grouped) {
    collapsed[id] = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) as -2 | -1 | 0 | 1 | 2;
  }
  return collapsed;
}
