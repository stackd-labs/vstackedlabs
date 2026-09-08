# SEO Optimization — Stackd Studios AI
**Date:** 2026-04-15
**Scope:** National SEO, metadata, structured data, sitemap, on-page keyword optimization
**Goal:** Rank on Google for AI build lab, AI venture studio, AI automation services; drive discovery calls and brand awareness for both Track A (business owners) and Track B (founders)

---

## 1. Technical Foundation

### 1.1 Global Metadata (`app/layout.tsx`)
- Set `metadataBase` to `https://www.stackdstudiosai.com` — required for Next.js to resolve absolute OG image URLs
- Add `title.template`: `"%s | Stackd Studios AI"` so per-page titles auto-suffix the brand
- Add `title.default`: `"Stackd Studios AI — AI Build Lab & Venture Studio"` for pages without explicit metadata
- Add `openGraph.images`: reference `/og-image.png` (1200×630 static asset at `public/og-image.png`)
- Add `twitter.card: "summary_large_image"` + `twitter.site`
- Add `robots`: `{ index: true, follow: true }`
- Add `alternates.canonical` at the per-page level (not globally — each page sets its own)

### 1.2 Sitemap (`app/sitemap.ts`)
Next.js App Router auto-serves `app/sitemap.ts` at `/sitemap.xml`. Export a function returning all public routes with `lastModified`, `changeFrequency`, and `priority`.

Pages included:
| Route | Priority | Change Freq |
|---|---|---|
| `/` | 1.0 | weekly |
| `/services` | 0.9 | monthly |
| `/pricing` | 0.8 | monthly |
| `/about` | 0.7 | monthly |
| `/business-brain` | 0.8 | monthly |
| `/store` | 0.8 | weekly |
| `/contact` | 0.9 | monthly |
| `/careers` | 0.6 | weekly |

### 1.3 Robots (`public/robots.txt`)
Allow all crawlers. Disallow `/admin`, `/api`, `/products` (token-gated). Point to sitemap URL.

### 1.4 OG Image
`public/og-image.png` — 1200×630. **Action required:** User to provide a branded image. For now, the metadata references the path; no image means OG falls back gracefully (no error).

---

## 2. Per-Page Metadata

Each `page.tsx` gets `export const metadata: Metadata`. Canonical URLs use the full `https://www.stackdstudiosai.com` base.

| Page | `<title>` (displayed in tab/SERP) | Meta description | Primary keyword |
|---|---|---|---|
| `/` | `AI Build Lab & Venture Studio — Stackd Studios AI` | We build AI-powered systems for business owners and founders. Automate your workflows, launch your product, or build your venture with Stackd Studios AI. | "AI build lab", "AI venture studio" |
| `/services` | `AI Automation Services for Business Owners & Founders` | From AI Quick Setup to full Venture Launch — explore our AI automation services for small business owners and product founders. | "AI automation services for small business" |
| `/pricing` | `AI Development & Automation Pricing — Stackd Studios AI` | Transparent pricing for AI automation, custom tool builds, and venture launch packages. No surprises — see exactly what's included. | "AI automation pricing" |
| `/about` | `About Stackd Studios AI — Who We Are & What We Build` | Stackd Studios AI is an AI-powered build lab and venture studio founded by Chanel Gray. We help business owners automate and founders launch. | "AI agency", "AI build lab" |
| `/business-brain` | `Business Brain — Your Custom AI Knowledge Base` | Business Brain is your always-on AI assistant trained on your business. Ask questions, get answers, and make smarter decisions faster. | "custom AI assistant for business" |
| `/store` | `AI Templates & Prompt Packs — Stackd Studios AI Store` | Download AI prompt packs and business templates built by the Stackd Studios AI team. Tools that work the moment you open them. | "AI business templates", "AI prompt packs" |
| `/careers` | `Careers at Stackd Studios AI — Remote AI Jobs` | Join a fully remote, AI-native build lab. We hire builders, designers, and operators who move fast and think differently. | "remote AI jobs" |
| `/contact` | `Book a Free AI Strategy Call — Stackd Studios AI` | Book a free 30-minute discovery call with Stackd Studios AI. We'll map out what AI can do for your business or product right now. | "book AI consultation", "AI strategy call" |

---

## 3. JSON-LD Structured Data

Inline `<script type="application/ld+json">` blocks. Added as server components — no client JS needed.

### 3.1 Root layout — `Organization` + `WebSite`
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Stackd Studios AI",
      "url": "https://www.stackdstudiosai.com",
      "logo": "https://www.stackdstudiosai.com/logo.png",
      "email": "Chanel@stackdstudiosai.com",
      "founder": { "@type": "Person", "name": "Chanel Gray" },
      "sameAs": []
    },
    {
      "@type": "WebSite",
      "url": "https://www.stackdstudiosai.com",
      "name": "Stackd Studios AI",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.stackdstudiosai.com/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

### 3.2 `/services` — `Service` items
One `Service` schema per major offering (AI Quick Setup, AI Business Build-Out, Micro Tool Build, AI Retainer, Strategy Session, Founder Build Sprint, Venture Launch Package).

### 3.3 `/contact` — `ProfessionalService`
```json
{
  "@type": "ProfessionalService",
  "name": "Stackd Studios AI",
  "url": "https://www.stackdstudiosai.com",
  "telephone": null,
  "email": "Chanel@stackdstudiosai.com",
  "areaServed": "US",
  "serviceType": "AI Automation & Venture Studio"
}
```

---

## 4. On-Page Copy Optimization

Changes are **surgical** — only H1s and subheadings where the primary keyword is absent. No full rewrites.

| Page | Change |
|---|---|
| `/` | Confirm H1 contains "AI build lab" or "AI venture studio" — adjust if not |
| `/services` | Confirm H1 or section heading contains "AI automation services" |
| `/about` | Ensure founder name (Chanel Gray) appears in page copy for brand entity signals |
| `/contact` | Confirm CTA heading references "discovery call" or "strategy call" |
| `/store` | Confirm product section headings use "AI templates" or "prompt packs" |

---

## 5. Out of Scope

- Blog / content engine (separate project, Phase 2)
- Link building / backlink strategy
- Google Search Console setup (user action — submit sitemap after deploy)
- OG image design (user to provide `public/og-image.png`)

---

## 6. Post-Deploy Actions (User)

1. Submit `https://www.stackdstudiosai.com/sitemap.xml` to Google Search Console
2. Add a branded `public/og-image.png` (1200×630)
3. Add social profile URLs to the `Organization` `sameAs` array in JSON-LD once confirmed
