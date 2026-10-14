'use server'

import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { logSpam, overLength, spamReason } from '@/lib/spam-guard'
import { GUIDE_COOKIE, makeGuideToken } from '@/lib/launch-guide-token'
import { sendLaunchGuideEmail } from '@/lib/emails/launch-guide-email'
import { GUIDE_CONSENT_TEXT } from '@/components/tech/data'

export type GuideResult = { ok: true; emailed: boolean } | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function dashClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: process.env.NEXT_PUBLIC_DB_SCHEMA || 'dash' },
  })
}

function makeRef() {
  return 'STK-' + Math.random().toString(36).slice(2, 7).toUpperCase()
}

/**
 * Free launch guide signup. Saves a `guide` row to dash.site_intake, sets the download cookie and
 * sends the thank-you email with the guide link. Spam gets a fake success with no cookie.
 */
export async function requestLaunchGuide(raw: Record<string, unknown>): Promise<GuideResult> {
  const tooLong = overLength(raw, { name: 100, email: 254 })
  if (tooLong) return { ok: false, error: `That ${tooLong} is too long.` }

  // Honest mistakes get a real message; only then screen for bots.
  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  const email = typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : ''
  if (!name) return { ok: false, error: 'Please enter your name.' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
  if (raw.consent !== true) return { ok: false, error: 'Please tick the box to agree before you continue.' }

  const spam = spamReason(raw, { email: 'email', names: ['name'], minMs: 1500 })
  if (spam) {
    logSpam('launch-guide', spam)
    return { ok: true, emailed: true }
  }

  const token = makeGuideToken(email)
  if (!token) {
    console.error('[launch-guide] no signing key configured')
    return { ok: false, error: 'The guide is not available right now. Please email Chanel@stackdstudiosai.com.' }
  }

  const db = dashClient()
  if (db) {
    const { data: existing } = await db.from('site_intake').select('id').eq('email', email).contains('answers', { form: 'launch-guide' }).limit(1)
    if (!existing?.length) {
      const row = {
        ref: makeRef(),
        name,
        email,
        answers: { form: 'launch-guide', consent: GUIDE_CONSENT_TEXT, consented_at: new Date().toISOString() },
      }
      let { error } = await db.from('site_intake').insert({ ...row, kind: 'guide' })
      // Until the 'guide' kind is added to the table's check constraint, save it as 'other'.
      if (error?.code === '23514') ({ error } = await db.from('site_intake').insert({ ...row, kind: 'other' }))
      if (error) console.error(`[launch-guide] dash.site_intake insert failed: ${error.message}`)
      else console.log(`[launch-guide] saved signup ${row.ref}`)
    }
  } else {
    console.error('[launch-guide] database not configured; signup NOT saved')
  }

  const jar = await cookies()
  jar.set(GUIDE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })

  let emailed = true
  try {
    await sendLaunchGuideEmail({ email, name, token })
  } catch (e) {
    emailed = false
    console.error('[launch-guide] thank-you email failed', e)
  }
  return { ok: true, emailed }
}
