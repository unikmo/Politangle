export const MIDDLE_CLASS_TRAP_VERSION = 'middle-class-trap-2026.09-candidate-2' as const;
export const MIDDLE_CLASS_TRAP_SIZE = 20;

export const MIDDLE_CLASS_TRAP_ANGLES = [
  'economic_position',
  'looking_upward',
  'blaming_downward',
  'household_balance',
  'following_power',
] as const;

export type MiddleClassTrapAngle = typeof MIDDLE_CLASS_TRAP_ANGLES[number];

export const MIDDLE_CLASS_TRAP_ANGLE_LABELS: Readonly<Record<MiddleClassTrapAngle, string>> = {
  economic_position: 'Income, wealth and security',
  looking_upward: 'Looking upward',
  blaming_downward: 'Blaming downward',
  household_balance: 'The full household balance',
  following_power: 'Following money and power',
};

export const MIDDLE_CLASS_TRAP_ANGLE_MEANINGS: Readonly<Record<MiddleClassTrapAngle, string>> = {
  economic_position: 'Distinguishing a good salary from lasting wealth and financial security.',
  looking_upward: 'Checking whether an elite-focused policy would actually help a normal middle-income household.',
  blaming_downward: 'Recognising when anger at poorer groups hides larger costs or privileges elsewhere.',
  household_balance: 'Adding taxes, services, fees and private replacement costs before judging a policy.',
  following_power: 'Looking past a policy label to see who qualifies, who gains most and who shaped the rule.',
};

export type MiddleClassTrapOption = { id: string; label: string; feedback: string };
export type MiddleClassTrapQuestion = {
  id: string;
  angle: MiddleClassTrapAngle;
  prompt: string;
  hint: string;
  options: readonly MiddleClassTrapOption[];
  answerId: string;
  explanation: string;
  evidenceIds: readonly string[];
  status: 'candidate';
};

function candidate(question: Omit<MiddleClassTrapQuestion, 'status'>): MiddleClassTrapQuestion {
  return { ...question, status: 'candidate' };
}

export const middleClassTrapQuiz: readonly MiddleClassTrapQuestion[] = [
  candidate({
    id:'M1', angle:'economic_position',
    prompt:'Mara earns €80,000 but rents and has little savings. Lea earns €35,000 and owns two debt-free flats. Who is more secure?',
    hint:'A salary arrives each year. Property and savings remain even when work stops.',
    options:[
      {id:'a',label:'Mara, because salary alone decides security',feedback:'Salary matters, but losing the job could quickly remove Mara’s main resource.'},
      {id:'b',label:'Lea, because her assets provide a stronger cushion',feedback:'Debt-free assets can provide housing, income and protection when earnings stop.'},
      {id:'c',label:'They are equally secure because both have income',feedback:'Their incomes do not show the very different asset cushions behind them.'},
      {id:'d',label:'It cannot be discussed without knowing their politics',feedback:'Political identity does not determine the financial cushion described here.'},
    ], answerId:'b',
    explanation:'Income and wealth are different. A good salary can still leave a household dependent on every future pay cheque.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M2', angle:'economic_position',
    prompt:'A professional family can cover its bills but would struggle after six months without wages. What does this show?',
    hint:'Ask whether their standard of living depends mainly on continued employment.',
    options:[
      {id:'a',label:'A high income always creates lasting wealth',feedback:'High earnings do not guarantee substantial savings, property or investment income.'},
      {id:'b',label:'Employment risk no longer matters to professionals',feedback:'Professional households can remain highly dependent on continued wages.'},
      {id:'c',label:'Comfortable living can coexist with financial vulnerability',feedback:'A household may live well while lacking the assets to absorb a long interruption.'},
      {id:'d',label:'The family must be hiding considerable wealth',feedback:'Nothing in the scenario establishes hidden assets.'},
    ], answerId:'c',
    explanation:'Middle class can describe lifestyle or income without guaranteeing durable security against unemployment, illness or housing costs.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M3', angle:'economic_position',
    prompt:'Why can two households with the same annual income have very different economic power?',
    hint:'Compare debt, property, inherited assets and income that does not depend on work.',
    options:[
      {id:'a',label:'Wealth, debt and income sources may differ greatly',feedback:'Assets, liabilities and dependence on wages strongly affect security and opportunity.'},
      {id:'b',label:'Annual income already captures every important difference',feedback:'Annual income does not reveal accumulated assets, debt or inherited advantages.'},
      {id:'c',label:'The older household is automatically more powerful',feedback:'Age can matter, but it does not establish wealth or economic power by itself.'},
      {id:'d',label:'Only household size can explain the difference',feedback:'Household size matters for needs, but not every difference in wealth and power.'},
    ], answerId:'a',
    explanation:'Class position cannot be read from salary alone. Wealth and income sources affect resilience, influence and future choices.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M4', angle:'economic_position',
    prompt:'A salaried manager and a billionaire both dislike higher taxes. Why might their economic interests still differ?',
    hint:'One mainly sells labour. The other can live from ownership and accumulated assets.',
    options:[
      {id:'a',label:'Managers never own investments',feedback:'Managers may own assets, but usually not on the scale described.'},
      {id:'b',label:'Billionaires never receive salaries',feedback:'They may receive salaries, though ownership can remain their dominant resource.'},
      {id:'c',label:'Equal opinions always mean equal economic interests',feedback:'People can share an opinion while facing very different risks and policy effects.'},
      {id:'d',label:'Their main resources and financial risks are different',feedback:'Dependence on wages creates different interests from living mainly through large-scale ownership.'},
    ], answerId:'d',
    explanation:'Shared tax frustration does not erase the difference between earning mainly through work and holding large pools of capital.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),

  candidate({
    id:'M5', angle:'looking_upward',
    prompt:'A couple supports a tax break for multi-million inheritances because their home may pass to their children. What should they check?',
    hint:'A policy can use a familiar example while delivering most value far above it.',
    options:[
      {id:'a',label:'Whether their estate qualifies and who receives most savings',feedback:'Eligibility and distribution show whether the policy protects their home or mainly much larger fortunes.'},
      {id:'b',label:'Whether wealthy families describe the policy as fair',feedback:'A beneficiary’s description does not reveal how gains are distributed.'},
      {id:'c',label:'Whether inheritance feels like a private family matter',feedback:'That feeling does not establish whether this specific tax break helps the couple.'},
      {id:'d',label:'Whether they hope to become much richer later',feedback:'Future hopes do not show who receives the policy’s current benefits.'},
    ], answerId:'a',
    explanation:'The trap is assuming a policy for very large fortunes protects ordinary family security without checking thresholds and beneficiaries.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M6', angle:'looking_upward',
    prompt:'A proposal is advertised as helping “business owners.” It covers a corner shop and a global billionaire. What information is missing?',
    hint:'The same label can hide enormous differences in scale and financial protection.',
    options:[
      {id:'a',label:'Whether both owners work equally hard',feedback:'Effort is difficult to compare and does not show the policy’s distribution.'},
      {id:'b',label:'Whether both businesses sell the same products',feedback:'Product similarity would not reveal the owners’ resources or gains.'},
      {id:'c',label:'How benefits differ by business size and owner wealth',feedback:'Distribution by scale reveals whether a broad label hides concentrated gains.'},
      {id:'d',label:'Whether the shopkeeper admires the billionaire',feedback:'Personal admiration does not measure who benefits from the proposal.'},
    ], answerId:'c',
    explanation:'“Business owner” is too broad for distributional analysis. A small livelihood and a vast fortune are not equivalent positions.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M7', angle:'looking_upward',
    prompt:'A worker favours lower taxes on large investment gains because she hopes to invest someday. What comparison matters now?',
    hint:'Compare her present income source with the people receiving most of the immediate benefit.',
    options:[
      {id:'a',label:'Her current gains and likely benefit from the change',feedback:'Present exposure and the distribution of gains show whether aspiration matches actual benefit.'},
      {id:'b',label:'The most successful investor she follows online',feedback:'A prominent example does not show her own likely benefit.'},
      {id:'c',label:'Whether investing is considered respectable',feedback:'Social status does not measure the policy’s effect on her finances.'},
      {id:'d',label:'Whether every investment can rise forever',feedback:'Investment performance is uncertain and not the relevant distributional comparison.'},
    ], answerId:'a',
    explanation:'Future aspiration can blur present interests. The useful question is who benefits now and by how much.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M8', angle:'looking_upward',
    prompt:'Which thought most clearly shows upward identification rather than a calculation of present interest?',
    hint:'Look for a future fantasy replacing evidence about the household today.',
    options:[
      {id:'a',label:'This policy may raise my childcare bill next year',feedback:'That is a concrete present household effect.'},
      {id:'b',label:'I may be extremely rich one day, so protect fortunes now',feedback:'A hypothetical future identity is replacing analysis of the person’s current position.'},
      {id:'c',label:'I should compare the tax saving with lost services',feedback:'That is a full household comparison rather than upward identification.'},
      {id:'d',label:'I need to know which assets receive the relief',feedback:'That seeks evidence about the policy’s actual distribution.'},
    ], answerId:'b',
    explanation:'The book’s central warning is that imagined membership of the elite can outweigh a realistic reading of present interests.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP'],
  }),

  candidate({
    id:'M9', angle:'blaming_downward',
    prompt:'News reports €20 million in benefit fraud and a €2 billion tax privilege. What is the fairest comparison?',
    hint:'Apply the same evidence standard and time period to both losses.',
    options:[
      {id:'a',label:'Count only how many people appear in each story',feedback:'Case counts ignore the amount lost and the different size of each case.'},
      {id:'b',label:'Compare verified totals using the same definitions',feedback:'A shared measure reveals scale without excusing either form of abuse.'},
      {id:'c',label:'Focus on whichever story creates more anger',feedback:'Emotional force does not establish the larger public cost.'},
      {id:'d',label:'Ignore tax privileges because they are legal',feedback:'Legality does not remove their cost or the need to assess their purpose.'},
    ], answerId:'b',
    explanation:'Downward blame grows when small visible losses receive scrutiny that larger, less-visible privileges escape.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES'],
  }),
  candidate({
    id:'M10', angle:'blaming_downward',
    prompt:'A taxpayer says, “I pay for everyone else and receive nothing.” What important fact may be missing?',
    hint:'Households use shared systems even when no cash benefit enters their bank account.',
    options:[
      {id:'a',label:'Taxes never finance services used by workers',feedback:'Taxes help finance services and protections used across income groups.'},
      {id:'b',label:'Only people without jobs use public systems',feedback:'Workers also use schools, transport, health systems and social insurance.'},
      {id:'c',label:'Public services and risk protection also benefit taxpayers',feedback:'Benefits include services and insurance, not only direct cash payments.'},
      {id:'d',label:'Every taxpayer receives more cash than they pay',feedback:'That is not guaranteed and is not how collective services are measured.'},
    ], answerId:'c',
    explanation:'The taxpayer-versus-recipient story hides that the same household can finance, use and depend on public systems over time.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-PUBLIC-SERVICES-DISTRIBUTION'],
  }),
  candidate({
    id:'M11', angle:'blaming_downward',
    prompt:'A secure employee supports weaker unemployment protection because only “other people” need it. What risk is being overlooked?',
    hint:'A household’s position can change after dismissal, illness or an economic shock.',
    options:[
      {id:'a',label:'The employee may later need the same protection',feedback:'Employment security can change, making social protection part of the employee’s own risk cover.'},
      {id:'b',label:'Unemployment protection guarantees a higher salary',feedback:'It protects against income loss; it does not guarantee higher wages.'},
      {id:'c',label:'Every unemployed person will remain unemployed forever',feedback:'Duration varies, and this claim exaggerates rather than assesses risk.'},
      {id:'d',label:'Job loss affects only people with low education',feedback:'Workers across occupations can lose jobs or become unable to work.'},
    ], answerId:'a',
    explanation:'Distance from poorer groups can hide shared vulnerability. Social insurance may protect today’s contributor tomorrow.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-FISCAL-INEQUALITY'],
  }),
  candidate({
    id:'M12', angle:'blaming_downward',
    prompt:'A debate blames housing costs mainly on low-income tenants while ignoring land scarcity and investor demand. What is happening?',
    hint:'One visible group is carrying blame for a problem with several larger causes.',
    options:[
      {id:'a',label:'A complete analysis of housing supply',feedback:'The debate ignores important supply and demand forces.'},
      {id:'b',label:'A neutral comparison of every housing cost',feedback:'Key causes are omitted, so the comparison is not neutral.'},
      {id:'c',label:'Proof that low-income tenants set market prices',feedback:'Tenants do not individually determine wider land and housing markets.'},
      {id:'d',label:'Downward blame is replacing a wider cause analysis',feedback:'Attention is directed toward a weaker group while structural drivers remain less visible.'},
    ], answerId:'d',
    explanation:'The trap is not that poorer people are never involved. It is treating them as the main cause without comparing stronger forces.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  }),

  candidate({
    id:'M13', angle:'household_balance',
    prompt:'A family saves €900 in tax but pays €1,500 more for childcare and transport. What is its direct yearly result?',
    hint:'Subtract the new private costs from the tax saving.',
    options:[
      {id:'a',label:'€900 better off',feedback:'This counts the tax saving but ignores the €1,500 in new costs.'},
      {id:'b',label:'€600 worse off',feedback:'The €1,500 cost exceeds the €900 saving by €600.'},
      {id:'c',label:'€1,500 better off',feedback:'The €1,500 is an added cost, not a saving.'},
      {id:'d',label:'No change because taxes fell',feedback:'Lower taxes do not cancel a larger increase in private costs.'},
    ], answerId:'b',
    explanation:'A tax cut can leave a household worse off when public costs reappear as larger private bills.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-PUBLIC-SERVICES-DISTRIBUTION'],
  }),
  candidate({
    id:'M14', angle:'household_balance',
    prompt:'Every household must pay a new €400 annual fee. Why does it usually burden a modest household more?',
    hint:'Compare €400 with each household’s available income, not only the identical bill.',
    options:[
      {id:'a',label:'The fee is a larger share of its resources',feedback:'The same amount requires a greater sacrifice from a household with fewer resources.'},
      {id:'b',label:'The modest household receives a different invoice',feedback:'The scenario says every household receives the same €400 charge.'},
      {id:'c',label:'Wealthy households are legally unable to pay fees',feedback:'Greater resources generally make the fixed payment easier to absorb.'},
      {id:'d',label:'Fixed fees are always based on political identity',feedback:'Nothing in the scenario connects the charge with political identity.'},
    ], answerId:'a',
    explanation:'Equal cash payments are not equal burdens. The share of household resources reveals the different sacrifice.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M15', angle:'household_balance',
    prompt:'Why can VAT take a larger share of a middle- or low-income household’s current income?',
    hint:'Households with less income often need to spend more of it rather than save it.',
    options:[
      {id:'a',label:'Stores charge them a secretly higher VAT rate',feedback:'The legal rate can be the same for customers at different incomes.'},
      {id:'b',label:'They often spend more of their income on consumption',feedback:'A larger spending share can make consumption tax a larger share of current income.'},
      {id:'c',label:'High-income households are exempt from consumption tax',feedback:'High income does not normally create a general VAT exemption.'},
      {id:'d',label:'VAT applies only to wages and salaries',feedback:'VAT is charged on consumption rather than directly on employment income.'},
    ], answerId:'b',
    explanation:'The same tax rate can create different household burdens because spending and saving patterns differ.',
    evidenceIds:['OECD-VAT-DISTRIBUTION'],
  }),
  candidate({
    id:'M16', angle:'household_balance',
    prompt:'A middle-income household pays taxes and uses schools, roads, healthcare and unemployment insurance. What should its balance include?',
    hint:'Not every benefit arrives as money paid directly into the household’s account.',
    options:[
      {id:'a',label:'Only the income tax shown on its payslip',feedback:'That excludes other taxes and the value of services and protection.'},
      {id:'b',label:'Only cash benefits received during the year',feedback:'Services and insurance protection also affect household resources.'},
      {id:'c',label:'Taxes, services, protection and private replacement costs',feedback:'This captures what the household finances, receives and would otherwise buy privately.'},
      {id:'d',label:'Only whether the household feels overtaxed',feedback:'Feelings matter politically but do not calculate the household balance.'},
    ], answerId:'c',
    explanation:'A household can be both taxpayer and beneficiary. The full balance includes services and protection, not only cash transfers.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-PUBLIC-SERVICES-DISTRIBUTION','IMF-FISCAL-INEQUALITY'],
  }),

  candidate({
    id:'M17', angle:'following_power',
    prompt:'A tax cut is called “relief for working families” but starts above €500,000 yearly income. What should you conclude first?',
    hint:'Compare the friendly label with the actual income threshold.',
    options:[
      {id:'a',label:'Every working family receives the same benefit',feedback:'The threshold excludes the great majority of working households.'},
      {id:'b',label:'The label is broader than the people who qualify',feedback:'The wording suggests a wide benefit while the threshold targets very high incomes.'},
      {id:'c',label:'No family above the threshold earns wages',feedback:'Very high-income households may still receive substantial employment income.'},
      {id:'d',label:'The policy must therefore be illegal',feedback:'Misleading presentation does not by itself establish illegality.'},
    ], answerId:'b',
    explanation:'Policy names can invite middle-class identification. Eligibility rules reveal who actually receives the benefit.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M18', angle:'following_power',
    prompt:'A deduction is available to everyone, but only households with large taxable investments can use it fully. Who gains most?',
    hint:'Formal access is not the same as having enough assets and tax liability to claim it.',
    options:[
      {id:'a',label:'Households with no taxable investments',feedback:'They lack the investments needed to use the deduction.'},
      {id:'b',label:'Every household gains exactly the same amount',feedback:'The benefit depends on eligible investments and tax liability.'},
      {id:'c',label:'Households with the largest eligible investments',feedback:'They have more qualifying assets and can usually claim a larger deduction.'},
      {id:'d',label:'Only households receiving unemployment benefits',feedback:'Benefit receipt does not create the eligible investment described.'},
    ], answerId:'c',
    explanation:'A formally universal tax break can deliver concentrated gains when only wealthier households can use it fully.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES'],
  }),
  candidate({
    id:'M19', angle:'following_power',
    prompt:'A wealth-tax exemption is promoted with a family bakery, but most savings go to huge estates. What should be examined?',
    hint:'Ask whether the public example resembles the main financial beneficiaries.',
    options:[
      {id:'a',label:'Whether the bakery image makes the policy popular',feedback:'Popularity does not reveal who receives most of the tax saving.'},
      {id:'b',label:'Whether bakers are respected in the community',feedback:'Social respect does not show the exemption’s distribution.'},
      {id:'c',label:'Whether every estate contains a family business',feedback:'Large estates can contain many kinds of assets and ownership structures.'},
      {id:'d',label:'Who receives the largest savings under the rules',feedback:'The distribution shows whether a relatable example hides much larger beneficiaries.'},
    ], answerId:'d',
    explanation:'A middle-class symbol can sell an elite-focused policy. Follow the actual recipients and amounts rather than the campaign image.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES'],
  }),
  candidate({
    id:'M20', angle:'following_power',
    prompt:'A campaign attacks small welfare losses while proposing a much larger capital-income privilege. What question cuts through the framing?',
    hint:'Compare size, beneficiaries and who will finance the difference.',
    options:[
      {id:'a',label:'Which group is described with harsher language',feedback:'Tone can reveal framing, but it does not calculate the policy’s financial effect.'},
      {id:'b',label:'Which proposal has the shorter press release',feedback:'Document length does not show scale, beneficiaries or burden.'},
      {id:'c',label:'What each measure costs, who gains and who pays',feedback:'This comparison exposes both the financial scale and the distribution of power.'},
      {id:'d',label:'Whether all welfare losses should be ignored',feedback:'Smaller losses can still matter; they should be compared rather than excused.'},
    ], answerId:'c',
    explanation:'The trap works through selective attention. Apply the same scrutiny upward and downward, then compare the full amounts.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
] as const;

export function selectMiddleClassTrapQuiz() {
  return [...middleClassTrapQuiz];
}
