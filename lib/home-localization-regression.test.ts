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
