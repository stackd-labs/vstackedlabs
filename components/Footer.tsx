'use client'

import Link from 'next/link'
import Image from 'next/image'
import FooterToolkitOptIn from './FooterToolkitOptIn'

const footerColumns = [
  {
    heading: 'Studio',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Careers', href: '/careers' },
      { label: 'Store', href: '/store' },
      { label: 'Free AI Toolkit', href: '/ai-toolkit' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Systems Audit — $397', href: '/services#audit' },
      { label: 'Build Sprint — $997', href: '/services#quick-setup' },
      { label: 'Team Enablement — From $2,500', href: '/services#team-training' },
      { label: 'Operating Partner — $1,500/mo', href: '/services#retainer' },
      { label: 'Website Build — $1,800–$3,000', href: '/services#website-build' },
    ],
  },
  {
    heading: 'Build With Us',
    links: [
      { label: 'Stackd Interactive', href: '/interactive' },
      { label: 'Business Brain', href: '/business-brain' },
      { label: 'Demo Lab', href: '/lab' },
      { label: 'Industries', href: '/industries' },
      { label: 'Book a Call', href: '/contact' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/stackdstudiosai' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@stackdstudiosai' },
      { label: 'X', href: 'https://x.com/stackdstudiosai' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Email capture */}
        <div className="pt-12 md:pt-16">
          <FooterToolkitOptIn />
        </div>

        {/* Top section */}
        <div className="pb-4 md:pb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 md:gap-10">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 group"
              aria-label="Stackd Studios AI home"
            >
              <span className="font-semibold text-base tracking-tight font-[family-name:var(--font-instrument-sans)]">
                Stackd Studios AI
              </span>
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
              The system your business runs on.
            </p>
            <p className="text-[#4B4F55] text-xs">
              A Hicks Virtual Solutions company
            </p>
            <p className="text-[#4B4F55] text-xs mt-1">
              Based in the United States
            </p>
            <a
              href="mailto:Chanel@stackdstudiosai.com"
              className="text-[#6B7280] hover:text-[#FFD84D] text-xs mt-2 transition-colors duration-200 block"
            >
              Chanel@stackdstudiosai.com
            </a>
          </div>

          {/* Footer columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-white text-xs font-normal uppercase tracking-[0.1em] mb-5 font-[family-name:var(--font-instrument-sans)]">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3" role="list">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith('http')
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[#9CA3AF] hover:text-[#FFD84D] text-sm transition-colors duration-200"
                        {...(isExternal
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Logo image — fills remaining space */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1 flex items-start justify-center -mt-12">
            <div className="relative w-full min-h-[280px]">
              <Image
                src="/stackd-logo-white.png"
                alt="Stackd Studios AI"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom row */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-[#6B7280] text-sm">
            © {new Date().getFullYear()} Stackd Studios AI LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[#6B7280] hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#374151]" aria-hidden="true">·</span>
            <Link href="/terms" className="text-[#6B7280] hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#374151]" aria-hidden="true">·</span>
            <Link href="/sitemap" className="text-[#6B7280] hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
