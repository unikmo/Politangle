import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const teacherUi = readFileSync(join(root, 'app/school/teacher/teacher-native.ts'), 'utf8');
const teacherClient = readFileSync(join(root, 'app/school/teacher/TeacherSchoolClient.tsx'), 'utf8');
const teacherGate = readFileSync(join(root, 'app/school/teacher/TeacherLicenseGate.tsx'), 'utf8');
const teacherHeader = readFileSync(join(root, 'app/school/teacher/TeacherHeader.tsx'), 'utf8');

test('teacher route uses native DE ES FR entry and license language', () => {
  assert.match(teacherHeader, /Lehrkraft/);
  assert.match(teacherHeader, /Docente/);
  assert.match(teacherHeader, /Enseignant/);
  assert.match(teacherGate, /Gib deine Lehrkraft-Lizenz ein/);
  assert.match(teacherGate, /Introduce tu licencia docente/);
  assert.match(teacherGate, /Entre ta licence enseignant/);
  assert.doesNotMatch(teacherGate, /(?:Geben Sie|Ihre Lizenz|\busted\b|\bvous\b)/i);
});

test('advanced teacher console routes operational copy through the native dictionary', () => {
  assert.match(teacherClient, /teacherUi\(locale\)/);
  assert.match(teacherClient, /deepAxis\(locale/);
  assert.match(teacherClient, /deepFamily\(locale/);
  assert.match(teacherClient, /deepConstruct\(locale/);
  assert.match(teacherClient, /germanBeliefStatement/);
  assert.match(teacherClient, /romanceBeliefStatement/);
  assert.match(teacherClient, /germanLiteracyPrompt/);
  assert.doesNotMatch(teacherClient, />Choose what to teach</);
  assert.doesNotMatch(teacherClient, />Start classroom</);
  assert.doesNotMatch(teacherClient, />Classroom onboarding</);
  assert.doesNotMatch(teacherClient, />Question launcher</);
  assert.doesNotMatch(teacherClient, />Print \/ Save PDF</);
});

test('teacher native copy uses informal address and clearly marks unreviewed lesson or literacy content', () => {
  assert.match(teacherUi, /Was willst du unterrichten\?/);
  assert.match(teacherUi, /¿Qué quieres trabajar en clase\?/);
  assert.match(teacherUi, /Que veux-tu travailler en classe \?/);
  assert.match(teacherUi, /contenu pédagogique relu en anglais/);
  assert.match(teacherUi, /contenido pedagógico revisado en inglés/);
  assert.match(teacherUi, /Unterrichtseinheiten selbst liegen derzeit nur in der geprüften englischen Fassung vor/);
  assert.doesNotMatch(teacherUi, /\busted(?:es)?\b/i);
  assert.doesNotMatch(teacherUi, /\b(?:vous|votre|vos)\b/i);
  assert.doesNotMatch(teacherUi, /(?:Geben Sie|Wählen Sie|Starten Sie|Ihre Klasse|Ihr Unterricht)/);
});
