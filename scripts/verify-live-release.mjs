const base = (process.env.POLITANGLE_LIVE_ORIGIN || 'https://politangle.org').replace(/\/$/,'');
const expected = (process.env.EXPECTED_COMMIT || '').trim().toLowerCase();
const tries = Number(process.env.LIVE_VERIFY_ATTEMPTS || 30);
const delay = Number(process.env.LIVE_VERIFY_DELAY_MS || 20000);
if (!/^[a-f0-9]{40}$/.test(expected)) { console.error('EXPECTED_COMMIT must be a full Git commit SHA');process.exit(2); }
if (new URL(base).hostname !== 'politangle.org') { console.error('Refusing unexpected production host');process.exit(2); }
async function check() {
 const response=await fetch(base+'/api/release-status',{cache:'no-store',headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(12000)});
 if (!response.ok) throw Error('release endpoint HTTP '+response.status);
 const data=await response.json();
 if (data.product!=='politangle') throw Error('Wrong application identity');
 if (!/^[a-f0-9]{40}$/i.test(data.commit||'')) throw Error('Missing valid production commit identity');
 return data.commit.toLowerCase();
}
let observed='';
for(let attempt=1;attempt<=tries;attempt++){
 try {
  observed=await check();
  if(observed===expected){
   const page=await fetch(base+'/school',{redirect:'follow',signal:AbortSignal.timeout(12000)});
   if(!page.ok)throw Error('School route HTTP '+page.status);
   const html=await page.text();
   if(!/school|schule|escuela|école/i.test(html)) throw Error('School route unexpectedly empty');
   console.log('LIVE CONFIRMED',JSON.stringify({origin:base,commit:observed,attempt,schoolStatus:page.status,checkedAt:new Date().toISOString()}));
   process.exit(0);
  }
  console.log('Not yet live',JSON.stringify({attempt,expected,observed,checkedAt:new Date().toISOString()}));
 } catch(error){ console.log('Live verification retry '+attempt+': '+(error instanceof Error?error.message:String(error))); }
 if(attempt<tries)await new Promise(resolve=>setTimeout(resolve,delay));
}
console.error('LIVE NOT CONFIRMED',JSON.stringify({expected,observed,attempts:tries,origin:base}));
process.exit(1);
