// Terms of Service text. Shared by app/terms/page.tsx and the site search index.
// Legal wording: keep it plain, and bump UPDATED when the text changes.
import type { LegalSection } from '@/components/tech/LegalPage'

export const TERMS_UPDATED = 'October 8, 2026'

export const TERMS_INTRO =
  "Please read these Terms of Service carefully before using Stackd Studios AI's website or services. These Terms constitute a legally binding agreement between you and Hicks Virtual Solutions LLC, operating as Stackd Studios AI."

export const TERMS_SECTIONS: LegalSection[] = [
  {
    title: '1. Acceptance of Terms',
    body: [
      'By accessing or using the Stackd Studios AI website (stackdstudiosai.com) or purchasing any of our services or digital products, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.',
      'These Terms apply to all visitors, clients, customers, and others who access or use our services.',
    ],
  },
  {
    title: '2. Services',
    body: [
      'Stackd Studios AI, operated by Hicks Virtual Solutions LLC, provides software development and technology education services including but not limited to: technology training programs, courses, and cohorts; technical support, code review, and engineering consultation; software diagnostic, remediation, and completion services; custom software and web application development; system setup and automation; fractional, embedded, and augmented engineering services; venture strategy sessions; and digital product sales.',
      'All services are subject to a separate proposal, statement of work, or service agreement which, together with these Terms, governs the relationship between Stackd Studios AI and the client.',
      'Submitting a contact form, quote request, or application through our website does not create a contract or obligate either party. Work begins only after you accept a written quote, proposal, or statement of work. Submitting a career or affiliate application does not guarantee an engagement, employment, or acceptance into any program.',
    ],
  },
  {
    title: '3. Digital Products',
    body: [
      'All digital products sold through our store (including prompt packs, templates, courses, and skills) are delivered electronically. Due to the nature of digital goods, all sales are final and non-refundable unless otherwise stated at the time of purchase.',
      'Upon purchase, you are granted a personal, non-transferable, non-exclusive license to use the digital product for your own business purposes. You may not resell, redistribute, share, or sublicense any digital product purchased from Stackd Studios AI.',
      'Some digital products are living products, meaning they may be updated over time. Customers retain access to updates through their original purchase link at no additional cost.',
    ],
  },
  {
    title: '4. Payment Terms',
    body: [
      'All payments are processed securely through Stripe. By providing your payment information, you authorize us to charge the applicable fees for your selected services or products.',
      'For service engagements, payment terms will be outlined in your proposal or statement of work. Late payments may incur a 1.5% monthly late fee on outstanding balances.',
      'All prices are listed in US dollars. We reserve the right to update our pricing at any time.',
    ],
  },
  {
    title: '5. Refund Policy',
    body: [
      'Digital products: All sales are final. No refunds will be issued for digital downloads once access has been granted.',
      'Service engagements: Refund eligibility for service packages is determined by the terms outlined in your signed proposal or statement of work. Deposits are non-refundable unless Stackd Studios AI is unable to fulfill the agreed scope of work.',
      'If you believe there has been an error with your order, contact us at Chanel@stackdstudiosai.com within 7 days of purchase.',
    ],
  },
  {
    title: '6. Intellectual Property',
    body: [
      'All content on this website (including text, graphics, logos, design, code, and digital products) is the property of Stackd Studios AI / Hicks Virtual Solutions LLC and is protected by applicable intellectual property laws.',
      'Custom work created for clients becomes the property of the client upon full payment, unless otherwise specified in the signed agreement. Stackd Studios AI retains the right to display the work in its portfolio.',
      'Digital products purchased from our store are licensed, not sold. The underlying intellectual property remains the property of Stackd Studios AI.',
    ],
  },
  {
    title: '7. Client Responsibilities',
    body: [
      'Clients are responsible for providing accurate information, timely feedback, and any required access, assets, or approvals necessary to complete the project.',
      'Delays caused by the client may result in adjusted timelines. Stackd Studios AI is not liable for project delays caused by a client\'s failure to deliver required materials or approvals.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Stackd Studios AI and Hicks Virtual Solutions LLC shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services or digital products.',
      'Our total liability for any claim arising out of or related to these Terms shall not exceed the amount you paid to us in the 90 days preceding the claim.',
    ],
  },
  {
    title: '9. Confidentiality',
    body: [
      'Both parties agree to keep confidential any proprietary or sensitive information shared during the course of a service engagement. This obligation survives the termination of any project or agreement.',
    ],
  },
  {
    title: '10. Termination',
    body: [
      'Either party may terminate a service engagement with written notice as specified in the applicable agreement. Upon termination, the client is responsible for payment for all work completed up to the termination date.',
      'We reserve the right to suspend or terminate access to our website or digital products for any user who violates these Terms.',
    ],
  },
  {
    title: '11. Governing Law',
    body: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of the Commonwealth of Virginia, United States, without regard to its conflict of law provisions.',
      'Any disputes arising under these Terms shall be resolved through good-faith negotiation. If a resolution cannot be reached, disputes shall be submitted to binding arbitration in the state of Virginia.',
    ],
  },
  {
    title: '12. Changes to These Terms',
    body: [
      'We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with a revised "Last Updated" date. Continued use of our services after changes are posted constitutes your acceptance of the updated Terms.',
    ],
  },
  {
    title: '13. Contact Us',
    body: [
      'If you have any questions about these Terms of Service, please contact us at:',
      'Stackd Studios AI, Hicks Virtual Solutions LLC\nEmail: Chanel@stackdstudiosai.com\nWebsite: www.stackdstudiosai.com',
    ],
  },
]
