import type { Metadata } from 'next'
import InteractiveContent from './InteractiveContent'

export const metadata: Metadata = {
  title: 'Stackd Interactive — AI-Assisted Game & Interactive Studio | Stackd Studios',
  description:
    'Stackd Interactive is our AI-assisted game and interactive experience studio. We build Roblox games, browser games, branded mini-games, educational games, simulations, and interactive digital products — fast prototyping, testing, and launch.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/interactive',
  },
  openGraph: {
    title: 'Stackd Interactive — AI-Assisted Game & Interactive Studio | Stackd Studios',
    description:
      'Roblox games, browser games, branded mini-games, educational games, and interactive experiences — built fast with AI coding agents and human creative direction.',
    url: 'https://www.stackdstudiosai.com/interactive',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Stackd Interactive — Services',
  url: 'https://www.stackdstudiosai.com/interactive',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'Playable Game Prototypes',
      description:
        'From idea to a playable prototype quickly — built, tested, and ready to show.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Roblox Game Development',
      description:
        'Roblox games built and shipped — cozy/cleanup games, simulators, and brand experiences.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Browser Game Development',
      description:
        'Browser mini-games and interactive experiences that run anywhere, no install required.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Game Asset Packs',
      description:
        'Reusable game assets and systems — the building blocks for faster, cheaper builds.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
    {
      '@type': 'Service',
      position: 5,
      name: 'Interactive Brand Experiences',
      description:
        'Branded and event mini-games that turn an audience into players.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
    {
      '@type': 'Service',
      position: 6,
      name: 'Monthly Game Updates & Support',
      description:
        'Ongoing updates, new content, and support to keep a live game growing.',
      provider: { '@type': 'Organization', name: 'Stackd Interactive' },
    },
  ],
}

export default function InteractivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InteractiveContent />
    </>
  )
}
