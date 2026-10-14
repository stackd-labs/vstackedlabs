import { LAUNCH_GUIDE_URL } from './data'

export default function LaunchGuide() {
  return (
    <section id="launch-guide" className="relative py-20 md:py-24 border-t border-[var(--t-line)] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[var(--t-line-hi)] bg-[var(--t-surface)] p-6 sm:p-10 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="font-mono-t text-[12px] uppercase tracking-[0.2em] text-[var(--t-neon)] mb-4">06 / Free guide</p>
            <h2 className="text-[clamp(32px,4.4vw,52px)] leading-[1] text-[var(--t-text)] mb-4">
              Get your free <span className="neon-text">launch guide</span> here.
            </h2>
            <p className="text-[var(--t-muted)] text-lg leading-relaxed max-w-2xl">
              Before You Launch: a security and readiness checklist for apps built with Claude Code, Cursor, Lovable,
              Bolt, and similar AI tools. Start with the Top 5 checks if you only have ten minutes.
            </p>
          </div>
          <div>
            <a
              href={LAUNCH_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono-t text-sm font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-6 py-4 rounded-md hover:shadow-[0_0_32px_rgba(255,216,77,0.6)] transition-shadow whitespace-nowrap"
            >
              Get the guide (PDF)
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="mt-3 font-mono-t text-[12px] text-[var(--t-dim)]">Free. 11 pages. No email needed.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
