import type { LiteracyQuestion } from './deep-engine';
import { literacyQuestions } from './literacy-questions';

type QuestionOverride = Partial<Pick<LiteracyQuestion, 'prompt' | 'options' | 'acceptedAnswerSets' | 'explanation'>>;

const classifyOverrides: Record<string, QuestionOverride> = {
  C1: {
    prompt: 'Most businesses stay privately owned. Government provides strong public services, social insurance and worker protections, paid for partly through higher taxes on higher incomes.',
  },
  C2: {
    prompt: 'Major businesses should be owned much more by the public, workers or cooperatives, rather than mainly by private shareholders.',
  },
  C3: {
    prompt: 'Individual freedom, private property and voluntary exchange come first. Government should interfere as little as possible in peaceful personal and economic choices.',
  },
  C4: {
    prompt: 'Long-standing institutions deserve respect. Change should usually be gradual, and large social experiments should be treated with caution.',
  },
  C5: {
    prompt: 'Markets and private property are important, but welfare and regulation can be useful when they help keep society stable and cohesive.',
  },
  C6: {
    prompt: 'Environmental limits and long-term sustainability should be central to politics, together with public participation, local decision-making and social justice.',
  },
  C7: {
    prompt: 'The long-term goal is a classless society with no private ownership of major productive property and, eventually, no state.',
  },
  C8: {
    prompt: 'The nation should be remade under a strong authoritarian leader. Opposition parties and liberal democracy are rejected, and individual rights come second to the national project.',
  },
  C9: {
    prompt: 'Nations have special political value and should be able to govern themselves. This view does not by itself tell you what someone thinks about markets, welfare or taxes.',
  },
  C10: {
    prompt: 'Individual freedom and equal legal rights are central. People in this tradition disagree about markets, welfare and how much government is needed to protect freedom.',
  },
  C11: {
    prompt: 'The movement is influenced by Christian social ideas. It supports a social-market economy and welfare, and prefers decisions to be made as locally as practical, with higher levels stepping in when needed.',
  },
  C12: {
    prompt: 'Politics is seen as a struggle between ordinary people and a corrupt establishment. Government should carry out the common will of the people.',
  },
  C13: {
    prompt: 'The movement wants strict law and order, gives preference to people seen as long-established members of the nation, and says it represents ordinary people against a corrupt elite. It still competes in elections.',
  },
  C14: {
    prompt: 'The movement rejects democracy itself and says political opponents should not have an equal right to compete for power.',
  },
  C15: {
    prompt: 'There are competitive elections, civil rights, courts that apply the law, and independent checks on elected leaders.',
  },
  C16: {
    prompt: 'A revolutionary movement wants to end capitalist ownership of major industries, replace it with common ownership, and eventually build a classless society.',
    acceptedAnswerSets: [['communism']],
    explanation: 'Communism grew from the Marxist goal of replacing capitalist ownership and class divisions with common ownership and, ultimately, a classless society. Some communist movements also built revolutionary parties and transitional states.',
  },
  C17: {
    prompt: 'A democratic movement wants much more worker, cooperative or public ownership while keeping competitive elections, civil rights and opposition parties.',
  },
  C18: {
    prompt: 'Wealthy societies may sometimes need to consume less because environmental limits cannot always be solved by cleaner technology alone.',
  },
  C19: {
    prompt: 'Government should protect rights and contracts but otherwise interfere as little as possible in the peaceful choices of adults, businesses and voluntary groups.',
  },
  C20: {
    prompt: 'Social order, continuity and long-standing institutions are important, while elections, opposition parties and constitutional limits should remain in place.',
  },
};

const understandOverrides: Record<string, QuestionOverride> = {
  U1: {
    prompt: 'Which statement best describes populism?',
    options: [
      { id: 'u1-a', label: 'It is mainly a way of speaking and has no recurring political ideas.' },
      { id: 'u1-b', label: 'It is a full economic programme that always supports protectionism, redistribution and state ownership.' },
      { id: 'u1-c', label: 'It usually divides politics between ordinary people and a corrupt elite, and it can combine with different left- or right-wing ideas.' },
      { id: 'u1-d', label: 'It is the same as direct democracy and always rejects elected representatives and political parties.' },
    ],
    explanation: 'Populism usually presents politics as a struggle between ordinary people and a corrupt elite. It can combine with very different economic and social ideas, so populism alone does not tell you whether a movement is left or right.',
  },
  U2: {
    prompt: 'Does nationalism tell you whether a movement is left-wing or right-wing?',
    options: [
      { id: 'u2-a', label: 'Yes. Nationalism normally comes with right-wing economic policies.' },
      { id: 'u2-b', label: 'No. Nationalism can combine with different political traditions, so you need to know the movement’s other beliefs too.' },
      { id: 'u2-c', label: 'Yes. Nationalism is mainly about immigration and border control.' },
      { id: 'u2-d', label: 'Yes. Nationalism always comes with traditional social values.' },
    ],
    explanation: 'Nationalism gives political importance to nations and national self-government. It has appeared in conservative, liberal, socialist and other political traditions.',
  },
  U3: {
    prompt: 'A country has real competitive elections. What else does it need to count as a liberal democracy?',
    options: [
      { id: 'u3-a', label: 'Nothing else. Competitive elections are enough.' },
      { id: 'u3-b', label: 'A market economy and private ownership of most businesses.' },
      { id: 'u3-c', label: 'A strong elected leader who can act without courts or other institutions blocking decisions.' },
      { id: 'u3-d', label: 'Civil rights, rule of law and meaningful checks on government power.' },
    ],
    explanation: 'Liberal democracy requires more than elections. It also includes civil rights, rule of law and checks that limit how political leaders can use power.',
  },
  U4: {
    prompt: 'The radical right and the extreme right are often grouped together. What is the main difference?',
    options: [
      { id: 'u4-a', label: 'The extreme right is simply more nationalist.' },
      { id: 'u4-b', label: 'The radical right wants lower taxes, while the extreme right wants state ownership.' },
      { id: 'u4-c', label: 'The extreme right rejects democracy itself, while the radical right can still accept elections.' },
      { id: 'u4-d', label: 'The radical right always uses populist language, while the extreme right never does.' },
    ],
    explanation: 'A common distinction is about democracy. The radical right can compete in elections while challenging some liberal-democratic rules; the extreme right rejects democracy itself.',
  },
  U5: {
    prompt: 'Do all liberals support the same economic policies?',
    options: [
      { id: 'u5-a', label: 'Yes. All liberals want a minimal state.' },
      { id: 'u5-b', label: 'Yes. Liberalism is mainly about elections, not economic or personal freedom.' },
      { id: 'u5-c', label: 'Yes. Only liberals who support a large welfare state count as modern liberals.' },
      { id: 'u5-d', label: 'No. Liberals share a strong concern for freedom but disagree about markets, welfare and the role of government.' },
    ],
    explanation: 'Liberalism is a broad political family centred on liberty. Liberals can disagree strongly about property, markets, welfare and what government should do to protect freedom.',
  },
  U6: {
    prompt: 'Which statement about socialism is most accurate?',
    options: [
      { id: 'u6-a', label: 'Any country with high welfare spending is socialist, even if most businesses stay privately owned.' },
      { id: 'u6-b', label: 'Socialism is a broad family that gives an important role to social, public, cooperative or worker ownership.' },
      { id: 'u6-c', label: 'Socialism always requires central planning and complete state ownership.' },
      { id: 'u6-d', label: 'Socialism always requires one-party rule.' },
    ],
    explanation: 'Socialism is a broad family of ideas in which social ownership or control plays an important role. It includes different economic models and both democratic and non-democratic historical forms.',
  },
  U7: {
    prompt: 'What is one main difference between modern social democracy and socialism?',
    options: [
      { id: 'u7-a', label: 'Modern social democracy usually keeps most businesses privately owned, while socialism gives social ownership a more central role.' },
      { id: 'u7-b', label: 'Social democracy supports moderate taxes, while socialism always supports very high taxes.' },
      { id: 'u7-c', label: 'Social democracy accepts elections, while socialism always rejects them.' },
      { id: 'u7-d', label: 'Socialism supports public services, while social democracy mainly relies on private services.' },
    ],
    explanation: 'Modern social democracy generally keeps a mainly capitalist ownership structure and uses regulation, public services and redistribution. Social ownership is more central to socialism.',
  },
  U8: {
    prompt: 'Can a conservative party support a welfare state?',
    options: [
      { id: 'u8-a', label: 'Only if every benefit is delivered by private companies.' },
      { id: 'u8-b', label: 'No. Conservatism always requires a minimal state.' },
      { id: 'u8-c', label: 'Yes. Some conservative traditions support welfare or regulation to strengthen stability, responsibility or social cohesion.' },
      { id: 'u8-d', label: 'Only if the government also owns most major industries.' },
    ],
    explanation: 'Conservatism is not defined by one position on welfare. Some conservative traditions support substantial social provision because they value obligation, stability and social cohesion.',
  },
  U9: {
    prompt: 'What makes Christian democracy different from other parties that also support markets and welfare?',
    options: [
      { id: 'u9-a', label: 'Markets and generous welfare alone are enough to make a party Christian democratic.' },
      { id: 'u9-b', label: 'It is shaped by Christian social ideas and often says decisions should be made as locally as practical.' },
      { id: 'u9-c', label: 'Strong family policies alone make a party Christian democratic.' },
      { id: 'u9-d', label: 'Support for European cooperation is the one feature that defines Christian democracy.' },
    ],
    explanation: 'Christian democracy is shaped by Christian social thought as well as social-market ideas. It often supports keeping decisions at the lowest level that can handle them, an idea known as subsidiarity.',
  },
  U10: {
    prompt: 'What most clearly separates fascism from ordinary conservatism or nationalism?',
    options: [
      { id: 'u10-a', label: 'Strong patriotism and strict law-and-order policies.' },
      { id: 'u10-b', label: 'A particular way of organising business and labour, even while democracy and opposition parties remain protected.' },
      { id: 'u10-c', label: 'Authoritarian nationalism together with rejection of political opposition, individual rights and liberal democracy.' },
      { id: 'u10-d', label: 'Nationalism combined with a larger welfare state.' },
    ],
    explanation: 'Fascism is not simply strong patriotism, conservatism or nationalism. Its defining pattern includes authoritarian nationalism and rejection of liberal-democratic political competition and rights.',
  },
  U11: {
    prompt: 'In Marx’s theory, what is the final goal of communism?',
    options: [
      { id: 'u11-a', label: 'A classless society with no private ownership of major productive property and, eventually, no state.' },
      { id: 'u11-b', label: 'A permanent one-party state with central planning.' },
      { id: 'u11-c', label: 'A worker-owned market economy that keeps private capital but shares profits more equally.' },
      { id: 'u11-d', label: 'A regulated capitalist welfare state with private firms and progressive taxes.' },
    ],
    explanation: 'In the Marxian ideal, communism is ultimately classless and stateless, with no private ownership of the means of production. Historical communist states did not reach that final ideal.',
  },
  U12: {
    prompt: 'Why are public funding and public ownership not the same thing?',
    options: [
      { id: 'u12-a', label: 'They are the same. Government must own every service it pays for.' },
      { id: 'u12-b', label: 'Government can pay for or guarantee a service even when the organisations providing it are public, private, cooperative or mixed.' },
      { id: 'u12-c', label: 'Ownership only matters for factories, not services.' },
      { id: 'u12-d', label: 'They are only different words for the same policy.' },
    ],
    explanation: 'A government can fund or guarantee a service without owning every organisation that provides it. That is why public provision and public ownership are separate questions.',
  },
  U13: {
    prompt: 'Does calling a movement populist automatically mean it is authoritarian?',
    options: [
      { id: 'u13-a', label: 'Yes. Populism is authoritarian by definition.' },
      { id: 'u13-b', label: 'No. Winning elections means there can no longer be a risk to democracy.' },
      { id: 'u13-c', label: 'No. Populism can exist in a democracy; rejecting political competition and democratic rules is a stronger warning sign.' },
      { id: 'u13-d', label: 'Only economic regulation tells you whether a populist movement threatens democracy.' },
    ],
    explanation: 'Populism alone does not prove authoritarianism. Hostility to political competition, checks on power and democratic rules gives more direct evidence of democratic risk.',
  },
  U14: {
    prompt: 'Why are national sovereignty and who counts as a full member of the nation different issues?',
    options: [
      { id: 'u14-a', label: 'They are not different. People who want national self-government usually want fewer rights for naturalised citizens.' },
      { id: 'u14-b', label: 'A person can strongly support national self-government and still treat naturalised citizens as full members of the nation.' },
      { id: 'u14-c', label: 'Sovereignty is only about immigration, while national membership is only about trade.' },
      { id: 'u14-d', label: 'Both ideas simply measure how patriotic someone is.' },
    ],
    explanation: 'Sovereignty asks who has final political authority. National membership asks who is treated as fully belonging. A person can answer those two questions very differently.',
  },
  U15: {
    prompt: 'How is green politics broader than simply having environmental regulations?',
    options: [
      { id: 'u15-a', label: 'Any strong environmental rule makes a political programme green, even if unlimited economic growth stays its main goal.' },
      { id: 'u15-b', label: 'Green politics makes environmental limits and long-term sustainability central and often links them to democracy and social justice.' },
      { id: 'u15-c', label: 'Green politics always requires ending markets completely.' },
      { id: 'u15-d', label: 'Green politics is only about conservation and does not deal with the economy or democracy.' },
    ],
    explanation: 'Green politics treats environmental limits and sustainability as central political concerns rather than as just one policy area among many.',
  },
  U16: {
    prompt: 'What is distinctive about libertarianism?',
    options: [
      { id: 'u16-a', label: 'It gives especially strong priority to individual freedom, private property, voluntary exchange and limiting government interference.' },
      { id: 'u16-b', label: 'It is mainly about personal lifestyle freedom; economic regulation and property rights are secondary.' },
      { id: 'u16-c', label: 'It uses redistribution and a large welfare state as its main way to expand freedom.' },
      { id: 'u16-d', label: 'It puts long-standing institutions ahead of individual choice.' },
    ],
    explanation: 'Libertarianism gives unusually strong protection to personal and economic freedom, private property and voluntary exchange, and seeks tight limits on government interference.',
  },
  U17: {
    prompt: 'Does supporting redistribution by itself make a person socialist?',
    options: [
      { id: 'u17-a', label: 'Yes. High redistribution matters more than who owns businesses.' },
      { id: 'u17-b', label: 'Yes. Taxation and social ownership are basically the same thing.' },
      { id: 'u17-c', label: 'No. A country can redistribute a lot while most businesses remain privately owned.' },
      { id: 'u17-d', label: 'No. Socialism is only about central planning, not ownership.' },
    ],
    explanation: 'Redistribution and ownership are different questions. A country can tax and redistribute extensively while keeping most productive assets privately owned.',
  },
  U18: {
    prompt: 'A political idea says decisions should be made as locally as practical, with higher levels stepping in when needed. What is this called?',
    options: [
      { id: 'u18-a', label: 'Centralisation' },
      { id: 'u18-b', label: 'Subsidiarity' },
      { id: 'u18-c', label: 'Privatisation' },
      { id: 'u18-d', label: 'Regional supremacy' },
    ],
    explanation: 'This is subsidiarity: responsibility should stay with the lowest level that can handle it well, while higher levels can step in when necessary.',
  },
  U19: {
    prompt: 'Which statement best explains the difference between conservatism and authoritarian politics?',
    options: [
      { id: 'u19-a', label: 'Wanting law and order automatically means wanting fewer limits on government power.' },
      { id: 'u19-b', label: 'Conservatives can value order and continuity while still supporting rights, opposition parties, elections and limits on government power.' },
      { id: 'u19-c', label: 'Traditional social values are enough to make a movement authoritarian.' },
      { id: 'u19-d', label: 'Authoritarianism is simply a stronger form of conservatism.' },
    ],
    explanation: 'Conservative views about order, tradition or gradual change do not by themselves imply rejection of rights, political competition or constitutional limits.',
  },
  U20: {
    prompt: 'When trying to understand someone’s overall politics, what is the best approach?',
    options: [
      { id: 'u20-a', label: 'Use the one issue they feel most strongly about.' },
      { id: 'u20-b', label: 'Look across several issues and dimensions, because political traditions overlap and people can hold mixed views.' },
      { id: 'u20-c', label: 'Use only the person’s own left-right label.' },
      { id: 'u20-d', label: 'Average everything into one left-right score.' },
    ],
    explanation: 'Political traditions are bundles of ideas. Looking at a pattern across several dimensions is more informative than classifying someone from one answer or one left-right number.',
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
  C16: 'Kommunismus geht aus dem marxistischen Ziel hervor, kapitalistisches Eigentum und Klassenteilungen durch gemeinsames Eigentum und schließlich eine klassenlose Gesellschaft zu ersetzen. Einige kommunistische Bewegungen setzten dafür auf revolutionäre Parteien und Übergangsstaaten.',
};

export const publicLiteracyQuestions: readonly LiteracyQuestion[] = literacyQuestions.map((question) => {
  const override = question.section === 'classify' ? classifyOverrides[question.id] : understandOverrides[question.id];
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
