'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface PricingTier {
  name: string
  price: string
  bestFor: string
  bullets: string[]
  cta: string
  emphasized?: boolean
}

interface ServiceArticle {
  slug: string
  tierLabel: string
  price: string
  timing: string
  name: string
  outcomeHeadline: React.ReactNode
  body: string[]
  walkAway: string[]
  bridge: string
  cta: string
  /** Optional CTA target — defaults to /contact. */
  ctaHref?: string
  theme: 'cream' | 'yellow' | 'white' | 'dark'
  /** When set, renders a side-by-side pricing tier block inside the section. */
  tiers?: PricingTier[]
  /** Optional callout shown above the tier block — e.g. demand/supply framing. */
  demandNote?: string
}

const services: ServiceArticle[] = [
  {
    slug: 'audit',
    tierLabel: 'Start Here',
    price: '$397',
    timing: '48-hour turnaround',
    name: 'Systems Audit',
    outcomeHeadline: (
      <>
        Stop guessing where to start.
        <br className="hidden sm:block" /> Get a 48-hour roadmap built around your business.
      </>
    ),
    body: [
      "Most owners we talk to know something could be running better. They just don't know where to start, what's worth their time, or what's hype. Three articles deep on Twitter and they're more confused than when they started.",
      "The Systems Audit fixes that in two days. You fill out a structured intake about your operations — how leads come in, where the bottlenecks are, what your team spends too much time on. We come back with 3–5 specific systems to build or automate, each tagged to a real tool, a real workflow, and an honest read on how much it would actually move the needle. Then we walk you through it on a 30-minute call.",
      "When you're done, you have a written roadmap and a clear answer to 'what should we build first?' No 80-page deck. No upsell pressure. Just clarity.",
    ],
    walkAway: [
      'Async business operations intake form',
      '3–5 prioritized systems to build, each tagged to a tool + workflow',
      'Written roadmap delivered within 48 hours',
      '30-minute walkthrough call',
    ],
    bridge:
      "If you decide a Build Sprint makes sense, your $397 audit fee gets credited toward that build.",
    cta: 'Book the Audit',
    theme: 'cream',
  },
  {
    slug: 'quick-setup',
    tierLabel: 'Most Popular',
    price: '$997',
    timing: '5 business days',
    name: 'Build Sprint',
    outcomeHeadline: (
      <>
        Pick one workflow. We build it.
        <br className="hidden sm:block" /> You&apos;re using it Monday.
      </>
    ),
    body: [
      "You don't need a grand strategy. You need one specific thing that's eating your week to stop eating your week. Email triage. CRM follow-up. New-client onboarding. Repurposing one Loom into a month of content. Whatever the thing is — we build it, test it, and hand it off.",
      "A Build Sprint is one workflow, scoped tight, shipped in five business days. We custom-build the logic (10–15 moving parts), wire up the automations, and walk you through it on a one-hour orientation call. You'll have it working before the next time the bottleneck would have hit.",
      "Most clients land here right after their Audit, with the workflow already named. Some come in cold with a clear ask. Either works.",
    ],
    walkAway: [
      'One complete workflow build (your pick — email triage, CRM follow-up, onboarding, repurposing, or similar)',
      'Custom prompt + automation logic (10–15 building blocks)',
      '1-hour orientation and training call',
      '7 days of post-delivery email support',
    ],
    bridge:
      "Most Build Sprint clients either book another for a second workflow, or roll into the Operating Partner plan to keep the system expanding.",
    cta: 'Get Started',
    theme: 'yellow',
  },
  {
    slug: 'team-training',
    tierLabel: 'For Teams',
    price: 'From $2,500',
    timing: 'Scheduled within 2 weeks',
    name: 'Team Enablement',
    outcomeHeadline: (
      <>
        Your team. Trained.
        <br className="hidden sm:block" /> Actually running the system by Friday.
      </>
    ),
    body: [
      "Most teams have someone who's tried the tools. Maybe they're even good at it. But the rest of the team is still copy-pasting between tabs, missing what the system could do for their specific role, or quietly afraid to try.",
      "Team Enablement fixes that in one half-day. We run a pre-session intake to learn your team, your tools, and your real workflows — then we run a live session built around them. Not generic training. Your CRM, your tone, your content, your problems. Everyone leaves with custom templates they'll use the same week.",
      "This is the offer most companies need most and book the latest. Demand is far ahead of supply right now — most providers charge $10K–$40K for the same scope, which is why we cap the number of sessions per quarter and offer two formats: Standard (from $2,500) for teams up to 10, and Enterprise (from $5,000) for larger teams or full-day deep-dives. Full breakdown lives on the pricing page.",
    ],
    walkAway: [
      'Pre-session intake to customize for your team and workflows',
      'Live virtual training session — 3 hours (Standard) or half-day (Enterprise)',
      'Custom workflow templates and prompt library',
      'Full session recording + resource folder delivered after',
    ],
    bridge:
      "Enablement clients get first access to the Operating Partner plan — which keeps the systems and workflows expanding every month.",
    cta: 'See pricing options',
    ctaHref: '/pricing#team-training',
    theme: 'white',
  },
  {
    slug: 'retainer',
    tierLabel: 'Ongoing',
    price: '$1,500/mo',
    timing: 'Monthly',
    name: 'Operating Partner',
    outcomeHeadline: (
      <>
        Keep building.
        <br className="hidden sm:block" /> We don&apos;t let it go stale.
      </>
    ),
    body: [
      "Tools move fast. The workflow that worked in February is mid by July. The tool you wired in is now a feature inside something newer. Your team learns one system and is hungry for the next.",
      "The Operating Partner plan is the answer to 'what now?' Every month: one new workflow or tool build, a round of tune-ups, a strategy call to figure out what's next, and priority access for anything urgent. It's how the system stays sharp instead of becoming a museum exhibit.",
      "We give Build Sprint and Team Enablement clients first access. If you're already in the flow, this keeps it moving.",
    ],
    walkAway: [
      '1 new workflow or tool build per month',
      'System tune-ups (5–10 improvements)',
      'Monthly strategy call',
      'Priority async support',
      'First access for Build Sprint and Enablement clients',
    ],
    bridge:
      "Operating Partner clients are the ones we go deepest with. Most stay 6+ months.",
    cta: 'Apply for Operating Partner',
    theme: 'dark',
  },
]

// ─── Theme tokens per article ────────────────────────────────────────────────

interface ThemeTokens {
  bg: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  eyebrow: string
  rule: string
  asideBg: string
  asideBorder: string
  bridgeBorder: string
  ctaPrimary: string
  ctaPrimaryHover: string
  badge: string
  badgeText: string
  badgeShown: boolean
}

function getTheme(theme: ServiceArticle['theme']): ThemeTokens {
  switch (theme) {
    case 'cream':
      return {
        bg: 'bg-[#F6F4EF]',
        textPrimary: 'text-[#0C0C0C]',
        textSecondary: 'text-[#3F3F3F]',
        textMuted: 'text-[#888580]',
        eyebrow: 'text-[#888580]',
        rule: 'bg-[#0C0C0C]',
        asideBg: 'bg-white',
        asideBorder: 'border-[#E2DED8]',
        bridgeBorder: 'border-[#FFD84D]',
        ctaPrimary: 'bg-[#0C0C0C] text-white hover:bg-[#FFD84D] hover:text-[#0C0C0C]',
        ctaPrimaryHover: '',
        badge: 'bg-[#0C0C0C]',
        badgeText: 'text-[#FFD84D]',
        badgeShown: false,
      }
    case 'yellow':
      return {
        bg: 'bg-[#FFD84D]',
        textPrimary: 'text-[#0C0C0C]',
        textSecondary: 'text-[#0C0C0C]/85',
        textMuted: 'text-[#0C0C0C]/55',
        eyebrow: 'text-[#0C0C0C]/65',
        rule: 'bg-[#0C0C0C]',
        asideBg: 'bg-[#0C0C0C]',
        asideBorder: 'border-[#0C0C0C]',
        bridgeBorder: 'border-[#0C0C0C]',
        ctaPrimary: 'bg-[#0C0C0C] text-[#FFD84D] hover:bg-white hover:text-[#0C0C0C]',
        ctaPrimaryHover: '',
        badge: 'bg-[#0C0C0C]',
        badgeText: 'text-[#FFD84D]',
        badgeShown: true,
      }
    case 'white':
      return {
        bg: 'bg-white',
        textPrimary: 'text-[#0C0C0C]',
        textSecondary: 'text-[#3F3F3F]',
        textMuted: 'text-[#888580]',
        eyebrow: 'text-[#888580]',
        rule: 'bg-[#0C0C0C]',
        asideBg: 'bg-[#F6F4EF]',
        asideBorder: 'border-[#E2DED8]',
        bridgeBorder: 'border-[#0C0C0C]',
        ctaPrimary: 'bg-[#0C0C0C] text-white hover:bg-[#FFD84D] hover:text-[#0C0C0C]',
        ctaPrimaryHover: '',
        badge: 'bg-[#0C0C0C]',
        badgeText: 'text-[#FFD84D]',
        badgeShown: false,
      }
    case 'dark':
      return {
        bg: 'bg-[#0C0C0C]',
        textPrimary: 'text-white',
        textSecondary: 'text-white/80',
        textMuted: 'text-white/55',
        eyebrow: 'text-[#FFD84D]',
        rule: 'bg-[#FFD84D]',
        asideBg: 'bg-white/[0.04]',
        asideBorder: 'border-white/10',
        bridgeBorder: 'border-[#FFD84D]',
        ctaPrimary: 'bg-[#FFD84D] text-[#0C0C0C] hover:bg-white hover:text-[#0C0C0C]',
        ctaPrimaryHover: '',
        badge: 'bg-[#FFD84D]',
        badgeText: 'text-[#0C0C0C]',
        badgeShown: false,
      }
  }
}

// ─── Article Section ─────────────────────────────────────────────────────────

function ArticleSection({ svc, index }: { svc: ServiceArticle; index: number }) {
  const t = getTheme(svc.theme)
  const isLast = index === services.length - 1

  return (
    <section
      id={svc.slug}
      className={`${t.bg} ${t.textPrimary} relative scroll-mt-24`}
      aria-labelledby={`${svc.slug}-heading`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Article number + eyebrow */}
          <div className="flex items-center gap-4 mb-8">
            <span className={`text-[clamp(36px,5vw,56px)] font-[family-name:var(--font-anton)] leading-none ${t.textPrimary} opacity-25`}>
              0{index + 1}
            </span>
            <div className={`flex-1 h-px ${t.rule} opacity-30`} aria-hidden="true" />
            {t.badgeShown && (
              <span className={`${t.badge} ${t.badgeText} text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full whitespace-nowrap`}>
                Most Popular
              </span>
            )}
          </div>

          <p className={`${t.eyebrow} text-xs font-bold uppercase tracking-[0.16em] mb-5`}>
            {svc.tierLabel} <span className="opacity-50 mx-1">·</span> {svc.price}{' '}
            <span className="opacity-50 mx-1">·</span> {svc.timing}
          </p>

          <h2
            id={`${svc.slug}-heading`}
            className={`text-[clamp(34px,5.5vw,68px)] uppercase font-[family-name:var(--font-anton)] leading-[0.96] tracking-[0.005em] mb-3 ${t.textPrimary}`}
          >
            {svc.outcomeHeadline}
          </h2>
          <p className={`${t.textMuted} text-base md:text-lg`}>{svc.name}</p>

          <div className={`h-[3px] w-16 ${t.rule} my-10`} aria-hidden="true" />

          {/* Body + Aside */}
          <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-10 lg:gap-14">
            {/* Article body */}
            <div className="flex flex-col gap-5">
              {svc.body.map((para, i) => (
                <p
                  key={i}
                  className={`${t.textSecondary} text-[17px] md:text-[18px] leading-[1.65]`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Aside — what you walk away with */}
            <aside
              className={`${t.asideBg} ${t.asideBorder} border rounded-2xl p-6 md:p-7 self-start`}
            >
              <p
                className={`${
                  svc.theme === 'yellow' ? 'text-[#FFD84D]' : svc.theme === 'dark' ? 'text-[#FFD84D]' : 'text-[#888580]'
                } text-[10px] font-bold uppercase tracking-[0.16em] mb-4`}
              >
                Walk away with
              </p>
              <ul
                className={`flex flex-col gap-3 ${
                  svc.theme === 'yellow' || svc.theme === 'dark' ? 'text-white/90' : 'text-[#0C0C0C]'
                }`}
                role="list"
              >
                {svc.walkAway.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span
                      className={`w-4 h-px shrink-0 mt-[10px] ${
                        svc.theme === 'yellow' ? 'bg-[#FFD84D]' : svc.theme === 'dark' ? 'bg-[#FFD84D]' : 'bg-[#0C0C0C]'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {/* Pricing tiers (when present) */}
          {svc.tiers && svc.tiers.length > 0 && (
            <div className="mt-14">
              <div className="flex items-baseline justify-between mb-5 flex-wrap gap-3">
                <p className={`${t.eyebrow} text-[10px] font-bold uppercase tracking-[0.16em]`}>
                  Pricing options
                </p>
                {svc.demandNote && (
                  <p className={`${t.textMuted} text-sm italic max-w-md`}>
                    {svc.demandNote}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {svc.tiers.map((tier) => {
                  const isEmphasized = tier.emphasized === true
                  return (
                    <div
                      key={tier.name}
                      className={`relative rounded-2xl p-6 md:p-7 flex flex-col gap-4 border ${
                        isEmphasized
                          ? svc.theme === 'dark'
                            ? 'bg-[#FFD84D] border-[#FFD84D]'
                            : 'bg-[#0C0C0C] border-[#0C0C0C]'
                          : `${t.asideBg} ${t.asideBorder}`
                      }`}
                    >
                      {isEmphasized && (
                        <div className="absolute -top-3 left-6">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full whitespace-nowrap ${
                              svc.theme === 'dark'
                                ? 'bg-[#0C0C0C] text-[#FFD84D]'
                                : 'bg-[#FFD84D] text-[#0C0C0C]'
                            }`}
                          >
                            For larger teams
                          </span>
                        </div>
                      )}

                      <div className="flex items-baseline justify-between gap-3 flex-wrap">
                        <h3
                          className={`text-xl font-semibold ${
                            isEmphasized
                              ? svc.theme === 'dark'
                                ? 'text-[#0C0C0C]'
                                : 'text-white'
                              : 'text-[#0C0C0C]'
                          }`}
                        >
                          {tier.name}
                        </h3>
                        <span
                          className={`text-2xl font-bold font-[family-name:var(--font-instrument-sans)] ${
                            isEmphasized
                              ? svc.theme === 'dark'
                                ? 'text-[#0C0C0C]'
                                : 'text-[#FFD84D]'
                              : 'text-[#0C0C0C]'
                          }`}
                        >
                          {tier.price}
                        </span>
                      </div>

                      <p
                        className={`text-sm leading-relaxed ${
                          isEmphasized
                            ? svc.theme === 'dark'
                              ? 'text-[#0C0C0C]/75'
                              : 'text-white/75'
                            : 'text-[#888580]'
                        }`}
                      >
                        {tier.bestFor}
                      </p>

                      <ul className="flex flex-col gap-2 flex-1" role="list">
                        {tier.bullets.map((b) => (
                          <li
                            key={b}
                            className={`flex items-start gap-2.5 text-sm leading-relaxed ${
                              isEmphasized
                                ? svc.theme === 'dark'
                                  ? 'text-[#0C0C0C]'
                                  : 'text-white/90'
                                : 'text-[#0C0C0C]'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-px shrink-0 mt-[10px] ${
                                isEmphasized
                                  ? svc.theme === 'dark'
                                    ? 'bg-[#0C0C0C]'
                                    : 'bg-[#FFD84D]'
                                  : 'bg-[#0C0C0C]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/contact"
                        className={`inline-flex items-center justify-center font-bold px-5 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px] mt-2 ${
                          isEmphasized
                            ? svc.theme === 'dark'
                              ? 'bg-[#0C0C0C] text-[#FFD84D] hover:bg-white hover:text-[#0C0C0C]'
                              : 'bg-[#FFD84D] text-[#0C0C0C] hover:bg-white hover:text-[#0C0C0C]'
                            : 'bg-[#0C0C0C] text-white hover:bg-[#FFD84D] hover:text-[#0C0C0C]'
                        }`}
                      >
                        {tier.cta} →
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bridge */}
          <p
            className={`mt-12 pl-5 border-l-[3px] ${t.bridgeBorder} ${t.textSecondary} text-[15px] md:text-base italic leading-relaxed max-w-3xl`}
          >
            {svc.bridge}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href={svc.ctaHref ?? '/contact'}
              className={`inline-flex items-center justify-center font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px] ${t.ctaPrimary}`}
            >
              {svc.cta} →
            </Link>
            {!isLast && (
              <a
                href={`#${services[index + 1].slug}`}
                className={`${t.textMuted} text-sm font-medium hover:${t.textPrimary} inline-flex items-center gap-2 transition-colors`}
                aria-label={`Continue to ${services[index + 1].name}`}
              >
                Next: {services[index + 1].name}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Add-Ons ─────────────────────────────────────────────────────────────────

const addOns = [
  {
    name: 'Rush Delivery',
    description: 'Priority build, delivered in 3 business days.',
  },
  {
    name: 'Extra Workflow',
    description: 'Add a second workflow to any Build Sprint.',
  },
  {
    name: 'Brand Identity Add-On',
    description: 'Logo, color palette, and typography system.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServicesContent() {
  return (
    <>
      <Navbar yellowHero />
      <main>
        {/* Hero */}
        <section className="bg-[#FFD84D] pt-32 pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="max-w-3xl">
                <p className="text-[#0C0C0C]/55 text-xs font-semibold uppercase tracking-[0.14em] mb-5">
                  Services · Four moves, one path
                </p>
                <h1 className="text-[clamp(40px,6vw,76px)] text-[#0C0C0C] leading-[0.98] mb-6 uppercase font-[family-name:var(--font-anton)]">
                  We build the systems
                  <br className="hidden sm:block" /> your business runs on.
                </h1>
                <p className="text-[#0C0C0C]/75 text-base sm:text-xl leading-relaxed max-w-2xl mb-6">
                  Four services. One clear path. No tech overwhelm. Most clients
                  start with the Audit, ship the first workflow, train the team,
                  and stay on retainer.
                </p>
                {/* Inline service jump links */}
                <div className="flex flex-wrap gap-x-5 gap-y-3 mt-2 pt-6 border-t border-[#0C0C0C]/15">
                  {services.map((s, i) => (
                    <a
                      key={s.slug}
                      href={`#${s.slug}`}
                      className="group inline-flex items-baseline gap-2 text-[#0C0C0C] text-sm font-semibold hover:underline underline-offset-4"
                    >
                      <span className="text-[#0C0C0C]/40 font-mono text-xs">0{i + 1}</span>
                      <span>{s.name}</span>
                      <span className="text-[#0C0C0C]/40 text-xs font-normal">— {s.price}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className="relative w-[220px] h-[328px] lg:w-[280px] lg:h-[418px] mx-auto lg:mx-0 shrink-0 rounded-3xl overflow-hidden border-2 border-[#0C0C0C]/10 shadow-[0_20px_50px_rgba(12,12,12,0.18)]"
                aria-hidden="true"
              >
                <Image
                  src="/stacka-laptop.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, 220px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article sections */}
        {services.map((svc, i) => (
          <ArticleSection key={svc.slug} svc={svc} index={i} />
        ))}

        {/* Add-Ons */}
        <section className="bg-[#F6F4EF] py-20 border-t border-[#E2DED8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-3">
                Add-Ons
              </p>
              <h2 className="text-[clamp(24px,3.5vw,42px)] text-[#0C0C0C] leading-tight mb-2 uppercase font-[family-name:var(--font-anton)]">
                Extend any service
              </h2>
              <p className="text-[#888580] text-base">
                Available with any of the four services above.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-0 mt-8">
              {addOns.map((addon, i) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                  className="flex gap-5 py-7 border-t border-[#0C0C0C]/15 sm:pr-6"
                >
                  <span
                    className="w-4 h-px mt-[11px] shrink-0 bg-[#0C0C0C]/40"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-[#0C0C0C] font-normal text-base mb-1">
                      {addon.name}
                    </h3>
                    <p className="text-[#888580] text-sm leading-relaxed">
                      {addon.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other ways to start (Self-Serve + Free Resource) */}
        <section className="bg-[#F6F4EF] py-20 md:py-24 border-t border-[#E2DED8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 max-w-2xl"
            >
              <p className="text-[#0C0C0C]/60 text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                // Other ways to start
              </p>
              <h2 className="text-[clamp(24px,3.5vw,42px)] text-[#0C0C0C] leading-tight uppercase font-[family-name:var(--font-anton)]">
                Not ready for a custom build?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="bg-[#0C0C0C] rounded-2xl p-8 md:p-10 flex flex-col text-white"
              >
                <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.16em] mb-3">
                  // Self-Serve
                </p>
                <h3 className="text-[clamp(26px,3.6vw,40px)] uppercase leading-[1.0] mb-3">
                  Skip the call. Grab a <span className="text-[#FFD84D]">starter pack.</span>
                </h3>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5 flex-grow">
                  Instant-download digital products built by Stackd Studios — starter
                  packs, templates, courses, and automation kits. Self-serve, no scoping
                  required.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Starter Packs', 'Templates', 'Courses', 'Automation Kits'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/10 border border-white/15 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/store"
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px] self-start"
                >
                  Browse the Store →
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="bg-[#0C0C0C] rounded-2xl p-8 md:p-10 flex flex-col text-white"
              >
                <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.16em] mb-3">
                  // Free Resource
                </p>
                <h3 className="text-[clamp(26px,3.6vw,40px)] uppercase leading-[1.0] mb-3">
                  The AI toolkit for <span className="text-[#FFD84D]">small business.</span>
                </h3>
                <p className="text-white/75 text-base md:text-lg leading-relaxed mb-5 flex-grow">
                  30+ tools curated, ranked, and updated quarterly. Yours free —
                  permanent access link, no credit card.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['30+ tools', '6 categories', 'Updated quarterly', 'Free'].map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/10 border border-white/15 text-white text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/ai-toolkit"
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px] self-start"
                >
                  Get the toolkit →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#0C0C0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[clamp(28px,4vw,52px)] text-white leading-[1.1] mb-4 uppercase font-[family-name:var(--font-anton)]">
                Not sure where to start?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                The Audit is always the answer. 48 hours and you&apos;ll know exactly what to build.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                Book the Audit — $397 →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
