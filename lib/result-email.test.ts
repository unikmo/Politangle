import assert from 'node:assert/strict';
import test from 'node:test';
import { buildResultEmailHtml, buildResultEmailText, parseResultEmailPayload } from './result-email';

function rawPayload() {
  return {
    email: 'Person@Example.com',
    stage: 'full',
    locale: 'en',
    headline: 'A pluralist social democrat',
    axes: Array.from({ length: 8 }, (_, index) => ({ name: `Axis ${index + 1}`, score: 50 + index })),
    families: [{ name: 'Social democracy', overall: 82 }, { name: 'Liberalism', overall: 70 }],
    lens: { politicalContext: 'Germany', grewUp: 'Cameroon', influence: 'France' },
    marketingConsent: false,
  };
}

test('result email payload is normalized and requires exactly eight safe axes', () => {
  const parsed = parseResultEmailPayload(rawPayload());
  assert.ok(parsed);
  assert.equal(parsed.email, 'person@example.com');
  assert.equal(parsed.axes.length, 8);
  assert.equal(parsed.lens.politicalContext, 'Germany');

  const tooShort = rawPayload();
  tooShort.axes = tooShort.axes.slice(0, 7);
  assert.equal(parseResultEmailPayload(tooShort), null);
});

test('result email rendering keeps Country Lens contextual and escapes supplied text', () => {
  const raw = rawPayload();
  raw.headline = '<script>alert(1)</script>';
  const parsed = parseResultEmailPayload(raw)!;
  const html = buildResultEmailHtml(parsed);
  const text = buildResultEmailText(parsed);
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(text, /Country Lens/);
  assert.match(text, /never changes your scores/);
});
