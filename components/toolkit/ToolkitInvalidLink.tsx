'use client'

import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import Link from 'next/link'
import { useState } from 'react'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'sent'; message: string }
  | { kind: 'not_found' }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ToolkitInvalidLink() {
  const [email, setEmail] = useState('')
  const guard = useSpamGuard()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [focused, setFocused] = useState(false)
  const isLoading = status.kind === 'loading'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLoading) return
    const trimmed = email.trim()
    if (!EMAIL_RE.test(trimmed)) {
      setStatus({ kind: 'error', message: 'Please enter a valid email address.' })
      return
    }
    setStatus({ kind: 'loading' })
    try {
      const res = await fetch('/api/toolkit/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed , ...guard.fields() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({ kind: 'error', message: data?.error ?? 'Something went wrong.' })
        return
      }
      if (data?.status === 'not_found') {
        setStatus({ kind: 'not_found' })
        return
      }
      setStatus({ kind: 'sent', message: data?.message ?? 'Sent. Check your inbox.' })
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Try again.' })
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 20px',
      }}
    >
      <div style={{ maxWidth: 520, width: '100%' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 999,
            background: 'rgba(245, 197, 24, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            color: '#F5F0E8',
          }}
        >
          This link doesn’t look right
        </h1>

        <p
          style={{
            margin: '0 0 32px',
            fontSize: 16,
            lineHeight: 1.6,
            color: '#F5F0E8',
            opacity: 0.78,
          }}
        >
          It may have been copied incorrectly. Enter your email below and we’ll resend your original link.
        </p>

        {status.kind === 'sent' ? (
          <div
            role="status"
            aria-live="polite"
            style={{
              background: '#111111',
              border: '1px solid rgba(78, 204, 127, 0.3)',
              borderRadius: 12,
              padding: 24,
              color: '#F5F0E8',
            }}
          >
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>{status.message}</p>
          </div>
        ) : status.kind === 'not_found' ? (
          <div
            role="status"
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: 24,
            }}
          >
            <p style={{ margin: '0 0 16px', fontSize: 15, lineHeight: 1.6, color: '#F5F0E8' }}>
              No account found for that email.
            </p>
            <Link
              href="/free/toolkit"
              style={{
                display: 'inline-block',
                background: '#F5C518',
                color: '#0A0A0A',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 700,
                fontSize: 14,
                padding: '12px 18px',
                borderRadius: 8,
                textDecoration: 'none',
              }}
            >
              Get free access →
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <label
              htmlFor="resend_email"
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: '#888580',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Email address
            </label>
            <input
              id="resend_email"
              name="email"
              type="email"
              required
              placeholder="jane@company.com"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                width: '100%',
                background: '#1A1A1A',
                color: '#F5F0E8',
                border: focused ? '2px solid #F5C518' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                padding: focused ? '11px 13px' : '12px 14px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 15,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: '#F5C518',
                color: '#0A0A0A',
                border: 'none',
                borderRadius: 8,
                padding: '14px 18px',
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 15,
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                marginTop: 6,
              }}
            >
              {isLoading ? 'Sending…' : 'Resend my link →'}
            </button>
            {status.kind === 'error' && (
              <p role="alert" style={{ margin: 0, fontSize: 13, color: '#FF8A8A' }}>
                {status.message}
              </p>
            )}
          <HoneypotField value={guard.hp} onChange={guard.setHp} />
</form>
        )}
      </div>
    </main>
  )
}
