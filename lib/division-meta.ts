import type { Metadata } from 'next'
import { type Division } from './divisions'

const BASE = 'https://www.stackdstudiosai.com'

/** Page <head> for a division page, derived from the division data. */
export function divisionMetadata(division: Division): Metadata {
  const title = `${division.eyebrow} — ${division.promise}`
  const description = `${division.headline} ${division.oneLiner} For ${division.customer.toLowerCase()}.`
  const url = `${BASE}/${division.slug}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  }
}

/** schema.org ItemList of the division's offers. */
export function divisionJsonLd(division: Division) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${division.eyebrow} — Stackd Studios`,
    description: division.oneLiner,
    url: `${BASE}/${division.slug}`,
    itemListElement: division.offers.map((offer, i) => ({
      '@type': 'Service',
      position: i + 1,
      name: offer.name,
      description: offer.pitch,
      category: division.eyebrow,
      provider: { '@type': 'Organization', name: 'Stackd Studios' },
    })),
  }
}
