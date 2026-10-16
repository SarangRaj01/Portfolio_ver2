import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../content/resume'

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Technologies used">
      {items.map((t) => (
        <li key={t}>
          <span className="chip">{t}</span>
        </li>
      ))}
    </ul>
  )
}

function RepoLink({ project }: { project: Project }) {
  if (!project.link) return null
  return (
    <a
      className="btn mt-6"
      href={project.link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title}: view source on GitHub (opens in a new tab)`}
    >
      <span>View on GitHub</span>
      <span data-card-arrow className="inline-flex">
        <ArrowUpRight size={16} aria-hidden="true" />
      </span>
    </a>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const titleId = `project-title-${project.id}`

  if (project.featured) {
    return (
      <article id={`project-${project.id}`} className="project-card" aria-labelledby={titleId} data-card data-reveal>
        <span className="card-line" data-card-line aria-hidden="true" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <div className="flex items-start justify-between gap-4">
              <span className="project-index display" data-card-index aria-hidden="true">
                {project.index}
              </span>
              <span className="mono text-mute pt-1 text-right">{project.kind}</span>
            </div>
            <h3 id={titleId} className="mt-8 text-[clamp(1.6rem,3vw,2.35rem)] font-bold leading-[1.08] tracking-tight text-balance">
              {project.title}
            </h3>
            <div className="mt-6">
              <Tech items={project.tech} />
            </div>
            <RepoLink project={project} />
          </div>

          <ul className="point-list lg:pt-2">
            {project.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {project.highlights && (
          <dl className="m-0 mt-12 grid gap-x-6 gap-y-6 sm:grid-cols-3">
            {project.highlights.map((h) => (
              <div className="highlight flex flex-col" key={h.label}>
                <dt className="text-mute order-2 mt-2 text-[0.9rem] leading-snug">{h.label}</dt>
                <dd className="highlight-value order-1 m-0">{h.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </article>
    )
  }

  return (
    <article id={`project-${project.id}`} className="project-card flex flex-col" aria-labelledby={titleId} data-card data-reveal>
      <span className="card-line" data-card-line aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <span className="project-index display" data-card-index aria-hidden="true">
          {project.index}
        </span>
        <span className="mono text-mute pt-1 text-right">{project.kind}</span>
      </div>
      <h3 id={titleId} className="mt-6 text-[clamp(1.4rem,2.4vw,1.8rem)] font-bold leading-[1.12] tracking-tight text-balance">
        {project.title}
      </h3>
      <div className="mt-5">
        <Tech items={project.tech} />
      </div>
      <ul className="point-list mt-6">
        {project.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <RepoLink project={project} />
    </article>
  )
}
