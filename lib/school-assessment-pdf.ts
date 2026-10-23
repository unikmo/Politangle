/** Minimal dependency-free PDF export for teacher-only question records.
 * PDF text uses WinAnsi-safe transliteration; the CSV preserves full Unicode.
 */
type AnswerRow={paperNumber:string;submittedAt?:string;correct:number;graded:number;responses:Array<{questionId:string;question:string;answer:string|string[];correct:boolean|null}>};
const clean=(text:unknown)=>String(text??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7e]/g,'?');
const literal=(text:string)=>'('+clean(text).replace(/[\\()]/g,c=>'\\'+c)+')';
export function schoolResultsPdf(title:string,id:string,rows:AnswerRow[]):Uint8Array {
 const lines:string[]=[`POLITANGLE SCHOOL | ${title}`,`Assessment ${id}`,`Submitted students: ${rows.length}`,''];
 for(const row of rows){
  lines.push(`Student number ${row.paperNumber} | Score: ${row.correct}/${row.graded} | ${row.submittedAt||''}`);
  for(const answer of row.responses){
   const detail=`${answer.questionId}  ${answer.question} | Answer: ${Array.isArray(answer.answer)?answer.answer.join(', '):answer.answer} | ${answer.correct===null?'Not scored':answer.correct?'Correct':'Incorrect'}`;
   for(let i=0;i<detail.length;i+=97)lines.push('  '+detail.slice(i,i+97));
  }
  lines.push('');
 }
 const pages:string[][]=[];
 for(let i=0;i<lines.length;i+=56)pages.push(lines.slice(i,i+56));
 if(!pages.length)pages.push(['No responses recorded.']);
 const objs:string[]=['','<< /Type /Catalog /Pages 2 0 R >>','','<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];
 const kids:string[]=[];
 for(const page of pages){
  const pageId=objs.length,streamId=pageId+1;kids.push(`${pageId} 0 R`);
  const stream=['BT','/F1 9 Tf','42 792 Td','13 TL',...page.map((line,i)=>`${i?'T* ':''}${literal(line)} Tj`),'ET'].join('\n');
  objs.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${streamId} 0 R >>`);
  objs.push(`<< /Length ${Buffer.byteLength(stream,'latin1')} >>\nstream\n${stream}\nendstream`);
 }
 objs[2]=`<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${pages.length} >>`;
 let output='%PDF-1.4\n',offsets=[0];
 for(let i=1;i<objs.length;i++){offsets.push(Buffer.byteLength(output,'latin1'));output+=`${i} 0 obj\n${objs[i]}\nendobj\n`;}
 const xref=Buffer.byteLength(output,'latin1');output+=`xref\n0 ${objs.length}\n0000000000 65535 f \n`;
 for(let i=1;i<objs.length;i++)output+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
 output+=`trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
 return new Uint8Array(Buffer.from(output,'latin1'));
}
