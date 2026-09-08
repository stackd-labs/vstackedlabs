'use client'

import Icon from '@/components/Icon'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DemoFrame from '@/components/lab/DemoFrame'
import {
  channelBreakdown,
  funnel,
  generateFeedEvent,
  humanizeAge,
  initialChartData,
  initialFeed,
  initialIntegrations,
  initialKpis,
  leads,
  STATUS_META,
  tickKpis,
  type ChartPoint,
  type FeedEvent,
  type Integration,
  type Kpi,
  type Lead,
  type LeadStatus,
} from '@/lib/demos/ops-dashboard-data'

const TICK_MS = 1000
const FEED_MIN_INTERVAL = 4
const FEED_MAX_INTERVAL = 7
const CHART_TICK_EVERY = 6
const MAX_FEED_LENGTH = 8

type View = 'dashboard' | 'leads' | 'pipeline' | 'reports' | 'settings'

type LiveState = {
  kpis: ReturnType<typeof initialKpis>
  chart: ChartPoint[]
  feed: FeedEvent[]
}

const NAV_ITEMS: Array<{ id: View; label: string; icon: React.ReactNode }> = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'leads', label: 'Leads', icon: <LeadsIcon /> },
  { id: 'pipeline', label: 'Pipeline', icon: <PipelineIcon /> },
  { id: 'reports', label: 'Reports', icon: <ReportsIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
]

export default function OpsDashboardDemo() {
  const [view, setView] = useState<View>('dashboard')
  const [paused, setPaused] = useState(false)
  const [state, setState] = useState<LiveState>(() => {
    const now = Date.now()
    return { kpis: initialKpis(), chart: initialChartData(), feed: initialFeed(now) }
  })
  const tickCountRef = useRef(0)
  const nextFeedAtRef = useRef(2)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Tick loop runs continuously regardless of view — keeps the dashboard
  // "alive" so when the user clicks back to it, fresh state is waiting.
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (paused) return
      tickCountRef.current += 1
      const tick = tickCountRef.current

      setState((prev) => {
        let next: LiveState = { ...prev }
        next.kpis = tickKpis(prev.kpis, tick)

        if (tick % CHART_TICK_EVERY === 0) {
          const lift = Math.round(Math.random() * 600 + 200)
          next.chart = prev.chart.map((p, i) =>
            i === prev.chart.length - 1 ? { ...p, value: p.value + lift } : p
          )
        }

        nextFeedAtRef.current -= 1
        if (nextFeedAtRef.current <= 0) {
          const event = generateFeedEvent(Date.now())
          next.feed = [event, ...prev.feed].slice(0, MAX_FEED_LENGTH)

          if (event.type === 'deal_closed') {
            next.kpis = {
              ...next.kpis,
              closedThisWeek: {
                ...next.kpis.closedThisWeek,
                value: next.kpis.closedThisWeek.value + 1,
              },
            }
          }

          nextFeedAtRef.current =
            FEED_MIN_INTERVAL + Math.floor(Math.random() * (FEED_MAX_INTERVAL - FEED_MIN_INTERVAL + 1))
        }

        const now = Date.now()
        next.feed = next.feed.map((e) => ({
          ...e,
          ageLabel: humanizeAge(Math.max(0, Math.round((now - e.at) / 1000))),
        }))

        return next
      })
    }, TICK_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused])

  function handleReset() {
    tickCountRef.current = 0
    nextFeedAtRef.current = 2
    const now = Date.now()
    setState({ kpis: initialKpis(), chart: initialChartData(), feed: initialFeed(now) })
  }

  return (
    <DemoFrame label="lab.stackdstudiosai.com/ops-dashboard">
      <div className="bg-[#0A0A0A] text-white">
        {/* App header */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFD84D] text-[#0C0C0C] shrink-0 font-[family-name:var(--font-anton)] text-sm">
              N
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight truncate">Northstar Studios</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                Operations · Live
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/55">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                {!paused && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                    paused ? 'bg-white/30' : 'bg-[#22c55e]'
                  }`}
                />
              </span>
              {paused ? 'Paused' : 'Live'}
            </span>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              {paused ? '▶ Resume' : '⏸ Pause'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Sidebar + main */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] min-h-[680px]">
          {/* Sidebar (mobile: top tab bar; desktop: left rail) */}
          <Sidebar view={view} onChange={setView} />

          {/* Main view */}
          <div className="bg-[#0A0A0A] overflow-x-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {view === 'dashboard' && <DashboardView state={state} />}
                {view === 'leads' && <LeadsView />}
                {view === 'pipeline' && <PipelineView />}
                {view === 'reports' && <ReportsView />}
                {view === 'settings' && <SettingsView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DemoFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar
// ─────────────────────────────────────────────────────────────────────────────

function Sidebar({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <nav
      className="bg-[#0F0F0F] border-b lg:border-b-0 lg:border-r border-white/10 flex lg:flex-col overflow-x-auto lg:overflow-x-visible"
      aria-label="App navigation"
    >
      <div className="hidden lg:block px-4 py-3 border-b border-white/10">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/40 font-semibold">Workspace</p>
      </div>
      <ul className="flex lg:flex-col lg:px-2 lg:py-2 lg:gap-1 list-none m-0 p-0 shrink-0">
        {NAV_ITEMS.map((item) => {
          const active = view === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onChange(item.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 lg:w-full px-4 lg:px-3 py-3 lg:py-2 text-xs lg:text-sm whitespace-nowrap transition-colors lg:rounded-lg ${
                  active
                    ? 'bg-[#FFD84D] text-[#0C0C0C] font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-4 h-4 inline-flex items-center justify-center" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="hidden lg:block mt-auto px-4 py-3 border-t border-white/10">
        <p className="text-[10px] text-white/40 leading-relaxed">
          Mock data · zero backend.
        </p>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard view (KPIs, chart, feed)
// ─────────────────────────────────────────────────────────────────────────────

function DashboardView({ state }: { state: LiveState }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-px bg-white/10">
        <KpiTile kpi={state.kpis.activeLeads} />
        <KpiTile kpi={state.kpis.closedThisWeek} />
        <KpiTile kpi={state.kpis.mrr} />
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-px bg-white/10">
        <ChartPanel chart={state.chart} />
        <FeedPanel feed={state.feed} />
      </div>
    </div>
  )
}

function KpiTile({ kpi }: { kpi: Kpi }) {
  return (
    <div className="bg-[#0A0A0A] px-4 sm:px-5 py-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold mb-1.5">
        {kpi.label}
      </p>
      <p className="font-[family-name:var(--font-anton)] text-2xl sm:text-3xl text-white leading-none mb-1.5 tabular-nums">
        <CountUp value={kpi.value} format={kpi.display} />
      </p>
      <p
        className={`text-[11px] font-medium ${
          kpi.trend === 'up'
            ? 'text-[#22c55e]'
            : kpi.trend === 'down'
              ? 'text-[#ef4444]'
              : 'text-white/55'
        }`}
      >
        {kpi.trend === 'up' ? '▲ ' : kpi.trend === 'down' ? '▼ ' : '— '}
        {kpi.delta}
      </p>
    </div>
  )
}

function CountUp({ value, format }: { value: number; format: (v: number) => string }) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (display === value) return
    fromRef.current = display
    startRef.current = null
    const duration = 600

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const t = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = fromRef.current + (value - fromRef.current) * eased
      setDisplay(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        setDisplay(value)
      }
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <>{format(Math.round(display))}</>
}

function ChartPanel({ chart }: { chart: ChartPoint[] }) {
  const max = useMemo(() => Math.max(...chart.map((p) => p.value)) * 1.15, [chart])
  const total = useMemo(() => chart.reduce((s, p) => s + p.value, 0), [chart])
  const today = chart[chart.length - 1]?.value ?? 0

  const width = 600
  const height = 220
  const paddingX = 36
  const paddingY = 30
  const xStep = (width - paddingX * 2) / Math.max(1, chart.length - 1)

  const points = chart.map((p, i) => ({
    x: paddingX + i * xStep,
    y: height - paddingY - (p.value / max) * (height - paddingY * 2),
    label: p.label,
    value: p.value,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD =
    pathD +
    ` L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <div className="bg-[#0A0A0A] px-4 sm:px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold">
            Revenue · last 7 days
          </p>
          <p className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white tabular-nums">
            <CountUp value={total} format={(v) => `$${v.toLocaleString('en-US')}`} />
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold">Today</p>
          <p className="text-[#FFD84D] font-mono text-sm tabular-nums">
            <CountUp value={today} format={(v) => `+$${v.toLocaleString('en-US')}`} />
          </p>
        </div>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-[180px] sm:h-[220px]" aria-hidden="true">
        {[0.25, 0.5, 0.75].map((frac) => {
          const y = paddingY + (height - paddingY * 2) * frac
          return <line key={frac} x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        })}
        <defs>
          <linearGradient id="opsAreaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFD84D" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFD84D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path d={areaD} fill="url(#opsAreaGradient)" initial={false} animate={{ d: areaD }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        <motion.path d={pathD} fill="none" stroke="#FFD84D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ d: pathD }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        {points.map((p, i) => (
          <motion.circle key={p.label} cx={p.x} cy={p.y} r={i === points.length - 1 ? 5 : 3} fill={i === points.length - 1 ? '#FFD84D' : '#0A0A0A'} stroke="#FFD84D" strokeWidth={i === points.length - 1 ? 0 : 2} initial={false} animate={{ cx: p.x, cy: p.y }} transition={{ duration: 0.4, ease: 'easeOut' }} />
        ))}
        {points.map((p, i) => (
          <text key={`label-${p.label}`} x={p.x} y={height - 8} fill={i === points.length - 1 ? '#FFD84D' : 'rgba(255,255,255,0.4)'} fontSize="10" textAnchor="middle" fontFamily="ui-monospace, monospace">
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

function FeedPanel({ feed }: { feed: FeedEvent[] }) {
  return (
    <div className="bg-[#0A0A0A] px-4 sm:px-5 py-4">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-semibold">Activity feed</p>
        <span className="text-[10px] text-white/40 font-mono">{feed.length} events</span>
      </div>
      <div className="flex flex-col gap-2 max-h-[260px] sm:max-h-[280px] overflow-hidden">
        <AnimatePresence initial={false}>
          {feed.map((event) => (
            <motion.div key={event.id} layout initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }} transition={{ duration: 0.3, ease: 'easeOut' }} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <Icon name={event.icon} size={16} className="mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] text-white leading-snug truncate">{event.title}</p>
                <p className="text-[11px] text-white/45 truncate">
                  {event.meta}
                  {event.amount && (
                    <span className="text-[#22c55e] font-semibold ml-1">· ${event.amount.toLocaleString('en-US')}</span>
                  )}
                </p>
              </div>
              <span className="text-[10px] text-white/35 font-mono shrink-0 mt-0.5 tabular-nums">{event.ageLabel}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Leads view
// ─────────────────────────────────────────────────────────────────────────────

function LeadsView() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = leads.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return lead.name.toLowerCase().includes(q) || lead.company.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="px-4 sm:px-6 py-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase">Leads</h3>
          <p className="text-[11px] text-white/45 uppercase tracking-[0.14em] font-semibold mt-1">
            {filtered.length} of {leads.length} shown
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or company…"
            className="bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-md px-3 py-1.5 text-xs outline-none focus:border-[#FFD84D] transition-colors"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | LeadStatus)}
            className="bg-white/5 border border-white/10 text-white rounded-md px-2 py-1.5 text-xs outline-none focus:border-[#FFD84D] transition-colors"
          >
            <option value="all">All statuses</option>
            <option value="cold">Cold</option>
            <option value="warm">Warm</option>
            <option value="demo">Demo</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr className="text-left text-[10px] uppercase tracking-[0.14em] text-white/45 font-semibold">
              <th className="px-3 py-2.5">Lead</th>
              <th className="px-3 py-2.5 hidden sm:table-cell">Source</th>
              <th className="px-3 py-2.5">Status</th>
              <th className="px-3 py-2.5 text-right">Value</th>
              <th className="px-3 py-2.5 hidden md:table-cell text-right">Last touch</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-12 text-center text-white/40 text-sm">
                  No leads match those filters.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedId(selectedId === lead.id ? null : lead.id)}
                  className={`border-t border-white/5 cursor-pointer transition-colors ${
                    selectedId === lead.id ? 'bg-[#FFD84D]/10' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="px-3 py-2.5">
                    <p className="text-white font-medium leading-tight">{lead.name}</p>
                    <p className="text-[11px] text-white/45 leading-tight">{lead.company}</p>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell text-white/70 text-xs">
                    {lead.source}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-3 py-2.5 text-right text-white tabular-nums">
                    ${lead.value.toLocaleString('en-US')}
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-right text-white/60 text-xs">
                    {lead.lastTouchedDays}d ago
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
      style={{ background: `${meta.color}22`, color: meta.color, border: `1px solid ${meta.color}55` }}
    >
      <span className="w-1 h-1 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
      {meta.label}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pipeline view (kanban)
// ─────────────────────────────────────────────────────────────────────────────

function PipelineView() {
  const columns: LeadStatus[] = ['cold', 'warm', 'demo', 'closed']

  return (
    <div className="px-4 sm:px-6 py-5">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase">
          Pipeline
        </h3>
        <p className="text-[11px] text-white/45 uppercase tracking-[0.14em] font-semibold mt-1">
          {leads.length} active deals · ${leads.reduce((s, l) => s + l.value, 0).toLocaleString('en-US')} total value
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {columns.map((status) => {
          const meta = STATUS_META[status]
          const colLeads = leads.filter((l) => l.status === status)
          const colValue = colLeads.reduce((s, l) => s + l.value, 0)
          return (
            <div key={status} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div
                className="flex items-center justify-between px-3 py-2 border-b border-white/10"
                style={{ background: `${meta.color}15` }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: meta.color }} aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-white">
                    {meta.label}
                  </p>
                  <span className="text-[10px] text-white/45">({colLeads.length})</span>
                </div>
                <span className="text-[10px] text-white/55 font-mono tabular-nums">
                  ${colValue.toLocaleString('en-US')}
                </span>
              </div>
              <div className="p-2 flex flex-col gap-1.5 min-h-[200px]">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[#0A0A0A] border border-white/10 rounded-md px-2.5 py-2 hover:border-white/30 cursor-grab transition-colors"
                  >
                    <p className="text-xs text-white font-medium leading-tight truncate">
                      {lead.name}
                    </p>
                    <p className="text-[10px] text-white/45 leading-tight truncate">{lead.company}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-white/40">{lead.source}</span>
                      <span className="text-[10px] text-[#FFD84D] font-mono tabular-nums">
                        ${(lead.value / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                ))}
                {colLeads.length === 0 && (
                  <p className="text-[11px] text-white/30 italic text-center py-6">No deals here.</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Reports view
// ─────────────────────────────────────────────────────────────────────────────

function ReportsView() {
  const totalRevenue = channelBreakdown.reduce((s, c) => s + c.revenue, 0)
  const maxRevenue = Math.max(...channelBreakdown.map((c) => c.revenue))
  const maxFunnel = Math.max(...funnel.map((f) => f.count))

  return (
    <div className="px-4 sm:px-6 py-5">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase">
          Reports
        </h3>
        <p className="text-[11px] text-white/45 uppercase tracking-[0.14em] font-semibold mt-1">
          Last 30 days · {totalRevenue > 0 ? `$${totalRevenue.toLocaleString('en-US')} total revenue` : 'no data'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Channel breakdown */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold mb-3">
            Revenue by channel
          </p>
          <div className="flex flex-col gap-2.5">
            {channelBreakdown.map((c) => (
              <div key={c.channel}>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-white">{c.channel}</span>
                  <span className="text-xs text-white/55 font-mono tabular-nums">
                    ${c.revenue.toLocaleString('en-US')}
                    <span className="text-white/30 ml-1.5">· {c.deals} deals</span>
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#FFD84D]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(c.revenue / maxRevenue) * 100}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion funnel */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold mb-3">
            Conversion funnel
          </p>
          <div className="flex flex-col gap-2.5">
            {funnel.map((f, i) => {
              const pct = (f.count / maxFunnel) * 100
              const conversionFromTop = ((f.count / funnel[0].count) * 100).toFixed(1)
              return (
                <div key={f.stage}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-white">{f.stage}</span>
                    <span className="text-xs text-white/55 font-mono tabular-nums">
                      {f.count.toLocaleString('en-US')}
                      {i > 0 && <span className="text-white/30 ml-1.5">· {conversionFromTop}%</span>}
                    </span>
                  </div>
                  <motion.div
                    className="h-7 rounded-md flex items-center justify-end px-2 text-[10px] font-mono text-[#0C0C0C]"
                    style={{ background: '#FFD84D' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                  >
                    {pct > 15 && <span className="opacity-70">{conversionFromTop}%</span>}
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary tiles */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Avg deal size', value: '$5,400', delta: '+12%' },
            { label: 'Sales cycle', value: '14 days', delta: '-3 days' },
            { label: 'Win rate', value: '23%', delta: '+4 pts' },
            { label: 'CAC payback', value: '4.2 mo', delta: '−0.8 mo' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-3">
              <p className="text-[10px] text-white/45 uppercase tracking-[0.14em] font-semibold mb-1">
                {s.label}
              </p>
              <p className="font-[family-name:var(--font-anton)] text-lg text-white tabular-nums">
                {s.value}
              </p>
              <p className="text-[11px] text-[#22c55e]">▲ {s.delta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings view
// ─────────────────────────────────────────────────────────────────────────────

function SettingsView() {
  const [name, setName] = useState('Chanel Gray')
  const [email, setEmail] = useState('chanel@northstarstudios.io')
  const [notifyAlerts, setNotifyAlerts] = useState(true)
  const [notifyDigest, setNotifyDigest] = useState(true)
  const [notifyMarketing, setNotifyMarketing] = useState(false)
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations)
  const [saved, setSaved] = useState(false)

  function toggleIntegration(id: string) {
    setIntegrations((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i))
    )
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="px-4 sm:px-6 py-5">
      <div className="mb-4">
        <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-white uppercase">
          Settings
        </h3>
        <p className="text-[11px] text-white/45 uppercase tracking-[0.14em] font-semibold mt-1">
          Workspace · profile · integrations
        </p>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-2 gap-4">
        {/* Profile */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold mb-3">
            Profile
          </p>
          <div className="flex flex-col gap-3">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full bg-[#0A0A0A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#FFD84D] transition-colors"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/55 font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-[#0A0A0A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#FFD84D] transition-colors"
              />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold mb-3">
            Notifications
          </p>
          <div className="flex flex-col gap-2.5">
            <Toggle label="Real-time lead alerts" sublabel="Slack ping when a new lead lands" checked={notifyAlerts} onChange={setNotifyAlerts} />
            <Toggle label="Daily digest" sublabel="Yesterday's wins, today's calendar" checked={notifyDigest} onChange={setNotifyDigest} />
            <Toggle label="Marketing updates" sublabel="Stackd product news" checked={notifyMarketing} onChange={setNotifyMarketing} />
          </div>
        </div>

        {/* Integrations */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/45 font-semibold mb-3">
            Integrations
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {integrations.map((i) => (
              <button
                key={i.id}
                type="button"
                onClick={() => toggleIntegration(i.id)}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md border text-left transition-colors ${
                  i.connected
                    ? 'border-[#22c55e]/40 bg-[#22c55e]/10'
                    : 'border-white/10 bg-[#0A0A0A] hover:border-white/30'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">{i.name}</p>
                  <p className="text-[11px] text-white/45 truncate">{i.description}</p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0 ${
                    i.connected ? 'bg-[#22c55e] text-[#0C0C0C]' : 'bg-white/10 text-white/55'
                  }`}
                >
                  {i.connected ? 'Connected' : 'Connect'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="lg:col-span-2 flex items-center justify-between gap-3">
          <p className="text-[11px] text-white/40">Changes save to this session only — mock data.</p>
          <button
            type="submit"
            className={`inline-flex items-center gap-2 font-semibold px-5 py-2 rounded-md text-sm transition-colors ${
              saved
                ? 'bg-[#22c55e] text-[#0C0C0C]'
                : 'bg-[#FFD84D] hover:bg-white text-[#0C0C0C]'
            }`}
          >
            {saved ? '✓ Saved' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Toggle({
  label,
  sublabel,
  checked,
  onChange,
}: {
  label: string
  sublabel: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className="flex items-start justify-between gap-3 text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
    >
      <div>
        <p className="text-sm text-white font-medium leading-tight">{label}</p>
        <p className="text-[11px] text-white/45 leading-tight mt-0.5">{sublabel}</p>
      </div>
      <span
        className={`relative inline-flex shrink-0 mt-0.5 w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-[#FFD84D]' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar icons
// ─────────────────────────────────────────────────────────────────────────────

function DashboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="5" height="6" rx="1" />
      <rect x="9" y="2" width="5" height="3.5" rx="1" />
      <rect x="9" y="7" width="5" height="7" rx="1" />
      <rect x="2" y="10" width="5" height="4" rx="1" />
    </svg>
  )
}
function LeadsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="2.5" />
      <path d="M3 14c0-3 2.5-5 5-5s5 2 5 5" />
    </svg>
  )
}
function PipelineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="3" height="12" rx="0.5" />
      <rect x="6.5" y="2" width="3" height="9" rx="0.5" />
      <rect x="11" y="2" width="3" height="6" rx="0.5" />
    </svg>
  )
}
function ReportsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 L6 8 L9 11 L14 4" />
      <path d="M10 4 H14 V8" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2" />
      <path d="M8 1 L8 3 M8 13 L8 15 M1 8 L3 8 M13 8 L15 8 M3 3 L4.5 4.5 M11.5 11.5 L13 13 M3 13 L4.5 11.5 M11.5 4.5 L13 3" />
    </svg>
  )
}
