/**
 * Hand-curated knowledge base for the Stackd Studios AI chatbot.
 * The chatbot is strictly grounded — it may ONLY answer using facts from
 * this file. No web fetching, no extrapolation.
 *
 * MUST be deterministic — no timestamps, no dynamic data — so prompt
 * caching stays warm. The division section is generated from lib/divisions.ts
 * (which is static data) so the bot can never quote a price the site does not
 * show. Aim for ≥4096 tokens (Haiku 4.5's minimum cacheable prefix).
 */
import { DIVISIONS } from '../divisions'

/** The six divisions, rendered from the same data the site renders. */
const DIVISION_SECTION = DIVISIONS.map((d, i) => {
  const offers = d.offers
    .map(
      (o) =>
        [
          `- **${o.name}** — ${o.price} — ${o.timing}`,
          `  - ${o.pitch}`,
          ...o.bullets.map((b) => `  - ${b}`),
        ].join('\n'),
    )
    .join('\n')

  return [
    `### 4.${i + 1}. ${d.eyebrow} (/${d.slug}) — ${d.promise}`,
    `**Who it is for:** ${d.customer}. ${d.entryLine}`,
    `**What it is:** ${d.oneLiner} ${d.headline}`,
    d.sequence ? `**Process:** ${d.sequence.join(' → ')}` : null,
    `**Covers:**`,
    ...d.capabilities.map((c) => `- ${c}`),
    `**Offers:**`,
    offers,
    d.outcome ? `**Outcome:** ${d.outcome}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}).join('\n\n')

const ONE_SCREEN = DIVISIONS.map(
  (d) =>
    `| ${d.eyebrow} | ${d.promise} | ${d.customer} | ${d.offers[0].price} |`,
).join('\n')

export const SITE_KNOWLEDGE = `
# STACKD STUDIOS AI — SITE KNOWLEDGE BASE

This is the authoritative source of facts about Stackd Studios AI. Answer ONLY using content from this document.

## 1. WHO WE ARE

Stackd is a software-building ecosystem, not an agency and not an "AI agency."

**Positioning:** We help people build software, and companies ship it.
**Supporting line:** Learn it. Build it. Fix it. Scale it.
**Tagline:** Build better with technology.

The company is organized into six divisions. AI sits underneath all six rather than being one of them:
- AI is **how** Stackd works.
- Software is **what** Stackd does.
- People and companies are **who** Stackd serves.

The reason the company is shaped this way: AI is creating millions of new builders at the same moment companies are running out of technical capacity. Stackd serves both sides of that, and each side makes us better at the other.

We are fully remote, US-based, and serve clients nationally. Our work is async-first; we don't hold unnecessary meetings.

**Founder & CEO:** Chanel Gray
- Background in product development, systems design, and automation.
- Holds three psychology degrees and QMHP (Qualified Mental Health Professional) supervision credentials.
- Founder of FieldOS, a multi-tenant operations platform for field service businesses.
- Operates Hicks Virtual Solutions LLC, the parent company.
- Direct contact email: Chanel@stackdstudiosai.com
- Personal brand site: chanel.stackdstudiosai.com

**Parent Company:** Hicks Virtual Solutions LLC, a portfolio company that builds and operates ventures, tools, and client systems. Stackd Studios AI is one brand under that umbrella.

## 2. THE ECOSYSTEM IN ONE SCREEN

| Division | Promise | Customer | Starts at |
| --- | --- | --- | --- |
${ONE_SCREEN}

Full ecosystem story: /ecosystem. Every offer in one list: /services. All pricing: /pricing.

### The flywheel
We train new builders (Learn). They become builders. They get jobs and build apps. They need support (Builders). We rescue and finish what broke (Rescue). They become better builders. The best become Stackd talent. That talent staffs client teams (Teams). That opens enterprise work (Enterprise). Enterprise work funds training the next group. We create customers and talent at the same time.

### Which division is the right one
- Wants to learn to build: **Learn**
- Already building, hit a wall: **Builders**
- Built something, it is broken or unfinished: **Rescue**
- The software does not exist yet: **Build**
- Needs engineering hours rather than a project: **Teams**
- Has a backlog their engineering org cannot reach: **Enterprise**

If a person does not fit any of these, say so and offer the 15-minute chat rather than forcing a fit.

## 3. HOW WE WORK (PROCESS)

1. **Book a free 15-minute chat** — tell us where you are, what you have tried, and what you want. No pitch, no pressure.
2. **Get a proposal** — we name the division and the offer and send a scoped proposal, usually same day.
3. **We do the work** — in focused sprints, faster than a traditional agency, without cutting corners.
4. **You own it** — delivered, deployed, documented, and yours. Ongoing support available through Builders or Teams.

Response time: we reply to every inquiry within 24 hours, including weekends, usually same day.

Turnaround times run from signed agreement and deposit received to delivery. They do not include revision rounds, which are scoped per project.

Payment: anything over $1,000 splits 50% deposit and 50% on delivery. Recurring services (Builder Support, Operating Partner, Business Brain, fractional and embedded engagements) are invoiced monthly.

Ownership: once final payment clears, deliverables, code, prompts, and assets are the client's. We only retain the right to reference the work in our portfolio.

Credits between divisions: a $397 Systems Audit fee credits toward a Build Sprint booked within 30 days. A $297 App Diagnostic fee credits toward a Fix Sprint. Self-paced course purchases credit toward a Learn cohort.

## 4. THE SIX DIVISIONS (CANONICAL OFFER LIST)

${DIVISION_SECTION}

### Add-ons (available with anything above)
- **Rush delivery** — priority build, delivered in 3 business days instead of 5.
- **Extra workflow** — add a second workflow to any Build Sprint.
- **Brand identity** — logo, color palette, and typography system.
- **On-site delivery** — in-person training or workshops, plus travel. Enterprise only.

Add-on pricing is quoted with scope. Do not quote an add-on price.

## 5. BUSINESS BRAIN (inside Stackd Build)

A productized service. We collect a company's operational documents and build a private knowledge system the team can query around the clock, with no training required.

**How it works:**
1. **Collect** — handbooks, SOPs, menus, forms, vendor contacts, training guides.
2. **Build** — a private knowledge system trained only on that business's knowledge.
3. **Deploy** — the team gets a simple chat link. No installs, no logins, no learning curve.
4. **Maintain** — we review and update it monthly to keep it accurate.

**Tiers:**
- **Starter:** $500 setup + $149/month. Small teams, single location.
- **Pro:** $1,500 setup + $349/month. Growing businesses, multiple departments or locations. Most popular.
- **Enterprise:** $3,000+ setup + $600+/month. Multi-location operations needing advanced customization and SLAs.

**Fits well for:** restaurants (menu, allergens, prep), gyms (schedules, memberships, policies), salons and spas (services, pricing, protocols), retail (products, returns, vendors), hotels (guest services, amenities), medical and dental offices (compliance docs, intake, billing FAQs, never patient records).

Details at /business-brain.

## 6. STACKD INTERACTIVE

Our AI-assisted game and interactive experience studio: Roblox games, browser mini-games, branded and event games, educational games, simulations, and interactive digital products. Focused on fast prototyping, testing, and launch. Pricing is scoped per project by platform and complexity. Details at /interactive. Do not quote a price for Interactive work.

## 7. INDUSTRIES WE SERVE (CUSTOM SYSTEMS WORK, mostly Build and Teams)

We've gone deep in nine industries. For any industry not on this list we still serve on a project basis.

### 7.1. Behavioral Health & Mental Health
- AI-Assisted Clinical Documentation — voice or structured input to session note draft, clinician reviews and signs.
- Automated Intake & Scheduling — clients qualify, book, and complete intake without staff.
- Referral Pipeline Automation — keeps warm referrals moving to first appointment.
- Billing Audit Workflow — flags missing documentation and Medicaid billing gaps before submission.
- Credential note: our founder runs a live group practice and built our first behavioral health system inside it.

### 7.2. Dance & Performing Arts Studios
- Student Re-Enrollment Automation — campaigns timed by season.
- Event & Recital Coordination — auto-generated timelines, vendor lists, communication sequences.
- Content Batch Creation — one session generates weeks of social content, newsletters, announcements.
- Lapsed Student Recovery — automated reactivation campaigns.
- Credential note: we own and operate Capital Core Dance Studio in Midlothian, VA.

### 7.3. Real Estate & Property Capital
- Investor Outreach Automation — personalized sequences for hedge funds, family offices, private lenders.
- Deal Summary Generation — address in, structured summary out across multiple disposition strategies.
- Lead Nurture Workflows — keeps warm leads warm without manual tracking.
- Marketing Asset Creation — offering memorandums, pitch decks, email campaigns from a deal template.

### 7.4. Staffing & Family Services
- Candidate Intake Agent — conversational self-screening flow.
- Client Onboarding Automation — paperwork, agreements, preferences without staff handholding.
- Placement Follow-Up Sequences — post-placement check-ins that catch issues and trigger referral asks.
- Job Brief Generation — quick intake call to full candidate brief and job posting draft.
- Credential note: we operate ELC, a nanny and household staffing placement firm.

### 7.5. Government & Public Sector
- Proposal & RFP Response Acceleration — drafting proposal sections, capability statements, past performance writeups.
- Reporting Automation — structured templates with auto-generated narrative sections from raw data.
- Subcontractor Outreach System — identify, research, and reach out via SBA SUBNet and targeted workflows.
- Internal Knowledge Base — document library to searchable system the team queries in plain English.
- Compliance: BAA and FedRAMP-aligned providers, with on-premise deployment options when contracts require.

### 7.6. Nonprofits & Community Development
- Grant Report Automation — drafts narrative sections from program data; staff reviews.
- Donor Stewardship Sequences — automated touchpoints between campaigns.
- Program Documentation System — structured intake and outcome tracking that generates reports automatically.
- Volunteer Coordination Workflows — scheduling, reminders, follow-up automated.
- Credential note: we build and manage operations infrastructure for a mental health nonprofit.

### 7.7. Small Business Operations
- Lead Follow-Up Automation — every lead gets a response, follow-up, and nurture sequence.
- Client Onboarding System — intake, agreements, setup without managing each step.
- Content Engine — weekly content for email, social, and website from a single brief.
- Operations SOPs + Automation — document processes once, automation handles repetitive execution.

### 7.8. Field Services & Trades
- Dispatch & Scheduling Automation — jobs assigned, confirmed, communicated without manual coordination.
- Field Documentation Workflows — standardized job reporting via mobile, auto-synced.
- Post-Service Follow-Up — review requests, follow-up offers, maintenance reminders fire on schedule.
- Multi-Job Operations Dashboard — real-time visibility across the team.
- Credential note: we built FieldOS, a modular multi-tenant SaaS operations platform for field service businesses.

### 7.9. Creators & Digital Media
- Content Batch Engine — one session generates scripts, captions, hooks, and repurposed formats for every platform.
- Brand Voice Documentation — a system trained on the creator's tone and style.
- Client Reporting Automation — monthly reports generated from analytics data.
- Brand Outreach System — researched, personalized pitch emails to brand partners.

### Industries we also serve (project basis)
Med spas and aesthetic clinics, law firms and legal services, insurance agencies, accounting and bookkeeping firms, coaching and consulting practices, fitness studios and personal training, e-commerce and product brands, property management companies, recruiting and HR firms, marketing agencies. Anyone outside the deep nine: book a call and we will scope it.

## 8. COMPLIANCE & DATA

- **HIPAA / PHI** — we use BAA-covered providers (Anthropic for Business, AWS, and similar). Nothing trains on client data, ever.
- **Government compliance** — BAA and FedRAMP-aligned providers; on-premise deployment options available where contracts require.
- **Source-of-truth principle** — customer data stays in customer systems. We connect to it with strict permissions and never copy or train on it.
- **NDAs** — mutual NDAs are standard for any project where confidentiality matters. We will sign the client's or send ours before scoping.

## 9. TECH STACK WE BUILD WITH

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion
- **Backend & Database:** Supabase (Postgres + Auth + RLS), Next.js Server Actions, Vercel Edge Functions
- **Automation & AI:** n8n and Zapier workflows, custom automations, Claude API (Anthropic), prompt engineering
- **Payments & Email:** Stripe Checkout, Resend (transactional email), Calendly (scheduling)
- **Deployment:** Vercel (primary), custom domains, CI/CD via GitHub Actions

We build with Claude (Anthropic) rather than GPT-4 or other models, by deliberate choice. That is a tooling decision, not the product.

## 10. DEMO LAB

We run a Demo Lab at /lab: live, interactive demos of the systems we ship to clients (smart intake form, personalized quiz, live ops dashboard, more on the way). Free access via email opt-in.

## 11. FREE TOOLKIT

We give away "The Small Business AI Toolkit," a curated shortlist of 30+ tools organized by use case rather than alphabetically. Free, quarterly updates. Available at /free/toolkit and /ai-toolkit. Drop an email, get a permanent access link.

## 12. STORE (self-serve digital products)

Instant-access starter packs, templates, courses, and automation kits. No scheduling or scoping required. Purchases credit toward a Learn cohort. Available at /store. Current products include the Business Owner AI Starter Pack, Founder Strategy Toolkit, Next.js + Supabase SaaS Starter, AI Intake System Template, Build Your First AI Workflow, Prompt Engineering for Business, and Claude Skills for proposal writing and content repurposing.

## 13. CAREERS / TEAM

100% remote (US). Async-first culture. Open roles include Full Stack Engineer, Venture Strategist, Client Success Manager, Growth & Content Lead, Social Media Manager, AI Prompt Engineer, UI/UX Designer, Creator & Outreach Partner, and Brand Affiliate Partner. Browse and apply at /careers. Graduates of the Learn division and members of the builder network are considered first for engagement work.

## 14. STATS / PROOF POINTS

- 500+ automations built across client systems
- 300+ workflows automated end to end
- 200+ hours saved per month across all active client systems combined
- 100+ systems and apps shipped (apps, dashboards, portals, automations)
- 10+ projects launched
- Trusted by builders, founders, and owner-run businesses across the DMV and nationally

## 15. CLIENT OUTCOMES (representative)

- Residential services company — 3 hours/day on intake admin down to 20 minutes/day after the rebuild.
- Wellness studio — onboarding rebuilt; conversions up 40% in the first month.
- Marketing agency — custom client reporting dashboard built in 6 days; their clients assume they have a full engineering team.
- B2B software startup — team trained in one afternoon; they use the systems daily now.
- Creative agency — spreadsheet to a fully automated client management system; the team went from drowning in admin to focused on the work.

## 16. CTAS / WHERE TO GO

- **Book a free 15-minute chat:** /contact (or email Chanel@stackdstudiosai.com)
- **The ecosystem story:** /ecosystem
- **Divisions:** /learn · /builders · /rescue · /build · /teams · /enterprise
- **Every offer in one list:** /services
- **Pricing:** /pricing
- **Business Brain:** /business-brain
- **Stackd Interactive:** /interactive
- **Demo Lab:** /lab
- **Free Toolkit:** /free/toolkit
- **Store:** /store
- **About:** /about
- **Careers:** /careers

## 17. WHAT WE DON'T DO

- We do not sell raw access to LLMs. Use Claude.ai or ChatGPT directly for that.
- We are not a managed IT or cybersecurity firm.
- We do not provide legal, medical, or financial advice.
- We are not a recruiting or staffing agency. Teams and Enterprise provide our own engineers, not placements.
- We do not accredit or certify anyone. Learn is training, not an accredited degree program.

## 18. GUIDING PRINCIPLES

- **Nobody gets told they are not a real developer.** If you are building software, that is the job.
- **Craft over shortcuts** — our tools make us faster; they do not replace judgment.
- **Clarity over complexity** — simple systems people can use, understand, and grow with.
- **Strategy before code** — start with why before touching a line.
- **Speed without chaos** — focused sprints, same-day proposals, honest scoping.
- **We say when we are not the fit** — and point at the right door, including someone else's.

## 19. WHAT TO ASK BEFORE QUOTING

Prices listed in section 4 are the published prices and may be quoted directly.

For anything custom ("how much for my project"), the honest answer is that it depends on scope, and the fastest path is:
- If they do not know what to build: the Systems Audit, $397, 48 hours.
- If something is already built and broken: the App Diagnostic, $297, 48 hours.
- If they want capacity rather than a project: a 15-minute chat about Fractional Engineering.
- Otherwise: the free 15-minute chat.

Never invent a price. Never quote for Stackd Interactive, Application Modernization, or add-ons, which are all scoped per project. If asked for a price not listed here, say it is scoped per project and offer the chat.
`.trim()
