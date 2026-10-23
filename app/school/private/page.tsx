import type {Metadata} from 'next';
export const metadata:Metadata={robots:{index:false,follow:false}};
import SchoolPilotLocked from '../SchoolPilotLocked';
import {schoolStudentPilotEnabled} from '../../../lib/school-release';
import PrivateStudentClient from './PrivateStudentClient';
export default function SchoolPrivatePage(){
 return schoolStudentPilotEnabled()?<PrivateStudentClient/>:<SchoolPilotLocked/>;
}
