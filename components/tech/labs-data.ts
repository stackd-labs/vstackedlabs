// Stackd Labs content, shared by the /labs page and the site assistant's knowledge base.
// Plain module (no 'use client') so server code can import it.
// Featured products: Business Brain and Stackd Interactive. In-development projects are listed by
// NAME ONLY (Chanel, 2026-10-07). Never list client work or internal tools (Stackd Dash, Command
// Center, team-tracker, the outreach system).

export interface LabsProduct {
  id: string
  name: string
  kind: string
  status: string
  pitch: string
  body: string
  stepsLabel: string
  steps: { label: string; body: string }[]
  tagsLabel: string
  tags: string[]
  cta: string
  interest: string
}

export const PRODUCTS: LabsProduct[] = [
  {
    id: 'business-brain',
    name: 'Business Brain',
    kind: 'AI knowledge system',
    status: 'Live',
    pitch: 'Your staff. Smarter. Around the clock.',
    body: 'We collect your operational docs and build a private knowledge system your team can ask anything, any time. No installs, no logins, no training.',
    stepsLabel: 'How it works',
    steps: [
      { label: 'Collect', body: 'Handbooks, SOPs, menus, forms, vendor contacts and training guides.' },
      { label: 'Build', body: 'A private knowledge system trained only on your business.' },
      { label: 'Deploy', body: 'Your team gets one simple chat link.' },
      { label: 'Maintain', body: 'We review and update it monthly as your business changes.' },
    ],
    tagsLabel: 'Built for',
    tags: ['Restaurants', 'Gyms', 'Salons and spas', 'Retail', 'Hotels', 'Medical and dental offices'],
    cta: 'Ask about Business Brain',
    interest: 'Business Brain',
  },
  {
    id: 'stackd-interactive',
    name: 'Stackd Interactive',
    kind: 'Games and interactive studio',
    status: 'Live',
    pitch: 'From idea to playable prototype, fast.',
    body: 'We build Roblox games, browser games, branded mini-games, educational games, simulations and interactive digital products. AI coding agents do the heavy lifting; people do the creative direction and the testing.',
    stepsLabel: 'How we build',
    steps: [
      { label: 'Direct', body: 'Human creative direction sets the idea, the feel and the loop.' },
      { label: 'Build', body: 'AI coding agents turn the plan into a playable build quickly.' },
      { label: 'Test', body: 'Real play-testing and rapid iteration, every round.' },
      { label: 'Ship', body: 'Studio-owned games, or projects built for a client or brand.' },
    ],
    tagsLabel: 'What we make',
    tags: ['Roblox games', 'Cozy games', 'Simulators', 'Browser mini-games', 'Brand and event games', 'Educational games', 'Game assets'],
    cta: 'Talk about a game',
    interest: 'Stackd Interactive (a game or interactive project)',
  },
]

export const IN_DEV: { group: string; items: { name: string; kind: string }[] }[] = [
  {
    group: 'Games',
    items: [
      { name: 'Paws & Care', kind: 'Vet clinic management sim' },
      { name: 'Cruise Ship Manager', kind: 'Cruise line management sim' },
      { name: 'Apartment Idle', kind: 'Cozy property management game' },
      { name: 'Train Run!', kind: 'Roblox endless runner' },
      { name: 'Table Ready', kind: 'Roblox restaurant host game' },
      { name: 'Speed Escape', kind: 'Roblox speed escape game' },
    ],
  },
  {
    group: 'Apps and SaaS',
    items: [
      { name: 'RinkSync', kind: 'Studio software for skating coaches' },
      { name: 'TeamChat', kind: 'Team messaging app' },
      { name: 'Memo', kind: 'Conversational money tracker' },
      { name: 'FlowCore', kind: 'Client operations for small businesses' },
      { name: 'Socio', kind: 'Creator and brand collaboration platform' },
      { name: 'ViceGrid', kind: 'Gaming companion platform' },
    ],
  },
  {
    group: 'Ecosystem and AI',
    items: [
      { name: 'Build Hub', kind: 'Builder reputation platform' },
      { name: 'Stackd Marketplace', kind: 'Work marketplace for gigs, projects and jobs' },
      { name: 'Stackd Content Engine', kind: 'AI video and content pipeline' },
    ],
  },
]

export const STAGES = ['Idea', 'Research', 'Validating', 'Prototype', 'MVP', 'Beta', 'Live']
