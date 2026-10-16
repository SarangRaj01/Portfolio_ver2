/** Shared motion tokens. Keep timings and easings here so the whole site moves with one voice. */
export const EASE = {
  out: 'outExpo',
  soft: 'outQuart',
  inOut: 'inOutQuart',
  linear: 'linear',
} as const

export const DUR = {
  fast: 450,
  base: 900,
  slow: 1300,
} as const

export const STAGGER = {
  items: 90,
  chips: 28,
  words: 70,
  chars: 42,
} as const

/**
 * Scroll thresholds. Anime.js reads these as "<container position> <target position>",
 * e.g. enter = the viewport's bottom edge (minus 10%) meets the target's top edge.
 */
export const THRESHOLD = {
  reveal: 'bottom-=10% top',
} as const

export const PIN_QUERY = '(min-width: 1024px) and (min-height: 740px)'
export const REDUCE_QUERY = '(prefers-reduced-motion: reduce)'
