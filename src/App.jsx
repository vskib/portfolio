import { MascotProvider } from './context/MascotContext'
import Panel from './components/Panel'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Mascot from './components/Mascot'
import { profile } from './data/portfolio'

export default function App() {
  return (
    <MascotProvider>
      <div className="min-h-screen">
        <Panel />

        <main>
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* tmux-style status bar */}
        <footer className="mt-10 border-t border-line bg-mantle font-sans text-xs">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2">
            <span className="bg-green px-2 py-0.5 font-bold text-crust">[0] {profile.host}</span>
            <span className="text-muted">exit 0</span>
            <span className="ml-auto flex items-center gap-2 text-muted">
              <Mascot size="xs" />
              © {new Date().getFullYear()} {profile.name} · React, Tailwind, Express &amp; Supabase
            </span>
          </div>
        </footer>
      </div>
    </MascotProvider>
  )
}