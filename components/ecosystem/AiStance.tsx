'use client'

import { motion } from 'framer-motion'
import { BRAND } from '@/lib/divisions'

/**
 * AI sits underneath all six divisions rather than beside them. This section
 * exists to say that in the plainest possible terms, because the alternative
 * is being read as another AI agency.
 */
export default function AiStance() {
  return (
    <section
      className="py-20 md:py-28 bg-[#FFD84D] relative overflow-hidden"
      aria-labelledby="ai-stance-heading"
    >
      <div
        className="dot-grid absolute inset-0 opacity-[0.06] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-[#0C0C0C]/60 text-xs font-semibold uppercase tracking-[0.14em] mb-6"
        >
          Where AI Actually Sits
        </motion.p>

        <motion.h2
          id="ai-stance-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[clamp(28px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05] mb-10 max-w-3xl"
        >
          AI is not one of our divisions. It is underneath all six.
        </motion.h2>

        <div className="flex flex-col gap-5 border-t border-[#0C0C0C]/15 pt-8">
          {BRAND.aiStance.map((row, i) => (
            <motion.p
              key={row.label}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="text-[clamp(20px,3vw,34px)] leading-tight text-[#0C0C0C]/70 font-[family-name:var(--font-instrument-sans)]"
            >
              <span className="font-semibold text-[#0C0C0C]">{row.label}</span>{' '}
              is {row.is}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-[#0C0C0C]/70 text-base leading-relaxed max-w-2xl"
        >
          We build with Claude every day and it is a large part of why we move
          fast. It is not the product. The product is working software, and the
          people who can maintain it after we leave.
        </motion.p>
      </div>
    </section>
  )
}
