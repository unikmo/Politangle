import { createHmac } from 'node:crypto';
import nodemailer from 'nodemailer';
import { getAdminDb } from './firebase-admin';
import type { ContactEnquiry } from './contact';

// These variables are server-only. Never use NEXT_PUBLIC_ for delivery settings.
function config() {
  return {
    user:process.env.CONTACT_GMAIL_USER?.trim() || '',
    password:process.env.CONTACT_GMAIL_APP_PASSWORD?.replace(/\s/g,'') || '',
    to:process.env.CONTACT_TO_EMAIL?.trim() || '',
  };
}
const validEmail=(value:string)=>/^[^\s@<>\r\n]+@[^\s@<>\r\n]+\.[^\s@<>\r\n]+$/.test(value);
export function contactConfigured() {
  const c=config();
  return validEmail(c.user) && validEmail(c.to) && !!c.password;
}

export async function allowContact(request:Request) {
  const c=config();
  // On Vercel this header is supplied by the platform, rather than a client-supplied chain.
  // Other deployments use one shared bucket unless a trusted proxy is configured.
  const ip=process.env.VERCEL==='1' ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0].trim() || 'unknown' : 'shared';
  const identity=createHmac('sha256',c.password).update('contact-rate-v1\0'+ip).digest('hex');
  const now=Date.now(), hour=Math.floor(now/3600000), day=Math.floor(now/86400000);
  const db=getAdminDb();
  const perSource=db.collection('contactRateLimits').doc(`source-${identity}`);
  const global=db.collection('contactRateLimits').doc('daily');
  return db.runTransaction(async tx=>{
    const [sourceDoc,globalDoc]=await Promise.all([tx.get(perSource),tx.get(global)]);
    const source=sourceDoc.data(), total=globalDoc.data();
    const sourceCount=source?.window===hour ? Number(source.count)||0 : 0;
    const dailyCount=total?.window===day ? Number(total.count)||0 : 0;
    if (sourceCount>=5 || dailyCount>=50) return false;
    const expiresAt=new Date(now+2*86400000);
    tx.set(perSource,{window:hour,count:sourceCount+1,expiresAt});
    tx.set(global,{window:day,count:dailyCount+1,expiresAt});
    return true;
  });
}

export async function deliverContact(enquiry:ContactEnquiry) {
  const c=config();
  const transport=nodemailer.createTransport({
    host:'smtp.gmail.com',port:465,secure:true,
    auth:{user:c.user,pass:c.password},
    connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000,
    disableFileAccess:true,disableUrlAccess:true,
  });
  // Send only to the fixed private inbox; visitor input can never choose a recipient.
  // No autoresponse: the form cannot be used to email third parties.
  const result=await transport.sendMail({
    from:{name:'Politangle contact form',address:c.user},
    to:c.to, replyTo:{name:enquiry.name,address:enquiry.email},
    subject:`Politangle enquiry: ${enquiry.subject}`,
    text:`Name: ${enquiry.name}\nReply address: ${enquiry.email}\nLanguage: ${enquiry.locale}\nTopic: ${enquiry.subject}\n\n${enquiry.message}`,
  });
  if (!result.accepted?.length || result.rejected?.length) throw new Error('Delivery not accepted');
}
