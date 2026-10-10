'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import PageLink from './PageLink'
import ContactLink from './ContactLink'
import StackaCam from './StackaCam'
import { TAGLINE, TAGLINE_TEXT, TECH_DIVISIONS } from './data'

// /about. Company voice ("we"), nothing founder-specific (Chanel, 2026-10-07).

const VALUES = [
  {
    title: 'Nobody gets gatekept.',
    body: 'If you are building software, that is the job. We do not tell anyone they are not a real developer because they built it with an AI pair. We help them finish it, and we teach them what they are missing.',
  },
  {
    title: 'Craft over shortcuts.',
    body: 'Our tools make us faster. They do not replace judgment. Every deliverable is reviewed, refined and held to a standard we would put our name on.',
  },
  {
    title: 'Clarity over complexity.',
    body: 'We do not build to impress. We build what works: simple systems your team can use, understand and grow with.',
  },
  {
    title: 'Strategy before code.',
    body: 'A great product on a weak model still fails. We start with why before we touch a line of code.',
  },
  {
    title: 'Speed without chaos.',
    body: 'Short sprints, quick proposals, focused builds. We move fast because we built the process to support it, not because we cut corners.',
  },
]

const STACK: [string, string[]][] = [
  ['frontend', ['Next.js', 'React', 'TypeScript', 'Tailwind CSS']],
  ['backend', ['Supabase (Postgres, Auth, RLS)', 'Server Actions', 'Edge Functions']],
  ['ai', ['Claude', 'OpenAI', 'Agents and workflows', 'n8n and Zapier']],
  ['payments_email', ['Stripe', 'Resend']],
  ['games', ['Unity', 'Roblox', 'Phaser']],
  ['deploy', ['Vercel', 'GitHub Actions', 'Custom domains']],
]

const btnPrimary =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow'
const btnGhost =
  'font-mono-t text-sm font-bold uppercase tracking-[0.1em] text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] hover:text-[var(--t-neon)] px-6 py-4 rounded-md transition-colors'

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">{children}</p>
}

function TerminalCard({ title, wrap = false, children }: { title: string; wrap?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between px-4 h-10 border-b border-[var(--t-line)] bg-[var(--t-surface)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-neon)]" />
        </div>
        <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)] truncate mx-3">{title}</span>
        <span className="w-10" aria-hidden="true" />
      </div>
      <pre className={`font-mono-t text-[12.5px] sm:text-[13px] leading-[1.9] p-5 text-[var(--t-text)] ${wrap ? 'whitespace-pre-wrap break-words' : 'overflow-x-auto'}`}>{children}</pre>
    </div>
  )
}

const K = ({ children }: { children: React.ReactNode }) => <span className="text-[var(--t-cyan)]">{children}</span>
const V = ({ children }: { children: React.ReactNode }) => <span className="text-[var(--t-neon)]">{children}</span>
const D = ({ children }: { children: React.ReactNode }) => <span className="text-[var(--t-dim)]">{children}</span>

/* ─── Hero ─────────────────────────────────────────────────────────── */

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
            About Stackd Studios AI
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(56px,9vw,120px)] leading-[0.92] text-[var(--t-text)] mb-8"
          >
            We are <span className="neon-text">Stackd.</span>
          </motion.h1>
          <p className="text-[var(--t-muted)] text-lg md:text-xl leading-relaxed max-w-xl">
            We are a technology ecosystem. We build technology for clients, rescue technology that is broken or poorly
            built, develop and manage technical talent, connect people with work, train builders, and develop our own
            products.
          </p>
        </div>
        <TerminalCard title="stackd --about">
          <K>name</K>: <V>Stackd Studios AI</V>{'\n'}
          <K>type</K>: <V>technology ecosystem</V>{'\n'}
          <K>functions</K>: [<V>build</V>, <V>fix</V>, <V>scale</V>]{'\n'}
          <K>divisions</K>: <V>{TECH_DIVISIONS.length}</V>{'\n'}
          <K>team</K>: <V>remote, United States</V>{'\n'}
          <K>ai</K>: <V>underneath everything</V> <D># never the label</D>{'\n'}
          <K>decisions</K>: <V>made by people</V>
        </TerminalCard>
      </div>
    </section>
  )
}

/* ─── Why we exist + mission ───────────────────────────────────────── */

function Why() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--t-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
        <div>
          <Eyebrow>01 / Why we exist</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)]">
            Software got easier to start. It did not get easier to finish.
          </h2>
          <StackaCam
            src="/stacka-desk.jpg"
            alt="Stacka, the Stackd robot mascot, typing on a laptop at a desk"
            label="cam.01 / build floor"
            caption="Stacka, shipping something."
            position="62% 48%"
            className="mt-10 max-w-[280px]"
          />
        </div>
        <div className="flex flex-col gap-5 text-[var(--t-muted)] text-lg leading-relaxed">
          <p>
            AI is creating millions of new builders at the same moment companies are running out of technical capacity.
            More software is being started than ever, and more of it is stalling, breaking or never shipping.
          </p>
          <p>
            We serve both sides of that. Companies get software built, rescued and staffed. Builders get trained,
            verified and connected with real work. The work one side needs is the work the other side is learning to do.
          </p>
          <p>
            We run our own products too, so every system we ship for a client has been pressure-tested in a live
            business first, usually one of ours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <figure className="t-yellow-band relative rounded-2xl border border-[var(--t-line-hi)] p-8 sm:p-12 overflow-hidden shadow-[0_0_60px_rgba(255,216,77,0.18)]">
          <div className="tech-grid-fine absolute inset-0 pointer-events-none" aria-hidden="true" />
          <p className="relative font-mono-t text-[11px] uppercase tracking-[0.2em] text-[var(--t-dim)] mb-6">mission.md</p>
          <blockquote className="relative text-[clamp(24px,3.2vw,40px)] leading-[1.25] text-[var(--t-text)] border-l-[3px] border-[var(--t-neon)] pl-6 sm:pl-8 max-w-5xl">
            We build technology that works, fix technology that does not, and grow the people who build it.
          </blockquote>
          <figcaption className="relative mt-6 pl-6 sm:pl-8 flex flex-wrap gap-x-5 gap-y-1 text-[clamp(20px,2.4vw,28px)] uppercase font-[family-name:var(--font-anton)]">
            {TAGLINE.map((t, i) => (
              <span key={t} className={i === TAGLINE.length - 1 ? 'neon-text' : 'text-[var(--t-muted)]'}>
                {t}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

/* ─── Values ───────────────────────────────────────────────────────── */

function Values() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--t-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Eyebrow>02 / How we work</Eyebrow>
        <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-12">Five rules we do not bend.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--t-line)] border border-[var(--t-line)] rounded-2xl overflow-hidden">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-[var(--t-bg)] p-7 sm:p-8 overflow-hidden"
            >
              <span
                className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[var(--t-neon)] shadow-[0_0_12px_var(--t-neon-glow)] transition-all duration-500"
                aria-hidden="true"
              />
              <div className="font-mono-t text-[11px] text-[var(--t-dim)] mb-6">rule.0{i + 1}</div>
              <h3 className="text-[26px] leading-[1.05] text-[var(--t-text)] group-hover:text-[var(--t-neon)] transition-colors mb-3">
                {v.title}
              </h3>
              <p className="text-[var(--t-muted)]">{v.body}</p>
            </motion.div>
          ))}
          <div className="bg-[var(--t-bg)] p-7 sm:p-8 flex flex-col justify-center">
            <p className="font-mono-t text-[13px] text-[var(--t-muted)]">
              <span className="text-[var(--t-neon)]">$</span> and one about AI:
            </p>
            <p className="mt-3 text-[var(--t-text)] text-lg leading-snug">
              AI recommends. A person approves every decision that matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── What we do ───────────────────────────────────────────────────── */

function Divisions() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--t-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.4fr] gap-12">
        <div>
          <Eyebrow>03 / What we do</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">Six divisions. One core.</h2>
          <p className="text-[var(--t-muted)] text-lg mb-8">{TAGLINE_TEXT} Every division runs on the same people, the same standards and the same tools.</p>
          <Link href="/#divisions" className={btnGhost}>
            See the divisions
          </Link>
        </div>
        <ul className="border border-[var(--t-line)] rounded-2xl overflow-hidden divide-y divide-[var(--t-line)] self-start">
          {TECH_DIVISIONS.map((d, i) => (
            <li key={d.id} className="grid grid-cols-[40px_1fr] sm:grid-cols-[40px_180px_1fr] gap-x-4 gap-y-1 px-5 sm:px-6 py-4 items-baseline">
              <span className="font-mono-t text-[11px] text-[var(--t-dim)]">0{i + 1}</span>
              <span className="text-[20px] text-[var(--t-text)] font-[family-name:var(--font-anton)]">{d.name}</span>
              <span className="col-start-2 sm:col-start-3 text-[15px] text-[var(--t-muted)]">{d.tagline}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─── Stack ────────────────────────────────────────────────────────── */

function Stack() {
  return (
    <section className="py-20 md:py-28 border-t border-[var(--t-line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
        <div>
          <Eyebrow>04 / What we build with</Eyebrow>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-5">Proven tools. No experiments on your dime.</h2>
          <p className="text-[var(--t-muted)] text-lg">
            We build on modern, well-supported infrastructure, the same stack we run our own products on. When a project
            needs something else, we say so up front.
          </p>
        </div>
        <TerminalCard title="stack.json" wrap>
          <D>{'{'}</D>
          {'\n'}
          {STACK.map(([group, items], gi) => (
            <span key={group}>
              {'  '}<K>&quot;{group}&quot;</K>
              <D>: [</D>
              {items.map((it, i) => (
                <span key={it}>
                  <V>&quot;{it}&quot;</V>
                  {i < items.length - 1 && <D>, </D>}
                </span>
              ))}
              <D>]{gi < STACK.length - 1 ? ',' : ''}</D>
              {'\n'}
            </span>
          ))}
          <D>{'}'}</D>
        </TerminalCard>
      </div>
    </section>
  )
}

/* ─── Close ────────────────────────────────────────────────────────── */

function Close() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[var(--t-line)] overflow-hidden tech-noise">
      <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute left-1/2 bottom-[-300px] -translate-x-1/2 w-[1000px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.16), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-mono-t text-[13px] text-[var(--t-muted)] mb-6">
          <span className="text-[var(--t-neon)]">$</span> stackd connect
        </p>
        <h2 className="text-[clamp(44px,7vw,96px)] leading-[0.95] text-[var(--t-text)] mb-6">
          Build with us, or work <span className="neon-text">with us.</span>
        </h2>
        <p className="text-[var(--t-muted)] text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Have something to build or fix? Contact us. Want to join the network? See our open roles.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ContactLink className={btnPrimary}>Contact us</ContactLink>
          <PageLink href="/careers" className={btnGhost}>
            See careers
          </PageLink>
        </div>
      </div>
    </section>
  )
}

export default function AboutContent() {
  return (
    <>
      <Hero />
      <Why />
      <Values />
      <Divisions />
      <Stack />
      <Close />
    </>
  )
}
