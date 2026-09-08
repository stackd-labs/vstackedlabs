import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'
import { DIVISIONS, allOffers } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Services — Every Stackd Offer in One Place',
  description:
    'Every service across all six Stackd divisions: builder training, engineering support, software rescue, custom builds, fractional teams, and enterprise capacity. Prices and turnarounds for each.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/services',
  },
  openGraph: {
    title: 'Services — Every Stackd Offer in One Place',
    description:
      'Six divisions, every offer, with prices and turnarounds. Learn it. Build it. Fix it. Scale it.',
    url: 'https://www.stackdstudiosai.com/services',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Services — Stackd Studios',
  description:
    'Every offer across the six Stackd divisions: Learn, Builders, Rescue, Build, Teams, and Enterprise.',
  url: 'https://www.stackdstudiosai.com/services',
  itemListElement: allOffers().map((offer, i) => ({
    '@type': 'Service',
    position: i + 1,
    name: offer.name,
    description: offer.pitch,
    category: offer.division.eyebrow,
    url: `https://www.stackdstudiosai.com/${offer.division.slug}#${offer.slug}`,
    audience: { '@type': 'Audience', audienceType: offer.division.customer },
    provider: { '@type': 'Organization', name: 'Stackd Studios' },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.stackdstudiosai.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://www.stackdstudiosai.com/services',
    },
    ...DIVISIONS.map((d, i) => ({
      '@type': 'ListItem',
      position: 3 + i,
      name: d.eyebrow,
      item: `https://www.stackdstudiosai.com/${d.slug}`,
    })),
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
