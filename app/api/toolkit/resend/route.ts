import { logSpam, overLength, spamReason } from '@/lib/spam-guard'
import { createServerClient } from '@/lib/supabase-server'
import { resendAccessEmail } from '@/lib/emails/toolkit-emails'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: { email?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const spam = spamReason(body as Record<string, unknown>, { email: 'email', minMs: 1500 })
  if (spam) {
    logSpam('toolkit-resend', spam)
    return Response.json({ status: 'sent', message: 'Sent. Check your inbox.' })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    return Response.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  const { data: subscriber, error } = await supabase
    .from('toolkit_subscribers')
    .select('email, first_name, access_token')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error('[toolkit/resend] lookup error', error)
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  if (!subscriber) {
    return Response.json({ status: 'not_found' })
  }

  try {
    await resendAccessEmail({
      email: subscriber.email,
      first_name: subscriber.first_name,
      token: subscriber.access_token,
    })
  } catch (e) {
    console.error('[toolkit/resend] email failed', e)
    return Response.json({ error: 'Could not send the email. Try again.' }, { status: 500 })
  }

  return Response.json({
    status: 'sent',
    message: 'Sent. Check your inbox.',
  })
}
