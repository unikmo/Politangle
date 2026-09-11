# Politangle School — Classroom Onboarding v3

> **Current implementation note — 2026-09-11:** This design specification is retained as the architectural history for classroom privacy, aggregation and teacher-led flow. The current pilot implementation now includes separate **Junior 10–13** and **Youth 14–18** paths, a dedicated Junior political-literacy bank, four-language interactive School UI, teacher-resource preview, and a pilot-registration gate. For the current rollout and validation rules, use [`school-pilot-teacher-guide-v1.md`](./school-pilot-teacher-guide-v1.md). Real 10–13-year-old cognitive interviews and qualified legal/privacy review remain release gates before broad minor-facing deployment.

Status: **implemented direction for the School pilot; this file should no longer be read as a claim that the classroom architecture is still unbuilt.**

## Product principle

Politangle School has two different privacy contexts.

### PRIVATE STUDENT MODE

A young person explores Politangle independently.

- Quick 26, Full 42 and literacy quizzes may be taken privately by the Youth 14–18 path.
- Ages 10–13 use the dedicated Junior classroom path during the current pilot rather than being sent through the older Youth form.
- The student owns any private result.
- No teacher or classroom receives the student's individual answers, political-family compatibility, polygon, THINK / FEEL / ACT result or literacy score.
- Private mode is the default outside a teacher-led classroom session for the Youth path.

### CLASSROOM MODE

A teacher creates an anonymous room and uses Politangle as a live teaching tool.

- Students join anonymously by room code.
- The teacher chooses what to run and how to progress.
- Youth classrooms may run **Quick 26**, **Full 42**, political-literacy quizzes, a curated lesson pack, or selected individual questions.
- Junior classrooms use the separate 16-question Junior BELIEVE form, the dedicated eight-question Junior political-know-how bank, Junior guided lessons, or approved Junior custom questions.
- Students answer anonymously.
- The teacher sees **live aggregate totals and aggregate answer distributions** so they can understand where the room is and what students think.
- The teacher never sees which student gave which answer.
- The teacher receives a class/session summary based on aggregate information.

The privacy promise is therefore not "the teacher sees nothing political." It is:

> **The teacher sees the room, never the individual student.**

## School audience

School mode now has two explicit candidate age bands:

- **Junior 10–13** — shorter wording, full-word response choices, dedicated knowledge questions and teacher-guided use during the pilot.
- **Youth 14–18** — Quick 26, Full 42, literacy and guided/custom classroom activities, plus private exploration.

These are product forms, not claims of completed psychometric or cognitive validation. In particular, Junior must still be tested with real 10–13-year-olds before broad deployment. Automated reading-load, vocabulary and routing tests do not substitute for asking an 11-year-old what a question means in their own words.

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

## Pilot access model

Teacher resources are deliberately discoverable before operational access is granted.

1. A teacher can see the lesson catalogue, target age bands, duration and the purpose of the resource.
2. The teacher submits a pilot request using adult/school contact information only: work email, school/organisation, country, role and intended age band. No student data is requested.
3. The request does **not** automatically unlock the classroom.
4. Approved pilot teachers receive a teacher access code.
5. The code unlocks full lesson flows, discussion prompts, live rooms and class summaries.

This gate exists so the 10–13 language, classroom dynamics, privacy understanding and teacher workflow can be tested before broad minor-facing rollout.

## Classroom onboarding

### T1 — Start a classroom

Teacher chooses **Start classroom** after pilot approval.

No student roster is required.
No student names or student email addresses are required.

Teacher may optionally give the room a teacher-facing label such as:
- Politics Year 10
- Social Studies 11B
- Democracy Workshop

The label is session metadata, not a student roster.

### T2 — Choose lesson / activity

The teacher is not forced into one Politangle sequence.

For Youth 14–18, primary choices include:

1. **Quick 26** — all 26 Quick BELIEVE questions.
2. **Full 42** — all 42 BELIEVE source questions.
3. **Political Literacy Quiz** — the approved Youth literacy bank.
4. **Guided Lesson** — a ready-made teacher lesson with goals, timing and selected questions.
5. **Build my own** — teacher selects individual questions/topics from the approved Youth bank.
6. **Single live question** — teacher can launch one approved question and decide what comes next.

For Junior 10–13, primary choices include:

1. **Junior 16** — the separate Junior BELIEVE form.
2. **Junior political know-how** — eight age-specific knowledge questions.
3. **Junior guided lessons** — currently *Who is trying to influence me?* and *Power, fairness and disagreement*.
4. **Junior custom** — selections only from approved Junior questions.

The teacher can change direction during a session. The system should not force a pre-declared path once the room is live.

### T3 — Classroom setup

Teacher receives:
- short room code;
- student join URL;
- private teacher control key/session;
- optional lesson guide for the selected activity;
- optional estimated duration.

Teacher chooses:
- teacher-paced or student-paced activity;
- whether the shared projector displays the live distribution while voting is open;
- whether results are revealed manually or live according to the selected projector mode.

**Important:** the teacher control screen receives aggregate class information. Hiding a developing distribution from the shared projector must not turn the product into an individual-student tracker.

### T4 — Student join

Student enters the room code.

No:
- name;
- email;
- username;
- avatar;
- student ID.

Student sees a short youth-facing notice equivalent to:

> **You do not need a name or email. Your teacher sees how the class answers, not which answer is yours.**

For BELIEVE questions the student also sees the plain rule:

> **There is no correct political answer.**

### T5 — Lobby

Teacher sees:
- joined count;
- activity selected;
- estimated lesson time where available;
- Start / launch controls.

No roster appears.

## Teacher-led live question loop

The teacher launches a question to every joined student device.

### Teacher view while answers arrive

Teacher sees aggregate information:

- response total;
- answer counts;
- percentages;
- live distribution;
- remaining non-response count where available.

For a BELIEVE item, prefer the full response distribution rather than collapsing the room to a single mean.

For a literacy question, show one bar per answer option.

### Student view while answering

Student sees:
- one question;
- answer choices;
- simple help/explanation when appropriate;
- Submit.

Junior uses full-word response choices rather than numeric survey shorthand.

After submitting, the student sees a short confirmation that the response was added to the class result.

### Teacher reveal / discussion

For BELIEVE:
- no correct answer;
- show the aggregate room distribution;
- offer neutral discussion prompts;
- do not tell the class that one political position is the correct one.

For political-literacy questions:
- show aggregate option distribution;
- reveal the correct answer;
- show an evidence-backed explanation;
- teacher can immediately re-teach a concept when many students miss it.

Then the teacher may:
- launch the next question;
- pick another question;
- discuss;
- switch activity;
- end the session.

## Classroom use of Youth Quick 26 and Full 42

### Quick 26

Teacher options:
- run all 26 teacher-paced;
- run all 26 student-paced;
- use a subset as a live discussion lesson;
- pause after any question and discuss the distribution.

### Full 42

Teacher options:
- continue beyond Quick into the additional source questions;
- run the full Youth activity;
- use THINK / FEEL / ACT as lesson sections;
- compare aggregate mode patterns where enough relevant questions were answered.

The Youth wording is a separately versioned candidate form and requires validation.

## Junior classroom content

Junior is not a relabelled Youth form.

### Junior BELIEVE

- 16 questions;
- 13 constructs represented;
- short sentence-level wording;
- automated maximum-length and jargon guardrails;
- full-word response scale;
- no individual political profile sent to the teacher.

### Junior political know-how

The dedicated eight-question bank teaches core distinctions without requiring adult political-science vocabulary:

- socialism and social/public/worker ownership;
- the Marxian communist ideal;
- elections plus rights and checks;
- public funding versus ownership;
- why a state-owned railway does not make a country communist;
- why national self-government does not itself determine left/right;
- a basic populism distinction;
- why a large welfare state does not automatically mean socialism.

### Junior empirical validation requirement

Before broad rollout, real 10–13-year-olds must be asked to paraphrase the questions and answer choices in their own words. The pilot should record misunderstood words, confusing answer options, response time, “I don't understand” use, perceived pressure toward a political answer and understanding of the privacy promise.

See [`school-pilot-teacher-guide-v1.md`](./school-pilot-teacher-guide-v1.md) for the current cognitive-pilot protocol.

## Classroom quizzes

Political-literacy questions are first-class classroom activities.

Teacher may:
- start with a literacy quiz;
- quiz after a teaching section;
- interleave knowledge questions with BELIEVE questions;
- run only a quiz lesson.

Teacher sees:
- live aggregate option distribution;
- aggregate correct / incorrect after reveal;
- concept-level class performance;
- no individual score.

Junior and Youth use separate literacy banks.

## Data model — anonymous but useful to the teacher

The system needs enough aggregate data to teach from the room while refusing student-level drill-down.

### Per live question

Persist:
- room/session ID;
- question ID;
- aggregate counts for each answer option / response position;
- total responses;
- duplicate-prevention information that is not exposed as a teacher-readable student-to-answer map.

Do not persist or expose a teaching record equivalent to:

`student X -> question 5 -> answer B`

The teaching record should instead be equivalent to:

`Question 5 -> A:4, B:7, C:3, D:6, E:4; n=24`

### Aggregate political summary

When a room completes enough BELIEVE questions, Politangle may calculate aggregate classroom summaries that support teaching without creating student political dossiers.

Examples:
- aggregate values for the 8 polygon axes;
- aggregate family compatibility where methodologically justified;
- aggregate THINK / FEEL / ACT patterns when enough relevant items are complete.

No teacher-facing summary may permit drilling from a class bar, polygon point or family result to an individual participant.

Do **not** call an aggregate room pattern a fixed class identity such as "this is a Conservative class." Prefer language such as:

- "The room leaned toward... on this construct"
- "Responses were split"
- "The class aggregate showed stronger compatibility with..."
- "There was substantial variation across responses"

## Small-group inference risk

System anonymity does not eliminate inference risk in very small groups. The minimum group size and display policy for sensitive classroom distributions remains a policy/legal/pilot question and must be finalized before broad deployment.

Do not treat a convenient engineering threshold as a universal legal rule.

## Teacher Session Summary

At the end of a lesson the teacher can use an aggregate class summary containing, where supported:

- participants joined;
- questions launched;
- response totals;
- full response distributions;
- aggregate political axes;
- aggregate family compatibility;
- aggregate THINK / FEEL / ACT comparison;
- aggregate political-literacy performance;
- most divided and most consensual items.

The report is for lesson reflection, not student profiling.

## Teacher resources

Current resource structure includes:

- two Junior 10–13 guided lessons;
- Youth guided lessons on class political distributions, political families, THINK / FEEL / ACT, Quick 26, Full 42 and democracy/pluralism/populism;
- current pilot teacher guide;
- existing handbook/PDF resources retained in the repository.

The public teacher page previews the lesson catalogue before registration, then requires pilot approval to unlock operational lesson detail and classroom tools.

### Documentation localization status

The interactive student/teacher/projector experience and question banks support English, German, Spanish and French. The long-form legacy teacher handbook PDFs and every line of older Youth lesson prose have **not** yet received a full professional four-language editorial pass. Do not describe those legacy documents as fully localized until that work is complete.

## Guided lesson system

Each guide should specify:

- age / school level target;
- learning goals;
- estimated duration;
- questions to launch;
- when to pause and discuss;
- neutral teacher prompts;
- concepts to explain;
- expected misconceptions;
- optional extension activity;
- recommended follow-up.

The teacher remains in control and can depart from the guide at any time.

## Current release gates

The architecture is now implemented far beyond the earlier School v1 state. The remaining release gates are primarily validation and deployment-quality gates rather than “build the classroom from scratch” tasks:

1. real cognitive interviews with intended 10–13-year-old users;
2. teacher-led pilots in more than one classroom/school context;
3. accessibility and mobile-usability testing;
4. fluent-educator review of supported-language translations;
5. final small-group display/privacy policy;
6. qualified legal/privacy review before broad use with minors;
7. refresh/localize long-form teacher documentation and PDFs before calling the documentation set fully localized;
8. production deployment verification, monitoring and operational support process.

Automated tests can verify routing, answer-bank separation, scoring, translation coverage, length and banned-jargon constraints. They cannot prove that a real eleven-year-old interprets a political concept as intended.
