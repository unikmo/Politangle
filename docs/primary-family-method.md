# Politangle political-family model — evidence and restraint note

Status: content-validation model, not psychometrically validated.

## Public-facing structure

Politangle separates three layers instead of forcing unlike concepts into one ranking.

### A. Main political families

The default result contains exactly five broad families:

1. Liberalism
2. Conservatism
3. Social democracy
4. Socialism
5. Green politics

These five remain the headline arc/polygon. A political-theory label does **not** earn a sixth headline score merely because scholars distinguish it.

The headline layer is intentionally broad and stable. Several families can be compatible with one respondent at the same time.

### B. Cross-cutting political tendencies

These remain separate because they can combine with several main families:

- Nationalism
- Populism
- Authority / democratic constraints

Nationalism and populism therefore do not compete with Liberalism, Conservatism, Social democracy, Socialism or Green politics for one headline identity label.

### C. Conditional nuance layer

Narrower concepts can still be useful, but only as **conditional nuances**. They do not expand the main five-family arc and they are never shown merely because the concept exists in political theory.

A nuance is eligible only when:

- the respondent's measured pattern contains dedicated supporting evidence;
- the narrower label materially improves interpretation;
- the result can be stated without pretending that the nuance is a new headline ideology probability.

Current implemented examples:

- **Democratic-socialist tendency** — anchored to the Socialist side. It requires a meaningful Socialism family match plus substantially greater social/public/cooperative/worker ownership **and** separately measured support for pluralist democratic constraints and limits on concentrated state power. Collective ownership by itself is not enough.
- **Christian democracy** — anchored to the Conservative side. It requires the existing conservative-family signal plus religious inspiration, subsidiarity, social-market-compatible economics and democratic compatibility. Religion or welfare support alone is not enough.
- **Traditional/secular conservatism** and **religious-conservative orientation** — shown only when the conservative subtype discriminators support them.
- **Far-right tendency (radical-right pattern)** — positioned on the Conservative side for orientation but explicitly not treated as ordinary Conservatism. It requires the combined pattern of strongly nation-centered membership, authoritarian-order preference and people-versus-elite populism. The current nationhood-membership construct is a screening proxy rather than a fully validated nativism scale, so this output remains a guarded pattern signal rather than an identity or extremist classification.

The nuance layer is deliberately asymmetric. Politangle does not invent a matching left or right subtype simply to make the diagram look balanced. A nuance appears only when the questionnaire contains enough evidence to support it.

Historical importance is a separate criterion from respondent classification. Communism and Fascism can therefore appear in civic/history literacy without becoming routine user-identity categories. Fascism/extreme-right classification remains more demanding than the radical-right screening pattern and must not be inferred from ordinary conservative, nationalist or sovereignty preferences.

Evidence bindings include `SEP-SOCIALISM`, `VDEM-LIBERAL-DEMOCRACY`, `SEP-CONSERVATISM`, `CAMBRIDGE-CHRISTIAN-DEMOCRACY`, `CAMBRIDGE-CD-SUBSIDIARITY`, `CAMBRIDGE-CD-RELIGIOUS-INSPIRATION`, `MUDDE-RADICAL-RIGHT`, `MUDDE-POPULISM`, and `PIRRO-FAR-RIGHT`.

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
- Authority / democratic constraints combines authority/order and pluralism evidence.

A strong authority or anti-pluralist pattern remains separate from the five family scores.

## Populism and state power

Politangle does **not** code populism itself as automatically authoritarian.

The public wording follows research from V-Dem, International IDEA and comparative populism scholarship:

- Populism is commonly defined through people-centrism, anti-elitism and a claim to the general will.
- Populism can attach to different host ideologies.
- Populist governments can erode checks and balances and contribute to democratic backsliding.
- The stronger discriminator for authoritarian/autocratizing risk is anti-pluralism or rejection of democratic constraints rather than the populist label alone.

For this reason, the populism tendency uses the dedicated populism construct while democratic-constraint evidence is reported separately.

Evidence bindings: `VDEM-POPULISM-AUTOCRATIZATION`, `IDEA-POPULISM-DEMOCRACY`, `MUDDE-POPULISM`.

## Citizenship at birth

The BELIEVE model explicitly includes citizenship at birth. The construct contrasts giving birthplace substantial independent weight with giving greater weight to parent citizenship or qualifying legal status.

GLOBALCIT data are used because citizenship-at-birth law is more complex than a simple civic-versus-ethnic binary. The public ideology table therefore avoids claiming that all members of an ideology support one universal birthright rule.

Evidence binding: `GLOBALCIT-BIRTHRIGHT`.

## Abortion

Politangle Quick explicitly includes abortion in the social-values dimension. The question presents legal personal decision-making and stronger legal protection of prenatal life as balanced competing considerations.

Abortion is **not** treated as a universal defining condition for any broad ideology. Pew Research Center’s cross-national data support a real ideological association in many countries while also showing substantial variation by country and religion.

Evidence binding: `PEW-ABORTION-GLOBAL`.

## Fresh Red Team pass — nuance without taxonomy inflation

The revised architecture was challenged against seven likely failure modes:

1. **Turning every scholarly subtype into a result category.** Rejected. The five headline families remain fixed.
2. **Removing useful nuance entirely.** Rejected. Narrow labels may surface when the respondent actually shows the relevant pattern.
3. **Democratic socialism = any strong left economic preference.** Rejected. The nuance additionally requires pluralist-democratic and constrained-power signals.
4. **Far right = ordinary conservatism or nationalism.** Rejected. The guarded radical-right pattern requires the combined nationhood/nativism-proxy, authoritarian-order and populism pattern.
5. **Far-right pattern = fascism/extreme right.** Rejected. Those concepts require stronger, dedicated anti-democratic/ultranationalist evidence and remain historically and analytically distinct.
6. **Christian democracy = religious conservatism.** Rejected. Christian democracy requires the specific religion + subsidiarity + social-market + democratic combination.
7. **Artificial left/right symmetry.** Rejected. Nuances are not added merely to create visual balance.

Decision: **TEST WITH CONDITIONS**. The layer is suitable for respondent testing as a conditional explanatory system, but the nuance thresholds, the nationhood-to-nativism proxy, family calibration, cross-national invariance and wording effects remain empirical questions.

## Source-selection rule

For politically sensitive claims, Politangle prioritizes:

- transparent comparative datasets and survey methods;
- established academic reference works;
- university-based research institutes;
- nonpartisan/nonadvocacy research organizations;
- intergovernmental research institutions.

Descriptions should not be changed merely to make a left-, right-, liberal-, conservative-, nationalist- or socialist-facing result appear more favorable. Where evidence does not support a universal characterization, the public result must say so or state the narrower conditions under which the characterization applies.
