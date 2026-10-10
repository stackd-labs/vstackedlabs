'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

/**
 * A link to a page (not a homepage section). Next.js already lands at the top when the
 * route changes, but clicking the link for the page you are already on does nothing, so
 * this scrolls back to the top in that case. Section links (`/#divisions`) use plain Link.
 */
export default function PageLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e)
        if (pathname === href) {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      {...rest}
    />
  )
}
