import type { Metadata } from 'next'
import LegalPage from '@/components/tech/LegalPage'
import { PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_UPDATED } from '@/lib/legal/privacy'

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | Stackd Studios AI' },
  description: 'Privacy Policy for Stackd Studios AI, a Hicks Virtual Solutions LLC company.',
  alternates: { canonical: 'https://www.stackdstudiosai.com/privacy' },
}

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" file="privacy.md" updated={PRIVACY_UPDATED} intro={PRIVACY_INTRO} sections={PRIVACY_SECTIONS} />
}
