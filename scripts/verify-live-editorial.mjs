#!/usr/bin/env node
/* Read-only production editorial acceptance. No login, quiz answers or purchases. */
import assert from 'node:assert/strict';
const base = (process.env.POLITANGLE_URL || 'https://politangle.org').replace(/\/$/, '');
const cases = [
  ['/en', 'Are you really left, right, centre'],
  ['/de', 'Was, wenn deine politischen Ansichten mehr sind als links oder rechts'],
  ['/es', '¿Y si tus ideas políticas dibujaran algo más complejo'],
  ['/fr', 'Et si tes opinions dessinaient autre chose'],
  ['/pt-br', 'E se suas opiniões formassem algo mais complexo'],
  ['/en/faq', 'Curious? Here are the details.'],
  ['/de/faq', 'Neugierig? Hier stehen die Antworten.'],
  ['/es/faq', '¿Te da curiosidad? Aquí están las respuestas.'],
  ['/fr/faq', 'Envie de comprendre ? Voici les réponses.'],
  ['/pt-br/faq', 'Ficou curioso? Aqui estão as respostas.'],
  ['/en/quizzes', 'Which question would you like to explore?'],
  ['/de/quizzes', 'Welche Frage möchtest du genauer erkunden?'],
  ['/es/quizzes', '¿Qué pregunta te gustaría explorar?'],
  ['/fr/quizzes', 'Quelle question aimerais-tu explorer ?'],
  ['/pt-br/quizzes', 'Qual ideia você quer explorar?'],
  ['/countries', 'Same label. Different country. Same meaning?'],
  ['/de/countries', 'Dasselbe politische Etikett. Auch dieselbe Bedeutung?'],
  ['/es/countries', 'La misma etiqueta política. ¿El mismo significado?'],
  ['/fr/countries', 'Même étiquette politique. Même sens ?'],
  ['/pt-br/countries', 'O mesmo rótulo político. O mesmo significado?'],
  ['/countries/germany', 'What do familiar political labels mean'],
  ['/de/countries/germany', 'Was bedeuten bekannte politische Begriffe'],
  ['/es/countries/germany', '¿Qué significan las etiquetas políticas conocidas'],
  ['/fr/countries/germany', 'Que signifient les étiquettes politiques'],
  ['/pt-br/countries/germany', 'O que os rótulos políticos conhecidos significam'],
  ['/en/political-spectrum', 'One line can be a useful start.'],
  ['/de/political-spectrum', 'Eine Linie hilft beim Einstieg.'],
  ['/es/political-spectrum', 'Una línea ayuda a orientarse.'],
  ['/fr/political-spectrum', 'Une ligne donne un repère.'],
  ['/pt-br/political-spectrum', 'Uma linha ajuda a começar.'],
];
let passed=0;let failed=0;
for(const [path, expected] of cases){
  try{
    const resp=await fetch(base+path, {redirect:'follow',signal:AbortSignal.timeout(30000),headers:{'User-Agent':'Politangle-QA/1.0'}});
    const text=await resp.text();
    assert.equal(resp.status,200, `HTTP ${resp.status}`);
    assert.ok(text.includes(expected), `Missing expected editorial copy: ${expected}`);
    assert.ok(text.includes('<main'), 'Missing main landmark');
    if(path.endsWith('/faq')){
      assert.ok((text.match(/<details/g)||[]).length>=12,'FAQ questions not rendered');
      assert.ok(/privacy|Datenschutz|Privacidad|Confidentialité|Privacidade/i.test(text),'FAQ privacy disclosure absent');
    }
    if(path.endsWith('/quizzes')) assert.ok(/\/quiz/.test(text),'Quiz route not linked');
    console.log(JSON.stringify({result:'PASS',path,status:resp.status}));
    passed++;
  }catch(err){console.error(JSON.stringify({result:'FAIL',path,error:String(err)}));failed++;}
}
console.log('POLITANGLE_LIVE_REPORT='+JSON.stringify({passed,failed,checked:cases.length}));
if(failed)process.exitCode=1;
