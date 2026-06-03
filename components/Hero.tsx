'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const cycleWords = ['intake', 'booking', 'billing', 'operations']

function TypewriterWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % cycleWords.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="inline-block text-[#FFD84D]"
        >
          {cycleWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F6F4EF]"
      aria-label="Hero section"
    >
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 opacity-[0.05] pointer-events-none" aria-hidden="true" />

      {/* Orb 1 — navy */}
      <div
        className="orb-1 absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #0C0C0C 0%, transparent 70%)',
          opacity: 0.1,
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Orb 2 — gold */}
      <div
        className="orb-2 absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #FFD84D 0%, transparent 70%)',
          opacity: 0.18,
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#0C0C0C] text-[#FFD84D] text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D]" aria-hidden="true" />
              Solutions · Automation · Venture Studio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(44px,7vw,84px)] leading-[1.05] tracking-[0.01em] text-[#0C0C0C] mb-6"
            >
              The{' '}
              <TypewriterWord />{' '}
              <br className="hidden sm:block" />
              system your{' '}
              <br className="hidden sm:block" />
              business runs on.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#888580] text-lg leading-relaxed mb-10 max-w-[500px]"
            >
              Stackd Studios builds the custom software and automations that owner-run businesses can&apos;t buy off the shelf — then turns the best of them into products of our own.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] text-base"
              >
                Book a Build Call
              </Link>
              <Link
                href="/#our-work"
                className="inline-flex items-center gap-2 border-2 border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] text-base"
              >
                See What We&apos;ve Built
              </Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-10 flex items-center gap-6"
            >
              <div className="flex -space-x-2">
                {['CH', 'MR', 'TP'].map((init) => (
                  <div
                    key={init}
                    className="w-8 h-8 rounded-full bg-[#0C0C0C] border-2 border-[#F6F4EF] flex items-center justify-center text-[#FFD84D] text-[10px] font-bold"
                  >
                    {init}
                  </div>
                ))}
              </div>
              <p className="text-[#888580] text-sm">
                Trusted by <span className="text-[#0C0C0C] font-semibold">owner-run businesses & founders</span>
              </p>
            </motion.div>
          </div>

          {/* Right — code card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden lg:block"
            aria-hidden="true"
          >
            <div
              className="code-card-float bg-[#0C0C0C] rounded-2xl p-6 border border-white/10 shadow-2xl w-full max-w-[480px] ml-auto"
              style={{ boxShadow: '0 24px 80px rgba(26,26,46,0.25), 0 8px 32px rgba(0,0,0,0.2)' }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <span className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[#888580] text-xs font-mono">stackd.system.ts</span>
              </div>

              {/* Code */}
              <div className="font-mono text-sm leading-7">
                <div className="text-[#888580]">{'// Stackd Studios — the system your business runs on'}</div>
                <div className="h-4" />
                <div>
                  <span className="text-[#FFD84D]">const</span>
                  <span className="text-white"> system = </span>
                  <span className="text-[#FFD84D]">new</span>
                  <span className="text-[#4ADE80]"> StackdStudio</span>
                  <span className="text-white">{'({'}</span>
                </div>
                <div>
                  <span className="text-[#93C5FD]">{'  builds'}</span>
                  <span className="text-white">{': '}</span>
                  <span className="text-[#FCA5A5]">{'"custom software + automation"'}</span>
                  <span className="text-white">,</span>
                </div>
                <div>
                  <span className="text-[#93C5FD]">{'  ships'}</span>
                  <span className="text-white">{': ['}</span>
                  <span className="text-[#FCA5A5]">"your systems"</span>
                  <span className="text-white">, </span>
                  <span className="text-[#FCA5A5]">"our products"</span>
                  <span className="text-white">],</span>
                </div>
                <div className="text-white">{'}'});</div>
                <div className="h-4" />
                <div>
                  <span className="text-[#FFD84D]">await</span>
                  <span className="text-white"> system.</span>
                  <span className="text-[#4ADE80]">build</span>
                  <span className="text-white">(</span>
                </div>
                <div>
                  <span className="text-[#FCA5A5]">{'  "something that runs itself."'}</span>
                </div>
                <div className="text-white">);</div>
              </div>

              {/* Terminal output */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[#28C840] text-xs font-mono">✓</span>
                  <span className="text-[#888580] text-xs font-mono">System deployed. Running on autopilot.</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#FFD84D] text-xs font-mono">→</span>
                  <span className="text-[#FFD84D] text-xs font-mono">USA · stackdstudiosai.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator — hidden on short/mobile viewports to avoid overlap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="text-[#888580] text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="scroll-bounce text-[#0C0C0C]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
