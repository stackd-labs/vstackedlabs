'use client'

import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Status =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'created'; message: string }
  | { kind: 'existing'; message: string }
  | { kind: 'error'; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ToolkitOptIn() {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const guard = useSpamGuard()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const isLoading = status.kind === 'loading'
  const showSuccess = status.kind === 'created' || status.kind === 'existing'

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
      setStatus({ kind: 'error', message: 'Please enter a valid email address.' })
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
          kind: 'existing',
          message: "You're already in. Check your email for your original access link.",
        })
        return
      }

      setStatus({
        kind: 'created',
        message: 'Check your inbox. Your permanent link is on the way.',
      })
    } catch {
      setStatus({ kind: 'error', message: 'Network error. Try again.' })
    }
  }

  return (
    <>
      <Navbar yellowHero />
      <main>
        {/* Hero / form */}
        <section className="relative pt-32 pb-20 md:pb-28 bg-[#FFD84D] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(12,12,12,0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center">
              {/* Left — copy */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#0C0C0C] text-[#FFD84D] text-[11px] font-semibold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD84D]" aria-hidden="true" />
                  Free Resource · Stackd Studios AI
                </div>

                <h1 className="text-[clamp(40px,6.5vw,84px)] text-[#0C0C0C] leading-[0.95] mb-5 uppercase">
                  The AI toolkit we hand
                  <br />
                  every client on day one.
                </h1>

                <p className="text-[#0C0C0C] text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-medium">
                  30+ tools, organized by the work you actually need to get done.
                  The same shortlist our paying clients start with — yours free,
                  <strong> updated quarterly, yours forever.</strong>
                </p>

                {/* Trust bullets */}
                <ul className="flex flex-col gap-3 mb-8" role="list">
                  {[
                    'Organized by use case — not alphabetical noise',
                    'Free and low-cost tools only',
                    'Permanent access link — updates land automatically',
                  ].map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-[#0C0C0C] text-base font-medium"
                    >
                      <CheckPill />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — form */}
              <div>
                {showSuccess ? (
                  <SuccessCard message={status.message} variant={status.kind as 'created' | 'existing'} />
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="AI Toolkit opt-in"
                    className="bg-white border-2 border-[#0C0C0C] rounded-2xl p-7 md:p-8 flex flex-col gap-4 shadow-[0_8px_0_rgba(12,12,12,0.18)]"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <Image
                        src="/stackd-toolkit-logo.png"
                        alt=""
                        width={48}
                        height={48}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-[#0C0C0C] text-xs font-semibold uppercase tracking-[0.14em] mb-0.5">
                          Get your free access
                        </p>
                        <p className="text-2xl text-[#0C0C0C] font-[family-name:var(--font-anton)] uppercase leading-tight">
                          Send me the toolkit
                        </p>
                      </div>
                    </div>

                    <Field
                      id="first_name"
                      name="first_name"
                      label="First name"
                      placeholder="Jane"
                      value={firstName}
                      onChange={setFirstName}
                      autoComplete="given-name"
                      required
                    />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      label="Email address"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={setEmail}
                      autoComplete="email"
                      required
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] hover:text-[#0C0C0C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:scale-[1.01] min-h-[48px] border-2 border-[#0C0C0C]"
                    >
                      {isLoading ? 'Sending…' : 'Send me the toolkit →'}
                    </button>

                    {status.kind === 'error' && (
                      <p
                        role="alert"
                        className="text-[#B91C1C] text-sm font-medium m-0"
                      >
                        {status.message}
                      </p>
                    )}

                    <p className="text-[#3F3F3F] text-xs text-center mt-1 leading-relaxed">
                      No spam. One welcome email plus quarterly updates. Unsubscribe anytime.
                    </p>
                  <HoneypotField value={guard.hp} onChange={guard.setHp} />
</form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Reassurance / what you get — cream */}
        <section className="bg-[#F6F4EF] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#0C0C0C] text-xs font-semibold uppercase tracking-[0.16em] mb-4">
              // What lands in your inbox
            </p>
            <h2 className="text-[clamp(28px,4vw,48px)] text-[#0C0C0C] uppercase leading-[1.05] mb-10">
              One email. <span className="text-[#888580]">One permanent link.</span>
              <br />
              Quarterly updates after that.
            </h2>

            <div className="grid md:grid-cols-3 gap-5 text-left">
              {[
                {
                  step: '01',
                  title: 'Welcome email',
                  body: "Lands in seconds with your unique access link.",
                },
                {
                  step: '02',
                  title: 'Bookmark the link',
                  body: 'It never expires — every visit shows the latest toolkit.',
                },
                {
                  step: '03',
                  title: 'Quarterly refresh',
                  body: 'New tools added, weak ones removed. Your link reflects it instantly.',
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="bg-white border border-[#E2DED8] rounded-2xl p-6 relative"
                >
                  <div className="absolute -top-4 -left-2 bg-[#FFD84D] text-[#0C0C0C] font-[family-name:var(--font-anton)] uppercase text-xl px-3 py-1 rounded-md border border-[#0C0C0C]">
                    {s.step}
                  </div>
                  <h3 className="text-xl text-[#0C0C0C] mt-3 mb-2 uppercase leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[#3F3F3F] text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Field({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}: {
  id: string
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold text-[#0C0C0C] uppercase tracking-[0.12em] mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F6F4EF] border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] text-base outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors min-h-[48px]"
      />
    </div>
  )
}

function SuccessCard({
  message,
  variant,
}: {
  message: string
  variant: 'created' | 'existing'
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white border-2 border-[#0C0C0C] rounded-2xl p-7 md:p-8 shadow-[0_8px_0_rgba(12,12,12,0.18)]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full bg-[#FFD84D] border border-[#0C0C0C] flex items-center justify-center shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12.5L10 17.5L19 7.5"
              stroke="#0C0C0C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-3xl text-[#0C0C0C] uppercase font-[family-name:var(--font-anton)] leading-tight">
          {variant === 'existing' ? 'Welcome back' : "You're in"}
        </h2>
      </div>
      <p className="text-[#0C0C0C] text-base md:text-lg leading-relaxed">
        {message}
      </p>
      <p className="text-[#3F3F3F] text-xs mt-4">
        Didn&apos;t see it? Check spam — and add{' '}
        <strong>chanel@stackdstudiosai.com</strong> to your contacts.
      </p>
    </div>
  )
}

function CheckPill() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-6 h-6 rounded-full bg-[#0C0C0C] items-center justify-center shrink-0 mt-0.5"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12.5L10 17.5L19 7.5"
          stroke="#FFD84D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
