import { skillGroups } from '../content/resume'
import { SectionHeading } from './SectionHeading'

/**
 * Blueprint-style exploded stack: one plate per skill group, labelled with leader lines.
 * Decorative (the real content is the list beside it), so it is hidden from assistive tech.
 */
const VIEW_W = 640
const CX = 205
const PLATES = [
  { rx: 150, ry: 40 },
  { rx: 128, ry: 34 },
  { rx: 160, ry: 42 },
  { rx: 114, ry: 31 },
  { rx: 140, ry: 38 },
]
const LABELS = ['languages', 'backend + web', 'databases', 'tools + platforms', 'core cs']
const THICK = 24
const STEP = 100
const TOP = 96

function Blueprint() {
  return (
    <svg
      className="skills-blueprint mt-6 h-auto w-full max-w-[40rem]"
      viewBox={`0 0 ${VIEW_W} 584`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-blueprint
    >
      {PLATES.map((p, i) => ({ p, i }))
        .reverse()
        .map(({ p, i }) => {
          const cy = TOP + i * STEP
          const left = CX - p.rx
          const right = CX + p.rx
          const labelY = cy - 22
          const startX = right + 6
          const startY = cy + THICK / 2
          const elbowX = startX + 34
          const label = LABELS[i]
          const labelW = label.length * 9.1
          const endX = VIEW_W - labelW - 12
          return (
            <g key={i} className="bp-plate" data-plate={i} style={{ willChange: 'transform' }}>
              {/* Side wall, opaque so lower plates are hidden behind */}
              <path
                d={`M${left} ${cy}V${cy + THICK}A${p.rx} ${p.ry} 0 0 0 ${right} ${cy + THICK}V${cy}`}
                fill="#151412"
                stroke="#8f8a82"
                strokeWidth="1.2"
              />
              <ellipse className="bp-top" cx={CX} cy={cy} rx={p.rx} ry={p.ry} fill="#151412" stroke="#8f8a82" strokeWidth="1.2" />
              <ellipse cx={CX} cy={cy} rx={p.rx * 0.7} ry={p.ry * 0.7} stroke="#8f8a82" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
              <ellipse cx={CX} cy={cy} rx={p.rx * 0.34} ry={p.ry * 0.34} stroke="#8f8a82" strokeWidth="1" opacity="0.7" />
              <path d={`M${CX - 8} ${cy}H${CX + 8}M${CX} ${cy - 4}V${cy + 4}`} stroke="#8f8a82" strokeWidth="1" opacity="0.7" />
              <polyline
                className="bp-leader"
                points={`${startX},${startY} ${elbowX},${labelY} ${endX},${labelY}`}
                stroke="#8f8a82"
                strokeWidth="1"
                opacity="0.8"
              />
              <text className="bp-label" x={VIEW_W} y={labelY + 5} textAnchor="end">
                {label}
              </text>
            </g>
          )
        })}
    </svg>
  )
}

export function Skills() {
  return (
    <section id="skills" className="skills-section section theme-dark" aria-labelledby="skills-title" data-skills data-section>
      <div className="skills-pin">
        <div className="wrap">
          <div className="skills-stage">
            <div>
              <SectionHeading id="skills-title" number="02" eyebrow="Technical skills" title="Tools I work with." className="!mb-0 lg:!mb-2" />
              <Blueprint />
            </div>

            <div className="grid gap-2">
              {skillGroups.map((group, i) => (
                <div className="skill-block" key={group.id} data-skill-block data-index={i}>
                  <h3 className="mono flex items-center gap-3">
                    <span className="text-accent-s">0{i + 1}</span>
                    <span>{group.label}</span>
                  </h3>
                  <p className="skill-blurb text-mute mt-2 mb-0 max-w-[46ch] text-[0.95rem] leading-relaxed">{group.blurb}</p>
                  <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0" data-reveal-group data-reveal-small>
                    {group.items.map((item) => (
                      <li key={item} data-reveal-item>
                        <span className="chip">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
