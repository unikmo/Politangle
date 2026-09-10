import type { BeliefPolarity } from './belief-statements';

export const GERMAN_BELIEVE_VERSION = 'de-believe-2026.09-candidate-v2' as const;

const dePairs: Record<string, readonly [string, string]> = {
  T01: ['Der Staat sollte dafür sorgen, dass alle Menschen wichtige Angebote wie Schulen und Ärzte nutzen können.', 'Der Staat sollte sich weniger einmischen. Menschen sollten bei wichtigen Angeboten mehr private Möglichkeiten nutzen.'],
  T02: ['Der Staat sollte mit Steuern und Hilfen sehr große Unterschiede zwischen Arm und Reich verkleinern.', 'Der Staat sollte Einkommensunterschiede weniger verändern, auch wenn der Abstand zwischen Arm und Reich groß bleibt.'],
  T03: ['Beschäftigte, Genossenschaften oder der Staat sollten mehr Anteile an großen Unternehmen besitzen.', 'Große Unternehmen sollten meist privaten Eigentümern gehören. Gesetze sollen dabei die Beschäftigten schützen.'],
  T04: ['Regeln sollten sich recht bald ändern, wenn viele Menschen eine neue gesellschaftliche Sicht teilen.', 'Alte Regeln sollten erst geändert werden, wenn die neue Sicht lange und breit unterstützt wird.'],
  T05: ['Erwachsene sollten private Entscheidungen frei treffen dürfen, solange sie niemandem schaden.', 'Manche privaten Entscheidungen dürfen verboten werden, um gemeinsame moralische Werte zu schützen.'],
  T06: ['Ein Schwangerschaftsabbruch sollte grundsätzlich legal sein. Die schwangere Person sollte vor allem selbst entscheiden.', 'Für Schwangerschaftsabbrüche sollte es strengere Gesetze geben, um ungeborenes Leben zu schützen.'],
  T07: ['Der Staat sollte Freiheit nur einschränken, wenn eine klare und ernste Gefahr besteht.', 'Der Staat darf Freiheit früh einschränken, wenn schwere Unruhen wahrscheinlich sind.'],
  T08: ['Auch eine gewählte Regierung muss von Gerichten, Gesetzen, Opposition und freien Medien kontrolliert werden.', 'Eine gewählte Regierung sollte ihr Programm umsetzen können, auch wenn Gerichte oder andere Stellen sie bremsen.'],
  T09: ['Länder sollten gemeinsame, verbindliche Regeln einhalten, wenn ein Problem mehrere Länder betrifft.', 'Jedes Land sollte selbst das letzte Wort haben, auch wenn gemeinsame Lösungen dadurch schwächer werden.'],
  T10: ['Eingebürgerte Menschen können genauso vollständig zum Land gehören wie Menschen, die dort als Staatsbürger geboren wurden.', 'Wer seit der Geburt Staatsbürger ist, sollte bei der Zugehörigkeit zum Land stärker zählen.'],
  T11: ['In der Politik gibt es meist mehrere Gruppen mit echten, unterschiedlichen Zielen.', 'Politik ist oft ein Kampf zwischen normalen Menschen und einer mächtigen Elite, die sie ignoriert.'],
  T12: ['Der Schutz der Natur sollte manchmal wichtiger sein als Wirtschaftswachstum.', 'Wirtschaftswachstum sollte meist Vorrang haben. Umweltschutz soll das Wachstum möglichst nicht bremsen.'],
  T13: ['Religion sollte nicht als Grund für Gesetze dienen, die für Menschen aller Religionen gelten.', 'Religiöse Werte können ein guter Grund für Gesetze sein, auch wenn nicht alle diesen Glauben teilen.'],
  T14: ['Bund oder Länder sollten wichtige Angebote übernehmen, wenn dadurch alle denselben Zugang und Standard erhalten.', 'Wichtige Aufgaben sollten möglichst vor Ort erledigt werden. Höhere Ebenen sollten nur bei Bedarf eingreifen.'],
  F01: ['Ich mache mir mehr Sorgen, dass Menschen wichtige Angebote nicht bezahlen können.', 'Ich mache mir mehr Sorgen, dass staatliche Angebote Auswahl und Selbstständigkeit verringern.'],
  F02: ['Große Einkommensunterschiede beunruhigen mich stärker als die höheren Steuern, mit denen sie verringert werden.', 'Höhere Steuern beunruhigen mich stärker als große Einkommensunterschiede.'],
  F03: ['Es fühlt sich gerechter an, wenn Beschäftigte oder die Öffentlichkeit mehr von großen Unternehmen besitzen.', 'Es fühlt sich gerechter an, wenn private Investoren die meisten Anteile behalten und Gesetze die Beschäftigten schützen.'],
  F04: ['Ich finde es schlimmer, wenn öffentliche Regeln einer breit unterstützten Veränderung hinterherhinken.', 'Ich finde es schlimmer, wenn alte Regeln geändert werden, bevor die neue Sicht breit akzeptiert ist.'],
  F05: ['Ich finde es schlimmer, wenn der Staat harmlose private Entscheidungen von Erwachsenen einschränkt.', 'Ich finde es schlimmer, wenn gemeinsame moralische Werte bei Gesetzen keine Rolle spielen.'],
  F06: ['Beim Thema Schwangerschaftsabbruch sorgt mich mehr, dass die schwangere Person nicht selbst entscheiden kann.', 'Beim Thema Schwangerschaftsabbruch sorgt mich mehr, dass ungeborenes Leben nicht genug geschützt wird.'],
  F07: ['In einer Krise sorgt mich mehr, dass der Staat zu viel Macht nutzt.', 'In einer Krise sorgt mich mehr, dass Behörden zu wenig Macht für Sicherheit haben.'],
  F08: ['Es beunruhigt mich mehr, wenn eine gewählte Mehrheit Gerichte oder andere Kontrollen schwächt.', 'Es beunruhigt mich mehr, wenn nicht gewählte Stellen eine gewählte Regierung immer wieder blockieren.'],
  F09: ['Ich finde es schlimmer, wenn Länder gemeinsame Probleme nicht lösen, weil sie feste Abkommen ablehnen.', 'Ich finde es schlimmer, wenn internationale Abkommen die Entscheidungen meines Landes begrenzen.'],
  F10: ['Eingebürgerte Menschen fühlen sich für mich genauso zugehörig wie Staatsbürger seit Geburt.', 'Staatsbürger seit Geburt fühlen sich für mich stärker zugehörig als eingebürgerte Menschen.'],
  F11: ['Wenn Politik scheitert, denke ich eher an schwierige Entscheidungen und verschiedene Interessen.', 'Wenn Politik scheitert, denke ich eher an eine mächtige Elite, die normale Menschen ignoriert.'],
  F12: ['Wenn nicht beides möglich ist, sorgt mich mehr der Schaden für Natur und Klima.', 'Wenn nicht beides möglich ist, sorgen mich mehr Arbeitsplätze und Lebensstandard.'],
  F13: ['Ich finde es schlimmer, wenn religiöse Werte Gesetze für alle bestimmen.', 'Ich finde es schlimmer, wenn religiöse Ansichten nur wegen ihres Glaubens abgelehnt werden.'],
  F14: ['Ich fühle mich sicherer, wenn Bund oder Länder überall gleiche Standards garantieren.', 'Ich fühle mich sicherer, wenn Familien und Gemeinden Aufgaben selbst regeln können.'],
  A01: ['Wenn eine Klinik vor Ort schließen könnte, würde ich öffentliche Hilfe geben, damit sie für alle offen bleibt.', 'Wenn eine Klinik vor Ort schließen könnte, würde ich zuerst einen privaten Anbieter suchen statt mehr öffentlicher Hilfe.'],
  A02: ['Ich würde etwas mehr Steuern zahlen, wenn damit Familien mit sehr wenig Geld unterstützt werden.', 'Ich würde niedrigere Steuern wählen, auch wenn dann weniger Hilfe für Familien mit sehr wenig Geld möglich ist.'],
  A03: ['In einem großen Unternehmen würde ich Beschäftigten Anteile und ein echtes Mitspracherecht geben.', 'In einem großen Unternehmen würde ich Eigentum und wichtige Entscheidungen vor allem bei privaten Investoren lassen.'],
  A04: ['Wenn eine alte Schulregel nicht mehr zum Leben der meisten Schüler passt, würde ich sie bald ändern.', 'Ich würde eine alte Schulregel erst ändern, wenn die Änderung lange und breit unterstützt wird.'],
  A05: ['Wenn Erwachsene privat etwas tun, das ich ablehne, aber niemandem schadet, wäre ich gegen ein Verbot.', 'Ich könnte etwas Privates verbieten lassen, wenn es stark gegen gemeinsame Werte verstößt.'],
  A06: ['Bei einer Abstimmung würde ich für einen breiteren legalen Zugang zu Schwangerschaftsabbrüchen stimmen.', 'Bei einer Abstimmung würde ich für strengere gesetzliche Grenzen bei Schwangerschaftsabbrüchen stimmen.'],
  A07: ['Bei gewalttätigen Unruhen würde ich starke rechtliche Grenzen für die Polizei beibehalten.', 'Bei gewalttätigen Unruhen würde ich der Polizei für kurze Zeit mehr Befugnisse geben.'],
  A08: ['Wenn ein Gericht eine Politik stoppt, die ich gut finde, würde ich trotzdem seine Unabhängigkeit schützen.', 'Wenn Gerichte oft verhindern, was Wähler gewählt haben, könnte ich ihre Macht begrenzen.'],
  A09: ['Ich würde ein gemeinsames Klimaabkommen einhalten, auch wenn es manche Entscheidungen meines Landes begrenzt.', 'Mein Land sollte selbst entscheiden, auch wenn dadurch der gemeinsame Klimaplan schwächer wird.'],
  A10: ['Bei einer öffentlichen Stelle würde ich zwei gleich geeignete Staatsbürger gleich behandeln, egal wo sie geboren wurden.', 'Bei einer öffentlichen Stelle würde ich den im Land geborenen Staatsbürger bevorzugen, wenn beide gleich geeignet sind.'],
  A11: ['Ich wäre misstrauisch bei einem Kandidaten, der fast jedes Problem einer mächtigen Elite anlastet.', 'Ich würde einen Kandidaten unterstützen, der Macht von einer Elite an normale Menschen zurückgeben will.'],
  A12: ['Ich würde etwas höhere Preise akzeptieren, wenn ein Produkt der Umwelt stark schadet.', 'Ich würde Regeln vermeiden, die Preise erhöhen, und beim Umweltschutz stärker auf saubere Technik setzen.'],
  A13: ['Ich würde Politiker ablehnen, die Gesetze für alle vor allem mit ihrer Religion begründen.', 'Ich würde akzeptieren, wenn Politiker Gesetze für alle mit religiösen Werten begründen.'],
  A14: ['Wenn beides funktioniert, würde ich Bund oder Länder wählen, damit überall dieselben Standards gelten.', 'Wenn beides funktioniert, würde ich die Aufgabe bei der Gemeinde vor Ort lassen.'],
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
