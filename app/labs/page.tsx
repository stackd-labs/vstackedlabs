import type { Metadata } from 'next'
import TechNav from '@/components/tech/TechNav'
import LabsContent from '@/components/tech/LabsContent'
import { TechFooter } from '@/components/tech/TechCTA'

const TITLE = 'Stackd Labs | Stackd Studios AI'
const DESCRIPTION =
  'Stackd Labs is where Stackd Studios AI builds its own products: Business Brain, Stackd Interactive games, and new SaaS, AI tools and experiments in development.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.stackdstudiosai.com/labs' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.stackdstudiosai.com/labs' },
}

export default function LabsPage() {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main>
        <LabsContent />
      </main>
      <TechFooter />
    </div>
  )
}
