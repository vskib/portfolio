import { useState } from 'react'
import Mascot from './Mascot'
import Window, { Prompt } from './Window'

fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {})
const initialForm = { name: '', email: '', message: '' }

const moods = { idle: 'idle', loading: 'working', success: 'happy', error: 'error' }
const mascotLines = {
  idle: 'Say hi! I read everything.',
  loading: 'Sending your message...',
  success: 'Delivered! Thank you!',
  error: 'Oops, something broke.',
}

const wrap =
  'flex items-start gap-2 rounded-md border border-line bg-mantle px-3 py-2 text-sm transition focus-within:border-green'
const input =
  'w-full bg-transparent text-fg outline-none placeholder:text-muted/60'

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', text: '' })

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
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

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-12 px-4 py-10">
      <h2 className="sr-only">Contact</h2>
      <Window title="~/contact: ./send_message.sh">
        <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center gap-3 text-center">
            <Mascot size="lg" mood={moods[status.type]} float={status.type === 'success'} />
            <p className="max-w-[14rem] rounded-lg border border-line bg-overlay px-3 py-2 text-xs">
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