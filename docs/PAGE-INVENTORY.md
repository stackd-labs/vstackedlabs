# Page inventory

Running list of every route the site has had, and where each one stands in the
dark-tech rebuild (branch `redesign/dark-tech-home`, started 2026-10-07).

Removed pages still exist on `chore/vscode-team-config` and in git history. To bring
one back: `git checkout chore/vscode-team-config -- app/<route>`, then restyle it.
Components and data files (`components/`, `lib/`) were kept, only the route folders left.

Removed routes redirect to `/` for now (temporary 307s in `next.config.ts`). Remove a
route's redirect when the page comes back.

**Status key:** LIVE = in the new build. KEPT = infrastructure, unlinked, old styling.
REMOVED = route folder deleted, rebuild later.

## Live in the new build

| Route | What it is | Status |
|---|---|---|
| `/` | Homepage: Build it. Fix it. Scale it. Dark tech design. Includes the terminal intake form (`#start`) covering build, rescue, talent, hire, learn and other. | LIVE (mockup for review) |
| `/labs` | Stackd Labs (new route; old `/lab` demos still removed): Business Brain + Stackd Interactive featured, in-development products shown generically with redacted names (her call), product stages, Labs form. Footer link. Built 2026-10-07. | LIVE (new) |
| `/services` | Services: NO prices (her call). 29 offers from lib/divisions.ts regrouped into Build / Rescue / Learn, plus Talent, Jobs, Labs. "Scoped to fit. Priced fairly." section. Quote form (offer name pre-fills). Footer link. Built 2026-10-07. | LIVE (rebuilt) |
| `/about` | About: company voice ("we"), no founder section. Why we exist, mission, five values plus the AI rule, six divisions, stack.json, close. Footer link. Rebuilt 2026-10-07. | LIVE (rebuilt) |
| `/careers` | Careers: hero, values, the nine April roles (filter + expand), affiliate program, application form (talent + affiliate paths of the terminal intake). Footer link. Rebuilt 2026-10-07. | LIVE (rebuilt) |

**Forms:** the homepage intake (`components/tech/TerminalForm.tsx` + `app/actions/intake.ts`) replaces
the old contact, careers and rescue forms for now. It saves to `dash.site_intake` in the Stackd collective
project (SQL: `stackddash/sql/site_intake.sql`). If that insert fails, dev falls back to `.data/intake.jsonl`
and production returns a "please email us" error.

## Kept as infrastructure (customers or money depend on them)

| Route | Why it stays |
|---|---|
| `/products/[product_id]` | Paid digital product access links (emailed after purchase) |
| `/free/toolkit/access` | Toolkit access links (emailed after opt-in) |
| `/success` | Stripe checkout return page |
| `/privacy` | Legal |
| `/terms` | Legal |
| `/api/*` | Chatbot, toolkit + lab sign-ups, Stripe webhook |
| `/sitemap.xml`, `/robots.txt` | SEO files (sitemap now lists only `/`) |

## Removed for now

| Route | What it was | Planned home in the new structure |
|---|---|---|
| `/admin` | Empty admin placeholder with a Supabase login (removed 10/10: any collective account could sign in) | Use the Stackd Dash |
| `/ai-toolkit` | Free AI Toolkit landing page (lead magnet) | `/labs` or its own page |
| `/build` | Stackd Build division page | `/build` |
| `/builders` | Builders division (unblock, code review, 1:1, support) | merge into `/rescue` |
| `/business-brain` | Business Brain product page | under `/build` |
| `/cart` | Store cart | with `/store` |
| `/contact` | Calendly + contact form (Supabase `leads`) | `/contact` build inquiry |
| `/ecosystem` | Six-division story page | folded into `/` |
| `/enterprise` | Enterprise division page | merge into `/build` |
| `/free/toolkit` | Toolkit opt-in page | with `/ai-toolkit` |
| `/industries` | Industries served | retire or fold into `/build` |
| `/interactive` | Stackd Interactive games studio | `/labs` |
| `/lab` (+ `/ai-assistant`, `/ops-dashboard`, `/smart-intake`) | Demo Lab, three interactive client demos | `/build/demos` |
| `/learn` | Stackd Learn division page | `/learn` |
| `/pricing` | All offers and prices (20 are placeholders) | `/pricing` |
| `/rescue` | Stackd Rescue division page | `/rescue` + intake form |
| `/sitemap` | Human-readable sitemap page | rebuild last |
| `/store` | Digital products store | `/labs` or `/store` |
| `/teams` | Teams division page | merge into `/build` |
| `/preview` | Throwaway A/B homepage mockup | deleted, replaced by `/` |

## New pages planned (not built yet)

`/talent` (application form), `/jobs`, `/labs`, plus the rescue intake and build inquiry forms.
