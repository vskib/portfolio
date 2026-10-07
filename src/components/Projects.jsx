import { projects } from '../data/portfolio'
import Window from './Window'

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'project'

function ProjectCard({ project }) {
  return (
    <Window
      title={`${slug(project.name)}/ — README.md`}
      icon="▤"
      className="flex flex-col"
      bodyClassName="flex flex-1 flex-col p-5"
    >
      <p className="mb-2 text-xs text-muted">$ cat README.md</p>
      <p className="flex-1 text-sm leading-relaxed text-fg/90">{project.description}</p>

      <p className="mb-2 mt-5 text-xs text-muted">$ cat stack.txt</p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-line bg-mantle px-2 py-0.5 text-xs text-teal"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line px-3 py-1.5 transition hover:border-green hover:text-green"
          >
            git clone ↗
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-line px-3 py-1.5 transition hover:border-blue hover:text-blue"
          >
            xdg-open ↗
          </a>
        )}
      </div>

      {/* vim-style status line */}
      <div className="-mx-5 -mb-5 mt-5 flex items-center gap-3 bg-mantle px-3 py-1 text-xs">
        <span className="bg-green px-2 font-bold text-crust">NORMAL</span>
        <span className="text-muted">main</span>
        <span className="ml-auto text-muted">utf-8 · {project.stack.length} deps</span>
      </div>
    </Window>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-12 px-4 py-10">
      <h2 className="mb-6 text-xl font-bold">
        <span className="text-green">$</span> ls ~/projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}