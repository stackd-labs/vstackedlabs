/** Anchor id for a legal section title, e.g. "5. Refund Policy" -> "refund-policy". */
export function legalSlug(title: string) {
  return title
    .replace(/^\d+\.\s*/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
