import { profile, stats } from '../content/resume'
import { SectionHeading } from './SectionHeading'

/** Areas of work, each derived from the projects on the resume. */
const areas = [
  {
    title: 'Concurrency and data consistency',
    body: 'Row-level locking, optimistic versioning, and multi-threaded tests in the inventory and order system.',
    href: '#project-inventory',
  },
  {
    title: 'Compilers and runtime security',
    body: 'Probe injection and self-healing recovery in the Self-Healing Compiler capstone.',
    href: '#project-shc',
  },
  {
    title: 'Computer networking',
    body: 'TCP and UDP sockets, LAN peer discovery, and Wireshark traces in the messenger projects.',
    href: '#project-lan',
  },
]

export function About() {
  return (
    <section id="about" className="section theme-light" aria-labelledby="about-title" data-section>
      <div className="wrap">
        <SectionHeading id="about-title" number="01" eyebrow="About" title="Backend, systems, and networking." />

        <p className="statement" data-scrub>
          {profile.summary}
        </p>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-24 lg:grid-cols-4" data-reveal-group>
          {stats.map((s) => (
            <div className="stat flex flex-col" key={s.label} data-reveal-item>
              <dt className="order-2 mt-3 text-[0.95rem] font-semibold leading-snug">{s.label}</dt>
              <dd className="stat-value order-1 m-0">
                <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                  {s.value.toFixed(s.decimals ?? 0)}
                </span>
                {s.suffix}
              </dd>
              <dd className="text-mute order-3 m-0 mt-1 text-[0.9rem] leading-snug">{s.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-20 md:mt-28">
          <h3 className="mono text-mute" data-reveal>
            Areas of work
          </h3>
          <ul className="m-0 mt-6 grid list-none gap-px overflow-hidden rounded-2xl border border-line bg-[var(--s-line)] p-0 md:grid-cols-3" data-reveal-group>
            {areas.map((a, i) => (
              <li key={a.title} className="bg-card p-6 md:p-8" data-reveal-item>
                <a href={a.href} className="group block no-underline" style={{ color: 'inherit' }}>
                  <span className="mono text-accent-s">0{i + 1}</span>
                  <span className="mt-4 block text-[1.25rem] font-semibold leading-tight tracking-tight">{a.title}</span>
                  <span className="text-mute mt-3 block text-[0.95rem] leading-relaxed">{a.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
