// Mock-data generators for the Live Ops Dashboard demo.
// Hand-curated names + sources for variety; deterministic shapes so the demo
// looks the same on every load until events start firing.

import { type IconName } from '@/components/Icon'

export type EventType = 'new_lead' | 'email_opened' | 'call_booked' | 'deal_closed' | 'demo_requested' | 'cart_abandoned'

export type FeedEvent = {
  id: string
  type: EventType
  icon: IconName
  title: string
  meta: string
  amount?: number
  at: number // ms epoch (offset from "now" for display)
  ageLabel: string
}

const FIRST_NAMES = [
  'Sarah', 'Marcus', 'Diana', 'James', 'Priya', 'Tomás', 'Aisha', 'Ben',
  'Mei', 'Jordan', 'Olivia', 'Ravi', 'Hannah', 'Devon', 'Zoe', 'Liam',
  'Ada', 'Marcus', 'Cassie', 'Ethan', 'Maya', 'Nina', 'Noah', 'Ivy',
  'Theo', 'Riya', 'Sam', 'Quinn', 'Ezra', 'Lila',
]

const LAST_INITIALS = ['K.', 'P.', 'R.', 'O.', 'M.', 'S.', 'T.', 'L.', 'B.', 'C.', 'D.', 'F.']

const SOURCES = [
  'LinkedIn',
  'Cold email',
  'Website form',
  'Referral',
  'Webinar replay',
  'Newsletter',
  'Direct',
]

const COMPANIES = [
  'Acme Co', 'Northstar Studios', 'Riverbend Properties', 'Apex Wellness',
  'Hearth & Pine', 'Crestline Dental', 'Vanguard Logistics', 'Echo Signal',
  'Quill & Ink Agency', 'Field Ops Group', 'Bramble Works', 'Sunrise Therapy',
]

const EVENT_WEIGHTS: Array<{ type: EventType; weight: number }> = [
  { type: 'new_lead', weight: 30 },
  { type: 'email_opened', weight: 28 },
  { type: 'demo_requested', weight: 12 },
  { type: 'call_booked', weight: 10 },
  { type: 'deal_closed', weight: 8 },
  { type: 'cart_abandoned', weight: 12 },
]

const TOTAL_WEIGHT = EVENT_WEIGHTS.reduce((sum, e) => sum + e.weight, 0)

function pick<T>(list: readonly T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

function randomName(): string {
  return `${pick(FIRST_NAMES)} ${pick(LAST_INITIALS)}`
}

function pickEventType(): EventType {
  let r = Math.random() * TOTAL_WEIGHT
  for (const { type, weight } of EVENT_WEIGHTS) {
    r -= weight
    if (r <= 0) return type
  }
  return 'new_lead'
}

function eventTemplate(type: EventType): { icon: IconName; title: string; meta: string; amount?: number } {
  const name = randomName()
  switch (type) {
    case 'new_lead':
      return { icon: 'user-plus', title: `New lead: ${name}`, meta: `from ${pick(SOURCES)}` }
    case 'email_opened':
      return { icon: 'mail', title: `${name} opened "Quarterly recap"`, meta: 'Email · 3rd open' }
    case 'demo_requested':
      return { icon: 'target', title: `${name} requested a demo`, meta: pick(COMPANIES) }
    case 'call_booked':
      return { icon: 'phone', title: `${name} booked a discovery call`, meta: `Tomorrow · 2:00 PM` }
    case 'deal_closed': {
      const amount = Math.round((1500 + Math.random() * 12500) / 50) * 50
      return {
        icon: 'check-circle',
        title: `Deal closed: ${pick(COMPANIES)}`,
        meta: `Owned by ${name}`,
        amount,
      }
    }
    case 'cart_abandoned':
      return {
        icon: 'cart',
        title: `${name} left items in cart`,
        meta: `Recovery email queued`,
      }
  }
}

export function generateFeedEvent(now: number): FeedEvent {
  const type = pickEventType()
  const tpl = eventTemplate(type)
  return {
    id: `evt-${now}-${Math.floor(Math.random() * 10000)}`,
    type,
    icon: tpl.icon,
    title: tpl.title,
    meta: tpl.meta,
    amount: tpl.amount,
    at: now,
    ageLabel: 'just now',
  }
}

// 7-day rolling chart. Days are labeled relative to "today".
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today']

export type ChartPoint = { label: string; value: number }

export function initialChartData(): ChartPoint[] {
  // Hand-tuned shape that looks "real" — small lift through the week.
  const baseValues = [3200, 4100, 3800, 5200, 6100, 4900, 1200] // today starts low; ticks up over time
  return DAY_LABELS.map((label, i) => ({ label, value: baseValues[i] }))
}

export function initialFeed(now: number): FeedEvent[] {
  // Seed with a few events so the panel doesn't look empty on first paint.
  const seedTimes = [60, 180, 420, 900] // seconds ago
  return seedTimes.map((secondsAgo, i) => {
    const ev = generateFeedEvent(now - secondsAgo * 1000)
    return { ...ev, id: `seed-${i}`, ageLabel: humanizeAge(secondsAgo) }
  })
}

export function humanizeAge(secondsAgo: number): string {
  if (secondsAgo < 5) return 'just now'
  if (secondsAgo < 60) return `${Math.floor(secondsAgo)}s ago`
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)}m ago`
  return `${Math.floor(secondsAgo / 3600)}h ago`
}

export type Kpi = {
  label: string
  value: number
  display: (v: number) => string
  delta: string
  trend: 'up' | 'down' | 'flat'
}

export function initialKpis(): { activeLeads: Kpi; closedThisWeek: Kpi; mrr: Kpi } {
  return {
    activeLeads: {
      label: 'Active leads',
      value: 47,
      display: (v) => v.toString(),
      delta: '+8 this week',
      trend: 'up',
    },
    closedThisWeek: {
      label: 'Closed this week',
      value: 12,
      display: (v) => v.toString(),
      delta: '+3 vs last week',
      trend: 'up',
    },
    mrr: {
      label: 'MRR',
      value: 18400,
      display: (v) => `$${(v / 1000).toFixed(1)}k`,
      delta: '+12% MoM',
      trend: 'up',
    },
  }
}

// ── Sidebar view data ──────────────────────────────────────────────

export type LeadStatus = 'cold' | 'warm' | 'demo' | 'closed'

export type Lead = {
  id: string
  name: string
  company: string
  source: string
  status: LeadStatus
  value: number
  lastTouchedDays: number
}

export const leads: Lead[] = [
  { id: 'l-001', name: 'Sarah Patterson', company: 'Crestline Dental', source: 'LinkedIn', status: 'demo', value: 8400, lastTouchedDays: 1 },
  { id: 'l-002', name: 'Marcus Reyes', company: 'Apex Wellness', source: 'Referral', status: 'warm', value: 4200, lastTouchedDays: 3 },
  { id: 'l-003', name: 'Diana Okonkwo', company: 'Riverbend Properties', source: 'Cold email', status: 'cold', value: 12000, lastTouchedDays: 7 },
  { id: 'l-004', name: 'James Mitchell', company: 'Northstar Studios', source: 'Website form', status: 'closed', value: 6300, lastTouchedDays: 2 },
  { id: 'l-005', name: 'Priya Shah', company: 'Hearth & Pine', source: 'Webinar replay', status: 'warm', value: 3800, lastTouchedDays: 4 },
  { id: 'l-006', name: 'Tomás Silva', company: 'Vanguard Logistics', source: 'LinkedIn', status: 'demo', value: 15500, lastTouchedDays: 1 },
  { id: 'l-007', name: 'Aisha Bell', company: 'Quill & Ink Agency', source: 'Newsletter', status: 'cold', value: 5200, lastTouchedDays: 14 },
  { id: 'l-008', name: 'Ben Carter', company: 'Field Ops Group', source: 'Direct', status: 'warm', value: 9100, lastTouchedDays: 5 },
  { id: 'l-009', name: 'Mei Lin', company: 'Bramble Works', source: 'Referral', status: 'closed', value: 7400, lastTouchedDays: 8 },
  { id: 'l-010', name: 'Jordan Foster', company: 'Sunrise Therapy', source: 'Cold email', status: 'demo', value: 11200, lastTouchedDays: 2 },
  { id: 'l-011', name: 'Olivia Thorne', company: 'Echo Signal', source: 'LinkedIn', status: 'warm', value: 6800, lastTouchedDays: 6 },
  { id: 'l-012', name: 'Ravi Das', company: 'Acme Co', source: 'Website form', status: 'cold', value: 4500, lastTouchedDays: 21 },
]

export const STATUS_META: Record<LeadStatus, { label: string; color: string; description: string }> = {
  cold: { label: 'Cold', color: '#888580', description: 'Just landed' },
  warm: { label: 'Warm', color: '#FFD84D', description: 'Engaged within 7 days' },
  demo: { label: 'Demo', color: '#5B8DEF', description: 'Demo scheduled or done' },
  closed: { label: 'Closed', color: '#22c55e', description: 'Signed contract' },
}

// Reports — channel revenue breakdown
export const channelBreakdown: Array<{ channel: string; revenue: number; deals: number }> = [
  { channel: 'LinkedIn', revenue: 24500, deals: 8 },
  { channel: 'Referral', revenue: 18200, deals: 6 },
  { channel: 'Website form', revenue: 11400, deals: 5 },
  { channel: 'Cold email', revenue: 9800, deals: 4 },
  { channel: 'Webinar replay', revenue: 6100, deals: 3 },
  { channel: 'Newsletter', revenue: 3700, deals: 2 },
]

// Conversion funnel
export const funnel: Array<{ stage: string; count: number }> = [
  { stage: 'Visited site', count: 4280 },
  { stage: 'Submitted form', count: 412 },
  { stage: 'Booked demo', count: 142 },
  { stage: 'Closed', count: 28 },
]

// Settings — integrations
export type Integration = {
  id: string
  name: string
  description: string
  connected: boolean
}

export const initialIntegrations: Integration[] = [
  { id: 'stripe', name: 'Stripe', description: 'Payments + MRR sync', connected: true },
  { id: 'hubspot', name: 'HubSpot CRM', description: 'Lead + deal pipeline', connected: true },
  { id: 'slack', name: 'Slack', description: 'Lead alerts + escalations', connected: true },
  { id: 'calendly', name: 'Calendly', description: 'Demo bookings', connected: false },
  { id: 'gmail', name: 'Gmail', description: 'Email tracking', connected: false },
  { id: 'gdrive', name: 'Google Drive', description: 'Document attachments', connected: false },
]

/**
 * Decides what (if anything) to nudge on a given tick. Bumps are small +1/+2
 * deltas to KPIs to keep the dashboard feeling alive without spiraling.
 * Returns a partial state to merge.
 */
export function tickKpis(prev: { activeLeads: Kpi; closedThisWeek: Kpi; mrr: Kpi }, tickCount: number) {
  // Active leads fluctuates ±1 every ~3 ticks
  let activeDelta = 0
  if (tickCount % 3 === 0) {
    activeDelta = Math.random() < 0.6 ? 1 : -1
  }
  // Closed this week + 1 on a deal_closed feed event (caller will pass that flag)
  // MRR rises slowly on every ~6 ticks
  let mrrDelta = 0
  if (tickCount % 6 === 0) {
    mrrDelta = Math.round(Math.random() * 200 + 50)
  }

  return {
    activeLeads: { ...prev.activeLeads, value: Math.max(0, prev.activeLeads.value + activeDelta) },
    closedThisWeek: prev.closedThisWeek,
    mrr: { ...prev.mrr, value: prev.mrr.value + mrrDelta },
  }
}
