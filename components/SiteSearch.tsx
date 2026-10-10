'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { searchSite, type SearchEntry } from '@/lib/site-search'

// "Ask Stacka" site search: replaced the AI chat assistant (2026-10-08). Runs entirely in the browser
// against lib/site-search.ts; nothing typed here is sent anywhere.

const SUGGESTIONS: { match: RegExp; items: string[] }[] = [
  { match: /^\/services/, items: ['How does pricing work?', 'App Diagnostic', 'I need developers for my team'] },
  { match: /^\/labs/, items: ['Business Brain', 'What games are you building?', 'Join the waitlist'] },
  { match: /^\/careers/, items: ['Do I have to be full time?', 'Game developer', 'Affiliate program'] },
  { match: /^\/about/, items: ['How do you use AI?', 'Where are you located?', 'What tech do you use?'] },
  { match: /^\/(privacy|terms)/, items: ['Refund policy', 'Do I own the code?', 'How is my data used?'] },
]
const DEFAULT_SUGGESTIONS = ['How does pricing work?', 'My app is broken', 'Are you hiring?']

export default function SiteSearch() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => searchSite(query, 6), [query])
  const search = (q: string) => {
    setQuery(q)
    setActive(0)
  }
  const suggestions = (SUGGESTIONS.find((s) => s.match.test(pathname)) ?? { items: DEFAULT_SUGGESTIONS }).items

  // "/" or Ctrl/Cmd+K opens; Esc closes.
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  const go = useCallback(
    (entry: SearchEntry) => {
      setOpen(false)
      const { href } = entry
      if (/^https?:\/\//.test(href)) {
        window.open(href, '_blank', 'noopener,noreferrer')
        return
      }
      const [path, hash] = href.split('#')
      const target = path || '/'
      if (target === pathname) {
        // Same page: set the hash so the page's own listeners land on it (and open a role, etc.).
        if (hash) {
          if (window.location.hash === `#${hash}`) window.dispatchEvent(new HashChangeEvent('hashchange'))
          else window.location.hash = hash
        } else window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        router.push(href, { scroll: !hash })
      }
    },
    [pathname, router],
  )

  function onInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(results[active])
    }
  }

  const contact: SearchEntry = { id: 'contact', title: '', where: '', snippet: '', href: '/#contact' }

  return (
    <div className="t-dark">
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Ask Stacka, search the site"
          className="fixed z-[70] right-4 sm:right-6 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] sm:bottom-6 flex items-center gap-2.5 bg-[var(--t-neon)] text-[#07080A] font-mono-t text-[12.5px] font-bold uppercase tracking-[0.1em] pl-3.5 pr-4 py-3 rounded-full shadow-[0_10px_40px_-6px_rgba(255,216,77,0.55)] hover:shadow-[0_10px_50px_-4px_rgba(255,216,77,0.8)] transition-shadow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          Ask Stacka
          <kbd className="hidden md:inline-block font-mono-t text-[10px] border border-[#07080A]/30 rounded px-1.5 py-0.5">/</kbd>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Ask Stacka"
          className="fixed z-[70] right-4 sm:right-6 bottom-[calc(env(safe-area-inset-bottom,0px)+16px)] sm:bottom-6 w-[min(440px,calc(100vw-2rem))] max-h-[min(640px,calc(100dvh-6rem))] flex flex-col rounded-2xl border border-[var(--t-line-hi)] bg-[#0A0C10]/95 backdrop-blur-xl shadow-[0_30px_80px_-10px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,216,77,0.08)] overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--t-line)] bg-[var(--t-surface)] shrink-0">
            <span className="relative w-9 h-9 shrink-0 rounded-full bg-[#12151B] border border-[var(--t-line-hi)] overflow-hidden">
              <Image src="/stacka-peace.png" alt="" width={791} height={1200} className="absolute left-1/2 -translate-x-1/2 top-0.5 w-[34px] max-w-none" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-[var(--t-text)] leading-tight">Ask Stacka</p>
              <p className="font-mono-t text-[10.5px] uppercase tracking-[0.14em] text-[var(--t-dim)]">Searches the whole site</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close search"
              className="font-mono-t text-[11px] uppercase tracking-[0.12em] text-[var(--t-muted)] hover:text-[var(--t-text)] border border-[var(--t-line-hi)] rounded-md px-2.5 py-1.5"
            >
              Esc
            </button>
          </div>

          <div className="px-4 pt-4 pb-3 shrink-0">
            <label htmlFor="site-search" className="sr-only">
              Ask Stacka a question
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--t-line-hi)] focus-within:border-[var(--t-neon)] bg-[#07080A] px-3 h-12 transition-colors">
              <span className="font-mono-t text-[var(--t-neon)]" aria-hidden="true">
                &gt;
              </span>
              <input
                ref={inputRef}
                id="site-search"
                value={query}
                onChange={(e) => search(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Pricing, rescue, careers, Labs..."
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="site-search-results"
                aria-activedescendant={results.length ? `ssr-${active}` : undefined}
                className="flex-1 min-w-0 bg-transparent font-mono-t text-[14px] text-[var(--t-text)] placeholder:text-[var(--t-dim)] caret-[var(--t-neon)] outline-none !shadow-none"
              />
              {query && (
                <button onClick={() => search('')} className="font-mono-t text-[11px] text-[var(--t-dim)] hover:text-[var(--t-text)]" aria-label="Clear search">
                  clear
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-2">
            {!query.trim() && (
              <div className="px-2 pb-3">
                <p className="font-mono-t text-[10.5px] uppercase tracking-[0.16em] text-[var(--t-dim)] mb-2.5">Try</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => search(s)}
                      className="text-[13px] text-[var(--t-muted)] hover:text-[var(--t-text)] border border-[var(--t-line-hi)] hover:border-[var(--t-neon)] rounded-full px-3 py-1.5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && results.length > 0 && (
              <ul id="site-search-results" role="listbox" className="flex flex-col gap-1">
                {results.map((r, i) => (
                  <li key={r.id} id={`ssr-${i}`} role="option" aria-selected={i === active}>
                    <button
                      onClick={() => go(r)}
                      onMouseEnter={() => setActive(i)}
                      className={`group w-full text-left rounded-xl px-3 py-3 border transition-colors ${
                        i === active ? 'bg-[var(--t-raised)] border-[var(--t-line-hi)]' : 'border-transparent'
                      }`}
                    >
                      <p className="font-mono-t text-[10px] uppercase tracking-[0.14em] text-[var(--t-dim)] mb-1 truncate">{r.where}</p>
                      <p className={`text-[15px] font-semibold leading-snug mb-1 ${i === active ? 'text-[var(--t-neon)]' : 'text-[var(--t-text)]'}`}>
                        {r.title}
                      </p>
                      <p className="text-[13px] text-[var(--t-muted)] leading-snug line-clamp-3">{r.snippet}</p>
                      <p className={`mt-1.5 font-mono-t text-[11px] ${i === active ? 'text-[var(--t-neon)]' : 'text-[var(--t-dim)]'}`}>
                        {/^https?:/.test(r.href) ? 'Open' : 'Go there'} &rarr;
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.trim() && results.length === 0 && (
              <div className="px-3 py-4">
                <p className="text-[15px] text-[var(--t-text)] mb-1">Nothing on the site matches that yet.</p>
                <p className="text-[13.5px] text-[var(--t-muted)] mb-4">Ask us directly and a real person will reply within one business day.</p>
                <button
                  onClick={() => go(contact)}
                  className="font-mono-t text-[12px] font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-4 py-2.5 rounded-md"
                >
                  Go to the contact form
                </button>
                <p className="mt-3 font-mono-t text-[11.5px] text-[var(--t-dim)]">or email Chanel@stackdstudiosai.com</p>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-[var(--t-line)] flex items-center justify-between gap-3 font-mono-t text-[10.5px] text-[var(--t-dim)] shrink-0">
            <span>Searches stay in your browser.</span>
            <span className="hidden sm:inline">&uarr; &darr; to move, Enter to open</span>
          </div>
        </div>
      )}
    </div>
  )
}
