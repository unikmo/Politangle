import assert from 'node:assert/strict';
import { chromium, webkit } from 'playwright';

const base = (process.env.POLITANGLE_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const countries = ['united-states','germany','france','united-kingdom','netherlands','denmark','finland','iceland','norway','sweden','spain','mexico','canada','south-africa','india','nigeria','philippines','brazil','indonesia','japan'];
const locales = ['', '/de', '/es', '/fr', '/pt-br'];
const errors = [];
let checks = 0;
for (const engine of [chromium, webkit]) {
  const browser = await engine.launch({headless:true, args:engine===chromium?['--no-sandbox']:[]});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:900},locale:'en-US'});
    const page = await context.newPage();
    async function visit(route, {main=true}={}) {
      const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000});
      assert(response?.ok(),route+' HTTP '+response?.status());
      if(main) assert(await page.locator('main').count(),route+' missing main');
      const state=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth,title:document.title,lang:document.documentElement.lang,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}));
      assert(state.width<=state.viewport+3,route+' desktop overflow');
      assert(state.title?.trim(),route+' missing title');
      assert(!state.brokenImages.length,route+' broken images: '+state.brokenImages.slice(0,2));
      checks++;
    }
    for(const locale of locales){
      await visit(locale+'/countries');
      for(const slug of countries){
        const route=locale+'/countries/'+slug;
        await visit(route);
        const topicLinks=await page.locator('a.country-topic-link').count();
        const partyLinks=await page.locator('.country-party-links a').count();
        assert(topicLinks>0,route+' missing topics');
        assert(partyLinks>0,route+' missing party links');
        const topicHref=await page.locator('a.country-topic-link').first().getAttribute('href');
        const partyHref=await page.locator('.country-party-links a').first().getAttribute('href');
        assert(topicHref?.startsWith(route+'/'),route+' topic loses locale');
        assert(partyHref?.startsWith(route+'/parties/'),route+' party loses locale');
        await visit(topicHref);
        await visit(partyHref);
      }
    }
    for(const route of ['/','/method','/learn','/school','/quiz','/account','/admin','/admin/review','/admin/school-pilots','/certificate/issue','/certificate/issue/success','/countries/germany']){
      const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:45000});
      assert(response && response.status()<500,route+' server error '+response?.status());
      checks++;
    }
    await visit('/admin');
    await page.waitForTimeout(1000);
    assert(!await page.getByText('protected overview', {exact:false}).count() || await page.getByText('Admin access is required', {exact:false}).count() || await page.getByText('unavailable', {exact:false}).count(), 'admin authorization response unclear');
    await visit('/account');
    assert(await page.locator('main').count(), 'account page missing');
    await visit('/certificate/issue');
    assert(await page.locator('main').count(), 'certificate issue route missing');
    await visit('/quiz');
    const firstRadio=page.getByRole('radio').first();
    assert(await firstRadio.count(),'/quiz missing interactive answers');
    await firstRadio.click();
    await page.waitForTimeout(200);
    assert(/1\s*\/\s*26/.test(await page.locator('.engine-progress-row').innerText()),'Quick answer did not update progress');
    checks++;
    await context.close();
  }catch(e){errors.push(engine.name()+': '+String(e?.stack||e));}
  finally{await browser.close();}
}
console.log(JSON.stringify({checks,engines:['chromium','webkit'],countries:countries.length,locales:locales.length,failures:errors},null,2));
if(errors.length)process.exitCode=1;
