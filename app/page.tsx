import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Operations System Studio — Stackd Studios',
  description:
    'Stackd Studios is an operations system studio. We build the custom software and automations owner-run businesses run on — and launch products of our own. Solutions, automation, and venture studio in one.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com',
  },
  openGraph: {
    title: 'Operations System Studio — Stackd Studios',
    description:
      'Custom software and automations your business runs on. We build the systems you can’t buy off the shelf — and ship products of our own.',
    url: 'https://www.stackdstudiosai.com',
  },
}
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import TechStack from '@/components/TechStack'
import TracksHome from '@/components/TracksHome'
import HowItWorks from '@/components/HowItWorks'
import BusinessBrainTeaser from '@/components/BusinessBrainTeaser'
import OurWork from '@/components/OurWork'
import Testimonials from '@/components/Testimonials'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import ToolkitBanner from '@/components/ToolkitBanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <TechStack />
        <TracksHome />
        <ToolkitBanner variant="yellow" />
        <HowItWorks />
        <BusinessBrainTeaser />
        <OurWork />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
