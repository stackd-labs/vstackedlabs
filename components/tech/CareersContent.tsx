'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import TerminalForm, { openIntake } from './TerminalForm'
import { AFFILIATE_FIT, ROLES, VALUES, type Role, type RoleTrack } from './careers-data'

const TRACKS: ('All' | RoleTrack)[] = ['All', 'Engineering', 'Design', 'Product', 'Operations', 'Education', 'Growth']

const btnPrimary =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow'
const btnGhost =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] hover:text-[var(--t-neon)] px-6 py-4 rounded-md transition-colors'

function apply(role?: Role) {
  openIntake('talent', role ? { role: role.title } : {}, 'apply')
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">{children}</p>
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function StatusCard() {
  const k = 'text-[var(--t-cyan)]'
  const v = 'text-[var(--t-neon)]'
  return (
    <div className="rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--t-line)] bg-[var(--t-surface)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-neon)]" />
        </div>
        <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)]">stackd talent --status</span>
        <span className="font-mono-t text-[10px] uppercase tracking-[0.14em] text-[var(--t-cyan)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--t-cyan)] t-pulse" aria-hidden="true" />
          hiring
        </span>
      </div>
      <pre className="font-mono-t text-[12.5px] sm:text-[13px] leading-[1.9] p-5 overflow-x-auto text-[var(--t-text)]">
        <span className={k}>open_roles</span>: <span className={v}>{ROLES.length}</span>{'\n'}
        <span className={k}>location</span>: <span className={v}>remote</span>{'\n'}
        <span className={k}>work_types</span>: [{'\n'}
        {'  '}<span className={v}>contract</span>, <span className={v}>freelance</span>,{'\n'}
        {'  '}<span className={v}>part-time</span>, <span className={v}>full-time</span>,{'\n'}
        {'  '}<span className={v}>intern</span>, <span className={v}>apprentice</span>, <span className={v}>partner</span>{'\n'}
        ]{'\n'}
        <span className={k}>skills</span>: <span className={v}>verified, not just listed</span>{'\n'}
        <span className={k}>approved_by</span>: <span className={v}>a real person</span>
      </pre>
    </div>
  )
}

function Hero() {
  return (
    <section className="relative min-h-[88svh] flex items-center overflow-hidden tech-noise">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.14), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-muted)] mb-7 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--t-neon)]" aria-hidden="true" />
            Careers / Stackd Talent
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(56px,9vw,120px)] leading-[0.92] text-[var(--t-text)] mb-8"
          >
            Build with <span className="neon-text">us.</span>
          </motion.h1>
          <p className="text-[var(--t-muted)] text-lg md:text-xl leading-relaxed max-w-xl mb-4">
            We are a remote team of builders, designers and operators. We hire for client builds, rescues and our own
            products, and we verify skills instead of trusting a resume.
          </p>
          <p className="text-[var(--t-muted)] text-lg leading-relaxed max-w-xl mb-10">
            Working with Stackd does not have to mean a full-time job. Contract, freelance, part-time, full-time,
            internships and partnerships all count.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#roles" className={btnPrimary}>
              See open roles
            </a>
            <a
              href="#apply"
              onClick={(e) => {
                e.preventDefault()
                apply()
              }}
              className={btnGhost}
            >
              Apply now
            </a>
          </div>
        </div>
        <StatusCard />
      </div>
    </section>
  )
}

/* ─── Values ───────────────────────────────────────────────────────── */

function Values() {
  return (
    <section className="py-20 md:py-24 border-t border-[var(--t-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>01 / How we work</Eyebrow>
        <div className="grid md:grid-cols-3 gap-px bg-[var(--t-line)] border border-[var(--t-line)] rounded-2xl overflow-hidden">
          {VALUES.map((v, i) => (
            <div key={v.title} className="bg-[var(--t-bg)] p-7 sm:p-8">
              <div className="font-mono-t text-[11px] text-[var(--t-dim)] mb-6">0{i + 1}</div>
              <h2 className="text-[28px] leading-[1.05] text-[var(--t-text)] mb-3">{v.title}</h2>
              <p className="text-[var(--t-muted)]">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Roles ────────────────────────────────────────────────────────── */

function RoleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-neon)] mb-3">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className="flex gap-3 text-[15px] text-[var(--t-muted)] leading-snug">
            <span className="font-mono-t text-[var(--t-dim)] shrink-0" aria-hidden="true">
              -
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Roles() {
  const [track, setTrack] = useState<(typeof TRACKS)[number]>('All')
  const [open, setOpen] = useState<string | null>(null)
  const shown = ROLES.filter((r) => track === 'All' || r.track === track)

  // Arriving at /careers#role-id (e.g. from site search) opens that role.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1)
      if (ROLES.some((r) => r.id === id)) {
        setTrack('All')
        setOpen(id)
      }
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <section id="roles" className="py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <Eyebrow>02 / Open roles</Eyebrow>
            <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)]">
              {ROLES.length} open roles.
            </h2>
            <p className="font-mono-t text-[13px] text-[var(--t-muted)] mt-3">
              <span className="text-[var(--t-neon)]">$</span> ls roles/ --open{track !== 'All' && ` --track ${track.toLowerCase()}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter roles by track">
            {TRACKS.filter((t) => t === 'All' || ROLES.some((r) => r.track === t)).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={track === t}
                onClick={() => setTrack(t)}
                className={`font-mono-t text-[11px] uppercase tracking-[0.14em] px-3 py-2 rounded-md border transition-colors ${
                  track === t
                    ? 'border-[var(--t-neon)] text-[#07080A] bg-[var(--t-neon)]'
                    : 'border-[var(--t-line-hi)] text-[var(--t-muted)] hover:text-[var(--t-text)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ul className="border border-[var(--t-line)] rounded-2xl overflow-hidden divide-y divide-[var(--t-line)]">
          {shown.map((r, i) => {
            const isOpen = open === r.id
            return (
              <li key={r.id} id={r.id} className={`scroll-mt-24 transition-colors ${isOpen ? 'bg-[var(--t-surface)]' : 'bg-[var(--t-bg)]'}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${r.id}-detail`}
                  className="group w-full text-left px-5 sm:px-7 py-5 grid grid-cols-[1fr_auto] sm:grid-cols-[48px_1fr_auto_auto_28px] gap-x-5 gap-y-2 items-center hover:bg-[var(--t-surface)] transition-colors"
                >
                  <span className="hidden sm:block font-mono-t text-[12px] text-[var(--t-dim)]">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className={`block text-[22px] sm:text-[26px] leading-tight font-[family-name:var(--font-anton)] transition-colors ${isOpen ? 'text-[var(--t-neon)]' : 'text-[var(--t-text)] group-hover:text-[var(--t-neon)]'}`}>
                      {r.title}
                    </span>
                    <span className="block font-mono-t text-[11px] uppercase tracking-[0.14em] text-[var(--t-dim)] mt-1">
                      {r.location}
                      <span className="text-[var(--t-neon)]"> / {r.divisions.join(', ')}</span>
                    </span>
                  </span>
                  <span className="hidden sm:inline font-mono-t text-[11px] uppercase tracking-[0.14em] text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-2 py-1">
                    {r.track}
                  </span>
                  <span className="font-mono-t text-[11px] uppercase tracking-[0.14em] text-[var(--t-cyan)] border border-[#1E3B38] rounded px-2 py-1 justify-self-end">
                    {r.type}
                  </span>
                  <span
                    className={`hidden sm:block font-mono-t text-[var(--t-neon)] text-lg transition-transform ${isOpen ? 'rotate-45' : ''}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${r.id}-detail`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 sm:pl-[92px] pb-8">
                        <p className="text-[var(--t-text)] text-[17px] leading-relaxed max-w-3xl mb-8">{r.summary}</p>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                          <RoleList title="What you will do" items={r.responsibilities} />
                          <RoleList title="Requirements" items={r.requirements} />
                          <RoleList title="Nice to have" items={r.nice} />
                        </div>
                        <button onClick={() => apply(r)} className={btnPrimary}>
                          Apply for this role
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <p className="mt-6 text-[var(--t-muted)]">
          Not seeing your role?{' '}
          <button onClick={() => apply()} className="text-[var(--t-text)] underline underline-offset-4 hover:text-[var(--t-neon)]">
            Send an open application
          </button>
          . We hire for skills first.
        </p>
      </div>
    </section>
  )
}

/* ─── Affiliate ────────────────────────────────────────────────────── */

const AFFILIATE_STEPS = [
  { title: 'Apply', body: 'A short application. We look at your platform and audience fit. No minimum follower count.' },
  { title: 'Get your link', body: 'You get your own tracking link, a partner kit, and access to our private partner channel.' },
  { title: 'Earn on referrals', body: 'Every qualified lead or sale you send our way earns you commission, paid on time.' },
]

function Affiliate() {
  return (
    <section id="affiliate" className="t-yellow-band relative py-20 md:py-28 border-t border-[var(--t-line)] overflow-hidden scroll-mt-16">
      <div
        className="absolute left-[-200px] top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.08), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow>03 / Affiliate and creator program</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">
            Get paid to spread the <span className="neon-text">word.</span>
          </h2>
          <p className="text-[var(--t-muted)] text-lg">
            We are building a network of creators, coaches, consultants and community builders. If your audience
            includes founders, business owners or builders, you belong here, and you earn commission on every client you
            send our way.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-4 mb-12">
          {AFFILIATE_STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-6">
              <div className="font-mono-t text-[12px] text-[var(--t-neon)] mb-4">step.0{i + 1}</div>
              <h3 className="text-[24px] leading-none text-[var(--t-text)] mb-2">{s.title}</h3>
              <p className="text-[var(--t-muted)] text-[15px]">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-3">Who does well here</p>
        <ul className="flex flex-wrap gap-2 mb-10">
          {AFFILIATE_FIT.map((f) => (
            <li key={f} className="font-mono-t text-[12px] text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-3 py-1.5">
              {f}
            </li>
          ))}
        </ul>

        <button onClick={() => openIntake('affiliate', {}, 'apply')} className={btnPrimary}>
          Apply to the affiliate program
        </button>
      </div>
    </section>
  )
}

/* ─── Apply ────────────────────────────────────────────────────────── */

function Apply() {
  return (
    <section id="apply" className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden tech-noise scroll-mt-16">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow>04 / Apply</Eyebrow>
          <h2 className="text-[clamp(52px,7.4vw,108px)] leading-[0.92] text-[var(--t-text)] mb-5">
            Apply <span className="neon-text">here.</span>
          </h2>
          <p className="text-[var(--t-text)] text-xl md:text-2xl max-w-xl mb-3">One form for every role.</p>
          <p className="text-[var(--t-muted)] text-lg max-w-xl mb-8">
            Pick a role above and its title fills in for you, or apply openly. Share your skills, your work, your
            availability and your rate. A real person reads every application.
          </p>
          <div className="flex items-end gap-5">
            <div className="relative w-[140px] sm:w-[170px] shrink-0 t-float">
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
                Links to real work beat a long resume. Show us what you have built.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-neon)] mb-1">Application form</p>
              <p className="text-[22px] sm:text-[26px] leading-tight text-[var(--t-text)] font-[family-name:var(--font-anton)]">
                Fill it out here
              </p>
            </div>
            <span className="font-mono-t text-[12px] text-[var(--t-muted)] flex items-center gap-2 pb-1">
              about 3 minutes
              <span className="text-[var(--t-neon)] text-lg leading-none" aria-hidden="true">
                &darr;
              </span>
            </span>
          </div>
          <TerminalForm
            kinds={['talent', 'affiliate']}
            title="application"
            intro="Application. Answer one question at a time."
          />
        </div>
      </div>
    </section>
  )
}

export default function CareersContent() {
  return (
    <>
      <Hero />
      <Values />
      <Roles />
      <Affiliate />
      <Apply />
    </>
  )
}
