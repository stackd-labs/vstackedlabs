'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Price from './Price'
import { DIVISIONS, type Division } from '@/lib/divisions'

const THEMES: Record<
  Division['theme'],
  { section: string; ink: string; muted: string; card: string; border: string }
> = {
  cream: {
    section: 'bg-[#F6F4EF]',
    ink: 'text-[#0C0C0C]',
    muted: 'text-[#888580]',
    card: 'bg-white',
    border: 'border-[#E2DED8]',
  },
  white: {
    section: 'bg-white',
    ink: 'text-[#0C0C0C]',
    muted: 'text-[#888580]',
    card: 'bg-[#F6F4EF]',
    border: 'border-[#E2DED8]',
  },
  yellow: {
    section: 'bg-[#FFD84D]',
    ink: 'text-[#0C0C0C]',
    muted: 'text-[#0C0C0C]/60',
    card: 'bg-white',
    border: 'border-[#0C0C0C]/15',
  },
  dark: {
    section: 'bg-[#0C0C0C]',
    ink: 'text-white',
    muted: 'text-white/50',
    card: 'bg-white/[0.04]',
    border: 'border-white/10',
  },
}

export default function DivisionPage({ division }: { division: Division }) {
  const t = THEMES[division.theme]
  const isDark = division.theme === 'dark'
  const accent = isDark ? division.accentOnDark : division.accent
  const others = DIVISIONS.filter((d) => d.slug !== division.slug)

  return (
    <>
      <Navbar darkHero={isDark} yellowHero={division.theme === 'yellow'} />

      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section
          className={`relative ${t.section} pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden`}
          aria-labelledby="division-heading"
        >
          <div
            className={`${isDark ? 'dot-grid-navy opacity-40' : 'dot-grid opacity-[0.05]'} absolute inset-0 pointer-events-none`}
            aria-hidden="true"
          />
          <div
            className="absolute top-[-15%] right-[-8%] w-[520px] h-[520px] rounded-full pointer-events-none orb-1"
            style={{
              background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
              opacity: isDark ? 0.22 : 0.14,
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <span style={{ color: accent }}>
                <Icon name={division.icon} size={34} strokeWidth={1.5} />
              </span>
              <span
                className="text-xs font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: isDark ? `${accent}22` : `${accent}1A`,
                  color: accent,
                }}
              >
                {division.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              id="division-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className={`text-[clamp(36px,6.5vw,76px)] leading-[1.02] ${t.ink} max-w-4xl mb-6`}
            >
              {division.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className={`text-[clamp(18px,2.4vw,24px)] leading-snug mb-4 max-w-2xl ${t.ink} opacity-80 font-[family-name:var(--font-instrument-sans)]`}
            >
              {division.promise}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className={`${t.muted} text-lg leading-relaxed max-w-xl mb-10`}
            >
              {division.oneLiner}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] ${
                  division.theme === 'yellow'
                    ? // Gold on a gold hero would vanish, so invert it.
                      'bg-[#0C0C0C] hover:bg-white text-white hover:text-[#0C0C0C]'
                    : 'bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C]'
                }`}
              >
                Start a conversation
              </Link>
              <Link
                href="#offers"
                className={`inline-flex items-center gap-2 border-2 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] ${
                  isDark
                    ? 'border-white text-white hover:bg-white hover:text-[#0C0C0C]'
                    : 'border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white'
                }`}
              >
                See what it costs
              </Link>
            </motion.div>

            {/* Sequence, when the division has one */}
            {division.sequence && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3"
                aria-label="Process"
              >
                {division.sequence.map((step, i) => (
                  <span key={step} className="flex items-center gap-3">
                    <span
                      className="text-sm font-bold uppercase tracking-[0.14em] px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor: isDark ? `${accent}1F` : `${accent}14`,
                        color: accent,
                      }}
                    >
                      {step}
                    </span>
                    {i < division.sequence!.length - 1 && (
                      <span className={t.muted} aria-hidden="true">
                        →
                      </span>
                    )}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ─── Body + capabilities ──────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-white" aria-labelledby="what-we-do-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <h2
                id="what-we-do-heading"
                className="text-[clamp(26px,3.6vw,42px)] text-[#0C0C0C] leading-[1.08] mb-7"
              >
                {division.entryLine}
              </h2>
              <div className="flex flex-col gap-5">
                {division.body.map((para, i) => (
                  <p key={i} className="text-[#3F3F3F] text-base md:text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {division.outcome && (
                <p
                  className="mt-9 text-[clamp(20px,2.6vw,30px)] leading-tight uppercase font-[family-name:var(--font-anton)]"
                  style={{ color: division.accent }}
                >
                  {division.outcome}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="rounded-2xl bg-[#F6F4EF] border border-[#E2DED8] p-7 md:p-8 sticky top-24">
                <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em] mb-6">
                  What this covers
                </p>
                <ul className="flex flex-col gap-3.5" role="list">
                  {division.capabilities.map((cap) => (
                    <li key={cap} className="flex gap-3 items-start">
                      <span
                        className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: division.accent }}
                        aria-hidden="true"
                      />
                      <span className="text-[#0C0C0C] text-sm leading-relaxed">
                        {cap}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Offers ───────────────────────────────────────────────────── */}
        <section
          id="offers"
          className="py-20 md:py-28 bg-[#F6F4EF]"
          aria-labelledby="offers-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em] mb-4">
                {division.eyebrow} Offers
              </p>
              <h2
                id="offers-heading"
                className="text-[clamp(28px,4vw,46px)] text-[#0C0C0C] leading-[1.05]"
              >
                What you can buy today.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {division.offers.map((offer, i) => (
                <motion.article
                  key={offer.slug}
                  id={offer.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className={`relative bg-white rounded-2xl p-6 flex flex-col gap-4 border scroll-mt-24 ${
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

                  <div>
                    <h3 className="text-xl text-[#0C0C0C] leading-tight mb-2">
                      {offer.name}
                    </h3>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <Price
                        value={offer.price}
                        proposed={offer.proposed}
                        className="text-2xl font-bold text-[#0C0C0C] font-[family-name:var(--font-instrument-sans)]"
                      />
                      <span className="text-[#888580] text-xs">{offer.timing}</span>
                    </div>
                  </div>

                  <p className="text-[#3F3F3F] text-sm leading-relaxed">
                    {offer.pitch}
                  </p>

                  <ul className="flex flex-col gap-2 flex-1" role="list">
                    {offer.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 items-start">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="mt-[3px] shrink-0"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 7.5l3 3 6-7"
                            stroke={division.accent}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-[#3F3F3F] text-[13px] leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={offer.ctaHref ?? '/contact'}
                    className="mt-1 inline-flex items-center justify-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 min-h-[44px]"
                  >
                    {offer.cta}
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Cross-links ──────────────────────────────────────────────── */}
        <section className="py-20 md:py-24 bg-white" aria-labelledby="other-divisions-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="mb-10 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em] mb-4">
                Wrong door?
              </p>
              <h2
                id="other-divisions-heading"
                className="text-[clamp(24px,3.4vw,38px)] text-[#0C0C0C] leading-[1.1]"
              >
                The other five divisions.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {others.map((d, i) => (
                <motion.div
                  key={d.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    href={`/${d.slug}`}
                    className="group h-full flex flex-col gap-2 rounded-2xl border border-[#E2DED8] bg-[#F6F4EF] p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
                    style={{ borderTopWidth: 3, borderTopColor: d.accent }}
                  >
                    <span style={{ color: d.accent }}>
                      <Icon name={d.icon} size={22} />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#888580]">
                      {d.eyebrow}
                    </span>
                    <span className="text-[#0C0C0C] text-sm leading-snug font-semibold">
                      {d.promise}
                    </span>
                    <span className="text-[#888580] text-xs leading-snug mt-auto pt-2">
                      {d.customer}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#0C0C0C] relative overflow-hidden">
          <div
            className="dot-grid-navy absolute inset-0 opacity-40 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-[clamp(28px,4.5vw,52px)] text-white leading-[1.05] mb-5">
              {division.promise}
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-9">
              Reply for a 15-minute chat. If {division.shortName} is not the
              right fit we will say so and point you at the division that is.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                Book a 15-minute chat
              </Link>
              <Link
                href="/ecosystem"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-[#0C0C0C] font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                See the whole ecosystem
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
