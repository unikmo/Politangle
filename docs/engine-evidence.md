# Politangle engine evidence and validation status

Status: **content-validation build, not psychometrically validated**.

This document is the audit trail for the current Quick and Deep engine. The machine-readable source registry is in `lib/evidence.ts`; individual Quick, Deep belief, literacy and tradition-model entries bind to source IDs from that registry.

## 1. What changed in Quick v2

Quick v1 used agree/disagree statements and overloaded the numeric midpoint to mean “Not sure.” Quick v2 separates two different states:

- a real midpoint: **About equally / it depends** (`0`, scored), and
- **Not sure / I do not understand** (`unsure`, excluded from scoring and reflected in coverage).

Quick v2 also uses balanced paired alternatives instead of agreement statements. The order of the two poles is deterministically randomized per session/question, and question order is randomized per session while remaining stable if the session is restored.

### Method rationale

- Pew Research Center, *Writing Survey Questions*: clear/specific wording, pretesting, balanced alternatives where feasible, acquiescence concerns with agree/disagree formats, and order effects. Source ID: `PEW-SURVEY-WORDING`.
- AAPOR, *Best Practices for Survey Research*: one construct at a time, simple wording, avoid leading questions, careful ordering. Source ID: `AAPOR-BEST-PRACTICES`.

These sources justify the format and validation discipline; they do **not** prove that Politangle's items form the intended latent dimensions.

## 2. Quick dimensions

Quick remains deliberately multidimensional rather than collapsing every response into one left-right score.

| Dimension | Current poles | Evidence anchor |
|---|---|---|
| Economy | collective/public provision ↔ market/private provision | CHES economic left-right; redistribution/welfare/privatization literature |
| Society | social change/personal freedom ↔ tradition/continuity | CHES GAL-TAN/social-cultural dimension; conservatism/liberalism references |
| Power | individual autonomy/constraints on power ↔ state authority/order | V-Dem liberal democracy; libertarian and authoritarian-order literature |
| World | international cooperation ↔ national sovereignty | CHES international/European integration measures; nationalism literature |

The use of four dimensions is a substantive modeling choice. Multidimensional ideology has empirical support, but the exact Politangle four-factor structure must be tested with Politangle response data before it is treated as validated.

## 3. Deep belief dimensions

Deep adds constructs that are needed to distinguish traditions that Quick cannot safely separate:

1. `pluralism` — pluralism/institutional constraints ↔ majoritarian/concentrated authority
2. `ownership` — social/worker ownership ↔ private/shareholder ownership
3. `nativism` — civic/inclusive membership ↔ inherited/native priority
4. `populism` — plural interests/compromise ↔ people-versus-elite general will
5. `ecology` — ecological limits/structural change ↔ growth/incremental adaptation
6. `nationhood` — shared/post-national authority ↔ nation-centered self-determination
7. `democracyRejection` — competitive democracy as necessary ↔ openness to non-democratic rule

There are two content-validation items per Deep belief dimension. With only two items per dimension, the current scores are descriptive and intentionally conservative about coverage. They are **not** reliability estimates or validated scales.

## 4. Political-literacy bank

Deep contains 15 evidence-keyed literacy items:

- 9 `CLASSIFY` items: social democracy, democratic socialism, libertarianism, conservatism, Christian democracy, green politics, communism, fascism, and nationalism as a cross-cutting family.
- 6 `UNDERSTAND` items: populism as thin-centered, nationalism as cross-cutting, liberal democracy beyond elections, radical-right versus extreme-right democracy distinction, liberalism as a family, and socialism as a family.

Belief answers are never marked correct or incorrect. Only CLASSIFY and UNDERSTAND use evidence-backed answer keys.

## 5. Tradition compatibility model

`lib/ideology-model.ts` deliberately avoids “ideology percentages.” It maps interpretable axis scores into broad buckets and evaluates explicit criteria as `support`, `tension`, `neutral`, or `unknown`.

Possible outputs are:

- `consistent` — all modeled core criteria are supported;
- `possible` — no modeled core contradiction, but not all core criteria are supported;
- `tension` — at least one modeled core criterion is contradicted;
- `insufficient` — a core signal or required dedicated discriminator is missing.

The intended product wording is **“your answers are consistent with…”**, not **“you are…”**.

### Safeguards

- Nationalism and populism are modeled as **cross-cutting**, not as ordinary left-right endpoints.
- The populist radical-right pattern requires the combination of nativism, authority/order and populism; Quick alone cannot trigger it.
- The extreme-right/fascist pattern requires explicit anti-democratic evidence and a dedicated ultranationalist-state-project discriminator. Ordinary conservatism, sovereignty preference or nationalism cannot trigger it.
- Communism cannot be inferred from welfare-state, redistribution or social-ownership preferences alone. A dedicated communist-end-state discriminator is required before the model can return anything beyond `insufficient`.
- Modern social democracy and democratic socialism are separated primarily by the ownership dimension: predominantly capitalist social-market regulation versus a substantially stronger shift toward social/public/cooperative/worker ownership.

## 6. Evidence families used

The registry currently includes:

- Pew Research Center and AAPOR for survey design;
- Chapel Hill Expert Survey / comparative-party research for economic, social-cultural and international dimensions;
- V-Dem for liberal-democratic institutions and executive constraints;
- Stanford Encyclopedia of Philosophy for liberalism, libertarianism, conservatism, socialism and nationalism;
- Routledge Encyclopedia of Philosophy for social democracy;
- Cambridge scholarship for Christian democracy, green politics, populism and the populist radical right;
- Pirro (Nations and Nationalism) for radical-right versus extreme-right democracy distinction;
- United States Holocaust Memorial Museum for fascism;
- Oxford scholarship for the Marx/Engels communist ideal.

See `lib/evidence.ts` for exact URLs and evidence bindings.

## 7. What is **not** validated yet

The following claims must not be made publicly yet:

- that the four Quick dimensions are a validated factor structure;
- that each item has adequate discrimination or reliability;
- that scores have equal meaning across countries, languages, ages or education levels;
- that the tradition criteria have empirically estimated weights;
- that a numerical distance from an ideology is scientifically calibrated;
- that the current assessment is a diagnostic instrument.

Cross-national research specifically warns that political labels and scales can have different meanings across contexts. Politangle therefore keeps dimensions explicit and versioned and should test measurement invariance before broad localization.

## 8. Validation plan before strong public claims

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

## 9. Data and privacy boundary

In the validation build, raw Quick and Deep political answers are stored only in browser `sessionStorage`. They are not written to Firestore. Firebase is currently used only for verified server connectivity infrastructure.

Any future account-linked saving of political profiles or school deployment involving minors is sensitive-data processing and **REQUIRES QUALIFIED LEGAL REVIEW** before production implementation.
