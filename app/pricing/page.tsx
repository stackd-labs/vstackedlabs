import type { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'Pricing | Stackd Studios AI',
  description:
    'Flat, transparent pricing for our services — Systems Audit, Build Sprint, Team Enablement, Operating Partner, and Business Brain. No hidden fees, no surprises.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/pricing',
  },
  openGraph: {
    title: 'Pricing | Stackd Studios AI',
    description:
      'Flat pricing for the Systems Audit, Build Sprint, Team Enablement, Operating Partner, and Business Brain. The price you see is the price we scope to.',
    url: 'https://www.stackdstudiosai.com/pricing',
  },
}

export default function PricingPage() {
  return <PricingContent />
}
