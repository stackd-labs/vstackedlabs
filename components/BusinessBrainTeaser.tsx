import Link from 'next/link'

const highlights = [
  { label: 'Restaurants', desc: 'Menus, SOPs, allergen guides' },
  { label: 'Gyms', desc: 'Schedules, memberships, policies' },
  { label: 'Salons & Spas', desc: 'Services, pricing, protocols' },
  { label: 'Hotels', desc: 'Amenities, local info, guest FAQs' },
]

export default function BusinessBrainTeaser() {
  return (
    <section className="py-20 bg-[#0C0C0C]" aria-labelledby="bb-teaser-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-[#FFD84D] text-[#0C0C0C] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C0C0C]" />
              New — Business Brain
            </div>
            <h2 id="bb-teaser-heading" className="text-[clamp(32px,4vw,52px)] text-white leading-[1.05] mb-5">
              Your company’s knowledge, answered on demand.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              We turn your operational docs — handbooks, SOPs, menus, training guides — into a private system your staff can query 24/7. No generic answers, no digging through folders. Just your knowledge, instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/business-brain"
                className="inline-flex items-center gap-2 bg-[#FFD84D] hover:bg-[#E8C030] text-[#0C0C0C] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] min-h-[44px]"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 min-h-[44px]"
              >
                Get Your Brain Built
              </Link>
            </div>
          </div>

          {/* Right — industry chips */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2"
              >
                <h3 className="text-white text-base leading-tight">{item.label}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
            <div className="col-span-2 bg-[#FFD84D]/10 border border-[#FFD84D]/20 rounded-2xl p-5 flex items-center justify-between gap-4">
              <p className="text-white/70 text-sm leading-snug">
                Starting at <span className="text-white font-semibold">$500 setup</span> + <span className="text-white font-semibold">$149/mo</span>
              </p>
              <Link
                href="/business-brain#pricing"
                className="text-[#FFD84D] text-sm font-semibold hover:underline shrink-0"
              >
                See pricing →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
