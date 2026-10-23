/** Selected political parties for civic-literacy navigation; not a ranking, endorsement, or exhaustive register. */
export const countryPartyNames: Readonly<Record<string, readonly string[]>> = {
  "germany": [
    "CDU/CSU",
    "SPD",
    "AfD",
    "Bündnis 90/Die Grünen",
    "Die Linke",
    "FDP",
    "BSW"
  ],
  "united-states": [
    "Democratic Party",
    "Republican Party",
    "Libertarian Party",
    "Green Party"
  ],
  "france": [
    "Renaissance",
    "Rassemblement National",
    "La France insoumise",
    "Parti socialiste",
    "Les Républicains",
    "Les Écologistes"
  ],
  "united-kingdom": [
    "Labour Party",
    "Conservative Party",
    "Liberal Democrats",
    "Reform UK",
    "Green Party of England and Wales",
    "Scottish National Party"
  ],
  "netherlands": [
    "PVV",
    "GroenLinks–PvdA",
    "VVD",
    "D66",
    "CDA",
    "BBB",
    "SP"
  ],
  "denmark": [
    "Social Democrats",
    "Venstre",
    "Socialist People's Party",
    "Liberal Alliance",
    "Denmark Democrats",
    "Conservative People's Party"
  ],
  "finland": [
    "National Coalition Party",
    "Social Democratic Party",
    "Finns Party",
    "Centre Party",
    "Green League",
    "Left Alliance"
  ],
  "iceland": [
    "Independence Party",
    "Social Democratic Alliance",
    "Progressive Party",
    "Reform Party",
    "Left-Green Movement"
  ],
  "norway": [
    "Labour Party",
    "Conservative Party",
    "Progress Party",
    "Centre Party",
    "Socialist Left Party",
    "Green Party"
  ],
  "sweden": [
    "Social Democrats",
    "Sweden Democrats",
    "Moderate Party",
    "Left Party",
    "Centre Party",
    "Christian Democrats",
    "Green Party"
  ],
  "spain": [
    "PSOE",
    "Partido Popular",
    "Vox",
    "Sumar",
    "Podemos",
    "Esquerra Republicana de Catalunya"
  ],
  "mexico": [
    "Morena",
    "PAN",
    "PRI",
    "Movimiento Ciudadano",
    "Partido Verde Ecologista de México",
    "Partido del Trabajo"
  ],
  "canada": [
    "Liberal Party",
    "Conservative Party",
    "New Democratic Party",
    "Bloc Québécois",
    "Green Party"
  ],
  "south-africa": [
    "African National Congress",
    "Democratic Alliance",
    "Economic Freedom Fighters",
    "uMkhonto weSizwe",
    "Inkatha Freedom Party"
  ],
  "india": [
    "Bharatiya Janata Party",
    "Indian National Congress",
    "Aam Aadmi Party",
    "All India Trinamool Congress",
    "Samajwadi Party"
  ],
  "nigeria": [
    "All Progressives Congress",
    "Peoples Democratic Party",
    "Labour Party",
    "New Nigeria Peoples Party"
  ],
  "philippines": [
    "Partido Federal ng Pilipinas",
    "Lakas–CMD",
    "Partido Demokratiko Pilipino",
    "Liberal Party",
    "Akbayan"
  ],
  "brazil": [
    "Partido dos Trabalhadores",
    "Partido Liberal",
    "MDB",
    "PSD",
    "União Brasil",
    "PSOL"
  ],
  "indonesia": [
    "PDI-P",
    "Golkar",
    "Gerindra",
    "PKB",
    "NasDem",
    "PKS"
  ],
  "japan": [
    "Liberal Democratic Party",
    "Constitutional Democratic Party",
    "Japan Innovation Party",
    "Komeito",
    "Japanese Communist Party",
    "Democratic Party for the People"
  ]
};

export function partySlug(name: string): string {
  return name.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
}
