#!/usr/bin/env python3
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'Politangle-School-Teacher-Handbook-v2.pdf'

INK = colors.HexColor('#15241f')
GREEN = colors.HexColor('#2f6b55')
MINT = colors.HexColor('#dcebe4')
CREAM = colors.HexColor('#f7f4ed')
GOLD = colors.HexColor('#b58a43')
GREY = colors.HexColor('#5f6b66')
WHITE = colors.white

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverTitle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=29, leading=32, textColor=WHITE, alignment=TA_LEFT, spaceAfter=8))
styles.add(ParagraphStyle(name='CoverSub', parent=styles['BodyText'], fontName='Helvetica', fontSize=13, leading=18, textColor=colors.HexColor('#e8f2ed')))
styles.add(ParagraphStyle(name='H1x', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=22, leading=25, textColor=INK, spaceAfter=10))
styles.add(ParagraphStyle(name='H2x', parent=styles['Heading2'], fontName='Helvetica-Bold', fontSize=14, leading=17, textColor=GREEN, spaceBefore=8, spaceAfter=6))
styles.add(ParagraphStyle(name='Bodyx', parent=styles['BodyText'], fontName='Helvetica', fontSize=9.2, leading=13.2, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name='Smallx', parent=styles['BodyText'], fontName='Helvetica', fontSize=7.7, leading=10.2, textColor=GREY, spaceAfter=3))
styles.add(ParagraphStyle(name='Kicker', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=GOLD, spaceAfter=5, uppercase=True))
styles.add(ParagraphStyle(name='Callout', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=INK, backColor=MINT, borderPadding=10, spaceBefore=7, spaceAfter=9))
styles.add(ParagraphStyle(name='Question', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=8.2, leading=11, textColor=INK, spaceAfter=2))

def p(text, style='Bodyx'): return Paragraph(text, styles[style])
def bullets(items): return [p('• ' + item) for item in items]

def lesson_card(kicker, title, goal, timeline, prompts):
    timeline_text = '<br/>'.join(f'<b>{step.split(" · ", 1)[0]}</b>  {step.split(" · ", 1)[1]}' if ' · ' in step else step for step in timeline)
    prompt_text = '<br/>'.join(f'• {item}' for item in prompts)
    card = Table([
        [p(kicker.upper(), 'Kicker')],
        [p(title, 'H2x')],
        [p('<b>Learning purpose</b><br/>' + goal, 'Bodyx')],
        [Table([[p('<b>RUN OF LESSON</b><br/>' + timeline_text, 'Smallx'), p('<b>ASK THE ROOM</b><br/>' + prompt_text, 'Smallx')]], colWidths=[103*mm, 59*mm])],
        [p('<b>Close privately:</b> one idea that now feels more complicated. Never ask students to disclose their anonymous answer.', 'Smallx')],
    ], colWidths=[168*mm])
    card.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,0),INK), ('TEXTCOLOR',(0,0),(-1,0),WHITE),
        ('BACKGROUND',(0,1),(-1,1),CREAM), ('BACKGROUND',(0,4),(-1,4),MINT),
        ('BOX',(0,0),(-1,-1),0.8,GREEN), ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('LEFTPADDING',(0,0),(-1,-1),8), ('RIGHTPADDING',(0,0),(-1,-1),8),
        ('TOPPADDING',(0,0),(-1,-1),6), ('BOTTOMPADDING',(0,0),(-1,-1),6),
    ]))
    return card

def worksheet(title, instruction, rows):
    cells = [[p(f'<b>{label}</b><br/><font color="#5f6b66">{hint}</font>', 'Bodyx')] for label, hint in rows]
    grid = Table(cells, colWidths=[168*mm], rowHeights=[30*mm] * len(cells))
    grid.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),CREAM), ('BOX',(0,0),(-1,-1),0.8,GREEN),
        ('INNERGRID',(0,0),(-1,-1),0.5,colors.HexColor('#cbd5cf')),
        ('VALIGN',(0,0),(-1,-1),'TOP'), ('PADDING',(0,0),(-1,-1),10),
    ]))
    return [p('PRINTABLE CLASSROOM TOOL', 'Kicker'), p(title, 'H1x'), p(instruction), Spacer(1,4*mm), grid, PageBreak()]

def header_footer(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setFillColor(INK); canvas.rect(0, 286*mm, 210*mm, 11*mm, fill=1, stroke=0)
        canvas.setFillColor(GOLD); canvas.rect(0, 286*mm, 34*mm, 11*mm, fill=1, stroke=0)
        canvas.setStrokeColor(colors.HexColor('#d7ded9')); canvas.line(18*mm, 16*mm, 192*mm, 16*mm)
        canvas.setFont('Helvetica', 7.5); canvas.setFillColor(GREY)
        canvas.drawString(18*mm, 10*mm, 'POLITANGLE SCHOOL · TEACHER HANDBOOK · CANDIDATE v2')
        canvas.drawRightString(192*mm, 10*mm, str(doc.page))
    canvas.restoreState()

doc = SimpleDocTemplate(str(OUT), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=18*mm, bottomMargin=20*mm, title='Politangle School Teacher Handbook', author='Politangle')
story = []

# Cover
cover = Table([[p('POLITANGLE SCHOOL  /  TEACHER EDITION', 'Kicker')], [p('Teach political thinking.<br/>Without telling students<br/>what to think.', 'CoverTitle')], [p('<b>8 ready-to-run lessons</b><br/>Anonymous classroom activities<br/>Printable discussion tools<br/><br/>Junior 10-13 and Youth 14-18<br/><br/><font color="#b58a43">CANDIDATE v2 · CONTROLLED PILOT</font>', 'CoverSub')]], colWidths=[174*mm], rowHeights=[22*mm, 94*mm, 74*mm])
cover.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),INK),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),16*mm),('RIGHTPADDING',(0,0),(-1,-1),16*mm),('TOPPADDING',(0,0),(-1,-1),12*mm),('LINEBELOW',(0,0),(0,0),1,GOLD)]))
story += [cover, PageBreak()]

story += [p('QUICK START', 'Kicker'), p('A safe room for difficult ideas', 'H1x'), p('Politangle School helps students identify values, concepts and trade-offs beneath political disagreement. It does not assign students to parties, reward a political position or expose individual answers to teachers.'), p('The five-minute teacher brief', 'H2x')]
story += bullets(['Choose the age band before choosing an activity.', 'Tell students: “I can see how the room answers, never who gave an answer.”', 'BELIEVE items are perspective questions. They do not have a correct political answer.', 'CLASSIFY and UNDERSTAND items test concepts and do have evidence-backed answers.', 'Invite reasons without asking students to reveal their anonymous choice.', 'Use distributions to start discussion; never call the average the “class ideology”.'])
story += [p('<b>Non-production boundary:</b> Junior and Youth wording are candidate forms. Real-school use requires cognitive testing with intended students and qualified legal/privacy review.', 'Callout'), p('Recommended first lesson', 'H2x'), p('<b>Ages 10–13:</b> Who is trying to influence me? · 45 minutes<br/><b>Ages 14–18:</b> Where does our room stand? · 45 minutes'), PageBreak()]

story += [p('QUICK START', 'Kicker'), p('Choose the right route', 'H1x')]
data = [[p('Junior 10–13','Question'), p('Youth 14–18','Question')], [p('16 concrete perspective questions<br/>Short social-media and power lessons<br/>No individual or class ideology label<br/>Best for first structured political discussion'), p('Youth Quick 26 or Full 42<br/>All 14 constructs<br/>THINK / FEEL / ACT in Full 42<br/>Aggregate multidimensional and family-compatibility views')]]
t=Table(data,colWidths=[86*mm,86*mm]); t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),GREEN),('TEXTCOLOR',(0,0),(-1,0),WHITE),('BACKGROUND',(0,1),(-1,1),CREAM),('BOX',(0,0),(-1,-1),0.6,colors.HexColor('#cbd5cf')),('INNERGRID',(0,0),(-1,-1),0.4,colors.HexColor('#cbd5cf')),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),10)])); story += [t, Spacer(1,8*mm)]
story += [p('Activity menu', 'H2x')]
story += bullets(['Junior 16: a concise perspective activity for ages 10–13.', 'Youth Quick 26: broad classroom map with manageable completion time.', 'Youth Full 42: all constructs across THINK, FEEL and ACT.', 'Political Literacy Quiz: CLASSIFY and UNDERSTAND concepts.', 'Guided Lesson: a prepared goal, sequence, timeline and discussion path.', 'Custom / single question: teacher-selected approved items.'])
story += [p('Do not use Junior 16 as a diagnostic profile. It is a civic-discussion instrument with limited construct coverage.', 'Callout'), PageBreak()]

lessons = [
('Junior 10–13 · 45 min','Who is trying to influence me?','Recognise emotional political messaging; separate claim, evidence, emotion and scapegoating; pause before sharing.',['0–8 · Compare two fictional social posts and mark reaction words.','8–22 · Run J10, J16 and selected literacy questions anonymously.','22–35 · Sort statements into claim, evidence, emotion and scapegoat.','35–45 · Use pause-check-compare; rewrite one manipulative post fairly.'],['Can an emotional message still be true?','Why is blaming one group attractive?','What would make a source trustworthy?']),
('Junior 10–13 · 45 min','Power, fairness and disagreement','Connect elections with limits on power; compare freedom, safety and fairness; describe both sides fairly.',['0–8 · Explain anonymity and the five-position scale.','8–28 · Run six Junior questions and pause on split results.','28–38 · Design a fair limit for a fictional student council.','38–45 · Private reflection: one view understood better.'],['When can safety justify limiting freedom?','Why might a majority still need rules?','Is equal treatment always fair?']),
('Youth 14–18 · 45 min','Where does our room stand?','Experience anonymous disagreement; identify competing values; separate a distribution from identity.',['0–5 · Join and explain privacy.','5–25 · Run seven cross-construct questions.','25–40 · Invite reasons, not party labels.','40–45 · Review and privately reflect.'],['What value is each side protecting?','What fact could change an answer?','Does a 50/50 room mean “centrist”?']),
('Youth 14–18 · 60 min','Political families without stereotypes','Distinguish five broad families; separate cross-cutting concepts; correct common misconceptions.',['0–10 · Introduce five families and cross-cutting concepts.','10–35 · Run CLASSIFY and reveal explanations.','35–50 · Run UNDERSTAND misconception items.','50–60 · Correct one misconception in students’ own words.'],['Why is public healthcare not automatically socialism?','Can nationalism join different economic ideologies?','Which differences concern ownership?']),
('Youth 14–18 · 60 min','Think, Feel, Act','Distinguish judgement, emotional reaction and intended choice; treat tension as context, not hypocrisy.',['0–10 · Explain the three modes with a neutral example.','10–40 · Run four complete construct triplets.','40–55 · Discuss the largest aggregate tensions.','55–60 · Reinforce that ACT is stated intention.'],['When can principle and choice differ?','Why is tension not hypocrisy?','Which mode depends most on context?']),
('Youth 14–18 · 60–75 min','Youth Quick 26 classroom lab','Explore a multidimensional landscape; read distributions; locate consensus and division.',['0–8 · Explain privacy and the scale.','8–50 · Complete Youth Quick 26.','50–65 · Review map, compatibility and distributions.','65–75 · Discuss or continue privately.'],['Where does an average hide a split?','Which dimensions appear independent?','Why can several families fit?']),
('Youth 14–18 · 90 min / 2 × 45','Youth Full 42 profile lab','Complete 14 constructs across three modes and use class-level tension as a discussion tool.',['Session A · Join, Quick 26 and discussion.','Session B · Remaining 16, mode comparison and map.','Close · Discuss overlap without assigning a class label.'],['What changed between THINK, FEEL and ACT?','Which results need more context?','What does compatibility not prove?']),
('Youth 14–18 · 45–60 min','Democracy, pluralism and populism','Separate elections from liberal-democratic checks; distinguish populism from authoritarianism.',['0–10 · Introduce elections, checks and pluralism.','10–30 · Run pluralism and populism triplets.','30–45 · Run literacy questions and reveal explanations.','45–60 · Optional structured controversy.'],['Can populists support strong checks?','Can authority preference exist without populism?','Why can unelected institutions be both safeguard and tension?']),
]

story += [p('READY-TO-RUN LESSONS', 'Kicker'), p('Eight routes into political thinking', 'H1x'), p('Each card gives you a purpose, timed sequence, neutral prompts and a private close. Adapt timings to your class; preserve anonymity and neutrality.'), Spacer(1,4*mm)]
for index, (kicker,title,goal,timeline,prompts) in enumerate(lessons):
    story += [lesson_card(kicker,title,goal,timeline,prompts), Spacer(1,6*mm)]
    if index % 2 == 1 and index < len(lessons)-1:
        story += [PageBreak(), p('READY-TO-RUN LESSONS', 'Kicker'), p('Lesson cards', 'H1x')]

story += [PageBreak()]

story += [p('FACILITATION', 'Kicker'), p('Neutrality is an active practice', 'H1x')]
story += bullets(['State the strongest fair reason on both sides.', 'Do not praise a class for moving toward one pole.', 'Do not treat majority agreement as factual correctness.', 'Correct conceptual errors in literacy questions without correcting political preferences.', 'Permit “unsure” and “it depends”; ask what missing information matters.', 'Intervene when students target classmates or protected groups, while still examining the underlying claim.', 'Never infer extremism from a single response, patriotism, welfare scepticism or law-and-order preference.'])
story += [p('Four-question discussion routine','H2x'), p('<b>1. Value:</b> What is each side trying to protect?<br/><b>2. Evidence:</b> What facts would help?<br/><b>3. Trade-off:</b> What might each choice cost?<br/><b>4. Revision:</b> What could reasonably change someone’s view?'), PageBreak()]

story += [p('PRIVACY & SAFEGUARDING','Kicker'), p('The classroom privacy promise','H1x'), p('The teacher sees joined counts, response totals and aggregate distributions. The classroom record does not provide a roster, student-to-answer mapping, individual political profile, individual family compatibility, individual THINK/FEEL/ACT result or individual literacy score.')]
story += [p('Before students join','H2x')] + bullets(['Use the temporary room code or link.', 'Do not ask students to put names in room labels or responses.', 'Explain what the projector will display.', 'Choose delayed reveal for sensitive questions.', 'Provide an alternative participation route where required.', 'Close the room and follow the school’s approved retention procedure.'])
story += [p('REQUIRES QUALIFIED LEGAL REVIEW before real school/minor deployment. The aggregate-only design reduces risk; it does not remove all legal duties concerning minors and political-opinion processing.', 'Callout'), PageBreak()]

story += [p('RESULTS','Kicker'), p('How to read the room', 'H1x')]
story += bullets(['Distribution first: two opposing clusters can produce a misleading middle average.', 'Coverage matters: do not show family or axis results when too little relevant content was answered.', 'Compatibility is not identity: several political families can fit the same room.', 'THINK/FEEL/ACT tension is a conversation signal, not hypocrisy.', 'Literacy accuracy can guide re-teaching because these questions have evidence-backed answers.', 'Never compare classes as “more correct” politically.'])
story += [p('Recommended report language','H2x'), p('“This class distribution suggests…” · “Students prioritised several competing values…” · “The room was divided on…” · “The literacy result indicates that this concept may need another explanation…”'), PageBreak()]

story += worksheet('Message microscope', 'Use this sheet with a fictional or teacher-approved social post. Analyse the message before deciding whether you agree.', [
    ('CLAIM', 'What does the message say happened or should happen?'),
    ('EVIDENCE', 'What proof is offered? What proof is missing?'),
    ('EMOTION', 'Which words try to create fear, anger, pride or hope?'),
    ('TARGET', 'Who is blamed, praised or presented as “the real people”?'),
    ('CHECK', 'Which second source could confirm or challenge the message?'),
])
story += worksheet('Fair disagreement canvas', 'Work alone first, then compare reasons without revealing anyone’s anonymous vote.', [
    ('SIDE A PROTECTS', 'Name the strongest value or concern behind the first position.'),
    ('SIDE B PROTECTS', 'Name the strongest value or concern behind the second position.'),
    ('FACTS WE NEED', 'What information would help us judge the trade-off?'),
    ('POSSIBLE COSTS', 'What could each side lose if its preferred choice wins?'),
    ('WHAT COULD CHANGE A VIEW?', 'Write one reasonable condition - not a personal attack.'),
])
story += worksheet('Teacher room plan', 'Complete before opening a classroom. Keep the teacher key private and never collect student names.', [
    ('PURPOSE', 'What should students understand by the end?'),
    ('ACTIVITY + AGE BAND', 'Junior 10-13 / Youth 14-18 / literacy / guided / custom'),
    ('SAFEGUARD', 'Sensitive topic, alternative participation route and escalation contact'),
    ('PROJECTOR', 'Live or delayed reveal? Why is this appropriate?'),
    ('CLOSE', 'How will students reflect privately and how will the room be closed?'),
])
story += worksheet('Private exit ticket', 'Students keep this sheet. Do not collect it unless the school has explicitly approved that process.', [
    ('ONE IDEA I UNDERSTAND BETTER', 'A concept, value or reason - not a party label.'),
    ('ONE QUESTION I STILL HAVE', 'What needs another explanation or source?'),
    ('ONE VIEW I CAN NOW EXPLAIN FAIRLY', 'It does not have to be your own view.'),
    ('MY NEXT CHECK', 'What will you verify before sharing or acting on a political claim?'),
])

story += [p('JUNIOR QUESTION BANK','Kicker'), p('Junior 16 · candidate v2', 'H1x'), p('Read each pair as two defensible directions. Students choose strongly first, somewhat first, between/depends, somewhat second, strongly second or unsure. This bank is for classroom discussion, not diagnosis.')]

src = (ROOT/'lib'/'school-believe.ts').read_text()
junior_block = src.split('const juniorPairs',1)[1].split('export const schoolJuniorBeliefItems',1)[0]
import re
junior = re.findall(r"\['([^']+)', '([^']+)'\]", junior_block)
for start in range(0,len(junior),8):
    rows=[]
    for i,(a,b) in enumerate(junior[start:start+8],start+1):
        rows.append([p(f'J{i:02d}','Question'), p(a,'Smallx'), p(b,'Smallx')])
    table=Table(rows,colWidths=[13*mm,79.5*mm,79.5*mm],repeatRows=0)
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(0,-1),MINT),('BOX',(0,0),(-1,-1),0.5,colors.HexColor('#cbd5cf')),('INNERGRID',(0,0),(-1,-1),0.3,colors.HexColor('#d7ded9')),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),6)]))
    story += [table]
    if start+8 < len(junior): story += [PageBreak(), p('JUNIOR QUESTION BANK','Kicker'), p(f'Junior 16 · questions {start+9}–{min(start+16,16)}','H1x')]
story += [PageBreak()]

story += [p('YOUTH QUESTION BANK','Kicker'), p('Youth Full 42 · candidate v2', 'H1x'), p('All IDs and scoring coordinates align with the adult BELIEVE v2.1 bank, but the wording is a separate plain-language candidate form. Equivalence must be tested; the adult assessment remains unchanged.')]
youth_block = src.split('const youthPairs',1)[1].split('export const schoolYouthBeliefItems',1)[0]
constructs = re.findall(r"(?:^|\n)  '?([a-z-]+)'?: \{", youth_block)
pairsets=[]
for construct in constructs:
    marker = f"  '{construct}': {{" if '-' in construct else f"  {construct}: {{"
    block=youth_block.split(marker,1)[1].split('\n  },',1)[0]
    for mode,a,b in re.findall(r"(think|feel|act): \['([^']+)', '([^']+)'\]",block): pairsets.append((construct,mode,a,b))
for start in range(0,len(pairsets),10):
    rows=[]
    for construct,mode,a,b in pairsets[start:start+10]:
        rows.append([p(f'{construct.replace("-"," ")}<br/>{mode.upper()}','Question'),p(a,'Smallx'),p(b,'Smallx')])
    table=Table(rows,colWidths=[28*mm,72*mm,72*mm])
    table.setStyle(TableStyle([('BACKGROUND',(0,0),(0,-1),MINT),('BOX',(0,0),(-1,-1),0.5,colors.HexColor('#cbd5cf')),('INNERGRID',(0,0),(-1,-1),0.3,colors.HexColor('#d7ded9')),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),5)]))
    story += [table]
    if start+10 < len(pairsets): story += [PageBreak(),p('YOUTH QUESTION BANK','Kicker'),p(f'Youth Full 42 · items {start+11}–{min(start+20,42)}','H1x')]
story += [PageBreak()]

story += [p('PILOT & VALIDATION','Kicker'), p('What must be tested before launch','H1x')]
story += bullets(['Cognitive interviews: ask students to explain each side in their own words.', 'Neutrality: check whether either side sounds kinder, smarter or more socially acceptable.', 'Reading load: record skipped words, rereading and time per item.', 'Construct match: confirm simplified wording still measures the intended political trade-off.', 'Response behaviour: review “unsure”, missing answers and extreme-response patterns.', 'Age differences: do not assume results from 16–18 year olds generalise to 10–13 year olds.', 'Teacher usability: observe setup, pacing, projector reveal and debrief without coaching.', 'Accessibility: keyboard, screen reader, contrast, zoom, motion and one-handed mobile use.', 'Legal/privacy: qualified review of lawful basis, notices, minimisation, retention, vendors and student rights.'])
story += [p('Automated structural tests are useful engineering evidence. They are not evidence that the questions are psychometrically validated or suitable for every student.', 'Callout'), PageBreak()]

story += [p('TEACHER CHECKLIST','Kicker'), p('Before, during and after', 'H1x'), p('Before class','H2x')] + bullets(['Select Junior or Youth deliberately.', 'Check the lesson goal and sensitive content.', 'Choose live or delayed projector reveal.', 'Prepare a non-digital alternative.', 'Explain anonymity and respectful discussion.'])
story += [p('During class','H2x')] + bullets(['Watch joined and response counts, not individuals.', 'Ask for reasons without asking who chose an answer.', 'Show both sides fairly.', 'Pause if discussion becomes personal.', 'Distinguish preferences from literacy answers.'])
story += [p('After class','H2x')] + bullets(['Close the room.', 'Use only aggregate reporting.', 'Record misconceptions and follow-up needs.', 'Follow the approved retention/deletion process.', 'Report safeguarding, privacy or technical incidents.'])
story += [p('Politangle School · Teacher Handbook · candidate v2<br/>Designed for controlled non-production evaluation.', 'Callout')]

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(OUT)
