'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Book a Free Call',
    description: 'Schedule a free 20-minute discovery call. Tell us about your business or idea, your goals, and what you\'ve already tried. No pressure, no pitch.',
  },
  {
    number: '02',
    title: 'Get a Proposal',
    description: 'We\'ll identify which track and tier fits best, then send a clear proposal — scoped, priced, and ready for your review. Usually same day.',
  },
  {
    number: '03',
    title: 'We Build It',
    description: 'Once you\'re in, we get to work — building in focused sprints. We move faster than a traditional agency without cutting corners on craft.',
  },
  {
    number: '04',
    title: 'You Launch',
    description: 'Your product or system is delivered, deployed, and handed off with full documentation. We\'re available for ongoing support if you need it.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">
            The Process
          </p>
          <h2
            id="how-it-works-heading"
            className="text-[clamp(28px,4.5vw,52px)] text-[#0C0C0C] leading-[1.1]"
          >
            From idea to launched — here&apos;s how it works.
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting dashed line */}
          <div
            className="absolute top-[28px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[2px]"
            style={{
              background: 'repeating-linear-gradient(90deg, #FFD84D 0px, #FFD84D 8px, transparent 8px, transparent 16px)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-[#0C0C0C] text-base mb-6 z-10 relative font-[family-name:var(--font-instrument-sans)]"
                  style={{ background: '#FFD84D', border: '2px solid #0C0C0C' }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg text-[#0C0C0C] leading-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-[#888580] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="lg:hidden flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 relative"
            >
              {/* Left: number + connecting line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[#0C0C0C] text-sm z-10 shrink-0 font-[family-name:var(--font-instrument-sans)]"
                  style={{ background: '#FFD84D', border: '2px solid #0C0C0C' }}
                >
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="flex-1 w-[2px] mt-2"
                    style={{
                      background: 'repeating-linear-gradient(180deg, #FFD84D 0px, #FFD84D 6px, transparent 6px, transparent 12px)',
                      minHeight: '48px',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: content */}
              <div className={`pb-10 ${i === steps.length - 1 ? 'pb-0' : ''}`}>
                <h3 className="text-lg text-[#0C0C0C] leading-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-[#888580] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
