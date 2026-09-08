import type { Metadata } from 'next'
import EcosystemContent from './EcosystemContent'
import { DIVISIONS } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'The Stackd Ecosystem — Learn it. Build it. Fix it. Scale it.',
  description:
    'Stackd is a software-building ecosystem, not an agency. Six divisions: Learn trains builders, Builders keeps them unstuck, Rescue fixes broken software, Build makes new software, Teams adds engineering capacity, Enterprise takes on the backlog.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/ecosystem',
  },
  openGraph: {
    title: 'The Stackd Ecosystem — Learn it. Build it. Fix it. Scale it.',
    description:
      'We help people build software, and companies ship it. Six divisions, one competency.',
    url: 'https://www.stackdstudiosai.com/ecosystem',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Stackd Ecosystem',
  description:
    'Six divisions covering the full arc of building software: training, builder support, rescue, new builds, team capacity, and enterprise augmentation.',
  url: 'https://www.stackdstudiosai.com/ecosystem',
  itemListElement: DIVISIONS.map((d, i) => ({
    '@type': 'Service',
    position: i + 1,
    name: d.eyebrow,
    description: `${d.promise} ${d.oneLiner}`,
    url: `https://www.stackdstudiosai.com/${d.slug}`,
    audience: { '@type': 'Audience', audienceType: d.customer },
    provider: { '@type': 'Organization', name: 'Stackd Studios' },
  })),
}

export default function EcosystemPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EcosystemContent />
    </>
  )
}
