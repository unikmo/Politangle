import type { BeliefPolarity } from './belief-statements';

export const SPANISH_BELIEVE_VERSION = 'es-believe-2026.10-plain-v3' as const;
export const FRENCH_BELIEVE_VERSION = 'fr-believe-2026.10-plain-v3' as const;

type Pair = readonly [string, string];

const es: Record<string, Pair> = {
  T01: ["El Estado debe garantizar que todos tengan acceso a escuelas y atención médica.", "En servicios esenciales como educación y atención médica, el Estado debe dejar más espacio a los proveedores privados y a la elección personal."],
  T02: ["El Estado debe usar impuestos y ayudas sociales para reducir diferencias de ingresos muy grandes.", "El Estado debe aceptar grandes diferencias de ingresos en vez de intentar corregirlas con impuestos más altos."],
  T03: ["Los trabajadores, las cooperativas y el Estado deben tener una mayor participación en las grandes empresas.", "Las grandes empresas deben pertenecer principalmente a propietarios privados, con derechos laborales protegidos por ley."],
  T04: ["Las leyes y normas públicas deben cambiar con bastante rapidez cuando una nueva forma de pensar o vivir logra un apoyo amplio y duradero.", "Las leyes consolidadas deben cambiar solo tras un debate largo, aunque muchas personas ya apoyen la reforma."],
  T05: ["Las relaciones consentidas entre adultos deben ser legales aunque otras personas las consideren inmorales.", "La ley puede limitar ciertas conductas privadas consentidas entre adultos, para proteger valores morales compartidos, aunque no haya daño directo."],
  T06: ["En general, el aborto debe seguir siendo legal, porque la persona embarazada debe tener la decisión principal.", "El aborto debe tener límites legales más estrictos para proteger la vida antes del nacimiento."],
  T07: ["Solo debe limitarse la libertad ante un peligro concreto y grave.", "El Gobierno puede limitar algunas libertades antes de que ocurra un daño cuando existe un riesgo real de disturbios graves."],
  T08: ["Ganar unas elecciones no debe eliminar los controles independientes sobre el poder, como los tribunales, la Constitución y los derechos de la oposición.", "Un Gobierno elegido debe poder aplicar sus propuestas aunque los tribunales independientes tengan objeciones."],
  T09: ["Los países deben cumplir reglas internacionales obligatorias cuando un problema afecta a varios países.", "Cada país debe conservar la última palabra sobre sus decisiones, aunque eso haga más difícil actuar juntos ante problemas comunes."],
  T10: ["Quien obtiene la ciudadanía más tarde puede pertenecer a la nación tan plenamente como quien es ciudadano desde el nacimiento.", "Tener la ciudadanía desde el nacimiento debe contar más en el sentimiento de pertenencia al país."],
  T11: ["En política, las personas pueden discrepar; nadie habla en nombre de todos.", "La mayoría de la gente comparte una voluntad política que sus representantes deberían cumplir."],
  T12: ["Cuando el medio ambiente y el crecimiento económico chocan claramente, proteger la naturaleza debe tener a veces prioridad, aunque la economía crezca más despacio.", "El crecimiento económico debe tener prioridad y la protección ambiental debe frenarlo lo menos posible."],
  T13: ["El Estado no debe justificar leyes para todos únicamente con creencias religiosas.", "Las creencias morales religiosas pueden ser una razón legítima para aprobar leyes, aunque algunos ciudadanos no compartan esa religión."],
  T14: ["El Gobierno nacional o regional debe encargarse de servicios importantes, como escuelas y hospitales, si así garantiza mejor igualdad de acceso y de calidad.", "Los municipios deben poder organizar sus escuelas y hospitales cuando sean capaces de hacerlo bien."],
  F01: ["Me preocupa que haya personas que se queden sin servicios esenciales porque el acceso depende demasiado de lo que pueden pagar en privado.", "Me preocupa que la gente tenga pocas opciones cuando el Estado controla los servicios esenciales."],
  F02: ["Me parecen injustas las grandes diferencias de ingresos, incluso si reducirlas exige subir algunos impuestos.", "Los impuestos altos me preocupan, incluso cuando su objetivo es reducir diferencias de ingresos muy grandes."],
  F03: ["Me parece justo que los trabajadores o el público tengan una parte importante de la propiedad de las grandes empresas.", "Me parece justo que los inversores privados conserven la mayoría de las acciones, con derechos laborales protegidos."],
  F04: ["Me molesta que sigan vigentes leyes anticuadas cuando una amplia mayoría quiere cambiarlas.", "Me incomoda que cambien reglas de larga data antes de que la mayoría haya aceptado una nueva forma de pensar o de vivir."],
  F05: ["Me incomoda que el Gobierno restrinja decisiones privadas de adultos que no perjudican directamente a nadie.", "Me incomoda que las leyes ignoren por completo los valores morales compartidos."],
  F06: ["Me preocupa que una persona embarazada no pueda decidir por sí misma sobre un aborto.", "Me preocupa un acceso amplio al aborto, porque creo que la vida antes del nacimiento merece más protección."],
  F07: ["En una crisis, me preocupa que el Gobierno use más poder del necesario.", "Me preocupa que la policía no tenga facultades suficientes para proteger a la gente durante una crisis grave."],
  F08: ["Me preocupa que un Gobierno presione a jueces independientes por revisar sus leyes.", "Me preocupa que tribunales independientes anulen una y otra vez leyes aprobadas por un parlamento elegido."],
  F09: ["Me incomoda que problemas comunes sigan sin resolverse porque los países rechazan acuerdos obligatorios.", "Me preocupa que los tratados internacionales impongan decisiones importantes a mi país."],
  F10: ["Siento que una persona nacionalizada pertenece al país tanto como alguien que tiene la ciudadanía desde su nacimiento.", "Que mi familia lleve mucho tiempo viviendo en el país influye en mi sentimiento de pertenencia a la nación."],
  F11: ["Me incomoda que la política se presente como una lucha entre gente buena y políticos malos.", "A menudo siento que la política enfrenta a ciudadanos honestos con políticos deshonestos."],
  F12: ["Me preocupa que se destruyan espacios naturales valiosos para impulsar el crecimiento económico.", "Me preocupa la pérdida de empleos y de nivel de vida cuando los límites ambientales frenan mucho el crecimiento económico."],
  F13: ["Me incomoda que se usen creencias morales religiosas para justificar leyes para personas que no comparten esa fe.", "Me incomoda que se descarten argumentos religiosos en un debate político solo por ser religiosos."],
  F14: ["Me da seguridad que el Estado garantice escuelas y hospitales de calidad similar en todas las regiones.", "Me da confianza que las autoridades locales competentes conserven el control, en lugar de pasar las decisiones al Gobierno regional o nacional."],
  A01: ["Si un hospital local estuviera a punto de cerrar, apoyaría fondos públicos para mantenerlo abierto.", "Si un servicio local esencial, como un hospital, pudiera funcionar bien de las dos maneras, preferiría un proveedor privado a más financiación pública."],
  A02: ["Aceptaría un aumento moderado de mis propios impuestos si eso redujera de forma importante las diferencias de ingresos muy grandes.", "Votaría por impuestos más bajos, aunque quedaran menos fondos para las familias de bajos ingresos."],
  A03: ["Apoyaría que los trabajadores compraran una parte de una gran empresa.", "Si una gran empresa funcionara bien, la dejaría sobre todo en manos privadas y no daría una parte grande a trabajadores o al Estado."],
  A04: ["Si una ley antigua ya no coincidiera con lo que la mayoría acepta hoy, apoyaría cambiarla bastante pronto.", "Cambiaría las leyes sobre la familia solo cuando el cambio tuviera un apoyo amplio y duradero."],
  A05: ["Si adultos eligieran libremente una relación o estilo de vida que desapruebo, me opondría a prohibirlo por ley, salvo que dañara directamente a alguien.", "Apoyaría límites legales a relaciones consentidas si fueran contrarias a valores morales compartidos."],
  A06: ["En una votación apoyaría un acceso legal más amplio al aborto.", "Si la ley del aborto se decidiera en una votación, apoyaría límites legales más estrictos."],
  A07: ["Durante disturbios violentos mantendría límites legales estrictos al poder policial.", "Durante disturbios graves, permitiría poderes más amplios y temporales al Gobierno, aunque se redujeran algunas protecciones legales."],
  A08: ["Si un tribunal independiente anulara una ley que apoyo, respetaría igualmente su decisión.", "Si los tribunales anularan repetidamente leyes aprobadas por una mayoría parlamentaria, apoyaría limitar algunas de sus facultades."],
  A09: ["Cumpliría un acuerdo climático común aunque limitara algunas decisiones de mi país.", "Mantendría las decisiones en manos de mi país, aunque eso hiciera menos eficaz una respuesta internacional conjunta."],
  A10: ["Apoyaría que las personas que obtuvieron la ciudadanía más tarde puedan ocupar los mismos altos cargos electos que quienes son ciudadanos desde el nacimiento.", "Para determinados cargos políticos de máximo nivel, daría preferencia a ciudadanos que lo sean desde su nacimiento."],
  A11: ["Desconfiaría de un candidato que afirma ser el único representante del pueblo auténtico.", "Podría votar a un candidato que diga que solo él representa al verdadero pueblo."],
  A12: ["Apoyaría límites ambientales obligatorios por ley, aunque frenaran un poco el crecimiento económico.", "Evitaría reglas que suben los precios y confiaría más en tecnología limpia para proteger el ambiente."],
  A13: ["Rechazaría leyes para todos que se justificaran únicamente con argumentos religiosos.", "Aceptaría que los cargos públicos den razones morales religiosas como justificación legítima de leyes que se aplican a todos."],
  A14: ["Si servicios como las escuelas tuvieran una calidad muy distinta según la zona, apoyaría normas nacionales o regionales, aunque se redujera el control local.", "Si un municipio gestionara bien sus escuelas, preferiría que el Gobierno regional o nacional interviniera poco."],
};

const fr: Record<string, Pair> = {
  T01: ["L'État doit garantir à tous l'accès à l'école et aux soins médicaux.", "Pour les services essentiels comme l'éducation et la santé, l'État doit laisser davantage de place aux prestataires privés et au choix personnel."],
  T02: ["L'État doit utiliser les impôts et les aides sociales pour réduire les écarts de revenus très importants.", "L'État doit accepter d'importants écarts de revenus plutôt que chercher à les corriger par des impôts plus élevés."],
  T03: ["Les salariés, les coopératives et l'État doivent détenir une plus grande part des grandes entreprises.", "Les grandes entreprises doivent surtout appartenir à des propriétaires privés, avec des droits des salariés protégés par la loi."],
  T04: ["Les lois et les règles publiques doivent évoluer assez vite lorsqu'une nouvelle façon de penser ou de vivre obtient un soutien large et durable.", "Les lois établies ne doivent changer qu'après un long débat, même si beaucoup soutiennent déjà la réforme."],
  T05: ["Les relations consenties entre adultes doivent être légales même si d'autres les jugent immorales.", "La loi peut limiter certains comportements privés d'adultes consentants pour défendre des valeurs morales communes, même sans tort direct pour autrui."],
  T06: ["L'avortement doit en général rester légal, car la personne enceinte doit prendre la décision principale.", "L'avortement doit être davantage limité par la loi pour protéger la vie avant la naissance."],
  T07: ["Les libertés ne doivent être limitées que face à un danger précis et grave.", "L'État peut restreindre certaines libertés avant tout dommage lorsqu'il existe un risque réel de troubles graves."],
  T08: ["Gagner une élection ne doit pas supprimer les contre-pouvoirs indépendants, comme les tribunaux, la Constitution et les droits de l'opposition.", "Un gouvernement élu doit pouvoir appliquer son programme même si des tribunaux indépendants expriment des objections."],
  T09: ["Les pays doivent respecter des règles internationales obligatoires quand un problème touche plusieurs pays.", "Chaque pays doit garder le dernier mot sur ses décisions, même si cela rend l'action commune face aux problèmes partagés moins efficace."],
  T10: ["Une personne devenue citoyenne plus tard peut appartenir à la nation tout autant qu'une personne citoyenne de naissance.", "Être citoyen depuis la naissance doit davantage compter dans l'appartenance au pays."],
  T11: ["En politique, les gens peuvent être en désaccord ; personne ne parle au nom de tous.", "La plupart des citoyens partagent une même volonté politique que les élus devraient appliquer."],
  T12: ["Quand l'environnement et la croissance économique s'opposent clairement, protéger la nature doit parfois passer avant, même si la croissance est plus lente.", "La croissance économique doit rester prioritaire et la protection de l'environnement doit la ralentir le moins possible."],
  T13: ["L'État ne doit pas justifier des lois pour tous uniquement par des convictions religieuses.", "Des principes moraux religieux peuvent être une raison légitime de faire des lois, même si certains citoyens ne partagent pas cette religion."],
  T14: ["L'État ou les régions doivent assurer les services importants, comme l'école et la santé, si cela garantit le mieux l'égalité d'accès et de normes.", "Les communes doivent pouvoir organiser leurs écoles et hôpitaux quand elles en ont les moyens."],
  F01: ["Cela m'inquiète que des personnes se passent de services essentiels parce que l'accès dépend trop de ce qu'elles peuvent payer en privé.", "Je suis inquiet quand les services essentiels offrent trop peu de choix parce qu'ils sont gérés par l'État."],
  F02: ["Je trouve injustes les très grands écarts de revenus, même si les réduire demande davantage d'impôts.", "Les impôts élevés m'inquiètent, même quand ils visent à réduire des écarts de revenus très importants."],
  F03: ["Je trouve juste que les salariés ou la collectivité possèdent une part importante des grandes entreprises.", "Je trouve juste que les investisseurs privés gardent la majorité des actions, avec des droits garantis aux salariés."],
  F04: ["Cela me dérange de voir des lois dépassées rester en place malgré un large soutien au changement.", "Je suis mal à l'aise quand de vieilles règles changent avant que la majorité accepte une nouvelle façon de penser ou de vivre."],
  F05: ["Cela me met mal à l'aise que l'État limite des choix privés d'adultes qui ne nuisent directement à personne.", "Cela me dérange que la loi ignore complètement les valeurs morales partagées."],
  F06: ["Je m'inquiète lorsqu'une personne enceinte ne peut pas décider elle-même de recourir à un avortement.", "Un large accès à l'avortement m'inquiète, car je crois que la vie avant la naissance mérite une protection plus forte."],
  F07: ["En temps de crise, cela m'inquiète que l'État utilise plus de pouvoir que nécessaire.", "Je m'inquiète quand la police manque de moyens légaux pour protéger les personnes pendant une crise grave."],
  F08: ["Je m'inquiète lorsqu'un gouvernement fait pression sur des juges indépendants qui examinent ses lois.", "Cela m'inquiète que des tribunaux indépendants annulent à plusieurs reprises des lois votées par un parlement élu."],
  F09: ["Cela me met mal à l'aise que des problèmes communs restent sans solution parce que des pays refusent des accords obligatoires.", "Je m'inquiète quand des traités internationaux imposent des décisions importantes à mon pays."],
  F10: ["Pour moi, une personne naturalisée appartient autant au pays qu'une personne qui en a la nationalité depuis sa naissance.", "Le fait que ma famille vive depuis longtemps dans le pays compte dans mon sentiment d'appartenir à la nation."],
  F11: ["Cela me dérange quand la politique est présentée comme un combat entre bons citoyens et mauvais élus.", "J'ai souvent l'impression que la politique oppose des citoyens honnêtes à des responsables malhonnêtes."],
  F12: ["Je m'inquiète quand des espaces naturels précieux sont détruits pour soutenir la croissance économique.", "La perte d'emplois et de niveau de vie m'inquiète quand les limites environnementales ralentissent fortement la croissance économique."],
  F13: ["Je suis mal à l'aise quand des principes moraux religieux servent à justifier des lois pour des personnes qui ne partagent pas cette foi.", "Cela me dérange que les arguments religieux soient écartés d'un débat uniquement parce qu'ils sont religieux."],
  F14: ["Je suis rassuré quand l'État garantit des écoles et des hôpitaux de qualité comparable partout.", "Je me sens en confiance quand des autorités locales compétentes gardent le contrôle plutôt que la région ou l'État."],
  A01: ["Si un hôpital local risquait de fermer, je soutiendrais une aide publique pour le maintenir ouvert.", "Si un service local comme un hôpital fonctionnait de façon fiable dans les deux cas, je préférerais un prestataire privé à plus d'argent public."],
  A02: ["J'accepterais une hausse modérée de mes propres impôts si elle réduisait nettement des écarts de revenus très importants.", "Je voterais pour des impôts plus bas, même si cela réduisait les aides aux familles modestes."],
  A03: ["Je soutiendrais des salariés souhaitant acquérir une part d'une grande entreprise.", "Si une grande entreprise marchait bien, je la laisserais surtout à des propriétaires privés, sans donner une grosse part aux salariés ou à l'État."],
  A04: ["Si une ancienne loi ne correspondait plus à ce que la plupart des gens acceptent aujourd'hui, je soutiendrais de la changer assez vite.", "Je ne changerais les lois sur la famille qu'après un soutien large et durable au changement."],
  A05: ["Si des adultes choisissaient un mode de vie ou une relation que je désapprouve, je m'opposerais à une interdiction légale, sauf préjudice pour autrui.", "Je soutiendrais des restrictions légales à des relations consenties si elles heurtaient des valeurs morales communes."],
  A06: ["Lors d'un vote, je soutiendrais un accès légal plus large à l'avortement.", "Si la loi sur l'avortement était soumise à un vote, je soutiendrais des limites légales plus strictes."],
  A07: ["Pendant des violences, je maintiendrais des limites légales strictes au pouvoir de la police.", "En cas de troubles graves, j'accorderais des pouvoirs plus larges et temporaires à l'État, même si certaines protections juridiques étaient réduites."],
  A08: ["Si un tribunal indépendant annulait une loi que je soutiens, je respecterais malgré tout sa décision.", "Si les tribunaux annulaient souvent des lois votées par une majorité parlementaire, je soutiendrais une limitation de certaines de leurs compétences."],
  A09: ["Je respecterais un accord commun sur le climat même s'il limitait certaines décisions de mon pays.", "Je garderais les décisions au niveau national, même si cela rendait une réponse internationale commune moins efficace."],
  A10: ["Je soutiendrais que les personnes devenues citoyennes plus tard puissent occuper les mêmes hautes fonctions électives que les citoyens de naissance.", "Je réserverais certains des plus hauts mandats électifs aux citoyens de naissance."],
  A11: ["Je me méfierais d'un candidat qui prétend être le seul à représenter le vrai peuple.", "Je pourrais voter pour un candidat affirmant être le seul à parler au nom du vrai peuple."],
  A12: ["Je soutiendrais des limites environnementales obligatoires par la loi, même si elles ralentissaient un peu la croissance économique.", "J'éviterais les règles qui augmentent les prix et compterais davantage sur les technologies propres."],
  A13: ["Je refuserais des lois pour tous qui seraient justifiées uniquement par des arguments religieux.", "J'accepterais que des responsables publics invoquent des principes moraux religieux comme raison légitime de lois qui s'appliquent à tous."],
  A14: ["Si la qualité des écoles variait beaucoup selon les endroits, je soutiendrais des normes nationales ou régionales, même si le contrôle local diminuait.", "Si une commune gérait bien ses écoles, je préférerais limiter l'intervention des autorités régionales et nationales."],
};

export function romanceBeliefStatement(locale: 'es' | 'fr', sourceItemId: string, polarity: BeliefPolarity) {
  const pair = (locale === 'es' ? es : fr)[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const spanishBeliefPairCount = Object.keys(es).length;
export const frenchBeliefPairCount = Object.keys(fr).length;
