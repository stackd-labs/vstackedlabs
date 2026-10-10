// Dev helper: send one test submission per intake kind through the real server action, then
// read the rows back from dash.site_intake and delete them. Run: npx tsx scripts/test-intake.ts
import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

for (const line of readFileSync('.env.local', 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^"|"$/g, '')
}

const base = { name: 'Test Visitor', email: 'test@example.com', elapsedMs: 9000, hp_ref: '' }
const CASES: Record<string, unknown>[] = [
  { ...base, kind: 'build', details: 'TEST: build inquiry, please ignore.', timeline: 'exploring', budget: 'not-sure' },
  { ...base, kind: 'rescue', appUrl: 'https://example.com', issues: 'TEST: rescue request, please ignore.', urgency: 'no-rush', team: 'just-me', docs: 'none' },
  { ...base, kind: 'talent', role: 'Rescue Engineer', skills: 'TEST: application, please ignore.', availability: 'contract' },
  { ...base, kind: 'affiliate', platforms: 'LinkedIn', why: 'TEST: affiliate application, please ignore.' },
  { ...base, kind: 'other', details: 'TEST: Labs waitlist, please ignore.' },
  { ...base, kind: 'other', details: 'TEST: bot submission, should be dropped.', hp_ref: 'bot-filled' },
]

async function main() {
  const { submitIntake } = await import('../app/actions/intake')
  const refs: string[] = []
  for (const c of CASES) {
    const res = await submitIntake(c)
    console.log(`${String(c.kind).padEnd(9)} ${c.hp_ref ? '(honeypot) ' : ''}->`, JSON.stringify(res))
    if (res.ok) refs.push(res.ref)
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
    db: { schema: process.env.NEXT_PUBLIC_DB_SCHEMA || 'dash' },
  })
  const { data, error } = await db.from('site_intake').select('ref, kind, status, name, company, answers').in('ref', refs)
  if (error) throw error
  console.log(`\nrows found in dash.site_intake: ${data.length} of ${refs.length} refs returned`)
  for (const r of data) console.log(' ', r.ref, r.kind, r.status, Object.keys(r.answers).join(','))

  const del = await db.from('site_intake').delete().in('ref', refs).select('ref')
  if (del.error) throw del.error
  console.log(`deleted ${del.data.length} test rows`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
