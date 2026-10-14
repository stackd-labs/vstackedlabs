/**
 * Site search for the "Search the site" helper (replaced the AI chat assistant, 2026-10-08).
 *
 * Runs entirely in the browser: no API, no key, nothing sent anywhere. The index is built from the
 * same data files the pages render, so results always match the site. Every result links to the
 * exact section, offer or role it came from.
 */
import { DOORS, PIPELINE, RESCUE_CHECKS, STACK, TAGLINE_TEXT, TECH_DIVISIONS } from '@/components/tech/data'
import { PEOPLE_AND_PRODUCTS, SERVICE_DIVISIONS } from '@/components/tech/services-data'
import { AFFILIATE_FIT, ROLES, VALUES as CAREER_VALUES } from '@/components/tech/careers-data'
import { IN_DEV, PRODUCTS as LABS_PRODUCTS, STAGES as LABS_STAGES } from '@/components/tech/labs-data'
import { PRIVACY_SECTIONS } from '@/lib/legal/privacy'
import { TERMS_SECTIONS } from '@/lib/legal/terms'
import { legalSlug } from '@/lib/legal/slug'

export interface SearchEntry {
  id: string
  title: string
  /** Where it lives, shown as the result's eyebrow, e.g. "Services / Stackd Rescue". */
  where: string
  /** One or two lines shown under the title. */
  snippet: string
  href: string
  /** Extra words people might type that are not in the visible text. */
  keywords?: string
  /** Searchable body text (not shown). */
  body?: string
  /** Boost for answers that should win ties (FAQ-style answers). */
  boost?: number
}

/* ─── Hand-written answers to the questions people actually ask ───────── */

const FAQ: SearchEntry[] = [
  {
    id: 'faq-pricing',
    title: 'How does pricing work?',
    where: 'Services / How pricing works',
    snippet:
      'Every project is scoped to fit and priced fairly. You get a clear written quote after a 15-minute call, before any work begins. No surprise invoices.',
    href: '/services#pricing',
    keywords: 'price prices pricing cost costs charge rate rates fee fees budget quote estimate how much expensive cheap affordable dollars',
    boost: 3,
  },
  {
    id: 'faq-timeline',
    title: 'How long will my project take?',
    where: 'Services / How pricing works',
    snippet:
      'It depends on the project. Timing is set together with your written quote, so you know the plan before any work starts.',
    href: '/services#pricing',
    keywords: 'how long time timeline turnaround fast quick deadline when days weeks delivery launch date',
    boost: 2,
  },
  {
    id: 'faq-start',
    title: 'How do I get started?',
    where: 'Home / Contact us',
    snippet:
      'Fill out the contact form. Pick what you need, answer a few questions, and a real person replies within one business day.',
    href: '/#contact',
    keywords: 'start started begin contact form reach talk call email hire you work with you get in touch',
    boost: 3,
  },
  {
    id: 'faq-broken',
    title: 'My app is broken. Can you help?',
    where: 'Home / Stackd Rescue',
    snippet:
      'Yes. Stackd Rescue fixes broken, abandoned or AI-built apps. We audit it, rate every finding, and give you a plan and a quote before touching a line.',
    href: '/#rescue',
    keywords: 'broken bug bugs crash crashing error errors not working stopped down fix fixing vibe coded lovable bolt replit cursor debug',
    boost: 3,
  },
  {
    id: 'faq-build',
    title: 'Can you build my app?',
    where: 'Home / Stackd Build',
    snippet:
      'Yes. Stackd Build makes MVPs, web and mobile apps, AI tools, automations and SaaS. Tell us what you want built and we scope it with you.',
    href: '/#contact',
    keywords: 'build built create develop make app apps software website mvp product idea startup saas mobile web',
    boost: 3,
  },
  {
    id: 'faq-hire',
    title: 'Can you give me developers for my team?',
    where: 'Services / Stackd Talent',
    snippet:
      'Yes. Stackd Talent shortlists builders with verified skills for a project, a sprint or an ongoing seat on your team. You approve every match.',
    href: '/services#people',
    keywords: 'developers developer engineers engineer staff staffing contractors team capacity hire people talent outsource augment',
    boost: 3,
  },
  {
    id: 'faq-hiring',
    title: 'Are you hiring?',
    where: 'Careers / Open roles',
    snippet: `Yes. We have ${ROLES.length} remote roles open, from engineers and QA to a Game Developer, a Builder Instructor and growth roles.`,
    href: '/careers#roles',
    keywords: 'hiring hire jobs job careers career open roles positions openings vacancies work for you join team apply',
    boost: 3,
  },
  {
    id: 'faq-full-time',
    title: 'Do I have to work full-time?',
    where: 'Careers',
    snippet:
      'No. Working with Stackd can be contract, freelance, part-time, full-time, an internship or a partnership. Talent does not automatically mean employee.',
    href: '/careers',
    keywords: 'full time part time freelance contract remote internship employee job jobs hiring work',
    boost: 2,
  },
  {
    id: 'faq-remote',
    title: 'Are you remote?',
    where: 'About',
    snippet: 'Yes. We are fully remote across the United States, and every open role is remote.',
    href: '/about',
    keywords: 'remote location where based office united states usa address',
    boost: 2,
  },
  {
    id: 'faq-ai',
    title: 'How do you use AI?',
    where: 'About / How we work',
    snippet: 'AI sits underneath everything we do, never on the label. AI recommends; a person approves every decision that matters.',
    href: '/about',
    keywords: 'ai artificial intelligence claude openai chatgpt automation agent agents machine learning',
    boost: 1,
  },
  {
    id: 'faq-ownership',
    title: 'Do I own what you build?',
    where: 'Terms of Service',
    snippet: 'Custom work becomes your property once it is paid in full. We may show it in our portfolio unless agreed otherwise.',
    href: `/terms#${legalSlug('6. Intellectual Property')}`,
    keywords: 'own ownership code ip intellectual property rights copyright source code mine',
    boost: 2,
  },
  {
    id: 'faq-response',
    title: 'How fast will you reply?',
    where: 'Home / Contact us',
    snippet: 'A real person reads every request and replies within one business day.',
    href: '/#contact',
    keywords: 'reply response respond answer hear back wait how fast',
    boost: 1,
  },
  {
    id: 'faq-discord',
    title: 'Is there a community?',
    where: 'Homepage: Community',
    snippet: 'Yes, join the Stackd Discord: a help desk, weekly live build sessions, feedback on your work, and shared resources. Free to join.',
    href: '/#community',
    keywords: 'discord community chat server join help desk live sessions feedback resources prompts templates tutorials social follow',
    boost: 1,
  },
  {
    id: 'faq-launch-guide',
    title: 'Free launch guide (PDF)',
    where: 'Homepage: Free guide',
    snippet: 'Before You Launch: a free security and readiness checklist for apps built with AI tools like Claude Code, Cursor, Lovable and Bolt.',
    href: '/#launch-guide',
    keywords: 'launch guide checklist pdf free download before you launch security readiness vibe code ai built app resource',
    boost: 1,
  },
  {
    id: 'faq-email',
    title: 'What is your email?',
    where: 'Contact',
    snippet: 'Chanel@stackdstudiosai.com, or use the contact form on the homepage.',
    href: '/#contact',
    keywords: 'email mail address phone number contact reach',
    boost: 2,
  },
]

/* ─── Generated from the page data ───────────────────────────────────── */

const DIVISIONS: SearchEntry[] = TECH_DIVISIONS.map((d) => ({
  id: `div-${d.id}`,
  title: d.name,
  where: 'Home / Divisions',
  snippet: d.tagline,
  href: '/#divisions',
  body: d.covers.join(' '),
}))

const DOOR_ENTRIES: SearchEntry[] = DOORS.map((d) => ({
  id: `door-${d.id}`,
  title: d.label,
  where: `Home / ${d.routesTo}`,
  snippet: d.summary,
  href: d.id === 'talent' ? '/careers' : d.id === 'labs' ? '/labs' : '/#contact',
  body: d.steps.join(' '),
}))

const SERVICES: SearchEntry[] = SERVICE_DIVISIONS.flatMap((d) =>
  d.groups.flatMap((g) =>
    g.offers.map((o) => ({
      id: `svc-${o.slug}`,
      title: o.name,
      where: `Services / ${d.name}`,
      snippet: o.pitch,
      href: `/services#${o.slug}`,
      keywords: `${d.name} ${g.label} service offer`,
      body: o.bullets.join(' '),
    })),
  ),
)

const PEOPLE: SearchEntry[] = PEOPLE_AND_PRODUCTS.map((p) => ({
  id: `people-${p.id}`,
  title: p.name,
  where: 'Services / Talent, Jobs and Labs',
  snippet: p.line,
  href: p.href ?? '/services#people',
  body: p.steps.join(' '),
  keywords: p.id === 'talent' ? 'hire hiring developers engineers staff staffing people team' : undefined,
}))

const RESCUE: SearchEntry[] = [
  {
    id: 'rescue-audit',
    title: 'What a rescue audit checks',
    where: 'Home / Stackd Rescue',
    snippet: RESCUE_CHECKS.map((c) => c.area).join(', ') + '. You get findings, severity ratings, a rescue plan and a quote.',
    href: '/#rescue',
    body: RESCUE_CHECKS.map((c) => c.detail).join(' '),
    keywords: 'audit security database auth payments stripe deploy performance cost supabase firebase',
  },
]

const ROLE_ENTRIES: SearchEntry[] = ROLES.map((r) => ({
  id: `role-${r.id}`,
  title: r.title,
  where: `Careers / ${r.type}, ${r.divisions.join(', ')}`,
  snippet: r.summary,
  href: `/careers#${r.id}`,
  keywords: `job role hiring career apply ${r.track} ${r.type}`,
  body: [...r.responsibilities, ...r.requirements, ...r.nice].join(' '),
}))

const CAREER_EXTRA: SearchEntry[] = [
  {
    id: 'careers-apply',
    title: 'How do I apply?',
    where: 'Careers / Apply',
    snippet: 'Click "Apply for this role" on any role and the title fills in for you, or send an open application. One form covers every role.',
    href: '/careers#apply',
    keywords: 'apply application resume cv portfolio github linkedin open application',
    boost: 2,
  },
  {
    id: 'careers-affiliate',
    title: 'Affiliate and creator program',
    where: 'Careers / Affiliate program',
    snippet: 'Earn commission on clients you refer. No minimum follower count. Apply, get your own tracking link, earn on referrals.',
    href: '/careers#affiliate',
    keywords: 'affiliate referral refer commission creator influencer partner earn money',
    body: AFFILIATE_FIT.join(' '),
    boost: 1,
  },
  ...CAREER_VALUES.map((v, i) => ({
    id: `careers-value-${i}`,
    title: v.title,
    where: 'Careers / How we work',
    snippet: v.body,
    href: '/careers',
  })),
]

const LABS: SearchEntry[] = [
  ...LABS_PRODUCTS.map((p) => ({
    id: `labs-${p.id}`,
    title: p.name,
    where: `Labs / ${p.kind}`,
    snippet: `${p.pitch} ${p.body}`,
    href: `/labs#${p.id}`,
    body: [...p.steps.map((s) => `${s.label} ${s.body}`), ...p.tags].join(' '),
    keywords: p.id === 'stackd-interactive' ? 'game games roblox unity phaser interactive' : 'knowledge base assistant sop handbook',
  })),
  ...IN_DEV.flatMap((g) =>
    g.items.map((i) => ({
      id: `labs-dev-${i.name}`,
      title: i.name,
      where: `Labs / In development / ${g.group}`,
      snippet: `${i.kind}. One of the products we are building for ourselves.`,
      href: '/labs#in-the-lab',
    })),
  ),
  {
    id: 'labs-stages',
    title: 'How Labs works',
    where: 'Labs',
    snippet: `Every product earns its next stage: ${LABS_STAGES.join(', ')}.`,
    href: '/labs#how-labs-works',
    keywords: 'labs products own incubate stage idea prototype mvp beta waitlist',
  },
  {
    id: 'labs-waitlist',
    title: 'Join the Labs waitlist',
    where: 'Labs / Get involved',
    snippet: 'Want early access, have a product idea, or want a game or tool built with Labs behind it? Tell us on the Labs page.',
    href: '/labs#labs-form',
    keywords: 'waitlist early access idea pitch partnership',
  },
]

const ABOUT: SearchEntry[] = [
  {
    id: 'about-who',
    title: 'What is Stackd?',
    where: 'About',
    snippet: `A technology ecosystem: ${TAGLINE_TEXT} We build software for clients, rescue apps that broke, train and verify technical talent, connect people with work, and build products of our own.`,
    href: '/about',
    keywords: 'about who what company stackd studios ai mission ecosystem',
    boost: 2,
  },
  {
    id: 'about-pipeline',
    title: 'How the divisions connect',
    where: 'Home / How it connects',
    snippet: PIPELINE.map((p) => p.name).join(' → ') + '. Every division feeds the next.',
    href: '/#pipeline',
    body: PIPELINE.map((p) => p.note).join(' '),
  },
  {
    id: 'about-stack',
    title: 'What we build with',
    where: 'About / What we build with',
    snippet: STACK.slice(0, 10).join(', ') + ', and more.',
    href: '/about',
    body: STACK.join(' '),
    keywords: 'stack tech technology tools framework language nextjs react supabase stripe vercel',
  },
]

const LEGAL: SearchEntry[] = [
  ...PRIVACY_SECTIONS.map((s) => ({
    id: `privacy-${legalSlug(s.title)}`,
    title: s.title.replace(/^\d+\.\s*/, ''),
    where: 'Privacy Policy',
    snippet: s.body[0].length > 160 ? s.body[0].slice(0, 157) + '...' : s.body[0],
    href: `/privacy#${legalSlug(s.title)}`,
    body: s.body.join(' '),
    keywords: 'privacy data personal information policy',
    boost: -1,
  })),
  ...TERMS_SECTIONS.map((s) => ({
    id: `terms-${legalSlug(s.title)}`,
    title: s.title.replace(/^\d+\.\s*/, ''),
    where: 'Terms of Service',
    snippet: s.body[0].length > 160 ? s.body[0].slice(0, 157) + '...' : s.body[0],
    href: `/terms#${legalSlug(s.title)}`,
    body: s.body.join(' '),
    keywords: 'terms legal agreement contract policy',
    boost: -1,
  })),
]

export const SEARCH_INDEX: SearchEntry[] = [
  ...FAQ,
  ...DIVISIONS,
  ...DOOR_ENTRIES,
  ...SERVICES,
  ...PEOPLE,
  ...RESCUE,
  ...ROLE_ENTRIES,
  ...CAREER_EXTRA,
  ...LABS,
  ...ABOUT,
  ...LEGAL,
]

/* ─── Matching ───────────────────────────────────────────────────────── */

const STOP = new Set(
  'a an the and or of to in on for with is are do does can i you we my me your our it this that be at by how what who where when why will would should could there any about from as have has want need like get make please just also'.split(' '),
)

/** Words people type mapped to words the site uses. */
const SYNONYMS: Record<string, string[]> = {
  cost: ['pricing', 'price'],
  price: ['pricing'],
  charge: ['pricing'],
  money: ['pricing'],
  broke: ['broken', 'rescue'],
  broken: ['rescue', 'fix'],
  bug: ['rescue', 'fix'],
  fix: ['rescue'],
  repair: ['rescue', 'fix'],
  hire: ['talent', 'hiring'],
  hiring: ['talent', 'careers', 'role'],
  job: ['careers', 'role', 'jobs'],
  jobs: ['careers', 'role'],
  career: ['careers', 'role'],
  work: ['careers', 'jobs'],
  developer: ['engineer'],
  dev: ['engineer', 'developer'],
  programmer: ['engineer'],
  coder: ['engineer'],
  class: ['learn', 'program'],
  course: ['learn', 'program'],
  teach: ['instructor'],
  teacher: ['instructor'],
  tutor: ['instructor'],
  mentor: ['instructor'],
  training: ['learn', 'enablement'],
  game: ['interactive', 'games'],
  app: ['software', 'application'],
  built: ['build'],
  create: ['build'],
  develop: ['build'],
  make: ['build'],
  website: ['site', 'web'],
  site: ['website', 'web'],
  ai: ['agents', 'automation'],
  bot: ['agents', 'assistant'],
  chatbot: ['assistant', 'agents'],
  design: ['designer', 'ui'],
  designer: ['design', 'ui'],
  privacy: ['privacy', 'data'],
}

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')

/** Very light stemming so "rescues", "fixing", "hired" still match. */
function stem(w: string) {
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3)
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('es')) return w.slice(0, -2)
  if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1)
  return w
}

function words(s: string) {
  return norm(s)
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem)
}

/** True when a and b are within one edit (typo tolerance for words of 4+ letters). */
function near(a: string, b: string) {
  if (a === b) return true
  if (a.length < 4 || Math.abs(a.length - b.length) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++
      j++
      continue
    }
    if (++edits > 1) return false
    if (a.length > b.length) i++
    else if (b.length > a.length) j++
    else {
      i++
      j++
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1
}

interface Prepared {
  entry: SearchEntry
  title: Set<string>
  keys: Set<string>
  text: Set<string>
}

let PREPARED: Prepared[] | null = null
/** Every word the index contains. A query word found here is spelled right, so no typo matching. */
let VOCAB: Set<string> = new Set()
function prepared() {
  if (!PREPARED) {
    PREPARED = SEARCH_INDEX.map((entry) => ({
      entry,
      title: new Set(words(entry.title)),
      keys: new Set(words(`${entry.keywords ?? ''} ${entry.where}`)),
      text: new Set(words(`${entry.snippet} ${entry.body ?? ''}`)),
    }))
    VOCAB = new Set(PREPARED.flatMap((p) => [...p.title, ...p.keys, ...p.text]))
  }
  return PREPARED
}

function hit(set: Set<string>, w: string) {
  if (set.has(w)) return 1
  const known = VOCAB.has(w)
  for (const s of set) {
    if (w.length >= 4 && s.startsWith(w)) return 0.8 // typing in progress: "resc" -> rescue
    if (!known && near(w, s)) return 0.7 // typo: "recue" -> rescue
  }
  return 0
}

function score(query: string) {
  const q = words(query)
  if (!q.length) return []
  const expanded = q.map((w) => [w, ...(SYNONYMS[w] ?? []).map(stem)])

  return prepared()
    .map((p) => {
      let total = 0
      let matched = 0
      for (const group of expanded) {
        let best = 0
        group.forEach((w, gi) => {
          const weight = gi === 0 ? 1 : 0.6 // the typed word beats a synonym
          best = Math.max(best, weight * Math.max(5 * hit(p.title, w), 3.5 * hit(p.keys, w), 1.5 * hit(p.text, w)))
        })
        if (best > 0) matched++
        total += best
      }
      if (!matched) return null
      const coverage = matched / expanded.length
      // How strong the match is per word: 5 = title hit, 3.5 = keyword hit, 1.5 = body text only.
      const strength = total / expanded.length
      // Reward matching every word typed. An entry's boost (FAQ answers) only counts in proportion
      // to how strongly it matched, so a passing mention in its text cannot win on boost alone.
      const s = total * (0.5 + 0.5 * coverage) + (p.entry.boost ?? 0) * Math.min(1, strength / 3.5)
      return { entry: p.entry, score: s, detail: `coverage=${coverage.toFixed(2)} strength=${strength.toFixed(2)}` }
    })
    .filter((x): x is { entry: SearchEntry; score: number; detail: string } => !!x && x.score > 1.2)
    .sort((a, b) => b.score - a.score)
}

export function searchSite(query: string, limit = 6): SearchEntry[] {
  return score(query)
    .slice(0, limit)
    .map((s) => s.entry)
}

/** Dev helper (scripts/debug-search.ts): the scores behind a search. */
export function explainSearch(query: string, limit = 5) {
  return score(query).slice(0, limit)
}
