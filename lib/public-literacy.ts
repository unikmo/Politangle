import type { LiteracyQuestion } from './deep-engine';
import { literacyQuestions } from './literacy-questions';

type QuestionOverride = Pick<LiteracyQuestion, 'prompt'> & Partial<Pick<LiteracyQuestion, 'acceptedAnswerSets' | 'explanation'>>;

const classifyOverrides: Record<string, QuestionOverride> = {
  C1: {
    prompt: 'Most businesses remain privately owned. Government guarantees strong public services, social insurance and worker protections, funded partly through progressive taxes.',
  },
  C2: {
    prompt: 'Major businesses should be owned much more by the public, workers or cooperatives, rather than mainly by outside shareholders.',
  },
  C3: {
    prompt: 'Individual liberty, private property and voluntary exchange come first. Government power over peaceful personal and economic choices should be kept to a minimum.',
  },
  C4: {
    prompt: 'Inherited institutions deserve respect, change should usually be gradual, and large social experiments designed from theory should be treated with caution.',
  },
  C5: {
    prompt: 'Markets and private property are important, but welfare and regulation can be justified when they protect social stability, responsibility and cohesion.',
  },
  C6: {
    prompt: 'Environmental limits and long-term sustainability should sit near the centre of politics, alongside citizen participation, decentralisation and social justice.',
  },
  C7: {
    prompt: 'The long-term goal is a classless society with no private ownership of major productive property and, eventually, no state.',
  },
  C8: {
    prompt: 'The nation should be remade under strong authoritarian leadership. Political pluralism and liberal democracy are rejected, and individual rights are subordinate to the national project.',
  },
  C9: {
    prompt: 'Nations have special political value and should be able to govern themselves. This view does not by itself dictate a position on markets, welfare or taxation.',
  },
  C10: {
    prompt: 'Individual liberty and equal legal rights are central, but people within this tradition disagree sharply about markets, welfare and how much government is needed to protect freedom.',
  },
  C11: {
    prompt: 'Political ideas are inspired by Christian social teaching. The movement supports a social-market economy and welfare, and prefers decisions to be taken as locally as practical, with higher levels stepping in when necessary.',
  },
  C12: {
    prompt: 'Politics is framed as a struggle between ordinary people and a corrupt establishment, and government should carry out the common will of the people.',
  },
  C13: {
    prompt: 'The movement favours strict law-and-order, gives priority to native-born or long-established members of the nation, and claims to speak for ordinary people against a corrupt elite while competing in elections.',
  },
  C14: {
    prompt: 'The movement rejects democracy itself and argues that political opponents should not have an equal right to compete for power.',
  },
  C15: {
    prompt: 'Competitive elections are combined with civil liberties, rule of law and independent checks on elected leaders.',
  },
  C16: {
    prompt: 'A revolutionary party draws on Marx and Lenin, wants to replace capitalist ownership with common ownership of major production, and aims ultimately at a classless society.',
    acceptedAnswerSets: [['communism']],
    explanation: 'Communism grew from the Marxist goal of replacing capitalist ownership and class divisions with common ownership and, ultimately, a classless society. Marxism-Leninism adds a revolutionary party and a transitional state to that project.',
  },
  C17: {
    prompt: 'A democratic movement wants much more worker, cooperative or public ownership while keeping competitive elections, civil liberties and opposition parties.',
  },
  C18: {
    prompt: 'Wealthy societies may sometimes need less consumption because environmental limits cannot always be solved by cleaner technology alone.',
  },
  C19: {
    prompt: 'Government should protect rights and contracts but otherwise leave adults, markets and voluntary organisations as free from state interference as possible.',
  },
  C20: {
    prompt: 'Social order, continuity and inherited institutions are important, while elections, opposition parties and constitutional limits should remain in place.',
  },
};

const germanClassifyPrompts: Record<string, string> = {
  C1: 'Die meisten Unternehmen bleiben in Privatbesitz. Der Staat garantiert starke öffentliche Leistungen, Sozialversicherung und Arbeitnehmerschutz, teilweise finanziert durch stärker gestaffelte Steuern.',
  C2: 'Große Unternehmen sollen deutlich stärker der Öffentlichkeit, den Beschäftigten oder Genossenschaften gehören statt hauptsächlich externen Anteilseignern.',
  C3: 'Individuelle Freiheit, Privateigentum und freiwilliger Austausch stehen an erster Stelle. Staatliche Eingriffe in friedliche persönliche und wirtschaftliche Entscheidungen sollen auf ein Minimum begrenzt werden.',
  C4: 'Gewachsene Institutionen verdienen Respekt, Veränderungen sollten meist schrittweise erfolgen, und große gesellschaftliche Experimente aus der Theorie heraus sollten mit Vorsicht betrachtet werden.',
  C5: 'Märkte und Privateigentum sind wichtig, aber Sozialleistungen und Regulierung können sinnvoll sein, wenn sie Stabilität, Verantwortung und gesellschaftlichen Zusammenhalt stärken.',
  C6: 'Ökologische Grenzen und langfristige Nachhaltigkeit sollen im Zentrum der Politik stehen, zusammen mit Bürgerbeteiligung, Dezentralisierung und sozialer Gerechtigkeit.',
  C7: 'Langfristiges Ziel ist eine klassenlose Gesellschaft ohne Privateigentum an den wichtigsten Produktionsmitteln und schließlich ohne Staat.',
  C8: 'Die Nation soll unter starker autoritärer Führung grundlegend erneuert werden. Politischer Pluralismus und liberale Demokratie werden abgelehnt, individuelle Rechte dem nationalen Projekt untergeordnet.',
  C9: 'Nationen haben einen besonderen politischen Wert und sollen sich selbst regieren können. Daraus folgt allein noch keine feste Position zu Märkten, Sozialstaat oder Steuern.',
  C10: 'Individuelle Freiheit und gleiche Rechte stehen im Mittelpunkt, zugleich gibt es innerhalb dieser Tradition große Unterschiede bei Märkten, Sozialstaat und der Rolle des Staates beim Schutz der Freiheit.',
  C11: 'Die politischen Ideen sind von christlicher Soziallehre geprägt. Die Bewegung unterstützt soziale Marktwirtschaft und Sozialstaat und möchte Entscheidungen möglichst nah bei den Betroffenen treffen, während höhere Ebenen nur eingreifen, wenn es nötig ist.',
  C12: 'Politik wird als Konflikt zwischen normalen Bürgerinnen und Bürgern und einem korrupten Establishment verstanden. Die Regierung soll den gemeinsamen Willen des Volkes umsetzen.',
  C13: 'Die Bewegung fordert strenge Law-and-Order-Politik, gibt Einheimischen oder seit Langem Zugehörigen Vorrang und behauptet, die normalen Leute gegen eine korrupte Elite zu vertreten, während sie an Wahlen teilnimmt.',
  C14: 'Die Bewegung lehnt Demokratie selbst ab und bestreitet politischen Gegnern das gleiche Recht, um Macht zu konkurrieren.',
  C15: 'Freie Wahlen werden mit Bürgerrechten, Rechtsstaatlichkeit und unabhängigen Kontrollen der gewählten Regierung verbunden.',
  C16: 'Eine revolutionäre Partei beruft sich auf Marx und Lenin, will kapitalistisches Eigentum durch gemeinsames Eigentum an der wichtigsten Produktion ersetzen und strebt letztlich eine klassenlose Gesellschaft an.',
  C17: 'Eine demokratische Bewegung will deutlich mehr Eigentum von Beschäftigten, Genossenschaften oder der öffentlichen Hand und zugleich freie Wahlen, Bürgerrechte und Oppositionsparteien erhalten.',
  C18: 'Wohlhabende Gesellschaften müssen möglicherweise teilweise weniger konsumieren, weil ökologische Grenzen nicht immer allein durch sauberere Technik gelöst werden können.',
  C19: 'Der Staat soll Rechte und Verträge schützen, Erwachsene, Märkte und freiwillige Zusammenschlüsse ansonsten aber so weit wie möglich frei von staatlichen Eingriffen lassen.',
  C20: 'Gesellschaftliche Ordnung, Kontinuität und gewachsene Institutionen sind wichtig, während Wahlen, Oppositionsparteien und verfassungsrechtliche Grenzen erhalten bleiben sollen.',
};

const germanClassifyExplanations: Record<string, string> = {
  C16: 'Kommunismus geht aus dem marxistischen Ziel hervor, kapitalistisches Eigentum und Klassenteilungen durch gemeinsames Eigentum und schließlich eine klassenlose Gesellschaft zu ersetzen. Der Marxismus-Leninismus ergänzt dazu die Idee einer revolutionären Partei und eines Übergangsstaates.',
};

export const publicLiteracyQuestions: readonly LiteracyQuestion[] = literacyQuestions.map((question) => {
  if (question.section !== 'classify') return question;
  const override = classifyOverrides[question.id];
  return override ? { ...question, ...override } : question;
});

export function publicGermanLiteracyPrompt(questionId: string) {
  return germanClassifyPrompts[questionId];
}

export function publicGermanLiteracyExplanation(questionId: string) {
  return germanClassifyExplanations[questionId];
}

export function deClusterLiteracyOrder(order: readonly string[], questions: readonly LiteracyQuestion[]) {
  const byId = new Map(questions.map((question) => [question.id, question]));
  const pool = [...order];
  const result: string[] = [];
  let previousAnswer = '';

  while (pool.length) {
    let pick = pool.findIndex((id) => {
      const answer = byId.get(id)?.acceptedAnswerSets[0]?.join('|') ?? '';
      return answer !== previousAnswer;
    });
    if (pick < 0) pick = 0;
    const [id] = pool.splice(pick, 1);
    result.push(id);
    previousAnswer = byId.get(id)?.acceptedAnswerSets[0]?.join('|') ?? '';
  }

  return result;
}
