'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const TOOLKIT_HREF = '/free/toolkit'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export default function AiToolkitFunnelContent() {
  return (
    <>
      <Navbar yellowHero />
      <main>
        {/* ============================ */}
        {/* HERO — yellow                */}
        {/* ============================ */}
        <section
          className="relative pt-32 pb-20 md:pb-28 bg-[#FFD84D] overflow-hidden"
          aria-label="Free AI toolkit hero"
        >
          {/* subtle dark orb */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(12,12,12,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
              <motion.div {...fadeUp}>
                <div className="inline-flex items-center gap-2 bg-[#0C0C0C] text-[#FFD84D] text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D]" aria-hidden="true" />
                  Free Resource · Stackd Studios AI
                </div>
                <h1 className="text-[clamp(44px,7.5vw,108px)] text-[#0C0C0C] leading-[0.95] mb-6 uppercase">
                  The AI toolkit
                  <br />
                  <span className="text-white" style={{ WebkitTextStroke: '2px #0C0C0C' }}>
                    for small businesses
                  </span>
                </h1>
                <p className="text-[#0C0C0C] text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-medium">
                  30+ free and low-cost AI tools, organized by what you actually
                  need to get done. We curated, tested, and ranked them so you
                  don&apos;t have to. <strong>Yours forever, updated quarterly.</strong>
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <Link
                    href={TOOLKIT_HREF}
                    className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-white text-white hover:text-[#0C0C0C] font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px] shadow-[0_4px_0_rgba(0,0,0,0.18)]"
                  >
                    Get the toolkit free →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center border-2 border-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white text-[#0C0C0C] font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 min-h-[48px]"
                  >
                    Have questions? Talk to us
                  </Link>
                </div>

                {/* Trust strip */}
                <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[#0C0C0C] text-sm font-semibold" role="list">
                  <li className="flex items-center gap-2">
                    <CheckPill /> No credit card
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckPill /> One email, permanent access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckPill /> No spam, ever
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative aspect-square w-full max-w-[460px] mx-auto"
              >
                <Image
                  src="/stackd-toolkit-logo.png"
                  alt="Stackd Studios AI · The AI Toolkit for Small Businesses"
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 460px"
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================ */}
        {/* WHO IT'S FOR — cream         */}
        {/* ============================ */}
        <section className="bg-[#F6F4EF] py-20 md:py-28" aria-labelledby="who-h">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-12">
              <p className="text-[#0C0C0C] text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                // Built for owners like you
              </p>
              <h2
                id="who-h"
                className="text-[clamp(36px,5vw,64px)] text-[#0C0C0C] leading-[1.0] mb-6 uppercase"
              >
                If any of this sounds like you, this toolkit was built for you.
              </h2>
              <p className="text-[#3F3F3F] text-lg leading-relaxed">
                You don&apos;t need another 200-tool listicle. You need a real
                shortlist — what&apos;s worth your time, what to skip, and what
                to actually run your business with.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "You're drowning in admin work",
                  body: "Inbox, scheduling, intake, follow-up, invoicing — half your week is moving small things between apps. The right AI cuts that in half.",
                },
                {
                  title: "You're paying for tools you don't use",
                  body: "Most owners have 4–6 SaaS subscriptions running that overlap, conflict, or sit idle. Replace 3 of them with the right AI tool and you save real money.",
                },
                {
                  title: "You're curious about AI but cautious",
                  body: "You don't want to be the person who jumped on a hype cycle. You want what's already proven, by use case, with a clear free or low-cost path in.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white border border-[#E2DED8] rounded-2xl p-7 hover:border-[#0C0C0C] transition-colors"
                >
                  <span className="inline-block text-[#FFD84D] font-bold text-xl mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl text-[#0C0C0C] mb-3 uppercase leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[#3F3F3F] text-[15px] leading-relaxed">
                    {card.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ */}
        {/* WHAT'S INSIDE — black        */}
        {/* ============================ */}
        <section className="bg-[#0C0C0C] py-20 md:py-28 text-white relative overflow-hidden" aria-labelledby="inside-h">
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,216,77,0.18) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-end mb-14">
              <motion.div {...fadeUp}>
                <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                  // What&apos;s inside
                </p>
                <h2
                  id="inside-h"
                  className="text-[clamp(36px,5vw,64px)] leading-[1.0] uppercase"
                >
                  30+ tools.
                  <br />
                  <span className="text-[#FFD84D]">Six categories.</span>
                  <br />
                  Zero filler.
                </h2>
              </motion.div>
              <motion.div {...fadeUp} className="text-white/75 text-lg leading-relaxed">
                Every tool in the kit was tested or vetted by us before it made
                the list. We tell you the free tier limits, where the tool
                actually shines, and what it&apos;s overkill for. No affiliate
                links. No paid placements.
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              {...fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
            >
              {[
                { stat: '30+', label: 'AI tools curated' },
                { stat: '6', label: 'Categories of work' },
                { stat: 'Q', label: 'Updated quarterly' },
                { stat: '$0', label: 'To get started' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/[0.04] border border-white/10 rounded-xl p-5"
                >
                  <div className="text-[#FFD84D] text-4xl md:text-5xl font-[family-name:var(--font-anton)] uppercase leading-none mb-2">
                    {s.stat}
                  </div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Categories */}
            <motion.div
              {...fadeUp}
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
            >
              {[
                { name: 'Marketing & Content', count: '6 tools' },
                { name: 'Admin & Operations', count: '6 tools' },
                { name: 'Customer Service', count: '4 tools' },
                { name: 'Sales & Outreach', count: '5 tools' },
                { name: 'Finance & Reporting', count: '4 tools' },
                { name: 'Hiring & HR', count: '4 tools' },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-5 hover:border-[#FFD84D]/40 transition-colors"
                >
                  <div className="text-white text-base font-semibold uppercase tracking-wide mb-1">
                    {cat.name}
                  </div>
                  <div className="text-[#888580] text-xs uppercase tracking-wider">
                    {cat.count}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div {...fadeUp} className="text-center mt-12">
              <Link
                href={TOOLKIT_HREF}
                className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
              >
                Get the full toolkit →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ============================ */}
        {/* WHY US — yellow              */}
        {/* ============================ */}
        <section className="bg-[#FFD84D] py-20 md:py-28" aria-labelledby="why-h">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp}>
              <p className="text-[#0C0C0C] text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                // Why we built this
              </p>
              <h2
                id="why-h"
                className="text-[clamp(36px,5vw,64px)] text-[#0C0C0C] leading-[1.0] mb-6 uppercase"
              >
                We&apos;re a build lab. We use these tools every day.
              </h2>
              <p className="text-[#0C0C0C] text-lg md:text-xl leading-relaxed mb-6 font-medium">
                Stackd Studios builds custom operating systems for small
                business owners and founders. We sit inside dozens of small
                businesses every quarter — picking tools, building automations,
                and shipping systems that actually run.
              </p>
              <p className="text-[#0C0C0C] text-lg leading-relaxed mb-10 max-w-3xl">
                This toolkit is the shortlist we hand our clients on day one.
                We&apos;re open-sourcing it because most owners don&apos;t need an
                agency yet — they need a starting point. So here&apos;s ours.
              </p>

              <div className="bg-white border-2 border-[#0C0C0C] rounded-2xl p-7 grid md:grid-cols-[auto_1fr] gap-5 items-center">
                <div className="w-16 h-16 rounded-full bg-[#0C0C0C] text-[#FFD84D] flex items-center justify-center text-2xl font-[family-name:var(--font-anton)] uppercase shrink-0">
                  CG
                </div>
                <div>
                  <p className="text-[#0C0C0C] text-base md:text-lg leading-relaxed mb-2 italic">
                    &ldquo;Most owners don&apos;t need 200 tools. They need 6
                    categories solved with the right 1–2 tools each. That&apos;s
                    what this toolkit does.&rdquo;
                  </p>
                  <p className="text-[#0C0C0C] font-semibold text-sm">
                    Chanel Gray
                    <span className="text-[#3F3F3F] font-normal">
                      {' '}
                      · Founder, Stackd Studios AI
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================ */}
        {/* HOW IT WORKS — cream         */}
        {/* ============================ */}
        <section className="bg-[#F6F4EF] py-20 md:py-28" aria-labelledby="how-h">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-12">
              <p className="text-[#0C0C0C] text-xs font-semibold uppercase tracking-[0.16em] mb-4">
                // How it works
              </p>
              <h2
                id="how-h"
                className="text-[clamp(36px,5vw,64px)] text-[#0C0C0C] leading-[1.0] mb-6 uppercase"
              >
                Three steps. Sixty seconds.
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  step: '01',
                  title: 'Drop your email',
                  body: "Just first name + email. We don't ask for a phone, a company, or anything else.",
                },
                {
                  step: '02',
                  title: 'Get your permanent link',
                  body: "We email a unique access link in seconds. Bookmark it once — that's your toolkit forever.",
                },
                {
                  step: '03',
                  title: 'Updates land automatically',
                  body: "Every quarter we refresh the picks, swap out tools that got worse, add ones we just tested. Your link always shows the latest.",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-white border border-[#E2DED8] rounded-2xl p-7 relative"
                >
                  <div className="absolute -top-4 -left-2 bg-[#FFD84D] text-[#0C0C0C] font-[family-name:var(--font-anton)] uppercase text-2xl px-3 py-1 rounded-md">
                    {s.step}
                  </div>
                  <h3 className="text-2xl text-[#0C0C0C] mt-3 mb-3 uppercase leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[#3F3F3F] text-[15px] leading-relaxed">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ */}
        {/* FINAL CTA — black            */}
        {/* ============================ */}
        <section
          className="relative bg-[#0C0C0C] py-24 md:py-32 overflow-hidden text-center"
          aria-label="Get the AI toolkit"
        >
          <div className="dot-grid-navy absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,216,77,0.16) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp}>
              <p className="text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.16em] mb-5">
                Ready when you are
              </p>
              <h2 className="text-[clamp(40px,6.5vw,84px)] text-white leading-[0.98] mb-6 uppercase">
                Get the AI toolkit.
                <br />
                <span className="text-[#FFD84D]">It&apos;s free.</span>
              </h2>
              <p className="text-white/70 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
                One email. Permanent link. Quarterly updates. Whenever
                you&apos;re ready to put it to work, we&apos;re here.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={TOOLKIT_HREF}
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-bold px-8 py-4 rounded-xl text-base md:text-lg transition-all duration-200 hover:scale-[1.02] min-h-[48px] shadow-[0_4px_0_rgba(255,216,77,0.25)]"
                >
                  Get the toolkit free →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-base md:text-lg transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
                >
                  Talk to a real person
                </Link>
              </div>

              <p className="mt-8 text-white/40 text-sm">
                No credit card. No spam. One email.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function CheckPill() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-5 h-5 rounded-full bg-[#0C0C0C] items-center justify-center shrink-0"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5L10 17.5L19 7.5"
          stroke="#FFD84D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
