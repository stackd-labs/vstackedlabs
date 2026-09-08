import { type IconName } from '@/components/Icon'

export type ParsedFields = {
  contactName: string
  intent: string
  urgency: string
  details: string
  nextStep: string
}

export type SamplePrompt = {
  id: string
  chipLabel: string
  icon: IconName
  text: string
  parsed: ParsedFields
}

export const samplePrompts: SamplePrompt[] = [
  {
    id: 'relocation',
    chipLabel: 'Senior relocation',
    icon: 'home',
    text: "Hi, I'm looking for help moving my mom Sarah Patterson to Phoenix next month — she's 78 and recently lost my dad. We need something wheelchair accessible and close to a hospital. Budget is around $4,000/month, and ideally a ground-floor unit with a small patio so she can keep gardening.",
    parsed: {
      contactName: 'Sarah Patterson (mother)',
      intent: 'Senior relocation — accessible housing',
      urgency: 'Within 30 days',
      details:
        '78yo, recently widowed, wheelchair access required, near hospital, ground floor + patio, ~$4,000/mo',
      nextStep: 'Schedule virtual tour, send 3 accessible Phoenix units',
    },
  },
  {
    id: 'insurance',
    chipLabel: 'Insurance card lost',
    icon: 'id-card',
    text: "Help! I lost my insurance card and need a replacement asap. Mike Chen, policy #IC-887234, member since 2019. Can you also confirm my coverage for an upcoming MRI on the 18th? My phone is 555-204-7711.",
    parsed: {
      contactName: 'Mike Chen',
      intent: 'Replace lost insurance card + verify MRI coverage',
      urgency: 'ASAP — MRI scheduled for the 18th',
      details: 'Policy #IC-887234 · member since 2019 · phone 555-204-7711',
      nextStep: 'Issue digital card immediately, verify MRI benefits, email summary',
    },
  },
  {
    id: 'emergency',
    chipLabel: 'Emergency repair',
    icon: 'gear',
    text: "Hey — my AC died this morning and it's 95° out. Need a contractor today if possible. I'm in zip 30312, willing to pay rush rate. House is a 1920s bungalow with a 2-ton unit. Call or text 404-555-0182.",
    parsed: {
      contactName: 'Caller @ 404-555-0182',
      intent: 'Emergency AC repair',
      urgency: 'Today — heat emergency',
      details: '1920s bungalow · 2-ton unit · zip 30312 · approves rush rate',
      nextStep: 'Dispatch nearest tech, text ETA + rush quote within 15 min',
    },
  },
  {
    id: 'wedding',
    chipLabel: 'Wedding venue',
    icon: 'heart',
    text: "Hi — my fiancé and I are touring venues for a 150-person wedding the second weekend of October next year. Looking for outdoor ceremony + indoor reception, near Chattanooga, with on-site catering or an open vendor list. Budget around $18k for venue + food. Can we get pricing and a tour?",
    parsed: {
      contactName: 'Engaged couple (you + fiancé)',
      intent: 'Wedding venue tour + pricing — 150 guests',
      urgency: 'October 2027 — early planning',
      details: 'Outdoor ceremony + indoor reception · Chattanooga area · open vendor list OK · ~$18k venue + food',
      nextStep: 'Send pricing PDF, propose 3 tour dates, flag fall weekends still available',
    },
  },
  {
    id: 'therapy',
    chipLabel: 'Therapy intake',
    icon: 'users',
    text: "Hi, my name is Jordan. I've been dealing with anxiety and burnout for the past 6 months and finally ready to talk to someone. I have BCBS through work and prefer evenings or weekends if possible. Open to virtual or in-person.",
    parsed: {
      contactName: 'Jordan',
      intent: 'New client intake — anxiety + burnout',
      urgency: 'Ready to start — no specific deadline',
      details: '6mo of symptoms · BCBS coverage · prefers evenings/weekends · virtual or in-person',
      nextStep: 'Verify BCBS in-network, send intake forms, offer 3 evening slots in next 2 weeks',
    },
  },
  {
    id: 'real-estate',
    chipLabel: 'Real estate buyer',
    icon: 'buildings',
    text: "Hey, my wife and I are looking for our first home. 3-bedroom, 2-bath, ideally in the Decatur or East Atlanta area. Under $475k. We've been pre-approved through Rocket. Want a yard for our dog. Hoping to close before the school year starts in August.",
    parsed: {
      contactName: 'You + wife',
      intent: 'First-home buyer search — 3BR/2BA',
      urgency: 'Close before August (school year)',
      details: 'Decatur or East Atlanta · under $475k · pre-approved (Rocket) · yard for dog',
      nextStep: 'Set up MLS alerts, schedule 3 showings this weekend, intro lender for rate review',
    },
  },
  {
    id: 'small-biz',
    chipLabel: 'Small biz inquiry',
    icon: 'briefcase',
    text: "Hi! I run a small bakery in Asheville and we're losing orders because customers can't order online. I want a simple ordering page with pickup-only, square integration if possible, and the ability to limit orders per day. Budget is small — under $2k ideally. When can we talk?",
    parsed: {
      contactName: 'Asheville bakery owner',
      intent: 'Online ordering page (pickup-only)',
      urgency: 'Asking now — wants to start a conversation',
      details: 'Square integration · daily order cap · ~$2k budget · solo operator',
      nextStep: 'Book a 20-min discovery call, send Square + Shopify Lite quotes for comparison',
    },
  },
]

const NAME_PATTERNS = [
  /\bI['’]m\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
  /\bmy name is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
  /\bthis is\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
]

const URGENCY_KEYWORDS: Array<{ regex: RegExp; label: string }> = [
  { regex: /\b(asap|urgent|today|right away|immediately|now)\b/i, label: 'Urgent — same day' },
  { regex: /\btomorrow\b/i, label: 'Tomorrow' },
  { regex: /\bthis week\b/i, label: 'This week' },
  { regex: /\bnext week\b/i, label: 'Next week' },
  { regex: /\b(next month|in a month|within (?:30|thirty) days)\b/i, label: 'Within 30 days' },
]

function clip(text: string, max: number): string {
  const trimmed = text.replace(/\s+/g, ' ').trim()
  if (trimmed.length <= max) return trimmed
  return trimmed.slice(0, max - 1).trimEnd() + '…'
}

/**
 * Light fallback parser used when the user types something that doesn't
 * match a sample prompt. Pattern-matches name + urgency, summarizes the rest.
 * Demo-only — production would call a real LLM here.
 */
export function fallbackParse(input: string): ParsedFields {
  const text = input.trim()
  if (!text) {
    return {
      contactName: '—',
      intent: '—',
      urgency: '—',
      details: '—',
      nextStep: '—',
    }
  }

  let contactName = '—'
  for (const pattern of NAME_PATTERNS) {
    const match = text.match(pattern)
    if (match) {
      contactName = match[1]
      break
    }
  }

  let urgency = 'Not specified'
  for (const { regex, label } of URGENCY_KEYWORDS) {
    if (regex.test(text)) {
      urgency = label
      break
    }
  }

  const firstSentence = text.split(/[.!?]\s/)[0] ?? text
  const intent = clip(firstSentence, 70)
  const details = clip(text, 140)

  return {
    contactName,
    intent,
    urgency,
    details,
    nextStep: 'Route to general inquiries queue, respond within 1 business hour',
  }
}

export function findSampleByText(text: string): SamplePrompt | undefined {
  const trimmed = text.trim()
  return samplePrompts.find((s) => s.text.trim() === trimmed)
}
