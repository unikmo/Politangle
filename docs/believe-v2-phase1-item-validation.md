# BELIEVE v2.1 — Phase 1 item validation

Status: **Phase 1 complete — TEST WITH CONDITIONS**

Questionnaire version: `belief-2026.09-v2.1-phase1`

Scope: forensic academic, construct-validity, wording and neutrality review of the complete 42-item BELIEVE bank before respondent calibration.

This is **not** psychometric validation. It establishes that the source-language items are reasonable candidate measures of the intended political constructs and removes identifiable wording/model errors before pilot data are collected.

## Validation standard

Every THINK / FEEL / ACT triplet was reviewed against the following gates:

1. **Construct validity:** does the item measure the intended construct rather than a nearby concept?
2. **Academic grounding:** is the attitude object used in established political-science, public-opinion or political-psychology research?
3. **THINK / FEEL / ACT alignment:** do all three modes address the same underlying attitude object?
4. **Single concept:** does either pole accidentally combine multiple political propositions?
5. **Neutrality and symmetry:** are both poles plausible choices rather than one respectable and one caricatured option?
6. **Concrete language:** can the item be understood without specialist political terminology?
7. **International portability:** can the source item plausibly travel across political systems without relying on one country's institutions?
8. **Social-desirability risk:** does wording invite the respondent to choose the morally flattering response rather than report a political preference?
9. **Response burden:** each source-language alternative is kept at or below 26 words as a mechanical guardrail.
10. **Necessity:** is the construct distinct enough to justify one of only fourteen BELIEVE triplets?

The 26-word guardrail is **not** a validated reading-level threshold. School-age comprehension must still be tested with cognitive interviews.

## Method anchors

These sources are also registered in `lib/evidence.ts` where applicable:

- `PEW-SURVEY-WORDING` — Pew Research Center, *Writing Survey Questions*: https://www.pewresearch.org/writing-survey-questions/
- `AAPOR-BEST-PRACTICES` — AAPOR, *Best Practices for Survey Research*: https://aapor.org/standards-and-ethics/best-practices/
- `WVS-W7-DOCUMENTATION` — World Values Survey Wave 7 documentation/questionnaire: https://www.worldvaluessurvey.org/WVSContents.jsp?CMSID=Documentation
- `ISSP-2023-NATIONAL-IDENTITY` — ISSP 2023 National Identity and Citizenship source questionnaire: https://issp.org/wp-content/uploads/2022/09/ISSP2023_NatIdCit_source-questionnaire.pdf
- `CSES5-PRETEST` — CSES Module 5 pretest report: https://cses.org/wp-content/uploads/2019/03/CSES5_SurveyPretests_FinalReport.pdf
- `ESS-TRAPD` — European Social Survey cross-national translation / TRAPD method: https://www.europeansocialsurvey.org/sites/default/files/2024-04/ESS012_projection_specification_v2.pdf
- APA Dictionary, *bases of an attitude*: https://dictionary.apa.org/bases-of-an-attitude
- `BRECKLER-TRIPARTITE` — Breckler (1984), *Empirical validation of affect, behavior, and cognition as distinct components of attitude*: https://pubmed.ncbi.nlm.nih.gov/6527214/

The WVS is especially useful for the economic constructs because it has long used bipolar measures of income equality, private versus government ownership, and government versus individual responsibility. Politangle does not copy those items; it uses them as evidence that these are established, separable political attitude objects.

The ISSP source questionnaire is important to the nationhood correction because it directly distinguishes an acquired national identity from the view that one must be born national. That is closer to the construct Politangle wants than using citizenship-at-birth law as a proxy for national membership.

The CSES Module 5 pretest is important to the populism correction. Its work distinguishes anti-elite / people-centred populist attitudes from adjacent ideas such as compromise and strong-leader rule. Politangle therefore does not use willingness to override institutions as the ACT proxy for populism.

## Phase 1 results by construct

| # | Construct | Pre-review verdict | Phase-1 result | Main reason |
|---|---|---|---|---|
| 1 | Public provision | **REWRITE** | PASS | Had collapsed public responsibility into ownership/provider form |
| 2 | Redistribution | **REWRITE** | PASS | ACT item bundled redistribution with public services |
| 3 | Ownership | **REWRITE** | PASS | ACT item bundled ownership and managerial/decision rights |
| 4 | Social change | **REWRITE** | PASS | “Social norms change” lacked a stable common scenario across modes |
| 5 | Personal autonomy | OPTIMIZE | PASS | Tightened harm/moral-regulation object and reduced vague “lifestyle” wording |
| 6 | Abortion | OPTIMIZE | PASS WITH SENSITIVITY CAUTION | Core trade-off was defensible; wording simplified and remains outside headline-family scoring |
| 7 | Authority / order | OPTIMIZE | PASS | Tightened concrete-risk versus preventive-authority trade-off |
| 8 | Pluralism / checks | **REWRITE** | PASS | Prior wording bundled courts, media, opposition and constitutional rules |
| 9 | World / sovereignty | **REWRITE** | PASS | ACT poles had asymmetric costs and consequences |
| 10 | Nationhood / membership | **REWRITE — MATERIAL** | PASS | Citizenship-at-birth law was a poor proxy for national belonging |
| 11 | Populism | **REWRITE — MATERIAL** | PASS | ACT item had collapsed populism into leader/institutional conflict |
| 12 | Ecology / growth | OPTIMIZE | PASS | Recast around a direct environment-versus-growth trade-off |
| 13 | Religion / public role | **REWRITE — MATERIAL** | PASS | Prior wording risked measuring doctrinal imposition rather than legitimacy of religious public reasoning |
| 14 | Subsidiarity | **REWRITE** | PASS | THINK/FEEL/ACT needed a single higher-level-versus-lowest-capable-level object |

## Canonical 42-item source bank after Phase 1

The engine retains the same **14 constructs × 3 modes = 42 items**. The count and Quick/Deep split remain locked; the source wording is versioned as v2.1 because changing wording after data collection would make old and new responses non-equivalent.

### 1. Public provision

**Attitude object:** broad government responsibility for ensuring access to essential services versus a more limited public role and greater reliance on private arrangements.

**Correction:** the earlier item asked whether an essential service should be publicly or privately owned. That was materially redundant with the separate ownership construct. The new triplet measures responsibility/access rather than productive ownership.

Verdict: **PASS for pilot wording.**

### 2. Redistribution

**Attitude object:** government reduction of large income differences through taxes and transfers versus less intervention in income distribution.

**Correction:** the earlier ACT item simultaneously asked about inequality, public services and the respondent's tax bill. Public services have been removed so the item measures redistribution alone.

Verdict: **PASS for pilot wording.**

### 3. Ownership

**Attitude object:** greater worker/cooperative/public ownership of large businesses versus primarily private-shareholder ownership.

**Correction:** the earlier ACT item combined ownership with “decision rights”, and used an “if I worked in or invested” scenario that could change the respondent's answer according to role. The revised ACT item asks directly about policy that shifts ownership.

Verdict: **PASS for pilot wording.**

### 4. Social change

**Attitude object:** earlier institutional adaptation to a substantially supported but contested new norm versus waiting for broad and durable acceptance.

**Correction:** the original language allowed THINK, FEEL and ACT respondents to imagine different levels of social consensus. The three items now share the same contested-but-substantial-support scenario.

Verdict: **PASS WITH PILOT CHECK.** “Substantial support” and “broad and durable acceptance” should be tested cognitively across countries and ages.

### 5. Personal autonomy

**Attitude object:** legal freedom for private consensual adult conduct without direct harm versus legitimate legal regulation in support of shared moral norms.

**Correction:** “lifestyle choices” was too broad and could evoke unrelated examples. The revised wording makes the harm condition explicit and consistent across modes.

Verdict: **PASS WITH SENSITIVITY CAUTION.** Examples must not be inserted in one country edition unless functionally equivalent examples are established across editions.

### 6. Abortion

**Attitude object:** legal decision-making autonomy of the pregnant person versus stronger legal protection of prenatal life.

The core item already presented the central policy trade-off relatively symmetrically. Phase 1 simplified the FEEL item and preserved separate `Not sure / I do not understand` handling.

Abortion remains an explicit social-values coordinate but **does not independently add or subtract Liberalism, Conservatism, Social Democracy, Socialism or Green-family points** in the headline-family model.

Verdict: **PASS WITH SENSITIVITY CAUTION.** This is a sensitive question; order and school deployment require additional handling.

### 7. Authority / order

**Attitude object:** requiring a concrete serious risk before liberty restrictions versus preventive restrictions in response to a credible risk of serious disorder.

**Correction:** simplified legalistic wording and aligned THINK, FEEL and ACT around the same liberty-versus-preventive-order trade-off.

Verdict: **PASS for pilot wording.**

### 8. Pluralism / independent checks

**Attitude object:** preserving independent checks on elected government versus giving an electoral majority wider latitude to implement its program.

**Correction:** the original THINK item listed courts, opposition rights, free media and constitutional rules in one proposition. That made a single answer hard to interpret. The canonical wording now measures the general principle of independent checks, with legal safeguards as an example rather than four simultaneously scored sub-constructs.

Verdict: **PASS for pilot wording.**

### 9. World / sovereignty

**Attitude object:** accepting binding international commitments needed for shared cross-border problems versus preserving the final national say even when collective action becomes less effective.

**Correction:** the old ACT poles were asymmetrical: one side paid “moderate” domestic costs while the other faced “significant” national constraints. The new pair makes the same sovereignty/effectiveness trade-off explicit on both sides.

Verdict: **PASS WITH COUNTRY-CONTEXT CHECK.** “Binding international agreement” should remain generic rather than naming the EU, UN, NATO or another organization in the global core.

### 10. Nationhood / membership

**Attitude object:** whether a naturalized citizen can belong to the nation as fully as a citizen from birth, versus birth-status carrying additional weight in full national belonging.

**Material correction:** the previous v2 core used jus soli versus parent-citizenship/status rules. GLOBALCIT evidence establishes that birthright citizenship regimes vary widely and mix territorial and descent principles; those legal rules are not a clean proxy for who the respondent believes truly belongs to the nation. The ISSP National Identity and Citizenship source questionnaire more directly measures acquired versus birth-based national identity.

The core triplet therefore no longer uses citizenship-at-birth law. Birthright-citizenship policy can still appear later as a country-specific or educational context item, but it is not the core nationhood signal.

Verdict: **PASS WITH SOCIAL-DESIRABILITY CAUTION.** The ACT choice between otherwise similar citizen candidates is intentionally concrete, but pilot data must test ceiling effects and socially desirable responding.

### 11. Populism

**Attitude object:** plural/trade-off accounts of political disagreement versus a people-versus-self-serving-elite account centered on a common popular will.

**Material correction:** the old ACT item asked whether the respondent would back a leader against resisting institutions. That directly introduced authoritarianism and anti-pluralism into the populism item. CSES work treats populism as a distinct people/elite attitude and separately tests strong-leader and compromise propositions. The CSES Module 5 pretest also found that the compromise item did not fit the anti-elite scale in the same way as the more direct elite-attitude items.

The revised ACT item is now candidate choice between a pluralist/trade-off framing and an explicit people-versus-elite framing. It does not mention courts, media, opposition, institutions or rule-bending leaders.

Verdict: **PASS for pilot wording.**

### 12. Ecology / growth

**Attitude object:** ecological limits taking priority in a genuine conflict versus prioritizing economic growth and avoiding deliberate growth limits.

**Correction:** the previous positive pole bundled technology, pricing and regulation, while the negative side bundled lower growth and consumption. The new triplet makes the primary trade-off explicit first and avoids turning one pole into a long policy package.

Verdict: **PASS for pilot wording.**

### 13. Religion / public role

**Attitude object:** whether religious moral principles may count as legitimate public reasons in democratic lawmaking when not all citizens share the faith.

**Material correction:** the previous wording could be read as whether religious “doctrine” should determine laws for non-believers, which is substantially stronger than Christian-democratic religious inspiration. The revised construct is about the legitimacy of religiously grounded moral reasoning in public debate and lawmaking, not state religion, theocracy or compulsory observance.

Verdict: **PASS WITH COGNITIVE-PRETEST REQUIREMENT.** This distinction is conceptually important but abstract. It must be tested with adolescents and translated editions before school use.

### 14. Subsidiarity

**Attitude object:** higher-level government responsibility for consistent standards versus keeping a task at the lowest capable family/community/local level, with higher government stepping in when needed.

**Correction:** previous ACT wording had already required a polarity correction and the three modes still varied in scenario. The new wording uses the same higher-level-versus-lowest-capable principle across THINK, FEEL and ACT.

Verdict: **PASS WITH TERMINOLOGY CAUTION.** The word “subsidiarity” itself does not need to appear in the respondent-facing question.

## THINK / FEEL / ACT validity boundary

Politangle uses a tripartite attitude architecture:

- **THINK** = stated beliefs/evaluations
- **FEEL** = stated affective concern/intuitive reaction
- **ACT** = stated behavioral choice or intention

Breckler's classic validation supports a cognitive/affective/behavioral distinction but also shows that components correlate more strongly when all are measured only through verbal self-report.

Therefore Politangle must continue to say **stated ACT / intended choice**, not “what you actually do.” The present questionnaire does not observe voting, donations, protest, media use, or other real behavior.

## Source-language burden and readability

After Phase 1:

- all 42 items remain paired alternatives;
- every individual pole is **26 words or fewer**;
- jargon such as `GAL-TAN`, `nativism`, `jus soli`, `majoritarianism`, `subsidiarity` and `democratic socialism` does not appear in respondent-facing BELIEVE wording.

This is a mechanical clarity safeguard only. It does not establish a validated reading age.

## International portability

Phase 1 improves portability by avoiding named parties, countries and country-specific institutions in the global core. However, **cross-national equivalence is not yet validated**.

Before multilingual release, translations should follow an ESS-style process:

**Translation → Review → Adjudication → Pretesting → Documentation (TRAPD)**

Functional equivalence takes priority over literal translation. Political terms such as “nation”, “government”, “public reasons”, “naturalized citizen” and “higher-level government” may have different everyday meanings across countries.

## Independent Red Team findings

The Phase-1 Red Team does **not** recommend freezing immediately without conditions.

### 1. Sensitive-item order remains unresolved

The current session engine randomizes items deterministically. Full randomization can place abortion, national membership or religion very early. Survey-method guidance notes that questionnaire context/order can affect responses and recommends an engaging, logical flow rather than mechanically randomizing everything.

**Required before pilot freeze:** evaluate constrained/block randomization so pole/order bias is distributed without placing the most sensitive items as the first respondent experience.

### 2. Nationhood remains a screening construct, not a complete nationalism scale

The new naturalized-versus-birth membership item is substantially better than citizenship-at-birth law, but nationalism is broader than one membership boundary plus sovereignty. The user-facing cross-cutting label should remain cautious until respondent validation supports a stronger inference.

### 3. THINK / FEEL / ACT may not be empirically distinct enough

Because all three are verbal self-reports about closely matched attitude objects, they may correlate strongly. This is a feature to test, not a result to assume. The pilot must estimate whether the three modes provide meaningful additional information.

### 4. Some items may show ceiling effects

Pluralism and equal national membership may elicit strong socially desirable responses in some populations. Self-administered delivery helps but does not remove the problem. Pilot distributions are necessary.

### 5. Family inference is still prior-based

Phase 1 validates item content; it does not prove the current `0/1/2` family loading values or family thresholds. Those remain academically informed priors pending data.

## Phase-1 release gate

**Verdict: TEST WITH CONDITIONS.**

Phase 1 is complete enough to proceed to synthetic engine stress testing, provided the following are not misrepresented as established facts:

- no claim of psychometric validation;
- no claim that ACT measures observed behavior;
- no claim of cross-country measurement invariance;
- no claim of validated school-age reading level;
- no claim that a single score is a political identity or diagnosis.

Before collecting the real validation dataset, Politangle should next complete:

1. constrained/sensitive question-order review;
2. synthetic respondent stress testing across mixed and edge-case political profiles;
3. final source-language cognitive pretest candidate freeze;
4. respondent pilot and empirical item analysis.
