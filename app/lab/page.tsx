import Icon from '@/components/Icon'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WantThisCTA from '@/components/lab/WantThisCTA'

export const dynamic = 'force-dynamic'

type Demo = {
  slug: string
  number: string
  title: string
  oneLiner: string
  proves: string
  tags: string[]
  status: 'live' | 'soon'
  preview: React.ReactNode
}

const demos: Demo[] = [
  {
    slug: 'smart-intake',
    number: '01',
    title: 'Smart Intake',
    oneLiner: 'Type a messy paragraph. Watch it parse into structured fields in real time.',
    proves: 'Your AI can understand customers in plain English — no forms, no friction.',
    tags: ['AI parsing', 'Forms', 'Customer intake'],
    status: 'live',
    preview: <SmartIntakePreview />,
  },
  {
    slug: 'ai-assistant',
    number: '02',
    title: 'AI Business Assistant',
    oneLiner: 'Click any pre-built prompt — watch the assistant draft the work in seconds.',
    proves: 'A workspace assistant that actually drafts the emails, posts, and SOPs you need.',
    tags: ['Marketing', 'Sales', 'Operations'],
    status: 'live',
    preview: <AssistantPreview />,
  },
  {
    slug: 'ops-dashboard',
    number: '03',
    title: 'Live Ops Dashboard',
    oneLiner: 'KPIs ticking. Charts animating. A full sidebar to roam Leads, Pipeline, Reports.',
    proves: 'Operations that watch themselves so you can stop refreshing spreadsheets.',
    tags: ['Dashboards', 'Real-time', 'Sidebar'],
    status: 'live',
    preview: <DashboardPreview />,
  },
]

export default function LabGalleryPage() {
  return (
    <>
      <Navbar yellowHero />
      <main className="bg-[#FFD84D] text-[#0C0C0C] min-h-screen">
        {/* Hero */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-25"
            style={{
              background: 'radial-gradient(circle, rgba(12,12,12,0.7) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(12,12,12,0.7) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(rgba(12,12,12,0.7) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0C0C0C] text-[#FFD84D] text-[11px] font-bold uppercase tracking-[0.18em]">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD84D] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD84D]" />
                </span>
                The Demo Lab is open · 3 live demos
              </div>
            </div>

            <h1 className="font-[family-name:var(--font-anton)] text-[clamp(56px,11vw,140px)] leading-[0.88] tracking-tight text-center text-[#0C0C0C] uppercase">
              Step into
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">the Demo Lab</span>
                <span
                  className="absolute -inset-x-2 bottom-1 sm:bottom-2 lg:bottom-3 h-3 sm:h-5 lg:h-7 bg-white -z-0"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="mt-8 text-base sm:text-lg lg:text-xl text-[#0C0C0C]/70 max-w-2xl mx-auto text-center leading-relaxed">
              Live, interactive demos of the AI systems we ship to clients. Click in, play
              around — see what your business could feel like. Everything runs in your browser
              with mock data. No signup, no waiting.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {['No signup', 'Mock data', 'Real interactions', 'Same stack we ship'].map(
                (label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0C0C0C]/8 border-2 border-[#0C0C0C] text-xs text-[#0C0C0C] font-semibold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" aria-hidden="true" />
                    {label}
                  </span>
                )
              )}
            </div>

            <div className="mt-16 flex justify-center" aria-hidden="true">
              <span className="inline-flex flex-col items-center gap-1 text-[#0C0C0C]/45 text-[10px] uppercase tracking-[0.2em] font-semibold">
                Scroll
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 5l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10 sm:mb-14 pb-6 border-b-2 border-[#0C0C0C]/15">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0C0C0C] font-bold mb-2">
                  // On the bench
                </p>
                <h2 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl tracking-tight text-[#0C0C0C] uppercase leading-none">
                  Pick a demo,
                  <br />
                  click in.
                </h2>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="font-[family-name:var(--font-anton)] text-4xl text-[#0C0C0C] leading-none tabular-nums">
                  {demos.length}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#0C0C0C]/55 font-bold">
                  demos live
                </span>
              </div>
            </div>

            {/* White cards with blurred mini-screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {demos.map((demo) => (
                <Link
                  key={demo.slug}
                  href={`/lab/${demo.slug}`}
                  className="group relative flex flex-col rounded-2xl border-2 border-[#0C0C0C] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(12,12,12,0.9)]"
                >
                  {/* Preview band — blurred mini-screenshot */}
                  <div className="relative h-[180px] bg-[#FAF8F2] border-b-2 border-[#0C0C0C] overflow-hidden">
                    {/* The blurred preview itself */}
                    <div className="absolute inset-0">{demo.preview}</div>

                    {/* Subtle gradient overlay for depth */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.5) 100%)',
                      }}
                    />

                    {/* "Click to interact" overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0C0C0C]/0 group-hover:bg-[#0C0C0C]/30 transition-colors pointer-events-none">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 bg-[#FFD84D] text-[#0C0C0C] text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border-2 border-[#0C0C0C] shadow-[3px_3px_0_rgba(12,12,12,0.9)]">
                        ▶ Click to interact
                      </span>
                    </div>

                    {/* Number badge, top-left */}
                    <span className="absolute top-3 left-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0C0C0C] text-[#FFD84D] font-[family-name:var(--font-anton)] text-base">
                      {demo.number}
                    </span>

                    {/* Status pill, top-right */}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#FFD84D] text-[#0C0C0C] text-[9px] font-bold uppercase tracking-[0.16em] border border-[#0C0C0C]">
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0C0C0C] opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0C0C0C]" />
                      </span>
                      Live
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7 text-[#0C0C0C]">
                    <h3 className="font-[family-name:var(--font-anton)] text-2xl sm:text-[28px] leading-[1.05] text-[#0C0C0C] mb-3 uppercase">
                      {demo.title}
                    </h3>

                    <p className="text-[14px] text-[#3A3A38] leading-relaxed mb-5">
                      {demo.oneLiner}
                    </p>

                    <div className="mt-auto pt-5 border-t border-[#0C0C0C]/10">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#0C0C0C]/50 font-bold mb-2">
                        What it proves
                      </p>
                      <p className="text-sm text-[#0C0C0C] leading-snug mb-4">{demo.proves}</p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {demo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F2] text-[#3A3A38] border border-[#0C0C0C]/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0C0C0C] group-hover:gap-2.5 transition-all">
                        Open demo
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 7h8M7 3l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* In the workshop teaser */}
            <div className="mt-12 relative rounded-2xl border-2 border-dashed border-[#0C0C0C]/40 bg-[#0C0C0C] text-white p-8 sm:p-10 text-center overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-30 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,216,77,0.6) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#FFD84D] font-bold mb-3">
                  // In the workshop
                </p>
                <h3 className="font-[family-name:var(--font-anton)] text-2xl sm:text-3xl text-white mb-3 uppercase">
                  More demos every few weeks
                </h3>
                <p className="text-[15px] text-white/65 max-w-xl mx-auto leading-relaxed">
                  Voice capture, AI concierge chat, booking widgets, product configurators — fresh
                  ones land regularly. Got an idea you&apos;d like to see?{' '}
                  <Link
                    href="/contact"
                    className="text-[#FFD84D] hover:text-white underline underline-offset-4 font-medium"
                  >
                    Tell us.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <WantThisCTA
          headline="See something you want?"
          body="We can build any of these — customized to your business, your data, your customers. Book a free Discovery Call and we'll scope it together."
        />
      </main>
      <Footer />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mini "screenshots" of each demo. Pixel-accurate enough that the blur
// makes them read as actual screenshots. Pure HTML/CSS — no image assets.
// blur(2.5px) is the sweet spot — softens detail but keeps shapes recognizable.
// ─────────────────────────────────────────────────────────────────────────────

const PREVIEW_BLUR = 'blur(2.5px) saturate(1.05)'

function SmartIntakePreview() {
  return (
    <div
      className="absolute inset-0"
      style={{ filter: PREVIEW_BLUR, transform: 'scale(1.02)' }}
      aria-hidden="true"
    >
      {/* Faux DemoFrame */}
      <div className="h-full p-2.5">
        <div className="h-full bg-white border border-[#0C0C0C]/30 rounded-md overflow-hidden flex flex-col">
          {/* Browser chrome */}
          <div className="flex items-center gap-1 px-2 py-1 bg-[#F6F4EF] border-b border-[#E2DED8]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
          </div>
          {/* Two-column content */}
          <div className="flex-1 grid grid-cols-2 gap-1 p-1.5 text-[6px]">
            {/* Left: input */}
            <div className="flex flex-col gap-1">
              <div className="text-[5px] uppercase text-[#888580] font-bold">Customer message</div>
              <div className="bg-[#F6F4EF] border border-[#E2DED8] rounded p-1 flex-1">
                <div className="h-1 w-full bg-[#0C0C0C]/60 rounded mb-0.5" />
                <div className="h-1 w-5/6 bg-[#0C0C0C]/60 rounded mb-0.5" />
                <div className="h-1 w-4/5 bg-[#0C0C0C]/60 rounded mb-0.5" />
                <div className="h-1 w-3/4 bg-[#0C0C0C]/60 rounded mb-0.5" />
                <div className="h-1 w-5/6 bg-[#0C0C0C]/60 rounded mb-0.5" />
                <div className="h-1 w-2/3 bg-[#0C0C0C]/60 rounded" />
              </div>
              <div className="bg-[#0C0C0C] text-white text-center py-0.5 rounded text-[5px] font-bold">
                Parse with AI →
              </div>
            </div>
            {/* Right: structured fields */}
            <div className="flex flex-col gap-0.5 bg-[#FAF8F2] p-1 rounded">
              <div className="text-[5px] uppercase text-[#888580] font-bold mb-0.5">Output</div>
              {[
                { label: 'CONTACT', value: 'Sarah Patterson', filled: true },
                { label: 'WHAT THEY NEED', value: 'Senior relocation', filled: true },
                { label: 'TIMELINE', value: 'Within 30 days', filled: true },
                { label: 'KEY DETAILS', value: '78yo · wheelchair', filled: false },
                { label: 'NEXT STEP', value: '', filled: false },
              ].map((f) => (
                <div
                  key={f.label}
                  className={`rounded p-0.5 border ${
                    f.filled ? 'bg-white border-[#E2DED8]' : 'bg-white/60 border-[#E2DED8]'
                  }`}
                >
                  <div className="text-[4px] text-[#888580] font-bold">{f.label}</div>
                  <div className={`text-[5px] ${f.filled ? 'text-[#0C0C0C]' : 'text-[#C4C0BA]'}`}>
                    {f.value || '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AssistantPreview() {
  return (
    <div
      className="absolute inset-0"
      style={{ filter: PREVIEW_BLUR, transform: 'scale(1.02)' }}
      aria-hidden="true"
    >
      <div className="h-full p-2.5">
        <div className="h-full bg-white border border-[#0C0C0C]/30 rounded-md overflow-hidden flex flex-col">
          <div className="flex items-center gap-1 px-2 py-1 bg-[#F6F4EF] border-b border-[#E2DED8]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 grid grid-cols-[80px_1fr]">
            {/* Sidebar */}
            <div className="bg-[#FAF8F2] border-r border-[#E2DED8] p-1 flex flex-col gap-0.5 text-[5px]">
              <div className="text-[#888580] font-bold uppercase mb-0.5">Library</div>
              <div className="grid grid-cols-2 gap-px">
                <div className="bg-[#0C0C0C] text-white flex items-center justify-center py-0.5 rounded-sm"><Icon name="megaphone" size={6} strokeWidth={2.4} /></div>
                <div className="bg-white border border-[#E2DED8] flex items-center justify-center py-0.5 rounded-sm"><Icon name="briefcase" size={6} strokeWidth={2.4} /></div>
                <div className="bg-white border border-[#E2DED8] flex items-center justify-center py-0.5 rounded-sm"><Icon name="gear" size={6} strokeWidth={2.4} /></div>
                <div className="bg-white border border-[#E2DED8] flex items-center justify-center py-0.5 rounded-sm"><Icon name="pen" size={6} strokeWidth={2.4} /></div>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-[#E2DED8] rounded px-0.5 py-0.5 text-[#0C0C0C]">
                  <div className="h-0.5 w-full bg-[#0C0C0C]/40 rounded mb-0.5" />
                  <div className="h-0.5 w-3/4 bg-[#0C0C0C]/40 rounded" />
                </div>
              ))}
            </div>
            {/* Chat */}
            <div className="p-1.5 flex flex-col gap-1 bg-white">
              {/* User bubble */}
              <div className="self-end max-w-[75%] bg-[#0C0C0C] text-white rounded-md px-1 py-0.5 text-[5px]">
                <div className="h-0.5 w-full bg-white/70 rounded mb-0.5" />
                <div className="h-0.5 w-2/3 bg-white/70 rounded" />
              </div>
              {/* Assistant bubble */}
              <div className="self-start max-w-[85%] bg-[#FAF8F2] border border-[#E2DED8] rounded-md px-1 py-0.5">
                <div className="h-0.5 w-full bg-[#0C0C0C]/50 rounded mb-0.5" />
                <div className="h-0.5 w-5/6 bg-[#0C0C0C]/50 rounded mb-0.5" />
                <div className="h-0.5 w-3/4 bg-[#0C0C0C]/50 rounded mb-0.5" />
                <div className="h-0.5 w-4/5 bg-[#0C0C0C]/50 rounded mb-0.5" />
                <div className="h-0.5 w-3/5 bg-[#0C0C0C]/50 rounded mb-0.5" />
                <div className="h-0.5 w-2/3 bg-[#0C0C0C]/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div
      className="absolute inset-0"
      style={{ filter: PREVIEW_BLUR, transform: 'scale(1.02)' }}
      aria-hidden="true"
    >
      <div className="h-full p-2.5">
        <div className="h-full bg-[#0A0A0A] border border-[#0C0C0C]/30 rounded-md overflow-hidden flex flex-col">
          {/* App header */}
          <div className="flex items-center justify-between px-1.5 py-1 border-b border-white/10">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#FFD84D] rounded-sm" />
              <div className="h-1 w-8 bg-white/40 rounded" />
            </div>
            <div className="flex items-center gap-0.5">
              <div className="w-3 h-1.5 bg-white/15 rounded" />
              <div className="w-3 h-1.5 bg-white/15 rounded" />
            </div>
          </div>
          {/* Sidebar + main */}
          <div className="flex-1 grid grid-cols-[40px_1fr]">
            {/* Sidebar */}
            <div className="border-r border-white/10 p-0.5 flex flex-col gap-0.5">
              <div className="bg-[#FFD84D] text-[#0C0C0C] text-[5px] text-center py-0.5 rounded">▦</div>
              <div className="text-white/40 text-[5px] text-center py-0.5">◯</div>
              <div className="text-white/40 text-[5px] text-center py-0.5">◢</div>
              <div className="text-white/40 text-[5px] text-center py-0.5">◤</div>
              <div className="text-white/40 flex items-center justify-center py-0.5"><Icon name="gear" size={6} strokeWidth={2.4} /></div>
            </div>
            {/* Main */}
            <div className="flex flex-col">
              {/* KPI tiles */}
              <div className="grid grid-cols-3 gap-px bg-white/10">
                {[
                  { label: 'Active', value: '47', delta: '+8' },
                  { label: 'Closed', value: '12', delta: '+3' },
                  { label: 'MRR', value: '$18k', delta: '+12%' },
                ].map((kpi) => (
                  <div key={kpi.label} className="bg-[#0A0A0A] p-1">
                    <div className="text-[4px] uppercase text-white/45 font-bold">{kpi.label}</div>
                    <div className="text-[8px] text-white font-bold">{kpi.value}</div>
                    <div className="text-[4px] text-[#22c55e]">▲ {kpi.delta}</div>
                  </div>
                ))}
              </div>
              {/* Chart + feed */}
              <div className="flex-1 grid grid-cols-[1.5fr_1fr] gap-px bg-white/10">
                {/* Chart */}
                <div className="bg-[#0A0A0A] p-1">
                  <div className="text-[4px] uppercase text-white/45 font-bold mb-0.5">Revenue · 7d</div>
                  <svg viewBox="0 0 100 30" className="w-full h-6">
                    <defs>
                      <linearGradient id="prevGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#FFD84D" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#FFD84D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,22 L17,16 L34,18 L51,8 L68,4 L85,12 L100,2 L100,30 L0,30 Z" fill="url(#prevGrad)" />
                    <polyline points="0,22 17,16 34,18 51,8 68,4 85,12 100,2" fill="none" stroke="#FFD84D" strokeWidth="1.2" />
                  </svg>
                </div>
                {/* Feed */}
                <div className="bg-[#0A0A0A] p-1 flex flex-col gap-0.5">
                  <div className="text-[4px] uppercase text-white/45 font-bold">Activity</div>
                  {(['user-plus', 'check-circle', 'mail'] as const).map((e, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded px-0.5 py-0.5 flex items-center gap-0.5">
                      <Icon name={e} size={5} strokeWidth={2.6} />
                      <div className="flex-1">
                        <div className="h-0.5 w-full bg-white/40 rounded mb-0.5" />
                        <div className="h-0.5 w-2/3 bg-white/25 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
