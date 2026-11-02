# Contact form delivery

The contact form posts to the site's own `/api/contact` route. It does not use Netlify Forms, mailto links, or a public third-party form endpoint. The private receiving address must never be committed, put in a `NEXT_PUBLIC_` variable, or included in a client component.

## Private production configuration

Configure these server-only variables in the deployment project's environment settings:

- `CONTACT_TO_EMAIL`: the private receiving inbox agreed with the founder.
- `CONTACT_GMAIL_USER`: the Gmail account authorised to send the notification, normally the same account.
- `CONTACT_GMAIL_APP_PASSWORD`: a Google app password for that account. Do not use its normal account password. Google requires 2-Step Verification and some account security policies may prevent app passwords.
- Existing Firebase Admin credentials: used for a persistent abuse budget, not for storing enquiries.

No custom-domain mailbox or paid email provider is required for this low-volume setup. Gmail account sending limits still apply. The address supplied by the founder belongs only in private environment settings. Keep `NEXT_PUBLIC_CONTACT_EMAIL` empty while the address should remain private.

The SMTP connection uses Gmail with TLS on port 465. Notifications go only to the configured fixed inbox. The visitor address is used for Reply-To; no autoresponder is sent. The HTTP response contains no recipient, SMTP details or credentials. Success means Gmail accepted the notification, not proof of final inbox delivery.

Rate limiting uses the existing Firestore connection: five requests per source per hour and fifty across the whole site per day. Failed delivery attempts consume budget too. Rate records contain a keyed hash and counters, not raw IP addresses or enquiry content. Only trust Vercel's platform IP header on Vercel; other hosts share a single source budget until a trusted proxy adapter is configured. Configure Firestore TTL on `contactRateLimits.expiresAt` to remove inactive source records, and ensure client security rules deny access to this collection. The global record is reused. No enquiry content is stored in Firestore by this route.

## Before production activation

1. Set private environment variables through the host's secure UI; never paste an app password into chat, source control, or public build logs.
2. Confirm Firebase Admin access and restrictive Firestore client rules, and configure rate-record TTL.
3. Deploy the reviewed change, then submit one clearly marked test message with the founder's permission.
4. Confirm the message arrives in the receiving inbox and that Reply-To identifies the test sender. Check that the private recipient is absent from page HTML, JavaScript, URLs and network responses.
5. Test failed delivery with a preview-only configuration: the form must show an error, never a success banner.

Until credentials and delivery are verified, deployment readiness remains incomplete. The endpoint returns 503 if mail delivery is not configured; it cannot silently claim a message was received.

References: https://support.google.com/mail/answer/185833 and https://nodemailer.com/smtp.
