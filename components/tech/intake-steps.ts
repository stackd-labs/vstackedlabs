// The terminal intake: one question per prompt, branching on what the visitor needs.
// Shared by the client form (components/tech/TerminalForm.tsx) and the server action
// (app/actions/intake.ts), so the questions and the server's length caps never drift.

export type IntakeKind = 'build' | 'rescue' | 'talent' | 'hire' | 'learn' | 'affiliate' | 'other'

export interface Choice {
  value: string
  label: string
}

export interface Step {
  /** Field name sent to the server. */
  key: string
  /** The prompt, phrased the way a CLI would ask it. */
  prompt: string
  type: 'text' | 'email' | 'url' | 'long' | 'choice'
  choices?: Choice[]
  optional?: boolean
  placeholder?: string
  /** Max characters. Enforced in the browser and again on the server. */
  max: number
}

export const KIND_CHOICES: (Choice & { value: IntakeKind })[] = [
  { value: 'build', label: 'Build something new' },
  { value: 'rescue', label: 'Fix an app that is broken' },
  { value: 'talent', label: 'Work with Stackd (apply)' },
  { value: 'hire', label: 'Hire technical people' },
  { value: 'learn', label: 'Learn to build' },
  { value: 'affiliate', label: 'Join the affiliate program' },
  { value: 'other', label: 'Something else' },
]

/** What the homepage contact form offers. /careers passes its own list. */
export const CONTACT_KINDS: IntakeKind[] = ['build', 'rescue', 'talent', 'hire', 'learn', 'other']

const SHORT = 200
const LONG = 3000

const NAME: Step = { key: 'name', prompt: 'Your name', type: 'text', max: 120, placeholder: 'Ada Lovelace' }
const EMAIL: Step = { key: 'email', prompt: 'Best email', type: 'email', max: 200, placeholder: 'you@company.com' }

export const KIND_STEP: Step = {
  key: 'kind',
  prompt: 'What do you need?',
  type: 'choice',
  choices: KIND_CHOICES,
  max: 20,
}

export const STEPS: Record<IntakeKind, Step[]> = {
  build: [
    NAME,
    EMAIL,
    { key: 'company', prompt: 'Company or project name', type: 'text', optional: true, max: SHORT },
    { key: 'details', prompt: 'What do you want built?', type: 'long', max: LONG, placeholder: 'An app, an MVP, an AI tool, an automation...' },
    {
      key: 'timeline',
      prompt: 'When do you need it?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'asap', label: 'As soon as possible' },
        { value: '1-3-months', label: 'In 1 to 3 months' },
        { value: '3-plus-months', label: 'In 3 months or more' },
        { value: 'exploring', label: 'Just exploring' },
      ],
    },
    {
      key: 'budget',
      prompt: 'Rough budget',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'under-5k', label: 'Under $5k' },
        { value: '5-15k', label: '$5k to $15k' },
        { value: '15-50k', label: '$15k to $50k' },
        { value: '50k-plus', label: '$50k or more' },
        { value: 'not-sure', label: 'Not sure yet' },
      ],
    },
  ],
  rescue: [
    NAME,
    EMAIL,
    { key: 'appUrl', prompt: 'App URL', type: 'url', max: 500, placeholder: 'https://' },
    { key: 'repo', prompt: 'Repository link', type: 'url', optional: true, max: 500, placeholder: 'https://github.com/...' },
    { key: 'stack', prompt: 'Stack (frameworks, languages)', type: 'text', optional: true, max: SHORT, placeholder: 'Next.js, React, Python...' },
    { key: 'hosting', prompt: 'Hosting', type: 'text', optional: true, max: SHORT, placeholder: 'Vercel, Netlify, AWS, Replit...' },
    { key: 'database', prompt: 'Database', type: 'text', optional: true, max: SHORT, placeholder: 'Supabase, Firebase, Postgres...' },
    { key: 'auth', prompt: 'Sign-in provider', type: 'text', optional: true, max: SHORT, placeholder: 'Supabase Auth, Clerk, Auth0...' },
    { key: 'payments', prompt: 'Payment provider', type: 'text', optional: true, max: SHORT, placeholder: 'Stripe, PayPal, none...' },
    { key: 'issues', prompt: 'What is broken?', type: 'long', max: LONG, placeholder: 'Known issues, errors, what stopped working...' },
    { key: 'impact', prompt: 'What is it costing you?', type: 'long', optional: true, max: LONG, placeholder: 'Lost sales, blocked users, a launch on hold...' },
    {
      key: 'urgency',
      prompt: 'How urgent?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'down-now', label: 'It is down right now' },
        { value: 'this-week', label: 'Needs fixing this week' },
        { value: 'this-month', label: 'This month' },
        { value: 'no-rush', label: 'No rush, just want it right' },
      ],
    },
    {
      key: 'team',
      prompt: 'Who works on it today?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'just-me', label: 'Just me' },
        { value: 'in-house', label: 'Our own developers' },
        { value: 'agency', label: 'An agency or freelancer' },
        { value: 'nobody', label: 'Nobody anymore' },
      ],
    },
    {
      key: 'docs',
      prompt: 'Any documentation?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'yes', label: 'Yes' },
        { value: 'some', label: 'Some' },
        { value: 'none', label: 'None' },
      ],
    },
    { key: 'access', prompt: 'What access can you give us?', type: 'text', optional: true, max: SHORT, placeholder: 'Repo, hosting, database, admin login...' },
  ],
  talent: [
    NAME,
    EMAIL,
    { key: 'role', prompt: 'Role you are applying for', type: 'text', max: SHORT, placeholder: 'Full-stack developer, designer, QA...' },
    { key: 'skills', prompt: 'Your strongest skills', type: 'long', max: 1500, placeholder: 'React, Supabase, prompt engineering...' },
    { key: 'portfolio', prompt: 'Portfolio link', type: 'url', optional: true, max: 500, placeholder: 'https://' },
    { key: 'github', prompt: 'GitHub', type: 'url', optional: true, max: 500, placeholder: 'https://github.com/...' },
    { key: 'linkedin', prompt: 'LinkedIn', type: 'url', optional: true, max: 500, placeholder: 'https://linkedin.com/in/...' },
    {
      key: 'availability',
      prompt: 'Availability',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'full-time', label: 'Full-time' },
        { value: 'part-time', label: 'Part-time' },
        { value: 'contract', label: 'Contract or project work' },
        { value: 'gigs', label: 'Small gigs only' },
      ],
    },
    { key: 'rate', prompt: 'Rate expectations', type: 'text', optional: true, max: SHORT, placeholder: '$/hour or $/project' },
  ],
  hire: [
    NAME,
    EMAIL,
    { key: 'company', prompt: 'Company', type: 'text', max: SHORT },
    { key: 'role', prompt: 'Who do you need?', type: 'text', max: SHORT, placeholder: 'A React developer, a QA tester...' },
    { key: 'details', prompt: 'Skills and context', type: 'long', max: LONG },
    {
      key: 'engagement',
      prompt: 'What kind of engagement?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'project', label: 'One project' },
        { value: 'ongoing', label: 'Ongoing, part of our team' },
        { value: 'full-time', label: 'Full-time hire' },
        { value: 'not-sure', label: 'Not sure yet' },
      ],
    },
  ],
  learn: [
    NAME,
    EMAIL,
    {
      key: 'level',
      prompt: 'Where are you starting?',
      type: 'choice',
      max: 40,
      choices: [
        { value: 'beginner', label: 'Total beginner' },
        { value: 'vibe-coder', label: 'I build with AI tools already' },
        { value: 'developer', label: 'I am a developer' },
        { value: 'career-change', label: 'Changing careers' },
        { value: 'teen', label: 'Teen learner (or a parent of one)' },
        { value: 'adult', label: 'Adult or senior learner' },
      ],
    },
    { key: 'details', prompt: 'What do you want to be able to build?', type: 'long', optional: true, max: LONG },
  ],
  affiliate: [
    NAME,
    EMAIL,
    { key: 'platforms', prompt: 'Where do you post?', type: 'text', max: 500, placeholder: 'LinkedIn, TikTok, YouTube, a newsletter...' },
    { key: 'audience', prompt: 'Audience size', type: 'text', optional: true, max: SHORT, placeholder: '5k followers, 2k subscribers...' },
    { key: 'links', prompt: 'Links to your channels', type: 'text', optional: true, max: 1000, placeholder: 'Paste one or more links' },
    { key: 'why', prompt: 'Why Stackd, and who is your audience?', type: 'long', max: LONG },
  ],
  other: [NAME, EMAIL, { key: 'details', prompt: 'How can we help?', type: 'long', max: LONG }],
}

export function isKind(v: unknown): v is IntakeKind {
  return typeof v === 'string' && v in STEPS
}
