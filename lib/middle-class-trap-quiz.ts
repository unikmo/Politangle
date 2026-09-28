export const MIDDLE_CLASS_TRAP_VERSION = 'middle-class-trap-2026.09-candidate-4' as const;
export const MIDDLE_CLASS_TRAP_SIZE = 20;
export const MIDDLE_CLASS_TRAP_BLOCK_SIZE = 10;

export const MIDDLE_CLASS_TRAP_ANGLES = [
  'economic_position',
  'looking_upward',
  'blaming_downward',
  'household_balance',
  'following_power',
] as const;

export type MiddleClassTrapAngle = typeof MIDDLE_CLASS_TRAP_ANGLES[number];

export const MIDDLE_CLASS_TRAP_ANGLE_LABELS: Readonly<Record<MiddleClassTrapAngle, string>> = {
  economic_position: 'Salary or lasting security',
  looking_upward: 'Who really receives the benefit',
  blaming_downward: 'Who receives the blame',
  household_balance: 'Your complete household bill',
  following_power: 'Following the money',
};

export const MIDDLE_CLASS_TRAP_ANGLE_MEANINGS: Readonly<Record<MiddleClassTrapAngle, string>> = {
  economic_position: 'Seeing the difference between a good monthly income and security that remains when work stops.',
  looking_upward: 'Checking whether a policy advertised to ordinary families mainly benefits much wealthier households.',
  blaming_downward: 'Noticing when anger at poorer groups distracts from a much larger cost elsewhere.',
  household_balance: 'Adding the tax change and every new private bill before deciding whether your household wins.',
  following_power: 'Ignoring the policy slogan and checking who receives most of the money.',
};

export type MiddleClassTrapOption = { id: string; label: string; feedback: string };
export type MiddleClassTrapUnderstandingQuestion = {
  id: string;
  kind: 'understanding';
  angle: MiddleClassTrapAngle;
  prompt: string;
  hint: string;
  options: readonly MiddleClassTrapOption[];
  answerId: string;
  explanation: string;
  evidenceIds: readonly string[];
  status: 'candidate';
};

export type MiddleClassTrapSolidarityOption = MiddleClassTrapOption & { solidarity: -2 | -1 | 1 | 2 };
export type MiddleClassTrapSolidarityQuestion = {
  id: string;
  kind: 'solidarity';
  prompt: string;
  hint: string;
  options: readonly MiddleClassTrapSolidarityOption[];
  explanation: string;
  evidenceIds: readonly string[];
  status: 'candidate';
};

export type MiddleClassTrapQuestion = MiddleClassTrapUnderstandingQuestion | MiddleClassTrapSolidarityQuestion;

function candidate(question: Omit<MiddleClassTrapUnderstandingQuestion, 'kind' | 'status'>): MiddleClassTrapUnderstandingQuestion {
  return { ...question, kind: 'understanding', status: 'candidate' };
}

const middleClassTrapUnderstandingBank: readonly MiddleClassTrapUnderstandingQuestion[] = [
  candidate({
    id:'M1', angle:'economic_position',
    prompt:'Nina earns €5,000 monthly but has no savings. Amir earns €3,000 and owns his home. If both lose work, who is safer?',
    hint:'Look beyond this month’s pay. What remains after wages stop?',
    options:[
      {id:'a',label:'Nina, because her monthly pay was higher',feedback:'Her higher pay disappears if the job disappears.'},
      {id:'b',label:'Amir, because his debt-free home remains',feedback:'The home reduces his costs and remains valuable when wages stop.'},
      {id:'c',label:'Both, because neither now receives wages',feedback:'They both lose wages, but only Amir still has the debt-free home.'},
      {id:'d',label:'Nina, because housing does not affect security',feedback:'Owning a debt-free home reduces a major household risk.'},
    ], answerId:'b',
    explanation:'A high salary is not the same as wealth. Savings and property can protect a household when wages stop.',
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
    prompt:'Jon lives mainly from his salary. Eva lives mainly from shares and rent. Who benefits more from lower taxes on investment income?',
    hint:'Ask where most of each person’s money comes from.',
    options:[
      {id:'a',label:'Jon, because salaries receive the investment cut',feedback:'The change applies to investment income, not Jon’s salary.'},
      {id:'b',label:'Both, because the tax rate falls equally',feedback:'The rate may fall equally, but Eva has far more affected income.'},
      {id:'c',label:'Neither, because income sources do not matter',feedback:'The tax change applies specifically to income from investments.'},
      {id:'d',label:'Eva, because most of her income is invested',feedback:'A lower investment-income tax applies directly to most of Eva’s income.'},
    ], answerId:'d',
    explanation:'People can share an opinion about tax while receiving very different benefits from the same change.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),

  candidate({
    id:'M5', angle:'looking_upward',
    prompt:'An inheritance-tax cut starts above €5 million. A family owns a €400,000 home. Will this particular cut help them?',
    hint:'Compare the family’s property value with the starting amount.',
    options:[
      {id:'a',label:'No, because their home is below €5 million',feedback:'The stated cut begins far above the value of their home.'},
      {id:'b',label:'Yes, because it is called an inheritance cut',feedback:'The policy name does not remove the €5 million starting point.'},
      {id:'c',label:'Yes, because property prices may rise later',feedback:'A possible future rise does not make a €400,000 home eligible now.'},
      {id:'d',label:'It depends only on the family’s yearly income',feedback:'The stated rule depends on inherited value, not yearly income.'},
    ], answerId:'a',
    explanation:'A policy may sound relevant to ordinary families while its actual threshold limits the benefit to much larger estates.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M6', angle:'looking_upward',
    prompt:'A “small-business tax cut” gives 80% of its savings to companies worth over €100 million. What does that tell you?',
    hint:'Compare the policy’s name with where most of the money goes.',
    options:[
      {id:'a',label:'Most savings go to the largest companies',feedback:'The 80% figure shows where most of the tax saving goes.'},
      {id:'b',label:'The name proves small firms gain most',feedback:'The 80% figure contradicts the friendly policy name.'},
      {id:'c',label:'Every company receives an equal cash saving',feedback:'Equal cash savings would not send 80% to the largest companies.'},
      {id:'d',label:'Only small firms can receive any benefit',feedback:'The figures show that very large companies receive most savings.'},
    ], answerId:'a',
    explanation:'A friendly policy name does not show who receives most of the money. The figures do.',
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
    prompt:'The state loses €20 million through benefit fraud and €2 billion through large-scale tax avoidance. Which loss is bigger?',
    hint:'€2 billion is €2,000 million.',
    options:[
      {id:'a',label:'Benefit fraud, because it involves benefits',feedback:'The label does not change the amounts given in the question.'},
      {id:'b',label:'Tax avoidance, by one hundred times',feedback:'€2 billion is 100 times €20 million.'},
      {id:'c',label:'Both losses are exactly the same size',feedback:'€20 million and €2 billion are not equal amounts.'},
      {id:'d',label:'It is impossible to compare money amounts',feedback:'The amounts use the same currency and can be compared directly.'},
    ], answerId:'b',
    explanation:'Both losses matter. The trap begins when the smaller visible loss receives all the anger while the larger one escapes attention.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES'],
  }),
  candidate({
    id:'M10', angle:'blaming_downward',
    prompt:'Luis says, “I pay taxes but get nothing back.” He uses public roads, schools and health insurance. What is he overlooking?',
    hint:'Not every benefit arrives as cash in a bank account.',
    options:[
      {id:'a',label:'Only cash payments count as public support',feedback:'Roads, schools and insurance are valuable even without a cash payment.'},
      {id:'b',label:'Insurance counts only after he makes a claim',feedback:'Insurance provides protection before a claim is ever needed.'},
      {id:'c',label:'He also receives services and financial protection',feedback:'Taxes help provide services and protection that Luis already uses.'},
      {id:'d',label:'Taxes support only households below his income',feedback:'Public services and insurance are used across income groups.'},
    ], answerId:'c',
    explanation:'A household can pay taxes and benefit from public systems at the same time. Support is not limited to cash benefits.',
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
    prompt:'A family saves €900 in tax but must pay €1,500 more for childcare and buses. What is the yearly result?',
    hint:'Start with the €900 saving, then subtract the €1,500 cost.',
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
    prompt:'A tax cut saves Anna €700. Service cuts make her pay €1,000 privately for the same care. Is she better off?',
    hint:'Compare the saving with the new bill.',
    options:[
      {id:'a',label:'Yes, she is €700 better off',feedback:'This counts the tax saving but ignores the new €1,000 bill.'},
      {id:'b',label:'Yes, because tax cuts always save money',feedback:'A larger private bill can exceed a tax saving.'},
      {id:'c',label:'No, she is €300 worse off',feedback:'The €1,000 bill is €300 larger than the €700 saving.'},
      {id:'d',label:'No, she is €1,700 worse off',feedback:'The saving offsets part of the new bill, leaving a €300 loss.'},
    ], answerId:'c',
    explanation:'Judge a tax change together with the new household costs it creates. The tax bill alone does not show the final result.',
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
    prompt:'A tax discount is “open to everyone,” but requires €100,000 in investments. Who can actually use it?',
    hint:'Ask who already owns enough investments to qualify.',
    options:[
      {id:'a',label:'People with no savings at all',feedback:'They do not have the required €100,000 investment.'},
      {id:'b',label:'Every household, regardless of its savings',feedback:'Formal access does not help households that cannot meet the requirement.'},
      {id:'c',label:'People who already hold large investments',feedback:'They have the assets needed to qualify for the discount.'},
      {id:'d',label:'People whose wages exceed €100,000',feedback:'The rule concerns investments, not yearly wages.'},
    ], answerId:'c',
    explanation:'A benefit can be open to everyone on paper but useful only to people who already have substantial assets.',
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
    prompt:'A campaign highlights a €20 million welfare loss but barely mentions a €2 billion tax break. What should you compare first?',
    hint:'Use the same measure for both stories: euros, beneficiaries and payers.',
    options:[
      {id:'a',label:'How many individual cases each story contains',feedback:'Case counts alone can hide a very large difference in euros.'},
      {id:'b',label:'Whether both measures are currently legal',feedback:'Legality does not show their size, beneficiaries or final cost.'},
      {id:'c',label:'The cost, beneficiaries and payers of both',feedback:'The same three checks make the two measures directly comparable.'},
      {id:'d',label:'How often each story appears in the news',feedback:'News frequency does not show which measure costs more.'},
    ], answerId:'c',
    explanation:'The trap is selective attention. Compare upward and downward losses by the same standard before deciding which matters more.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
] as const;

const selectedUnderstandingIds = new Set(['M1','M4','M5','M6','M9','M10','M13','M16','M18','M20']);

export const middleClassTrapSolidarityQuestions: readonly MiddleClassTrapSolidarityQuestion[] = [
  {
    id:'S1', kind:'solidarity', status:'candidate',
    prompt:'A country is changing inheritance tax. Which option comes closest to your view?',
    hint:'There is no correct answer. Choose who you most want the rule to protect.',
    options:[
      {id:'a',label:'Leave every inheritance untaxed',feedback:'You give first priority to keeping inherited property within families.',solidarity:-2},
      {id:'b',label:'Give broad protection to large family businesses',feedback:'You lean toward protecting ownership and business continuity.',solidarity:-1},
      {id:'c',label:'Protect normal homes but tax very large estates',feedback:'You lean toward family security while asking the largest estates to contribute.',solidarity:1},
      {id:'d',label:'Tax very large inheritances to widen opportunity',feedback:'You give first priority to broader opportunity beyond the inheriting family.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first protect inherited ownership or wider opportunity when the two conflict.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  },
  {
    id:'S2', kind:'solidarity', status:'candidate',
    prompt:'Government can fund one tax cut: investment profits or ordinary wages. Which should receive more?',
    hint:'Choose whose tax burden you would reduce first.',
    options:[
      {id:'a',label:'All of it for large investment profits',feedback:'You give first priority to people receiving substantial investment income.',solidarity:-2},
      {id:'b',label:'Mostly investment profits, partly wages',feedback:'You lean toward investment owners while sharing some relief with workers.',solidarity:-1},
      {id:'c',label:'Mostly wages, partly investment profits',feedback:'You lean toward wage earners while retaining some investment relief.',solidarity:1},
      {id:'d',label:'All of it for ordinary wages',feedback:'You give first priority to households that depend mainly on work.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first protect income from ownership or income from work.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-TAX-INCLUSIVE-GROWTH'],
  },
  {
    id:'S3', kind:'solidarity', status:'candidate',
    prompt:'The government needs €300 from an average household. How should the charge work?',
    hint:'A fixed charge is equal in euros. An income-based charge changes with ability to pay.',
    options:[
      {id:'a',label:'Charge every household exactly €300',feedback:'You prefer the same cash charge, regardless of household income.',solidarity:-2},
      {id:'b',label:'Charge €300, except in severe hardship',feedback:'You lean toward equal charges with limited protection at the bottom.',solidarity:-1},
      {id:'c',label:'Charge less below average and more above',feedback:'You lean toward sharing the burden according to household resources.',solidarity:1},
      {id:'d',label:'Make the charge strongly depend on income',feedback:'You give strongest protection to households with less money available.',solidarity:2},
    ],
    explanation:'Your choice shows whether fairness means paying the same euros or making a similar financial sacrifice.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH','OECD-INCOME-CONSUMPTION-WEALTH'],
  },
  {
    id:'S4', kind:'solidarity', status:'candidate',
    prompt:'Job-loss insurance needs more money. Which option comes closest to your view?',
    hint:'Choose between keeping today’s contributions low and protecting people who lose work.',
    options:[
      {id:'a',label:'Keep contributions unchanged and cut support sharply',feedback:'You give first priority to current workers and employers paying no more.',solidarity:-2},
      {id:'b',label:'Limit any increase and reduce support slightly',feedback:'You lean toward keeping current costs low while preserving some support.',solidarity:-1},
      {id:'c',label:'Raise contributions slightly and protect support',feedback:'You lean toward sharing the cost of meaningful job-loss protection.',solidarity:1},
      {id:'d',label:'Protect support even if contributions rise clearly',feedback:'You give first priority to households that suddenly lose wages.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first limit today’s payments or protect households after job loss.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-FISCAL-INEQUALITY'],
  },
  {
    id:'S5', kind:'solidarity', status:'candidate',
    prompt:'Rents are rising quickly. Whose position should new housing rules protect most?',
    hint:'Choose your first concern when owner income and housing security conflict.',
    options:[
      {id:'a',label:'Large investors and their property returns',feedback:'You give first priority to protecting large-scale property ownership.',solidarity:-2},
      {id:'b',label:'Small landlords and their rental income',feedback:'You lean toward protecting smaller property owners.',solidarity:-1},
      {id:'c',label:'Tenants, while limiting harm to small landlords',feedback:'You lean toward housing security while recognising small-owner costs.',solidarity:1},
      {id:'d',label:'Tenants at risk of losing their homes',feedback:'You give first priority to households with the least housing security.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first protect property income or people at risk of losing housing.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  },
  {
    id:'S6', kind:'solidarity', status:'candidate',
    prompt:'Tax and benefit investigators are limited. Which cases should they check first?',
    hint:'Choose whether visibility, number of cases or money lost should guide them.',
    options:[
      {id:'a',label:'Benefit cases first, even when amounts are small',feedback:'You direct the strongest scrutiny toward benefit recipients.',solidarity:-2},
      {id:'b',label:'Mostly benefit cases, plus some large tax cases',feedback:'You lean toward checking benefit recipients more heavily.',solidarity:-1},
      {id:'c',label:'Whichever cases are expected to lose most money',feedback:'You lean toward applying the same money-based rule to both groups.',solidarity:1},
      {id:'d',label:'Large tax cases with the biggest expected losses',feedback:'You direct the strongest scrutiny toward large financial actors.',solidarity:2},
    ],
    explanation:'Your choice shows whether scrutiny points downward first or follows the largest expected loss.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-TAX-EXPENDITURES'],
  },
  {
    id:'S7', kind:'solidarity', status:'candidate',
    prompt:'A tax cut would mean families pay more themselves for schools and healthcare. Which do you prefer?',
    hint:'Choose between lower taxes and services available regardless of household income.',
    options:[
      {id:'a',label:'The largest tax cut and more private payment',feedback:'You give first priority to household control over private spending.',solidarity:-2},
      {id:'b',label:'Lower taxes with only basic public services',feedback:'You lean toward lower taxes while keeping a limited safety net.',solidarity:-1},
      {id:'c',label:'Moderate taxes and reliable public services',feedback:'You lean toward shared services while limiting the tax burden.',solidarity:1},
      {id:'d',label:'Strong public services before any tax cut',feedback:'You give first priority to services available regardless of income.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first protect private spending power or shared access to essential services.',
    evidenceIds:['OECD-PUBLIC-SERVICES-DISTRIBUTION','HERRMANN-MIDDLE-CLASS-TRAP'],
  },
  {
    id:'S8', kind:'solidarity', status:'candidate',
    prompt:'A tax on fortunes above €10 million would fund childcare. Which option comes closest to your view?',
    hint:'Choose between protecting large fortunes and expanding childcare.',
    options:[
      {id:'a',label:'Do not tax large fortunes for childcare',feedback:'You give first priority to preserving large private holdings.',solidarity:-2},
      {id:'b',label:'Use only a very small wealth tax',feedback:'You lean toward protecting large holdings while allowing limited funding.',solidarity:-1},
      {id:'c',label:'Use a moderate tax above €10 million',feedback:'You lean toward childcare while protecting wealth below a high threshold.',solidarity:1},
      {id:'d',label:'Raise enough to fund broad childcare access',feedback:'You give first priority to wider childcare access.',solidarity:2},
    ],
    explanation:'Your choice shows whether you first protect very large fortunes or families needing childcare.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-FISCAL-INEQUALITY'],
  },
  {
    id:'S9', kind:'solidarity', status:'candidate',
    prompt:'A company’s profits rise sharply, but normal wages do not. Who should receive the next increase?',
    hint:'Choose between rewarding ownership and raising pay for everyday work.',
    options:[
      {id:'a',label:'Owners should receive almost all of it',feedback:'You give first priority to the claims of company owners.',solidarity:-2},
      {id:'b',label:'Mostly owners, plus small worker bonuses',feedback:'You lean toward owners while giving workers a smaller share.',solidarity:-1},
      {id:'c',label:'Mostly workers, while owners still gain',feedback:'You lean toward workers while preserving a return to ownership.',solidarity:1},
      {id:'d',label:'Raise normal wages before owner payments',feedback:'You give first priority to workers whose pay has not risen.',solidarity:2},
    ],
    explanation:'Your choice shows how you divide priority between ownership and everyday work.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','OECD-INCOME-CONSUMPTION-WEALTH'],
  },
  {
    id:'S10', kind:'solidarity', status:'candidate',
    prompt:'Two groups need public help, but money is limited. Who should usually come first?',
    hint:'Choose whether contribution, balance or immediate hardship should matter most.',
    options:[
      {id:'a',label:'The group that paid the most tax',feedback:'You give first priority to people who contributed the most money.',solidarity:-2},
      {id:'b',label:'Give taxpayers somewhat more weight',feedback:'You lean toward contribution while still allowing support for need.',solidarity:-1},
      {id:'c',label:'Balance contribution, need and public benefit',feedback:'You lean toward need while considering contribution and wider effects.',solidarity:1},
      {id:'d',label:'The group facing the greatest immediate harm',feedback:'You give first priority to people with the least room to cope.',solidarity:2},
    ],
    explanation:'Your choice shows whether priority follows financial contribution or immediate vulnerability.',
    evidenceIds:['HERRMANN-MIDDLE-CLASS-TRAP','IMF-FISCAL-INEQUALITY'],
  },
] as const;

export const middleClassTrapQuiz: readonly MiddleClassTrapQuestion[] = [
  ...middleClassTrapUnderstandingBank.filter((question) => selectedUnderstandingIds.has(question.id)),
  ...middleClassTrapSolidarityQuestions,
];

export function selectMiddleClassTrapQuiz() {
  return [...middleClassTrapQuiz];
}
