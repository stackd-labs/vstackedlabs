'use client'

import { useId, useState, type ReactNode } from 'react'

/**
 * A disclosure section. Used to keep long pages short by default: the header
 * stays informative when collapsed so nothing is hidden behind a shrug.
 *
 * Controlled when `open`/`onToggle` are passed (so a parent can drive
 * expand-all), uncontrolled otherwise.
 */
export default function Collapse({
  header,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  className = '',
  tone = 'cream',
}: {
  /** Rendered inside the trigger button, to the left of the chevron. */
  header: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (next: boolean) => void
  className?: string
  tone?: 'cream' | 'white'
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen
  const panelId = useId()

  const toggle = () => {
    const next = !open
    if (!isControlled) setUncontrolledOpen(next)
    onToggle?.(next)
  }

  return (
    <div
      className={`rounded-2xl border border-[#E2DED8] overflow-hidden ${
        tone === 'cream' ? 'bg-[#F6F4EF]' : 'bg-white'
      } ${className}`}
    >
      {/*
       * globals.css puts Anton on every h1-h6, and that rule is unlayered so
       * it beats a Tailwind font utility placed on the h3 itself. Anton also
       * ships at weight 400 only, so header content asking for a bold weight
       * gets synthetically smeared and turns hard to read at body sizes.
       *
       * Resetting on the button works because a rule on the child outranks
       * inheritance from the h3. Headers that actually want Anton set it on
       * their own content.
       */}
      <h3>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center gap-4 text-left px-5 py-5 min-h-[44px] hover:bg-[#0C0C0C]/[0.03] transition-colors font-[family-name:var(--font-instrument-sans)] font-normal"
        >
          <span className="flex-1 min-w-0">{header}</span>
          <span
            className={`shrink-0 w-8 h-8 rounded-full border border-[#E2DED8] bg-white flex items-center justify-center transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 4.5L6 8l3.5-3.5"
                stroke="#0C0C0C"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      {open && (
        <div id={panelId} className="px-5 pb-6 pt-1">
          {children}
        </div>
      )}
    </div>
  )
}
