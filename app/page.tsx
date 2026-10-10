import type { Metadata } from 'next'
import TechNav from '@/components/tech/TechNav'
import TechHero from '@/components/tech/TechHero'
import StackTicker from '@/components/tech/StackTicker'
import CommandPalette from '@/components/tech/CommandPalette'
import DivisionMatrix from '@/components/tech/DivisionMatrix'
import Diagnostics from '@/components/tech/Diagnostics'
import Pipeline from '@/components/tech/Pipeline'
import { TechCTA, TechFooter } from '@/components/tech/TechCTA'
import { TAGLINE_TEXT } from '@/components/tech/data'

const TITLE = `Stackd Studios AI: ${TAGLINE_TEXT}`
const DESCRIPTION =
  'Stackd is a technology ecosystem. We build software for clients, rescue apps that broke, train and verify technical talent, connect people with work, and build products of our own.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.stackdstudiosai.com' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: 'https://www.stackdstudiosai.com' },
}

export default function HomePage() {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main>
        <TechHero />
        <StackTicker />
        <CommandPalette />
        <DivisionMatrix />
        <Diagnostics />
        <Pipeline />
        <TechCTA />
      </main>
      <TechFooter />
    </div>
  )
}
