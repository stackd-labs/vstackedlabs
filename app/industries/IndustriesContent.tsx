// app/industries/IndustriesContent.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const industries = [
  {
    id: 'behavioral-health',
    name: 'Behavioral Health & Mental Health',
    tagline: 'AI that speaks clinical.',
    description:
      'Mental health practices are drowning in documentation, referrals, and billing complexity — while running lean with no dedicated tech staff. Stackd builds systems that reduce clinician burnout, automate intake, and protect your Medicaid revenue.',
    painPoints: [
      'Clinicians spending 30–40% of time on documentation instead of clients',
      'Referral follow-up falling through the cracks',
      'Medicaid billing gaps discovered too late',
      'Intake processes that lose warm leads before first appointment',
    ],
    solutions: [
      { title: 'AI-Assisted Clinical Documentation', desc: 'Session note drafts generated from voice or structured input — clinicians review and sign, not write from scratch.' },
      { title: 'Automated Intake & Scheduling', desc: 'Clients qualify, book, and complete intake paperwork without staff involvement.' },
      { title: 'Referral Pipeline Automation', desc: 'Follow-up sequences that keep warm referrals moving through to first appointment.' },
      { title: 'Billing Audit Workflow', desc: 'Flag missing documentation and billing gaps before submission to protect your Medicaid revenue.' },
    ],
    credential: 'Our founder holds three psychology degrees and QMHP supervision credentials — we built our first behavioral health AI system inside a live group practice.',
    cta: 'Book a Behavioral Health Systems Audit',
  },
  {
    id: 'dance-performing-arts',
    name: 'Dance & Performing Arts Studios',
    tagline: 'Less admin. More art.',
    description:
      'Studio owners wear every hat — teacher, marketer, scheduler, accountant. Automation takes the back-office work off your plate so you can focus on what you actually love.',
    painPoints: [
      'Re-enrollment outreach done manually every season',
      'Event coordination eating up instructor time',
      'No system to recover lapsed students',
      'Marketing content always behind schedule',
    ],
    solutions: [
      { title: 'Student Re-Enrollment Automation', desc: 'Automated re-enrollment campaigns sent at the right time to keep students coming back season after season.' },
      { title: 'Event & Recital Coordination', desc: 'AI-generated timelines, vendor lists, and communication sequences for performances and events.' },
      { title: 'Content Batch Creation', desc: 'One session generates weeks of social content, email newsletters, and studio announcements.' },
      { title: 'Lapsed Student Recovery', desc: 'Automated reactivation campaigns for students who dropped off — personal enough to feel human.' },
    ],
    credential: 'We own and operate Capital Core Dance Studio in Midlothian, VA — this is built from real studio operator experience.',
    cta: 'Book a Studio Systems Audit',
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property Capital',
    tagline: 'Deal flow, automated.',
    description:
      'Whether you\'re a broker, syndicator, capital matchmaker, or investor — the pipeline moves fast and the paperwork never stops. Automation keeps you visible, responsive, and ahead of the deal.',
    painPoints: [
      'Lead follow-up lagging when you\'re deep in a deal',
      'Investor outreach that takes hours to personalize',
      'Property research and underwriting eating analyst time',
      'Marketing assets always needing to be rebuilt from scratch',
    ],
    solutions: [
      { title: 'Investor Outreach Automation', desc: 'Personalized outreach sequences for hedge funds, family offices, and private lenders — at scale.' },
      { title: 'Deal Summary Generation', desc: 'Upload a property address and get a structured deal summary across multiple disposition strategies.' },
      { title: 'Lead Nurture Workflows', desc: 'Automated follow-up that keeps warm leads warm without you having to track them manually.' },
      { title: 'Marketing Asset Creation', desc: 'Offering memorandums, pitch decks, and email campaigns generated fast from a deal template.' },
    ],
    credential: null,
    cta: 'Book a Real Estate Systems Audit',
  },
  {
    id: 'staffing-family-services',
    name: 'Staffing & Family Services',
    tagline: 'Match faster. Place smarter.',
    description:
      'Staffing and placement businesses live and die by speed and fit. Automation helps you source candidates faster, screen better, and deliver a client experience that earns referrals.',
    painPoints: [
      'Candidate intake and screening done manually',
      'Client onboarding that takes too long',
      'Follow-up falling off after initial placement',
      'No system for generating referrals from happy clients',
    ],
    solutions: [
      { title: 'AI Candidate Intake Agent', desc: 'Candidates self-screen through a conversational intake flow — you only touch qualified matches.' },
      { title: 'Client Onboarding Automation', desc: 'New clients move through onboarding paperwork, agreements, and preference capture without staff handholding.' },
      { title: 'Placement Follow-Up Sequences', desc: 'Automated check-ins after placement to catch issues early and trigger referral requests at the right moment.' },
      { title: 'Job Brief Generation', desc: 'Turn a quick intake call into a full candidate brief and job posting draft in minutes.' },
    ],
    credential: 'We operate ELC, a nanny and household staffing placement firm — this is built from real placement operations.',
    cta: 'Book a Staffing Systems Audit',
  },
  {
    id: 'government-public-sector',
    name: 'Government & Public Sector',
    tagline: 'Compliant. Efficient. Modern.',
    description:
      'Government contractors and public agencies need systems that respect compliance requirements while cutting the administrative overhead that slows everything down.',
    painPoints: [
      'Proposal and procurement documentation taking weeks',
      'Reporting cycles that consume staff hours',
      'Subcontractor sourcing done manually',
      'Internal knowledge trapped in documents no one can find',
    ],
    solutions: [
      { title: 'Proposal & RFP Response Acceleration', desc: 'AI-assisted drafting of proposal sections, capability statements, and past performance writeups.' },
      { title: 'Reporting Automation', desc: 'Structured reporting templates with AI-generated narrative sections from raw data inputs.' },
      { title: 'Subcontractor Outreach System', desc: 'Identify, research, and reach out to teaming partners through SBA SUBNet and targeted outreach workflows.' },
      { title: 'Internal Knowledge Base', desc: 'Turn your document library into a searchable knowledge system your team can query in plain English.' },
    ],
    credential: null,
    cta: 'Book a Gov Contracting Systems Audit',
  },
  {
    id: 'nonprofits',
    name: 'Nonprofits & Community Development',
    tagline: 'More mission. Less overhead.',
    description:
      'Nonprofits operate on tight margins with small teams doing the work of much larger organizations. Automation frees up your staff to do the mission-critical work — not the administrative grind.',
    painPoints: [
      'Grant reporting taking up staff bandwidth every quarter',
      'Donor outreach inconsistent and manual',
      'Program documentation not keeping up with delivery',
      'Volunteer coordination running through email threads',
    ],
    solutions: [
      { title: 'Grant Report Automation', desc: 'AI drafts narrative sections of grant reports from program data — staff reviews, not writes.' },
      { title: 'Donor Stewardship Sequences', desc: 'Automated touchpoints that keep donors engaged between campaigns.' },
      { title: 'Program Documentation System', desc: 'Structured intake and outcome tracking that generates reports automatically.' },
      { title: 'Volunteer Coordination Workflows', desc: 'Scheduling, reminders, and follow-up automated so no volunteer falls through the cracks.' },
    ],
    credential: 'We build and manage operations infrastructure for a mental health nonprofit — including referral pipelines, service line expansion, and reporting systems.',
    cta: 'Book a Nonprofit Systems Audit',
  },
  {
    id: 'small-business',
    name: 'Small Business Operations',
    tagline: 'Run leaner. Grow faster.',
    description:
      'Small business owners do everything. Automation is the team member you can\'t afford to hire — handling follow-up, customer communication, content, and operations while you focus on growth.',
    painPoints: [
      'Follow-up on leads and quotes falling through',
      'Customer communication inconsistent or slow',
      'No time to create marketing content consistently',
      'Onboarding new clients takes too much manual effort',
    ],
    solutions: [
      { title: 'Lead Follow-Up Automation', desc: 'Every lead gets a response, a follow-up, and a nurture sequence — automatically.' },
      { title: 'Client Onboarding System', desc: 'New clients move through intake, agreements, and setup without you managing each step.' },
      { title: 'Content Engine', desc: 'Weekly content for email, social, and your website generated from a single content brief.' },
      { title: 'Operations SOPs + Automation', desc: 'Document your processes once, then let automation handle the repetitive execution.' },
    ],
    credential: null,
    cta: 'Book a Small Business Systems Audit',
  },
  {
    id: 'field-services',
    name: 'Field Services & Trades',
    tagline: 'AI for businesses that move.',
    description:
      'Field service businesses — HVAC, plumbing, property management, inspections, logistics — need operations that run without someone at a desk managing every job. Automation keeps the engine running.',
    painPoints: [
      'Dispatch and scheduling done manually',
      'Job documentation inconsistent across technicians',
      'Customer follow-up after service calls missing',
      'No visibility into job status across a multi-person team',
    ],
    solutions: [
      { title: 'Dispatch & Scheduling Automation', desc: 'Jobs assigned, confirmed, and communicated to techs without manual coordination.' },
      { title: 'Field Documentation Workflows', desc: 'Standardized job reporting that techs complete on mobile — auto-synced to your records.' },
      { title: 'Post-Service Follow-Up', desc: 'Automated review requests, follow-up offers, and maintenance reminders after every job.' },
      { title: 'Multi-Job Operations Dashboard', desc: 'Real-time visibility into job status, assignments, and completion across your whole team.' },
    ],
    credential: 'We built FieldOS — a modular multi-tenant SaaS operations platform designed specifically for field service businesses.',
    cta: 'Book a Field Services Systems Audit',
  },
  {
    id: 'creators-digital-media',
    name: 'Creators & Digital Media',
    tagline: 'Create more. Burn out less.',
    description:
      'Content creators, UGC agencies, and social media managers are sitting on the most AI-ready workflows in any industry — but most are still doing everything manually. Stackd changes that.',
    painPoints: [
      'Content creation taking all week instead of all day',
      'Client reporting eating up time that should go to creating',
      'Brand voice inconsistent when volume increases',
      'Pitching and outreach to brands done one by one',
    ],
    solutions: [
      { title: 'Content Batch Engine', desc: 'One content session generates scripts, captions, hooks, and repurposed formats for every platform.' },
      { title: 'Brand Voice Documentation', desc: 'AI trained on your tone and style — so every output sounds like you, not a robot.' },
      { title: 'Client Reporting Automation', desc: 'Monthly reports generated automatically from analytics data — send in minutes, not hours.' },
      { title: 'Brand Outreach System', desc: 'Researched, personalized pitch emails to brand partners — at a volume you could never do manually.' },
    ],
    credential: null,
    cta: 'Book a Creator Systems Audit',
  },
]

// Industries not explicitly listed but served
const alsoServe = [
  'Med Spas & Aesthetic Clinics',
  'Law Firms & Legal Services',
  'Insurance Agencies',
  'Accounting & Bookkeeping Firms',
  'Coaching & Consulting Practices',
  'Fitness Studios & Personal Training',
  'E-commerce & Product Brands',
  'Property Management Companies',
  'Recruiting & HR Firms',
  'Marketing Agencies',
]

export default function IndustriesContent() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = industries.find(i => i.id === activeId)

  return (
    <>
      <Navbar />
      <main className="bg-[#F6F4EF] min-h-screen">

        {/* ── Hero ── */}
        <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
          <p className="text-xs font-medium tracking-[3px] uppercase text-[#888580] mb-4">
            Who We Serve
          </p>
          <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-tight text-[#0C0C0C] mb-6 max-w-4xl">
            SYSTEMS BUILT FOR YOUR<br />
            <span className="text-[#FFD84D]">INDUSTRY.</span>
          </h1>
          <p className="text-lg text-[#888580] max-w-2xl leading-relaxed font-[family-name:var(--font-instrument-sans)]">
            Generic AI advice is everywhere. Stackd builds done-for-you systems and automation for the specific way your industry actually works — the workflows, the compliance requirements, the client relationships, and the problems that keep you up at night.
          </p>
        </section>

        {/* ── Industry Grid ── */}
        <section className="px-4 max-w-7xl mx-auto pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveId(activeId === ind.id ? null : ind.id)}
                className={`flex flex-col text-left p-6 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                  activeId === ind.id
                    ? 'bg-[#0C0C0C] border-[#0C0C0C] text-white'
                    : 'bg-white border-[#E2DED8] hover:border-[#0C0C0C] hover:shadow-md'
                }`}
              >
                <div className="flex-1">
                  <h2 className={`font-[family-name:var(--font-anton)] text-lg leading-tight mb-1 ${
                    activeId === ind.id ? 'text-white' : 'text-[#0C0C0C]'
                  }`}>
                    {ind.name.toUpperCase()}
                  </h2>
                  <p className={`text-sm ${activeId === ind.id ? 'text-white/60' : 'text-[#888580]'}`}>
                    {ind.tagline}
                  </p>
                </div>
                <div className={`mt-4 text-xs font-medium flex items-center gap-1 ${
                  activeId === ind.id ? 'text-[#FFD84D]' : 'text-[#888580] group-hover:text-[#0C0C0C]'
                }`}>
                  {activeId === ind.id ? 'Close ↑' : 'Learn more ↓'}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Expanded Detail Panel ── */}
        {active && (
          <section className="px-4 max-w-7xl mx-auto pb-12">
            <div className="bg-white border border-[#E2DED8] rounded-3xl p-8 md:p-12">
              <div className="mb-8">
                <h2 className="font-[family-name:var(--font-anton)] text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#0C0C0C] mb-2">
                  {active.name.toUpperCase()}
                </h2>
                <p className="text-[#888580] text-lg max-w-2xl leading-relaxed">
                  {active.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* Pain Points */}
                <div>
                  <p className="text-xs font-medium tracking-[2px] uppercase text-[#888580] mb-4">
                    The Real Problems
                  </p>
                  <ul className="space-y-3">
                    {active.painPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#0C0C0C] leading-relaxed">
                        <span className="mt-1 w-4 h-4 rounded-full bg-[#FFD84D] flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div>
                  <p className="text-xs font-medium tracking-[2px] uppercase text-[#888580] mb-4">
                    How We Solve It
                  </p>
                  <div className="space-y-4">
                    {active.solutions.map((s, i) => (
                      <div key={i} className="border-l-2 border-[#FFD84D] pl-4">
                        <p className="font-semibold text-sm text-[#0C0C0C] mb-0.5">{s.title}</p>
                        <p className="text-sm text-[#888580] leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Credential badge */}
              {active.credential && (
                <div className="mt-8 bg-[#F6F4EF] border border-[#E2DED8] rounded-xl p-5">
                  <p className="text-xs font-medium tracking-[2px] uppercase text-[#888580] mb-1">Why We Know This Space</p>
                  <p className="text-sm text-[#0C0C0C] leading-relaxed">{active.credential}</p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 flex gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200"
                >
                  {active.cta}
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-[#E2DED8] hover:border-[#0C0C0C] text-[#0C0C0C] text-sm font-medium px-6 py-3 rounded-xl transition-all duration-200"
                >
                  View Services
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── Also Work With Section ── */}
        <section className="px-4 max-w-7xl mx-auto py-16 border-t border-[#E2DED8]">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-medium tracking-[3px] uppercase text-[#888580] mb-4">
                Not on the list?
              </p>
              <h2 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,4vw,3.5rem)] leading-tight text-[#0C0C0C] mb-4">
                WE ALSO WORK WITH<br />
                <span className="text-[#FFD84D]">MANY OTHERS.</span>
              </h2>
              <p className="text-[#888580] leading-relaxed text-base mb-6">
                If your business has workflows, client communication, documentation, or marketing — AI can help. These are just some of the other industries we&apos;ve worked in or serve on a project basis.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] text-white hover:text-[#0C0C0C] text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Tell Us About Your Business
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {alsoServe.map((name) => (
                <span
                  key={name}
                  className="bg-white border border-[#E2DED8] text-[#0C0C0C] text-sm px-4 py-2 rounded-full font-medium"
                >
                  {name}
                </span>
              ))}
              <span className="bg-[#FFD84D] text-[#0C0C0C] text-sm px-4 py-2 rounded-full font-semibold">
                + Your Industry →
              </span>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="px-4 max-w-7xl mx-auto pb-24">
          <div className="bg-[#0C0C0C] rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-[family-name:var(--font-anton)] text-[clamp(1.8rem,4vw,3rem)] text-white leading-tight mb-2">
                READY TO GET STARTED?
              </h2>
              <p className="text-white/60 text-base max-w-md">
                Book a free Systems Audit. We&apos;ll identify the highest-impact automations for your specific business in 30 minutes.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-white text-[#0C0C0C] text-sm font-bold px-8 py-4 rounded-xl transition-all duration-200 whitespace-nowrap"
            >
              Book Your Free Systems Audit
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
