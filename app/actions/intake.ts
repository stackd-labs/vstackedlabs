'use server'

import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { logSpam, overLength, spamReason } from '@/lib/spam-guard'
import { KIND_STEP, STEPS, isKind } from '@/components/tech/intake-steps'

export type IntakeResult = { ok: true; ref: string } | { ok: false; error: string }

const URL_RE = /^https?:\/\/\S+\.\S+/i

/**
 * The homepage terminal intake (build, rescue, talent, hire, learn, other).
 *
 * Saves to `dash.site_intake` in the Stackd collective Supabase project, so requests land in
 * Stackd Dash (table: stackddash/sql/site_intake.sql). Service role, server-side only, after
 * spam screening. If the database is unreachable or the table is missing, development falls
 * back to .data/intake.jsonl (gitignored) and production returns an honest "please email us"
 * error, so a real lead is never shown a fake success.
 */
const IDENTITY = new Set(['name', 'email', 'company'])

function dashClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: process.env.NEXT_PUBLIC_DB_SCHEMA || 'dash' },
  })
}
export async function submitIntake(raw: Record<string, unknown>): Promise<IntakeResult> {
  const kind = raw.kind
  if (!isKind(kind)) return { ok: false, error: 'Pick what you need first.' }
  const steps = STEPS[kind]

  const caps = Object.fromEntries([KIND_STEP, ...steps].map((s) => [s.key, s.max]))
  const tooLong = overLength(raw, caps)
  if (tooLong) return { ok: false, error: `That ${tooLong} is too long.` }

  const spam = spamReason(raw, {
    email: 'email',
    names: ['name'],
    messages: steps.filter((s) => s.type === 'long').map((s) => s.key),
  })
  if (spam) {
    logSpam(`intake:${kind}`, spam)
    return { ok: true, ref: makeRef() }
  }

  const answers: Record<string, string> = {}
  for (const s of steps) {
    const v = typeof raw[s.key] === 'string' ? (raw[s.key] as string).trim() : ''
    if (!v) {
      if (!s.optional) return { ok: false, error: `${s.prompt} is required.` }
      continue
    }
    if (s.type === 'choice' && !s.choices?.some((c) => c.value === v)) return { ok: false, error: `Pick an option for: ${s.prompt}` }
    if (s.type === 'url' && !URL_RE.test(v)) return { ok: false, error: `${s.prompt} should be a full link starting with https://` }
    answers[s.key] = v
  }

  const ref = makeRef()
  const record = { ref, kind, receivedAt: new Date().toISOString(), ...answers }

  const db = dashClient()
  if (db) {
    const { error } = await db.from('site_intake').insert({
      ref,
      kind,
      name: answers.name,
      email: answers.email,
      company: answers.company ?? null,
      answers: Object.fromEntries(Object.entries(answers).filter(([k]) => !IDENTITY.has(k))),
    })
    if (!error) {
      console.log(`[intake] saved ${kind} ${ref} to dash.site_intake`)
      return { ok: true, ref }
    }
    console.error(`[intake] dash.site_intake insert failed for ${kind} ${ref}: ${error.message}`)
  }

  if (process.env.NODE_ENV !== 'production') {
    const dir = path.join(process.cwd(), '.data')
    await mkdir(dir, { recursive: true })
    await appendFile(path.join(dir, 'intake.jsonl'), JSON.stringify(record) + '\n', 'utf8')
    console.log(`[intake] saved ${kind} ${ref} to .data/intake.jsonl`)
    return { ok: true, ref }
  }

  console.error(`[intake] ${kind} ${ref} was NOT saved (database unavailable)`)
  return { ok: false, error: 'We could not save that right now. Please email Chanel@stackdstudiosai.com and we will reply within a day.' }
}

function makeRef() {
  return 'STK-' + Math.random().toString(36).slice(2, 7).toUpperCase()
}
