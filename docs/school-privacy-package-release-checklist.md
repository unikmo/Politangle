# Politangle School privacy package — release checklist

**Status:** implementation-ready draft structure; not legal approval.

This package records the documents and verified facts required before Politangle School may be used with real students. It does not authorize a pilot or production use with minors.

## 1. Operator facts still required

- Full legal name and legal form
- Registered or service address
- Monitored privacy and support email addresses
- Authorized representative
- Company/association register and registration number, if applicable
- VAT/tax identifier, if applicable
- Country of establishment and competent supervisory authority

These values must be supplied by the founder and checked by qualified counsel. They must not be inferred or replaced with placeholders in a production release.

## 2. School role decision

Counsel must document, per intended launch market:

- whether the school or Politangle determines each processing purpose;
- controller, joint-controller, or processor roles;
- the school's lawful basis for political-opinion and minors' data;
- whether consent is used, who may give it, and how withdrawal works;
- whether a data-protection impact assessment is required;
- any safeguarding or parental-information requirements.

## 3. Data map

| Context | Data | Linked to a named student? | Intended recipient | Proposed retention |
|---|---|---:|---|---|
| Private Quick/Full | Answers and generated result | No account required | Browser only | Browser session/local state; clear on restart |
| Classroom join | Random participant token, room code | No | Service | Session duration plus short incident window, exact period TBD |
| Classroom response | Answer, question ID, room token | No name/roster | Aggregate processing | Exact period TBD |
| Teacher view | Counts, distributions, aggregate shape and literacy patterns | No | Authorized teacher | Session/report period, exact period TBD |
| Pilot interest | Adult contact and school details | Yes, adult only | Politangle operator | Exact period TBD |

The final data map must also name hosting regions, Firebase/Google and any other subprocessors, support access, backups, logs, deletion behavior, and international-transfer safeguards.

## 4. Required school documents

1. School privacy notice in EN/DE/ES/FR.
2. Age-appropriate student notice for Junior 10–13 and Youth 14–18.
3. Parent/guardian information where required.
4. Controller/processor or data-sharing agreement matching the role decision.
5. Security and architecture description.
6. Retention and deletion schedule.
7. Data-subject request and incident-response procedure.
8. DPIA or written decision explaining why one is not required.
9. Teacher handbook and classroom privacy script.
10. Pilot agreement defining scope, support, safeguarding, prohibited inputs, and exit/deletion.

## 5. Product controls that must remain true

- No student name, email, username, roster, or school student ID is required to join.
- Teachers cannot retrieve a student-to-answer map or individual political profile.
- Classroom reporting is aggregate-only.
- Minimum cohort display rules are configurable policy, not presented as a universal legal threshold.
- Political-belief answers are not repurposed for advertising, profiling, admissions, discipline, or ranking.
- School data is not used to train unrelated models.
- Pilot and production environments have separate access and release gates.

## 6. Release evidence

Before real-student use, the release record must contain named sign-offs from product, security, accessibility, educational review, and qualified privacy/legal counsel. Each sign-off must reference the exact deployed version, data map, countries, age bands, retention settings, and school agreement.
