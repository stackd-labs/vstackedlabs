'use client'

import { motion } from 'framer-motion'
import { COMMUNITY_ROWS, DISCORD_URL } from './data'

export default function Community() {
  return (
    <section id="community" className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden scroll-mt-16">
      <div
        className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.08), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
        <div>
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">05 / Community</p>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">
            Build with AI. <span className="neon-text">Not alone.</span>
          </h2>
          <p className="text-[var(--t-muted)] text-lg leading-relaxed mb-8 max-w-xl">
            Join the Stackd Discord. Get unstuck, share what you&apos;re making, and learn alongside people who&apos;ve
            been there.
          </p>

          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow"
          >
            Join the Discord
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-3 font-mono-t text-[12px] text-[var(--t-dim)]">Free to join. Takes 30 seconds.</p>
        </div>

        <div className="rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] overflow-hidden">
          <div className="flex items-center px-5 h-12 border-b border-[var(--t-line)]">
            <span className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-muted)]">discord / channels</span>
          </div>
          <ul className="divide-y divide-[var(--t-line)]">
            {COMMUNITY_ROWS.map((r, i) => (
              <motion.li
                key={r.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="px-5 py-4 grid sm:grid-cols-[150px_1fr] gap-x-4 gap-y-1 items-baseline"
              >
                <span className="font-mono-t text-[13px] text-[var(--t-text)]">
                  <span className="text-[var(--t-neon)] mr-1.5" aria-hidden="true">#</span>
                  {r.name}
                </span>
                <span className="text-[13px] text-[var(--t-muted)]">{r.note}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
