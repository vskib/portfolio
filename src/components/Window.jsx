import { useState } from 'react'
import { profile } from '../data/portfolio'

// Shell prompt line: yourname@portfolio:~$ command
export function Prompt({ path = '~', children }) {
  return (
    <p className="mb-3 break-words text-sm">
      <span className="font-bold text-green">
        {profile.handle}@{profile.host}
      </span>
      <span>:</span>
      <span className="font-bold text-blue">{path}</span>
      <span>$ </span>
      <span>{children}</span>
    </p>
  )
}

export default function Window({
  title,
  icon = '❯_',
  children,
  className = '',
  bodyClassName = 'p-5 sm:p-6',
}) {
  const [open, setOpen] = useState(true)

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40 ${className}`}
    >
      <header className="flex select-none items-center justify-between gap-3 border-b border-line bg-mantle px-4 py-2 font-sans text-xs text-muted">
        <span className="truncate">
          <span className="mr-2 text-mauve">{icon}</span>
          {title}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Minimize window' : 'Restore window'}
            className="grid h-5 w-5 place-items-center rounded-full bg-overlay transition hover:bg-yellow hover:text-crust"
          >
            –
          </button>
          <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-overlay">
            ▢
          </span>
          <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-overlay">
            ✕
          </span>
        </div>
      </header>
      {open && <div className={bodyClassName}>{children}</div>}
    </div>
  )
}