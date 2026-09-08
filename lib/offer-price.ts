/**
 * Parses the human-written `price` strings in lib/divisions.ts into numbers so
 * offers can be plotted and sorted.
 *
 * The price strings stay the source of truth because they are what the site
 * shows. Nothing here is displayed; it only drives charts and ordering, so a
 * string this cannot parse degrades to "no number" rather than a wrong one.
 *
 * Shapes it handles:
 *   "$497"                    -> oneTime 497
 *   "From $2,400"             -> oneTime 2400, from
 *   "$1,800 to $3,000"        -> oneTime 1800, upTo 3000
 *   "$1,500/mo"               -> monthly 1500
 *   "From $18,000/mo"         -> monthly 18000, from
 *   "From $500 + $149/mo"     -> oneTime 500 AND monthly 149
 *   "$150/hr"                 -> hourly 150
 *   "Custom scope"            -> nothing set
 */
export interface ParsedPrice {
  /** Up-front cost in dollars, if there is one. */
  oneTime: number | null
  /** Recurring monthly cost in dollars, if there is one. */
  monthly: number | null
  /** Hourly rate in dollars, if the offer is billed by the hour. */
  hourly: number | null
  /** Top of a stated range, e.g. the 3000 in "$1,800 to $3,000". */
  upTo: number | null
  /** The price string began with "From", so it is a floor. */
  from: boolean
  /** No number could be read at all, e.g. "Custom scope". */
  custom: boolean
}

const EMPTY: ParsedPrice = {
  oneTime: null,
  monthly: null,
  hourly: null,
  upTo: null,
  from: false,
  custom: true,
}

/** Every "$1,234" style amount in the string, paired with its trailing unit. */
function amounts(price: string): Array<{ value: number; unit: string }> {
  const out: Array<{ value: number; unit: string }> = []
  const re = /\$\s*([\d,]+(?:\.\d+)?)\s*(\/mo|\/hr)?/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(price)) !== null) {
    const value = Number(m[1].replace(/,/g, ''))
    if (!Number.isFinite(value)) continue
    out.push({ value, unit: (m[2] ?? '').toLowerCase() })
  }
  return out
}

export function parsePrice(price: string): ParsedPrice {
  const found = amounts(price)
  if (found.length === 0) return EMPTY

  const result: ParsedPrice = {
    oneTime: null,
    monthly: null,
    hourly: null,
    upTo: null,
    from: /^\s*from\b/i.test(price),
    custom: false,
  }

  for (const { value, unit } of found) {
    if (unit === '/mo') {
      if (result.monthly === null) result.monthly = value
    } else if (unit === '/hr') {
      if (result.hourly === null) result.hourly = value
    } else if (result.oneTime === null) {
      result.oneTime = value
    } else if (result.upTo === null) {
      // A second bare amount is the top of a range ("$1,800 to $3,000").
      result.upTo = value
    }
  }

  return result
}

/**
 * A single number for sorting an offer cheapest-first. Monthly and hourly
 * prices are NOT comparable to one-off prices, so callers should only sort
 * within one billing kind; this is the tiebreaker inside a kind.
 */
export function sortValue(price: string): number {
  const p = parsePrice(price)
  return p.oneTime ?? p.monthly ?? p.hourly ?? Number.POSITIVE_INFINITY
}

/**
 * "from $97" summary for a collapsed section header.
 *
 * Deliberately the floor only, not a low-to-high range: a division mixes
 * one-off, monthly and hourly prices, so "$97 to $297" would silently compare
 * a one-time fee against a monthly rate. The unit suffix ("/mo", "/hr") is
 * kept so the number is never ambiguous.
 */
export function priceFloor(offers: Array<{ price: string }>): string {
  if (offers.length === 0) return ''
  const cheapest = [...offers].sort(
    (a, b) => sortValue(a.price) - sortValue(b.price),
  )[0]
  // Strip a leading "From" so the label never reads "from From $2,400".
  return `from ${cheapest.price.replace(/^\s*from\s+/i, '')}`
}
