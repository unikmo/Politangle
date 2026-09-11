import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const homepage = readFileSync(join(root, 'app/page.tsx'), 'utf8');
const translations = readFileSync(join(root, 'app/translations.ts'), 'utf8');

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
  assert.match(translations, /te resulte más natural pensar/);
  assert.doesNotMatch(translations, /\bustedes?\b/i);
});
