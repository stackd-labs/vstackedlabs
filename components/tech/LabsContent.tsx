'use client'

import { motion } from 'framer-motion'
import StackaCam from './StackaCam'
import TerminalForm, { openIntake } from './TerminalForm'
import { IN_DEV, PRODUCTS, STAGES } from './labs-data'

// /labs. Products Stackd owns or incubates, kept apart from client work.
// Featured: Business Brain and Stackd Interactive (Chanel, 2026-10-07). Her own projects in
// development are listed BY NAME ONLY (no photos, links or status), per her 2026-10-07 call.
// Never list client work or internal tools here: Stackd Dash, Command Center, team-tracker
// and the outreach system stay private.

const btnPrimary =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow'
const btnGhost =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] hover:text-[var(--t-neon)] px-6 py-4 rounded-md transition-colors'

const FORM = 'labs-form'


function interest(what: string) {
  openIntake('other', { details: `Labs: interested in ${what}. ` }, FORM)
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">{children}</p>
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function Hero() {
  const k = 'text-[var(--t-cyan)]'
  const v = 'text-[var(--t-neon)]'
  const d = 'text-[var(--t-dim)]'
  const rows: [string, string, string, string][] = [
    ['business-brain', 'live', 'ai / knowledge', v],
    ['stackd-interactive', 'live', 'games studio', v],
    ['games/', 'in dev', `${IN_DEV[0].items.length} titles`, v],
    ['apps/', 'in dev', `${IN_DEV[1].items.length} products`, v],
    ['ecosystem/', 'in dev', `${IN_DEV[2].items.length} platforms`, v],
  ]
  return (
    <section className="relative min-h-[84svh] flex items-center overflow-hidden tech-noise">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.14), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-muted)] mb-7 flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-[var(--t-neon)]" aria-hidden="true" />
            Stackd Labs
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(56px,9vw,120px)] leading-[0.92] text-[var(--t-text)] mb-8"
          >
            Stackd <span className="neon-text">Labs.</span>
          </motion.h1>
          <p className="text-[var(--t-muted)] text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            The products we own and incubate: SaaS, AI tools, games and experiments. Labs is where we build for
            ourselves, kept separate from client work, and what we learn here makes every client build better.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#products" className={btnPrimary}>
              See the products
            </a>
            <a
              href={`#${FORM}`}
              onClick={(e) => {
                e.preventDefault()
                interest('joining the Labs waitlist')
              }}
              className={btnGhost}
            >
              Join the waitlist
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
            <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)]">stackd labs --ls</span>
            <span className="w-10" aria-hidden="true" />
          </div>
          <pre className="font-mono-t text-[11.5px] sm:text-[13px] leading-[1.9] p-5 overflow-x-auto text-[var(--t-text)]">
            <span className={d}>{'PRODUCT'.padEnd(20)}{'STATUS'.padEnd(10)}TYPE</span>
            {'\n'}
            {rows.map(([name, status, type, color]) => (
              <span key={name}>
                <span className={k}>{name.padEnd(20)}</span>
                <span className={color}>{status.padEnd(10)}</span>
                <span className="text-[var(--t-muted)]">{type}</span>
                {'\n'}
              </span>
            ))}
            {'\n'}
            <span className={d}># client work never lives here</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

/* ─── Featured products ────────────────────────────────────────────── */

function Products() {
  return (
    <section id="products" className="py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow>01 / Live now</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)]">What is shipping.</h2>
        </div>
        <div className="flex flex-col gap-6">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.id}
              id={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] overflow-hidden scroll-mt-24"
            >
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--t-neon)] shadow-[0_0_12px_var(--t-neon-glow)] transition-all duration-700"
                aria-hidden="true"
              />
              <div className="grid lg:grid-cols-[1fr_1.15fr]">
                <div className="p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-[var(--t-line)]">
                  <div className="flex flex-wrap items-center gap-2 mb-6 font-mono-t text-[10.5px] uppercase tracking-[0.14em]">
                    <span className="flex items-center gap-1.5 text-[var(--t-cyan)] border border-[#1E3B38] rounded px-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--t-cyan)] t-pulse" aria-hidden="true" />
                      {p.status}
                    </span>
                    <span className="text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-2 py-1">{p.kind}</span>
                  </div>
                  <h3 className="text-[clamp(34px,4vw,52px)] leading-[0.98] text-[var(--t-text)] mb-3">{p.name}</h3>
                  <p className="text-[var(--t-neon)] text-xl mb-4">{p.pitch}</p>
                  <p className="text-[var(--t-muted)] text-[16px] leading-relaxed mb-7">{p.body}</p>
                  <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-3">{p.tagsLabel}</p>
                  <ul className="flex flex-wrap gap-1.5 mb-8">
                    {p.tags.map((t) => (
                      <li key={t} className="font-mono-t text-[11.5px] text-[var(--t-muted)] border border-[var(--t-line-hi)] rounded px-2 py-1">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => interest(p.interest)} className={btnPrimary}>
                    {p.cta}
                  </button>
                </div>
                <div className="p-7 sm:p-10 tech-grid-fine">
                  <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-5">{p.stepsLabel}</p>
                  <ol className="flex flex-col">
                    {p.steps.map((s, si) => (
                      <li key={s.label} className="relative pl-10 pb-7 last:pb-0">
                        {si < p.steps.length - 1 && (
                          <span className="t-flow-y absolute left-[11px] top-7 bottom-1 w-[2px] opacity-50" aria-hidden="true" />
                        )}
                        <span className="absolute left-0 top-0 w-6 h-6 rounded-md border border-[var(--t-neon)] text-[var(--t-neon)] font-mono-t text-[11px] flex items-center justify-center bg-[#0A0C10]">
                          {si + 1}
                        </span>
                        <p className="text-[22px] leading-none text-[var(--t-text)] font-[family-name:var(--font-anton)] mb-1.5">{s.label}</p>
                        <p className="text-[var(--t-muted)] text-[15px]">{s.body}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── In development (redacted) ────────────────────────────────────── */

function InDevelopment() {
  const total = IN_DEV.reduce((n, g) => n + g.items.length, 0)
  return (
    <section id="in-the-lab" className="py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.7fr] gap-12">
        <div>
          <Eyebrow>02 / In the lab</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">What is cooking.</h2>
          <p className="text-[var(--t-muted)] text-lg mb-3">
            {total} games, apps and platforms we are building for ourselves right now. Some are early, some are close.
            Join the waitlist and you will hear first when one launches.
          </p>
          <p className="font-mono-t text-[12px] text-[var(--t-dim)] mb-8">
            <span className="text-[var(--t-neon)]">$</span> ls labs/ --in-development
          </p>
          <StackaCam
            src="/stacka-desk.jpg"
            alt="Stacka, the Stackd robot mascot, typing on a laptop at a desk"
            label="cam.04 / the lab"
            caption="Stacka, testing a prototype."
            position="62% 48%"
            className="max-w-[260px]"
          />
        </div>
        <div className="flex flex-col gap-8 self-start">
          {IN_DEV.map((g) => (
            <div key={g.group}>
              <h3 className="font-mono-t text-[13px] text-[var(--t-muted)] mb-3">
                <span className="text-[var(--t-neon)]">##</span> {g.group}
                <span className="text-[var(--t-dim)]"> ({g.items.length})</span>
              </h3>
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--t-line)] border border-[var(--t-line)] rounded-2xl overflow-hidden">
                {g.items.map((p, i) => (
                  <motion.li
                    key={p.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group relative bg-[var(--t-bg)] p-5 overflow-hidden"
                  >
                    <div className="t-scan-line" aria-hidden="true" />
                    <span
                      className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--t-neon)] shadow-[0_0_12px_var(--t-neon-glow)] transition-all duration-500"
                      aria-hidden="true"
                    />
                    <p className="relative text-[21px] leading-[1.05] text-[var(--t-text)] group-hover:text-[var(--t-neon)] transition-colors font-[family-name:var(--font-anton)] mb-2">
                      {p.name}
                    </p>
                    <p className="relative font-mono-t text-[11.5px] text-[var(--t-muted)] leading-snug">{p.kind}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── How Labs works ───────────────────────────────────────────────── */

function Stages() {
  return (
    <section id="how-labs-works" className="t-yellow-band py-20 md:py-28 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <Eyebrow>03 / How Labs works</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">Every product earns its next stage.</h2>
          <p className="text-[var(--t-muted)] text-lg">
            Nothing skips ahead. An idea has to survive research and real validation before we prototype it, and a
            prototype has to prove itself before it becomes a product.
          </p>
        </div>
        <ol className="flex flex-col md:flex-row md:items-stretch">
          {STAGES.map((s, i) => (
            <li key={s} className="flex flex-col md:flex-row md:flex-1 md:items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={`md:flex-1 rounded-xl border p-4 text-center ${
                  i === STAGES.length - 1
                    ? 'border-[var(--t-neon)] shadow-[0_0_24px_rgba(255,216,77,0.25)] bg-[var(--t-surface)]'
                    : 'border-[var(--t-line-hi)] bg-[var(--t-surface)]'
                }`}
              >
                <div className="font-mono-t text-[10px] text-[var(--t-dim)] mb-1">stage.0{i + 1}</div>
                <div className={`text-[19px] leading-none font-[family-name:var(--font-anton)] ${i === STAGES.length - 1 ? 'neon-text' : 'text-[var(--t-text)]'}`}>
                  {s}
                </div>
              </motion.div>
              {i < STAGES.length - 1 && (
                <span className="flex items-center justify-center h-6 md:h-auto md:w-6 shrink-0" aria-hidden="true">
                  <span className="t-flow-y w-[2px] h-full md:hidden opacity-70" />
                  <span className="t-flow-x h-[2px] w-full hidden md:block opacity-70" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ─── Form ─────────────────────────────────────────────────────────── */

function LabsForm() {
  return (
    <section id={FORM} className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden tech-noise scroll-mt-16">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-center">
        <div>
          <Eyebrow>04 / Get involved</Eyebrow>
          <h2 className="text-[clamp(52px,7.4vw,108px)] leading-[0.92] text-[var(--t-text)] mb-5">
            Get in <span className="neon-text">early.</span>
          </h2>
          <p className="text-[var(--t-text)] text-xl md:text-2xl max-w-xl mb-3">Waitlists, ideas and partnerships.</p>
          <p className="text-[var(--t-muted)] text-lg max-w-xl">
            Want early access, have a product idea, or want a game or tool built with Labs behind it? Tell us here and a
            real person will reply within one business day.
          </p>
        </div>
        <div>
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-neon)] mb-1">Labs inbox</p>
              <p className="text-[22px] sm:text-[26px] leading-tight text-[var(--t-text)] font-[family-name:var(--font-anton)]">
                Fill it out here
              </p>
            </div>
            <span className="font-mono-t text-[12px] text-[var(--t-muted)] flex items-center gap-2 pb-1">
              about 1 minute
              <span className="text-[var(--t-neon)] text-lg leading-none" aria-hidden="true">
                &darr;
              </span>
            </span>
          </div>
          <TerminalForm title="labs-inbox" intro="Labs inbox. Answer one question at a time." />
        </div>
      </div>
    </section>
  )
}

export default function LabsContent() {
  return (
    <>
      <Hero />
      <Products />
      <InDevelopment />
      <Stages />
      <LabsForm />
    </>
  )
}
