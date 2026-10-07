import { skills } from '../data/portfolio'
import Window, { Prompt } from './Window'

const accents = ['text-green', 'text-peach', 'text-mauve']
const slug = (s) => s.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-')

export default function Skills() {
  const total = skills.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-12 px-4 py-10">
      <h2 className="sr-only">Skills</h2>
      <Window title="tmux: ~/skills">
        <Prompt path="~/skills">tree --dirsfirst</Prompt>

        <div className="grid divide-y divide-line overflow-hidden rounded-lg border border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {skills.map((group, gi) => (
            <div key={group.category} className="bg-mantle/60 p-4">
              <p className="mb-3 flex items-center justify-between text-sm font-bold">
                <span className="text-blue">{slug(group.category)}/</span>
                <span className="text-xs font-normal text-muted">{group.items.length} items</span>
              </p>
              <ul className="space-y-1 text-sm">
                {group.items.map((item, i) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="select-none text-line">
                      {i === group.items.length - 1 ? '└──' : '├──'}
                    </span>
                    <span className={accents[gi % accents.length]}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-muted">
          {skills.length} directories, {total} skills
        </p>
      </Window>
    </section>
  )
}