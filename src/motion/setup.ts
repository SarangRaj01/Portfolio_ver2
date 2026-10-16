import { animate, createScope, createTimeline, onScroll, splitText, stagger, utils } from 'animejs'
import { DUR, EASE, PIN_QUERY, REDUCE_QUERY, STAGGER, THRESHOLD } from './tokens'

const all = <T extends HTMLElement = HTMLElement>(root: ParentNode, selector: string): T[] =>
  Array.from(root.querySelectorAll<T>(selector))

/**
 * Builds every scroll and entrance animation for the page.
 *
 * Failure-safe by design: nothing is hidden in CSS. Initial "hidden" states are applied here,
 * inline, immediately before the animation that reveals them, and are removed again on revert.
 * If this function never runs (or throws), the page is fully visible and readable.
 */
export function createMotion(root: HTMLElement) {
  const scope = createScope({
    root,
    mediaQueries: { reduce: REDUCE_QUERY, pin: PIN_QUERY },
  })

  scope.add((self) => {
    if (!self) return
    // Reduced motion: leave the static page untouched. No hidden states, no movement.
    if (self.matches.reduce) return

    const cleanups: Array<() => void> = []
    heroIntro(root)
    heroScroll(root)
    scrollProgress(root)
    reveals(root)
    headings(root)
    counters(root)
    scrubText(root)
    timelines(root)
    projectCards(root, cleanups)
    const unpin = skillsStage(root, !!self.matches.pin)
    if (unpin) cleanups.push(unpin)

    return () => cleanups.forEach((fn) => fn())
  })

  return scope
}

/**
 * One-shot trigger. The animation is created paused and played once when `target` enters the
 * viewport. It is deliberately NOT linked through `autoplay: onScroll()`: that default sync mode
 * pauses the animation when the target leaves the viewport, which would freeze reveals and
 * count-ups part-way if the visitor scrolls quickly.
 */
function playOnce(target: HTMLElement, animation: { play: () => unknown }, enter: string = THRESHOLD.reveal) {
  onScroll({ target, enter, repeat: false, onEnter: () => animation.play() })
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function heroIntro(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return

  const lines = all(hero, '[data-hero-name]')
  const items = all(hero, '[data-hero-item]')
  const ring = hero.querySelector<HTMLElement>('[data-hero-ring]')

  // The h1 carries an explicit aria-label, so skip Anime's hidden duplicate copy of the text.
  const split = splitText(lines, { chars: true, accessible: false })
  const chars = split.chars as HTMLElement[]

  utils.set(chars, { translateY: '118%' })
  utils.set(items, { opacity: 0, translateY: 26 })
  if (ring) utils.set(ring, { opacity: 0, scale: 0.9, rotate: -24 })

  const tl = createTimeline({ defaults: { ease: EASE.out } })
  tl.add(chars, { translateY: '0%', duration: DUR.slow, delay: stagger(STAGGER.chars) }, 80)
  if (ring) tl.add(ring, { opacity: 1, scale: 1, rotate: 0, duration: 2200, ease: EASE.soft }, 0)
  tl.add(items, { opacity: 1, translateY: 0, duration: DUR.base, delay: stagger(110) }, 520)

  // Idle drift on the dashed layer only; the tick layers belong to the scroll animation.
  const idle = hero.querySelector<HTMLElement>('[data-ring-idle]')
  if (idle) {
    animate(idle, { rotate: 360, duration: 180000, ease: EASE.linear, loop: true })
  }
}

function heroScroll(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return

  const ringShift = hero.querySelector<HTMLElement>('[data-hero-ring-shift]')
  const content = hero.querySelector<HTMLElement>('[data-hero-content]')
  const ticksA = hero.querySelector<HTMLElement>('[data-ring-a]')
  const ticksC = hero.querySelector<HTMLElement>('[data-ring-c]')

  // Progress 0 -> 1 while the hero scrolls out of the viewport, in both directions.
  const tl = createTimeline({
    defaults: { ease: EASE.linear, duration: 1000 },
    autoplay: onScroll({ target: hero, enter: 'top top', leave: 'top bottom', sync: true }),
  })
  if (ringShift) tl.add(ringShift, { translateY: [0, 160] }, 0)
  if (content) tl.add(content, { translateY: [0, -70] }, 0)
  if (ticksA) tl.add(ticksA, { rotate: [0, 70] }, 0)
  if (ticksC) tl.add(ticksC, { rotate: [0, -110] }, 0)
}

/* ------------------------------------------------------------------ */
/* Page-level indicators                                               */
/* ------------------------------------------------------------------ */
function scrollProgress(root: HTMLElement) {
  const bar = root.querySelector<HTMLElement>('[data-scroll-progress]')
  if (!bar) return
  // Whole-page progress: the document element is both container and target.
  animate(bar, {
    scaleX: [0, 1],
    ease: EASE.linear,
    autoplay: onScroll({
      target: document.documentElement,
      enter: 'top top',
      leave: 'bottom bottom',
      sync: true,
    }),
  })
}

/* ------------------------------------------------------------------ */
/* Scroll-triggered reveals (intentionally one-shot)                   */
/* ------------------------------------------------------------------ */
function reveals(root: HTMLElement) {
  for (const el of all(root, '[data-reveal]')) {
    utils.set(el, { opacity: 0, translateY: 30 })
    playOnce(
      el,
      animate(el, { opacity: 1, translateY: 0, duration: DUR.base, ease: EASE.out, autoplay: false }),
    )
  }

  for (const group of all(root, '[data-reveal-group]')) {
    const items = all(group, '[data-reveal-item]')
    if (!items.length) continue
    const small = group.hasAttribute('data-reveal-small')
    utils.set(items, { opacity: 0, translateY: small ? 14 : 30 })
    playOnce(
      group,
      animate(items, {
        opacity: 1,
        translateY: 0,
        duration: small ? DUR.fast + 150 : DUR.base,
        delay: stagger(small ? STAGGER.chips : STAGGER.items),
        ease: EASE.out,
        autoplay: false,
      }),
    )
  }
}

function headings(root: HTMLElement) {
  for (const heading of all(root, '[data-heading]')) {
    const split = splitText(heading, { words: { wrap: 'clip' }, accessible: false })
    split.addEffect(({ words }) => {
      utils.set(words, { translateY: '115%' })
      const animation = animate(words, {
        translateY: '0%',
        duration: DUR.slow,
        delay: stagger(STAGGER.words),
        ease: EASE.out,
        autoplay: false,
      })
      playOnce(heading, animation)
      return animation
    })
  }
}

/** Count-up numbers. The final value is the server-rendered text, so it is correct without JS. */
function counters(root: HTMLElement) {
  for (const el of all(root, '[data-count]')) {
    const target = Number(el.dataset.count)
    const decimals = Number(el.dataset.decimals ?? 0)
    if (!Number.isFinite(target)) continue

      const final = target.toFixed(decimals)
    const state = { value: 0 }
    el.textContent = (0).toFixed(decimals)

    playOnce(
      el,
      animate(state, {
        value: target,
        duration: 1800,
        ease: EASE.out,
        onUpdate: () => {
          el.textContent = state.value.toFixed(decimals)
        },
        onComplete: () => {
          el.textContent = final
        },
        autoplay: false,
      }),
    )
  }
}

/** Words of the summary darken in step with scroll position (scroll-linked, reversible). */
function scrubText(root: HTMLElement) {
  for (const el of all(root, '[data-scrub]')) {
    const split = splitText(el, { words: true, accessible: false })
    split.addEffect(({ words }) => {
      utils.set(words, { opacity: 0.22 })
      return animate(words, {
        opacity: 1,
        ease: EASE.linear,
        delay: stagger(100, { start: 0 }),
        duration: 400,
        autoplay: onScroll({ target: el, enter: 'bottom-=5% top', leave: '55% bottom', sync: true }),
      })
    })
  }
}

/* ------------------------------------------------------------------ */
/* Timeline (education): rail draws with scroll, nodes light up        */
/* ------------------------------------------------------------------ */
function timelines(root: HTMLElement) {
  for (const timeline of all(root, '[data-timeline]')) {
    const bar = timeline.querySelector<HTMLElement>('[data-timeline-progress]')
    if (bar) {
      utils.set(bar, { scaleY: 0 })
      animate(bar, {
        scaleY: 1,
        ease: EASE.linear,
        autoplay: onScroll({ target: timeline, enter: '75% top', leave: '60% bottom', sync: true }),
      })
    }

    for (const item of all(timeline, '[data-timeline-item]')) {
      const node = item.querySelector<HTMLElement>('[data-timeline-node]')
      const body = item.querySelector<HTMLElement>('[data-timeline-body]')
      if (body) {
        utils.set(body, { opacity: 0, translateY: 24 })
        playOnce(
          item,
          animate(body, { opacity: 1, translateY: 0, duration: DUR.base, ease: EASE.out, autoplay: false }),
        )
      }
      if (node) {
        // Reversible: fills when the item passes the lower third, empties when scrolled back above it.
        utils.set(node, { scale: 0.6 })
        animate(node, {
          scale: 1,
          backgroundColor: ['rgba(0,0,0,0)', 'currentColor'],
          ease: EASE.soft,
          autoplay: onScroll({ target: item, enter: '70% top', leave: '70% bottom', sync: true }),
        })
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* Project card hover (mouse only; touch has no hover state)           */
/* ------------------------------------------------------------------ */
function projectCards(root: HTMLElement, cleanups: Array<() => void>) {
  for (const card of all(root, '[data-card]')) {
    const line = card.querySelector<HTMLElement>('[data-card-line]')
    const arrow = card.querySelector<HTMLElement>('[data-card-arrow]')
    const index = card.querySelector<HTMLElement>('[data-card-index]')

    const enter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (line) animate(line, { scaleX: 1, duration: 700, ease: EASE.out })
      animate(card, { translateY: -6, duration: 500, ease: EASE.soft })
      if (arrow) animate(arrow, { translateX: 5, translateY: -5, duration: 500, ease: EASE.soft })
      if (index) animate(index, { translateX: 10, duration: 600, ease: EASE.soft })
    }
    const leave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      if (line) animate(line, { scaleX: 0, duration: 500, ease: EASE.soft })
      animate(card, { translateY: 0, duration: 500, ease: EASE.soft })
      if (arrow) animate(arrow, { translateX: 0, translateY: 0, duration: 500, ease: EASE.soft })
      if (index) animate(index, { translateX: 0, duration: 600, ease: EASE.soft })
    }
    card.addEventListener('pointerenter', enter)
    card.addEventListener('pointerleave', leave)
    cleanups.push(() => {
      card.removeEventListener('pointerenter', enter)
      card.removeEventListener('pointerleave', leave)
    })
  }
}

/* ------------------------------------------------------------------ */
/* Skills: sticky stage, driven by scroll progress                     */
/* ------------------------------------------------------------------ */
function skillsStage(root: HTMLElement, canPin: boolean): (() => void) | undefined {
  const section = root.querySelector<HTMLElement>('[data-skills]')
  if (!section) return

  const blocks = all(section, '[data-skill-block]')
  // The SVG paints plates bottom-to-top for z-order, so sort by their logical index.
  const plates = all<HTMLElement>(section, '[data-plate]').sort((a, b) => Number(a.dataset.plate) - Number(b.dataset.plate))

  if (!canPin) {
    // Small screens or short windows: no pinning. Chips reveal in sequence as they scroll in.
    return
  }

  section.dataset.pinned = 'true'

  const count = blocks.length
  let active = -1
  const setActive = (index: number) => {
    if (index === active) return
    active = index
    blocks.forEach((b, i) => b.setAttribute('data-active', String(i === index)))
    plates.forEach((p, i) => p.setAttribute('data-active', String(i === index)))
    const chips = all(blocks[index], '.chip')
    animate(chips, {
      translateY: [8, 0],
      opacity: [0.4, 1],
      duration: 500,
      delay: stagger(24),
      ease: EASE.soft,
    })
  }

  // Exploded view: plates start stacked tight and spread apart as the stage scrolls.
  const mid = (plates.length - 1) / 2
  const tl = createTimeline({
    defaults: { ease: EASE.linear },
    autoplay: onScroll({ target: section, enter: 'top top', leave: 'bottom bottom', sync: true }),
  })
  plates.forEach((plate, i) => {
    tl.add(plate, { translateY: [(mid - i) * 40, 0], ease: EASE.soft, duration: 360 }, 0)
  })

  // Active category follows progress (also in reverse when scrolling back up).
  onScroll({
    target: section,
    enter: 'top top',
    leave: 'bottom bottom',
    onUpdate: (self) => setActive(Math.min(count - 1, Math.floor(self.progress * count))),
    onLeaveBackward: () => setActive(0),
  })
  setActive(0)

  return () => {
    delete section.dataset.pinned
    blocks.forEach((b) => b.removeAttribute('data-active'))
    plates.forEach((p) => p.removeAttribute('data-active'))
  }
}
