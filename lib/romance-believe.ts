import type { BeliefPolarity } from './belief-statements';

export const SPANISH_BELIEVE_VERSION = 'es-believe-2026.10-editorial-v2' as const;
export const FRENCH_BELIEVE_VERSION = 'fr-believe-2026.10-editorial-v2' as const;

type Pair = readonly [string, string];

const es: Record<string, Pair> = {
  T01: ["El Estado debe garantizar que todos tengan acceso a escuelas y atención médica.", "En educación y atención médica, el Estado debe dejar más espacio a los proveedores privados."],
  T02: ["El Estado debe usar impuestos y ayudas sociales para reducir grandes diferencias de ingresos.", "El Estado debe aceptar grandes diferencias de ingresos en vez de intentar corregirlas con impuestos más altos."],
  T03: ["Los trabajadores, las cooperativas y el Estado deben tener una mayor participación en las grandes empresas.", "Las grandes empresas deben pertenecer principalmente a propietarios privados, con derechos laborales protegidos por ley."],
  T04: ["Las leyes deben adaptarse pronto cuando un cambio social cuenta con amplio apoyo.", "Las leyes consolidadas deben cambiar solo tras un debate largo, aunque muchas personas ya apoyen la reforma."],
  T05: ["Las relaciones consentidas entre adultos deben ser legales aunque otras personas las consideren inmorales.", "El Estado puede limitar legalmente ciertas relaciones consentidas entre adultos por motivos morales."],
  T06: ['El aborto debe ser legal en general, porque la persona embarazada debe tomar la decisión principal.', 'El aborto debe tener límites legales más estrictos para proteger la vida antes del nacimiento.'],
  T07: ["Solo debe limitarse la libertad ante un peligro concreto y grave.", "Ante el riesgo de disturbios graves, el Estado puede limitar algunas libertades de forma preventiva."],
  T08: ["Los tribunales independientes deben poder comprobar si las leyes del Gobierno respetan la Constitución.", "Un Gobierno elegido debe poder aplicar sus propuestas aunque los tribunales independientes tengan objeciones."],
  T09: ['Los países deben cumplir reglas internacionales obligatorias cuando un problema afecta a varios países.', 'Cada país debe tener la última palabra, aunque eso debilite las soluciones comunes.'],
  T10: ["Ser ciudadano nacionalizado o serlo desde el nacimiento no debe cambiar la pertenencia al país.", "Tener la ciudadanía desde el nacimiento debe contar más en el sentimiento de pertenencia al país."],
  T11: ["Los desacuerdos políticos suelen surgir de intereses legítimos distintos.", "Los grupos con buenos contactos suelen influir más en las decisiones políticas que los votantes comunes."],
  T12: ['Proteger la naturaleza debe ser a veces más importante que el crecimiento económico.', 'El crecimiento económico debe tener prioridad y la protección ambiental debe frenarlo lo menos posible.'],
  T13: ["El Estado no debe justificar leyes para todos únicamente con creencias religiosas.", "Las creencias religiosas pueden ser una razón legítima para aprobar leyes, aunque no todos las compartan."],
  T14: ["El Gobierno nacional o regional debe fijar unas normas mínimas comunes para escuelas y hospitales.", "Los municipios deben poder organizar sus escuelas y hospitales cuando sean capaces de hacerlo bien."],
  F01: ["Me preocupa que haya personas que no puedan recibir atención médica porque no pueden pagarla.", "Me preocupa que la gente tenga pocas opciones cuando el Estado controla los servicios esenciales."],
  F02: ["Me parecen injustas las grandes diferencias de ingresos, incluso si reducirlas exige subir algunos impuestos.", "Me preocupa que se suban mucho los impuestos para reducir las diferencias de ingresos."],
  F03: ["Me parece justo que los trabajadores tengan parte de la propiedad de las grandes empresas.", "Me parece justo que los inversores privados conserven la mayoría de las acciones, con derechos laborales protegidos."],
  F04: ["Me molesta que sigan vigentes leyes anticuadas cuando una amplia mayoría quiere cambiarlas.", "Me preocupa que se cambien leyes consolidadas cuando mucha gente aún rechaza las nuevas normas."],
  F05: ["Me incomoda que se prohíban decisiones privadas de adultos que no perjudican a nadie.", "Me incomoda que las leyes ignoren por completo los valores morales compartidos."],
  F06: ["Me preocupa que una persona embarazada no pueda decidir por sí misma sobre un aborto.", "Me preocupa que la ley no proteja suficientemente la vida antes del nacimiento."],
  F07: ["Me preocupa que el Gobierno limite con demasiada facilidad las libertades durante una crisis.", "Me preocupa que la policía no tenga facultades suficientes para proteger a la gente durante una crisis grave."],
  F08: ["Me preocupa que un Gobierno presione a jueces independientes por revisar sus leyes.", "Me preocupa que tribunales independientes anulen leyes aprobadas por una mayoría parlamentaria elegida."],
  F09: ["Me frustra que los países no afronten problemas comunes porque rechazan acuerdos vinculantes.", "Me preocupa que los tratados internacionales impongan decisiones importantes a mi país."],
  F10: ["Siento que una persona nacionalizada pertenece al país tanto como alguien que tiene la ciudadanía desde su nacimiento.", "Para mí, haber tenido la ciudadanía desde el nacimiento influye en el sentimiento de pertenencia."],
  F11: ["Cuando la política me decepciona, pienso en los compromisos difíciles entre intereses diferentes.", "Cuando la política me decepciona, sospecho que se escucha más a los grupos influyentes que a los votantes comunes."],
  F12: ["Me preocupa que se destruyan espacios naturales valiosos para impulsar el crecimiento económico.", "Me preocupa que normas ambientales estrictas pongan en riesgo empleos e ingresos."],
  F13: ["Me incomoda que un político justifique leyes para todos principalmente con su propia religión.", "Me incomoda que se descarten argumentos religiosos en un debate político solo por ser religiosos."],
  F14: ["Me da seguridad que el Estado garantice escuelas y hospitales de calidad similar en todas las regiones.", "Me da seguridad que los municipios decidan cómo gestionar sus escuelas y hospitales."],
  A01: ["Si un hospital local estuviera a punto de cerrar, apoyaría fondos públicos para mantenerlo abierto.", "Si un hospital local estuviera a punto de cerrar, buscaría primero un operador privado."],
  A02: ["Aceptaría impuestos algo más altos para ayudar directamente a familias con pocos ingresos.", "Votaría por impuestos más bajos, aunque quedaran menos fondos para las familias de bajos ingresos."],
  A03: ["Apoyaría que los trabajadores compraran una parte de una gran empresa.", "Si una gran empresa funcionara bien, mantendría la propiedad principalmente en manos de inversores privados."],
  A04: ["Apoyaría reconocer legalmente nuevas formas de familia cuando una clara mayoría social esté de acuerdo.", "Cambiaría las leyes sobre la familia solo cuando el cambio tuviera un apoyo amplio y duradero."],
  A05: ["Aunque desaprobara una relación entre adultos, no apoyaría prohibirla si no perjudica a nadie.", "Apoyaría límites legales a relaciones consentidas si fueran contrarias a valores morales compartidos."],
  A06: ['En una votación apoyaría un acceso legal más amplio al aborto.', 'En una votación apoyaría límites legales más estrictos al aborto.'],
  A07: ['Durante disturbios violentos mantendría límites legales estrictos al poder policial.', 'Durante disturbios violentos daría a la policía más poder durante un tiempo breve.'],
  A08: ["Si un tribunal independiente anulara una ley que apoyo, respetaría su decisión.", "Si los tribunales anularan repetidamente leyes aprobadas por una mayoría parlamentaria, apoyaría limitar algunas de sus facultades."],
  A09: ['Cumpliría un acuerdo climático común aunque limitara algunas decisiones de mi país.', 'Mantendría la libertad de decisión de mi país aunque debilitara el plan climático común.'],
  A10: ["Las personas nacionalizadas deben tener las mismas oportunidades para ocupar altos cargos electos que los ciudadanos desde su nacimiento.", "Para determinados cargos políticos de máximo nivel, daría preferencia a ciudadanos que lo sean desde su nacimiento."],
  A11: ["Prefiero candidatos que explican abiertamente los compromisos políticos, aunque su mensaje resulte menos popular.", "Prefiero candidatos que reduzcan la influencia de los grupos bien conectados y den más voz a los votantes."],
  A12: ['Aceptaría precios algo más altos si un producto causa un daño ambiental grave.', 'Evitaría reglas que suben los precios y confiaría más en tecnología limpia para proteger el ambiente.'],
  A13: ["Rechazaría leyes para todos que se justificaran únicamente con argumentos religiosos.", "Apoyaría leyes cuyos defensores también aportaran motivos religiosos para justificarlas."],
  A14: ["Si la calidad de las escuelas variara mucho, apoyaría normas mínimas comunes fijadas por el Gobierno regional.", "Si un municipio gestionara bien sus escuelas, preferiría que el Gobierno regional o nacional interviniera poco."],
};

const fr: Record<string, Pair> = {
  T01: ["L'État doit garantir à tous l'accès à l'école et aux soins médicaux.", "L'État doit laisser davantage de place aux prestataires privés dans l'éducation et la santé."],
  T02: ["L'État doit utiliser les impôts et les aides sociales pour réduire les grands écarts de revenus.", "L'État doit accepter d'importants écarts de revenus plutôt que chercher à les corriger par des impôts plus élevés."],
  T03: ["Les salariés, les coopératives et l'État doivent détenir une plus grande part des grandes entreprises.", "Les grandes entreprises doivent surtout appartenir à des propriétaires privés, avec des droits des salariés protégés par la loi."],
  T04: ["Les lois doivent évoluer rapidement lorsqu'un changement social bénéficie d'un large soutien.", "Les lois établies ne doivent changer qu'après un long débat, même si beaucoup soutiennent déjà la réforme."],
  T05: ["Les relations consenties entre adultes doivent être légales même si d'autres les jugent immorales.", "L'État peut limiter certaines relations consenties entre adultes pour des raisons morales."],
  T06: ["L'avortement doit rester légal en général, car la personne enceinte doit prendre la décision principale.", "L'avortement doit être davantage limité par la loi pour protéger la vie avant la naissance."],
  T07: ["Les libertés ne doivent être limitées que face à un danger précis et grave.", "Face à un risque de troubles graves, l'État peut restreindre certaines libertés de façon préventive."],
  T08: ["Les tribunaux indépendants doivent pouvoir vérifier que les lois du gouvernement respectent la Constitution.", "Un gouvernement élu doit pouvoir appliquer son programme même si des tribunaux indépendants expriment des objections."],
  T09: ['Les pays doivent respecter des règles internationales obligatoires quand un problème touche plusieurs pays.', 'Chaque pays doit garder le dernier mot, même si cela affaiblit les solutions communes.'],
  T10: ["Être naturalisé ou citoyen depuis la naissance ne doit rien changer au sentiment d'appartenance nationale.", "Être citoyen depuis la naissance doit davantage compter dans l'appartenance au pays."],
  T11: ["Les désaccords politiques viennent souvent de différences légitimes entre plusieurs intérêts.", "Les groupes bien introduits ont souvent plus d'influence politique que les électeurs ordinaires."],
  T12: ['Protéger la nature doit parfois être plus important que la croissance économique.', "La croissance économique doit rester prioritaire et la protection de l'environnement doit la ralentir le moins possible."],
  T13: ["L'État ne doit pas justifier des lois pour tous uniquement par des convictions religieuses.", "Les convictions religieuses peuvent légitimement servir à justifier des lois, même si tous ne les partagent pas."],
  T14: ["L'État ou les régions doivent fixer des normes minimales communes pour les écoles et les hôpitaux.", "Les communes doivent pouvoir organiser leurs écoles et hôpitaux quand elles en ont les moyens."],
  F01: ["Je suis inquiet quand des personnes renoncent à des soins médicaux parce qu'elles ne peuvent pas les payer.", "Je suis inquiet quand les services essentiels offrent trop peu de choix parce qu'ils sont gérés par l'État."],
  F02: ["Je trouve injustes les très grands écarts de revenus, même si les réduire demande davantage d'impôts.", "Les fortes hausses d'impôts destinées à réduire les écarts de revenus m'inquiètent."],
  F03: ["Je trouve juste que les salariés possèdent une part des grandes entreprises où ils travaillent.", "Je trouve juste que les investisseurs privés gardent la majorité des actions, avec des droits garantis aux salariés."],
  F04: ["Cela me dérange de voir des lois dépassées rester en place malgré un large soutien au changement.", "Cela m'inquiète de voir des lois établies modifiées alors que beaucoup de personnes refusent encore les nouvelles règles."],
  F05: ["Cela me dérange que la loi interdise des choix privés d'adultes qui ne nuisent à personne.", "Cela me dérange que la loi ignore complètement les valeurs morales partagées."],
  F06: ["Je m'inquiète lorsqu'une personne enceinte ne peut pas décider elle-même de recourir à un avortement.", "Je m'inquiète lorsque la loi ne protège pas suffisamment la vie avant la naissance."],
  F07: ["Je m'inquiète quand l'État limite trop facilement les libertés pendant une crise.", "Je m'inquiète quand la police manque de moyens légaux pour protéger les personnes pendant une crise grave."],
  F08: ["Je m'inquiète lorsqu'un gouvernement fait pression sur des juges indépendants qui examinent ses lois.", "Je m'inquiète lorsque des tribunaux indépendants annulent des lois votées par une majorité parlementaire élue."],
  F09: ["Cela me frustre que des pays refusent des accords contraignants et laissent des problèmes communs sans solution.", "Je m'inquiète quand des traités internationaux imposent des décisions importantes à mon pays."],
  F10: ["Pour moi, une personne naturalisée appartient autant au pays qu'une personne qui en a la nationalité depuis sa naissance.", "À mes yeux, avoir la nationalité depuis la naissance compte dans le sentiment d'appartenance au pays."],
  F11: ["Quand la politique me déçoit, je pense d'abord aux compromis difficiles entre des intérêts différents.", "Quand la politique me déçoit, je soupçonne que les groupes influents sont davantage écoutés que les électeurs ordinaires."],
  F12: ["Je m'inquiète quand des espaces naturels précieux sont détruits pour soutenir la croissance économique.", "Je m'inquiète lorsque des règles environnementales strictes menacent l'emploi et les revenus."],
  F13: ["Cela me dérange que des responsables politiques justifient des lois pour tous principalement par leur propre religion.", "Cela me dérange que les arguments religieux soient écartés d'un débat uniquement parce qu'ils sont religieux."],
  F14: ["Je suis rassuré quand l'État garantit des écoles et des hôpitaux de qualité comparable partout.", "Je suis rassuré quand les communes décident elles-mêmes de l'organisation de leurs écoles et hôpitaux."],
  A01: ["Si un hôpital local risquait de fermer, je soutiendrais une aide publique pour le maintenir ouvert.", "Si un hôpital local risquait de fermer, je chercherais d'abord un opérateur privé."],
  A02: ["J'accepterais des impôts légèrement plus élevés pour aider directement les familles aux faibles revenus.", "Je voterais pour des impôts plus bas, même si cela réduisait les aides aux familles modestes."],
  A03: ["Je soutiendrais des salariés souhaitant acquérir une part d'une grande entreprise.", "Si une grande entreprise fonctionnait bien, je laisserais sa propriété principalement aux investisseurs privés."],
  A04: ["Je soutiendrais une reconnaissance légale de nouvelles formes de famille dès qu'une nette majorité y est favorable.", "Je ne changerais les lois sur la famille qu'après un soutien large et durable au changement."],
  A05: ["Même si je désapprouvais une relation entre adultes, je refuserais de l'interdire si elle ne nuisait à personne.", "Je soutiendrais des restrictions légales à des relations consenties si elles heurtaient des valeurs morales communes."],
  A06: ["Lors d'un vote, je soutiendrais un accès légal plus large à l'avortement.", "Lors d'un vote, je soutiendrais des limites légales plus strictes à l'avortement."],
  A07: ["Pendant des violences, je maintiendrais des limites légales strictes au pouvoir de la police.", 'Pendant des violences, je donnerais davantage de pouvoir à la police pour une courte période.'],
  A08: ["Si un tribunal indépendant annulait une loi que je soutiens, je respecterais malgré tout sa décision.", "Si les tribunaux annulaient souvent des lois votées par une majorité parlementaire, je soutiendrais une limitation de certaines de leurs compétences."],
  A09: ["Je respecterais un accord commun sur le climat même s'il limitait certaines décisions de mon pays.", 'Je garderais la liberté de décision de mon pays même si cela affaiblissait le plan commun pour le climat.'],
  A10: ["Les citoyens naturalisés doivent pouvoir accéder aux mêmes hautes fonctions électives que les citoyens de naissance.", "Je réserverais certains des plus hauts mandats électifs aux citoyens de naissance."],
  A11: ["Je préfère les candidats qui expliquent ouvertement les compromis politiques, même si leur message séduit moins.", "Je préfère les candidats qui réduisent l'influence des groupes bien introduits et donnent plus de poids aux électeurs."],
  A12: ["J'accepterais des prix un peu plus élevés si un produit causait de graves dégâts à l'environnement.", "J'éviterais les règles qui augmentent les prix et compterais davantage sur les technologies propres."],
  A13: ["Je refuserais des lois pour tous qui seraient justifiées uniquement par des arguments religieux.", "Je soutiendrais des lois que leurs défenseurs justifient aussi par des convictions religieuses."],
  A14: ["Si la qualité des écoles variait beaucoup, je soutiendrais des normes minimales communes fixées au niveau régional.", "Si une commune gérait bien ses écoles, je préférerais limiter l'intervention des autorités régionales et nationales."],
};

export function romanceBeliefStatement(locale: 'es' | 'fr', sourceItemId: string, polarity: BeliefPolarity) {
  const pair = (locale === 'es' ? es : fr)[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const spanishBeliefPairCount = Object.keys(es).length;
export const frenchBeliefPairCount = Object.keys(fr).length;
