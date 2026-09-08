/**
 * STACKD ECOSYSTEM — single source of truth for the six divisions.
 *
 * Every division page, the /ecosystem story page, the /services hub, the
 * /pricing table, the navbar, the footer and the chatbot knowledge base all
 * read from this file. Change an offer here and it changes everywhere.
 *
 * ─── PRICING NOTE ──────────────────────────────────────────────────────────
 * Offers with `proposed: true` are PLACEHOLDER prices written to make the site
 * feel real. They are not confirmed. Every one is listed in
 * docs/PROPOSED-PRICES.md so they can be reviewed and overwritten in one pass.
 * In dev they render with a dotted underline; in production they look normal.
 *
 * Offers without the flag are live, previously-published prices and were
 * carried over unchanged.
 * ───────────────────────────────────────────────────────────────────────────
 */

import { type IconName } from '@/components/Icon'

export type DivisionSlug =
  | 'learn'
  | 'builders'
  | 'rescue'
  | 'build'
  | 'teams'
  | 'enterprise'

export type DivisionTheme = 'cream' | 'white' | 'yellow' | 'dark'

export interface DivisionOffer {
  /** Anchor id within the division page. */
  slug: string
  name: string
  price: string
  timing: string
  /** One sentence. What the buyer actually gets. */
  pitch: string
  bullets: string[]
  cta: string
  /** Defaults to /contact. */
  ctaHref?: string
  popular?: boolean
  /** Price is a placeholder awaiting confirmation. See docs/PROPOSED-PRICES.md */
  proposed?: boolean
}

export interface Division {
  slug: DivisionSlug
  /** Name in the shared monochrome icon set. See components/Icon.tsx */
  icon: IconName
  /** "STACKD LEARN" */
  eyebrow: string
  /** "Learn" */
  shortName: string
  /** The one-line promise. */
  promise: string
  /** Page headline. Longer than the promise. */
  headline: string
  /** Who this is for, in three or four words. Used in the one-screen table. */
  customer: string
  /** Nav and card subtitle. */
  oneLiner: string
  /** "A 17-year-old learning to build their first app enters here." */
  entryLine: string
  /** Body paragraphs for the division page. */
  body: string[]
  /** What this division does, as a scannable list. */
  capabilities: string[]
  /** Optional arrow sequence, e.g. DIAGNOSE / FIX / FINISH / SHIP */
  sequence?: string[]
  offers: DivisionOffer[]
  /** Closing outcome line, e.g. "Learn. Build. Portfolio. Work." */
  outcome?: string
  theme: DivisionTheme
  /** Accent hex. Four of six reuse existing brand tokens. */
  accent: string
  /** Accent that reads on a dark background. */
  accentOnDark: string
}

export const DIVISIONS: Division[] = [
  // ─── LEARN ────────────────────────────────────────────────────────────
  {
    slug: 'learn',
    icon: 'cap',
    eyebrow: 'Stackd Learn',
    shortName: 'Learn',
    promise: 'We train builders.',
    headline: 'Not a coding school. A builder program.',
    customer: 'Beginners and career changers',
    oneLiner: 'Learn to build software with AI and modern tools.',
    entryLine:
      'A 17-year-old learning to build their first app enters here.',
    body: [
      'Traditional coding school teaches you to memorize syntax for a job market that changed while you were enrolled. We teach you to build. You will ship a real, working application, and you will understand every piece of it well enough to fix it when it breaks.',
      'The tools have moved. A person with good judgment and an AI pair can now build what took a small team two years ago. What they usually cannot do is deploy it, secure it, connect it to a database, or hand it to a customer. That gap is the whole curriculum.',
      'You leave with software you built, a repository you can show, and the vocabulary to work alongside engineers. Every program is project-first: you are building from week one, not watching lectures until week six.',
    ],
    capabilities: [
      'Build your first real application, start to finish',
      'AI-assisted development: how to direct it, and where it lies to you',
      'Git and GitHub, branches, pull requests, code review',
      'APIs, databases, authentication, and why they break',
      'Deployment, environments, and shipping to real users',
      'Product thinking: scoping, cutting, and finishing',
      'AI skills for the workplace you already have',
      'Career transition support and portfolio review',
    ],
    outcome: 'Learn. Build. Portfolio. Work.',
    theme: 'cream',
    accent: '#2F9E6B',
    accentOnDark: '#4ADE80',
    offers: [
      {
        slug: 'first-app',
        name: 'Build Your First App',
        price: '$497',
        timing: '4-week cohort',
        pitch:
          'Four weeks, one real application, deployed to a live URL you own.',
        bullets: [
          'Weekly live build sessions plus async support',
          'One working app: database, auth, and a real front end',
          'Deployed on your own domain by the final week',
          'Code review on everything you ship',
        ],
        cta: 'Join the next cohort',
        proposed: true,
      },
      {
        slug: 'ai-assisted-dev',
        name: 'AI-Assisted Development',
        price: '$897',
        timing: '6 weeks',
        pitch:
          'How to build production software with an AI pair without producing a mess you cannot maintain.',
        bullets: [
          'Prompting for code that survives contact with real users',
          'Reading, reviewing, and correcting AI-written code',
          'Architecture and file structure that stays legible',
          'Testing, debugging, and knowing when the model is wrong',
        ],
        cta: 'Enroll',
        popular: true,
        proposed: true,
      },
      {
        slug: 'vibe-to-real',
        name: 'Vibe Coding to Real Development',
        price: '$1,200',
        timing: '8 weeks',
        pitch:
          'You already build things that mostly work. This is the bridge to software you can charge money for.',
        bullets: [
          'Take one of your own projects to production quality',
          'Security, data modeling, and error handling from scratch',
          'Payments, email, and third-party integrations done properly',
          'Ends with a deployed, paid-customer-ready build',
        ],
        cta: 'Apply',
        proposed: true,
      },
      {
        slug: 'kids-teens',
        name: 'Kids and Teens Technology',
        price: '$299',
        timing: 'Per term',
        pitch:
          'Ages 10 to 17. They build a game, a site, and an app, and they understand how each one works.',
        bullets: [
          'Small groups, project-first, no lecture blocks',
          'Three finished projects per term',
          'Parent showcase at the end of each term',
          'Laptop required, no prior experience needed',
        ],
        cta: 'See the schedule',
        proposed: true,
      },
      {
        slug: 'fifty-five-plus',
        name: '55+ Technology Program',
        price: '$199',
        timing: '4 sessions',
        pitch:
          'Practical, patient, and built around what you actually want to do with a computer.',
        bullets: [
          'Small class sizes with one instructor per six people',
          'AI tools for writing, planning, and everyday research',
          'Staying safe: scams, passwords, and privacy',
          'Notes and recordings you keep',
        ],
        cta: 'Reserve a seat',
        proposed: true,
      },
      {
        slug: 'career-transition',
        name: 'Career Transition Program',
        price: 'From $2,400',
        timing: '12 weeks',
        pitch:
          'For people leaving another field. Build a portfolio, learn to work on a team, and get in front of hiring managers.',
        bullets: [
          'Three portfolio projects, one of them collaborative',
          'Working in a real repository with real code review',
          'Interview preparation and technical screen practice',
          'Introductions into the Stackd builder network',
        ],
        cta: 'Book a fit call',
        proposed: true,
      },
      {
        slug: 'self-paced',
        name: 'Self-Paced Courses',
        price: 'From $29',
        timing: 'Instant access',
        pitch:
          'Short, focused courses you can start tonight. Build Your First AI Workflow, Prompt Engineering for Business, and more.',
        bullets: [
          'Lifetime access, work at your own pace',
          'Templates and files included',
          'Credited toward any cohort program',
        ],
        cta: 'Browse the store',
        ctaHref: '/store',
      },
    ],
  },

  // ─── BUILDERS ──────────────────────────────────────────────────────
  {
    slug: 'builders',
    icon: 'code',
    eyebrow: 'Stackd for Builders',
    shortName: 'Builders',
    promise: "Keep building. We'll help when you get stuck.",
    headline: 'A technical support desk for people building software with AI.',
    customer: 'Vibe coders and developers',
    oneLiner: 'Engineering help, on demand, when you hit the wall.',
    entryLine:
      'A builder three days into a bug they cannot name enters here.',
    body: [
      'Nobody here is going to tell you that you are not a real developer. You are building software. That is the job. The fact that you are doing it with an AI pair instead of eight years of computer science is a change in tooling, not a character flaw.',
      'What is true is that there are a few hundred things that break in production and almost none of them are obvious the first time. Row-level security. Race conditions. Environment variables that work locally and vanish on deploy. Migrations that pass in staging and lock a table under load. That is what we are for.',
      'You keep ownership of everything. We are not taking the project over. You send us the thing that is broken, or the decision you are unsure about, and you get a real engineer on it.',
    ],
    capabilities: [
      'Debugging: the bug you have been circling for three days',
      'Code review before you ship it to a customer',
      'Architecture review before you build the wrong thing',
      'Deployment help: builds, environments, domains, CI',
      'Security review: auth, permissions, exposed keys, RLS',
      'Database help: schema design, migrations, query performance',
      'API and third-party integrations that will not cooperate',
      'Performance fixes for the page that takes nine seconds',
      'One-to-one engineering support and technical mentorship',
    ],
    outcome: 'You stay the builder. We handle the wall.',
    theme: 'white',
    accent: '#1A4A7A',
    accentOnDark: '#93C5FD',
    offers: [
      {
        slug: 'unblock',
        name: 'Unblock',
        price: '$97',
        timing: '24-hour turnaround',
        pitch:
          'One specific problem, async. Send us the repo and the symptom, get a diagnosis and a fix.',
        bullets: [
          'One issue, scoped to a single bug or error',
          'Written explanation of the cause, not just the patch',
          'Pull request or a diff you can apply yourself',
          'Answered within one business day',
        ],
        cta: 'Send us the bug',
        proposed: true,
      },
      {
        slug: 'review',
        name: 'Code or Architecture Review',
        price: '$297',
        timing: '3 business days',
        pitch:
          'An engineer reads your codebase and tells you what will hurt later, ranked by how much.',
        bullets: [
          'Full read of the repository, not a linting run',
          'Findings ranked by real severity, with file references',
          'Security, data model, and structure all covered',
          '30-minute call to walk through it',
        ],
        cta: 'Book a review',
        popular: true,
        proposed: true,
      },
      {
        slug: 'session',
        name: '1:1 Engineering Session',
        price: '$150/hr',
        timing: 'Booked within 48 hours',
        pitch:
          'Screen share with an engineer. Bring the problem, leave with it solved and understood.',
        bullets: [
          'Live pairing, your editor, your codebase',
          'Any topic: debugging, architecture, deployment, data',
          'Recording of the session if you want it',
          'Buy single hours or a block of five',
        ],
        cta: 'Book an hour',
        proposed: true,
      },
      {
        slug: 'builder-support',
        name: 'Builder Support',
        price: '$199/mo',
        timing: 'Monthly membership',
        pitch:
          'Standing access to engineers while you build. Cancel any month.',
        bullets: [
          'Unlimited async questions, answered same or next day',
          'Two code reviews per month included',
          'One 60-minute pairing session per month',
          'Private channel, no ticket queue',
        ],
        cta: 'Start a membership',
        proposed: true,
      },
    ],
  },

  // ─── RESCUE ───────────────────────────────────────────────────────────
  {
    slug: 'rescue',
    icon: 'lifebuoy',
    eyebrow: 'Stackd Rescue',
    shortName: 'Rescue',
    promise: "You built it. Now let's make it work.",
    headline: 'Send it to us.',
    customer: 'Founders and builders',
    oneLiner: 'We diagnose, fix, finish, and ship the software you started.',
    entryLine:
      'A founder whose app broke the week before launch enters here.',
    body: [
      'The most common message we get now sounds like this: "I built most of this with AI and it worked, and then it stopped working, and I do not know which part is wrong." That is not a failure. That is what happens when you get far enough to hit real problems.',
      'So send it to us. We take the repository as it is, no judgment about how it was built, and we find out what is actually wrong. Not a vague list of concerns: a specific, ranked account of what is broken, what is dangerous, and what is going to fall over the first time twenty people use it at once.',
      'Then you choose. Take the report and fix it yourself, or hand it to us and we finish it. Plenty of people do the first one, and that is a completely fine outcome.',
    ],
    capabilities: [
      'Code: what is broken, what is fragile, what is unfinishable',
      'Security: auth, permissions, exposed secrets, injection surface',
      'Database: schema, migrations, data integrity, row-level security',
      'APIs: integrations that fail silently or leak',
      'Payments: Stripe flows, webhooks, and the money paths that must not break',
      'Deployment: builds, environments, domains, and why prod differs from local',
      'UI: mobile layout, accessibility, and the states nobody built',
      'Performance: the queries and renders costing you seconds',
      'Architecture: whether the shape can carry what you want next',
    ],
    sequence: ['Diagnose', 'Fix', 'Finish', 'Ship'],
    outcome: 'It works. It is safe. It is yours.',
    theme: 'dark',
    accent: '#F97316',
    accentOnDark: '#FB923C',
    offers: [
      {
        slug: 'diagnostic',
        name: 'App Diagnostic',
        price: '$297',
        timing: '48-hour turnaround',
        pitch:
          'We read the whole thing and tell you exactly what is wrong, ranked. No commitment to have us fix it.',
        bullets: [
          'Full review across all nine areas above',
          'Findings ranked by severity, each with a file reference',
          'An honest read on whether the foundation is worth keeping',
          '30-minute walkthrough call',
        ],
        cta: 'Get the diagnostic',
        popular: true,
        proposed: true,
      },
      {
        slug: 'security-data',
        name: 'Security and Database Review',
        price: '$697',
        timing: '5 business days',
        pitch:
          'The two areas AI-assisted builds get wrong most often, gone through line by line before you take real customers.',
        bullets: [
          'Auth and permission model reviewed end to end',
          'Row-level security policies tested, not just read',
          'Exposed keys, secrets, and public endpoints audited',
          'Schema, indexes, and migration safety reviewed',
        ],
        cta: 'Book the review',
        proposed: true,
      },
      {
        slug: 'fix-sprint',
        name: 'Fix Sprint',
        price: '$1,497',
        timing: '5 business days',
        pitch:
          'One focused week. We fix the ranked list of what is actually breaking and hand it back working.',
        bullets: [
          'Diagnostic fee credited if you already bought one',
          'Fixes delivered as reviewable pull requests',
          'Written notes on every change so you can maintain it',
          '14 days of follow-up support after handoff',
        ],
        cta: 'Start a fix sprint',
        proposed: true,
      },
      {
        slug: 'mvp-rescue',
        name: 'MVP Rescue and Production Readiness',
        price: 'From $4,500',
        timing: '3 to 6 weeks',
        pitch:
          'The build is 70% done and stuck. We finish it, harden it, and put it in front of real users.',
        bullets: [
          'Remaining features scoped, built, and tested',
          'Security, payments, and data hardened for real traffic',
          'Deployment, monitoring, and error reporting set up',
          'Handoff with documentation, or roll into Teams for ongoing work',
        ],
        cta: 'Book a rescue call',
        proposed: true,
      },
    ],
  },

  // ─── BUILD ────────────────────────────────────────────────────────────
  {
    slug: 'build',
    icon: 'rocket',
    eyebrow: 'Stackd Build',
    shortName: 'Build',
    promise: 'Idea to software.',
    headline: 'You describe the outcome. We build the system.',
    customer: 'Startups and businesses',
    oneLiner: 'Custom software and automation, built from scratch.',
    entryLine: 'A founder who needs an MVP enters here.',
    body: [
      'This is the division most people already know us for: you have a business or an idea, and the software you need does not exist to buy. We design it, build it, launch it, and support it.',
      'The work runs from small to large. On the small end, one workflow that is eating your week, built and running in five days. On the large end, a product with accounts, payments, dashboards, and a roadmap. Most engagements start with a paid audit because the fastest way to waste money is to build the wrong thing confidently.',
      'What has changed is that this is now one division rather than the whole company. If you need to be taught, that is Learn. If it already exists and is broken, that is Rescue. If you need capacity rather than a project, that is Teams. Build is for when something needs to exist and does not yet.',
    ],
    capabilities: [
      'Product strategy and scoping before anything gets built',
      'Prototypes you can click through in days',
      'MVPs with accounts, payments, and real data',
      'Internal tools, dashboards, and client portals',
      'Workflow automation across the tools you already pay for',
      'Websites and marketing sites that convert',
      'Private knowledge systems trained on your own documents',
      'Launch, handoff, and ongoing support',
    ],
    sequence: ['Strategy', 'Prototype', 'MVP', 'Launch'],
    outcome: 'Something that runs itself.',
    theme: 'yellow',
    // A dark gold rather than the brand #FFD84D, which is unreadable as text
    // on white, and rather than black, which would be identical to Enterprise.
    accent: '#9C7A10',
    accentOnDark: '#FFD84D',
    offers: [
      {
        slug: 'audit',
        name: 'Systems Audit',
        price: '$397',
        timing: '48-hour turnaround',
        pitch:
          'A written roadmap of the three to five systems worth building in your business, in priority order.',
        bullets: [
          'Async business operations intake form',
          '3 to 5 prioritized systems, each tagged to a tool and workflow',
          'Written roadmap delivered within 48 hours',
          '30-minute walkthrough call',
        ],
        cta: 'Book the audit',
      },
      {
        slug: 'build-sprint',
        name: 'Build Sprint',
        price: '$997',
        timing: '5 business days',
        pitch:
          'One workflow, scoped tight, built and handed off with a training call. Running by Monday.',
        bullets: [
          'One complete workflow build of your choosing',
          'Custom logic and automation, 10 to 15 building blocks',
          '1-hour orientation and training call',
          '7 days of post-delivery email support',
        ],
        cta: 'Get started',
        popular: true,
      },
      {
        slug: 'website-build',
        name: 'Website Build',
        price: '$1,800 to $3,000',
        timing: '1 to 3 weeks',
        pitch:
          'A landing page that converts, or a full site with a private admin portal behind it.',
        bullets: [
          'Landing page from $1,800',
          'Full site plus admin portal up to $3,000',
          'Custom design and copy, mobile-first, SEO basics',
          'Portal adds auth, database, bookings and orders',
        ],
        cta: 'Start a website',
      },
      {
        slug: 'business-brain',
        name: 'Business Brain',
        price: 'From $500 + $149/mo',
        timing: '2-week build',
        pitch:
          'A private knowledge system trained on your SOPs, handbooks and FAQs. Your team just asks it.',
        bullets: [
          'Starter: $500 setup plus $149/mo',
          'Pro: $1,500 setup plus $349/mo for multiple departments',
          'Trained only on your documents, never on anyone else',
          'Monthly maintenance and re-training included',
        ],
        cta: 'See Business Brain',
        ctaHref: '/business-brain',
      },
      {
        slug: 'mvp-build',
        name: 'MVP Build',
        price: 'From $8,000',
        timing: '6 to 12 weeks',
        pitch:
          'Idea to a product real customers can pay for. Accounts, payments, data, and a launch.',
        bullets: [
          'Product strategy and a clickable prototype first',
          'Accounts, permissions, payments, and admin tooling',
          'Built on a stack you can hire for and own outright',
          'Launch support, then optional ongoing engineering',
        ],
        cta: 'Book a build call',
        proposed: true,
      },
    ],
  },

  // ─── TEAMS ────────────────────────────────────────────────────────────
  {
    slug: 'teams',
    icon: 'users',
    eyebrow: 'Stackd Teams',
    shortName: 'Teams',
    promise: 'Add engineering capacity.',
    headline: 'Engineering capacity without building another department.',
    customer: 'Growing companies',
    oneLiner: 'Fractional and embedded engineers who work like your team.',
    entryLine:
      'A startup with two engineers that desperately needs four enters here.',
    body: [
      'This is not staffing and it is not a development agency. You are not filing a project brief and waiting six weeks for a demo, and you are not interviewing contractors. You get engineers who show up in your repository, your standup, and your ticket queue, at whatever size you actually need.',
      'The math that drives this is simple. Hiring a senior engineer is a nine-month commitment before they are productive and a permanent line on your payroll. Plenty of companies need twelve hours a month, or they need a front-end person for one quarter, or they need someone who can own deployments so the founder stops doing it at midnight.',
      'Start small. Most companies begin with fractional hours against a specific backlog, and scale up when it is obvious the work is there.',
    ],
    capabilities: [
      'Fractional engineering: a set number of hours each month',
      'Fractional technical team: the roles you need, only when you need them',
      'Embedded engineers working alongside your internal team',
      'Feature development against your existing roadmap',
      'Bug and backlog burn-down',
      'Integrations and API work',
      'AI features built into your existing product',
      'Technical debt paid down deliberately',
      'Team training so your own people can run it',
    ],
    outcome: 'Your roadmap moves. No new headcount.',
    theme: 'white',
    accent: '#7C5CD6',
    accentOnDark: '#C4B5FD',
    offers: [
      {
        slug: 'fractional-engineering',
        name: 'Fractional Engineering',
        price: 'From $2,400/mo',
        timing: '10 to 20 hours per month',
        pitch:
          'A standing block of senior engineering hours against whatever is at the top of your list.',
        bullets: [
          '10 to 20 hours per month, in your repository',
          'One named engineer, not a rotating pool',
          'Async by default, in your Slack and your tickets',
          'Month to month, scale up or down with 30 days notice',
        ],
        cta: 'Talk about capacity',
        proposed: true,
      },
      {
        slug: 'fractional-team',
        name: 'Fractional Technical Team',
        price: 'From $6,500/mo',
        timing: 'Monthly',
        pitch:
          'Instead of hiring a CTO, a senior engineer, a front-end dev and QA, you get the capability as needed.',
        bullets: [
          'Technical leadership plus build capacity in one agreement',
          'Front end, back end, and QA drawn on as the work requires',
          'Architecture decisions documented, not held in one head',
          'Roughly 60 to 100 hours per month across roles',
        ],
        cta: 'Scope a team',
        popular: true,
        proposed: true,
      },
      {
        slug: 'embedded-engineering',
        name: 'Embedded Engineering',
        price: 'From $9,000/mo',
        timing: 'Quarterly commitment',
        pitch:
          'Our engineers work inside your team, reporting to your product manager, on your board.',
        bullets: [
          'One to three engineers embedded with your internal team',
          'Your standup, your sprints, your definition of done',
          'Full-time equivalent coverage without full-time hiring',
          'Quarterly commitment, renewed by results',
        ],
        cta: 'Book an intro call',
        proposed: true,
      },
      {
        slug: 'team-enablement',
        name: 'Team Enablement',
        price: 'From $2,500',
        timing: 'Scheduled within 2 weeks',
        pitch:
          'Live training that gets your existing team building with AI inside their real workflows.',
        bullets: [
          'Standard from $2,500 for teams up to 10',
          'Enterprise from $5,000 for larger teams and full-day formats',
          'Pre-session intake so the content is your tools and your work',
          'Custom templates, prompt library, and the full recording',
        ],
        cta: 'See enablement pricing',
        ctaHref: '/pricing#teams',
      },
      {
        slug: 'operating-partner',
        name: 'Operating Partner',
        price: '$1,500/mo',
        timing: 'Monthly',
        pitch:
          'A new build every month, plus tune-ups, a strategy call, and priority support.',
        bullets: [
          '1 new workflow or tool built per month',
          '5 to 10 system tune-ups per month',
          'Monthly strategy call',
          'Priority async support',
        ],
        cta: 'Apply for Operating Partner',
      },
    ],
  },

  // ─── ENTERPRISE ───────────────────────────────────────────────────────
  {
    slug: 'enterprise',
    icon: 'buildings',
    eyebrow: 'Stackd Enterprise',
    shortName: 'Enterprise',
    promise: 'Solve software capacity problems.',
    headline: 'You have 37 internal projects. Your team can reach 25 of them.',
    customer: 'Larger organizations',
    oneLiner: 'Supplemental technical capacity at organizational scale.',
    entryLine:
      'A corporation with a software backlog enters here.',
    body: [
      'Enterprise conversations almost never start with "build us an app." They start with a number. There are more internal software projects than the engineering organization can reach, the backlog is a year deep, and the projects that keep getting deferred are the unglamorous ones that would save the most time.',
      'We become supplemental capacity against that backlog. Not a vendor you brief once a quarter: a technical group that takes the projects your team cannot get to, works to your standards and your security review, and returns them documented and owned by you.',
      'Everything runs through your procurement, your compliance requirements, and your existing tooling. We work under BAA and FedRAMP-aligned providers where contracts require it, and on-premise deployment is available.',
    ],
    capabilities: [
      'Application modernization and legacy upgrades',
      'AI implementation inside existing systems',
      'Internal tools nobody has had time to build',
      'Automation of high-volume manual processes',
      'Technical debt reduction on a planned schedule',
      'QA and testing capacity',
      'Prototype and proof-of-concept development',
      'Integration work across internal systems',
      'Engineering augmentation by the quarter',
    ],
    outcome: 'The backlog gets shorter.',
    theme: 'dark',
    accent: '#0C0C0C',
    accentOnDark: '#FFD84D',
    offers: [
      {
        slug: 'capacity-assessment',
        name: 'Capacity Assessment',
        price: 'From $5,000',
        timing: '2 to 3 weeks',
        pitch:
          'We inventory the backlog, size each project honestly, and tell you which ones we can take off your plate.',
        bullets: [
          'Structured review of deferred and stalled projects',
          'Effort, risk, and dependency sizing on each',
          'A ranked plan of what to outsource and what to keep',
          'Executive readout and a written engagement proposal',
        ],
        cta: 'Request an assessment',
        proposed: true,
      },
      {
        slug: 'engineering-augmentation',
        name: 'Engineering Augmentation',
        price: 'From $18,000/mo',
        timing: 'Quarterly or annual',
        pitch:
          'A dedicated pod working your backlog under your standards, security review, and reporting cadence.',
        bullets: [
          'Dedicated engineers with named leads',
          'Works within your SDLC, review, and compliance process',
          'Monthly reporting against agreed delivery targets',
          'Scales by quarter as the backlog changes',
        ],
        cta: 'Talk to us',
        popular: true,
        proposed: true,
      },
      {
        slug: 'modernization',
        name: 'Application Modernization',
        price: 'Custom scope',
        timing: '3 to 9 months',
        pitch:
          'Legacy systems moved onto a stack your team can hire for, without a rewrite-everything gamble.',
        bullets: [
          'Incremental migration, never a single cutover',
          'Feature parity verified before anything is retired',
          'Documentation and internal handoff built into the schedule',
          'Fixed-scope phases with defined exit criteria',
        ],
        cta: 'Scope a modernization',
      },
      {
        slug: 'enterprise-enablement',
        name: 'Enterprise Enablement',
        price: 'From $5,000',
        timing: 'Scheduled within 3 weeks',
        pitch:
          'Multi-department AI and development training with role-specific libraries and follow-up coaching.',
        bullets: [
          'Half-day or split-session format',
          'Role-specific prompt and workflow library per department',
          '30-day async coaching follow-up',
          'On-site available on request',
        ],
        cta: 'See enablement pricing',
        ctaHref: '/pricing#enterprise',
      },
    ],
  },
]

// ─── Lookups ─────────────────────────────────────────────────────────────────

export const DIVISION_BY_SLUG: Record<DivisionSlug, Division> = DIVISIONS.reduce(
  (acc, d) => {
    acc[d.slug] = d
    return acc
  },
  {} as Record<DivisionSlug, Division>,
)

export function getDivision(slug: DivisionSlug): Division {
  return DIVISION_BY_SLUG[slug]
}

/** Every offer across every division, flattened. Used by /pricing. */
export function allOffers(): Array<DivisionOffer & { division: Division }> {
  return DIVISIONS.flatMap((division) =>
    division.offers.map((offer) => ({ ...offer, division })),
  )
}

/** Placeholder prices awaiting confirmation. See docs/PROPOSED-PRICES.md */
export function proposedOffers(): Array<DivisionOffer & { division: Division }> {
  return allOffers().filter((o) => o.proposed)
}

// ─── Brand-level copy ────────────────────────────────────────────────────────

export const BRAND = {
  positioning: 'We help people build software, and companies ship it.',
  supporting: 'Learn it. Build it. Fix it. Scale it.',
  tagline: 'Build better with technology.',
  /** The three-line explanation of where AI sits. */
  aiStance: [
    { label: 'AI', is: 'how Stackd works.' },
    { label: 'Software', is: 'what Stackd does.' },
    { label: 'People and companies', is: 'who Stackd serves.' },
  ],
} as const

/** The flywheel, as ordered steps. Rendered by components/Flywheel.tsx */
export const FLYWHEEL: Array<{
  label: string
  detail: string
  division?: DivisionSlug
}> = [
  { label: 'Train new builders', detail: 'People learn to build here.', division: 'learn' },
  { label: 'They become builders', detail: 'They ship things that mostly work.' },
  { label: 'They get jobs and build apps', detail: 'Two paths, one outcome: real software in the world.' },
  { label: 'They need support', detail: 'Everything real breaks eventually.', division: 'builders' },
  { label: 'We rescue and finish it', detail: 'Diagnose, fix, finish, ship.', division: 'rescue' },
  { label: 'They become better builders', detail: 'Every rescue teaches the person who built it.' },
  { label: 'They become Stackd talent', detail: 'The best of them work on client engagements.' },
  { label: 'They staff client teams', detail: 'Capacity for companies that need it.', division: 'teams' },
  { label: 'That opens enterprise work', detail: 'Which funds training the next group.', division: 'enterprise' },
]
