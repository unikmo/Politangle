# Politangle School — request-only pilot release record
Date: 23 October 2026. **Engineering candidate; NOT clearance for real student use.**

## Exactly what the public can do

- Public **/school** introduces the product and links to **/school/pilot**. It no longer invites pupils to enter a working classroom or private assessment.
- School educators and researchers can submit **an application only** in EN, DE, ES, FR or PT-BR.
- The form collects school/organisation name, country, professional adult contact, role and intended age band. It does not request a roster, student names, political opinions, learner IDs or free-form student notes.
- On submission, the server creates one Firestore `schoolPilotRequests` record for that school/contact pair with status `requested`. It returns a success message only after storage succeeds. Duplicates get the same generic confirmation without disclosing current review status. An unavailable backend returns 503, not a false receipt.
- No registration, login, classroom, teacher licence or payment is created by that request.

## Approval and access separation

1. Operator examines requests using `npm run school:review-pilot -- --list` in an authenticated Firebase Admin environment.
2. BEFORE approval, verify school authority, operating-region legal role, safeguards, privacy and any required school agreement. The operator must explicitly attest **five separate gates**: `--privacy-reviewed --education-reviewed --safeguarding-reviewed --accessibility-reviewed --agreement-signed`.
3. Only then use `npm run school:review-pilot -- --approve --request-id <64-hex-ID> --school-id <school-slug> --privacy-reviewed --education-reviewed --safeguarding-reviewed --accessibility-reviewed --agreement-signed`.
4. An approved request **still grants no access**. Admin must separately run `npm run school:provision-license-pack -- --school-id <school-slug> --school-name "Verified School Name" --pilot-request-id <ID>`. This provisions ten pilot teacher seats with no pilot charge. Credentials must be distributed over a secure channel.
5. Every teacher licence request checks the approved request and active school account. Room GET/PATCH/join/submit check current school and licence approval again. A revoked licence cannot continue to control a room.
6. Real student routes and submission API additionally require `POLITANGLE_SCHOOL_PILOT_STUDENTS_ENABLED=true`. Unset/false is **closed by default** and returns invitation-only UX, never an active classroom. Enable only after approval evidence and hosting/privacy QA for the actual school, age band and jurisdiction.

No routine tool action or deployment bypasses the external legal/privacy/safeguarding review requirements. Do not activate this flag merely to make a test pass.

## Technical safeguards

- School teacher credential is stored as hash in Firestore, and only a HttpOnly/Secure session cookie carries the raw credential to the backend. Teacher room-control key is separate from the licence.
- Students have a browser-local random anonymous room token. The backend stores SHA-256 token receipts, not a student roster. Submission requires proof that token first joined the same classroom.
- Teacher room modifications use Firestore transactions, preserving school account metadata and concurrent aggregate submissions.
- Classroom room access expires after **seven days**, even before physical deletion. Room and nested join/response receipts are tagged `expiresAt`.
- Per-question political distributions for teachers and projectors are suppressed unless at least five participants have joined and five have answered that question. Inferred class-level profiles are computed only from cohorts that pass the same threshold.
- This threshold is a **product safeguard, not a legal or mathematical anonymity guarantee**. Repeated observations and small cohorts can still create inference risks; school study protocol must address those.
- Pending applications carry a **90-day** expiry marker. Approved applications have that marker removed to preserve authorization audit history.

## Critical infrastructure and privacy gates

**Do not enable real student participation until ALL of these are independently verified:**

- Firebase Admin runtime credentials are present in the actual deployed environment. Submit and confirm a synthetic staging application, inspect its Firestore record, then delete the test record; confirm failure behaviour with unavailable credentials.
- Enable and verify Firestore TTL policy for collection groups `schoolPilotRequests`, `schoolClasses`, `joinReceipts`, `responseReceipts`, each on field `expiresAt`. A timestamp field alone does not create a deletion policy. Approved request audit history and school account/teacher licence cleanup need a separately documented retention policy.
- GDPR or other applicable privacy legal review documents identity of controller/processor, lawful basis for students' political opinions, subprocessors, server log/cookie retention, access/DSR handling, deletion and breach response. School pilot agreement, parental information/consent rules as relevant, and DPIA decision must be signed.
- Educational and age-appropriate question wording review, mobile accessibility and pupil safeguarding must be completed with evidence.
- Test a full **approved teacher → temporary classroom code → student join → five responses → aggregate-only teacher/projector → expiry/revocation** workflow in a non-production school pilot environment. No real pupil data in QA.

## Known constraints

This release makes **applications available**, not real-student School Edition generally available. Firestore persistence, TTL policies and independently signed privacy/educational documents are outside the GitHub code change and may be unavailable to connected tools; these must be checked on the actual hosting account. Public demo pages do not convey any school authorization.
