import { useEffect, useState } from 'react'
import { profile, mascot } from '../data/portfolio'
import Mascot, { preload } from './Mascot'
import Window, { Prompt } from './Window'

const palette = [
  'bg-red', 'bg-peach', 'bg-yellow', 'bg-green',
  'bg-teal', 'bg-blue', 'bg-mauve', 'bg-pink',
]

// Click the mascot to cycle through these poses
const poseCycle = ['wave', 'hips']

function useTypewriter(text, speed = 16) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text)
      return
    }
    setOut('')
    let i = 0
    const t = setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return out
}

export default function Hero() {
  const [greeting, setGreeting] = useState(0)
  const [poseIndex, setPoseIndex] = useState(0)
  const typed = useTypewriter(profile.headline)

  useEffect(() => preload('peace', 'hips'), [])

  const rows = [
    { label: 'Name', value: profile.name },
    { label: 'Role', value: profile.title },
    ...profile.specs,
  ]

  return (
    <section id="home" className="mx-auto max-w-6xl scroll-mt-12 px-4 pb-8 pt-10 sm:pt-16">
      <Window title={`${profile.handle}@${profile.host}: ~`}>
        <Prompt>neofetch</Prompt>

        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
          {/* Mascot + cowsay bubble */}
          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => setGreeting((g) => (g + 1) % mascot.greetings.length)}
              className="relative max-w-[16rem] rounded-lg border border-line bg-overlay px-3 py-2 text-center text-xs transition hover:border-mauve"
            >
              <span className="text-muted">$ cowsay</span>
              <span aria-live="polite" className="mt-1 block">
                {mascot.greetings[greeting]}
              </span>
              <span className="mt-1 block text-[10px] text-muted">click for next</span>
              <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-line bg-overlay" />
            </button>

            <button
              type="button"
              onClick={() => setPoseIndex((i) => (i + 1) % poseCycle.length)}
              aria-label="Change mascot pose"
              title="Click me!"
              className="cursor-pointer"
            >
              <Mascot pose={poseCycle[poseIndex]} size="lg" />
            </button>
            <span className="text-[10px] text-muted">click me to change pose</span>
          </div>

          {/* neofetch info */}
          <div className="min-w-0 text-sm sm:text-base">
            <p className="text-lg font-bold sm:text-xl">
              <span className="text-green">{profile.handle}</span>@
              <span className="text-green">{profile.host}</span>
            </p>
            <div className="my-2 h-px bg-line" />
            <dl className="space-y-1">
              {rows.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-24 shrink-0 font-bold text-mauve">{r.label}</dt>
                  <dd className="min-w-0 break-words">{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex gap-1" aria-hidden="true">
              {palette.map((c) => (
                <span key={c} className={`h-4 w-6 ${c}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Prompt>whoami --goals</Prompt>
          <p className="min-h-[4.5rem] leading-relaxed text-fg/90">
            {typed}
            <span className="animate-blink text-green motion-reduce:animate-none">▌</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href="#projects"
              className="rounded-md bg-green px-4 py-2 font-bold text-crust transition hover:bg-teal"
            >
              ./view-projects.sh
            </a>
            <a
              href="#contact"
              className="rounded-md border border-line px-4 py-2 transition hover:border-mauve hover:text-mauve"
            >
              ./contact.sh
            </a>
          </div>
        </div>
      </Window>
    </section>
  )
}