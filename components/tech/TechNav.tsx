'use client'

import { useEffect, useState } from 'react'
import PageLink from './PageLink'
import ContactLink from './ContactLink'
import { LAUNCH_GUIDE_URL } from './data'

export function StackdMark({ size = 28 }: { size?: number }) {
  // The Stackd mark: a white S over two yellow chevrons, drawn so it stays crisp at nav size.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M24 9.2 16 4.2 8 9.2v4.6l11.4 7" stroke="#ECEAE4" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M12.6 11.3 24 18.4" stroke="#ECEAE4" strokeWidth="2.6" />
      <path d="M8 18.6v1.8l8 5 8-5v-1.8" stroke="#FFD84D" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M8 23.4v1.6l8 5 8-5v-1.6" stroke="#FFD84D" strokeWidth="2.6" strokeLinejoin="round" opacity="0.7" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <PageLink href="/" className="flex items-center gap-2.5" aria-label="Stackd Studios AI home">
      <StackdMark />
      <span className="font-mono-t text-[11px] sm:text-[15px] font-bold tracking-[0.12em] sm:tracking-[0.24em] text-[var(--t-text)] whitespace-nowrap">
        STACK<span className="neon-text">D</span>{' '}
        <span className="ml-2 font-medium tracking-[0.1em] sm:tracking-[0.2em] text-[var(--t-muted)]">STUDIOS <span className="text-[var(--t-neon)]">AI</span></span>
      </span>
    </PageLink>
  )
}

const LINKS = [
  { label: 'Start here', href: '/#start-here' },
  { label: 'Divisions', href: '/#divisions' },
  { label: 'Rescue', href: '/#rescue' },
  { label: 'Community', href: '/#community' },
  { label: 'Services', href: '/services' },
  { label: 'Labs', href: '/labs' },
]

export default function TechNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          event.currentTarget.querySelector<HTMLButtonElement>('[aria-controls="tech-mobile-menu"]')?.focus()
        }
      }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#07080A]/80 backdrop-blur-xl border-b border-[var(--t-line)]' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        <Wordmark />

        <ul className="hidden lg:flex items-center gap-0.5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <PageLink
                href={l.href}
                className="font-mono-t text-[12px] uppercase tracking-[0.1em] text-[var(--t-muted)] hover:text-[var(--t-neon)] px-2.5 py-2 rounded-md transition-colors whitespace-nowrap"
              >
                {l.label}
              </PageLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={LAUNCH_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:inline-block font-mono-t text-[12.5px] font-bold uppercase tracking-[0.1em] text-[var(--t-neon)] border border-[var(--t-neon)] px-4 py-2.5 rounded-md hover:shadow-[0_0_24px_rgba(255,216,77,0.35)] transition-shadow whitespace-nowrap"
          >
            Free launch guide
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
          <ContactLink className="font-mono-t text-[12.5px] font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-4 py-2.5 rounded-md hover:shadow-[0_0_24px_rgba(255,216,77,0.55)] transition-shadow whitespace-nowrap">
            Contact us
          </ContactLink>
        </div>

        <button
          className="lg:hidden font-mono-t text-xs uppercase tracking-[0.14em] text-[var(--t-text)] border border-[var(--t-line-hi)] rounded-md px-3 py-2"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="tech-mobile-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="tech-mobile-menu" className="lg:hidden bg-[#07080A]/95 backdrop-blur-xl border-b border-[var(--t-line)] px-4 pb-5">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <PageLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block font-mono-t text-sm uppercase tracking-[0.12em] text-[var(--t-text)] py-3 border-b border-[var(--t-line)]"
                >
                  <span className="text-[var(--t-neon)] mr-2">&gt;</span>
                  {l.label}
                </PageLink>
              </li>
            ))}
          </ul>
          <ContactLink
            onClick={() => setOpen(false)}
            className="mt-4 block text-center font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-4 py-3 rounded-md"
          >
            Contact us
          </ContactLink>
          <a
            href={LAUNCH_GUIDE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-neon)] border border-[var(--t-neon)] px-4 py-3 rounded-md"
          >
            Free launch guide
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>
      )}
    </header>
  )
}
