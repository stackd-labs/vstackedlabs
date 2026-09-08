import Icon from '@/components/Icon'
import { type Division } from '@/lib/divisions'
import { priceFloor } from '@/lib/offer-price'

/**
 * The trigger row for a collapsed division section, shared by /services and
 * /pricing.
 *
 * The point of this header is that a collapsed section still tells you
 * everything you need to decide whether to open it: who it is, what it
 * promises, how many offers are inside, and where pricing starts.
 */
export default function DivisionCollapseHeader({
  division,
}: {
  division: Division
}) {
  return (
    <span className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      <span className="shrink-0" style={{ color: division.accent }}>
        <Icon name={division.icon} size={26} />
      </span>

      <span className="flex flex-col min-w-0">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.14em]"
          style={{ color: division.accent }}
        >
          {division.eyebrow}
        </span>
        <span className="text-[#0C0C0C] text-[clamp(16px,2vw,21px)] leading-tight uppercase font-[family-name:var(--font-anton)]">
          {division.promise}
        </span>
      </span>

      <span className="ml-auto flex flex-col sm:items-end shrink-0">
        <span className="text-[#0C0C0C] text-xs font-semibold tabular-nums">
          {division.offers.length} offers
        </span>
        <span className="text-[#888580] text-xs tabular-nums">
          {priceFloor(division.offers)}
        </span>
      </span>
    </span>
  )
}
