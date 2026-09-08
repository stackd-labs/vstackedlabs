'use client'

import Icon from '@/components/Icon'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/HowItWorks'
import TechStack from '@/components/TechStack'
import FinalCTA from '@/components/FinalCTA'
import Collapse from '@/components/ecosystem/Collapse'
import DivisionCollapseHeader from '@/components/ecosystem/DivisionCollapseHeader'
import { useHashOpen } from '@/components/ecosystem/useHashOpen'
import OfferTable from '@/components/ecosystem/OfferTable'
import PriceLadder from '@/components/ecosystem/PriceLadder'
import Price from '@/components/ecosystem/Price'
import { DIVISIONS, allOffers, type Division, type DivisionSlug } from '@/lib/divisions'


/**
 * Anchors that were published before the reposition, mapped to the offer they
 * became. Old links like /services#quick-setup still land on the right offer.
 */
const LEGACY_ANCHORS: Record<string, string> = {
  'quick-setup': 'build-sprint',
  'team-training': 'team-enablement',
  retainer: 'operating-partner',
}

type View = 'list' | 'table' | 'ladder'

function views(offerCount: number): Array<{ id: View; label: string; hint: string }> {
  return [
    { id: 'list', label: 'By division', hint: 'Collapsed sections you open one at a time' },
    { id: 'table', label: 'One table', hint: `All ${offerCount} offers as sortable, filterable rows` },
    { id: 'ladder', label: 'Price ladder', hint: 'Every price plotted so you can see the gaps' },
  ]
}

function DivisionOffers({ division }: { division: Division }) {
  return (
    <>
      <p className="text-[#3F3F3F] text-sm leading-relaxed mb-5 max-w-2xl">
        {division.oneLiner} {division.entryLine}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {division.offers.map((offer) => {
          const legacyIds = Object.entries(LEGACY_ANCHORS)
            .filter(([, target]) => target === offer.slug)
            .map(([legacy]) => legacy)

          return (
            <article
              key={offer.slug}
              id={offer.slug}
              className={`relative bg-white rounded-xl border p-4 flex flex-col gap-2.5 scroll-mt-36 ${
                offer.popular
                  ? 'border-[#FFD84D] shadow-[0_0_0_2px_#FFD84D33]'
                  : 'border-[#E2DED8]'
              }`}
            >
              {/* Anchors published before the reposition */}
              {legacyIds.map((legacy) => (
                <span
                  key={legacy}
                  id={legacy}
                  className="absolute -top-24"
                  aria-hidden="true"
                />
              ))}

              <div className="flex items-start justify-between gap-2">
                <h4 className="text-base text-[#0C0C0C] leading-tight">
                  {offer.name}
                </h4>
                {offer.popular && (
                  <span className="bg-[#FFD84D] text-[#0C0C0C] text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    Popular
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <Price
                  value={offer.price}
                  proposed={offer.proposed}
                  className="text-lg font-bold text-[#0C0C0C] tabular-nums font-[family-name:var(--font-instrument-sans)]"
                />
                <span className="text-[#888580] text-[11px]">
                  {offer.timing}
                </span>
              </div>

              <p className="text-[#3F3F3F] text-xs leading-relaxed flex-1">
                {offer.pitch}
              </p>

              <Link
                href={offer.ctaHref ?? '/contact'}
                className="inline-flex items-center gap-1.5 text-[#0C0C0C] font-semibold text-xs hover:gap-2.5 transition-all duration-200"
              >
                {offer.cta}
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7h10M7 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          )
        })}
      </div>

      <Link
        href={`/${division.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-[#0C0C0C] font-semibold text-sm hover:gap-3 transition-all duration-200"
      >
        Full {division.shortName} page
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7h10M7 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </>
  )
}

export default function ServicesContent() {
  const [view, setView] = useState<View>('list')
  const [openSlugs, setOpenSlugs] = useState<DivisionSlug[]>([])

  const allOpen = openSlugs.length === DIVISIONS.length
  const toggleAll = () =>
    setOpenSlugs(allOpen ? [] : DIVISIONS.map((d) => d.slug))
  const setOpen = (slug: DivisionSlug, next: boolean) =>
    setOpenSlugs((prev) =>
      next
        ? prev.includes(slug)
          ? prev
          : [...prev, slug]
        : prev.filter((s) => s !== slug),
    )

  // A deep link like /services#build-sprint has to force the division view
  // before opening the section, or the target is not on the page at all.
  useHashOpen((slug) => {
    setView('list')
    setOpen(slug, true)
  }, LEGACY_ANCHORS)

  const offerCount = allOffers().length
  const VIEWS = views(offerCount)

  return (
    <>
      <Navbar />

      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative bg-[#F6F4EF] pt-32 pb-14 md:pt-40 md:pb-16 overflow-hidden"
          aria-labelledby="services-heading"
        >
          <div className="dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />
          <div
            className="orb-2 absolute bottom-[-40%] left-[-10%] w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #FFD84D 0%, transparent 70%)',
              opacity: 0.2,
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em] mb-5"
            >
              Everything We Offer
            </motion.p>

            <motion.h1
              id="services-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[clamp(34px,6vw,68px)] leading-[1.03] text-[#0C0C0C] max-w-3xl mb-5"
            >
              {offerCount} offers. Six divisions. Your pick of view.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-[#888580] text-lg leading-relaxed max-w-2xl"
            >
              That is a lot to read as a wall of cards, so it is not one. Open
              only the division you care about, flatten everything into one
              sortable table, or look at the price ladder.
            </motion.p>
          </div>
        </section>

        {/* ─── View switcher ────────────────────────────────────────────── */}
        <section className="bg-white border-y border-[#E2DED8] sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="flex flex-wrap items-center gap-2 py-3"
              role="tablist"
              aria-label="Choose how to browse the offers"
            >
              {VIEWS.map((v) => {
                const active = view === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    title={v.hint}
                    onClick={() => setView(v.id)}
                    className={`text-xs font-bold uppercase tracking-[0.1em] px-4 py-2.5 rounded-full border transition-colors min-h-[40px] ${
                      active
                        ? 'bg-[#0C0C0C] text-white border-[#0C0C0C]'
                        : 'bg-white text-[#888580] border-[#E2DED8] hover:text-[#0C0C0C]'
                    }`}
                  >
                    {v.label}
                  </button>
                )
              })}

              {view === 'list' && (
                <button
                  type="button"
                  onClick={toggleAll}
                  className="ml-auto text-xs font-semibold text-[#0C0C0C] underline decoration-[#FFD84D] decoration-2 underline-offset-4 hover:decoration-[#0C0C0C] transition-colors min-h-[40px] px-1"
                >
                  {allOpen ? 'Collapse all' : 'Expand all'}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── The chosen view ──────────────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[#F6F4EF]" aria-live="polite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#888580] text-sm mb-8 max-w-2xl">
              {VIEWS.find((v) => v.id === view)?.hint}.
            </p>

            {view === 'list' && (
              <div className="flex flex-col gap-3">
                {DIVISIONS.map((division) => (
                  <Collapse
                    key={division.slug}
                    tone="white"
                    open={openSlugs.includes(division.slug)}
                    onToggle={(next) => setOpen(division.slug, next)}
                    header={<DivisionCollapseHeader division={division} />}
                  >
                    <DivisionOffers division={division} />
                  </Collapse>
                ))}
              </div>
            )}

            {view === 'table' && <OfferTable />}

            {view === 'ladder' && <PriceLadder />}
          </div>
        </section>

        {/* ─── Secondary sections, collapsed ────────────────────────────── */}
        <section className="py-12 md:py-16 bg-white border-t border-[#E2DED8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-3">
            <Collapse
              tone="cream"
              header={
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#888580]">
                    The Process
                  </span>
                  <span className="text-[#0C0C0C] text-[clamp(16px,2vw,21px)] leading-tight uppercase font-[family-name:var(--font-anton)]">
                    How an engagement runs
                  </span>
                </span>
              }
            >
              <div className="-mx-5 -mb-6">
                <HowItWorks />
              </div>
            </Collapse>

            <Collapse
              tone="cream"
              header={
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#888580]">
                    Under The Hood
                  </span>
                  <span className="text-[#0C0C0C] text-[clamp(16px,2vw,21px)] leading-tight uppercase font-[family-name:var(--font-anton)]">
                    What we build with
                  </span>
                </span>
              }
            >
              <div className="-mx-5 -mb-6">
                <TechStack />
              </div>
            </Collapse>

            <Collapse
              tone="cream"
              header={
                <span className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#888580]">
                    Wrong Door?
                  </span>
                  <span className="text-[#0C0C0C] text-[clamp(16px,2vw,21px)] leading-tight uppercase font-[family-name:var(--font-anton)]">
                    How the six divisions fit together
                  </span>
                </span>
              }
            >
              <div className="flex flex-col gap-3">
                {DIVISIONS.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-3 border-b border-[#E2DED8] last:border-b-0"
                  >
                    <span className="w-8 shrink-0" style={{ color: d.accent }}>
                      <Icon name={d.icon} size={22} />
                    </span>
                    <span className="flex-1 text-[#0C0C0C] text-sm leading-snug">
                      {d.entryLine}
                    </span>
                    <span
                      className="shrink-0 text-xs font-bold uppercase tracking-[0.1em] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                      style={{ color: d.accent }}
                    >
                      {d.shortName}
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path
                          d="M2 7h10M7 2l5 5-5 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                ))}
                <Link
                  href="/ecosystem"
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold text-sm px-5 py-3 rounded-xl transition-colors min-h-[44px] self-start"
                >
                  Read the full ecosystem page
                </Link>
              </div>
            </Collapse>
          </div>
        </section>

        <div className="bg-white pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#888580] text-sm max-w-2xl">
              Full inclusion lists and the FAQ live on the{' '}
              <Link href="/pricing" className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2">
                pricing page
              </Link>
              . If none of this is quite it,{' '}
              <Link href="/contact" className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2">
                reply for a 15-minute chat
              </Link>{' '}
              and we will scope it.
            </p>
          </div>
        </div>

        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
