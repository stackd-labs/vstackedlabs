import { createHmac, timingSafeEqual } from 'node:crypto'

/**
 * Access tokens for the gated "Before You Launch" PDF.
 *
 * A token is `<email, base64url>.<signature>`. The same token goes in the httpOnly cookie set when
 * the form is sent (so the on-page download works) and in the link in the thank-you email (so the
 * link works on any device). Server only: the signing key never reaches the browser.
 */
export const GUIDE_COOKIE = 'stackd_guide'

function key(): string | null {
  const secret = process.env.LAUNCH_GUIDE_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  return secret ? `launch-guide:v1:${secret}` : null
}

function sign(email: string, k: string) {
  return createHmac('sha256', k).update(email).digest('base64url').slice(0, 32)
}

export function makeGuideToken(email: string): string | null {
  const k = key()
  if (!k) return null
  return `${Buffer.from(email).toString('base64url')}.${sign(email, k)}`
}

/** Returns the email the token was issued to, or null if it is missing or forged. */
export function readGuideToken(token: string | null | undefined): string | null {
  const k = key()
  if (!k || !token) return null
  const [payload, sig] = token.split('.')
  if (!payload || !sig) return null
  const email = Buffer.from(payload, 'base64url').toString('utf8')
  const expected = Buffer.from(sign(email, k))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null
  return email
}
