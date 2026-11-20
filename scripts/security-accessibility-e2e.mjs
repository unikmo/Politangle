import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const base='http://127.0.0.1:3000';
const routes=['/','/quiz','/account','/admin','/certificate/issue','/countries/united-states','/de/countries/germany','/es/countries/spain','/fr/countries/france','/pt-br/countries/brazil'];
const failures=[];
let checks=0;
for(const engine of [chromium,webkit]){
 const browser=await engine.launch({headless:true,args:engine===chromium?['--no-sandbox']:[]});
 const context=await browser.newContext();
 const page=await context.newPage();
 try{
  for(const route of routes){
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
   assert(response?.ok(),route+' returned '+response?.status());
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
   assert.equal(result.violations.length,0,engine.name()+' '+route+' axe violations: '+JSON.stringify(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))));
   checks++;
  }
  for(const endpoint of ['/api/admin/overview']){
   const r=await context.request.get(base+endpoint);
   assert([401,403].includes(r.status()),'anonymous '+endpoint+' returned '+r.status());
   checks++;
  }
  await page.goto(base+'/account');
  assert(await page.locator('input[type="password"]').count(),'account login password input missing');
  checks++;
 }catch(e){failures.push(engine.name()+': '+String(e?.stack||e))}
 finally{await browser.close()}
}
console.log(JSON.stringify({checks,failures},null,2));
if(failures.length)process.exitCode=1;
