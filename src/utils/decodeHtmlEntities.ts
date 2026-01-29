const NAMED_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
}

/**
 * Decode HTML entities in text (e.g. &#038; → &, &amp; → &).
 * Use for API/CMS content that may be entity-encoded (e.g. WordPress).
 */
export function decodeHtmlEntities(text: string | undefined | null): string {
  if (text == null || typeof text !== 'string') return ''

  return text
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&(?:amp|lt|gt|quot|#39|apos);/g, (m) => NAMED_ENTITIES[m] ?? m)
}
