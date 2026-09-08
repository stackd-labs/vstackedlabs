'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DIVISIONS } from '@/lib/divisions'

/**
 * "Which door do I use?" Each division stated as the person who walks in.
 * This is the section that keeps six divisions from reading as unfocused.
 */
export default function EntryPoints({
  bg = 'cream',
}: {
  bg?: 'cream' | 'white'
}) {
  return (
    <section
      id="entry-points"
      className={`py-20 md:py-28 ${bg === 'cream' ? 'bg-[#F6F4EF]' : 'bg-white'}`}
      aria-labelledby="entry-points-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            Where You Come In
          </p>
          <h2
            id="entry-points-heading"
            className="text-[clamp(30px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05] mb-4"
          >
            Find yourself in one line.
          </h2>
          <p className="text-[#888580] text-lg leading-relaxed">
            Six divisions is only confusing if you have to read all six. You do
            not. One of these is you.
          </p>
        </motion.div>

        <div className="flex flex-col divide-y divide-[#E2DED8] border-y border-[#E2DED8]">
          {DIVISIONS.map((d, i) => (
            <motion.div
              key={d.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={`/${d.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-6 transition-colors"
              >
                <span className="shrink-0 w-9" style={{ color: d.accent }}>
                  <Icon name={d.icon} size={26} />
                </span>

                <p className="flex-1 text-[#0C0C0C] text-[clamp(16px,2vw,20px)] leading-snug">
                  {d.entryLine}
                </p>

                <span
                  className="shrink-0 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] group-hover:gap-3 transition-all duration-200"
                  style={{ color: d.accent }}
                >
                  {d.shortName}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M2 7h10M7 2l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-[#888580] text-sm"
        >
          Not sure which one?{' '}
          <Link href="/contact" className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2">
            Reply for a 15-minute chat
          </Link>{' '}
          and we will point you at the right door, including if that door is
          somewhere else.
        </motion.p>
      </div>
    </section>
  )
}
