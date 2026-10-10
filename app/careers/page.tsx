import type { Metadata } from 'next'
import TechNav from '@/components/tech/TechNav'
import CareersContent from '@/components/tech/CareersContent'
import { TechFooter } from '@/components/tech/TechCTA'

const TITLE = 'Careers at Stackd Studios AI: remote roles'
const DESCRIPTION =
  'Join Stackd Studios AI, a remote technology ecosystem. Contract, freelance, part-time and full-time roles for builders, designers and operators, plus an affiliate and creator program.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.stackdstudiosai.com/careers' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.stackdstudiosai.com/careers', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

export default function CareersPage() {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main>
        <CareersContent />
      </main>
      <TechFooter />
    </div>
  )
}
