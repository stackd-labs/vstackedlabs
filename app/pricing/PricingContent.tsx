'use client'

import Icon from '@/components/Icon'
import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Price from '@/components/ecosystem/Price'
import Collapse from '@/components/ecosystem/Collapse'
import DivisionCollapseHeader from '@/components/ecosystem/DivisionCollapseHeader'
import { useHashOpen } from '@/components/ecosystem/useHashOpen'
import {
  DIVISIONS,
  allOffers,
  type Division,
  type DivisionOffer,
  type DivisionSlug,
} from '@/lib/divisions'

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Six divisions is a lot. Which one am I?',
    a: "If you want to learn to build, that's Learn. If you are already building and hit a wall, that's Builders. If something you built is broken, that's Rescue. If the software does not exist yet, that's Build. If you need engineering hours rather than a project, that's Teams. If you have a backlog your engineering org cannot reach, that's Enterprise. Still unsure: book a 15-minute chat and we will route you, including to somewhere else if we are not the fit.",
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. For anything over $1,000 we split 50% deposit and 50% on delivery. Recurring services (Builder Support, Operating Partner, Business Brain, fractional and embedded engagements) are invoiced monthly.',
  },
  {
    q: 'What if I am not sure what to build yet?',
    a: 'Start with the Systems Audit in Build. $397 and 48 hours later you have a written, prioritized roadmap. We will also tell you honestly if we are not the right fit.',
  },
  {
    q: 'My app was mostly built with AI. Will you judge that?',
    a: 'No. It is most of what comes through Rescue now. Send it as it is. We diagnose what is actually wrong, tell you whether the foundation is worth keeping, and you decide whether to fix it yourself or have us finish it.',
  },
  {
    q: 'What is the difference between Rescue and Builders?',
    a: 'Rescue is for a project: something is broken or unfinished and needs to get to working. Builders is for a person: you are building continuously and want standing access to engineers for reviews, debugging, and decisions. Many people buy a Diagnostic once and a Builder Support membership after.',
  },
  {
    q: 'What is the difference between Teams and hiring a dev shop?',
    a: 'A dev shop takes a brief and returns a deliverable. Teams puts engineers inside your workflow: your repository, your standup, your ticket queue, your definition of done. You keep the roadmap and the code. Start with fractional hours and scale when the work is obviously there.',
  },
  {
    q: 'What is the difference between Standard and Enterprise enablement?',
    a: 'Standard (from $2,500) is a 3-hour live virtual session for teams up to 10, ideal for a single department. Enterprise (from $5,000) is for teams of 10 or more: half-day or split-session format, a role-specific template library per department, and a 30-day async coaching follow-up. On-site is available for Enterprise plus travel.',
  },
  {
    q: 'What is Business Brain?',
    a: 'A private knowledge system trained only on your own documents: handbooks, SOPs, FAQs, vendor info. Your team asks it questions instead of digging through folders. It sits inside Build and starts at $500 setup plus $149/mo.',
  },
  {
    q: 'What is the difference between a landing page and a full admin portal?',
    a: 'A landing page (from $1,800) is a focused marketing site built to convert. A full admin portal (up to $3,000) is a real piece of software: a private dashboard behind a secure login where you or your clients manage content, users, bookings, or orders, with auth, a database, and integrations like payments and scheduling.',
  },
  {
    q: 'Do you build games and interactive experiences?',
    a: 'Yes, through Stackd Interactive: Roblox games, browser mini-games, branded and event games, educational games, simulations, and interactive products. Pricing is scoped per project. See the Stackd Interactive page.',
  },
  {
    q: 'Can I move between divisions?',
    a: 'That is the design. People finish Learn and buy Builder Support. Rescue clients roll into Teams. Build clients graduate into Operating Partner. Audit fees credit toward a Build Sprint booked within 30 days, and Diagnostic fees credit toward a Fix Sprint.',
  },
  {
    q: 'What do turnaround times include?',
    a: 'Turnaround runs from signed agreement and deposit received to delivery. It does not include revision rounds, which are scoped per project.',
  },
  {
    q: 'Who owns the work after it ships?',
    a: 'You do. Once final payment clears, the deliverables, code, prompts, and assets are yours. We only retain the right to reference the work in our portfolio.',
  },
  {
    q: 'Do you work with clients outside the US?',
    a: 'Yes. We work remotely with clients globally, invoice in USD, and schedule calls in your timezone where possible.',
  },
  {
    q: 'Do you sign NDAs?',
    a: 'Yes. Mutual NDAs are standard for any project where confidentiality matters. We will sign yours or send ours before scoping.',
  },
  {
    q: 'How do the self-paced courses and digital products work?',
    a: 'Buy from the store and you get instant access by email. Self-serve starter packs, templates, courses, and automation kits with no scheduling or scoping required. Course purchases credit toward a Learn cohort.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free 15-minute chat from the contact page, or go straight to the offer you already know you want. Work starts once scope is confirmed and the deposit clears.',
  },
]

// ─── Pieces ──────────────────────────────────────────────────────────────────

function OfferCard({
  offer,
  division,
}: {
  offer: DivisionOffer
  division: Division
}) {
  return (
    <div
      id={offer.slug}
      className={`scroll-mt-28 bg-white rounded-2xl border p-6 flex flex-col gap-4 h-full relative ${
        offer.popular
          ? 'border-[#FFD84D] shadow-[0_0_0_3px_#FFD84D33]'
          : 'border-[#E2DED8]'
      }`}
    >
      {offer.popular && (
        <div className="absolute -top-3 left-6">
          <span className="bg-[#FFD84D] text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full whitespace-nowrap">
            Most popular
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-1">
        <h4 className="text-lg text-[#0C0C0C] leading-tight">{offer.name}</h4>
        <div className="flex items-baseline gap-2 flex-wrap">
          <Price
            value={offer.price}
            proposed={offer.proposed}
            className="text-2xl font-bold text-[#0C0C0C] tabular-nums font-[family-name:var(--font-instrument-sans)]"
          />
          <span className="text-[#888580] text-xs">{offer.timing}</span>
        </div>
      </div>

      <p className="text-[#3F3F3F] text-sm leading-relaxed">{offer.pitch}</p>

      <ul
        className="flex flex-col gap-2 flex-1 pt-3 border-t border-[#E2DED8]"
        role="list"
      >
        {offer.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2 text-xs text-[#0C0C0C] leading-relaxed"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="shrink-0 mt-[3px]"
            >
              <path
                d="M2 7l3.5 3.5 6.5-6.5"
                stroke={division.accent}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 mt-2">
        <Link
          href={offer.ctaHref ?? '/contact'}
          className="inline-flex items-center justify-center font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px] bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C]"
        >
          {offer.cta}
        </Link>
        <Link
          href={`/${division.slug}#${offer.slug}`}
          className="text-center text-[#888580] hover:text-[#0C0C0C] text-xs font-medium transition-colors"
        >
          Read the full breakdown
        </Link>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PricingContent() {
  const [openSlugs, setOpenSlugs] = useState<DivisionSlug[]>([])

  const allOpen = openSlugs.length === DIVISIONS.length
  const toggleAll = () =>
    setOpenSlugs(allOpen ? [] : DIVISIONS.map((d) => d.slug))
  const setOpen = (slug: DivisionSlug, next: boolean) =>
    setOpenSlugs((prev) =>
      next ? (prev.includes(slug) ? prev : [...prev, slug]) : prev.filter((s) => s !== slug),
    )

  // A deep link like /pricing#teams or /pricing#team-enablement opens the
  // owning division and scrolls to it, rather than landing on a closed row.
  useHashOpen((slug) => setOpen(slug, true))

  /** Jump nav: open the division and scroll, rather than a bare anchor. */
  const jumpTo = (slug: DivisionSlug) => {
    setOpen(slug, true)
    requestAnimationFrame(() => {
      document
        .getElementById(slug)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const offerCount = allOffers().length

  return (
    <>
      <Navbar />
      <main className="bg-[#F6F4EF]">
        {/* Hero */}
        <section className="pt-32 pb-12 bg-white border-b border-[#E2DED8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
              Pricing · Division by division
            </p>
            <h1 className="text-[clamp(36px,5vw,60px)] text-[#0C0C0C] leading-[1.0] mb-5">
              Real prices, all six divisions.
            </h1>
            <p className="text-[#888580] text-lg leading-relaxed max-w-2xl mx-auto mb-7">
              {offerCount} offers, so nothing is open by default. Pick the
              division that matches where you are. Want the story behind each
              one?{' '}
              <Link
                href="/ecosystem"
                className="text-[#0C0C0C] font-semibold underline underline-offset-4 hover:text-[#FFD84D] transition-colors"
              >
                Read the ecosystem page
              </Link>
              .
            </p>

            {/* Jump nav */}
            <nav
              className="flex flex-wrap justify-center gap-2 mb-7"
              aria-label="Jump to a division"
            >
              {DIVISIONS.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => jumpTo(d.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] px-3.5 py-2 rounded-full border transition-colors min-h-[40px] hover:opacity-80"
                  style={{
                    color: d.accent,
                    borderColor: `${d.accent}44`,
                    backgroundColor: `${d.accent}0D`,
                  }}
                >
                  <Icon name={d.icon} size={14} strokeWidth={1.9} />
                  {d.shortName}
                </button>
              ))}
            </nav>

            <div className="inline-flex items-start gap-2.5 bg-[#FFD84D]/10 border border-[#FFD84D]/40 rounded-xl px-5 py-3 max-w-xl mx-auto text-left">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0 mt-0.5"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="6.5" stroke="#FFD84D" strokeWidth="1.5" />
                <path
                  d="M8 5v3.5M8 10.5v.5"
                  stroke="#FFD84D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[#0C0C0C] text-sm leading-relaxed">
                <span className="font-semibold">Flat rates.</span> If your
                project needs custom scope we confirm before any work begins. No
                charges without your approval.
              </p>
            </div>
          </div>
        </section>

        {/* Division sections, collapsed at rest */}
        <section className="py-12 md:py-16" aria-labelledby="divisions-pricing-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2
                id="divisions-pricing-heading"
                className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em]"
              >
                {DIVISIONS.length} divisions · {offerCount} offers
              </h2>
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs font-semibold text-[#0C0C0C] underline decoration-[#FFD84D] decoration-2 underline-offset-4 hover:decoration-[#0C0C0C] transition-colors min-h-[40px] px-1"
              >
                {allOpen ? 'Collapse all' : 'Expand all'}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {DIVISIONS.map((division) => (
                <div key={division.slug} id={division.slug} className="scroll-mt-20">
                  <Collapse
                    tone="white"
                    open={openSlugs.includes(division.slug)}
                    onToggle={(next) => setOpen(division.slug, next)}
                    header={<DivisionCollapseHeader division={division} />}
                  >
                    <p className="text-[#3F3F3F] text-sm leading-relaxed mb-6 max-w-2xl">
                      {division.oneLiner} For{' '}
                      {division.customer.toLowerCase()}.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {division.offers.map((offer) => (
                        <OfferCard
                          key={offer.slug}
                          offer={offer}
                          division={division}
                        />
                      ))}
                    </div>

                    <Link
                      href={`/${division.slug}`}
                      className="mt-6 inline-flex items-center gap-2 border-2 border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 min-h-[44px]"
                    >
                      Visit {division.shortName}
                    </Link>
                  </Collapse>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[#888580] text-sm">
              Prefer everything at once? The{' '}
              <Link
                href="/services"
                className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2"
              >
                services page
              </Link>{' '}
              has all {offerCount} in one sortable table, plus a price ladder.
            </p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Collapse
              tone="white"
              header={
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#888580]">
                    Add-ons
                  </span>
                  <span className="text-[#0C0C0C] text-[clamp(16px,2vw,21px)] leading-tight uppercase font-[family-name:var(--font-anton)]">
                    Available with anything above
                  </span>
                </span>
              }
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: 'Rush delivery',
                    detail:
                      'Priority build, delivered in 3 business days instead of 5.',
                  },
                  {
                    name: 'Extra workflow',
                    detail: 'Add a second workflow to any Build Sprint.',
                  },
                  {
                    name: 'Brand identity',
                    detail: 'Logo, color palette, and typography system.',
                  },
                  {
                    name: 'On-site delivery',
                    detail:
                      'In-person training or workshops, plus travel. Enterprise only.',
                  },
                ].map((addon) => (
                  <div
                    key={addon.name}
                    className="rounded-2xl border border-[#E2DED8] bg-[#F6F4EF] p-5"
                  >
                    <h4 className="text-base text-[#0C0C0C] leading-tight mb-2">
                      {addon.name}
                    </h4>
                    <p className="text-[#888580] text-sm leading-relaxed">
                      {addon.detail}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[#888580] text-sm">
                Add-on pricing is quoted with your scope.{' '}
                <Link
                  href="/contact"
                  className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2"
                >
                  Ask about one
                </Link>
                .
              </p>
            </Collapse>
          </div>
        </section>

        {/* Enterprise callout — stays open, it is the top of the range */}
        <section className="py-12 md:py-16 bg-white border-y border-[#E2DED8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#0C0C0C] rounded-2xl p-7 md:p-9 grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center">
              <div>
                <p className="text-[#FFD84D] text-[10px] font-bold uppercase tracking-[0.16em] mb-3">
                  Enterprise capacity
                </p>
                <h2 className="text-white text-[clamp(22px,3vw,34px)] uppercase font-[family-name:var(--font-anton)] leading-[1.05] mb-3">
                  When the problem is a backlog, not a project.
                </h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-1">
                  A dedicated pod working your deferred projects under your
                  SDLC, your security review, and your reporting cadence. Starts
                  with a Capacity Assessment so nobody guesses at scope.
                </p>
                <p className="text-white/55 text-xs leading-relaxed">
                  BAA and FedRAMP-aligned providers where contracts require it.
                  On-premise deployment available.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <div className="text-white">
                  <span className="text-[#FFD84D] text-3xl md:text-4xl font-bold font-[family-name:var(--font-instrument-sans)]">
                    From $18,000/mo
                  </span>
                </div>
                <Link
                  href="/enterprise"
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px] whitespace-nowrap"
                >
                  See Stackd Enterprise
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ — every answer collapsed at rest */}
        <section className="py-14 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-[#0C0C0C] leading-tight mb-3 text-center">
              Common questions
            </h2>
            <p className="text-[#888580] text-sm text-center mb-10">
              {faqs.length} of them. Open the ones you care about.
            </p>

            <div className="flex flex-col gap-2.5">
              {faqs.map((faq) => (
                <Collapse
                  key={faq.q}
                  tone="white"
                  header={
                    <span className="text-[#0C0C0C] text-sm sm:text-base font-normal leading-snug pr-2 block">
                      {faq.q}
                    </span>
                  }
                >
                  <p className="text-[#3F3F3F] text-sm leading-relaxed max-w-2xl">
                    {faq.a}
                  </p>
                </Collapse>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#0C0C0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[clamp(28px,4vw,52px)] text-white leading-[1.1] mb-4">
              Still not sure which door?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Tell us where you are in one paragraph. We will name the division
              and the offer, or tell you we are not the right fit.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
            >
              Reply for a 15-minute chat
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
