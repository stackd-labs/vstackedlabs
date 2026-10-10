'use client'

import { useState } from 'react'
import { STACK } from './data'

export default function StackTicker() {
  const [paused, setPaused] = useState(false)
  const row = [...STACK, ...STACK]
  return (
    <section className="t-yellow-band relative border-y border-[var(--t-line)] overflow-hidden" aria-label="Tools we build with">
      <div className="flex items-center">
        <div className="shrink-0 z-10 bg-[var(--t-surface)] pl-4 sm:pl-8 pr-5 py-4 border-r border-[var(--t-line)] font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-neon)]">
          We ship with
          <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="block mt-2 underline py-1">{paused ? 'Resume ticker' : 'Pause ticker'}</button>
        </div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="t-marquee flex w-max gap-10 py-4 pl-8" style={{ animationPlayState: paused ? 'paused' : 'running' }}>
            {row.map((s, i) => (
              <li key={i} aria-hidden={i >= STACK.length ? true : undefined} className="font-mono-t text-[13px] uppercase tracking-[0.14em] text-[var(--t-muted)] whitespace-nowrap flex items-center gap-10">
                {s}
                <span className="w-1 h-1 rounded-full bg-[var(--t-line-hi)]" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
