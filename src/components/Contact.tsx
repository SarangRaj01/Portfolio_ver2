import { ArrowUpRight, Code, Download, Mail, MapPin, Phone, Trophy } from 'lucide-react'
import type { ReactNode } from 'react'
import { profile } from '../content/resume'
import { SectionHeading } from './SectionHeading'

type Row = {
  label: string
  value: string
  href?: string
  external?: boolean
  download?: string
  icon: ReactNode
}

const rows: Row[] = [
  { label: 'Email', value: profile.email, href: profile.emailHref, icon: <Mail size={18} aria-hidden="true" /> },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref, icon: <Phone size={18} aria-hidden="true" /> },
  { label: 'GitHub', value: profile.github.label, href: profile.github.href, external: true, icon: <Code size={18} aria-hidden="true" /> },
  { label: 'LeetCode', value: profile.leetcode.label, href: profile.leetcode.href, external: true, icon: <Trophy size={18} aria-hidden="true" /> },
  { label: 'Location', value: profile.location, icon: <MapPin size={18} aria-hidden="true" /> },
  { label: 'Resume', value: 'Download PDF', href: profile.resumeHref, download: profile.resumeFileName, icon: <Download size={18} aria-hidden="true" /> },
]

export function Contact() {
  return (
    <section id="contact" className="section theme-light" aria-labelledby="contact-title" data-section>
      <div className="wrap">
        <SectionHeading id="contact-title" number="05" eyebrow="Contact" title="Get in touch." />

        <div className="mb-14 md:mb-20" data-reveal>
          <a className="contact-email link-underline" href={profile.emailHref}>
            {profile.email}
          </a>
        </div>

        <ul className="m-0 list-none p-0" data-reveal-group>
          {rows.map((r) => {
            const inner = (
              <>
                <span className="mono text-mute">{r.label}</span>
                <span className="text-[1.05rem] font-medium [overflow-wrap:anywhere]">{r.value}</span>
                <span className="text-accent-s">{r.href ? (r.external ? <ArrowUpRight size={18} aria-hidden="true" /> : r.icon) : r.icon}</span>
              </>
            )
            return (
              <li key={r.label} data-reveal-item>
                {r.href ? (
                  <a
                    className="contact-row"
                    href={r.href}
                    {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    {...(r.download ? { download: r.download } : {})}
                  >
                    {inner}
                    {r.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                ) : (
                  <div className="contact-row">{inner}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
