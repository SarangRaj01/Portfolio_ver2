import { useMemo } from 'react'

const C = 400 // centre of the 800 x 800 viewBox

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const
}

function ticks(count: number, rOuter: number, long: number, short: number, longEvery: number) {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const deg = (360 / count) * i
    const len = i % longEvery === 0 ? long : short
    const [x1, y1] = polar(rOuter, deg)
    const [x2, y2] = polar(rOuter - len, deg)
    out.push(`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`)
  }
  return out.join('')
}

function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from)
  const [x2, y2] = polar(r, to)
  const large = to - from > 180 ? 1 : 0
  return `M${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`
}

/** Decorative instrument-dial ring. Three independently animated layers (see motion/setup.ts). */
export function TickRing({ className }: { className?: string }) {
  const outer = useMemo(() => ticks(180, 392, 26, 13, 5), [])
  const inner = useMemo(() => ticks(72, 238, 22, 10, 6), [])
  const origin = { transformOrigin: '50% 50%' } as const

  return (
    <svg className={className} viewBox="0 0 800 800" fill="none" aria-hidden="true" focusable="false">
      {/* Layer A: outer ticks, rotates with scroll */}
      <g data-ring-a style={origin}>
        <path d={outer} stroke="currentColor" strokeWidth="1.4" opacity="0.28" />
        <path d={arc(386, -6, 14)} stroke="#ff4a4a" strokeWidth="9" strokeLinecap="butt" />
        <path d={arc(386, 118, 172)} stroke="#ff4a4a" strokeWidth="3" opacity="0.55" />
        <path d={arc(386, 232, 268)} stroke="#ff4a4a" strokeWidth="3" opacity="0.3" />
      </g>

      {/* Layer B: dashed rings, idles slowly */}
      <g data-ring-idle style={origin}>
        <circle cx={C} cy={C} r="330" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="2 9" />
        <circle cx={C} cy={C} r="300" stroke="currentColor" strokeWidth="1" opacity="0.16" />
        <path d={arc(300, 20, 140)} stroke="currentColor" strokeWidth="6" opacity="0.14" />
        <path d={arc(300, 200, 250)} stroke="#ff4a4a" strokeWidth="2" opacity="0.5" />
        <circle cx={C} cy={C} r="266" stroke="currentColor" strokeWidth="1" opacity="0.12" strokeDasharray="1 5" />
      </g>

      {/* Layer C: inner ticks, counter-rotates with scroll */}
      <g data-ring-c style={origin}>
        <path d={inner} stroke="currentColor" strokeWidth="1.3" opacity="0.26" />
        <path d={arc(230, 300, 340)} stroke="#ff4a4a" strokeWidth="5" opacity="0.8" />
        <circle cx={C} cy={C} r="196" stroke="currentColor" strokeWidth="1" opacity="0.14" />
      </g>

      {/* Static crosshair */}
      <path d={`M${C - 14} ${C}H${C + 14}M${C} ${C - 14}V${C + 14}`} stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}
