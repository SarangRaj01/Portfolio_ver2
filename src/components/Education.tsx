import { ArrowUpRight, Trophy } from 'lucide-react'
import { achievements, education } from '../content/resume'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section id="education" className="section theme-dark" aria-labelledby="education-title" data-section>
      <div className="wrap">
        <SectionHeading id="education-title" number="04" eyebrow="Background" title="Education and achievements." />

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-24">
          {/* Education timeline */}
          <div>
            <h3 className="mono text-mute mb-8" data-reveal>
              Education
            </h3>
            <ol className="timeline m-0 list-none p-0" data-timeline>
              <span className="timeline-rail" aria-hidden="true">
                <span className="timeline-progress" data-timeline-progress />
              </span>
              {education.map((e) => (
                <li key={e.id} className="relative pb-14 last:pb-0" data-timeline-item>
                  <span className="timeline-node text-accent-s" data-timeline-node aria-hidden="true" />
                  <div data-timeline-body>
                    <p className="mono text-accent-s m-0">{e.period}</p>
                    <h4 className="mt-3 mb-0 text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-tight tracking-tight">{e.institution}</h4>
                    {e.place && <p className="text-mute m-0 mt-1">{e.place}</p>}
                    <p className="m-0 mt-4 text-[1.1rem] font-medium">{e.degree}</p>
                    <p className="text-mute m-0 mt-1">{e.detail}</p>
                    {e.grade && (
                      <p className="mt-4 mb-0 inline-block rounded-full border border-line px-4 py-1.5 font-mono text-[0.8rem] tracking-wide">
                        {e.grade}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="mono text-mute mb-8" data-reveal>
              Achievements and leadership
            </h3>
            <ul className="m-0 grid list-none gap-5 p-0" data-reveal-group>
              {achievements.map((a) => (
                <li key={a.id} className="rounded-2xl border border-line bg-card p-6 md:p-8" data-reveal-item>
                  <Trophy size={22} className="text-accent-s" aria-hidden="true" />
                  <h4 className="mt-5 mb-0 text-[1.3rem] font-semibold leading-tight tracking-tight">{a.title}</h4>
                  <p className="text-mute m-0 mt-3">{a.body}</p>
                  {'link' in a && a.link && (
                    <a
                      className="link-underline text-accent-s mt-5 inline-flex items-center gap-1.5 font-mono text-[0.8rem]"
                      href={a.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {a.link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
