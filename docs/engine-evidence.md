# Politangle engine evidence and validation status

Status: **content-validation build, not psychometrically validated**.

This document is the audit trail for the current Quick, Deep, political-family and literacy engines. The machine-readable source registry is in `lib/evidence.ts`; assessment content binds to source IDs from that registry.

## 1. Locked BELIEVE model

The current political-belief model is locked at **42 items**:

- 26 Quick
- 16 Deep
- 14 THINK
- 14 FEEL
- 14 ACT

Belief answers use balanced paired alternatives. A genuine midpoint (`0`) is distinct from **Not sure / I do not understand**, which is excluded from scoring and reflected in coverage.

Question order and pole order are randomized deterministically per session so a restored session remains stable.

### Method rationale

- Pew Research Center, *Writing Survey Questions*: clear/specific wording, pretesting, balanced alternatives where feasible, acquiescence concerns with agree/disagree formats, and order effects. Source ID: `PEW-SURVEY-WORDING`.
- AAPOR, *Best Practices for Survey Research*: one construct at a time, simple wording, avoid leading questions, careful ordering. Source ID: `AAPOR-BEST-PRACTICES`.

These sources justify the format and validation discipline; they do **not** prove that Politangle's items form the intended latent dimensions.

## 2. Political shape

Politangle is deliberately multidimensional rather than collapsing every response into one left-right score. The current polygon exposes eight broad axes:

1. Economic role
2. Ownership
3. Social values
4. Authority
5. Pluralism
6. World / sovereignty
7. Nationhood / membership
8. Ecology

The exact factor structure remains a modeling hypothesis until tested with respondent data.

## 3. THINK / FEEL / ACT

Every one of the 14 underlying constructs has one THINK, one FEEL and one ACT item. Tensions are calculated only within the same construct so Politangle does not manufacture a contradiction by comparing unrelated issues.

THINK, FEEL and ACT are descriptive lenses. A difference between them is reported as a **tension**, not as hypocrisy, inconsistency or pathology.

## 4. Public political-family model

The main user-facing compatibility model contains only five broad families:

- Liberalism
- Conservatism
- Social democracy
- Socialism
- Green politics

Nationalism and Populism are reported separately as cross-cutting tendencies. Authority / democratic constraints is also a separate tendency rather than a left-right ideology label.

### Taxonomy-restraint rule

Politangle does not create a scored compatibility label merely because a named school or subtype exists in political theory. A separate public label must materially improve interpretation for ordinary users and have enough dedicated evidence to justify the distinction.

Narrow variants are therefore background/context unless they clear that bar. **Democratic socialism is not a scored family, subtype, CLASSIFY target or required public concept.** Where historically or academically useful, narrower socialist variants may be mentioned only as contextual examples under the broad Socialism family.

Christian democracy is retained as a selective Conservative subtype because it has dedicated discriminators — religious inspiration, subsidiarity, social-market-compatible economics and democratic compatibility — and materially distinguishes a recognizable political tradition from generic conservatism.

Historical concepts such as communism and fascism may remain in literacy/context because of their civic and historical importance. That does not make them routine compatibility identities for respondents.

## 5. Political-literacy training

Deep contains 15 evidence-keyed literacy items:

- 9 `CLASSIFY` items that teach broad, recognizable political families or historically/civically important concepts. The current bank includes Social democracy, Socialism, Libertarianism as contextual political philosophy, Conservatism, Christian democracy, Green politics, Communism, Fascism, and Nationalism as a cross-cutting tendency.
- 6 `UNDERSTAND` items covering Populism, Nationalism, Liberal democracy beyond elections, radical-right versus extreme-right distinctions, Liberalism as a broad family, and Socialism as a broad family.

The literacy block operates as training: **answer → check → evidence-backed explanation → continue**. Once checked, an answer is locked so feedback cannot be used to rewrite the original score.

Belief answers are never marked correct or incorrect. Only CLASSIFY and UNDERSTAND use evidence-backed answer keys.

## 6. Compatibility model and safeguards

The canonical family engine does not claim that a respondent “is” an ideology. It reports compatibility with measured characteristics, and several families may fit simultaneously.

The current 0–100 compatibility anchors are rule-model outputs, not probabilities:

- 75–100: Strong match
- 60–74: Broad match
- 40–59: Mixed / overlapping
- 25–39: Limited match
- 0–24: Strong tension

Safeguards include:

- Nationalism and Populism are cross-cutting and do not compete with the five headline families.
- Populism is not hard-coded as authoritarian; anti-pluralism and democratic-constraint rejection are measured separately.
- Ordinary conservative, sovereignty or nationalist answers cannot by themselves trigger a fascist/extreme-right pattern.
- Communism cannot be inferred from welfare-state or redistribution preferences alone.
- Social democracy is modeled as predominantly capitalist with regulation, welfare and redistribution; Socialism is the broader family requiring substantially more social/public/cooperative/worker control of productive assets. Politangle does not require users to learn finer socialist labels to understand this distinction.

## 7. Evidence families used

The registry currently includes:

- Pew Research Center and AAPOR for survey design;
- Chapel Hill Expert Survey / comparative-party research for economic, social-cultural and international dimensions;
- V-Dem for liberal-democratic institutions and executive constraints;
- Stanford Encyclopedia of Philosophy for liberalism, libertarianism, conservatism, socialism and nationalism;
- Routledge Encyclopedia of Philosophy for social democracy;
- Cambridge scholarship for Christian democracy, green politics, populism and the populist radical right;
- Pirro (*Nations and Nationalism*) for radical-right versus extreme-right democracy distinction;
- United States Holocaust Memorial Museum for fascism;
- Oxford scholarship for the Marx/Engels communist ideal;
- GLOBALCIT for citizenship-at-birth rules.

See `lib/evidence.ts` for exact URLs and evidence bindings.

## 8. What is **not** validated yet

The following claims must not be made publicly yet:

- that the current dimensions form a validated factor structure;
- that each item has adequate discrimination or reliability;
- that scores have equal meaning across countries, languages, ages or education levels;
- that family criteria have empirically estimated weights;
- that a numerical distance from an ideology is scientifically calibrated;
- that the current assessment is a diagnostic instrument.

Cross-national research warns that political labels and scales can have different meanings across contexts. Politangle therefore keeps dimensions explicit and versioned and should test measurement invariance before broad localization.

## 9. Validation plan before strong public claims

**HYPOTHESIS:** A practical staged validation program should begin with cognitive interviewing across politically and educationally diverse users, then a pilot for item diagnostics, followed by a substantially larger sample for factor structure, reliability and cross-group invariance testing.

**HYPOTHESIS:** An initial operational target could be roughly 12–20 cognitive interviews, then roughly 100–200 pilot responses, followed by a larger validation sample (potentially 500–1,000+ depending on model complexity, countries and subgroup analyses). These are planning targets, not universal statistical requirements.

Required analysis should include, as appropriate:

- cognitive interpretation and wording failures;
- missing/unsure rates and completion time;
- item distributions, discrimination and redundancy;
- exploratory and confirmatory factor analysis;
- reliability appropriate to the final scale structure;
- convergent/discriminant validity against established constructs;
- test-retest stability where relevant;
- differential item functioning / measurement invariance across target countries, languages and key demographic groups;
- sensitivity analysis for all ideology-compatibility rules.

## 10. Data and privacy boundary

In the validation build, raw political answers are stored only in browser `sessionStorage`. They are not written to Firestore. Firebase is currently used only for verified server-connectivity infrastructure.

Any future account-linked saving of political profiles or school deployment involving minors is sensitive-data processing and **REQUIRES QUALIFIED LEGAL REVIEW** before production implementation.
