'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 overflow-hidden bg-[#0C0C0C]"
      aria-label="Final call to action"
    >
      {/* Dot grid */}
      <div className="dot-grid-navy absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Gold glow orb */}
      <div
        className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(232,197,71,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.12em] mb-5">
            Ready to Build?
          </p>
          <h2 className="text-[clamp(32px,5vw,64px)] text-white leading-[1.0] mb-5">
            Let&apos;s build something
            <br />
            <span className="text-[#FFD84D]">real, together.</span>
          </h2>
          <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto">
            Book a free 15-minute chat. No pitch, no pressure, just a conversation about what you&apos;re building.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px] shadow-lg"
            >
              Book a Build Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
            >
              View Services
            </Link>
          </div>

          {/* Quick trust line */}
          <p className="mt-8 text-white/40 text-sm">
            stackdstudiosai.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}
