'use client'

import { useEffect, type ReactNode, type MouseEvent } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { openIntake } from './TerminalForm'

// Every "Contact us" on the site goes through ContactLink, so they all land on the homepage
// contact FORM (not just the section heading) and put focus in it.
//
// Next's own hash scrolling fires before the homepage finishes laying out (animated sections,
// images), so it lands short. Instead: on the homepage we scroll ourselves; from any other page we
// navigate to /#contact and ContactAnchor (wrapped around the form) finishes the scroll on arrival.

export const CONTACT_ID = 'contact'

export default function ContactLink({
  children,
  className,
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <a
      href={`/#${CONTACT_ID}`}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onClick?.()
        if (pathname === '/') openIntake(undefined, {}, CONTACT_ID)
        else router.push(`/#${CONTACT_ID}`, { scroll: false })
      }}
    >
      {children}
    </a>
  )
}

/** Wraps the homepage contact form so links can land on the form itself. */
export function ContactAnchor({ children }: { children: ReactNode }) {
  return (
    <div id={CONTACT_ID} className="scroll-mt-24">
      {children}
    </div>
  )
}

/**
 * Mounted once on the homepage. When the page is opened (or re-hashed) at /#section, it re-aims
 * the scroll a few times while the sections above finish animating in, so the visitor lands on
 * the section instead of short of it. For /#contact it also puts focus in the form.
 */
export function HashLander() {
  useEffect(() => {
    function land() {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const el = id ? document.getElementById(id) : null
      if (!el) return
      const go = (smooth: boolean) => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
      go(false)
      const timers = [250, 700, 1400].map((ms, i) => setTimeout(() => go(i === 2), ms))
      if (id === CONTACT_ID) {
        timers.push(setTimeout(() => window.dispatchEvent(new CustomEvent('stackd:intent', { detail: {} })), 1600))
      }
      // Stop re-aiming as soon as the visitor scrolls on their own.
      const stop = () => timers.forEach(clearTimeout)
      window.addEventListener('wheel', stop, { once: true, passive: true })
      window.addEventListener('touchstart', stop, { once: true, passive: true })
      return () => {
        stop()
        window.removeEventListener('wheel', stop)
        window.removeEventListener('touchstart', stop)
      }
    }
    let cleanup = land()
    const onHash = () => {
      cleanup?.()
      cleanup = land()
    }
    window.addEventListener('hashchange', onHash)
    return () => {
      cleanup?.()
      window.removeEventListener('hashchange', onHash)
    }
  }, [])
  return null
}
