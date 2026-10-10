import type { Metadata } from 'next'
import TechNav from '@/components/tech/TechNav'
import AboutContent from '@/components/tech/AboutContent'
import { TechFooter } from '@/components/tech/TechCTA'

const TITLE = 'About Stackd Studios AI'
const DESCRIPTION =
  'Stackd Studios AI is a technology ecosystem. We build software for clients, rescue apps that broke, train and verify technical talent, connect people with work, and build products of our own.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.stackdstudiosai.com/about' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.stackdstudiosai.com/about', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

export default function AboutPage() {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main>
        <AboutContent />
      </main>
      <TechFooter />
    </div>
  )
}
