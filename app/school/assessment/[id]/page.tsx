import AssessmentStudent from './AssessmentStudent';
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <AssessmentStudent id={id}/>;}
