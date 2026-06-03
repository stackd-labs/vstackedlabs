'use client'

import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'


const values = [
  {
    title: 'Craft over shortcuts',
    description:
      "Our tools make us faster — but they don't replace judgment. Every deliverable is reviewed, refined, and held to a standard we'd put our name on.",
  },
  {
    title: 'Clarity over complexity',
    description:
      "We don't build to impress. We build what works. Simple systems that your team can actually use, understand, and grow with.",
  },
  {
    title: 'Strategy before code',
    description:
      'A great product built on a weak model still fails. We always start with why before we touch a line of code.',
  },
  {
    title: 'Speed without chaos',
    description:
      "Two-week sprints. Same-day proposals. Focused builds. We move fast because we've built the process to support it — not because we're cutting corners.",
  },
]

const stack = [
  { category: 'Frontend', items: ['Next.js (App Router)', 'React 19', 'Tailwind CSS v4', 'Framer Motion'] },
  { category: 'Backend & Database', items: ['Supabase (Postgres + Auth + RLS)', 'Next.js Server Actions', 'Vercel Edge Functions'] },
  { category: 'Automation & AI', items: ['n8n / Zapier workflows', 'Custom automations', 'Claude API (Anthropic)', 'Prompt engineering'] },
  { category: 'Payments & Email', items: ['Stripe Checkout', 'Resend (transactional email)', 'Calendly (scheduling)'] },
  { category: 'Deployment', items: ['Vercel (primary)', 'Custom domains', 'CI/CD via GitHub Actions'] },
]

export default function AboutPage() {
  return (
    <>
      <Navbar yellowHero />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#FFD84D] pt-32 pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl pb-20">
              <p className="text-[#0C0C0C]/50 text-xs font-semibold uppercase tracking-[0.12em] mb-6">About</p>
              <h1 className="text-[clamp(40px,6vw,80px)] text-[#0C0C0C] leading-[1.0] mb-8">
                Solutions.<br />Automation.<br />Venture Studio.
              </h1>
              <p className="text-[#0C0C0C]/65 text-xl leading-relaxed max-w-2xl">
                We build the custom software and automations owner-run businesses run on — and turn the best of them into products of our own.
              </p>
            </div>
          </div>

          {/* Founder strip — bleeds into dark */}
          <div className="bg-[#0C0C0C] mt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-[1fr_2fr] gap-12 items-start">
              <div>
                <div className="w-40 sm:w-48 h-56 sm:h-64 rounded-sm overflow-hidden mb-6">
                  <Image
                    src="/chanel-gray.jpg"
                    alt="Chanel Gray, Founder & CEO of Stackd Studios AI"
                    width={192}
                    height={256}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h2 className="text-white text-3xl leading-tight mb-1">Chanel Gray</h2>
                <p className="text-[#FFD84D] text-sm font-medium uppercase tracking-[0.1em]">Founder &amp; CEO</p>
              </div>

              <div className="flex flex-col gap-6 pt-1">
                <p className="text-[#9CA3AF] text-lg leading-relaxed">
                  Chanel founded Stackd Studios AI with a clear mission: give business owners and founders access to the same custom systems and automation that big companies take for granted — without the enterprise price tag or the bloat.
                </p>
                <p className="text-[#9CA3AF] text-lg leading-relaxed">
                  With a background in product development, systems design, and automation, she leads every project with a bias toward clarity, craft, and results — the same way she runs her own businesses.
                </p>
                <p className="text-[#9CA3AF] text-lg leading-relaxed">
                  Her clinical background — three psychology degrees and QMHP supervision credentials — informs how Stackd builds for behavioral health, education, and family services. Outside Stackd, she built FieldOS, a multi-tenant operations platform for field service businesses.
                </p>
                <p className="text-[#9CA3AF] text-lg leading-relaxed">
                  Stackd Studios AI is part of Hicks Virtual Solutions LLC, the portfolio company she founded to build and operate ventures, tools, and client systems firsthand. Every system Stackd ships has been pressure-tested in a live business first — usually one of her own.
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-3 items-center pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[#FFD84D] font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    Get in Touch
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <a
                    href="https://chanel.stackdstudiosai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#EC4899] hover:text-[#F472B6] font-semibold text-sm hover:gap-3 transition-all duration-200"
                  >
                    Meet Chanel · chanel.stackdstudiosai.com
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Mission ──────────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F6F4EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-[160px_1fr] gap-10 items-start"
            >
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] pt-2">Mission</p>
              <blockquote
                className="text-[clamp(22px,3vw,36px)] text-[#0C0C0C] leading-[1.3] border-l-[3px] border-[#FFD84D] pl-8"
              >
                &ldquo;To design, build, and launch the systems and ventures businesses run on — giving owners and founders the power to operate smarter, move faster, and build something that lasts.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────────────── */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">How We Work</p>
              <h2 className="text-[clamp(28px,4vw,48px)] text-[#0C0C0C] leading-[1.1]">
                The principles behind every build
              </h2>
            </motion.div>

            <div className="flex flex-col mt-2">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="grid md:grid-cols-[80px_1fr_1fr] gap-x-10 gap-y-3 py-10 border-t border-[#E2DED8]"
                >
                  <span className="text-[#FFD84D] text-4xl font-black leading-none select-none opacity-60">
                    0{i + 1}
                  </span>
                  <h3 className="text-[clamp(18px,2vw,24px)] text-[#0C0C0C] leading-tight pt-1">
                    {value.title}
                  </h3>
                  <p className="text-[#888580] text-base leading-relaxed pt-1">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#F6F4EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">Tech Stack</p>
              <h2 className="text-[clamp(28px,4vw,48px)] text-[#0C0C0C] leading-[1.1] mb-3">
                We build on the best tools available.
              </h2>
              <p className="text-[#888580] text-lg max-w-xl">
                Chosen for speed, reliability, and scale — the same tools powering some of the best products on the internet.
              </p>
            </motion.div>

            <div className="flex flex-col mt-6">
              {stack.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="grid md:grid-cols-[220px_1fr] gap-x-10 gap-y-2 py-7 border-t border-[#E2DED8] items-baseline"
                >
                  <h3 className="text-[#0C0C0C] text-sm font-medium">{group.category}</h3>
                  <p className="text-[#888580] text-sm leading-relaxed">
                    {group.items.join(' · ')}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0C0C0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-10 items-end"
            >
              <h2 className="text-[clamp(32px,5vw,64px)] text-white leading-[1.0]">
                Want to work with us?
              </h2>
              <div className="flex flex-col gap-4 md:items-end">
                <p className="text-white/50 text-lg md:text-right">
                  Book a free discovery call and let&apos;s figure out what to build together.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
                  >
                    Book a Build Call
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 min-h-[44px]"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
