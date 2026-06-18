'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Service {
  slug: string
  tierLabel: string
  name: string
  price: string
  timing: string
  oneLiner: string
  bullets: string[]
  cta: string
  /** CTA target — defaults to /contact. */
  ctaHref?: string
  /** "Read the full breakdown" link target — defaults to /services#{slug}. */
  detailsHref?: string
  popular?: boolean
}

const services: Service[] = [
  {
    slug: 'audit',
    tierLabel: 'Start Here',
    name: 'Systems Audit',
    price: '$397',
    timing: '48-hour turnaround',
    oneLiner:
      'A 48-hour written roadmap of the systems and automations that would actually move your needle.',
    bullets: [
      'Async operations intake form',
      '3–5 prioritized systems to build',
      'Written roadmap in 48 hours',
      '30-min walkthrough call',
    ],
    cta: 'Book the Audit',
  },
  {
    slug: 'quick-setup',
    tierLabel: 'Most Popular',
    name: 'Build Sprint',
    price: '$997',
    timing: '5 business days',
    oneLiner:
      'One workflow, scoped tight, shipped in 5 days, with a training call so you can use it Monday.',
    bullets: [
      'One complete workflow build',
      '10–15 custom automation building blocks',
      '1-hour orientation + training call',
      '7 days post-delivery support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    slug: 'team-training',
    tierLabel: 'For Teams',
    name: 'Team Enablement',
    price: 'From $2,500',
    timing: 'Within 2 weeks',
    oneLiner:
      'Live virtual training that gets your team running the systems in their real workflows. Standard for ≤10, Enterprise for larger teams.',
    bullets: [
      'Standard: From $2,500 (teams up to 10)',
      'Enterprise: From $5,000 (teams of 10+)',
      'Custom templates + recording included',
      'Enterprise adds role-specific library + 30-day follow-up',
    ],
    cta: 'Book Enablement',
  },
  {
    slug: 'retainer',
    tierLabel: 'Ongoing',
    name: 'Operating Partner',
    price: '$1,500/mo',
    timing: 'Monthly',
    oneLiner:
      'A new build, system tune-ups, a strategy call, and priority support — every month.',
    bullets: [
      '1 new workflow or tool / month',
      '5–10 system tune-ups / month',
      'Monthly strategy call',
      'Priority async support',
    ],
    cta: 'Apply for Operating Partner',
  },
  {
    slug: 'business-brain',
    tierLabel: 'Knowledge System',
    name: 'Business Brain',
    price: 'From $500 + $149/mo',
    timing: '2-week build',
    oneLiner:
      'A private knowledge system trained on your SOPs, handbooks, and FAQs. Your team just asks it.',
    bullets: [
      'Starter: $500 setup + $149/mo',
      'Pro: $1,500 + $349/mo (multi-dept)',
      'Trained only on your business docs',
      'Monthly maintenance + re-training',
    ],
    cta: 'Get Your Brain Built',
    ctaHref: '/contact',
    detailsHref: '/business-brain',
  },
  {
    slug: 'website-build',
    tierLabel: 'Websites',
    name: 'Website Build',
    price: '$1,800–$3,000',
    timing: '1–3 weeks',
    oneLiner:
      'From a high-converting landing page to a full site with a private admin portal — built on a modern, fast stack and fully yours at handoff.',
    bullets: [
      'Landing Page: from $1,800',
      'Full Site + Admin Portal: up to $3,000',
      'Custom design, copy, mobile-first + SEO basics',
      'Portal adds auth, database, bookings/orders',
    ],
    cta: 'Start your website',
  },
]

function PricingCard({ svc }: { svc: Service }) {
  const isPopular = svc.popular === true

  return (
    <div
      className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 border h-full ${
        isPopular
          ? 'border-[#FFD84D] shadow-[0_0_0_3px_#FFD84D33]'
          : 'border-[#E2DED8]'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-[#FFD84D] text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-1">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            isPopular ? 'text-[#0C0C0C]' : 'text-[#888580]'
          }`}
        >
          {svc.tierLabel}
        </span>
        <h3 className="text-lg text-[#0C0C0C] leading-tight">{svc.name}</h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl font-bold text-[#0C0C0C] font-[family-name:var(--font-instrument-sans)]">
            {svc.price}
          </span>
          <span className="text-[#888580] text-xs">{svc.timing}</span>
        </div>
      </div>

      <p className="text-[#3F3F3F] text-sm leading-relaxed">{svc.oneLiner}</p>

      <ul className="flex flex-col gap-2 flex-1 pt-3 border-t border-[#E2DED8]" role="list">
        {svc.bullets.map((b) => (
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
                stroke="#0C0C0C"
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
          href={svc.ctaHref ?? '/contact'}
          className="inline-flex items-center justify-center font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px] bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C]"
        >
          {svc.cta} →
        </Link>
        <Link
          href={svc.detailsHref ?? `/services#${svc.slug}`}
          className="text-center text-[#888580] hover:text-[#0C0C0C] text-xs font-medium transition-colors"
        >
          Read the full breakdown →
        </Link>
      </div>
    </div>
  )
}

export default function PricingContent() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F6F4EF]">
        {/* Hero */}
        <section className="pt-32 pb-12 bg-white border-b border-[#E2DED8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
              Pricing · At a glance
            </p>
            <h1 className="text-[clamp(36px,5vw,60px)] text-[#0C0C0C] leading-[1.0] mb-5">
              Six ways to work. Real prices.
            </h1>
            <p className="text-[#888580] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              The price you see is the price we scope to. Want the full editorial
              breakdown? <Link href="/services" className="text-[#0C0C0C] font-semibold underline underline-offset-4 hover:text-[#FFD84D] transition-colors">Read the services page</Link>.
            </p>

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
                <span className="font-semibold">Flat rates.</span>{' '}
                If your project needs custom scope, we&apos;ll confirm before any work begins. No charges without your approval.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing grid */}
        <section className="py-16 md:py-20 bg-[#FFD84D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((svc) => (
                <PricingCard key={svc.slug} svc={svc} />
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-20 bg-white border-t border-[#E2DED8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-3">
                What&apos;s included
              </p>
              <h2 className="text-[clamp(24px,3.5vw,40px)] text-[#0C0C0C] leading-tight">
                Side-by-side
              </h2>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-3 px-4 text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] border-b-2 border-[#0C0C0C] w-[22%]">
                      &nbsp;
                    </th>
                    {services.map((s) => (
                      <th
                        key={s.slug}
                        className="text-left py-3 px-4 border-b-2 border-[#0C0C0C]"
                      >
                        <div className="text-[10px] text-[#888580] font-bold uppercase tracking-[0.12em] mb-1">
                          {s.tierLabel}
                        </div>
                        <div className="text-[#0C0C0C] text-base font-semibold">
                          {s.name}
                        </div>
                        <div className="text-[#0C0C0C] text-lg font-bold font-[family-name:var(--font-instrument-sans)] mt-1">
                          {s.price}
                        </div>
                        {s.slug === 'team-training' && (
                          <div className="text-[#888580] text-[10px] mt-0.5">
                            Enterprise from $5,000
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: 'Turnaround',
                      vals: ['48 hours', '5 days', '~2 weeks', 'Monthly', '2 weeks', '1–3 weeks'],
                    },
                    {
                      label: 'What you get',
                      vals: [
                        'Written roadmap',
                        '1 workflow build',
                        'Live training session',
                        '1 workflow / month',
                        'Private knowledge system',
                        'Landing page or full admin portal',
                      ],
                    },
                    {
                      label: 'Prompts & automations',
                      vals: [
                        'Roadmap only',
                        '10–15',
                        'Templates + library',
                        '5–10 / month',
                        'Trained on your docs',
                        'Payments / email / scheduling as needed',
                      ],
                    },
                    {
                      label: 'Live call(s)',
                      vals: [
                        '30 min walkthrough',
                        '1 hr orientation',
                        '3 hr (Standard) / Half-day (Enterprise)',
                        'Monthly strategy',
                        'Setup + monthly review',
                        'Kickoff + launch review',
                      ],
                    },
                    {
                      label: 'Team size',
                      vals: ['—', '—', 'Up to 10 / 10+', '—', 'All staff', '—'],
                    },
                    {
                      label: 'Post-delivery support',
                      vals: [
                        '—',
                        '7 days email',
                        'Recording + folder · Enterprise: 30-day async coaching',
                        'Priority async',
                        'Monthly maintenance + re-training',
                        '14 days post-launch',
                      ],
                    },
                    {
                      label: 'Best for',
                      vals: [
                        'Owners deciding what to build',
                        'Owners with one clear bottleneck',
                        'Teams ready to adopt the systems together',
                        'Existing clients who want to keep building',
                        'Teams that need 24/7 answers from their own docs',
                        'Businesses that need a real website or client portal',
                      ],
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-[#E2DED8] last:border-b-0">
                      <td className="py-4 px-4 text-[#0C0C0C] text-sm font-semibold align-top">
                        {row.label}
                      </td>
                      {row.vals.map((val, i) => (
                        <td
                          key={i}
                          className="py-4 px-4 text-[#3F3F3F] text-sm align-top"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Enterprise Training callout */}
            <div className="mt-12 bg-[#0C0C0C] rounded-2xl p-7 md:p-9 grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-center">
              <div>
                <p className="text-[#FFD84D] text-[10px] font-bold uppercase tracking-[0.16em] mb-3">
                  // Enterprise Team Enablement
                </p>
                <h3 className="text-white text-[clamp(22px,3vw,34px)] uppercase font-[family-name:var(--font-anton)] leading-[1.05] mb-3">
                  For teams of 10+ and multi-department rollouts.
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-1">
                  Half-day or split-session format, role-specific prompt library
                  per department, and a 30-day async coaching follow-up. On-site
                  available where it makes sense.
                </p>
                <p className="text-white/55 text-xs leading-relaxed">
                  Demand is far ahead of supply right now — most providers in this
                  space charge $10K–$40K. We cap sessions per quarter and recommend booking early.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <div className="text-white">
                  <span className="text-[#FFD84D] text-3xl md:text-4xl font-bold font-[family-name:var(--font-instrument-sans)]">
                    From $5,000
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] min-h-[44px] whitespace-nowrap"
                >
                  Book Enterprise Enablement →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F6F4EF] border-t border-[#E2DED8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-[#0C0C0C] leading-tight mb-10 text-center">
              Common questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
              {[
                {
                  q: 'Do you offer payment plans?',
                  a: 'Yes. For services over $1,000, we offer a 50% deposit + 50% on delivery split. Recurring services (Operating Partner, Business Brain) are invoiced monthly.',
                },
                {
                  q: "What if I'm not sure which one is right?",
                  a: "Start with the Audit — that's literally what it's for. $397 and 48 hours later, you'll know exactly what to build. We'll also tell you honestly if we're not the right fit.",
                },
                {
                  q: "What's the difference between Standard and Enterprise Team Enablement?",
                  a: "Standard ($2,500) is a 3-hour live virtual session for teams up to 10 — perfect for small teams or single-department training. Enterprise (from $5,000) is for teams of 10+ and includes a half-day or split-session format, role-specific template library per department, and a 30-day async coaching follow-up. On-site option available for Enterprise (+ travel).",
                },
                {
                  q: "What is Business Brain and how is it different from the other services?",
                  a: "Business Brain is a private knowledge system trained only on your company's docs — handbooks, SOPs, FAQs, vendor info. Your team chats with it instead of digging through folders. The other services build workflows for you; Business Brain builds a knowledge layer your team queries directly. Starts at $500 setup + $149/mo.",
                },
                {
                  q: "What's the difference between a Landing Page and a Full Admin Portal?",
                  a: "A Landing Page (from $1,800) is a focused marketing site — one to a handful of pages built to convert: capture leads, sell an offer, or launch something. A Full Admin Portal (up to $3,000) is a complete site with a private dashboard behind a secure login, where you or your clients manage content, users, bookings, or orders — a real piece of software with auth, a database, and integrations like payments and scheduling. Most projects land between $1,800 and $3,000; we confirm exact scope and price before any work begins.",
                },
                {
                  q: 'Do you build games and interactive experiences too?',
                  a: "Yes — that's Stackd Interactive, our AI-assisted game and interactive experience studio. We build Roblox games, browser mini-games, branded/event games, educational games, simulations, and interactive digital products, with a focus on fast prototyping, testing, and launch. Pricing is scoped per project depending on platform and complexity — start with a quick prototype or reach out to talk through an idea. See the Stackd Interactive page for concepts and offers.",
                },
                {
                  q: 'Can I move from one service to another?',
                  a: 'Yes. Most clients start with the Audit, move into a Build Sprint, and graduate to the Operating Partner plan or Business Brain. Your audit fee gets credited toward your Build Sprint if you book within 30 days.',
                },
                {
                  q: 'What do turnaround times include?',
                  a: 'Turnaround is from signed agreement + deposit received to delivery. It does not include revision rounds, which are scoped per project.',
                },
                {
                  q: 'How do we get started?',
                  a: "Book a free 20-minute discovery call from our contact page, or go straight to the Audit if you already know that's the move. After scope is confirmed and the deposit clears, work starts.",
                },
                {
                  q: 'Who owns the work after it ships?',
                  a: 'You do. Once final payment clears, the deliverables, code, prompts, and assets are yours. We only retain the right to reference our work in our portfolio.',
                },
                {
                  q: 'Do you work with clients outside the US?',
                  a: 'Yes. We work remotely with clients globally — invoicing in USD and scheduling calls in your timezone where possible.',
                },
                {
                  q: 'Do you sign NDAs?',
                  a: "Yes — mutual NDAs are standard for any project where confidentiality matters. We'll sign yours or send ours before scoping.",
                },
                {
                  q: 'What about ongoing support after a Build Sprint or Enablement?',
                  a: "Most clients move into either the Operating Partner plan for ongoing iteration, or Business Brain if their bottleneck is staff knowledge access. We'll talk through fit on your wrap-up call.",
                },
                {
                  q: 'How do digital products and starter packs work?',
                  a: "Buy from the store and you'll get instant access by email. They're self-serve starter packs, templates, courses, and automation kits — no scheduling or scoping required.",
                },
                {
                  q: 'Do you only work in certain industries?',
                  a: "We've gone deep in behavioral health, dance studios, real estate, staffing, gov contracting, nonprofits, field services, and creator businesses — but the underlying systems work anywhere there's documentation, follow-up, or content to automate. Business Brain in particular is a strong fit for restaurants, gyms, salons, hotels, retail, and medical/dental offices.",
                },
                {
                  q: 'Is the Operating Partner plan available to anyone?',
                  a: "We give Build Sprint and Team Enablement clients first access. If we have capacity beyond that, we open it up. Apply via the contact form and we'll let you know either way.",
                },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-[#E2DED8] pb-6">
                  <h3 className="text-base text-[#0C0C0C] mb-2">{faq.q}</h3>
                  <p className="text-[#888580] text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-[#0C0C0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[clamp(28px,4vw,52px)] text-white leading-[1.1] mb-4">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
