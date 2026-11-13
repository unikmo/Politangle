import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JUNIOR_AXES, JUNIOR_QUICK_IDS, JUNIOR_DEEP_IDS, scoreJuniorBelieve } from './junior-believe-scoring';

test('Junior inventory is 16 Quick plus 8 Deep, nine reported dimensions',()=>{
  assert.equal(JUNIOR_QUICK_IDS.length,16);
  assert.equal(JUNIOR_DEEP_IDS.length,8);
  assert.equal(JUNIOR_AXES.length,9);
  assert.equal(new Set([...JUNIOR_QUICK_IDS,...JUNIOR_DEEP_IDS]).size,24);
});
test('all A/B responses score -100/+100 on every axis',()=>{
  for(const answer of ['A','B'] as const){
    const answers=Object.fromEntries([...JUNIOR_QUICK_IDS,...JUNIOR_DEEP_IDS].map(id=>[id,answer]));
    for(const mode of ['quick','deep'] as const){
      const result=scoreJuniorBelieve(answers,mode);
      assert.equal(result.total,mode==='quick'?16:24);
      assert.equal(result.complete,true);
      assert.equal(result.coverage,1);
      for(const axis of result.axes){
        assert.equal(axis.score,answer==='A'?-100:100);
        assert.equal(axis.total,axis.axis==='trade'?1:axis.axis==='world-sovereignty'?(mode==='quick'?1:2):(mode==='quick'?2:3));
      }
    }
  }
});
test('neutral contributes zero; unsure and missing answers do not become zero',()=>{
  const result=scoreJuniorBelieve({B1:'A',B2:'neutral',B3:'unsure'});
  assert.equal(result.axes[0].score,-50);
  assert.equal(result.axes[1].score,null);
  assert.equal(result.answered,2);
  assert.equal(result.complete,false);
  assert.equal(result.coverage,2/16);
});
test('Deep answers do not change Quick result',()=>{
  const quick=Object.fromEntries(JUNIOR_QUICK_IDS.map(id=>[id,'A']));
  const withDeep={...quick,...Object.fromEntries(JUNIOR_DEEP_IDS.map(id=>[id,'B']))};
  assert.deepEqual(scoreJuniorBelieve(quick),scoreJuniorBelieve(withDeep,'quick'));
  const deep=scoreJuniorBelieve(withDeep,'deep');
  assert.equal(deep.axes[0].score,-100/3);
  assert.equal(deep.total,24);
});
