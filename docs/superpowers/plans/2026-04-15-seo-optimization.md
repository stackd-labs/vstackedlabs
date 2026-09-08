# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize stackdstudiosai.com for national Google ranking targeting AI build lab, AI venture studio, and AI automation for business owners and founders.

**Architecture:** Three-layer approach — (1) upgrade global metadata in `app/layout.tsx` with `metadataBase`, title template, full OG/Twitter, and JSON-LD; (2) add per-page `metadata` exports to all public pages (client pages get split into server wrapper + client component); (3) add `app/sitemap.ts` and `public/robots.txt` for crawler infrastructure.

**Tech Stack:** Next.js 16.2.3 App Router, TypeScript, `next/font`, `Metadata` type from `next`

---

## File Map

**Modified:**
- `app/layout.tsx` — global metadata upgrade + JSON-LD script
- `app/page.tsx` — add metadata export
- `app/about/page.tsx` — add metadata export
- `app/careers/page.tsx` — add metadata export
- `app/business-brain/page.tsx` — add metadata export

**Created (server wrapper pattern for 'use client' pages):**
- `app/services/ServicesContent.tsx` — rename current `page.tsx` content here
- `app/services/page.tsx` — new server component, exports metadata, renders `<ServicesContent />`
- `app/pricing/PricingContent.tsx` — rename current `page.tsx` content here
- `app/pricing/page.tsx` — new server component, exports metadata, renders `<PricingContent />`
- `app/store/StoreContent.tsx` — rename current `page.tsx` content here
- `app/store/page.tsx` — new server component, exports metadata, renders `<StoreContent />`
- `app/contact/ContactContent.tsx` — rename current `page.tsx` content here
- `app/contact/page.tsx` — new server component, exports metadata + JSON-LD, renders `<ContactContent />`

**New files:**
- `app/sitemap.ts` — auto-generates `/sitemap.xml`
- `public/robots.txt` — crawler rules

---

## Task 1: Upgrade global metadata in `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace the `metadata` export**

Open `app/layout.tsx`. Replace the existing `metadata` export (lines 23–32) with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.stackdstudiosai.com'),
  title: {
    default: 'Stackd Studios AI — AI Build Lab & Venture Studio',
    template: '%s | Stackd Studios AI',
  },
  description:
    'Stackd Studios AI is an AI-powered build lab and venture studio helping business owners automate workflows and founders launch products. National. Remote. Results-driven.',
  keywords: [
    'AI build lab',
    'AI venture studio',
    'AI automation services',
    'AI automation for small business',
    'custom AI tools',
    'AI agency',
    'AI workflow automation',
    'book AI consultation',
  ],
  openGraph: {
    title: 'Stackd Studios AI — AI Build Lab & Venture Studio',
    description:
      'AI-powered systems for business owners and founders. Automate workflows, launch products, and build ventures — faster.',
    type: 'website',
    url: 'https://www.stackdstudiosai.com',
    siteName: 'Stackd Studios AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stackd Studios AI — AI Build Lab & Venture Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackd Studios AI — AI Build Lab & Venture Studio',
    description:
      'AI-powered build lab for business owners and founders. Automate. Build. Launch.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

- [ ] **Step 2: Add JSON-LD Organization + WebSite schema**

In `app/layout.tsx`, add this JSON-LD block inside the `<body>` tag, before `<ScrollProgress />`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          name: 'Stackd Studios AI',
          url: 'https://www.stackdstudiosai.com',
          logo: 'https://www.stackdstudiosai.com/logo.png',
          email: 'Chanel@stackdstudiosai.com',
          founder: { '@type': 'Person', name: 'Chanel Gray' },
          sameAs: [],
        },
        {
          '@type': 'WebSite',
          url: 'https://www.stackdstudiosai.com',
          name: 'Stackd Studios AI',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.stackdstudiosai.com/?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        },
      ],
    }),
  }}
/>
```

- [ ] **Step 3: Verify the file compiles**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing unrelated errors).

- [ ] **Step 4: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/layout.tsx
git commit -m "seo: upgrade global metadata, OG, Twitter cards, JSON-LD org schema"
```

---

## Task 2: Add sitemap and robots.txt

**Files:**
- Create: `app/sitemap.ts`
- Create: `public/robots.txt`

- [ ] **Step 1: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.stackdstudiosai.com'
  const now = new Date()

  return [
    { url: base,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/services`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/business-brain`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/store`,             lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/about`,             lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/careers`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
  ]
}
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Disallow: /admin
Disallow: /api/
Disallow: /products/

Sitemap: https://www.stackdstudiosai.com/sitemap.xml
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/sitemap.ts public/robots.txt
git commit -m "seo: add sitemap.ts and robots.txt"
```

---

## Task 3: Add metadata to server-component pages

These pages have no `'use client'` directive — metadata exports go directly in `page.tsx`.

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/careers/page.tsx`
- Modify: `app/business-brain/page.tsx`

- [ ] **Step 1: Add metadata to `app/page.tsx`**

Add this at the top of `app/page.tsx` (after any existing imports, before the component):

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Build Lab & Venture Studio — Stackd Studios AI',
  description:
    'Stackd Studios AI is an AI-powered build lab and venture studio. We help business owners automate workflows and founders launch products — nationally, remotely, and built to last.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com',
  },
  openGraph: {
    title: 'AI Build Lab & Venture Studio — Stackd Studios AI',
    description:
      'AI-powered systems for business owners and founders. Automate workflows, launch products, and build ventures — faster.',
    url: 'https://www.stackdstudiosai.com',
  },
}
```

- [ ] **Step 2: Add metadata to `app/about/page.tsx`**

Add after existing imports:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Stackd Studios AI — Who We Are & What We Build',
  description:
    'Stackd Studios AI is an AI-powered build lab founded by Chanel Gray. We help business owners automate and founders launch — with AI systems built to last.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/about',
  },
  openGraph: {
    title: 'About Stackd Studios AI — Who We Are & What We Build',
    description:
      'Founded by Chanel Gray. We build AI systems for business owners and product founders — nationally, remotely.',
    url: 'https://www.stackdstudiosai.com/about',
  },
}
```

- [ ] **Step 3: Add metadata to `app/careers/page.tsx`**

Add after existing imports:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at Stackd Studios AI — Remote AI Jobs',
  description:
    'Join Stackd Studios AI — a fully remote, AI-native build lab. We hire builders, designers, and operators who move fast and think differently.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/careers',
  },
  openGraph: {
    title: 'Careers at Stackd Studios AI — Remote AI Jobs',
    description:
      'Join a fully remote, AI-native build lab. Contract, part-time, and freelance roles available.',
    url: 'https://www.stackdstudiosai.com/careers',
  },
}
```

- [ ] **Step 4: Add metadata to `app/business-brain/page.tsx`**

Add after existing imports:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Brain — Your Custom AI Knowledge Base',
  description:
    'Business Brain is your always-on AI assistant trained on your business. Ask questions, get answers, and make smarter decisions faster — powered by Stackd Studios AI.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/business-brain',
  },
  openGraph: {
    title: 'Business Brain — Your Custom AI Knowledge Base',
    description:
      'An always-on AI assistant trained on your business. Ask questions, get instant answers.',
    url: 'https://www.stackdstudiosai.com/business-brain',
  },
}
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/page.tsx app/about/page.tsx app/careers/page.tsx app/business-brain/page.tsx
git commit -m "seo: add per-page metadata to server component pages"
```

---

## Task 4: Split /services into server wrapper + client component

`app/services/page.tsx` has `'use client'` — can't export metadata. Split it.

**Files:**
- Create: `app/services/ServicesContent.tsx` (current page content, verbatim)
- Modify: `app/services/page.tsx` (replace with server wrapper)

- [ ] **Step 1: Read the current `app/services/page.tsx`**

Read the full file before making any changes.

- [ ] **Step 2: Create `app/services/ServicesContent.tsx`**

Copy the **entire contents** of `app/services/page.tsx` into `app/services/ServicesContent.tsx`. Change the export name from `default function ServicesPage` (or whatever it is) to `export default function ServicesContent`. Keep `'use client'` at the top.

- [ ] **Step 3: Replace `app/services/page.tsx` with server wrapper**

```tsx
import type { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
  title: 'AI Automation Services for Business Owners & Founders',
  description:
    'From AI Quick Setup to full Venture Launch — explore our AI automation services for small business owners and product founders. Custom tools, workflow automation, AI retainer.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/services',
  },
  openGraph: {
    title: 'AI Automation Services for Business Owners & Founders',
    description:
      'AI workflow automation, custom AI tools, retainer plans, and venture launch packages. Built for business owners and founders.',
    url: 'https://www.stackdstudiosai.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
```

- [ ] **Step 4: Verify the page renders**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -20
```

Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/services/ServicesContent.tsx app/services/page.tsx
git commit -m "seo: split /services into server wrapper + client component, add metadata"
```

---

## Task 5: Split /pricing into server wrapper + client component

**Files:**
- Create: `app/pricing/PricingContent.tsx`
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Read the current `app/pricing/page.tsx`**

Read the full file before making any changes.

- [ ] **Step 2: Create `app/pricing/PricingContent.tsx`**

Copy the **entire contents** of `app/pricing/page.tsx` into `app/pricing/PricingContent.tsx`. Change the export name to `export default function PricingContent`. Keep `'use client'` at the top.

- [ ] **Step 3: Replace `app/pricing/page.tsx` with server wrapper**

```tsx
import type { Metadata } from 'next'
import PricingContent from './PricingContent'

export const metadata: Metadata = {
  title: 'AI Development & Automation Pricing',
  description:
    'Transparent pricing for AI automation, custom AI tool builds, and venture launch packages from Stackd Studios AI. No surprises — see exactly what\'s included.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/pricing',
  },
  openGraph: {
    title: 'AI Development & Automation Pricing',
    description:
      'Clear pricing for AI Quick Setup, Micro Tool Builds, AI Retainers, and Venture Launch packages.',
    url: 'https://www.stackdstudiosai.com/pricing',
  },
}

export default function PricingPage() {
  return <PricingContent />
}
```

- [ ] **Step 4: Verify**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/pricing/PricingContent.tsx app/pricing/page.tsx
git commit -m "seo: split /pricing into server wrapper + client component, add metadata"
```

---

## Task 6: Split /store into server wrapper + client component

**Files:**
- Create: `app/store/StoreContent.tsx`
- Modify: `app/store/page.tsx`

- [ ] **Step 1: Read the current `app/store/page.tsx`**

Read the full file before making any changes.

- [ ] **Step 2: Create `app/store/StoreContent.tsx`**

Copy the **entire contents** of `app/store/page.tsx` into `app/store/StoreContent.tsx`. Change the export name to `export default function StoreContent`. Keep `'use client'` at the top.

- [ ] **Step 3: Replace `app/store/page.tsx` with server wrapper**

```tsx
import type { Metadata } from 'next'
import StoreContent from './StoreContent'

export const metadata: Metadata = {
  title: 'AI Templates & Prompt Packs — Stackd Studios AI Store',
  description:
    'Download AI prompt packs and business templates built by the Stackd Studios AI team. Tools that work the moment you open them — for business owners and founders.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/store',
  },
  openGraph: {
    title: 'AI Templates & Prompt Packs — Stackd Studios AI Store',
    description:
      'Downloadable AI tools, prompt packs, and business templates. Ready to use immediately.',
    url: 'https://www.stackdstudiosai.com/store',
  },
}

export default function StorePage() {
  return <StoreContent />
}
```

- [ ] **Step 4: Verify**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/store/StoreContent.tsx app/store/page.tsx
git commit -m "seo: split /store into server wrapper + client component, add metadata"
```

---

## Task 7: Split /contact into server wrapper + client component + JSON-LD

**Files:**
- Create: `app/contact/ContactContent.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Read the current `app/contact/page.tsx`**

Read the full file before making any changes.

- [ ] **Step 2: Create `app/contact/ContactContent.tsx`**

Copy the **entire contents** of `app/contact/page.tsx` into `app/contact/ContactContent.tsx`. Change the export name to `export default function ContactContent`. Keep `'use client'` at the top.

- [ ] **Step 3: Replace `app/contact/page.tsx` with server wrapper + JSON-LD**

```tsx
import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Book a Free AI Strategy Call',
  description:
    'Book a free 30-minute discovery call with Stackd Studios AI. We\'ll map out what AI can do for your business or product — no pitch, just strategy.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/contact',
  },
  openGraph: {
    title: 'Book a Free AI Strategy Call — Stackd Studios AI',
    description:
      'Free 30-minute discovery call. We\'ll map out exactly what AI can do for your business or product right now.',
    url: 'https://www.stackdstudiosai.com/contact',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Stackd Studios AI',
  url: 'https://www.stackdstudiosai.com',
  email: 'Chanel@stackdstudiosai.com',
  areaServed: 'US',
  serviceType: 'AI Automation & Venture Studio',
  priceRange: '$$',
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  )
}
```

- [ ] **Step 4: Verify**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 5: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/contact/ContactContent.tsx app/contact/page.tsx
git commit -m "seo: split /contact into server wrapper + client component, add metadata + JSON-LD"
```

---

## Task 8: Add JSON-LD Service schema to /services

**Files:**
- Modify: `app/services/page.tsx`

- [ ] **Step 1: Add `ItemList` of services JSON-LD to `app/services/page.tsx`**

In `app/services/page.tsx`, update the default export to include a JSON-LD script:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Automation Services — Stackd Studios AI',
  url: 'https://www.stackdstudiosai.com/services',
  itemListElement: [
    { '@type': 'Service', position: 1, name: 'AI Quick Setup',         description: 'Get AI tools and automations running in your business fast.',              provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 2, name: 'AI Business Build-Out',  description: 'Full AI system design and implementation for your business.',             provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 3, name: 'Micro Tool Build',       description: 'Custom AI-powered micro tools built for your specific workflow.',          provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 4, name: 'AI Retainer',            description: 'Ongoing AI support, builds, and optimization on a monthly retainer.',      provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 5, name: 'Strategy Session',       description: 'Deep-dive session to define your AI strategy and product roadmap.',        provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 6, name: 'Founder Build Sprint',   description: 'Rapid build sprint to take your product from idea to working prototype.', provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
    { '@type': 'Service', position: 7, name: 'Venture Launch Package', description: 'Full venture launch: strategy, build, and go-to-market in one package.',  provider: { '@type': 'Organization', name: 'Stackd Studios AI' } },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}
```

- [ ] **Step 2: Verify**

```bash
cd /c/Users/hicks/stackd-studio && npx tsc --noEmit 2>&1 | head -20
```

- [ ] **Step 3: Commit**

```bash
cd /c/Users/hicks/stackd-studio
git add app/services/page.tsx
git commit -m "seo: add Service JSON-LD schema to /services"
```

---

## Task 9: Audit H1s for keyword presence

Check that primary keywords appear somewhere visible (H1, eyebrow heading, or prominent subheading) on key pages. Meta descriptions and titles are already set — this task confirms on-page signals match.

**Files:** Read-only audit; edit only if a keyword is completely absent from any visible heading.

- [ ] **Step 1: Check `/` — keyword: "AI build lab" or "AI venture studio"**

Read `components/Hero.tsx`. Look for "AI build lab", "AI venture studio", or "AI-Powered Build Lab" in any heading or eyebrow div. If present in any visible element (not just a CSS class name), no change needed. The eyebrow div currently reads "AI-Powered Build Lab & Venture Studio" — this satisfies the requirement.

- [ ] **Step 2: Check `/services` — keyword: "AI automation services"**

Read `app/services/ServicesContent.tsx` (created in Task 4). Search for "AI automation" in headings or the page hero. If absent, add it to the page's hero `<h1>` or subtitle text.

- [ ] **Step 3: Check `/about` — Chanel Gray name in copy**

Read `app/about/page.tsx`. Confirm "Chanel Gray" appears in visible body copy (not just metadata). If absent, it can be added to a brief bio paragraph if one exists; skip if no natural place exists.

- [ ] **Step 4: Check `/contact` — "discovery call" or "strategy call" in heading**

Read `app/contact/ContactContent.tsx` (created in Task 7). Search for "discovery call", "strategy call", or "book a call" in headings. If absent from any `<h1>` or `<h2>`, add to the primary CTA heading.

- [ ] **Step 5: Check `/store` — "AI templates" or "prompt packs" in headings**

Read `app/store/StoreContent.tsx` (created in Task 6). Search for "AI templates", "prompt packs" in section headings. If absent, no change needed — the page title carries the keyword signal.

- [ ] **Step 6: Commit any changes made**

```bash
cd /c/Users/hicks/stackd-studio
git add -A
git commit -m "seo: on-page H1/heading keyword audit and adjustments"
```

If no changes were needed, skip this step.

---

## Task 10: Push to remote

- [ ] **Step 1: Push all commits**

```bash
cd /c/Users/hicks/stackd-studio && git push
```

Expected: all commits pushed to origin.

---

## Post-Deploy Checklist (User Actions)

After deploying to Vercel:

1. **Submit sitemap** — Go to [Google Search Console](https://search.google.com/search-console) → Sitemaps → submit `https://www.stackdstudiosai.com/sitemap.xml`
2. **Add OG image** — Create a 1200×630 branded image and save to `public/og-image.png`, then deploy
3. **Verify robots.txt** — Visit `https://www.stackdstudiosai.com/robots.txt` to confirm it's live
4. **Test structured data** — Use [Google Rich Results Test](https://search.google.com/test/rich-results) with the site URL
5. **Request indexing** — In Search Console → URL Inspection → request indexing for homepage
