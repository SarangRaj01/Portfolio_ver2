import { ArrowUp } from 'lucide-react'
import { profile } from '../content/resume'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="section theme-dark !py-10">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <p className="mono text-mute m-0">
          © {YEAR} {profile.name}
        </p>
        <p className="mono text-mute m-0 hidden sm:block">React · TypeScript · Vite · Anime.js</p>
        <a href="#top" className="btn !min-h-10 !px-4 !py-2">
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
