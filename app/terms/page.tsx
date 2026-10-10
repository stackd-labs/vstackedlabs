import type { Metadata } from 'next'
import LegalPage from '@/components/tech/LegalPage'
import { TERMS_INTRO, TERMS_SECTIONS, TERMS_UPDATED } from '@/lib/legal/terms'

export const metadata: Metadata = {
  title: { absolute: 'Terms of Service | Stackd Studios AI' },
  description: 'Terms of Service for Stackd Studios AI, a Hicks Virtual Solutions LLC company.',
  alternates: { canonical: 'https://www.stackdstudiosai.com/terms' },
}

export default function TermsPage() {
  return <LegalPage title="Terms of Service" file="terms.md" updated={TERMS_UPDATED} intro={TERMS_INTRO} sections={TERMS_SECTIONS} />
}
