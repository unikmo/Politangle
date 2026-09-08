# Politangle BELIEVE v2.1 — locked 42-item measurement architecture

Status: **content-validation implementation**. This architecture is implemented and testable, but it is **not yet a psychometrically validated political diagnostic**.

Canonical questionnaire version: `belief-2026.09-v2.1-phase1`.

## Locked count

Politangle BELIEVE is locked at **42 political-belief items**:

- **26 Quick**
- **16 Deep**
- **14 THINK**
- **14 FEEL**
- **14 ACT**

The count is enforced in code. Adding a 43rd belief item now fails the architecture integrity test unless the model is deliberately versioned and the lock is changed.

CLASSIFY and UNDERSTAND remain political-literacy questions and do **not** influence BELIEVE ideology compatibility.

## Why 14 × 3 instead of arbitrary question weights

The previous idea of assigning every answer a 33% / 67% / 100% intensity multiplier was rejected as unnecessary precision. BELIEVE keeps the simple internal ordered response scale:

- `-2` = strongly toward the first pole
- `-1` = somewhat toward the first pole
- `0` = genuinely balanced / depends
- `+1` = somewhat toward the second pole
- `+2` = strongly toward the second pole
- `unsure` = excluded from scoring

The engine does **not** show these numbers to users as an ideology score.

Question importance is not a single global weight. The same construct can be highly relevant to one political family and irrelevant to another. Politangle therefore uses family-specific relevance values:

- `0` = not used for that family
- `1` = useful / typical discriminator
- `2` = defining / high-value discriminator

This is a relevance model, not a claim that Question X is universally twice as important as Question Y.

## Fourteen constructs

Each construct has exactly one THINK item, one FEEL item and one ACT item:

1. Public responsibility for essential-service access ↔ more limited government / private arrangements
2. Redistribution ↔ lower compulsory redistribution
3. Social / worker / cooperative ownership ↔ private / shareholder ownership
4. Earlier adaptation to social change ↔ continuity / durable acceptance before change
5. Personal autonomy ↔ shared moral regulation
6. Abortion: legal autonomy ↔ stronger prenatal-life protection
7. Liberty / safeguards ↔ preventive authority / order
8. Pluralism / independent checks ↔ wider elected-government latitude
9. International cooperation ↔ national discretion / sovereignty
10. Equal national membership for naturalized citizens ↔ additional weight for citizen-from-birth status
11. Plural/trade-off view of political disagreement ↔ people-versus-elite common-will view
12. Ecological limits ↔ growth priority
13. Excluding religious moral principles as public reasons ↔ accepting them as legitimate public reasons
14. Higher-government responsibility ↔ lowest-capable-level / subsidiarity responsibility

This structure is deliberate: tensions are only compared **within the same construct**. Politangle does not call a person contradictory merely because, for example, their economic answers and national-sovereignty answers differ.

The Phase-1 forensic item review is documented in `docs/believe-v2-phase1-item-validation.md`.

The Phase-2 adversarial synthetic-profile review is documented in `docs/believe-v2-phase2-synthetic-stress.md`.

## THINK / FEEL / ACT

The design is informed by the tripartite model of attitudes. The APA Dictionary of Psychology describes cognitive, affective and behavioral bases of attitudes as beliefs/evaluations, feelings/emotions, and responses including past behavior or future intentions.

Primary reference:
- APA Dictionary of Psychology, *bases of an attitude*: https://dictionary.apa.org/bases-of-an-attitude

Supporting empirical reference:
- Breckler, S. J. (1984), *Empirical validation of affect, behavior, and cognition as distinct components of attitude*, Journal of Personality and Social Psychology. PubMed: https://pubmed.ncbi.nlm.nih.gov/6527214/

### Important limitation

Politangle ACT currently measures **self-reported behavioral intention / stated choice**, not independently observed behavior. The product must not tell users that it has measured what they actually do in the real world unless behavioral data are later collected with explicit consent.

The triangle therefore represents:

- **THINK** — stated beliefs and evaluations
- **FEEL** — stated affective reactions / intuitions
- **ACT** — stated behavioral choices or intentions

## Political polygon

The engine exposes an eight-axis political-shape vector for future polygon visualization:

1. Economic role
2. Ownership
3. Social values
4. Authority
5. Pluralism
6. World / sovereignty
7. Nationhood / membership
8. Ecology

The polygon is a profile, not an ideology box. A respondent can therefore occupy combinations that conventional one-dimensional left/right labels hide — for example, social traditionalism together with universal-service preferences, regulated markets or strong democratic constraints.

Populism and the religion/subsidiarity subtype variables remain available as additional tendencies rather than being forced into the eight-sided core polygon.

**Phase-2 correction:** Politangle does not currently average Nationhood/membership and World/sovereignty into a single numeric Nationalism score. Synthetic testing showed that a civic sovereigntist and a birth-weighted internationalist could collapse toward the same artificial midpoint. The two measured axes therefore remain separate; Nationalism remains an educational/context concept until a dedicated validated scale exists.

## Statement → ideology relevance

Every locked statement is linked to a construct. Every main political family has an explicit construct-loading matrix. The engine can therefore answer, for any statement:

- which family or families use that construct;
- whether its relevance is `0`, `1` or `2`;
- which direction supports that family profile;
- which evidence IDs support the loading.

This is preferable to hard-coding a statement as “a Conservative question” or “a Socialist question”. A statement may be relevant to several families, and many statements correctly have relevance `0` to a family.

Main headline families remain:

- Liberalism
- Conservatism
- Social democracy
- Socialism
- Green politics

Populism and Authority / democratic constraints remain scored cross-cutting tendencies, not competing headline families. Nationalism remains a cross-cutting educational/context concept but is **not assigned one numeric pilot score** from the current 42 items.

## Compatibility and the Think / Feel / Act triangle

For each political family, Politangle can calculate four independent outputs:

- overall compatibility
- THINK compatibility
- FEEL compatibility
- ACT compatibility

These are **compatibility indices**, not probabilities or identity assignments.

This makes a meaningful triangle possible. Example interpretation:

- THINK: strong Conservative compatibility
- FEEL: mixed
- ACT: lower Conservative compatibility

Politangle may describe this as a **tension** between stated beliefs, affective reactions and stated behavioral choices. It must not automatically call the user hypocritical or inconsistent.

## Red Team / methodological safeguards

1. **Do not force coherent ideology.** A person may simultaneously support socially conservative positions and universal healthcare, regulated markets or redistribution. Constructs with relevance `0` to a family do not penalize that family score.
2. **Do not treat 0–100 as probability.** It is a normalized compatibility index for the measured constructs.
3. **Do not treat ACT as observed behavior.** It is self-report / behavioral intention at this stage.
4. **Do not infer extremism from ordinary conservative, nationalist, socialist or populist answers.** Dedicated democratic-constraint and other explicit evidence gates remain required.
5. **Do not assume the expert relevance matrix is final truth.** The 0/1/2 loadings are evidence-informed priors and must be calibrated against respondent data. Item discrimination, reliability, factor structure and measurement invariance remain empirical questions.
6. **Do not use famous people as scoring authorities.** Historical or public figures may later be shown as educational reference anchors only after independent sourcing of their documented positions. They should not determine the respondent's score.
7. **Cross-national validation is mandatory.** Political terms and issue alignments vary by country. The locked count does not imply that every loading is culturally invariant.
8. **Citizenship-at-birth law is no longer the global-core nationhood proxy.** Phase 1 moved the construct to naturalized-versus-citizen-from-birth national membership. Birthright-citizenship policy can be country/context material later.
9. **Do not collapse national membership and sovereignty into a Nationalism number.** Phase 2 found that doing so destroys politically meaningful combinations. A scored nationalism output needs dedicated measurement work.
10. **Radical-right output is screening-only.** The current Nationhood/membership construct is not a validated nativism scale. The conditional output is therefore named `Populist radical-right screening pattern` and must not be used as a personal extremist or far-right identity label.

## Implementation state

Canonical scoring and source wording are in `lib/belief-v2-engine.ts`; the locked browser session is in `lib/belief-v2-session.ts`; regression coverage is in `lib/belief-v2-engine.test.ts`, `lib/belief-v2-session.test.ts` and `lib/phase2-synthetic-stress.test.ts`.

The public engine routes now use BELIEVE v2.1:

- `/quiz` administers the locked 26-item Quick stage;
- `/results` reads the BELIEVE v2 session and calculates the canonical polygon/family model;
- `/deep` administers the remaining 16 BELIEVE items and the separately scored CLASSIFY / UNDERSTAND political-literacy block.

Raw political answers remain browser/session-local in the current implementation. Visual design remains deliberately out of scope for this engine-validation phase.
