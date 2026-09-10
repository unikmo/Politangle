import { lockedBeliefItemsV2 } from './belief-v2-engine';
import type { BeliefConstruct, BeliefItem } from './belief-v2';

export type SchoolAgeBand = 'junior-10-13' | 'youth-14-18';
export type LegacySchoolAgeBand = 'junior-12-13';

export const SCHOOL_YOUTH_BELIEVE_VERSION = 'school-youth-believe-2026.09-candidate-v2' as const;
export const SCHOOL_JUNIOR_BELIEVE_VERSION = 'school-junior-believe-2026.09-candidate-v3' as const;

type ModePairs = { think: readonly [string, string]; feel: readonly [string, string]; act: readonly [string, string] };

// Plain-language parallel form. IDs, constructs, modes, direction and scoring metadata
// deliberately remain aligned with the adult bank. Wording equivalence still requires
// cognitive interviews and empirical testing with 14-18 year olds.
const youthPairs: Record<BeliefConstruct, ModePairs> = {
  'public-provision': {
    think: ['Government should make sure everyone can get essential services such as healthcare and education.', 'Government should have a smaller role, with people using more private choices for essential services.'],
    feel: ['I worry more when people may miss essential services because they cannot afford private options.', 'I worry more when government control of essential services reduces choice and independence.'],
    act: ['If a local clinic might close, I would support public funding to keep it open for everyone.', 'If a local clinic might close, I would first look for a private provider instead of more public funding.'],
  },
  redistribution: {
    think: ['Government should use taxes and support payments to reduce very large income gaps.', 'Government should interfere less with income differences, even when some gaps become very large.'],
    feel: ['Very large income gaps concern me more than the higher taxes used to reduce them.', 'Higher taxes concern me more than very large income gaps.'],
    act: ['I would accept paying a little more tax if it helped families with very low incomes.', 'I would choose lower taxes, even if less money was available to support families with very low incomes.'],
  },
  ownership: {
    think: ['Workers, cooperatives or the public should own a larger share of big companies.', 'Big companies should normally remain mainly owned by private investors, with rules protecting workers.'],
    feel: ['It feels fairer when workers, cooperatives or the public own more of big companies.', 'It feels fairer when private investors keep most ownership, while laws protect workers.'],
    act: ['At a large company, I would give workers a real ownership stake and a vote on major decisions.', 'At a large company, I would leave ownership and major decisions mainly with its private investors.'],
  },
  'social-change': {
    think: ['Public rules should change fairly soon when a new social norm gains strong support.', 'Long-standing rules should change only after a new social norm has broad and lasting support.'],
    feel: ['I feel more uneasy when public rules fall behind a widely supported social change.', 'I feel more uneasy when long-standing rules change before society broadly accepts the change.'],
    act: ['If a long-standing school rule no longer fitted most students’ lives, I would change it fairly soon.', 'I would keep a long-standing school rule until support for changing it was broad and lasting.'],
  },
  'personal-autonomy': {
    think: ['Adults should normally be free to make private choices that do not directly harm other people.', 'Law may restrict some private adult choices to protect shared moral standards, even without direct harm.'],
    feel: ['I am more uncomfortable when government restricts harmless private choices between adults.', 'I am more uncomfortable when law gives no weight to shared moral standards.'],
    act: ['If adults made a private choice I disliked but harmed nobody, I would still oppose a legal ban.', 'I could support a legal ban on a private adult choice if it seriously went against shared values.'],
  },
  abortion: {
    think: ['Abortion should generally remain legal because the pregnant person should make the main decision.', 'Abortion should face stronger legal limits because prenatal life should receive greater protection.'],
    feel: ['I am more concerned about taking the decision away from the pregnant person.', 'I am more concerned about not protecting prenatal life.'],
    act: ['In a vote on abortion law, I would support wider legal access.', 'In a vote on abortion law, I would support stronger legal limits.'],
  },
  'authority-order': {
    think: ['Government should restrict freedom only when it can show a clear and serious risk of harm.', 'Government may restrict some freedoms early when there is a believable risk of serious disorder.'],
    feel: ['During a crisis, I worry more about government using too much power.', 'During a crisis, I worry more about authorities lacking enough power to restore safety.'],
    act: ['During violent unrest, I would keep strong legal safeguards even if the police response was slower.', 'During violent unrest, I would give police wider temporary powers even if some safeguards were reduced.'],
  },
  pluralism: {
    think: ['Winning an election should not remove checks from courts, laws, opposition parties and independent media.', 'An elected government should have wide freedom to carry out its programme even when other institutions block it.'],
    feel: ['I am more alarmed when an elected majority weakens independent checks on its power.', 'I am more alarmed when unelected institutions repeatedly block an elected government.'],
    act: ['If a court stopped a policy I supported, I would still defend the court’s independence.', 'If courts often stopped policies voters chose, I could support reducing their power.'],
  },
  'world-sovereignty': {
    think: ['Countries should accept binding international rules when shared problems cannot be solved alone.', 'Countries should keep the final national decision even when cooperation becomes less effective.'],
    feel: ['I feel more uneasy when shared problems remain unsolved because countries refuse binding agreements.', 'I feel more uneasy when international agreements limit my country’s final say.'],
    act: ['I would follow a shared climate agreement even if it limited some choices in my country.', 'I would keep my country free to decide, even if that weakened the shared climate plan.'],
  },
  'nationhood-membership': {
    think: ['A naturalised citizen can belong to the nation just as fully as someone who was a citizen from birth.', 'Being a citizen from birth should carry extra weight in deciding who fully belongs to the nation.'],
    feel: ['A naturalised citizen who takes part in the country’s life feels just as fully part of the nation to me.', 'A citizen from birth feels more fully part of the nation to me than a naturalised citizen.'],
    act: ['For a public job, I would treat two equally suitable citizens equally, wherever they were born.', 'For a public job, I would prefer the citizen born in the country if both were equally suitable.'],
  },
  populism: {
    think: ['Political disagreements usually involve several real interests and values, not only ordinary people against an elite.', 'Politics is often ordinary people against a self-serving elite that ignores their common interests.'],
    feel: ['When politics fails, I am more likely to think difficult trade-offs and competing interests are responsible.', 'When politics fails, I am more likely to blame a self-serving elite that ignores ordinary people.'],
    act: ['I would distrust a candidate who blames nearly every problem on one powerful elite.', 'I would support a candidate who promised to take power from a powerful elite and return it to ordinary people.'],
  },
  'ecology-growth': {
    think: ['Environmental limits should sometimes come before economic growth, even if growth becomes slower.', 'Economic growth should normally come first, while environmental harm is reduced without deliberately slowing growth.'],
    feel: ['I worry more about environmental damage when growth is given priority.', 'I worry more about jobs and living standards when environmental limits are given priority.'],
    act: ['I would accept somewhat higher prices if a product caused serious environmental damage.', 'I would avoid rules that raise prices and rely more on cleaner technology to protect the environment.'],
  },
  'religion-public-role': {
    think: ['Religious principles should not be used as reasons for laws applying to people who do not share that religion.', 'Religious principles can be legitimate reasons for laws even when some citizens do not share the religion.'],
    feel: ['I feel more uneasy when religious principles are used to justify laws for everyone.', 'I feel more uneasy when religious views are dismissed from public debate simply because they are religious.'],
    act: ['I would prefer politicians not to use religious principles as reasons for laws applying to everyone.', 'I would accept politicians using religious principles as legitimate reasons for laws applying to everyone.'],
  },
  subsidiarity: {
    think: ['Higher-level government should handle important services when that best guarantees equal access and standards.', 'Important services should stay with the lowest level able to manage them, such as local communities.'],
    feel: ['I feel more comfortable when higher government guarantees the same standards for everyone.', 'I feel more comfortable when capable families, communities or local institutions keep responsibility.'],
    act: ['If both approaches could work, I would choose higher government to guarantee consistent standards.', 'If both approaches could work, I would keep responsibility at the lowest capable level.'],
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
  ['Someone who becomes a citizen belongs just as fully as someone born a citizen.', 'Being born a citizen should count more when deciding who fully belongs.'],
  ['Politics usually has many groups with different needs and ideas.', 'Politics is often ordinary people against a powerful group that ignores them.'],
  ['Protecting nature should sometimes come before growing the economy.', 'Growing the economy should usually come first while we also protect nature.'],
  ['Religion should not be used to make laws for people who do not share it.', 'Religion can be a fair reason for laws, even when not everyone shares it.'],
  ['National government should run key services so everyone gets the same standard.', 'Local communities should run key services whenever they can.'],
  ['If violence broke out, I would keep strict limits on police powers.', 'If violence broke out, I would give police more power for a short time.'],
  ['If a court stopped a popular leader, I would still protect the court’s independence.', 'If courts often stopped what voters chose, I would give elected leaders more freedom.'],
  ['I would check several sources before sharing a post that blames one powerful group.', 'I would share the post quickly if it spoke for ordinary people like me.'],
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
