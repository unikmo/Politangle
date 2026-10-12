import { lockedBeliefItemsV2 } from './belief-v2-engine';
import type { BeliefConstruct, BeliefItem } from './belief-v2';

export type SchoolAgeBand = 'junior-10-13' | 'youth-14-18';
export type LegacySchoolAgeBand = 'junior-12-13';

export const SCHOOL_YOUTH_BELIEVE_VERSION = 'school-youth-believe-2026.10-candidate-v5-plain' as const;
export const SCHOOL_JUNIOR_BELIEVE_VERSION = 'school-junior-believe-2026.09-candidate-v4-reader' as const;

type ModePairs = { think: readonly [string, string]; feel: readonly [string, string]; act: readonly [string, string] };

// Plain-language parallel form. IDs, constructs, modes, direction and scoring metadata
// deliberately remain aligned with the adult bank. Wording equivalence still requires
// cognitive interviews and empirical testing with 14-17 year olds.
const youthPairs: Record<BeliefConstruct, ModePairs> = {
  'public-provision': {
    think: ['The government should make sure everyone can use things like schools and doctors.', 'The government should do less when it comes to things like schools and doctors. More of these should be run by private companies, and people should choose for themselves.'],
    feel: ['It bothers me when people cannot get important things like healthcare because it depends too much on what they can pay for privately.', 'It bothers me when government control of important services leaves people with too little choice.'],
    act: ['If a local hospital might close, I would support public money to keep it open for everyone.', 'If a local hospital would work well either way, I would choose a private company to run it instead of giving it more public money.'],
  },
  redistribution: {
    think: ['The government should use taxes and money help to shrink very big gaps between rich and poor people.', 'The government should step in less on money differences between people, even when the gaps get very big.'],
    feel: ['Very big gaps between rich and poor bother me enough that I think some people should pay higher taxes.', 'High taxes worry me, even when the aim is to make the gap between rich and poor smaller.'],
    act: ['Suppose I earn a salary and pay taxes. I would accept paying a bit more tax if it made the gap between rich and poor much smaller.', 'Suppose I earn a salary and pay taxes. I would choose lower taxes, even if the gap between rich and poor stayed very big.'],
  },
  ownership: {
    think: ['Workers or the public should own a bigger share of large companies.', 'Big companies should mostly be owned by private owners, not the government. The law should still protect workers.'],
    feel: ['It feels fair when workers or the public own a real share of big companies.', 'It feels fair when private investors keep most of the ownership of big companies, as long as the law protects workers.'],
    act: ['If a big company gave its workers a real ownership share, even if outside shareholders lost some control, I would support it.', 'If a company were doing well, I would keep it mainly with private shareholders (people who own parts of it) rather than give workers or the public a big share.'],
  },
  'social-change': {
    think: ['When most people start to accept a new way of living, the laws should change quite quickly to match.', 'Old rules should change only after most people have accepted a new way of living for a long time.'],
    feel: ['I feel uncomfortable when the rules stay far behind a change that most people support.', 'I feel uncomfortable when old rules change before most people have accepted a new way of living.'],
    act: ['If an old school rule no longer matched most students’ lives, I would change it fairly soon.', 'I would keep an old school rule until many people had wanted to change it for a long time.'],
  },
  'personal-autonomy': {
    think: ['The law should leave adults alone in their private choices when nobody else is hurt.', 'The law can ban some private things that adults choose to do, if most people think they are morally wrong, even when nobody gets hurt.'],
    feel: ['I feel uncomfortable when the government stops adults from making private choices that do not hurt anyone else.', 'I feel uncomfortable when the law pays no attention to the values most people share, even in private adult life.'],
    act: ['If adults freely chose a relationship or way of life that I disagree with, I would be against a law banning it, unless it directly harmed someone else.', 'If an adult choice went strongly against values most people share, I could support some legal limits, even if nobody was hurt.'],
  },
  abortion: {
    think: ['Abortion (ending a pregnancy) should mostly be legal, because the pregnant person should make the main decision.', 'Abortion should have stronger legal limits, because unborn life should get more protection.'],
    feel: ['Limits on abortion worry me, because they can take an important decision away from the pregnant person.', 'Wide access to abortion worries me, because I believe unborn life deserves more protection.'],
    act: ['If people voted on abortion laws, I would vote for wider legal access.', 'If people voted on abortion laws, I would vote for tighter legal limits.'],
  },
  'authority-order': {
    think: ['The government should limit freedom only when it can show a clear and serious risk of harm.', 'The government can limit some freedoms early, before anything bad happens, if there is a real risk of serious violence or chaos.'],
    feel: ['In a crisis, it worries me when the government uses more power than it needs.', 'In a crisis, it worries me when the authorities have too little power to keep people safe.'],
    act: ['If there were serious violence in the streets, I would keep strong legal protections, even if the response was slower.', 'If there were serious violence in the streets, I would give the government more power for a short time, even if some legal protections were weakened.'],
  },
  pluralism: {
    think: ['A government that wins an election should still be kept in check by courts, the opposition and the country’s basic rules (the constitution).', 'An elected government should be free to carry out its legal plans, even when courts and other independent groups strongly oppose them.'],
    feel: ['It worries me when the winners of an election weaken the checks on their own power.', 'I worry when independent courts often cancel laws that an elected parliament has passed.'],
    act: ['If an independent court cancelled a law I supported, I would still respect its decision.', 'If independent courts kept cancelling laws passed by parliament, I would consider limiting some of their powers.'],
  },
  'world-sovereignty': {
    think: ['Countries should follow shared international rules when a problem is too big for one country to solve alone.', 'Each country should have the final say on its own decisions, even if that makes it harder to solve shared problems together.'],
    feel: ['I feel uncomfortable when shared problems stay unsolved because countries refuse agreements they would have to follow.', 'I feel uncomfortable when international promises stop my country from making its own final decision on an important issue.'],
    act: ['I would support an agreement that all countries must follow if it solved a shared problem, even if it limited some of my country’s choices.', 'I would keep decisions in my own country’s hands, even if that made it harder for countries to act together.'],
  },
  'nationhood-membership': {
    think: ['A person who becomes a citizen later in life belongs to the country just as much as a person who was born a citizen.', 'Being a citizen from birth is an important part of belonging to a country, more than legal citizenship alone.'],
    feel: ['I feel the same sense of belonging with citizens who joined later and take part in community life as with people who were citizens from birth.', 'It matters to my feeling of belonging to a country that my family has lived there for a long time.'],
    act: ['I would support letting people who became citizens later in life hold the same high elected jobs, like leading the country, as people who were born citizens.', 'I would support keeping some top elected jobs, like leading the country, for people who were citizens from birth.'],
  },
  populism: {
    think: ['Political disagreements are usually real clashes between different interests and values, not one side betraying ordinary voters.', 'Political decisions often give too much influence to well-connected groups (groups that know the right people) and too little to ordinary voters.'],
    feel: ['When politics lets me down, I usually think the main reason is that the choices are hard and different groups want different things.', 'When politics lets me down, I often suspect that well-connected groups are heard more than ordinary voters.'],
    act: ['I prefer candidates who explain openly that political choices are hard, even when their message is less exciting.', 'I prefer candidates who promise to reduce the power of well-connected groups and give ordinary voters more say.'],
  },
  'ecology-growth': {
    think: ['When protecting nature and growing the economy clearly clash, nature should sometimes come first, even if the economy grows more slowly.', 'When they clash, growing the economy should usually come first, and harm to nature should be reduced in other ways.'],
    feel: ['Serious damage to nature worries me, even when stopping it could slow down the economy.', 'I worry about lost jobs and lower living standards when environmental rules slow down the economy a lot.'],
    act: ['I would support laws that force companies to protect the environment, even if the economy grew a little more slowly.', 'I would oppose environmental rules that slow growth on purpose, and prefer ways to protect nature that keep the economy growing.'],
  },
  'religion-public-role': {
    think: ['Religious beliefs should not be enough, on their own, to justify laws for people who do not share that religion.', 'Laws can be based on religious values, even if some people in the country do not share that religion.'],
    feel: ['I feel uneasy when religious values are used to justify laws for people who do not share that faith.', 'I feel uneasy when religious values are brushed aside in public debate just because they are religious.'],
    act: ['I would prefer politicians not to rely mainly on religious values when they explain laws that apply to everyone.', 'I would accept lawmakers giving religious values as a good reason for laws that apply to everyone.'],
  },
  subsidiarity: {
    think: ['The national or regional government should run important services, like schools and hospitals, if that is the best way to give everyone the same access and quality.', 'Important services, like schools and hospitals, should usually stay with local government or community groups when they can run them well.'],
    feel: ['I feel confident when the national or regional government sets the same minimum standard for important services everywhere.', 'I feel confident when local authorities, like a town council, keep control instead of handing decisions to the region or the national government.'],
    act: ['If services like schools were much better in some areas than in others, I would support national or regional standards, even if local areas had less control.', 'If local services worked well, I would keep decisions local, even if national rules would make services more alike.'],
  },
};

export const schoolYouthBeliefItems: readonly BeliefItem[] = lockedBeliefItemsV2.map((item) => {
  const pair = youthPairs[item.construct][item.mode];
  return { ...item, negative: pair[0], positive: pair[1] };
});

const juniorSources = ['T01', 'T02', 'T03', 'T04', 'T05', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12', 'T13', 'T14', 'F07', 'F08', 'F11'] as const;
const juniorPairs: readonly (readonly [string, string])[] = [
  ['Government should make sure every family can use schools and doctors.', 'Families should make more of their own choices, with less government help.'],
  ['Taxes should help make the gap between rich and poor smaller.', 'People should keep more of what they earn, even if the gap stays large.'],
  ['Workers or the public should own more of the biggest businesses.', 'The biggest businesses should mostly belong to private owners.'],
  ['Public rules should change when most people’s views change.', 'Old rules should change slowly, after people have agreed for a long time.'],
  ['Adults should be free to make private choices if nobody is harmed.', 'Some private choices may be limited to protect values shared by many people.'],
  ['Leaders should limit freedom only when there is a clear, serious danger.', 'Leaders may limit some freedom early to stop serious trouble.'],
  ['Courts, laws, other parties and news organisations should check elected leaders.', 'Election winners should have wide freedom to do what voters chose.'],
  ['Countries should follow shared rules for problems that cross borders.', 'Each country should keep the final say, even if shared problems are harder to solve.'],
  ['Someone who becomes a citizen belongs just as fully as someone who was a citizen from birth.', 'Being a citizen from birth should count more when deciding who fully belongs.'],
  ['Politics usually has many groups with different needs and ideas.', 'Political decisions can give too much influence to well-connected groups and too little to ordinary voters.'],
  ['Protecting nature should sometimes come before growing the economy.', 'Growing the economy should usually come first while we also protect nature.'],
  ['Religion should not be used to make laws for people who do not share it.', 'Religion can be a fair reason for laws, even when not everyone shares it.'],
  ['National or regional government should run key services when that is needed to guarantee the same minimum standard.', 'Local communities should run key services whenever they can provide them well.'],
  ['If violence broke out, I would keep strict limits on police powers.', 'If violence broke out, I would give police more power for a short time.'],
  ['If a court stopped a popular policy, I would still protect the court’s independence.', 'If courts often stopped legal policies voters chose, I would give elected leaders more freedom.'],
  ['I would listen to a candidate who explains different groups’ needs, even when the answer is complicated.', 'I prefer a candidate who says well-connected groups have too much influence and ordinary voters need more say.'],
];

export const schoolJuniorBeliefItems: readonly BeliefItem[] = juniorSources.map((sourceId, index) => {
  const source = lockedBeliefItemsV2.find((item) => item.id === sourceId)!;
  const pair = juniorPairs[index];
  return { ...source, id: `J${String(index + 1).padStart(2, '0')}`, stage: 'quick', negative: pair[0], positive: pair[1] };
});

export function isJuniorSchoolAgeBand(ageBand: SchoolAgeBand | LegacySchoolAgeBand | string): boolean {
  return ageBand === 'junior-10-13' || ageBand === 'junior-12-13';
}

export function schoolBeliefItems(ageBand: SchoolAgeBand | LegacySchoolAgeBand) {
  return isJuniorSchoolAgeBand(ageBand) ? schoolJuniorBeliefItems : schoolYouthBeliefItems;
}
