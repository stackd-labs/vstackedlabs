'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { submitLead } from './actions'
import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { useToast } from '@/components/ToastProvider'
import { DIVISIONS } from '@/lib/divisions'

export default function ContactContent() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const guard = useSpamGuard()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    formData.set('elapsedMs', String(guard.fields().elapsedMs))

    const result = await submitLead(formData)

    if (result.success) {
      setStatus('idle')
      formRef.current?.reset()
      toast("Message sent! We'll be in touch within 24 hours.", 'success')
    } else {
      setStatus('idle')
      toast(result.error, 'error')
    }
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F6F4EF]">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-white border-b border-[#E2DED8] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div className="max-w-3xl">
                <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">Contact</p>
                <h1 className="text-[clamp(40px,6vw,72px)] text-[#0C0C0C] leading-[1.0] mb-6">
                  Let&apos;s build something together.
                </h1>
                <p className="text-[#888580] text-xl leading-relaxed">
                  Send us a message and we&apos;ll respond within 24 hours.
                </p>
              </div>

              <div className="relative w-[200px] h-[298px] lg:w-[280px] lg:h-[418px] mx-auto lg:mx-0 shrink-0" aria-hidden="true">
                <Image
                  src="/stacka-couch.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, 200px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">

            {/* Left — Intro + Contact info */}
            <div className="flex flex-col gap-6 self-start">
              <div>
                <h2 className="text-2xl text-[#0C0C0C] mb-2">Talk to us directly</h2>
                <p className="text-[#888580] text-sm mb-8 leading-relaxed">
                  Whether you have a budget figured out or just an early idea, we&apos;ll
                  meet you where you are. No sales pressure, no scripted intake — just
                  a real conversation about what you&apos;re trying to build.
                </p>
              </div>

              <ul className="flex flex-col gap-3" role="list">
                {[
                  { title: 'No-pitch discovery calls', body: 'Free 15-minute conversation. We listen, you decide.' },
                  { title: 'Replies within 24 hours', body: 'Always. Even on weekends, you usually hear back the same day.' },
                  { title: 'Honest about fit', body: "If we're not the right team for what you're building, we'll tell you that and point you somewhere better." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex w-6 h-6 rounded-full bg-[#FFD84D] items-center justify-center shrink-0 mt-0.5"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12.5L10 17.5L19 7.5" stroke="#0C0C0C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[#0C0C0C] text-sm font-semibold leading-tight mb-0.5">{item.title}</p>
                      <p className="text-[#888580] text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="bg-[#0C0C0C] rounded-2xl p-7 flex flex-col gap-5">
                <div>
                  <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.1em] mb-1">Email</p>
                  <a href="mailto:Chanel@stackdstudiosai.com" className="text-[#FFD84D] font-medium hover:underline">
                    Chanel@stackdstudiosai.com
                  </a>
                </div>

                <div>
                  <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.1em] mb-1">Based In</p>
                  <p className="text-white font-medium">United States</p>
                </div>

                <div>
                  <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.1em] mb-1">Response Time</p>
                  <p className="text-white font-medium">Within 24 hours</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <p className="text-[#9CA3AF] text-sm leading-relaxed italic">
                    &ldquo;Every project starts with a conversation. No pressure, no commitment — just clarity.&rdquo;
                  </p>
                  <p className="text-[#FFD84D] text-sm font-medium mt-2">— Chanel Gray, Founder &amp; CEO</p>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div id="send-message">
              <h2 className="text-2xl text-[#0C0C0C] mb-2">Send a Message</h2>
              <p className="text-[#888580] text-sm mb-8">
                Tell us about your project, your timeline, and which service you&apos;re interested in. We&apos;ll respond within 24 hours.
              </p>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                aria-label="Contact form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                      Full Name <span className="text-[#FFD84D]" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                      className="w-full bg-white border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] transition-all min-h-[44px] text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                      Email Address <span className="text-[#FFD84D]" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="jane@company.com"
                      className="w-full bg-white border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] transition-all min-h-[44px] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                    Which division or offer is this about?
                  </label>
                  <select
                    id="service"
                    name="track"
                    className="w-full bg-white border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] transition-all min-h-[44px] text-sm appearance-none"
                  >
                    <option value="" disabled>
                      What is this regarding?
                    </option>
                    <option value="Not sure yet">
                      Not sure yet, help me choose
                    </option>
                    {DIVISIONS.map((division) => (
                      <optgroup
                        key={division.slug}
                        // optgroup labels are plain text, so no icon here.
                        label={division.eyebrow}
                      >
                        {division.offers.map((offer) => (
                          <option
                            key={`${division.slug}-${offer.slug}`}
                            value={`${division.eyebrow}: ${offer.name} (${offer.price})`}
                          >
                            {offer.name} — {offer.price}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#0C0C0C] mb-2">
                    Tell us about your project <span className="text-[#FFD84D]" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="What are you trying to build? What have you already tried? What's your timeline and budget range? The more you share, the better we can prepare."
                    className="w-full bg-white border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] transition-all resize-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-[#0C0C0C] hover:bg-[#FFD84D] disabled:opacity-60 disabled:cursor-not-allowed text-white hover:text-[#0C0C0C] font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px] text-base w-full"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-[#888580] text-xs text-center">
                  We respond within 24 hours. Your info is never shared or sold.
                </p>
              <HoneypotField value={guard.hp} onChange={guard.setHp} />
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
