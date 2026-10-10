import type { Metadata } from 'next'
import LegalPage from '@/components/tech/LegalPage'

export const metadata: Metadata = { title: 'Accessibility' }

export default function AccessibilityPage() {
  return <LegalPage title="Website Accessibility" file="accessibility" updated="October 10, 2026"
    intro="We want everyone to be able to explore Stackd Studios AI and contact our team. We are working to improve the accessibility of our website."
    sections={[
      { title: '1. Our approach', body: ['We use the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA as our accessibility target. Our work includes keyboard navigation, readable contrast, clear labels, and support for reduced motion. This statement is not a claim that every page or feature fully meets that standard.'] },
      { title: '2. Help using this site', body: ['If you encounter a barrier or need information in another format, email Chanel@stackdstudiosai.com. Please tell us which page or feature you were using and what prevented you from completing your task. You may also tell us which browser or assistive technology you use. Please do not include passwords or payment details.'] },
      { title: '3. Ongoing improvements', body: ['We review accessibility as the site changes. Automated checks do not cover every experience, and we welcome feedback from people who use assistive technology. Services linked from our website may have separate accessibility practices.'] },
    ]} />
}
