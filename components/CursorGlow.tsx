'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function CursorGlow() {
  const pathname = usePathname()
  const glowRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    // Only show on true pointer devices (not touch screens)
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const el = glowRef.current
    if (!el) return

    let raf: number

    function move(e: MouseEvent) {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!el) return
        el.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [isTouch])

  // No cursor glow on the Interactive page
  if (isTouch || pathname === '/interactive') return null

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-[400px] h-[400px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 70%)',
        filter: 'blur(20px)',
        willChange: 'transform',
        transition: 'opacity 0.3s',
      }}
      aria-hidden="true"
    />
  )
}
