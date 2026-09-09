# BELIEVE v2.1 — Phase 2 synthetic engine stress test

Status: **Phase 2 complete — TEST WITH CONDITIONS**

Questionnaire version: `belief-2026.09-v2.1-phase1`

Scope: adversarial synthetic-profile testing of the current BELIEVE scoring, cross-cutting tendency and conditional-nuance rules after Phase 1 item validation. This phase asks whether deliberately difficult combinations of answers produce defensible outputs before real respondents are recruited.

This is **not psychometric validation**. Synthetic profiles can find logical contradictions, leakage, monotonicity errors and over-classification. They cannot establish reliability, factor structure, item discrimination, population thresholds or cross-national measurement invariance.

## Test principle

Politangle should not force respondents into a single coherent ideology. The stress suite therefore emphasizes mixed profiles that are common enough to be politically intelligible but are easy for simplistic quizzes to misclassify.

The suite tests four distinct output layers:

1. **Five broad political-family compatibility indices** — Liberalism, Conservatism, Social democracy, Socialism and Green politics.
2. **Eight-axis political shape** — Economic role, Ownership, Social values, Authority, Pluralism, World/sovereignty, Nationhood/membership and Ecology.
3. **Cross-cutting scored tendencies** — Populism and Authority/democratic constraints.
4. **Conditional nuances** — Democratic-socialist tendency, conservative subtypes and a guarded populist-radical-right screening pattern.

## Synthetic profiles and expected behavior

| Profile | Intended stress question | Phase-2 result |
|---|---|---|
| Market-liberal + socially progressive | Can strong private ownership coexist with strong social autonomy/liberty? | PASS — strong Liberal compatibility; Socialism remains low |
| Welfare conservative | Can public services/redistribution coexist with social Conservatism and private ownership? | PASS — Conservative and Social-democratic compatibility can both be high |
| Traditional constitutional conservative | Does constitutional/liberty preference wrongly disqualify Conservatism? | PASS — remains Conservative without an authoritarian or radical-right signal |
| Classic social democrat | Does welfare-state support remain distinct from Socialism? | PASS — Social democracy remains strong; private ownership limits Socialist compatibility |
| Market-oriented social democrat | Can moderate redistribution/public responsibility remain Social-democratic? | PASS — Social-democratic signal remains strong without requiring Socialist ownership |
| Pluralist socialist | Can Socialist economics coexist with strong democratic checks? | PASS — Socialist family remains strong and democratic-socialist nuance can appear conditionally |
| Authoritarian socialist | Does authoritarianism erase Socialist economics or get confused with democratic socialism? | PASS — Socialist family remains strong; democratic-socialist nuance does not appear |
| Structural Green | Does Green require ecology plus democratic/decentralist tendencies? | PASS |
| Market-oriented Green | Does Green incorrectly require Socialist ownership? | PASS — Green can remain strong with private ownership |
| Progressive but growth-first | Does social progressivism alone produce a Green result? | PASS — strong Liberal compatibility does not substitute for ecological priority |
| Populist democrat | Does populism automatically imply authoritarianism? | PASS — high Populism can coexist with low authority/democratic-constraint risk |
| Authoritarian non-populist | Does authoritarian preference automatically imply populism? | PASS — authority signal can be high while Populism is low |
| National social democrat | Do nationhood/sovereignty views erase economic family fit? | PASS — Social-democratic compatibility remains strong; Nationhood and World axes remain separate |
| Civic sovereigntist | Can inclusive national membership coexist with strong sovereignty preference? | PASS after Phase-2 correction |
| Birth-weighted internationalist | Can restrictive membership coexist with international cooperation? | PASS after Phase-2 correction |
| Populist radical-right screening combination | Is the guarded pattern triggered only by the combined relevant signals? | PASS — requires the combined nationhood-membership, authoritarian-order and populist pattern |
| Religious conservative | Does religion alone over-trigger Christian democracy? | PASS — religious-conservative nuance can appear without Christian-democratic subtype |
| Christian-democratic combination | Do religion, subsidiarity, democratic compatibility and social-market economics combine selectively? | PASS |
| THINK/FEEL/ACT divergence | Does the engine hide mode disagreement in one average? | PASS — mode scores and tension remain visible independently |
| All answers unsure | Does missing signal become fake centrism? | PASS — scores are null and coverage falls to zero |

## Material issue discovered: a single Nationalism score was invalid

Before this stress pass, the engine averaged two constructs into one numeric `nationalism` tendency:

- Nationhood / membership
- World / sovereignty

The synthetic profiles exposed a structural error.

A respondent can be:

- **civic/inclusive about national membership but strongly sovereignty-oriented**, or
- **birth-weighted about national membership but strongly internationalist**.

Under the old average, both opposing shapes could collapse toward the same midpoint. That is information loss, not useful synthesis.

The conceptual problem is also substantive. Nationalism is a family of beliefs about national identity, national value and political self-determination. National self-determination is not identical to a preference for maximum state sovereignty, and nationalism can take civic as well as more culturally or ancestrally restrictive forms.

### Phase-2 correction

Politangle no longer emits a single numeric **Nationalism** tendency from the current 42-item pilot.

Instead:

- **Nationhood / membership** remains an independent polygon axis.
- **World / sovereignty** remains an independent polygon axis.
- **Nationalism** remains an educational/context concept in the result table, explicitly marked `scored: false`.
- A future numeric nationalism measure would require a dedicated validated scale rather than an average of these two constructs.

This is intentionally more conservative than showing a superficially precise number.

## Radical-right screening correction

The synthetic pass also Red-Teamed the far-right nuance.

Comparative radical-right literature commonly treats **nativism + authoritarianism + populism** as a defining combination. Politangle does not yet contain a dedicated validated nativism scale. Its Nationhood/membership construct is narrower: it measures equal acquired membership versus additional weight for citizen-from-birth status.

Therefore the engine no longer presents that output as though it were a direct personal far-right classification.

User-facing name:

> **Populist radical-right screening pattern**

The output explicitly states that:

- the nationhood construct is a screening proxy, not a validated nativism scale;
- ordinary Conservatism is not the same thing;
- the pattern is not equivalent to Fascism or the extreme right;
- it must not be used as a personal extremist or far-right identity label.

The signal still requires the relevant combination. Removing the nationhood restriction, authoritarian-order signal or populist signal prevents the screening pattern from appearing.

## Property tests added

The stress suite does more than test named archetypes.

### Zero-relevance invariance

For every broad family, every construct with relevance `0` is independently pushed to both extremes. The family score must remain exactly unchanged.

This guards against hidden leakage such as:

- abortion silently changing Conservatism despite relevance `0`;
- nationhood silently changing Social democracy;
- public provision silently changing broad Conservatism.

### Monotonicity

Every declared family loading is tested in both directions. Moving a relevant construct toward the evidence-defined family direction must increase that family compatibility relative to moving it equally toward the opposite pole.

This guards against sign errors and accidental polarity reversals.

### Missing-signal behavior

When all 42 answers are `unsure`:

- all family compatibility outputs are `null` with zero coverage;
- all scored tendencies are `null` with zero coverage;
- all polygon axes are `null` with zero coverage;
- no conditional nuance is emitted.

The engine therefore does not turn uncertainty into a fabricated centrist profile.

## Intentional overlap retained

Some synthetic profiles produce more than one high family compatibility score. This is not treated as a defect.

Examples:

- a welfare conservative can be highly compatible with both **Conservatism** and **Social democracy** because the current broad Conservative model deliberately does not penalize universal public services or redistribution;
- a pluralist progressive Socialist can also share substantial **Liberal** and **Social-democratic** characteristics;
- a market-oriented Green can combine **Green politics** with market/private-ownership preferences.

This is consistent with Politangle's premise that the output is a multidimensional political shape plus compatibility indices, not a forced identity assignment.

## Verification

GitHub workflow: **Politangle Engine CI**

Verified Phase-2 code head: `d58b9400060fe6af3a4da3cf46d9485bc0f3c203`

Run: `34217793447`

Result:

- **118 / 118 tests passed**
- **0 failed**
- Next.js optimized build: **PASS**
- lint/type validity check: **PASS**
- static generation: **PASS**
- `/quiz`: **PASS**
- `/results`: **PASS**
- `/deep`: **PASS**

The CI warnings are dependency/action deprecation warnings and do not represent test or build failures.

## Red Team / residual risks

Phase 2 leaves several deliberate open questions for respondent calibration:

1. **Compatibility bands remain priors.** `75+ strong`, `60+ broad`, etc. are not empirically calibrated thresholds.
2. **No core-gating rule has been added.** A family score remains a weighted compatibility index; the engine does not yet require a minimum score on a separately designated core construct.
3. **THINK/FEEL/ACT separation is not yet empirical.** Synthetic tests prove the software preserves divergence, not that real respondents produce distinct, reliable components.
4. **Nationalism has been decomposed rather than overclaimed.** A future scored nationalism construct requires dedicated item development and validation.
5. **Radical-right output remains screening-only.** A validated nativism measure would be required before making stronger comparative classification claims.
6. **Synthetic archetypes are not population evidence.** Real pilot data must test item distributions, floor/ceiling effects, redundancy, discrimination, reliability and dimensionality.
7. **Cross-national invariance remains untested.** The same wording may behave differently across Germany, the UK, the US and other markets.
8. **School comprehension remains untested.** Cognitive interviewing with the intended age range is still required before classroom deployment.

## Phase-2 verdict

**TEST WITH CONDITIONS.**

The rule engine now survives a substantial adversarial synthetic-profile suite and two overclaims were removed rather than normalized: the false one-number Nationalism tendency and overly strong far-right labeling. The next evidence gate should use real pilot respondents and cognitive interviews rather than adding more theory-driven scoring rules.