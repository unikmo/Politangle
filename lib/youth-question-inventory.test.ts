import assert from 'node:assert/strict';
import {test} from 'node:test';
import {youthQuickEnglish} from './youth-quick-en';
import {youthDeepEnglish} from './youth-deep-en';
test('Youth BELIEVE bank has 26 Quick and 16 Deep unique items',()=>{assert.equal(youthQuickEnglish.length,26);assert.equal(youthDeepEnglish.length,16);assert.equal(new Set([...youthQuickEnglish,...youthDeepEnglish].map(q=>q.id)).size,42);for(const q of [...youthQuickEnglish,...youthDeepEnglish]){assert.ok(q.A.trim());assert.ok(q.B.trim())}});
