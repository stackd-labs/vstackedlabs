'use client'

import Icon from '@/components/Icon'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { DIVISIONS, allOffers } from '@/lib/divisions'
import { sortValue } from '@/lib/offer-price'
import Price from './Price'

/**
 * Every offer as one scannable table. This is the compact answer to "too many
 * cards": 27 rows of four columns fits on roughly one screen, where 27 cards
 * does not.
 *
 * Doubles as the table view the price ladder needs for accessibility.
 */

type SortKey = 'division' | 'name' | 'price'

export default function OfferTable() {
  const [filter, setFilter] = useState<string>('all')
  const [sort, setSort] = useState<SortKey>('division')

  const rows = useMemo(() => {
    let list = allOffers()
    if (filter !== 'all') {
      list = list.filter((o) => o.division.slug === filter)
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'price') {
      list = [...list].sort((a, b) => sortValue(a.price) - sortValue(b.price))
    }
    return list
  }, [filter, sort])

  return (
    <div>
      {/* Filters, in one row above the table */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          type="button"
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
          className={`text-xs font-bold uppercase tracking-[0.1em] px-3.5 py-2 rounded-full border transition-colors ${
            filter === 'all'
              ? 'bg-[#0C0C0C] text-white border-[#0C0C0C]'
              : 'bg-white text-[#888580] border-[#E2DED8] hover:text-[#0C0C0C]'
          }`}
        >
          All {allOffers().length}
        </button>
        {DIVISIONS.map((d) => {
          const active = filter === d.slug
          return (
            <button
              key={d.slug}
              type="button"
              onClick={() => setFilter(d.slug)}
              aria-pressed={active}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.1em] px-3.5 py-2 rounded-full border transition-colors"
              style={
                active
                  ? {
                      backgroundColor: d.accent,
                      color: '#FFFFFF',
                      borderColor: d.accent,
                    }
                  : {
                      backgroundColor: '#FFFFFF',
                      color: d.accent,
                      borderColor: `${d.accent}44`,
                    }
              }
            >
              <Icon name={d.icon} size={14} strokeWidth={1.9} />
              {d.shortName}
              <span className="opacity-60 tabular-nums">
                {d.offers.length}
              </span>
            </button>
          )
        })}

        <label className="ml-auto flex items-center gap-2 text-xs text-[#888580]">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-white border border-[#E2DED8] rounded-lg px-2.5 py-1.5 text-xs text-[#0C0C0C] min-h-[36px]"
          >
            <option value="division">By division</option>
            <option value="price">Cheapest first</option>
            <option value="name">A to Z</option>
          </select>
        </label>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#E2DED8] bg-white">
        <table className="w-full min-w-[820px] border-collapse">
          <caption className="sr-only">
            Every Stackd offer with its division, price, turnaround, and what it
            is
          </caption>
          <thead>
            <tr className="bg-[#F6F4EF]">
              <th
                scope="col"
                className="text-left py-3.5 px-5 text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] w-[15%]"
              >
                Division
              </th>
              <th
                scope="col"
                className="text-left py-3.5 px-5 text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] w-[24%]"
              >
                Offer
              </th>
              <th
                scope="col"
                className="text-left py-3.5 px-5 text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] w-[14%]"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-left py-3.5 px-5 text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em] w-[14%]"
              >
                Turnaround
              </th>
              <th
                scope="col"
                className="text-left py-3.5 px-5 text-[#0C0C0C] text-[10px] font-bold uppercase tracking-[0.12em]"
              >
                What it is
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((o) => (
              <tr
                key={`${o.division.slug}-${o.slug}`}
                className="border-t border-[#E2DED8] hover:bg-[#F6F4EF]/60 transition-colors"
              >
                <td className="py-4 px-5 align-top">
                  <Link
                    href={`/${o.division.slug}`}
                    className="inline-flex items-center gap-2 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: o.division.accent }}
                      aria-hidden="true"
                    />
                    <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0C0C0C] group-hover:underline decoration-2 underline-offset-2">
                      {o.division.shortName}
                    </span>
                  </Link>
                </td>
                <th scope="row" className="text-left py-4 px-5 align-top">
                  <Link
                    href={`/${o.division.slug}#${o.slug}`}
                    className="text-[#0C0C0C] text-sm font-semibold leading-snug hover:underline decoration-[#FFD84D] decoration-2 underline-offset-2"
                  >
                    {o.name}
                  </Link>
                  {o.popular && (
                    <span className="ml-2 bg-[#FFD84D] text-[#0C0C0C] text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full align-middle">
                      Popular
                    </span>
                  )}
                </th>
                <td className="py-4 px-5 align-top">
                  <Price
                    value={o.price}
                    proposed={o.proposed}
                    className="text-[#0C0C0C] text-sm font-bold tabular-nums font-[family-name:var(--font-instrument-sans)]"
                  />
                </td>
                <td className="py-4 px-5 align-top text-[#888580] text-xs">
                  {o.timing}
                </td>
                <td className="py-4 px-5 align-top text-[#3F3F3F] text-xs leading-relaxed">
                  {o.pitch}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden flex flex-col gap-2.5">
        {rows.map((o) => (
          <Link
            key={`${o.division.slug}-${o.slug}`}
            href={`/${o.division.slug}#${o.slug}`}
            className="rounded-xl border border-[#E2DED8] bg-white p-4 flex flex-col gap-1.5"
            style={{ borderLeftWidth: 3, borderLeftColor: o.division.accent }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#888580]">
              {o.division.shortName}
            </span>
            <span className="text-[#0C0C0C] text-sm font-semibold leading-snug">
              {o.name}
            </span>
            <span className="flex items-baseline gap-2">
              <Price
                value={o.price}
                proposed={o.proposed}
                className="text-[#0C0C0C] text-base font-bold tabular-nums font-[family-name:var(--font-instrument-sans)]"
              />
              <span className="text-[#888580] text-xs">{o.timing}</span>
            </span>
            <span className="text-[#3F3F3F] text-xs leading-relaxed">
              {o.pitch}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-[#888580] text-xs">
        {rows.length} of {allOffers().length} offers shown.
      </p>
    </div>
  )
}
