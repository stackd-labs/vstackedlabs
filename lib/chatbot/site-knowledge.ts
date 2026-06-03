/**
 * Hand-curated knowledge base for the Stackd Studios AI chatbot.
 * The chatbot is strictly grounded — it may ONLY answer using facts from
 * this file. No web fetching, no extrapolation.
 *
 * MUST be deterministic — no timestamps, no dynamic data — so prompt
 * caching stays warm. Update this file in one place to update what the
 * bot knows. Aim for ≥4096 tokens (Haiku 4.5's minimum cacheable prefix).
 */
export const SITE_KNOWLEDGE = `
# STACKD STUDIOS AI — SITE KNOWLEDGE BASE

This is the authoritative source of facts about Stackd Studios AI. Answer ONLY using content from this document.

## 1. WHO WE ARE

Stackd Studios is an operations system studio — solutions, automation, and venture studio in one. We build the custom software and automations a business runs on, and turn the best of those builds into products of our own. We help two kinds of people:
- **Business owners** — custom software and automation for existing businesses, to save staff time, cut manual work, and run leaner.
- **Founders** — design, build, and launch custom products and ventures.

AI is how we build fast — it is never what we sell. We are not an "AI agency."

We are fully remote, US-based, and serve clients nationally. Our work is async-first; we don't hold unnecessary meetings.

**Founder & CEO:** Chanel Gray
- Background in product development, systems design, and automation.
- Holds three psychology degrees and QMHP (Qualified Mental Health Professional) supervision credentials.
- Founder of FieldOS — a multi-tenant operations platform for field service businesses.
- Operates Hicks Virtual Solutions LLC, the parent company.
- Direct contact email: Chanel@stackdstudiosai.com
- Personal brand site: chanel.stackdstudiosai.com

**Parent Company:** Hicks Virtual Solutions LLC — a portfolio company that builds and operates ventures, tools, and client systems. Stackd Studios AI is one brand under that umbrella.

## 2. CORE PROMISE

We design, build, and launch the systems and ventures businesses run on — giving business owners and founders the power to operate smarter, move faster, and build something that lasts. We move faster than a traditional agency without sacrificing craft.

We build with Claude (Anthropic), not GPT-4 or other models, by deliberate choice.

## 3. HOW WE WORK (PROCESS)

Every engagement follows the same four-step process:

1. **Book a Free Call** — A free 20-minute discovery call. Tell us about your business or idea, your goals, and what you've already tried. No pitch, no pressure.
2. **Get a Proposal** — We identify which service tier fits, send a clear scoped proposal — usually same day.
3. **We Build It** — We build in focused sprints, faster than a traditional agency, without sacrificing quality.
4. **You Launch** — Product or system delivered, deployed, and handed off with full documentation. Ongoing support available.

Response time guarantee: we reply to every inquiry within 24 hours, including weekends — usually same day.

## 4. SERVICES (CANONICAL — FOUR CORE SERVICES)

### 4.1. Systems Audit — $397 — START HERE
- **Turnaround:** 48 hours
- **Includes:**
  - Async business operations intake form
  - 3–5 prioritized systems to build, tagged to specific tools and workflows
  - A written roadmap delivered within 48 hours
  - A 30-minute walkthrough call
- **Best for:** First-time buyers and anyone uncertain where to start.
- **Credit:** If a client decides to book a Build Sprint afterward, the $397 audit fee is credited toward that build.
- **Why this exists:** Most owners know something could run better but don't know where to start, what's worth their time, or what's hype.

### 4.2. Build Sprint — $997 — MOST POPULAR
- **Turnaround:** 5 business days
- **Includes:**
  - One complete workflow build of the client's choice (examples: email triage, CRM follow-up, new-client onboarding, content repurposing)
  - Custom prompt + automation logic (10–15 building blocks)
  - 1-hour orientation and training call
  - 7 days of post-delivery email support
- **Best for:** Solopreneurs, small businesses, and anyone with one specific workflow eating their week.
- **Common next step:** Most Build Sprint clients either book a second workflow or roll into the Operating Partner plan.

### 4.3. Team Enablement — From $2,500 — FOR TEAMS
- **Standard:** $2,500 — teams up to 10 people, 3-hour live virtual session.
- **Enterprise:** From $5,000 — larger teams or full-day deep-dives, with role-specific template libraries and async coaching follow-up.
- **Turnaround:** Scheduled within 2 weeks.
- **Includes:**
  - Pre-session intake call to customize content for the team and workflows
  - Live virtual training session (3 hours Standard, half-day Enterprise)
  - Custom workflow templates and a prompt library
  - Full session recording and resource folder delivered after
- **Best for:** Growing businesses that need the whole team running the systems.
- **Note on demand:** Sessions are capped per quarter because demand is far ahead of supply. Comparable training elsewhere typically runs $10,000–$40,000.
- **Common next step:** Enablement clients get first access to the Operating Partner plan.

### 4.4. Operating Partner — $1,500/month — ONGOING
- **Cadence:** Monthly
- **Includes:**
  - 1 new workflow or tool build per month
  - 5–10 system tune-ups per month
  - Monthly strategy call
  - Priority async support
  - First access for Build Sprint and Enablement graduates
- **Best for:** Teams committed to continuously improving their systems.
- **Why it exists:** Tools move fast — a workflow that worked in February is often outdated by July. Most Operating Partner clients stay 6+ months.

### Add-Ons (available with any service)
- **Rush Delivery** — Priority build, delivered in 3 business days instead of 5.
- **Extra Workflow** — Add a second workflow to any Build Sprint.
- **Brand Identity Add-On** — Logo, color palette, and typography system.

## 5. BUSINESS BRAIN — Custom Knowledge System for Your Team

A separate productized service. We collect your operational documents and build a custom private knowledge system your team can query around the clock — no training required.

**How it works (4 steps):**
1. **Collect** — We gather all operational docs: handbooks, SOPs, menus, forms, vendor contacts, training guides.
2. **Build** — We build a custom private knowledge system trained only on the business's knowledge.
3. **Deploy** — Team gets a simple chat link — no installs, no logins, no learning curve.
4. **Maintain** — We review and update the system monthly to keep it accurate.

**Pricing tiers:**
- **Starter:** $500 setup + $149/month — Best for: small teams with a single location.
- **Pro:** $1,500 setup + $349/month — Best for: growing businesses with multiple departments or locations. (Most popular.)
- **Enterprise:** $3,000+ setup + $600+/month — Best for: multi-location operations needing advanced customization and SLAs.

**Industries Business Brain serves well:**
- Restaurants — instant answers from menu, allergens, prep procedures
- Gyms — schedules, memberships, policies for staff and members
- Salons & Spas — services, pricing, protocols
- Retail Stores — products, returns, vendor info
- Hotels — guest services, amenities, local info
- Medical & Dental Offices — compliance docs, intake forms, billing FAQs (no patient records)

## 6. INDUSTRIES WE SERVE (CUSTOM SYSTEMS WORK)

We've gone deep in nine industries. The first eight have specific service offerings; the ninth is creators/digital media. For any industry not on this list, we still serve on a project basis — book a Discovery Call.

### 6.1. Behavioral Health & Mental Health
- AI-Assisted Clinical Documentation — voice or structured input → session note draft → clinician reviews and signs.
- Automated Intake & Scheduling — clients qualify, book, and complete intake without staff.
- Referral Pipeline Automation — keeps warm referrals moving to first appointment.
- Billing Audit Workflow — flags missing documentation and Medicaid billing gaps before submission.
- Credential note: Our founder runs a live group practice and built our first behavioral health system inside it.

### 6.2. Dance & Performing Arts Studios
- Student Re-Enrollment Automation — campaigns timed by season.
- Event & Recital Coordination — auto-generated timelines, vendor lists, communication sequences.
- Content Batch Creation — one session generates weeks of social content, newsletters, announcements.
- Lapsed Student Recovery — automated reactivation campaigns.
- Credential note: We own and operate Capital Core Dance Studio in Midlothian, VA.

### 6.3. Real Estate & Property Capital
- Investor Outreach Automation — personalized sequences for hedge funds, family offices, private lenders.
- Deal Summary Generation — address in, structured summary out across multiple disposition strategies.
- Lead Nurture Workflows — keeps warm leads warm without manual tracking.
- Marketing Asset Creation — offering memorandums, pitch decks, email campaigns from a deal template.

### 6.4. Staffing & Family Services
- Candidate Intake Agent — conversational self-screening flow.
- Client Onboarding Automation — paperwork, agreements, preferences without staff handholding.
- Placement Follow-Up Sequences — post-placement check-ins that catch issues and trigger referral asks.
- Job Brief Generation — quick intake call → full candidate brief and job posting draft.
- Credential note: We operate ELC, a nanny and household staffing placement firm.

### 6.5. Government & Public Sector
- Proposal & RFP Response Acceleration — drafting of proposal sections, capability statements, past performance writeups.
- Reporting Automation — structured templates with auto-generated narrative sections from raw data.
- Subcontractor Outreach System — identify, research, reach out via SBA SUBNet and targeted workflows.
- Internal Knowledge Base — document library → searchable knowledge system team can query in plain English.
- Compliance: We use BAA / FedRAMP-aligned providers and on-prem deployment options when contracts require.

### 6.6. Nonprofits & Community Development
- Grant Report Automation — drafts narrative sections from program data; staff reviews.
- Donor Stewardship Sequences — automated touchpoints between campaigns.
- Program Documentation System — structured intake and outcome tracking that generates reports automatically.
- Volunteer Coordination Workflows — scheduling, reminders, follow-up automated.
- Credential note: We build and manage operations infrastructure for a mental health nonprofit.

### 6.7. Small Business Operations
- Lead Follow-Up Automation — every lead gets a response, follow-up, and nurture sequence.
- Client Onboarding System — intake, agreements, setup without managing each step.
- Content Engine — weekly content for email, social, website from a single brief.
- Operations SOPs + Automation — document processes once, automation handles repetitive execution.

### 6.8. Field Services & Trades
- Dispatch & Scheduling Automation — jobs assigned, confirmed, communicated without manual coordination.
- Field Documentation Workflows — standardized job reporting via mobile, auto-synced.
- Post-Service Follow-Up — review requests, follow-up offers, maintenance reminders fire on schedule.
- Multi-Job Operations Dashboard — real-time visibility across the team.
- Credential note: We built FieldOS, a modular multi-tenant SaaS operations platform for field service businesses.

### 6.9. Creators & Digital Media
- Content Batch Engine — one session generates scripts, captions, hooks, and repurposed formats for every platform.
- Brand Voice Documentation — a system trained on your tone and style.
- Client Reporting Automation — monthly reports generated from analytics data.
- Brand Outreach System — researched, personalized pitch emails to brand partners.

### Industries we also serve (project basis)
Med spas & aesthetic clinics, law firms & legal services, insurance agencies, accounting & bookkeeping firms, coaching & consulting practices, fitness studios & personal training, e-commerce & product brands, property management companies, recruiting & HR firms, marketing agencies. Anyone outside the deep nine — book a call and we'll scope it.

## 7. COMPLIANCE & DATA

- **HIPAA / PHI** — We use BAA-covered providers (Anthropic for Business, AWS, etc.). Nothing trains on client data, ever.
- **Government compliance** — BAA / FedRAMP-aligned providers; on-prem deployment options available where contracts require.
- **Source-of-truth principle** — Customers' data stays in their systems; we connect to it with strict permissions, never copy or train on it.

## 8. TECH STACK WE BUILD WITH

- **Frontend:** Next.js (App Router), React 19, Tailwind CSS v4, Framer Motion
- **Backend & Database:** Supabase (Postgres + Auth + RLS), Next.js Server Actions, Vercel Edge Functions
- **Automation & AI:** n8n / Zapier workflows, custom automations, Claude API (Anthropic), prompt engineering
- **Payments & Email:** Stripe Checkout, Resend (transactional email), Calendly (scheduling)
- **Deployment:** Vercel (primary), custom domains, CI/CD via GitHub Actions

## 9. DEMO LAB

We run a Demo Lab at /lab — live, interactive demos of the systems we ship to clients (smart intake form, personalized quiz, live ops dashboard, more on the way). Free access via email opt-in. Currently running with one live demo (Smart Intake) and more being added every few weeks.

## 10. FREE TOOLKIT

We give away "The Small Business AI Toolkit" — a curated shortlist of 30+ tools, organized by use case rather than alphabetically. Free, with quarterly updates. Available at /free/toolkit. Same pattern as the Demo Lab — drop your email, get a permanent access link.

## 11. CAREERS / TEAM

100% remote (US). Async-first culture. Open roles include: Full Stack Engineer, Venture Strategist, Client Success Manager, Growth & Content Lead, Social Media Manager, AI Prompt Engineer, UI/UX Designer, Creator & Outreach Partner, Brand Affiliate Partner. Browse and apply at /careers.

## 12. STATS / PROOF POINTS

- 500+ automations built across client systems
- 300+ workflows automated end-to-end
- 200+ hours saved per month across all active client systems combined
- 100+ systems and apps shipped (apps, dashboards, portals, automations)
- 10+ projects launched
- Trusted by founders and business owners across the DMV and nationally

## 13. CLIENT OUTCOMES (representative)

- Residential services company — 3 hr/day on intake admin → 20 min/day after the rebuild.
- Wellness studio — onboarding rebuilt; conversions up 40% in the first month.
- Marketing agency — custom client reporting dashboard built in 6 days; the agency's clients assume they have a full engineering team.
- B2B software startup — team trained in one afternoon; they use the systems daily now.
- Creative agency — spreadsheet → fully automated client management system; team went from drowning in admin to focused on the work.

## 14. CTAS / WHERE TO GO

- **Book a Free Discovery Call:** /contact (or email Chanel@stackdstudiosai.com)
- **All services:** /services
- **Pricing detail:** /pricing
- **Demo Lab:** /lab
- **Free Toolkit:** /free/toolkit
- **Business Brain:** /business-brain
- **About:** /about
- **Careers:** /careers

## 15. WHAT WE DON'T DO

- We do not sell raw access to LLMs (use Claude.ai, ChatGPT directly for that).
- We are not a managed IT or cybersecurity firm.
- We do not provide legal, medical, or financial advice.
- We are not a recruiting / staffing agency for AI talent.

## 16. GUIDING PRINCIPLES (HOW WE WORK)

- **Craft over shortcuts** — our tools make us faster; they don't replace judgment.
- **Clarity over complexity** — simple systems people can use, understand, and grow with.
- **Strategy before code** — start with why before touching a line.
- **Speed without chaos** — two-week sprints, same-day proposals, focused builds.

## 17. WHAT TO ASK BEFORE QUOTING

If a prospect asks "how much will my project cost," the honest answer is: it depends on scope, and the fastest path is the Systems Audit ($397, 48 hr) for a clear roadmap, or the free 20-min Discovery Call. Don't quote custom-build prices without knowing the workflow.
`.trim()
