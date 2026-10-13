// Plain-language Youth wording for the school screens in German, Spanish, French and Brazilian Portuguese.
// DRAFT: not reviewed by native speakers. Both sides of all 42 items; direction, construct and mode
// follow the English Youth bank in school-believe.ts. Spanish, French and Portuguese also carry the
// 16 Junior 10-13 items (J01-J16); the German Junior set lives in german-believe.ts.
// Native editorial review and cognitive testing with young readers are still required before
// real-school use.

export type SchoolYouthLocale = 'de' | 'es' | 'fr' | 'pt-br';
type Polarity = 'negative' | 'positive';

export const SCHOOL_YOUTH_LOCALIZED_VERSION = 'school-youth-localized-2026.10-draft-v1' as const;

const bank: Record<SchoolYouthLocale, Record<string, [string, string]>> = {
  de: {
    T01: [
      'Der Staat soll dafür sorgen, dass alle Menschen Dinge wie Schulen und Ärzte nutzen können.',
      'Der Staat soll sich bei Dingen wie Schulen und Ärzten weniger einmischen. Mehr davon sollen private Firmen anbieten, und die Menschen sollen selbst wählen.',
    ],
    T02: [
      'Der Staat soll mit Steuern und Geldhilfen dafür sorgen, dass der Abstand zwischen sehr reichen und armen Menschen kleiner wird.',
      'Der Staat soll sich bei Einkommensunterschieden weniger einmischen, auch wenn die Abstände sehr groß werden.',
    ],
    T03: [
      'Beschäftigte oder die Allgemeinheit sollen einen größeren Anteil an großen Firmen besitzen.',
      'Große Firmen sollen meistens privaten Besitzern gehören und nicht dem Staat. Das Gesetz soll die Beschäftigten trotzdem schützen.',
    ],
    T04: [
      'Wenn die meisten Menschen eine neue Lebensweise akzeptieren, sollen sich die Gesetze ziemlich schnell anpassen.',
      'Alte Regeln sollen sich erst ändern, wenn die meisten Menschen eine neue Lebensweise schon lange akzeptieren.',
    ],
    T05: [
      'Das Gesetz soll Erwachsene bei privaten Entscheidungen in Ruhe lassen, wenn niemand sonst verletzt wird.',
      'Das Gesetz darf manches verbieten, was Erwachsene privat und freiwillig tun, wenn die meisten Menschen es moralisch falsch finden – auch wenn niemand verletzt wird.',
    ],
    T06: [
      'Abtreibung (das Beenden einer Schwangerschaft) soll meistens erlaubt sein, weil die schwangere Person die wichtigste Entscheidung treffen soll.',
      'Für Abtreibung soll es strengere gesetzliche Grenzen geben, weil ungeborenes Leben mehr Schutz bekommen soll.',
    ],
    T07: [
      'Der Staat darf Freiheit nur einschränken, wenn er eine klare und ernste Gefahr belegen kann.',
      'Der Staat darf manche Freiheiten früh einschränken, bevor etwas Schlimmes passiert, wenn es eine echte Gefahr für schwere Gewalt oder Chaos gibt.',
    ],
    T08: [
      'Auch wenn eine Regierung eine Wahl gewonnen hat, sollen Gerichte, die Verfassung (die wichtigsten Regeln des Landes) und die Opposition ihrer Macht weiter Grenzen setzen.',
      'Eine gewählte Regierung soll ihre rechtmäßigen Pläne umsetzen dürfen, auch wenn Gerichte und andere unabhängige Gruppen stark widersprechen.',
    ],
    T09: [
      'Länder sollen sich an gemeinsame internationale Regeln halten, wenn ein Problem zu groß für ein einzelnes Land ist.',
      'Jedes Land soll das letzte Wort über seine eigenen Entscheidungen haben, auch wenn es dadurch schwerer wird, gemeinsame Probleme zusammen zu lösen.',
    ],
    T10: [
      'Wer später Staatsbürger wird, gehört genauso zum Land wie jemand, der als Staatsbürger geboren wurde.',
      'Von Geburt an Staatsbürger zu sein ist ein wichtiger Teil der Zugehörigkeit zu einem Land, mehr als die rechtliche Staatsbürgerschaft allein.',
    ],
    T11: [
      'Politischer Streit ist meistens ein echter Zusammenstoß verschiedener Interessen und Werte, nicht der Verrat einer Seite an den normalen Wählerinnen und Wählern.',
      'Politiker hören oft zu sehr auf Gruppen mit guten Verbindungen und zu wenig auf gewöhnliche Wählerinnen und Wähler.',
    ],
    T12: [
      'Wenn Naturschutz und Wirtschaftswachstum klar im Streit sind, soll manchmal die Natur zuerst kommen, auch wenn die Wirtschaft dadurch langsamer wächst.',
      'Wenn Naturschutz und Wirtschaftswachstum im Streit stehen, soll meistens das Wirtschaftswachstum zuerst kommen, und Schäden für die Natur sollen auf andere Weise verringert werden.',
    ],
    T13: [
      'Religiöse Überzeugungen allein sollen nicht ausreichen, um Gesetze für Menschen zu begründen, die diese Religion nicht teilen.',
      'Gesetze dürfen auf religiösen Werten beruhen, auch wenn nicht alle im Land diese Religion haben.',
    ],
    T14: [
      'Der Bund oder die Länder sollen wichtige Angebote wie Schulen und Krankenhäuser verantworten, wenn so alle den gleichen Zugang und die gleiche Qualität bekommen.',
      'Wichtige Angebote wie Schulen und Krankenhäuser sollen meistens bei der Gemeinde oder bei Gruppen vor Ort bleiben, wenn diese sie gut führen können.',
    ],
    A01: [
      'Wenn ein Krankenhaus vor Ort schließen müsste, würde ich es unterstützen, staatliches Geld einzusetzen, damit es für alle geöffnet bleibt.',
      'Wenn ein Krankenhaus vor Ort auf beide Arten gut laufen würde, würde ich eine private Firma wählen, statt mehr Geld vom Staat zu geben.',
    ],
    A02: [
      'Angenommen, ich verdiene Geld und zahle Steuern. Ich würde etwas mehr Steuern zahlen, wenn der Abstand zwischen Arm und Reich dadurch deutlich kleiner wird.',
      'Angenommen, ich verdiene Geld und zahle Steuern. Ich würde niedrigere Steuern wählen, auch wenn der Abstand zwischen Arm und Reich sehr groß bliebe.',
    ],
    A03: [
      'Wenn eine große Firma ihren Beschäftigten einen echten Anteil anböte und Anteilseigner von außen dadurch Einfluss verlören, würde ich das unterstützen.',
      'Wenn eine große Firma gut läuft, würde ich sie überwiegend bei privaten Anteilseignern (Menschen, denen Teile der Firma gehören) lassen, statt Beschäftigten oder der Allgemeinheit einen großen Teil zu geben.',
    ],
    A04: [
      'Wenn eine alte Schulregel nicht mehr zum Leben der meisten Schülerinnen und Schüler passt, würde ich sie bald ändern.',
      'Ich würde eine alte Schulregel behalten, bis viele Menschen sie schon lange ändern wollten.',
    ],
    A05: [
      'Wenn Erwachsene sich freiwillig für eine Beziehung oder Lebensweise entscheiden, die ich nicht gut finde, wäre ich gegen ein Gesetz, das sie verbietet, es sei denn, jemand wird dadurch direkt geschädigt.',
      'Wenn eine Entscheidung von Erwachsenen stark gegen Werte verstößt, die die meisten Menschen teilen, könnte ich einige gesetzliche Grenzen unterstützen, auch wenn niemand verletzt wird.',
    ],
    A06: [
      'Wenn die Menschen über das Abtreibungsrecht abstimmen würden, würde ich für einen breiteren gesetzlichen Zugang stimmen.',
      'Wenn die Menschen über das Abtreibungsrecht abstimmen würden, würde ich für strengere gesetzliche Grenzen stimmen.',
    ],
    A07: [
      'Bei schwerer Gewalt auf den Straßen würde ich starke rechtliche Schutzregeln behalten, auch wenn die Reaktion langsamer wäre.',
      'Bei schwerer Gewalt auf den Straßen würde ich dem Staat für kurze Zeit mehr Macht geben, auch wenn manche Schutzrechte dadurch schwächer werden.',
    ],
    A08: [
      'Wenn ein unabhängiges Gericht ein Gesetz aufhebt, das ich gut finde, würde ich die Entscheidung trotzdem respektieren.',
      'Wenn unabhängige Gerichte immer wieder Gesetze des Parlaments aufheben würden, würde ich überlegen, ihre Macht etwas zu begrenzen.',
    ],
    A09: [
      'Ich würde ein Abkommen unterstützen, an das sich alle Länder halten müssen, wenn es ein gemeinsames Problem löst, auch wenn es einige Entscheidungen meines Landes einschränkt.',
      'Ich würde Entscheidungen im eigenen Land lassen, auch wenn Länder dadurch schlechter gemeinsam handeln können.',
    ],
    A10: [
      'Ich würde es unterstützen, wenn Menschen, die später Staatsbürger geworden sind, dieselben hohen Wahlämter übernehmen dürften (zum Beispiel an der Spitze des Landes) wie Menschen, die von Geburt an Staatsbürger sind.',
      'Ich würde es unterstützen, einige oberste Wahlämter, etwa an der Spitze des Landes, für Menschen zu reservieren, die von Geburt an Staatsbürger sind.',
    ],
    A11: [
      'Ich bevorzuge Kandidaten, die offen erklären, dass politische Entscheidungen schwierig sind, auch wenn ihre Botschaft weniger spannend ist.',
      'Ich bevorzuge Kandidaten, die versprechen, die Macht von Gruppen mit guten Verbindungen zu verringern und gewöhnlichen Wählerinnen und Wählern mehr Mitsprache zu geben.',
    ],
    A12: [
      'Ich würde Gesetze gut finden, die Firmen zum Umweltschutz zwingen, auch wenn die Wirtschaft dadurch etwas langsamer wächst.',
      'Ich wäre gegen Umweltregeln, die das Wachstum absichtlich bremsen, und würde Wege bevorzugen, die Natur zu schützen und die Wirtschaft wachsen zu lassen.',
    ],
    A13: [
      'Ich fände es besser, wenn Politiker Gesetze, die für alle gelten, nicht hauptsächlich mit religiösen Werten begründen.',
      'Ich fände es in Ordnung, wenn Politiker religiöse Werte als guten Grund für Gesetze nennen, die für alle gelten.',
    ],
    A14: [
      'Wenn Dinge wie Schulen in manchen Gegenden viel besser wären als in anderen, würde ich gemeinsame Standards des Bundes oder der Länder befürworten, auch wenn die Orte weniger selbst bestimmen.',
      'Wenn örtliche Angebote gut funktionierten, würde ich Entscheidungen vor Ort lassen, auch wenn einheitliche nationale Regeln sie ähnlicher machen würden.',
    ],
    F01: [
      'Es stört mich, wenn Menschen wichtige Dinge wie ärztliche Hilfe nicht bekommen, weil es zu sehr davon abhängt, was sie selbst bezahlen können.',
      'Es stört mich, wenn staatliche Kontrolle wichtiger Leistungen den Menschen zu wenig Wahl lässt.',
    ],
    F02: [
      'Sehr große Abstände zwischen Arm und Reich stören mich so sehr, dass ich finde, manche Menschen sollten höhere Steuern zahlen.',
      'Hohe Steuern machen mir Sorgen, auch wenn sie den Abstand zwischen Arm und Reich verkleinern sollen.',
    ],
    F03: [
      'Ich finde es fair, wenn Beschäftigte oder die Allgemeinheit einen echten Anteil an großen Firmen besitzen.',
      'Ich finde es fair, wenn private Investoren den größten Teil großer Firmen besitzen, solange das Gesetz die Beschäftigten schützt.',
    ],
    F04: [
      'Es ist mir unangenehm, wenn die Regeln weit hinter einer Veränderung zurückbleiben, die die meisten Menschen unterstützen.',
      'Es ist mir unangenehm, wenn alte Regeln geändert werden, bevor die meisten Menschen eine neue Lebensweise akzeptiert haben.',
    ],
    F05: [
      'Es ist mir unangenehm, wenn der Staat Erwachsenen private Entscheidungen verbietet, die niemand anderem schaden.',
      'Es ist mir unangenehm, wenn das Gesetz die Werte, die die meisten Menschen teilen, gar nicht beachtet, auch im privaten Leben Erwachsener.',
    ],
    F06: [
      'Grenzen für Abtreibung machen mir Sorgen, weil sie der schwangeren Person eine wichtige Entscheidung wegnehmen können.',
      'Ein breiter Zugang zu Abtreibung macht mir Sorgen, weil ich glaube, dass ungeborenes Leben mehr Schutz verdient.',
    ],
    F07: [
      'In einer Krise macht es mir Sorgen, wenn der Staat mehr Macht einsetzt, als nötig ist.',
      'In einer Krise macht es mir Sorgen, wenn die Behörden zu wenig Macht haben, um die Menschen zu schützen.',
    ],
    F08: [
      'Es macht mir Sorgen, wenn die Gewinner einer Wahl die Kontrollen ihrer eigenen Macht schwächen.',
      'Es macht mir Sorgen, wenn unabhängige Gerichte oft Gesetze aufheben, die ein gewähltes Parlament beschlossen hat.',
    ],
    F09: [
      'Es ist mir unangenehm, wenn gemeinsame Probleme ungelöst bleiben, weil Länder Abkommen ablehnen, an die sie sich halten müssten.',
      'Es ist mir unangenehm, wenn internationale Versprechen mein Land daran hindern, bei einer wichtigen Frage selbst zu entscheiden.',
    ],
    F10: [
      'Ich fühle mich mit Staatsbürgern, die später dazugekommen sind und am Gemeinschaftsleben teilnehmen, genauso verbunden wie mit Menschen, die von Geburt an Staatsbürger waren.',
      'Für mein Gefühl, zu einem Land zu gehören, ist es wichtig, dass meine Familie schon lange dort lebt.',
    ],
    F11: [
      'Wenn mich Politik enttäuscht, denke ich meistens: Die Entscheidungen sind schwierig, und verschiedene Gruppen wollen verschiedene Dinge.',
      'Wenn mich Politik enttäuscht, vermute ich oft, dass Gruppen mit guten Verbindungen mehr Gehör finden als gewöhnliche Wählerinnen und Wähler.',
    ],
    F12: [
      'Schwere Schäden für die Natur machen mir Sorgen, auch wenn ihre Verhinderung die Wirtschaft bremsen könnte.',
      'Ich mache mir Sorgen um verlorene Jobs und einen schlechteren Lebensstandard, wenn Umweltregeln die Wirtschaft stark bremsen.',
    ],
    F13: [
      'Ich fühle mich unwohl, wenn religiöse Werte benutzt werden, um Gesetze für Menschen zu rechtfertigen, die diesen Glauben nicht teilen.',
      'Ich fühle mich unwohl, wenn religiöse Werte in öffentlichen Debatten einfach beiseitegeschoben werden, nur weil sie religiös sind.',
    ],
    F14: [
      'Ich fühle mich sicher, wenn Bund oder Länder überall denselben Mindeststandard für wichtige Leistungen festlegen.',
      'Ich fühle mich sicher, wenn die Behörden vor Ort, etwa der Gemeinderat, die Entscheidungen behalten und sie nicht an Land oder Bund abgeben.',
    ],
  },
  es: {
    T01: [
      'El Gobierno debería asegurarse de que todos puedan usar cosas como las escuelas y los médicos.',
      'El Gobierno debería hacer menos en cosas como las escuelas y los médicos. Más servicios deberían estar en manos de empresas privadas y cada persona debería elegir.',
    ],
    T02: [
      'El Gobierno debería usar impuestos y ayudas económicas para que la distancia entre las personas muy ricas y las pobres sea menor.',
      'El Gobierno debería intervenir menos en las diferencias de dinero entre las personas, aunque las distancias se hagan muy grandes.',
    ],
    T03: [
      'Los trabajadores o el público deberían ser dueños de una parte mayor de las grandes empresas.',
      'Las grandes empresas deberían ser sobre todo de dueños privados, no del Gobierno. La ley debería proteger igualmente a los trabajadores.',
    ],
    T04: [
      'Cuando la mayoría empieza a aceptar una nueva forma de vivir, las leyes deberían cambiar bastante pronto.',
      'Las reglas antiguas deberían cambiar solo cuando la mayoría lleve mucho tiempo aceptando una nueva forma de vivir.',
    ],
    T05: [
      'La ley debería dejar en paz a los adultos en sus decisiones privadas cuando nadie más sale perjudicado.',
      'La ley puede prohibir algunas cosas privadas que hacen los adultos por voluntad propia, si la mayoría cree que son moralmente malas, aunque no se haga daño a nadie.',
    ],
    T06: [
      'El aborto (terminar un embarazo) debería ser legal en general, porque la persona embarazada debería tomar la decisión principal.',
      'El aborto debería tener límites legales más estrictos, porque la vida antes de nacer debería recibir más protección.',
    ],
    T07: [
      'El Gobierno solo debería limitar la libertad cuando pueda demostrar un riesgo claro y grave de daño.',
      'El Gobierno puede limitar algunas libertades antes de que pase algo malo, si hay un riesgo real de violencia grave o caos.',
    ],
    T08: [
      'Aunque un Gobierno gane unas elecciones, los tribunales, la Constitución (las reglas básicas del país) y la oposición deberían seguir controlándolo.',
      'Un Gobierno elegido debería poder llevar a cabo sus planes legales, aunque los tribunales y otros grupos independientes se opongan con fuerza.',
    ],
    T09: [
      'Los países deberían seguir normas internacionales comunes cuando un problema es demasiado grande para que lo resuelva un solo país.',
      'Cada país debería tener la última palabra sobre sus decisiones, aunque eso haga más difícil resolver juntos los problemas compartidos.',
    ],
    T10: [
      'Una persona que se hace ciudadana más tarde pertenece al país tanto como una persona que nació siendo ciudadana.',
      'Ser ciudadano desde el nacimiento es una parte importante de pertenecer a un país, más que la ciudadanía legal por sí sola.',
    ],
    T11: [
      'Los desacuerdos políticos suelen ser choques reales entre intereses y valores distintos, no un bando que traiciona a los votantes normales.',
      'Los políticos suelen escuchar demasiado a los grupos con buenos contactos y muy poco a los votantes normales.',
    ],
    T12: [
      'Cuando proteger la naturaleza y hacer crecer la economía chocan claramente, a veces la naturaleza debería ir primero, aunque la economía crezca más despacio.',
      'Cuando proteger la naturaleza y hacer crecer la economía chocan, el crecimiento económico debería ir normalmente primero, y el daño a la naturaleza debería reducirse de otras maneras.',
    ],
    T13: [
      'Las creencias religiosas no deberían bastar, por sí solas, para justificar leyes para personas que no comparten esa religión.',
      'Las leyes pueden basarse en valores religiosos, aunque algunas personas del país no tengan esa religión.',
    ],
    T14: [
      'El Gobierno nacional o regional debería encargarse de servicios importantes, como escuelas y hospitales, si es la mejor forma de que todos tengan el mismo acceso y la misma calidad.',
      'Los servicios importantes, como escuelas y hospitales, deberían quedarse normalmente en manos del gobierno local o de grupos de la comunidad si pueden gestionarlos bien.',
    ],
    A01: [
      'Si un hospital local estuviera a punto de cerrar, apoyaría usar dinero público para mantenerlo abierto para todos.',
      'Si un hospital local funcionara bien de las dos maneras, elegiría que lo dirigiera una empresa privada en vez de darle más dinero público.',
    ],
    A02: [
      'Si trabajara y pagara impuestos, aceptaría pagar un poco más si así la distancia entre ricos y pobres fuera mucho menor.',
      'Si trabajara y pagara impuestos, elegiría impuestos más bajos, aunque la distancia entre ricos y pobres siguiera siendo muy grande.',
    ],
    A03: [
      'Si una gran empresa diera a sus trabajadores una parte real de la propiedad, aunque los accionistas externos perdieran algo de control, lo apoyaría.',
      'Si una gran empresa funcionara bien, la dejaría sobre todo en manos de accionistas privados (personas dueñas de partes de la empresa), en lugar de dar una parte grande a los trabajadores o al Estado.',
    ],
    A04: [
      'Si una regla antigua de la escuela ya no coincidiera con la vida de la mayoría del alumnado, la cambiaría bastante pronto.',
      'Mantendría una regla antigua de la escuela hasta que mucha gente llevara mucho tiempo queriendo cambiarla.',
    ],
    A05: [
      'Si personas adultas eligieran libremente una relación o forma de vida con la que yo no estuviera de acuerdo, me opondría a una ley que la prohibiera, salvo que perjudicara directamente a alguien.',
      'Si una decisión de adultos fuera muy contraria a los valores que comparte la mayoría, podría apoyar algunos límites legales, aunque nadie saliera perjudicado.',
    ],
    A06: [
      'Si la gente votara sobre las leyes del aborto, votaría por un acceso legal más amplio.',
      'Si la gente votara sobre las leyes del aborto, votaría por límites legales más estrictos.',
    ],
    A07: [
      'Si hubiera violencia grave en las calles, mantendría protecciones legales fuertes, aunque la respuesta fuera más lenta.',
      'Si hubiera violencia grave en las calles, daría más poder al Gobierno por poco tiempo, aunque algunas protecciones legales se redujeran.',
    ],
    A08: [
      'Si un tribunal independiente anulara una ley que yo apoyo, respetaría igualmente su decisión.',
      'Si los tribunales independientes anularan una y otra vez leyes aprobadas por el parlamento, consideraría limitar parte de sus poderes.',
    ],
    A09: [
      'Apoyaría un acuerdo que todos los países tuvieran que cumplir si resolviera un problema compartido, aunque limitara algunas decisiones de mi país.',
      'Dejaría las decisiones en manos de mi país, aunque eso hiciera más difícil que los países actúen juntos.',
    ],
    A10: [
      'Apoyaría que las personas que se hicieron ciudadanas más tarde pudieran ocupar los mismos altos cargos electos, como dirigir el país, que quienes nacieron siendo ciudadanas.',
      'Apoyaría reservar algunos de los máximos cargos electos, como dirigir el país, a personas que fueron ciudadanas desde el nacimiento.',
    ],
    A11: [
      'Prefiero candidatos que expliquen abiertamente que las decisiones políticas son difíciles, aunque su mensaje resulte menos emocionante.',
      'Prefiero candidatos que prometan quitar poder a los grupos con buenos contactos y dar más voz a los votantes normales.',
    ],
    A12: [
      'Apoyaría leyes que obliguen a las empresas a proteger el medio ambiente, aunque la economía creciera un poco más despacio.',
      'Me opondría a reglas ambientales que frenan el crecimiento a propósito, y preferiría formas de proteger la naturaleza que mantengan la economía creciendo.',
    ],
    A13: [
      'Preferiría que los políticos no se apoyaran sobre todo en valores religiosos para explicar leyes que se aplican a todos.',
      'Aceptaría que los políticos dieran valores religiosos como una buena razón para leyes que se aplican a todos.',
    ],
    A14: [
      'Si servicios como las escuelas fueran mucho mejores en unas zonas que en otras, apoyaría normas nacionales o regionales, aunque cada zona decidiera menos.',
      'Si los servicios locales funcionaran bien, mantendría las decisiones a nivel local, aunque las normas nacionales los hicieran más parecidos.',
    ],
    F01: [
      'Me molesta que haya personas que no reciban cosas importantes, como atención médica, porque depende demasiado de lo que puedan pagar.',
      'Me molesta que el control del Gobierno sobre servicios importantes deje a la gente con muy poca elección.',
    ],
    F02: [
      'Las distancias muy grandes entre ricos y pobres me molestan tanto que creo que algunas personas deberían pagar impuestos más altos.',
      'Los impuestos altos me preocupan, incluso cuando sirven para acortar la distancia entre ricos y pobres.',
    ],
    F03: [
      'Me parece justo que los trabajadores o la gente en general sean dueños de una parte real de las grandes empresas.',
      'Me parece justo que los inversores privados conserven la mayor parte de la propiedad de las grandes empresas, siempre que la ley proteja a los trabajadores.',
    ],
    F04: [
      'Me incomoda que las reglas se queden muy atrás de un cambio que apoya la mayoría.',
      'Me incomoda que se cambien reglas antiguas antes de que la mayoría acepte una nueva forma de vivir.',
    ],
    F05: [
      'Me incomoda que el Gobierno prohíba a los adultos tomar decisiones privadas que no hacen daño a nadie.',
      'Me incomoda que la ley no preste atención a los valores que comparte la mayoría, ni siquiera en la vida privada de los adultos.',
    ],
    F06: [
      'Los límites al aborto me preocupan, porque pueden quitarle a la persona embarazada una decisión importante.',
      'Me preocupa un acceso amplio al aborto, porque creo que la vida antes de nacer merece más protección.',
    ],
    F07: [
      'En una crisis, me preocupa que el Gobierno use más poder del que necesita.',
      'En una crisis, me preocupa que las autoridades tengan muy poco poder para proteger a la gente.',
    ],
    F08: [
      'Me preocupa que quienes ganan unas elecciones debiliten los controles sobre su propio poder.',
      'Me preocupa que los tribunales independientes anulen a menudo leyes aprobadas por un parlamento elegido.',
    ],
    F09: [
      'Me incomoda que los problemas compartidos queden sin resolver porque los países rechazan acuerdos que tendrían que cumplir.',
      'Me incomoda que las promesas internacionales impidan a mi país tomar su propia decisión final sobre un tema importante.',
    ],
    F10: [
      'Tengo el mismo sentimiento de pertenencia hacia los ciudadanos que llegaron más tarde y participan en la vida de la comunidad que hacia quienes lo son desde el nacimiento.',
      'Para sentir que pertenezco a un país, me importa que mi familia lleve mucho tiempo viviendo allí.',
    ],
    F11: [
      'Cuando la política me decepciona, suelo pensar que la razón principal es que las decisiones son difíciles y que cada grupo quiere cosas distintas.',
      'Cuando la política me decepciona, a menudo sospecho que se escucha más a los grupos con buenos contactos que a los votantes normales.',
    ],
    F12: [
      'Me preocupa un daño grave a la naturaleza, incluso cuando evitarlo podría frenar la economía.',
      'Me preocupa que se pierdan empleos y bajen los niveles de vida cuando las reglas ambientales frenan mucho la economía.',
    ],
    F13: [
      'Me incomoda que se usen valores religiosos para justificar leyes para personas que no comparten esa fe.',
      'Me incomoda que los valores religiosos se dejen de lado en el debate público solo por ser religiosos.',
    ],
    F14: [
      'Me da confianza que el Gobierno nacional o regional fije el mismo estándar mínimo para los servicios importantes en todas partes.',
      'Me da tranquilidad que las autoridades locales, como el ayuntamiento, conserven el control en lugar de pasar las decisiones al Gobierno regional o nacional.',
    ],
    J01: [
      'El Gobierno debería asegurarse de que todas las familias puedan usar escuelas y médicos.',
      'Las familias deberían tomar más decisiones por su cuenta, con menos ayuda del Gobierno.',
    ],
    J02: [
      'Los impuestos deberían ayudar a reducir la distancia entre ricos y pobres.',
      'Las personas deberían quedarse con más de lo que ganan, aunque la distancia siga siendo grande.',
    ],
    J03: [
      'Los trabajadores o el público deberían ser dueños de una parte mayor de las empresas más grandes.',
      'Las empresas más grandes deberían pertenecer sobre todo a dueños privados.',
    ],
    J04: [
      'Las reglas públicas deberían cambiar cuando cambia la opinión de la mayoría.',
      'Las reglas antiguas deberían cambiar despacio, después de que la gente lleve mucho tiempo de acuerdo.',
    ],
    J05: [
      'Los adultos deberían ser libres de tomar decisiones privadas si nadie sale perjudicado.',
      'Algunas decisiones privadas pueden limitarse para proteger valores que comparten muchas personas.',
    ],
    J06: [
      'Los líderes solo deberían limitar la libertad cuando haya un peligro claro y grave.',
      'Los líderes pueden limitar algo de libertad pronto para evitar problemas graves.',
    ],
    J07: [
      'Los tribunales, las leyes, otros partidos y los medios de comunicación deberían vigilar a los líderes elegidos.',
      'Quienes ganan unas elecciones deberían tener mucha libertad para hacer lo que eligieron los votantes.',
    ],
    J08: [
      'Los países deberían seguir normas comunes para los problemas que cruzan fronteras.',
      'Cada país debería tener la última palabra, aunque los problemas compartidos sean más difíciles de resolver.',
    ],
    J09: [
      'Quien se hace ciudadano pertenece al país tanto como quien lo es desde el nacimiento.',
      'Ser ciudadano desde el nacimiento debería contar más para decidir quién pertenece plenamente.',
    ],
    J10: [
      'En la política suele haber muchos grupos con necesidades e ideas distintas.',
      'Las decisiones políticas pueden dar demasiada influencia a los grupos con buenos contactos y muy poca a los votantes normales.',
    ],
    J11: [
      'Proteger la naturaleza debería ir a veces antes que hacer crecer la economía.',
      'Hacer crecer la economía debería ir normalmente primero, mientras también protegemos la naturaleza.',
    ],
    J12: [
      'La religión no debería usarse para hacer leyes para personas que no la comparten.',
      'La religión puede ser una razón justa para las leyes, aunque no todos la compartan.',
    ],
    J13: [
      'El Gobierno nacional o regional debería encargarse de los servicios clave cuando sea necesario para garantizar el mismo nivel mínimo.',
      'Las comunidades locales deberían encargarse de los servicios clave siempre que puedan ofrecerlos bien.',
    ],
    J14: [
      'Si estallara la violencia, mantendría límites estrictos al poder de la policía.',
      'Si estallara la violencia, daría más poder a la policía por poco tiempo.',
    ],
    J15: [
      'Si un tribunal frenara una política popular, aun así protegería la independencia del tribunal.',
      'Si los tribunales frenaran a menudo políticas legales elegidas por los votantes, daría más libertad a los líderes elegidos.',
    ],
    J16: [
      'Escucharía a un candidato que explique las necesidades de los distintos grupos, aunque la respuesta sea complicada.',
      'Prefiero un candidato que diga que los grupos con buenos contactos tienen demasiada influencia y que los votantes normales necesitan más voz.',
    ],
  },
  fr: {
    T01: [
      'L’État devrait s’assurer que tout le monde puisse utiliser des services comme les écoles et les médecins.',
      'L’État devrait en faire moins pour des services comme les écoles et les médecins. Plus de services devraient être gérés par des entreprises privées, et chacun devrait choisir.',
    ],
    T02: [
      'L’État devrait utiliser les impôts et des aides financières pour réduire l’écart entre les personnes très riches et les personnes pauvres.',
      'L’État devrait moins intervenir dans les différences de revenus entre les gens, même quand les écarts deviennent très grands.',
    ],
    T03: [
      'Les salariés ou la population devraient posséder une plus grande part des grandes entreprises.',
      'Les grandes entreprises devraient surtout appartenir à des propriétaires privés, pas à l’État. La loi devrait quand même protéger les salariés.',
    ],
    T04: [
      'Quand la plupart des gens commencent à accepter une nouvelle façon de vivre, les lois devraient changer assez vite.',
      'Les anciennes règles devraient changer seulement quand la plupart des gens acceptent depuis longtemps une nouvelle façon de vivre.',
    ],
    T05: [
      'La loi devrait laisser les adultes tranquilles dans leurs choix privés quand personne d’autre n’est blessé.',
      'La loi peut interdire certaines choses que des adultes choisissent de faire en privé, si la plupart des gens les jugent moralement mauvaises, même si personne n’est blessé.',
    ],
    T06: [
      'L’avortement (mettre fin à une grossesse) devrait en général rester légal, parce que la personne enceinte devrait prendre la décision principale.',
      'L’avortement devrait avoir des limites légales plus strictes, parce que la vie avant la naissance devrait recevoir plus de protection.',
    ],
    T07: [
      'L’État devrait limiter la liberté seulement quand il peut montrer un risque clair et grave de dommage.',
      'L’État peut limiter certaines libertés plus tôt, avant qu’un problème arrive, s’il y a un vrai risque de violence grave ou de chaos.',
    ],
    T08: [
      'Même quand un gouvernement gagne une élection, les tribunaux, la Constitution (les règles de base du pays) et l’opposition devraient continuer à le contrôler.',
      'Un gouvernement élu devrait pouvoir mener ses projets légaux, même quand les tribunaux et d’autres groupes indépendants s’y opposent fortement.',
    ],
    T09: [
      'Les pays devraient suivre des règles internationales communes quand un problème est trop grand pour un seul pays.',
      'Chaque pays devrait avoir le dernier mot sur ses décisions, même si c’est plus difficile de résoudre ensemble les problèmes communs.',
    ],
    T10: [
      'Une personne qui devient citoyenne plus tard appartient au pays autant qu’une personne née citoyenne.',
      'Être citoyen depuis la naissance est une partie importante de l’appartenance à un pays, plus que la citoyenneté légale seule.',
    ],
    T11: [
      'Les désaccords politiques sont surtout de vrais conflits entre des intérêts et des valeurs différents, pas un camp qui trahit les électeurs ordinaires.',
      'Les responsables politiques écoutent souvent trop les groupes bien introduits et pas assez les électeurs ordinaires.',
    ],
    T12: [
      'Quand protéger la nature et faire grandir l’économie s’opposent clairement, la nature devrait parfois passer en premier, même si l’économie grandit moins vite.',
      'Quand la protection de la nature et la croissance de l’économie s’opposent, la croissance devrait en général passer en premier, et les dégâts pour la nature devraient être réduits autrement.',
    ],
    T13: [
      'Les convictions religieuses ne devraient pas suffire, à elles seules, à justifier des lois pour des personnes qui n’ont pas cette religion.',
      'Les lois peuvent s’appuyer sur des valeurs religieuses, même si certaines personnes du pays n’ont pas cette religion.',
    ],
    T14: [
      'L’État ou les régions devraient s’occuper des services importants, comme les écoles et les hôpitaux, si c’est la meilleure façon de garantir à tous le même accès et la même qualité.',
      'Les services importants, comme les écoles et les hôpitaux, devraient en général rester à la commune ou à des groupes locaux quand ils peuvent bien les gérer.',
    ],
    A01: [
      'Si un hôpital local risquait de fermer, je soutiendrais l’usage d’argent public pour le garder ouvert à tous.',
      'Si un hôpital local pouvait bien fonctionner des deux façons, je choisirais une entreprise privée pour le gérer plutôt que de donner plus d’argent public.',
    ],
    A02: [
      'Si je travaillais et payais des impôts, j’accepterais de payer un peu plus d’impôts si cela réduisait beaucoup l’écart entre les riches et les pauvres.',
      'Si je travaillais et payais des impôts, je choisirais des impôts plus bas, même si l’écart entre riches et pauvres restait très grand.',
    ],
    A03: [
      'Si une grande entreprise donnait à ses salariés une vraie part de propriété, même si les actionnaires extérieurs perdaient un peu de contrôle, je soutiendrais ce changement.',
      'Si une grande entreprise fonctionnait bien, je la laisserais surtout à des actionnaires privés (des personnes qui possèdent des parts de l’entreprise), plutôt que de donner une grande part aux salariés ou à l’État.',
    ],
    A04: [
      'Si une ancienne règle de l’école ne correspondait plus à la vie de la plupart des élèves, je la changerais assez vite.',
      'Je garderais une ancienne règle de l’école jusqu’à ce que beaucoup de gens aient voulu la changer pendant longtemps.',
    ],
    A05: [
      'Si des adultes choisissaient librement une relation ou un mode de vie que je n’approuve pas, je m’opposerais à une loi qui l’interdirait, sauf si cela nuisait directement à quelqu’un.',
      'Si un choix d’adultes allait fortement contre les valeurs que la plupart des gens partagent, je pourrais soutenir certaines limites légales, même si personne n’était blessé.',
    ],
    A06: [
      'Si les gens votaient sur les lois sur l’avortement, je voterais pour un accès légal plus large.',
      'Si les gens votaient sur les lois sur l’avortement, je voterais pour des limites plus strictes.',
    ],
    A07: [
      'S’il y avait de la violence grave dans les rues, je garderais de fortes protections légales, même si la réponse était plus lente.',
      'S’il y avait de la violence grave dans les rues, je donnerais plus de pouvoir à l’État pour un court moment, même si certaines protections légales étaient réduites.',
    ],
    A08: [
      'Si un tribunal indépendant annulait une loi que je soutiens, je respecterais quand même sa décision.',
      'Si des tribunaux indépendants annulaient sans cesse des lois votées par le parlement, j’envisagerais de limiter une partie de leurs pouvoirs.',
    ],
    A09: [
      'Je soutiendrais un accord que tous les pays devraient respecter s’il résolvait un problème commun, même s’il limitait certains choix de mon pays.',
      'Je laisserais les décisions à mon pays, même si les pays avaient plus de mal à agir ensemble.',
    ],
    A10: [
      'Je soutiendrais que les personnes devenues citoyennes plus tard puissent occuper les mêmes hautes fonctions élues, comme diriger le pays, que les personnes citoyennes de naissance.',
      'Je soutiendrais de réserver certaines des plus hautes fonctions élues, comme diriger le pays, aux personnes citoyennes depuis la naissance.',
    ],
    A11: [
      'Je préfère les candidats qui expliquent ouvertement que les choix politiques sont difficiles, même si leur message est moins excitant.',
      'Je préfère les candidats qui promettent de réduire le pouvoir des groupes bien introduits et de donner plus de voix aux électeurs ordinaires.',
    ],
    A12: [
      'Je soutiendrais des lois qui obligent les entreprises à protéger l’environnement, même si l’économie grandissait un peu moins vite.',
      'Je m’opposerais à des règles environnementales qui ralentissent volontairement la croissance, et je préférerais des moyens de protéger la nature qui gardent l’économie en croissance.',
    ],
    A13: [
      'Je préférerais que les responsables politiques ne s’appuient pas surtout sur des valeurs religieuses pour expliquer des lois qui s’appliquent à tous.',
      'J’accepterais que des responsables politiques donnent des valeurs religieuses comme bonne raison pour des lois qui s’appliquent à tous.',
    ],
    A14: [
      'Si des services comme les écoles étaient bien meilleurs dans certaines régions que dans d’autres, je soutiendrais des normes nationales ou régionales, même si chaque endroit décidait moins.',
      'Si les services locaux fonctionnaient bien, je garderais les décisions au niveau local, même si des règles nationales les rendaient plus semblables.',
    ],
    F01: [
      'Cela me dérange que des personnes n’aient pas accès à des choses importantes, comme les soins, parce que cela dépend trop de ce qu’elles peuvent payer.',
      'Cela me dérange quand le contrôle de l’État sur des services importants laisse trop peu de choix aux gens.',
    ],
    F02: [
      'Les très grands écarts entre riches et pauvres me dérangent assez pour penser que certaines personnes devraient payer plus d’impôts.',
      'Les impôts élevés m’inquiètent, même quand ils servent à réduire l’écart entre riches et pauvres.',
    ],
    F03: [
      'Je trouve juste que les salariés ou l’ensemble de la population possèdent une vraie part des grandes entreprises.',
      'Je trouve juste que des investisseurs privés gardent la plus grande part des grandes entreprises, tant que la loi protège les salariés.',
    ],
    F04: [
      'Cela me met mal à l’aise quand les règles restent très en retard sur un changement que la plupart des gens soutiennent.',
      'Cela me met mal à l’aise quand de vieilles règles changent avant que la plupart des gens aient accepté une nouvelle façon de vivre.',
    ],
    F05: [
      'Cela me met mal à l’aise quand l’État interdit à des adultes de faire des choix privés qui ne font de mal à personne.',
      'Cela me met mal à l’aise quand la loi ne tient aucun compte des valeurs que la plupart des gens partagent, même dans la vie privée des adultes.',
    ],
    F06: [
      'Les limites à l’avortement m’inquiètent, parce qu’elles peuvent retirer à la personne enceinte une décision importante.',
      'Un large accès à l’avortement m’inquiète, parce que je crois que la vie avant la naissance mérite plus de protection.',
    ],
    F07: [
      'En cas de crise, cela m’inquiète quand l’État utilise plus de pouvoir que nécessaire.',
      'En cas de crise, cela m’inquiète quand les autorités ont trop peu de pouvoir pour protéger les gens.',
    ],
    F08: [
      'Cela m’inquiète quand les gagnants d’une élection affaiblissent les contrôles sur leur propre pouvoir.',
      'Cela m’inquiète quand des tribunaux indépendants annulent souvent des lois votées par un parlement élu.',
    ],
    F09: [
      'Cela me met mal à l’aise que des problèmes communs ne soient pas résolus parce que des pays refusent des accords qu’ils devraient respecter.',
      'Cela me met mal à l’aise quand des promesses internationales empêchent mon pays de prendre sa propre décision finale sur un sujet important.',
    ],
    F10: [
      'Je ressens le même sentiment d’appartenance envers les citoyens arrivés plus tard qui participent à la vie de la communauté qu’envers ceux qui sont citoyens depuis la naissance.',
      'Pour mon sentiment d’appartenir à un pays, il compte que ma famille y vive depuis longtemps.',
    ],
    F11: [
      'Quand la politique me déçoit, je pense surtout que les choix sont difficiles et que chaque groupe veut des choses différentes.',
      'Quand la politique me déçoit, je soupçonne souvent que les groupes bien introduits sont plus écoutés que les électeurs ordinaires.',
    ],
    F12: [
      'De graves dégâts pour la nature m’inquiètent, même quand les éviter pourrait ralentir l’économie.',
      'Je m’inquiète de la perte d’emplois et d’un niveau de vie plus bas quand les règles pour l’environnement ralentissent beaucoup l’économie.',
    ],
    F13: [
      'Je suis mal à l’aise quand des valeurs religieuses servent à justifier des lois pour des personnes qui n’ont pas cette foi.',
      'Je suis mal à l’aise quand des valeurs religieuses sont écartées du débat public simplement parce qu’elles sont religieuses.',
    ],
    F14: [
      'Je me sens en confiance quand l’État ou la région fixe partout le même niveau minimum pour les services importants.',
      'Je me sens en confiance quand les autorités locales, comme la mairie, gardent le contrôle au lieu de laisser les décisions à la région ou à l’État.',
    ],
    J01: [
      'L’État devrait s’assurer que chaque famille puisse utiliser les écoles et les médecins.',
      'Les familles devraient faire plus de choix par elles-mêmes, avec moins d’aide de l’État.',
    ],
    J02: [
      'Les impôts devraient aider à réduire l’écart entre riches et pauvres.',
      'Les gens devraient garder plus de ce qu’ils gagnent, même si l’écart reste grand.',
    ],
    J03: [
      'Les salariés ou la population devraient posséder une plus grande part des plus grandes entreprises.',
      'Les plus grandes entreprises devraient surtout appartenir à des propriétaires privés.',
    ],
    J04: [
      'Les règles publiques devraient changer quand les opinions de la plupart des gens changent.',
      'Les anciennes règles devraient changer lentement, une fois que les gens sont d’accord depuis longtemps.',
    ],
    J05: [
      'Les adultes devraient être libres de faire des choix privés si personne n’est blessé.',
      'Certains choix privés peuvent être limités pour protéger des valeurs que beaucoup de gens partagent.',
    ],
    J06: [
      'Les dirigeants devraient limiter la liberté seulement quand il y a un danger clair et grave.',
      'Les dirigeants peuvent limiter un peu de liberté tôt pour éviter de graves problèmes.',
    ],
    J07: [
      'Les tribunaux, les lois, les autres partis et les médias devraient contrôler les dirigeants élus.',
      'Les gagnants d’une élection devraient avoir une grande liberté pour faire ce que les électeurs ont choisi.',
    ],
    J08: [
      'Les pays devraient suivre des règles communes pour les problèmes qui dépassent les frontières.',
      'Chaque pays devrait garder le dernier mot, même si les problèmes communs sont plus difficiles à résoudre.',
    ],
    J09: [
      'Une personne qui devient citoyenne appartient au pays autant qu’une personne citoyenne de naissance.',
      'Être citoyen depuis la naissance devrait compter davantage pour décider qui appartient pleinement au pays.',
    ],
    J10: [
      'En politique, il y a souvent beaucoup de groupes avec des besoins et des idées différents.',
      'Les décisions politiques peuvent donner trop d’influence aux groupes bien introduits et trop peu aux électeurs ordinaires.',
    ],
    J11: [
      'Protéger la nature devrait parfois passer avant la croissance de l’économie.',
      'Faire grandir l’économie devrait en général passer en premier, tout en protégeant aussi la nature.',
    ],
    J12: [
      'La religion ne devrait pas servir à faire des lois pour des personnes qui ne la partagent pas.',
      'La religion peut être une raison juste pour des lois, même si tout le monde ne la partage pas.',
    ],
    J13: [
      'L’État ou la région devraient gérer les services clés quand c’est nécessaire pour garantir le même niveau minimum.',
      'Les communautés locales devraient gérer les services clés dès qu’elles peuvent bien les assurer.',
    ],
    J14: [
      'Si la violence éclatait, je garderais des limites strictes aux pouvoirs de la police.',
      'Si la violence éclatait, je donnerais plus de pouvoir à la police pour un court moment.',
    ],
    J15: [
      'Si un tribunal bloquait une politique populaire, je protégerais quand même l’indépendance du tribunal.',
      'Si les tribunaux bloquaient souvent des politiques légales choisies par les électeurs, je donnerais plus de liberté aux dirigeants élus.',
    ],
    J16: [
      'J’écouterais un candidat qui explique les besoins de différents groupes, même si la réponse est compliquée.',
      'Je préfère un candidat qui dit que les groupes bien introduits pèsent trop et que les électeurs ordinaires doivent compter plus.',
    ],
  },
  'pt-br': {
    T01: [
      'O governo deveria garantir que todos possam usar coisas como escolas e atendimento médico.',
      'O governo deveria fazer menos em coisas como escolas e atendimento médico. Mais serviços deveriam ser feitos por empresas privadas, e cada pessoa deveria escolher.',
    ],
    T02: [
      'O governo deveria usar impostos e ajuda financeira para diminuir a distância entre pessoas muito ricas e pessoas pobres.',
      'O governo deveria interferir menos nas diferenças de renda entre as pessoas, mesmo quando as distâncias ficam muito grandes.',
    ],
    T03: [
      'Os trabalhadores ou o público deveriam ser donos de uma parte maior das grandes empresas.',
      'As grandes empresas deveriam ser, em sua maioria, de donos privados, não do governo. A lei deveria proteger os trabalhadores mesmo assim.',
    ],
    T04: [
      'Quando a maioria das pessoas passa a aceitar uma nova forma de viver, as leis deveriam mudar bem rápido.',
      'As regras antigas deveriam mudar só quando a maioria já aceitar uma nova forma de viver há muito tempo.',
    ],
    T05: [
      'A lei deveria deixar os adultos em paz nas suas escolhas privadas quando ninguém mais sai prejudicado.',
      'A lei pode proibir algumas coisas privadas que adultos fazem por vontade própria, se a maioria acha que são moralmente erradas, mesmo que ninguém saia prejudicado.',
    ],
    T06: [
      'O aborto (terminar uma gravidez) deveria ser legal na maioria dos casos, porque a pessoa grávida deveria tomar a decisão principal.',
      'O aborto deveria ter limites legais mais rígidos, porque a vida antes do nascimento deveria receber mais proteção.',
    ],
    T07: [
      'O governo só deveria limitar a liberdade quando puder mostrar um risco claro e grave de dano.',
      'O governo pode limitar algumas liberdades mais cedo, antes de algo ruim acontecer, se houver um risco real de violência grave ou caos.',
    ],
    T08: [
      'Mesmo depois de ganhar uma eleição, um governo deveria continuar sendo controlado pelos tribunais, pela Constituição (as regras básicas do país) e pela oposição.',
      'Um governo eleito deveria ter liberdade para executar seus planos legais, mesmo quando tribunais e outros grupos independentes se opõem com força.',
    ],
    T09: [
      'Os países deveriam seguir regras internacionais comuns quando um problema é grande demais para um país resolver sozinho.',
      'Cada país deveria ter a palavra final sobre suas decisões, mesmo que isso dificulte resolver juntos os problemas comuns.',
    ],
    T10: [
      'Uma pessoa que se torna cidadã mais tarde pertence ao país tanto quanto uma pessoa que nasceu cidadã.',
      'Ser cidadão desde o nascimento é uma parte importante de pertencer a um país, mais do que a cidadania legal sozinha.',
    ],
    T11: [
      'Os desacordos políticos costumam ser choques reais entre interesses e valores diferentes, e não um lado traindo os eleitores comuns.',
      'Os políticos costumam ouvir demais grupos com bons contatos e de menos os eleitores comuns.',
    ],
    T12: [
      'Quando proteger a natureza e fazer a economia crescer entram claramente em conflito, a natureza deveria às vezes vir primeiro, mesmo que a economia cresça mais devagar.',
      'Quando proteger a natureza e fazer a economia crescer entram em conflito, o crescimento da economia deveria normalmente vir primeiro, e os danos à natureza deveriam ser reduzidos de outras formas.',
    ],
    T13: [
      'Crenças religiosas não deveriam bastar, sozinhas, para justificar leis para pessoas que não têm essa religião.',
      'As leis podem se basear em valores religiosos, mesmo que algumas pessoas do país não tenham essa religião.',
    ],
    T14: [
      'O governo federal ou estadual deveria cuidar de serviços importantes, como escolas e hospitais, se essa for a melhor forma de todos terem o mesmo acesso e a mesma qualidade.',
      'Serviços importantes, como escolas e hospitais, deveriam normalmente ficar com o governo local ou com grupos da comunidade quando conseguem administrá-los bem.',
    ],
    A01: [
      'Se um hospital da região estivesse prestes a fechar, eu apoiaria usar dinheiro público para mantê-lo aberto para todos.',
      'Se um hospital da região funcionasse bem de qualquer jeito, eu escolheria uma empresa privada para administrá-lo em vez de dar mais dinheiro público.',
    ],
    A02: [
      'Se eu trabalhasse e pagasse impostos, aceitaria pagar um pouco mais de imposto se isso diminuísse muito a distância entre ricos e pobres.',
      'Se eu trabalhasse e pagasse impostos, escolheria impostos mais baixos, mesmo que a distância entre ricos e pobres continuasse muito grande.',
    ],
    A03: [
      'Se uma grande empresa desse aos trabalhadores uma parte real da propriedade, mesmo que acionistas de fora perdessem um pouco de controle, eu apoiaria.',
      'Se uma grande empresa estivesse indo bem, eu a manteria principalmente com acionistas privados (pessoas donas de partes da empresa), em vez de dar uma parte grande aos trabalhadores ou ao governo.',
    ],
    A04: [
      'Se uma regra antiga da escola não combinasse mais com a vida da maioria dos estudantes, eu a mudaria logo.',
      'Eu manteria uma regra antiga da escola até que muita gente passasse muito tempo querendo mudá-la.',
    ],
    A05: [
      'Se adultos escolhessem livremente uma relação ou um jeito de viver com o qual eu não concordasse, eu seria contra uma lei que proibisse isso, a menos que prejudicasse alguém diretamente.',
      'Se uma escolha de adultos fosse muito contra os valores que a maioria compartilha, eu poderia apoiar alguns limites legais, mesmo que ninguém saísse prejudicado.',
    ],
    A06: [
      'Se as pessoas votassem sobre as leis do aborto, eu votaria por um acesso legal mais amplo.',
      'Se as pessoas votassem sobre as leis do aborto, eu votaria por limites legais mais rígidos.',
    ],
    A07: [
      'Se houvesse violência grave nas ruas, eu manteria proteções legais fortes, mesmo que a resposta fosse mais lenta.',
      'Se houvesse violência grave nas ruas, eu daria mais poder ao governo por pouco tempo, mesmo que algumas proteções legais diminuíssem.',
    ],
    A08: [
      'Se um tribunal independente anulasse uma lei que eu apoio, eu ainda respeitaria a decisão.',
      'Se tribunais independentes anulassem repetidamente leis aprovadas pelo parlamento, eu consideraria limitar parte dos seus poderes.',
    ],
    A09: [
      'Eu apoiaria um acordo que todos os países tivessem de cumprir, se ele resolvesse um problema compartilhado, mesmo que limitasse algumas escolhas do meu país.',
      'Eu deixaria as decisões nas mãos do meu país, mesmo que isso dificultasse que os países agissem juntos.',
    ],
    A10: [
      'Eu apoiaria que pessoas que se tornaram cidadãs mais tarde pudessem ocupar os mesmos cargos eletivos mais altos, como governar o país, que pessoas que nasceram cidadãs.',
      'Eu apoiaria reservar alguns dos cargos eletivos mais altos, como governar o país, para pessoas que são cidadãs desde o nascimento.',
    ],
    A11: [
      'Prefiro candidatos que expliquem abertamente que as escolhas políticas são difíceis, mesmo que a mensagem seja menos empolgante.',
      'Prefiro candidatos que prometam diminuir o poder de grupos com bons contatos e dar mais voz aos eleitores comuns.',
    ],
    A12: [
      'Eu apoiaria leis que obriguem as empresas a proteger o meio ambiente, mesmo que a economia crescesse um pouco mais devagar.',
      'Eu me oporia a regras ambientais que freiam o crescimento de propósito e preferiria formas de proteger a natureza que mantenham a economia crescendo.',
    ],
    A13: [
      'Eu preferiria que os políticos não se apoiassem principalmente em valores religiosos para explicar leis que se aplicam a todos.',
      'Eu aceitaria que políticos apresentassem valores religiosos como uma boa razão para leis que se aplicam a todos.',
    ],
    A14: [
      'Se serviços como as escolas fossem muito melhores em algumas regiões do que em outras, eu apoiaria padrões nacionais ou estaduais, mesmo que cada lugar decidisse menos.',
      'Se os serviços locais funcionassem bem, eu manteria as decisões no nível local, mesmo que regras nacionais os deixassem mais parecidos.',
    ],
    F01: [
      'Me incomoda quando pessoas ficam sem coisas importantes, como atendimento médico, porque depende demais do que elas conseguem pagar.',
      'Me incomoda quando o controle do governo sobre serviços importantes deixa as pessoas com pouca escolha.',
    ],
    F02: [
      'Distâncias muito grandes entre ricos e pobres me incomodam o suficiente para eu achar que algumas pessoas deveriam pagar impostos mais altos.',
      'Impostos altos me preocupam, mesmo quando servem para diminuir a distância entre ricos e pobres.',
    ],
    F03: [
      'Acho justo que os trabalhadores ou o público em geral sejam donos de uma parte real das grandes empresas.',
      'Acho justo que investidores privados mantenham a maior parte da propriedade das grandes empresas, desde que a lei proteja os trabalhadores.',
    ],
    F04: [
      'Me incomoda quando as regras ficam muito atrás de uma mudança que a maioria apoia.',
      'Me incomoda quando regras antigas mudam antes de a maioria aceitar uma nova forma de viver.',
    ],
    F05: [
      'Me incomoda quando o governo proíbe adultos de fazer escolhas privadas que não prejudicam ninguém.',
      'Me incomoda quando a lei não dá nenhuma atenção aos valores que a maioria das pessoas compartilha, mesmo na vida privada dos adultos.',
    ],
    F06: [
      'Limites ao aborto me preocupam, porque podem tirar da pessoa grávida uma decisão importante.',
      'Um acesso amplo ao aborto me preocupa, porque acredito que a vida antes do nascimento merece mais proteção.',
    ],
    F07: [
      'Em uma crise, me preocupa quando o governo usa mais poder do que precisa.',
      'Em uma crise, me preocupa quando as autoridades têm pouco poder para proteger as pessoas.',
    ],
    F08: [
      'Me preocupa quando quem vence uma eleição enfraquece os controles sobre o próprio poder.',
      'Me preocupa quando tribunais independentes anulam com frequência leis aprovadas por um parlamento eleito.',
    ],
    F09: [
      'Me incomoda quando problemas comuns ficam sem solução porque países recusam acordos que teriam de cumprir.',
      'Me incomoda quando promessas internacionais impedem meu país de tomar sua própria decisão final sobre um assunto importante.',
    ],
    F10: [
      'Sinto tanto pertencimento em relação a cidadãos que chegaram depois e participam da vida da comunidade quanto em relação a quem é cidadão desde o nascimento.',
      'Para o meu sentimento de pertencer a um país, importa que minha família more lá há muito tempo.',
    ],
    F11: [
      'Quando a política me decepciona, costumo pensar que as escolhas são difíceis e que cada grupo quer coisas diferentes.',
      'Quando a política me decepciona, muitas vezes suspeito que grupos com bons contatos são mais ouvidos do que os eleitores comuns.',
    ],
    F12: [
      'Danos graves à natureza me preocupam, mesmo quando evitá-los poderia frear a economia.',
      'Me preocupo com perda de empregos e queda no padrão de vida quando as regras ambientais freiam muito a economia.',
    ],
    F13: [
      'Me sinto desconfortável quando valores religiosos são usados para justificar leis para pessoas que não têm essa fé.',
      'Me sinto desconfortável quando valores religiosos são deixados de lado no debate público só por serem religiosos.',
    ],
    F14: [
      'Me sinto confiante quando o governo nacional ou estadual define o mesmo padrão mínimo para serviços importantes em todo lugar.',
      'Me sinto confiante quando as autoridades locais, como a prefeitura, mantêm o controle em vez de passar as decisões ao governo estadual ou federal.',
    ],
    J01: [
      'O governo deveria garantir que toda família possa usar escolas e médicos.',
      'As famílias deveriam fazer mais escolhas por conta própria, com menos ajuda do governo.',
    ],
    J02: [
      'Os impostos deveriam ajudar a diminuir a distância entre ricos e pobres.',
      'As pessoas deveriam ficar com mais do que ganham, mesmo que a distância continue grande.',
    ],
    J03: [
      'Os trabalhadores ou o público deveriam ser donos de uma parte maior das maiores empresas.',
      'As maiores empresas deveriam pertencer principalmente a donos privados.',
    ],
    J04: [
      'As regras públicas deveriam mudar quando a opinião da maioria muda.',
      'As regras antigas deveriam mudar devagar, depois de as pessoas concordarem por muito tempo.',
    ],
    J05: [
      'Os adultos deveriam ser livres para fazer escolhas privadas se ninguém sai prejudicado.',
      'Algumas escolhas privadas podem ser limitadas para proteger valores que muitas pessoas compartilham.',
    ],
    J06: [
      'Os líderes só deveriam limitar a liberdade quando houver um perigo claro e grave.',
      'Os líderes podem limitar um pouco de liberdade cedo para evitar problemas graves.',
    ],
    J07: [
      'Os tribunais, as leis, outros partidos e os meios de comunicação deveriam fiscalizar os líderes eleitos.',
      'Quem ganha uma eleição deveria ter muita liberdade para fazer o que os eleitores escolheram.',
    ],
    J08: [
      'Os países deveriam seguir regras comuns para problemas que atravessam fronteiras.',
      'Cada país deveria ter a palavra final, mesmo que os problemas compartilhados sejam mais difíceis de resolver.',
    ],
    J09: [
      'Quem se torna cidadão pertence ao país tanto quanto quem é cidadão desde o nascimento.',
      'Ser cidadão desde o nascimento deveria contar mais para decidir quem pertence plenamente.',
    ],
    J10: [
      'Na política costuma haver muitos grupos com necessidades e ideias diferentes.',
      'As decisões políticas podem dar influência demais a grupos com bons contatos e de menos a eleitores comuns.',
    ],
    J11: [
      'Proteger a natureza deveria às vezes vir antes de fazer a economia crescer.',
      'Fazer a economia crescer deveria normalmente vir primeiro, enquanto também protegemos a natureza.',
    ],
    J12: [
      'A religião não deveria ser usada para fazer leis para pessoas que não a compartilham.',
      'A religião pode ser uma razão justa para leis, mesmo que nem todos a compartilhem.',
    ],
    J13: [
      'O governo nacional ou estadual deveria cuidar dos serviços essenciais quando for preciso para garantir o mesmo padrão mínimo.',
      'As comunidades locais deveriam cuidar dos serviços essenciais sempre que puderem oferecê-los bem.',
    ],
    J14: [
      'Se a violência explodisse, eu manteria limites rígidos aos poderes da polícia.',
      'Se a violência explodisse, eu daria mais poder à polícia por pouco tempo.',
    ],
    J15: [
      'Se um tribunal barrasse uma política popular, eu ainda protegeria a independência do tribunal.',
      'Se os tribunais barrassem com frequência políticas legais escolhidas pelos eleitores, eu daria mais liberdade aos líderes eleitos.',
    ],
    J16: [
      'Eu ouviria um candidato que explique as necessidades de diferentes grupos, mesmo que a resposta seja complicada.',
      'Prefiro um candidato que diga que grupos com bons contatos têm influência demais e que os eleitores comuns precisam de mais voz.',
    ],
  },
};

export function schoolYouthStatement(locale: string, sourceItemId: string, polarity: Polarity): string | undefined {
  const pair = (bank as Record<string, Record<string, [string, string]>>)[locale]?.[sourceItemId];
  return pair ? pair[polarity === 'negative' ? 0 : 1] : undefined;
}

export const schoolYouthLocalizedIds = Object.keys(bank.de);
