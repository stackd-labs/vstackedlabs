import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { cookies } from 'next/headers'
import { GUIDE_COOKIE, readGuideToken } from '@/lib/launch-guide-token'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Serves the gated launch guide PDF. Access comes from the cookie set when the form is sent, or
 * from `?t=` in the thank-you email link. Anyone else is sent to the form on the homepage.
 */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const fromLink = url.searchParams.get('t')
  const jar = await cookies()
  const token = readGuideToken(fromLink) ? fromLink : jar.get(GUIDE_COOKIE)?.value
  if (!readGuideToken(token)) {
    return Response.redirect(new URL('/#launch-guide', url), 307)
  }

  const pdf = await readFile(path.join(process.cwd(), 'private', 'launch-guide.pdf'))
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="Stackd-Before-You-Launch-Checklist.pdf"',
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex',
  })
  // Opening the email link on a new device also unlocks the on-page download there.
  if (fromLink && token === fromLink) {
    headers.append('Set-Cookie', `${GUIDE_COOKIE}=${fromLink}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`)
  }
  return new Response(new Uint8Array(pdf), { headers })
}
