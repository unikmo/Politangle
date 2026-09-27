export const MIDDLE_CLASS_TRAP_VERSION = 'middle-class-trap-2026.09-candidate-1' as const;
export const MIDDLE_CLASS_TRAP_SIZE = 20;

export const MIDDLE_CLASS_TRAP_ANGLES = [
  'who_bears_costs',
  'how_rules_work',
  'wealth_and_influence',
  'services_and_security',
  'claims_and_distraction',
] as const;

export type MiddleClassTrapAngle = typeof MIDDLE_CLASS_TRAP_ANGLES[number];

export const MIDDLE_CLASS_TRAP_ANGLE_LABELS: Readonly<Record<MiddleClassTrapAngle, string>> = {
  who_bears_costs: 'Who really bears the cost?',
  how_rules_work: 'How tax rules work',
  wealth_and_influence: 'Wealth, ownership and influence',
  services_and_security: 'Public services and household security',
  claims_and_distraction: 'Checking claims and distractions',
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
    id:'M1', angle:'who_bears_costs',
    prompt:'A company must legally send a payroll tax to government. Who necessarily bears its full economic cost?',
    hint:'The person sending the payment and the person losing purchasing power may differ.',
    options:[
      {id:'a',label:'The company alone',feedback:'The company remits the tax, but wages, prices or returns may also adjust.'},
      {id:'b',label:'Workers alone',feedback:'Workers may bear part through wages, but that is not automatic or always complete.'},
      {id:'c',label:'Customers alone',feedback:'Some cost may reach prices, but market conditions determine how much.'},
      {id:'d',label:'No one necessarily bears all of it',feedback:'Economic incidence may be shared among workers, owners and customers.'},
    ],answerId:'d',
    explanation:'Legal payment tells us who sends the money. Economic incidence asks whose income, return or purchasing power falls.',
    evidenceIds:['OECD-TAX-INCIDENCE'],
  }),
  candidate({
    id:'M2', angle:'who_bears_costs',
    prompt:'Why can the same VAT rate weigh more heavily on a lower-income household?',
    hint:'Compare the tax with household income, not only with the price of one item.',
    options:[
      {id:'a',label:'Lower-income households always pay a higher VAT rate',feedback:'The statutory rate can be identical across households.'},
      {id:'b',label:'They often spend more of current income on consumption',feedback:'A larger consumption share can make VAT a larger share of current income.'},
      {id:'c',label:'Higher-income households are legally exempt from VAT',feedback:'Ordinary VAT does not generally exempt buyers because they have high income.'},
      {id:'d',label:'VAT is collected only from employees',feedback:'VAT is tied to consumption, not employment status.'},
    ],answerId:'b',
    explanation:'An equal rate is not automatically an equal burden. Measurement and compensating benefits also affect the final distribution.',
    evidenceIds:['OECD-VAT-DISTRIBUTION'],
  }),
  candidate({
    id:'M3', angle:'who_bears_costs',
    prompt:'A public fee is €300 for every household. What best reveals its distributional burden?',
    hint:'The same cash amount can represent very different sacrifices.',
    options:[
      {id:'a',label:'The fee as a share of household resources',feedback:'Relative burden shows how large the fee is compared with available resources.'},
      {id:'b',label:'The number of words in the fee law',feedback:'Drafting length says nothing about household burden.'},
      {id:'c',label:'Whether every bill uses the same font',feedback:'Presentation does not measure economic sacrifice.'},
      {id:'d',label:'Whether wealthy households pay first',feedback:'Payment timing alone does not reveal relative burden.'},
    ],answerId:'a',
    explanation:'Equal euro amounts can be unequal burdens when household income and wealth differ greatly.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M4', angle:'who_bears_costs',
    prompt:'A tax cut is paired with reduced childcare and transport services. What should a household compare?',
    hint:'A smaller tax bill may come with new private bills.',
    options:[
      {id:'a',label:'Only the tax saving',feedback:'That ignores costs shifted from public budgets to households.'},
      {id:'b',label:'Only the value of lost services',feedback:'That ignores the household’s tax saving.'},
      {id:'c',label:'Tax saving, lost services and replacement costs',feedback:'This compares the whole household effect rather than one headline.'},
      {id:'d',label:'Only whether the policy is called reform',feedback:'A label does not show the household balance.'},
    ],answerId:'c',
    explanation:'Distributional analysis should combine taxes, transfers and services. Lower public spending can create higher private costs.',
    evidenceIds:['IMF-FISCAL-INEQUALITY','OECD-PUBLIC-SERVICES-DISTRIBUTION'],
  }),
  candidate({
    id:'M5', angle:'how_rules_work',
    prompt:'A higher marginal tax rate begins above €80,000. What does that usually mean?',
    hint:'Focus on the next euro above the threshold.',
    options:[
      {id:'a',label:'All income is taxed at the new rate',feedback:'Progressive schedules normally apply the higher rate only above the threshold.'},
      {id:'b',label:'Only income above the threshold gets the new rate',feedback:'That is how a marginal bracket normally works.'},
      {id:'c',label:'Income below the threshold becomes tax-free',feedback:'A new upper bracket does not erase lower-bracket tax.'},
      {id:'d',label:'The worker loses money by earning one euro more',feedback:'A marginal rate below 100% does not make the extra euro reduce after-tax income.'},
    ],answerId:'b',
    explanation:'Marginal and average rates are different. Confusing them can make a tax rise look much larger than it is.',
    evidenceIds:['OECD-TAXING-WAGES-2026'],
  }),
  candidate({
    id:'M6', angle:'how_rules_work',
    prompt:'Why should a tax deduction be examined like public spending?',
    hint:'Both can direct public resources toward selected activities or groups.',
    options:[
      {id:'a',label:'Every deduction is illegal',feedback:'Deductions are commonly lawful parts of tax systems.'},
      {id:'b',label:'It reduces revenue to support selected behaviour or people',feedback:'A tax preference can deliver support through the tax code.'},
      {id:'c',label:'It always benefits low-income households most',feedback:'Benefits depend on eligibility, tax liability and design.'},
      {id:'d',label:'It never changes government revenue',feedback:'A deduction generally reduces revenue compared with the benchmark system.'},
    ],answerId:'b',
    explanation:'Tax expenditures have costs and beneficiaries. They should be tested for purpose, value and who can actually use them.',
    evidenceIds:['OECD-TAX-EXPENDITURES'],
  }),
  candidate({
    id:'M7', angle:'how_rules_work',
    prompt:'What is the soundest way to compare tax on wages with tax on investment gains?',
    hint:'The headline rate may omit deductions, timing and which gains enter the tax base.',
    options:[
      {id:'a',label:'Compare one headline rate only',feedback:'A headline rate may omit the base, timing and reliefs.'},
      {id:'b',label:'Assume investment gains are never taxed',feedback:'Treatment varies by country, asset and transaction.'},
      {id:'c',label:'Compare effective treatment on similar amounts',feedback:'Effective treatment includes rates, bases, timing, reliefs and enforcement.'},
      {id:'d',label:'Assume wages and gains are economically identical',feedback:'They are different income forms even when the amounts match.'},
    ],answerId:'c',
    explanation:'Fair comparison needs the effective burden, not one statutory number selected from different tax bases.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH','OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M8', angle:'how_rules_work',
    prompt:'Who ultimately bears a corporate tax increase?',
    hint:'Company accounts show the legal payment, not every later adjustment.',
    options:[
      {id:'a',label:'Only shareholders, in every economy',feedback:'Shareholders may bear much of it, but the split is not fixed everywhere.'},
      {id:'b',label:'Only workers, in every economy',feedback:'Wage effects are possible, but an automatic full shift is not supported.'},
      {id:'c',label:'Only customers, in every market',feedback:'Pricing power differs across markets and firms.'},
      {id:'d',label:'The split depends on market responses',feedback:'Owners, workers and customers may bear different shares depending on conditions.'},
    ],answerId:'d',
    explanation:'Claims that one group always bears all corporate tax ignore investment, wage, price and profit responses.',
    evidenceIds:['OECD-TAX-INCIDENCE','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M9', angle:'wealth_and_influence',
    prompt:'What is the basic difference between tax avoidance and tax evasion?',
    hint:'One exploits lawful rules; the other breaks them by hiding or misreporting.',
    options:[
      {id:'a',label:'Avoidance is legal planning; evasion is illegal concealment',feedback:'This is the central legal distinction, even when avoidance attracts policy criticism.'},
      {id:'b',label:'Avoidance is for workers; evasion is for companies',feedback:'Individuals and companies can engage in either behaviour.'},
      {id:'c',label:'Avoidance is always ethical; evasion is always efficient',feedback:'Legality does not settle ethical or economic evaluation.'},
      {id:'d',label:'There is no difference',feedback:'The legal distinction is important for evidence and enforcement.'},
    ],answerId:'a',
    explanation:'A fair critique should name the conduct accurately. Lawful loophole use and unlawful concealment require different remedies.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M10', angle:'wealth_and_influence',
    prompt:'Why is a local shop owner not automatically equivalent to a billionaire investor?',
    hint:'Ownership can differ in scale, liquidity, control and ability to spread risk.',
    options:[
      {id:'a',label:'Small businesses never employ anyone',feedback:'Many small businesses employ people.'},
      {id:'b',label:'All owners have equal wealth and influence',feedback:'Ownership scale and influence vary enormously.'},
      {id:'c',label:'Their assets, risks and economic power can differ greatly',feedback:'Scale, liquidity, diversification and control matter when assessing capacity.'},
      {id:'d',label:'Billionaires do not own businesses',feedback:'Many large fortunes are tied to business ownership.'},
    ],answerId:'c',
    explanation:'Treating every owner as one class hides major differences. Good policy can distinguish productive small firms from concentrated wealth.',
    evidenceIds:['OECD-INCOME-CONSUMPTION-WEALTH','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M11', angle:'wealth_and_influence',
    prompt:'What is the strongest evidence that lobbying may have shaped a tax rule?',
    hint:'Look for a traceable link, not just a result you dislike.',
    options:[
      {id:'a',label:'A wealthy person publicly likes the rule',feedback:'Approval alone does not establish influence over drafting.'},
      {id:'b',label:'Records connect access, proposals and final wording',feedback:'Documented actors, meetings, requests and changes provide a testable influence trail.'},
      {id:'c',label:'The rule is difficult to understand',feedback:'Complexity can have many causes and is not proof of capture.'},
      {id:'d',label:'A critic calls the rule corrupt',feedback:'A label without evidence does not establish influence.'},
    ],answerId:'b',
    explanation:'Lobbying is not automatically corrupt. Transparency lets citizens test whether unequal access produced undue influence.',
    evidenceIds:['OECD-LOBBYING-21C'],
  }),
  candidate({
    id:'M12', angle:'wealth_and_influence',
    prompt:'A household earns a high salary but owns little after debt. What does this show?',
    hint:'One measure is a yearly flow; the other is a stock built over time.',
    options:[
      {id:'a',label:'Income and wealth are identical',feedback:'Annual earnings and net assets measure different resources.'},
      {id:'b',label:'High income guarantees high net wealth',feedback:'Debt, spending, age and past transfers can produce a different wealth position.'},
      {id:'c',label:'Wealth matters only after retirement',feedback:'Assets and debts affect security and opportunity throughout life.'},
      {id:'d',label:'Income and wealth must be measured separately',feedback:'A flow of earnings and a stock of net assets answer different questions.'},
    ],answerId:'d',
    explanation:'Middle-class pressure can be missed when salary is treated as wealth. Policy effects should examine both income and net assets.',
    evidenceIds:['OECD-INCOME-CONSUMPTION-WEALTH'],
  }),
  candidate({
    id:'M13', angle:'services_and_security',
    prompt:'A government closes a public clinic and families buy private care. Did the cost disappear?',
    hint:'Follow the cost after it leaves the public budget.',
    options:[
      {id:'a',label:'Yes, because public spending fell',feedback:'The public budget fell, but household spending may rise.'},
      {id:'b',label:'Yes, if taxes also fall slightly',feedback:'A small tax cut may not cover replacement care.'},
      {id:'c',label:'No, part of the cost shifted to households',feedback:'The service cost can move from collective finance to private budgets.'},
      {id:'d',label:'No, because private care is always free',feedback:'Private care normally has a price or insurance cost.'},
    ],answerId:'c',
    explanation:'Budget savings are not automatically household savings. Public-service cuts can privatize costs and risks.',
    evidenceIds:['OECD-PUBLIC-SERVICES-DISTRIBUTION','IMF-FISCAL-INEQUALITY'],
  }),
  candidate({
    id:'M14', angle:'services_and_security',
    prompt:'Why can social insurance benefit middle-income households even before they receive a payment?',
    hint:'Insurance has value because it protects against a possible loss.',
    options:[
      {id:'a',label:'It guarantees every household a profit',feedback:'Insurance manages risk; it does not guarantee profit.'},
      {id:'b',label:'It pools risks that could overwhelm one household',feedback:'Protection against unemployment, illness or disability has value before a claim occurs.'},
      {id:'c',label:'It removes every difference in income',feedback:'Social insurance does not equalize all household resources.'},
      {id:'d',label:'It is financed only by poor households',feedback:'Financing usually draws on broader contributions or taxes.'},
    ],answerId:'b',
    explanation:'Calling every benefit a handout misses insurance. Contributors share risks that could otherwise destroy household security.',
    evidenceIds:['IMF-FISCAL-INEQUALITY'],
  }),
  candidate({
    id:'M15', angle:'services_and_security',
    prompt:'A tax cut is financed entirely by new borrowing. What is the safest conclusion?',
    hint:'Borrowing changes when and how a policy is financed; it does not erase financing.',
    options:[
      {id:'a',label:'The tax cut has no cost',feedback:'Borrowing still creates interest and future fiscal choices.'},
      {id:'b',label:'Future taxes must rise by exactly the same amount',feedback:'Growth, inflation, interest and later policy choices affect the outcome.'},
      {id:'c',label:'The burden is deferred and the final effect depends on outcomes',feedback:'Debt shifts timing, while growth and later budgets determine the eventual burden.'},
      {id:'d',label:'Borrowing always makes every household richer',feedback:'Benefits and later costs differ across households and circumstances.'},
    ],answerId:'c',
    explanation:'Debt-financed tax cuts are not free money. They may support growth or merely postpone difficult distributional choices.',
    evidenceIds:['IMF-TAX-INCLUSIVE-GROWTH','IMF-FISCAL-INEQUALITY'],
  }),
  candidate({
    id:'M16', angle:'services_and_security',
    prompt:'Which statement best compares universal and means-tested public benefits?',
    hint:'Each design solves one problem while creating another.',
    options:[
      {id:'a',label:'Universal benefits are always fairer',feedback:'They reduce exclusion but may spend more on households that need less support.'},
      {id:'b',label:'Means-tested benefits always reach everyone eligible',feedback:'Application barriers and non-take-up can exclude eligible households.'},
      {id:'c',label:'Both designs involve coverage, cost and take-up trade-offs',feedback:'The better design depends on goals, administration and wider financing.'},
      {id:'d',label:'Neither design can support middle-income households',feedback:'Both can support middle-income households in different ways.'},
    ],answerId:'c',
    explanation:'Political slogans often hide design trade-offs. Compare coverage, adequacy, administration, incentives and who finances the benefit.',
    evidenceIds:['IMF-FISCAL-INEQUALITY'],
  }),
  candidate({
    id:'M17', angle:'claims_and_distraction',
    prompt:'The richest group pays the largest cash amount of income tax. What does that fact not prove?',
    hint:'Absolute euros and the share of available resources answer different questions.',
    options:[
      {id:'a',label:'That the group paid a large amount',feedback:'That follows directly from the stated fact.'},
      {id:'b',label:'That its effective overall burden is the highest',feedback:'That requires income shares, other taxes, reliefs and effective rates.'},
      {id:'c',label:'That income tax raises revenue',feedback:'The payment itself is evidence that revenue was raised.'},
      {id:'d',label:'That high earners exist',feedback:'The comparison presupposes a highest-income group.'},
    ],answerId:'b',
    explanation:'Large absolute payments can coexist with a lower effective burden. A fair comparison needs the base and all relevant taxes.',
    evidenceIds:['OECD-TAXING-WAGES-2026','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
  candidate({
    id:'M18', angle:'claims_and_distraction',
    prompt:'Someone says low-income households “pay no tax.” What is the main problem?',
    hint:'Look beyond personal income tax.',
    options:[
      {id:'a',label:'Every low-income household pays high income tax',feedback:'Income-tax liability may be low or zero for some households.'},
      {id:'b',label:'The claim ignores consumption and other taxes',feedback:'VAT, excise, payroll and local charges can still affect low-income households.'},
      {id:'c',label:'Low-income households never buy taxed goods',feedback:'They routinely purchase goods and services subject to consumption taxes.'},
      {id:'d',label:'Only companies pay consumption taxes',feedback:'Businesses remit VAT, but households commonly bear it through prices.'},
    ],answerId:'b',
    explanation:'One tax is not the whole system. People can owe little income tax while bearing indirect taxes and contributions.',
    evidenceIds:['OECD-VAT-DISTRIBUTION','OECD-TAX-INCIDENCE'],
  }),
  candidate({
    id:'M19', angle:'claims_and_distraction',
    prompt:'Which evidence best tests whether a welfare policy harms or helps the middle class?',
    hint:'Count both what households finance and what they receive or avoid paying privately.',
    options:[
      {id:'a',label:'A slogan about taxpayers and recipients',feedback:'A slogan does not measure household effects.'},
      {id:'b',label:'The policy’s name and party sponsor',feedback:'Labels and sponsors do not establish distribution.'},
      {id:'c',label:'Net effects across income groups including services',feedback:'Taxes, transfers, services and replacement costs reveal the household balance.'},
      {id:'d',label:'One exceptional household story',feedback:'A single case cannot establish the overall distribution.'},
    ],answerId:'c',
    explanation:'Middle-income households both finance and use public systems. Net distribution matters more than the taxpayer-versus-recipient story.',
    evidenceIds:['IMF-FISCAL-INEQUALITY','OECD-PUBLIC-SERVICES-DISTRIBUTION'],
  }),
  candidate({
    id:'M20', angle:'claims_and_distraction',
    prompt:'A campaign highlights small benefit fraud while a large tax loophole is debated. What is the best response?',
    hint:'Do not excuse either problem. Compare evidence, scale and the policy connection.',
    options:[
      {id:'a',label:'Assume benefit fraud is invented',feedback:'Fraud can occur and should be measured rather than denied.'},
      {id:'b',label:'Assume every loophole proves a conspiracy',feedback:'A loophole may reflect design, bargaining or error; influence requires evidence.'},
      {id:'c',label:'Measure both losses and ask who benefits from the distraction',feedback:'This tests scale, evidence and incentives without excusing either abuse.'},
      {id:'d',label:'Ignore both because all politics is manipulation',feedback:'Cynicism prevents evidence-based comparison and accountability.'},
    ],answerId:'c',
    explanation:'The trap is downward blame without comparison. Scrutinize fraud, avoidance, lobbying and policy scale with the same standards.',
    evidenceIds:['OECD-LOBBYING-21C','OECD-TAX-EXPENDITURES','IMF-TAX-INCLUSIVE-GROWTH'],
  }),
] as const;

export function selectMiddleClassTrapQuiz() {
  return [...middleClassTrapQuiz];
}
