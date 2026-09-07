# Politangle primary political-family model — evidence and restraint note

Status: content-validation model, not psychometrically validated.

## Public-facing scope

Politangle keeps the main results table deliberately simple. The public table contains seven broad families:

1. Liberalism
2. Conservatism
3. Social democracy
4. Socialism
5. Green politics
6. Nationalism
7. Populism

Narrower or rarer subtypes remain available inside the engine for explanation and pattern detection but do not automatically become headline result rows. Democratic socialism is therefore treated as a subtype within the broader socialist family for public explanation, while the internal ownership discriminator remains available to distinguish it from modern social democracy.

## Compatibility index

The 0–100 value is a Politangle compatibility index, not a probability, vote prediction or identity label.

- 75–100: Strong match
- 60–74: Broad match
- 40–59: Mixed / overlapping
- 25–39: Limited match
- 0–24: Strong tension

The index uses the existing evidence-bound model criteria. Core criteria receive weight 2 and typical criteria weight 1. A measured criterion that falls in an evidence-defined support bucket contributes 100 points, a contradiction contributes 0, and an unresolved/mixed signal contributes 50. Unknown or low-coverage criteria are excluded. A family is not scored if no core criterion is known or total criterion coverage is below 50%.

This scoring is transparent and deterministic, but its thresholds still require empirical calibration against real respondent data before any psychometric-validity claim.

## Populism and state power

Politangle does **not** code populism itself as automatically authoritarian.

The public wording follows research from the V-Dem Institute and International IDEA:

- Populism is commonly defined through people-centrism, anti-elitism and a claim to the general will.
- Populism can attach to different host ideologies.
- Populist governments can erode checks and balances and contribute to democratic backsliding.
- The stronger discriminator for authoritarian/autocratizing risk is anti-pluralism or rejection of democratic constraints, rather than the populist label alone.

For this reason, the populism match score uses the dedicated populism axis. Politangle separately reports whether the respondent’s answers support or reject competitive democracy and institutional constraints.

Evidence bindings: `VDEM-POPULISM-AUTOCRATIZATION`, `IDEA-POPULISM-DEMOCRACY`, `MUDDE-POPULISM`.

## Citizenship at birth

The Deep BELIEVE bank explicitly includes citizenship at birth. The question contrasts giving birthplace substantial independent weight with giving greater weight to parent citizenship or qualifying legal status.

GLOBALCIT data are used because citizenship-at-birth law is more complex than a simple civic-versus-ethnic binary. The public ideology table therefore avoids claiming that all members of an ideology support one universal birthright rule.

Evidence binding: `GLOBALCIT-BIRTHRIGHT`.

## Abortion

Politangle Quick explicitly includes abortion in the social-values dimension. The question presents legal personal decision-making and stronger legal protection of prenatal life as balanced competing considerations.

Abortion is **not** treated as a universal defining condition for any broad ideology. Pew Research Center’s cross-national data support a real ideological association in many countries while also showing substantial variation by country and religion.

Evidence binding: `PEW-ABORTION-GLOBAL`.

## Source-selection rule

For politically sensitive claims, Politangle prioritizes:

- transparent comparative datasets and survey methods;
- established academic reference works;
- university-based research institutes;
- nonpartisan/nonadvocacy research organizations;
- intergovernmental research institutions.

Descriptions should not be changed merely to make a left-, right-, liberal-, conservative-, nationalist- or socialist-facing result appear more favorable. Where evidence does not support a universal characterization, the public table must say `varies` or state the narrower conditions under which the characterization applies.

## Fresh Red Team pass

The primary-family model was challenged against four likely failure modes before this implementation was considered ready for testing:

1. **Populism = authoritarianism shortcut.** Rejected. V-Dem research explicitly separates populism from anti-democratic commitment and identifies anti-pluralism as the stronger predictor of autocratization. International IDEA likewise assesses how populist governments affect checks and balances rather than treating every populist movement as institutionally identical. The implementation therefore keeps a populism match separate from a democratic-constraints / authoritarian-risk qualifier.
2. **Birthright citizenship = simple civic/ethnic binary.** Rejected. GLOBALCIT documents mixed and conditional citizenship-at-birth regimes. The question therefore measures relative weight of birthplace versus parent citizenship/legal status rather than claiming only two legal models exist.
3. **Abortion = ideology identity test.** Rejected. Cross-national Pew data show meaningful ideological association but also large country and religious variation. Abortion is included as a direct issue answer and is not required for membership in any broad political family.
4. **Taxonomy inflation.** Rejected for the public result. Democratic socialism, libertarianism, Christian democracy, communism and fascist/extreme-right patterns remain available internally or contextually, but the default characteristics table is restricted to seven broad families that explain substantially different political logics.

Red Team verdict: **TEST WITH CONDITIONS**. The content is suitable for respondent testing, but numeric compatibility calibration, cross-national invariance and wording effects remain empirical questions and must not be presented as settled science.
