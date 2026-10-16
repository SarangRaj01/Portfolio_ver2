type Props = {
  id: string
  number: string
  eyebrow: string
  title: string
  className?: string
}

export function SectionHeading({ id, number, eyebrow, title, className = '' }: Props) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <p className="mono text-mute flex items-center gap-3" data-reveal>
        <span className="text-accent-s">{number}</span>
        <span aria-hidden="true" className="inline-block h-px w-10 bg-[var(--s-line)]" />
        {eyebrow}
      </p>
      <h2 id={id} className="display mt-5 text-[clamp(2.5rem,7vw,5.75rem)] text-balance" data-heading>
        {title}
      </h2>
    </header>
  )
}
