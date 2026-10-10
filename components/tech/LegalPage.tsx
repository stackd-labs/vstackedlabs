import TechNav from './TechNav'
import { TechFooter } from './TechCTA'
import { legalSlug as slug } from '@/lib/legal/slug'

// Shared layout for /privacy and /terms: the dark tech shell (nav, hero, footer) around a
// WHITE reading sheet for the legal text (Chanel, 2026-10-08: keep the word sections white).
// The legal wording itself lives in each page file and stays plain.

export interface LegalSection {
  title: string
  body: string[]
}

function split(title: string) {
  const m = title.match(/^(\d+)\.\s*(.*)$/)
  return m ? { num: m[1].padStart(2, '0'), text: m[2] } : { num: '', text: title }
}

export default function LegalPage({
  title,
  file,
  updated,
  intro,
  sections,
}: {
  title: string
  /** Shown in the terminal line, e.g. "privacy.md" */
  file: string
  updated: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <div className="tech-root min-h-screen">
      <TechNav />
      <main id="main-content" tabIndex={-1}>
        {/* Hero */}
        <section className="relative overflow-hidden tech-noise border-b border-[var(--t-line)]">
          <div className="tech-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
          <div
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(closest-side, rgba(255,216,77,0.12), transparent)' }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-muted)] mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--t-neon)]" aria-hidden="true" />
              Legal
            </p>
            <h1 className="text-[clamp(48px,7.5vw,104px)] leading-[0.94] text-[var(--t-text)] mb-6">
              {title.split(' ').slice(0, -1).join(' ')} <span className="neon-text">{title.split(' ').slice(-1)}</span>
            </h1>
            <p className="font-mono-t text-[13px] text-[var(--t-muted)]">
              <span className="text-[var(--t-neon)]">$</span> cat {file}
              <span className="text-[var(--t-dim)]">
                {'  '}# last updated {updated}, {sections.length} sections
              </span>
            </p>
          </div>
        </section>

        {/* Contents + white reading sheet */}
        <section className="py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[240px_1fr] gap-10 lg:gap-14 items-start">
            <nav className="lg:sticky lg:top-24" aria-label={`${title} sections`}>
              <p className="font-mono-t text-[11px] uppercase tracking-[0.18em] text-[var(--t-dim)] mb-4">Contents</p>
              <ol className="flex flex-col gap-1 border-l border-[var(--t-line)]">
                {sections.map((s) => {
                  const { num, text } = split(s.title)
                  return (
                    <li key={s.title}>
                      <a
                        href={`#${slug(s.title)}`}
                        className="group flex gap-3 pl-4 -ml-px border-l border-transparent hover:border-[var(--t-neon)] py-1 text-[14px] text-[var(--t-muted)] hover:text-[var(--t-text)] transition-colors"
                      >
                        <span className="font-mono-t text-[11px] text-[var(--t-dim)] group-hover:text-[var(--t-neon)] pt-[3px]">{num}</span>
                        {text}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </nav>

            <article className="rounded-2xl bg-white text-[#0C0C0C] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="h-1.5 bg-[var(--t-neon)]" aria-hidden="true" />
              <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
                <p className="text-[#3F3F3A] text-[17px] leading-relaxed mb-12 max-w-[68ch]">{intro}</p>
                <div className="flex flex-col">
                  {sections.map((s) => {
                    const { num, text } = split(s.title)
                    return (
                      <section key={s.title} id={slug(s.title)} className="border-t border-[#E7E4DE] py-9 scroll-mt-24">
                        <div className="flex items-baseline gap-4 mb-4">
                          {num && <span className="font-mono-t text-[12px] font-bold text-[#806400]">{num}</span>}
                          <h2 className="text-[clamp(22px,2.4vw,28px)] leading-tight text-[#0C0C0C]">{text}</h2>
                        </div>
                        <div className="flex flex-col gap-3 max-w-[68ch] sm:pl-9">
                          {s.body.map((para, i) => (
                            <p key={i} className="text-[#3F3F3A] text-[15.5px] leading-[1.75] whitespace-pre-line">
                              {para}
                            </p>
                          ))}
                        </div>
                      </section>
                    )
                  })}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <TechFooter />
    </div>
  )
}
