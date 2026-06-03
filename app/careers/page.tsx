import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CareersContent from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers at Stackd Studios AI — Remote Jobs',
  description:
    'Join Stackd Studios — a fully remote operations system studio. We hire builders, designers, and operators who move fast and think differently.',
  alternates: {
    canonical: 'https://www.stackdstudiosai.com/careers',
  },
  openGraph: {
    title: 'Careers at Stackd Studios AI — Remote Jobs',
    description:
      'Join a fully remote operations system studio. Contract, part-time, and freelance roles available.',
    url: 'https://www.stackdstudiosai.com/careers',
  },
}

type Job = {
  id: string
  title: string
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance'
  location: 'Remote — USA' | 'Remote'
  track: 'Engineering' | 'Design' | 'Strategy' | 'Operations' | 'Growth'
  summary: string
  responsibilities: string[]
  requirements: string[]
  nice: string[]
}

const jobs: Job[] = [
  {
    id: 'fullstack-engineer',
    title: 'Full Stack Engineer',
    type: 'Contract',
    location: 'Remote — USA',
    track: 'Engineering',
    summary: "We're looking for a full stack engineer who thrives on building fast, clean, production-ready products. You'll work directly on client builds and internal Stackd Studios AI ventures using our standard stack: Next.js, Supabase, Tailwind, and Stripe.",
    responsibilities: [
      'Build and ship client products from design to deployment',
      'Implement Supabase schemas, RLS policies, and server actions',
      'Integrate AI APIs (Claude, OpenAI) into production applications',
      'Collaborate with the founder on architecture and scope decisions',
      'Maintain code quality across multiple concurrent client projects',
    ],
    requirements: [
      '3+ years building with React or Next.js',
      'Solid experience with TypeScript',
      'Familiarity with Supabase or another Postgres-based backend',
      'Understanding of authentication, RLS, and data security patterns',
      'Ability to scope and estimate your own work accurately',
    ],
    nice: [
      'Experience integrating Claude or OpenAI APIs',
      'Framer Motion or animation experience',
      'Prior work at an agency or venture studio',
      'Comfort with Vercel deployments and edge functions',
    ],
  },
  {
    id: 'venture-strategist',
    title: 'Venture Strategist',
    type: 'Contract',
    location: 'Remote — USA',
    track: 'Strategy',
    summary: "Stackd Studios AI works with founders to validate, model, and launch new ventures. We're looking for a strategist who can run idea architecture sessions, produce business model documentation, and help founders stress-test their concepts before we build.",
    responsibilities: [
      'Lead Systems Audits with founder and operator clients',
      'Produce business model documents, roadmaps, and positioning frameworks',
      'Facilitate concept validation — market sizing, competitive analysis, risk mapping',
      'Collaborate with the team on Build Sprint and Operating Partner scoping',
      "Contribute to Stackd Studios AI's internal venture pipeline and IP",
    ],
    requirements: [
      '3+ years in strategy, consulting, product management, or venture building',
      'Experience working with early-stage founders or startups',
      'Strong written communication — you produce documents clients act on',
      'Comfortable facilitating fast-paced working sessions',
      'Ability to synthesize ambiguous information into clear decisions',
    ],
    nice: [
      'Experience with the lean startup or jobs-to-be-done frameworks',
      'Background in SaaS, fintech, or marketplace businesses',
      'Prior work at a VC, accelerator, or venture studio',
      'Comfort with AI-assisted research and synthesis tools',
    ],
  },
  {
    id: 'client-success-manager',
    title: 'Client Success Manager',
    type: 'Part-Time',
    location: 'Remote — USA',
    track: 'Operations',
    summary: "As we grow, we need someone to own the client relationship from onboarding through delivery. You'll be the point of contact for clients, keep projects on track, and make sure every delivery lands the way it should.",
    responsibilities: [
      'Onboard new clients and set clear expectations from day one',
      'Manage project timelines and communicate status updates proactively',
      'Coordinate between clients and the Stackd Studios AI build team',
      'Handle post-delivery support requests and escalations',
      'Identify opportunities to expand client relationships into retainers or upgrades',
    ],
    requirements: [
      '2+ years in client success, account management, or project management',
      'Exceptional written communication — clear, professional, and warm',
      'Organized with strong follow-through — nothing slips through the cracks',
      'Comfortable managing multiple projects at different stages simultaneously',
      'Proactive mindset — you solve problems before clients notice them',
    ],
    nice: [
      'Experience in a digital agency or software studio',
      'Familiarity with project tools like Linear, Notion, or Asana',
      'Understanding of web development timelines and constraints',
      'Experience upselling or expanding client accounts',
    ],
  },
  {
    id: 'growth-content-lead',
    title: 'Growth & Content Lead',
    type: 'Part-Time',
    location: 'Remote — USA',
    track: 'Growth',
    summary: "Stackd Studios needs a voice. We're building in public, selling custom systems and automation to business owners and founders, and launching a digital store. We need someone who can create content that educates, converts, and builds a community around what we're doing.",
    responsibilities: [
      "Own Stackd Studios AI's content calendar across LinkedIn, X (Twitter), and TikTok",
      'Write educational content about AI tools, workflows, and business building',
      'Produce short-form video content (scripting + filming or coordination)',
      "Write and send a weekly email newsletter to the Stackd Studios AI list",
      'Contribute copy for landing pages, product descriptions, and store listings',
    ],
    requirements: [
      'Strong writing skills — educational, not salesy',
      'Understanding of AI tools and how they apply to real businesses',
      'Experience creating content for LinkedIn or Twitter that builds an audience',
      'Ability to translate technical concepts into plain, compelling language',
      "Self-directed — you don't need to be managed into producing",
    ],
    nice: [
      'Short-form video experience (TikTok, Reels, YouTube Shorts)',
      'Email marketing experience (Resend, Mailchimp, ConvertKit)',
      'Background in agency, SaaS, or creator businesses',
      'Existing audience in the AI, business, or tech space',
    ],
  },
  {
    id: 'social-media-manager',
    title: 'Social Media Manager',
    type: 'Part-Time',
    location: 'Remote — USA',
    track: 'Growth',
    summary: "We need someone who lives on social media and knows how to build an engaged audience around AI, business, and tech. You'll own our day-to-day presence on LinkedIn, TikTok, Instagram, and X — turning our work into content that actually gets seen.",
    responsibilities: [
      'Plan and execute daily/weekly content across LinkedIn, TikTok, X, and Instagram',
      'Repurpose builds, client wins, and behind-the-scenes moments into engaging posts',
      'Grow followers and engagement through consistent, value-driven content',
      'Monitor comments, DMs, and mentions — respond and build community',
      'Track performance metrics and iterate on what works',
    ],
    requirements: [
      'Proven track record growing social accounts in business, AI, or tech niches',
      'Strong visual instincts — you know what stops the scroll',
      'Comfortable writing sharp, concise copy for multiple platforms',
      'Self-directed and consistent — you post without being reminded',
      'Familiarity with scheduling tools (Buffer, Metricool, Later, etc.)',
    ],
    nice: [
      'Short-form video creation and editing (CapCut, Premiere, etc.)',
      'Experience with AI-generated content workflows',
      'Existing following in the business or AI creator space',
      'Graphic design chops (Canva, Figma)',
    ],
  },
  {
    id: 'ai-prompt-engineer',
    title: 'AI Prompt Engineer',
    type: 'Freelance',
    location: 'Remote — USA',
    track: 'Engineering',
    summary: "We build custom AI prompt libraries and workflows for business owner clients. We need someone who understands how to design reliable, structured prompts using Claude — and can document and deliver them clearly to non-technical clients.",
    responsibilities: [
      "Build prompt libraries tailored to each client's business and voice",
      'Design multi-step Claude workflows for intake, communication, and operations',
      'Document prompt logic in plain language for client handoff',
      'Test and iterate on prompts based on real-world client feedback',
      'Collaborate with the team on AI system architecture for Build Sprint and Operating Partner clients',
    ],
    requirements: [
      'Deep experience working with Claude or GPT-4 in production contexts',
      'Ability to write clear, structured prompts with consistent output formatting',
      "Strong written communication — you'll write prompts clients use daily",
      'Understanding of business operations and workflows',
      'Organized and detail-oriented — prompt libraries need to be airtight',
    ],
    nice: [
      'Experience with Claude Projects and custom system prompts',
      'Background in copywriting, operations, or business consulting',
      'Familiarity with n8n, Zapier, or Make for workflow automation',
      'Experience building AI tools for small business clients',
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    type: 'Freelance',
    location: 'Remote — USA',
    track: 'Design',
    summary: "We need a designer who can move fast and make things that look and feel premium. You'll work on client-facing products, Stackd Studios AI's own brand assets, and digital store products. Our aesthetic is clean, minimal, and structured — no generic templates.",
    responsibilities: [
      'Design interfaces for web apps, marketing sites, and dashboards',
      "Create and maintain Stackd Studios AI's brand design system",
      'Produce Figma files ready for direct developer handoff',
      'Design digital products for the Stackd Studios AI store (prompt pack covers, course assets)',
      'Review implemented designs and flag deviations from spec',
    ],
    requirements: [
      'Strong Figma proficiency — components, auto-layout, variables',
      'Portfolio showing clean, production-quality UI work',
      'Ability to work within an existing design system and extend it',
      'Understanding of responsive design and mobile-first layouts',
      'Experience designing for web apps, not just marketing pages',
    ],
    nice: [
      'Motion design experience (Framer, After Effects)',
      'Familiarity with Tailwind CSS utility patterns',
      'Experience designing for SaaS or fintech products',
      'Brand identity and typography chops',
    ],
  },
  {
    id: 'creator-outreach-lead',
    title: 'Creator & Outreach Partner',
    type: 'Freelance',
    location: 'Remote',
    track: 'Growth',
    summary: "We're building a network of creators, influencers, and thought leaders who genuinely believe in better business systems and automation. You'll identify, reach out to, and onboard partners who can amplify Stackd Studios AI's reach — from micro-influencers to podcasters to newsletter writers.",
    responsibilities: [
      'Research and identify creators, podcasters, and newsletters aligned with our audience',
      'Craft and send personalized outreach pitches to potential partners',
      'Manage ongoing relationships with active affiliates and creators',
      'Coordinate content collaborations, shoutouts, and sponsored integrations',
      'Track referral performance and provide partners with reporting',
    ],
    requirements: [
      'Experience in influencer marketing, partnerships, or creator outreach',
      "Excellent written communication — you write like a human, not a template",
      "Strong organizational skills — you're tracking many conversations at once",
      'Understanding of creator economics and what motivates partnerships',
      'Comfortable negotiating terms and managing expectations',
    ],
    nice: [
      'Existing relationships in the AI, SaaS, or business creator ecosystem',
      'Experience with affiliate platforms (Impact, PartnerStack, etc.)',
      'Background in B2B marketing or agency partnerships',
      'Comfort with CRM tools (Notion, HubSpot, Airtable)',
    ],
  },
  {
    id: 'brand-affiliate-partner',
    title: 'Brand Affiliate Partner',
    type: 'Freelance',
    location: 'Remote',
    track: 'Growth',
    summary: "Love what we're building? Earn commission by promoting Stackd Studios AI to your audience. Whether you're a content creator, business coach, consultant, or community builder — if your audience includes business owners or founders, there's a fit here. No minimum follower count required.",
    responsibilities: [
      'Share Stackd Studios AI services, products, and content with your audience',
      'Create authentic content (posts, videos, reviews, tutorials) showcasing our work',
      'Drive qualified leads to our site using your unique affiliate link',
      'Participate in launches, promotions, and affiliate-exclusive offers',
      'Provide feedback on what your audience responds to',
    ],
    requirements: [
      'Active presence on at least one platform (LinkedIn, TikTok, YouTube, Instagram, X, or email)',
      'Audience that includes business owners, entrepreneurs, or founders',
      'Genuine belief in AI tools and their impact on modern business',
      'Ability to create content consistently — at least 2–4 posts/month',
      'No prior affiliate experience required — we\'ll onboard you fully',
    ],
    nice: [
      'Established newsletter, podcast, or YouTube channel',
      'Experience as an affiliate for software or SaaS products',
      'Community leadership (Facebook Groups, Slack communities, Discord)',
      'Background in business consulting, coaching, or operations',
    ],
  },
]

export default function CareersPage() {
  return (
    <>
      <Navbar yellowHero />
      <main className="bg-[#F6F4EF]">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-[#FFD84D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              <div>
                <p className="text-[#0C0C0C]/60 text-xs font-semibold uppercase tracking-[0.12em] mb-4">Careers</p>
                <h1 className="text-[clamp(40px,6vw,72px)] text-[#0C0C0C] leading-[1.0] mb-6">
                  Build the future of work with us.
                </h1>
                <p className="text-[#0C0C0C]/70 text-xl leading-relaxed">
                  Stackd Studios is a remote-first operations system studio — solutions, automation, and venture work. We move fast, we care about craft, and we work on things that actually matter to business owners and founders.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {[
                  { value: '100%', label: 'Remote — work from anywhere in the US' },
                  { value: 'Fast', label: 'Async-first, no unnecessary meetings' },
                  { value: 'Real', label: 'Work on live products with real clients' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-[#0C0C0C] w-16 shrink-0">{item.value}</span>
                    <p className="text-[#0C0C0C]/60 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CareersContent jobs={jobs} />
      </main>
      <Footer />
    </>
  )
}
