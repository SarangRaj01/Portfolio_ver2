import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../content/resume'
import { TickRing } from './TickRing'

export function Hero() {
  return (
    <section id="top" className="section hero theme-dark" aria-labelledby="hero-title" data-hero data-section>
      {/* Decorative: parallax wrapper (scroll) holds the ring (entrance) */}
      <div className="absolute inset-0 overflow-clip" aria-hidden="true">
        <div data-hero-ring-shift className="absolute inset-0">
          <div data-hero-ring className="hero-ring">
            <TickRing className="block h-full w-full" />
          </div>
        </div>
      </div>

      <div className="wrap relative z-10" data-hero-content>
        <p className="mono text-mute flex flex-wrap gap-x-5 gap-y-1" data-hero-item>
          <span>Computer Science</span>
          <span>VIT Vellore</span>
          <span>Expected 2028</span>
        </p>

        <h1 id="hero-title" className="hero-name display mt-6 text-balance" aria-label={profile.name}>
          <span className="mask" aria-hidden="true">
            <span className="line" data-hero-name>
              {profile.firstName}
            </span>
          </span>
          <span className="mask" aria-hidden="true">
            <span className="line" data-hero-name>
              {profile.lastName}
            </span>
          </span>
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-end md:gap-12">
          <p
            className="max-w-[24ch] text-[clamp(1.45rem,2.7vw,2.25rem)] font-medium leading-[1.15] tracking-tight"
            data-hero-item
          >
            {profile.headline}
          </p>
          <div>
            <p className="text-mute max-w-[44ch]" data-hero-item>
              {profile.heroSummary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3" data-hero-item>
              <a className="btn btn-solid" href="#projects">
                View projects
                <ArrowDown size={16} className="icon-down" aria-hidden="true" />
              </a>
              <a className="btn" href="#contact">
                Contact me
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a className="btn" href={profile.resumeHref} download={profile.resumeFileName}>
                Download resume
                <Download size={16} className="icon-down" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
