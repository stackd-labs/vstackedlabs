'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EcosystemTree from '@/components/ecosystem/EcosystemTree'
import DivisionGrid from '@/components/ecosystem/DivisionGrid'
import EntryPoints from '@/components/ecosystem/EntryPoints'
import Flywheel from '@/components/ecosystem/Flywheel'
import AiStance from '@/components/ecosystem/AiStance'
import OneScreenTable from '@/components/ecosystem/OneScreenTable'
import { BRAND } from '@/lib/divisions'

export default function EcosystemContent() {
  return (
    <>
      <Navbar darkHero />

      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative bg-[#0C0C0C] pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden"
          aria-labelledby="ecosystem-heading"
        >
          <div
            className="dot-grid-navy absolute inset-0 opacity-40 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="orb-2 absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #FFD84D 0%, transparent 70%)',
              opacity: 0.16,
              filter: 'blur(90px)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#FFD84D] text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" aria-hidden="true" />
              {BRAND.tagline}
            </motion.div>

            <motion.h1
              id="ecosystem-heading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-[clamp(38px,7vw,86px)] leading-[1.0] text-white max-w-4xl mb-7"
            >
              We help people build software, and companies{' '}
              <span className="text-[#FFD84D]">ship it</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-4"
            >
              AI is creating millions of new builders at the same moment
              companies are running out of technical capacity. Stackd is built
              for both sides of that.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-[#FFD84D] text-[clamp(20px,3vw,32px)] font-[family-name:var(--font-anton)] uppercase leading-tight mb-10"
            >
              {BRAND.supporting}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#entry-points"
                className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-white text-[#0C0C0C] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                Find your entry point
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-[#0C0C0C] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                Book a 15-minute chat
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── The positioning shift ────────────────────────────────────── */}
        <section
          className="py-20 md:py-28 bg-white"
          aria-labelledby="shift-heading"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="mb-12 max-w-2xl"
            >
              <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.14em] mb-4">
                The Shift
              </p>
              <h2
                id="shift-heading"
                className="text-[clamp(30px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05] mb-4"
              >
                We stopped describing ourselves by our tools.
              </h2>
              <p className="text-[#888580] text-lg leading-relaxed">
                Every company in this industry can say the first line. Almost
                none of them can do the second.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-[#E2DED8] bg-[#F6F4EF] p-7 md:p-8 relative"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#888580]">
                  Before
                </span>
                <p className="mt-4 text-[clamp(20px,2.6vw,28px)] leading-tight text-[#888580] line-through decoration-[#F97316] decoration-2">
                  We help businesses use AI.
                </p>
                <p className="mt-5 text-[#888580] text-sm leading-relaxed">
                  True, and completely interchangeable with several thousand
                  other companies. It also caps us at one customer type and one
                  moment in the market.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border-2 border-[#0C0C0C] bg-[#FFD84D] p-7 md:p-8"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#0C0C0C]/60">
                  Now
                </span>
                <p className="mt-4 text-[clamp(20px,2.6vw,28px)] leading-tight text-[#0C0C0C] font-semibold font-[family-name:var(--font-instrument-sans)]">
                  We help people build software, and companies ship it.
                </p>
                <p className="mt-5 text-[#0C0C0C]/70 text-sm leading-relaxed">
                  One competency: building software well. Six front doors, from
                  a teenager writing their first line to an organization with a
                  year-deep backlog.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <EcosystemTree variant="cream" />
        <DivisionGrid
          eyebrow="The Six Divisions"
          heading="What each division actually does."
          intro="Learn trains builders. Builders keeps them unstuck. Rescue fixes what broke. Build makes new software. Teams adds capacity. Enterprise takes on the backlog."
          bg="white"
        />
        <EntryPoints bg="cream" />
        <Flywheel />
        <AiStance />
        <OneScreenTable />

        {/* ─── Close ────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#F6F4EF]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(28px,4.5vw,50px)] text-[#0C0C0C] leading-[1.05] mb-6"
            >
              Not another AI agency.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#3F3F3F] text-lg leading-relaxed mb-9"
            >
              A modern software company built around a simple fact: AI is
              creating millions of new builders while companies simultaneously
              need more technical capacity. We serve both, and each one makes us
              better at the other.
            </motion.p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
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
