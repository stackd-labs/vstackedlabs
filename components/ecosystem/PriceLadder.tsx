'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { DIVISIONS, type Division, type DivisionOffer } from '@/lib/divisions'
import { parsePrice } from '@/lib/offer-price'

/**
 * The price ladder: every offer plotted on a log price axis, one row per
 * division.
 *
 * Form: a strip (dot) plot, because the reader's job is "where do our prices
 * sit and where are the gaps", not "how do quantities compare". Bars would
 * imply these are magnitudes that sum, which they are not.
 *
 * Identity is carried by ROW POSITION and the row's text label, never by the
 * mark's color. All marks share one ink hue. The division's brand color appears
 * only as a swatch beside its name, so the chart never depends on telling six
 * hues apart (the brand set fails CVD adjacency: Rescue orange and Build gold
 * are ΔE 4.9 under protanopia).
 *
 * One-off and monthly prices are split into two charts rather than sharing an
 * axis, because $18,000/mo and $997 once are not the same measure.
 */

const INK = '#0C0C0C'
const SURFACE = '#F6F4EF'
const MUTED = '#888580'
const GRID = '#E2DED8'

type Kind = 'oneTime' | 'monthly'

interface Point {
  offer: DivisionOffer
  division: Division
  value: number
  /** Top of a stated range, e.g. the $3,000 in "$1,800 to $3,000". */
  upTo: number | null
}

/** Log-scaled position, 0 to 1, across the chart's value domain. */
function logPos(value: number, min: number, max: number): number {
  const lo = Math.log10(min)
  const hi = Math.log10(max)
  if (hi === lo) return 0.5
  return (Math.log10(value) - lo) / (hi - lo)
}

/** Powers of ten inside the domain, for axis ticks. */
function decadeTicks(min: number, max: number): number[] {
  const ticks: number[] = []
  const start = Math.floor(Math.log10(min))
  const end = Math.ceil(Math.log10(max))
  for (let p = start; p <= end; p++) {
    const v = 10 ** p
    if (v >= min && v <= max) ticks.push(v)
  }
  return ticks
}

function money(n: number): string {
  if (n >= 1000) {
    const k = n / 1000
    return `$${k % 1 === 0 ? k : k.toFixed(1)}k`
  }
  return `$${n}`
}

function collect(kind: Kind): Point[] {
  const points: Point[] = []
  for (const division of DIVISIONS) {
    for (const offer of division.offers) {
      const p = parsePrice(offer.price)
      const value = kind === 'oneTime' ? p.oneTime : p.monthly
      if (value === null) continue
      points.push({
        offer,
        division,
        value,
        upTo: kind === 'oneTime' ? p.upTo : null,
      })
    }
  }
  return points
}

function Chart({
  kind,
  title,
  note,
}: {
  kind: Kind
  title: string
  note: string
}) {
  const [hovered, setHovered] = useState<string | null>(null)

  const { points, min, max, ticks } = useMemo(() => {
    const pts = collect(kind)
    const values = pts.flatMap((p) => [p.value, ...(p.upTo ? [p.upTo] : [])])
    // Pad the domain by a fifth of a decade so end marks are not on the frame.
    const lo = Math.min(...values) / 1.6
    const hi = Math.max(...values) * 1.6
    return { points: pts, min: lo, max: hi, ticks: decadeTicks(lo, hi) }
  }, [kind])

  const rows = DIVISIONS.map((d) => ({
    division: d,
    points: points
      .filter((p) => p.division.slug === d.slug)
      .sort((a, b) => a.value - b.value),
  })).filter((r) => r.points.length > 0)

  return (
    <div className="mb-14 last:mb-0">
      <h3 className="text-lg text-[#0C0C0C] leading-tight mb-1">{title}</h3>
      <p className="text-[#888580] text-sm mb-7">{note}</p>

      <div className="rounded-2xl border border-[#E2DED8] bg-white overflow-hidden">
        {/* Axis header */}
        <div className="flex border-b border-[#E2DED8]">
          <div className="w-[132px] sm:w-[168px] shrink-0 border-r border-[#E2DED8]" />
          <div className="relative flex-1 h-9">
            {ticks.map((t) => (
              <span
                key={t}
                className="absolute top-2.5 text-[10px] font-medium tabular-nums -translate-x-1/2 whitespace-nowrap"
                style={{ left: `${logPos(t, min, max) * 100}%`, color: MUTED }}
              >
                {money(t)}
              </span>
            ))}
          </div>
        </div>

        {rows.map((row) => (
          <div
            key={row.division.slug}
            className="flex border-b border-[#E2DED8] last:border-b-0"
          >
            {/* Row label carries identity */}
            <div className="w-[132px] sm:w-[168px] shrink-0 border-r border-[#E2DED8] px-3 py-4 flex items-start gap-2">
              <span
                className="mt-[5px] w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: row.division.accent }}
                aria-hidden="true"
              />
              <Link
                href={`/${row.division.slug}`}
                className="text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.08em] leading-snug hover:underline decoration-2 underline-offset-2"
              >
                {row.division.shortName}
                {/* "plotted", not "offers" — a division's other offers may be
                    billed differently and live on the other chart. */}
                <span className="block text-[10px] font-medium normal-case tracking-normal text-[#888580] mt-0.5">
                  {row.points.length} of {row.division.offers.length} plotted
                </span>
              </Link>
            </div>

            {/* Plot area */}
            <div className="relative flex-1 h-[76px]">
              {/* Recessive decade gridlines */}
              {ticks.map((t) => (
                <span
                  key={t}
                  className="absolute top-0 bottom-0 w-px"
                  style={{
                    left: `${logPos(t, min, max) * 100}%`,
                    background: GRID,
                  }}
                  aria-hidden="true"
                />
              ))}

              {row.points.map((p, i) => {
                const id = `${p.division.slug}-${p.offer.slug}`
                const x = logPos(p.value, min, max) * 100
                const isHovered = hovered === id
                // Stagger vertically so identical prices do not overlap.
                const y = 38 + (i % 2 === 0 ? -11 : 11)

                return (
                  <span key={id}>
                    {/* Range bar for "$1,800 to $3,000" style prices */}
                    {p.upTo && (
                      <span
                        className="absolute h-[3px] rounded-full"
                        style={{
                          left: `${x}%`,
                          width: `${logPos(p.upTo, min, max) * 100 - x}%`,
                          top: y - 1.5,
                          background: INK,
                          opacity: 0.35,
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <button
                      type="button"
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      aria-label={`${p.offer.name}, ${p.offer.price}, ${p.division.eyebrow}`}
                      // Hit target is larger than the mark.
                      className="absolute w-7 h-7 -ml-3.5 -mt-3.5 flex items-center justify-center rounded-full"
                      style={{ left: `${x}%`, top: y }}
                    >
                      <span
                        className="block rounded-full transition-transform duration-150"
                        style={{
                          width: isHovered ? 14 : 10,
                          height: isHovered ? 14 : 10,
                          // Placeholder prices are hollow: shape, not color.
                          background: p.offer.proposed ? SURFACE : INK,
                          border: p.offer.proposed
                            ? `2.5px solid ${INK}`
                            : `2px solid ${SURFACE}`,
                        }}
                      />
                    </button>

                    {isHovered && (
                      <span
                        role="tooltip"
                        className="absolute z-20 pointer-events-none rounded-lg bg-[#0C0C0C] px-3 py-2 shadow-lg whitespace-nowrap"
                        style={{
                          left: `${x}%`,
                          top: y + 16,
                          transform:
                            x > 65
                              ? 'translateX(-100%)'
                              : x < 12
                                ? 'translateX(0)'
                                : 'translateX(-50%)',
                        }}
                      >
                        <span className="block text-white text-xs font-semibold leading-tight">
                          {p.offer.name}
                        </span>
                        <span className="block text-[#FFD84D] text-xs font-bold tabular-nums mt-0.5">
                          {p.offer.price}
                        </span>
                        <span className="block text-white/50 text-[10px] mt-0.5">
                          {p.offer.timing}
                          {p.offer.proposed ? ' · placeholder price' : ''}
                        </span>
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PriceLadder() {
  const hourly = useMemo(
    () =>
      DIVISIONS.flatMap((d) =>
        d.offers
          .filter((o) => parsePrice(o.price).hourly !== null)
          .map((o) => ({ offer: o, division: d })),
      ),
    [],
  )

  return (
    <div>
      {/* Legend: only two mark states exist, and both are shape, not color. */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-9">
        <span className="inline-flex items-center gap-2 text-xs text-[#888580]">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: INK }}
            aria-hidden="true"
          />
          Published price
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-[#888580]">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: SURFACE, border: `2.5px solid ${INK}` }}
            aria-hidden="true"
          />
          Placeholder awaiting review
        </span>
        <span className="inline-flex items-center gap-2 text-xs text-[#888580]">
          <span
            className="w-6 h-[3px] rounded-full"
            style={{ background: INK, opacity: 0.35 }}
            aria-hidden="true"
          />
          Stated range
        </span>
      </div>

      <Chart
        kind="oneTime"
        title="One-off prices"
        note="Log scale, so each gridline is ten times the last. Hover any dot for the offer."
      />

      <Chart
        kind="monthly"
        title="Monthly prices"
        note="Recurring commitments, plotted separately because a monthly rate is not comparable to a one-off fee."
      />

      {hourly.length > 0 && (
        <div className="rounded-2xl border border-[#E2DED8] bg-white p-6">
          <p className="text-[#888580] text-xs font-bold uppercase tracking-[0.12em] mb-4">
            Billed hourly
          </p>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {hourly.map(({ offer, division }) => (
              <div key={offer.slug}>
                <p className="text-2xl font-bold text-[#0C0C0C] tabular-nums font-[family-name:var(--font-instrument-sans)]">
                  {offer.price}
                </p>
                <p className="text-[#0C0C0C] text-sm font-semibold mt-0.5">
                  {offer.name}
                </p>
                <p className="text-[#888580] text-xs mt-0.5">
                  {division.eyebrow}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[#888580] text-xs mt-5 leading-relaxed">
            Too few to chart, so they are stated plainly. Application
            Modernization is scoped per engagement and has no number to plot.
          </p>
        </div>
      )}
    </div>
  )
}
