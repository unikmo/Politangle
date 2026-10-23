# Politangle — Post-quiz country interpretation (23 Oct 2026)

## User journey

1. Finish **Quick 26** or **Full 42**.
2. Immediately below the personalized political-family summary, choose **up to three** countries.
3. The existing eight-axis result and five-family indices are **not recalculated** when switching countries.
4. For each country, see a concise explanation of why political categories differ there, links to the five national themes and the local party landscape.
5. Where a party has an explicitly reviewed broad-family association, show the respondent's **own family score**, labelled as such, alongside the party's broad tradition. Do **not** issue a party match percentage, vote prediction or recommendation.
6. Where a party is cross-cutting, unclassified, or not yet supported, say so rather than supplying a made-up match.
7. Selections live only in browser session storage; they persist from Quick to Full and are not transmitted to an API.

## Coverage and limits

- **80 country contexts**, available in five languages.
- The initial **20-country party roster** is an editorial shortlist, not an exhaustive party register.
- The other 60 countries have contextual interpretation only until party-by-party evidence is curated.
- Broad party traditions are separately mapped in `lib/country-party-comparison.ts`, never inferred from the spelling of the party name.
- Germany includes sourced party-specific introductory background and 2025 Bundestag election facts. Other countries currently have only country-level sources and **editorial** family associations, not independent party-platform comparisons.
- **No scientific or electoral inference:** a family score is about the user's broad ideological answers; it is not a claim of what fraction of a party programme the user supports.
- Election figures are explicitly dated; do not present historical election results as current party membership.

## Next evidence upgrade

For a defensible **issue-by-issue party comparison**, ingest independently documented positions, capture year/source/country/issue coverage, and map each to the assessment's eight axes. Covering multiple parties in 80 countries without such evidence would manufacture precision.

Useful independent reference dataset: [Chapel Hill Expert Survey Europe 2024](https://www.chesdata.eu/ches-europe/) (31 European countries, 279 parties, explicit economic, GAL–TAN and EU-integration positions). Broader international coverage requires additional sources and local political expertise; the available CHES variables do not map one-to-one to all eight Politangle dimensions.

## Release evidence

- `lib/country-postquiz-2026-10.test.ts`: family-association safeguards and Quick/Full integration.
- `lib/country-navigation-2026-10.test.ts`: URL and locale coverage.
- `scripts/release-smoke.mjs`: real routes and 404 behaviour.
- `scripts/mobile-smoke.mjs`: responsive browser QA, complete Quick journey, country cap, party cards.

Do not equate a green technical build with independent political-science or native-speaker validation. Human editorial verification of new issue-by-issue party scoring will be required before adding it.
