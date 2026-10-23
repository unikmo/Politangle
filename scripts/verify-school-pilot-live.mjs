import assert from 'node:assert/strict';
const base=(process.env.LIVE_BASE_URL||'https://politangle.org').replace(/\/$/,'');
const expected=process.env.EXPECTED_COMMIT_SHA||'';
const attempts=Number(process.env.LIVE_VERIFY_ATTEMPTS||36);
const pause=Number(process.env.LIVE_VERIFY_INTERVAL_MS||15000);
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function request(path,options={}){
 const url=base+path+(path.includes('?')?'&':'?')+'_qa='+Date.now();
 const res=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(18000),headers:{'Cache-Control':'no-cache',...(options.headers||{})},...options});
 return {status:res.status,text:await res.text(),url:res.url};
}
let identity=null;
for(let i=0;i<attempts;i++){
 try{
  const res=await request('/api/release-status');
  const data=res.status===200?JSON.parse(res.text):{};
  if(data.product==='politangle' && data.schoolPilot?.requestOnly===true &&
   data.schoolPilot?.studentAccessEnabled===false &&
   (!expected || data.commit===expected)){identity=data;break;}
  console.log('School pilot release not yet serving',i+1,res.status,data.commit||'unknown');
 }catch(error){console.log('School pilot poll',i+1,String(error).slice(0,180));}
 if(i<attempts-1)await sleep(pause);
}
assert(identity,'Production is not serving the approved request-only school pilot version; do not claim success.');
console.log('PASS school pilot live identity',JSON.stringify(identity));
for(const [path,phrase] of [
 ['/school','Request a school pilot'],['/school/pilot','Request a school pilot'],
 ['/de/school/pilot','Schulpilot anfragen'],['/es/school/pilot','Solicitar un piloto escolar'],
 ['/fr/school/pilot','Demander un pilote scolaire'],['/pt-br/school/pilot','Solicitar piloto escolar'],
 ['/school/private','invitation-only'],['/school/student','invitation-only']
]){
 const res=await request(path);
 assert.equal(res.status,200,path+' should render');
 assert(res.text.toLowerCase().includes(phrase.toLowerCase()),path+' missing '+phrase);
 console.log('PASS public page',path);
}
const invalid=await request('/api/school/pilot-request',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});
assert.equal(invalid.status,400,'invalid pilot application must be rejected');
const student=await request('/api/school/classes/QA1234/join',{
 method:'POST',headers:{'content-type':'application/json'},
 body:JSON.stringify({participantToken:'pilot-qa-anon-token-123456'})
});
assert.equal(student.status,403,'real student join must remain disabled');
console.log('PASS API validation and student gate');

const synthetic={
 schoolName:'Politangle Synthetic Release QA School',
 country:'Germany',contactName:'Synthetic QA Contact',
 contactEmail:'release-qa@politangle.invalid',role:'researcher',
 ageBand:'youth-14-18',locale:'en',
 adultConfirmed:true,privacyAcknowledged:true,website:''
};
const stored=await request('/api/school/pilot-request',{
 method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(synthetic)
});
assert([201,202].includes(stored.status),
 'Pilot intake did not store application; HTTP '+stored.status+' '+stored.text.slice(0,140));
assert.equal(JSON.parse(stored.text).received,true);
console.log('PASS synthetic professional pilot application persisted',stored.status);

const duplicate=await request('/api/school/pilot-request',{
 method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(synthetic)
});
assert.equal(duplicate.status,202,'Duplicate application must not create a second request.');
console.log('PASS duplicate application deduplicated');
console.log('SCHOOL PILOT REQUEST-ONLY LIVE RELEASE VERIFIED',base,identity.commit);
