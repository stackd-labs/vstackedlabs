// Spam screening for public forms. House rule: ~/.agents/AGENTS.md "Every public
// form gets spam screening". Reference: capitalcoredancewebsite api/notify.js.
//
// The page renders <HoneypotField> (or a hidden input named HONEYPOT_NAME) and sends
// `elapsedMs` = time since the form opened. The server calls spamReason() and, on a
// hit, returns a fake success and drops the submission, logging the reason so a false
// positive shows up in logs. The honeypot name is deliberately meaningless: Chrome
// autofill fills hidden fields named company/email/address/website/phone even when
// hidden, which silently blocks real people.

export const HONEYPOT_NAME = 'hp_ref'
// 3s for real forms. Name+email opt-ins pass minMs 1500: autofill + click is fast.
export const MIN_FILL_MS = 3000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const LINK_RE = /https?:\/\/|www\.|\[url|<a\s/gi

type Fields = Record<string, unknown>

const str = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v))
const links = (v: unknown) => (str(v).match(LINK_RE) || []).length

export function spamReason(
  data: Fields,
  opts: {
    email?: string
    names?: string[]
    messages?: string[]
    maxLinks?: number
    minMs?: number
    /** Only check timing when the form sent elapsedMs (for endpoints shared with forms not yet updated). */
    timingIfPresent?: boolean
  } = {},
): string | null {
  if (str(data[HONEYPOT_NAME]).trim() !== '') return 'honeypot'
  const sent = data.elapsedMs !== undefined && data.elapsedMs !== null && data.elapsedMs !== ''
  if (sent || !opts.timingIfPresent) {
    const elapsed = Number(data.elapsedMs)
    if (!Number.isFinite(elapsed) || elapsed < (opts.minMs ?? MIN_FILL_MS)) return 'too-fast'
  }
  if (opts.email && !EMAIL_RE.test(str(data[opts.email]).trim())) return 'bad-email'
  for (const f of opts.names ?? []) if (links(data[f])) return `link-in-${f}`
  for (const f of opts.messages ?? []) if (links(data[f]) > (opts.maxLinks ?? 2)) return 'link-stuffed'
  return null
}

/** Returns the first field longer than its cap, or null. */
export function overLength(data: Fields, caps: Record<string, number>): string | null {
  for (const [f, max] of Object.entries(caps)) if (str(data[f]).length > max) return f
  return null
}

export function logSpam(where: string, reason: string) {
  console.warn(`[spam-guard] ${where}: dropped (${reason})`)
}
