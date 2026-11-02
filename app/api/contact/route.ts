import { createContactHandler } from '../../../lib/contact';
import { allowContact, contactConfigured, deliverContact } from '../../../lib/contact-delivery';

export const runtime='nodejs';
export const maxDuration=30;
export const POST=createContactHandler({configured:contactConfigured,allow:allowContact,deliver:deliverContact});
