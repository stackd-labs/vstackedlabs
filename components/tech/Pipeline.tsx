'use client'

import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { PIPELINE } from './data'

function SkillRecord() {
  const k = 'text-[var(--t-cyan)]'
  const s = 'text-[var(--t-neon)]'
  const p = 'text-[var(--t-dim)]'
  return (
    <div className="t-dark rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] overflow-hidden">
      <div className="px-4 h-9 flex items-center border-b border-[var(--t-line)] font-mono-t text-[11px] text-[var(--t-dim)]">
        talent/skill-record.json
      </div>
      <pre className="font-mono-t text-[12.5px] leading-[1.8] p-4 overflow-x-auto text-[var(--t-text)]">
        <span className={p}>{'{'}</span>{'\n'}
        {'  '}<span className={k}>&quot;skill&quot;</span><span className={p}>: </span><span className={s}>&quot;Supabase row-level security&quot;</span><span className={p}>,</span>{'\n'}
        {'  '}<span className={k}>&quot;level&quot;</span><span className={p}>: </span><span className={s}>&quot;advanced&quot;</span><span className={p}>,</span>{'\n'}
        {'  '}<span className={k}>&quot;verified&quot;</span><span className={p}>: </span><span className="text-[var(--t-cyan)]">true</span><span className={p}>,</span>{'\n'}
        {'  '}<span className={k}>&quot;evidence&quot;</span><span className={p}>: [</span>{'\n'}
        {'    '}<span className={s}>&quot;assessment&quot;</span><span className={p}>,</span>{'\n'}
        {'    '}<span className={s}>&quot;stackd learn program&quot;</span><span className={p}>,</span>{'\n'}
        {'    '}<span className={s}>&quot;shipped on a client rescue&quot;</span>{'\n'}
        {'  '}<span className={p}>],</span>{'\n'}
        {'  '}<span className={k}>&quot;matched_to&quot;</span><span className={p}>: </span><span className={s}>&quot;approved by a person&quot;</span>{'\n'}
        <span className={p}>{'}'}</span>
      </pre>
    </div>
  )
}

export default function Pipeline() {
  return (
    <section id="pipeline" className="t-yellow-band relative py-24 md:py-32 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">04 / How it connects</p>
          <h2 className="text-[clamp(36px,5.2vw,64px)] leading-[1] text-[var(--t-text)] mb-4">Every division feeds the next.</h2>
          <p className="text-[var(--t-muted)] text-lg">
            We are not six separate businesses. People learn with us, their skills get verified, they take on real
            work, and that work builds and rescues software for clients and for our own products.
          </p>
        </div>

        {/* Flow: horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row lg:items-stretch mb-16">
          {PIPELINE.map((step, i) => (
            <Fragment key={step.id}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="lg:flex-1 rounded-xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-5 hover:border-[var(--t-neon)] hover:shadow-[0_0_24px_rgba(255,216,77,0.25)] transition-all"
              >
                <div className="font-mono-t text-[11px] text-[var(--t-dim)] mb-2">node.0{i + 1}</div>
                <div className="text-[24px] leading-none text-[var(--t-text)] mb-2 font-[family-name:var(--font-anton)]">{step.name}</div>
                <div className="text-[13px] text-[var(--t-muted)]">{step.note}</div>
              </motion.div>
              {i < PIPELINE.length - 1 && (
                <div className="flex items-center justify-center lg:w-10 h-8 lg:h-auto shrink-0" aria-hidden="true">
                  <span className="t-flow-y w-[2px] h-full lg:hidden opacity-80" />
                  <span className="t-flow-x h-[2px] w-full hidden lg:block opacity-80" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-[clamp(26px,3vw,36px)] leading-[1.05] text-[var(--t-text)] mb-4">Verified, not just listed.</h3>
            <p className="text-[var(--t-muted)] text-lg leading-relaxed mb-4">
              A resume says what someone claims. We track what they have proven: every skill carries its level, its
              evidence, and when it was last verified. That is how Learn feeds Talent, and how Talent gets matched to
              work.
            </p>
            <p className="text-[var(--t-muted)] text-lg leading-relaxed">
              Our tools recommend matches. A person approves every one.
            </p>
          </div>
          <SkillRecord />
        </div>
      </div>
    </section>
  )
}
