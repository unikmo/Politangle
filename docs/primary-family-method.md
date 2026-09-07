# Politangle political-family model — evidence and restraint note

Status: content-validation model, not psychometrically validated.

## Public-facing structure

Politangle separates three layers instead of forcing unlike concepts into one ranking.

### A. Main political families

The default result contains five broad families:

1. Liberalism
2. Conservatism
3. Social democracy
4. Socialism
5. Green politics

The public table stays deliberately short. Narrower variants remain available only when they materially explain a result.

### B. Cross-cutting political tendencies

These are reported separately because they can combine with several main families:

- Nationalism
- Populism
- Authority / democratic constraints

Nationalism and populism therefore do not compete with conservatism, liberalism or social democracy for one headline ideology label.

### C. Relevant subtypes

Subtype labels surface only when dedicated discriminators provide enough evidence. The first implemented subtype logic is inside Conservatism:

- Traditional / secular conservatism
- Christian democracy
- Religious-conservative orientation

Christian democracy is not inferred from social conservatism or welfare support alone. A Christian-democratic subtype requires a combination of religious inspiration in politics, subsidiarity, social-market-compatible economics and compatibility with competitive democratic constraints.

Evidence bindings: `SEP-CONSERVATISM`, `CAMBRIDGE-CHRISTIAN-DEMOCRACY`, `CAMBRIDGE-CD-SUBSIDIARITY`, `CAMBRIDGE-CD-RELIGIOUS-INSPIRATION`, `VDEM-LIBERAL-DEMOCRACY`.

## Compatibility index

The 0–100 value for the five main families is a Politangle compatibility index, not a probability, vote prediction or identity label.

- 75–100: Strong match
- 60–74: Broad match
- 40–59: Mixed / overlapping
- 25–39: Limited match
- 0–24: Strong tension

The index uses evidence-bound model criteria. Core criteria receive weight 2 and typical criteria weight 1. A measured criterion that falls in an evidence-defined support bucket contributes 100 points, a contradiction contributes 0, and an unresolved/mixed signal contributes 50. Unknown or low-coverage criteria are excluded. A family is not scored if no core criterion is known or total criterion coverage is below 50%.

This scoring is transparent and deterministic, but its thresholds still require empirical calibration against real respondent data before any psychometric-validity claim.

## Political-tendency scores

Tendency scores are directional rather than identity probabilities.

- Nationalism measures nation-centered self-determination versus shared/post-national authority.
- Populism measures people-versus-elite general-will framing versus plural interests and compromise.
- Authority / democratic constraints combines the existing power axis with pluralism and explicit democracy-rejection evidence.

A strong authority or democracy-rejection result can produce an authoritarian-risk signal. That signal remains separate from left/right family labels.

## Populism and state power

Politangle does **not** code populism itself as automatically authoritarian.

The public wording follows research from the V-Dem Institute and International IDEA:

- Populism is commonly defined through people-centrism, anti-elitism and a claim to the general will.
- Populism can attach to different host ideologies.
- Populist governments can erode checks and balances and contribute to democratic backsliding.
- The stronger discriminator for authoritarian/autocratizing risk is anti-pluralism or rejection of democratic constraints, rather than the populist label alone.

For this reason, the populism tendency uses the dedicated populism axis. Politangle separately reports whether the respondent’s answers support or reject competitive democracy and institutional constraints.

Evidence bindings: `VDEM-POPULISM-AUTOCRATIZATION`, `IDEA-POPULISM-DEMOCRACY`, `MUDDE-POPULISM`.

## Citizenship at birth

The Deep BELIEVE bank explicitly includes citizenship at birth. The question contrasts giving birthplace substantial independent weight with giving greater weight to parent citizenship or qualifying legal status.

GLOBALCIT data are used because citizenship-at-birth law is more complex than a simple civic-versus-ethnic binary. The public ideology table therefore avoids claiming that all members of an ideology support one universal birthright rule.

Evidence binding: `GLOBALCIT-BIRTHRIGHT`.

## Abortion

Politangle Quick explicitly includes abortion in the social-values dimension. The question presents legal personal decision-making and stronger legal protection of prenatal life as balanced competing considerations.

Abortion is **not** treated as a universal defining condition for any broad ideology. Pew Research Center’s cross-national data support a real ideological association in many countries while also showing substantial variation by country and religion.

Evidence binding: `PEW-ABORTION-GLOBAL`.

## Christian democracy subtype discriminators

Two additional Deep questions are intentionally sufficient for the first validation build:

1. **Religious inspiration in public policy** — institutionally secular neutrality versus an explicit role for long-established religious moral traditions.
2. **Subsidiarity** — more direct central responsibility versus distributing responsibility to families, local communities and voluntary associations where they can act effectively.

These questions do not independently create a Christian-democratic label. The subtype classifier also checks the existing economy, ownership and democratic-constraints results.

The purpose is to distinguish a Christian-democratic pattern from generic or secular conservatism without turning Deep into a specialist political-theory exam.

## Fresh Red Team pass

The revised architecture was challenged against five likely failure modes:

1. **Treating nationalism and populism as equivalent to full ideological families.** Rejected. Both remain cross-cutting tendencies.
2. **Populism = authoritarianism shortcut.** Rejected. Populism and democratic-constraint risk remain separately measured.
3. **Christian democracy = socially conservative + welfare.** Rejected. The subtype requires dedicated religion/subsidiarity evidence plus social-market and democratic compatibility.
4. **Christian democracy = generic religious conservatism.** Rejected. Religious conservatism remains a broader fallback when the specifically Christian-democratic combination is incomplete.
5. **Taxonomy inflation.** Rejected. The headline result is limited to five families; subtypes surface only when useful.

Red Team verdict: **TEST WITH CONDITIONS**. The architecture is suitable for respondent testing, but subtype thresholds, family-match calibration, cross-national invariance and wording effects remain empirical questions.

## Source-selection rule

For politically sensitive claims, Politangle prioritizes:

- transparent comparative datasets and survey methods;
- established academic reference works;
- university-based research institutes;
- nonpartisan/nonadvocacy research organizations;
- intergovernmental research institutions.

Descriptions should not be changed merely to make a left-, right-, liberal-, conservative-, nationalist- or socialist-facing result appear more favorable. Where evidence does not support a universal characterization, the public table must say `varies` or state the narrower conditions under which the characterization applies.
