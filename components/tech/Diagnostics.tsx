'use client'

import { motion } from 'framer-motion'
import { RESCUE_CHECKS } from './data'
import { openIntake } from './TerminalForm'

const INTAKE = [
  'App URL', 'Repository', 'Stack', 'Hosting', 'Database', 'Auth', 'Payment provider',
  'Known issues', 'Business impact', 'Urgency', 'Current team', 'Docs', 'Access needed',
]

export default function Diagnostics() {
  return (
    <section id="rescue" className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden scroll-mt-16">
      <div
        className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.08), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
        <div>
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">03 / Fix it</p>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">
            Built fast. Broke later. We fix that.
          </h2>
          <p className="text-[var(--t-muted)] text-lg leading-relaxed mb-8 max-w-xl">
            AI tools made it easy to build an app in a weekend. Keeping it secure, paid for and online is a different
            job. Stackd Rescue audits what you have, rates every finding by severity, and hands you a plan and a quote
            before we touch a line.
          </p>

          <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-3">Our intake asks for</p>
          <ul className="flex flex-wrap gap-1.5 mb-9">
            {INTAKE.map((f) => (
              <li key={f} className="font-mono-t text-[11px] text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-2 py-1">
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              openIntake('rescue')
            }}
            className="inline-block font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow"
          >
            Request a rescue
          </a>
        </div>

        {/* Audit panel */}
        <div className="rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] overflow-hidden">
          <div className="flex items-center justify-between px-5 h-12 border-b border-[var(--t-line)]">
            <span className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-muted)]">rescue.audit / 8 checks</span>
            <span className="relative w-6 h-6" aria-hidden="true">
              <span className="absolute inset-0 rounded-full border border-[var(--t-line-hi)]" />
              <span
                className="t-sweep absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(255,216,77,0.7))' }}
              />
            </span>
          </div>
          <ul className="divide-y divide-[var(--t-line)]">
            {RESCUE_CHECKS.map((c, i) => (
              <li key={c.area} className="px-5 py-3.5 grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr_90px] gap-x-4 gap-y-2 items-center">
                <span className="font-mono-t text-[13px] text-[var(--t-text)]">{c.area}</span>
                <span className="text-[13px] text-[var(--t-muted)]">{c.detail}</span>
                <span className="col-span-2 sm:col-span-1 h-1.5 rounded-full bg-[var(--t-line)] overflow-hidden">
                  <motion.span
                    className="block h-full bg-[var(--t-neon)] shadow-[0_0_10px_var(--t-neon-glow)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                  />
                </span>
              </li>
            ))}
          </ul>
          <div className="px-5 py-4 border-t border-[var(--t-line)] font-mono-t text-[12px] flex flex-wrap gap-x-6 gap-y-1">
            <span className="text-[var(--t-muted)]">output:</span>
            <span className="text-[var(--t-text)]">findings + severity</span>
            <span className="text-[var(--t-text)]">rescue plan</span>
            <span className="neon-text">quote</span>
          </div>
        </div>
      </div>
    </section>
  )
}
