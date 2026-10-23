# Populism scoring — v7 candidate (13 October 2026)

**Status:** staging only; this is a substantive measurement change, not a cosmetic translation.

## Previous defect

T11, F11 and A11 measured mostly concern over unequal political influence or support for reducing influence of well-connected groups. The previous tendency function simply averaged these answers and displayed a 'populism' score even when only one component was answered. This could wrongly portray reasonable criticism of lobbying as populism. The conditional 'far-right' screening also reused that construct and a birth-weighted belonging proxy in place of a direct nativism measure.

## New operationalization (THINK–FEEL–ACT; unchanged 42-question allocation)

- **T11 — people-centrism:** whether most people are assumed to hold one common political will, rather than many legitimate interests.
- **F11 — moralized anti-elite divide:** whether politics is felt as an ethical struggle between honest people and a dishonest political class, rather than disagreements among diverse people.
- **A11 — exclusive representation:** willingness to support a candidate who claims uniquely to speak for the authentic people.
- The questions are independent, one statement each, five languages, both poles. No question about unequal influence or lobbying alone contributes to the new score.
- Each numeric answer maps -2,-1,0,1,2 to 0,25,50,75,100. An 'unsure' response is not numeric.
- **Coverage:** number of valid answers among T11/F11/A11 divided by three.
- **Scoring:** ONLY when all three components have valid numeric responses, compute `Math.min(T11,F11,A11)` on the mapped values. Before that return `score: null`. Under this non-compensatory rule one high response cannot compensate for a weak facet.
- **UI:** Explain the three responses and avoid calling the number a diagnosis, voter label, or validated personal classification.
- **Political families/polygon:** These items are not used for the five family scores and do not become a new headline polygon axis.
- **Radical-right screening:** Suppressed until there is a validated nativism measure and independent methodology assessment. Birth-weighted national belonging is NOT automatically nativism.

## Version and migration

The source questionnaire moves to `belief-2026.10-v7-populism-quick26-full84`. Old unfinished sessions fail the questionnaire version check, preventing new answers from being scored under old text. No automatic migration or silent re-use of old populism scores. The Quick/Full counts, source IDs and answer-polarity mapping remain unchanged.

## Limitations / independent review

This is an **exploratory three-item index**, not a validated populism attitude scale. Each theoretical facet has only one question. A floor/minimum aggregation is intentionally conservative but can be noisy and sensitive to response style, translations, and social-desirability effects. Before claiming population comparability or test validity, obtain native-language cognitive interviews, balanced wording checks, discriminant validity versus ordinary accountability/lobbying concerns, and calibration against validated multi-item scales.

### Academic background (not validation of Politangle)

- Cas Mudde (2004), "The Populist Zeitgeist", `https://doi.org/10.1111/j.1477-7053.2004.00135.x` (shared popular will / homogeneous antagonistic groups).
- Akkerman, Mudde & Zaslove (2014), "How Populist Are the People?", `https://doi.org/10.1177/0010414013512600` (populist, pluralist and elitist attitudes separated).
- Wuttke et al. (2020), "When the Whole Is Greater than the Sum of Its Parts", APSR, `https://www.cambridge.org/core/journals/american-political-science-review/article/when-the-whole-is-greater-than-the-sum-of-its-parts-on-the-conceptualization-and-measurement-of-populist-attitudes-and-other-multidimensional-constructs/4B025EF483E1564EF495972540E5A34D` (multidimensional/non-compensatory conceptualization).

## Release gate

Do not publish until engine CI, Next.js build, localized question QA, and hands-on browser checks pass; obtain explicit production authorization.
