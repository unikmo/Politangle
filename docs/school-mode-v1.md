# Politangle School Mode v1

Status: **SUPERSEDED IMPLEMENTATION / NON-PRODUCTION ONLY.**

The code described by this document was the first School prototype. It remains useful as implementation scaffolding for literacy sessions, anonymous class creation and aggregate storage, but it is **not the canonical School product architecture anymore**.

Canonical School design now lives in:

- `docs/school-classroom-onboarding-v2.md` — despite the historical filename, the document title is **Classroom Onboarding v3** and is the governing classroom architecture.
- `docs/school-lesson-guide-v1.md` — governing lesson-guide and youth-teaching framework.

## Why v1 was superseded

The original v1 made the self-paced sequence:

**Baseline → Learn → Practice → Post-test**

the center of School Mode and deliberately prevented BELIEVE/political-opinion answers from entering classroom aggregation.

That no longer matches the intended product.

The canonical model is now:

### Private Student Mode

Young person may use Quick 26 / Full 42 / literacy privately. Individual results remain private to that student.

### Classroom Mode

Teacher creates an anonymous room and may run:

- any of the Quick 26 BELIEVE questions;
- the Full 42 BELIEVE set;
- CLASSIFY / UNDERSTAND quizzes;
- a guided lesson;
- a custom subset;
- a single question at a time.

Students remain anonymous. The teacher sees **aggregate live totals and answer distributions**, but never which student gave which answer or an individual political/literacy profile.

Teacher receives a polished aggregate class/session summary and may export an aggregate-only PDF.

The original Baseline / Learn / Practice / Post-test sequence remains available as one possible classroom activity, not the definition of School Mode.

## Retained v1 implementation assets

The following concepts remain useful and should be reused where they fit the new model:

- anonymous room code;
- private teacher control secret;
- no student roster requirement;
- one-way duplicate-prevention receipts;
- no teacher-visible student identity;
- content-matched baseline/post literacy candidate forms;
- Firebase-backed aggregate class record concept;
- qualified legal/privacy review gate before real minor deployment.

## Migration requirement

Do not extend the existing self-paced-first UI as though it were final.

Refactor School implementation in this order:

1. Private Student vs Classroom entry;
2. teacher room creation + activity picker;
3. anonymous QR/code join;
4. teacher-paced/student-paced live room state;
5. all Quick 26 / Full 42 / literacy questions available to Classroom Mode;
6. live aggregate distribution charts visible to teacher;
7. projector reveal controls;
8. polished Class Summary;
9. aggregate-only PDF export;
10. guided lesson library focused on young people;
11. privacy/education Red Team and non-production E2E verification.

**REQUIRES QUALIFIED LEGAL REVIEW** before real classroom/minor deployment.
