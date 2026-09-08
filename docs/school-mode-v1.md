# Politangle School Mode v1

Status: **non-production classroom pilot implementation**.

## Purpose

School mode turns Politangle's political-literacy content into a classroom learning loop while keeping political beliefs separate from teacher analytics.

Core promise:

> **We measure learning for teachers. We protect beliefs for students.**

## Student flow

1. **Baseline** — 9 CLASSIFY + 6 UNDERSTAND questions, with no answer feedback during the test.
2. **Learn** — evidence-bound teaching cards covering the major political families and important contextual concepts.
3. **Practice** — the baseline bank is revisited with immediate answer feedback and explanations.
4. **Post-test** — a separately worded 9 CLASSIFY + 6 UNDERSTAND content-matched form.
5. **Result** — student sees baseline, post-test and change by overall / CLASSIFY / UNDERSTAND.
6. **Optional private BELIEVE** — student may open Politangle Quick separately; political-belief answers remain browser/session-local and are not accepted by the school class API.

## Parallel-form limitation

The post-test is a **content-matched parallel-form candidate**, not an empirically equated form. The two forms cover the same 15 learning targets with separate wording/scenarios, but equivalent difficulty has not yet been established with student data.

Do not describe the score change as a standardized educational effect until empirical equating/validation exists.

## Teacher flow

Teacher can:

- create an anonymous class code;
- receive a separate private teacher key;
- share only the short class code with students;
- always see baseline and post-test submission counts;
- see practice completion count;
- see class-average baseline/post literacy results only after the minimum aggregation threshold is reached for that phase;
- see class-average baseline-to-post change only after both phases reach the threshold;
- see question-level aggregate correctness only after the minimum aggregation threshold is reached;
- see baseline and post-test questions paired by the same learning target rather than treated as unrelated IDs;
- close or reopen the class.

Teacher cannot see:

- student names;
- a student list;
- individual literacy scores;
- individual political-family compatibility;
- individual BELIEVE answers;
- individual polygons;
- individual abortion/religion/nationhood responses;
- raw literacy option selections stored by the class backend.

## Data-minimization architecture

The school aggregation API accepts only:

- a random browser-generated participant token;
- phase (`baseline`, `practice`, `post`);
- for scored phases, question ID + section + `correct: boolean`.

It does **not** accept raw selected options or BELIEVE answers.

The backend stores class-level aggregate counts plus one-way hashed phase receipts used to prevent the same browser token from submitting the same phase twice. The teacher key is stored only as a SHA-256 hash.

The fixed pilot threshold is **10 submissions**. Below that threshold, the teacher receives only the submission/completion count for the phase: overall percentage, CLASSIFY percentage, UNDERSTAND percentage and question-level percentages are all suppressed. Baseline-to-post change remains suppressed until both phases reach the threshold.

The threshold is a product privacy safeguard, not a legal safe-harbor claim.

## Routes

- `/school` — school-mode entry
- `/school/student` — student learning flow
- `/school/teacher` — teacher class/dashboard flow
- `POST /api/school/classes` — create anonymous class
- `GET /api/school/classes/:code` — student-safe class status; with teacher Bearer key returns aggregate dashboard data
- `PATCH /api/school/classes/:code` — teacher-only open/close control
- `POST /api/school/classes/:code/submit` — anonymous literacy aggregate submission

## Evidence/content boundary

School mode reuses the academically grounded political-literacy evidence registry already used by Politangle. The main public families remain:

- Liberalism
- Conservatism
- Social democracy
- Socialism
- Green politics

Nationalism and Populism are taught as cross-cutting/contextual concepts. Narrower concepts such as Christian democracy, Libertarianism, Communism, Fascism and radical/extreme-right distinctions appear because they materially improve political literacy; they do not expand the five-family BELIEVE headline model.

## Privacy / legal boundary

**REQUIRES QUALIFIED LEGAL REVIEW** before use with real minors, schools or identifiable classroom cohorts.

This implementation is a technical privacy-first pilot, not a legal determination of compliance with GDPR, German school law, child-data rules or any other jurisdiction-specific requirements.

Before real classroom deployment, require at minimum:

- qualified privacy/legal review;
- school/minor consent-law review for each target jurisdiction;
- retention/deletion policy and operational deletion process;
- security review of teacher-key handling and class-code abuse cases;
- cognitive interviews with the intended student age group;
- accessibility testing;
- empirical evaluation of baseline/post-test form comparability;
- independent QA and live post-release verification.

## Red Team

Key failure modes addressed in v1:

1. Teacher political profiling — prevented by not sending BELIEVE answers to the school backend.
2. Raw literacy surveillance — prevented by submitting correctness booleans rather than selected options.
3. Tiny-class inference — completion counts remain visible, but all class-average and question-level score data are hidden below 10 submissions.
4. Post-test memorization — post-test uses separate wording/scenarios rather than repeating baseline prompts.
5. False learning precision — documentation explicitly states forms are not yet empirically equated.
6. Teacher-key leakage — teacher access uses a separate secret; only its hash is stored server-side.
7. False baseline/post comparison by ID — teacher analytics pair baseline and post-test items by their shared learning target.

Residual risks remain and are not silently treated as solved. School mode is therefore **TEST WITH CONDITIONS**, not production-ready.
