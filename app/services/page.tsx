import type { Metadata } from 'next'
import TechNav from '@/components/tech/TechNav'
import ServicesContent from '@/components/tech/ServicesContent'
import { TechFooter } from '@/components/tech/TechCTA'

const TITLE = 'Services | Stackd Studios AI'
const DESCRIPTION =
  'Software builds, app rescue, technical talent and training from Stackd Studios AI. Every project is scoped to fit, with a fair, clear quote before work starts.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.stackdstudiosai.com/services' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.stackdstudiosai.com/services' },
}

export default function ServicesPage() {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main>
        <ServicesContent />
      </main>
      <TechFooter />
    </div>
  )
}
