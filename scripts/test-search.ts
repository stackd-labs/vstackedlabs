// Dev helper: run sample queries through the site search and print the top results.
// Run: npx tsx scripts/test-search.ts ["your query"]
import { SEARCH_INDEX, searchSite } from '../lib/site-search'

const queries = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      'how much does it cost',
      'my app is broken',
      'recue',
      'are you hiring designers',
      'roblox game developer',
      'refund',
      'do I own the code',
      'business brain',
      'do I have to be full time',
      'where are you located',
      'qa testing job',
      'can I teach',
      'vibe coded supabase app leaking keys',
      'how long does a project take',
      'affiliate commission',
      'xyzzy plugh',
    ]

console.log(`index: ${SEARCH_INDEX.length} entries\n`)
for (const q of queries) {
  const r = searchSite(q, 3)
  console.log(`"${q}"`)
  if (!r.length) console.log('   (no results)')
  for (const e of r) console.log(`   ${e.title}  [${e.where}]  -> ${e.href}`)
}
