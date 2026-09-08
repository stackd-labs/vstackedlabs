import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DIVISIONS } from '@/lib/divisions'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'A full index of pages on Stackd Studios AI.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/sitemap',
  },
}

const groups = [
  {
    heading: 'Main',
    pages: [
      { label: 'Home', href: '/' },
      { label: 'The Ecosystem', href: '/ecosystem' },
      { label: 'All Services', href: '/services' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Industries', href: '/industries' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Divisions',
    pages: DIVISIONS.map((d) => ({
      label: d.eyebrow,
      href: `/${d.slug}`,
    })),
  },
  {
    heading: 'Products & Studio',
    pages: [
      { label: 'Business Brain', href: '/business-brain' },
      { label: 'Stackd Interactive', href: '/interactive' },
      { label: 'Demo Lab', href: '/lab' },
      { label: 'Store', href: '/store' },
      { label: 'Free AI Toolkit', href: '/ai-toolkit' },
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F6F4EF] min-h-screen">
        <section className="pt-32 pb-16 bg-white border-b border-[#E2DED8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-4">Sitemap</p>
            <h1 className="text-[clamp(40px,6vw,72px)] text-[#0C0C0C] leading-[1.0] mb-6">
              Every page, one place.
            </h1>
            <p className="text-[#888580] text-xl leading-relaxed max-w-2xl">
              A full index of pages on Stackd Studios AI.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {groups.map((group) => (
              <div key={group.heading}>
                <h2 className="text-[#888580] text-xs font-semibold uppercase tracking-[0.12em] mb-6">
                  {group.heading}
                </h2>
                <ul className="flex flex-col" role="list">
                  {group.pages.map((p) => (
                    <li key={p.href} className="border-t border-[#E2DED8] last:border-b">
                      <Link
                        href={p.href}
                        className="group flex items-center justify-between py-4 text-[#0C0C0C] text-base font-medium hover:text-[#FFD84D] transition-colors"
                      >
                        <span>{p.label}</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          aria-hidden="true"
                          className="opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                        >
                          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-[#E2DED8]">
            <p className="text-[#888580] text-sm">
              Looking for the XML version for crawlers?{' '}
              <a
                href="/sitemap.xml"
                className="text-[#0C0C0C] font-medium hover:text-[#FFD84D] transition-colors underline underline-offset-2"
              >
                /sitemap.xml
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
