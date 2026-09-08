'use client'

import { useEffect } from 'react'
import { DIVISIONS, type DivisionSlug } from '@/lib/divisions'

/**
 * Collapsed-by-default sections break deep links: /pricing#teams would land on
 * a closed row, and /pricing#team-enablement would find no element at all.
 *
 * This resolves a hash to the division that owns it (either the division's own
 * slug, or the slug of any offer inside it), opens that division, and then
 * scrolls to the target once it has rendered.
 *
 * Also listens for later hash changes, so in-page jump links work too.
 */
export function useHashOpen(
  open: (slug: DivisionSlug) => void,
  /**
   * Old anchor -> current offer slug, for links published before the
   * reposition (e.g. `#quick-setup` -> `build-sprint`).
   */
  aliases: Record<string, string> = {},
) {
  useEffect(() => {
    const resolve = (raw: string): { slug: DivisionSlug; target: string } | null => {
      const hash = raw.replace(/^#/, '')
      if (!hash) return null

      const byDivision = DIVISIONS.find((d) => d.slug === hash)
      if (byDivision) return { slug: byDivision.slug, target: hash }

      // Resolve a retired anchor to the offer it became, then scroll to the
      // offer itself rather than the invisible legacy marker.
      const offerSlug = aliases[hash] ?? hash

      const owner = DIVISIONS.find((d) =>
        d.offers.some((o) => o.slug === offerSlug),
      )
      if (owner) return { slug: owner.slug, target: offerSlug }

      return null
    }

    let timer: ReturnType<typeof setTimeout> | null = null

    /**
     * The target element does not exist until the panel has opened and
     * painted, and on first load the hero's entrance animation can swallow a
     * smooth scroll issued too early. So poll briefly rather than guessing at
     * a frame count, and give up quietly instead of looping.
     */
    const scrollWhenReady = (id: string, attemptsLeft: number) => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attemptsLeft <= 0) return
      timer = setTimeout(() => scrollWhenReady(id, attemptsLeft - 1), 60)
    }

    const apply = () => {
      const found = resolve(window.location.hash)
      if (!found) return
      open(found.slug)
      if (timer) clearTimeout(timer)
      // ~1.2s of attempts, which covers the panel mount and the hero animation.
      timer = setTimeout(() => scrollWhenReady(found.target, 20), 80)
    }

    apply()
    window.addEventListener('hashchange', apply)
    return () => {
      window.removeEventListener('hashchange', apply)
      if (timer) clearTimeout(timer)
    }
    // `open` is a stable setter from the parent; re-subscribing on each render
    // would re-scroll the page on every state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
