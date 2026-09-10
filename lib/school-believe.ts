import { lockedBeliefItemsV2 } from './belief-v2-engine';
import type { BeliefConstruct, BeliefItem } from './belief-v2';

export type SchoolAgeBand = 'junior-10-13' | 'youth-14-18';
export type LegacySchoolAgeBand = 'junior-12-13';

export const SCHOOL_YOUTH_BELIEVE_VERSION = 'school-youth-believe-2026.09-candidate-v4-reader' as const;
export const SCHOOL_JUNIOR_BELIEVE_VERSION = 'school-junior-believe-2026.09-candidate-v4-reader' as const;

type ModePairs = { think: readonly [string, string]; feel: readonly [string, string]; act: readonly [string, string] };

// Plain-language parallel form. IDs, constructs, modes, direction and scoring metadata
// deliberately remain aligned with the adult bank. Wording equivalence still requires
// cognitive interviews and empirical testing with 14-18 year olds.
const youthPairs: Record<BeliefConstruct, ModePairs> = {
  'public-provision': {
    think: ['Government should make sure everyone can get essential services such as healthcare and education.', 'Government should have a smaller role, with people using more private choices for essential services.'],
    feel: ['It worries me when people may miss essential services because they cannot afford private options.', 'It worries me when government control of essential services leaves people with too little choice.'],
    act: ['If a local clinic might close, I would support public funding to keep it open for everyone.', 'If a reliable private provider could keep a local clinic open, I would prefer that to extra public funding.'],
  },
  redistribution: {
    think: ['Government should use taxes and support payments to reduce very large income gaps.', 'Government should interfere less with income differences, even when some gaps become very large.'],
    feel: ['Very large income gaps bother me enough to justify higher taxes on some people.', 'High taxes bother me even when they are intended to reduce very large income gaps.'],
    act: ['I would accept paying a little more tax if it helped families with very low incomes.', 'I would choose lower taxes, even if less money was available to support families with very low incomes.'],
  },
  ownership: {
    think: ['Workers, cooperatives or the public should own a larger share of big companies.', 'Big companies should usually remain privately owned, with strong rules protecting workers.'],
    feel: ['It feels fair when workers, cooperatives or the public own a meaningful part of big companies.', 'It feels fair when private investors keep most ownership while laws protect workers.'],
    act: ['If a big company offered workers a real ownership stake and more say in major decisions, I would support it.', 'If a big company was doing well, I would keep ownership and major decisions mainly with its private investors.'],
  },
  'social-change': {
    think: ['Laws and public rules should change fairly soon when a new social norm gains strong support.', 'Long-standing rules should change only after a new social norm has broad and lasting support.'],
    feel: ['I am uncomfortable when public rules fall far behind a social change that has strong support.', 'I am uncomfortable when long-standing rules change before a new social norm is widely accepted.'],
    act: ['If a long-standing school rule no longer matched most students’ lives, I would change it fairly soon.', 'I would keep a long-standing school rule until support for changing it was broad and lasting.'],
  },
  'personal-autonomy': {
    think: ['Adults should normally be free to make private choices that do not directly harm other people.', 'Law may restrict some private adult choices to protect shared moral standards, even without direct harm.'],
    feel: ['Government restricting harmless private choices between adults makes me uncomfortable.', 'A legal system that gives no weight to widely shared moral standards makes me uncomfortable.'],
    act: ['If adults made a private choice I disliked but harmed nobody, I would still oppose a legal ban.', 'I could support a legal ban on a private adult choice if it seriously went against shared values.'],
  },
  abortion: {
    think: ['Abortion should generally remain legal because the pregnant person should make the main decision.', 'Abortion should face stronger legal limits because prenatal life should receive greater protection.'],
    feel: ['Restrictions on abortion concern me because they can take an important decision away from the pregnant person.', 'Broad abortion access concerns me because prenatal life may receive too little protection.'],
    act: ['In a vote on abortion law, I would support wider legal access.', 'In a vote on abortion law, I would support stronger legal limits.'],
  },
  'authority-order': {
    think: ['Government should restrict freedom only when it can show a clear and serious risk of harm.', 'Government may restrict some freedoms early when there is a believable risk of serious disorder.'],
    feel: ['During a crisis, government using too much power worries me.', 'During a crisis, authorities having too little power to restore safety worries me.'],
    act: ['During violent unrest, I would keep strong legal safeguards even if the police response was slower.', 'During violent unrest, I would give police wider temporary powers even if some safeguards were reduced.'],
  },
  pluralism: {
    think: ['Winning an election should not remove checks from courts, laws, opposition parties and independent media.', 'An elected government should have wide freedom to carry out legal policies even when other institutions strongly oppose them.'],
    feel: ['It worries me when elected leaders weaken independent checks on their power.', 'It worries me when independent bodies repeatedly block legal and constitutional policies chosen by an elected government.'],
    act: ['If a court stopped a policy I supported, I would still defend the court’s independence.', 'If courts often stopped legal policies voters chose, I could support reducing some of their power.'],
  },
  'world-sovereignty': {
    think: ['Countries should accept binding international rules when shared problems cannot be solved alone.', 'Countries should keep the final national decision even when cooperation becomes less effective.'],
    feel: ['It worries me when shared problems remain unsolved because countries refuse binding cooperation.', 'It worries me when international agreements prevent my country from making its own final decision on an important issue.'],
    act: ['I would follow a shared climate agreement even if it limited some choices in my country.', 'I would keep my country free to decide, even if that weakened the shared climate plan.'],
  },
  'nationhood-membership': {
    think: ['Someone who becomes a citizen can belong to the nation just as fully as someone who was a citizen from birth.', 'Being a citizen from birth is an important part of national belonging beyond legal citizenship alone.'],
    feel: ['A naturalized citizen who takes part in civic life feels fully part of the nation to me.', 'Long-standing family roots in the country matter to my sense of national belonging.'],
    act: ['I would allow naturalized citizens to hold the same elected offices as people who have been citizens from birth.', 'I would reserve some senior elected offices for citizens from birth.'],
  },
  populism: {
    think: ['Political disagreements usually reflect real conflicts among interests and values, not one side simply betraying ordinary voters.', 'Political decisions often give too much influence to well-connected groups and too little to ordinary voters.'],
    feel: ['When politics disappoints me, I usually think difficult trade-offs and competing interests are the main reason.', 'When politics disappoints me, I often suspect well-connected groups are being heard more than ordinary voters.'],
    act: ['I prefer candidates who explain political trade-offs openly, even when the message is less dramatic.', 'I prefer candidates who promise to reduce the influence of well-connected groups and give ordinary voters more direct influence.'],
  },
  'ecology-growth': {
    think: ['Environmental limits should sometimes come before economic growth, even if growth becomes slower.', 'Economic growth should normally come first, while environmental harm is reduced without deliberately slowing growth.'],
    feel: ['Serious environmental damage worries me even when preventing it could slow economic growth.', 'Lost jobs and living standards worry me when environmental limits significantly slow economic growth.'],
    act: ['I would accept somewhat higher prices if a product caused serious environmental damage.', 'I would avoid rules that raise prices and rely more on cleaner technology to protect the environment.'],
  },
  'religion-public-role': {
    think: ['Religious principles should not be enough to justify laws applying to people who do not share that religion.', 'Religious principles can be legitimate reasons for laws even when some citizens do not share the religion.'],
    feel: ['I am uneasy when religious principles are used to justify laws for people who do not share that faith.', 'I am uneasy when religious views are dismissed from public debate simply because they are religious.'],
    act: ['I would prefer politicians not to rely mainly on religious principles when justifying laws that apply to everyone.', 'I would accept politicians using religious principles as legitimate reasons for laws applying to everyone.'],
  },
  subsidiarity: {
    think: ['National or regional government should run important services when that is the best way to guarantee equal access and standards.', 'Important services should usually stay with local government or community institutions when they can provide them well.'],
    feel: ['I feel confident when national or regional government sets the same minimum standard for important services everywhere.', 'I feel confident when capable local institutions keep control rather than handing decisions to regional or national government.'],
    act: ['If local areas provided very different quality, I would support national or regional standards even if local control were reduced.', 'If local services worked well, I would keep decisions local even if national rules would make them more uniform.'],
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
