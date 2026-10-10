// Dev helper: show the top scores behind a search. Run: npx tsx scripts/debug-search.ts "query"
import { explainSearch } from '../lib/site-search'

for (const q of process.argv.slice(2)) {
  console.log(`"${q}"`)
  for (const r of explainSearch(q, 5)) console.log(`   ${r.score.toFixed(2)}  ${r.entry.title}  ${r.detail}`)
}
