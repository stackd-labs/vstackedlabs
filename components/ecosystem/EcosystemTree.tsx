'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DIVISIONS, BRAND } from '@/lib/divisions'

/**
 * The org diagram: STACKD at the root, six divisions branching beneath it.
 * Connectors are drawn with plain divs and hidden below `lg` where the grid
 * reflows into stacked cards.
 */
export default function EcosystemTree({
  variant = 'cream',
}: {
  variant?: 'cream' | 'dark'
}) {
  const dark = variant === 'dark'
  const bg = dark ? 'bg-[#0C0C0C]' : 'bg-[#F6F4EF]'
  const ink = dark ? 'text-white' : 'text-[#0C0C0C]'
  const muted = dark ? 'text-white/45' : 'text-[#888580]'
  const line = dark ? 'bg-white/20' : 'bg-[#0C0C0C]/20'
  const cardBg = dark ? 'bg-white/[0.04]' : 'bg-white'
  const cardBorder = dark ? 'border-white/10' : 'border-[#E2DED8]'

  return (
    <section
      className={`py-20 md:py-28 ${bg} overflow-hidden`}
      aria-labelledby="ecosystem-tree-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Root node */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] mb-4 ${muted}`}>
            The Ecosystem
          </p>
          <h2
            id="ecosystem-tree-heading"
            className={`text-[clamp(34px,6vw,64px)] leading-[0.95] ${ink}`}
          >
            Stackd
          </h2>
          <p
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] mt-3 text-[#0C0C0C] bg-[#FFD84D] px-4 py-1.5 rounded-full"
          >
            {BRAND.tagline}
          </p>
        </motion.div>

        {/* Trunk */}
        <div className="hidden lg:flex justify-center" aria-hidden="true">
          <div className={`w-[2px] h-12 ${line}`} />
        </div>

        {/* Branch rail: spans from the first column centre to the last */}
        <div className="hidden lg:block relative h-12" aria-hidden="true">
          <div
            className={`absolute top-0 h-[2px] ${line}`}
            style={{ left: 'calc(100% / 12)', right: 'calc(100% / 12)' }}
          />
          <div className="absolute top-0 inset-x-0 grid grid-cols-6 h-full">
            {DIVISIONS.map((d) => (
              <div key={d.slug} className="flex justify-center">
                <div className={`w-[2px] h-full ${line}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Division columns */}
        <div className="mt-8 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-3">
          {DIVISIONS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/${d.slug}`}
                className={`group h-full flex flex-col items-center text-center gap-2 rounded-2xl border ${cardBorder} ${cardBg} px-3 py-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]`}
                style={{ borderTopWidth: 3, borderTopColor: dark ? d.accentOnDark : d.accent }}
              >
                <span style={{ color: dark ? d.accentOnDark : d.accent }}>
                  <Icon name={d.icon} size={28} strokeWidth={1.5} />
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-[0.14em] ${muted}`}
                >
                  {d.eyebrow}
                </span>
                <span
                  className={`text-base leading-tight font-[family-name:var(--font-anton)] uppercase ${ink}`}
                >
                  {d.promise}
                </span>
                <span className={`text-xs leading-snug mt-auto pt-2 ${muted}`}>
                  {d.customer}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-10 text-center text-sm ${muted}`}
        >
          Same core competency. Different customer maturity.
        </motion.p>
      </div>
    </section>
  )
}
