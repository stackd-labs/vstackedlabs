'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ─── Data ─────────────────────────────────────────────────────────────────────

const buildTypes = [
  { name: 'Roblox Games', description: 'Full Roblox experiences — built, tested, and published.' },
  { name: 'Cozy / Cleanup Games', description: 'Calm, satisfying loops people come back to.' },
  { name: 'Simulator Games', description: 'Progression, upgrades, and systems that keep players hooked.' },
  { name: 'Browser Mini-Games', description: 'Lightweight games that run anywhere — no install.' },
  { name: 'Brand / Event Games', description: 'Playable moments built around a brand or event.' },
  { name: 'Educational Games', description: 'Learning that feels like play, for any age.' },
  { name: 'Interactive Experiences', description: 'Configurators, quizzes, and interactive digital products.' },
  { name: 'Game Assets & Systems', description: 'Reusable building blocks — the foundation for faster builds.' },
]

const howWeBuild = [
  {
    step: '01',
    title: 'AI coding agents',
    description:
      'We use AI coding agents to do the heavy lifting — scaffolding, systems, and iteration at a speed a traditional studio can’t match.',
  },
  {
    step: '02',
    title: 'Human creative direction',
    description:
      'Every build is shaped by human taste — the game feel, the look, the loop, and the decision of what’s actually fun.',
  },
  {
    step: '03',
    title: 'Testing & rapid iteration',
    description:
      'We test early and often, then iterate fast. The goal is to move from idea to playable prototype quickly — and improve from there.',
  },
  {
    step: '04',
    title: 'Studio-owned or client-facing',
    description:
      'We build internal, studio-owned games and client-facing projects with the same engine — your idea or ours, shipped the same way.',
  },
]

const offers = [
  {
    name: 'Playable Game Prototypes',
    description:
      'Idea to a playable prototype, fast. The quickest way to feel a concept and decide if it’s worth building.',
  },
  {
    name: 'Roblox Game Development',
    description:
      'Full Roblox builds — cozy games, simulators, and brand experiences, designed to be played and to grow.',
  },
  {
    name: 'Browser Game Development',
    description:
      'Browser mini-games and interactive experiences that run on any device, with nothing to download.',
  },
  {
    name: 'Game Asset Packs',
    description:
      'Reusable assets and systems you can drop into a build — characters, environments, and game logic.',
  },
  {
    name: 'Interactive Brand Experiences',
    description:
      'Branded and event mini-games that turn marketing into something people actually want to play.',
  },
  {
    name: 'Monthly Game Updates & Support',
    description:
      'Ongoing content, updates, and support to keep a live game fresh, stable, and growing.',
  },
]

const concepts = [
  {
    name: 'Dance Studio Makeover',
    tag: 'Roblox · Cozy',
    description:
      'Run and redesign your own dance studio — decorate the space, choreograph routines, and grow a following one show at a time.',
  },
  {
    name: 'Cozy Town Restoration',
    tag: 'Roblox · Cleanup',
    description:
      'Bring a forgotten town back to life. Clean it up, rebuild the shops, and watch the community return as the world heals.',
  },
  {
    name: 'Summer Camp Rescue',
    tag: 'Roblox · Sim',
    description:
      'A rundown summer camp needs a hero. Repair cabins, run activities, and keep the campers happy across a chaotic season.',
  },
  {
    name: 'Talent Show Simulator',
    tag: 'Browser · Sim',
    description:
      'Discover acts, train your performers, and produce a show — a fast, replayable loop of practice, upgrades, and big finales.',
  },
  {
    name: 'Branded Mini-Games',
    tag: 'Brand · Event',
    description:
      'Custom mini-games built around a brand, product, or event — playable marketing that drives attention and sign-ups.',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveContent() {
  return (
    <>
      <Navbar yellowHero />
      <main>
        {/* Hero */}
        <section className="bg-[#FFD84D] pt-32 pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[#0C0C0C]/55 text-xs font-semibold uppercase tracking-[0.14em] mb-5">
                Stackd Interactive · Games & interactive experiences
              </p>
              <h1 className="text-[clamp(40px,6vw,76px)] text-[#0C0C0C] leading-[0.98] mb-6 uppercase font-[family-name:var(--font-anton)]">
                An AI-assisted game
                <br className="hidden sm:block" /> &amp; interactive studio.
              </h1>
              <p className="text-[#0C0C0C]/75 text-base sm:text-xl leading-relaxed max-w-2xl mb-6">
                Stackd Interactive builds Roblox games, browser games, branded
                mini-games, educational games, simulations, and interactive digital
                products. Our focus is fast prototyping, testing, and launch — moving
                from idea to playable in record time.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#0C0C0C] text-[#FFD84D] hover:bg-white hover:text-[#0C0C0C] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
                >
                  Start a game project →
                </Link>
                <a
                  href="#offers"
                  className="inline-flex items-center justify-center border-2 border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-[#FFD84D] font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
                >
                  See what we build
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What it is */}
        <section className="bg-[#F6F4EF] py-20 md:py-28" aria-labelledby="what-heading">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.16em] mb-5">
                // What Stackd Interactive is
              </p>
              <h2
                id="what-heading"
                className="text-[clamp(30px,4.5vw,56px)] text-[#0C0C0C] leading-[1.05] mb-8 uppercase font-[family-name:var(--font-anton)]"
              >
                We make playable things — fast.
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <p className="text-[#3F3F3F] text-[17px] md:text-[18px] leading-[1.65]">
                  Stackd Interactive is our AI-assisted game and interactive experience
                  studio. We build Roblox games, browser games, branded mini-games,
                  educational games, simulations, and interactive digital products — the
                  kind of things people play, share, and come back to.
                </p>
                <p className="text-[#3F3F3F] text-[17px] md:text-[18px] leading-[1.65]">
                  The focus is fast prototyping, testing, and launch. Instead of spending
                  months before anything is playable, we get a working prototype in front
                  of real players quickly, learn from it, and iterate toward something
                  worth shipping.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What we build */}
        <section className="bg-white py-20 md:py-28 border-t border-[#E2DED8]" aria-labelledby="build-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.16em] mb-4">
                // What we build
              </p>
              <h2
                id="build-heading"
                className="text-[clamp(28px,4vw,52px)] text-[#0C0C0C] leading-[1.05] uppercase font-[family-name:var(--font-anton)]"
              >
                Games, experiences, and the systems behind them.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {buildTypes.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                  className="bg-[#F6F4EF] rounded-2xl p-6 border border-[#E2DED8] hover:border-[#0C0C0C]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-2"
                >
                  <h3 className="text-base text-[#0C0C0C] font-semibold leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-[#888580] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How we build */}
        <section className="bg-[#0C0C0C] py-20 md:py-28" aria-labelledby="how-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#FFD84D] text-xs font-bold uppercase tracking-[0.16em] mb-4">
                // How we build
              </p>
              <h2
                id="how-heading"
                className="text-[clamp(28px,4vw,52px)] text-white leading-[1.05] uppercase font-[family-name:var(--font-anton)]"
              >
                AI speed, human taste.
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mt-5">
                We pair AI coding agents with human creative direction, real testing, and
                rapid iteration. The goal is always the same: idea to playable prototype,
                quickly — whether it&apos;s a studio-owned game or a client project.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {howWeBuild.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                  className="bg-white/[0.04] rounded-2xl p-6 border border-white/10 flex flex-col gap-3"
                >
                  <span className="text-[clamp(28px,4vw,40px)] font-[family-name:var(--font-anton)] leading-none text-[#FFD84D]">
                    {item.step}
                  </span>
                  <h3 className="text-base text-white font-semibold leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services / offers */}
        <section
          id="offers"
          className="bg-[#F6F4EF] py-20 md:py-28 border-t border-[#E2DED8] scroll-mt-24"
          aria-labelledby="offers-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.16em] mb-4">
                // Services &amp; offers
              </p>
              <h2
                id="offers-heading"
                className="text-[clamp(28px,4vw,52px)] text-[#0C0C0C] leading-[1.05] uppercase font-[family-name:var(--font-anton)]"
              >
                Ways to build with us.
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {offers.map((offer, i) => (
                <motion.div
                  key={offer.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                  className="bg-white rounded-2xl p-7 border border-[#E2DED8] hover:border-[#0C0C0C]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3"
                >
                  <h3 className="text-lg text-[#0C0C0C] font-semibold leading-tight">
                    {offer.name}
                  </h3>
                  <p className="text-[#888580] text-sm leading-relaxed">
                    {offer.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured concepts */}
        <section className="bg-white py-20 md:py-28 border-t border-[#E2DED8]" aria-labelledby="concepts-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.16em] mb-4">
                // Featured direction &amp; concepts
              </p>
              <h2
                id="concepts-heading"
                className="text-[clamp(28px,4vw,52px)] text-[#0C0C0C] leading-[1.05] uppercase font-[family-name:var(--font-anton)]"
              >
                Where we&apos;re headed.
              </h2>
              <p className="text-[#888580] text-base md:text-lg leading-relaxed mt-5">
                A few concepts and directions we&apos;re prototyping — a feel for the kinds
                of games and experiences Stackd Interactive makes.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {concepts.map((concept, i) => (
                <motion.div
                  key={concept.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                  className="bg-[#F6F4EF] rounded-2xl p-7 border border-[#E2DED8] hover:border-[#0C0C0C]/30 transition-all duration-300 hover:-translate-y-1 flex flex-col gap-3"
                >
                  <span className="self-start text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-[#0C0C0C] text-[#FFD84D]">
                    {concept.tag}
                  </span>
                  <h3 className="text-xl text-[#0C0C0C] font-semibold leading-tight">
                    {concept.name}
                  </h3>
                  <p className="text-[#888580] text-sm leading-relaxed">
                    {concept.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-24 bg-[#0C0C0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[#FFD84D] text-xs font-bold uppercase tracking-[0.16em] mb-4">
                // Let&apos;s build something playable
              </p>
              <h2 className="text-[clamp(28px,4vw,52px)] text-white leading-[1.1] mb-4 uppercase font-[family-name:var(--font-anton)]">
                Have a game idea?
              </h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Start a game project, request a prototype, or just talk to us about an
                interactive experience. We&apos;ll help you go from idea to playable.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
                >
                  Start a game project →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white hover:bg-white hover:text-[#0C0C0C] font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[48px]"
                >
                  Request a prototype
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
