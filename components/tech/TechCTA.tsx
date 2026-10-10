import Image from 'next/image'
import Link from 'next/link'
import { Wordmark } from './TechNav'
import TerminalForm from './TerminalForm'
import PageLink from './PageLink'
import ContactLink, { ContactAnchor } from './ContactLink'
import { TAGLINE_TEXT } from './data'

const EMAIL = 'Chanel@stackdstudiosai.com'
const CALENDLY = process.env.NEXT_PUBLIC_CALENDLY_URL

export function TechCTA() {
  return (
    <section id="start" className="relative py-28 md:py-36 border-t border-[var(--t-line)] overflow-hidden tech-noise scroll-mt-16">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute left-1/2 bottom-[-300px] -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.18), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <div className="relative">
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">05 / Contact us</p>
          <h2 className="text-[clamp(52px,7.4vw,108px)] leading-[0.92] text-[var(--t-text)] mb-5">
            Contact <span className="neon-text">us.</span>
          </h2>
          <p className="text-[var(--t-text)] text-xl md:text-2xl max-w-xl mb-3">Tell us what you are building.</p>
          <p className="text-[var(--t-muted)] text-lg max-w-xl mb-8">
            Fill out the contact form and a real person replies within one business day. A new build, a broken app, a
            team to staff, or a skill to learn: we route it to the right team. No pitch, just a straight answer.
          </p>

          <div className="flex items-end gap-5">
            <div className="relative w-[150px] sm:w-[190px] shrink-0 t-float">
              <Image
                src="/stacka-peace.png"
                alt="Stacka, the Stackd robot mascot, giving a peace sign"
                width={791}
                height={1200}
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(255,216,77,0.18)]"
              />
            </div>
            <div className="relative mb-16 rounded-xl rounded-bl-none border border-[var(--t-line-hi)] bg-[var(--t-surface)] px-4 py-3 max-w-[240px]">
              <p className="font-mono-t text-[11px] uppercase tracking-[0.14em] text-[var(--t-neon)] mb-1">Stacka</p>
              <p className="text-[14px] text-[var(--t-text)] leading-snug">
                Hi, I sort the requests. Answer a few questions and I will get you to the right person.
              </p>
            </div>
          </div>

          <p className="mt-8 font-mono-t text-[12px] text-[var(--t-dim)]">
            Rather talk?{' '}
            <a
              href={CALENDLY || `mailto:${EMAIL}?subject=Starting%20a%20project%20with%20Stackd`}
              {...(CALENDLY ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-[var(--t-text)] underline underline-offset-4 hover:text-[var(--t-neon)]"
            >
              Book a 15-minute chat
            </a>{' '}
            or email {EMAIL}
          </p>
        </div>

        <ContactAnchor>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-neon)] mb-1">Contact form</p>
              <p className="text-[22px] sm:text-[26px] leading-tight text-[var(--t-text)] font-[family-name:var(--font-anton)]">
                Fill it out here
              </p>
            </div>
            <span className="font-mono-t text-[12px] text-[var(--t-muted)] flex items-center gap-2 pb-1">
              about 2 minutes
              <span className="text-[var(--t-neon)] text-lg leading-none" aria-hidden="true">&darr;</span>
            </span>
          </div>
          <TerminalForm />
        </ContactAnchor>
      </div>
    </section>
  )
}

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/stackdstudiosai' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@stackdstudiosai' },
  { label: 'X', href: 'https://x.com/stackdstudiosai' },
  { label: 'Discord', href: 'https://discord.gg/5xcnpfbj6v' },
]

export function TechFooter() {
  return (
    <footer className="border-t border-[var(--t-line)] bg-[var(--t-bg)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Wordmark />
          <p className="mt-4 text-[var(--t-muted)] max-w-sm">{TAGLINE_TEXT} A technology ecosystem, remote across the United States.</p>
        </div>
        <div>
          <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-4">Explore</p>
          <ul className="flex flex-col gap-2.5 text-[var(--t-muted)]">
            <li><Link href="/#start-here" className="hover:text-[var(--t-neon)] transition-colors">Start here</Link></li>
            <li><Link href="/#divisions" className="hover:text-[var(--t-neon)] transition-colors">Divisions</Link></li>
            <li><Link href="/#rescue" className="hover:text-[var(--t-neon)] transition-colors">Rescue</Link></li>
            <li><Link href="/#pipeline" className="hover:text-[var(--t-neon)] transition-colors">How it connects</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-4">Company</p>
          <ul className="flex flex-col gap-2.5 text-[var(--t-muted)]">
            <li><PageLink href="/services" className="hover:text-[var(--t-neon)] transition-colors">Services</PageLink></li>
            <li><PageLink href="/labs" className="hover:text-[var(--t-neon)] transition-colors">Labs</PageLink></li>
            <li><PageLink href="/about" className="hover:text-[var(--t-neon)] transition-colors">About</PageLink></li>
            <li><PageLink href="/careers" className="hover:text-[var(--t-neon)] transition-colors">Careers</PageLink></li>
            <li><ContactLink className="hover:text-[var(--t-neon)] transition-colors">Contact us</ContactLink></li>
          </ul>
        </div>
        <div>
          <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-4">Follow</p>
          <ul className="flex flex-col gap-2.5 text-[var(--t-muted)]">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--t-neon)] transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--t-line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-3 font-mono-t text-[11px] text-[var(--t-dim)]">
          <span>&copy; {new Date().getFullYear()} Stackd Studios AI. Built by Stackd, obviously.</span>
          <span className="flex gap-5">
            <PageLink href="/privacy" className="hover:text-[var(--t-neon)] transition-colors">Privacy</PageLink>
            <PageLink href="/terms" className="hover:text-[var(--t-neon)] transition-colors">Terms</PageLink>
            <PageLink href="/accessibility" className="hover:text-[var(--t-neon)] transition-colors">Accessibility</PageLink>
          </span>
        </div>
      </div>
    </footer>
  )
}
