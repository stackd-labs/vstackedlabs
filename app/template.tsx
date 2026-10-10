'use client'

import { useEffect } from 'react'
import SiteSearch from '@/components/SiteSearch'
import { HashLander } from '@/components/tech/ContactLink'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // New page: start at the top, unless the address points at a section (HashLander lands there).
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {children}
      <SiteSearch />
      <HashLander />
    </>
  )
}
