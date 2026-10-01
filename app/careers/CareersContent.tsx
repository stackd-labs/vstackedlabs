'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import Link from 'next/link'
import { submitApplication } from './actions'
import { submitAffiliateApplication } from './affiliate-actions'
import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'

// ─── Types ────────────────────────────────────────────────────────────────────

type Job = {
  id: string
  title: string
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance'
  location: 'Remote — USA' | 'Remote'
  track: 'Engineering' | 'Design' | 'Strategy' | 'Operations' | 'Growth'
  summary: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
}

const trackColors: Record<Job['track'], { bg: string; text: string }> = {
  Engineering: { bg: '#EEF4FB', text: '#1A4A7A' },
  Design: { bg: '#FFF4ED', text: '#F97316' },
  Strategy: { bg: '#F0FDF4', text: '#16A34A' },
  Operations: { bg: '#FDF4FF', text: '#9333EA' },
  Growth: { bg: '#FFFBEB', text: '#D97706' },
}

const typeColors: Record<Job['type'], { bg: string; text: string }> = {
  'Full-Time': { bg: '#0C0C0C', text: '#FFD84D' },
  'Part-Time': { bg: '#FDF4FF', text: '#7C3AED' },
  Contract: { bg: '#1A4A7A', text: '#FFFFFF' },
  Freelance: { bg: '#F0FDF4', text: '#15803D' },
}

const jobRoles = [
  'Full Stack Engineer',
  'Venture Strategist',
  'Client Success Manager',
  'Growth & Content Lead',
  'Social Media Manager',
  'AI Prompt Engineer',
  'UI/UX Designer',
  'Creator & Outreach Partner',
  'Brand Affiliate Partner',
  'Open Application',
]

// ─── Side Drawer ──────────────────────────────────────────────────────────────

function SideDrawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) {
  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#0C0C0C] z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 shrink-0">
          <h2 className="text-white font-normal text-lg">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-8 py-8">
          {children}
        </div>
      </div>
    </>
  )
}

// ─── Apply Form (inside drawer) ───────────────────────────────────────────────

const inputClass = 'w-full bg-white/8 border border-white/15 text-white text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30'

function ApplyForm({ defaultRole, onSuccess }: { defaultRole: string; onSuccess: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const guard = useSpamGuard()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)
    data.set('elapsedMs', String(guard.fields().elapsedMs))
    startTransition(async () => {
      const res = await submitApplication(data)
      if (res.success) {
        setDone(true)
        formRef.current?.reset()
        setTimeout(onSuccess, 1800)
      } else {
        setError(res.error ?? 'Something went wrong.')
      }
    })
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
        <div className="w-14 h-14 rounded-full bg-[#FFD84D]/15 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M5 14l6 6 12-12" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-white font-semibold text-lg">Application sent!</p>
        <p className="text-white/50 text-sm">We&apos;ll be in touch within 2–3 business days.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-white/50 text-sm leading-relaxed">
        No cover letter needed — just be real. We&apos;ll follow up within 2–3 business days.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Full Name <span className="text-[#FFD84D]">*</span>
          </label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Email <span className="text-[#FFD84D]">*</span>
          </label>
          <input name="email" type="email" required placeholder="you@email.com" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Role <span className="text-[#FFD84D]">*</span>
          </label>
          <select name="role" required defaultValue={defaultRole} className={`${inputClass} appearance-none`}>
            <option value="" disabled>Select a role…</option>
            {jobRoles.map((r) => (
              <option key={r} value={r} className="bg-[#1a1a1a] text-white">{r}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Portfolio / LinkedIn / Social
          </label>
          <input name="portfolio" type="url" placeholder="https://linkedin.com/in/yourname" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Why this role? <span className="text-[#FFD84D]">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us about yourself and why you're a fit."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] disabled:opacity-60 text-[#0C0C0C] font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
      >
        {isPending ? 'Sending…' : 'Submit Application'}
      </button>
    <HoneypotField value={guard.hp} onChange={guard.setHp} />
    </form>
  )
}

// ─── Affiliate Form (inside drawer) ──────────────────────────────────────────

function AffiliateForm({ onSuccess }: { onSuccess: () => void }) {
  const formRef = useRef<HTMLFormElement>(null)
  const guard = useSpamGuard()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)
    data.set('elapsedMs', String(guard.fields().elapsedMs))
    startTransition(async () => {
      const res = await submitAffiliateApplication(data)
      if (res.success) {
        setDone(true)
        formRef.current?.reset()
        setTimeout(onSuccess, 1800)
      } else {
        setError(res.error ?? 'Something went wrong.')
      }
    })
  }

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
        <div className="w-14 h-14 rounded-full bg-[#FFD84D]/15 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M5 14l6 6 12-12" stroke="#FFD84D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="text-white font-semibold text-lg">Application sent!</p>
        <p className="text-white/50 text-sm">We&apos;ll review your application and follow up soon.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-white/50 text-sm leading-relaxed">
        No minimum follower count required. We care about fit and authenticity over numbers.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Full Name <span className="text-[#FFD84D]">*</span>
          </label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Email <span className="text-[#FFD84D]">*</span>
          </label>
          <input name="email" type="email" required placeholder="you@email.com" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Platforms <span className="text-[#FFD84D]">*</span>
          </label>
          <input name="platforms" type="text" required placeholder="LinkedIn, TikTok, YouTube, newsletter…" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Approx. Audience Size
          </label>
          <input name="audience" type="text" placeholder="e.g. 5k followers, 2k email subs" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Profile / Website Links
          </label>
          <input name="links" type="text" placeholder="https://linkedin.com/in/you, https://yourblog.com" className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-white/50 text-[11px] font-semibold uppercase tracking-[0.12em]">
            Why do you want to be an affiliate? <span className="text-[#FFD84D]">*</span>
          </label>
          <textarea
            name="why"
            required
            rows={5}
            placeholder="Tell us about your audience and why this is a good fit."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] disabled:opacity-60 text-[#0C0C0C] font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
      >
        {isPending ? 'Sending…' : 'Submit Application'}
      </button>
    <HoneypotField value={guard.hp} onChange={guard.setHp} />
    </form>
  )
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ job, onApply }: { job: Job; onApply: (role: string) => void }) {
  const tc = trackColors[job.track]
  const tyc = typeColors[job.type]

  return (
    <details className="group bg-white rounded-2xl border border-[#E2DED8] overflow-hidden hover:border-[#0C0C0C]/30 transition-colors duration-200">
      <summary className="flex items-center gap-4 p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full" style={{ background: tc.bg, color: tc.text }}>
            {job.track}
          </span>
          <h3 className="text-lg text-[#0C0C0C]">{job.title}</h3>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full" style={{ background: tyc.bg, color: tyc.text }}>
              {job.type}
            </span>
            <span className="text-[#888580] text-xs hidden sm:block">{job.location}</span>
          </div>
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0 text-[#888580] transition-transform duration-200 group-open:rotate-180">
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>

      <div className="px-6 pb-8 border-t border-[#E2DED8] pt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <p className="text-[#888580] text-base leading-relaxed">{job.summary}</p>
            <div>
              <h4 className="text-sm font-semibold text-[#0C0C0C] uppercase tracking-[0.08em] mb-3">What you&apos;ll do</h4>
              <ul className="flex flex-col gap-2" role="list">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-[#0C0C0C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D] shrink-0 mt-1.5" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[#0C0C0C] uppercase tracking-[0.08em] mb-3">Requirements</h4>
              <ul className="flex flex-col gap-2" role="list">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-xs text-[#0C0C0C]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 mt-0.5">
                      <path d="M2 7l3.5 3.5 6.5-6.5" stroke="#0C0C0C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {job.nice.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-[#888580] uppercase tracking-[0.08em] mb-3">Nice to have</h4>
                <ul className="flex flex-col gap-2" role="list">
                  {job.nice.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-xs text-[#888580]">
                      <span className="w-1 h-1 rounded-full bg-[#E2DED8] shrink-0 mt-1.5" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={() => onApply(job.title)}
              className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] text-sm mt-auto"
            >
              Apply for This Role
            </button>
          </div>
        </div>
      </div>
    </details>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CareersContent({ jobs }: { jobs: Job[] }) {
  const [drawer, setDrawer] = useState<'apply' | 'affiliate' | null>(null)
  const [selectedRole, setSelectedRole] = useState('')

  function openApply(role: string) {
    setSelectedRole(role)
    setDrawer('apply')
  }

  function closeDrawer() {
    setDrawer(null)
  }

  return (
    <>
      {/* ── Apply Drawer ──────────────────────────────────────────────── */}
      <SideDrawer open={drawer === 'apply'} onClose={closeDrawer} title="Apply for a Role">
        <ApplyForm defaultRole={selectedRole} onSuccess={closeDrawer} />
      </SideDrawer>

      {/* ── Affiliate Drawer ──────────────────────────────────────────── */}
      <SideDrawer open={drawer === 'affiliate'} onClose={closeDrawer} title="Affiliate Program Application">
        <AffiliateForm onSuccess={closeDrawer} />
      </SideDrawer>

      {/* ── Culture strip ─────────────────────────────────────────────── */}
      <section className="py-12 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: 'Small team. Big output.', body: "We don't have layers of management. Everyone here ships. You'll have real ownership over the work you touch." },
              { title: 'Automation-native by default.', body: "We use Claude, automation, and modern tooling in our own workflows. We build the way we tell clients to — systems first." },
              { title: 'Craft is non-negotiable.', body: "We move fast because we're disciplined — not because we cut corners. Quality is built into the process." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-white text-lg leading-tight mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#F6F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">Open Roles</p>
            <h2 className="text-[clamp(28px,4vw,48px)] text-[#0C0C0C] leading-[1.1]">
              {jobs.length} positions available
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={openApply} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Affiliate Program ─────────────────────────────────────────── */}
      <section className="py-20 bg-[#FFD84D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-[#0C0C0C]/60 text-xs font-semibold uppercase tracking-[0.12em] mb-4">Affiliate &amp; Creator Program</p>
            <h2 className="text-[clamp(28px,4vw,52px)] text-[#0C0C0C] leading-[1.1] mb-5">Get paid to spread the word.</h2>
            <p className="text-[#0C0C0C]/70 text-lg leading-relaxed">
              We&apos;re building a network of creators, coaches, consultants, and community builders who believe in better-run businesses. If your audience includes founders or business owners, you belong here — and you&apos;ll earn commission for every client you send our way.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-0 mb-14">
            {[
              { step: '01', title: 'Apply or get approved', body: "Fill out a quick application. We review your platform and audience fit — no minimum follower count required." },
              { step: '02', title: 'Get your affiliate link', body: "You'll receive a unique tracking link, affiliate kit, and access to our private partner channel." },
              { step: '03', title: 'Earn on every referral', body: "Every qualified lead or sale you drive earns you commission. We pay on time, every time." },
            ].map((item, i) => (
              <div key={item.step} className={`py-8 ${i > 0 ? 'border-l border-[#0C0C0C]/15 pl-8' : 'pr-8'}`}>
                <span className="text-[#0C0C0C]/40 text-xs font-bold uppercase tracking-[0.15em] mb-3 block">{item.step}</span>
                <h3 className="text-[#0C0C0C] text-base leading-tight mb-2">{item.title}</h3>
                <p className="text-[#0C0C0C]/60 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#0C0C0C]/15 pt-10 mb-10">
            <h3 className="text-[#0C0C0C]/50 text-xs font-semibold uppercase tracking-[0.12em] mb-6">Who thrives in this program</h3>
            <div className="flex flex-wrap gap-3">
              {['Content Creators','TikTok / Reels Creators','LinkedIn Thought Leaders','YouTube Educators','Podcast Hosts','Newsletter Writers','Business Coaches','Marketing Consultants','Community Builders','AI Enthusiasts','Agency Owners','Startup Advisors'].map((label) => (
                <span key={label} className="text-sm font-medium text-[#0C0C0C]/80 border border-[#0C0C0C]/20 px-4 py-2 rounded-full">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setDrawer('affiliate')}
            className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#1A1A2E] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
          >
            Apply to the Affiliate Program
          </button>
        </div>
      </section>

      {/* ── Open Application CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#E2DED8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-[#0C0C0C] leading-[1.1] mb-4">
            Don&apos;t see the right fit?
          </h2>
          <p className="text-[#888580] text-lg mb-8">
            We&apos;re always open to hearing from talented people. Tell us who you are and why you&apos;d thrive here.
          </p>
          <button
            onClick={() => openApply('Open Application')}
            className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
          >
            Send an Open Application
          </button>
        </div>
      </section>
    </>
  )
}
