# Politangle Product Roadmap — Literacy, Certification, Glossary, Countries

**Status:** Canonical product decision note  
**Branch:** `build/market-readiness-v1`  
**Decision date:** 2026-09-13  
**Scope:** Individual political-literacy product, certification mechanics, learning glossary, and MVP2 country profiles

> This document records approved product direction so it is not lost across sessions or implementation phases. Unless explicitly superseded by a later documented decision, implementation should preserve these rules.

**Implementation checkpoint:** Internal reader/editorial review is recorded in `docs/literacy-validation-workflow-v1.md`. It does not validate the bank. A validated item now requires linked independent content-review, cognitive-test and calibration artifacts plus explicit approval.

**Locked bank-freeze sequence:** All 80 candidates remain editable during founder review. Explicit founder approval freezes an immutable pilot-bank version. Other adults then test that exact version. Any content change creates a new version and requires founder review and a new pilot freeze. After the pilot evidence is reviewed, explicit post-pilot approval creates the final frozen bank. Only that final version may be promoted to validated/certifiable status.

### Founder decisions recorded 13 September 2026

- School age bands remain **Junior 10–13** and **Youth 14–18**.
- Certified tests and certificates launch for users aged **16+**. Users under 16 may use Learn and Practice.
- The certificate holder's name is **supplied by the holder**; Politangle does not independently verify legal identity.
- Third-party verification works only through the exact high-entropy certificate ID / QR URL. There is no name search, public directory or indexable certificate catalogue.
- Before issuance, the holder must clearly acknowledge that anyone given the certificate URL / QR code can see the verification record. This acknowledgement is mandatory and must not be hidden or pre-ticked.
- Certification launches in **English only**. Other languages remain Learn / Practice until their complete banks pass the required review.
- Practice and certified attempts are free.
- Certificate issuance costs **EUR 9.90 at launch**, later **EUR 16.99**. The transition requires an explicit founder decision and must not happen automatically.
- Renewal after two years costs **EUR 13.90** and requires passing the then-current certified assessment.
- The commercial policy is no refund after the personalised certificate has been issued, except where applicable law or a defective service requires otherwise.
- Politangle will not claim accreditation, professional qualification, independently verified identity, supervised examination or cheating prevention. The certificate records only the assessment passed, scores, version and dates.
- The first country group is the **United States, Germany, France, United Kingdom, Netherlands, Denmark, Finland, Iceland, Norway and Sweden**. The first four are template-proving profiles; the remaining six follow only after that quality gate passes.

---

## 1. Product principle

Politangle should not only tell people where they politically lean. It should also help them **understand political traditions, distinguish commonly confused concepts, learn from mistakes, and demonstrate political literacy**.

The individual-user literacy journey is therefore:

**Learn → Practice → Test → Review → Certify → Return / Renew**

The product should reward genuine understanding rather than memorisation of a fixed answer set.

---

## 2. CLASSIFY and UNDERSTAND question-bank architecture

### Locked target

Politangle should maintain two validated political-literacy master banks:

- **CLASSIFY master bank: 40 validated questions**
- **UNDERSTAND master bank: 40 validated questions**
- **Total master bank: 80 questions**

A single game / certified attempt should **not** show all questions.

Each attempt presents:

- **25 CLASSIFY questions drawn from the 40-question CLASSIFY bank**
- **25 UNDERSTAND questions drawn from the 40-question UNDERSTAND bank**
- **50 questions total per complete certification attempt**

This is intentional. The larger bank reduces the value of learning questions and answers by heart.

### Selection must be balanced, not purely random

The 25 displayed questions must be selected by a content blueprint so that every attempt remains comparable in breadth and difficulty.

A CLASSIFY attempt should cover, at minimum, a balanced spread across areas such as:

- liberal traditions
- socialist / communist traditions
- conservative / Christian-democratic traditions
- green / ecological politics
- nationalism / populism
- radical right / extreme right / fascism
- democracy / authoritarianism
- other major traditions such as anarchism
- cross-family discriminators

UNDERSTAND should use an equivalent conceptual blueprint covering:

- definitions
- distinctions between adjacent traditions
- democratic institutions and political power
- economic systems and ownership
- common political misconceptions
- authoritarianism / totalitarianism
- limitations of one-dimensional left-right classification
- interpretation of multidimensional political patterns

The system should avoid accidental attempts in which one political family is heavily overrepresented while another is absent.

---

## 3. Current expansion direction toward 40 + 40

The current product started with 20 CLASSIFY and 20 UNDERSTAND questions. The bank should expand to 40 each through evidence-backed candidate development and validation.

The first approved expansion themes are:

### CLASSIFY additions

1. Democratic socialism
2. Classical liberalism
3. Authoritarianism
4. Anarchism
5. Marxism–Leninism

### UNDERSTAND additions

1. Communism vs Marxism–Leninism
2. Democratic socialism vs modern social democracy
3. Classical liberalism vs modern/social liberalism vs libertarianism
4. Authoritarianism vs totalitarianism
5. Why authoritarianism is not inherently a left- or right-wing economic ideology

These additions are intended to close identifiable coverage gaps, especially the previous under-resolution of communist/socialist traditions compared with the detail already given to radical/extreme-right distinctions.

### Validation requirement

New questions must not be inserted merely to reach 40.

Every new item should pass the same quality discipline as the existing bank, including:

- defensible definition / evidence
- ambiguity review
- ideological-bias review
- distractor-quality review
- duplicate-concept review
- difficulty review
- consistency with the Politangle multidimensional model

The remaining questions needed to reach **40 + 40** should be chosen because they close real conceptual or coverage gaps, not because a numeric target remains.

---

## 4. Certified Political Literacy Test

### Pass requirement

A certificate candidate must achieve, in the same certified session:

- **CLASSIFY: at least 23/25**
- **UNDERSTAND: at least 23/25**

There is **no averaging across the two tests**.

Examples:

- 23/25 CLASSIFY + 23/25 UNDERSTAND → **PASS**
- 25/25 CLASSIFY + 22/25 UNDERSTAND → **FAIL**
- 22/25 CLASSIFY + 25/25 UNDERSTAND → **FAIL**

23/25 equals 92%. The public product must therefore not describe the basic pass threshold as a “95% certificate.”

A separate higher distinction tier may be considered later, but it is **not required for MVP1** unless separately approved.

---

## 5. Attempts and anti-memorisation rules

### Practice mode

- Practice remains available for learning.
- Practice should not itself issue a certificate.

### Certified attempts

- Maximum **2 certified attempts per rolling 24-hour period**.
- The question-selection blueprint still applies on every attempt.

### Failed-question rule

After a failed certified attempt, Politangle **should show the user the correct answers and explanations** for questions they answered incorrectly.

This is deliberate: failure should create a learning opportunity, not conceal knowledge.

However, the **next certified attempt must not display the questions the user failed on the immediately preceding certified attempt**.

The new attempt should preferentially use:

1. questions not shown in the previous certified attempt; and
2. previously answered-correct questions only where necessary to complete the balanced 25-question blueprint.

This prevents the second test from becoming a direct replay of answers the platform has just taught.

### Edge case

A 40-question bank contains only 15 questions that were unseen after a 25-question attempt. If excluding all failed questions makes it impossible to construct a valid 25-question retest while preserving the content blueprint, the user should not receive a compromised same-day certified test. The next certified attempt should become available after the cooldown / later eligible attempt.

---

## 6. Certificate

### Product

Politangle should offer an individual **Politangle Political Literacy Certificate** to users who pass both certified tests.

It must be framed as a Politangle-issued achievement certificate, **not as an accredited academic or professional qualification unless external accreditation is actually obtained later**.

### Validity

- Certificate validity: **2 years from issue date**.
- After expiry, the holder must pass the then-current certified test again to renew.
- Renewal should use the current validated assessment version, not permanently grandfather an old question bank.

### Verification record

A certificate should eventually include / expose:

- holder name
- certificate ID
- CLASSIFY score
- UNDERSTAND score
- issue date
- expiry date
- assessment version
- language
- verification URL / QR code
- status: `VALID`, `EXPIRED`, or `REVOKED`

The public verification payload must not expose email, account ID, payment information, individual answers, attempt history or BELIEVE results. Verification pages must be `noindex`; identifiers must be non-sequential and resistant to guessing.

Example public verification language:

> Valid until 13 September 2028

After expiry:

> Expired — reassessment required

### Commercial model

Learn, Practice and certified attempts are free. A passing attempt creates eligibility to buy a personalised certificate; it does not automatically issue one.

- Launch certificate issuance: **EUR 9.90**
- Later standard issuance: **EUR 16.99**
- Renewal after two years: **EUR 13.90**

Prices are server-configured and versioned rather than hard-coded in the client. The launch-to-standard transition requires an explicit founder decision. Consumer-facing prices include applicable VAT where legally required.

The commercial flow must never imply that the user can buy a passing result.

---

## 7. Politangle Glossary / Learn

A dedicated glossary is part of the learning product and should be implemented as a discoverable content surface.

Initial coverage should include at least:

- liberalism
- classical liberalism
- social / modern liberalism
- libertarianism
- conservatism
- Christian democracy
- social democracy
- democratic socialism
- socialism
- communism
- Marxism
- Marxism–Leninism
- anarchism
- green politics
- nationalism
- populism
- radical right
- extreme right
- fascism
- authoritarianism
- totalitarianism
- liberal democracy
- pluralism
- rule of law
- subsidiarity
- social ownership
- public ownership
- redistribution
- means of production
- left / right
- political spectrum
- relevant Politangle multidimensional concepts

### During certified play

The glossary **must not be available during a certified attempt**.

Certified-test screens should not expose:

- glossary links
- hover definitions
- hints
- answer explanations before submission
- external learning links

### After an attempt

After completion, the user should receive:

- correct / incorrect status
- correct answer for missed questions
- explanation
- links to relevant glossary concepts

This creates a deliberate learning loop rather than a punitive failure state.

---

# MVP2 — Politangle Countries

## 8. Purpose

Country pages are an approved **MVP2 direction**, not an MVP1 launch blocker.

The goal is to extend Politangle from:

> Understand your political profile and political ideas

into:

> Understand how political ideas, institutions and traditions operate in real countries.

Country profiles should support:

- recurring visitors
- political education
- internal links into the glossary and quizzes
- organic search discovery
- AI-search / answer-engine discoverability
- topical authority around comparative politics

SEO is a distribution benefit, not permission to publish thin programmatic pages.

---

## 9. Country-page content model

Suggested route pattern:

- `/countries/germany`
- `/countries/united-states`
- `/countries/france`
- `/countries/cameroon`

Each country profile should be substantively useful and should include, where reliable data exists:

### At a glance

- government type
- constitution / constitutional framework
- head of state
- head of government
- legislature
- electoral system
- federal / unitary structure

### How power works

Explain the practical institutional structure:

- presidential / parliamentary / semi-presidential
- separation of powers
- federalism / devolution
- executive constraints
- courts
- legislature
- meaningful checks and balances

### Political history

A concise political timeline focused on relevant moments such as:

- regime changes
- constitutions
- democratic transitions
- independence
- reunification
- coups where relevant
- major electoral realignments
- major institutional reforms

Do not turn this into generic national history.

### Democracy, rights and civic space

Use **named, sourced dimensions**, not a homemade single “Human Rights Index.”

Preferred source families may include, subject to freshness and coverage verification at implementation time:

- V-Dem
- Freedom House
- International IDEA
- Human Rights Measurement Initiative (HRMI)
- other high-authority primary or academic sources where appropriate

Politangle should show dimensions and trends rather than implying that one number explains a country’s entire political or human-rights condition.

### Political parties

For relevant significant parties, include:

- party name
- current parliamentary relevance / representation where applicable
- broad political tradition(s)
- important ideological or policy characteristics
- sourced context

Do not infer party positions merely from party names or intuition.

### Political landscape

Explain major contemporary cleavages and political issues shaping the country.

### “Left and right here”

A particularly valuable Politangle-specific section should explain how political vocabulary differs by country.

Examples of useful comparative questions:

- What does “liberal” mean here?
- How does conservatism in this country differ from US conservatism?
- What does social democracy mean in this political system?
- Which political traditions have unusually strong local importance?

This section is one of the strongest opportunities to create original Politangle educational value rather than replicate encyclopedia content.

### Elections

Where current data can be maintained reliably:

- last national election
- result summary
- turnout
- next scheduled national election where known
- source date

### Trends

Where data supports it, include 5-, 10-, or 20-year trends for selected political / institutional indicators.

### Learn and test CTAs

Country pages should link naturally into:

- relevant glossary entries
- CLASSIFY
- UNDERSTAND
- BELIEVE / political-profile tools where appropriate

The learning loop should work both ways: quiz results can also recommend relevant country pages.

---

## 10. MVP2 rollout strategy

Do **not** immediately mass-generate ~195 near-identical country pages.

Start with approximately **20 high-quality country profiles** and expand based on quality, search demand, educational value and maintainability.

The locked initial country group is:

- United States
- Germany
- France
- United Kingdom
- Netherlands
- Denmark
- Finland
- Iceland
- Norway
- Sweden

Build the United States, Germany, France and United Kingdom first to prove the schema and editorial workflow. Add the remaining six only after those four pass the country-profile quality gate. Further expansion toward approximately 20 profiles may change based on evidence, data quality, demand and editorial capacity.

Every page must offer meaningful country-specific analysis. Programmatic templating may support structure, but it must not create thin or merely reworded pages.

---

## 11. Multilingual country architecture

Politangle should eventually support country pages in the same native-language strategy used elsewhere in the product.

Preferred long-term route architecture:

- `/en/countries/germany`
- `/de/countries/deutschland`
- `/fr/countries/allemagne`
- `/es/countries/alemania`

Use proper locale-specific URLs and `hreflang` rather than relying only on browser-language substitution.

Do not mechanically publish all country pages in four languages before editorial quality can be maintained. Prove the country template and content model first, then expand native versions deliberately.

---

## 12. Data and editorial requirements for country pages

Country pages are time-sensitive content and therefore require explicit provenance and freshness controls.

Each dynamic factual section should carry sufficient source metadata to support:

- source
- source date / data year
- retrieval / update date where useful
- method / definition where a metric can be misunderstood

A future implementation should define update cadences for elections, office holders, party representation and political-rights datasets rather than leaving pages silently stale.

Historical claims should rely on stable authoritative sources; current office holders, election dates, party strength and indices require current verification.

---

## 13. MVP boundaries

### MVP1

MVP1 product direction includes:

- BELIEVE Quick / Full product
- CLASSIFY master bank target: 40
- UNDERSTAND master bank target: 40
- 25 questions served per literacy game
- balanced question blueprint
- 23/25 pass requirement independently in both
- maximum 2 certified attempts per rolling 24 hours
- failed answers revealed with explanations
- immediately failed questions excluded from the next certified attempt
- glossary / learning layer
- Political Literacy Certificate
- 2-year certificate validity
- certificate verification model

### MVP2

MVP2 product direction includes:

- Politangle Countries
- initial high-quality country set rather than global thin-page generation
- political systems and institutions
- political timelines
- democracy / rights dimensions
- elections
- significant parties
- country-specific political traditions and terminology
- trends where defensible
- glossary integration
- assessment integration
- SEO and AI-searchability through substantive, sourced educational content
- later multilingual expansion

---

## 14. Explicit non-goals / safeguards

Do not:

- issue certificates based on an averaged CLASSIFY + UNDERSTAND score
- expose the glossary during certified play
- hide learning explanations after a failed completed attempt
- reuse immediately failed questions in the very next certified attempt
- call the Politangle certificate academically or professionally accredited without actual accreditation
- use one invented “human rights score” as if it captured all dimensions
- place political parties based only on intuition
- create hundreds of thin country pages primarily for search traffic
- let current country facts go stale without an update / provenance strategy

---

## 15. Implementation sequence

Recommended order:

1. Complete and validate CLASSIFY bank to 40.
2. Complete and validate UNDERSTAND bank to 40.
3. Implement balanced 25-question selection blueprints.
4. Implement practice vs certified-session state.
5. Implement 23/25 + 23/25 certification logic.
6. Implement attempt limits and failed-question exclusion.
7. Build glossary and post-attempt learning links.
8. Build certificate issuance / verification / expiry architecture.
9. Complete MVP1 QA.
10. Design and validate the MVP2 country-profile schema.
11. Build the first country template and a small set of exemplary pages.
12. Validate editorial quality, SEO, AI discoverability and freshness workflow before scaling country coverage.

---

## Decision-control note

Changes to the following should be treated as consequential product changes and explicitly documented rather than silently altered during implementation:

- 40-question master-bank size per literacy game
- 25-question served-test size
- 23/25 independent pass threshold
- two-certified-attempt daily limit
- failed-question reveal / immediate-retest exclusion behavior
- two-year certificate validity
- glossary lockout during certified attempts
- MVP2 country-page quality-over-volume strategy
