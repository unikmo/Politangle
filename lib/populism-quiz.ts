export const POPULISM_QUIZ_VERSION = 'populism-literacy-2026.09-candidate-1' as const;
export const POPULISM_QUIZ_SIZE = 12;

export const POPULISM_QUIZ_ANGLES = [
  'core_framing',
  'exclusive_representation',
  'opposition_pluralism',
  'institutional_attacks',
  'false_positives',
  'adjacent_concepts',
] as const;

export type PopulismQuizAngle = typeof POPULISM_QUIZ_ANGLES[number];

export const POPULISM_ANGLE_LABELS: Readonly<Record<PopulismQuizAngle, string>> = {
  core_framing: 'Recognizing the core framing',
  exclusive_representation: 'Spotting “real people” claims',
  opposition_pluralism: 'Recognizing attacks on pluralism',
  institutional_attacks: 'Recognizing institutional warning signs',
  false_positives: 'Avoiding false accusations',
  adjacent_concepts: 'Separating related concepts',
};

export type PopulismQuizOption = {
  id: string;
  label: string;
  feedback: string;
};

export type PopulismQuizQuestion = {
  id: string;
  angle: PopulismQuizAngle;
  prompt: string;
  hint: string;
  options: readonly PopulismQuizOption[];
  answerId: string;
  explanation: string;
  evidenceIds: readonly string[];
  status: 'candidate';
};

function candidate(question: Omit<PopulismQuizQuestion, 'status'>): PopulismQuizQuestion {
  return { ...question, status: 'candidate' };
}

export const populismQuizBank: readonly PopulismQuizQuestion[] = [
  candidate({
    id: 'P1', angle: 'core_framing',
    prompt: 'Which claim is the clearest example of populist framing?',
    hint: 'Look for a statement that divides society into good ordinary people and a corrupt elite.',
    options: [
      { id: 'a', label: 'Several groups disagree about how taxes should be spent.', feedback: 'Disagreement among groups accepts political diversity; it is not the core populist claim.' },
      { id: 'b', label: 'One pure people is betrayed by an entirely corrupt establishment.', feedback: 'This divides society morally into two supposedly unified groups—the central populist framing.' },
      { id: 'c', label: 'Parliament should publish clearer records of its spending.', feedback: 'Demanding transparency can be ordinary democratic accountability without populist framing.' },
      { id: 'd', label: 'Local governments should control more public services.', feedback: 'Moving power locally concerns decentralization, not necessarily populism.' },
    ], answerId: 'b',
    explanation: 'Populism presents politics as a moral struggle between a supposedly unified, authentic people and an entirely corrupt elite.',
    evidenceIds: ['MUDDE-POPULISM'],
  }),
  candidate({
    id: 'P2', angle: 'core_framing',
    prompt: 'A party has left-wing economic policies. What would make its message populist?',
    hint: 'Economic policy alone does not define populism.',
    options: [
      { id: 'a', label: 'It supports higher taxes on very high incomes.', feedback: 'Redistribution can appear in many non-populist political programs.' },
      { id: 'b', label: 'It supports stronger legal protection for trade unions.', feedback: 'Worker protection is not itself a populist idea.' },
      { id: 'c', label: 'It says only its movement represents the pure people against every corrupt rival.', feedback: 'The pure-people claim and denial of legitimate rivals make this framing populist.' },
      { id: 'd', label: 'It proposes public funding for hospitals and schools.', feedback: 'Public services do not determine whether a movement is populist.' },
    ], answerId: 'c',
    explanation: 'Populism can attach to left-wing, right-wing or other programs. The deciding clue is its people-versus-elite framing.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P3', angle: 'core_framing',
    prompt: 'Why can populist parties support very different policies?',
    hint: 'Ask whether populism gives a full list of policies, or mainly says who is against whom.',
    options: [
      { id: 'a', label: 'It gives every party the same economic program.', feedback: 'Populist parties can support very different economic policies.' },
      { id: 'b', label: 'It is only a speaking style with no political idea.', feedback: 'Populism makes a political claim about ordinary people and elites.' },
      { id: 'c', label: 'It requires every party to support the same social policies.', feedback: 'Populist parties can also differ widely on social policies.' },
      { id: 'd', label: 'It says who is against whom but does not set every policy.', feedback: 'The people-versus-elite idea can be combined with different policies.' },
    ], answerId: 'd',
    explanation: 'Populism says good ordinary people are against a corrupt elite. It does not decide every economic or social policy.',
    evidenceIds: ['MUDDE-POPULISM'],
  }),
  candidate({
    id: 'P4', angle: 'exclusive_representation',
    prompt: 'Which statement most clearly claims exclusive representation of “the real people”?',
    hint: 'Look for a speaker saying that political opponents and their voters do not really count.',
    options: [
      { id: 'a', label: 'Our proposal has more public support than the government’s plan.', feedback: 'Claiming greater support is normal political competition.' },
      { id: 'b', label: 'Our opponents represent different interests and make the wrong choices.', feedback: 'Calling opponents wrong still recognizes them as political participants.' },
      { id: 'c', label: 'Only our movement speaks for real citizens; opponents serve nobody legitimate.', feedback: 'This excludes opponents and their supporters from the legitimate people.' },
      { id: 'd', label: 'Our coalition represents workers, families and several regional groups.', feedback: 'Naming a coalition of groups does not claim sole representation of all legitimate people.' },
    ], answerId: 'c',
    explanation: 'A major populist warning sign is claiming that only one movement represents the authentic people.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P5', angle: 'exclusive_representation',
    prompt: 'A leader loses an election and says genuine citizens could never reject him. What is the warning sign?',
    hint: 'Notice whether people who voted differently are still treated as real citizens.',
    options: [
      { id: 'a', label: 'He is asking for a recount under existing law.', feedback: 'A lawful recount request does not by itself deny the legitimacy of other voters.' },
      { id: 'b', label: 'He treats only his supporters as the authentic people.', feedback: 'The statement excludes opposing voters from the genuine public.' },
      { id: 'c', label: 'He wants political parties to campaign more actively.', feedback: 'Campaign activity is unrelated to the exclusionary claim.' },
      { id: 'd', label: 'He believes turnout should be higher at future elections.', feedback: 'Supporting higher turnout does not deny that current opponents are citizens.' },
    ], answerId: 'b',
    explanation: 'Exclusive claims about the “real people” can make electoral defeat seem illegitimate regardless of the evidence.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P6', angle: 'exclusive_representation',
    prompt: 'Which view best respects a politically diverse public?',
    hint: 'In a democracy, people can disagree strongly and still belong equally.',
    options: [
      { id: 'a', label: 'One party naturally expresses the people’s single authentic will.', feedback: 'This treats the public as having one authentic will represented by one party.' },
      { id: 'b', label: 'Citizens may support competing interests without becoming less legitimate.', feedback: 'This recognizes political disagreement without excluding citizens from the public.' },
      { id: 'c', label: 'Only voters supporting the majority belong to the political community.', feedback: 'Majority support does not determine who counts as a legitimate citizen.' },
      { id: 'd', label: 'Criticism of the elected leader opposes the will of the people.', feedback: 'An elected leader does not become identical with the entire public.' },
    ], answerId: 'b',
    explanation: 'Pluralism accepts that citizens have different interests and views, none of which automatically represents the only “real people.”',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P7', angle: 'opposition_pluralism',
    prompt: 'Which statement crosses from strong criticism into rejecting legitimate opposition?',
    hint: 'Democratic opponents may be mistaken without being enemies or traitors.',
    options: [
      { id: 'a', label: 'The opposition’s budget would increase debt too quickly.', feedback: 'This attacks a policy while accepting the opposition’s political legitimacy.' },
      { id: 'b', label: 'The opposition has failed to explain how its plan works.', feedback: 'Demanding an explanation is ordinary democratic criticism.' },
      { id: 'c', label: 'The opposition’s supporters are traitors with no right to govern.', feedback: 'This denies legitimate political competition instead of disputing a policy.' },
      { id: 'd', label: 'The opposition should replace its leader before the election.', feedback: 'This is partisan criticism, not necessarily rejection of legitimate opposition.' },
    ], answerId: 'c',
    explanation: 'Democracy permits fierce disagreement. Treating opponents as inherently illegitimate or traitorous attacks pluralism.',
    evidenceIds: ['VDEM-POPULISM-AUTOCRATIZATION', 'VDEM-LIBERAL-DEMOCRACY'],
  }),
  candidate({
    id: 'P8', angle: 'opposition_pluralism',
    prompt: 'Why can calling every compromise a betrayal become democratically dangerous?',
    hint: 'Think about governing a society whose citizens do not all want the same thing.',
    options: [
      { id: 'a', label: 'It assumes one true public will and dismisses legitimate differences.', feedback: 'This is the danger: plural societies require negotiation among legitimate differences.' },
      { id: 'b', label: 'It always produces economic policies that cost too much.', feedback: 'The democratic problem concerns pluralism, not one predictable economic result.' },
      { id: 'c', label: 'It prevents political parties from publishing election programs.', feedback: 'Anti-compromise rhetoric does not necessarily prevent parties publishing programs.' },
      { id: 'd', label: 'It makes coalition governments legally impossible in every constitution.', feedback: 'The effect is political, not an automatic legal ban on coalitions.' },
    ], answerId: 'a',
    explanation: 'Compromise can be criticized, but treating all compromise as betrayal denies that legitimate citizens have different interests.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P9', angle: 'opposition_pluralism',
    prompt: 'An elected government says winning gives it unlimited authority until the next vote. What is missing?',
    hint: 'Winning an election gives power to govern, but ask whether any limits still apply.',
    options: [
      { id: 'a', label: 'A promise to reduce the number of political parties.', feedback: 'Fewer parties would not solve the claim of unlimited power.' },
      { id: 'b', label: 'Rights, legal limits and fair competition between elections.', feedback: 'Democratic authority remains limited by rights, law and future political competition.' },
      { id: 'c', label: 'A detailed economic plan for the full term.', feedback: 'Policy detail does not answer the claim of unlimited authority.' },
      { id: 'd', label: 'A requirement that every decision use a referendum.', feedback: 'Referendums do not replace rights, law and limits on government.' },
    ], answerId: 'b',
    explanation: 'Winning an election grants governing authority, not unlimited power over rights, law or future competition.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'IDEA-POPULISM-DEMOCRACY'],
  }),
  candidate({
    id: 'P10', angle: 'institutional_attacks',
    prompt: 'A court blocks an unlawful policy. Which response is the clearest democratic warning sign?',
    hint: 'One response uses the legal process. Another says courts should never limit elected leaders.',
    options: [
      { id: 'a', label: 'The government appeals using the normal legal process.', feedback: 'Using the appeal process accepts the court’s legitimate role.' },
      { id: 'b', label: 'The government publishes its legal disagreement with the judgment.', feedback: 'Public legal disagreement can occur within respect for judicial independence.' },
      { id: 'c', label: 'The leader says courts have no right to limit an elected government.', feedback: 'This rejects an institution that enforces legal limits on elected power.' },
      { id: 'd', label: 'The legislature considers changing the law for future cases.', feedback: 'Prospective lawmaking through constitutional procedures is not the same as denying courts’ legitimacy.' },
    ], answerId: 'c',
    explanation: 'Criticizing judgments is legitimate. Denying that independent courts may enforce legal limits attacks a democratic safeguard.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'IDEA-POPULISM-DEMOCRACY'],
  }),
  candidate({
    id: 'P11', angle: 'institutional_attacks',
    prompt: 'Which response to critical journalism is most clearly anti-pluralist?',
    hint: 'Focus on whether criticism is answered or forcibly removed.',
    options: [
      { id: 'a', label: 'The minister publishes evidence challenging the newspaper’s report.', feedback: 'Answering reporting with evidence accepts public scrutiny.' },
      { id: 'b', label: 'The party stops granting interviews to one television program.', feedback: 'Selective access may be questionable, but it is not as clear as using power to silence criticism.' },
      { id: 'c', label: 'The leader calls for closing independent outlets that criticize him.', feedback: 'Using power to eliminate critical media attacks pluralism and accountability.' },
      { id: 'd', label: 'The government requests a correction of a factual error.', feedback: 'Requesting a correction does not itself deny independent media’s legitimacy.' },
    ], answerId: 'c',
    explanation: 'Leaders may dispute reporting. Seeking to close independent critics attacks freedom of expression and accountability.',
    evidenceIds: ['IDEA-POPULISM-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P12', angle: 'institutional_attacks',
    prompt: 'A leader trusts election officials only when he wins. What principle is being rejected?',
    hint: 'Fair rules must apply regardless of which candidate benefits.',
    options: [
      { id: 'a', label: 'Independent administration of elections under consistent rules.', feedback: 'Rejecting neutral administration based on the outcome attacks electoral integrity.' },
      { id: 'b', label: 'The freedom of parties to choose their own campaign slogans.', feedback: 'Campaign slogans are unrelated to trusting election administration only after victory.' },
      { id: 'c', label: 'The government’s authority to propose changes to election law.', feedback: 'Lawful reform proposals are different from outcome-dependent trust.' },
      { id: 'd', label: 'The ability of voters to change their minds during campaigns.', feedback: 'Voter choice does not address whether election administration is treated consistently.' },
    ], answerId: 'a',
    explanation: 'Election authorities and rules cannot be legitimate only when they produce one leader’s preferred result.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P13', angle: 'false_positives',
    prompt: 'Which claim is not enough by itself to identify populism?',
    hint: 'A claim about unfair influence may be true. Ask whether it also says only one movement speaks for real people.',
    options: [
      { id: 'a', label: 'Claiming that only one movement represents genuine citizens.', feedback: 'Exclusive representation of genuine citizens is a central populist warning sign.' },
      { id: 'b', label: 'Describing all political opponents as servants of a corrupt elite.', feedback: 'This combines people-versus-elite framing with rejection of legitimate opposition.' },
      { id: 'c', label: 'Showing evidence that wealthy donors influenced policy and companies avoided tax.', feedback: 'Evidence-based criticism of influence or tax avoidance is not automatically populist.' },
      { id: 'd', label: 'Claiming that disagreement with the leader betrays the people.', feedback: 'Equating the leader with the people excludes legitimate disagreement.' },
    ], answerId: 'c',
    explanation: 'Concentrated influence, lobbying and tax avoidance can be real. Populism adds claims about one authentic people, a uniformly corrupt enemy or exclusive representation.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P14', angle: 'false_positives',
    prompt: 'A politician is extremely popular and speaks emotionally. What can we conclude?',
    hint: 'Being popular or emotional does not show what a politician believes about people, elites or opponents.',
    options: [
      { id: 'a', label: 'The politician is necessarily populist.', feedback: 'Popularity and emotional speech are not sufficient to identify populism.' },
      { id: 'b', label: 'The politician cannot be populist while remaining popular.', feedback: 'Popularity neither proves nor excludes populism.' },
      { id: 'c', label: 'We need evidence of people-versus-elite and representation claims.', feedback: 'Classification requires the recurring claims, not just popularity or speaking style.' },
      { id: 'd', label: 'The politician must support direct democracy.', feedback: 'Emotional popularity does not reveal a position on direct democracy.' },
    ], answerId: 'c',
    explanation: 'Populism is not a synonym for popularity, simple language, charisma or emotional campaigning.',
    evidenceIds: ['MUDDE-POPULISM'],
  }),
  candidate({
    id: 'P15', angle: 'false_positives',
    prompt: 'Which criticism of elites can remain fully compatible with pluralist democracy?',
    hint: 'Look for criticism based on evidence that still accepts courts, elections and political opponents.',
    options: [
      { id: 'a', label: 'Investigate specific abuses while accepting courts, evidence and legitimate opposition.', feedback: 'This demands accountability without claiming exclusive representation or rejecting pluralism.' },
      { id: 'b', label: 'Treat every institution as corrupt whenever it limits the government.', feedback: 'Outcome-dependent attacks on all restraints undermine democratic accountability.' },
      { id: 'c', label: 'Declare that opponents and their voters are not genuine citizens.', feedback: 'This excludes political opponents from the legitimate public.' },
      { id: 'd', label: 'Assume one leader directly expresses the people’s single will.', feedback: 'This erases legitimate differences among citizens.' },
    ], answerId: 'a',
    explanation: 'Democracy needs scrutiny of powerful groups. Evidence-based criticism need not reject pluralism or independent safeguards.',
    evidenceIds: ['VDEM-LIBERAL-DEMOCRACY', 'VDEM-POPULISM-AUTOCRATIZATION'],
  }),
  candidate({
    id: 'P16', angle: 'adjacent_concepts',
    prompt: 'What is the clearest difference between populism and nationalism?',
    hint: 'Ask whether the statement is about ordinary people against elites, or about the nation.',
    options: [
      { id: 'a', label: 'Populism contrasts people with elites; nationalism centers the nation.', feedback: 'This correctly separates the core people–elite and nation-centered claims.' },
      { id: 'b', label: 'Populism is left-wing; nationalism is always right-wing.', feedback: 'Both can combine with different left- and right-wing programs.' },
      { id: 'c', label: 'Populism rejects elections; nationalism always supports them.', feedback: 'Neither concept alone determines acceptance of elections.' },
      { id: 'd', label: 'Populism concerns taxes; nationalism concerns only immigration.', feedback: 'Neither concept is defined by one policy area.' },
    ], answerId: 'a',
    explanation: 'Populism organizes politics around people versus elite. Nationalism gives the nation special political importance. They can combine.',
    evidenceIds: ['MUDDE-POPULISM', 'SEP-NATIONALISM'],
  }),
  candidate({
    id: 'P17', angle: 'adjacent_concepts',
    prompt: 'Why are populism and authoritarianism not the same thing?',
    hint: 'Ask whether this describes a political message or a system that limits competition and concentrates power.',
    options: [
      { id: 'a', label: 'Populism concerns ownership; authoritarianism concerns taxation.', feedback: 'Neither concept is defined by this economic contrast.' },
      { id: 'b', label: 'Populism frames representation; authoritarianism restricts political competition and power.', feedback: 'This distinguishes a people–elite claim from a structure that limits competition and restraints.' },
      { id: 'c', label: 'Populism is democratic; authoritarianism never uses elections.', feedback: 'Populism can become anti-pluralist, and authoritarian systems can hold controlled elections.' },
      { id: 'd', label: 'There is no meaningful difference between the two concepts.', feedback: 'The concepts overlap in some cases but describe different things.' },
    ], answerId: 'b',
    explanation: 'Populism makes a claim about who represents the people. Authoritarianism describes concentrated power and restricted competition.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-REGIMES-OF-THE-WORLD'],
  }),
  candidate({
    id: 'P18', angle: 'adjacent_concepts',
    prompt: 'Why is a referendum not automatically populist?',
    hint: 'A referendum is a way to make a decision. Ask whether that alone says anything about people and elites.',
    options: [
      { id: 'a', label: 'Referendums are never used by populist movements.', feedback: 'Populist movements can support referendums, but they do not own the procedure.' },
      { id: 'b', label: 'Referendums always protect minorities and independent institutions.', feedback: 'Referendums do not automatically protect rights or institutions.' },
      { id: 'c', label: 'The procedure can be used without a people-versus-elite claim.', feedback: 'A referendum can occur without populist framing or exclusive representation.' },
      { id: 'd', label: 'Only local referendums can avoid populist political claims.', feedback: 'The level of government does not determine whether the framing is populist.' },
    ], answerId: 'c',
    explanation: 'Direct democracy is a procedure. It becomes connected to populism only when paired with populist claims or anti-pluralist use.',
    evidenceIds: ['MUDDE-POPULISM', 'VDEM-LIBERAL-DEMOCRACY'],
  }),
] as const;

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

export function selectPopulismQuiz(seed: string | number) {
  return POPULISM_QUIZ_ANGLES.flatMap((angle) => populismQuizBank
    .filter((question) => question.angle === angle)
    .sort((left, right) => hash(`${seed}:${left.id}`) - hash(`${seed}:${right.id}`))
    .slice(0, 2));
}
