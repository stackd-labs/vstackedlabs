import type { Metadata } from 'next'
import { Anton, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow from '@/components/CursorGlow'
import ToastProvider from '@/components/ToastProvider'
import { CartProvider } from '@/components/CartContext'
import { TAGLINE_TEXT } from '@/components/tech/data'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-instrument-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-mono',
})

// Site-wide copy for search engines and link previews. Tagline comes from the homepage constant.
const SITE_TITLE = `Stackd Studios AI: ${TAGLINE_TEXT}`
const SITE_SHORT = `A technology ecosystem. ${TAGLINE_TEXT}`
const SITE_DESCRIPTION =
  'Stackd Studios AI is a technology ecosystem. We build software for clients, rescue apps that are broken or poorly built, train and verify technical talent, connect people with work, and build products of our own.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stackdstudiosai.com'),
  title: {
    default: SITE_TITLE,
    template: '%s | Stackd Studios AI',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'technology ecosystem',
    'custom software development',
    'MVP development',
    'web and mobile app development',
    'AI tools and agents',
    'workflow automation',
    'fractional technical team',
    'app rescue service',
    'fix my AI-built app',
    'vibe coded app rescue',
    'broken app repair',
    'verified technical talent',
    'remote developer jobs',
    'learn to build software with AI',
    'Stackd Studios AI',
    'Stackd',
  ],
  authors: [{ name: 'Stackd Studios AI', url: 'https://www.stackdstudiosai.com/about' }],
  creator: 'Stackd Studios AI',
  publisher: 'Stackd Studios AI',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SHORT,
    type: 'website',
    url: 'https://www.stackdstudiosai.com',
    siteName: 'Stackd Studios AI',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_SHORT,
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
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-[family-name:var(--font-instrument-sans)] bg-[#F6F4EF] text-[#0C0C0C] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://www.stackdstudiosai.com/#organization',
                  name: 'Stackd Studios AI',
                  alternateName: 'Stackd Studios',
                  url: 'https://www.stackdstudiosai.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://www.stackdstudiosai.com/favicon.png',
                    width: 512,
                    height: 512,
                  },
                  email: 'Chanel@stackdstudiosai.com',
                  slogan: TAGLINE_TEXT,
                  description: SITE_DESCRIPTION,
                  knowsAbout: [
                    'Custom Software Development',
                    'MVP Development',
                    'AI Agents and Automation',
                    'Application Rescue and Remediation',
                    'Technical Talent and Staffing',
                    'Software Development Training',
                  ],
                  areaServed: 'United States',
                  serviceType: ['Software Development', 'App Rescue', 'Technical Talent', 'Training'],
                  sameAs: [
                    'https://www.instagram.com/stackdstudiosai',
                    'https://www.tiktok.com/@stackdstudiosai',
                    'https://x.com/stackdstudiosai',
                    'https://discord.gg/5xcnpfbj6v',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.stackdstudiosai.com/#website',
                  url: 'https://www.stackdstudiosai.com',
                  name: 'Stackd Studios AI',
                  publisher: { '@id': 'https://www.stackdstudiosai.com/#organization' },
                },
                {
                  '@type': 'ProfessionalService',
                  '@id': 'https://www.stackdstudiosai.com/#service',
                  name: 'Stackd Studios AI',
                  url: 'https://www.stackdstudiosai.com',
                  image: 'https://www.stackdstudiosai.com/og-image.png',
                  priceRange: '$$',
                  telephone: '',
                  email: 'Chanel@stackdstudiosai.com',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'US',
                  },
                  openingHours: 'Mo-Fr 09:00-18:00',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Services',
                    itemListElement: [
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stackd Build: custom software, MVPs, AI tools and automations' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stackd Rescue: fixing broken, abandoned or AI-generated apps' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stackd Talent: verified technical talent' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stackd Learn: training for builders' } },
                    ],
                  },
                },
              ],
            }),
          }}
        />
        <ScrollProgress />
        <CursorGlow />
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  )
}
