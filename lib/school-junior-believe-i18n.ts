import type { BeliefPolarity } from './belief-statements';

export type SchoolJuniorLocale = 'en' | 'de' | 'es' | 'fr';

type Pair = readonly [negative: string, positive: string];

const pairs: Record<Exclude<SchoolJuniorLocale, 'en'>, Record<string, Pair>> = {
  de: {
    J01: ['Der Staat sollte dafür sorgen, dass jede Familie Schulen und Ärzte nutzen kann.', 'Familien sollten mehr selbst entscheiden und weniger Hilfe vom Staat bekommen.'],
    J02: ['Steuern sollten helfen, den Abstand zwischen Arm und Reich zu verkleinern.', 'Menschen sollten mehr von ihrem Einkommen behalten, auch wenn der Abstand groß bleibt.'],
    J03: ['Beschäftigte oder die Öffentlichkeit sollten mehr von den größten Unternehmen besitzen.', 'Die größten Unternehmen sollten meistens privaten Eigentümern gehören.'],
    J04: ['Öffentliche Regeln sollten sich ändern, wenn sich die Meinung der meisten Menschen ändert.', 'Alte Regeln sollten sich langsam ändern, nachdem lange breite Zustimmung bestand.'],
    J05: ['Erwachsene sollten private Dinge frei entscheiden dürfen, wenn niemand verletzt wird.', 'Manche privaten Entscheidungen dürfen begrenzt werden, um gemeinsame Werte zu schützen.'],
    J06: ['Verantwortliche sollten Freiheit nur bei einer klaren, ernsten Gefahr begrenzen.', 'Verantwortliche dürfen Freiheit früh begrenzen, um ernste Unruhen zu verhindern.'],
    J07: ['Gerichte, Gesetze, andere Parteien und Medien sollten gewählte Regierungen kontrollieren.', 'Wahlgewinner sollten viel Freiheit haben, das umzusetzen, wofür sie gewählt wurden.'],
    J08: ['Länder sollten gemeinsame Regeln für Probleme befolgen, die Grenzen überschreiten.', 'Jedes Land sollte selbst das letzte Wort haben, auch wenn gemeinsame Lösungen schwieriger werden.'],
    J09: ['Wer später Staatsbürger wird, gehört genauso vollständig dazu wie jemand mit Staatsbürgerschaft von Geburt an.', 'Staatsbürgerschaft von Geburt an sollte stärker zählen, wenn es um volle Zugehörigkeit geht.'],
    J10: ['In der Politik gibt es meistens viele Gruppen mit unterschiedlichen Bedürfnissen und Ideen.', 'Gut vernetzte Gruppen können zu viel Einfluss haben und normale Wähler zu wenig.'],
    J11: ['Die Natur zu schützen sollte manchmal wichtiger sein als Wirtschaftswachstum.', 'Wirtschaftswachstum sollte meistens zuerst kommen, während wir gleichzeitig die Natur schützen.'],
    J12: ['Religion sollte nicht genutzt werden, um Gesetze für Andersgläubige zu machen.', 'Religion kann ein fairer Grund für Gesetze sein, auch wenn nicht alle sie teilen.'],
    J13: ['Bund oder Region sollten wichtige Dienste übernehmen, wenn nur so überall ein Mindeststandard sicher ist.', 'Lokale Gemeinden sollten wichtige Dienste übernehmen, wenn sie sie gut anbieten können.'],
    J14: ['Bei Gewalt würde ich strenge Grenzen für Polizeibefugnisse beibehalten.', 'Bei Gewalt würde ich der Polizei für kurze Zeit mehr Befugnisse geben.'],
    J15: ['Wenn ein Gericht eine beliebte Politik stoppt, würde ich trotzdem seine Unabhängigkeit schützen.', 'Wenn Gerichte oft rechtmäßige Politik stoppen, würde ich gewählten Regierungen mehr Freiheit geben.'],
    J16: ['Ich höre Kandidaten zu, die unterschiedliche Bedürfnisse erklären, auch wenn die Antwort kompliziert ist.', 'Ich bevorzuge Kandidaten, die gut vernetzte Gruppen schwächen und normalen Wählern mehr Einfluss geben wollen.'],
  },
  es: {
    J01: ['El gobierno debe asegurar que todas las familias puedan usar escuelas y médicos.', 'Las familias deberían decidir más por sí mismas y recibir menos ayuda del gobierno.'],
    J02: ['Los impuestos deberían ayudar a reducir la distancia entre ricos y pobres.', 'La gente debería conservar más de lo que gana, aunque la distancia siga siendo grande.'],
    J03: ['Los trabajadores o el público deberían poseer más de las empresas más grandes.', 'Las empresas más grandes deberían pertenecer sobre todo a propietarios privados.'],
    J04: ['Las reglas públicas deberían cambiar cuando cambian las opiniones de la mayoría.', 'Las reglas antiguas deberían cambiar despacio, después de un acuerdo amplio y duradero.'],
    J05: ['Los adultos deberían poder tomar decisiones privadas si no hacen daño a nadie.', 'Algunas decisiones privadas pueden limitarse para proteger valores compartidos por mucha gente.'],
    J06: ['Los gobernantes deberían limitar la libertad solo ante un peligro claro y grave.', 'Los gobernantes pueden limitar antes algunas libertades para evitar problemas graves.'],
    J07: ['Los tribunales, las leyes, otros partidos y los medios deberían controlar a los gobernantes elegidos.', 'Quien gana elecciones debería tener bastante libertad para hacer lo que eligieron los votantes.'],
    J08: ['Los países deberían seguir reglas comunes para problemas que cruzan fronteras.', 'Cada país debería tener la última palabra, aunque los problemas compartidos sean más difíciles de resolver.'],
    J09: ['Quien obtiene la ciudadanía después pertenece igual que quien la tuvo desde que nació.', 'Tener ciudadanía desde el nacimiento debería contar más al decidir quién pertenece plenamente.'],
    J10: ['La política suele tener muchos grupos con necesidades e ideas diferentes.', 'Los grupos bien conectados pueden tener demasiada influencia y los votantes corrientes demasiado poca.'],
    J11: ['Proteger la naturaleza debería ser a veces más importante que hacer crecer la economía.', 'El crecimiento económico debería ir normalmente primero mientras también protegemos la naturaleza.'],
    J12: ['La religión no debería usarse para hacer leyes para personas que no la comparten.', 'La religión puede ser una razón válida para leyes aunque no todos la compartan.'],
    J13: ['El gobierno nacional o regional debería llevar servicios clave cuando eso asegure un mínimo igual.', 'Las comunidades locales deberían llevar servicios clave cuando puedan hacerlo bien.'],
    J14: ['Si hubiera violencia, mantendría límites estrictos al poder de la policía.', 'Si hubiera violencia, daría a la policía más poder durante poco tiempo.'],
    J15: ['Si un tribunal frenara una política popular, seguiría protegiendo su independencia.', 'Si los tribunales frenaran a menudo políticas legales, daría más libertad a los gobiernos elegidos.'],
    J16: ['Escucharía a un candidato que explique necesidades distintas aunque la respuesta sea complicada.', 'Prefiero candidatos que reduzcan la influencia de grupos bien conectados y den más voz a votantes corrientes.'],
  },
  fr: {
    J01: ['L’État devrait faire en sorte que chaque famille puisse accéder aux écoles et aux médecins.', 'Les familles devraient décider davantage elles-mêmes et recevoir moins d’aide de l’État.'],
    J02: ['Les impôts devraient aider à réduire l’écart entre riches et pauvres.', 'Les gens devraient garder davantage de ce qu’ils gagnent, même si l’écart reste grand.'],
    J03: ['Les travailleurs ou le public devraient posséder davantage des plus grandes entreprises.', 'Les plus grandes entreprises devraient surtout appartenir à des propriétaires privés.'],
    J04: ['Les règles publiques devraient changer quand l’avis de la plupart des gens change.', 'Les anciennes règles devraient changer lentement, après un accord large et durable.'],
    J05: ['Les adultes devraient pouvoir faire des choix privés s’ils ne font de mal à personne.', 'Certains choix privés peuvent être limités pour protéger des valeurs largement partagées.'],
    J06: ['Les dirigeants devraient limiter la liberté seulement face à un danger clair et grave.', 'Les dirigeants peuvent limiter certaines libertés plus tôt pour éviter de graves troubles.'],
    J07: ['Les tribunaux, les lois, les autres partis et les médias devraient contrôler les dirigeants élus.', 'Les gagnants d’une élection devraient avoir une grande liberté pour appliquer le choix des électeurs.'],
    J08: ['Les pays devraient suivre des règles communes pour les problèmes qui dépassent les frontières.', 'Chaque pays devrait garder le dernier mot, même si les problèmes communs deviennent plus difficiles à résoudre.'],
    J09: ['Une personne naturalisée appartient autant au pays qu’une personne citoyenne depuis sa naissance.', 'Être citoyen depuis la naissance devrait compter davantage pour décider qui appartient pleinement au pays.'],
    J10: ['La politique réunit souvent plusieurs groupes avec des besoins et des idées différents.', 'Les groupes bien connectés peuvent avoir trop d’influence et les électeurs ordinaires pas assez.'],
    J11: ['Protéger la nature devrait parfois passer avant la croissance de l’économie.', 'La croissance économique devrait généralement passer d’abord, tout en protégeant aussi la nature.'],
    J12: ['La religion ne devrait pas servir à faire des lois pour ceux qui ne la partagent pas.', 'La religion peut être une raison acceptable pour des lois même si tous ne la partagent pas.'],
    J13: ['L’État national ou régional devrait gérer les services clés si cela garantit un même minimum partout.', 'Les communautés locales devraient gérer les services clés quand elles peuvent bien le faire.'],
    J14: ['S’il y avait des violences, je garderais des limites strictes au pouvoir de la police.', 'S’il y avait des violences, je donnerais plus de pouvoir à la police pour peu de temps.'],
    J15: ['Si un tribunal bloquait une mesure populaire, je protégerais quand même son indépendance.', 'Si les tribunaux bloquaient souvent des mesures légales, je donnerais plus de liberté aux élus.'],
    J16: ['J’écouterais un candidat qui explique les besoins de différents groupes, même si la réponse est compliquée.', 'Je préfère un candidat qui réduit l’influence des groupes bien connectés et donne plus de voix aux électeurs ordinaires.'],
  },
};

export function schoolJuniorBeliefStatement(locale: SchoolJuniorLocale, id: string, polarity: BeliefPolarity) {
  if (locale === 'en') return null;
  const pair = pairs[locale][id];
  if (!pair) return null;
  return polarity === 'negative' ? pair[0] : pair[1];
}
