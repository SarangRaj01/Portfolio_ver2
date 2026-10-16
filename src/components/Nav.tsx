import { animate, utils } from 'animejs'
import { Download, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navItems, profile } from '../content/resume'
import { useActiveSection } from '../lib/useActiveSection'
import { EASE } from '../motion/tokens'

const SECTION_IDS = navItems.map((n) => n.id)

export function Nav() {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const placed = useRef(false)

  /** Slide the underline to the active link. First placement is instant. */
  const moveIndicator = useCallback((animateIt: boolean) => {
    const list = listRef.current
    const bar = indicatorRef.current
    if (!list || !bar) return
    const link = active ? list.querySelector<HTMLElement>(`[data-nav-link="${active}"]`) : null
    if (!link) {
      utils.set(bar, { opacity: 0 })
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const props = { translateX: link.offsetLeft, scaleX: link.offsetWidth, opacity: 1 }
    if (animateIt && placed.current && !reduce) {
      animate(bar, { ...props, duration: 600, ease: EASE.out })
    } else {
      utils.set(bar, props)
    }
    placed.current = true
  }, [active])

  useLayoutEffect(() => {
    moveIndicator(true)
  }, [moveIndicator])

  useEffect(() => {
    const onResize = () => moveIndicator(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [moveIndicator])

  const close = useCallback((restoreFocus = true) => {
    setOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  // Mobile menu: lock scroll, animate links in, close on Escape or when the viewport grows.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = 'hidden'

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const links = menuRef.current?.querySelectorAll<HTMLElement>('[data-menu-item]')
    if (links?.length && !reduce) {
      utils.set(links, { opacity: 0, translateY: 24 })
      animate(links, { opacity: 1, translateY: 0, duration: 700, delay: (_: unknown, i?: number) => 60 + (i ?? 0) * 60, ease: EASE.out })
    }
    menuRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => mq.matches && close(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      root.style.overflow = previous
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open, close])

  return (
    <header className="fixed inset-x-0 top-0 z-50 theme-dark">
      <div data-scroll-progress className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-accent" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
      <div className="nav-bar">
        <nav className="wrap flex h-[4.25rem] items-center justify-between gap-6" aria-label="Primary">
          <a href="#top" className="flex items-center gap-3 no-underline" aria-label={`${profile.name}, back to top`} onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#3a3833] font-mono text-[0.72rem] font-medium text-accent">SR</span>
            <span className="font-display text-[1.05rem] font-semibold tracking-tight text-[#efece7]">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <ul ref={listRef} className="relative m-0 flex list-none gap-7 p-0 pb-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="nav-link"
                    data-nav-link={item.id}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 block h-[2px] w-px origin-left bg-accent"
                style={{ opacity: 0 }}
              />
            </ul>
            <a className="btn !min-h-10 !px-4 !py-2" href={profile.resumeHref} download={profile.resumeFileName}>
              Resume
              <Download size={14} className="icon-down" aria-hidden="true" />
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#3a3833] text-[#efece7] md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </nav>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto bg-ink px-[var(--wrap-pad)] pb-10 pt-8 md:hidden"
        >
          <ul className="m-0 flex list-none flex-col p-0">
            {navItems.map((item, i) => (
              <li key={item.id} data-menu-item className="border-b border-[#2b2925]">
                <a
                  href={`#${item.id}`}
                  className="flex items-baseline gap-4 py-5 text-[2.2rem] font-bold leading-none tracking-tight text-[#efece7] no-underline"
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => close(false)}
                >
                  <span className="mono text-accent">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-solid mt-8" data-menu-item href={profile.resumeHref} download={profile.resumeFileName} onClick={() => close(false)}>
            Download resume
            <Download size={16} className="icon-down" aria-hidden="true" />
          </a>
        </div>
      )}
    </header>
  )
}
