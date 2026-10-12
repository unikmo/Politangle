import type { BeliefPolarity } from './belief-statements';

export const GERMAN_BELIEVE_VERSION = 'de-believe-2026.10-plain-v4' as const;

const dePairs: Record<string, readonly [string, string]> = {
  T01: ["Der Staat soll sicherstellen, dass alle Menschen Zugang zu Schulen und medizinischer Versorgung haben.", "Bei wichtigen Leistungen wie Schulen und medizinischer Versorgung sollte der Staat privaten Anbietern und der persönlichen Wahl mehr Raum lassen."],
  T02: ["Der Staat sollte mit Steuern und Sozialleistungen sehr große Einkommensunterschiede verringern.", "Der Staat sollte große Einkommensunterschiede eher hinnehmen, statt sie durch höhere Steuern auszugleichen."],
  T03: ["Beschäftigte, Genossenschaften und der Staat sollten größere Anteile an großen Unternehmen besitzen.", "Große Unternehmen sollten überwiegend privaten Eigentümern gehören; Arbeitnehmerrechte müssen gesetzlich geschützt werden."],
  T04: ["Gesetze und öffentliche Regeln sollten zügig angepasst werden, wenn eine neue Denk- oder Lebensweise dauerhaft breite Zustimmung findet.", "Bewährte Gesetze sollten erst nach längerer Debatte geändert werden, auch wenn viele Menschen bereits dafür sind."],
  T05: ["Einvernehmliche Beziehungen zwischen Erwachsenen sollten erlaubt sein, auch wenn andere sie moralisch ablehnen.", "Der Staat darf manches einvernehmliche private Verhalten Erwachsener einschränken, um gemeinsame moralische Maßstäbe zu schützen, auch ohne direkten Schaden."],
  T06: ["Ein Schwangerschaftsabbruch sollte grundsätzlich legal bleiben, weil die schwangere Person die wichtigste Entscheidung treffen sollte.", "Für Schwangerschaftsabbrüche sollte es strengere Gesetze geben, um ungeborenes Leben zu schützen."],
  T07: ["Grundrechte sollten nur eingeschränkt werden, wenn eine konkrete, ernste Gefahr besteht.", "Bei einer echten Gefahr schwerer Unruhen darf der Staat bestimmte Freiheiten vorsorglich einschränken, bevor etwas passiert."],
  T08: ["Auch eine Regierung, die eine Wahl gewonnen hat, muss durch unabhängige Kontrollen begrenzt bleiben, zum Beispiel Gerichte, Verfassung und Oppositionsrechte.", "Eine gewählte Regierung sollte ihre Vorhaben umsetzen können, auch wenn unabhängige Gerichte Bedenken anmelden."],
  T09: ["Länder sollten gemeinsame, verbindliche Regeln einhalten, wenn ein Problem mehrere Länder betrifft.", "Jedes Land sollte das letzte Wort über seine Entscheidungen behalten, auch wenn gemeinsame Probleme dadurch schwerer zu lösen sind."],
  T10: ["Wer später Staatsbürger geworden ist, kann genauso vollständig zur Nation gehören wie jemand, der von Geburt an Staatsbürger ist.", "Wer die Staatsbürgerschaft seit Geburt besitzt, sollte als dem Land stärker zugehörig gelten."],
  T11: ["Politische Streitfragen entstehen oft, weil Menschen unterschiedliche berechtigte Interessen haben.", "Politische Entscheidungen geben oft gut vernetzten Gruppen zu viel Einfluss und gewöhnlichen Wählerinnen und Wählern zu wenig."],
  T12: ["Wenn Umweltschutz und Wirtschaftswachstum klar im Konflikt stehen, sollte der Schutz der Natur manchmal Vorrang haben, auch bei langsamerem Wachstum.", "Wirtschaftswachstum sollte meist Vorrang haben. Umweltschutz soll das Wachstum möglichst nicht bremsen."],
  T13: ["Der Staat sollte Gesetze für alle Bürger nicht allein mit religiösen Überzeugungen begründen.", "Religiöse moralische Überzeugungen können ein legitimer Grund für Gesetze sein, auch wenn nicht alle Bürger diese Religion teilen."],
  T14: ["Bund oder Länder sollten für wichtige Leistungen wie Schulen und Krankenhäuser sorgen, wenn das gleichen Zugang und gleiche Standards sichert.", "Gemeinden sollten Schulen und Krankenhäuser selbst gestalten dürfen, wenn sie diese Aufgaben gut erfüllen."],
  F01: ["Es beunruhigt mich, wenn Menschen wichtige Leistungen nicht bekommen, weil der Zugang zu sehr vom eigenen Geld abhängt.", "Mich beunruhigt, wenn Menschen bei wichtigen Leistungen kaum zwischen Anbietern wählen können."],
  F02: ["Sehr große Einkommensunterschiede empfinde ich als ungerecht, auch wenn ihre Verringerung höhere Steuern erfordert.", "Hohe Steuern beunruhigen mich, auch wenn sie sehr große Einkommensunterschiede verringern sollen."],
  F03: ["Ich finde es gerecht, wenn Beschäftigte oder die Allgemeinheit einen spürbaren Anteil an großen Unternehmen besitzen.", "Ich finde es gerecht, wenn private Investoren die Mehrheit der Unternehmensanteile behalten und Beschäftigte gesetzlich geschützt sind."],
  F04: ["Mich ärgert, wenn veraltete Gesetze bestehen bleiben, obwohl eine breite Mehrheit Veränderungen will.", "Es ist mir unangenehm, wenn lange geltende Regeln sich ändern, bevor die meisten eine neue Denk- oder Lebensweise akzeptiert haben."],
  F05: ["Es ist mir unangenehm, wenn der Staat private Entscheidungen von Erwachsenen einschränkt, die niemand anderen direkt schädigen.", "Es stört mich, wenn Gesetze gemeinsame moralische Überzeugungen völlig außer Acht lassen."],
  F06: ["Es beunruhigt mich, wenn Schwangere nicht selbst über einen Schwangerschaftsabbruch entscheiden dürfen.", "Ein breiter Zugang zu Schwangerschaftsabbrüchen beunruhigt mich, weil ich glaube, dass ungeborenes Leben stärkeren Schutz verdient."],
  F07: ["In einer Krise beunruhigt es mich, wenn der Staat mehr Macht nutzt, als nötig ist.", "Mich beunruhigt, wenn die Polizei in einer ernsten Krise zu wenig Befugnisse hat, Menschen zu schützen."],
  F08: ["Mich beunruhigt, wenn eine Regierung unabhängige Gerichte unter Druck setzt, weil sie ihre Gesetze prüfen.", "Es beunruhigt mich, wenn unabhängige Gerichte immer wieder Gesetze aufheben, die ein gewähltes Parlament beschlossen hat."],
  F09: ["Es ist mir unangenehm, wenn gemeinsame Probleme ungelöst bleiben, weil Länder verbindliche Vereinbarungen ablehnen.", "Es beunruhigt mich, wenn internationale Verträge meinem Land wichtige Entscheidungen vorschreiben."],
  F10: ["Für mich gehören eingebürgerte Staatsbürger genauso zum Land wie Menschen, die von Geburt an Staatsbürger sind.", "Dass meine Familie seit langer Zeit in diesem Land lebt, spielt für mein Gefühl der Zugehörigkeit zur Nation eine Rolle."],
  F11: ["Wenn mich die Politik enttäuscht, liegt es meistens daran, dass die Entscheidungen schwierig sind und verschiedene Gruppen Verschiedenes wollen.", "Wenn mich Politik enttäuscht, vermute ich oft, dass gut vernetzte Gruppen stärker gehört werden als gewöhnliche Wähler."],
  F12: ["Es macht mir Sorgen, wenn für Wirtschaftswachstum wertvolle Natur zerstört wird.", "Der Verlust von Arbeitsplätzen und Lebensstandard macht mir Sorgen, wenn Umweltgrenzen das Wirtschaftswachstum stark bremsen."],
  F13: ["Ich fühle mich unwohl, wenn religiöse moralische Überzeugungen Gesetze für Menschen rechtfertigen, die diesen Glauben nicht teilen.", "Mich stört, wenn religiöse Argumente in politischen Debatten von vornherein ausgeschlossen werden."],
  F14: ["Ich fühle mich sicherer, wenn der Staat überall vergleichbar gute Schulen und Krankenhäuser garantiert.", "Ich fühle mich sicher, wenn fähige örtliche Behörden die Entscheidungen behalten, statt sie an Land oder Bund abzugeben."],
  A01: ["Wenn ein Krankenhaus vor Ort schließen muss, würde ich staatliche Hilfe befürworten, damit es geöffnet bleibt.", "Wenn ein Krankenhaus vor Ort so oder so zuverlässig arbeiten würde, wäre mir ein privater Anbieter lieber als mehr Staatsgeld."],
  A02: ["Ich würde eine mäßige Erhöhung meiner eigenen Steuern akzeptieren, wenn dadurch sehr große Einkommensunterschiede deutlich kleiner würden.", "Ich würde für niedrigere Steuern stimmen, auch wenn dadurch weniger Geld für arme Familien verfügbar ist."],
  A03: ["Wenn Beschäftigte in einem Großunternehmen Anteile erwerben wollen, würde ich das unterstützen.", "Läuft ein großes Unternehmen gut, würde ich es privaten Eigentümern lassen, statt Beschäftigten oder dem Staat große Anteile zu geben."],
  A04: ["Passt ein altes Gesetz nicht mehr zu dem, was die meisten heute akzeptieren, würde ich eine baldige Änderung unterstützen.", "Gesetze über Familie würde ich erst ändern, wenn der Wandel lange und breit unterstützt wird."],
  A05: ["Wählen Erwachsene frei eine Beziehung oder Lebensweise, die ich ablehne, wäre ich gegen ein Verbot, solange niemand direkt geschädigt wird.", "Ich würde rechtliche Grenzen für einvernehmliche Beziehungen unterstützen, wenn sie gegen gemeinsame moralische Werte verstoßen."],
  A06: ["Bei einer Abstimmung würde ich für einen breiteren legalen Zugang zu Schwangerschaftsabbrüchen stimmen.", "Bei einer Volksabstimmung über das Recht auf Schwangerschaftsabbruch würde ich für strengere gesetzliche Grenzen stimmen."],
  A07: ["Bei gewalttätigen Unruhen würde ich starke rechtliche Grenzen für die Polizei beibehalten.", "Bei schweren Unruhen würde ich dem Staat für kurze Zeit mehr Befugnisse erlauben, auch wenn dadurch manche Schutzrechte eingeschränkt werden."],
  A08: ["Wenn ein unabhängiges Gericht ein Gesetz aufhebt, das ich unterstütze, würde ich seine Entscheidung trotzdem respektieren.", "Wenn Gerichte wiederholt Gesetze einer Parlamentsmehrheit stoppen, würde ich eine Begrenzung ihrer Befugnisse unterstützen."],
  A09: ["Ich würde ein gemeinsames Klimaabkommen einhalten, auch wenn es manche Entscheidungen meines Landes begrenzt.", "Ich würde Entscheidungen im eigenen Land belassen, auch wenn dadurch eine gemeinsame internationale Antwort weniger wirksam wäre."],
  A10: ["Ich würde unterstützen, dass Menschen, die später Staatsbürger wurden, dieselben hohen gewählten Ämter bekleiden dürfen wie Staatsbürger von Geburt.", "Für besonders hohe politische Ämter würde ich Staatsbürger von Geburt an bevorzugen."],
  A11: ["Ich unterstütze eher Kandidaten, die politische Kompromisse offen erklären, auch wenn ihre Botschaft weniger eingängig ist.", "Ich bevorzuge Kandidaten, die versprechen, den Einfluss gut vernetzter Gruppen zu verringern und gewöhnlichen Wählern mehr direkte Mitsprache zu geben."],
  A12: ["Ich würde gesetzlich verbindliche Umweltgrenzen unterstützen, auch wenn sie das Wirtschaftswachstum etwas bremsen.", "Ich würde Regeln vermeiden, die Preise erhöhen, und beim Umweltschutz stärker auf saubere Technik setzen."],
  A13: ["Ich würde Gesetze ablehnen, die für alle gelten, aber ausschließlich religiös begründet werden.", "Ich würde es akzeptieren, wenn Amtsträger religiöse moralische Überzeugungen als berechtigten Grund für Gesetze nennen, die für alle gelten."],
  A14: ["Wären Schulen je nach Gegend sehr unterschiedlich gut, würde ich überregionale Standards unterstützen, auch wenn Orte weniger mitbestimmen.", "Wenn eine Gemeinde ihre Schulen gut führt, sollten Bund und Land ihr wenig vorschreiben."],
  J01: ['Der Staat sollte dafür sorgen, dass jede Familie Schulen und Ärzte nutzen kann.', 'Familien sollten mehr selbst entscheiden und weniger staatliche Hilfe erhalten.'],
  J02: ['Steuern sollten helfen, den Abstand zwischen Arm und Reich zu verkleinern.', 'Menschen sollten mehr von ihrem Einkommen behalten, auch wenn der Abstand groß bleibt.'],
  J03: ['Beschäftigte oder die Öffentlichkeit sollten mehr von den größten Unternehmen besitzen.', 'Die größten Unternehmen sollten überwiegend privaten Eigentümern gehören.'],
  J04: ['Öffentliche Regeln sollten sich ändern, wenn sich die Meinung der meisten Menschen ändert.', 'Alte Regeln sollten sich langsam ändern, nachdem lange Einigkeit bestand.'],
  J05: ['Erwachsene sollten private Entscheidungen frei treffen dürfen, solange niemand geschädigt wird.', 'Manche privaten Entscheidungen dürfen begrenzt werden, um gemeinsame Werte zu schützen.'],
  J06: ['Verantwortliche sollten Freiheit nur bei einer klaren und ernsten Gefahr begrenzen.', 'Verantwortliche dürfen Freiheit früh begrenzen, um schwere Unruhen zu verhindern.'],
  J07: ['Gerichte, Gesetze, andere Parteien und unabhängige Medien sollten gewählte Regierungen kontrollieren.', 'Wahlgewinner sollten großen Spielraum haben, das umzusetzen, was die Wähler gewählt haben.'],
  J08: ['Staaten sollten bei grenzüberschreitenden Problemen gemeinsame Regeln einhalten.', 'Jeder Staat sollte das letzte Wort behalten, auch wenn gemeinsame Probleme schwerer lösbar werden.'],
  J09: ['Eingebürgerte Menschen gehören genauso vollständig dazu wie Menschen, die als Staatsbürger geboren wurden.', 'Staatsbürgerschaft seit Geburt sollte stärker zählen, wenn es um vollständige Zugehörigkeit geht.'],
  J10: ['In der Politik gibt es meist viele Gruppen mit unterschiedlichen Bedürfnissen und Ideen.', 'Politik ist oft normale Menschen gegen eine mächtige Gruppe, die sie ignoriert.'],
  J11: ['Der Schutz der Natur sollte manchmal wichtiger sein als Wirtschaftswachstum.', 'Wirtschaftswachstum sollte meist zuerst kommen, während wir gleichzeitig die Natur schützen.'],
  J12: ['Religion sollte nicht für Gesetze genutzt werden, die auch Menschen anderer Religionen betreffen.', 'Religion kann ein fairer Grund für Gesetze sein, auch wenn nicht alle sie teilen.'],
  J13: ['Die nationale Regierung sollte wichtige Leistungen organisieren, damit alle denselben Standard erhalten.', 'Lokale Gemeinden sollten wichtige Leistungen organisieren, wann immer sie dazu in der Lage sind.'],
  J14: ['In einer Krise sorge ich mich stärker darum, dass Verantwortliche zu viel Macht erhalten.', 'In einer Krise sorge ich mich stärker darum, dass Verantwortliche zu wenig Macht für Sicherheit haben.'],
  J15: ['Ich sorge mich stärker, wenn gewählte Regierungen Gerichte, Gesetze oder unabhängige Medien schwächen.', 'Ich sorge mich stärker, wenn Gerichte oder andere Stellen gewählte Regierungen ständig blockieren.'],
  J16: ['Wenn Politik schlecht läuft, denke ich zuerst an schwierige Entscheidungen und unterschiedliche Wünsche.', 'Wenn Politik schlecht läuft, denke ich zuerst, dass eine mächtige Gruppe normale Menschen ignoriert.'],
};

export function germanBeliefStatement(sourceItemId: string, polarity: BeliefPolarity) {
  const pair = dePairs[sourceItemId];
  return pair?.[polarity === 'negative' ? 0 : 1] ?? null;
}

export const germanBeliefPairCount = Object.keys(dePairs).filter((id) => !id.startsWith('J')).length;
export const germanJuniorPairCount = Object.keys(dePairs).filter((id) => id.startsWith('J')).length;
