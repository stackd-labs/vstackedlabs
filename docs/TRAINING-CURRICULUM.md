# Stackd Learn: Master Curriculum

> One curriculum, cut three ways. Every Learn cohort program is a subset of the
> modules below. Build the master once, cut per program, record once.
>
> Source of truth for the offers themselves stays `lib/divisions.ts`. If a module
> here contradicts what the site promises, the site wins or the site changes.
> Nothing in this file should be published without that check.

Status: draft outline, 2026-09-06. Nothing here is recorded yet.

---

## 1. What this teaches, and why it is different

The market is full of courses that teach syntax and courses that teach prompting.
Almost nobody teaches the gap between a thing that runs on your laptop and a thing
a stranger pays money to use. That gap is this curriculum.

The through-line, said plainly on day one and repeated every week:

> A person with good judgment and an AI pair can build in a week what took a team
> a quarter. What they cannot usually do is deploy it, secure it, connect it to a
> database, take money through it, and fix it when it breaks at 9pm. You are here
> to learn the second half.

Three claims the curriculum has to earn:

1. **You will direct the machine, not be directed by it.** Students leave able to
   write a spec and a cut list, read code they did not write, and catch the model
   when it is confidently wrong.
2. **You will ship one real, deployed application.** Auth, database, payments,
   email, an admin view, on a URL they own.
3. **You will know why things break.** Every failure module is a real production
   bug, taught as a postmortem, with the fix.

---

## 2. The spine project

Every module builds one app. Same app, live and recorded, all three programs.

**Bookline** (working name): a small-business booking and intake system.

A public visitor books a class or appointment, creates an account in the process,
pays, gets a confirmation email, and can come back to see their bookings. The owner
gets an admin view with a roster, payment status, and the ability to message a
customer.

Why this one:

- It is the exact shape of real client work (studios, clinics, service businesses,
  rentals) without exposing any client's code or data.
- It forces every teachable piece: public form, account creation, roles, row-level
  security, money, transactional email, a webhook, an admin surface, timezones.
- It has a natural cut line. Weeks 1 to 4 produce a working booking flow. Everything
  after that is production quality.
- Students can fork it into their own idea in the final module and still have
  something portfolio-worthy.

**Rule:** the instructor repo carries a git tag per module (`m06-start`, `m06-end`,
and so on). Any lesson can be entered cold from a tag. This is what makes the
recorded version enterable at any point and what saves a live session when a demo
goes sideways.

---

## 3. The stack taught

Pinned, stated on screen in module 0, and versioned in the course changelog.

| Layer | Choice | Why it is the teaching choice |
|---|---|---|
| Framework | Next.js (App Router) | One repo for front end and back end, server components force the client/server distinction into the open |
| Language | TypeScript | The type error is the cheapest code review you will ever get |
| Styling | Tailwind v4, tokens in `globals.css` | No config file to explain, and design tokens teach a design system |
| Data + auth | Supabase (Postgres, Auth, RLS) | Real SQL, real row-level security, a real security boundary to reason about |
| Payments | Stripe Checkout, PayPal as the alternate | Webhooks are the lesson, the provider is not |
| Email | Resend | Deliverability, from-domains, and the fact that email is a side effect that can fail |
| Deploy | Vercel | Preview URLs make code review real |
| Version control | Git, GitHub, PRs, review | The habit that makes them employable |
| The pair | Claude Code with a project `CLAUDE.md` | The whole point |

Student prerequisites: a laptop they can install on, a GitHub account, a card for
the free tiers, and about six hours a week. No prior experience for the entry
program. Some prior building for the other two.

---

## 4. The modules

Format for each: the outcome, the live block, the recorded block, what ships, and
the failure that gets staged on purpose.

### Part 0. Ground

**M0. Setup and the first commit**
Pre-work, recorded even for live cohorts, so week one is not spent on installs.
- Outcome: their machine runs the stack and they have pushed one commit.
- Recorded: 6 lessons, about 45 min. Node and package manager, VS Code, Git and
  GitHub, Claude Code installed and signed in, Supabase and Vercel and Stripe test
  accounts, clone the starter and push a change to a branch.
- Ships: a green preview deploy of the starter with their name in it.
- Staged failure: none. This module must feel easy.
- Live handling: a 30 min optional setup clinic the week before day one, recorded
  and reused.

### Part 1. Direct the machine

**M1. The spec and the cut list**
- Outcome: they can turn a one-line idea into a ten-line spec and an explicit list
  of what version one does not do.
- Live (90 min): take three student ideas from the room and spec them out loud.
  The cut list is the hard part and where the teaching is.
- Recorded: 4 lessons, about 35 min. Why a one-line goal produces slop, the ten-line
  spec template, the cut list, scoping Bookline together.
- Ships: their own project spec and cut list, committed as `docs/SPEC.md`.
- Staged failure: run the same prompt twice, once from one line and once from the
  spec. Show both outputs side by side without commentary. Let the room react.

**M2. `CLAUDE.md`: teaching the AI your project**
- Outcome: they can write a project instruction file that changes the model's output.
- Live (90 min): build Bookline's `CLAUDE.md` together, then prove it works by asking
  for the same component before and after.
- Recorded: 4 lessons, about 32 min. What belongs in it and what does not, stack and
  conventions, the gotchas section, keeping it current as the project grows.
- Ships: `CLAUDE.md` in their repo.
- Staged failure: a `CLAUDE.md` so long the model ignores half of it. Show the trim.

**M3. Two modes: prototype and hardening**
The signature module. This is the thing no other course teaches.
- Outcome: they can name which mode they are in and behave differently in each.
- Live (90 min): build one feature loose and fast with no tests and no review, click
  through it in the browser, then run a single hardening pass over it as a separate
  act. Two different sessions, two different postures.
- Recorded: 5 lessons, about 40 min. Why building loose is correct at the start, what
  gets skipped in prototype mode and why that is not laziness, the moment the shape
  settles, what a hardening pass actually contains, and the failure mode of hardening
  too early.
- Ships: one feature that went through both passes, with the diff of the hardening
  pass reviewed in class.
- Staged failure: write tests first for a feature whose shape then changes twice.
  Show the wasted work honestly.

**M4. Reading code you did not write**
- Outcome: they can review an AI-produced diff and find the problem in it.
- Live (90 min): put a real generated diff on screen. Students find issues before the
  instructor speaks. Then walk the review checklist.
- Recorded: 5 lessons, about 42 min. Reading a diff, tracing data from the form to the
  database and back, the review checklist, what "looks right" hides, when to throw the
  whole thing out instead of patching it.
- Ships: a written review of a supplied diff, graded.
- Staged failure: a diff that is beautiful, well-commented, correctly typed, and drops
  one branch of a condition.

**M5. Where the model lies**
- Outcome: healthy, specific distrust. Not vibes, a list.
- Live (90 min): five real cases, each one drawn from production work, each one a
  five-minute story and a ten-minute hunt.
- Recorded: 6 lessons, about 50 min. Invented APIs and confident wrong flags, a guard
  that passes while measuring the wrong span, a unit mismatch that looks like a
  literal, a "fix" that changes behavior nobody asked about, a summary of work that
  was not actually run, and the habit that catches all five (run it, look at it,
  believe the output over the claim).
- Ships: their own postmortem of one thing the model got wrong that week.
- Staged failure: the whole module.

### Part 2. Build the thing

**M6. App Router: routes, layouts, server and client**
- Outcome: they know which code runs where and can say why.
- Live (90 min): build Bookline's route tree and layouts, then break it on purpose by
  putting a hook in a server component and reading the error properly.
- Recorded: 5 lessons, about 45 min. File-based routing, layouts and nesting, server
  components by default, `'use client'` and what it costs, data fetching in a server
  component.
- Ships: the app's full route skeleton, deployed.
- Staged failure: the server/client boundary error, read out loud and understood
  rather than pasted into the chat.

**M7. Design that is not a template**
- Outcome: their app does not look like every other AI-built app.
- Live (90 min): pick type and color as decisions with reasons, build the token set,
  then restyle one page live.
- Recorded: 5 lessons, about 40 min. Tokens in `globals.css`, a type scale, a color
  system that survives a dark background, spacing and rhythm, and how to tell the
  model what the design is instead of asking it to be creative.
- Ships: a token file and a styled page.
- Staged failure: show the default purple gradient card look. Name it. Kill it.

**M8. Data modeling: tables before code**
- Outcome: they can draw the schema before writing a line of app code.
- Live (90 min): model Bookline on the whiteboard, argue about it, then write the SQL.
- Recorded: 5 lessons, about 45 min. Entities and relationships, keys and foreign keys,
  the difference between a person and an account, enums and constraints, and why the
  schema is the hardest thing to change later.
- Ships: `supabase/migrations/001_init.sql`.
- Staged failure: a schema that cannot answer a question the business will definitely
  ask. Discover it in class and migrate.

**M9. Migrations that can be run twice**
- Outcome: they never hand a client a migration that breaks on the second run.
- Live (60 min): make module 8's migration idempotent, then run it three times.
- Recorded: 4 lessons, about 30 min. `if not exists`, enum guards, `drop policy if
  exists` before `create`, `on conflict do nothing`, and the running `apply_all.sql`
  that concatenates every migration in order so one paste re-applies everything.
- Ships: `supabase/apply_all.sql`.
- Staged failure: run a naive migration twice and read the error.

**M10. Auth and identity: one intake path**
- Outcome: every person in the system arrives the same way and is a real account.
- Live (90 min): wire signup, login, and the public booking form that creates an
  account as a side effect.
- Recorded: 5 lessons, about 45 min. Supabase Auth, sessions on the server, the
  profile row keyed to the auth user, roles, and why two separate paths into your
  user table is a bug you will pay for twice.
- Ships: working auth and a public form that creates a real account.
- Staged failure: build a guest checkout that creates an orphan record, then find the
  same customer twice in the admin list.

**M11. RLS and where the security boundary actually is**
- Outcome: they can state, for any query in their app, what stops another customer
  from reading it.
- Live (90 min): turn RLS on, watch the app break, write policies, watch it work.
  Then show a service-role client walking straight through every policy.
- Recorded: 6 lessons, about 55 min. What RLS is, policies by role, testing a policy
  as another user, the anon key versus the service role key, the trap of assuming RLS
  protects an endpoint that runs as service role, and where the real check has to live.
- Ships: policies on every table plus a written answer to "who can read this."
- Staged failure: a table with RLS enabled and no policy at all. It silently returns
  nothing, and the app fails in a way that looks like a data bug.

**M12. Forms, server actions, and validation**
- Outcome: input from strangers cannot corrupt their data.
- Live (90 min): build the booking form properly, then attack it in class.
- Recorded: 5 lessons, about 42 min. Server actions, validating on the server no matter
  what the client did, error states people can read, honeypots versus autofill, and
  what to do with a half-finished submission.
- Ships: a validated booking flow.
- Staged failure: submit the form with the JavaScript disabled and with a curl request.

### Part 3. The outside world

**M13. Taking money**
- Outcome: a real test payment, end to end.
- Live (90 min): Stripe Checkout, test cards, the order record.
- Recorded: 5 lessons, about 45 min. Checkout versus building your own form, test mode,
  the order row, what to do when the customer closes the tab after paying, and refunds.
- Ships: a completed test purchase visible in the database and the admin view.
- Staged failure: mark the order paid on the redirect instead of the webhook, then
  cancel the redirect and show the money taken with no order.

**M14. Webhooks and things that happen later**
- Outcome: they understand that the important half of a payment arrives separately.
- Live (90 min): the webhook, signature verification, a log table, and a deliberately
  failing delivery replayed.
- Recorded: 5 lessons, about 45 min. What a webhook is, verifying it is really from the
  provider, idempotency and duplicate deliveries, logging every attempt, and debugging
  a webhook that never arrives (wrong URL, wrong environment, wrong secret).
- Ships: a webhook handler with a `webhook_logs` table.
- Staged failure: point the provider at a stale endpoint path and let the room work
  out from the logs that nothing ever hit the server.

**M15. Email that actually arrives**
- Outcome: a confirmation email lands in a real inbox, from their own domain.
- Live (90 min): Resend, a domain, the template, and a send that fails on purpose.
- Recorded: 5 lessons, about 42 min. Transactional versus marketing, sending domains
  and DNS records, building a link that works in an email client, what happens when
  the send throws after the payment succeeded, and never trusting a link a mail
  scanner might click before your customer does.
- Ships: a confirmation email with a working link.
- Staged failure: a link built from a misconfigured base URL. One character wrong,
  every link in every email dead. Told as a real postmortem.

### Part 4. Ship

**M16. Environments, secrets, and the vars that fail open**
- Outcome: they can name every secret their app has and what happens if one is missing.
- Live (60 min): audit the app's environment together, then delete a variable and watch.
- Recorded: 5 lessons, about 38 min. Local versus preview versus production, what
  `NEXT_PUBLIC_` really means, secrets that must never reach the browser, the danger of
  a config that falls back to live mode when a variable is absent, and a startup guard
  that refuses to boot rather than boot wrong.
- Ships: an env checklist and a boot-time guard.
- Staged failure: a payment config that defaults to live credentials when the sandbox
  flag is missing.

**M17. Deploy, and proving what you deployed**
- Outcome: they ship, and then they verify the thing they shipped is the thing running.
- Live (90 min): deploy, then find the stale asset, then force a clean build.
- Recorded: 5 lessons, about 40 min. Preview deploys and why every PR gets one,
  production promotion, caching and stale assets, verifying by looking at what the
  server actually served rather than at the build log, and rolling back.
- Ships: a production URL on their own domain.
- Staged failure: a build log full of green with an old stylesheet still being served.

### Part 5. Keep it alive

**M18. The hardening pass**
- Outcome: they can take one of their own loose builds to something sellable.
- Live (2 sessions, 90 min each): a full pass over Bookline. Error handling, empty
  states, loading states, permissions rechecked, the schema reviewed, secrets audited,
  accessibility basics, mobile.
- Recorded: 7 lessons, about 60 min, structured as a checklist they keep.
- Ships: a hardening checklist with every box either ticked or explicitly waived.
- Staged failure: the app on a phone, on a slow connection, with an empty database.

**M19. Tests that earn their place**
- Outcome: they write few tests, and the ones they write catch real things.
- Live (90 min): write a test that would have caught one of the staged failures from
  an earlier module.
- Recorded: 5 lessons, about 45 min. What to test and what never to, testing the
  boundary rather than the implementation, one end-to-end path, running tests in CI,
  and the trap of a test that passes while measuring the wrong thing.
- Ships: a small test suite plus one end-to-end path, green in CI.
- Staged failure: a guard test that passes for the wrong reason. Change the code it
  guards and watch it keep passing.

**M20. Systematic debugging**
- Outcome: they stop guessing.
- Live (90 min): the instructor debugs something genuinely unknown on screen, out loud.
- Recorded: 5 lessons, about 45 min. Reproduce before you fix, read the actual error,
  bisect, form one hypothesis at a time, change one thing, and the discipline of not
  pasting the stack trace into the chat as the first move.
- Ships: a written debug log of one bug they solved.
- Staged failure: a bug whose symptom is three layers from its cause.

**M21. Time, timezones, and other silent liars**
- Outcome: they never ship a business app that thinks tomorrow started at 8pm.
- Live (60 min): find every place in Bookline that computes "today" and fix them all.
- Recorded: 4 lessons, about 35 min. Storing time correctly, the difference between the
  server's day and the business's day, one helper and the discipline of using it
  everywhere, and the class of bug where the same wrong assumption is copied into
  twenty call sites.
- Ships: one `businessToday()` helper and a clean grep proving nothing bypasses it.
- Staged failure: a booking that lands on the wrong day for exactly four hours a night.

### Part 6. Work like a professional

**M22. Git, branches, PRs, and real code review**
- Outcome: they can work in someone else's repository without being a liability.
- Live (90 min): students review each other's pull requests, live, with the instructor
  moderating.
- Recorded: 5 lessons, about 42 min. Branching, commits worth reading, opening a PR,
  receiving review without defending, giving review without being unkind, and merge
  conflicts.
- Ships: two reviews given and one PR merged after review.
- Staged failure: a PR with thirty files and no description. Ask the room to review it.

**M23. Scope, cut, finish, hand off**
- Outcome: they finish. Most people never do.
- Live (90 min): the last 10 percent, the demo, and the README that lets a stranger run it.
- Recorded: 4 lessons, about 35 min. Knowing when it is done, cutting late without
  guilt, writing the handoff, and what a client or hiring manager actually looks at.
- Ships: a finished repo with a real README and a live URL.
- Staged failure: none. This one ends on the win.

---

## 5. Module map by program

Prices and durations from `lib/divisions.ts`. All three Learn cohort prices are
currently `proposed: true` placeholders, so if a program length changes here the
site copy has to change with it.

| # | Module | Build Your First App (4 wk, $497) | AI-Assisted Development (6 wk, $897) | Vibe Coding to Real (8 wk, $1,200) |
|---|---|---|---|---|
| M0 | Setup and first commit | Full | Skim | Skim |
| M1 | Spec and cut list | Light | Full | Full |
| M2 | CLAUDE.md | Light | Full | Full |
| M3 | Prototype and hardening | Light | Full | Full |
| M4 | Reading code you did not write | Skip | Full | Full |
| M5 | Where the model lies | Light | Full | Full |
| M6 | App Router | Full | Light | Skip |
| M7 | Design that is not a template | Full | Light | Light |
| M8 | Data modeling | Full | Full | Full |
| M9 | Idempotent migrations | Skip | Light | Full |
| M10 | Auth and one intake path | Full | Full | Full |
| M11 | RLS and the real boundary | Light | Full | Full |
| M12 | Forms and validation | Full | Full | Full |
| M13 | Taking money | Light | Full | Full |
| M14 | Webhooks | Skip | Full | Full |
| M15 | Email | Light | Full | Full |
| M16 | Env and secrets | Light | Full | Full |
| M17 | Deploy and verify | Full | Full | Full |
| M18 | Hardening pass | Skip | Light | Full, 2 sessions |
| M19 | Tests that earn their place | Skip | Light | Full |
| M20 | Systematic debugging | Skip | Full | Full |
| M21 | Time and timezones | Skip | Light | Full |
| M22 | Git, PRs, code review | Light | Full | Full |
| M23 | Scope, cut, finish | Full | Full | Full |

Reading the map:

- **Build Your First App** is the happy path. The stack works, the student ships. The
  hard modules appear as a sentence of warning, not a session.
- **AI-Assisted Development** is the flagship and the one the whole Part 1 exists for.
  Students arrive able to build a little and leave able to direct and verify.
- **Vibe Coding to Real** replaces Bookline with the student's own existing project.
  Same modules, their codebase. Parts 4 and 5 carry the weight.
- **Career Transition (12 wk)** is all 24 modules plus a collaborative repo, interview
  prep, and portfolio review. It is the master curriculum, uncut.
- **Kids and Teens** and **55+** are separate curricula, not cuts of this one. Do not
  try to fold them in.
- **Self-Paced ($29+)** sells single recorded modules or small bundles. M1 to M5 as a
  standalone "Direct the Machine" bundle is the obvious first product.

---

## 6. The live version: weekly cohort

### Session anatomy, 90 minutes, every week the same

Consistency is the point. Students should know the shape by week two.

| Minutes | Block | What happens |
|---|---|---|
| 0 to 10 | Ships | Two or three students show what they built last week. Not slides, the running app. |
| 10 to 25 | The idea | The concept, at the whiteboard, no editor open. |
| 25 to 60 | Live build | Instructor builds, students follow along in their own repo. Camera on the editor. |
| 60 to 75 | You build | Students build the next piece alone, instructor answers in the room. |
| 75 to 85 | Review | Look at two students' work on screen. Assign the week. |
| 85 to 90 | Next week | One sentence of what is coming and why it matters. |

### Between sessions

- One async channel, questions answered within 24 hours on weekdays.
- One 60-minute open office hour mid-week, recorded and posted.
- **One code review per student per week.** This is the promise on the site and the
  real cost driver. It is what makes the program worth the money and it is what caps
  cohort size.

### Cohort limits

- Cap at 12 for the $497 and $897 programs. Twelve reviews a week is about four hours.
- Cap at 8 for Vibe Coding to Real, because reviewing someone else's existing codebase
  takes far longer than reviewing a build against a known reference.
- Below 5 enrolled, postpone rather than run it thin. Say so in the enrollment terms.

### Calendar by program

- **4 weeks:** M0 pre-work. Wk1 M6 and M7, Wk2 M8 and M10, Wk3 M12 and M13, Wk4 M17
  and M23. One live session plus one office hour each week.
- **6 weeks:** M0 pre-work. Wk1 M1 to M3, Wk2 M4 and M5, Wk3 M8 and M10, Wk4 M11 and
  M12, Wk5 M13 to M15, Wk6 M16, M17, M20, M22, M23. Heavy back half, warn them.
- **8 weeks:** as above, spread, plus M9, M18 across two sessions, M19, M21. Weeks 1
  and 2 are spent on their project rather than Bookline, including a live audit of
  what they arrive with.

### When the live demo breaks

It will, and this is an asset rather than a problem, up to a limit.

1. Debug it live for up to 8 minutes. This is the most valuable teaching in the
   program and it cannot be faked.
2. At 8 minutes, say "this is what a timebox looks like," check out the module's
   `-end` tag, and continue.
3. Fix it after class and post a two-paragraph writeup of what it actually was.
   That writeup becomes a lesson in the recorded course.

### Live ops checklist

- Zoom or Meet, recorded to the cloud every session, no exceptions.
- Repo access for every student in the GitHub org before week one.
- Attendance and refund terms in writing at enrollment, including the postpone rule.
- A single pinned document with tags, links, and the week's assignment.
- The cohort recording goes to the cohort. It is not the recorded product. See below.

---

## 7. The recorded version: evergreen

### The rule that matters most

**Do not sell the cohort tape.** A recorded course is a different edit, not a
rerun. Cohort recordings are a cohort benefit. The evergreen product is shot
deliberately, in short lessons, with no references to a room, a date, or a person.

### Lesson unit

- 6 to 12 minutes. One idea, one visible result at the end.
- Every lesson opens on the finished state for ten seconds, then builds to it.
- Every lesson names its entry tag on screen so a student can start there cold.
- Roughly 115 lessons across 24 modules, about 17 hours of finished runtime.

### What never goes on tape

- Dates, cohort references, "as we discussed last week," "this is new as of."
- Version numbers in the spoken audio. Put them in an on-screen card that can be
  re-rendered without re-recording.
- Prices. They change, and the site is the source of truth.
- Any real client name, real customer email, real phone number, or real key. Seed the
  demo database with obviously fake data and keep the pre-commit PII hook armed.
- The env panel, the browser bookmarks bar, the notification tray, other tabs.

### Capture setup

- 1920x1080, editor and terminal at a font size that is readable at 50 percent scale
  on a phone. Test this before recording lesson one, not after lesson forty.
- Two audio passes are not needed. Record clean, do not re-record small stumbles, a
  stumble reads as human and a perfect take reads as a sales video.
- Screen only for build lessons. Face on camera for the framing lessons in Part 1 and
  Part 6, where the argument matters more than the code.
- Captions on everything. It is the single highest-return accessibility item and it
  doubles as search.

### Recording order

Record by module, not by calendar. Suggested batches, each one shippable alone:

1. **Batch A, Direct the Machine (M1 to M5).** About 3.5 hours. This is also the first
   standalone Self-Paced product, and it is the batch that proves the format works.
2. **Batch B, Build the Thing (M6 to M12).** The longest batch, about 5 hours.
3. **Batch C, The Outside World and Ship (M13 to M17).** About 3.5 hours.
4. **Batch D, Keep It Alive and Professional (M18 to M23).** About 4.5 hours.
5. **M0** last, because setup instructions age fastest and should be freshest.

### Delivery

The infrastructure already exists and should be reused rather than rebuilt:

- Token-gated access at `/products/[product_id]`, protected by `proxy.ts`.
- Stripe webhook writes a purchase row and sends the access email through Resend.
- Permanent access links, the same model as the free toolkit at `/free/toolkit`,
  which is the natural top of funnel into the paid course.
- Self-Paced already sits in `lib/divisions.ts` at "From $29" pointing to `/store`.
  Batch A is the product that makes that line true.

Before selling: the digital product webhook path has an open issue on record (no email
on a test purchase). Verify a real test purchase end to end before any launch.

### Keeping it current

- Version the course. `v1.0` on launch, a visible changelog lesson at the top.
- Re-record triggers, not a calendar: a Next.js major, a Supabase auth or API change,
  a Tailwind major, or a provider changing its checkout flow.
- Because lessons are 6 to 12 minutes and tagged, a breaking change costs three
  lessons rather than a module.
- Anything that changes in the live cohort gets written down in this file the same
  week, so the next recording batch inherits it.

---

## 8. Build order before cohort one

In order. Do not skip ahead to recording.

1. Build Bookline end to end yourself, in prototype mode, and click through it. One
   week. You cannot teach the arc until you have walked it in this exact stack.
2. Harden it in one pass and tag every module boundary. This is also M18's demo.
3. Write the student-facing syllabus for the flagship (M1 to M23, six weeks) and put
   it on `/learn` as the program detail.
4. Write the ten-line spec template, the review checklist, and the hardening checklist
   as three one-page handouts. These are the most-shared artifacts you will produce.
5. Run the flagship live once, at a founding-cohort price, cap 8, and record it for
   yourself. Take notes on every place the room got lost.
6. Rewrite this file from those notes.
7. Then record Batch A.

---

## 9. Open decisions

- **Program lengths versus the site.** The map above fits 4, 6, and 8 weeks as
  published. If the flagship really needs 8, the site copy changes, not the curriculum.
- **The founding cohort price.** All Learn prices are placeholders. A founding cohort
  at a discount in exchange for testimonials and recording rights is the usual move,
  but that is a decision, not a default.
- **Where the live class runs.** Zoom plus a chat channel plus the GitHub org is the
  minimum. Whether it needs a real LMS depends on whether Self-Paced grows past a few
  bundles.
- **Kids and Teens, and 55+.** Separate curricula. Not started, not covered here.
- **`docs/positioning.md` predates the six-division reposition** and still describes an
  operations system studio. Anything written for `/learn` should follow the divisions
  file and the current positioning, not that document.
