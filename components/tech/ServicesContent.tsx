'use client'

import { motion } from 'framer-motion'
import PageLink from './PageLink'
import StackaCam from './StackaCam'
import TerminalForm, { openIntake } from './TerminalForm'
import { OFFER_COUNT, PEOPLE_AND_PRODUCTS, SERVICE_DIVISIONS, type ServiceOffer } from './services-data'
import type { IntakeKind } from './intake-steps'

// /services. No prices (Chanel, 2026-10-07): every project is scoped to fit, pricing is fair.

const btnPrimary =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow'
const btnGhost =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] hover:text-[var(--t-neon)] px-6 py-4 rounded-md transition-colors'

/** Which free-text question carries "Interested in: <offer>" for each form path. */
const DETAIL_FIELD: Partial<Record<IntakeKind, string>> = {
  build: 'details',
  rescue: 'issues',
  learn: 'details',
  hire: 'details',
  other: 'details',
}

function quote(kind: IntakeKind, offer?: string) {
  const field = DETAIL_FIELD[kind]
  openIntake(kind, offer && field ? { [field]: `Interested in: ${offer}. ` } : {}, 'quote')
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">{children}</p>
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function Hero() {
  const k = 'text-[var(--t-cyan)]'
  const v = 'text-[var(--t-neon)]'
  const d = 'text-[var(--t-dim)]'
  return (
    <section className="relative min-h-[80svh] flex items-center overflow-hidden tech-noise">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.14), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-muted)] mb-7 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--t-neon)]" aria-hidden="true" />
            Services
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(56px,9vw,120px)] leading-[0.92] text-[var(--t-text)] mb-8"
          >
            What we <span className="neon-text">do.</span>
          </motion.h1>
          <p className="text-[var(--t-muted)] text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            We build new software, rescue software that broke, and train and supply the people who keep it running.
            Here is everything we offer, grouped by division.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#build" className={btnPrimary}>
              See services
            </a>
            <a
              href="#quote"
              onClick={(e) => {
                e.preventDefault()
                openIntake(undefined, {}, 'quote')
              }}
              className={btnGhost}
            >
              Get a quote
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--t-line)] bg-[var(--t-surface)]">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-neon)]" />
            </div>
            <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)]">stackd services --list</span>
            <span className="w-10" aria-hidden="true" />
          </div>
          <pre className="font-mono-t text-[12.5px] sm:text-[13px] leading-[1.9] p-5 overflow-x-auto text-[var(--t-text)]">
            {SERVICE_DIVISIONS.map((dv) => {
              const n = dv.groups.reduce((m, g) => m + g.offers.length, 0)
              return (
                <span key={dv.id}>
                  <span className={k}>{dv.id.padEnd(8)}</span>
                  <span className={v}>{String(n).padStart(2)} offers</span>
                  <span className={d}>  {dv.verb}</span>
                  {'\n'}
                </span>
              )
            })}
            {PEOPLE_AND_PRODUCTS.map((p) => (
              <span key={p.id}>
                <span className={k}>{p.id.padEnd(8)}</span>
                <span className={v}>  active</span>
                <span className={d}>     {p.verb}</span>
                {'\n'}
              </span>
            ))}
            {'\n'}
            <span className={k}>total</span>: <span className={v}>{OFFER_COUNT} offers, 6 divisions</span>
            {'\n'}
            <span className={k}>pricing</span>: <span className={v}>scoped per project</span>
            {'\n'}
            <span className={k}>quotes</span>: <span className={v}>fair, clear, before work starts</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing promise ──────────────────────────────────────────────── */

const PROMISES = [
  {
    title: 'Scoped to fit',
    body: 'No two projects are the same, so we do not sell off a price list. We scope every project around what you actually need, and nothing you do not.',
  },
  {
    title: 'Priced fairly',
    body: 'You pay for the work your project needs, at a fair rate for the people doing it. Small fixes stay small. Big builds are broken into clear stages.',
  },
  {
    title: 'Clear before we start',
    body: 'You get a written quote after a 15-minute call, before any work begins. If the scope changes, we talk first. No surprise invoices.',
  },
]

function PricingPromise() {
  return (
    <section id="pricing" className="t-yellow-band py-20 md:py-24 border-t border-[var(--t-line)] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <Eyebrow>How pricing works</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">
            Scoped to fit. Priced <span className="neon-text">fairly.</span>
          </h2>
          <p className="text-[var(--t-muted)] text-lg max-w-xl mb-10">
            Every project is priced for the project in front of us. Tell us what you need, and we will come back with a
            fair, clear quote built around it.
          </p>
          <ol className="grid sm:grid-cols-3 gap-4">
            {PROMISES.map((p, i) => (
              <li key={p.title} className="rounded-xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-5">
                <div className="font-mono-t text-[11px] text-[var(--t-neon)] mb-3">0{i + 1}</div>
                <h3 className="text-[22px] leading-none text-[var(--t-text)] mb-2">{p.title}</h3>
                <p className="text-[var(--t-muted)] text-[14.5px] leading-relaxed">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <StackaCam
          src="/stacka-call.jpg"
          alt="Stacka, the Stackd robot mascot, on a phone call from a couch"
          label="cam.03 / scoping call"
          caption="Stacka, scoping your project."
          position="62% 52%"
          className="max-w-[300px] w-full justify-self-center lg:justify-self-end"
        />
      </div>
    </section>
  )
}

/* ─── Division sections ────────────────────────────────────────────── */

function JumpBar() {
  const links = [
    ...SERVICE_DIVISIONS.map((d) => ({ id: d.id, label: d.name.replace('Stackd ', '') })),
    { id: 'people', label: 'Talent, Jobs, Labs' },
    { id: 'quote', label: 'Get a quote' },
  ]
  return (
    <div className="sticky top-16 z-30 bg-[#07080A]/85 backdrop-blur-xl border-y border-[var(--t-line)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto py-2" aria-label="Services sections">
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="shrink-0 font-mono-t text-[11.5px] uppercase tracking-[0.14em] text-[var(--t-muted)] hover:text-[var(--t-neon)] px-3 py-2 rounded-md transition-colors"
          >
            <span className="text-[var(--t-dim)]">#</span>
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

function OfferCard({ offer, kind, index }: { offer: ServiceOffer; kind: IntakeKind; index: number }) {
  return (
    <motion.article
      id={offer.slug}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="group relative bg-[var(--t-bg)] p-6 sm:p-7 flex flex-col overflow-hidden scroll-mt-32"
    >
      <span
        className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--t-neon)] shadow-[0_0_12px_var(--t-neon-glow)] transition-all duration-500"
        aria-hidden="true"
      />
      {offer.viaTalent && (
        <div className="mb-4 font-mono-t text-[10.5px] uppercase tracking-[0.14em]">
          <span className="text-[var(--t-neon)] border border-[#3A3420] rounded px-2 py-1">via Stackd Talent</span>
        </div>
      )}
      <h4 className="text-[24px] leading-[1.05] text-[var(--t-text)] group-hover:text-[var(--t-neon)] transition-colors mb-2 font-[family-name:var(--font-anton)]">
        {offer.name}
      </h4>
      <p className="text-[var(--t-muted)] text-[15px] leading-relaxed mb-5">{offer.pitch}</p>
      <ul className="flex flex-col gap-1.5 mb-6">
        {offer.bullets.map((b) => (
          <li key={b} className="flex gap-2.5 text-[14px] text-[var(--t-muted)] leading-snug">
            <span className="font-mono-t text-[var(--t-neon)] shrink-0" aria-hidden="true">
              +
            </span>
            {b}
          </li>
        ))}
      </ul>
      <button
        onClick={() => quote(kind, offer.name)}
        className="mt-auto self-start font-mono-t text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] group-hover:border-[var(--t-neon)] hover:bg-[var(--t-neon)] hover:text-[#07080A] px-4 py-2.5 rounded-md transition-colors"
      >
        Get a quote
      </button>
    </motion.article>
  )
}

function DivisionSections() {
  return (
    <>
      {SERVICE_DIVISIONS.map((d, di) => (
        <section key={d.id} id={d.id} className="py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <Eyebrow>
                  0{di + 1} / {d.verb}
                </Eyebrow>
                <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">{d.name}</h2>
                <p className="text-[var(--t-muted)] text-lg">{d.intro}</p>
              </div>
              <button onClick={() => quote(d.intake)} className={btnPrimary}>
                {d.cta}
              </button>
            </div>

            <div className="flex flex-col gap-10">
              {d.groups.map((g) => (
                <div key={g.label}>
                  <h3 className="font-mono-t text-[13px] text-[var(--t-muted)] mb-4">
                    <span className="text-[var(--t-neon)]">##</span> {g.label}
                    <span className="text-[var(--t-dim)]"> ({g.offers.length})</span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--t-line)] border border-[var(--t-line)] rounded-2xl overflow-hidden">
                    {g.offers.map((o, i) => (
                      <OfferCard key={o.slug} offer={o} kind={d.intake} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

/* ─── Talent, Jobs, Labs ───────────────────────────────────────────── */

function PeopleAndProducts() {
  return (
    <section id="people" className="py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow>04 / People and products</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">Talent, Jobs and Labs.</h2>
          <p className="text-[var(--t-muted)] text-lg">
            The other half of the ecosystem: the people who do the work, the work itself, and the products we build for
            ourselves.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {PEOPLE_AND_PRODUCTS.map((p) => (
            <article key={p.id} className="rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-6 sm:p-7 flex flex-col">
              <p className="font-mono-t text-[11px] uppercase tracking-[0.16em] text-[var(--t-neon)] mb-3">{p.verb}</p>
              <h3 className="text-[28px] leading-none text-[var(--t-text)] mb-3">{p.name}</h3>
              <p className="text-[var(--t-muted)] mb-6">{p.line}</p>
              <ol className="flex flex-col gap-2.5 mb-8">
                {p.steps.map((s, i) => (
                  <li key={s} className="flex items-center gap-3 text-[14.5px] text-[var(--t-text)]">
                    <span className="font-mono-t text-[11px] text-[var(--t-neon)] w-6 shrink-0">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              {p.href ? (
                <PageLink href={p.href} className={`${btnGhost} mt-auto self-start`}>
                  {p.cta}
                </PageLink>
              ) : (
                <button onClick={() => quote(p.intake!)} className={`${btnGhost} mt-auto self-start`}>
                  {p.cta}
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Quote form ───────────────────────────────────────────────────── */

function Quote() {
  return (
    <section id="quote" className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden tech-noise scroll-mt-28">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow>05 / Get a quote</Eyebrow>
          <h2 className="text-[clamp(52px,7.4vw,108px)] leading-[0.92] text-[var(--t-text)] mb-5">
            Get a <span className="neon-text">quote.</span>
          </h2>
          <p className="text-[var(--t-text)] text-xl md:text-2xl max-w-xl mb-3">Tell us about your project.</p>
          <p className="text-[var(--t-muted)] text-lg max-w-xl">
            Pick a service above and it fills in for you, or start from scratch. A real person reads every request and
            replies within one business day with next steps and a fair, clear quote.
          </p>
        </div>
        <div>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-neon)] mb-1">Quote request</p>
              <p className="text-[22px] sm:text-[26px] leading-tight text-[var(--t-text)] font-[family-name:var(--font-anton)]">
                Fill it out here
              </p>
            </div>
            <span className="font-mono-t text-[12px] text-[var(--t-muted)] flex items-center gap-2 pb-1">
              about 2 minutes
              <span className="text-[var(--t-neon)] text-lg leading-none" aria-hidden="true">
                &darr;
              </span>
            </span>
          </div>
          <TerminalForm title="quote-request" intro="Quote request. Answer one question at a time." />
        </div>
      </div>
    </section>
  )
}

export default function ServicesContent() {
  return (
    <>
      <Hero />
      <PricingPromise />
      <JumpBar />
      <DivisionSections />
      <PeopleAndProducts />
      <Quote />
    </>
  )
}
