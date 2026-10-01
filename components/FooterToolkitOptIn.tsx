'use client'

import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { useState } from 'react'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function FooterToolkitOptIn() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const guard = useSpamGuard()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const isLoading = status.kind === 'loading'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) return

    const trimmedName = firstName.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setStatus({ kind: 'error', message: 'Add your first name.' })
      return
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus({ kind: 'error', message: 'Enter a valid email.' })
      return
    }

    setStatus({ kind: 'loading' })

    try {
      const res = await fetch('/api/toolkit/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, first_name: trimmedName , ...guard.fields() }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok && res.status !== 202) {
        setStatus({
          kind: 'error',
          message: data?.error ?? 'Something went wrong. Try again.',
        })
        return
      }

      if (data?.status === 'existing') {
        setStatus({
          kind: 'success',
          message: "You're already in. Check your inbox for the original link.",
        })
        return
      }

      setStatus({
        kind: 'success',
        message: 'Check your inbox — your permanent link is on the way.',
      })
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Try again.' })
    }
  }

  return (
    <div className="bg-[#FFD84D] rounded-2xl p-6 md:p-8 grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-8 items-center mb-12 md:mb-16">
      <div>
        <p className="text-[#0C0C0C] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
          // Free Resource
        </p>
        <h3 className="text-[clamp(22px,3vw,32px)] text-[#0C0C0C] uppercase font-[family-name:var(--font-anton)] leading-[1.05] mb-2">
          Get the AI toolkit we hand every client.
        </h3>
        <p className="text-[#0C0C0C] text-sm md:text-base leading-relaxed">
          30+ tools. Permanent link. Updated quarterly. Yours free.
        </p>
      </div>

      {status.kind === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#0C0C0C] text-white rounded-xl p-5"
        >
          <p className="text-base font-semibold text-[#FFD84D] mb-1">You&apos;re in.</p>
          <p className="text-sm text-white/80 leading-relaxed">{status.message}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-label="Get the AI Toolkit"
          className="flex flex-col gap-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white border-2 border-[#0C0C0C] rounded-lg px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] text-sm outline-none focus:ring-2 focus:ring-[#0C0C0C] min-h-[44px]"
              aria-label="First name"
            />
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border-2 border-[#0C0C0C] rounded-lg px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] text-sm outline-none focus:ring-2 focus:ring-[#0C0C0C] min-h-[44px]"
              aria-label="Email"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-white hover:text-[#0C0C0C] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-lg text-sm border-2 border-[#0C0C0C] transition-all duration-200 min-h-[44px]"
          >
            {isLoading ? 'Sending…' : 'Send me the toolkit →'}
          </button>
          {status.kind === 'error' && (
            <p role="alert" className="text-[#7A1F1F] text-xs font-medium m-0">
              {status.message}
            </p>
          )}
          <p className="text-[#0C0C0C]/70 text-[11px] leading-relaxed m-0">
            One welcome email + quarterly updates. No spam. Unsubscribe anytime.
          </p>
        <HoneypotField value={guard.hp} onChange={guard.setHp} />
</form>
      )}
    </div>
  )
}
