// Imported verbatim from supplied bilingual questionnaire; dimensions and direction follow supplied mapping.
export type LatinoItem = {id:string;dimension:string;construct:string;sourceA:'A'|'B';en:readonly [string,string];es:readonly [string,string]};
export const latinoItems: readonly LatinoItem[] = [
  {
    "id": "Q01",
    "dimension": "economy",
    "construct": "public versus private provision",
    "sourceA": "A",
    "en": [
      "Essential services such as water and electricity should usually be publicly operated when competition is limited.",
      "Essential services should usually be privately operated under strong public oversight, even when competition is limited."
    ],
    "es": [
      "Los servicios esenciales, como el agua y la electricidad, deberían estar generalmente a cargo de entidades públicas cuando hay poca competencia.",
      "Los servicios esenciales deberían estar generalmente a cargo de empresas privadas bajo una supervisión pública estricta, incluso cuando hay poca competencia."
    ]
  },
  {
    "id": "Q02",
    "dimension": "economy",
    "construct": "taxation and public services",
    "sourceA": "B",
    "en": [
      "Lower taxes should generally take priority, even if public services and social protections are more limited.",
      "Higher taxes can be justified when they fund stronger public services and social protections."
    ],
    "es": [
      "En general, se debería dar prioridad a impuestos más bajos, aunque eso limite los servicios públicos y la protección social.",
      "Se justifican impuestos más altos si permiten financiar mejores servicios públicos y una mayor protección social."
    ]
  },
  {
    "id": "Q03",
    "dimension": "economy",
    "construct": "redistribution",
    "sourceA": "A",
    "en": [
      "Government should actively reduce large gaps in income and wealth.",
      "Government should generally accept income and wealth differences arising from work, saving and enterprise."
    ],
    "es": [
      "El gobierno debería actuar para reducir las grandes diferencias de ingresos y patrimonio.",
      "En general, el gobierno debería aceptar las diferencias de ingresos y patrimonio que surgen del trabajo, el ahorro y la actividad empresarial."
    ]
  },
  {
    "id": "Q04",
    "dimension": "economy",
    "construct": "collective bargaining",
    "sourceA": "B",
    "en": [
      "Employers should have more flexibility to set pay and conditions, while respecting basic labor rights.",
      "Workers should have stronger legal rights to bargain collectively over pay and conditions."
    ],
    "es": [
      "Los empleadores deberían tener más flexibilidad para fijar salarios y condiciones laborales, respetando los derechos laborales básicos.",
      "Los trabajadores deberían tener mayores derechos legales para negociar colectivamente sus salarios y condiciones laborales."
    ]
  },
  {
    "id": "Q05",
    "dimension": "economy",
    "construct": "social insurance (source Q05 = support when people lose work or face medical costs; the Adult Quick 5 is strategic industries)",
    "sourceA": "A",
    "en": [
      "Government should provide broad support when people lose work or face major medical expenses.",
      "Individuals, families and community organizations should carry more responsibility for those needs."
    ],
    "es": [
      "El gobierno debería ofrecer un apoyo amplio cuando las personas pierden su empleo o enfrentan gastos médicos importantes.",
      "Las personas, las familias y las organizaciones comunitarias deberían asumir una mayor responsabilidad ante esas necesidades."
    ]
  },
  {
    "id": "Q06",
    "dimension": "economy",
    "construct": "economic regulation / small business support",
    "sourceA": "B",
    "en": [
      "Small businesses benefit more from lower taxes and fewer rules than from targeted public spending.",
      "Small businesses should receive targeted public support even when that requires additional spending."
    ],
    "es": [
      "Las pequeñas empresas se benefician más de impuestos bajos y menos regulaciones que del gasto público específico.",
      "Las pequeñas empresas deberían recibir apoyo público específico, aunque eso requiera más gasto."
    ]
  },
  {
    "id": "Q07",
    "dimension": "economy",
    "construct": "economic regulation",
    "sourceA": "A",
    "en": [
      "Government should set stronger rules to protect consumers and workers, even if businesses face higher costs.",
      "Government should simplify business rules when compliance costs make it harder to operate or hire."
    ],
    "es": [
      "El gobierno debería establecer normas más estrictas para proteger a consumidores y trabajadores, aunque aumenten los costos empresariales.",
      "El gobierno debería simplificar las normas empresariales cuando cumplirlas dificulta operar o contratar personal."
    ]
  },
  {
    "id": "Q08",
    "dimension": "economy",
    "construct": "public provision (education and training)",
    "sourceA": "B",
    "en": [
      "Students and employers should pay a larger share of college and job-training costs.",
      "Public colleges and job-training programs should be more heavily subsidized through taxes."
    ],
    "es": [
      "Los estudiantes y los empleadores deberían pagar una mayor parte de los costos universitarios y de capacitación laboral.",
      "Las universidades públicas y los programas de capacitación laboral deberían recibir más subsidios financiados con impuestos."
    ]
  },
  {
    "id": "Q09",
    "dimension": "economy",
    "construct": "housing affordability and market regulation",
    "sourceA": "A",
    "en": [
      "Government should take stronger action to keep housing affordable, including limits on some rent increases.",
      "Housing affordability is better addressed mainly by allowing more construction and reducing development restrictions."
    ],
    "es": [
      "El gobierno debería intervenir más para mantener la vivienda asequible, incluso limitando ciertos aumentos del alquiler.",
      "La vivienda asequible se consigue principalmente facilitando nuevas construcciones y reduciendo las restricciones al desarrollo inmobiliario."
    ]
  },
  {
    "id": "Q10",
    "dimension": "society",
    "construct": "family policy",
    "sourceA": "B",
    "en": [
      "Public policy may give some preference to long-established family arrangements, even if other arrangements receive less recognition.",
      "Public policy should give equal recognition to different adult family and relationship arrangements, even if that departs from long-standing norms."
    ],
    "es": [
      "Las políticas públicas pueden dar cierta preferencia a las formas de familia tradicionales, aunque otras formas reciban menos reconocimiento.",
      "Las políticas públicas deberían reconocer por igual las distintas formas de familia y de relación entre adultos, aunque eso se aparte de normas de larga data."
    ]
  },
  {
    "id": "Q11",
    "dimension": "society",
    "construct": "personal morality and public norms",
    "sourceA": "A",
    "en": [
      "Adults should be free to make personal lifestyle choices that others disapprove of, provided they do not harm others.",
      "Government may discourage some personal choices to uphold shared community standards."
    ],
    "es": [
      "Los adultos deberían poder tomar decisiones personales que otros desaprueben, siempre que no perjudiquen a nadie.",
      "El gobierno puede desalentar algunas decisiones personales para proteger las normas compartidas de la comunidad."
    ]
  },
  {
    "id": "Q12",
    "dimension": "society",
    "construct": "recognition of changing social identities / cultural neutrality",
    "sourceA": "B",
    "en": [
      "Public institutions should retain established practices until there is broad agreement about changing them.",
      "Public institutions should adapt their practices as social understandings of identity change."
    ],
    "es": [
      "Las instituciones públicas deberían mantener sus prácticas establecidas hasta que exista un acuerdo amplio para cambiarlas.",
      "Las instituciones públicas deberían adaptar sus prácticas a medida que cambian las ideas sociales sobre la identidad."
    ]
  },
  {
    "id": "Q13",
    "dimension": "society",
    "construct": "law and deeply contested ethical questions (replaces \"abortion and legal autonomy\")",
    "sourceA": "A",
    "en": [
      "On deeply contested ethical questions, the law should leave the decision mainly to each person's own conscience, even if others strongly disagree.",
      "On deeply contested ethical questions, the law should set shared limits that reflect society's moral commitments, even if some people strongly disagree."
    ],
    "es": [
      "En las cuestiones éticas muy polémicas, la ley debería dejar la decisión sobre todo a la conciencia de cada persona, aunque otros se opongan con firmeza.",
      "En las cuestiones éticas muy polémicas, la ley debería fijar límites comunes que reflejen los compromisos morales de la sociedad, aunque algunas personas se opongan con firmeza."
    ]
  },
  {
    "id": "Q14",
    "dimension": "society",
    "construct": "cultural neutrality of public institutions",
    "sourceA": "B",
    "en": [
      "Public schools may reflect long-standing local religious and cultural traditions more explicitly.",
      "Public schools should make room for students from different religious and nonreligious backgrounds without favoring one tradition."
    ],
    "es": [
      "Las escuelas públicas pueden reflejar de forma más explícita las tradiciones religiosas y culturales arraigadas en la comunidad.",
      "Las escuelas públicas deberían incluir a estudiantes de distintas creencias religiosas o sin religión, sin favorecer ninguna tradición."
    ]
  },
  {
    "id": "Q15",
    "dimension": "power",
    "construct": "police discretion",
    "sourceA": "A",
    "en": [
      "Police powers should remain tightly limited by clear rules, even when that makes enforcement harder.",
      "Police should have greater discretion to prevent disorder, subject to later review."
    ],
    "es": [
      "Las facultades policiales deberían mantenerse estrictamente limitadas por reglas claras, aunque eso dificulte su labor.",
      "La policía debería tener mayor discrecionalidad para prevenir disturbios, sujeta a una revisión posterior."
    ]
  },
  {
    "id": "Q16",
    "dimension": "power",
    "construct": "criminal justice priorities",
    "sourceA": "B",
    "en": [
      "Maintaining firm criminal penalties should be a major priority, including for many nonviolent offenses.",
      "Reducing incarceration should be a major priority, including broader use of alternatives for nonviolent offenses."
    ],
    "es": [
      "Mantener penas penales firmes debería ser una prioridad, incluso para muchos delitos no violentos.",
      "Reducir el encarcelamiento debería ser una prioridad, con un mayor uso de alternativas para delitos no violentos."
    ]
  },
  {
    "id": "Q17",
    "dimension": "power",
    "construct": "judicial constraints on elected government",
    "sourceA": "A",
    "en": [
      "Courts should be able to block government actions that violate constitutional rights, even after an election victory.",
      "Elected leaders should have more room to carry out their programs, even if courts can then review fewer of their actions."
    ],
    "es": [
      "Los tribunales deberían poder frenar medidas gubernamentales que violen derechos constitucionales, incluso después de una victoria electoral.",
      "Los líderes electos deberían tener más margen para aplicar sus programas, aunque los tribunales puedan revisar menos de sus acciones."
    ]
  },
  {
    "id": "Q18",
    "dimension": "power",
    "construct": "political speech",
    "sourceA": "B",
    "en": [
      "Government should have more authority to restrict some public communications that cause serious harm during crises, even if that limits some speech.",
      "Independent journalism should receive strong legal protection, including when it sharply criticizes officials."
    ],
    "es": [
      "El gobierno debería tener más autoridad para restringir ciertas comunicaciones públicas que causen daños graves durante crisis, aunque eso limite parte de la libertad de expresión.",
      "El periodismo independiente debería contar con una sólida protección legal, incluso cuando critique duramente a funcionarios."
    ]
  },
  {
    "id": "Q19",
    "dimension": "power",
    "construct": "federal versus state authority",
    "sourceA": "A",
    "en": [
      "States and local communities should have more flexibility to set policies reflecting local needs.",
      "Federal standards should be stronger to ensure more consistent rights and services across states."
    ],
    "es": [
      "Los estados y las comunidades locales deberían tener más flexibilidad para establecer políticas según sus necesidades.",
      "Las normas federales deberían ser más fuertes para garantizar derechos y servicios más uniformes entre estados."
    ]
  },
  {
    "id": "Q20",
    "dimension": "power",
    "construct": "surveillance and privacy",
    "sourceA": "B",
    "en": [
      "Government should have broader surveillance tools with oversight when addressing serious security threats.",
      "People should have stronger privacy protections against government surveillance, even if investigations become harder."
    ],
    "es": [
      "El gobierno debería contar con herramientas de vigilancia más amplias, sujetas a supervisión, ante amenazas graves a la seguridad.",
      "Las personas deberían tener mayor protección de su privacidad frente a la vigilancia gubernamental, aunque complique las investigaciones."
    ]
  },
  {
    "id": "Q21",
    "dimension": "world",
    "construct": "binding international cooperation",
    "sourceA": "A",
    "en": [
      "The United States should cooperate through binding international agreements on major cross-border problems.",
      "The United States should preserve more freedom to act independently, even if international coordination becomes harder."
    ],
    "es": [
      "Estados Unidos debería cooperar mediante acuerdos internacionales vinculantes para abordar grandes problemas transfronterizos.",
      "Estados Unidos debería conservar más libertad para actuar por su cuenta, aunque eso dificulte la coordinación internacional."
    ]
  },
  {
    "id": "Q22",
    "dimension": "world",
    "construct": "trade and economic interdependence",
    "sourceA": "B",
    "en": [
      "The United States should generally favor domestic production and stronger trade protections, even if prices rise.",
      "The United States should generally favor open trade with other countries, including in the Americas."
    ],
    "es": [
      "En general, Estados Unidos debería favorecer la producción nacional y una mayor protección comercial, aunque suban los precios.",
      "En general, Estados Unidos debería favorecer el comercio abierto con otros países, incluidos los de América."
    ]
  },
  {
    "id": "Q23",
    "dimension": "world",
    "construct": "immigration and national control",
    "sourceA": "A",
    "en": [
      "Immigration policy should provide more legal pathways to enter and settle in the United States.",
      "Immigration policy should place greater priority on limiting arrivals and enforcing entry rules."
    ],
    "es": [
      "La política migratoria debería ofrecer más vías legales para entrar y establecerse en Estados Unidos.",
      "La política migratoria debería dar mayor prioridad a limitar las llegadas y hacer cumplir las normas de entrada."
    ]
  },
  {
    "id": "Q24",
    "dimension": "world",
    "construct": "immigration status and legalisation",
    "sourceA": "B",
    "en": [
      "Legal status should generally remain limited to people who qualify through existing immigration procedures.",
      "Long-term residents without lawful immigration status should have broader opportunities to earn legal status if they meet defined requirements."
    ],
    "es": [
      "En general, el estatus legal debería limitarse a quienes reúnen los requisitos de los procedimientos migratorios vigentes.",
      "Los residentes de larga duración sin estatus migratorio legal deberían tener más oportunidades de regularizarse si cumplen requisitos definidos."
    ]
  },
  {
    "id": "Q25",
    "dimension": "world",
    "construct": "regional (Latin America) foreign policy",
    "sourceA": "A",
    "en": [
      "The United States should work closely with Latin American governments on shared economic and security challenges.",
      "The United States should prioritize its own policy independence when dealing with Latin American governments."
    ],
    "es": [
      "Estados Unidos debería colaborar estrechamente con los gobiernos latinoamericanos ante desafíos económicos y de seguridad compartidos.",
      "Estados Unidos debería priorizar su independencia de acción al tratar con los gobiernos latinoamericanos."
    ]
  },
  {
    "id": "Q26",
    "dimension": "world",
    "construct": "national interest versus global responsibility",
    "sourceA": "B",
    "en": [
      "US leaders should prioritize immediate domestic interests when international commitments impose substantial costs.",
      "Meeting shared international obligations can justify some costs for people in the United States."
    ],
    "es": [
      "Los líderes estadounidenses deberían priorizar los intereses nacionales inmediatos cuando los compromisos internacionales implican costos importantes.",
      "Cumplir obligaciones internacionales compartidas puede justificar ciertos costos para las personas en Estados Unidos."
    ]
  },
  {
    "id": "D01",
    "dimension": "power",
    "construct": "election administration (federal vs state)",
    "sourceA": "A",
    "en": [
      "Federal voting rules should set stronger nationwide protections for access to the ballot.",
      "States should retain broader control over election procedures to reflect local conditions."
    ],
    "es": [
      "Las normas electorales federales deberían establecer mayores protecciones nacionales para el acceso al voto.",
      "Los estados deberían conservar un mayor control de los procedimientos electorales para reflejar las condiciones locales."
    ]
  },
  {
    "id": "D02",
    "dimension": "power",
    "construct": "campaign finance",
    "sourceA": "B",
    "en": [
      "Political spending should face fewer limits so individuals and organizations can express their views.",
      "Campaign finance rules should impose tighter limits on large political contributions and spending."
    ],
    "es": [
      "El gasto político debería tener menos límites para que las personas y organizaciones puedan expresar sus opiniones.",
      "Las normas de financiamiento electoral deberían imponer límites más estrictos a las grandes contribuciones y gastos políticos."
    ]
  },
  {
    "id": "D03",
    "dimension": "economy",
    "construct": "public transit investment",
    "sourceA": "A",
    "en": [
      "Government should invest more in public transit even if that requires higher taxes.",
      "Transportation funding should prioritize roads and individual travel choices over expanded public transit."
    ],
    "es": [
      "El gobierno debería invertir más en transporte público, aunque eso requiera impuestos más altos.",
      "El financiamiento del transporte debería priorizar las carreteras y las opciones individuales de movilidad antes que ampliar el transporte público."
    ]
  },
  {
    "id": "D04",
    "dimension": "economy",
    "construct": "healthcare coverage",
    "sourceA": "B",
    "en": [
      "Healthcare coverage should rely more on private insurance and consumer choice, with targeted public assistance.",
      "Public healthcare coverage should expand, even if it increases government spending."
    ],
    "es": [
      "La cobertura de salud debería depender más de seguros privados y de la elección del consumidor, con ayuda pública específica.",
      "La cobertura pública de salud debería ampliarse, aunque aumente el gasto gubernamental."
    ]
  },
  {
    "id": "D05",
    "dimension": "economy",
    "construct": "paid family leave / labor mandates",
    "sourceA": "A",
    "en": [
      "Government should require paid family leave for most workers.",
      "Employers and workers should have more freedom to negotiate leave arrangements without a broad mandate."
    ],
    "es": [
      "El gobierno debería exigir licencias familiares remuneradas para la mayoría de los trabajadores.",
      "Los empleadores y trabajadores deberían tener más libertad para negociar las licencias sin una obligación general."
    ]
  },
  {
    "id": "D06",
    "dimension": "society",
    "construct": "bilingual education",
    "sourceA": "B",
    "en": [
      "Public schools should place greater emphasis on instruction in English to support a common language of participation.",
      "Public schools should offer more bilingual education options when local families need them."
    ],
    "es": [
      "Las escuelas públicas deberían dar mayor prioridad a la enseñanza en inglés para apoyar un idioma común de participación.",
      "Las escuelas públicas deberían ofrecer más opciones de educación bilingüe cuando las familias de la zona las necesiten."
    ]
  },
  {
    "id": "D07",
    "dimension": "society",
    "construct": "language access to government services",
    "sourceA": "A",
    "en": [
      "Government services should be accessible in multiple languages when substantial communities need them.",
      "Government services should generally operate in English, with translation assistance for essential cases."
    ],
    "es": [
      "Los servicios gubernamentales deberían estar disponibles en varios idiomas cuando comunidades numerosas los necesiten.",
      "En general, los servicios gubernamentales deberían funcionar en inglés, con ayuda de traducción en casos esenciales."
    ]
  },
  {
    "id": "D08",
    "dimension": "society",
    "construct": "school history and curriculum",
    "sourceA": "B",
    "en": [
      "Public schools should focus more on a shared national history and common civic institutions.",
      "Public schools should give more attention to the histories and contributions of different communities, including Latino communities."
    ],
    "es": [
      "Las escuelas públicas deberían centrarse más en una historia nacional compartida y en las instituciones cívicas comunes.",
      "Las escuelas públicas deberían prestar más atención a las historias y contribuciones de distintas comunidades, incluidas las latinas."
    ]
  },
  {
    "id": "D09",
    "dimension": "society",
    "construct": "race, ethnicity and targeted programs",
    "sourceA": "A",
    "en": [
      "Government should do more to address unequal treatment linked to race or ethnicity, including through targeted programs.",
      "Government should generally use rules that treat everyone the same without programs targeted by race or ethnicity."
    ],
    "es": [
      "El gobierno debería hacer más para enfrentar el trato desigual por raza u origen étnico, incluso mediante programas específicos.",
      "En general, el gobierno debería aplicar reglas iguales para todos, sin programas dirigidos a grupos raciales o étnicos."
    ]
  },
  {
    "id": "D10",
    "dimension": "economy",
    "construct": "environmental regulation versus cost",
    "sourceA": "B",
    "en": [
      "Environmental rules should be adjusted when their economic costs are high, while maintaining basic safeguards.",
      "Environmental protections should be strengthened even when energy and business costs increase."
    ],
    "es": [
      "Las normas ambientales deberían ajustarse cuando sus costos económicos sean altos, manteniendo protecciones básicas.",
      "Las protecciones ambientales deberían reforzarse aunque aumenten los costos de la energía y de las empresas."
    ]
  },
  {
    "id": "D11",
    "dimension": "economy",
    "construct": "energy transition",
    "sourceA": "A",
    "en": [
      "Government should accelerate a transition to cleaner energy through public investment and regulation.",
      "Energy policy should give greater weight to affordability and reliable supply, allowing markets to guide the transition."
    ],
    "es": [
      "El gobierno debería acelerar la transición hacia energías más limpias mediante inversión pública y regulación.",
      "La política energética debería dar más peso a los precios accesibles y al suministro confiable, dejando que el mercado guíe la transición."
    ]
  },
  {
    "id": "D12",
    "dimension": "world",
    "construct": "immigration enforcement priorities",
    "sourceA": "B",
    "en": [
      "Federal immigration enforcement should apply entry and residence rules more consistently, even when that means giving less weight to individual circumstances.",
      "Federal immigration enforcement should give greater priority to people who pose serious public-safety threats."
    ],
    "es": [
      "La aplicación federal de las leyes migratorias debería hacer cumplir las normas de entrada y residencia de manera más uniforme, aunque eso signifique dar menos peso a las circunstancias individuales.",
      "La aplicación federal de las leyes migratorias debería dar mayor prioridad a quienes representen amenazas graves para la seguridad pública."
    ]
  },
  {
    "id": "D13",
    "dimension": "power",
    "construct": "local policing and federal immigration",
    "sourceA": "A",
    "en": [
      "Local police should generally avoid routine involvement in federal immigration enforcement to maintain community trust.",
      "Local police should cooperate more extensively with federal immigration authorities to support enforcement."
    ],
    "es": [
      "En general, la policía local debería evitar participar habitualmente en la aplicación federal de las leyes migratorias para mantener la confianza comunitaria.",
      "La policía local debería colaborar más ampliamente con las autoridades federales de inmigración para apoyar el cumplimiento de la ley."
    ]
  },
  {
    "id": "D14",
    "dimension": "world",
    "construct": "foreign aid to Latin America",
    "sourceA": "B",
    "en": [
      "US foreign aid to Latin American countries should be more limited, with greater emphasis on domestic needs.",
      "US foreign aid to Latin American countries should be expanded when it supports development and stability."
    ],
    "es": [
      "La ayuda exterior de Estados Unidos a países latinoamericanos debería ser más limitada, dando mayor prioridad a las necesidades nacionales.",
      "La ayuda exterior de Estados Unidos a países latinoamericanos debería ampliarse cuando apoye el desarrollo y la estabilidad."
    ]
  },
  {
    "id": "D15",
    "dimension": "power",
    "construct": "protest and public order",
    "sourceA": "A",
    "en": [
      "People should be able to protest peacefully in public spaces even when demonstrations cause major disruption.",
      "Authorities should have more power to restrict disruptive demonstrations to protect public order."
    ],
    "es": [
      "Las personas deberían poder manifestarse pacíficamente en espacios públicos aunque las protestas causen grandes interrupciones.",
      "Las autoridades deberían tener más facultades para limitar las manifestaciones que causen interrupciones y proteger el orden público."
    ]
  },
  {
    "id": "D16",
    "dimension": "society",
    "construct": "religious freedom and public recognition",
    "sourceA": "B",
    "en": [
      "Public institutions may give greater recognition to religious traditions with a long history in local communities.",
      "Public institutions should more actively protect religious freedom for minority faiths and people with no religion."
    ],
    "es": [
      "Las instituciones públicas pueden dar mayor reconocimiento a las tradiciones religiosas arraigadas desde hace tiempo en las comunidades locales.",
      "Las instituciones públicas deberían proteger más activamente la libertad religiosa de las minorías y de quienes no profesan ninguna religión."
    ]
  }
];
