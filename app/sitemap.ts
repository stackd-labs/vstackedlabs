import type { MetadataRoute } from 'next'
import { DIVISIONS } from '@/lib/divisions'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.stackdstudiosai.com'
  const now = new Date()

  const divisionRoutes: MetadataRoute.Sitemap = DIVISIONS.map((d) => ({
    url: `${base}/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [
    { url: base,                     lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/ecosystem`,      lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    ...divisionRoutes,
    { url: `${base}/services`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/industries`,     lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`,        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/pricing`,        lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/ai-toolkit`,     lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/business-brain`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/interactive`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/store`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/lab`,            lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${base}/free/toolkit`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/careers`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/privacy`,        lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${base}/terms`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
