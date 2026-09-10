export type SchoolLessonId =
  | 'room-stand'
  | 'families-without-stereotypes'
  | 'think-feel-act'
  | 'quick26-lab'
  | 'full42-lab'
  | 'democracy-pluralism-populism'
  | 'junior-social-media'
  | 'junior-power-and-fairness';

export type SchoolLesson = {
  id: SchoolLessonId;
  title: string;
  ageBand: string;
  duration: string;
  goals: readonly string[];
  questionIds: readonly string[];
  timeline: readonly { minutes: string; teacher: string; students: string }[];
  discussionPrompts: readonly string[];
  followUp: string;
};

export const schoolLessons: readonly SchoolLesson[] = [
  {
    id: 'junior-social-media',
    title: 'Who is trying to influence me?',
    ageBand: '10–13',
    duration: '45 min',
    goals: ['Recognise emotional political messages without assuming they are false.', 'Separate evidence from blame and simplistic us-versus-them stories.', 'Pause before sharing content designed to create anger or fear.'],
    questionIds: ['J10', 'J16', 'U1', 'U3'],
    timeline: [
      { minutes: '0–8', teacher: 'Show two fictional social posts: one gives evidence and one mainly triggers anger.', students: 'Identify words designed to create an immediate reaction.' },
      { minutes: '8–22', teacher: 'Run the Junior political-influence questions anonymously.', students: 'Answer without revealing their individual choices.' },
      { minutes: '22–35', teacher: 'Teach claim, evidence, emotion and scapegoat as four separate features.', students: 'Sort fictional statements and explain what evidence would be needed.' },
      { minutes: '35–45', teacher: 'Use the pause-check-compare routine.', students: 'Rewrite one manipulative post as a fair, checkable claim.' },
    ],
    discussionPrompts: ['Can a message be emotional and still true?', 'Why is blaming one group attractive when a problem is complicated?', 'What would make a source trustworthy?'],
    followUp: 'Power, fairness and disagreement',
  },
  {
    id: 'junior-power-and-fairness',
    title: 'Power, fairness and disagreement',
    ageBand: '10–13',
    duration: '45 min',
    goals: ['Understand that elections and limits on power work together.', 'See that reasonable people can value freedom, safety and fairness differently.', 'Practise describing both sides without insults or labels.'],
    questionIds: ['J01', 'J02', 'J06', 'J07', 'J14', 'J15'],
    timeline: [
      { minutes: '0–8', teacher: 'Explain anonymity and that perspective questions do not have one correct answer.', students: 'Join and practise using the five-position scale.' },
      { minutes: '8–28', teacher: 'Run six Junior questions and pause on split distributions.', students: 'Give the strongest fair reason for each side.' },
      { minutes: '28–38', teacher: 'Explain why elected power still needs rules and independent checks.', students: 'Design one rule that limits a fictional student council fairly.' },
      { minutes: '38–45', teacher: 'Review the distribution without naming a class ideology.', students: 'Write one view they understand better, even if they disagree.' },
    ],
    discussionPrompts: ['When can safety justify limiting freedom?', 'Why might a majority still need rules?', 'Is fairness always the same as giving everyone the same thing?'],
    followUp: 'Who is trying to influence me?',
  },
  {
    id: 'room-stand',
    title: 'Where does our room stand?',
    ageBand: '14–18',
    duration: '45 min',
    goals: ['Experience anonymous disagreement without turning it into personal conflict.', 'Distinguish a class distribution from an individual political identity.', 'Practise explaining why reasonable people may prioritize different values.'],
    questionIds: ['T01', 'T03', 'T04', 'T07', 'T08', 'T09', 'T12'],
    timeline: [
      { minutes: '0–5', teacher: 'Open the anonymous room and explain the privacy rule.', students: 'Join by room code and read the anonymity notice.' },
      { minutes: '5–25', teacher: 'Launch the seven perspective questions and pause on divided results.', students: 'Answer, compare the room distribution and listen to competing reasons.' },
      { minutes: '25–40', teacher: 'Use the discussion prompts; invite reasons rather than party labels.', students: 'Explain a reason for one side and then a reason someone might choose the other.' },
      { minutes: '40–45', teacher: 'Review the class summary and identify one question for a future lesson.', students: 'Write one thing they learned about disagreement.' },
    ],
    discussionPrompts: ['What value is each side trying to protect?', 'What information could reasonably change someone’s answer?', 'Does a 50/50 class mean the class is politically centrist? Why not?'],
    followUp: 'Political families without stereotypes',
  },
  {
    id: 'families-without-stereotypes',
    title: 'Political families without stereotypes',
    ageBand: '14–18',
    duration: '60 min',
    goals: ['Distinguish Liberalism, Conservatism, Social democracy, Socialism and Green politics.', 'Separate broad political families from cross-cutting concepts such as Nationalism and Populism.', 'Avoid treating welfare, patriotism or one policy position as a complete ideology label.'],
    questionIds: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'U1', 'U2', 'U5', 'U6'],
    timeline: [
      { minutes: '0–10', teacher: 'Introduce the five broad families and the idea of cross-cutting concepts.', students: 'Note one thing they already associate with each family.' },
      { minutes: '10–35', teacher: 'Run CLASSIFY questions and reveal the evidence-backed explanation after each.', students: 'Vote anonymously and compare the class answer distribution.' },
      { minutes: '35–50', teacher: 'Run UNDERSTAND questions that target common misconceptions.', students: 'Explain why the tempting wrong answer is incomplete.' },
      { minutes: '50–60', teacher: 'Review the most-missed concepts in the class summary.', students: 'Correct one misconception in their own words.' },
    ],
    discussionPrompts: ['Why does universal healthcare not by itself make a system socialist?', 'Why can nationalism attach to more than one economic ideology?', 'Which differences between political families are about ownership, and which are about social values or political institutions?'],
    followUp: 'Quick 26 classroom lab',
  },
  {
    id: 'think-feel-act',
    title: 'Think, Feel, Act',
    ageBand: '14–18',
    duration: '60 min',
    goals: ['Understand the difference between stated belief, emotional reaction and intended choice.', 'Recognize tension without treating it as hypocrisy.', 'Compare the same political construct across THINK, FEEL and ACT.'],
    questionIds: ['T03', 'F03', 'A03', 'T07', 'F07', 'A07', 'T08', 'F08', 'A08', 'T12', 'F12', 'A12'],
    timeline: [
      { minutes: '0–10', teacher: 'Explain THINK, FEEL and ACT using a neutral non-political example.', students: 'Identify how a belief, reaction and intended action can differ.' },
      { minutes: '10–40', teacher: 'Run four complete construct triplets.', students: 'Answer each item anonymously and compare the room distributions.' },
      { minutes: '40–55', teacher: 'Open the aggregate mode comparison and discuss the largest class-level tensions.', students: 'Suggest reasons why feeling and intended action can differ from a stated principle.' },
      { minutes: '55–60', teacher: 'Summarize that ACT is stated intention, not observed behavior.', students: 'Record one example of a legitimate tension.' },
    ],
    discussionPrompts: ['When might someone support a principle but choose differently in a concrete situation?', 'Why is tension not the same as hypocrisy?', 'Which mode is most sensitive to context?'],
    followUp: 'Full 42 profile lab',
  },
  {
    id: 'quick26-lab',
    title: 'Quick 26 classroom lab',
    ageBand: '14–18',
    duration: '60–75 min',
    goals: ['Explore a multidimensional political landscape without forcing one party label.', 'Read distributions as well as averages.', 'Identify where the room has consensus and where it is genuinely divided.'],
    questionIds: [],
    timeline: [
      { minutes: '0–8', teacher: 'Explain anonymity, the five-position scale and that there are no correct BELIEVE answers.', students: 'Join and test the response scale.' },
      { minutes: '8–35', teacher: 'Run Quick 26 teacher-paced or student-paced.', students: 'Complete all 26 Quick questions anonymously.' },
      { minutes: '50–65', teacher: 'Review the class map, family compatibility and divided/consensus items.', students: 'Interpret at least one distribution before looking at its average.' },
      { minutes: '65–75', teacher: 'Optional discussion or private self-exploration.', students: 'Choose one result they would like to understand better.' },
    ],
    discussionPrompts: ['Where does an average hide a split class?', 'Which two dimensions seem least related in our room?', 'Why can several political families fit the same room at once?'],
    followUp: 'Full 42 profile lab',
  },
  {
    id: 'full42-lab',
    title: 'Full 42 profile lab',
    ageBand: '14–18',
    duration: '60–75 min',
    goals: ['Complete all 14 constructs across THINK, FEEL and ACT.', 'Compare the room’s multidimensional political shape with its five broad family compatibilities.', 'Use class-level tension as a discussion tool rather than an individual diagnosis.'],
    questionIds: [],
    timeline: [
      { minutes: '0–8', teacher: 'Set up the room and review the anonymity rule.', students: 'Join and prepare to answer all 42 questions.' },
      { minutes: '8–42', teacher: 'Run or release the 42-question activity.', students: 'Complete the full questionnaire anonymously.' },
      { minutes: '42–62', teacher: 'Review polygon, family compatibility and THINK/FEEL/ACT summaries.', students: 'Interpret the room-level patterns.' },
      { minutes: '62–75', teacher: 'Use one high-tension construct for structured discussion.', students: 'Offer competing explanations for the class pattern.' },
    ],
    discussionPrompts: ['Which class-level result is most surprising and why?', 'Which family compatibilities overlap rather than compete?', 'Where do THINK, FEEL and ACT move together, and where do they separate?'],
    followUp: 'Democracy, pluralism and populism',
  },
  {
    id: 'democracy-pluralism-populism',
    title: 'Democracy, pluralism and populism',
    ageBand: '14–18',
    duration: '45–60 min',
    goals: ['Distinguish elections from the wider idea of liberal-democratic constraints.', 'Distinguish populism from authoritarianism.', 'Understand why disagreement among legitimate interests matters to pluralism.'],
    questionIds: ['T08', 'F08', 'A08', 'T11', 'F11', 'A11', 'U1', 'U3', 'U4'],
    timeline: [
      { minutes: '0–10', teacher: 'Introduce elections, checks and pluralism as related but distinct ideas.', students: 'Give examples of institutions that can constrain elected power.' },
      { minutes: '10–30', teacher: 'Run pluralism and political-influence BELIEVE triplets.', students: 'Answer anonymously and inspect the distributions.' },
      { minutes: '30–45', teacher: 'Run the literacy questions and reveal explanations.', students: 'Distinguish anti-establishment or ordinary-voter framing from weakening democratic checks.' },
      { minutes: '45–60', teacher: 'Optional structured controversy discussion.', students: 'State the strongest argument for both institutional checks and democratic responsiveness.' },
    ],
    discussionPrompts: ['Can someone be populist and still support strong democratic checks?', 'Can someone favor stronger executive authority without being populist?', 'Why can unelected institutions be both a safeguard and a source of democratic tension?'],
    followUp: 'Private or classroom Full 42 exploration',
  },
] as const;

export function getSchoolLesson(id: string | undefined) {
  return schoolLessons.find((lesson) => lesson.id === id) ?? null;
}
