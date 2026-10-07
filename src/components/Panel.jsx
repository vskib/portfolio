import { useEffect, useState } from 'react'
import { mascot } from '../data/portfolio'
import Mascot, { preload } from './Mascot'

const workspaces = [
  { id: 'home', n: 1, label: 'home' },
  { id: 'skills', n: 2, label: 'skills' },
  { id: 'projects', n: 3, label: 'projects' },
  { id: 'contact', n: 4, label: 'contact' },
]
const ids = workspaces.map((w) => w.id)

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

function useActiveSection() {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return active
}

export default function Panel() {
  const now = useClock()
  const active = useActiveSection()

  useEffect(() => preload('laugh'), [])

  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-crust/90 font-sans text-sm backdrop-blur">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-3 sm:px-4">
        {/* Workspaces */}
        <nav aria-label="Workspaces" className="flex items-center gap-1">
          {workspaces.map((w) => (
            <a
              key={w.id}
              href={`#${w.id}`}
              aria-current={active === w.id ? 'true' : undefined}
              className={`rounded px-2 py-1 transition ${
                active === w.id
                  ? 'bg-mauve font-bold text-crust'
                  : 'text-muted hover:bg-overlay hover:text-fg'
              }`}
            >
              {w.n}
              <span className="hidden md:inline">:{w.label}</span>
            </a>
          ))}
        </nav>

        {/* Clock */}
        <div className="hidden text-fg sm:block" aria-label="Current date and time">
          {date} <span className="ml-2 font-medium">{time}</span>
        </div>

        {/* System tray */}
        <div className="flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="hidden tracking-widest lg:inline">
            ◔ ♪ ▰▰▰▱
          </span>
          <span className="flex items-center gap-2">
            <Mascot pose="head" hoverPose="laugh" size="xs" rotate={22} shift={3} />
            <span className="hidden md:inline">{mascot.name}</span>
          </span>
        </div>
      </div>
    </header>
  )
}