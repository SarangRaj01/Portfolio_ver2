import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing a thin band at the middle of the viewport.
 * Uses IntersectionObserver so the active state stays correct even with reduced motion.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
          else setActive((current) => (current === entry.target.id ? null : current))
        }
      },
      { rootMargin: '-45% 0px -54% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
