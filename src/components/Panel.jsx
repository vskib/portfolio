import { useEffect, useRef, useState } from 'react'
import { useMascot } from '../context/MascotContext'
import { MascotArt, pickerOptions } from './Mascot'

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
  const { template, setTemplate } = useMascot()
  const [menu, setMenu] = useState(false)
  const ref = useRef(null)

  // Close the mascot menu on outside click or Escape
  useEffect(() => {
    if (!menu) return
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setMenu(false)
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menu])

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
        <div ref={ref} className="relative flex items-center gap-3 text-muted">
          <span aria-hidden="true" className="hidden tracking-widest lg:inline">
            ◔ ♪ ▰▰▰▱
          </span>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-haspopup="true"
            aria-expanded={menu}
            className="flex items-center gap-2 rounded-md px-2 py-1 transition hover:bg-overlay hover:text-fg"
          >
            <MascotArt id={template} size="xs" />
            <span className="hidden md:inline">Mascot</span>
            <span aria-hidden="true">▾</span>
          </button>

          {menu && (
            <div className="absolute right-0 top-10 w-64 rounded-xl border border-line bg-mantle p-3 shadow-2xl shadow-black/50">
              <p className="mb-2 px-1 text-xs uppercase tracking-wider text-muted">Choose mascot</p>
              <div className="grid grid-cols-3 gap-2">
                {pickerOptions.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={template === o.id}
                    onClick={() => {
                      setTemplate(o.id)
                      setMenu(false)
                    }}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition ${
                      template === o.id
                        ? 'border-mauve bg-overlay text-fg'
                        : 'border-transparent hover:bg-overlay hover:text-fg'
                    }`}
                  >
                    <MascotArt id={o.id} size="sm" />
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}