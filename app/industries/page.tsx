// app/industries/page.tsx
import type { Metadata } from 'next'
import IndustriesContent from './IndustriesContent'

export const metadata: Metadata = {
  title: 'Industries We Serve — Systems Built for Your World',
  description:
    'Stackd Studios builds done-for-you systems and automation for behavioral health practices, dance studios, real estate, staffing, government, nonprofits, creators, field services, and more.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/industries',
  },
  openGraph: {
    title: 'Industries We Serve — Stackd Studios AI',
    description:
      'Custom systems and automation for behavioral health, real estate, staffing, creators, nonprofits, and more. We speak your industry.',
    url: 'https://www.stackdstudiosai.com/industries',
  },
}

export default function IndustriesPage() {
  return <IndustriesContent />
}
