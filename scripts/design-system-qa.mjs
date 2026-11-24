import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const origin=(process.env.POLITANGLE_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/,'');
const out='design-qa-evidence';
mkdirSync(out,{recursive:true});
const pages=[
  ['home','/'],
  ['home-de','/de'],
  ['contact-de','/de/contact'],
  ['method','/method'],
  ['learn','/learn'],
  ['quizzes','/quizzes'],
  ['school','/school'],
  ['country','/countries/denmark'],
  ['privacy','/privacy'],
];
const viewports=[['desktop',1440,900],['mobile',390,844],['tablet',768,1024]];
const results=[];
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
 for(const [size,width,height] of viewports){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
  const page=await context.newPage();
  for(const [name,route] of pages){
   const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:45000});
   assert(response?.ok(),`${size} ${route}: HTTP ${response?.status()}`);
   await page.evaluate(()=>document.fonts.ready);
   const data=await page.evaluate(()=>{
    const css=(selector,property)=>{const e=document.querySelector(selector);return e?getComputedStyle(e).getPropertyValue(property).trim():null};
    const headings=[...document.querySelectorAll('.home .p-section h2, .home .p-dark-section h2, .home .p-final h2')].filter(e=>e.getBoundingClientRect().width).map(e=>({text:(e.textContent||'').trim().slice(0,75),px:parseFloat(getComputedStyle(e).fontSize)}));
    const heroShape=document.querySelector('.home .p-hero-stage .p-shape-preview');
    const shapeBox=heroShape?.getBoundingClientRect();
    const shapeCard=document.querySelector('.home .p-hero-shape-hook')?.getBoundingClientRect();
    const labelsOutsideCard=[...document.querySelectorAll('.home .p-hero-stage .p-shape-label')]
      .filter(node=>{
        if(!shapeCard)return true;
        const box=node.getBoundingClientRect();
        return box.width<1||box.height<1||box.left<shapeCard.left+2||box.right>shapeCard.right-2||
          box.top<shapeCard.top+2||box.bottom>shapeCard.bottom-2;
      }).map(node=>node.textContent?.trim());
    const heroText=document.querySelector('.home .p-hero-copy')?.getBoundingClientRect();
    const schoolHeading=document.querySelector('.school-public-hero h1')?.getBoundingClientRect();
    const schoolCopy=document.querySelector('.school-public-hero-grid > div:first-child')?.getBoundingClientRect();
    const contactHeader=document.querySelector('.info-page-contact .info-hero');
    const contactForm=document.querySelector('.info-page-contact .contact-form');
    const intersects=(a,b)=>a&&b&&a.left<b.right-2&&a.right>b.left+2&&a.top<b.bottom-2&&a.bottom>b.top+2;
    const mainNav=[...document.querySelectorAll('.p-nav-main a[href]')].map(a=>new URL(a.href).pathname);
    const footerNav=[...document.querySelectorAll('.p-footer-groups a[href]')].map(a=>new URL(a.href).pathname);
    const navWraps=[...document.querySelectorAll('.p-nav nav.p-nav-main a')].filter(a=>{
      const style=getComputedStyle(a);const line=parseFloat(style.lineHeight)||parseFloat(style.fontSize)*1.3;
      return a.getBoundingClientRect().height>line*1.65;
    }).map(a=>a.textContent?.trim());
    return {
     title:document.title, lang:document.documentElement.lang,
     pageWidth:document.documentElement.scrollWidth, viewportWidth:innerWidth,
     h1:parseFloat(css('h1','font-size')||'0'),
     headings,
     descriptionFont:css('.home .p-section-head > p','font-size'),
     learningGridBorderBottom:css('.home #learn .p-steps','border-bottom-width'),
     learningGridBorderTop:css('.home #learn .p-steps','border-top-width'),
     sectionHeadFont:css('.info-page .info-section h2','font-size'),
     shape:shapeBox?{visible:shapeBox.width>0&&shapeBox.height>0,width:Math.round(shapeBox.width),height:Math.round(shapeBox.height)}:null,
     shapeLabelCount:document.querySelectorAll('.home .p-hero-stage .p-shape-label').length,
     labelsOutsideCard,
     heroOverlap:Boolean(intersects(heroText,shapeBox)),
     schoolTextClipped:Boolean(schoolHeading&&schoolCopy&&(schoolHeading.right>Math.min(schoolCopy.right,innerWidth)+3||schoolHeading.left<0)),
     contactHeroVisible:Boolean(contactHeader&&contactHeader.getBoundingClientRect().height>0),
     contactFormTop:contactForm?Math.round(contactForm.getBoundingClientRect().top):null,
     navDupes:mainNav.filter(v=>footerNav.includes(v) && !v.endsWith('/')),
     navWraps,
     brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src),
    };
   });
   const result={viewport:size,route,...data};
   assert(data.pageWidth<=data.viewportWidth+3,`${size} ${route}: horizontal overflow ${data.pageWidth}/${data.viewportWidth}`);
   assert(!data.brokenImages.length,`${size} ${route}: broken images: ${data.brokenImages.join(',')}`);
   assert(!data.heroOverlap,`${size} ${route}: homepage chart overlaps headline`);
   assert(!data.schoolTextClipped,`${size} ${route}: school heading extends beyond its text column`);
   if(width>900)assert(!data.navWraps.length,`${size} ${route}: desktop nav links wrap: ${data.navWraps.join(', ')}`);
   if(name==='contact-de'){
     assert(!data.contactHeroVisible,`${size} ${route}: redundant contact hero is visible`);
     assert(data.contactFormTop!==null&&data.contactFormTop<height*.4,`${size} ${route}: contact form starts too far down`);
   }
   if(name==='home'||name==='home-de'){
     assert(data.shape?.visible,`${size} ${route}: eight-axis chart missing`);
     assert(data.shapeLabelCount===8,`${size} ${route}: eight-axis labels incomplete (${data.shapeLabelCount})`);
     assert(data.labelsOutsideCard.length===0,`${size} ${route}: axis labels escape the chart card: ${data.labelsOutsideCard.join(', ')}`);
     assert(data.headings.length>=5,`${size} ${route}: insufficient section headings`);
     const sizes=data.headings.map(x=>x.px);
     const range=Math.max(...sizes)-Math.min(...sizes);
     assert(range<=1,`${size} ${route}: inconsistent heading sizes, range ${range}px: ${JSON.stringify(data.headings)}`);
     assert(data.h1>sizes[0],`${size} ${route}: H1 must be visually larger than H2`);
     assert(data.learningGridBorderBottom==='0px',`${size} ${route}: double separator below learning cards`);
     assert(!data.navDupes.length,`${size} ${route}: duplicate header/footer links: ${data.navDupes}`);
   }
   if(['desktop','mobile'].includes(size)){
     const imageFile=`${out}/${size}-${name}.png`;
     await page.screenshot({path:imageFile,fullPage:false,animations:'disabled'});
     result.screenshot=imageFile;
   }
   results.push(result);
   console.log('DESIGN_QA',size,route,'OK',JSON.stringify({h1:data.h1,h2:data.headings.map(x=>x.px),overflow:data.pageWidth-data.viewportWidth}));
  }
  await context.close();
 }
}finally{await browser.close()}
const report={
 generatedAt:new Date().toISOString(),
 scope:'Local build, 9 representative public pages x 3 viewport widths (1440, 768, 390). Existing E2E checks exercise broader routes.',
 routeCount:pages.length,viewportCount:viewports.length,checks:results.length,
 passed:true,results
};
writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));
console.log('DESIGN_QA_REPORT',JSON.stringify({checks:report.checks,passed:report.passed,screenshots:results.filter(x=>x.screenshot).length}));
