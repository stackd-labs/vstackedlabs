// Open roles for /careers, rewritten 2026-10-08 to fit the Build it. Fix it. Scale it. site
// (Chanel approved the 10-role lineup plus Creator and Outreach Partner). Each role names the
// division it serves. Edit roles here and the page follows.

export type RoleType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance'
export type RoleTrack = 'Engineering' | 'Design' | 'Product' | 'Operations' | 'Growth' | 'Education'

export interface Role {
  id: string
  title: string
  type: RoleType
  location: string
  track: RoleTrack
  /** The Stackd divisions this role works in, shown as tags. */
  divisions: string[]
  summary: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
}

export const ROLES: Role[] = [
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Engineer',
    type: 'Contract',
    location: 'Remote, United States',
    track: 'Engineering',
    divisions: ['Stackd Build', 'Stackd Rescue'],
    summary:
      'You build and ship client software from first commit to launch, and you jump into rescues when an existing app needs real engineering. Our standard stack is Next.js, TypeScript, Supabase, Tailwind and Stripe.',
    responsibilities: [
      'Build MVPs, web apps and internal tools from design to deployment',
      'Design Supabase schemas, row-level security, server actions and APIs',
      'Integrate AI features (Claude, OpenAI) into production apps',
      'Pick up rescue work: refactor, stabilize and finish apps other people started',
      'Scope and estimate your own work with the project lead',
    ],
    requirements: [
      '3+ years building with React or Next.js and TypeScript',
      'Hands-on experience with Postgres, ideally Supabase',
      'A solid grasp of authentication, RLS and data security',
      'Comfort reading and fixing code you did not write',
      'Clear written communication with clients and teammates',
    ],
    nice: [
      'Stripe payments and webhooks in production',
      'Experience with AI coding tools, and knowing where they go wrong',
      'Vercel deployments, environments and edge functions',
      'Agency or studio experience across several projects at once',
    ],
  },
  {
    id: 'rescue-engineer',
    title: 'Rescue Engineer',
    type: 'Contract',
    location: 'Remote, United States',
    track: 'Engineering',
    divisions: ['Stackd Rescue'],
    summary:
      'Apps built fast with AI tools, or abandoned halfway, land with us broken. You are the person who opens the repo, finds what is actually wrong, and makes it secure, stable and shippable again.',
    responsibilities: [
      'Audit apps we have never seen: code, database, auth, payments, hosting and costs',
      'Write clear findings with severity ratings and a fix plan the client can follow',
      'Fix security holes, exposed keys, broken RLS, failed deploys and webhook bugs',
      'Cut runaway hosting and API costs',
      'Leave every rescued app documented and easier for the next person',
    ],
    requirements: [
      'Strong debugging skills in JavaScript or TypeScript codebases',
      'Experience with Supabase or Firebase, and with Stripe',
      'Working knowledge of web security basics and secrets management',
      'Calm under pressure when a client app is down',
      'Able to explain a technical problem in plain language',
    ],
    nice: [
      'Experience cleaning up code from Lovable, Bolt, Replit, Cursor or similar tools',
      'Performance tuning: slow queries, bundle size, caching',
      'CI/CD and environment setup on Vercel or Netlify',
      'A background in QA or incident response',
    ],
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer, Agents and Automation',
    type: 'Freelance',
    location: 'Remote, United States',
    track: 'Engineering',
    divisions: ['Stackd Build', 'Stackd Labs'],
    summary:
      'Clients come to us for AI tools that actually work in their business: assistants, agents, knowledge systems and automations. You design and build them so they are reliable, safe and maintainable, with a person approving the decisions that matter.',
    responsibilities: [
      'Build AI assistants, agents and knowledge systems with Claude and OpenAI',
      'Design workflows and automations with n8n, Zapier, Make or custom code',
      'Write and test prompts, tools and guardrails for consistent output',
      'Connect AI features to client databases, CRMs and APIs',
      'Document how each system works for client handoff',
    ],
    requirements: [
      'Production experience with LLM APIs, not just chat interfaces',
      'Comfort writing code (TypeScript or Python) around model calls',
      'Understanding of retrieval, tool use and evaluation basics',
      'A careful approach to data privacy and model limits',
      'Clear writing: clients rely on your docs',
    ],
    nice: [
      'Experience with Claude tool use, MCP or agent frameworks',
      'Vector databases or pgvector',
      'Background in operations or business process design',
      'Experience building AI tools for small businesses',
    ],
  },
  {
    id: 'qa-engineer',
    title: 'QA and Test Engineer',
    type: 'Contract',
    location: 'Remote, United States',
    track: 'Engineering',
    divisions: ['Stackd Build', 'Stackd Rescue'],
    summary:
      'Every build and every rescue passes through QA before a client sees it. You test like a real user and like an attacker, find what breaks, and make sure it stays fixed.',
    responsibilities: [
      'Test new builds and rescued apps across browsers and devices',
      'Write clear, reproducible bug reports and verify fixes',
      'Check auth flows, payments, forms and permissions end to end',
      'Build automated tests where they pay off',
      'Sign off releases before they reach clients',
    ],
    requirements: [
      'Experience testing web applications professionally',
      'A sharp eye for edge cases and broken states',
      'Comfort with browser dev tools and reading network requests',
      'Clear, concise written communication',
      'Organized: you track many issues across several projects',
    ],
    nice: [
      'Playwright, Cypress or similar test automation',
      'Accessibility testing experience',
      'Mobile app testing (iOS and Android)',
      'Basic security testing knowledge',
    ],
  },
  {
    id: 'game-developer',
    title: 'Game Developer',
    type: 'Freelance',
    location: 'Remote, United States',
    track: 'Engineering',
    divisions: ['Stackd Labs'],
    summary:
      'Stackd Interactive builds Roblox games, browser games and management sims, for clients and for our own Labs titles. You turn designs into playable builds quickly and help them get fun through testing.',
    responsibilities: [
      'Build gameplay systems, UI and progression for Labs and client games',
      'Prototype fast, then iterate based on play-testing',
      'Work alongside AI coding tools with real creative direction',
      'Keep projects organized so the team can pick them up',
      'Help ship updates and fix live issues',
    ],
    requirements: [
      'Shipped or playable work in at least one of: Roblox (Luau), Phaser or Unity',
      'Strong programming fundamentals',
      'A feel for game loops, pacing and player feedback',
      'Comfort working from a design doc and asking good questions',
      'A portfolio or playable builds we can try',
    ],
    nice: [
      'Rojo and Roblox Studio workflows',
      'Management sim or idle game experience',
      'Steam release experience',
      'Game UI or technical art skills',
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Freelance',
    location: 'Remote, United States',
    track: 'Design',
    divisions: ['Stackd Build', 'Stackd Labs'],
    summary:
      'You design the apps we build for clients, the products we build for ourselves, and the Stackd brand. Our style is clean, structured and modern, never a generic template.',
    responsibilities: [
      'Design web apps, dashboards, client portals and marketing sites',
      'Maintain and extend the Stackd design system',
      'Produce Figma files ready for direct developer handoff',
      'Design interfaces for Labs products and games',
      'Review built screens and flag where they drift from the design',
    ],
    requirements: [
      'Strong Figma skills: components, auto-layout, variables',
      'A portfolio of production-quality app UI, not only marketing pages',
      'Understanding of responsive, mobile-first layouts',
      'Ability to work inside an existing design system and extend it',
      'Comfort explaining design decisions to clients',
    ],
    nice: [
      'Motion design (Framer, After Effects)',
      'Familiarity with Tailwind CSS',
      'Game UI experience',
      'Brand identity and typography skills',
    ],
  },
  {
    id: 'product-strategist',
    title: 'Product Strategist',
    type: 'Contract',
    location: 'Remote, United States',
    track: 'Product',
    divisions: ['Stackd Build', 'Stackd Labs'],
    summary:
      'Before we build, someone has to make sure it is the right thing to build. You run discovery with clients, scope projects so they are priced fairly, and help decide which Labs ideas earn their next stage.',
    responsibilities: [
      'Run discovery calls and turn them into clear project scopes',
      'Write roadmaps, requirements and acceptance criteria',
      'Research markets and competitors for Labs product ideas',
      'Help set what a project needs, and what it does not',
      'Work with engineering on estimates and trade-offs',
    ],
    requirements: [
      '3+ years in product management, consulting or strategy',
      'Experience working with founders or small businesses',
      'Strong writing: you produce documents people act on',
      'Comfort facilitating fast working sessions',
      'Able to turn messy input into clear decisions',
    ],
    nice: [
      'Lean startup or jobs-to-be-done frameworks',
      'Background in SaaS, marketplaces or games',
      'Comfort with AI-assisted research tools',
      'Experience pricing or estimating software projects',
    ],
  },
  {
    id: 'project-client-success-manager',
    title: 'Project and Client Success Manager',
    type: 'Part-time',
    location: 'Remote, United States',
    track: 'Operations',
    divisions: ['Stackd Build', 'Stackd Rescue'],
    summary:
      'You keep builds and rescues moving from kickoff to delivery, and you are the client\'s main point of contact. Nothing slips, and every client always knows where their project stands.',
    responsibilities: [
      'Run projects through each stage, from discovery to delivery',
      'Onboard clients and set clear expectations from day one',
      'Coordinate engineers, designers and QA across several projects',
      'Send status updates before anyone has to ask',
      'Handle post-launch support and spot chances for ongoing work',
    ],
    requirements: [
      '2+ years in project management, client success or account management',
      'Exceptional written communication: clear, warm and professional',
      'Strong organization and follow-through',
      'Comfort managing several projects at different stages',
      'Enough technical understanding to translate between clients and engineers',
    ],
    nice: [
      'Experience at a software studio or agency',
      'Linear, Notion or Asana experience',
      'Understanding of web development timelines',
      'Experience running remote teams',
    ],
  },
  {
    id: 'builder-instructor',
    title: 'Builder Instructor',
    type: 'Part-time',
    location: 'Remote, United States',
    track: 'Education',
    divisions: ['Stackd Learn'],
    summary:
      'Stackd Learn teaches people to build real software with AI and modern tools, from teens to career changers. You lead live sessions, review student code, and help learners finish projects they can show.',
    responsibilities: [
      'Teach live build sessions for Stackd Learn cohorts',
      'Review student code and give clear, encouraging feedback',
      'Help learners get unstuck on real projects',
      'Contribute lessons, exercises and assessments',
      'Help verify the skills learners earn for their talent profile',
    ],
    requirements: [
      'Real experience building and shipping web apps',
      'Patience and clarity when explaining technical ideas',
      'Teaching, mentoring or tutoring experience',
      'Comfort with AI-assisted development and its pitfalls',
      'Reliable availability for scheduled sessions',
    ],
    nice: [
      'Experience teaching teens or adult career changers',
      'Bootcamp or classroom background',
      'Content creation or curriculum design',
      'Experience with Next.js and Supabase',
    ],
  },
  {
    id: 'content-social-lead',
    title: 'Content and Social Lead',
    type: 'Part-time',
    location: 'Remote, United States',
    track: 'Growth',
    divisions: ['All divisions'],
    summary:
      'We build in public, rescue apps people thought were lost, and ship our own products. You turn that work into content that educates and grows an audience across LinkedIn, TikTok, Instagram and X.',
    responsibilities: [
      'Own the content calendar across social platforms',
      'Turn builds, rescues, Labs launches and wins into posts and short video',
      'Write educational content about building software with AI',
      'Grow followers and engagement, and build community',
      'Write and send the Stackd newsletter',
    ],
    requirements: [
      'A record of growing accounts in tech, AI or business',
      'Strong writing: educational, not salesy',
      'Short-form video skills (scripting, filming or editing)',
      'Self-directed and consistent',
      'Ability to translate technical work into plain language',
    ],
    nice: [
      'CapCut, Premiere or similar editing tools',
      'Email marketing experience',
      'An existing audience in tech or AI',
      'Design skills in Canva or Figma',
    ],
  },
  {
    id: 'creator-outreach-partner',
    title: 'Creator and Outreach Partner',
    type: 'Freelance',
    location: 'Remote',
    track: 'Growth',
    divisions: ['All divisions'],
    summary:
      'We are building a network of creators and community leaders who care about building software well. You find, reach out to and onboard partners who can grow our reach, from podcasters to newsletter writers.',
    responsibilities: [
      'Research creators, podcasts and newsletters aligned with our audience',
      'Write personal outreach to potential partners',
      'Manage relationships with active affiliates and creators',
      'Coordinate collaborations and sponsored content',
      'Track referral results and report back to partners',
    ],
    requirements: [
      'Experience in partnerships, influencer marketing or creator outreach',
      'Excellent writing: you sound like a person, not a template',
      'Organized enough to track many conversations at once',
      'Understanding of what motivates creators',
      'Comfortable negotiating terms',
    ],
    nice: [
      'Relationships in the AI, SaaS or creator world',
      'Affiliate platform experience (Impact, PartnerStack)',
      'B2B marketing background',
      'CRM experience (Notion, HubSpot, Airtable)',
    ],
  },
]

export const VALUES = [
  {
    title: 'Small team. Big output.',
    body: 'No layers of management. Everyone here ships, and you get real ownership over the work you touch.',
  },
  {
    title: 'Automation-native by default.',
    body: 'We use Claude, automation and modern tooling in our own workflows. We build the way we tell clients to: systems first.',
  },
  {
    title: 'Craft is non-negotiable.',
    body: 'We move fast because we are disciplined, not because we cut corners. Quality is built into the process.',
  },
]

export const AFFILIATE_FIT = [
  'Content creators',
  'TikTok and Reels creators',
  'LinkedIn voices',
  'YouTube educators',
  'Podcast hosts',
  'Newsletter writers',
  'Business coaches',
  'Marketing consultants',
  'Community builders',
  'AI enthusiasts',
  'Agency owners',
  'Startup advisors',
]
