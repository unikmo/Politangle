import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium, webkit } from 'playwright';
const base=(process.env.POLITANGLE_BASE_URL||'http://127.0.0.1:3000').replace(/\/$/,'');
const engine=process.env.MOBILE_BROWSER==='webkit'?'webkit':'chromium';
const out='mobile-qa/screenshots/'+engine;mkdirSync(out,{recursive:true});
const browser=await (engine==='webkit'?webkit:chromium).launch({headless:true,args:engine==='chromium'?['--no-sandbox']:[]});
const failures=[];
async function check(page,route,width){
 const r=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:30000});
 assert(r?.ok(),route+' HTTP '+(r?.status()||'?'));
 await page.locator('main').first().waitFor({state:'visible',timeout:15000});
 const d=await page.evaluate(()=>{
 const box=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return {left:r.left,right:r.right,width:r.width,height:r.height}};
 return {viewport:innerWidth,visual:visualViewport?.width,client:document.documentElement.clientWidth,screen:screen.width,doc:Math.max(document.body.scrollWidth,document.documentElement.scrollWidth),menu:box('.p-mobile-nav-toggle'),lang:box('.p-nav select.lang'),header:box('header.p-nav')};
 });
 if (Math.abs(d.viewport-width)>2) {
  const offenders = await page.evaluate((deviceWidth) => ({
    meta: document.querySelector('meta[name="viewport"]')?.getAttribute('content') || 'MISSING',
    visualWidth: visualViewport?.width, deviceScreenWidth: screen.width, viewportWidth: innerWidth,
    elements: Array.from(document.querySelectorAll('body *')).map(el => {
      const r=el.getBoundingClientRect(),s=getComputedStyle(el);
      return {tag:el.tagName,cl:String(el.className?.baseVal||el.className||'').slice(0,90),
        left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),
        minWidth:s.minWidth,grid:s.gridTemplateColumns?.slice(0,100),whiteSpace:s.whiteSpace};
    }).filter(x=>x.left>=0&&x.right>deviceWidth+20&&x.width>40).slice(0,45)
  }),width);
  console.error('TABLET VIEWPORT DEBUG',JSON.stringify(offenders,null,2));
 }
 assert(Math.abs(d.viewport-width)<=2,route+' viewport scaled unexpectedly: '+d.viewport+' vs '+width);
 assert(d.client<=width+2,route+' client area extends beyond '+width+': '+d.client);
 assert(d.doc<=width+2,route+' horizontal overflow '+d.doc+' > '+width);
 if(d.header){
  assert(d.menu&&d.menu.width>=40&&d.menu.height>=44,route+' menu touch target');
  assert(d.menu.left>=-1&&d.menu.right<=width+1,route+' menu outside viewport');
  assert(d.lang&&d.lang.left>=-1&&d.lang.right<=width+1,route+' language outside viewport');
 }
 console.log('PASS '+width+'px '+route);
}
try{
 for(const width of [320,375,390,430,768,900]){
  const ctx=await browser.newContext({viewport:{width,height:812},isMobile:true,hasTouch:true,deviceScaleFactor:2,locale:'en-US'});
  const page=await ctx.newPage();
  try{
   await check(page,'/',width);
   await page.screenshot({path:out+'/home-'+width+'.png',fullPage:true});
   const toggle=page.locator('button.p-mobile-nav-toggle');await toggle.tap();
   assert.equal(await toggle.getAttribute('aria-expanded'),'true');
   const nav=page.locator('#politangle-primary-nav');assert(await nav.isVisible());
   for(const name of ['Method','Learn','Guides','Quizzes','Countries','For schools','About','Sign in','Start Quick'])
    assert(await nav.getByRole('link',{name:new RegExp(name,'i')}).count(),'missing menu link '+name);
   if(width===390)await page.screenshot({path:out+'/menu-open-390.png'});
   await nav.getByRole('link',{name:'Method',exact:true}).tap();
   await page.waitForURL(/\/method$/,{timeout:20000});
   assert.equal(await toggle.getAttribute('aria-expanded'),'false');
   await page.locator('.p-nav select.lang').selectOption('de');
   await page.waitForURL(/\/de\/method$/,{timeout:20000});
   if(width===390){
    for(const route of ['/de/countries/denmark','/fr/method','/school','/learn','/countries','/account','/quiz']){
     await check(page,route,width);
     if(route==='/quiz'){
      await page.getByRole('radiogroup').waitFor({state:'visible',timeout:20000});
      await page.getByRole('radio').first().tap();
      await page.waitForTimeout(180);
      assert(/\b1\s*\/\s*26\b/.test(await page.locator('.engine-progress-row').innerText()),'Quick answer not recorded');
     }
     if(['/school','/countries','/quiz'].includes(route))await page.screenshot({path:out+'/'+route.slice(1)+'-390.png',fullPage:true});
    }
   }
   console.log('PASS interactive mobile '+width);
  }catch(e){failures.push(width+'px '+String(e?.stack||e));console.error('FAIL '+width,e);}
  finally{await ctx.close()}
 }
}finally{await browser.close()}
if(failures.length){console.error(failures.join('\n\n'));process.exitCode=1}
else console.log('PASS all mobile browser checks');