import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { countryProfiles } from './countries';
import { nativeCountrySlugs } from './country-localization';

const root = process.cwd();
const reviewApi = readFileSync(join(root, 'app/api/admin/literacy-review/route.ts'), 'utf8');
const reviewUi = readFileSync(join(root, 'app/admin/review/LiteracyReviewClient.tsx'), 'utf8');
const validationWorkflow = readFileSync(join(root, 'docs/literacy-validation-workflow-v1.md'), 'utf8');
const certificationServer = readFileSync(join(root, 'lib/certification-server.ts'), 'utf8');
const bankSchema = readFileSync(join(root, 'lib/literacy-bank-schema.ts'), 'utf8');
const checkout = readFileSync(join(root, 'app/api/certificate/checkout/route.ts'), 'utf8');
const countryLocalization = readFileSync(join(root, 'lib/country-localization.ts'), 'utf8');
const localizedCountryRoute = readFileSync(join(root, 'app/[locale]/countries/[slug]/page.tsx'), 'utf8');
const siteChrome = readFileSync(join(root, 'app/SiteChrome.tsx'), 'utf8');
const countryGuide = readFileSync(join(root, 'app/countries/CountryGuide.tsx'), 'utf8');
const countryPattern = readFileSync(join(root, 'docs/country-perspective-pattern-v2.md'), 'utf8');
const legacyGlobalLabels = readFileSync(join(root, 'lib/country-global-labels-legacy.ts'), 'utf8');
const contactForm = readFileSync(join(root, 'app/ContactForm.tsx'), 'utf8');
const adminOverview = readFileSync(join(root, 'app/admin/AdminClient.tsx'), 'utf8');
const launchReadiness = readFileSync(join(root, 'lib/launch-readiness.ts'), 'utf8');

test('founder review covers the exact current bank without silently validating it', () => {
  assert.match(reviewApi, /literacyMasterBankCandidates/);
  assert.match(reviewApi, /contentFingerprint/);
  assert.match(reviewApi, /approve/);
  assert.match(reviewApi, /revise/);
  assert.match(reviewApi, /replace/);
  assert.match(reviewApi, /hold/);
  assert.match(reviewUi, /does <strong>not<\/strong> mark a question validated/);
  assert.doesNotMatch(reviewApi, /status:\s*['"]validated['"]/);
});

test('deferred pilots do not open paid certification', () => {
  assert.match(validationWorkflow, /Certificate release rule while pilots are deferred/);
  assert.match(validationWorkflow, /Certified attempts remain closed/);
  assert.match(validationWorkflow, /No paid Political Literacy Certificate is issued/);
  assert.match(validationWorkflow, /CERTIFICATION_ENABLED.*remains false/);
  assert.match(certificationServer, /validateCertifiedMasterBank/);
  assert.match(bankSchema, /question\.section === section/);
  assert.match(bankSchema, /question\.status === 'validated'|status === 'validated'/);
});

test('certificate checkout remains independently gated by tax readiness and eligibility', () => {
  assert.match(checkout, /STRIPE_TAX_READY/);
  assert.match(checkout, /eligibility\.status !== 'eligible'/);
  assert.match(checkout, /VERIFICATION_ACKNOWLEDGEMENT_REQUIRED/);
});

test('validation workflow follows the 18+ certification policy', () => {
  assert.match(validationWorkflow, /English-speaking users aged 18\+/);
  assert.doesNotMatch(validationWorkflow, /aged 16\+/);
});

test('localized contact form uses the same-site API with consent and spam controls', () => {
  assert.match(contactForm, /politangle-contact/);
  assert.match(contactForm, /\/api\/contact/);
  assert.match(contactForm, /privacy-acknowledged/);
  assert.doesNotMatch(contactForm, /name=["']bot-field["']/);
  assert.match(contactForm, /response\.status !== 200/);
  assert.match(contactForm, /if \(status === 'sent'\)/);
  assert.match(contactForm, /contact-confirmation/);
  assert.match(contactForm, /rows=\{4\}/);
  assert.doesNotMatch(contactForm, /data-netlify|__forms\.html|CONTACT_TO_EMAIL|CONTACT_GMAIL/);
  assert.equal(existsSync(join(root, 'public/__forms.html')), false);
});

test('admin dashboard reports every non-payment release gate without weakening it', () => {
  for (const gate of ['firebase-server', 'firebase-client', 'admin-access', 'contact-email', 'legal-review', 'accessibility-audit', 'school-release', 'certification-bank', 'certification-switch']) {
    assert.match(launchReadiness, new RegExp(gate));
  }
  assert.match(adminOverview, /NON-PAYMENT LAUNCH READINESS/);
  assert.match(launchReadiness, /certificationReadiness/);
  assert.doesNotMatch(launchReadiness, /STRIPE/);
});


test('all eighty country perspectives have native DE ES FR and pt-BR routes without machine fallback', () => {
  assert.equal(countryProfiles.length, 80);
  assert.equal(nativeCountrySlugs.length, 80);
  assert.deepEqual([...nativeCountrySlugs], countryProfiles.map((country) => country.slug));
  assert.match(countryLocalization, /deExpansion/);
  assert.match(countryLocalization, /esExpansion/);
  assert.match(countryLocalization, /frExpansion/);
  assert.match(countryLocalization, /ptBrWave3/);
  assert.match(countryLocalization, /deWave3/);
  assert.match(countryLocalization, /esWave3/);
  assert.match(countryLocalization, /frWave3/);
  assert.match(countryLocalization, /ptBrWave4/);
  assert.match(countryLocalization, /deWave4/);
  assert.match(countryLocalization, /esWave4/);
  assert.match(countryLocalization, /frWave4/);
  assert.match(countryLocalization, /Vereinigte Staaten/);
  assert.match(countryLocalization, /Estados Unidos/);
  assert.match(countryLocalization, /États-Unis/);
  assert.match(localizedCountryRoute, /localizeCountryProfile/);
  assert.match(localizedCountryRoute, /hreflang|languages:/);
  assert.match(siteChrome, /href\('\/countries'\)/);

});


test('country release pattern is aligned across the full eighty-country registry', () => {
  assert.equal(countryProfiles.length, 80);
  assert.ok(countryProfiles.every((country) => country.atAGlance.length >= 5));
  assert.ok(countryProfiles.every((country) => country.power.length === 3));
  assert.ok(countryProfiles.every((country) => country.vocabulary.length === 2));
  assert.ok(countryProfiles.every((country) => country.timeline.length >= 4));
  assert.ok(countryProfiles.every((country) => country.sources.length >= 2));
  assert.ok(countryProfiles.every((country) => country.globalLabels));
  assert.match(countryPattern, /same [\s\S]*information architecture[\s\S]*without becoming a generic template/i);
  assert.match(countryPattern, /strong[\s\S]*partial[\s\S]*limited/i);
  assert.match(legacyGlobalLabels, /united-states/);
  assert.match(legacyGlobalLabels, /serbia/);
});

test('homepage headline and contact page fit compact editorial treatment', () => {
  const home=readFileSync(join(root,'app/page.tsx'),'utf8');
  const css=readFileSync(join(root,'app/conversion-layout-fix.css'),'utf8');
  const info=readFileSync(join(root,'app/LocalizedInfoPage.tsx'),'utf8');
  assert.match(home, /Politik ist mehr als links, rechts oder die Mitte\./);
  assert.match(home, /heroShapeAxes/);
  assert.match(home, /<div className="p-hero-shape-hook">/);
  assert.match(home, /<ShapePreview axes=\{heroShapeAxes\}/);
  assert.match(info, /intro=\{c\.intro\} contact>/);
  assert.match(css, /\.info-page-contact \.info-hero/);
  assert.match(css, /\.home \.p-hero-grid/);
});

test('footer navigation is for contact, trust and legal information instead of repeating primary routes', () => {
  const chrome=readFileSync(join(root,'app/SiteChrome.tsx'),'utf8');
  const css=readFileSync(join(root,'app/conversion-layout-fix.css'),'utf8');
  const footer=chrome.split('export function SiteFooter()')[1];
  assert.ok(footer);
  for(const route of ['/faq','/contact','/validation','/privacy','/imprint','/terms']) {
    assert.ok(footer.includes(`href('${route}')`),`Missing footer route: ${route}`);
  }
  for(const route of ['/learn','/guides','/quizzes','/countries','/method','/practice']) {
    assert.ok(!footer.includes(`href('${route}')`),`Primary menu route duplicated in footer: ${route}`);
  }
  assert.match(css,/\.p-footer\.site-footer nav\.p-footer-groups/);
  assert.match(css,/\.home \.p-transparency\{padding-top:clamp/);
});

test('public pages use consistent compact section rhythm without compressing assessment flows', () => {
  const styles=readFileSync(join(root,'app/site-spacing-rhythm.css'),'utf8');
  const layout=readFileSync(join(root,'app/layout.tsx'),'utf8');
  const imported=layout.indexOf("import './site-spacing-rhythm.css'");
  assert.ok(imported > layout.indexOf("import './pilot/pilot.css'"));
  for (const selector of ['.home .p-section', '.home .p-how', '.home .p-transparency', '.home .p-schools', '.home .p-languages', '.info-page:not(.info-page-contact) .info-content', '.quizzes-page .quizzes-hero', '.country-topic-detail', '.school-public-hero-grid']) {
    assert.ok(styles.includes(selector), `Public page rhythm missing: ${selector}`);
  }
  assert.match(styles, /--section-air:clamp\(25px,3vw,38px\)/);
  assert.doesNotMatch(styles, /\.engine-page|\.school-projector-page|\.literacy-card/);
});

test('split homepage section intros align supporting prose to heading midpoint on desktop', () => {
  const stylesheet=readFileSync(join(root,'app/site-spacing-rhythm.css'),'utf8');
  const homepage=readFileSync(join(root,'app/page.tsx'),'utf8');
  assert.match(homepage, /<div className="p-section-head"><div>/);
  assert.match(stylesheet, /\.home \.p-section-head:has\(> p\)\s*\{\s*align-items:center/);
  assert.match(stylesheet, /\.home \.p-section-head > p\s*\{\s*align-self:center/);
  assert.match(stylesheet, /@media\(max-width:1000px\)/);
});

test('public visual system has one H2 scale and single grid divider, with browser evidence configured', () => {
  const css=readFileSync(join(root,'app/design-qa-system.css'),'utf8');
  const layout=readFileSync(join(root,'app/layout.tsx'),'utf8');
  const e2e=readFileSync(join(root,'scripts/design-system-qa.mjs'),'utf8');
  const workflow=readFileSync(join(root,'.github/workflows/independent-desktop-e2e.yml'),'utf8');
  assert.match(layout,/import '\.\/design-qa-system\.css'/);
  assert.match(css,/--editorial-heading-2:clamp\(34px,3\.45vw,44px\)/);
  assert.match(css,/\.home \.p-section h2,[\s\S]*\.home \.p-languages h2\s*\{/);
  assert.match(css,/\.home \.p-steps\{border-top:1px solid var\(--editorial-line\);border-bottom:0\}/);
  assert.match(css,/\.home \.p-steps article \+ article/);
  assert.match(css,/@media\(max-width:700px\)/);
  assert.match(e2e,/headings\.length>=5/);
  assert.match(e2e,/double separator below learning cards/);
  assert.match(workflow,/name: Upload visual QA evidence/);
  assert.match(workflow,/node scripts\/design-system-qa\.mjs/);
});

test('minimal contact entry contains no redundant hero or explanatory heading', () => {
  const shell=readFileSync(join(root,'app/InfoShell.tsx'),'utf8');
  const content=readFileSync(join(root,'app/LocalizedInfoPage.tsx'),'utf8');
  const design=readFileSync(join(root,'app/design-qa-system.css'),'utf8');
  assert.match(shell, /!contact && <section className="info-hero"/);
  assert.match(content, /<h1 className="contact-page-sr-title">/);
  assert.match(content, /<ContactForm \/>/);
  assert.doesNotMatch(content, /<InfoSection title=\{locale === 'de' \? 'Nachricht senden'/);
  assert.match(design, /\.info-page-contact \.contact-form\{/);
  assert.match(design, /\.school-public-hero-grid\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
});
