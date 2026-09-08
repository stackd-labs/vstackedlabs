'use client'

import Icon from '@/components/Icon'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DIVISIONS } from '@/lib/divisions'
import Price from './Price'

/**
 * Stackd in one screen: division, promise, customer, entry price.
 * A real table on desktop, stacked rows on mobile.
 */
export default function OneScreenTable() {
  return (
    <section
      id="one-screen"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="one-screen-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            One Screen
          </p>
          <h2
            id="one-screen-heading"
            className="text-[clamp(30px,4.5vw,52px)] text-[#0C0C0C] leading-[1.05]"
          >
            The whole company, on one screen.
          </h2>
        </motion.div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-[#E2DED8]">
          <table className="w-full min-w-[720px] border-collapse">
            <caption className="sr-only">
              Stackd divisions, what each one promises, who it serves, and the
              entry price
            </caption>
            <thead>
              <tr className="bg-[#F6F4EF]">
                <th scope="col" className="text-left py-4 px-5 text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.12em]">
                  Division
                </th>
                <th scope="col" className="text-left py-4 px-5 text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.12em]">
                  Promise
                </th>
                <th scope="col" className="text-left py-4 px-5 text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.12em]">
                  Customer
                </th>
                <th scope="col" className="text-left py-4 px-5 text-[#0C0C0C] text-xs font-bold uppercase tracking-[0.12em]">
                  Starts at
                </th>
              </tr>
            </thead>
            <tbody>
              {DIVISIONS.map((d) => (
                <tr
                  key={d.slug}
                  className="border-t border-[#E2DED8] hover:bg-[#F6F4EF]/60 transition-colors"
                >
                  <th scope="row" className="text-left py-5 px-5 align-top">
                    <Link href={`/${d.slug}`} className="group inline-flex items-center gap-2.5">
                      <span style={{ color: d.accent }}>
                        <Icon name={d.icon} size={20} />
                      </span>
                      <span
                        className="text-sm font-bold uppercase tracking-[0.06em] group-hover:underline decoration-2 underline-offset-2"
                        style={{ color: d.accent }}
                      >
                        {d.eyebrow}
                      </span>
                    </Link>
                  </th>
                  <td className="py-5 px-5 text-[#0C0C0C] text-sm align-top">
                    {d.promise}
                  </td>
                  <td className="py-5 px-5 text-[#3F3F3F] text-sm align-top">
                    {d.customer}
                  </td>
                  <td className="py-5 px-5 text-sm align-top">
                    <Price
                      value={d.offers[0].price}
                      proposed={d.offers[0].proposed}
                      className="text-[#0C0C0C] font-semibold"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile stack */}
        <div className="md:hidden flex flex-col gap-3">
          {DIVISIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/${d.slug}`}
              className="rounded-2xl border border-[#E2DED8] p-5 flex flex-col gap-2"
              style={{ borderLeftWidth: 4, borderLeftColor: d.accent }}
            >
              <div className="flex items-center gap-2">
                <span style={{ color: d.accent }}>
                  <Icon name={d.icon} size={18} />
                </span>
                <span
                  className="text-xs font-bold uppercase tracking-[0.1em]"
                  style={{ color: d.accent }}
                >
                  {d.eyebrow}
                </span>
              </div>
              <p className="text-[#0C0C0C] text-base leading-snug font-semibold">
                {d.promise}
              </p>
              <p className="text-[#888580] text-sm">{d.customer}</p>
              <p className="text-[#888580] text-sm">
                Starts at{' '}
                <Price
                  value={d.offers[0].price}
                  proposed={d.offers[0].proposed}
                  className="text-[#0C0C0C] font-semibold"
                />
              </p>
            </Link>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-[#888580] text-sm max-w-2xl"
        >
          Full pricing for every offer inside every division is on the{' '}
          <Link href="/pricing" className="text-[#0C0C0C] font-semibold underline decoration-[#FFD84D] decoration-2 underline-offset-2">
            pricing page
          </Link>
          .
        </motion.p>
      </div>
    </section>
  )
}
