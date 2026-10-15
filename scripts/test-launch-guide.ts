/**
 * Checks the launch guide signup end to end, after a browser test signup:
 * finds the test row, tries the emailed link with no cookie, then deletes the row.
 * Usage: npx tsx --tsconfig tsconfig.json --env-file=.env.local scripts/test-launch-guide.ts <email> [baseUrl] [--keep]
 * --keep leaves the rows in place (for real signups you want to see in the Dash).
 */
import { createClient } from '@supabase/supabase-js'
import { makeGuideToken } from '@/lib/launch-guide-token'

const email = (process.argv[2] || '').toLowerCase()
const base = process.argv[3]?.startsWith('http') ? process.argv[3] : 'http://localhost:4800'

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
    db: { schema: process.env.NEXT_PUBLIC_DB_SCHEMA || 'dash' },
  })
  const { data: rows, error } = await db.from('site_intake').select('id, ref, kind, name, answers').eq('email', email).contains('answers', { form: 'launch-guide' })
  if (error) throw error
  console.log('rows:', rows?.map((r) => ({ ref: r.ref, kind: r.kind, name: r.name, consent: Boolean(r.answers?.consent) })))

  const token = makeGuideToken(email)
  const res = await fetch(`${base}/api/launch-guide?t=${encodeURIComponent(token!)}`, { redirect: 'manual' })
  console.log('email link, no cookie:', res.status, res.headers.get('content-type'), (await res.arrayBuffer()).byteLength, 'bytes')
  const bad = await fetch(`${base}/api/launch-guide?t=${encodeURIComponent(token!.slice(0, -2) + 'xx')}`, { redirect: 'manual' })
  console.log('forged link:', bad.status, bad.headers.get('location'))

  if (process.argv.includes('--keep')) return
  for (const r of rows ?? []) {
    const { error: delErr } = await db.from('site_intake').delete().eq('id', r.id)
    console.log('deleted', r.ref, delErr ? delErr.message : 'ok')
  }
}
main()
