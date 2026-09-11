# Politangle School — Age Bands and Candidate Forms v2

Status: **pilot implementation reference.** The age-specific forms below are implemented as separate candidate forms, but real-world cognitive validation is still required before broad use with minors.

## Age bands

### Junior — ages 10–13

Junior is designed for teacher-guided classroom use during the pilot.

It has:

- a separate 16-question BELIEVE bank;
- 13 political constructs represented;
- one short statement at a time;
- full-word response choices rather than numeric survey shorthand;
- a dedicated eight-question political-know-how bank;
- two Junior guided lessons;
- English, German, Spanish and French interactive wording;
- anonymous classroom participation without student name, email or roster;
- aggregate-only teacher results.

Junior does **not** fall through to the Youth CLASSIFY / UNDERSTAND bank or the adult BELIEVE form.

The response choices are:

1. No, definitely not
2. Mostly no
3. It depends
4. Mostly yes
5. Yes, definitely
6. I'm not sure / I don't understand

BELIEVE screens state plainly: **There is no correct political answer.**

### Youth — ages 14–18

Youth uses a separate plain-language candidate form while preserving the canonical BELIEVE construct/mode/scoring coordinates.

Youth may use:

- Quick 26;
- Full 42;
- political-literacy quizzes;
- guided classroom lessons;
- teacher-paced or student-paced rooms;
- approved custom questions;
- private student exploration where appropriate.

Youth wording is not the adult source wording with a new visual skin. It is separately versioned and must be validated as its own measurement form.

## Why the forms are separate

A shorter sentence is not automatically an age-appropriate question. Younger students can also differ in vocabulary, background knowledge, working-memory load, interpretation of abstract political institutions, comfort with survey scales and susceptibility to teacher or peer cues about a “good” answer.

For that reason the Junior path separates the question bank, literacy bank, response labels, classroom routing, guided lessons, translation coverage and automated reading-load/jargon guardrails.

## Junior political-know-how topics

The eight Junior knowledge questions cover:

1. socialism and worker/public ownership;
2. the Marxian communist ideal;
3. elections plus rights, laws and checks;
4. public funding versus public ownership;
5. why one state-owned railway does not make a country communist;
6. why wanting national control does not by itself tell you left or right;
7. a basic populism distinction;
8. why extensive public help does not automatically make a country socialist.

The prompts avoid specialist terms such as *subsidiarity*, *pluralism*, *nativism*, *majoritarianism*, *autocratization* and *means of production*. Those terms can be taught after the underlying idea is understood.

## Current language support

The interactive School product supports English, German, Spanish and French.

Junior BELIEVE has explicit wording in all four languages, as does the Junior knowledge bank. Youth BELIEVE, public CLASSIFY / UNDERSTAND content, student classroom UI, teacher access/pilot UI, teacher dashboard controls and projector UI also have four-language paths.

Long-form legacy teacher handbook PDFs and all older Youth lesson-guide prose still require a complete professional four-language editorial pass. They should not yet be described as fully localized documentation.

## Validation standard for an 11-year-old

Automated checks currently protect sentence length, prohibited adult jargon, age routing, translation coverage, answer-bank separation and scoring behavior.

That is **not** the same as proving an 11-year-old understands the question.

The Junior pilot must include real cognitive interviews. At minimum, ask students to paraphrase each item in their own words, explain what each answer choice means, point out unfamiliar words, say whether the question appears to have a “right” political answer, explain what the teacher can and cannot see, and use “I don't understand” whenever wording is unclear.

Repeated misinterpretation is a revision trigger even when an adult can explain the intended meaning afterward.

See [`school-pilot-teacher-guide-v1.md`](./school-pilot-teacher-guide-v1.md) for the full pilot protocol.

## Release gates

Before broad Junior deployment:

1. cognitive interviews with real 10–13-year-olds;
2. classroom pilots in more than one context;
3. accessibility and mobile testing;
4. fluent-educator review of supported-language wording;
5. qualified legal/privacy review for minors and schools;
6. revision and retesting of items that fail comprehension or neutrality checks.

The School pilot gate exists partly to collect this evidence before broad rollout, not merely to restrict access.
