import assert from 'node:assert/strict';
import {test} from 'node:test';
import {adultQuickEnglish} from './adult-quick-en';
test('Adult Quick bank contains 26 complete unique question pairs',()=>{assert.equal(adultQuickEnglish.length,26);assert.equal(new Set(adultQuickEnglish.map(q=>q.id)).size,26);for(const q of adultQuickEnglish){assert.ok(q.A.trim());assert.ok(q.B.trim())}});
