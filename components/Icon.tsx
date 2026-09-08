/**
 * The site's monochrome icon set.
 *
 * Everything here draws with `currentColor` and no fill, so an icon inherits
 * the text color of whatever it sits in: black on light surfaces, the division
 * accent when one is set, white on the dark footer. That is the whole reason
 * these replaced emoji, which were full-color and rendered differently on
 * every OS.
 *
 * Add a name here rather than reaching for a pictograph anywhere else.
 */

export type IconName =
  // Divisions
  | 'cap'
  | 'code'
  | 'lifebuoy'
  | 'rocket'
  | 'users'
  | 'buildings'
  // Demo Lab: assistant categories
  | 'megaphone'
  | 'briefcase'
  | 'gear'
  | 'pen'
  // Demo Lab: activity events
  | 'user-plus'
  | 'mail'
  | 'target'
  | 'phone'
  | 'check-circle'
  | 'cart'
  // Demo Lab: intake samples
  | 'home'
  | 'id-card'
  | 'heart'

const PATHS: Record<IconName, React.ReactNode> = {
  // ─── Divisions ───────────────────────────────────────────────────────────
  /** Learn: a mortarboard. */
  cap: (
    <>
      <path d="M2.5 8.6 12 4.2l9.5 4.4L12 13z" />
      <path d="M6.4 10.5v4.9c0 0 2.2 1.9 5.6 1.9s5.6-1.9 5.6-1.9v-4.9" />
      <path d="M19.8 9.7v5.4" />
    </>
  ),
  /** Builders: angle brackets, the person who is already writing code. */
  code: (
    <>
      <path d="M8.4 6.8 3.6 12l4.8 5.2" />
      <path d="M15.6 6.8 20.4 12l-4.8 5.2" />
      <path d="M13.4 5.2l-2.8 13.6" />
    </>
  ),
  /** Rescue: a life ring. */
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.9 5.9l3.6 3.6" />
      <path d="M18.1 5.9l-3.6 3.6" />
      <path d="M5.9 18.1l3.6-3.6" />
      <path d="M18.1 18.1l-3.6-3.6" />
    </>
  ),
  /** Build: a rocket. */
  rocket: (
    <>
      <path d="M12 2.8c2.9 2.6 4.4 6 4.4 9.5l-1.9 4.3h-5L7.6 12.3C7.6 8.8 9.1 5.4 12 2.8z" />
      <circle cx="12" cy="10" r="1.7" />
      <path d="M9.6 16.6 7.2 19.8" />
      <path d="M14.4 16.6l2.4 3.2" />
      <path d="M10.9 19.4h2.2" />
    </>
  ),
  /** Teams: engineers alongside your own people. */
  users: (
    <>
      <circle cx="9.2" cy="8.4" r="3.4" />
      <path d="M2.8 19.6c0-3.5 2.9-5.9 6.4-5.9s6.4 2.4 6.4 5.9" />
      <circle cx="17.6" cy="7.6" r="2.4" />
      <path d="M18.1 13.2c2.1.5 3.4 2.3 3.4 4.7" />
    </>
  ),
  /** Enterprise: a skyline, an organization rather than a team. */
  buildings: (
    <>
      <path d="M2.6 20.8h18.8" />
      <path d="M3.4 20.8V10.2h5.4v10.6" />
      <path d="M8.8 20.8V3.8h6.6v17" />
      <path d="M15.4 20.8v-7.4h5.2v7.4" />
      <path d="M11.2 7.4h1.8M11.2 11h1.8M11.2 14.6h1.8" />
    </>
  ),

  // ─── Demo Lab: assistant categories ──────────────────────────────────────
  megaphone: (
    <>
      <path d="M3.6 10.4h3L18 5.4v13.2l-11.4-5h-3z" />
      <path d="M6.6 13.6v3.9h2.7v-3.1" />
      <path d="M20.6 9.4v5.2" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.2" width="18" height="12" rx="2" />
      <path d="M9 7.2V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6v1.6" />
      <path d="M3 12.6h18" />
    </>
  ),
  /**
   * Teeth start flush against the body. Detached spokes read as a sun once the
   * icon drops below ~16px.
   */
  gear: (
    <>
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 7.6V5M12 16.4V19M7.6 12H5M16.4 12H19" />
      <path d="M8.9 8.9 7.3 7.3M15.1 15.1l1.6 1.6M15.1 8.9l1.6-1.6M8.9 15.1l-1.6 1.6" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l1-4L16.4 4.6a2.1 2.1 0 0 1 3 3L8 19z" />
      <path d="M14.5 6.5l3 3" />
    </>
  ),

  // ─── Demo Lab: activity events ───────────────────────────────────────────
  'user-plus': (
    <>
      <circle cx="9.6" cy="8.4" r="3.4" />
      <path d="M3.2 19.6c0-3.5 2.9-5.9 6.4-5.9 1.4 0 2.7.4 3.8 1.1" />
      <path d="M16.6 17.2h5M19.1 14.7v5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.6" width="18" height="12.8" rx="2" />
      <path d="M3.6 7.2 12 13.6l8.4-6.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4.7" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  phone: (
    <path d="M6.6 3.6h2.9l1.5 3.9-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 3.9 1.5v2.9a1.6 1.6 0 0 1-1.6 1.6A16.2 16.2 0 0 1 5 5.2a1.6 1.6 0 0 1 1.6-1.6z" />
  ),
  'check-circle': (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8 12.2l2.8 2.8 5.4-5.6" />
    </>
  ),
  cart: (
    <>
      <path d="M2.6 3.6h2.3l2.9 11h10.1l2-8H6.2" />
      <circle cx="10" cy="18.8" r="1.6" />
      <circle cx="16.6" cy="18.8" r="1.6" />
    </>
  ),

  // ─── Demo Lab: intake samples ────────────────────────────────────────────
  home: (
    <>
      <path d="M3.4 10.6 12 3.5l8.6 7.1" />
      <path d="M5.4 9.6v10.9h13.2V9.6" />
      <path d="M9.9 20.5v-5.4h4.2v5.4" />
    </>
  ),
  'id-card': (
    <>
      <rect x="2.6" y="5" width="18.8" height="14" rx="2" />
      <circle cx="8" cy="11" r="2.2" />
      <path d="M4.8 16.6c0-1.8 1.5-3.1 3.2-3.1s3.2 1.3 3.2 3.1" />
      <path d="M14.2 10h4.6M14.2 13.6h4.6" />
    </>
  ),
  heart: (
    <path d="M12 20.4S3.6 14.9 3.6 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.4 2.5c0 5.5-8.4 11-8.4 11z" />
  ),
}

export default function Icon({
  name,
  size = 20,
  strokeWidth = 1.6,
  className = '',
  title,
}: {
  name: IconName
  size?: number
  /** Scaled so a 12px icon does not look thinner than a 32px one. */
  strokeWidth?: number
  className?: string
  /** Only pass this when the icon is the sole carrier of meaning. */
  title?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  )
}
