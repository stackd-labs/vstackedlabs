import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'Services — Custom Systems & Automation | Stackd Studios',
  description:
    'Four focused services for owner-run businesses and founders — from a Systems Audit to an ongoing Operating Partner. Custom software and automation, built to run themselves.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/services',
  },
  openGraph: {
    title: 'Services — Custom Systems & Automation | Stackd Studios',
    description:
      'Four focused services for owner-run businesses and founders — from a Systems Audit to an ongoing Operating Partner. Custom software and automation, built to run themselves.',
    url: 'https://www.stackdstudiosai.com/services',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Services — Stackd Studios',
  url: 'https://www.stackdstudiosai.com/services',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Systems Audit',
      description:
        'A 48-hour written roadmap of the systems to build or automate in your business, with a 30-minute walkthrough call.',
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Build Sprint',
      description:
        'One specific workflow built, tested, and handed off in 5 business days with a training call.',
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Team Enablement',
      description:
        'Live virtual training built around your team and workflows. Standard (from $2,500, teams up to 10) or Enterprise (from $5,000, teams of 10+ with role-specific template libraries and async coaching follow-up).',
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Operating Partner',
      description:
        'Monthly build support: one new workflow, system tune-ups, a strategy call, and priority async support.',
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    },
    {
      '@type': 'Service',
      position: 5,
      name: 'Website Build',
      description:
        'Custom website builds from $1,800 to $3,000 — a high-converting landing page or a full site with a private admin portal (auth, database, bookings, payments).',
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
