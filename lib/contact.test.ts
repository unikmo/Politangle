import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactHandler, parseContact, CONTACT_BODY_LIMIT } from './contact';

const enquiry={name:'Alex Example',email:'alex@example.org',subject:'General',message:'The explanation could be clearer.',locale:'en','privacy-acknowledged':'yes','bot-field':''};
const request=(body:unknown=enquiry,origin='https://politangle.org')=>new Request('https://politangle.org/api/contact',{
  method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body),
});

test('validates every supported locale and refuses header injection and invalid input',()=>{
  for (const locale of ['en','de','es','fr','pt-br']) assert.ok(parseContact({...enquiry,locale}));
  for (const bad of [null,[],{...enquiry,email:'victim@example.org\r\nBcc: other@example.org'},
    {...enquiry,name:'Name\nBcc: victim@example.org'}, {...enquiry,subject:'Injected topic'},
    {...enquiry,message:'short'}, {...enquiry,message:'x'.repeat(5001)}, {...enquiry,locale:'unknown'},
    {...enquiry,'privacy-acknowledged':false}, {...enquiry,email:42}]) assert.equal(parseContact(bad),null);
});

test('only acknowledges a valid enquiry after delivery accepts it',async()=>{
  const order:string[]=[];
  const handler=createContactHandler({configured:()=>true,allow:async()=>{order.push('limit');return true;},deliver:async value=>{assert.equal(value.email,enquiry.email);order.push('delivered');}});
  const response=await handler(request());
  assert.equal(response.status,200); assert.deepEqual(await response.json(),{accepted:true});
  assert.deepEqual(order,['limit','delivered']); assert.equal(response.headers.get('cache-control'),'no-store');
});

test('rejects cross-site/missing origins and unsupported content before delivery',async()=>{
  const handler=createContactHandler({configured:()=>true,allow:async()=>{throw new Error('Should not run');},deliver:async()=>{assert.fail();}});
  assert.equal((await handler(request(enquiry,'https://elsewhere.org'))).status,403);
  const noOrigin=request(); noOrigin.headers.delete('origin'); assert.equal((await handler(noOrigin)).status,403);
  const wrongType=request(); wrongType.headers.set('content-type','text/plain'); assert.equal((await handler(wrongType)).status,415);
  assert.equal((await handler(request({...enquiry,message:''}))).status,400);
});

test('checks actual body size even without a content-length header',async()=>{
  const handler=createContactHandler({configured:()=>true,allow:async()=>true,deliver:async()=>{assert.fail();}});
  assert.equal((await handler(request({...enquiry,message:'x'.repeat(CONTACT_BODY_LIMIT)}))).status,413);
  const invalid=request(); const badJson=new Request(invalid.url,{method:'POST',headers:invalid.headers,body:'{bad'});
  assert.equal((await handler(badJson)).status,400);
});

test('honeypot does not trigger mail or consume the budget',async()=>{
  const handler=createContactHandler({configured:()=>{assert.fail();},allow:async()=>{assert.fail();},deliver:async()=>{assert.fail();}});
  assert.equal((await handler(request({...enquiry,'bot-field':'spam'}))).status,200);
});

test('fails closed when unconfigured or rate limited, with no delivery',async()=>{
  const base={allow:async()=>true,deliver:async()=>{assert.fail();}};
  assert.equal((await createContactHandler({...base,configured:()=>false})(request())).status,503);
  const response=await createContactHandler({...base,configured:()=>true,allow:async()=>false})(request());
  assert.equal(response.status,429); assert.equal(response.headers.get('retry-after'),'3600');
});

test('delivery and limiter failures never report success or leak provider details',async()=>{
  const errors:string[]=[]; const original=console.error; console.error=(value:string)=>{errors.push(value);};
  try {
    for (const failAt of ['allow','deliver']) {
      const handler=createContactHandler({configured:()=>true,
        allow:async()=>{if(failAt==='allow')throw new Error('private@example.org credential');return true;},
        deliver:async()=>{throw new Error('private@example.org credential');}});
      const response=await handler(request()); const body=await response.text();
      assert.equal(response.status,503); assert.ok(!body.includes('private@example.org')); assert.ok(!body.includes('accepted'));
    }
    assert.deepEqual(errors,['Contact enquiry delivery unavailable','Contact enquiry delivery unavailable']);
  } finally { console.error=original; }
});
