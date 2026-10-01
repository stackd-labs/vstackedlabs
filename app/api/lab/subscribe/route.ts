import { logSpam, overLength, spamReason } from '@/lib/spam-guard'
import { randomBytes } from 'crypto'
import { createServerClient } from '@/lib/supabase-server'
import { sendLabWelcomeEmail } from '@/lib/emails/lab-emails'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const VALID_SOURCES = new Set(['smart-intake', 'ai-assistant', 'ops-dashboard', 'gallery', 'unknown'])

export async function POST(request: Request) {
  let body: { email?: unknown; first_name?: unknown; source?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const spam = spamReason(body as Record<string, unknown>, { email: 'email', names: ['first_name'], minMs: 1500 })
  if (spam) {
    logSpam('lab-subscribe', spam)
    return Response.json({ status: 'created', message: "You're on the list. Check your inbox for a hello." })
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const firstName = typeof body.first_name === 'string' ? body.first_name.trim() : ''
  const sourceRaw = typeof body.source === 'string' ? body.source.trim() : ''
  const source = VALID_SOURCES.has(sourceRaw) ? sourceRaw : 'unknown'

  if (!rawEmail || !firstName) {
    return Response.json({ error: 'First name and email are required.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(rawEmail) || rawEmail.length > 254) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (firstName.length < 1 || firstName.length > 80) {
    return Response.json({ error: 'Please enter your first name.' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return Response.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  // Existing subscriber → no email re-send, just acknowledge.
  const { data: existing, error: lookupError } = await supabase
    .from('lab_subscribers')
    .select('email')
    .eq('email', rawEmail)
    .maybeSingle()

  if (lookupError) {
    console.error('[lab/subscribe] lookup error', lookupError)
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  if (existing) {
    return Response.json({
      status: 'existing',
      message: "You're already on the list. Browse the lab anytime.",
    })
  }

  // New subscriber. Token is preserved as a unique identifier even though
  // we no longer use it for gated access — keeps the schema unchanged.
  const token = randomBytes(20).toString('hex')

  const { error: insertError } = await supabase.from('lab_subscribers').insert({
    email: rawEmail,
    first_name: firstName,
    access_token: token,
  })

  if (insertError) {
    if (insertError.code === '23505') {
      return Response.json({
        status: 'existing',
        message: "You're already on the list. Browse the lab anytime.",
      })
    }
    console.error('[lab/subscribe] insert error', insertError)
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  try {
    await sendLabWelcomeEmail({ email: rawEmail, first_name: firstName, source })
  } catch (e) {
    console.error('[lab/subscribe] welcome email failed', e)
    return Response.json(
      {
        status: 'created',
        message: "You're on the list. Heads up if your welcome email doesn't arrive — check spam.",
      },
      { status: 202 }
    )
  }

  return Response.json({
    status: 'created',
    message: "You're on the list. Check your inbox for a hello.",
  })
}
