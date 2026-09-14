# Literacy master-bank candidate coverage v1

**Status:** Candidate content inventory — not validated for certified play  
**Bank version:** `literacy-master-2026.09-candidate-1`  
**Source language:** English  
**Target:** 40 CLASSIFY + 40 UNDERSTAND

This checkpoint maps the original 20+20 questions into the certification blueprint and adds 20+20 evidence-bound candidates. Every record remains `candidate`. The certified selector deliberately finds **zero eligible questions** until the documented review and validation gates are completed.

## CLASSIFY coverage

| Blueprint bucket | Original | Added | Candidate total | Served quota |
|---|---:|---:|---:|---:|
| Liberal traditions | 3 | 2 | 5 | 3 |
| Socialist / communist traditions | 5 | 2 | 7 | 3 |
| Conservative / Christian-democratic | 4 | 1 | 5 | 3 |
| Green / ecological | 2 | 2 | 4 | 2 |
| Nationalism / populism | 2 | 2 | 4 | 3 |
| Radical / extreme right / fascism | 3 | 1 | 4 | 3 |
| Democracy / authoritarianism | 1 | 3 | 4 | 3 |
| Anarchism / other | 0 | 3 | 3 | 2 |
| Cross-family discriminators | 0 | 4 | 4 | 3 |
| **Total** | **20** | **20** | **40** | **25** |

Difficulty capacity: 10 introductory, 14 intermediate, 16 advanced. This exceeds the served blueprint minima of 6 / 13 / 6 and leaves room for later calibration or retirement.

## UNDERSTAND coverage

| Blueprint bucket | Original | Added | Candidate total | Served quota |
|---|---:|---:|---:|---:|
| Definitions | 4 | 1 | 5 | 3 |
| Adjacent distinctions | 6 | 3 | 9 | 4 |
| Institutions and power | 3 | 2 | 5 | 3 |
| Economics and ownership | 1 | 4 | 5 | 3 |
| Misconceptions | 3 | 2 | 5 | 3 |
| Authoritarianism / totalitarianism | 1 | 3 | 4 | 3 |
| Limits of left–right | 1 | 2 | 3 | 3 |
| Multidimensional patterns | 1 | 3 | 4 | 3 |
| **Total** | **20** | **20** | **40** | **25** |

Difficulty capacity: 11 introductory, 19 intermediate, 10 advanced. This exceeds the served blueprint minima of 6 / 13 / 6.

## New concepts added

The first agreed 5+5 themes are represented directly:

- CLASSIFY: democratic socialism, classical liberalism, authoritarianism, anarchism, Marxism–Leninism.
- UNDERSTAND: communism versus Marxism–Leninism; democratic socialism versus modern social democracy; classical versus social liberalism versus libertarianism; authoritarianism versus totalitarianism; authoritarianism as a power structure rather than a fixed economic ideology.

The remaining additions close documented gaps in civic nationalism, electoral authoritarianism, electoral versus liberal democracy, anarchist diversity, social ownership, markets under socialism, institutional checks, contextual left–right language and multidimensional interpretation.

## Validation gates still required

No item may change to `validated` until its record documents:

1. definition/evidence review;
2. ambiguity review;
3. ideological-bias review;
4. distractor-quality review;
5. duplicate-concept review;
6. difficulty review;
7. consistency with the Politangle multidimensional model;
8. cognitive testing and calibration appropriate to the 18+ English certification population.

Automated checks establish structural integrity and blueprint capacity; they do not substitute for content or psychometric validation.

## Reader-first wording gate

The full English bank has received a plain-language pass for an ordinary adult reader, not a political-science specialist. Automated regression limits now require:

- no prompt longer than 22 words;
- no answer choice longer than 16 words;
- no explanation longer than 26 words;
- exactly four choices and one defensible answer per question;
- no correct answer that is visibly revealed by being much longer than every distractor;
- no unexplained academic shorthand such as “thin-centered,” “host ideology” or “procedural democracy” in prompts or explanations.

These are reading-load guardrails, not proof of comprehension. Cognitive interviews with the intended 18+ English audience remain required before validation.

## Editorial validation checkpoint

The question-by-question internal reader pass is recorded in `docs/literacy-validation-workflow-v1.md` and enforced by `lib/literacy-editorial-review.ts`.

- 79 items are ready for independent content review.
- C36 is held for an independent decision on its contested anarchism label and property framing.
- 0 items are validated for certified play.
- Any content change invalidates the pinned editorial-review fingerprint.
- A final `validated` record now requires independent content-review, cognitive-test and calibration artifacts plus explicit approval.
