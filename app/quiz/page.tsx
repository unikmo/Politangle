import Link from 'next/link';
import AssessmentHeader from '../AssessmentHeader';
import QuizClient from './QuizClient';

export default async function QuizPage({searchParams}:{searchParams:Promise<{age?:string}>}) {
  const {age} = await searchParams;
  if(age !== 'adult') {
    const isYoung = age === 'junior' || age === 'youth';
    return <main className="engine-page"><section className="engine-card" style={{maxWidth:720,margin:'64px auto',padding:32}}>
      <h1>{age === 'junior' ? 'Junior · 10–13' : age === 'youth' ? 'Youth · 14–17' : 'Choose your age group'}</h1>
      <p>{isYoung ? 'The age-specific questionnaire is not yet connected to this public assessment. We will not substitute adult questions.' : 'Select the version appropriate for your age before beginning.'}</p>
      <Link className="engine-primary-link" href="/quizzes">Choose a version →</Link>
    </section></main>;
  }
  return <main className="engine-page"><AssessmentHeader kind="quick" /><QuizClient /></main>;
}
