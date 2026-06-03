'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  {
    value: 500,
    suffix: '+',
    label: 'Automations Built',
    sub: 'Repetitive tasks wired to run on their own',
  },
  {
    value: 300,
    suffix: '+',
    label: 'Workflows Shipped',
    sub: 'End-to-end business processes running on autopilot',
  },
  {
    value: 200,
    suffix: '+',
    label: 'Hours Saved / Month',
    sub: 'Across all active client systems combined',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Systems & Apps Deployed',
    sub: 'Apps, dashboards, portals, and automations shipped',
  },
]

function useCountUp(target: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    startTime.current = null

    function step(timestamp: number) {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, target, duration])

  return count
}

function StatItem({ stat, index, active }: { stat: typeof stats[0]; index: number; active: boolean }) {
  const count = useCountUp(stat.value, 1800 + index * 100, active)

  return (
    <div className="flex flex-col gap-2 text-center lg:text-left">
      <div className="text-[clamp(48px,6vw,80px)] font-bold text-[#FFD84D] leading-none font-[family-name:var(--font-instrument-sans)] tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-white text-lg leading-tight">{stat.label}</div>
      <div className="text-white/40 text-sm leading-snug max-w-[220px] mx-auto lg:mx-0">{stat.sub}</div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-24 bg-[#0C0C0C]"
      aria-label="Studio statistics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.12em] mb-3">
            By the Numbers
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] text-white leading-[1.1]">
            Results that compound.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} active={isInView} />
          ))}
        </div>

        {/* Divider line */}
        <div className="mt-20 border-t border-white/10" />

        {/* Bottom trust line */}
        <p className="mt-8 text-center text-white/30 text-sm">
          Serving business owners and founders across the DMV and beyond
        </p>
      </div>
    </section>
  )
}
