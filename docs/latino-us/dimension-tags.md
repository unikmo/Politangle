# US Latino edition: dimension tags (same tag set as the Adult Quick/Deep bank)

Tags use the repo's four dimensions: economy, society, power, world. Q01-Q26 follow the Adult Quick bank one to one (same order, same dimension and construct as `quickQuestions` ids 1-26 in `lib/questions.ts`). D01-D16 are new topics; I assigned dimensions by topic (editorial assignment, owner to confirm).

Shown A = source side comes from the order map in `Politangle_US_Latino_Revised.md`. Direction (negative/positive in the repo's terms) follows the SOURCE option A = negative side, source option B = positive side, as in the Adult bank; apply the order map before scoring.

| ID | Dimension | Construct | Basis |
|---|---|---|---|
| Q01 | economy | public versus private provision | = quick 1 |
| Q02 | economy | taxation and public services | = quick 2 |
| Q03 | economy | redistribution | = quick 3 |
| Q04 | economy | collective bargaining | = quick 4 |
| Q05 | economy | social insurance (source Q05 = support when people lose work or face medical costs; the Adult Quick 5 is strategic industries) | check: topic differs from quick 5, closest repo construct is social insurance (quick 7) |
| Q06 | economy | economic regulation / small business support | check against quick 6 |
| Q07 | economy | economic regulation | check against quick 6/7 |
| Q08 | economy | public provision (education and training) | topic-based |
| Q09 | economy | housing affordability and market regulation | topic-based |
| Q10 | society | family policy | = quick 9 |
| Q11 | society | personal morality and public norms | = quick 10 |
| Q12 | society | recognition of changing social identities / cultural neutrality | = quick 11-12 |
| Q13 | society | law and deeply contested ethical questions (replaces "abortion and legal autonomy") | reworded; same dimension |
| Q14 | society | cultural neutrality of public institutions | = quick 12 |
| Q15 | power | police discretion | = quick 15 |
| Q16 | power | criminal justice priorities | topic-based |
| Q17 | power | judicial constraints on elected government | = quick 19 |
| Q18 | power | political speech | = quick 18 |
| Q19 | power | federal versus state authority | topic-based |
| Q20 | power | surveillance and privacy | = quick 17 |
| Q21 | world | binding international cooperation | = quick 21 |
| Q22 | world | trade and economic interdependence | = quick 22 |
| Q23 | world | immigration and national control | = quick 23 |
| Q24 | world | immigration status and legalisation | topic-based |
| Q25 | world | regional (Latin America) foreign policy | topic-based |
| Q26 | world | national interest versus global responsibility | = quick 26 |
| D01 | power | election administration (federal vs state) | topic-based |
| D02 | power | campaign finance | topic-based |
| D03 | economy | public transit investment | topic-based |
| D04 | economy | healthcare coverage | topic-based |
| D05 | economy | paid family leave / labor mandates | topic-based |
| D06 | society | bilingual education | topic-based |
| D07 | society | language access to government services | topic-based |
| D08 | society | school history and curriculum | topic-based |
| D09 | society | race, ethnicity and targeted programs | topic-based |
| D10 | economy | environmental regulation versus cost | topic-based |
| D11 | economy | energy transition | topic-based |
| D12 | world | immigration enforcement priorities | topic-based |
| D13 | power | local policing and federal immigration | topic-based |
| D14 | world | foreign aid to Latin America | topic-based |
| D15 | power | protest and public order | = quick 20 |
| D16 | society | religious freedom and public recognition | topic-based |

Notes
- The Latino Q01-Q26 order does not match the Adult Quick order for every item (Q05-Q09, Q14, Q16, Q19, Q24, Q25 differ in topic). Where the table says "check" or "topic-based", the importer must confirm the closest existing construct, or register a new construct, and must not silently reuse an id.
- "Not sure" is a separate third answer (value 'unsure' in the engine).
- English and es-US only. No DE, FR, PT-BR.