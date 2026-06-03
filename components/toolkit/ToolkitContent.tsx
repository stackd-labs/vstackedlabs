import Image from 'next/image'
import Link from 'next/link'
import ToolkitToolbar from './ToolkitToolbar'

type Pricing = 'free' | 'freemium' | 'paid'

interface Tool {
  name: string
  blurb: string
  pricing: Pricing
  url: string
}

interface Category {
  id: string
  name: string
  builderNote: string
  tools: Tool[]
}

const LAST_UPDATED = 'Q2 2026'

interface StoreProduct {
  name: string
  tag: string
  price: string
  blurb: string
  url: string
}

const STORE_PRODUCTS: StoreProduct[] = [
  {
    name: 'Business Owner AI Starter Pack',
    tag: 'Prompt Pack',
    price: '$19',
    blurb:
      '25 ready-to-deploy prompts for marketing, ops, finance, and policy work. Built for owners who need outputs today, not theory.',
    url: 'https://www.stackdstudiosai.com/store',
  },
  {
    name: 'Founder Strategy Toolkit',
    tag: 'Prompt Pack',
    price: '$37',
    blurb:
      'Strategy frameworks, GTM tear-downs, and pitch-prep prompts for solo founders shipping their first AI product.',
    url: 'https://www.stackdstudiosai.com/store',
  },
  {
    name: 'AI Intake System Template',
    tag: 'Template',
    price: '$67',
    blurb:
      'Drop-in client intake flow built on Typeform, Zapier, and Notion. Qualifies, routes, and books — fully wired.',
    url: 'https://www.stackdstudiosai.com/store',
  },
  {
    name: 'Build Your First AI Workflow',
    tag: 'Course',
    price: '$97',
    blurb:
      'Step-by-step build of a real automation in Make. Pick a use case, follow along, and ship a working system in one sitting.',
    url: 'https://www.stackdstudiosai.com/store',
  },
  {
    name: 'Prompt Engineering for Business',
    tag: 'Course',
    price: '$67',
    blurb:
      'How to write prompts that produce repeatable, business-grade output. Frameworks, anti-patterns, and 30+ tested examples.',
    url: 'https://www.stackdstudiosai.com/store',
  },
  {
    name: 'Claude Skill: Proposal Writer',
    tag: 'Claude Skill',
    price: '$19',
    blurb:
      'Installable Claude skill that turns a discovery call transcript into a polished, branded proposal in under 60 seconds.',
    url: 'https://www.stackdstudiosai.com/store',
  },
]

const CATEGORIES: Category[] = [
  {
    id: 'marketing',
    name: 'Marketing & Content',
    builderNote:
      "We've wired these into agency and DTC stacks. The unlock: 6+ hours/week back from content production.",
    tools: [
      {
        name: 'ChatGPT',
        blurb:
          "General-purpose AI assistant. Strongest at first-draft copy, brainstorming campaign angles, and rewriting in a different voice. The free tier covers most small business needs — upgrade to Plus only if you want image generation or longer context windows.",
        pricing: 'freemium',
        url: 'https://chatgpt.com',
      },
      {
        name: 'Claude',
        blurb:
          "Better than ChatGPT for long-form writing, nuanced strategy work, and analyzing PDFs or large documents. Free tier limits are generous; the $20/mo Pro tier earns its keep if you write proposals, briefs, or reports weekly.",
        pricing: 'freemium',
        url: 'https://claude.ai',
      },
      {
        name: 'Canva AI',
        blurb:
          "Built into Canva's editor as Magic Studio — generates images, removes backgrounds, resizes designs across formats, and writes copy in your brand voice. Free unlocks the basics; Pro ($120/yr) is the value tier most owners actually need.",
        pricing: 'freemium',
        url: 'https://canva.com',
      },
      {
        name: 'Opus Clip',
        blurb:
          "Drop in a long-form video or podcast and it auto-generates short-form clips with captions, hooks, and aspect-ratio crops. Saves 4–6 hours per long video. Free plan is enough to test; paid removes the watermark.",
        pricing: 'freemium',
        url: 'https://opus.pro',
      },
      {
        name: 'Lately',
        blurb:
          "Takes a single long-form asset (blog post, podcast, webinar) and breaks it into a month of social posts. The AI learns your brand voice over time. Pricier than alternatives, but built specifically for repurposing at scale.",
        pricing: 'paid',
        url: 'https://lately.ai',
      },
      {
        name: 'Descript',
        blurb:
          "Edit audio and video by editing the transcript. Cut filler words with one click, swap sentences without re-recording, and clone your voice for fixes. The single most-recommended tool for podcasters and course creators.",
        pricing: 'freemium',
        url: 'https://descript.com',
      },
    ],
  },
  {
    id: 'admin',
    name: 'Admin & Operations',
    builderNote:
      "We've wired these for service businesses and solo operators. The unlock: client onboarding that runs without you in the loop.",
    tools: [
      {
        name: 'Notion AI',
        blurb:
          "Adds AI to the Notion docs and databases you already use. Summarizes meeting notes, drafts SOPs from rough bullets, and answers questions across your wiki. The easiest way to start using AI for documentation.",
        pricing: 'freemium',
        url: 'https://notion.so',
      },
      {
        name: 'Otter.ai',
        blurb:
          "Joins your Zoom, Meet, or Teams calls and produces a searchable transcript with action items pulled out automatically. Free tier handles 300 minutes/month — enough for 8–10 client calls.",
        pricing: 'freemium',
        url: 'https://otter.ai',
      },
      {
        name: 'Zapier',
        blurb:
          "The longest-running and most stable automation platform. If a tool has an API, Zapier almost certainly already integrates it. Best for straightforward 'when X happens in app A, do Y in app B' workflows.",
        pricing: 'freemium',
        url: 'https://zapier.com',
      },
      {
        name: 'Make',
        blurb:
          "Visual, node-based automation with more power than Zapier per dollar. Steeper learning curve, but better for multi-step branching flows and routing logic. Most affordable tier in the category.",
        pricing: 'freemium',
        url: 'https://make.com',
      },
      {
        name: 'Reclaim.ai',
        blurb:
          "Connects to your calendar and auto-blocks time for tasks, habits, and focus work. Reschedules around new meetings without you touching it. The 'smart 1:1s' feature alone is worth the install.",
        pricing: 'freemium',
        url: 'https://reclaim.ai',
      },
      {
        name: 'Motion',
        blurb:
          "More aggressive than Reclaim — it actually rebuilds your day every morning based on priorities and deadlines. Best for owners who live in their calendar and need a single source of truth for tasks plus meetings.",
        pricing: 'paid',
        url: 'https://usemotion.com',
      },
    ],
  },
  {
    id: 'support',
    name: 'Customer Service',
    builderNote:
      "We've wired these for ecom shops and SaaS teams. The unlock: tickets resolved while you sleep, escalations that find you only when they should.",
    tools: [
      {
        name: 'Tidio',
        blurb:
          "Drop-in chat widget with an AI agent that answers customer questions from your help docs and product pages. Free tier handles 50 conversations/month — enough for most early-stage stores.",
        pricing: 'freemium',
        url: 'https://tidio.com',
      },
      {
        name: 'Freshdesk',
        blurb:
          "Full helpdesk with AI summarization, suggested replies, and sentiment scoring. The free tier covers ticket volume up to ~10 agents and includes the AI Copilot basics — strong starting point.",
        pricing: 'freemium',
        url: 'https://freshdesk.com',
      },
      {
        name: 'Typeform',
        blurb:
          "AI-assisted form builder that conditionally branches based on answers. Better for intake, lead qualification, and surveys than any traditional form tool. The best-looking forms on the market.",
        pricing: 'freemium',
        url: 'https://typeform.com',
      },
      {
        name: 'Intercom',
        blurb:
          "Premium AI-first messaging platform. The Fin AI agent resolves around half of inbound tickets without a human. Built for SaaS and product-led companies — overkill for most service businesses.",
        pricing: 'paid',
        url: 'https://intercom.com',
      },
    ],
  },
  {
    id: 'sales',
    name: 'Sales & Outreach',
    builderNote:
      "We've wired these for B2B services and consultants. The unlock: outreach that books meetings instead of bouncing.",
    tools: [
      {
        name: 'Apollo.io',
        blurb:
          "B2B contact database with 275M+ contacts and email-finder tools. Free tier gives you 50 verified emails/month — usually plenty for testing outreach to a niche list before paying.",
        pricing: 'freemium',
        url: 'https://apollo.io',
      },
      {
        name: 'Lavender',
        blurb:
          "Sits inside Gmail or Outlook and scores your sales emails in real time. Suggests cuts, rewrites for personalization, and flags spam triggers. The fastest way to upgrade an existing outreach team.",
        pricing: 'freemium',
        url: 'https://lavender.ai',
      },
      {
        name: 'HubSpot',
        blurb:
          "Free CRM with AI-generated email drafts, deal-stage automation, and conversation summaries. The free tier is genuinely usable for solo operators and small teams up to ~5 people.",
        pricing: 'freemium',
        url: 'https://hubspot.com',
      },
      {
        name: 'Loom',
        blurb:
          "Async video tool with AI-generated titles, summaries, and chaptering. Sales reps use it to send personalized walkthroughs that book significantly more meetings than text-only outreach.",
        pricing: 'freemium',
        url: 'https://loom.com',
      },
      {
        name: 'Clay',
        blurb:
          "The most powerful tool in this category. Pulls data from 100+ sources to enrich and personalize cold outreach at scale. Steep learning curve, but unmatched if you're running serious outbound.",
        pricing: 'paid',
        url: 'https://clay.com',
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance & Reporting',
    builderNote:
      "We've wired these for solo operators and small teams. The unlock: P&L on demand, not at month-end.",
    tools: [
      {
        name: 'Fathom',
        blurb:
          "Free meeting recorder with AI summaries, action items, and CRM-ready notes. Better free plan than Otter for client calls. No upsell pressure, no hidden minute caps.",
        pricing: 'free',
        url: 'https://fathom.video',
      },
      {
        name: 'Rows',
        blurb:
          "Spreadsheets with AI built in. Pull live data from Stripe, HubSpot, or Google Analytics directly into cells. Strong middle ground between Google Sheets and a full BI tool.",
        pricing: 'freemium',
        url: 'https://rows.com',
      },
      {
        name: 'Docyt',
        blurb:
          "AI bookkeeping that categorizes transactions, reconciles accounts, and produces P&Ls automatically. Pairs with QuickBooks or Xero. Pricier than DIY, cheaper than a part-time bookkeeper.",
        pricing: 'paid',
        url: 'https://docyt.com',
      },
      {
        name: 'Durable',
        blurb:
          "Build a one-page business website in 30 seconds via AI. Includes invoicing, CRM, and reporting. Best fit for service businesses that need a credible online presence without a full builder.",
        pricing: 'freemium',
        url: 'https://durable.co',
      },
    ],
  },
  {
    id: 'hr',
    name: 'Hiring & HR',
    builderNote:
      "We've wired these for fast-growth shops and high-volume hirers. The unlock: a candidate pipeline that doesn't stall when you're heads-down.",
    tools: [
      {
        name: 'Manatal',
        blurb:
          "AI-powered applicant tracking system that scores candidates against your job descriptions. Significantly cheaper than Greenhouse or Lever — built for SMB hiring volumes.",
        pricing: 'paid',
        url: 'https://manatal.com',
      },
      {
        name: 'Leena AI',
        blurb:
          "Internal HR helpdesk that answers employee questions about benefits, PTO, and policies 24/7. Cuts HR ticket volume meaningfully in companies with 30+ employees.",
        pricing: 'paid',
        url: 'https://leena.ai',
      },
      {
        name: 'Kula',
        blurb:
          "Automates outbound recruiting and employee referral campaigns. Best for in-house recruiters running multiple roles in parallel. Strong on candidate sourcing across LinkedIn and email.",
        pricing: 'paid',
        url: 'https://kula.ai',
      },
      {
        name: 'Paradox',
        blurb:
          "Conversational AI ('Olivia') that screens candidates and books interviews via SMS. Used by McDonald's, Lowe's, and other high-volume hiring orgs. Premium pricing, premium results.",
        pricing: 'paid',
        url: 'https://paradox.ai',
      },
    ],
  },
]

export default function ToolkitContent({ firstName }: { firstName?: string }) {
  const sidebarLinks = CATEGORIES.map((c) => ({ id: c.id, name: c.name }))

  return (
    <>
      <ToolkitToolbar links={sidebarLinks} />

      <main
        id="top"
        data-toolkit-content
        style={{ width: '100%', padding: 'clamp(28px, 6vw, 48px) clamp(16px, 4vw, 20px) 96px' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <header
            style={{
              marginBottom: 56,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: 32,
              alignItems: 'center',
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-instrument-sans), sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#0C0C0C',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: '#FFFFFF',
                  border: '1px solid #0C0C0C',
                  padding: '6px 12px',
                  borderRadius: 999,
                  marginBottom: 24,
                }}
              >
                The Small Business AI Toolkit · Stackd Studio
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(48px, 8vw, 96px)',
                  lineHeight: 0.95,
                  letterSpacing: '0.005em',
                  margin: '0 0 18px',
                  color: '#0C0C0C',
                  textTransform: 'uppercase',
                }}
              >
                {firstName ? `${firstName}'s AI Toolkit` : 'AI Toolkit'}
              </h1>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: '#0C0C0C',
                  margin: '0 0 20px',
                  maxWidth: 720,
                  fontWeight: 500,
                }}
              >
                30+ tools organized by use case. Updated quarterly. Your link always reflects the
                latest version — bookmark it once and you&apos;re set.
              </p>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#0C0C0C',
                  background: '#FFFFFF',
                  border: '1px solid #0C0C0C',
                  padding: '6px 12px',
                  borderRadius: 6,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                Last updated · {LAST_UPDATED}
              </div>
            </div>

            <div
              data-toolkit-logo
              style={{
                width: 'clamp(220px, 34vw, 400px)',
                aspectRatio: '1 / 1',
                position: 'relative',
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <Image
                src="/stackd-toolkit-logo.png"
                alt="Stackd Studios AI"
                fill
                priority
                sizes="(max-width: 768px) 220px, 400px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </header>

          {/* Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {CATEGORIES.map((cat) => (
              <section
                key={cat.id}
                id={cat.id}
                aria-labelledby={`${cat.id}-h`}
                style={{ scrollMarginTop: 96 }}
                data-toolkit-section
              >
                <h2
                  id={`${cat.id}-h`}
                  style={{
                    fontFamily: 'var(--font-anton), sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#0C0C0C',
                    margin: '0 0 6px',
                    lineHeight: 1.05,
                  }}
                >
                  {cat.name}
                </h2>
                <div
                  style={{
                    height: 3,
                    width: 64,
                    background: '#0C0C0C',
                    margin: '0 0 14px',
                  }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    margin: '0 0 22px',
                    maxWidth: 760,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: '#3F3F3F',
                    fontStyle: 'italic',
                    borderLeft: '2px solid #FFD84D',
                    paddingLeft: 12,
                  }}
                >
                  {cat.builderNote}
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                    gap: 14,
                  }}
                >
                  {cat.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* CTA banner */}
          <section
            id="cta"
            data-toolkit-section
            style={{
              scrollMarginTop: 96,
              marginTop: 96,
              background: '#0C0C0C',
              borderRadius: 12,
              padding: 'clamp(28px, 6vw, 40px) clamp(20px, 5vw, 32px)',
              color: '#F5F0E8',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-instrument-sans), sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#FFD84D',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Done-For-You Setup
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-anton), sans-serif',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 5vw, 52px)',
                  margin: 0,
                  color: '#F5F0E8',
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                  textTransform: 'uppercase',
                }}
              >
                Want us to set this up for you?
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: '#F5F0E8',
                  opacity: 0.85,
                  maxWidth: 640,
                }}
              >
                The Done-For-You Build Sprint. We pick the 3 right tools for your business and
                build the automations in 5 days.
              </p>
              <Link
                href="/services"
                style={{
                  display: 'inline-block',
                  background: '#FFD84D',
                  color: '#0C0C0C',
                  fontFamily: 'var(--font-instrument-sans), sans-serif',
                  fontWeight: 700,
                  fontSize: 15,
                  padding: '14px 22px',
                  borderRadius: 8,
                  textDecoration: 'none',
                }}
              >
                See how it works →
              </Link>
              <p style={{ margin: 0, fontSize: 12, color: '#888580' }}>
                Starting at $497. Most clients save 8–10 hours/week.
              </p>
            </div>
          </section>

          {/* Explore more — store products */}
          <section
            id="explore"
            data-toolkit-section
            style={{ scrollMarginTop: 96, marginTop: 80 }}
          >
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-instrument-sans), sans-serif',
                fontSize: 11,
                fontWeight: 600,
                color: '#0C0C0C',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 14,
              }}
            >
              // Stackd Studios · Store
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(32px, 5vw, 56px)',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#0C0C0C',
                margin: '0 0 8px',
                lineHeight: 1,
              }}
            >
              Explore more from Stackd
            </h2>
            <p
              style={{
                margin: '0 0 28px',
                maxWidth: 720,
                fontSize: 16,
                lineHeight: 1.55,
                color: '#0C0C0C',
                fontWeight: 500,
              }}
            >
              This toolkit is your free starting point. When you&apos;re ready to put it to work,
              these are the prompt packs, templates, and Claude skills we built to help you ship
              faster.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: 14,
                marginBottom: 24,
              }}
            >
              {STORE_PRODUCTS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  data-toolkit-card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    background: '#FFFFFF',
                    border: '1px solid rgba(12, 12, 12, 0.12)',
                    borderRadius: 10,
                    padding: 18,
                    textDecoration: 'none',
                    color: '#0C0C0C',
                    boxShadow: '0 1px 0 rgba(12, 12, 12, 0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#888580',
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-anton), sans-serif',
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      lineHeight: 1.05,
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: '#3F3F3F',
                      flexGrow: 1,
                    }}
                  >
                    {p.blurb}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-anton), sans-serif',
                        fontSize: 18,
                        letterSpacing: '0.02em',
                        color: '#0C0C0C',
                      }}
                    >
                      {p.price}
                    </span>
                    <span
                      data-toolkit-visit
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#0C0C0C',
                      }}
                    >
                      View →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link
                href="/store"
                style={{
                  display: 'inline-block',
                  background: '#0C0C0C',
                  color: '#FFD84D',
                  fontFamily: 'var(--font-instrument-sans), sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '12px 18px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                Visit the store →
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  color: '#0C0C0C',
                  border: '1px solid #0C0C0C',
                  fontFamily: 'var(--font-instrument-sans), sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  padding: '12px 18px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                Book a free discovery call →
              </Link>
            </div>
          </section>

          {/* About Stackd */}
          <section
            id="about"
            data-toolkit-section
            style={{
              scrollMarginTop: 96,
              marginTop: 80,
              background: '#FFFFFF',
              border: '1px solid rgba(12, 12, 12, 0.12)',
              borderRadius: 12,
              padding: 'clamp(28px, 6vw, 40px) clamp(20px, 5vw, 32px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 32 }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-instrument-sans), sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#0C0C0C',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  About Stackd
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-anton), sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: '#0C0C0C',
                    margin: '0 0 12px',
                    lineHeight: 1.05,
                  }}
                >
                  Build. Test. Launch.
                </h2>
                <p
                  style={{
                    margin: '0 0 14px',
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: '#3F3F3F',
                  }}
                >
                  Stackd Studios AI is a build lab and venture studio for business owners and
                  founders. We pick the right AI tools, build the automations around them, and
                  hand you a system that actually runs — not another dashboard you ignore.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: '#3F3F3F',
                  }}
                >
                  Founded by <strong>Chanel Gray</strong>. Operated by Hicks Virtual Solutions LLC.
                  Remote, US-based, results-driven.
                </p>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-anton), sans-serif',
                    fontWeight: 400,
                    fontSize: 20,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    margin: '0 0 14px',
                    color: '#0C0C0C',
                  }}
                >
                  How we help
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  {[
                    {
                      title: 'Done-For-You Build Sprint',
                      desc: 'We pick 3 tools and ship the automations in 5 days. From $497.',
                      href: '/services',
                    },
                    {
                      title: 'AI Operating Systems',
                      desc: 'Custom AI workflows wired into your stack — CRM, ops, content, support.',
                      href: '/services',
                    },
                    {
                      title: 'Venture Studio',
                      desc: 'We co-build AI products with founders from idea to launch.',
                      href: '/about',
                    },
                    {
                      title: 'Free Tools & Templates',
                      desc: 'This toolkit, plus prompt packs, Claude skills, and SaaS starters.',
                      href: '/store',
                    },
                  ].map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.href}
                        style={{
                          display: 'block',
                          textDecoration: 'none',
                          color: '#0C0C0C',
                          padding: '10px 12px',
                          margin: '-10px -12px',
                          borderRadius: 6,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#0C0C0C',
                            marginBottom: 2,
                          }}
                        >
                          {item.title} →
                        </div>
                        <div style={{ fontSize: 13, color: '#3F3F3F', lineHeight: 1.5 }}>
                          {item.desc}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              style={{
                marginTop: 32,
                paddingTop: 20,
                borderTop: '1px solid rgba(12, 12, 12, 0.12)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 18,
                fontSize: 12,
                color: '#3F3F3F',
              }}
            >
              <span>
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:Chanel@stackdstudiosai.com"
                  style={{ color: '#0C0C0C', textDecoration: 'underline' }}
                >
                  Chanel@stackdstudiosai.com
                </a>
              </span>
              <span>
                <strong>Web:</strong>{' '}
                <a
                  href="https://www.stackdstudiosai.com"
                  style={{ color: '#0C0C0C', textDecoration: 'underline' }}
                >
                  stackdstudiosai.com
                </a>
              </span>
              <span>
                <strong>Based in:</strong> United States
              </span>
            </div>
          </section>

          {/* Footer */}
          <footer
            style={{
              marginTop: 64,
              paddingTop: 24,
              borderTop: '1px solid rgba(12, 12, 12, 0.18)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ margin: 0, fontSize: 12, color: '#0C0C0C', opacity: 0.75 }}>
              stackdstudiosai.com · A Hicks Virtual Solutions Company<br />
              © 2026 Stackd Studios AI LLC · Personal use license · Tool listings are not paid placements.
            </p>
            <span
              style={{
                fontFamily: 'var(--font-anton), sans-serif',
                fontSize: 28,
                letterSpacing: '0.06em',
                color: '#0C0C0C',
                textTransform: 'uppercase',
              }}
            >
              STACKD.
            </span>
          </footer>
        </div>
      </main>

      {/* Print stylesheet + mobile header stack */}
      <style>{`
        @media (max-width: 640px) {
          [data-toolkit-content] header {
            grid-template-columns: 1fr !important;
          }
          [data-toolkit-logo] {
            justify-self: start !important;
            width: 200px !important;
            order: -1;
          }
        }
        @media (max-width: 420px) {
          [data-toolkit-download-label] { display: none !important; }
          [data-toolkit-download-short] { display: inline !important; }
        }
        @media print {
          [data-toolkit-bar] { display: none !important; }
          #toolkit-sidebar { display: none !important; }
          [data-toolkit-logo] { display: none !important; }
          html, body { background: #ffffff !important; }
          [data-toolkit-content] { padding: 24px !important; }
          [data-toolkit-section] { page-break-inside: avoid; }
          a[data-toolkit-card] {
            border: 1px solid #0C0C0C !important;
            box-shadow: none !important;
            page-break-inside: avoid;
          }
          a[data-toolkit-card] [data-toolkit-visit] { display: none !important; }
        }
      `}</style>
    </>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      data-toolkit-card
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: '#FFFFFF',
        border: '1px solid rgba(12, 12, 12, 0.12)',
        borderRadius: 10,
        padding: 20,
        textDecoration: 'none',
        color: '#0C0C0C',
        boxShadow: '0 1px 0 rgba(12, 12, 12, 0.04)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: 'var(--font-anton), sans-serif',
            fontSize: 22,
            fontWeight: 400,
            color: '#0C0C0C',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          {tool.name}
        </h3>
        <PricingBadge pricing={tool.pricing} />
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.55,
          color: '#3F3F3F',
          flexGrow: 1,
        }}
      >
        {tool.blurb}
      </p>
      <span
        data-toolkit-visit
        style={{
          marginTop: 4,
          fontSize: 12,
          fontFamily: 'var(--font-instrument-sans), sans-serif',
          color: '#0C0C0C',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        Visit →
        <span style={{ color: '#888580', fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
          {hostFromUrl(tool.url)}
        </span>
      </span>
    </a>
  )
}

function PricingBadge({ pricing }: { pricing: Pricing }) {
  const map: Record<Pricing, { label: string; bg: string; color: string; border: string }> = {
    free: { label: 'Free', bg: '#E9F8EF', color: '#157A3E', border: '#157A3E' },
    freemium: { label: 'Freemium', bg: '#FFF7D6', color: '#7A5A00', border: '#7A5A00' },
    paid: { label: 'Paid', bg: '#F2F2F2', color: '#3F3F3F', border: '#3F3F3F' },
  }
  const s = map[pricing]
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        padding: '3px 8px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {s.label}
    </span>
  )
}

function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}
