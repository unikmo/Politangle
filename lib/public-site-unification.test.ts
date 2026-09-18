import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const home = readFileSync(join(root, 'app/page.tsx'), 'utf8');
const layout = readFileSync(join(root, 'app/layout.tsx'), 'utf8');
const chrome = readFileSync(join(root, 'app/SiteChrome.tsx'), 'utf8');
const infoShell = readFileSync(join(root, 'app/InfoShell.tsx'), 'utf8');
const infoPages = readFileSync(join(root, 'app/LocalizedInfoPage.tsx'), 'utf8');
const school = readFileSync(join(root, 'app/school/page.tsx'), 'utf8');
const quizzes = readFileSync(join(root, 'app/quizzes/page.tsx'), 'utf8');
const account = readFileSync(join(root, 'app/account/AccountClient.tsx'), 'utf8');
const quick = readFileSync(join(root, 'app/quiz/QuizClient.tsx'), 'utf8');
const quickAccess = readFileSync(join(root, 'app/api/assessment/quick/access/route.ts'), 'utf8');
const quickComplete = readFileSync(join(root, 'app/api/assessment/quick/complete/route.ts'), 'utf8');
const countriesHub = readFileSync(join(root, 'app/countries/page.tsx'), 'utf8');
const countryPage = readFileSync(join(root, 'app/countries/[slug]/page.tsx'), 'utf8');
const countriesData = readFileSync(join(root, 'lib/countries.ts'), 'utf8');
const methodExplainer = readFileSync(join(root, 'app/MethodExplainer.tsx'), 'utf8');
const infoCss = readFileSync(join(root, 'app/info.css'), 'utf8');
const homeCss = readFileSync(join(root, 'app/home.css'), 'utf8');
const schoolCss = readFileSync(join(root, 'app/school.css'), 'utf8');

test('public pages use one homepage-style navigation and footer system', () => {
  assert.match(home, /<SiteHeader \/>/);
  assert.doesNotMatch(home, /<footer className="p-footer/);
  assert.match(layout, /<SiteFooter \/>/);
  assert.match(infoShell, /<SiteHeader \/>/);
  assert.match(school, /<SiteHeader \/>/);
  for (const route of ['/learn', '/quizzes', '/countries', '/school', '/about', '/privacy', '/imprint', '/terms', '/contact', '/account']) {
    assert.match(chrome, new RegExp(route.replace('/', '\\/')));
  }
});

test('Learn stays visible and quizzes directory contains only runnable quiz choices', () => {
  assert.match(chrome, /href=\{href\('\/learn'\)\}/);
  assert.match(chrome, /href=\{href\('\/quizzes'\)\}/);
  assert.match(quizzes, /Politangle Quick/);
  assert.match(quizzes, /section=classify/);
  assert.match(quizzes, /section=understand/);
  assert.match(quizzes, /populism-quiz/);
  assert.doesNotMatch(quizzes, /question-banks|validation|certificate.*price/i);
});

test('School public landing uses the homepage visual system rather than the engine-card shell', () => {
  assert.match(school, /className="home school-public-page"/);
  assert.match(school, /className="school-public-hero"/);
  assert.doesNotMatch(school, /<main className="engine-page school-page">/);
});

test('free registration is separate from paid certification and from the 16+ certification gate', () => {
  assert.match(account, /Registration is free|registration is free|No payment is required to register/i);
  assert.match(account, /certificate is a separate paid product/i);
  assert.match(account, /free account itself has no 16\+ restriction/i);
  assert.match(account, /at least 16 years old for certification/i);
  assert.doesNotMatch(account, /at least 18 years old for certification/i);
});

test('a completed first Quick requires sign-in before a new run when registration is configured', () => {
  assert.match(quickAccess, /repeatRegistrationRequired/);
  assert.match(quickAccess, /completedBefore && !user && available/);
  assert.match(quickComplete, /politangle_quick_completed/);
  assert.match(quick, /\/api\/assessment\/quick\/access/);
  assert.match(quick, /reason=repeat/);
  assert.match(quick, /\/api\/assessment\/quick\/complete/);
});

test('legal pages are substantive but remain blocked on verified operator details', () => {
  for (const page of ['en.privacy', 'en.terms', 'en.imprint', 'en.contact', 'de.privacy', 'de.terms', 'de.imprint', 'de.contact']) {
    assert.match(infoPages, new RegExp(page.replace('.', '\\.')));
  }
  assert.match(infoPages, /REQUIRES QUALIFIED LEGAL REVIEW/);
  assert.match(infoPages, /TSquare Ventures LLC/);
  assert.match(infoPages, /30 N Gould St Ste R, Sheridan, WY 82801, USA/);
  assert.match(infoPages, /REQUIRES VERIFIED CONTACT/);
  assert.match(infoPages, /Netlify/);
  assert.match(infoPages, /Google Firebase/);
  assert.match(infoPages, /Stripe/);
  assert.doesNotMatch(infoPages, /odr-platform|ec\.europa\.eu\/consumers\/odr/i);
});


test('country perspectives are visible from the public site without pretending unfinished current data is complete', () => {
  assert.match(chrome, /countries: 'Countries'/);
  assert.match(home, /COUNTRY PERSPECTIVES/);
  assert.match(home, /href="\/countries"/);
  assert.match(countriesHub, /countryProfiles\.length/);
  assert.match(countriesHub, /CURRENT SNAPSHOT/);
  assert.match(countriesHub, /FOUNDATIONAL PROFILE/);
  assert.match(countryPage, /Why this page exists/);
  assert.match(countryPage, /What familiar labels mean here/);
  assert.match(countryPage, /This page does not change your Politangle score/);
  assert.match(countryPage, /Sources and update status/);
  assert.doesNotMatch(countryPage, /<h2>How power works<\/h2>/);
  assert.doesNotMatch(countryPage, /<h2>Latest national election<\/h2>/);
  assert.doesNotMatch(countryPage, /<h2>Democracy and rights measure<\/h2>/);
  assert.equal((countriesData.match(/slug: '/g) ?? []).length, 20);
});


test('Method explains why all eight axes exist in plain language', () => {
  assert.match(infoPages, /Eight questions politics often mixes together/);
  for (const axis of ['Economic role', 'Ownership', 'Social values', 'Authority', 'Pluralism', 'World', 'Nationhood', 'Ecology']) {
    assert.match(methodExplainer, new RegExp(axis));
  }
  assert.match(methodExplainer, /Why eight axes\?/);
  assert.match(methodExplainer, /Eight is Politangle’s model/);
  assert.match(methodExplainer, /Why keep it separate\?/);
  assert.match(methodExplainer, /How an answer becomes a result/);
});

test('secondary public page heroes use the Politangle orange system', () => {
  for (const css of [infoCss, homeCss, schoolCss]) {
    assert.match(css, /#f45a1f/);
    assert.match(css, /#c94412/);
  }
});
