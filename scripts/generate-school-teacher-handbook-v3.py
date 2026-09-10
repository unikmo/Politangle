#!/usr/bin/env python3
from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'pdf' / 'Politangle-School-Teacher-Handbook-v3.pdf'

NAVY = colors.HexColor('#102B35')
INK = colors.HexColor('#17343D')
TEAL = colors.HexColor('#0A7B74')
CYAN = colors.HexColor('#31B8AE')
GOLD = colors.HexColor('#E6AD3C')
CORAL = colors.HexColor('#EE765D')
PAPER = colors.HexColor('#F6F3EB')
MIST = colors.HexColor('#E7F2F0')
PALE = colors.HexColor('#F0E7D3')
WHITE = colors.white
GREY = colors.HexColor('#567078')
LINE = colors.HexColor('#BDD2D0')

pdfmetrics.registerFont(TTFont('DV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DV-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DV-Serif', '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'))
pdfmetrics.registerFont(TTFont('DV-Serif-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'))

base = getSampleStyleSheet()
styles = {
    'display': ParagraphStyle('display', fontName='DV-Serif-Bold', fontSize=30, leading=34, textColor=WHITE),
    'h1': ParagraphStyle('h1', fontName='DV-Serif-Bold', fontSize=23, leading=27, textColor=NAVY, spaceAfter=8),
    'h2': ParagraphStyle('h2', fontName='DV-Bold', fontSize=13, leading=16, textColor=INK, spaceAfter=5),
    'body': ParagraphStyle('body', fontName='DV', fontSize=9.5, leading=14, textColor=INK, spaceAfter=6),
    'small': ParagraphStyle('small', fontName='DV', fontSize=8.3, leading=11.4, textColor=INK),
    'tiny': ParagraphStyle('tiny', fontName='DV', fontSize=7.3, leading=9.7, textColor=GREY),
    'label': ParagraphStyle('label', fontName='DV-Bold', fontSize=7.2, leading=9, textColor=TEAL, spaceAfter=3),
    'white': ParagraphStyle('white', fontName='DV', fontSize=9.5, leading=14, textColor=WHITE),
    'whitebold': ParagraphStyle('whitebold', fontName='DV-Bold', fontSize=11, leading=14, textColor=WHITE),
    'quote': ParagraphStyle('quote', fontName='DV-Serif', fontSize=15, leading=20, textColor=NAVY),
    'question': ParagraphStyle('question', fontName='DV', fontSize=8.8, leading=12.2, textColor=INK),
}

def P(text, style='body'):
    return Paragraph(text, styles[style])

def page_frame(canvas, doc):
    canvas.saveState()
    if doc.page > 1:
        canvas.setFillColor(NAVY)
        canvas.rect(0, 285*mm, 210*mm, 12*mm, fill=1, stroke=0)
        canvas.setFillColor(GOLD)
        canvas.rect(0, 285*mm, 31*mm, 12*mm, fill=1, stroke=0)
        canvas.setFont('DV-Bold', 7)
        canvas.setFillColor(WHITE)
        canvas.drawString(38*mm, 289*mm, 'POLITANGLE SCHOOL   /   TEACHER HANDBOOK')
        canvas.setStrokeColor(LINE)
        canvas.line(17*mm, 16*mm, 193*mm, 16*mm)
        canvas.setFont('DV', 7)
        canvas.setFillColor(GREY)
        canvas.drawString(17*mm, 10*mm, 'CANDIDATE v3   /   CONTROLLED PILOT')
        canvas.drawRightString(193*mm, 10*mm, f'{doc.page:02d}')
    canvas.restoreState()

doc = SimpleDocTemplate(
    str(OUT), pagesize=A4, leftMargin=17*mm, rightMargin=17*mm,
    topMargin=20*mm, bottomMargin=21*mm, title='Politangle School Teacher Handbook v3',
    author='Politangle'
)
story = []

def full_card(title, text, color=MIST, label=None):
    content = []
    if label: content.append(P(label.upper(), 'label'))
    content.extend([P(title, 'h2'), P(text, 'small')])
    t = Table([[content]], colWidths=[82*mm], rowHeights=[44*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),color), ('BOX',(0,0),(-1,-1),0.8,LINE),
        ('VALIGN',(0,0),(-1,-1),'TOP'), ('PADDING',(0,0),(-1,-1),10),
    ]))
    return t

def section_page(number, title, subtitle, accent=CYAN):
    band = Table([
        [P(f'{number:02d}', 'display'), P(title, 'display')],
        ['', P(subtitle, 'white')],
    ], colWidths=[25*mm, 151*mm], rowHeights=[75*mm, 72*mm])
    band.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),NAVY), ('BACKGROUND',(0,0),(0,-1),accent),
        ('VALIGN',(0,0),(-1,-1),'TOP'), ('PADDING',(0,0),(-1,-1),14),
        ('TOPPADDING',(0,0),(-1,0),18),
    ]))
    return [Spacer(1,18*mm), band, Spacer(1,9*mm),
            P('Use the section tabs and page numbers to jump directly to the classroom material you need.', 'body'), PageBreak()]

def meta_strip(items):
    cells = [[P(label.upper(), 'label'), P(value, 'small')] for label, value in items]
    t = Table([cells], colWidths=[176*mm/len(cells)]*len(cells))
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(-1,-1),MIST), ('BOX',(0,0),(-1,-1),0.7,LINE),
        ('INNERGRID',(0,0),(-1,-1),0.5,LINE), ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('PADDING',(0,0),(-1,-1),7),
    ]))
    return t

def timeline_table(steps):
    rows=[]
    for timing, teacher, students in steps:
        rows.append([P(timing, 'whitebold'), P(f'<b>TEACHER</b><br/>{teacher}', 'small'), P(f'<b>STUDENTS</b><br/>{students}', 'small')])
    t=Table(rows,colWidths=[26*mm,75*mm,75*mm],rowHeights=[24*mm]*len(rows))
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(0,-1),TEAL), ('TEXTCOLOR',(0,0),(0,-1),WHITE),
        ('BACKGROUND',(1,0),(-1,-1),PAPER), ('BOX',(0,0),(-1,-1),0.8,LINE),
        ('INNERGRID',(0,0),(-1,-1),0.5,LINE), ('VALIGN',(0,0),(-1,-1),'MIDDLE'),
        ('PADDING',(0,0),(-1,-1),8),
    ]))
    return t

def lesson_page(age, duration, title, purpose, questions, steps, prep, support):
    story.extend([
        P('READY-TO-RUN LESSON', 'label'), P(title, 'h1'),
        meta_strip([('Age',age),('Time',duration),('Format','Anonymous + discussion')]), Spacer(1,5*mm),
        Table([[P('LEARNING PURPOSE','label'), P(purpose,'body')]], colWidths=[38*mm,138*mm], style=[
            ('BACKGROUND',(0,0),(-1,-1),PALE),('BOX',(0,0),(-1,-1),0.7,GOLD),
            ('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),9)]),
        Spacer(1,5*mm), P('RUN OF LESSON','label'), timeline_table(steps), Spacer(1,5*mm),
        Table([[
            [P('ASK THE ROOM','label'), P('<br/>'.join('• '+q for q in questions),'small')],
            [P('BEFORE YOU START','label'), P(prep,'small'), Spacer(1,3*mm), P('INCLUSION + SAFETY','label'), P(support,'small')]
        ]], colWidths=[86*mm,86*mm], style=[
            ('BACKGROUND',(0,0),(0,0),MIST),('BACKGROUND',(1,0),(1,0),colors.white),
            ('BOX',(0,0),(-1,-1),0.7,LINE),('INNERGRID',(0,0),(-1,-1),0.5,LINE),
            ('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),10)]),
        Spacer(1,4*mm),
        Table([[P('<b>PRIVATE CLOSE</b>  Ask students to record one idea they now see as more complicated. Never ask them to reveal their anonymous answer.','small')]], colWidths=[176*mm], style=[
            ('BACKGROUND',(0,0),(-1,-1),NAVY),('TEXTCOLOR',(0,0),(-1,-1),WHITE),('PADDING',(0,0),(-1,-1),9)]),
        PageBreak()
    ])

def worksheet_page(title, intro, prompts):
    story.extend([P('PRINTABLE CLASSROOM TOOL','label'),P(title,'h1'),P(intro,'body')])
    rows=[]
    for label,hint in prompts:
        rows.append([P(label.upper(),'label'),P(hint,'tiny')])
        rows.append(['',''])
    heights=[]
    for _ in prompts: heights.extend([12*mm,29*mm])
    t=Table(rows,colWidths=[40*mm,136*mm],rowHeights=heights)
    style=[('BOX',(0,0),(-1,-1),0.8,LINE),('INNERGRID',(0,0),(-1,-1),0.4,LINE),
           ('BACKGROUND',(0,0),(0,-1),MIST),('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),7)]
    for i in range(len(prompts)):
        style.append(('SPAN',(0,i*2+1),(1,i*2+1)))
        style.append(('BACKGROUND',(0,i*2+1),(1,i*2+1),WHITE))
    t.setStyle(TableStyle(style)); story.extend([Spacer(1,3*mm),t,PageBreak()])

def statement_card(code, meta, statement, body_height=18*mm):
    t=Table([
        [P(code,'whitebold'),P(meta.upper(),'label')],
        [P(statement,'question'),''],
        [P('<b>-2</b> No, not at all &nbsp;&nbsp; <b>0</b> In between / it depends &nbsp;&nbsp; <b>+2</b> Yes, completely &nbsp;&nbsp; <b>?</b> Not sure','tiny'),'']
    ],colWidths=[138*mm,38*mm],rowHeights=[10*mm,body_height,9*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND',(0,0),(0,0),TEAL),('BACKGROUND',(1,0),(1,0),MIST),
        ('BACKGROUND',(0,1),(-1,1),PAPER),('BACKGROUND',(0,2),(-1,2),WHITE),
        ('SPAN',(0,1),(1,1)),('SPAN',(0,2),(1,2)),
        ('BOX',(0,0),(-1,-1),0.8,LINE),('INNERGRID',(0,0),(-1,-1),0.5,LINE),
        ('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),8),
    ]))
    return t

# Cover
cover=Table([
    [P('POLITANGLE SCHOOL','whitebold')],
    [P('Teach political thinking.<br/>Without telling students<br/>what to think.','display')],
    [P('THE SCHOOL-READY TEACHER HANDBOOK','whitebold')],
    [P('Junior 10-13  /  Youth 14-18<br/>Eight guided lessons  /  Printable tools  /  One-screen wording reference','white')],
    [P('CANDIDATE v3   ·   CONTROLLED PILOT','label')]
],colWidths=[176*mm],rowHeights=[27*mm,83*mm,20*mm,47*mm,13*mm])
cover.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1),NAVY),('BACKGROUND',(0,0),(0,0),TEAL),
    ('BACKGROUND',(0,4),(0,4),GOLD),('VALIGN',(0,0),(-1,-1),'TOP'),
    ('LEFTPADDING',(0,0),(-1,-1),15*mm),('RIGHTPADDING',(0,0),(-1,-1),15*mm),
    ('TOPPADDING',(0,0),(-1,-1),10*mm),
])); story.extend([cover,PageBreak()])

# Contents
story.extend([P('START HERE','label'),P('Your route through the pack','h1'),P('Designed for preparation at a glance and confident use during a live lesson.','quote'),Spacer(1,7*mm)])
contents=[
    ('01','Start safely','Purpose, privacy promise and activity choice','Section 1'),
    ('02','Teach','Eight complete lesson plans','Section 2'),
    ('03','Facilitate','Neutrality, safeguarding and result language','Section 3'),
    ('04','Print','Four reusable classroom tools','Section 4'),
    ('05','Reference','One-screen Junior and Youth wording','Section 5'),
    ('06','Validate','Pilot protocol and teacher checklist','Section 6'),
]
ct=Table([[P(n,'whitebold'),P(f'<b>{title}</b><br/>{desc}','body'),P(page,'h2')] for n,title,desc,page in contents],colWidths=[20*mm,135*mm,21*mm],rowHeights=[25*mm]*6)
ct.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(0,-1),TEAL),('BACKGROUND',(1,0),(-1,-1),PAPER),
    ('TEXTCOLOR',(0,0),(0,-1),WHITE),('BOX',(0,0),(-1,-1),0.8,LINE),
    ('INNERGRID',(0,0),(-1,-1),0.5,LINE),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('PADDING',(0,0),(-1,-1),9),
])); story.extend([ct,PageBreak()])

story.extend(section_page(1,'Start safely','Set the room before the first response arrives. Make the privacy promise explicit, choose the correct age band and separate political preferences from knowledge questions.',CYAN))

story.extend([P('FIVE-MINUTE BRIEF','label'),P('A safe room for difficult ideas','h1'),P('Politangle helps students identify the values, concepts and trade-offs beneath disagreement. It does not assign students to parties or expose individual answers to teachers.','quote'),Spacer(1,7*mm)])
cards=[
    full_card('Make the promise','“I can see how the room answers, never who gave an answer.”',MIST,'Privacy'),
    full_card('Allow uncertainty','“Unsure” and “it depends” are valid starting points. Ask what information is missing.',PAPER,'Participation'),
    full_card('Separate preference from knowledge','BELIEVE has no correct political answer. CLASSIFY and UNDERSTAND do.',PALE,'Assessment'),
    full_card('Discuss reasons, not identities','Invite the strongest fair reason on both sides. Never ask who selected an answer.',MIST,'Neutrality'),
]
story.extend([Table([[cards[0],cards[1]],[cards[2],cards[3]]],colWidths=[86*mm,86*mm],rowHeights=[48*mm,48*mm],style=[('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),2)]),Spacer(1,6*mm),
              Table([[P('<b>CONTROLLED PILOT ONLY</b><br/>Junior and Youth wording remains candidate content. Real-school use requires cognitive testing with intended students and qualified legal/privacy review.','small')]],colWidths=[176*mm],style=[('BACKGROUND',(0,0),(-1,-1),CORAL),('TEXTCOLOR',(0,0),(-1,-1),WHITE),('PADDING',(0,0),(-1,-1),10)]),PageBreak()])

story.extend([P('CHOOSE THE ROUTE','label'),P('One classroom, two age bands','h1'),meta_strip([('Junior','Ages 10-13'),('Youth','Ages 14-18'),('Teacher override','Use professional judgement')]),Spacer(1,6*mm)])
route=Table([
    [P('JUNIOR 16','whitebold'),P('YOUTH QUICK 26','whitebold'),P('YOUTH FULL 42','whitebold')],
    [P('Concrete perspective prompts. Best for a first structured political discussion and social-media literacy. Not a diagnostic profile.','body'),P('A broad classroom map with manageable completion time. Suitable for one lesson.','body'),P('All constructs across THINK, FEEL and ACT. Best across two lessons or a longer session.','body')],
    [P('<b>Use with:</b><br/>Who is trying to influence me?<br/>Power, fairness and disagreement','small'),P('<b>Use with:</b><br/>Where does our room stand?<br/>Youth Quick classroom lab','small'),P('<b>Use with:</b><br/>Think, Feel, Act<br/>Youth Full profile lab','small')]
],colWidths=[58.7*mm]*3,rowHeights=[15*mm,56*mm,38*mm])
route.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),TEAL),('TEXTCOLOR',(0,0),(-1,0),WHITE),
    ('BACKGROUND',(0,1),(-1,1),PAPER),('BACKGROUND',(0,2),(-1,2),MIST),
    ('BOX',(0,0),(-1,-1),0.8,LINE),('INNERGRID',(0,0),(-1,-1),0.5,LINE),
    ('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),9),
]));story.extend([route,Spacer(1,6*mm),P('<b>Boundary rule:</b> age is a guide, not a diagnosis. A teacher may choose the Junior form for an older class that benefits from simpler language. Do not use the Youth form with younger students merely to produce a more detailed report.','body'),PageBreak()])

story.extend(section_page(2,'Teach','Eight complete routes from anonymous response to reasoned discussion. Every lesson includes preparation, a timed run, neutral prompts and a private close.',GOLD))

lessons=[
('10-13','45 min','Who is trying to influence me?','Recognise emotional political messaging; separate claim, evidence, emotion and scapegoating; pause before sharing.',
 ['Can an emotional message still be true?','Why is blaming one group attractive?','What makes a source trustworthy?'],
 [('0-8','Show two fictional social posts. Model noticing reaction words.','Circle words designed to trigger a fast feeling.'),('8-22','Run J10, J16 and selected literacy questions anonymously.','Answer privately; watch how the distribution develops.'),('22-35','Sort the posts into claim, evidence, emotion and target.','Use the Message Microscope worksheet.'),('35-45','Model pause-check-compare, then invite a fair rewrite.','Rewrite one manipulative post without removing its claim.')],
 'Prepare two fictional posts about a low-stakes school issue. Never use a student’s real post.','Use delayed projector reveal. Allow students to analyse without speaking. Stop personal targeting immediately.'),
('10-13','45 min','Power, fairness and disagreement','Connect elections with limits on power; compare freedom, safety and fairness; explain opposing reasons fairly.',
 ['When can safety justify limiting freedom?','Why might a majority still need rules?','Is equal treatment always fair?'],
 [('0-8','Explain anonymity and the response scale with a neutral example.','Practise using between/depends and unsure.'),('8-25','Run six Junior questions; pause on two split distributions.','Answer privately and notice disagreement without guessing who chose what.'),('25-37','Set a fictional student-council power problem.','Design one fair limit and explain what it protects.'),('37-45','Invite two strong reasons, then close privately.','Write one opposing reason you can now explain fairly.')],
 'Choose six prompts across power, fairness and freedom. Prepare a fictional school-council scenario.','Avoid asking students to disclose family or religious beliefs. Offer writing instead of speaking.'),
('14-18','45 min','Where does our room stand?','Experience anonymous disagreement; identify competing values; distinguish a distribution from a group identity.',
 ['What value is each side protecting?','What fact could change an answer?','Does a 50/50 room mean “centrist”?'],
 [('0-6','Explain the privacy promise and the scale.','Join anonymously and test one neutral practice item.'),('6-25','Run seven cross-construct questions.','Answer privately; note one surprising distribution.'),('25-38','Invite reasons without party labels or personal disclosure.','Steelman one side before offering a challenge.'),('38-45','Model cautious result language.','Complete the private exit ticket.')],
 'Select seven questions spanning at least five constructs. Choose delayed reveal for sensitive topics.','Do not label the class. A bimodal room can produce a misleading average.'),
('14-18','60 min','Political families without stereotypes','Distinguish five broad families; separate cross-cutting tendencies; correct common misconceptions.',
 ['Why is public healthcare not automatically socialism?','Can nationalism join different economic views?','Which differences concern ownership?'],
 [('0-10','Introduce families as traditions, not personality types.','Write one assumption you want to test.'),('10-32','Run CLASSIFY items and reveal explanations.','Answer, check and revise the concept map.'),('32-50','Run UNDERSTAND misconception items.','Explain why the tempting answer is incomplete.'),('50-60','Model a corrected claim and invite one student rewrite.','Rewrite one misconception in your own words.')],
 'Prepare the five-family reference and identify the literacy items you will run.','Correct concept errors without correcting political preferences. Avoid party shortcuts.'),
('14-18','60 min','Think, Feel, Act','Distinguish judgement, emotional reaction and intended choice; treat tension as context rather than hypocrisy.',
 ['When can principle and choice differ?','Which mode depends most on context?','What would count as evidence of hypocrisy?'],
 [('0-10','Explain the three modes using a non-political example.','Create a neutral think/feel/act example.'),('10-37','Run four complete construct triplets.','Answer privately and compare aggregate modes.'),('37-52','Discuss the largest class-level tensions.','Suggest context that could explain the gap.'),('52-60','Restate that ACT is intention, not observed behaviour.','Write one careful sentence about the result.')],
 'Choose four construct triplets with suitable sensitivity for the class.','Never diagnose an individual or call the class inconsistent. Keep explanations contextual.'),
('14-18','60-75 min','Youth Quick 26 classroom lab','Explore a multidimensional landscape; read distributions; locate consensus and division without forcing a label.',
 ['Where does an average hide a split?','Which dimensions appear independent?','Why can several families fit?'],
 [('0-8','Explain privacy, scale and result limits.','Join and answer a neutral practice item.'),('8-48','Run Youth Quick 26 student-paced.','Complete privately; use unsure when needed.'),('48-63','Review map, compatibility and key distributions.','Identify one consensus and one divided item.'),('63-75','Discuss cautious interpretations.','Write one result sentence that avoids a label.')],
 'Allow sufficient device time. Decide which results are appropriate to project.','Provide a non-digital alternative. Do not rank classes or present compatibility as identity.'),
('14-18','2 x 45 min','Youth Full 42 profile lab','Complete all 14 constructs across THINK, FEEL and ACT and use aggregate tension as a discussion tool.',
 ['What changed across THINK, FEEL and ACT?','Which results need more context?','What does compatibility not prove?'],
 [('Lesson 1','Run privacy brief and Youth Quick 26.','Complete the first section and note questions.'),('Between','Keep the same anonymous room; do not export individual data.','Do not share the temporary participant token.'),('Lesson 2','Run the remaining 16, then compare modes.','Complete the form and inspect aggregate patterns.'),('Close','Discuss overlap without assigning a class label.','Write one limitation of the class result.')],
 'Plan two sessions and preserve the room securely between them.','Check attendance changes before comparing totals. Avoid claiming a longitudinal individual profile.'),
('14-18','45-60 min','Democracy, pluralism and populism','Separate elections from liberal-democratic checks; distinguish populism from authoritarianism.',
 ['Can populists support strong checks?','Can authority preference exist without populism?','Why can unelected institutions be both safeguard and tension?'],
 [('0-10','Define elections, checks, pluralism and populism separately.','Create a four-box concept map.'),('10-29','Run pluralism and populism triplets.','Answer privately; compare constructs.'),('29-44','Run literacy questions and reveal explanations.','Correct the concept map with evidence.'),('44-60','Optional structured controversy and private close.','Argue a position assigned at random, then reflect privately.')],
 'Use fictional institutions rather than current personalities for the first example.','Intervene against group targeting. Distinguish anti-elite language from evidence of authoritarianism.'),
]
for item in lessons: lesson_page(*item)

story.extend(section_page(3,'Facilitate','Neutral teaching is active work. The teacher protects a fair process, corrects conceptual errors and refuses to turn aggregate patterns into identities.',CORAL))

for title,lead,blocks in [
('Neutrality is an active practice','Students should be able to recognise the strongest fair version of a view without being pushed toward it.',[
('BALANCE','State the strongest fair reason on both sides; do not create a weak “straw person”.'),('LANGUAGE','Do not praise movement toward a pole or describe the majority as politically correct.'),('EVIDENCE','Correct factual or conceptual errors while leaving political preferences open.'),('UNCERTAINTY','Treat unsure and depends as information: ask what condition matters.'),('BOUNDARY','Stop personal targeting while continuing to examine the underlying claim.'),('CAUTION','Never infer extremism from one answer or from ordinary conservative, socialist, patriotic or welfare-state preferences.')]),
('The classroom privacy promise','Aggregate-only design reduces risk but does not remove safeguarding or legal duties.',[
('BEFORE','Use temporary codes; keep the teacher key private; explain projector behaviour.'),('DURING','Never ask students to identify their anonymous choice. Offer an alternative participation route.'),('PROJECTOR','Use delayed reveal for sensitive items; do not display tiny subgroups.'),('AFTER','Close the room and follow the school-approved retention or deletion process.'),('TEACHER SEES','Joined count, response totals, distributions and aggregate summaries.'),('TEACHER DOES NOT SEE','Roster, person-to-answer mapping, individual profile, family result or literacy score.')]),
('How to read the room','Use distributions to open questions, not close them.',[
('DISTRIBUTION','Two opposing clusters can produce a misleading middle average.'),('COVERAGE','Do not interpret family or axis results when too little relevant content was answered.'),('COMPATIBILITY','Several families can fit at once. Compatibility is not identity or vote prediction.'),('MODE TENSION','THINK/FEEL/ACT differences are conversation signals, not proof of hypocrisy.'),('LITERACY','Accuracy can guide re-teaching because these items have evidence-backed answers.'),('REPORT','Prefer “suggests”, “was divided on” and “may need another explanation”.')])
]:
    story.extend([P('FACILITATION GUIDE','label'),P(title,'h1'),P(lead,'quote'),Spacer(1,5*mm)])
    cells=[full_card(a,b,MIST if i%2==0 else PAPER) for i,(a,b) in enumerate(blocks)]
    story.extend([Table([[cells[0],cells[1]],[cells[2],cells[3]],[cells[4],cells[5]]],colWidths=[86*mm,86*mm],rowHeights=[47*mm]*3,style=[('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),2)]),PageBreak()])

story.extend(section_page(4,'Print','Four practical tools designed to be photocopied, written on and used without exposing a student’s political position.',CYAN))
worksheet_page('Message microscope','Analyse a fictional or teacher-approved social post before deciding whether you agree.',[
('Claim','What does the message say happened or should happen?'),('Evidence','What proof is offered? What proof is missing?'),('Emotion','Which words try to create fear, anger, pride or hope?'),('Target','Who is blamed, praised or called “the real people”?'),('Check','Which second source could confirm or challenge the message?')])
worksheet_page('Fair disagreement canvas','Work alone first. Compare reasons without revealing anyone’s anonymous vote.',[
('Side A protects','Name the strongest value or concern behind the first position.'),('Side B protects','Name the strongest value or concern behind the second position.'),('Facts we need','What information would help us judge the trade-off?'),('Possible costs','What could each side lose if its preferred choice wins?'),('Could change a view','Write one reasonable condition, not a personal attack.')])
worksheet_page('Teacher room plan','Complete before opening a classroom. Keep the teacher key private and never collect student names.',[
('Purpose','What should students understand by the end?'),('Activity + age','Junior 10-13 / Youth 14-18 / literacy / guided / custom'),('Safeguard','Sensitive topic, alternative participation route and escalation contact'),('Projector','Live or delayed reveal? Why is this appropriate?'),('Close','How will students reflect privately and how will the room be closed?')])
worksheet_page('Private exit ticket','Students keep this sheet. Do not collect it unless the school has explicitly approved that process.',[
('I understand','One concept, value or reason I understand better.'),('I still wonder','One question that needs another explanation or source.'),('I can explain','One view, not necessarily my own, I can now explain fairly.'),('My next check','What will I verify before sharing or acting on a political claim?'),('Private note','Something I want to think about without discussing publicly.')])

story.extend(section_page(5,'Reference','Candidate wording for teacher review. Every card below represents one screen. Students never see two competing statements at once.',GOLD))
src=(ROOT/'lib'/'school-believe.ts').read_text()
junior_block=src.split('const juniorPairs',1)[1].split('export const schoolJuniorBeliefItems',1)[0]
junior=re.findall(r"\['([^']+)', '([^']+)'\]",junior_block)
junior_forms=[(i,side,text) for i,(a,b) in enumerate(junior,1) for side,text in [('A',a),('B',b)]]
for start in range(0,len(junior_forms),5):
    story.extend([P('JUNIOR WORDING REFERENCE','label'),P(f'Junior 16  /  statement forms {start+1}-{min(start+5,32)}','h1'),P('Each student receives one randomly selected direction per item. One statement appears on each screen.','small'),Spacer(1,4*mm)])
    for i,side,text in junior_forms[start:start+5]:
        story.extend([statement_card(f'J{i:02d}-{side}','ONE-SCREEN STATEMENT',text),Spacer(1,4*mm)])
    story.append(PageBreak())

youth_block=src.split('const youthPairs',1)[1].split('export const schoolYouthBeliefItems',1)[0]
constructs=re.findall(r"(?:^|\n)  '?([a-z-]+)'?: \{",youth_block)
pairsets=[]
for construct in constructs:
    marker=f"  '{construct}': {{" if '-' in construct else f"  {construct}: {{"
    block=youth_block.split(marker,1)[1].split('\n  },',1)[0]
    for mode,a,b in re.findall(r"(think|feel|act): \['([^']+)', '([^']+)'\]",block):
        pairsets.append((construct,mode,a,b))
youth_forms=[(i,construct,mode,side,text) for i,(construct,mode,a,b) in enumerate(pairsets,1) for side,text in [('A',a),('B',b)]]
for start in range(0,len(youth_forms),5):
    story.extend([P('YOUTH WORDING REFERENCE','label'),P(f'Youth Full 42  /  statement forms {start+1}-{min(start+5,84)}','h1'),P('Each student receives one randomly selected direction per item. One statement appears on each screen.','small'),Spacer(1,4*mm)])
    for i,construct,mode,side,text in youth_forms[start:start+5]:
        story.extend([statement_card(f'{i:02d}-{side}',f'{construct.replace("-"," ")}  /  {mode}',text),Spacer(1,4*mm)])
    story.append(PageBreak())

story.extend(section_page(6,'Validate','Engineering checks protect structure. Only cognitive interviews, accessibility testing and empirical comparison can establish whether the forms work for intended students.',CORAL))

story.extend([P('PILOT EVIDENCE','label'),P('What must be tested before launch','h1')])
check_rows=[
('Comprehension','Ask students to explain each side in their own words.'),('Neutrality','Check whether one side sounds kinder, smarter or more socially acceptable.'),('Reading load','Record skipped words, rereading, completion time and requests for help.'),('Construct match','Confirm that simpler wording still measures the intended trade-off.'),('Response behaviour','Review unsure, missing and extreme-response patterns by age.'),('Equivalence','Compare Youth candidate results with the adult form using an appropriate study design.'),('Accessibility','Test keyboard, screen reader, contrast, zoom, motion and mobile use.'),('Teacher usability','Observe setup, pacing, projector reveal and debrief without coaching.'),('Legal + privacy','Qualified review of lawful basis, notices, minimisation, retention, vendors and rights.')]
vt=Table([[P(str(i+1),'whitebold'),P(a,'h2'),P(b,'body')] for i,(a,b) in enumerate(check_rows)],colWidths=[14*mm,45*mm,117*mm],rowHeights=[19*mm]*9)
vt.setStyle(TableStyle([('BACKGROUND',(0,0),(0,-1),TEAL),('BACKGROUND',(1,0),(-1,-1),PAPER),('BOX',(0,0),(-1,-1),0.8,LINE),('INNERGRID',(0,0),(-1,-1),0.5,LINE),('VALIGN',(0,0),(-1,-1),'MIDDLE'),('PADDING',(0,0),(-1,-1),7)]))
story.extend([vt,Spacer(1,5*mm),P('<b>Boundary:</b> passing automated tests does not establish psychometric validity, age suitability or legal authorization.','small'),PageBreak()])

story.extend([P('TEACHER CHECKLIST','label'),P('Before, during and after','h1'),P('Print this page or keep it beside the teacher dashboard.','quote'),Spacer(1,7*mm)])
phases=[
('BEFORE CLASS',['Select the age band deliberately.','Check the goal and sensitive content.','Choose live or delayed reveal.','Prepare a non-digital alternative.','Explain anonymity and discussion rules.']),
('DURING CLASS',['Watch totals, not individuals.','Ask for reasons without asking who chose.','Show both sides fairly.','Pause when discussion becomes personal.','Separate preference from literacy.']),
('AFTER CLASS',['Close the room.','Use aggregate reporting only.','Record concepts needing follow-up.','Follow approved retention or deletion.','Report safeguarding or privacy incidents.'])]
phase_cards=[]
for title,items in phases:
    txt='<br/><br/>'.join('□  '+x for x in items)
    phase_cards.append(Table([[P(title,'whitebold')],[P(txt,'body')]],colWidths=[55*mm],rowHeights=[16*mm,108*mm],style=[('BACKGROUND',(0,0),(0,0),TEAL),('BACKGROUND',(0,1),(0,1),PAPER),('BOX',(0,0),(-1,-1),0.8,LINE),('PADDING',(0,0),(-1,-1),9),('VALIGN',(0,0),(-1,-1),'TOP')]))
story.extend([Table([[phase_cards[0],phase_cards[1],phase_cards[2]]],colWidths=[58.7*mm]*3,style=[('VALIGN',(0,0),(-1,-1),'TOP'),('PADDING',(0,0),(-1,-1),2)]),Spacer(1,8*mm),
              Table([[P('<b>REQUIRES QUALIFIED LEGAL REVIEW</b><br/>The aggregate-only design reduces risk. It does not remove duties relating to minors, political-opinion processing, safeguarding, accessibility or school authorization.','small')]],colWidths=[176*mm],style=[('BACKGROUND',(0,0),(-1,-1),CORAL),('TEXTCOLOR',(0,0),(-1,-1),WHITE),('PADDING',(0,0),(-1,-1),11)])])

OUT.parent.mkdir(parents=True, exist_ok=True)
doc.build(story,onFirstPage=page_frame,onLaterPages=page_frame)
print(OUT)
