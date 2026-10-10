// /services: the existing offers from lib/divisions.ts, regrouped into the new divisions
// (Build, Rescue, Learn; Talent, Jobs and Labs explain how they work instead).
//
// NO PRICES on this page (Chanel, 2026-10-07). Prices are dropped here, and so is any
// bullet that quotes a dollar figure. NO TIMINGS either (Chanel, 2026-10-08: "not realistic"):
// the timing field is not exposed, and copy that promises a delivery speed is rewritten below. Offer copy still comes from lib/divisions.ts so it
// has one source; this file only decides grouping, order and which form path each opens.

import { DIVISIONS, type DivisionOffer } from '@/lib/divisions'
import type { IntakeKind } from './intake-steps'

export interface ServiceOffer {
  slug: string
  name: string
  pitch: string
  bullets: string[]
  /** Delivered by people from the Talent network, not an in-house bench. */
  viaTalent?: boolean
}

export interface ServiceGroup {
  label: string
  offers: ServiceOffer[]
}

export interface ServiceDivision {
  id: 'build' | 'rescue' | 'learn'
  name: string
  verb: string
  intro: string
  intake: IntakeKind
  cta: string
  groups: ServiceGroup[]
}

const ALL: Record<string, DivisionOffer> = Object.fromEntries(
  DIVISIONS.flatMap((d) => d.offers.map((o) => [o.slug, o])),
)

const VIA_TALENT = new Set(['fractional-team', 'embedded-engineering', 'engineering-augmentation'])

/** Pitches rewritten without a delivery-speed promise. */
const PITCH_OVERRIDES: Record<string, string> = {
  'build-sprint': 'One workflow, scoped tight, built and handed off with a training call.',
  'fix-sprint': 'A focused fix sprint. We fix the ranked list of what is actually breaking and hand it back working.',
  'first-app': 'One real application, deployed to a live URL you own.',
}

/** Bullets that promised a delivery speed: rewritten, or dropped when mapped to null. */
const BULLET_OVERRIDES: Record<string, string | null> = {
  'Written roadmap delivered within 48 hours': 'Written roadmap you can act on',
  'Answered within one business day': null,
  'Unlimited async questions, answered same or next day': 'Unlimited async questions',
  'Deployed on your own domain by the final week': 'Deployed on your own domain',
}

function pick(...slugs: string[]): ServiceOffer[] {
  return slugs.map((slug) => {
    const o = ALL[slug]
    if (!o) throw new Error(`services-data: no offer "${slug}" in lib/divisions.ts`)
    return {
      slug,
      name: o.name,
      pitch: PITCH_OVERRIDES[slug] ?? o.pitch,
      bullets: o.bullets
        .filter((b) => !/\$\d/.test(b))
        .map((b) => (b in BULLET_OVERRIDES ? BULLET_OVERRIDES[b] : b))
        .filter((b): b is string => Boolean(b)),
      viaTalent: VIA_TALENT.has(slug),
    }
  })
}

export const SERVICE_DIVISIONS: ServiceDivision[] = [
  {
    id: 'build',
    name: 'Stackd Build',
    verb: 'Build it.',
    intro: 'Client software, from a first audit to a full technical team. MVPs, web and mobile apps, AI tools and agents, automations and SaaS.',
    intake: 'build',
    cta: 'Start a build',
    groups: [
      { label: 'Start here', offers: pick('audit', 'build-sprint') },
      { label: 'Products', offers: pick('website-build', 'mvp-build', 'business-brain') },
      {
        label: 'Teams',
        offers: pick('fractional-engineering', 'fractional-team', 'embedded-engineering', 'team-enablement', 'operating-partner'),
      },
      {
        label: 'Enterprise',
        offers: pick('capacity-assessment', 'engineering-augmentation', 'modernization', 'enterprise-enablement'),
      },
    ],
  },
  {
    id: 'rescue',
    name: 'Stackd Rescue',
    verb: 'Fix it.',
    intro: 'Broken, abandoned or AI-generated apps made stable, secure and shippable. Every rescue starts with an audit and a plan before we touch a line.',
    intake: 'rescue',
    cta: 'Request a rescue',
    groups: [
      { label: 'Rescue', offers: pick('diagnostic', 'security-data', 'fix-sprint', 'mvp-rescue') },
      { label: 'Quick help for builders', offers: pick('unblock', 'review', 'session', 'builder-support') },
    ],
  },
  {
    id: 'learn',
    name: 'Stackd Learn',
    verb: 'Scale it.',
    intro: 'Training for beginners, developers, AI builders, vibe coders, career changers, teens, adults and seniors. Finishing a program adds verified skills to your talent profile.',
    intake: 'learn',
    cta: 'Join a cohort',
    groups: [
      { label: 'Programs', offers: pick('first-app', 'ai-assisted-dev', 'vibe-to-real', 'career-transition') },
      { label: 'For every age', offers: pick('kids-teens', 'fifty-five-plus', 'self-paced') },
    ],
  },
]

/** Divisions without priced offers: a short how-it-works and one action each. */
export const PEOPLE_AND_PRODUCTS = [
  {
    id: 'talent',
    name: 'Stackd Talent',
    verb: 'Scale it.',
    line: 'Verified builders for a project, a sprint or an ongoing seat on your team.',
    steps: ['Tell us the role and the skills', 'We shortlist people with verified skills', 'You approve every match'],
    cta: 'Find talent',
    intake: 'hire' as IntakeKind,
  },
  {
    id: 'jobs',
    name: 'Stackd Jobs',
    verb: 'Scale it.',
    line: 'Full-time, part-time, contract, freelance and micro-gig work from clients, Stackd and partners.',
    steps: ['Apply to the network', 'Get your skills verified', 'Get matched to real work'],
    cta: 'See careers',
    href: '/careers',
  },
  {
    id: 'labs',
    name: 'Stackd Labs',
    verb: 'Build it.',
    line: 'Products we own and incubate: SaaS, AI tools, games and experiments, kept separate from client work.',
    steps: ['We find a problem worth solving', 'We build and run it ourselves', 'What we learn makes client work better'],
    cta: 'Visit Labs',
    href: '/labs',
  },
]

export const OFFER_COUNT = SERVICE_DIVISIONS.reduce((n, d) => n + d.groups.reduce((m, g) => m + g.offers.length, 0), 0)
