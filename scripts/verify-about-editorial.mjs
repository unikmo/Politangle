import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const info=readFileSync('app/LocalizedInfoPage.tsx','utf8');
const pt=readFileSync('app/localized-info-pt-br.ts','utf8');
const sections=[
  ['en','Why Politangle exists','What might your answers reveal?','Beliefs are not the same as knowledge','Persuasion, priorities and trade-offs','An educational project, open to scrutiny'],
  ['de','Warum es Politangle gibt','Was deine Antworten zeigen können','Überzeugungen sind kein Wissenstest','Überzeugende Worte sind nicht dasselbe wie gute Entscheidungen','Ein Bildungsprojekt, das überprüfbar bleiben muss'],
  ['es','Por qué existe Politangle','Qué pueden mostrar tus respuestas','Las creencias no son un examen de conocimientos','Persuasión, prioridades y consecuencias','Un proyecto educativo abierto a revisión'],
  ['fr','Pourquoi Politangle existe','Ce que tes réponses peuvent révéler','Les convictions ne sont pas des connaissances','Persuasion, priorités et conséquences','Un projet éducatif ouvert à la critique'],
  ['pt-br','Por que o Politangle existe','O que suas respostas podem revelar','Opinião política não é prova de conhecimento','Persuasão, prioridades e consequências','Um projeto educacional aberto a críticas']
];
for(const [locale,...titles] of sections){const source=locale==='pt-br'?pt:info;for(const title of titles)assert.ok(source.includes(title),locale+': missing '+title)}
assert.match(info,/eight political dimensions/);
assert.match(info,/acht politischer Dimensionen/);
assert.match(pt,/em oito dimensões/);
assert.match(info,/independent psychometric validity/);
assert.match(pt,/validação psicométrica independente/);
console.log('ABOUT_EDITORIAL_QA_PASS: five languages, five narrative sections each and limits preserved');
