import type { BeliefPolarity } from './belief-statements';

export const GERMAN_BELIEVE_VERSION = 'de-believe-2026.10-editorial-v3' as const;

const dePairs: Record<string, readonly [string, string]> = {
  T01: ['Der Staat sollte dafür sorgen, dass alle Menschen wichtige Angebote wie Schulen und Ärzte nutzen können.', 'Der Staat sollte sich weniger einmischen. Menschen sollten bei wichtigen Angeboten mehr private Möglichkeiten nutzen.'],
  T02: ['Der Staat sollte mit Steuern und Hilfen sehr große Unterschiede zwischen Arm und Reich verkleinern.', 'Der Staat sollte Einkommensunterschiede weniger verändern, auch wenn der Abstand zwischen Arm und Reich groß bleibt.'],
  T03: ['Beschäftigte, Genossenschaften oder der Staat sollten mehr Anteile an großen Unternehmen besitzen.', 'Große Unternehmen sollten meist privaten Eigentümern gehören. Gesetze sollen dabei die Beschäftigten schützen.'],
  T04: ["Gesetze sollten zügig angepasst werden, wenn gesellschaftliche Veränderungen breite Zustimmung finden.", "Bewährte Gesetze sollten erst nach längerer Debatte geändert werden, auch wenn viele Menschen bereits dafür sind."],
  T05: ["Einvernehmliche Beziehungen zwischen Erwachsenen sollten erlaubt sein, auch wenn andere sie moralisch ablehnen.", "Der Staat darf bestimmte einvernehmliche Beziehungen zwischen Erwachsenen aus moralischen Gründen rechtlich einschränken."],
  T06: ['Ein Schwangerschaftsabbruch sollte grundsätzlich legal sein. Die schwangere Person sollte vor allem selbst entscheiden.', 'Für Schwangerschaftsabbrüche sollte es strengere Gesetze geben, um ungeborenes Leben zu schützen.'],
  T07: ['Der Staat sollte Freiheit nur einschränken, wenn eine klare und ernste Gefahr besteht.', 'Der Staat darf Freiheit früh einschränken, wenn schwere Unruhen wahrscheinlich sind.'],
  T08: ["Unabhängige Gerichte müssen prüfen dürfen, ob Gesetze gewählter Regierungen gegen die Verfassung verstoßen.", "Eine gewählte Regierung sollte ihre Vorhaben umsetzen können, auch wenn unabhängige Gerichte Bedenken anmelden."],
  T09: ['Länder sollten gemeinsame, verbindliche Regeln einhalten, wenn ein Problem mehrere Länder betrifft.', 'Jedes Land sollte selbst das letzte Wort haben, auch wenn gemeinsame Lösungen dadurch schwächer werden.'],
  T10: ["Für die Zugehörigkeit zum Land sollte es keine Rolle spielen, ob jemand eingebürgert oder von Geburt an Staatsbürger ist.", "Wer die Staatsbürgerschaft seit Geburt besitzt, sollte als dem Land stärker zugehörig gelten."],
  T11: ["Politische Konflikte entstehen meist, weil verschiedene Gruppen unterschiedliche berechtigte Interessen haben.", "Häufig gibt es einen gemeinsamen Willen des Volkes, den eine politische Elite bewusst missachtet."],
  T12: ['Der Schutz der Natur sollte manchmal wichtiger sein als Wirtschaftswachstum.', 'Wirtschaftswachstum sollte meist Vorrang haben. Umweltschutz soll das Wachstum möglichst nicht bremsen.'],
  T13: ['Religion sollte nicht als Grund für Gesetze dienen, die für Menschen aller Religionen gelten.', 'Religiöse Werte können ein guter Grund für Gesetze sein, auch wenn nicht alle diesen Glauben teilen.'],
  T14: ["Bund oder Länder sollten einheitliche Mindeststandards für Schulen und Krankenhäuser festlegen.", "Gemeinden sollten Schulen und Krankenhäuser selbst gestalten dürfen, wenn sie diese Aufgaben gut erfüllen."],
  F01: ["Mich beunruhigt, wenn Menschen notwendige medizinische Hilfe nicht bekommen, weil sie zu teuer ist.", "Mich beunruhigt, wenn Menschen bei wichtigen Leistungen kaum zwischen Anbietern wählen können."],
  F02: ["Sehr große Einkommensunterschiede empfinde ich als ungerecht, auch wenn ihre Verringerung höhere Steuern erfordert.", "Es stört mich, wenn der Staat hohe Einkommen stark besteuert, um Einkommensunterschiede auszugleichen."],
  F03: ["Ich finde es gerecht, wenn Beschäftigte an den Gewinnen und am Eigentum großer Unternehmen beteiligt werden.", "Ich finde es gerecht, wenn private Investoren die Mehrheit der Unternehmensanteile behalten und Beschäftigte gesetzlich geschützt sind."],
  F04: ["Mich ärgert, wenn veraltete Gesetze bestehen bleiben, obwohl eine breite Mehrheit Veränderungen will.", "Mich stört, wenn bewährte Gesetze geändert werden, obwohl viele Menschen die neuen Regeln noch ablehnen."],
  F05: ["Es stört mich, wenn Erwachsenen etwas Privates verboten wird, obwohl sie niemandem schaden.", "Es stört mich, wenn Gesetze gemeinsame moralische Überzeugungen völlig außer Acht lassen."],
  F06: ["Es beunruhigt mich, wenn Schwangere nicht selbst über einen Schwangerschaftsabbruch entscheiden dürfen.", "Es beunruhigt mich, wenn ungeborenes Leben gesetzlich nicht ausreichend geschützt ist."],
  F07: ["Mich beunruhigt, wenn der Staat in einer Krise grundlegende Freiheitsrechte zu leicht einschränkt.", "Mich beunruhigt, wenn die Polizei in einer ernsten Krise zu wenig Befugnisse hat, Menschen zu schützen."],
  F08: ["Mich beunruhigt, wenn eine Regierung unabhängige Gerichte unter Druck setzt, weil sie ihre Gesetze prüfen.", "Mich beunruhigt, wenn unabhängige Gerichte Gesetze stoppen, die eine gewählte Parlamentsmehrheit beschlossen hat."],
  F09: ["Es ärgert mich, wenn Länder gemeinsame Probleme nicht angehen, weil sie verbindliche Abkommen ablehnen.", "Es beunruhigt mich, wenn internationale Verträge meinem Land wichtige Entscheidungen vorschreiben."],
  F10: ["Für mich gehören eingebürgerte Staatsbürger genauso zum Land wie Menschen, die von Geburt an Staatsbürger sind.", "Für mein Gefühl macht es einen Unterschied, ob jemand schon von Geburt an Staatsbürger ist."],
  F11: ["Mich stört es, wenn Politiker behaupten, nur ihre Anhänger seien das „wahre Volk“.", "Ich habe oft das Gefühl, dass eine politische Elite den gemeinsamen Willen des Volkes absichtlich missachtet."],
  F12: ["Es macht mir Sorgen, wenn für Wirtschaftswachstum wertvolle Natur zerstört wird.", "Es macht mir Sorgen, wenn strenge Umweltauflagen Arbeitsplätze und Einkommen gefährden."],
  F13: ["Mich stört, wenn Politiker Gesetze für alle Menschen hauptsächlich mit ihrem eigenen Glauben begründen.", "Mich stört, wenn religiöse Argumente in politischen Debatten von vornherein ausgeschlossen werden."],
  F14: ["Ich fühle mich sicherer, wenn der Staat überall vergleichbar gute Schulen und Krankenhäuser garantiert.", "Ich fühle mich sicherer, wenn Städte und Gemeinden über ihre Schulen und Krankenhäuser selbst entscheiden."],
  A01: ['Wenn eine Klinik vor Ort schließen könnte, würde ich öffentliche Hilfe geben, damit sie für alle offen bleibt.', 'Wenn eine Klinik vor Ort schließen könnte, würde ich zuerst einen privaten Anbieter suchen statt mehr öffentlicher Hilfe.'],
  A02: ['Ich würde etwas mehr Steuern zahlen, wenn damit Familien mit sehr wenig Geld unterstützt werden.', 'Ich würde niedrigere Steuern wählen, auch wenn dann weniger Hilfe für Familien mit sehr wenig Geld möglich ist.'],
  A03: ['In einem großen Unternehmen würde ich Beschäftigten Anteile und ein echtes Mitspracherecht geben.', 'In einem großen Unternehmen würde ich Eigentum und wichtige Entscheidungen vor allem bei privaten Investoren lassen.'],
  A04: ["Neue Familienformen würde ich rechtlich anerkennen, sobald eine klare gesellschaftliche Mehrheit dafür ist.", "Gesetze über Familie würde ich erst ändern, wenn der Wandel lange und breit unterstützt wird."],
  A05: ["Auch wenn ich eine Beziehung zwischen Erwachsenen ablehne, würde ich kein Verbot unterstützen, solange niemand geschädigt wird.", "Ich würde rechtliche Grenzen für einvernehmliche Beziehungen unterstützen, wenn sie gegen gemeinsame moralische Werte verstoßen."],
  A06: ['Bei einer Abstimmung würde ich für einen breiteren legalen Zugang zu Schwangerschaftsabbrüchen stimmen.', 'Bei einer Abstimmung würde ich für strengere gesetzliche Grenzen bei Schwangerschaftsabbrüchen stimmen.'],
  A07: ['Bei gewalttätigen Unruhen würde ich starke rechtliche Grenzen für die Polizei beibehalten.', 'Bei gewalttätigen Unruhen würde ich der Polizei für kurze Zeit mehr Befugnisse geben.'],
  A08: ["Wenn ein unabhängiges Gericht ein Gesetz stoppt, das ich unterstütze, würde ich seine Entscheidung trotzdem respektieren.", "Wenn Gerichte wiederholt Gesetze einer Parlamentsmehrheit stoppen, würde ich eine Begrenzung ihrer Befugnisse unterstützen."],
  A09: ['Ich würde ein gemeinsames Klimaabkommen einhalten, auch wenn es manche Entscheidungen meines Landes begrenzt.', 'Mein Land sollte selbst entscheiden, auch wenn dadurch der gemeinsame Klimaplan schwächer wird.'],
  A10: ["Für hohe politische Ämter sollten eingebürgerte Staatsbürger dieselben Chancen haben wie Staatsbürger von Geburt an.", "Für besonders hohe politische Ämter würde ich Staatsbürger von Geburt an bevorzugen."],
  A11: ["Ich misstraue Kandidaten, die behaupten, nur sie sprächen für das „wahre Volk“.", "Ich würde Kandidaten unterstützen, die behaupten, allein den wahren Volkswillen gegen eine politische Elite durchzusetzen."],
  A12: ['Ich würde etwas höhere Preise akzeptieren, wenn ein Produkt der Umwelt stark schadet.', 'Ich würde Regeln vermeiden, die Preise erhöhen, und beim Umweltschutz stärker auf saubere Technik setzen.'],
  A13: ['Ich würde Politiker ablehnen, die Gesetze für alle vor allem mit ihrer Religion begründen.', 'Ich würde akzeptieren, wenn Politiker Gesetze für alle mit religiösen Werten begründen.'],
  A14: ["Bei großen Unterschieden zwischen Schulen würde ich für einheitliche Mindeststandards des Landes stimmen.", "Wenn eine Gemeinde ihre Schulen gut führt, sollten Bund und Land ihr wenig vorschreiben."],
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
