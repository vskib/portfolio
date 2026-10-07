import { useEffect, useState } from 'react'
import Mascot, { preload } from './Mascot'
import Window, { Prompt } from './Window'

const initialForm = { name: '', email: '', message: '' }

// Which mascot pose to show for each form state
const poseFor = { idle: 'waiting', loading: 'waiting', success: 'ok', error: 'hips' }

const mascotLines = {
  idle: 'Waiting for your message...',
  loading: 'Sending... hold on!',
  success: 'Message received. All OK!',
  error: 'Oops, something broke.',
}

const wrap =
  'flex items-start gap-2 rounded-md border border-line bg-mantle px-3 py-2 text-sm transition focus-within:border-green'
const input =
  'w-full bg-transparent text-fg outline-none placeholder:text-muted/60'

// Little wristwatch with a ticking hand (spins faster while sending)
function WatchBadge({ fast, className = '' }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={`h-14 w-14 drop-shadow-lg ${className}`}>
      <rect x="15" y="1" width="18" height="10" rx="3" fill="#45475a" />
      <rect x="15" y="37" width="18" height="10" rx="3" fill="#45475a" />
      <circle cx="24" cy="24" r="14" fill="#1e1e2e" stroke="#cba6f7" strokeWidth="3" />
      <circle cx="24" cy="24" r="1.8" fill="#cdd6f4" />
      <line x1="24" y1="24" x2="29" y2="21" stroke="#cdd6f4" strokeWidth="2.4" strokeLinecap="round" />
      <g
        className={`${fast ? 'animate-tick-fast' : 'animate-tick'} motion-reduce:animate-none`}
        style={{ transformOrigin: '24px 24px' }}
      >
        <line x1="24" y1="24" x2="24" y2="13" stroke="#f38ba8" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  useEffect(() => preload('waiting', 'ok', 'hips'), [])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', text: '' })

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')

      setStatus({ type: 'success', text: "Message sent! I'll get back to you soon." })
      setForm(initialForm)
    } catch (err) {
      setStatus({ type: 'error', text: err.message })
    }
  }

  // systemd-style status output
  const line = {
    loading: { tag: ' .... ', color: 'text-yellow', text: 'Sending message to server...' },
    success: { tag: '  OK  ', color: 'text-green', text: status.text },
    error: { tag: 'FAILED', color: 'text-red', text: status.text },
  }[status.type]

  const waiting = status.type === 'idle' || status.type === 'loading'

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-12 px-4 py-10">
      <h2 className="sr-only">Contact</h2>
      <Window title="~/contact: ./send_message.sh">
        <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative">
              <Mascot pose={poseFor[status.type]} size="lg" />

              {waiting && (
                <WatchBadge
                  fast={status.type === 'loading'}
                  className="absolute -right-4 top-1/3"
                />
              )}

              {status.type === 'success' && (
                <span
                  aria-hidden="true"
                  className="absolute -right-4 top-1/4 grid h-16 w-16 animate-pop place-items-center rounded-full bg-green text-4xl shadow-lg motion-reduce:animate-none"
                >
                  👌
                </span>
              )}
            </div>

            <p
              aria-live="polite"
              className={`max-w-[14rem] rounded-lg border bg-overlay px-3 py-2 text-xs ${
                status.type === 'error' ? 'border-red text-red' : 'border-line'
              }`}
            >
              {mascotLines[status.type]}
            </p>
          </div>

          <div>
            <Prompt path="~/contact">./send_message.sh</Prompt>
            <p className="mb-4 text-sm text-muted">
              Have a question or an opportunity? Fill in the fields below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="name" className={wrap}>
                <span className="select-none text-green">name:</span>
                <input
                  id="name" name="name" type="text" required maxLength={100}
                  value={form.name} onChange={handleChange}
                  placeholder="Your name" className={input}
                />
              </label>

              <label htmlFor="email" className={wrap}>
                <span className="select-none text-green">email:</span>
                <input
                  id="email" name="email" type="email" required maxLength={254}
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className={input}
                />
              </label>

              <label htmlFor="message" className={wrap}>
                <span className="select-none text-green">msg:</span>
                <textarea
                  id="message" name="message" rows={5} required maxLength={2000}
                  value={form.message} onChange={handleChange}
                  placeholder="Write your message..." className={`${input} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="rounded-md bg-green px-5 py-2 text-sm font-bold text-crust transition hover:bg-teal disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.type === 'loading' ? './send (running...)' : './send'}
              </button>

              {line && (
                <p role="status" className="break-words text-sm">
                  <span className="whitespace-pre">[</span>
                  <span className={`whitespace-pre ${line.color}`}>{line.tag}</span>
                  <span className="whitespace-pre">] </span>
                  {line.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </Window>
    </section>
  )
}