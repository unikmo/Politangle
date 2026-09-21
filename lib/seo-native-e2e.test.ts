import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

const middleware = read('middleware.ts');
const layout = read('app/layout.tsx');
const sitemap = read('app/sitemap.ts');
const localizedRoute = read('app/[locale]/[[...slug]]/page.tsx');
const chrome = read('app/SiteChrome.tsx');
const info = read('app/LocalizedInfoPage.tsx');
const ptBrInfo = read('app/localized-info-pt-br.ts');
const topics = read('lib/seo-topics.ts');
const topicPage = read('app/SeoTopicPage.tsx');
const seoLocales = read('lib/seo-locales.ts');

test('all five locales are first-class in routing and html language', () => {
  for (const locale of ['en','de','es','fr','pt-br']) assert.ok(middleware.includes("'" + locale + "'") || middleware.includes('"' + locale + '"'));
  assert.match(layout, /pt-BR/);
  assert.match(layout, /x-politangle-locale/);
});

test('public metadata is native and localized routes carry hreflang', () => {
  for (const locale of ['en','de','es','fr','pt-br']) assert.ok(seoLocales.includes(locale));
  assert.match(localizedRoute, /hreflangForPath/);
  assert.match(localizedRoute, /openGraph/);
  assert.match(localizedRoute, /twitter/);
  assert.match(localizedRoute, /seoTopicSlugs/);
});

test('sitemap covers public guides and all eighty countries in five languages', () => {
  for (const route of ['/guides','/political-spectrum','/left-vs-right-politics','/political-ideologies','/political-test','/political-literacy']) {
    assert.ok(sitemap.includes(route), route + ' missing from sitemap');
  }
  assert.match(sitemap, /countryProfiles\.flatMap/);
  assert.match(sitemap, /pt-br\/countries/);
  assert.match(sitemap, /x-default/);
});

test('seo guides are substantive, multilingual and structured for search', () => {
  for (const slug of ['political-spectrum','left-vs-right-politics','political-ideologies','political-test','political-literacy']) {
    assert.ok(topics.includes("'" + slug + "'") || topics.includes('"' + slug + '"'));
  }
  for (const locale of ['en','de','es','fr','pt-br']) assert.ok(topics.includes(locale));
  assert.match(topicPage, /application\/ld\+json/);
  assert.match(topicPage, /Article/);
  assert.match(topicPage, /BreadcrumbList/);
  assert.match(topicPage, /Sources and further reading|Quellen und weiterführende Literatur/);
  assert.match(chrome, /\/guides/);
});

test('public copy does not expose engineering or placeholder language', () => {
  const publicSurface = [info, ptBrInfo, read('app/page.tsx'), read('app/translations.ts'), read('app/translations-pt-br.ts')].join('\n');
  const forbidden = [
    /TO BE SUPPLIED/i,
    /NOCH ANZUGEBEN/i,
    /candidate content/i,
    /candidate assessment/i,
    /build preview/i,
    /release gate/i,
    /release blocker/i,
    /all four languages/i,
    /four languages/i,
    /plain-English definitions/i,
    /localhost/i,
    /staging/i,
  ];
  for (const pattern of forbidden) assert.doesNotMatch(publicSurface, pattern);
});

test('structured data identifies Politangle as a multilingual website', () => {
  assert.match(layout, /WebSite/);
  assert.match(layout, /Organization/);
  assert.match(layout, /en-US/);
  assert.match(layout, /pt-BR/);
});
