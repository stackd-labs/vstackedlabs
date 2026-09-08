import { type IconName } from '@/components/Icon'

export type AssistantCategory = 'marketing' | 'sales' | 'operations' | 'content'

export type AssistantPrompt = {
  id: string
  category: AssistantCategory
  label: string
  fullPrompt: string
  response: string
}

export const categories: Array<{ id: AssistantCategory; name: string; icon: IconName }> = [
  { id: 'marketing', name: 'Marketing', icon: 'megaphone' },
  { id: 'sales', name: 'Sales', icon: 'briefcase' },
  { id: 'operations', name: 'Operations', icon: 'gear' },
  { id: 'content', name: 'Content', icon: 'pen' },
]

export const prompts: AssistantPrompt[] = [
  // ─── Marketing ──────────────────────────────────────────────
  {
    id: 'm-linkedin-launch',
    category: 'marketing',
    label: 'LinkedIn post: announce a new service',
    fullPrompt: 'Write a LinkedIn post announcing my new service. Make it punchy, not salesy. End with a clear next step.',
    response: `Three things I kept hearing from clients last quarter:

→ "I don't have time to figure out which AI tool is right for us."
→ "We tried ChatGPT once, didn't get it, gave up."
→ "Our team just needs someone to set this up FOR us."

So we built it.

Today I'm announcing the **Build Sprint** — one specific workflow built, tested, and handed off in 5 business days. No 6-month engagement. No "AI strategy deck." Just the one piece of your business that's eating your week, automated, with a custom prompt library so your team can actually use it.

Pick a workflow. We build it. You're using it Monday.

If something specific just came to mind, comment "interested" and I'll DM you the details.`,
  },
  {
    id: 'm-reel-hooks',
    category: 'marketing',
    label: '5 hook variations for my next reel',
    fullPrompt: "Generate 5 hook variations I could use for a reel about why most small businesses are using AI wrong.",
    response: `Pick the one that matches your gut on what your audience needs to hear:

1. "Most small businesses are using AI wrong. Here's the 30-second version of how to fix it."
2. "Stop asking ChatGPT to 'write a blog post.' Do this instead."
3. "Your competitor isn't smarter than you. They just have better prompts."
4. "If you've tried AI and given up, you're 90% of the way there. You just stopped at the wrong step."
5. "Why I tell every business owner: don't subscribe to another AI tool until you've done this."

My pick: **#1 or #4** — they hint at a specific fix, which gets people to keep watching for the answer.`,
  },
  {
    id: 'm-newsletter-intro',
    category: 'marketing',
    label: 'Newsletter intro about a small win',
    fullPrompt: "Draft a value-driven newsletter intro about a small win we had with a client this week.",
    response: `**Subject:** The 6-day rebuild that's still paying off

Hey {first_name},

Quick story before the meaty stuff this week.

A residential services client came to us a month ago with a 3-hour-a-day intake problem. Every morning, the owner sat down to manually parse 15-30 customer messages and route them to the right tech. He was burning 60% of his "founder hours" on what should've been a 20-minute task.

We built him a Smart Intake system in 6 days. Drop the message in, AI parses it into structured fields, routes to the right tech via SMS. Owner reviews and approves in under 15 minutes a day.

He texted me yesterday: "Got my mornings back."

That's the kind of win we live for. Three things below to help you find your version of it ↓`,
  },

  // ─── Sales ──────────────────────────────────────────────────
  {
    id: 's-cold-followup',
    category: 'sales',
    label: 'Follow up with a lead who went quiet',
    fullPrompt: "Write a follow-up email to a warm lead I haven't heard from in 2 weeks. Professional but human, not pushy.",
    response: `**Subject:** Still on your radar?

Hey {first_name} —

Wanted to circle back on the conversation we had a couple weeks ago about [their workflow/problem]. Totally get if it's slipped down the priority list — I know how that goes.

Two quick things in case it helps:

1. **No rush on my end.** If now's not the moment, just say so and I'll check back in a quarter (or whenever you tell me to).
2. **One thing I forgot to mention** that came up after we spoke: [insert relevant case study, resource, or small insight you've learned since].

Either way, would love to know where things landed. Even a one-line "we picked X" or "we paused" helps me close the loop.

— [Your name]`,
  },
  {
    id: 's-budget-no',
    category: 'sales',
    label: 'Polite "budget doesn\'t fit" reply',
    fullPrompt: "Write a polite reply to a prospect who said their budget can't accommodate our service. Don't beg, but leave the door open.",
    response: `**Subject:** Totally get it — small thought before you go

Hey {first_name} —

Appreciate you being upfront — that's actually rare and I'm grateful for it.

Two thoughts before you make a final call:

1. If the **scope** is what's pushing it over budget, we could carve out a smaller starting piece (e.g. one workflow instead of three) for ~30% of the original. Sometimes that's the right call; sometimes it isn't. Happy to scope it if useful.
2. If it's just **not the right time** at all, that's also totally fine. I'll add you to my "check back in 2 quarters" list and circle back then. No drip sequence, no nurture funnel — just a real human ping when the timing might've shifted.

Either way, you have my email. If anything changes, you know where to find me.

— [Your name]`,
  },
  {
    id: 's-referral-ask',
    category: 'sales',
    label: 'Referral-ask after closing a deal',
    fullPrompt: 'Draft a referral-ask email I can send a client right after they sign on, before we start the work.',
    response: `**Subject:** One quick favor before we get started

Hey {first_name} —

Pumped to officially have you on board. The kickoff materials are coming Wednesday.

One small ask while you're feeling the most enthusiastic you'll ever feel about this engagement (which is right now, statistically): **who else in your world might benefit from what we're about to build for you?**

Two specific kinds of people I'm asking about:

1. Someone in a similar role at a different company who's drowning in [the specific problem we're solving for you]
2. A peer of yours who you respect and who'd take a recommendation from you seriously

If 1-2 names come to mind, just hit reply with their first names. I'll handle the intro language and CC you so it never feels like cold outreach. If nobody comes to mind, no worries at all — we'll do great work together regardless.

Thanks again for the trust. More soon.

— [Your name]`,
  },

  // ─── Operations ─────────────────────────────────────────────
  {
    id: 'o-onboarding-sop',
    category: 'operations',
    label: 'Client onboarding SOP outline',
    fullPrompt: "Outline an SOP for onboarding a new client. Should be repeatable, take less than 7 days, and end with a kickoff call.",
    response: `**Client Onboarding SOP** — 7 days, end with kickoff

**Day 0 (within 1 hour of signed contract):**
- Send welcome email (template ready in Hubspot)
- Add to CRM with stage = "Onboarding"
- Trigger Notion workspace clone for the new client
- Calendar invite for kickoff call (Day 7)

**Day 1:**
- Send intake form (Tally) — covers goals, current tools, decision-makers, success metrics
- Add client primary contact + billing contact to Slack Connect channel
- Internal: assign Project Lead and Account Manager

**Days 2–4 (gated on intake form completion):**
- Project Lead reviews intake responses, drafts engagement plan in shared Notion doc
- Send doc to client for async review with 3 specific yes/no questions
- AM follows up 48 hr later if no response

**Day 5:**
- Client approves engagement plan (or requests changes — re-cycle once)
- Internal: lock scope, assign timeline milestones, create Linear project

**Day 6:**
- Send kickoff agenda 24 hr before call
- Confirm attendance with both sides

**Day 7 — Kickoff call (45 min):**
- Walk through engagement plan → confirm out loud
- Walk through Notion workspace → make sure they can find everything
- Set the next 3 milestones with dates
- End with "what would make you a 10/10 raving fan" question

**Owner:** AM. **Tools:** Hubspot + Tally + Notion + Slack Connect + Linear + Calendly.`,
  },
  {
    id: 'o-team-checkin',
    category: 'operations',
    label: 'Weekly team check-in agenda',
    fullPrompt: "Create a weekly team check-in agenda for a small remote team. Should run in 25 min max.",
    response: `**Weekly Team Sync** — 25 min, every Monday 10:00 AM

**Async pre-work (due Friday EOD):**
Each person posts in #team-async:
- **Shipped:** one thing I finished this week
- **Stuck:** one thing I am stuck on (or close to it)
- **Priority:** my one focus for next week

**Live agenda (25 min total):**

**0:00–3:00 — Quick wins round-robin**
Each person reads their Shipped line aloud (60 seconds max). No questions yet.

**3:00–13:00 — Unblock**
Each Stuck line gets ~2 min: person names what they need (decision, intro, second pair of eyes, coverage). Group either solves on the spot OR assigns an owner to follow up offline. Time-box hard.

**13:00–20:00 — Single shared focus**
Pick the ONE thing that's most load-bearing for the whole team this week. Discuss what would unblock it. Capture the next action + owner in the meeting doc.

**20:00–24:00 — Heads-ups**
PTO, client calls others should know about, anything timezone-y. Quick, no debate.

**24:00–25:00 — Close**
Recap the 1-2 follow-ups assigned and who's on the hook. End on time.

**Rules of the road:**
- No status updates in the meeting (those go in async pre-work).
- If a topic exceeds its time, it gets a follow-up DM, not extra airtime.
- Cancel the meeting if nobody has a blocker worth discussing — async-first means we don't meet to feel productive.`,
  },
  {
    id: 'o-vendor-eval',
    category: 'operations',
    label: 'Vendor evaluation framework',
    fullPrompt: "Draft a 1-page framework for evaluating vendors (software or services) before signing a contract.",
    response: `**Vendor Evaluation Framework** — score 1–5 on each dimension; vendor needs ≥ 3.5 average to proceed.

**1. Fit (does it actually solve our problem?)**
- Does it solve the *exact* problem, or are we forcing a fit?
- Will the team adopt it, or will it sit unused after week 2?

**2. Cost (total, not sticker)**
- Annual list price + setup fees + integration cost + training time
- What does it cost us to switch off later? (Lock-in risk)

**3. Maturity**
- How long has the vendor been around? Funded vs profitable?
- Who else uses them at our scale? Can we talk to a reference?

**4. Support**
- SLA on response time
- Named human contact, or ticket queue?
- Documentation quality (skim it — is it embarrassing?)

**5. Reversibility**
- Can we export our data in a usable format?
- 30/60/90-day exit clause?

**6. Security & Compliance** (only if relevant)
- SOC 2 / HIPAA / etc. — current, not "in progress"
- Where's the data hosted?
- Who at the vendor has access to our production data?

**Process:**
- 2 stakeholders score independently → average → if averages diverge by > 1 point, talk before deciding
- Always demo with REAL data from our business, not vendor's sandbox
- Pilot with a 30-day exit clause before any annual commit

**Red flags that override the score:** opaque pricing, sales pressure, can't get a reference, won't sign a DPA, demos use only the prettiest features, founder ghosted you in a thread.`,
  },

  // ─── Content ────────────────────────────────────────────────
  {
    id: 'c-blog-titles',
    category: 'content',
    label: '5 blog post titles on my topic',
    fullPrompt: "Brainstorm 5 blog post titles I could write for an audience of small business owners curious about AI.",
    response: `Here are five angles, each tuned for a different reader state:

**1. The skeptic angle** — *"I tried AI for my business for 30 days. Here's what actually moved the needle (and what was hype)."*
→ Best for owners who've heard the buzz but feel burned by it.

**2. The how-to angle** — *"5 things to automate this month that pay for themselves in 2 weeks"*
→ Strong evergreen SEO play. Specific = clickable.

**3. The contrarian angle** — *"Don't subscribe to another AI tool. Do this instead."*
→ Pattern-breaks. Good for an audience drowning in tool overwhelm.

**4. The case study angle** — *"How a 3-person plumbing company replaced 12 hours of admin work a week with one Claude prompt"*
→ Concrete = credible. Most-shared format if you have the case to back it up.

**5. The "behind the curtain" angle** — *"The exact prompt I use to write client emails (you can steal it)"*
→ Generosity = trust. Pair with a one-page PDF download to capture leads.

**My pick to write first: #4.** It builds the most credibility per minute of reader time. Use #5 as a follow-up once you have a list to send it to.`,
  },
  {
    id: 'c-video-script',
    category: 'content',
    label: '30-second video script intro',
    fullPrompt: "Write a 30-second video script intro for a clip about how a small business owner can save 10 hours a week using AI.",
    response: `**[0:00 — 0:03] Hook**
*Sit down at your desk, look at the camera.*
"Last quarter I helped a small business owner save 10 hours a week. Here's exactly what we did — and you can do this in an afternoon."

**[0:03 — 0:10] Problem**
*Cut to a screen of your overflowing inbox or a messy spreadsheet.*
"She was spending 2 hours every morning on customer emails — sorting, replying, and chasing follow-ups. Two hours. Every. Morning."

**[0:10 — 0:22] Setup**
*Cut back to camera, lean in.*
"We did three things. One — we built a Claude prompt that read every incoming email and sorted them into 4 buckets: urgent, simple reply, needs research, junk. Two — we wrote a draft response for the simple ones. Three — we put a one-click 'send' button on the drafts so she could approve in seconds."

**[0:22 — 0:28] Payoff**
*Slow zoom in.*
"Two-hour task went to fifteen minutes. Fifty-five hours back per month."

**[0:28 — 0:30] CTA**
*Smile.*
"Comment 'inbox' and I'll send you the prompt template."`,
  },
  {
    id: 'c-launch-caption',
    category: 'content',
    label: 'Instagram caption for a launch',
    fullPrompt: "Draft an Instagram caption for the launch of a new lead-magnet PDF on AI tools.",
    response: `Took us 6 months to compile this. Took the team 30 minutes to use today.

The Small Business AI Toolkit — 30+ AI tools, organized by the work you actually need to get done. Not alphabetical. Not "best of" listicle bait. The same shortlist we hand every paying client on day one.

✓ Free + low-cost tools only (no $200/mo SaaS bloat)
✓ Organized by use case, not feature
✓ Updated every quarter, automatically — your link reflects it instantly

Drop "TOOLKIT" in the comments and I'll DM you the link. Or grab it from the link in bio.

If you've ever felt like you're drowning in AI noise, this is the cure.

#aiforbusiness #smallbusinessowner #aiimplementation #productivity #automation`,
  },
]

export function getPromptsByCategory(category: AssistantCategory): AssistantPrompt[] {
  return prompts.filter((p) => p.category === category)
}
