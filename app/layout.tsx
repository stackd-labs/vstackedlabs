import type { Metadata } from 'next'
import { Anton, Instrument_Sans } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow from '@/components/CursorGlow'
import ToastProvider from '@/components/ToastProvider'
import { CartProvider } from '@/components/CartContext'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stackdstudiosai.com'),
  title: {
    default: 'Stackd Studios AI — Operations System Studio',
    template: '%s | Stackd Studios AI',
  },
  description:
    'Stackd Studios is an operations system studio. We build the custom software and automations owner-run businesses run on — and launch products of our own. Solutions, automation, and venture studio in one.',
  keywords: [
    'operations system studio',
    'custom business software',
    'workflow automation',
    'business process automation',
    'custom software for small business',
    'automation studio',
    'venture studio',
    'client portals and dashboards',
    'custom internal software',
    'SaaS development',
    'build the system your business runs on',
    'AI automation',
    'Chanel Gray',
    'Stackd Studios',
    'Hicks Virtual Solutions',
  ],
  authors: [{ name: 'Chanel Gray', url: 'https://www.stackdstudiosai.com/about' }],
  creator: 'Chanel Gray',
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
    title: 'Stackd Studios AI — Operations System Studio',
    description:
      'Custom software and automations your business runs on. We build the systems you can’t buy off the shelf — and ship products of our own.',
    type: 'website',
    url: 'https://www.stackdstudiosai.com',
    siteName: 'Stackd Studios AI',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stackd Studios AI — Operations System Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stackd Studios AI — Operations System Studio',
    description:
      'The custom systems your business runs on — built, automated, and shipped. Solutions, automation, and venture studio.',
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
    <html lang="en" className={`${anton.variable} ${instrumentSans.variable}`}>
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
                  founder: {
                    '@type': 'Person',
                    name: 'Chanel Gray',
                    jobTitle: 'Founder & CEO',
                    worksFor: { '@id': 'https://www.stackdstudiosai.com/#organization' },
                  },
                  description: 'Operations system studio building custom software and automations for owner-run businesses — and launching products of its own.',
                  knowsAbout: ['Custom Software Development', 'Workflow Automation', 'Business Operations Systems', 'Product Development', 'Software Engineering'],
                  areaServed: 'United States',
                  serviceType: ['Custom Software', 'Business Automation', 'Venture Studio'],
                  sameAs: [],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.stackdstudiosai.com/#website',
                  url: 'https://www.stackdstudiosai.com',
                  name: 'Stackd Studios AI',
                  publisher: { '@id': 'https://www.stackdstudiosai.com/#organization' },
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://www.stackdstudiosai.com/?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
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
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Business Software' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Workflow Automation' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Systems Audit & Strategy' } },
                      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Venture Studio Partnership' } },
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
