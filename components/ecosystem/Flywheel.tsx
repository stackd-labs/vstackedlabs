'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FLYWHEEL, DIVISION_BY_SLUG } from '@/lib/divisions'

/**
 * The flywheel. Rendered as a numbered loop on a dark ground, with the closing
 * step wired back to the first so the cycle is visible rather than implied.
 */
export default function Flywheel() {
  return (
    <section
      id="flywheel"
      className="py-20 md:py-28 bg-[#0C0C0C] relative overflow-hidden"
      aria-labelledby="flywheel-heading"
    >
      <div
        className="dot-grid-navy absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            The Flywheel
          </p>
          <h2
            id="flywheel-heading"
            className="text-[clamp(30px,4.5vw,52px)] text-white leading-[1.05] mb-4"
          >
            We create customers and talent at the same time.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The people we train become the builders we support. The builders we
            support become the engineers companies hire us for. That work pays
            for training the next group.
          </p>
        </motion.div>

        <ol className="relative flex flex-col" role="list">
          {/* Vertical rail */}
          <div
            className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#FFD84D]/60 via-white/15 to-[#FFD84D]/60"
            aria-hidden="true"
          />

          {FLYWHEEL.map((step, i) => {
            const division = step.division ? DIVISION_BY_SLUG[step.division] : null
            return (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                <div
                  className="relative z-10 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-xs font-bold font-[family-name:var(--font-instrument-sans)]"
                  style={{
                    background: division ? division.accentOnDark : '#0C0C0C',
                    color: division ? '#0C0C0C' : '#FFFFFF',
                    border: division ? 'none' : '2px solid rgba(255,255,255,0.25)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="pt-1.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-white text-lg leading-tight">
                      {step.label}
                    </h3>
                    {division && (
                      <Link
                        href={`/${division.slug}`}
                        className="text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full transition-opacity hover:opacity-80 inline-flex items-center gap-1.5"
                        style={{
                          backgroundColor: `${division.accentOnDark}22`,
                          color: division.accentOnDark,
                        }}
                      >
                        <Icon name={division.icon} size={12} strokeWidth={2} />
                        {division.shortName}
                      </Link>
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed max-w-xl">
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* Loop back */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 ml-[4px] flex items-center gap-4"
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#FFD84D] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M11 5.5A4.5 4.5 0 1 0 7 11.5"
                stroke="#FFD84D"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M7.5 9.5 7 11.9l2.4.4"
                stroke="#FFD84D"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-[#FFD84D] text-sm font-semibold">
            And that funds training the next group. Back to step one.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
