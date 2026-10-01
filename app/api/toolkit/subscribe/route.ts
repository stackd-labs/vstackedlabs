import { logSpam, overLength, spamReason } from '@/lib/spam-guard'
import { randomBytes } from 'crypto'
import { createServerClient } from '@/lib/supabase-server'
import { resendAccessEmail, sendWelcomeEmail } from '@/lib/emails/toolkit-emails'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: { email?: unknown; first_name?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const spam = spamReason(body as Record<string, unknown>, { email: 'email', names: ['first_name'], minMs: 1500 })
  if (spam) {
    logSpam('toolkit-subscribe', spam)
    return Response.json({ status: 'created', message: 'Check your inbox. Your permanent link is on the way.' })
  }

  const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const firstName = typeof body.first_name === 'string' ? body.first_name.trim() : ''

  if (!rawEmail || !firstName) {
    return Response.json(
      { error: 'First name and email are required.' },
      { status: 400 }
    )
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

  // Check for existing subscriber
  const { data: existing, error: lookupError } = await supabase
    .from('toolkit_subscribers')
    .select('email, first_name, access_token')
    .eq('email', rawEmail)
    .maybeSingle()

  if (lookupError) {
    console.error('[toolkit/subscribe] lookup error', lookupError)
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  if (existing) {
    try {
      await resendAccessEmail({
        email: existing.email,
        first_name: existing.first_name,
        token: existing.access_token,
      })
    } catch (e) {
      console.error('[toolkit/subscribe] resend email failed', e)
      return Response.json({ error: 'Could not send the email. Try again.' }, { status: 500 })
    }
    return Response.json({
      status: 'existing',
      message: "You're already in. Check your email for your original access link.",
    })
  }

  const token = randomBytes(20).toString('hex')

  const { error: insertError } = await supabase
    .from('toolkit_subscribers')
    .insert({
      email: rawEmail,
      first_name: firstName,
      access_token: token,
    })

  if (insertError) {
    // Race condition: someone else inserted between lookup and insert.
    if (insertError.code === '23505') {
      const { data: fallback } = await supabase
        .from('toolkit_subscribers')
        .select('email, first_name, access_token')
        .eq('email', rawEmail)
        .maybeSingle()
      if (fallback) {
        try {
          await resendAccessEmail({
            email: fallback.email,
            first_name: fallback.first_name,
            token: fallback.access_token,
          })
        } catch (e) {
          console.error('[toolkit/subscribe] race resend failed', e)
        }
        return Response.json({
          status: 'existing',
          message: "You're already in. Check your email for your original access link.",
        })
      }
    }
    console.error('[toolkit/subscribe] insert error', insertError)
    return Response.json({ error: 'Something went wrong. Try again.' }, { status: 500 })
  }

  try {
    await sendWelcomeEmail({ email: rawEmail, first_name: firstName, token })
  } catch (e) {
    console.error('[toolkit/subscribe] welcome email failed', e)
    // Subscriber is saved. Return success but note the email may have failed.
    return Response.json(
      {
        status: 'created',
        message: "You're in. If the email doesn't arrive in a minute, use the resend form on /free/toolkit/access.",
      },
      { status: 202 }
    )
  }

  return Response.json({
    status: 'created',
    message: 'Check your inbox. Your permanent link is on the way.',
  })
}
