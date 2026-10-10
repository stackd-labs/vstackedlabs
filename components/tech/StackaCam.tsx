'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Stacka, the mascot, shown as a live "camera feed" window. Used for the scene renders
// (desk, couch) that cannot be cut out cleanly; the cutout pose (stacka-peace.png) sits
// on the page directly instead.

function Clock() {
  const [now, setNow] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return <span suppressHydrationWarning>{now ?? '--:--:--'}</span>
}

export default function StackaCam({
  src,
  alt,
  label,
  caption,
  position = 'center',
  className = '',
}: {
  src: string
  alt: string
  /** Window title, e.g. "cam.02 / break room" */
  label: string
  caption?: string
  /** CSS object-position, to keep Stacka centered in the crop. */
  position?: string
  className?: string
}) {
  return (
    <figure className={`group ${className}`}>
      <div className="t-dark rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between gap-3 px-3 h-9 border-b border-[var(--t-line)] bg-[var(--t-surface)] font-mono-t text-[10px] uppercase tracking-[0.14em]">
          <span className="flex items-center gap-1.5 text-[var(--t-neon)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--t-neon)] t-pulse shadow-[0_0_8px_var(--t-neon-glow)]" aria-hidden="true" />
            live
          </span>
          <span className="text-[var(--t-dim)] truncate">{label}</span>
          <span className="text-[var(--t-muted)] tabular-nums">
            <Clock />
          </span>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 320px, 80vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ objectPosition: position }}
          />
          {/* Scanlines, a soft yellow wash and a vignette so the light render sits in the dark UI */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-multiply"
            style={{ background: 'repeating-linear-gradient(180deg, rgba(0,0,0,0.10) 0 1px, transparent 1px 3px)' }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(7,8,10,0.55) 100%)' }}
            aria-hidden="true"
          />
          {/* Viewfinder corners */}
          {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map(
            (c) => (
              <span key={c} className={`absolute w-5 h-5 border-[var(--t-neon)] opacity-80 ${c}`} aria-hidden="true" />
            ),
          )}
          <div className="t-scan-line" aria-hidden="true" />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono-t text-[12px] text-[var(--t-muted)]">
          <span className="text-[var(--t-neon)]">&gt;</span> {caption}
        </figcaption>
      )}
    </figure>
  )
}
