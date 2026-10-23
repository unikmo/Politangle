import type { Metadata } from 'next';
import { SiteHeader, SiteFooter } from '../../SiteChrome';
import PilotRequestForm from './PilotRequestForm';

export const metadata: Metadata = {
 title: 'Request School Pilot Participation | Politangle',
 description: 'Schools and educators can request participation in a controlled Politangle educational pilot. Access is by reviewed invitation only.',
 alternates:{canonical:'/school/pilot'},
 robots:{index:true,follow:true}
};
export default function SchoolPilotPage(){
 return <main className="home school-public-page school-pilot-request-page">
  <SiteHeader />
  <div className="p-shell school-pilot-shell"><PilotRequestForm /></div>
  <SiteFooter />
 </main>;
}
