'use client'

import { motion } from 'framer-motion'
import type { MouseEvent } from 'react'
import { TAGLINE, TECH_DIVISIONS, type Verb } from './data'

const VERB_LABEL: Record<Verb, string> = { BUILD: TAGLINE[0], FIX: TAGLINE[1], SCALE: TAGLINE[2] }

function spotlight(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function DivisionMatrix() {
  return (
    <section id="divisions" className="relative py-24 md:py-32 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">02 / The divisions</p>
            <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)]">Six divisions. One core.</h2>
          </div>
          <ul className="flex gap-2 font-mono-t text-[11px] uppercase tracking-[0.14em]">
            {(['BUILD', 'FIX', 'SCALE'] as Verb[]).map((v) => (
              <li key={v} className="border border-[var(--t-line-hi)] rounded-md px-3 py-2 text-[var(--t-muted)]">
                {VERB_LABEL[v]}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--t-line)] border border-[var(--t-line)] rounded-2xl overflow-hidden">
          {TECH_DIVISIONS.map((d, i) => (
            <motion.article
              key={d.id}
              onMouseMove={spotlight}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-[var(--t-bg)] p-7 sm:p-8 min-h-[300px] flex flex-col overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(255,216,77,0.09), transparent 60%)' }}
                aria-hidden="true"
              />
              <div className="t-scan-line" aria-hidden="true" />
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--t-neon)] shadow-[0_0_12px_var(--t-neon-glow)] transition-all duration-500"
                aria-hidden="true"
              />

              <div className="relative flex items-center justify-between mb-8 font-mono-t text-[11px] uppercase tracking-[0.16em]">
                <span className="text-[var(--t-dim)]">0{i + 1}</span>
                <span className="text-[var(--t-neon)]">{VERB_LABEL[d.verb]}</span>
              </div>

              <h3 className="relative text-[30px] leading-none text-[var(--t-text)] mb-3 group-hover:text-[var(--t-neon)] transition-colors">
                {d.name}
              </h3>
              <p className="relative text-[var(--t-muted)] mb-6">{d.tagline}</p>

              <ul className="relative flex flex-wrap gap-1.5 mb-7">
                {d.covers.map((c) => (
                  <li
                    key={c}
                    className="font-mono-t text-[11px] text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-2 py-1 group-hover:border-[#3A3420] transition-colors"
                  >
                    {c}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto flex items-center gap-2 font-mono-t text-[11px] uppercase tracking-[0.14em]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${d.live ? 'bg-[var(--t-cyan)] t-pulse' : 'bg-[var(--t-dim)]'}`}
                  aria-hidden="true"
                />
                <span className={d.live ? 'text-[var(--t-cyan)]' : 'text-[var(--t-dim)]'}>{d.status}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
