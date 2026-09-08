import type { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing | Stackd Studios AI',
  description:
    'Flat, transparent pricing across all six Stackd divisions: builder training, engineering support, software rescue, custom builds, fractional teams, and enterprise capacity. No hidden fees.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/pricing',
  },
  openGraph: {
    title: 'Pricing | Stackd Studios AI',
    description:
      'Real prices for every offer in Learn, Builders, Rescue, Build, Teams, and Enterprise. The price you see is the price we scope to.',
    url: 'https://www.stackdstudiosai.com/pricing',
  },
}

export default function PricingPage() {
  return <PricingContent />
}
