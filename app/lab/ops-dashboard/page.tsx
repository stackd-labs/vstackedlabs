import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LabBadge from '@/components/lab/LabBadge'
import OpsDashboardDemo from '@/components/lab/demos/OpsDashboardDemo'
import EmailCapture from '@/components/lab/EmailCapture'
import DemoNav from '@/components/lab/DemoNav'
import WantThisCTA from '@/components/lab/WantThisCTA'

export const metadata: Metadata = {
  title: 'Live Ops Dashboard — Demo Lab',
  description:
    'A business operations dashboard with KPIs, charts, and an activity feed updating in real time. Live demo from the Stackd Studios Demo Lab.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/lab/ops-dashboard',
  },
}

export default function OpsDashboardDemoPage() {
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
            <span className="font-[family-name:var(--font-anton)] text-2xl text-[#0C0C0C]/55">03</span>
            <span className="w-px h-5 bg-[#0C0C0C]/30" aria-hidden="true" />
            <LabBadge />
          </div>

          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,64px)] leading-[1] tracking-tight text-[#0C0C0C] mb-4 uppercase">
            Live Ops Dashboard
          </h1>
          <p className="text-base sm:text-lg text-[#0C0C0C]/75 max-w-2xl leading-relaxed">
            What it feels like when your business reports on itself. KPIs ticking, revenue chart
            growing, activity feed firing — and a full sidebar to roam Leads, Pipeline, Reports,
            and Settings, all on mock data.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#0C0C0C] text-white text-[12px] font-medium">
            <span className="text-[#FFD84D]" aria-hidden="true">★</span>
            Proves: Operations that watch themselves so you can stop refreshing spreadsheets.
          </div>
        </div>
      </section>

      {/* Live demo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <OpsDashboardDemo />
          <p className="mt-3 text-xs text-[#888580] text-center">
            Click the sidebar to roam. Watch the dashboard for ~30 seconds — it evolves on its own.
            Hit <span className="font-semibold text-[#0C0C0C]">Pause</span> to read events without
            the feed scrolling.
          </p>
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
                  title: 'Connect your sources',
                  body: 'CRM, billing, email, calendar, support — wherever the events actually live. We use APIs or webhooks; nothing is copy-pasted.',
                },
                {
                  n: '②',
                  title: 'Define the metrics that matter',
                  body: 'Three to six KPIs you actually look at, with the right slice of time. We strip out the vanity dashboards no one reads.',
                },
                {
                  n: '③',
                  title: 'Real-time, no refresh',
                  body: 'Events stream in via webhooks; charts and tiles update without a page reload. Pause / filter / drill down as needed.',
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
              <span className="text-[#0C0C0C]">In this demo</span> the events are mocked — a
              random event generator drives the feed and the KPIs evolve on a tick loop. In a real
              build the same component is wired to your CRM, Stripe, Postmark, and whatever else
              your business runs on.
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
            source="ops-dashboard"
          />
        </div>
      </section>

      {/* Next/prev demo */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <DemoNav currentSlug="ops-dashboard" />
        </div>
      </section>

      <WantThisCTA
        headline="Want a dashboard that watches your business?"
        body="We build custom ops dashboards wired to your real data — usually delivered as part of a Build Sprint ($997) or as the centerpiece of an Operating Partner plan. Book a Discovery Call and we'll scope it."
      />
      </main>
      <Footer />
    </>
  )
}
