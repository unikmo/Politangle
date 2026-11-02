import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('contact delivery loads without Firebase Auth or its JWT dependency chain',()=>{
  const script=`
    const Module=require('node:module');
    const original=Module._load;
    Module._load=function(id,...args){
      if(id==='firebase-admin/auth'||id==='jwks-rsa'||id==='jose')throw new Error('Unexpected authentication dependency: '+id);
      return original.call(this,id,...args);
    };
    const delivery=require('./lib/contact-delivery.ts');
    if(typeof delivery.deliverContact!=='function')throw new Error('Delivery module missing');
    console.log('Contact runtime imports OK');
  `;
  const result=spawnSync(process.execPath,['--import','tsx','--eval',script],{cwd:process.cwd(),encoding:'utf8',timeout:30000});
  assert.equal(result.status,0,result.stderr);
  assert.match(result.stdout,/Contact runtime imports OK/);
});
