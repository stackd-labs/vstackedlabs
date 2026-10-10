import type { MetadataRoute } from 'next'

// Homepage-only during the dark-tech rebuild. Add routes back as pages return
// (see docs/PAGE-INVENTORY.md).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.stackdstudiosai.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.stackdstudiosai.com/services', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.stackdstudiosai.com/labs', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.stackdstudiosai.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.stackdstudiosai.com/careers', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]
}
