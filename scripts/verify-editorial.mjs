import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = (file) => readFileSync(file, 'utf8');
const required = {
  'app/page.tsx': [
    'Are you really left, right, centre, or more nuanced? Find out in 3 minutes.',
    'What might your answers reveal?', '26', '8',
    'What if your views make more sense as a shape than a side?',
    "Same political label. Different country. Same meaning?",
    'Controlled pilot only. Real-student use is not authorized',
    "href('/faq')"
  ],
  'app/quizzes/page.tsx': [
    'Which question would you like to explore?',
    'Welche Frage möchtest du genauer erkunden?',
    '¿Qué pregunta te gustaría explorar?',
    'Quelle question aimerais-tu explorer ?',
    'Qual ideia você quer explorar?'
  ],
  'app/SeoTopicPage.tsx': [
    'seoHooks[locale][slug]', "href('/faq')",
    'One line can be a useful start.',
    'Uma linha ajuda a começar.'
  ],
  'app/countries/CountryGuide.tsx': [
    'What do familiar political labels mean',
    'Was bedeuten bekannte politische Begriffe',
    '¿Qué significan las etiquetas políticas',
    'Que signifient les étiquettes',
    'O que os rótulos políticos',
    'does not change your eight-dimension profile',
    '/faq'
  ],
  'app/school/page.tsx': [
    'Different views in one room. No one put on the spot.',
    'Viele Ansichten. Ein Klassengespräch.',
    'Ideas distintas en clase.',
    'Des idées différentes en classe.',
    'Ideias diferentes em sala.',
    'CONTROLLED PILOT — NOT AUTHORIZED FOR REAL STUDENT USE.'
  ],
  'app/results/ResultsClient.tsx': [
    'Closest resemblance', 'Which answers shaped this pattern?',
    'not identities or voting advice',
    "localePath(locale, '/faq')",
    'calculatePolygonV2Canonical'
  ],
  'app/faq/page.tsx': [
    'en: {', 'de: {', 'es: {', 'fr: {', "'pt-br': {",
    'Independent psychometric validity',
    'Not with real students yet',
    'no party recommendation',
    'does not tell you what to believe or how to vote'
  ],
  'app/[locale]/[[...slug]]/page.tsx': [
    "'faq'", "case 'faq':", 'faqSeo'
  ],
  'app/translations.ts': ['editorialTranslations'],
  'app/editorial-translations.ts': [
    'es', 'fr', 'pt-br',
    'What might your answers reveal?'
  ],
  'middleware.ts': ["'/faq'"],
  'app/sitemap.ts': ["'/faq'"],
  'app/SiteChrome.tsx': ["href('/faq')", 'faq:'],
  'scripts/release-smoke.mjs': ["Which question would you like to explore?"],
};
for (const [path, terms] of Object.entries(required)) {
  const content = read(path);
  for (const term of terms) assert.ok(content.includes(term), `${path}: missing ${JSON.stringify(term)}`);
}
assert.ok(!read('app/SeoTopicPage.tsx').includes('party recommendation'), 'SEO pages must remain neutral');
assert.ok(read('app/quiz/QuizClient.tsx').includes('answerBeliefV2('), 'Assessment engine must remain in use');
console.log(`Politangle editorial safeguards PASS: ${Object.keys(required).length} source surfaces and neutrality/privacy guards`);
