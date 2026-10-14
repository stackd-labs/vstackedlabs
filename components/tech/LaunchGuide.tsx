'use client'

import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { requestLaunchGuide } from '@/app/actions/launch-guide'
import { DISCORD_URL, GUIDE_CONSENT_TEXT, LAUNCH_GUIDE_ANCHOR, LAUNCH_GUIDE_DOWNLOAD } from './data'

const UNLOCKED_KEY = 'stackd_guide_unlocked'

/** Every "Free launch guide" button: lands on the signup form and puts focus in it. */
export function GuideLink({ children, className, onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <a
      href={`/#${LAUNCH_GUIDE_ANCHOR}`}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onClick?.()
        if (pathname !== '/') return router.push(`/#${LAUNCH_GUIDE_ANCHOR}`, { scroll: false })
        document.getElementById(LAUNCH_GUIDE_ANCHOR)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => document.getElementById('guide-name')?.focus({ preventScroll: true }), 600)
      }}
    >
      {children}
    </a>
  )
}

const input =
  'w-full rounded-md border border-[var(--t-line-hi)] bg-[#0A0C10] px-4 py-3 text-[15px] text-[var(--t-text)] placeholder:text-[var(--t-dim)] focus:outline-none focus:border-[var(--t-neon)]'
const label = 'block font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-muted)] mb-2'
const button =
  'inline-block font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow disabled:opacity-60'

export default function LaunchGuide() {
  const [unlocked, setUnlocked] = useState(false)
  const [emailed, setEmailed] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const guard = useSpamGuard()

  useEffect(() => {
    try {
      if (localStorage.getItem(UNLOCKED_KEY) === '1') setUnlocked(true)
    } catch {}
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!consent) return setError('Please tick the box to agree before you continue.')
    setSending(true)
    const res = await requestLaunchGuide({ name, email, consent, ...guard.fields() }).catch(() => null)
    setSending(false)
    if (!res) return setError('Something went wrong. Please try again.')
    if (!res.ok) return setError(res.error)
    setEmailed(res.emailed)
    setUnlocked(true)
    try {
      localStorage.setItem(UNLOCKED_KEY, '1')
    } catch {}
  }

  return (
    <section id={LAUNCH_GUIDE_ANCHOR} className="relative py-20 md:py-24 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-6 sm:p-10 grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <div>
            <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">06 / Free guide</p>
            <h2 className="text-[clamp(32px,4.4vw,52px)] leading-[1] text-[var(--t-text)] mb-4">
              Get your free <span className="neon-text">launch guide</span> here.
            </h2>
            <p className="text-[var(--t-muted)] text-lg leading-relaxed max-w-xl mb-4">
              Before You Launch: a security and readiness checklist for apps built with Claude Code, Cursor, Lovable,
              Bolt, and similar AI tools. Start with the Top 5 checks if you only have ten minutes.
            </p>
            <p className="font-mono-t text-[12px] text-[var(--t-dim)]">Free. 11 pages. Download it here and we email you a copy.</p>
          </div>

          {unlocked ? (
            <div className="t-dark rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] p-6 sm:p-8" aria-live="polite">
              <p className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-cyan)] mb-2">&#10003; You&apos;re in</p>
              <p className="text-[24px] leading-tight text-[var(--t-text)] font-[family-name:var(--font-anton)] mb-3">
                Your guide is ready.
              </p>
              <p className="text-[15px] text-[var(--t-muted)] mb-6">
                {emailed
                  ? 'Thanks for your interest. We also emailed you a link so you can grab it later on any device.'
                  : 'Thanks for your interest. Download it below.'}
              </p>
              <a href={LAUNCH_GUIDE_DOWNLOAD} className={button}>
                Download the guide (PDF)
              </a>

              <div className="mt-8 pt-6 border-t border-[var(--t-line)]">
                <p className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-neon)] mb-2">Join the community</p>
                <p className="text-[15px] text-[var(--t-muted)] mb-4">
                  Get unstuck, share what you&apos;re building, and learn alongside people who&apos;ve been there. Post in
                  #help-desk any time.
                </p>
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-neon)] border border-[var(--t-neon)] px-5 py-3 rounded-md hover:shadow-[0_0_24px_rgba(255,216,77,0.35)] transition-shadow"
                >
                  Join the Discord
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="t-dark rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] p-6 sm:p-8">
              <HoneypotField value={guard.hp} onChange={guard.setHp} />
              <div className="mb-4">
                <label htmlFor="guide-name" className={label}>Name</label>
                <input id="guide-name" name="name" autoComplete="name" maxLength={100} required value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Your name" />
              </div>
              <div className="mb-5">
                <label htmlFor="guide-email" className={label}>Email</label>
                <input id="guide-email" name="email" type="email" autoComplete="email" maxLength={254} required value={email} onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@example.com" />
              </div>
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#FFD84D]"
                />
                <span className="text-[13px] leading-relaxed text-[var(--t-muted)]">{GUIDE_CONSENT_TEXT}</span>
              </label>
              {error && (
                <p role="alert" className="mb-4 text-[14px] text-[#FF6B6B]">
                  {error}
                </p>
              )}
              <button type="submit" disabled={sending} className={`${button} w-full sm:w-auto`}>
                {sending ? 'Sending...' : 'Get the guide'}
              </button>
              <p className="mt-3 font-mono-t text-[11px] text-[var(--t-dim)]">
                See our <a href="/privacy" className="underline underline-offset-4 hover:text-[var(--t-neon)]">privacy policy</a>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
