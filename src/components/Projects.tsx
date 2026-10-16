import { projects } from '../content/resume'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const featured = projects.filter((p) => p.featured)
  const compact = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section theme-light" aria-labelledby="projects-title" data-section>
      <div className="wrap">
        <SectionHeading id="projects-title" number="03" eyebrow="Projects" title="Selected projects." />

        <div className="grid gap-6 md:gap-8">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
          {compact.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
