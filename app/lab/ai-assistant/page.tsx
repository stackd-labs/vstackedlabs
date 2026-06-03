import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LabBadge from '@/components/lab/LabBadge'
import AiAssistantDemo from '@/components/lab/demos/AiAssistantDemo'
import EmailCapture from '@/components/lab/EmailCapture'
import DemoNav from '@/components/lab/DemoNav'
import WantThisCTA from '@/components/lab/WantThisCTA'

export const metadata: Metadata = {
  title: 'AI Business Assistant — Demo Lab',
  description:
    'A pre-built AI assistant for business owners. Click any prompt — watch the assistant draft the email, post, SOP, or content you need. Live demo from the Stackd Studios Demo Lab.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/lab/ai-assistant',
  },
}

export default function AiAssistantDemoPage() {
  return (
    <>
      <Navbar yellowHero />
      <main className="pt-16 min-h-screen bg-[#FFD84D]">
      {/* Demo header */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C0C0C] hover:text-[#0C0C0C]/70 transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11 7H3M7 3L3 7l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Demo Lab
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="font-[family-name:var(--font-anton)] text-2xl text-[#0C0C0C]/55">02</span>
            <span className="w-px h-5 bg-[#0C0C0C]/30" aria-hidden="true" />
            <LabBadge />
          </div>

          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,64px)] leading-[1] tracking-tight text-[#0C0C0C] mb-4 uppercase">
            AI Business Assistant
          </h1>
          <p className="text-base sm:text-lg text-[#0C0C0C]/75 max-w-2xl leading-relaxed">
            Twelve pre-built prompts a small business owner actually uses every week — marketing,
            sales, operations, content. Click any one and watch the assistant draft the work in
            seconds.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0C0C0C] text-white text-[12px] font-medium">
            <span className="text-[#FFD84D]" aria-hidden="true">★</span>
            Proves: A workspace assistant that actually drafts the work — not generic AI chat.
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <AiAssistantDemo />
        </div>
      </section>

      {/* How this works */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-[#E2DED8] bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#888580] font-semibold mb-3">
              How this works in production
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  n: '①',
                  title: 'Prompts written for your business',
                  body: "We map the 12-20 things you do every week. Each becomes a tuned prompt in your team's library.",
                },
                {
                  n: '②',
                  title: 'Trained on your voice',
                  body: 'A short brand-voice profile means every output sounds like you, not like generic AI. Tone is locked in.',
                },
                {
                  n: '③',
                  title: 'Lives in one place',
                  body: 'Your team opens one workspace, picks a prompt, and gets a draft in 2 seconds. No prompt-engineering required from them.',
                },
              ].map((s) => (
                <div key={s.n}>
                  <p className="text-[#FFD84D] text-2xl font-[family-name:var(--font-anton)] mb-2" aria-hidden="true">
                    {s.n}
                  </p>
                  <h3 className="text-base text-[#0C0C0C] mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[#3A3A38] leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#888580]">
              <span className="text-[#0C0C0C]">In this demo</span> the responses are
              hand-written. In production they&apos;re live Claude Haiku calls (~1.5 sec, ~$0.002 per
              draft) with the same UX.
            </p>
          </div>
        </div>
      </section>

      {/* Soft email capture */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <EmailCapture
            headline="Want first dibs on new demos?"
            body="We're putting fresh ones on the bench every few weeks. Drop your email and we'll send you the link when each one lands."
            source="ai-assistant"
          />
        </div>
      </section>

      {/* Next/prev demo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <DemoNav currentSlug="ai-assistant" />
        </div>
      </section>

      <WantThisCTA
        headline="Want a prompt library like this for your team?"
        body="Every Stackd engagement comes with a custom 10–15 prompt library tuned to your voice and workflows. Build Sprint ($997, 5 business days) or as part of the Operating Partner plan. Book a Discovery Call and we'll scope it."
      />
      </main>
      <Footer />
    </>
  )
}
