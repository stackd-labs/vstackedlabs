// Homepage copy for the dark-tech rebuild. Mockup stage: once the direction is approved,
// the division entries move into lib/divisions.ts (the site's single source of truth).

/** The three-part tagline. Change the third verb here and every page, tile and title follows. */
export const TAGLINE = ['Build it.', 'Fix it.', 'Scale it.'] as const
export const TAGLINE_TEXT = TAGLINE.join(' ')

/** The ONE Discord invite. Footer, Community section, search and JSON-LD all read this. */
export const DISCORD_URL = 'https://discord.gg/3CYtcjavfd'

/**
 * Free "Before You Launch" checklist. The PDF lives in private/ and is only served by
 * /api/launch-guide after the signup form (cookie) or from the thank-you email link.
 */
export const LAUNCH_GUIDE_DOWNLOAD = '/api/launch-guide'
export const LAUNCH_GUIDE_ANCHOR = 'launch-guide'

/** Shown next to the signup checkbox and stored with each signup, so we know what they agreed to. */
export const GUIDE_CONSENT_TEXT =
  'I agree to share my name and email with Stackd Studios AI. Stackd may send me occasional updates and offers. No spam, and I can unsubscribe any time.'

export const COMMUNITY_ROWS = [
  { name: 'Help desk', note: 'Post a question, get answers from people who’ve hit the same wall.' },
  { name: 'Live sessions', note: 'Weekly build sessions where you can ask questions live.' },
  { name: 'Show your work', note: 'Share what you’re building and get real feedback.' },
  { name: 'Resources', note: 'Prompts, templates, and tutorials the community actually uses.' },
] as const

export type Verb = 'BUILD' | 'FIX' | 'SCALE'

export interface TechDivision {
  id: string
  name: string
  verb: Verb
  tagline: string
  covers: string[]
  status: string
  live: boolean
}

export const TECH_DIVISIONS: TechDivision[] = [
  {
    id: 'build',
    name: 'Stackd Build',
    verb: 'BUILD',
    tagline: 'Client software, from first MVP to fractional team.',
    covers: ['MVPs', 'Web and mobile apps', 'AI tools and agents', 'Automations', 'SaaS', 'Fractional teams'],
    status: 'Accepting projects',
    live: true,
  },
  {
    id: 'rescue',
    name: 'Stackd Rescue',
    verb: 'FIX',
    tagline: 'Broken, abandoned or AI-generated apps made shippable.',
    covers: ['Vibe-coded apps', 'Security', 'Database', 'Auth and payments', 'Deploys', 'Cost and performance'],
    status: 'Intake open',
    live: true,
  },
  {
    id: 'talent',
    name: 'Stackd Talent',
    verb: 'SCALE',
    tagline: 'A network of builders with verified skills, not just resumes.',
    covers: ['Contractors', 'Freelancers', 'Specialists', 'Apprentices', 'Interns', 'Partners'],
    status: 'Applications open',
    live: true,
  },
  {
    id: 'jobs',
    name: 'Stackd Jobs',
    verb: 'SCALE',
    tagline: 'Real work from clients, Stackd and our partners.',
    covers: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Micro-gigs'],
    status: 'Board in development',
    live: false,
  },
  {
    id: 'learn',
    name: 'Stackd Learn',
    verb: 'SCALE',
    tagline: 'Training that ends in verified skills on your profile.',
    covers: ['Beginners', 'Developers', 'AI builders', 'Vibe coders', 'Career changers', 'Teens to seniors'],
    status: 'Cohorts forming',
    live: true,
  },
  {
    id: 'labs',
    name: 'Stackd Labs',
    verb: 'BUILD',
    tagline: 'Products we own and incubate, kept apart from client work.',
    covers: ['SaaS', 'AI tools', 'Games', 'Experiments'],
    status: 'Shipping',
    live: true,
  },
]

export interface Door {
  id: string
  command: string
  label: string
  routesTo: string
  summary: string
  steps: string[]
  cta: string
}

export const DOORS: Door[] = [
  {
    id: 'build',
    command: 'stackd build --new',
    label: 'I have something to build',
    routesTo: 'Stackd Build',
    summary: 'An app, an MVP, an AI tool or an automation that does not exist yet.',
    steps: ['Tell us what you want built', 'We scope it with you on a 15-minute call', 'We build, test and hand it over'],
    cta: 'Start a build',
  },
  {
    id: 'rescue',
    command: 'stackd rescue --app <url>',
    label: 'My app is broken',
    routesTo: 'Stackd Rescue',
    summary: 'Bugs, failed deploys, security holes, runaway costs, or a project someone walked away from.',
    steps: ['Send us the app, repo and stack', 'We audit it and rate every finding', 'You get a rescue plan and a quote'],
    cta: 'Request a rescue',
  },
  {
    id: 'talent',
    command: 'stackd talent --apply',
    label: 'I want to work with Stackd',
    routesTo: 'Stackd Talent + Jobs',
    summary: 'Contract, freelance, part-time or full-time work for builders, designers and specialists.',
    steps: ['Apply with your skills and your work', 'We verify what you can actually do', 'We match you to real projects'],
    cta: 'Apply to the network',
  },
  {
    id: 'hire',
    command: 'stackd talent --hire',
    label: 'I need technical people',
    routesTo: 'Stackd Talent',
    summary: 'Verified builders for a project, a sprint or an ongoing seat on your team.',
    steps: ['Tell us the role and the skills', 'We shortlist people with verified skills', 'You approve every match'],
    cta: 'Find talent',
  },
  {
    id: 'learn',
    command: 'stackd learn --start',
    label: 'I want to learn to build',
    routesTo: 'Stackd Learn',
    summary: 'For beginners, developers, vibe coders, career changers, teens, adults and seniors.',
    steps: ['Pick a program', 'Build real projects as you go', 'Finish with skills we have verified'],
    cta: 'Join a cohort',
  },
  {
    id: 'labs',
    command: 'stackd labs --ls',
    label: 'Show me what you make',
    routesTo: 'Stackd Labs',
    summary: 'The software, AI tools and games we build and run ourselves.',
    steps: ['Browse what we are shipping', 'Try a live demo', 'Join a waitlist or buy'],
    cta: 'See Labs',
  },
]

export const STACK = [
  'Next.js', 'React', 'TypeScript', 'Supabase', 'Postgres', 'Stripe', 'Vercel', 'Tailwind',
  'Claude', 'OpenAI', 'Node', 'Unity', 'Roblox', 'Phaser', 'Resend', 'GitHub',
]

/** What a Stackd Rescue audit checks. Shown as the diagnostics panel. */
export const RESCUE_CHECKS = [
  { area: 'Security', detail: 'Exposed keys, open tables, missing row-level security' },
  { area: 'Database', detail: 'Schema, indexes, migrations, data integrity' },
  { area: 'Auth', detail: 'Sign-in flows, sessions, roles and permissions' },
  { area: 'Payments', detail: 'Checkout, webhooks, refunds, failed charges' },
  { area: 'APIs', detail: 'Error handling, rate limits, retries, timeouts' },
  { area: 'Deploys', detail: 'Builds, environments, secrets, rollbacks' },
  { area: 'Performance', detail: 'Page speed, slow queries, bundle size' },
  { area: 'Cost', detail: 'Hosting, API and model spend that grew quietly' },
]

/** The ecosystem loop, in order. */
export const PIPELINE = [
  { id: 'learn', name: 'Learn', note: 'People train on real projects' },
  { id: 'talent', name: 'Talent', note: 'Skills get verified, not claimed' },
  { id: 'jobs', name: 'Jobs', note: 'Verified people meet real work' },
  { id: 'work', name: 'Build + Rescue', note: 'Client software gets built and fixed' },
  { id: 'labs', name: 'Labs', note: 'What we learn becomes our own products' },
]
