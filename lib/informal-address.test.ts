import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

// Politangle speaks to readers informally everywhere: German "du", Spanish "tú", French "tu".
// This scans every source file (not just a few), so new copy cannot slip in with formal address.

const root = path.resolve(__dirname, '..');

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : sourceFiles(full);
    return /\.(ts|tsx)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

const files = [...sourceFiles(path.join(root, 'app')), ...sourceFiles(path.join(root, 'lib'))];

// A capitalised "Sie/Ihr…" in the middle of a sentence is formal address; third-person "sie" is lowercase there.
const germanFormal = /[a-zäöüß,;] (?:Sie|Ihnen|Ihre[mnrs]?|Ihr)\b|\b(?:Wählen|Geben|Klicken|Starten|Nutzen|Beginnen|Lesen|Prüfen|Melden|Senden|Haben|Können|Möchten|Wollen|Sollten|Dürfen|Schreiben|Laden|Öffnen|Teilen|Bestätigen|Kontaktieren|Nehmen|Bitte) Sie\b/;
const spanishFormal = /\busted(?:es)?\b/i;
const frenchFormal = /\b(?:vous|votre|vos|veuillez)\b/i;
const germanCapitalisedDu = /[a-zäöüß,;] (?:Du|Dein|Deine[mnrs]?|Dir|Dich)\b/;

test('no formal address in German, Spanish or French copy', () => {
  assert.ok(files.length > 50, 'expected to scan the app and lib source files');
  const offences: string[] = [];
  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    lines.forEach((line, index) => {
      const hit = [germanFormal, spanishFormal, frenchFormal, germanCapitalisedDu].find((pattern) => pattern.test(line));
      if (hit) offences.push(`${path.relative(root, file)}:${index + 1} ${line.trim().slice(0, 90)}`);
    });
  }
  assert.deepEqual(offences, []);
});
