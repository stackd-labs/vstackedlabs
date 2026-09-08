'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DIVISIONS } from '@/lib/divisions'
import Price from './Price'

/**
 * The six divisions as full cards. Used on the home page and the /services hub.
 */
export default function DivisionGrid({
  heading = 'Six ways in. One company.',
  eyebrow = 'The Divisions',
  intro = 'A person learning their first language and a corporation with a year-deep backlog need the same thing from us: someone who can actually build. The entry point is the only difference.',
  bg = 'white',
}: {
  heading?: string
  eyebrow?: string
  intro?: string
  bg?: 'white' | 'cream'
}) {
  return (
    <section
      id="divisions"
      className={`py-20 md:py-28 ${bg === 'white' ? 'bg-white' : 'bg-[#F6F4EF]'}`}
      aria-labelledby="divisions-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-14 max-w-3xl"
        >
          <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            {eyebrow}
          </p>
          <h2
            id="divisions-heading"
            className="text-[clamp(30px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05] mb-4"
          >
            {heading}
          </h2>
          <p className="text-[#888580] text-lg leading-relaxed">{intro}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIVISIONS.map((d, i) => {
            const entry = d.offers[0]
            return (
              <motion.article
                key={d.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group relative bg-[#F6F4EF] rounded-2xl border border-[#E2DED8] p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)]"
                style={{ borderTopWidth: 4, borderTopColor: d.accent }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span style={{ color: d.accent }}>
                    <Icon name={d.icon} size={32} strokeWidth={1.5} />
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ backgroundColor: `${d.accent}1A`, color: d.accent }}
                  >
                    {d.customer}
                  </span>
                </div>

                <div>
                  <p className="text-[#888580] text-[10px] font-bold uppercase tracking-[0.16em] mb-2">
                    {d.eyebrow}
                  </p>
                  <h3 className="text-[clamp(20px,2.4vw,26px)] text-[#0C0C0C] leading-[1.1] uppercase font-[family-name:var(--font-anton)]">
                    {d.promise}
                  </h3>
                </div>

                <p className="text-[#3F3F3F] text-sm leading-relaxed flex-1">
                  {d.oneLiner}
                </p>

                {entry && (
                  <p className="text-[#888580] text-xs">
                    Starts at{' '}
                    <Price
                      value={entry.price}
                      proposed={entry.proposed}
                      className="text-[#0C0C0C] font-semibold"
                    />{' '}
                    · {entry.name}
                  </p>
                )}

                <Link
                  href={`/${d.slug}`}
                  className="inline-flex items-center gap-2 text-[#0C0C0C] font-semibold text-sm mt-1 group-hover:gap-3 transition-all duration-200"
                >
                  Explore {d.shortName}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="sr-only">, {d.oneLiner}</span>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
