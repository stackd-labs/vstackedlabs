import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import DivisionGrid from '@/components/ecosystem/DivisionGrid'
import EntryPoints from '@/components/ecosystem/EntryPoints'
import Flywheel from '@/components/ecosystem/Flywheel'
import AiStance from '@/components/ecosystem/AiStance'
import OurWork from '@/components/OurWork'
import BusinessBrainTeaser from '@/components/BusinessBrainTeaser'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import ToolkitBanner from '@/components/ToolkitBanner'

export const metadata: Metadata = {
  title: 'Stackd Studios — We help people build software, and companies ship it',
  description:
    'Stackd is a software-building ecosystem. We train builders, support the ones already building, rescue software that broke, build what does not exist yet, and give companies engineering capacity. Learn it. Build it. Fix it. Scale it.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com',
  },
  openGraph: {
    title: 'Stackd Studios — We help people build software, and companies ship it',
    description:
      'Six divisions, one competency: Learn, Builders, Rescue, Build, Teams, Enterprise. Learn it. Build it. Fix it. Scale it.',
    url: 'https://www.stackdstudiosai.com',
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DivisionGrid />
        <Stats />
        <EntryPoints bg="cream" />
        <ToolkitBanner variant="yellow" />
        <Flywheel />
        <AiStance />
        <OurWork />
        <BusinessBrainTeaser />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
