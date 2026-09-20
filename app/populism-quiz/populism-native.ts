import type { PopulismQuizAngle, PopulismQuizQuestion } from '../../lib/populism-quiz';
import type { Locale } from '../LocaleProvider';

type NativeQuestion = Pick<PopulismQuizQuestion, 'prompt' | 'hint' | 'explanation'> & {
  options: Record<string, { label: string; feedback: string }>;
};

const de: Record<string, NativeQuestion> = {
  P1: { prompt: 'Welche Aussage ist das deutlichste Beispiel für populistische Sprache?', hint: 'Suche nach einer Aussage, die die Gesellschaft in gute normale Menschen und eine korrupte Elite teilt.', options: {
    a: { label: 'Mehrere Gruppen streiten darüber, wofür Steuern ausgegeben werden sollen.', feedback: 'Unterschiedliche Gruppen und Interessen anzuerkennen, ist noch kein Populismus.' },
    b: { label: 'Ein anständiges Volk wird von einer völlig korrupten Führungsschicht verraten.', feedback: 'Hier wird die Gesellschaft moralisch in zwei angeblich einheitliche Gruppen geteilt.' },
    c: { label: 'Das Parlament sollte seine Ausgaben verständlicher veröffentlichen.', feedback: 'Transparenz zu verlangen, ist normale demokratische Kontrolle.' },
    d: { label: 'Kommunen sollten mehr öffentliche Aufgaben übernehmen.', feedback: 'Mehr örtliche Zuständigkeit ist nicht automatisch populistisch.' },
  }, explanation: 'Populismus beschreibt Politik als moralischen Kampf zwischen einem angeblich einheitlichen, anständigen Volk und einer völlig korrupten Elite.' },
  P2: { prompt: 'Eine Partei verfolgt linke Wirtschaftspolitik. Was würde ihre Botschaft populistisch machen?', hint: 'Wirtschaftspolitik allein macht eine Aussage nicht populistisch.', options: {
    a: { label: 'Sie will sehr hohe Einkommen stärker besteuern.', feedback: 'Umverteilung gibt es auch in vielen nicht populistischen Programmen.' },
    b: { label: 'Sie will Gewerkschaften rechtlich besser schützen.', feedback: 'Arbeitnehmerschutz ist für sich genommen nicht populistisch.' },
    c: { label: 'Sie behauptet, nur ihre Bewegung vertrete das anständige Volk gegen alle korrupten Gegner.', feedback: 'Der Anspruch, allein das Volk zu vertreten, und alle Gegner abzuwerten, macht die Aussage populistisch.' },
    d: { label: 'Sie will Krankenhäuser und Schulen öffentlich finanzieren.', feedback: 'Öffentliche Dienstleistungen bestimmen nicht, ob eine Bewegung populistisch ist.' },
  }, explanation: 'Populismus kann sich mit linken, rechten oder anderen Programmen verbinden. Entscheidend ist die Gegenüberstellung von Volk und Elite.' },
  P3: { prompt: 'Warum können populistische Parteien sehr unterschiedliche politische Ziele vertreten?', hint: 'Frage dich, ob Populismus alle politischen Ziele festlegt oder vor allem sagt, wer gegen wen steht.', options: {
    a: { label: 'Er gibt jeder Partei dasselbe Wirtschaftsprogramm vor.', feedback: 'Populistische Parteien können sehr unterschiedliche Wirtschaftspolitik verfolgen.' },
    b: { label: 'Er ist nur eine Sprechweise ohne politische Idee.', feedback: 'Populismus enthält eine politische Aussage über normale Menschen und Eliten.' },
    c: { label: 'Er verlangt von jeder Partei dieselbe Gesellschaftspolitik.', feedback: 'Populistische Parteien unterscheiden sich auch gesellschaftspolitisch stark.' },
    d: { label: 'Er sagt, wer gegen wen steht, legt aber nicht jede Politik fest.', feedback: 'Die Gegenüberstellung von Volk und Elite kann mit verschiedenen politischen Zielen verbunden werden.' },
  }, explanation: 'Populismus sagt, dass gute normale Menschen einer korrupten Elite gegenüberstehen. Er legt aber nicht jede Wirtschafts- oder Gesellschaftspolitik fest.' },
  P4: { prompt: 'Welche Aussage beansprucht am deutlichsten, allein das „wahre Volk“ zu vertreten?', hint: 'Suche nach einer Aussage, in der politische Gegner und ihre Wähler nicht wirklich zählen.', options: {
    a: { label: 'Unser Vorschlag hat mehr Unterstützung als der Plan der Regierung.', feedback: 'Mehr Unterstützung zu beanspruchen, gehört zum normalen politischen Wettbewerb.' },
    b: { label: 'Unsere Gegner vertreten andere Interessen und treffen falsche Entscheidungen.', feedback: 'Gegner für falsch zu halten, erkennt sie trotzdem als politische Teilnehmer an.' },
    c: { label: 'Nur unsere Bewegung spricht für echte Bürger; die Gegner vertreten niemanden, der zählt.', feedback: 'Diese Aussage schließt Gegner und ihre Anhänger aus dem legitimen Volk aus.' },
    d: { label: 'Unser Bündnis vertritt Beschäftigte, Familien und mehrere Regionen.', feedback: 'Mehrere Gruppen zu nennen, ist kein Anspruch, allein alle echten Bürger zu vertreten.' },
  }, explanation: 'Ein wichtiges Warnzeichen ist die Behauptung, nur eine Bewegung vertrete das wahre Volk.' },
  P5: { prompt: 'Ein Politiker verliert eine Wahl und sagt, echte Bürger könnten ihn niemals ablehnen. Was ist das Warnzeichen?', hint: 'Achte darauf, ob Menschen mit einer anderen Wahlentscheidung weiterhin als echte Bürger gelten.', options: {
    a: { label: 'Er beantragt eine Neuauszählung nach geltendem Recht.', feedback: 'Eine rechtmäßige Neuauszählung stellt andere Wähler nicht automatisch infrage.' },
    b: { label: 'Er behandelt nur seine Anhänger als das wahre Volk.', feedback: 'Damit werden andere Wähler aus der echten Öffentlichkeit ausgeschlossen.' },
    c: { label: 'Er möchte, dass Parteien aktiver Wahlkampf führen.', feedback: 'Aktiver Wahlkampf hat mit dieser Ausgrenzung nichts zu tun.' },
    d: { label: 'Er wünscht sich bei künftigen Wahlen eine höhere Beteiligung.', feedback: 'Mehr Wahlbeteiligung anzustreben, spricht anderen Bürgern ihre Zugehörigkeit nicht ab.' },
  }, explanation: 'Wer nur die eigenen Anhänger als „wahres Volk“ gelten lässt, kann jede Wahlniederlage unabhängig von Belegen für ungültig erklären.' },
  P6: { prompt: 'Welche Sichtweise respektiert eine politisch vielfältige Bevölkerung am besten?', hint: 'In einer Demokratie können Menschen stark widersprechen und trotzdem gleichberechtigt dazugehören.', options: {
    a: { label: 'Eine Partei verkörpert von Natur aus den einzigen wahren Volkswillen.', feedback: 'Das setzt einen einzigen wahren Volkswillen voraus, den nur eine Partei vertreten kann.' },
    b: { label: 'Bürger dürfen unterschiedliche Interessen unterstützen, ohne weniger dazuzugehören.', feedback: 'Diese Sicht erkennt politische Unterschiede an, ohne Bürger auszuschließen.' },
    c: { label: 'Nur Wähler der Mehrheit gehören wirklich zur Gesellschaft.', feedback: 'Eine Mehrheitsentscheidung bestimmt nicht, wer als Bürger zählt.' },
    d: { label: 'Kritik an der gewählten Führung richtet sich gegen das Volk.', feedback: 'Eine gewählte Führung ist nicht mit der gesamten Bevölkerung identisch.' },
  }, explanation: 'Demokratische Vielfalt bedeutet, dass Bürger unterschiedliche Interessen und Ansichten haben dürfen, ohne dass eine Seite allein das „wahre Volk“ ist.' },
  P7: { prompt: 'Welche Aussage geht über harte Kritik hinaus und lehnt die Opposition als legitim ab?', hint: 'Demokratische Gegner können sich irren, ohne Feinde oder Verräter zu sein.', options: {
    a: { label: 'Der Haushalt der Opposition würde die Schulden zu schnell erhöhen.', feedback: 'Das kritisiert eine Politik, erkennt die Opposition aber weiterhin an.' },
    b: { label: 'Die Opposition hat nicht erklärt, wie ihr Plan funktionieren soll.', feedback: 'Eine Erklärung zu verlangen, ist normale demokratische Kritik.' },
    c: { label: 'Die Anhänger der Opposition sind Verräter und dürfen niemals regieren.', feedback: 'Das bestreitet legitimen politischen Wettbewerb, statt eine Politik zu kritisieren.' },
    d: { label: 'Die Opposition sollte vor der Wahl ihre Führung austauschen.', feedback: 'Das ist parteiliche Kritik, aber nicht zwingend eine Ablehnung legitimer Opposition.' },
  }, explanation: 'Demokratie erlaubt heftigen Streit. Gegner grundsätzlich als unrechtmäßig oder verräterisch zu behandeln, greift politische Vielfalt an.' },
  P8: { prompt: 'Warum kann es demokratisch gefährlich werden, jeden Kompromiss als Verrat zu bezeichnen?', hint: 'Denke an eine Gesellschaft, in der nicht alle Menschen dasselbe wollen.', options: {
    a: { label: 'Es unterstellt einen einzigen Volkswillen und verwirft berechtigte Unterschiede.', feedback: 'Vielfältige Gesellschaften brauchen Verhandlungen zwischen berechtigten Interessen.' },
    b: { label: 'Es führt immer zu einer zu teuren Wirtschaftspolitik.', feedback: 'Das demokratische Problem betrifft Vielfalt, nicht ein bestimmtes Wirtschaftsergebnis.' },
    c: { label: 'Es verhindert, dass Parteien Wahlprogramme veröffentlichen.', feedback: 'Harte Sprache gegen Kompromisse verhindert nicht automatisch Wahlprogramme.' },
    d: { label: 'Es macht Koalitionen in jeder Verfassung rechtlich unmöglich.', feedback: 'Das Problem ist politisch und kein automatisches gesetzliches Koalitionsverbot.' },
  }, explanation: 'Kompromisse dürfen kritisiert werden. Jeden Kompromiss als Verrat abzulehnen, bestreitet aber berechtigte Unterschiede zwischen Bürgern.' },
  P9: { prompt: 'Eine gewählte Regierung sagt, ihr Wahlsieg gebe ihr bis zur nächsten Wahl unbegrenzte Macht. Was fehlt?', hint: 'Ein Wahlsieg gibt Macht zum Regieren. Frage dich aber, ob weiterhin Grenzen gelten.', options: {
    a: { label: 'Das Versprechen, die Zahl der Parteien zu verringern.', feedback: 'Weniger Parteien lösen den Anspruch auf unbegrenzte Macht nicht.' },
    b: { label: 'Grundrechte, gesetzliche Grenzen und fairer Wettbewerb zwischen Wahlen.', feedback: 'Auch gewählte Regierungen bleiben an Rechte, Gesetze und fairen Wettbewerb gebunden.' },
    c: { label: 'Ein ausführlicher Wirtschaftsplan für die ganze Amtszeit.', feedback: 'Mehr Einzelheiten zur Politik beantworten den Anspruch auf unbegrenzte Macht nicht.' },
    d: { label: 'Die Pflicht, jede Entscheidung durch eine Volksabstimmung zu treffen.', feedback: 'Volksabstimmungen ersetzen keine Rechte und Grenzen staatlicher Macht.' },
  }, explanation: 'Ein Wahlsieg verleiht Regierungsgewalt, aber keine unbegrenzte Macht über Rechte, Gesetze oder künftigen Wettbewerb.' },
  P10: { prompt: 'Ein Gericht stoppt eine rechtswidrige Maßnahme. Welche Reaktion ist das deutlichste demokratische Warnzeichen?', hint: 'Eine Reaktion nutzt den Rechtsweg. Eine andere sagt, Gerichte dürften gewählte Regierungen niemals begrenzen.', options: {
    a: { label: 'Die Regierung legt auf dem normalen Rechtsweg Berufung ein.', feedback: 'Der Rechtsweg erkennt die berechtigte Rolle des Gerichts an.' },
    b: { label: 'Die Regierung erklärt öffentlich ihre rechtlichen Einwände.', feedback: 'Öffentlicher rechtlicher Widerspruch ist mit unabhängigen Gerichten vereinbar.' },
    c: { label: 'Die Führung sagt, Gerichte dürften eine gewählte Regierung niemals begrenzen.', feedback: 'Das lehnt eine Institution ab, die gesetzliche Grenzen staatlicher Macht durchsetzt.' },
    d: { label: 'Das Parlament erwägt eine Gesetzesänderung für künftige Fälle.', feedback: 'Künftige Gesetze rechtmäßig zu ändern, bestreitet nicht die Rolle der Gerichte.' },
  }, explanation: 'Urteile dürfen kritisiert werden. Unabhängigen Gerichten jedes Recht auf Kontrolle abzusprechen, greift eine demokratische Schutzvorkehrung an.' },
  P11: { prompt: 'Welche Reaktion auf kritischen Journalismus richtet sich am deutlichsten gegen politische Vielfalt?', hint: 'Achte darauf, ob Kritik beantwortet oder mit Macht beseitigt wird.', options: {
    a: { label: 'Der Minister veröffentlicht Belege gegen den Bericht der Zeitung.', feedback: 'Mit Belegen zu antworten, akzeptiert öffentliche Kontrolle.' },
    b: { label: 'Die Partei gibt einer Fernsehsendung keine Interviews mehr.', feedback: 'Das kann fragwürdig sein, ist aber weniger eindeutig als staatliches Schweigenlassen.' },
    c: { label: 'Die Führung fordert die Schließung unabhängiger kritischer Medien.', feedback: 'Unabhängige Kritik mit Macht auszuschalten, greift Vielfalt und Kontrolle an.' },
    d: { label: 'Die Regierung verlangt die Berichtigung eines Sachfehlers.', feedback: 'Eine Berichtigung zu verlangen, bestreitet nicht die Berechtigung unabhängiger Medien.' },
  }, explanation: 'Regierende dürfen Berichte bestreiten. Unabhängige Kritiker schließen zu wollen, greift Meinungsfreiheit und öffentliche Kontrolle an.' },
  P12: { prompt: 'Ein Politiker vertraut Wahlbehörden nur, wenn er gewinnt. Welches Prinzip lehnt er ab?', hint: 'Faire Regeln müssen gelten, unabhängig davon, welchem Kandidaten sie nützen.', options: {
    a: { label: 'Unabhängige Wahlleitung nach gleichbleibenden Regeln.', feedback: 'Wahlleitung nur beim eigenen Sieg anzuerkennen, greift faire Wahlen an.' },
    b: { label: 'Die Freiheit der Parteien, eigene Wahlslogans zu wählen.', feedback: 'Wahlslogans haben mit der Anerkennung von Wahlergebnissen nichts zu tun.' },
    c: { label: 'Das Recht der Regierung, Änderungen am Wahlrecht vorzuschlagen.', feedback: 'Rechtmäßige Reformvorschläge sind etwas anderes als ergebnisabhängiges Vertrauen.' },
    d: { label: 'Die Möglichkeit der Wähler, im Wahlkampf ihre Meinung zu ändern.', feedback: 'Wählerentscheidungen beantworten nicht die Frage nach neutraler Wahlleitung.' },
  }, explanation: 'Wahlbehörden und Regeln können nicht nur dann gültig sein, wenn sie das gewünschte Ergebnis liefern.' },
  P13: { prompt: 'Welche Aussage reicht allein nicht aus, um Populismus festzustellen?', hint: 'Ein Vorwurf unfairen Einflusses kann wahr sein. Frage dich, ob zusätzlich nur eine Bewegung für das wahre Volk sprechen darf.', options: {
    a: { label: 'Nur eine Bewegung vertrete die echten Bürger.', feedback: 'Der alleinige Anspruch auf die echten Bürger ist ein zentrales Warnzeichen.' },
    b: { label: 'Alle politischen Gegner dienten einer korrupten Elite.', feedback: 'Das verbindet die Gegenüberstellung von Volk und Elite mit der Ablehnung legitimer Gegner.' },
    c: { label: 'Belege zeigen, dass reiche Spender Politik beeinflussten und Firmen Steuern vermieden.', feedback: 'Belegte Kritik an Einfluss oder Steuervermeidung ist nicht automatisch populistisch.' },
    d: { label: 'Wer der Führung widerspreche, verrate das Volk.', feedback: 'Das setzt die Führung mit dem gesamten Volk gleich und schließt Widerspruch aus.' },
  }, explanation: 'Machtkonzentration, Lobbyismus und Steuervermeidung können real sein. Populismus fügt den Anspruch eines einzigen wahren Volkes, eines völlig korrupten Gegners oder einer allein berechtigten Vertretung hinzu.' },
  P14: { prompt: 'Ein Politiker ist äußerst beliebt und spricht emotional. Was können wir daraus schließen?', hint: 'Beliebtheit oder Gefühle zeigen nicht, was jemand über Volk, Eliten oder politische Gegner glaubt.', options: {
    a: { label: 'Der Politiker ist zwangsläufig populistisch.', feedback: 'Beliebtheit und emotionale Sprache reichen nicht aus, um Populismus festzustellen.' },
    b: { label: 'Ein beliebter Politiker kann nicht populistisch sein.', feedback: 'Beliebtheit beweist Populismus weder, noch schließt sie ihn aus.' },
    c: { label: 'Wir brauchen Aussagen über Volk, Eliten und den Anspruch auf Vertretung.', feedback: 'Für die Einordnung zählen die politischen Aussagen, nicht nur Beliebtheit oder Stil.' },
    d: { label: 'Der Politiker muss Volksabstimmungen unterstützen.', feedback: 'Emotionale Sprache verrät keine Haltung zu Volksabstimmungen.' },
  }, explanation: 'Populismus ist kein anderes Wort für Beliebtheit, einfache Sprache, Ausstrahlung oder einen gefühlvollen Wahlkampf.' },
  P15: { prompt: 'Welche Elitenkritik kann vollständig mit einer vielfältigen Demokratie vereinbar sein?', hint: 'Suche nach belegter Kritik, die Gerichte, Wahlen und politische Gegner weiterhin anerkennt.', options: {
    a: { label: 'Konkrete Verstöße untersuchen und dabei Gerichte, Belege und Opposition anerkennen.', feedback: 'Das verlangt Verantwortung, ohne alleinige Vertretung zu beanspruchen oder Vielfalt abzulehnen.' },
    b: { label: 'Jede Institution als korrupt bezeichnen, sobald sie die Regierung begrenzt.', feedback: 'Alle Grenzen je nach Ergebnis anzugreifen, schwächt demokratische Kontrolle.' },
    c: { label: 'Gegner und ihre Wähler zu unechten Bürgern erklären.', feedback: 'Das schließt politische Gegner aus der berechtigten Öffentlichkeit aus.' },
    d: { label: 'Annehmen, dass eine Führung den einzigen Volkswillen direkt ausdrückt.', feedback: 'Das löscht berechtigte Unterschiede zwischen Bürgern aus.' },
  }, explanation: 'Demokratie braucht die Kontrolle mächtiger Gruppen. Belegte Kritik muss weder Vielfalt noch unabhängige Schutzvorkehrungen ablehnen.' },
  P16: { prompt: 'Was ist der deutlichste Unterschied zwischen Populismus und Nationalismus?', hint: 'Frage dich, ob es um normale Menschen gegen Eliten oder um die Nation geht.', options: {
    a: { label: 'Populismus stellt Volk und Elite gegenüber; Nationalismus stellt die Nation in den Mittelpunkt.', feedback: 'Das trennt die Gegenüberstellung von Volk und Elite vom besonderen Gewicht der Nation.' },
    b: { label: 'Populismus ist links; Nationalismus ist immer rechts.', feedback: 'Beide können sich mit linken oder rechten Programmen verbinden.' },
    c: { label: 'Populismus lehnt Wahlen ab; Nationalismus unterstützt sie immer.', feedback: 'Keiner der Begriffe legt allein die Haltung zu Wahlen fest.' },
    d: { label: 'Populismus betrifft Steuern; Nationalismus nur Einwanderung.', feedback: 'Keiner der Begriffe wird durch ein einziges Politikfeld bestimmt.' },
  }, explanation: 'Populismus ordnet Politik als Volk gegen Elite. Nationalismus gibt der Nation besonderes politisches Gewicht. Beides kann zusammenkommen.' },
  P17: { prompt: 'Warum sind Populismus und autoritäre Herrschaft nicht dasselbe?', hint: 'Frage dich, ob eine politische Botschaft oder ein System mit konzentrierter Macht beschrieben wird.', options: {
    a: { label: 'Populismus betrifft Eigentum; autoritäre Herrschaft betrifft Steuern.', feedback: 'Keiner der Begriffe wird durch diesen wirtschaftlichen Gegensatz bestimmt.' },
    b: { label: 'Populismus beschreibt Vertretung; autoritäre Herrschaft beschränkt Wettbewerb und verteilt Macht einseitig.', feedback: 'Das trennt eine Aussage über Volk und Elite von einem System mit begrenztem Wettbewerb.' },
    c: { label: 'Populismus ist demokratisch; autoritäre Staaten führen niemals Wahlen durch.', feedback: 'Populismus kann Vielfalt angreifen, und autoritäre Staaten können kontrollierte Wahlen abhalten.' },
    d: { label: 'Zwischen beiden Begriffen gibt es keinen wichtigen Unterschied.', feedback: 'Die Begriffe können sich überschneiden, beschreiben aber unterschiedliche Dinge.' },
  }, explanation: 'Populismus macht eine Aussage darüber, wer das Volk vertritt. Autoritäre Herrschaft bedeutet konzentrierte Macht und eingeschränkten politischen Wettbewerb.' },
  P18: { prompt: 'Warum ist eine Volksabstimmung nicht automatisch populistisch?', hint: 'Eine Volksabstimmung ist eine Art, eine Entscheidung zu treffen. Sagt das allein schon etwas über Volk und Eliten?', options: {
    a: { label: 'Populistische Bewegungen nutzen niemals Volksabstimmungen.', feedback: 'Populistische Bewegungen können Volksabstimmungen unterstützen, besitzen dieses Verfahren aber nicht.' },
    b: { label: 'Volksabstimmungen schützen immer Minderheiten und unabhängige Institutionen.', feedback: 'Volksabstimmungen schützen Rechte und Institutionen nicht automatisch.' },
    c: { label: 'Das Verfahren kann ohne eine Aussage über Volk gegen Elite genutzt werden.', feedback: 'Eine Volksabstimmung kann ohne populistische Sprache oder alleinigen Vertretungsanspruch stattfinden.' },
    d: { label: 'Nur örtliche Volksabstimmungen können frei von populistischen Aussagen sein.', feedback: 'Die staatliche Ebene bestimmt nicht, ob die politische Aussage populistisch ist.' },
  }, explanation: 'Direkte Demokratie ist ein Verfahren. Mit Populismus ist sie erst verbunden, wenn populistische Aussagen oder eine ausgrenzende Nutzung hinzukommen.' },
};

const es: Record<string, NativeQuestion> = {
  P1: { prompt: '¿Qué afirmación es el ejemplo más claro de un enfoque populista?', hint: 'Busca una frase que divida la sociedad entre gente común buena y una élite corrupta.', options: {
    a: { label: 'Varios grupos discrepan sobre cómo gastar los impuestos.', feedback: 'Reconocer distintos grupos e intereses no es el núcleo del populismo.' },
    b: { label: 'Un pueblo honrado es traicionado por una élite totalmente corrupta.', feedback: 'La sociedad queda dividida moralmente en dos grupos supuestamente unidos.' },
    c: { label: 'El Parlamento debería publicar mejor sus gastos.', feedback: 'Pedir transparencia puede ser control democrático normal.' },
    d: { label: 'Los municipios deberían gestionar más servicios públicos.', feedback: 'Dar más poder local no es necesariamente populismo.' },
  }, explanation: 'El populismo presenta la política como una lucha moral entre un pueblo supuestamente unido y honrado y una élite totalmente corrupta.' },
  P2: { prompt: 'Un partido tiene políticas económicas de izquierda. ¿Qué haría populista su mensaje?', hint: 'La política económica por sí sola no define el populismo.', options: {
    a: { label: 'Propone subir los impuestos a las rentas muy altas.', feedback: 'La redistribución aparece también en muchos programas no populistas.' },
    b: { label: 'Propone mayor protección legal para los sindicatos.', feedback: 'Proteger a los trabajadores no es por sí solo una idea populista.' },
    c: { label: 'Afirma que solo su movimiento representa al pueblo honrado frente a todos sus rivales corruptos.', feedback: 'Afirmar que solo uno representa al pueblo y deslegitimar a todos los rivales hace populista el mensaje.' },
    d: { label: 'Propone financiar públicamente hospitales y escuelas.', feedback: 'Los servicios públicos no determinan si un movimiento es populista.' },
  }, explanation: 'El populismo puede combinarse con programas de izquierda, derecha u otros. La clave es enfrentar al pueblo con la élite.' },
  P3: { prompt: '¿Por qué los partidos populistas pueden defender políticas muy diferentes?', hint: 'Pregúntate si el populismo fija todas las políticas o principalmente dice quién está contra quién.', options: {
    a: { label: 'Da a todos los partidos el mismo programa económico.', feedback: 'Los partidos populistas pueden defender políticas económicas muy distintas.' },
    b: { label: 'Es solo una forma de hablar sin ninguna idea política.', feedback: 'El populismo hace una afirmación política sobre la gente común y las élites.' },
    c: { label: 'Exige a todos los partidos las mismas políticas sociales.', feedback: 'Los partidos populistas también pueden diferir mucho en política social.' },
    d: { label: 'Dice quién está contra quién, pero no fija cada política.', feedback: 'La idea de pueblo contra élite puede combinarse con políticas diferentes.' },
  }, explanation: 'El populismo dice que la gente común buena se enfrenta a una élite corrupta. No decide todas las políticas económicas o sociales.' },
  P4: { prompt: '¿Qué afirmación dice más claramente que solo un movimiento representa al «pueblo real»?', hint: 'Busca una frase que diga que los rivales políticos y sus votantes no cuentan de verdad.', options: {
    a: { label: 'Nuestra propuesta tiene más apoyo que el plan del Gobierno.', feedback: 'Afirmar que se tiene más apoyo forma parte de la competencia política normal.' },
    b: { label: 'Nuestros rivales representan otros intereses y toman malas decisiones.', feedback: 'Decir que los rivales se equivocan todavía los reconoce como participantes políticos.' },
    c: { label: 'Solo nuestro movimiento habla por los ciudadanos reales; los rivales no representan a nadie que cuente.', feedback: 'La frase excluye a los rivales y a sus votantes del pueblo legítimo.' },
    d: { label: 'Nuestra coalición representa a trabajadores, familias y varias regiones.', feedback: 'Nombrar varios grupos no equivale a representar en exclusiva a todos los ciudadanos reales.' },
  }, explanation: 'Una señal populista importante es afirmar que solo un movimiento representa al pueblo auténtico.' },
  P5: { prompt: 'Un líder pierde unas elecciones y dice que los ciudadanos reales nunca podrían rechazarlo. ¿Cuál es la señal de alarma?', hint: 'Observa si quienes votaron de otra forma siguen siendo tratados como ciudadanos reales.', options: {
    a: { label: 'Solicita un recuento conforme a la ley.', feedback: 'Un recuento legal no niega por sí solo la legitimidad de otros votantes.' },
    b: { label: 'Trata únicamente a sus seguidores como el pueblo auténtico.', feedback: 'La frase excluye a los votantes contrarios del público legítimo.' },
    c: { label: 'Quiere que los partidos hagan campañas más activas.', feedback: 'La actividad de campaña no tiene relación con esa exclusión.' },
    d: { label: 'Cree que debería votar más gente en futuras elecciones.', feedback: 'Defender una mayor participación no niega que los demás sean ciudadanos.' },
  }, explanation: 'Considerar «pueblo real» solo a los propios seguidores permite declarar ilegítima cualquier derrota, haya pruebas o no.' },
  P6: { prompt: '¿Qué postura respeta mejor una sociedad con distintas ideas políticas?', hint: 'En democracia, las personas pueden discrepar mucho y seguir perteneciendo en igualdad.', options: {
    a: { label: 'Un partido expresa de forma natural la única voluntad auténtica del pueblo.', feedback: 'Esto supone una sola voluntad auténtica que únicamente un partido puede representar.' },
    b: { label: 'La ciudadanía puede apoyar intereses distintos sin perder legitimidad.', feedback: 'Reconoce diferencias políticas sin excluir a nadie del público.' },
    c: { label: 'Solo quienes votan con la mayoría pertenecen realmente a la sociedad.', feedback: 'La mayoría no decide quién cuenta como ciudadano legítimo.' },
    d: { label: 'Criticar al líder elegido es oponerse a la voluntad del pueblo.', feedback: 'Un líder elegido no es idéntico a toda la población.' },
  }, explanation: 'La diversidad democrática acepta intereses y opiniones diferentes sin afirmar que un grupo sea el único «pueblo real».' },
  P7: { prompt: '¿Qué afirmación pasa de una crítica dura a rechazar la oposición legítima?', hint: 'Los rivales democráticos pueden equivocarse sin ser enemigos ni traidores.', options: {
    a: { label: 'El presupuesto de la oposición aumentaría la deuda demasiado rápido.', feedback: 'Critica una política, pero acepta la legitimidad de la oposición.' },
    b: { label: 'La oposición no ha explicado cómo funcionará su plan.', feedback: 'Pedir una explicación es una crítica democrática normal.' },
    c: { label: 'Los votantes de la oposición son traidores sin derecho a gobernar.', feedback: 'Niega la competencia política legítima en vez de discutir una política.' },
    d: { label: 'La oposición debería cambiar de líder antes de las elecciones.', feedback: 'Es una crítica partidista, no necesariamente un rechazo de la oposición legítima.' },
  }, explanation: 'La democracia permite grandes desacuerdos. Tratar a los rivales como ilegítimos o traidores ataca la diversidad política.' },
  P8: { prompt: '¿Por qué puede ser peligroso para la democracia llamar traición a todo acuerdo?', hint: 'Piensa en una sociedad donde no todas las personas quieren lo mismo.', options: {
    a: { label: 'Supone una única voluntad popular y rechaza diferencias legítimas.', feedback: 'Las sociedades diversas necesitan negociar entre intereses legítimos.' },
    b: { label: 'Siempre produce políticas económicas demasiado caras.', feedback: 'El problema democrático es la diversidad, no un resultado económico concreto.' },
    c: { label: 'Impide que los partidos publiquen programas electorales.', feedback: 'La retórica contra los acuerdos no impide automáticamente publicar programas.' },
    d: { label: 'Hace ilegales las coaliciones en todas las constituciones.', feedback: 'El efecto es político, no una prohibición legal automática.' },
  }, explanation: 'Los acuerdos pueden criticarse. Pero llamarlos siempre traición niega que la ciudadanía tenga intereses legítimos distintos.' },
  P9: { prompt: 'Un Gobierno elegido dice que ganar le da poder ilimitado hasta la próxima elección. ¿Qué falta?', hint: 'Ganar da poder para gobernar, pero pregúntate si todavía existen límites.', options: {
    a: { label: 'Una promesa de reducir el número de partidos.', feedback: 'Tener menos partidos no corrige la idea de poder ilimitado.' },
    b: { label: 'Derechos, límites legales y competencia justa entre elecciones.', feedback: 'La autoridad democrática sigue limitada por derechos, leyes y futura competencia.' },
    c: { label: 'Un programa económico detallado para todo el mandato.', feedback: 'Más detalles políticos no responden a la idea de poder ilimitado.' },
    d: { label: 'La obligación de decidirlo todo mediante referéndum.', feedback: 'Los referéndums no sustituyen los derechos ni los límites al Gobierno.' },
  }, explanation: 'Ganar unas elecciones da autoridad para gobernar, no poder ilimitado sobre derechos, leyes o futura competencia.' },
  P10: { prompt: 'Un tribunal bloquea una medida ilegal. ¿Qué respuesta es la señal democrática más clara?', hint: 'Una respuesta usa el proceso legal. Otra dice que los tribunales nunca deben limitar a líderes elegidos.', options: {
    a: { label: 'El Gobierno recurre mediante el proceso legal normal.', feedback: 'Usar el recurso legal reconoce el papel legítimo del tribunal.' },
    b: { label: 'El Gobierno publica sus argumentos jurídicos contra la sentencia.', feedback: 'El desacuerdo jurídico público es compatible con tribunales independientes.' },
    c: { label: 'El líder dice que ningún tribunal puede limitar a un Gobierno elegido.', feedback: 'Rechaza una institución que hace cumplir los límites legales al poder.' },
    d: { label: 'El Parlamento estudia cambiar la ley para casos futuros.', feedback: 'Cambiar legalmente normas futuras no niega la legitimidad de los tribunales.' },
  }, explanation: 'Las sentencias pueden criticarse. Negar que tribunales independientes puedan aplicar límites legales ataca una garantía democrática.' },
  P11: { prompt: '¿Qué respuesta al periodismo crítico es más claramente contraria a la diversidad?', hint: 'Fíjate en si la crítica recibe una respuesta o se elimina por la fuerza.', options: {
    a: { label: 'El ministro publica pruebas contra el reportaje del periódico.', feedback: 'Responder con pruebas acepta el control público.' },
    b: { label: 'El partido deja de conceder entrevistas a un programa.', feedback: 'Puede ser cuestionable, pero no es tan claro como usar el poder para silenciar.' },
    c: { label: 'El líder pide cerrar los medios independientes que lo critican.', feedback: 'Usar el poder para eliminar medios críticos ataca la diversidad y el control.' },
    d: { label: 'El Gobierno solicita corregir un error de hecho.', feedback: 'Pedir una corrección no niega la legitimidad de medios independientes.' },
  }, explanation: 'Los gobernantes pueden cuestionar noticias. Intentar cerrar a críticos independientes ataca la expresión libre y el control público.' },
  P12: { prompt: 'Un líder solo confía en las autoridades electorales cuando gana. ¿Qué principio rechaza?', hint: 'Las reglas justas deben valer sin importar a qué candidato benefician.', options: {
    a: { label: 'Una administración electoral independiente con reglas constantes.', feedback: 'Aceptar la administración solo al ganar ataca la integridad electoral.' },
    b: { label: 'La libertad de los partidos para elegir sus lemas.', feedback: 'Los lemas no tienen relación con aceptar la administración electoral.' },
    c: { label: 'La autoridad del Gobierno para proponer reformas electorales.', feedback: 'Proponer reformas legales es distinto de confiar según el resultado.' },
    d: { label: 'La capacidad del electorado para cambiar de opinión.', feedback: 'La decisión del votante no responde a la neutralidad de la administración.' },
  }, explanation: 'Las autoridades y reglas electorales no pueden ser legítimas solo cuando dan el resultado que un líder desea.' },
  P13: { prompt: '¿Qué afirmación no basta por sí sola para identificar populismo?', hint: 'Una denuncia de influencia injusta puede ser cierta. Pregúntate si además dice que solo un movimiento habla por el pueblo real.', options: {
    a: { label: 'Solo un movimiento representa a los ciudadanos auténticos.', feedback: 'La representación exclusiva del pueblo auténtico es una señal central.' },
    b: { label: 'Todos los rivales políticos sirven a una élite corrupta.', feedback: 'Une el conflicto pueblo-élite con el rechazo de rivales legítimos.' },
    c: { label: 'Hay pruebas de que donantes ricos influyeron y empresas evitaron impuestos.', feedback: 'La crítica con pruebas a la influencia o la evasión fiscal no es automáticamente populista.' },
    d: { label: 'Discrepar del líder es traicionar al pueblo.', feedback: 'Equipara al líder con el pueblo y excluye el desacuerdo legítimo.' },
  }, explanation: 'La concentración de influencia, los grupos de presión y la evasión fiscal pueden ser reales. El populismo añade un único pueblo auténtico, un enemigo totalmente corrupto o una representación exclusiva.' },
  P14: { prompt: 'Un político es muy popular y habla con emoción. ¿Qué podemos concluir?', hint: 'La popularidad o la emoción no muestran qué cree sobre el pueblo, las élites o sus rivales.', options: {
    a: { label: 'El político es necesariamente populista.', feedback: 'La popularidad y el lenguaje emocional no bastan para identificar populismo.' },
    b: { label: 'Un político popular no puede ser populista.', feedback: 'La popularidad no demuestra ni descarta el populismo.' },
    c: { label: 'Necesitamos afirmaciones sobre pueblo, élites y representación.', feedback: 'La clasificación requiere esas afirmaciones, no solo popularidad o estilo.' },
    d: { label: 'El político debe apoyar la democracia directa.', feedback: 'Hablar con emoción no revela una postura sobre democracia directa.' },
  }, explanation: 'Populismo no es sinónimo de popularidad, lenguaje sencillo, carisma o campaña emocional.' },
  P15: { prompt: '¿Qué crítica a las élites puede ser plenamente compatible con una democracia diversa?', hint: 'Busca críticas basadas en pruebas que sigan aceptando tribunales, elecciones y rivales políticos.', options: {
    a: { label: 'Investigar abusos concretos aceptando tribunales, pruebas y oposición legítima.', feedback: 'Exige responsabilidad sin reclamar representación exclusiva ni rechazar la diversidad.' },
    b: { label: 'Llamar corrupta a toda institución que limite al Gobierno.', feedback: 'Atacar todos los límites según el resultado debilita el control democrático.' },
    c: { label: 'Declarar que los rivales y sus votantes no son ciudadanos reales.', feedback: 'Excluye a los rivales políticos del público legítimo.' },
    d: { label: 'Suponer que un líder expresa directamente una única voluntad popular.', feedback: 'Borra las diferencias legítimas entre ciudadanos.' },
  }, explanation: 'La democracia necesita controlar a los poderosos. Una crítica basada en pruebas no tiene que rechazar la diversidad ni las garantías independientes.' },
  P16: { prompt: '¿Cuál es la diferencia más clara entre populismo y nacionalismo?', hint: 'Pregúntate si la frase trata de gente común contra élites o de la nación.', options: {
    a: { label: 'El populismo enfrenta pueblo y élite; el nacionalismo centra la nación.', feedback: 'Distingue el conflicto pueblo-élite de dar importancia política especial a la nación.' },
    b: { label: 'El populismo es de izquierda; el nacionalismo siempre de derecha.', feedback: 'Ambos pueden combinarse con programas de izquierda o derecha.' },
    c: { label: 'El populismo rechaza elecciones; el nacionalismo siempre las apoya.', feedback: 'Ninguno de los conceptos decide por sí solo la postura ante elecciones.' },
    d: { label: 'El populismo trata de impuestos; el nacionalismo solo de inmigración.', feedback: 'Ninguno se define por un único ámbito político.' },
  }, explanation: 'El populismo organiza la política como pueblo contra élite. El nacionalismo da importancia especial a la nación. Pueden combinarse.' },
  P17: { prompt: '¿Por qué populismo y autoritarismo no son lo mismo?', hint: 'Pregúntate si se describe un mensaje político o un sistema que concentra el poder y limita la competencia.', options: {
    a: { label: 'El populismo trata de propiedad; el autoritarismo de impuestos.', feedback: 'Ningún concepto se define por ese contraste económico.' },
    b: { label: 'El populismo habla de representación; el autoritarismo limita competencia y concentra poder.', feedback: 'Distingue una afirmación sobre pueblo y élite de un sistema con competencia restringida.' },
    c: { label: 'El populismo es democrático; el autoritarismo nunca celebra elecciones.', feedback: 'El populismo puede atacar la diversidad y los sistemas autoritarios pueden celebrar elecciones controladas.' },
    d: { label: 'No existe ninguna diferencia importante entre ambos conceptos.', feedback: 'A veces se solapan, pero describen cosas distintas.' },
  }, explanation: 'El populismo afirma quién representa al pueblo. El autoritarismo describe poder concentrado y competencia política restringida.' },
  P18: { prompt: '¿Por qué un referéndum no es automáticamente populista?', hint: 'Un referéndum es una forma de decidir. ¿Dice eso por sí solo algo sobre pueblo y élites?', options: {
    a: { label: 'Los movimientos populistas nunca usan referéndums.', feedback: 'Pueden apoyarlos, pero no son dueños de este procedimiento.' },
    b: { label: 'Los referéndums siempre protegen minorías e instituciones independientes.', feedback: 'No protegen automáticamente derechos o instituciones.' },
    c: { label: 'El procedimiento puede usarse sin enfrentar al pueblo con la élite.', feedback: 'Puede celebrarse sin enfoque populista ni representación exclusiva.' },
    d: { label: 'Solo los referéndums locales pueden evitar afirmaciones populistas.', feedback: 'El nivel de gobierno no decide si el mensaje es populista.' },
  }, explanation: 'La democracia directa es un procedimiento. Solo se relaciona con el populismo cuando se une a afirmaciones populistas o a un uso excluyente.' },
};

const fr: Record<string, NativeQuestion> = {
  P1: { prompt: 'Quelle affirmation illustre le plus clairement un discours populiste ?', hint: 'Cherche une phrase qui divise la société entre des gens ordinaires honnêtes et une élite corrompue.', options: {
    a: { label: 'Plusieurs groupes ne sont pas d’accord sur l’utilisation des impôts.', feedback: 'Reconnaître plusieurs groupes et intérêts n’est pas le cœur du populisme.' },
    b: { label: 'Un peuple honnête est trahi par une élite entièrement corrompue.', feedback: 'La société est divisée moralement en deux groupes supposés unis.' },
    c: { label: 'Le Parlement devrait publier ses dépenses plus clairement.', feedback: 'Demander de la transparence peut relever du contrôle démocratique normal.' },
    d: { label: 'Les communes devraient gérer davantage de services publics.', feedback: 'Donner plus de pouvoir local n’est pas forcément populiste.' },
  }, explanation: 'Le populisme présente la politique comme un combat moral entre un peuple supposé uni et honnête et une élite entièrement corrompue.' },
  P2: { prompt: 'Un parti mène une politique économique de gauche. Qu’est-ce qui rendrait son message populiste ?', hint: 'La politique économique ne suffit pas à définir le populisme.', options: {
    a: { label: 'Il veut augmenter les impôts sur les très hauts revenus.', feedback: 'La redistribution existe aussi dans de nombreux programmes non populistes.' },
    b: { label: 'Il veut mieux protéger les syndicats par la loi.', feedback: 'Protéger les salariés n’est pas en soi une idée populiste.' },
    c: { label: 'Il affirme que seul son mouvement représente le peuple honnête contre tous ses rivaux corrompus.', feedback: 'Prétendre être le seul représentant du peuple et rejeter tous les rivaux rend le message populiste.' },
    d: { label: 'Il propose de financer publiquement les hôpitaux et les écoles.', feedback: 'Les services publics ne déterminent pas si un mouvement est populiste.' },
  }, explanation: 'Le populisme peut s’associer à des programmes de gauche, de droite ou autres. L’indice décisif oppose le peuple à l’élite.' },
  P3: { prompt: 'Pourquoi des partis populistes peuvent-ils défendre des politiques très différentes ?', hint: 'Demande-toi si le populisme fixe toutes les politiques ou dit surtout qui s’oppose à qui.', options: {
    a: { label: 'Il donne le même programme économique à tous les partis.', feedback: 'Les partis populistes peuvent défendre des politiques économiques très différentes.' },
    b: { label: 'Ce n’est qu’une façon de parler sans idée politique.', feedback: 'Le populisme affirme quelque chose de politique sur les gens ordinaires et les élites.' },
    c: { label: 'Il impose les mêmes politiques sociales à tous les partis.', feedback: 'Les partis populistes peuvent aussi avoir des politiques sociales très différentes.' },
    d: { label: 'Il dit qui s’oppose à qui sans fixer chaque politique.', feedback: 'L’idée du peuple contre l’élite peut s’associer à différentes politiques.' },
  }, explanation: 'Le populisme affirme que les gens ordinaires honnêtes font face à une élite corrompue. Il ne décide pas de chaque politique économique ou sociale.' },
  P4: { prompt: 'Quelle affirmation prétend le plus clairement représenter seule le « vrai peuple » ?', hint: 'Cherche une phrase disant que les adversaires politiques et leurs électeurs ne comptent pas vraiment.', options: {
    a: { label: 'Notre proposition est plus soutenue que le projet du gouvernement.', feedback: 'Revendiquer davantage de soutien relève de la compétition politique normale.' },
    b: { label: 'Nos adversaires défendent d’autres intérêts et font de mauvais choix.', feedback: 'Dire que les adversaires se trompent les reconnaît encore comme participants politiques.' },
    c: { label: 'Seul notre mouvement parle pour les vrais citoyens ; nos adversaires ne représentent personne qui compte.', feedback: 'Cette phrase exclut les adversaires et leurs électeurs du peuple légitime.' },
    d: { label: 'Notre coalition représente les salariés, les familles et plusieurs régions.', feedback: 'Citer plusieurs groupes ne signifie pas représenter seul tous les vrais citoyens.' },
  }, explanation: 'Un signal populiste important consiste à dire qu’un seul mouvement représente le peuple authentique.' },
  P5: { prompt: 'Un dirigeant perd une élection et dit que les vrais citoyens ne pourraient jamais le rejeter. Quel est le signal d’alerte ?', hint: 'Observe si les personnes ayant voté autrement restent traitées comme de vrais citoyens.', options: {
    a: { label: 'Il demande un recomptage selon la loi.', feedback: 'Une demande légale de recomptage ne nie pas à elle seule la légitimité des autres électeurs.' },
    b: { label: 'Il considère seulement ses partisans comme le peuple authentique.', feedback: 'La phrase exclut les électeurs opposés du public légitime.' },
    c: { label: 'Il veut que les partis fassent davantage campagne.', feedback: 'L’activité de campagne n’a rien à voir avec cette exclusion.' },
    d: { label: 'Il souhaite une participation plus forte aux prochaines élections.', feedback: 'Souhaiter plus de participation ne retire pas leur citoyenneté aux autres.' },
  }, explanation: 'Réserver le « vrai peuple » à ses partisans permet de déclarer toute défaite illégitime, quelles que soient les preuves.' },
  P6: { prompt: 'Quelle vision respecte le mieux une société aux opinions politiques diverses ?', hint: 'En démocratie, les gens peuvent être profondément en désaccord tout en appartenant également à la société.', options: {
    a: { label: 'Un parti exprime naturellement la seule volonté authentique du peuple.', feedback: 'Cela suppose une seule volonté authentique que seul un parti pourrait représenter.' },
    b: { label: 'Les citoyens peuvent soutenir des intérêts différents sans devenir moins légitimes.', feedback: 'Cette vision reconnaît les différences politiques sans exclure de citoyens.' },
    c: { label: 'Seuls les électeurs de la majorité appartiennent vraiment à la société.', feedback: 'La majorité ne décide pas qui compte comme citoyen légitime.' },
    d: { label: 'Critiquer le dirigeant élu revient à s’opposer à la volonté du peuple.', feedback: 'Un dirigeant élu n’est pas identique à toute la population.' },
  }, explanation: 'La diversité démocratique accepte des intérêts et opinions différents sans désigner un groupe comme seul « vrai peuple ».' },
  P7: { prompt: 'Quelle affirmation dépasse la critique sévère et rejette l’opposition légitime ?', hint: 'Des adversaires démocratiques peuvent se tromper sans être des ennemis ou des traîtres.', options: {
    a: { label: 'Le budget de l’opposition ferait augmenter la dette trop vite.', feedback: 'Cette phrase critique une politique tout en acceptant la légitimité de l’opposition.' },
    b: { label: 'L’opposition n’a pas expliqué comment son projet fonctionnerait.', feedback: 'Demander une explication est une critique démocratique normale.' },
    c: { label: 'Les électeurs de l’opposition sont des traîtres sans droit de gouverner.', feedback: 'Cela nie la compétition politique légitime au lieu de contester une politique.' },
    d: { label: 'L’opposition devrait changer de dirigeant avant l’élection.', feedback: 'C’est une critique partisane, pas forcément un rejet de l’opposition légitime.' },
  }, explanation: 'La démocratie permet de vifs désaccords. Traiter les adversaires comme illégitimes ou traîtres attaque la diversité politique.' },
  P8: { prompt: 'Pourquoi qualifier tout compromis de trahison peut-il devenir dangereux pour la démocratie ?', hint: 'Pense à une société où tout le monde ne veut pas la même chose.', options: {
    a: { label: 'Cela suppose une seule volonté populaire et rejette des différences légitimes.', feedback: 'Les sociétés diverses ont besoin de négociations entre intérêts légitimes.' },
    b: { label: 'Cela produit toujours des politiques économiques trop coûteuses.', feedback: 'Le problème démocratique concerne la diversité, pas un résultat économique précis.' },
    c: { label: 'Cela empêche les partis de publier leurs programmes électoraux.', feedback: 'Le discours contre les compromis n’empêche pas automatiquement la publication de programmes.' },
    d: { label: 'Cela rend les coalitions illégales dans toutes les constitutions.', feedback: 'L’effet est politique, pas une interdiction juridique automatique.' },
  }, explanation: 'On peut critiquer les compromis. Mais les qualifier tous de trahison nie que les citoyens aient des intérêts légitimes différents.' },
  P9: { prompt: 'Un gouvernement élu affirme que sa victoire lui donne un pouvoir illimité jusqu’au prochain vote. Que manque-t-il ?', hint: 'Gagner donne le pouvoir de gouverner, mais demande-toi si des limites s’appliquent encore.', options: {
    a: { label: 'Une promesse de réduire le nombre de partis.', feedback: 'Moins de partis ne règle pas la revendication d’un pouvoir illimité.' },
    b: { label: 'Des droits, des limites légales et une compétition équitable entre les élections.', feedback: 'L’autorité démocratique reste limitée par les droits, la loi et la future compétition.' },
    c: { label: 'Un programme économique détaillé pour tout le mandat.', feedback: 'Plus de détails politiques ne répondent pas à la revendication d’un pouvoir illimité.' },
    d: { label: 'L’obligation de décider de tout par référendum.', feedback: 'Les référendums ne remplacent ni les droits ni les limites du gouvernement.' },
  }, explanation: 'Gagner une élection donne le pouvoir de gouverner, pas un pouvoir illimité sur les droits, la loi ou la future compétition.' },
  P10: { prompt: 'Un tribunal bloque une mesure illégale. Quelle réaction est le signal démocratique le plus clair ?', hint: 'Une réaction suit la procédure légale. Une autre dit que les tribunaux ne doivent jamais limiter les dirigeants élus.', options: {
    a: { label: 'Le gouvernement fait appel selon la procédure normale.', feedback: 'Utiliser la voie d’appel reconnaît le rôle légitime du tribunal.' },
    b: { label: 'Le gouvernement publie ses arguments juridiques contre le jugement.', feedback: 'Un désaccord juridique public est compatible avec des tribunaux indépendants.' },
    c: { label: 'Le dirigeant dit qu’aucun tribunal ne peut limiter un gouvernement élu.', feedback: 'Cela rejette une institution qui fait respecter les limites légales du pouvoir.' },
    d: { label: 'Le Parlement envisage de modifier la loi pour les futurs cas.', feedback: 'Modifier légalement les règles futures ne nie pas la légitimité des tribunaux.' },
  }, explanation: 'On peut critiquer un jugement. Refuser aux tribunaux indépendants tout droit d’appliquer la loi attaque une protection démocratique.' },
  P11: { prompt: 'Quelle réaction au journalisme critique s’oppose le plus clairement à la diversité ?', hint: 'Regarde si la critique reçoit une réponse ou si le pouvoir la fait disparaître.', options: {
    a: { label: 'Le ministre publie des preuves contestant l’article du journal.', feedback: 'Répondre par des preuves accepte le contrôle public.' },
    b: { label: 'Le parti ne donne plus d’interviews à une émission.', feedback: 'Cela peut être discutable, mais reste moins clair que l’usage du pouvoir pour faire taire.' },
    c: { label: 'Le dirigeant demande la fermeture des médias indépendants qui le critiquent.', feedback: 'Utiliser le pouvoir pour supprimer les médias critiques attaque la diversité et le contrôle.' },
    d: { label: 'Le gouvernement demande la correction d’une erreur factuelle.', feedback: 'Demander une correction ne nie pas la légitimité des médias indépendants.' },
  }, explanation: 'Les dirigeants peuvent contester des informations. Vouloir fermer les critiques indépendants attaque la liberté d’expression et le contrôle public.' },
  P12: { prompt: 'Un dirigeant ne fait confiance aux autorités électorales que lorsqu’il gagne. Quel principe rejette-t-il ?', hint: 'Des règles équitables doivent s’appliquer quel que soit le candidat qu’elles favorisent.', options: {
    a: { label: 'Une organisation indépendante des élections selon des règles constantes.', feedback: 'N’accepter l’organisation qu’en cas de victoire attaque l’intégrité électorale.' },
    b: { label: 'La liberté des partis de choisir leurs slogans.', feedback: 'Les slogans n’ont aucun rapport avec la confiance envers l’organisation des élections.' },
    c: { label: 'Le droit du gouvernement de proposer une réforme électorale.', feedback: 'Proposer légalement une réforme diffère d’une confiance dépendant du résultat.' },
    d: { label: 'La possibilité pour les électeurs de changer d’avis.', feedback: 'Le choix des électeurs ne répond pas à la question de l’organisation neutre.' },
  }, explanation: 'Les autorités et règles électorales ne peuvent être légitimes seulement lorsqu’elles produisent le résultat voulu par un dirigeant.' },
  P13: { prompt: 'Quelle affirmation ne suffit pas à elle seule pour identifier le populisme ?', hint: 'Une accusation d’influence injuste peut être vraie. Demande-toi si elle dit aussi qu’un seul mouvement parle pour le vrai peuple.', options: {
    a: { label: 'Un seul mouvement représente les vrais citoyens.', feedback: 'La représentation exclusive des vrais citoyens est un signal central.' },
    b: { label: 'Tous les adversaires politiques servent une élite corrompue.', feedback: 'Cela associe l’opposition peuple-élite au rejet d’adversaires légitimes.' },
    c: { label: 'Des preuves montrent que de riches donateurs ont influencé la politique et que des entreprises ont évité l’impôt.', feedback: 'Une critique prouvée de l’influence ou de l’évitement fiscal n’est pas automatiquement populiste.' },
    d: { label: 'Contredire le dirigeant revient à trahir le peuple.', feedback: 'Cela confond le dirigeant avec le peuple et exclut le désaccord légitime.' },
  }, explanation: 'L’influence concentrée, le lobbying et l’évitement fiscal peuvent être réels. Le populisme ajoute un seul peuple authentique, un ennemi entièrement corrompu ou une représentation exclusive.' },
  P14: { prompt: 'Un responsable politique est très populaire et parle avec émotion. Que peut-on conclure ?', hint: 'La popularité ou l’émotion ne révèle pas ses idées sur le peuple, les élites ou les adversaires.', options: {
    a: { label: 'Cette personne est forcément populiste.', feedback: 'La popularité et le langage émotionnel ne suffisent pas à identifier le populisme.' },
    b: { label: 'Une personne populaire ne peut pas être populiste.', feedback: 'La popularité ne prouve ni n’exclut le populisme.' },
    c: { label: 'Il faut des affirmations sur le peuple, les élites et la représentation.', feedback: 'La classification repose sur ces affirmations, pas seulement sur la popularité ou le style.' },
    d: { label: 'Cette personne doit soutenir la démocratie directe.', feedback: 'Parler avec émotion ne révèle pas une position sur la démocratie directe.' },
  }, explanation: 'Le populisme n’est pas synonyme de popularité, de langage simple, de charisme ou de campagne émotionnelle.' },
  P15: { prompt: 'Quelle critique des élites peut rester pleinement compatible avec une démocratie diverse ?', hint: 'Cherche une critique fondée sur des preuves qui accepte encore les tribunaux, les élections et les adversaires.', options: {
    a: { label: 'Enquêter sur des abus précis en acceptant tribunaux, preuves et opposition légitime.', feedback: 'Cela exige des comptes sans revendiquer une représentation exclusive ni rejeter la diversité.' },
    b: { label: 'Qualifier de corrompue toute institution qui limite le gouvernement.', feedback: 'Attaquer toutes les limites selon le résultat affaiblit le contrôle démocratique.' },
    c: { label: 'Déclarer que les adversaires et leurs électeurs ne sont pas de vrais citoyens.', feedback: 'Cela exclut les adversaires politiques du public légitime.' },
    d: { label: 'Supposer qu’un dirigeant exprime directement une seule volonté populaire.', feedback: 'Cela efface les différences légitimes entre citoyens.' },
  }, explanation: 'La démocratie doit contrôler les puissants. Une critique fondée sur des preuves n’oblige pas à rejeter la diversité ou les protections indépendantes.' },
  P16: { prompt: 'Quelle est la différence la plus claire entre populisme et nationalisme ?', hint: 'Demande-toi si la phrase parle des gens ordinaires contre les élites ou de la nation.', options: {
    a: { label: 'Le populisme oppose peuple et élite ; le nationalisme place la nation au centre.', feedback: 'Cela distingue l’opposition peuple-élite de l’importance politique particulière donnée à la nation.' },
    b: { label: 'Le populisme est de gauche ; le nationalisme toujours de droite.', feedback: 'Les deux peuvent s’associer à des programmes de gauche ou de droite.' },
    c: { label: 'Le populisme rejette les élections ; le nationalisme les soutient toujours.', feedback: 'Aucun des deux concepts ne détermine seul la position envers les élections.' },
    d: { label: 'Le populisme concerne les impôts ; le nationalisme seulement l’immigration.', feedback: 'Aucun des deux ne se définit par un seul domaine politique.' },
  }, explanation: 'Le populisme organise la politique comme peuple contre élite. Le nationalisme donne une importance particulière à la nation. Ils peuvent se combiner.' },
  P17: { prompt: 'Pourquoi le populisme et l’autoritarisme ne sont-ils pas la même chose ?', hint: 'Demande-toi si cela décrit un message politique ou un système qui concentre le pouvoir et limite la compétition.', options: {
    a: { label: 'Le populisme concerne la propriété ; l’autoritarisme les impôts.', feedback: 'Aucun concept ne se définit par ce contraste économique.' },
    b: { label: 'Le populisme parle de représentation ; l’autoritarisme limite la compétition et concentre le pouvoir.', feedback: 'Cela distingue une affirmation sur le peuple et l’élite d’un système à compétition restreinte.' },
    c: { label: 'Le populisme est démocratique ; l’autoritarisme n’organise jamais d’élections.', feedback: 'Le populisme peut attaquer la diversité et les systèmes autoritaires peuvent organiser des élections contrôlées.' },
    d: { label: 'Il n’existe aucune différence importante entre les deux.', feedback: 'Ils se recoupent parfois, mais décrivent des choses différentes.' },
  }, explanation: 'Le populisme affirme qui représente le peuple. L’autoritarisme décrit un pouvoir concentré et une compétition politique limitée.' },
  P18: { prompt: 'Pourquoi un référendum n’est-il pas automatiquement populiste ?', hint: 'Un référendum est une manière de décider. Cela dit-il à lui seul quelque chose sur le peuple et les élites ?', options: {
    a: { label: 'Les mouvements populistes n’utilisent jamais de référendums.', feedback: 'Ils peuvent les soutenir, mais ne possèdent pas cette procédure.' },
    b: { label: 'Les référendums protègent toujours les minorités et les institutions indépendantes.', feedback: 'Ils ne protègent pas automatiquement les droits ou les institutions.' },
    c: { label: 'La procédure peut être utilisée sans opposer le peuple à l’élite.', feedback: 'Un référendum peut avoir lieu sans discours populiste ni représentation exclusive.' },
    d: { label: 'Seuls les référendums locaux peuvent éviter les affirmations populistes.', feedback: 'Le niveau de gouvernement ne détermine pas si le message est populiste.' },
  }, explanation: 'La démocratie directe est une procédure. Elle ne rejoint le populisme qu’avec des affirmations populistes ou un usage excluant la diversité.' },
};


const ptBr: Record<string, NativeQuestion> = {
  P1: { prompt:'Qual afirmação é o exemplo mais claro de enquadramento populista?', hint:'Procure uma afirmação que divida a sociedade entre pessoas comuns e boas e uma elite corrupta.', options:{
    a:{label:'Vários grupos discordam sobre como os impostos devem ser gastos.',feedback:'A discordância entre grupos reconhece a diversidade política; isso não é, por si só, populismo.'},
    b:{label:'Um povo puro está sendo traído por uma elite completamente corrupta.',feedback:'A frase divide moralmente a sociedade em dois grupos supostamente homogêneos — o enquadramento central do populismo.'},
    c:{label:'O Parlamento deveria publicar informações mais claras sobre seus gastos.',feedback:'Exigir transparência pode ser controle democrático comum, sem enquadramento populista.'},
    d:{label:'Governos locais deveriam administrar mais serviços públicos.',feedback:'Descentralizar poder não é necessariamente populismo.'},
  }, explanation:'O populismo apresenta a política como uma luta moral entre um povo supostamente homogêneo e autêntico e uma elite inteiramente corrupta.' },
  P2: { prompt:'Um partido defende políticas econômicas de esquerda. O que tornaria sua mensagem populista?', hint:'A política econômica, sozinha, não define populismo.', options:{
    a:{label:'Defender impostos mais altos sobre rendas muito elevadas.',feedback:'Redistribuição aparece em muitos programas não populistas.'},
    b:{label:'Defender maior proteção legal para sindicatos.',feedback:'Proteção aos trabalhadores não é, por si só, uma ideia populista.'},
    c:{label:'Afirmar que somente seu movimento representa o povo puro contra todos os adversários corruptos.',feedback:'A ideia de um povo puro e a negação da legitimidade dos adversários tornam esse enquadramento populista.'},
    d:{label:'Propor financiamento público para hospitais e escolas.',feedback:'Serviços públicos não determinam se um movimento é populista.'},
  }, explanation:'O populismo pode se combinar com programas de esquerda, direita ou outros. A pista decisiva é o enquadramento de povo contra elite.' },
  P3: { prompt:'Por que partidos populistas podem defender políticas muito diferentes?', hint:'Pergunte se o populismo traz uma lista completa de políticas ou principalmente define quem está contra quem.', options:{
    a:{label:'Porque impõe o mesmo programa econômico a todos os partidos.',feedback:'Partidos populistas podem defender políticas econômicas muito diferentes.'},
    b:{label:'Porque é apenas um estilo de fala, sem nenhuma ideia política.',feedback:'O populismo faz uma afirmação política sobre pessoas comuns e elites.'},
    c:{label:'Porque exige que todos defendam as mesmas políticas sociais.',feedback:'Partidos populistas também podem divergir muito em questões sociais.'},
    d:{label:'Porque define quem está contra quem, mas não determina todas as políticas.',feedback:'A ideia de povo contra elite pode ser combinada com políticas diferentes.'},
  }, explanation:'O populismo afirma que pessoas comuns e boas estão contra uma elite corrupta, mas não determina todas as políticas econômicas ou sociais.' },
  P4: { prompt:'Qual afirmação reivindica de forma mais clara a representação exclusiva do “povo verdadeiro”?', hint:'Procure uma fala que trate adversários políticos e seus eleitores como pessoas que não contam de verdade.', options:{
    a:{label:'Nossa proposta tem mais apoio popular do que o plano do governo.',feedback:'Dizer que se tem mais apoio faz parte da competição política normal.'},
    b:{label:'Nossos adversários representam outros interesses e tomam decisões erradas.',feedback:'Considerar adversários errados ainda reconhece sua participação política.'},
    c:{label:'Só o nosso movimento fala pelos cidadãos de verdade; os adversários não representam ninguém legítimo.',feedback:'Isso exclui adversários e seus apoiadores do conjunto de pessoas consideradas legítimas.'},
    d:{label:'Nossa coalizão representa trabalhadores, famílias e vários grupos regionais.',feedback:'Nomear vários grupos não equivale a reivindicar representação exclusiva de todos os cidadãos legítimos.'},
  }, explanation:'Um importante sinal populista é afirmar que apenas um movimento representa o povo autêntico.' },
  P5: { prompt:'Um líder perde uma eleição e diz que cidadãos de verdade jamais poderiam rejeitá-lo. Qual é o sinal de alerta?', hint:'Observe se quem votou de forma diferente continua sendo tratado como cidadão legítimo.', options:{
    a:{label:'Ele pede uma recontagem conforme a lei vigente.',feedback:'Um pedido legal de recontagem não nega, por si só, a legitimidade dos outros eleitores.'},
    b:{label:'Ele trata apenas seus apoiadores como o povo autêntico.',feedback:'A afirmação exclui eleitores adversários do público considerado legítimo.'},
    c:{label:'Ele quer que os partidos façam campanhas mais ativas.',feedback:'A intensidade da campanha não tem relação com essa exclusão.'},
    d:{label:'Ele acha que a participação deveria ser maior nas próximas eleições.',feedback:'Defender maior participação não nega que os atuais adversários sejam cidadãos.'},
  }, explanation:'Afirmar que apenas os próprios apoiadores são o “povo verdadeiro” pode transformar qualquer derrota eleitoral em algo supostamente ilegítimo, independentemente das evidências.' },
  P6: { prompt:'Qual visão respeita melhor uma sociedade politicamente diversa?', hint:'Em uma democracia, pessoas podem discordar profundamente e ainda assim pertencer em igualdade de condições.', options:{
    a:{label:'Um partido expressa naturalmente a única vontade autêntica do povo.',feedback:'Isso pressupõe uma única vontade autêntica, representada por um único partido.'},
    b:{label:'Cidadãos podem apoiar interesses concorrentes sem se tornarem menos legítimos.',feedback:'Essa visão reconhece a divergência política sem excluir cidadãos.'},
    c:{label:'Só quem apoia a maioria pertence de verdade à comunidade política.',feedback:'Apoio majoritário não determina quem conta como cidadão legítimo.'},
    d:{label:'Criticar o líder eleito é se opor à vontade do povo.',feedback:'Um líder eleito não se torna idêntico a toda a população.'},
  }, explanation:'O pluralismo reconhece que cidadãos têm interesses e opiniões diferentes e que nenhuma posição representa automaticamente o único “povo verdadeiro”.' },
  P7: { prompt:'Qual afirmação deixa de ser crítica dura e passa a rejeitar a legitimidade da oposição?', hint:'Adversários democráticos podem estar errados sem serem inimigos ou traidores.', options:{
    a:{label:'O orçamento da oposição aumentaria a dívida rápido demais.',feedback:'Isso critica uma política, mas reconhece a legitimidade política da oposição.'},
    b:{label:'A oposição não explicou como seu plano funcionaria.',feedback:'Exigir explicações é crítica democrática normal.'},
    c:{label:'Os apoiadores da oposição são traidores e não têm direito de governar.',feedback:'Isso rejeita a competição política legítima em vez de contestar uma política.'},
    d:{label:'A oposição deveria trocar seu líder antes da eleição.',feedback:'É uma crítica partidária, não necessariamente uma rejeição da oposição legítima.'},
  }, explanation:'A democracia permite conflito intenso. Tratar adversários como inerentemente ilegítimos ou traidores ataca o pluralismo.' },
  P8: { prompt:'Por que chamar todo compromisso de traição pode se tornar perigoso para a democracia?', hint:'Pense em governar uma sociedade em que os cidadãos não querem todos a mesma coisa.', options:{
    a:{label:'Porque pressupõe uma única vontade popular verdadeira e rejeita diferenças legítimas.',feedback:'Sociedades plurais exigem negociação entre interesses legítimos diferentes.'},
    b:{label:'Porque sempre produz políticas econômicas caras demais.',feedback:'O problema democrático é o pluralismo, não um resultado econômico previsível.'},
    c:{label:'Porque impede partidos de publicar programas eleitorais.',feedback:'Retórica contra compromissos não impede necessariamente a publicação de programas.'},
    d:{label:'Porque torna governos de coalizão juridicamente impossíveis em toda constituição.',feedback:'O efeito é político, não uma proibição jurídica automática de coalizões.'},
  }, explanation:'Compromissos podem ser criticados, mas tratar qualquer compromisso como traição nega que cidadãos legítimos possam ter interesses diferentes.' },
  P9: { prompt:'Um governo eleito diz que vencer lhe dá autoridade ilimitada até a próxima eleição. O que está faltando?', hint:'Vencer dá poder para governar, mas pergunte se ainda existem limites.', options:{
    a:{label:'Uma promessa de reduzir o número de partidos políticos.',feedback:'Menos partidos não resolveriam a reivindicação de poder ilimitado.'},
    b:{label:'Direitos, limites legais e competição justa entre as eleições.',feedback:'A autoridade democrática continua limitada por direitos, leis e competição política futura.'},
    c:{label:'Um plano econômico detalhado para todo o mandato.',feedback:'Mais detalhes de política pública não respondem à reivindicação de autoridade ilimitada.'},
    d:{label:'A obrigação de decidir tudo por referendo.',feedback:'Referendos não substituem direitos, leis e limites ao governo.'},
  }, explanation:'Vencer uma eleição concede autoridade para governar, não poder ilimitado sobre direitos, leis ou a competição futura.' },
  P10: { prompt:'Um tribunal bloqueia uma medida ilegal. Qual reação é o sinal de alerta democrático mais claro?', hint:'Uma reação usa o processo legal. Outra afirma que tribunais nunca deveriam limitar governantes eleitos.', options:{
    a:{label:'O governo recorre usando o procedimento jurídico normal.',feedback:'Usar o recurso reconhece o papel legítimo do tribunal.'},
    b:{label:'O governo publica seus argumentos jurídicos contra a decisão.',feedback:'Discordância jurídica pública pode existir com respeito à independência judicial.'},
    c:{label:'O líder diz que tribunais não têm direito de limitar um governo eleito.',feedback:'Isso rejeita uma instituição que aplica limites legais ao poder eleito.'},
    d:{label:'O Legislativo considera mudar a lei para casos futuros.',feedback:'Mudar a lei prospectivamente por procedimentos constitucionais não equivale a negar a legitimidade dos tribunais.'},
  }, explanation:'Criticar decisões judiciais é legítimo. Negar que tribunais independentes possam aplicar limites legais ataca uma proteção democrática.' },
  P11: { prompt:'Qual reação ao jornalismo crítico é mais claramente contrária ao pluralismo?', hint:'Observe se a crítica recebe uma resposta ou se o poder tenta eliminá-la.', options:{
    a:{label:'O ministro publica evidências contestando a reportagem.',feedback:'Responder com evidências aceita o escrutínio público.'},
    b:{label:'O partido deixa de conceder entrevistas a um programa de televisão.',feedback:'A restrição de acesso pode ser questionável, mas é menos clara do que usar o poder para silenciar críticas.'},
    c:{label:'O líder pede o fechamento de veículos independentes que o criticam.',feedback:'Usar o poder para eliminar mídia crítica ataca o pluralismo e a prestação de contas.'},
    d:{label:'O governo pede a correção de um erro factual.',feedback:'Pedir uma correção não nega, por si só, a legitimidade da mídia independente.'},
  }, explanation:'Governantes podem contestar reportagens. Tentar fechar críticos independentes ataca a liberdade de expressão e a fiscalização pública.' },
  P12: { prompt:'Um líder só confia nas autoridades eleitorais quando vence. Qual princípio está sendo rejeitado?', hint:'Regras justas precisam valer independentemente de qual candidato se beneficia.', options:{
    a:{label:'Administração independente das eleições segundo regras consistentes.',feedback:'Rejeitar uma administração neutra por causa do resultado ataca a integridade eleitoral.'},
    b:{label:'A liberdade dos partidos de escolher seus próprios slogans.',feedback:'Slogans de campanha não têm relação com confiar na administração eleitoral apenas depois de vencer.'},
    c:{label:'A autoridade do governo para propor mudanças na lei eleitoral.',feedback:'Propostas legais de reforma são diferentes de confiança condicionada ao resultado.'},
    d:{label:'A possibilidade de eleitores mudarem de opinião durante a campanha.',feedback:'A escolha do eleitor não responde à questão da administração eleitoral imparcial.'},
  }, explanation:'Autoridades e regras eleitorais não podem ser consideradas legítimas apenas quando produzem o resultado preferido de um líder.' },
  P13: { prompt:'Qual afirmação não basta, sozinha, para identificar populismo?', hint:'Uma acusação de influência injusta pode ser verdadeira. Pergunte se ela também afirma que apenas um movimento fala pelo povo verdadeiro.', options:{
    a:{label:'Afirmar que apenas um movimento representa os cidadãos de verdade.',feedback:'A representação exclusiva dos cidadãos considerados autênticos é um sinal populista central.'},
    b:{label:'Descrever todos os adversários políticos como servidores de uma elite corrupta.',feedback:'Isso combina povo contra elite com rejeição da oposição legítima.'},
    c:{label:'Apresentar evidências de que doadores ricos influenciaram políticas e empresas evitaram impostos.',feedback:'Crítica baseada em evidências a influência ou evasão fiscal não é automaticamente populista.'},
    d:{label:'Afirmar que discordar do líder é trair o povo.',feedback:'Equiparar o líder ao povo exclui a divergência legítima.'},
  }, explanation:'Influência concentrada, lobby e evasão fiscal podem ser reais. O populismo acrescenta afirmações sobre um único povo autêntico, um inimigo inteiramente corrupto ou representação exclusiva.' },
  P14: { prompt:'Um político é extremamente popular e fala de forma emotiva. O que podemos concluir?', hint:'Ser popular ou emotivo não mostra o que alguém pensa sobre povo, elites ou adversários.', options:{
    a:{label:'O político é necessariamente populista.',feedback:'Popularidade e linguagem emotiva não bastam para identificar populismo.'},
    b:{label:'Um político popular não pode ser populista.',feedback:'Popularidade não prova nem exclui populismo.'},
    c:{label:'Precisamos de evidências sobre povo contra elite e reivindicações de representação.',feedback:'A classificação depende dessas afirmações recorrentes, não apenas de popularidade ou estilo de fala.'},
    d:{label:'O político necessariamente apoia democracia direta.',feedback:'Popularidade e emoção não revelam uma posição sobre democracia direta.'},
  }, explanation:'Populismo não é sinônimo de popularidade, linguagem simples, carisma ou campanha emocional.' },
  P15: { prompt:'Qual crítica às elites pode continuar plenamente compatível com uma democracia pluralista?', hint:'Procure uma crítica baseada em evidências que ainda reconheça tribunais, eleições e adversários políticos.', options:{
    a:{label:'Investigar abusos específicos, aceitando tribunais, evidências e oposição legítima.',feedback:'Isso cobra responsabilidade sem reivindicar representação exclusiva nem rejeitar o pluralismo.'},
    b:{label:'Tratar toda instituição como corrupta sempre que ela limita o governo.',feedback:'Atacar todos os limites conforme o resultado enfraquece a prestação de contas democrática.'},
    c:{label:'Declarar que adversários e seus eleitores não são cidadãos de verdade.',feedback:'Isso exclui adversários políticos do público legítimo.'},
    d:{label:'Supor que um líder expressa diretamente uma única vontade do povo.',feedback:'Isso apaga diferenças legítimas entre cidadãos.'},
  }, explanation:'A democracia precisa fiscalizar grupos poderosos. Crítica baseada em evidências não exige rejeitar o pluralismo nem proteções institucionais independentes.' },
  P16: { prompt:'Qual é a diferença mais clara entre populismo e nacionalismo?', hint:'Pergunte se a afirmação trata de pessoas comuns contra elites ou da nação.', options:{
    a:{label:'O populismo contrapõe povo e elite; o nacionalismo coloca a nação no centro.',feedback:'Isso separa corretamente a oposição povo–elite da centralidade política da nação.'},
    b:{label:'O populismo é de esquerda; o nacionalismo é sempre de direita.',feedback:'Ambos podem se combinar com programas de esquerda ou de direita.'},
    c:{label:'O populismo rejeita eleições; o nacionalismo sempre as apoia.',feedback:'Nenhum dos conceitos, sozinho, determina a aceitação de eleições.'},
    d:{label:'O populismo trata de impostos; o nacionalismo trata apenas de imigração.',feedback:'Nenhum dos conceitos é definido por uma única área de política pública.'},
  }, explanation:'O populismo organiza a política como povo contra elite. O nacionalismo atribui importância política especial à nação. Os dois podem se combinar.' },
  P17: { prompt:'Por que populismo e autoritarismo não são a mesma coisa?', hint:'Pergunte se estamos descrevendo uma mensagem política ou um sistema que limita a competição e concentra poder.', options:{
    a:{label:'Populismo trata de propriedade; autoritarismo trata de impostos.',feedback:'Nenhum dos conceitos é definido por esse contraste econômico.'},
    b:{label:'Populismo enquadra a representação; autoritarismo restringe a competição política e concentra poder.',feedback:'Isso distingue uma afirmação sobre povo e elite de uma estrutura que limita competição e controles.'},
    c:{label:'Populismo é democrático; autoritarismo nunca usa eleições.',feedback:'O populismo pode se tornar antipluralista, e sistemas autoritários podem realizar eleições controladas.'},
    d:{label:'Não há diferença relevante entre os dois conceitos.',feedback:'Os conceitos se sobrepõem em alguns casos, mas descrevem coisas diferentes.'},
  }, explanation:'O populismo faz uma afirmação sobre quem representa o povo. O autoritarismo descreve poder concentrado e competição política restrita.' },
  P18: { prompt:'Por que um referendo não é automaticamente populista?', hint:'Um referendo é uma forma de tomar uma decisão. Pergunte se isso, sozinho, diz algo sobre povo e elites.', options:{
    a:{label:'Referendos nunca são usados por movimentos populistas.',feedback:'Movimentos populistas podem apoiar referendos, mas não são donos desse procedimento.'},
    b:{label:'Referendos sempre protegem minorias e instituições independentes.',feedback:'Referendos não protegem automaticamente direitos ou instituições.'},
    c:{label:'O procedimento pode ser usado sem uma afirmação de povo contra elite.',feedback:'Um referendo pode ocorrer sem enquadramento populista nem representação exclusiva.'},
    d:{label:'Só referendos locais podem evitar afirmações políticas populistas.',feedback:'O nível de governo não determina se o enquadramento é populista.'},
  }, explanation:'Democracia direta é um procedimento. Ela se conecta ao populismo apenas quando vem acompanhada de afirmações populistas ou de uso antipluralista.' },
};

const translations: Partial<Record<Locale, Record<string, NativeQuestion>>> = { de, es, fr, 'pt-br': ptBr };

export function localizedPopulismQuestion(locale: Locale, question: PopulismQuizQuestion): PopulismQuizQuestion {
  const native = translations[locale]?.[question.id];
  if (!native) return question;
  return {
    ...question,
    ...native,
    options: question.options.map((option) => ({ ...option, ...native.options[option.id] })),
  };
}

export const nativeAngleLabels: Record<Locale, Record<PopulismQuizAngle, string>> = {
  en: { core_framing: 'Core framing', exclusive_representation: 'Who represents the people?', opposition_pluralism: 'Legitimate opposition', institutional_attacks: 'Democratic safeguards', false_positives: 'What is not automatically populism?', adjacent_concepts: 'Similar but different ideas' },
  de: { core_framing: 'Grundmuster', exclusive_representation: 'Wer vertritt das Volk?', opposition_pluralism: 'Berechtigte Opposition', institutional_attacks: 'Demokratische Schutzregeln', false_positives: 'Was ist nicht automatisch populistisch?', adjacent_concepts: 'Ähnliche, aber andere Ideen' },
  es: { core_framing: 'Idea central', exclusive_representation: '¿Quién representa al pueblo?', opposition_pluralism: 'Oposición legítima', institutional_attacks: 'Garantías democráticas', false_positives: '¿Qué no es automáticamente populista?', adjacent_concepts: 'Ideas parecidas pero distintas' },
  fr: { core_framing: 'Idée centrale', exclusive_representation: 'Qui représente le peuple ?', opposition_pluralism: 'Opposition légitime', institutional_attacks: 'Protections démocratiques', false_positives: 'Qu’est-ce qui n’est pas automatiquement populiste ?', adjacent_concepts: 'Idées proches mais différentes' },
};

export function populismUi(locale: Locale) {
  if (locale === 'de') return {
    language: 'DEUTSCH', learnFirst: 'Erst lernen', free: 'KOSTENLOS · 12 FRAGEN · ETWA 5 MINUTEN', title: 'Erkennst du Populismus?',
    lede: 'Erkenne typische Muster, demokratische Warnzeichen und falsche Zuschreibungen. Der Test prüft politisches Wissen – nicht deine Überzeugungen.',
    principleTitle: 'Kritik ist nicht automatisch Populismus.', principle: 'Reiche Spender können Politik beeinflussen. Firmen und Einzelpersonen können Steuern vermeiden. Institutionen können versagen oder vereinnahmt werden. Populismus fügt die Behauptung hinzu, ein einziges wahres Volk stehe einem durchgehend korrupten Gegner gegenüber und nur eine Bewegung sei berechtigt, es zu vertreten.',
    coverage: 'Inhalte des Quiz', start: 'Quiz starten →', candidate: 'Kandidateninhalt zum Lernen. Kostenlos, nur auf diesem Gerät und noch nicht Teil der Zertifizierung.',
    resultHeader: 'POPULISMUS-QUIZ · ERGEBNIS', reviewTerm: 'Begriff wiederholen', strong: 'Sehr gut erkannt', developing: 'Schon gut erkannt', foundations: 'Grundlagen vertiefen', resultLede: 'Das ist ein Lernergebnis, kein Urteil über deine politischen Überzeugungen.', retry: 'Anderen Satz versuchen', review: 'Populismus wiederholen',
    quizHeader: 'POPULISMUS-QUIZ · DEUTSCH', learnTerm: 'Begriff lernen', correctSoFar: (n: number) => `Bisher ${n} richtig`, exit: 'Quiz verlassen', question: (n: number, total: number) => `FRAGE ${n} VON ${total}`, hint: 'Hinweis', clue: 'Brauchst du einen Hinweis?', correct: 'RICHTIG', notQuite: 'NOCH NICHT GANZ', best: 'Beste Antwort:', see: 'Ergebnis ansehen', next: 'Nächste Frage', check: 'Antwort prüfen',
  };
  if (locale === 'es') return {
    language: 'ESPAÑOL', learnFirst: 'Aprender primero', free: 'GRATIS · 12 PREGUNTAS · UNOS 5 MINUTOS', title: '¿Sabes reconocer el populismo?',
    lede: 'Identifica sus patrones, las señales democráticas de alarma y las acusaciones equivocadas. El test mide conocimientos políticos, no juzga tus ideas.',
    principleTitle: 'Criticar no es automáticamente populismo.', principle: 'Los donantes ricos pueden influir en la política. Empresas y personas pueden evitar impuestos. Las instituciones pueden fallar o ser capturadas. El populismo añade que un único pueblo auténtico se enfrenta a un enemigo totalmente corrupto y que solo un movimiento puede representarlo legítimamente.',
    coverage: 'Contenido del test', start: 'Empezar el test →', candidate: 'Contenido candidato para aprender. Gratis, privado en este dispositivo y todavía fuera de la certificación.',
    resultHeader: 'TEST DE POPULISMO · RESULTADO', reviewTerm: 'Repasar el término', strong: 'Reconocimiento sólido', developing: 'Reconocimiento en desarrollo', foundations: 'Refuerza las bases', resultLede: 'Es un resultado de aprendizaje, no un juicio sobre tus ideas políticas.', retry: 'Probar otra selección', review: 'Repasar el populismo',
    quizHeader: 'TEST DE POPULISMO · ESPAÑOL', learnTerm: 'Aprender el término', correctSoFar: (n: number) => `${n} correctas hasta ahora`, exit: 'Salir del test', question: (n: number, total: number) => `PREGUNTA ${n} DE ${total}`, hint: 'Pista', clue: '¿Necesitas una pista?', correct: 'CORRECTO', notQuite: 'NO DEL TODO', best: 'Mejor respuesta:', see: 'Ver resultado', next: 'Siguiente pregunta', check: 'Comprobar respuesta',
  };
  if (locale === 'fr') return {
    language: 'FRANÇAIS', learnFirst: 'Apprendre d’abord', free: 'GRATUIT · 12 QUESTIONS · ENVIRON 5 MINUTES', title: 'Sais-tu reconnaître le populisme ?',
    lede: 'Repère ses mécanismes, les signaux démocratiques inquiétants et les fausses accusations. Ce test mesure tes connaissances politiques, pas tes convictions.',
    principleTitle: 'Critiquer n’est pas automatiquement populiste.', principle: 'De riches donateurs peuvent influencer la politique. Des entreprises et des personnes peuvent éviter l’impôt. Les institutions peuvent échouer ou être capturées. Le populisme ajoute qu’un seul peuple authentique affronte un ennemi entièrement corrompu et qu’un seul mouvement peut légitimement le représenter.',
    coverage: 'Contenu du quiz', start: 'Commencer le quiz →', candidate: 'Contenu candidat pour apprendre. Gratuit, privé sur cet appareil et pas encore intégré à la certification.',
    resultHeader: 'QUIZ SUR LE POPULISME · RÉSULTAT', reviewTerm: 'Revoir le terme', strong: 'Très bonne reconnaissance', developing: 'Reconnaissance en progrès', foundations: 'Renforce les bases', resultLede: 'C’est un résultat d’apprentissage, pas un jugement sur tes convictions politiques.', retry: 'Essayer une autre sélection', review: 'Revoir le populisme',
    quizHeader: 'QUIZ SUR LE POPULISME · FRANÇAIS', learnTerm: 'Apprendre le terme', correctSoFar: (n: number) => `${n} bonnes réponses`, exit: 'Quitter le quiz', question: (n: number, total: number) => `QUESTION ${n} SUR ${total}`, hint: 'Indice', clue: 'Besoin d’un indice ?', correct: 'BONNE RÉPONSE', notQuite: 'PAS TOUT À FAIT', best: 'Meilleure réponse :', see: 'Voir le résultat', next: 'Question suivante', check: 'Vérifier la réponse',
  };
  return {
    language: 'ENGLISH', learnFirst: 'Learn first', free: 'FREE · 12 QUESTIONS · ABOUT 5 MINUTES', title: 'Can you recognize populism?',
    lede: 'Spot the framing, the democratic warning signs and the false positives. This tests political literacy—it does not label your beliefs or discredit people for criticizing power.',
    principleTitle: 'Criticism is not automatically populism.', principle: 'Wealthy donors can influence policy. Companies and individuals can avoid tax. Institutions can fail or become captured. Populism concerns the additional claim that one authentic people faces a uniformly corrupt enemy, often with only one movement presented as legitimate.',
    coverage: 'Quiz coverage', start: 'Start the quiz →', candidate: 'Candidate learning content. Free, private on this device and not part of certification yet.',
    resultHeader: 'POPULISM QUIZ · RESULT', reviewTerm: 'Review the term', strong: 'Strong recognition', developing: 'Developing recognition', foundations: 'Build the foundations', resultLede: 'This is a learning result, not a judgment about your political beliefs.', retry: 'Try a different set', review: 'Review populism',
    quizHeader: 'POPULISM QUIZ · ENGLISH', learnTerm: 'Learn the term', correctSoFar: (n: number) => `${n} correct so far`, exit: 'Exit quiz', question: (n: number, total: number) => `QUESTION ${n} OF ${total}`, hint: 'Hint', clue: 'Need a clue?', correct: 'CORRECT', notQuite: 'NOT QUITE', best: 'Best answer:', see: 'See result', next: 'Next question', check: 'Check answer',
  };
}
