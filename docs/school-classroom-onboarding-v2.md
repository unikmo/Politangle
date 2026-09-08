# Politangle School — Classroom Onboarding v3

Status: **approved-direction design specification; supersedes the self-paced-first School v1 UI and the earlier v2 classroom draft. The current School implementation must be refactored to this model before it is treated as the School product.**

## Product principle

Politangle School has two different privacy contexts.

### PRIVATE STUDENT MODE

A young person explores Politangle independently.

- Quick 26, Full 42 and literacy quizzes may be taken privately.
- The student owns the result.
- No teacher or classroom receives the student's individual answers, political-family compatibility, polygon, THINK / FEEL / ACT result or literacy score.
- Private mode is the default outside a teacher-led classroom session.

### CLASSROOM MODE

A teacher creates an anonymous room and uses Politangle as a live teaching tool.

- Students join anonymously by QR code or room code.
- The teacher chooses what to run and how to progress.
- The teacher may run any of the canonical **Quick 26**, **Full 42**, literacy **CLASSIFY / UNDERSTAND quizzes**, a curated lesson pack, or selected individual questions.
- Students answer anonymously.
- The teacher sees **live aggregate totals and aggregate answer distributions** so they can understand where the room is and what students think.
- The teacher never sees which student gave which answer.
- The teacher receives a polished class/session summary after the activity and may export an aggregate-only PDF.

The privacy promise is therefore not "the teacher sees nothing political." It is:

> **The teacher sees the room, never the individual student.**

## School audience

School mode is designed primarily for **young people in secondary education**, with the first product target being approximately ages **14–18**. This is a product targeting decision, not a claim that the current wording has already been cognitively validated for every age in that range.

The School experience should be:

- mobile-first;
- plain-language;
- visually clear and fast to scan;
- respectful rather than childish;
- explicit when a political term needs explanation;
- based on situations young people can understand without requiring professional or adult-life experience;
- neutral in tone and free of party campaigning;
- designed to make disagreement discussable rather than embarrassing.

Any age-specific rewrite of a canonical BELIEVE item creates a new measurement form and must be revalidated rather than silently substituted.

## Educational guardrails

Politangle School should follow three core political-education principles:

1. **No indoctrination / no overpowering the learner.** Students must be able to form their own judgement.
2. **Controversial issues remain controversial.** Politangle should not hide legitimate competing positions merely because one answer is less popular in the room.
3. **Learner orientation.** Questions and discussion should help young people understand their own interests, values and reasoning.

Germany reference: Bundeszentrale für politische Bildung, Beutelsbacher Konsens: https://www.bpb.de/die-bpb/ueber-uns/auftrag/51310/beutelsbacher-konsens/

European reference: Council of Europe, Reference Framework of Competences for Democratic Culture: https://www.coe.int/en/web/reference-framework-of-competences-for-democratic-culture

## Classroom onboarding

### T1 — Start a classroom

Teacher chooses **Start classroom**.

No student roster is required.
No student names or student email addresses are required.

Teacher may optionally give the room a teacher-facing label such as:
- Politics Year 10
- Social Studies 11B
- Democracy Workshop

The label is session metadata, not a student roster.

### T2 — Choose lesson / activity

The teacher is not forced into one Politangle sequence.

Primary choices:

1. **Quick 26** — all 26 Quick BELIEVE questions.
2. **Full 42** — all 42 BELIEVE questions.
3. **Political Literacy Quiz** — CLASSIFY + UNDERSTAND.
4. **Guided Lesson** — a ready-made teacher lesson with goals, timing and selected questions.
5. **Build my own** — teacher selects individual questions/topics from the approved bank.
6. **Single live question** — teacher can launch one question, e.g. "Question 5", discuss it, then decide what comes next.

The teacher can change direction during a session. The system should not force a pre-declared path once the room is live.

### T3 — Classroom setup

Teacher receives:
- short room code;
- QR code;
- student join URL;
- private teacher control key/session;
- optional lesson guide for the selected activity;
- optional estimated duration.

Teacher chooses:
- teacher-paced or student-paced activity;
- whether the shared projector displays the live distribution while voting is open;
- whether results are revealed automatically or manually;
- whether students privately see their own Quick/Deep result at the end.

**Important:** the teacher control screen always receives the live aggregate distribution once the display privacy rule is satisfied. Hiding a developing distribution from the class projector must not hide it from the teacher.

### T4 — Student join

Student scans QR or enters code.

No:
- name;
- email;
- username;
- avatar;
- student ID.

Student sees a short youth-facing notice:

> **You are joining anonymously. Your teacher can see how the class answers, but not which answer came from you.**

If Private Explore is later opened:

> **Your personal Politangle result stays on your device unless you choose to use it elsewhere. It is not shown to your teacher.**

### T5 — Lobby

Teacher sees:
- joined count;
- activity selected;
- estimated lesson time;
- Start button.

Example:

> **24 joined · Quick 26 ready**

No roster appears.

## Teacher-led live question loop

The teacher can say:

> **Respond to Question 5.**

The system sends that question to every joined student device.

### Teacher view while answers arrive

Teacher sees continuously updating aggregate information:

- `18 / 24 responded`;
- answer counts;
- percentages;
- live bar / stacked-bar distribution;
- remaining non-response count.

For a 5-point BELIEVE item, the preferred teacher graph is the full five-position distribution rather than collapsing the room to a single mean.

For a four-option literacy question, show one bar per answer option.

The teacher may keep this graph private on their own device or project it live to the class. The default projector setting may hide the distribution until reveal to reduce peer influence, but **teacher live visibility is not restricted**.

### Student view while answering

Student sees:
- question;
- answer choices;
- optional simple definition/help for unfamiliar terms;
- Submit.

After submitting:

> **Response received. Waiting for the class.**

No other student's identity is ever shown.

### Teacher reveal / discussion

For BELIEVE:
- no correct answer;
- show the aggregate room distribution;
- offer neutral discussion prompts;
- optionally show how the question maps to a construct such as ownership, authority, pluralism or ecology;
- do not tell the class that one political position is the correct one.

For CLASSIFY / UNDERSTAND:
- show aggregate option distribution;
- reveal correct answer;
- show evidence-backed explanation;
- teacher can immediately re-teach a concept when many students missed it.

Then the teacher may:
- Next recommended question;
- Pick another question;
- Open discussion prompt;
- Launch a quiz;
- Switch from Quick to Full;
- End session.

## Classroom use of Quick 26 and Full 42

All canonical BELIEVE items are available in Classroom Mode.

### Quick 26

Teacher options:
- run all 26 teacher-paced;
- run all 26 student-paced;
- use a subset as a live discussion lesson;
- pause after any question and discuss the distribution;
- continue later in the same room/session if supported by retention policy.

### Full 42

Teacher options:
- continue from Quick 26 into the additional 16;
- start directly with Full 42;
- use THINK / FEEL / ACT as lesson sections;
- compare aggregate THINK / FEEL / ACT patterns in the room.

The 42 canonical questions remain unchanged unless a separately validated youth form is later introduced.

## Classroom quizzes

CLASSIFY and UNDERSTAND questions are first-class classroom activities, not an add-on after BELIEVE.

Teacher may:
- start with a literacy quiz before any BELIEVE questions;
- quiz after a teaching section;
- interleave quiz questions with BELIEVE questions;
- finish with a post-lesson quiz;
- run only a quiz lesson.

Teacher sees:
- live aggregate option distribution;
- aggregate correct / incorrect after reveal;
- concept-level class performance;
- no individual score.

## Data model — anonymous but useful to the teacher

The system needs enough aggregate data to teach from the room while refusing student-level drill-down.

### Per live question

Persist:
- room/session ID;
- question ID;
- aggregate counts for each answer option / response position;
- total responses;
- one-way duplicate-prevention receipt separated from answer value.

Do not persist a row equivalent to:

`student/device X -> question 5 -> answer B`

The persisted teaching record should instead be equivalent to:

`Question 5 -> A:4, B:7, C:3, D:6, E:4; n=24`

### Aggregate political summary

When a room completes enough BELIEVE questions, Politangle may calculate and persist aggregate classroom sufficient statistics that support a useful teacher summary without creating student profiles.

Examples:
- aggregate mean and response distribution for each of the 8 polygon axes;
- aggregate family-compatibility totals/means where methodologically justified;
- coarse anonymous compatibility bands, e.g. 0–24 / 25–49 / 50–74 / 75–100, only as aggregate bucket counts;
- aggregate THINK / FEEL / ACT patterns when enough relevant items are complete.

No teacher-facing summary may permit drilling from a class bar, polygon point or family band to an individual participant.

Do **not** call an aggregate room pattern a fixed class identity such as "this is a Conservative class." Prefer language such as:

- "The room leaned toward... on this construct"
- "Responses were split"
- "The class aggregate showed stronger compatibility with..."
- "There was substantial variation across responses"

## Privacy display threshold

System anonymity does not eliminate inference risk in very small groups.

The exact minimum response count for displaying sensitive classroom distributions must be treated as a policy setting to be finalized through privacy/legal review and pilot testing.

For the current non-production pilot, the existing safeguard may remain **n>=10**. Product design must not hard-code this as a universal legal threshold.

Below the active display threshold:
- teacher still sees joined/responded counts;
- distribution remains suppressed until the threshold is reached.

Once the threshold is reached:
- the teacher's live graph updates continuously as additional responses arrive.

## Teacher Session Summary

At any time, especially at the end of a lesson, the teacher can open **Class Summary**.

This should be one of the strongest School product screens, not a raw admin table.

### Executive classroom snapshot

Top section:
- room / lesson name;
- date and duration;
- participants joined;
- questions launched;
- response completion rate;
- activity type: Quick 26 / Full 42 / Quiz / Guided / Custom.

### What the room thinks

For BELIEVE activities:
- visually polished 8-axis aggregate classroom map where enough data exists;
- strongest aggregate issue leans;
- most divided questions;
- most consensual questions;
- five-family aggregate compatibility view where methodologically supported;
- THINK / FEEL / ACT aggregate comparison for Full 42;
- topic-level summaries such as economy, values, authority, pluralism, nationhood, world/sovereignty and ecology.

The teacher should see both **totals and distributions**. Averages alone can hide a split room.

### What the room understands

For literacy activities:
- overall aggregate accuracy;
- CLASSIFY aggregate accuracy;
- UNDERSTAND aggregate accuracy;
- concepts most often understood;
- concepts most often confused;
- per-question distribution and correct-answer rate;
- baseline / post-lesson change if both forms were used.

### Discussion opportunities

Politangle should automatically surface neutral teaching prompts such as:
- "The room was divided almost evenly here. What values may explain the difference?"
- "Most students chose Social democracy. What feature distinguishes it from Socialism?"
- "The room's THINK and FEEL responses differ on this issue. Why might that happen?"

These are prompts for inquiry, not normative instructions.

## PDF export

Teacher may export **Classroom Summary PDF**.

The PDF contains aggregate-only information:
- lesson title/date;
- learning goals;
- participation totals;
- charts for selected questions;
- aggregate classroom map;
- aggregate family / construct summaries where supported;
- literacy quiz results;
- discussion prompts;
- optional teacher notes;
- methodology/privacy note.

The PDF must not contain:
- student names;
- student IDs;
- device identifiers;
- individual political profiles;
- individual literacy scores;
- per-student response histories.

The report should be suitable for:
- teacher reflection;
- lesson documentation;
- school leadership/curriculum evidence;
- planning the next lesson.

PDF output is an optional teacher action, not automatic transmission of political data.

## Guided lesson system

Politangle School includes ready-to-run lesson guides. Each guide must specify:

- age / school level target;
- learning goals;
- prerequisites;
- estimated duration;
- questions to launch;
- when to pause and discuss;
- neutral teacher prompts;
- concepts to explain;
- expected misconceptions;
- optional extension activity;
- recommended follow-up;
- which aggregate charts to review at the end.

The teacher remains in control and can depart from the guide at any time.

See `docs/school-lesson-guide-v1.md`.

## Red Team decisions

1. **Individual privacy is not the same as teacher blindness.** Teacher must see useful aggregate political and literacy information.
2. **Teacher sees live aggregate distribution.** Only the shared class/projector display may optionally delay reveal.
3. **All 26 / 42 BELIEVE questions belong in School Classroom Mode.** They are not restricted to private mode.
4. **Literacy quizzes can start, interrupt or finish a lesson.** The teacher controls sequence.
5. **Do not reduce a polarized room to one average.** Always retain distribution views alongside aggregate summaries.
6. **No roster / no individual drill-down.** A bar or polygon point must never lead to a student.
7. **Do not create a class ideology label.** Teach from patterns and distributions.
8. **Young people are the primary School audience.** Explanations, help text, lesson timing and UX must be designed for them.
9. **Canonical question wording remains versioned.** Youth rewrites require validation.
10. **PDF is aggregate-only.** Export must not become a backdoor student political dossier.

## Implementation gate

The existing School v1 implementation does not yet satisfy this design.

Next implementation sequence:

1. refactor `/school` around **Private Student** vs **Classroom** entry;
2. build teacher classroom creation + activity picker;
3. build anonymous QR/code student join;
4. implement teacher-paced and student-paced room state;
5. expose all Quick 26 / Full 42 / CLASSIFY / UNDERSTAND question banks to Classroom Mode;
6. implement live aggregate option/scale distributions for the teacher;
7. add optional shared-projector reveal control;
8. build polished Class Summary;
9. build aggregate-only Classroom Summary PDF;
10. integrate ready-to-run lesson guides;
11. independent privacy/education Red Team;
12. non-production Firebase end-to-end verification;
13. cognitive interviews/accessibility testing with intended young users;
14. **REQUIRES QUALIFIED LEGAL REVIEW** before real school/minor deployment.
