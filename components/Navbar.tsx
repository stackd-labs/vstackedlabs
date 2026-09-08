'use client'

import Icon from '@/components/Icon'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/components/CartContext'
import { DIVISIONS } from '@/lib/divisions'

const navLinks = [
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Business Brain', href: '/business-brain' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Store', href: '/store' },
]

export default function Navbar({ darkHero = false, yellowHero = false }: { darkHero?: boolean; yellowHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [divisionsOpen, setDivisionsOpen] = useState(false)
  const divisionsRef = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { totalItems } = useCart()

  const isDark = darkHero && !scrolled
  const isYellow = yellowHero && !scrolled
  const barColor = isDark ? 'bg-white' : 'bg-[#0C0C0C]'

  const logoIcon = isDark ? '/stackd-icon-dark.png' : isYellow ? '/stackd-icon-yellow.png' : '/stackd-icon-light.png'
  const textColor = isDark ? 'text-white' : 'text-[#0C0C0C]'
  const linkColor = isDark ? 'text-white/70 hover:text-white' : 'text-[#888580] hover:text-[#0C0C0C]'
  const cartColor = isDark ? 'white' : '#0C0C0C'
  const cartHover = isDark ? 'hover:bg-white/10' : 'hover:bg-[#E2DED8]'
  const ctaClass = isDark
    ? 'bg-[#FFD84D] text-[#0C0C0C] hover:bg-[#E8C030]'
    : 'bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C]'

  useEffect(() => {
    setScrolled(window.scrollY > 60)
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close the divisions dropdown on Escape or an outside click.
  useEffect(() => {
    if (!divisionsOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDivisionsOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (divisionsRef.current && !divisionsRef.current.contains(e.target as Node)) {
        setDivisionsOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [divisionsOpen])

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    }
  }, [])

  const openDivisions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setDivisionsOpen(true)
  }
  const scheduleCloseDivisions = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setDivisionsOpen(false), 140)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F6F4EF]/95 backdrop-blur-[12px] border-b border-[#E2DED8] shadow-sm'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Stackd Studios AI home"
          >
            <Image
              src={logoIcon}
              alt=""
              width={28}
              height={28}
              className="shrink-0"
              priority
            />
            <span className={`font-semibold text-base tracking-tight font-[family-name:var(--font-instrument-sans)] transition-colors duration-300 ${textColor}`}>
              Stackd Studios AI
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-7" role="list">
            {/* Divisions dropdown */}
            <li
              className="relative"
              ref={divisionsRef}
              onMouseEnter={openDivisions}
              onMouseLeave={scheduleCloseDivisions}
            >
              <button
                type="button"
                onClick={() => setDivisionsOpen((o) => !o)}
                aria-expanded={divisionsOpen}
                aria-haspopup="true"
                className={`text-sm font-medium inline-flex items-center gap-1.5 transition-colors duration-200 ${linkColor}`}
              >
                Divisions
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform duration-200 ${divisionsOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 3.5L5 6.5l3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {divisionsOpen && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[420px]"
                  onMouseEnter={openDivisions}
                  onMouseLeave={scheduleCloseDivisions}
                >
                  <div className="bg-white rounded-2xl border border-[#E2DED8] shadow-[0_20px_60px_rgba(0,0,0,0.14)] p-2.5">
                    <ul role="list" className="flex flex-col">
                      {DIVISIONS.map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={`/${d.slug}`}
                            onClick={() => setDivisionsOpen(false)}
                            className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-[#F6F4EF] transition-colors"
                          >
                            <span className="mt-0.5" style={{ color: d.accent }}>
                              <Icon name={d.icon} size={20} />
                            </span>
                            <span className="flex flex-col">
                              <span
                                className="text-[11px] font-bold uppercase tracking-[0.12em]"
                                style={{ color: d.accent }}
                              >
                                {d.eyebrow}
                              </span>
                              <span className="text-[#0C0C0C] text-sm font-semibold leading-snug">
                                {d.promise}
                              </span>
                              <span className="text-[#888580] text-xs leading-snug mt-0.5">
                                {d.oneLiner}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/ecosystem"
                      onClick={() => setDivisionsOpen(false)}
                      className="mt-1.5 flex items-center justify-between gap-2 rounded-xl bg-[#0C0C0C] px-3.5 py-3 text-white text-sm font-semibold hover:bg-[#FFD84D] hover:text-[#0C0C0C] transition-colors"
                    >
                      See the whole ecosystem
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${linkColor}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/ai-toolkit"
                className={`text-sm font-bold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isDark
                    ? 'bg-[#FFD84D] text-[#0C0C0C] hover:bg-white'
                    : 'bg-[#FFD84D] text-[#0C0C0C] hover:bg-white border border-[#0C0C0C]'
                }`}
                aria-label="Get the free AI toolkit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" aria-hidden="true" />
                Free Toolkit
              </Link>
            </li>
          </ul>

          {/* Cart icon */}
          <Link
            href="/cart"
            className={`hidden md:flex items-center justify-center relative w-10 h-10 rounded-lg transition-colors ${cartHover}`}
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M2 2h2l2.5 10h9l1.5-7H6" stroke={cartColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="16.5" r="1.5" fill={cartColor}/>
              <circle cx="14" cy="16.5" r="1.5" fill={cartColor}/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD84D] text-[#0C0C0C] text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:scale-[1.02] ${ctaClass}`}
            aria-label="Book a free 15-minute chat with Stackd Studios AI"
          >
            Book a Call
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 ${barColor} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${barColor} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${barColor} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-[#F6F4EF] flex flex-col transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E2DED8] shrink-0">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
            aria-label="Stackd Studios AI home"
          >
            <Image src="/stackd-icon-light.png" alt="" width={26} height={26} className="shrink-0" />
            <span className="font-semibold text-base text-[#0C0C0C] tracking-tight font-[family-name:var(--font-instrument-sans)]">
              Stackd Studios AI
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-[#E2DED8] transition-colors shrink-0 ml-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="flex-1 flex flex-col justify-start pt-6 px-6 overflow-y-auto" aria-label="Mobile navigation">
          {/* Divisions */}
          <p className="text-[#888580] text-[10px] font-bold uppercase tracking-[0.16em] mb-3">
            Divisions
          </p>
          <ul className="flex flex-col gap-1.5 mb-6" role="list">
            {DIVISIONS.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/${d.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 py-2"
                >
                  <span style={{ color: d.accent }}>
                    <Icon name={d.icon} size={22} />
                  </span>
                  <span className="flex flex-col">
                    <span
                      className="text-[22px] leading-none font-[family-name:var(--font-anton)] uppercase"
                      style={{ color: d.accent }}
                    >
                      {d.shortName}
                    </span>
                    <span className="text-[#888580] text-xs leading-snug mt-1">
                      {d.promise}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-[#E2DED8] pt-5">
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[#0C0C0C] text-[22px] font-[family-name:var(--font-anton)] hover:text-[#FFD84D] transition-colors block leading-tight py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 mb-6 flex flex-col gap-3">
            <Link
              href="/ai-toolkit"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] text-base font-bold px-8 py-4 rounded-xl transition-all duration-200 w-full min-h-[44px] border-2 border-[#0C0C0C]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" aria-hidden="true" />
              Get the Free AI Toolkit
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 w-full min-h-[44px]"
            >
              Book a Call
            </Link>
            <Link
              href="/cart"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#0C0C0C] text-[#0C0C0C] text-base font-semibold px-8 py-4 rounded-xl transition-all duration-200 w-full min-h-[44px] relative"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M2 2h2l2.5 10h9l1.5-7H6" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="16.5" r="1.5" fill="#0C0C0C"/>
                <circle cx="14" cy="16.5" r="1.5" fill="#0C0C0C"/>
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="bg-[#FFD84D] text-[#0C0C0C] text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
