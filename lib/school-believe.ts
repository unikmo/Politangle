import { lockedBeliefItemsV2 } from './belief-v2-engine';
import type { BeliefConstruct, BeliefItem } from './belief-v2';

export type SchoolAgeBand = 'junior-12-13' | 'youth-14-18';

export const SCHOOL_YOUTH_BELIEVE_VERSION = 'school-youth-believe-2026.09-candidate-v1' as const;
export const SCHOOL_JUNIOR_BELIEVE_VERSION = 'school-junior-believe-2026.09-candidate-v1' as const;

type ModePairs = { think: readonly [string, string]; feel: readonly [string, string]; act: readonly [string, string] };

// Plain-language parallel form. IDs, constructs, modes, direction and scoring metadata
// deliberately remain aligned with the adult bank. Wording equivalence still requires
// cognitive interviews and empirical testing with 14-18 year olds.
const youthPairs: Record<BeliefConstruct, ModePairs> = {
  'public-provision': {
    think: ['Government should make sure everyone can get essential services such as healthcare and education.', 'Government should have a smaller role, with people using more private choices for essential services.'],
    feel: ['I worry more when people may miss essential services because they cannot afford private options.', 'I worry more when government control of essential services reduces choice and independence.'],
    act: ['I would vote for government taking more responsibility to guarantee essential services.', 'I would vote for a smaller government role and more private responsibility for essential services.'],
  },
  redistribution: {
    think: ['Government should use taxes and support payments to reduce very large income gaps.', 'Government should interfere less with income differences, even when some gaps become very large.'],
    feel: ['Very large income gaps concern me more than the higher taxes used to reduce them.', 'Higher taxes concern me more than very large income gaps.'],
    act: ['I would support moderately higher taxes, including for me later, if they reduced very large income gaps.', 'I would choose lower taxes even if very large income gaps remained.'],
  },
  ownership: {
    think: ['Workers, cooperatives or the public should own a larger share of big companies.', 'Big companies should normally remain mainly owned by private investors, with rules protecting workers.'],
    feel: ['It feels fairer when workers, cooperatives or the public own more of big companies.', 'It feels fairer when private investors keep most ownership, while laws protect workers.'],
    act: ['I would support policies that move more big-company ownership to workers, cooperatives or public funds.', 'I would keep most big-company ownership with private investors.'],
  },
  'social-change': {
    think: ['Public rules should change fairly soon when a new social norm gains strong support.', 'Long-standing rules should change only after a new social norm has broad and lasting support.'],
    feel: ['I feel more uneasy when public rules fall behind a widely supported social change.', 'I feel more uneasy when long-standing rules change before society broadly accepts the change.'],
    act: ['I would usually update an old rule once a new norm had strong, although not overwhelming, support.', 'I would usually keep the old rule until support for change was broad and lasting.'],
  },
  'personal-autonomy': {
    think: ['Adults should normally be free to make private choices that do not directly harm other people.', 'Law may restrict some private adult choices to protect shared moral standards, even without direct harm.'],
    feel: ['I am more uncomfortable when government restricts harmless private choices between adults.', 'I am more uncomfortable when law gives no weight to shared moral standards.'],
    act: ['Even if I strongly disliked a private adult choice, I would oppose banning it when it harmed nobody else.', 'I could support banning a private adult choice if I believed it seriously damaged shared moral standards.'],
  },
  abortion: {
    think: ['Abortion should generally remain legal because the pregnant person should make the main decision.', 'Abortion should face stronger legal limits because prenatal life should receive greater protection.'],
    feel: ['I am more concerned about taking the decision away from the pregnant person.', 'I am more concerned about not protecting prenatal life.'],
    act: ['I would vote for broader legal access to abortion.', 'I would vote for stronger legal limits on abortion.'],
  },
  'authority-order': {
    think: ['Government should restrict freedom only when it can show a clear and serious risk of harm.', 'Government may restrict some freedoms early when there is a believable risk of serious disorder.'],
    feel: ['During a crisis, I worry more about government using too much power.', 'During a crisis, I worry more about authorities lacking enough power to restore safety.'],
    act: ['During serious disorder, I would keep strong legal safeguards even if action became slower.', 'During serious disorder, I would allow wider temporary powers even if some safeguards were reduced.'],
  },
  pluralism: {
    think: ['Winning an election should not remove checks from courts, laws, opposition parties and independent media.', 'An elected government should have wide freedom to carry out its programme even when other institutions block it.'],
    feel: ['I am more alarmed when an elected majority weakens independent checks on its power.', 'I am more alarmed when unelected institutions repeatedly block an elected government.'],
    act: ['I would defend independent checks even when they slowed a government I strongly supported.', 'I could support reducing those checks if they repeatedly blocked the elected programme.'],
  },
  'world-sovereignty': {
    think: ['Countries should accept binding international rules when shared problems cannot be solved alone.', 'Countries should keep the final national decision even when cooperation becomes less effective.'],
    feel: ['I feel more uneasy when shared problems remain unsolved because countries refuse binding agreements.', 'I feel more uneasy when international agreements limit my country’s final say.'],
    act: ['I would support a necessary international agreement even if it limited some national choices.', 'I would keep national control even if the international response became less effective.'],
  },
  'nationhood-membership': {
    think: ['A naturalised citizen can belong to the nation just as fully as someone who was a citizen from birth.', 'Being a citizen from birth should carry extra weight in deciding who fully belongs to the nation.'],
    feel: ['A naturalised citizen who takes part in the country’s life feels just as fully part of the nation to me.', 'A citizen from birth feels more fully part of the nation to me than a naturalised citizen.'],
    act: ['I would not prefer one equally suitable candidate only because they were a citizen from birth.', 'I would prefer the citizen from birth over an equally suitable naturalised citizen.'],
  },
  populism: {
    think: ['Political disagreements usually involve several real interests and values, not only ordinary people against an elite.', 'Politics is often ordinary people against a self-serving elite that ignores their common interests.'],
    feel: ['When politics fails, I am more likely to think difficult trade-offs and competing interests are responsible.', 'When politics fails, I am more likely to blame a self-serving elite that ignores ordinary people.'],
    act: ['I would prefer a candidate who says political problems cannot usually be reduced to people versus elite.', 'I would prefer a candidate promising to take power back from an elite and carry out the people’s common will.'],
  },
  'ecology-growth': {
    think: ['Environmental limits should sometimes come before economic growth, even if growth becomes slower.', 'Economic growth should normally come first, while environmental harm is reduced without deliberately slowing growth.'],
    feel: ['I worry more about environmental damage when growth is given priority.', 'I worry more about jobs and living standards when environmental limits are given priority.'],
    act: ['I would support firm environmental limits even if they moderately slowed economic growth.', 'I would reject limits designed to slow growth and choose environmental policies that protect growth.'],
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
  ['Government should make sure every family can get essential services such as healthcare and education.', 'Families should make more of their own arrangements, with government playing a smaller role.'],
  ['Taxes and public support should reduce very large gaps between rich and poor.', 'Government should interfere less with income differences, even when the gaps are large.'],
  ['Workers, cooperatives or the public should own more of very large companies.', 'Very large companies should normally remain owned mainly by private investors.'],
  ['School and public rules should change fairly soon when society’s views change.', 'Long-standing rules should change slowly and only after broad agreement.'],
  ['People should be free to make private choices when those choices do not harm anyone else.', 'Some private choices may be restricted to protect important shared values.'],
  ['Authorities should limit freedom only when there is a clear risk of serious harm.', 'Authorities may limit some freedom early to prevent serious disorder.'],
  ['Even elected leaders must be checked by courts, laws, opposition parties and independent media.', 'Leaders who win an election should have wide freedom to carry out what voters chose.'],
  ['Countries should accept shared international rules when problems such as climate change cross borders.', 'Each country should keep the final say even when solving shared problems becomes harder.'],
  ['A person who becomes a citizen can belong just as fully as someone who was born a citizen.', 'Being born a citizen should count more when deciding who fully belongs.'],
  ['Politics usually contains several groups with real interests, not only good ordinary people against a bad elite.', 'Politics is often ordinary people against an elite that protects itself and ignores them.'],
  ['Protecting nature should sometimes come before economic growth.', 'Economic growth should normally come first while environmental damage is reduced in other ways.'],
  ['Religious beliefs should not be used to make laws for people who do not share them.', 'Religious beliefs can be fair reasons for laws even when not everyone shares them.'],
  ['National government should run important services when that gives everyone the same standard.', 'Local communities should run important services whenever they are able to do so.'],
  ['During a crisis, I worry more about leaders receiving too much power.', 'During a crisis, I worry more about leaders not having enough power to keep people safe.'],
  ['I feel more worried when elected leaders weaken courts, laws or independent media.', 'I feel more worried when courts or other institutions repeatedly block elected leaders.'],
  ['When politics goes badly, I first think about hard choices and groups wanting different things.', 'When politics goes badly, I first think an elite is ignoring ordinary people.'],
];

export const schoolJuniorBeliefItems: readonly BeliefItem[] = juniorSources.map((sourceId, index) => {
  const source = lockedBeliefItemsV2.find((item) => item.id === sourceId)!;
  const pair = juniorPairs[index];
  return { ...source, id: `J${String(index + 1).padStart(2, '0')}`, stage: 'quick', negative: pair[0], positive: pair[1] };
});

export function schoolBeliefItems(ageBand: SchoolAgeBand) {
  return ageBand === 'junior-12-13' ? schoolJuniorBeliefItems : schoolYouthBeliefItems;
}
