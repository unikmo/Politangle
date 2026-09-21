import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const infoCss = readFileSync(join(root, 'app/info.css'), 'utf8');
const homeCss = readFileSync(join(root, 'app/home.css'), 'utf8');
const accessibilityCss = readFileSync(join(root, 'app/accessibility.css'), 'utf8');
const layout = readFileSync(join(root, 'app/layout.tsx'), 'utf8');
const localizedCountry = readFileSync(join(root, 'app/[locale]/countries/[slug]/page.tsx'), 'utf8');
const quickComplete = readFileSync(join(root, 'app/api/assessment/quick/complete/route.ts'), 'utf8');
const authSession = readFileSync(join(root, 'app/api/auth/session/route.ts'), 'utf8');
const smoke = readFileSync(join(root, 'scripts/release-smoke.mjs'), 'utf8');

test('responsive layouts include tablet and mobile breakpoints for public and country surfaces', () => {
  assert.match(homeCss, /@media\(max-width:900px\)/);
  assert.match(homeCss, /@media\(max-width:600px\)/);
  assert.match(infoCss, /@media\(max-width:900px\)/);
  assert.match(infoCss, /@media\(max-width:650px\)/);
  assert.match(infoCss, /country-card-grid[^}]*grid-template-columns:1fr/);
});

test('keyboard and reduced-motion accessibility protections are present', () => {
  assert.match(layout, /skip-link/);
  assert.match(accessibilityCss, /:focus-visible/);
  assert.match(accessibilityCss, /prefers-reduced-motion/);
  assert.match(accessibilityCss, /touch-action:manipulation/);
});

test('localized country pages publish canonical and hreflang alternates', () => {
  assert.match(localizedCountry, /canonical:/);
  for (const locale of ['en-US','de','es','fr','pt-BR','x-default']) assert.match(localizedCountry, new RegExp(locale.replace('-', '\\-')));
});

test('cross-site state-changing requests are rejected', () => {
  assert.match(quickComplete, /Cross-site request is not allowed/);
  assert.match(authSession, /Cross-site session creation is not allowed/);
  assert.match(quickComplete, /origin !== new URL\(request\.url\)\.origin/);
  assert.match(authSession, /origin !== new URL\(request\.url\)\.origin/);
});

test('built-app QA checks all country routes, admin protection and certification gates', () => {
  assert.match(smoke, /countrySlugs/);
  assert.match(smoke, /'georgia'/);
  assert.match(smoke, /\/pt-br\/political-spectrum/);
  assert.match(smoke, /locales = \['de','es','fr','pt-br'\]/);
  assert.match(smoke, /api\/admin\/overview/);
  assert.match(smoke, /certification must remain closed/);
  assert.match(smoke, /cross-site POST expected 403/);
});
