'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ServicePreview {
  tierLabel: string
  name: string
  price: string
  timing: string
  pitch: string
  popular?: boolean
}

const previews: ServicePreview[] = [
  {
    tierLabel: 'Start Here',
    name: 'Systems Audit',
    price: '$397',
    timing: '48-hour turnaround',
    pitch:
      'The fastest way to map where your business is leaking time — and exactly what to build first.',
  },
  {
    tierLabel: 'Most Popular',
    name: 'Build Sprint',
    price: '$997',
    timing: '5 business days',
    pitch:
      'One workflow built, tested, and handed off with a training call — so it’s running by Monday.',
    popular: true,
  },
  {
    tierLabel: 'For Teams',
    name: 'Team Enablement',
    price: 'From $2,500',
    timing: 'Within 2 weeks',
    pitch:
      'Your team, trained to actually run the systems — Standard from $2,500 for ≤10, Enterprise from $5,000 for larger teams.',
  },
  {
    tierLabel: 'Ongoing',
    name: 'Operating Partner',
    price: '$1,500/mo',
    timing: 'Monthly',
    pitch:
      'A new build every month, plus tune-ups, a strategy call, and priority support — the system keeps growing.',
  },
]

export default function TracksHome() {
  return (
    <section
      id="services-preview"
      className="py-24 bg-white"
      aria-labelledby="services-preview-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-3xl"
        >
          <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
            Services
          </p>
          <h2
            id="services-preview-heading"
            className="text-[clamp(30px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05] mb-4"
          >
            Four services. One clear path.
          </h2>
          <p className="text-[#888580] text-lg leading-relaxed">
            Map it. Build the first system. Train your team. Keep it growing with an operating partner. No tech overwhelm.
          </p>
        </motion.div>

        {/* Service preview grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {previews.map((svc, i) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative bg-[#F6F4EF] rounded-2xl p-6 flex flex-col gap-4 border ${
                svc.popular
                  ? 'border-[#FFD84D] shadow-[0_0_0_3px_#FFD84D33]'
                  : 'border-[#E2DED8]'
              }`}
            >
              {svc.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FFD84D] text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <span
                className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
                  svc.popular ? 'text-[#0C0C0C]' : 'text-[#888580]'
                }`}
              >
                {svc.tierLabel}
              </span>

              <div>
                <h3 className="text-xl text-[#0C0C0C] leading-tight mb-2">
                  {svc.name}
                </h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-[#0C0C0C] font-[family-name:var(--font-instrument-sans)]">
                    {svc.price}
                  </span>
                  <span className="text-[#888580] text-xs">{svc.timing}</span>
                </div>
              </div>

              <p className="text-[#3F3F3F] text-sm leading-relaxed flex-1">
                {svc.pitch}
              </p>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#0C0C0C] font-semibold text-sm hover:gap-3 transition-all duration-200"
                aria-label={`Learn more about ${svc.name}`}
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
          >
            See all services
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
