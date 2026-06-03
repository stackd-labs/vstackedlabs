import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Business Brain — Your Custom Knowledge System',
  description:
    'Business Brain is your always-on knowledge system trained on your business. Ask questions, get answers, and make smarter decisions faster — built by Stackd Studios.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/business-brain',
  },
  openGraph: {
    title: 'Business Brain — Your Custom Knowledge System',
    description:
      'An always-on knowledge system trained on your business. Ask questions, get instant answers.',
    url: 'https://www.stackdstudiosai.com/business-brain',
  },
}

const bbSteps = [
  {
    number: '01',
    label: 'Collect',
    description:
      'We gather all your operational docs — handbooks, SOPs, menus, forms, vendor contacts, and training guides.',
  },
  {
    number: '02',
    label: 'Build',
    description:
      "We build your custom private knowledge system, trained only on your business's knowledge.",
  },
  {
    number: '03',
    label: 'Deploy',
    description:
      'Your team gets a simple chat link — no installs, no logins, no learning curve.',
  },
  {
    number: '04',
    label: 'Maintain',
    description:
      'We review and update your AI monthly to keep it accurate as your business evolves.',
  },
]

const bbNiches = [
  {
    industry: 'Restaurants',
    pain: 'Staff always asking about allergens, specials, and prep procedures.',
    solution: 'Instant answers from your own menu and kitchen SOPs.',
  },
  {
    industry: 'Gyms',
    pain: 'Members and staff asking about class schedules, memberships, and policies.',
    solution: '24/7 knowledge base for front desk and floor staff.',
  },
  {
    industry: 'Salons & Spas',
    pain: 'Inconsistent service info, pricing confusion, and booking questions.',
    solution: 'One source of truth for services, pricing, and protocols.',
  },
  {
    industry: 'Retail Stores',
    pain: 'Product questions, return policies, and vendor info scattered across docs.',
    solution: 'Staff gets answers in seconds, not after hunting through binders.',
  },
  {
    industry: 'Hotels',
    pain: 'Guest services, amenities, and local info spread across staff inboxes.',
    solution: 'A concierge-grade AI your front desk can actually trust.',
  },
  {
    industry: 'Medical & Dental Offices',
    pain: 'Compliance docs, intake forms, and billing FAQs buried in folders.',
    solution: 'Fast, accurate answers for staff without touching patient records.',
  },
]

const bbPricing = [
  {
    name: 'Starter',
    setup: '$500',
    monthly: '$149/mo',
    popular: false,
    bestFor: 'Small teams with a single location and a core set of docs.',
  },
  {
    name: 'Pro',
    setup: '$1,500',
    monthly: '$349/mo',
    popular: true,
    bestFor: 'Growing businesses with multiple departments or locations.',
  },
  {
    name: 'Enterprise',
    setup: '$3,000+',
    monthly: '$600+/mo',
    popular: false,
    bestFor: 'Multi-location operations needing advanced customization and SLAs.',
  },
]

export default function BusinessBrainPage() {
  return (
    <>
      <Navbar darkHero />
      <main className="bg-[#F6F4EF]">

        {/* Hero */}
        <section className="pt-32 pb-20 bg-[#0C0C0C]" aria-labelledby="bb-hero-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-[#FFD84D] text-[#0C0C0C] mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" />
                  Business Brain
                </div>
                <h1 id="bb-hero-heading" className="text-[clamp(40px,6vw,72px)] text-white leading-[1.0] mb-5">
                  Your staff. Smarter. 24/7.
                </h1>
                <p className="text-white/60 text-xl leading-relaxed mb-8">
                  We collect your operational docs and build a custom private knowledge system your team can query around the clock — no training required.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
                  >
                    Get Your Brain Built
                  </Link>
                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 min-h-[44px]"
                  >
                    See How It Works
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/business-brain/bb-mockup.jpg"
                  alt="Business Brain AI chat interface on laptop"
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white" aria-labelledby="bb-hiw-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
                How It Works
              </p>
              <h2 id="bb-hiw-heading" className="text-[clamp(24px,3vw,36px)] text-[#0C0C0C] leading-tight mb-2">
                Four steps. One smart system.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bbSteps.map((step) => (
                <div
                  key={step.number}
                  className="bg-white rounded-2xl p-6 border border-[#E2DED8] flex flex-col gap-3"
                >
                  <span className="text-[#FFD84D] text-3xl font-[family-name:var(--font-anton)] leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-lg text-[#0C0C0C] leading-tight">{step.label}</h3>
                  <p className="text-[#888580] text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo band */}
        <section className="relative h-72 sm:h-96 overflow-hidden" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/business-brain/bb-employee.jpg"
            alt="Restaurant employee using Business Brain on a tablet"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0C0C0C]/50" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-white text-[clamp(20px,3vw,32px)] font-semibold text-center max-w-2xl leading-snug">
              &ldquo;Just ask it.&rdquo; — the only training your staff needs.
            </p>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 bg-[#F6F4EF]" aria-labelledby="bb-niches-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
                Industries We Serve
              </p>
              <h2 id="bb-niches-heading" className="text-[clamp(24px,3vw,36px)] text-[#0C0C0C] leading-tight mb-2">
                Built for businesses with real operational complexity.
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-[#E2DED8]">
              {bbNiches.map((niche) => (
                <div
                  key={niche.industry}
                  className="grid md:grid-cols-[200px_1fr_1fr] gap-x-10 gap-y-2 py-7"
                >
                  <h3 className="text-[#0C0C0C] text-base">{niche.industry}</h3>
                  <p className="text-[#888580] text-sm leading-relaxed">{niche.pain}</p>
                  <p className="text-[#1A4A7A] text-sm leading-relaxed">{niche.solution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-white" aria-labelledby="bb-pricing-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
                Pricing
              </p>
              <h2 id="bb-pricing-heading" className="text-[clamp(24px,3vw,36px)] text-[#0C0C0C] leading-tight mb-2">
                Simple, transparent pricing.
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {bbPricing.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative bg-white rounded-2xl p-8 border flex flex-col gap-5 ${
                    tier.popular
                      ? 'border-[#0C0C0C] shadow-[0_0_0_1px_#0C0C0C]'
                      : 'border-[#E2DED8]'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3.5 left-8">
                      <span className="bg-[#0C0C0C] text-[#FFD84D] text-xs font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={tier.popular ? 'mt-2' : ''}>
                    <h3 className="text-2xl text-[#0C0C0C] leading-tight mb-1">{tier.name}</h3>
                    <p className="text-3xl font-bold text-[#0C0C0C] mb-1 font-[family-name:var(--font-instrument-sans)]">
                      {tier.setup} <span className="text-base font-normal text-[#888580]">setup</span>
                    </p>
                    <p className="text-[#888580] text-sm">{tier.monthly}</p>
                  </div>
                  <p className="text-[#1A4A7A] text-xs font-medium">Best for: {tier.bestFor}</p>
                  <div className="flex-1" />
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] text-sm"
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#FFD84D]" aria-labelledby="bb-cta-heading">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="bb-cta-heading" className="text-[clamp(28px,4vw,48px)] text-[#0C0C0C] leading-[1.1] mb-4">
              Ready to build your Business Brain?
            </h2>
            <p className="text-[#0C0C0C]/60 text-lg mb-8">
              Book a free call and we&apos;ll scope your system in 20 minutes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#333333] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
            >
              Get Your Brain Built
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
