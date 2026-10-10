'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TAGLINE } from './data'

type Line = { t: string; kind?: 'cmd' | 'info' | 'fail' | 'pass' | 'warn' | 'dim' | 'done' }

const RUN: Line[] = [
  { t: 'stackd rescue scan --app client-portal', kind: 'cmd' },
  { t: 'cloning repository ........... done', kind: 'dim' },
  { t: 'stack: Next.js / Supabase / Stripe / Vercel', kind: 'info' },
  { t: '[scan] security .............. 2 findings', kind: 'warn' },
  { t: '  FAIL  service key shipped in client bundle', kind: 'fail' },
  { t: '  FAIL  row-level security off on 2 tables', kind: 'fail' },
  { t: '[scan] payments .............. 1 finding', kind: 'warn' },
  { t: '  FAIL  webhook skips signature check', kind: 'fail' },
  { t: '[scan] deploys ............... clean', kind: 'pass' },
  { t: 'stackd rescue patch --approved', kind: 'cmd' },
  { t: '  PASS  key rotated, moved to server env', kind: 'pass' },
  { t: '  PASS  RLS policies on 2 tables', kind: 'pass' },
  { t: '  PASS  webhook signatures verified', kind: 'pass' },
  { t: 'tests 48/48 passing / build green', kind: 'pass' },
  { t: 'ready to ship.', kind: 'done' },
]

const COLOR: Record<NonNullable<Line['kind']>, string> = {
  cmd: 'text-[var(--t-text)]',
  info: 'text-[var(--t-muted)]',
  dim: 'text-[var(--t-dim)]',
  warn: 'text-[var(--t-neon)]',
  fail: 'text-[var(--t-red)]',
  pass: 'text-[var(--t-cyan)]',
  done: 'neon-text font-bold',
}

function Terminal() {
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(reduce ? RUN.length : 0)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const delay = shown >= RUN.length ? 3800 : RUN[shown]?.kind === 'cmd' ? 900 : 380
    const id = setTimeout(() => setShown((n) => (n >= RUN.length ? 0 : n + 1)), delay)
    return () => clearTimeout(id)
  }, [shown, reduce])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [shown])

  return (
    <div className="relative rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10]/90 backdrop-blur shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,216,77,0.06)] overflow-hidden">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--t-line)] bg-[var(--t-surface)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-neon)]" />
        </div>
        <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)] truncate mx-3">stackd@rescue: ~/client-portal</span>
        <span className="font-mono-t text-[10px] uppercase tracking-[0.14em] text-[var(--t-cyan)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--t-cyan)] t-pulse" aria-hidden="true" />
          live
        </span>
      </div>
      <div
        ref={bodyRef}
        className="font-mono-t text-[12.5px] sm:text-[13px] leading-[1.75] p-4 sm:p-5 h-[330px] sm:h-[360px] overflow-hidden"
        aria-label="Example terminal: a Stackd Rescue scan finds three security and payment issues, patches them, and passes all tests."
        role="img"
      >
        {RUN.slice(0, shown).map((l, i) => (
          <div key={i} className={`whitespace-pre ${COLOR[l.kind ?? 'info']}`}>
            {l.kind === 'cmd' && <span className="text-[var(--t-neon)]">$ </span>}
            {l.t}
          </div>
        ))}
        <div>
          <span className="text-[var(--t-neon)]">$ </span>
          <span className="t-cursor inline-block w-[8px] h-[15px] align-middle bg-[var(--t-neon)] shadow-[0_0_10px_var(--t-neon-glow)]" />
        </div>
      </div>
    </div>
  )
}

const HEAD = TAGLINE.map((t) => t.toUpperCase())

export default function TechHero() {
  const reduce = useReducedMotion()

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden tech-noise" aria-label="Stackd">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.16), transparent)' }}
        aria-hidden="true"
      />

      {/* HUD corners */}
      <div className="hidden lg:block absolute top-24 left-8 font-mono-t text-[10px] tracking-[0.2em] text-[var(--t-dim)]" aria-hidden="true">
        SYS.STACKD / v2026.10
      </div>
      <div className="hidden lg:block absolute bottom-8 right-8 font-mono-t text-[10px] tracking-[0.2em] text-[var(--t-dim)]" aria-hidden="true">
        6 DIVISIONS / 1 CORE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-14 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-muted)] mb-7 flex items-center gap-3"
            >
              <span className="inline-block w-8 h-px bg-[var(--t-neon)]" aria-hidden="true" />
              A technology ecosystem
            </motion.p>

            <h1 className="text-[clamp(56px,9.2vw,124px)] leading-[0.92] tracking-[0.01em] mb-8">
              {HEAD.map((line, i) => (
                <motion.span
                  key={line}
                  className={`block ${i === 2 ? 'neon-text' : 'text-[var(--t-text)]'}`}
                  initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.5, ease: [0.65, 0, 0.35, 1] }}
                >
                  {line}
                  {i === 2 && (
                    <span
                      className="t-cursor inline-block w-[0.08em] h-[0.78em] ml-[0.08em] align-[-0.04em] bg-[var(--t-neon)]"
                      aria-hidden="true"
                    />
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="text-[var(--t-muted)] text-lg md:text-xl leading-relaxed max-w-xl mb-10"
            >
              We build software for clients, rescue software that broke, and train and verify the technical talent
              that helps you scale. Then we connect those people with real work, and build products of our own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#start-here"
                className="font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow"
              >
                Find your way in
              </a>
              <a
                href="#rescue"
                className="font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] hover:text-[var(--t-neon)] px-6 py-4 rounded-md transition-colors"
              >
                My app is broken
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ perspective: 1200 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
