import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const homepage = readFileSync(join(root, 'app/page.tsx'), 'utf8');
const translations = readFileSync(join(root, 'app/translations.ts'), 'utf8');
const layout = readFileSync(join(root, 'app/layout.tsx'), 'utf8');
const localeProvider = readFileSync(join(root, 'app/LocaleProvider.tsx'), 'utf8');
const deepClient = readFileSync(join(root, 'app/deep/DeepClient.tsx'), 'utf8');
const deepNative = readFileSync(join(root, 'app/deep/deep-native.ts'), 'utf8');
const schoolPage = readFileSync(join(root, 'app/school/page.tsx'), 'utf8');
const infoShell = readFileSync(join(root, 'app/InfoShell.tsx'), 'utf8');
const localizedInfo = readFileSync(join(root, 'app/LocalizedInfoPage.tsx'), 'utf8');
const privateStudent = readFileSync(join(root, 'app/school/private/page.tsx'), 'utf8');
const classroomStudent = readFileSync(join(root, 'app/school/student/student-native.ts'), 'utf8');
const privateLiteracy = readFileSync(join(root, 'app/school/private/literacy/PrivateLiteracyClient.tsx'), 'utf8');

test('homepage uses the locked eight-axis names instead of the former four-axis shorthand', () => {
  for (const axis of ['Economic role', 'Ownership', 'Social values', 'Authority', 'Pluralism', 'World', 'Nationhood', 'Ecology']) {
    assert.match(homepage, new RegExp(`'${axis.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}'`));
  }
  assert.doesNotMatch(homepage, /const dimensions = \[\[t\('Economy'/);
});

test('German homepage copy stays informal and avoids literal formal-address calques', () => {
  assert.match(homepage, /Politik passt nicht auf eine Links-rechts-Linie\./);
  assert.match(homepage, /du bei acht politischen Dimensionen/);
  assert.doesNotMatch(homepage, /\b(?:Sie|Ihnen|Ihre|Ihrem|Ihren|Ihrer)\b/);
});

test('French marketing localization uses tu rather than vous', () => {
  assert.match(translations, /Tes idées politiques ne tiennent pas sur un seul axe gauche-droite\./);
  assert.match(translations, /sans te coller une étiquette/);
  assert.doesNotMatch(translations, /\b(?:vous|votre|vos)\b/i);
});

test('Spanish marketing localization stays on informal tú copy and avoids usted', () => {
  assert.match(translations, /Tus ideas políticas no caben en un eje izquierda-derecha\./);
  assert.match(translations, /tu forma de pensar políticamente/);
  assert.doesNotMatch(translations, /\bustedes?\b/i);
});

test('English locale is explicitly US English and the language control allows direct choice', () => {
  assert.match(layout, /<html lang="en-US"/);
  assert.match(localeProvider, /en: 'English \(US\)'/);
  assert.match(localeProvider, /<select/);
  assert.match(localeProvider, /Choose language/);
  assert.doesNotMatch(localeProvider, /setLocale\(next\)/);
});

test('Full keeps validated statement banks but localizes the surrounding experience', () => {
  assert.match(deepClient, /germanBeliefStatement/);
  assert.match(deepClient, /romanceBeliefStatement/);
  assert.match(deepClient, /deepUi\(locale\)/);
  assert.match(deepClient, /deepAxis\(locale/);
  assert.match(deepClient, /deepFamily\(locale/);
  assert.match(deepClient, /deepConstruct\(locale/);
});

test('Full native copy follows informal French and Spanish address rules', () => {
  assert.match(deepNative, /Ton profil politique reste mixte\./);
  assert.match(deepNative, /Tu perfil político sigue siendo mixto\./);
  assert.doesNotMatch(deepNative, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(deepNative, /\bustedes?\b/i);
});

test('Full German interface uses direct informal address in user-facing copy', () => {
  assert.match(deepNative, /Mach Politangle Quick, bevor du mit Full weitermachst\./);
  assert.match(deepNative, /Dein politisches Profil bleibt gemischt\./);
  assert.match(deepNative, /deinem Profil/);
});

test('School uses the locked 42-question total and native privacy copy', () => {
  assert.doesNotMatch(schoolPage, /Full 84/);
  assert.match(schoolPage, /Full to 42 questions in total/);
  assert.match(schoolPage, /geh mit Full auf insgesamt 42 Fragen/);
  assert.match(schoolPage, /sigue con Full hasta 42 preguntas en total/);
  assert.match(schoolPage, /Full pour aller jusqu’à 42 questions au total/);
  assert.match(schoolPage, /Die Lehrkraft sieht das Gesamtbild der Klasse, aber nie, wer welche Antwort gegeben hat/);
  assert.match(schoolPage, /el profesor ve el conjunto de la clase, nunca quién dio cada respuesta/);
  assert.match(schoolPage, /l’enseignant voit l’ensemble du groupe, jamais qui a donné quelle réponse/);
});

test('trust and information pages are native multilingual pages, not English fallbacks', () => {
  assert.doesNotMatch(infoShell, /page.*only.*English|page.*in English|nur auf Englisch|sigue en inglés|encore en anglais/i);
  assert.match(localizedInfo, /Mehrere Achsen statt einer politischen Schublade\./);
  assert.match(localizedInfo, /Un mapa de matices, no una etiqueta\./);
  assert.match(localizedInfo, /Plusieurs axes pour garder les nuances\./);
  assert.match(localizedInfo, /Quick 26 te da una primera lectura/);
  assert.match(localizedInfo, /Quick 26 donne une première lecture/);
});

test('native trust copy keeps informal address and the locked 42-question total', () => {
  assert.doesNotMatch(localizedInfo, /\b(?:Sie|Ihnen|Ihre|Ihrem|Ihren|Ihrer)\b/);
  assert.doesNotMatch(localizedInfo, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(localizedInfo, /\bustedes?\b/i);
  assert.doesNotMatch(localizedInfo, /Full 84/);
  assert.match(localizedInfo, /42 Fragen insgesamt/);
  assert.match(localizedInfo, /42 preguntas en total/);
  assert.match(localizedInfo, /42 questions au total/);
});

test('Private Student Mode uses native informal copy instead of formal German', () => {
  assert.match(privateStudent, /Dein Gerät · dein Ergebnis/);
  assert.match(privateStudent, /Tu dispositivo · tu resultado/);
  assert.match(privateStudent, /Ton appareil · ton résultat/);
  assert.doesNotMatch(privateStudent, /\b(?:Sie|Ihnen|Ihre|Ihrem|Ihren|Ihrer)\b/);
  assert.doesNotMatch(privateStudent, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(privateStudent, /\bustedes?\b/i);
  assert.doesNotMatch(privateStudent, /Full 84/);
});

test('anonymous classroom student UI stays native and informal in DE ES FR', () => {
  assert.match(classroomStudent, /Du brauchst weder Namen noch E-Mail-Adresse/);
  assert.match(classroomStudent, /No necesitas nombre, correo, usuario ni número de estudiante/);
  assert.match(classroomStudent, /Aucun nom, e-mail, identifiant ou numéro d’élève n’est demandé/);
  assert.doesNotMatch(classroomStudent, /\b(?:Sie|Ihnen|Ihre|Ihrem|Ihren|Ihrer)\b/);
  assert.doesNotMatch(classroomStudent, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(classroomStudent, /\bustedes?\b/i);
});

test('private literacy UI is native while unvalidated ES FR question banks remain explicitly marked', () => {
  assert.match(privateLiteracy, /Dein privates Wissens-Ergebnis/);
  assert.match(privateLiteracy, /Tu resultado privado de conocimientos/);
  assert.match(privateLiteracy, /Ton résultat privé de culture politique/);
  assert.match(privateLiteracy, /preguntas siguen en inglés mientras se valida/);
  assert.match(privateLiteracy, /questions restent en anglais pendant la validation/);
});
