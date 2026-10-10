'use client'

import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DOORS } from './data'
import { openIntake } from './TerminalForm'
import StackaCam from './StackaCam'
import type { IntakeKind } from './intake-steps'

export default function CommandPalette() {
  const [active, setActive] = useState(0)
  const door = DOORS[active]

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % DOORS.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + DOORS.length) % DOORS.length)
    }
  }

  return (
    <section id="start-here" className="relative py-24 md:py-32 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-[1fr_200px] lg:grid-cols-[1fr_250px] gap-8 items-end mb-12">
          <div className="max-w-2xl">
            <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">01 / Start here</p>
            <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">What brings you to Stackd?</h2>
            <p className="text-[var(--t-muted)] text-lg">Pick the one that fits. We will route you to the right team.</p>
          </div>
          <StackaCam
            src="/stacka-call.jpg"
            alt="Stacka, the Stackd robot mascot, relaxing on a couch and taking a phone call"
            label="cam.02 / front desk"
            caption="Stacka is taking calls."
            position="62% 52%"
            className="hidden sm:block"
          />
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] overflow-hidden shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
          {/* Palette */}
          <div className="border-b lg:border-b-0 lg:border-r border-[var(--t-line)]" onKeyDown={onKey}>
            <div className="flex items-center gap-3 px-5 h-14 border-b border-[var(--t-line)] font-mono-t text-sm">
              <span className="text-[var(--t-neon)]">&gt;</span>
              <span className="text-[var(--t-text)] truncate">{door.command}</span>
              <span className="t-cursor w-[7px] h-[16px] bg-[var(--t-neon)]" aria-hidden="true" />
              <span className="ml-auto hidden sm:flex gap-1 text-[10px] text-[var(--t-dim)]">
                <kbd className="border border-[var(--t-line-hi)] rounded px-1.5 py-0.5">&uarr;</kbd>
                <kbd className="border border-[var(--t-line-hi)] rounded px-1.5 py-0.5">&darr;</kbd>
              </span>
            </div>
            <ul role="listbox" aria-label="What brings you to Stackd" className="p-2">
              {DOORS.map((d, i) => {
                const on = i === active
                return (
                  <li key={d.id}>
                    <button
                      role="option"
                      aria-selected={on}
                      onClick={() => setActive(i)}
                      onMouseEnter={() => setActive(i)}
                      className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-lg transition-colors ${
                        on ? 'bg-[var(--t-raised)]' : 'hover:bg-[var(--t-raised)]/60'
                      }`}
                    >
                      <span
                        className={`w-1 self-stretch rounded-full transition-colors ${on ? 'bg-[var(--t-neon)] shadow-[0_0_10px_var(--t-neon-glow)]' : 'bg-transparent'}`}
                        aria-hidden="true"
                      />
                      <span className="flex-1">
                        <span className={`block text-[16px] font-semibold ${on ? 'text-[var(--t-text)]' : 'text-[var(--t-muted)]'}`}>{d.label}</span>
                        <span className="block font-mono-t text-[11px] uppercase tracking-[0.14em] text-[var(--t-dim)] mt-0.5">{d.routesTo}</span>
                      </span>
                      <span className={`font-mono-t text-[11px] ${on ? 'text-[var(--t-neon)]' : 'text-transparent'}`} aria-hidden="true">
                        enter
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Result */}
          <div className="relative p-6 sm:p-9 tech-grid-fine min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={door.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col h-full"
              >
                <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-cyan)] mb-3">
                  routed to / {door.routesTo}
                </p>
                <h3 className="text-[clamp(28px,3.4vw,40px)] leading-[1.05] text-[var(--t-text)] mb-3">{door.label}</h3>
                <p className="text-[var(--t-muted)] mb-7">{door.summary}</p>
                <ol className="flex flex-col gap-3 mb-8">
                  {door.steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-4">
                      <span className="font-mono-t text-[12px] text-[var(--t-neon)] w-8 shrink-0">0{i + 1}</span>
                      <span className="h-px w-5 bg-[var(--t-line-hi)]" aria-hidden="true" />
                      <span className="text-[var(--t-text)]">{s}</span>
                    </li>
                  ))}
                </ol>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    openIntake(door.id === 'labs' ? 'other' : (door.id as IntakeKind))
                  }}
                  className="mt-auto self-start font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-3.5 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow"
                >
                  {door.cta}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
