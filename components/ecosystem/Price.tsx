/**
 * Renders an offer price. When an offer carries `proposed: true` the price is a
 * placeholder awaiting confirmation, so in development it gets a dotted orange
 * underline and a tooltip. In production it renders as a normal price.
 *
 * See docs/PROPOSED-PRICES.md for the full list.
 */
export default function Price({
  value,
  proposed = false,
  className = '',
}: {
  value: string
  proposed?: boolean
  className?: string
}) {
  const flag = process.env.NODE_ENV === 'development' && proposed

  return (
    <span
      className={className}
      style={
        flag
          ? {
              borderBottom: '2px dotted #F97316',
              paddingBottom: '1px',
              cursor: 'help',
            }
          : undefined
      }
      title={
        flag
          ? 'Placeholder price awaiting confirmation. See docs/PROPOSED-PRICES.md'
          : undefined
      }
    >
      {value}
    </span>
  )
}
