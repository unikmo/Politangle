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
const siteChrome = readFileSync(join(root, 'app/SiteChrome.tsx'), 'utf8');
const schoolPage = readFileSync(join(root, 'app/school/page.tsx'), 'utf8');
const infoShell = readFileSync(join(root, 'app/InfoShell.tsx'), 'utf8');
const localizedInfo = readFileSync(join(root, 'app/LocalizedInfoPage.tsx'), 'utf8');
const methodExplainer = readFileSync(join(root, 'app/MethodExplainer.tsx'), 'utf8');
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
  assert.match(layout, /en: 'en-US'/);
  assert.match(layout, /<html lang=\{lang\}/);
  assert.match(localeProvider, /en: 'English \(US\)'/);
  assert.match(localeProvider, /<select/);
  assert.match(localeProvider, /Choose language/);
  assert.doesNotMatch(localeProvider, /setLocale\(next\)/);
});

test('primary navigation opens dedicated localized pages rather than homepage sections', () => {
  assert.match(homepage, /<SiteHeader \/>/);
  for (const route of ['/method', '/learn', '/quizzes', '/school', '/about']) {
    assert.match(siteChrome, new RegExp(`href\\('${route.replace('/', '\\/')}'\\)`));
  }
  assert.doesNotMatch(homepage, /href="#(?:method|learn|schools)"/);
  assert.match(localeProvider, /export function localePath/);
  assert.match(infoShell, /localePath\(locale, path\)/);
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
  assert.match(localizedInfo, /Acht Fragen, die Politik oft miteinander vermischt\./);
  assert.match(localizedInfo, /Ocho preguntas que la política suele mezclar\./);
  assert.match(localizedInfo, /Huit questions que la politique mélange souvent\./);
  assert.match(methodExplainer, /Quick utiliza 26 afirmaciones/);
  assert.match(methodExplainer, /Quick utilise 26 affirmations/);
  assert.match(localizedInfo, /ptBrInfoPages/);
  assert.match(methodExplainer, /O Quick usa 26 afirmações/);
});

test('native trust copy keeps informal address and the locked 42-question total', () => {
  assert.match(methodExplainer, /Du beantwortest Aussagen/);
  assert.match(localizedInfo, /deine eigene Kombination/);
  assert.doesNotMatch(localizedInfo + methodExplainer, /(?:Ihre Politik|Ihre Ansichten|Ihre Antworten|Ihr Ergebnis|Ihr Profil|\bIhnen\b|Machen Sie|Starten Sie|Nehmen Sie|Sie können|Sie brauchen|Geben Sie)/);
  assert.doesNotMatch(methodExplainer, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(methodExplainer, /\bustedes?\b/i);
  assert.doesNotMatch(localizedInfo + methodExplainer, /Full 84/);
  assert.match(methodExplainer, /42 in total/);
  assert.match(methodExplainer, /42/);
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
  assert.match(classroomStudent, /Deine Antwort wurde zur Klassensumme hinzugefügt/);
  assert.match(classroomStudent, /No necesitas nombre, correo, usuario ni número de estudiante/);
  assert.match(classroomStudent, /Aucun nom, e-mail, identifiant ou numéro d’élève n’est demandé/);
  assert.doesNotMatch(classroomStudent, /(?:Ihre Antwort|Ihr Ergebnis|\bIhnen\b|Sie brauchen|Geben Sie|Wählen Sie|Senden Sie)/);
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
