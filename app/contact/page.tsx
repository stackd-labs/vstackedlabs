import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Book a Free 15-Minute Chat',
  description:
    "Book a free 15-minute chat with Stackd Studios AI. Tell us where you are and we'll name the division and the offer that fits, or tell you honestly that we are not the right team.",
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/contact',
  },
  openGraph: {
    title: 'Book a Free 15-Minute Chat — Stackd Studios AI',
    description:
      "Free 15-minute chat. We'll work out which of the six divisions you belong in, and what it costs.",
    url: 'https://www.stackdstudiosai.com/contact',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stackd Studios AI',
  url: 'https://www.stackdstudiosai.com',
  email: 'Chanel@stackdstudiosai.com',
  areaServed: 'US',
  serviceType: 'AI Automation & Venture Studio',
  priceRange: '$$',
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  )
}
