import assert from 'node:assert/strict';
import test from 'node:test';
import { describePolitangleHome } from './politangle-home';
import type { FamilyCompatibilityV2 } from './belief-v2-engine';
import type { PolygonPointV2 } from './belief-v2';

function family(id: FamilyCompatibilityV2['id'], name: string, overall: number): FamilyCompatibilityV2 {
  return { id, name, overall, think: overall, feel: overall, act: overall, coverage: 100, modeTension: 0 };
}

const axes: PolygonPointV2[] = [
  { id: 'economic-role', name: 'Economic role', low: 'Public provision / redistribution', high: 'Market / private responsibility', constructs: ['public-provision', 'redistribution'], score: 20, coverage: 100 },
  { id: 'ownership', name: 'Ownership', low: 'Social / worker ownership', high: 'Private / shareholder ownership', constructs: ['ownership'], score: 80, coverage: 100 },
  { id: 'social-values', name: 'Social values', low: 'Personal autonomy / change', high: 'Tradition / moral continuity', constructs: ['social-change', 'personal-autonomy', 'abortion'], score: 50, coverage: 100 },
  { id: 'authority', name: 'Authority', low: 'Liberty / safeguards', high: 'Order / preventive authority', constructs: ['authority-order'], score: 75, coverage: 100 },
  { id: 'pluralism', name: 'Pluralism', low: 'Checks / competing institutions', high: 'Majoritarian concentration', constructs: ['pluralism'], score: 50, coverage: 100 },
  { id: 'world', name: 'World', low: 'International cooperation', high: 'National discretion', constructs: ['world-sovereignty'], score: 50, coverage: 100 },
  { id: 'nationhood', name: 'Nationhood', low: 'Civic / inclusive membership', high: 'Inherited / status-based continuity', constructs: ['nationhood-membership'], score: 50, coverage: 100 },
  { id: 'ecology', name: 'Ecology', low: 'Ecological limits / structural change', high: 'Growth / incremental adaptation', constructs: ['ecology-growth'], score: 50, coverage: 100 },
];

test('Politangle home names a primary family and significant secondary leaning', () => {
  const result = describePolitangleHome([
    family('social-democracy', 'Social democracy', 82),
    family('liberalism', 'Liberalism', 68),
    family('green-politics', 'Green politics', 54),
  ], axes, true);
  assert.equal(result.headline, 'You are mainly Social democracy, with significant Liberalism leanings.');
  assert.match(result.summary, /strongest family match/i);
  assert.deepEqual(result.strongestAxes.map((axis) => axis.id), ['economic-role', 'ownership', 'authority']);
});

test('Politangle home acknowledges a genuine two-family tie instead of forcing one label', () => {
  const result = describePolitangleHome([
    family('liberalism', 'Liberalism', 78),
    family('social-democracy', 'Social democracy', 76),
    family('green-politics', 'Green politics', 52),
  ], axes, true);
  assert.equal(result.headline, 'You sit between Liberalism and Social democracy.');
});
