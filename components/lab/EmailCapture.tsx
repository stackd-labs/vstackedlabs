'use client'

import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { useState } from 'react'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success'; message: string }
  | { kind: 'existing'; message: string }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type EmailCaptureProps = {
  headline?: string
  body?: string
  source: 'smart-intake' | 'ai-assistant' | 'ops-dashboard' | 'gallery'
}

export default function EmailCapture({
  headline = 'Want first dibs on new demos?',
  body = "Drop your email and we'll send you the link when each new demo lands.",
  source,
}: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const guard = useSpamGuard()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const isLoading = status.kind === 'loading'
  const isDone = status.kind === 'success' || status.kind === 'existing'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) return

    const trimmedName = firstName.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      setStatus({ kind: 'error', message: 'Please enter your first name.' })
      return
    }
    if (!EMAIL_RE.test(trimmedEmail)) {
      setStatus({ kind: 'error', message: 'Please enter a valid email.' })
      return
    }

    setStatus({ kind: 'loading' })

    try {
      const res = await fetch('/api/lab/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, first_name: trimmedName, source , ...guard.fields() }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok && res.status !== 202) {
        setStatus({ kind: 'error', message: data?.error ?? 'Something went wrong. Try again.' })
        return
      }

      if (data?.status === 'existing') {
        setStatus({
          kind: 'existing',
          message: data?.message ?? "You're already on the list.",
        })
        return
      }

      setStatus({
        kind: 'success',
        message: data?.message ?? "You're on the list — check your inbox.",
      })
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Try again.' })
    }
  }

  if (isDone) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border-2 border-[#0C0C0C] bg-[#FFD84D] p-6 sm:p-7 flex items-start gap-4"
      >
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#0C0C0C] shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5L10 17.5L19 7.5" stroke="#FFD84D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl uppercase text-[#0C0C0C] leading-tight mb-1">
            {status.kind === 'existing' ? 'Already on the list' : "You're in"}
          </p>
          <p className="text-sm text-[#0C0C0C] leading-relaxed">{status.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[#E2DED8] bg-white p-6 sm:p-7">
      <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#888580] font-semibold mb-2">
            On the list
          </p>
          <h3 className="font-[family-name:var(--font-anton)] text-xl sm:text-2xl text-[#0C0C0C] uppercase leading-tight mb-2">
            {headline}
          </h3>
          <p className="text-sm text-[#3A3A38] leading-relaxed max-w-xl">{body}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-2.5 lg:min-w-[320px]"
          aria-label="Demo Lab updates opt-in"
        >
          <input
            type="text"
            required
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            className="bg-[#F6F4EF] border border-[#E2DED8] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors"
          />
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="bg-[#F6F4EF] border border-[#E2DED8] rounded-lg px-3.5 py-2.5 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] hover:text-[#0C0C0C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
          >
            {isLoading ? 'Sending…' : 'Notify me of new demos →'}
          </button>
          {status.kind === 'error' && (
            <p role="alert" className="text-[#B91C1C] text-xs m-0">
              {status.message}
            </p>
          )}
        <HoneypotField value={guard.hp} onChange={guard.setHp} />
</form>
      </div>
    </div>
  )
}
