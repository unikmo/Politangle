# Politangle School — Classroom Onboarding v2

Status: **design specification; supersedes the self-paced-first classroom entry in School v1. Do not treat the current School UI as final until this flow is implemented and reviewed.**

## Core privacy rule

Politangle School is **anonymous by default in the classroom**.

The teacher may see only:
- number of students joined;
- number of responses received;
- aggregate answer distribution once the privacy threshold is met;
- for literacy questions, aggregate correct/incorrect performance after reveal;
- class-level trends over multiple questions or activities.

The teacher must never see:
- student names;
- a student roster;
- a stable student identifier;
- which student selected which answer;
- an individual student's literacy score;
- an individual student's BELIEVE answer;
- an individual student's ideology/family compatibility;
- an individual student's polygon or THINK/FEEL/ACT result.

Core promise:

> **We measure the room, not the child.**

Secondary promise retained:

> **We measure learning for teachers. We protect beliefs for students.**

## Product hierarchy

School mode has three distinct activity types inside the same anonymous classroom room:

### 1. LIVE LITERACY
Teacher-led CLASSIFY / UNDERSTAND questions.

- A correct answer exists.
- Students answer anonymously.
- Teacher sees aggregate option distribution after the question is closed/revealed.
- Correct answer and explanation can then be shown to the room.
- Individual correctness is never exposed to the teacher.

### 2. LIVE PERSPECTIVE
Teacher-led BELIEVE / opinion questions.

- No correct answer exists.
- Students answer anonymously.
- Teacher sees only the aggregate distribution after the question is closed/revealed and only when the minimum privacy threshold is met.
- The result is presented as the room's distribution, not as a class ideology label.
- No individual BELIEVE result is sent to the teacher.

### 3. PRIVATE EXPLORE
Student-owned Politangle profile.

- Student may complete Quick/Deep privately on their own device.
- Results remain private to the student.
- Classroom code does not convert private BELIEVE answers into teacher-visible data.
- School backend must not accept individual political profiles.

## Teacher onboarding

### Screen T1 — School entry

Primary choices:
- **Start a classroom**
- **Join a classroom**

Teacher chooses **Start a classroom**.

### Screen T2 — Create anonymous room

No class roster upload. No student names. No email addresses required for students.

Teacher creates a room and receives:
- 6-character classroom code;
- QR code / join URL;
- separate private teacher control key;
- privacy statement explaining exactly what the teacher can and cannot see.

Optional teacher-side settings may include:
- age band / reading level for content selection;
- activity set;
- whether the room will use literacy questions, perspective questions, or both.

These settings must not create student identity records.

### Screen T3 — Lobby / projector screen

Large classroom code + QR.

Teacher sees:
- `18 joined`
- room status: waiting / live / ended

Teacher does **not** see 18 names, avatars or device labels.

The room waits until the teacher starts.

### Screen T4 — Classroom console

Teacher can:
- choose an activity set;
- select a question by number or topic;
- launch the question;
- see `responses received / joined`;
- close responses;
- reveal aggregate distribution;
- reveal correct answer + explanation for literacy items;
- move to next question;
- end session.

Example:

> **Question 5 — Which political tradition best matches this description?**

Before reveal, the teacher projector view should default to **response count only**, not the answer distribution. This reduces the risk that students who have not yet answered are influenced by an emerging majority.

After the teacher closes the question, the aggregate distribution appears as a bar graph.

## Student onboarding

### Screen S1 — Join

Student scans QR or enters room code.

No name field.
No email field.
No username field.
No avatar required.

### Screen S2 — Privacy confirmation

Short plain-language notice:

> **You are answering anonymously. Your teacher will see only the class total and class distribution — never which answer was yours.**

For BELIEVE questions:

> **There is no correct answer. Your individual political profile is not shared with your teacher.**

For literacy questions:

> **Your teacher will see how the class answered, not your individual score.**

### Screen S3 — Anonymous lobby

Student device receives a random browser-local participant token.

The classroom backend should receive only the minimum token material required for duplicate-response prevention. The product must not ask the student to identify themselves.

Student sees:

> `You're in. Waiting for the next question.`

### Screen S4 — Live question

Teacher launches question 5.

Every joined student sees the same question.

Student chooses one response and submits.

Default behavior:
- student can change selection before pressing Submit;
- after Submit, the answer is locked for that question;
- screen becomes `Response submitted — waiting for the class`.

### Screen S5 — Reveal

After teacher closes/reveals:

For LITERACY:
- student sees the aggregate graph;
- correct answer;
- explanation;
- privately sees whether their own answer was correct on their own device if we retain that locally.

Teacher still receives no per-student correctness.

For PERSPECTIVE:
- student sees aggregate distribution;
- no answer is marked correct;
- optional neutral discussion prompt can follow.

## Anonymous response data model

### Strong default

For each live question, the backend stores:
- room ID;
- question ID;
- aggregate answer counts;
- total responses;
- a one-way receipt keyed to `room + question + random participant token` to prevent duplicate submissions.

The receipt must **not contain the selected option**.

Therefore the persisted data can answer:

> `Question 5: A=4, B=11, C=7, D=2`

but cannot answer:

> `Participant X chose B.`

Student choice should be reduced to an aggregate counter at submission time.

### Response editing

Because the privacy-first persistence model deliberately does not retain `participant -> option`, a submitted answer is locked. Allowing post-submit changes would require retaining the previous option per participant at least temporarily, which weakens the privacy model. The v2 default is therefore **edit before Submit, not after Submit**.

## Aggregate threshold

The current pilot safeguard remains:

- teacher sees joined/responded count at any class size;
- answer distributions, percentages and class performance are withheld below **n=10**;
- at n>=10, aggregate graphs unlock.

This is a product privacy rule, not a legal safe-harbor claim.

For a room below threshold, the teacher can still run the activity and discuss the correct answer, but Politangle should not expose a potentially identifying distribution.

## Teacher graph

Default result visualization after reveal:

- horizontal or vertical bar chart;
- option label;
- count;
- percentage;
- total n;
- correct option highlighted for literacy only;
- no student drill-down;
- no click-through from a bar to a person;
- no export containing participant identifiers.

For BELIEVE/perspective items, use a neutral distribution graph with no 'winning' or 'correct' language.

## Classroom learning loop

A live lesson can now be:

1. Teacher opens room.
2. Students join anonymously.
3. Teacher launches Question 1.
4. Students answer.
5. Teacher closes question.
6. Aggregate graph appears.
7. Teacher discusses result.
8. For literacy: reveal answer + evidence-backed explanation.
9. Teacher launches Question 2.
10. Repeat.
11. End session.

This live loop can coexist with the previously designed self-paced sequence:

- Baseline
- Learn
- Practice
- Post-test

But **classroom onboarding comes first**. The self-paced sequence becomes one activity the teacher can launch inside a room, not the definition of School Mode itself.

## Teacher dashboard after class

Teacher may see only aggregate room-level history, for example:
- 26 joined;
- 24 responded to Q5;
- Q5 distribution;
- class literacy average where n>=10;
- most-missed literacy concepts at aggregate level;
- baseline/post change where both phases reach threshold.

Never show:
- 'Student 14: 53%';
- student rankings;
- strongest/weakest students;
- per-student response history;
- an individual political profile.

## Red Team decisions

1. **No roster by default.** A roster defeats the product's anonymity promise and is unnecessary for classroom discussion.
2. **Do not reveal live distributions while responses are still open on the shared screen.** Visible emerging majorities can influence later answers.
3. **Do not retain participant-to-option mappings merely to make charts easier.** Aggregate at write time.
4. **Do not rank students.** School analytics are about concepts and class learning, not political or literacy profiling of children.
5. **Keep BELIEVE and LITERACY semantically different.** Belief distributions have no correct answer; literacy distributions can reveal a correct answer after voting closes.
6. **Do not infer class ideology.** A set of aggregate responses should not become a label such as 'this is a conservative class'.
7. **Small rooms remain a re-identification risk.** Keep the aggregation threshold until qualified legal/privacy review says otherwise.
8. **Private student Politangle remains private even when launched from a classroom.** Classroom membership must not become consent to political-profile sharing.

## Evidence note

Classroom response-system research has found that anonymity can increase willingness to participate and can support teachers in diagnosing class understanding. The design therefore treats anonymity as a core participation feature, not merely a privacy disclaimer. The current Politangle implementation still requires cognitive testing with the intended school age group and qualified legal review before use with real minors.

## Implementation gate

Before refactoring the School UI to this design:

1. approve this onboarding architecture;
2. replace the current self-paced-first `/school` entry with the room/lobby model;
3. implement teacher-paced question state;
4. replace correctness-only classroom submissions with aggregate option buckets for live questions while preserving no participant-to-option storage;
5. add teacher graph rendering;
6. retain self-paced Baseline/Learn/Practice/Post-test as an activity inside the room;
7. run independent privacy Red Team and CI;
8. live-test the non-production Firebase classroom flow;
9. **REQUIRES QUALIFIED LEGAL REVIEW** before real school/minor deployment.
