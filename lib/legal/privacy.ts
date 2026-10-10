// Privacy Policy text. Shared by app/privacy/page.tsx and the site search index.
// Legal wording: keep it plain, and bump UPDATED when the text changes.
import type { LegalSection } from '@/components/tech/LegalPage'

export const PRIVACY_UPDATED = 'October 8, 2026'

export const PRIVACY_INTRO =
  'Stackd Studios AI, operated by Hicks Virtual Solutions LLC (“we,” “us,” or “our”), is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website at stackdstudiosai.com or use our services.'

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect information you provide directly to us, including when you submit one of our website forms (our contact form, quote requests, career and affiliate applications, and the Labs waitlist), talk with us about a project, purchase a product, or sign up for our newsletter.',
      'This may include: your name, email address, business name, phone number, and payment information (processed securely by Stripe). Depending on the form, it may also include details about your project (such as app or website links, repository links, your technology stack, known issues, and the access you are willing to provide) or, for applications, professional details (such as your role, skills, portfolio, GitHub and LinkedIn links, availability, and rate expectations), along with any other information you choose to provide.',
      'Our website forms use automated spam screening, such as checking how quickly a form was completed and screening certain fields for links. Submissions identified as spam are discarded and not stored.',
      'The search tool on our website runs entirely in your browser. What you type into it is not sent to us or stored.',
      'We also automatically collect certain technical information when you visit our website, including IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected via standard server logs and analytics tools.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'We use the information we collect to: review and respond to your requests and route them to the right team, prepare quotes and proposals, review applications and verify the skills applicants share with us, fulfill your orders and deliver digital products, communicate with you about your project or inquiry, send transactional emails related to your purchase, respond to your questions and support requests, send marketing communications (only with your consent), and improve our website and services.',
      'We do not sell, rent, or trade your personal information to third parties.',
    ],
  },
  {
    title: '3. Payment Processing',
    body: [
      'All payments are processed by Stripe, Inc. We do not store your credit card number or full payment details on our servers. Stripe\'s privacy policy governs the handling of your payment data and is available at stripe.com/privacy.',
    ],
  },
  {
    title: '4. Email Communications',
    body: [
      'When you purchase a product or submit a form, we may send you transactional emails related to your order or inquiry. If you opt in to our newsletter, we will send you periodic updates about new products, services, and content.',
      'You may unsubscribe from marketing emails at any time by clicking the unsubscribe link in any email or by contacting us directly at Chanel@stackdstudiosai.com.',
    ],
  },
  {
    title: '5. Cookies and Tracking',
    body: [
      'Our website may use cookies and similar tracking technologies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.',
      'We may use third-party analytics services (such as Google Analytics or Vercel Analytics) to understand how visitors use our site. These services may collect data in accordance with their own privacy policies.',
    ],
  },
  {
    title: '6. Data Retention',
    body: [
      'We retain your personal information for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.',
      'You may request deletion of your personal data at any time by contacting us at Chanel@stackdstudiosai.com.',
    ],
  },
  {
    title: '7. Third-Party Services',
    body: [
      'Our website integrates with third-party services including Stripe (payments), Resend (transactional email), Supabase (secure database storage for form submissions and orders), and Vercel (hosting). Each of these services operates under its own privacy policy, and we encourage you to review them.',
      'We are not responsible for the privacy practices of third-party services linked from our website.',
    ],
  },
  {
    title: '8. Children\'s Privacy',
    body: [
      'Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.',
    ],
  },
  {
    title: '9. Security',
    body: [
      'We take reasonable technical and organizational measures to protect your personal information from unauthorized access, loss, or misuse. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: '10. Your Rights',
    body: [
      'Depending on your location, you may have the right to access, correct, delete, or restrict the processing of your personal data. To exercise any of these rights, contact us at Chanel@stackdstudiosai.com and we will respond within a reasonable timeframe.',
    ],
  },
  {
    title: '11. Changes to This Policy',
    body: [
      'We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.',
    ],
  },
  {
    title: '12. Contact Us',
    body: [
      'If you have any questions about this Privacy Policy or how we handle your data, please contact us at:',
      'Stackd Studios AI, Hicks Virtual Solutions LLC\nEmail: Chanel@stackdstudiosai.com\nWebsite: www.stackdstudiosai.com',
    ],
  },
]
