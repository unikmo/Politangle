import type { BeliefPolarity } from './belief-statements';
import { schoolJuniorBeliefStatement } from './school-junior-believe-i18n';

export const SPANISH_BELIEVE_VERSION = 'es-believe-2026.09-candidate-v1' as const;
export const FRENCH_BELIEVE_VERSION = 'fr-believe-2026.09-candidate-v1' as const;

type Pair = readonly [string, string];

const es: Record<string, Pair> = {
  T01: ['El Estado debe garantizar que todos puedan acceder a servicios esenciales como la sanidad y la educación.', 'El Estado debe intervenir menos y dejar más espacio a opciones privadas en los servicios esenciales.'],
  T02: ['El Estado debe usar impuestos y ayudas para reducir las grandes diferencias entre ricos y pobres.', 'El Estado debe cambiar menos las diferencias de ingresos, aunque la distancia entre ricos y pobres siga siendo grande.'],
  T03: ['Los trabajadores, las cooperativas o el Estado deben poseer más partes de las grandes empresas.', 'Las grandes empresas deben pertenecer sobre todo a propietarios privados, con leyes que protejan a los trabajadores.'],
  T04: ['Las normas deben cambiar pronto cuando mucha gente apoya una nueva forma de vivir.', 'Las normas antiguas solo deben cambiar cuando la nueva idea tenga un apoyo amplio y duradero.'],
  T05: ['Los adultos deben poder tomar decisiones privadas libremente si no hacen daño a nadie.', 'Algunas decisiones privadas pueden limitarse para proteger valores morales compartidos.'],
  T06: ['El aborto debe ser legal en general, porque la persona embarazada debe tomar la decisión principal.', 'El aborto debe tener límites legales más estrictos para proteger la vida antes del nacimiento.'],
  T07: ['El Estado solo debe limitar la libertad cuando exista un peligro claro y grave.', 'El Estado puede limitar algunas libertades antes si hay un riesgo creíble de graves disturbios.'],
  T08: ['Incluso un gobierno elegido debe estar controlado por tribunales, leyes, oposición y medios libres.', 'Un gobierno elegido debe poder aplicar su programa aunque tribunales u otras instituciones lo frenen.'],
  T09: ['Los países deben cumplir reglas internacionales obligatorias cuando un problema afecta a varios países.', 'Cada país debe tener la última palabra, aunque eso debilite las soluciones comunes.'],
  T10: ['Una persona nacionalizada puede pertenecer al país igual que alguien ciudadano desde su nacimiento.', 'Ser ciudadano desde el nacimiento debe contar más al decidir quién pertenece plenamente al país.'],
  T11: ['En política suele haber varios grupos con objetivos reales y distintos.', 'La política suele ser una lucha entre la gente común y una élite poderosa que la ignora.'],
  T12: ['Proteger la naturaleza debe ser a veces más importante que el crecimiento económico.', 'El crecimiento económico debe tener prioridad y la protección ambiental debe frenarlo lo menos posible.'],
  T13: ['La religión no debe usarse para justificar leyes que se aplican a personas de cualquier religión.', 'Los valores religiosos pueden justificar leyes aunque no todos compartan esa religión.'],
  T14: ['El gobierno nacional o regional debe gestionar servicios importantes si así garantiza el mismo acceso para todos.', 'Las tareas importantes deben resolverse lo más cerca posible y subir de nivel solo cuando sea necesario.'],
  F01: ['Me preocupa más que algunas personas no puedan pagar servicios esenciales.', 'Me preocupa más que los servicios públicos reduzcan la elección y la independencia.'],
  F02: ['Me preocupan más las grandes diferencias de ingresos que los impuestos usados para reducirlas.', 'Me preocupan más los impuestos altos que las grandes diferencias de ingresos.'],
  F03: ['Me parece más justo que trabajadores o entidades públicas posean más de las grandes empresas.', 'Me parece más justo que inversores privados conserven la mayor parte, con leyes que protejan a los trabajadores.'],
  F04: ['Me incomoda más que las normas públicas se queden atrás frente a un cambio ampliamente apoyado.', 'Me incomoda más que se cambien normas antiguas antes de que la nueva idea sea ampliamente aceptada.'],
  F05: ['Me incomoda más que el Estado limite decisiones privadas de adultos que no hacen daño.', 'Me incomoda más que los valores morales compartidos no cuenten en las leyes.'],
  F06: ['Sobre el aborto, me preocupa más quitar la decisión a la persona embarazada.', 'Sobre el aborto, me preocupa más no proteger suficientemente la vida antes del nacimiento.'],
  F07: ['En una crisis me preocupa más que el Estado use demasiado poder.', 'En una crisis me preocupa más que las autoridades no tengan poder suficiente para mantener la seguridad.'],
  F08: ['Me preocupa más que una mayoría elegida debilite los tribunales u otros controles.', 'Me preocupa más que instituciones no elegidas bloqueen repetidamente a un gobierno elegido.'],
  F09: ['Me incomoda más que los países no resuelvan problemas comunes porque rechazan acuerdos obligatorios.', 'Me incomoda más que los acuerdos internacionales limiten las decisiones de mi país.'],
  F10: ['Las personas nacionalizadas me parecen tan parte del país como los ciudadanos desde el nacimiento.', 'Los ciudadanos desde el nacimiento me parecen más parte del país que las personas nacionalizadas.'],
  F11: ['Cuando falla la política, pienso primero en decisiones difíciles e intereses distintos.', 'Cuando falla la política, pienso primero en una élite poderosa que ignora a la gente común.'],
  F12: ['Si no se puede lograr todo, me preocupa más el daño a la naturaleza y al clima.', 'Si no se puede lograr todo, me preocupan más el empleo y el nivel de vida.'],
  F13: ['Me incomoda más que los valores religiosos determinen leyes para todos.', 'Me incomoda más que una opinión se rechace solo porque es religiosa.'],
  F14: ['Me siento mejor si el gobierno garantiza los mismos estándares en todas partes.', 'Me siento mejor si las familias y comunidades pueden gestionar las tareas por sí mismas.'],
  A01: ['Si una clínica local pudiera cerrar, apoyaría fondos públicos para mantenerla abierta a todos.', 'Si una clínica local pudiera cerrar, buscaría primero un proveedor privado antes que más fondos públicos.'],
  A02: ['Pagaría algo más de impuestos si ayudara a familias con ingresos muy bajos.', 'Elegiría impuestos más bajos aunque quedara menos dinero para ayudar a familias con ingresos muy bajos.'],
  A03: ['En una gran empresa daría a los trabajadores una parte de la propiedad y voz en decisiones importantes.', 'En una gran empresa dejaría la propiedad y las decisiones importantes sobre todo a los inversores privados.'],
  A04: ['Si una vieja norma escolar ya no encajara con la vida de la mayoría, la cambiaría pronto.', 'Mantendría una vieja norma escolar hasta que el cambio tuviera un apoyo amplio y duradero.'],
  A05: ['Aunque desaprobara una decisión privada de adultos, rechazaría prohibirla si no hace daño.', 'Podría apoyar prohibir una decisión privada si va seriamente contra valores compartidos.'],
  A06: ['En una votación apoyaría un acceso legal más amplio al aborto.', 'En una votación apoyaría límites legales más estrictos al aborto.'],
  A07: ['Durante disturbios violentos mantendría límites legales estrictos al poder policial.', 'Durante disturbios violentos daría a la policía más poder durante un tiempo breve.'],
  A08: ['Si un tribunal frenara una política que apoyo, seguiría defendiendo su independencia.', 'Si los tribunales frenaran a menudo lo elegido por los votantes, podría limitar su poder.'],
  A09: ['Cumpliría un acuerdo climático común aunque limitara algunas decisiones de mi país.', 'Mantendría la libertad de decisión de mi país aunque debilitara el plan climático común.'],
  A10: ['Para un empleo público trataría igual a dos ciudadanos igualmente preparados, sin importar dónde nacieron.', 'Para un empleo público preferiría al ciudadano nacido en el país si ambos estuvieran igual de preparados.'],
  A11: ['Desconfiaría de un candidato que culpa de casi todos los problemas a una élite poderosa.', 'Apoyaría a un candidato que promete devolver el poder de una élite a la gente común.'],
  A12: ['Aceptaría precios algo más altos si un producto causa un daño ambiental grave.', 'Evitaría reglas que suben los precios y confiaría más en tecnología limpia para proteger el ambiente.'],
  A13: ['Rechazaría que políticos justifiquen leyes para todos principalmente con su religión.', 'Aceptaría que políticos justifiquen leyes para todos con valores religiosos.'],
  A14: ['Si ambas opciones funcionan, elegiría al gobierno para garantizar los mismos estándares en todas partes.', 'Si ambas opciones funcionan, dejaría la tarea en la comunidad local.'],
};

const fr: Record<string, Pair> = {
  T01: ["L'État doit garantir à tous l'accès aux services essentiels comme la santé et l'éducation.", "L'État doit moins intervenir et laisser plus de place aux solutions privées pour les services essentiels."],
  T02: ["L'État doit utiliser les impôts et les aides pour réduire les grands écarts entre riches et pauvres.", "L'État doit moins corriger les écarts de revenus, même si l'écart entre riches et pauvres reste grand."],
  T03: ["Les salariés, les coopératives ou l'État doivent posséder davantage de parts des grandes entreprises.", 'Les grandes entreprises doivent surtout appartenir à des propriétaires privés, avec des lois protégeant les salariés.'],
  T04: ["Les règles doivent changer assez vite quand beaucoup de personnes soutiennent une nouvelle façon de vivre.", "Les anciennes règles ne doivent changer que lorsque la nouvelle idée reçoit un soutien large et durable."],
  T05: ["Les adultes doivent pouvoir prendre librement des décisions privées si elles ne font de mal à personne.", 'Certaines décisions privées peuvent être limitées pour protéger des valeurs morales communes.'],
  T06: ["L'avortement doit rester légal en général, car la personne enceinte doit prendre la décision principale.", "L'avortement doit être davantage limité par la loi pour protéger la vie avant la naissance."],
  T07: ["L'État ne doit limiter la liberté que face à un danger clair et grave.", "L'État peut limiter certaines libertés plus tôt si de graves troubles sont vraiment probables."],
  T08: ["Même un gouvernement élu doit être contrôlé par les tribunaux, les lois, l'opposition et les médias libres.", "Un gouvernement élu doit pouvoir appliquer son programme même si les tribunaux ou d'autres institutions le freinent."],
  T09: ['Les pays doivent respecter des règles internationales obligatoires quand un problème touche plusieurs pays.', 'Chaque pays doit garder le dernier mot, même si cela affaiblit les solutions communes.'],
  T10: ["Une personne naturalisée peut appartenir au pays autant qu'une personne citoyenne depuis sa naissance.", 'Être citoyen depuis sa naissance doit compter davantage pour décider qui appartient pleinement au pays.'],
  T11: ['En politique, plusieurs groupes ont généralement des objectifs réels et différents.', 'La politique oppose souvent les gens ordinaires à une élite puissante qui les ignore.'],
  T12: ['Protéger la nature doit parfois être plus important que la croissance économique.', "La croissance économique doit rester prioritaire et la protection de l'environnement doit la ralentir le moins possible."],
  T13: ["La religion ne doit pas servir à justifier des lois qui s'appliquent aux personnes de toutes les religions.", 'Les valeurs religieuses peuvent justifier des lois même si tout le monde ne partage pas cette religion.'],
  T14: ["L'État national ou régional doit gérer les services importants si cela garantit le même accès à tous.", "Les tâches importantes doivent être gérées au niveau le plus proche et ne remonter qu'en cas de besoin."],
  F01: ["Je crains davantage que certaines personnes ne puissent pas payer les services essentiels.", "Je crains davantage que les services publics réduisent le choix et l'indépendance."],
  F02: ["Les grands écarts de revenus m'inquiètent plus que les impôts utilisés pour les réduire.", "Les impôts élevés m'inquiètent plus que les grands écarts de revenus."],
  F03: ["Il me semble plus juste que les salariés ou le public possèdent davantage des grandes entreprises.", 'Il me semble plus juste que les investisseurs privés gardent la majorité, avec des lois protégeant les salariés.'],
  F04: ["Je suis plus mal à l'aise quand les règles publiques tardent à suivre un changement largement soutenu.", "Je suis plus mal à l'aise quand les anciennes règles changent avant que la nouvelle idée soit largement acceptée."],
  F05: ["Je suis plus mal à l'aise quand l'État limite des choix privés d'adultes qui ne font de mal à personne.", 'Je suis plus mal à l’aise quand les valeurs morales communes ne comptent pas dans la loi.'],
  F06: ["Sur l'avortement, je crains davantage que la personne enceinte perde son choix.", "Sur l'avortement, je crains davantage que la vie avant la naissance ne soit pas assez protégée."],
  F07: ["Pendant une crise, je crains davantage que l'État utilise trop de pouvoir.", "Pendant une crise, je crains davantage que les autorités manquent de pouvoir pour assurer la sécurité."],
  F08: ["Je crains davantage qu'une majorité élue affaiblisse les tribunaux ou les autres contrôles.", "Je crains davantage que des institutions non élues bloquent souvent un gouvernement élu."],
  F09: ["Je suis plus mal à l'aise quand les pays ne règlent pas les problèmes communs faute d'accords obligatoires.", "Je suis plus mal à l'aise quand les accords internationaux limitent les décisions de mon pays."],
  F10: ["Une personne naturalisée me semble appartenir au pays autant qu'un citoyen depuis sa naissance.", 'Un citoyen depuis sa naissance me semble davantage appartenir au pays qu’une personne naturalisée.'],
  F11: ["Quand la politique échoue, je pense d'abord aux choix difficiles et aux intérêts différents.", "Quand la politique échoue, je pense d'abord à une élite puissante qui ignore les gens ordinaires."],
  F12: ["S'il faut choisir, je crains davantage les dégâts pour la nature et le climat.", "S'il faut choisir, je crains davantage les pertes d'emplois et de niveau de vie."],
  F13: ["Je suis plus mal à l'aise quand les valeurs religieuses déterminent les lois pour tous.", "Je suis plus mal à l'aise quand une opinion est rejetée uniquement parce qu'elle est religieuse."],
  F14: ["Je me sens mieux si l'État garantit les mêmes normes partout.", 'Je me sens mieux si les familles et les communes peuvent gérer elles-mêmes les tâches.'],
  A01: ["Si une clinique locale risquait de fermer, je soutiendrais un financement public pour la garder ouverte à tous.", "Si une clinique locale risquait de fermer, je chercherais d'abord un prestataire privé avant davantage d'argent public."],
  A02: ["Je paierais un peu plus d'impôts si cela aidait les familles aux revenus très faibles.", "Je choisirais des impôts plus bas même s'il restait moins d'argent pour aider les familles aux revenus très faibles."],
  A03: ["Dans une grande entreprise, je donnerais aux salariés une part de propriété et une voix dans les décisions importantes.", 'Dans une grande entreprise, je laisserais surtout la propriété et les décisions importantes aux investisseurs privés.'],
  A04: ["Si une ancienne règle scolaire ne convenait plus à la vie de la majorité, je la changerais assez vite.", "Je garderais une ancienne règle scolaire jusqu'à ce que le changement reçoive un soutien large et durable."],
  A05: ["Même si je désapprouvais un choix privé d'adultes, je refuserais de l'interdire s'il ne fait de mal à personne.", "Je pourrais soutenir l'interdiction d'un choix privé s'il va fortement contre des valeurs communes."],
  A06: ["Lors d'un vote, je soutiendrais un accès légal plus large à l'avortement.", "Lors d'un vote, je soutiendrais des limites légales plus strictes à l'avortement."],
  A07: ["Pendant des violences, je maintiendrais des limites légales strictes au pouvoir de la police.", 'Pendant des violences, je donnerais davantage de pouvoir à la police pour une courte période.'],
  A08: ["Si un tribunal arrêtait une politique que je soutiens, je défendrais quand même son indépendance.", "Si les tribunaux bloquaient souvent le choix des électeurs, je pourrais limiter leur pouvoir."],
  A09: ["Je respecterais un accord commun sur le climat même s'il limitait certaines décisions de mon pays.", 'Je garderais la liberté de décision de mon pays même si cela affaiblissait le plan commun pour le climat.'],
  A10: ["Pour un emploi public, je traiterais de la même façon deux citoyens aussi qualifiés, quel que soit leur lieu de naissance.", "Pour un emploi public, je préférerais le citoyen né dans le pays si les deux étaient aussi qualifiés."],
  A11: ["Je me méfierais d'un candidat qui rend une élite puissante responsable de presque tous les problèmes.", "Je soutiendrais un candidat qui promet de rendre aux gens ordinaires le pouvoir pris par une élite."],
  A12: ["J'accepterais des prix un peu plus élevés si un produit causait de graves dégâts à l'environnement.", "J'éviterais les règles qui augmentent les prix et compterais davantage sur les technologies propres."],
  A13: ["Je refuserais que des responsables justifient les lois pour tous principalement par leur religion.", 'J’accepterais que des responsables justifient les lois pour tous par des valeurs religieuses.'],
  A14: ["Si les deux options fonctionnent, je choisirais l'État pour garantir les mêmes normes partout.", 'Si les deux options fonctionnent, je laisserais la tâche à la commune.'],
};

export function romanceBeliefStatement(locale: 'es' | 'fr', sourceItemId: string, polarity: BeliefPolarity) {
  if (sourceItemId.startsWith('J')) return schoolJuniorBeliefStatement(locale, sourceItemId, polarity);
  const pair = (locale === 'es' ? es : fr)[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const spanishBeliefPairCount = Object.keys(es).length;
export const frenchBeliefPairCount = Object.keys(fr).length;
