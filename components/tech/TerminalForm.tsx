'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { HoneypotField, useSpamGuard } from '@/components/HoneypotField'
import { submitIntake } from '@/app/actions/intake'
import { CONTACT_KINDS, KIND_CHOICES, KIND_STEP, STEPS, isKind, type IntakeKind, type Step } from './intake-steps'

/**
 * Other sections call this to open the form on a specific path. `prefill` fills answers ahead of
 * time (e.g. the role someone clicked Apply on); `anchor` is the id of the section holding the form.
 */
export function openIntake(kind?: IntakeKind, prefill: Record<string, string> = {}, anchor = 'contact') {
  window.dispatchEvent(new CustomEvent('stackd:intent', { detail: { kind, prefill } }))
  // Scroll after the form has re-rendered and taken focus; focusing mid-scroll cancels a smooth scroll.
  setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }), 60)
}

const ROUTE: Record<IntakeKind, string> = {
  build: 'Stackd Build',
  rescue: 'Stackd Rescue',
  talent: 'Stackd Talent',
  hire: 'Stackd Talent',
  learn: 'Stackd Learn',
  affiliate: 'the partner team',
  other: 'the Stackd team',
}

type Phase = 'asking' | 'review' | 'sending' | 'done'

function display(step: Step, v: string) {
  if (!v) return '(skipped)'
  return step.choices?.find((c) => c.value === v)?.label ?? v
}

export default function TerminalForm({
  kinds = CONTACT_KINDS,
  title = 'contact-form',
  intro = 'Contact form. Answer one question at a time.',
}: {
  /** Which request types the first question offers, in this order. */
  kinds?: IntakeKind[]
  title?: string
  intro?: string
}) {
  const guard = useSpamGuard()
  const [kind, setKind] = useState<IntakeKind | null>(null)
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [draft, setDraft] = useState('')
  const [cursor, setCursor] = useState(0)
  const [error, setError] = useState('')
  const [phase, setPhase] = useState<Phase>('asking')
  const [ref, setRef] = useState('')
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const choiceRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const reviewRef = useRef<HTMLButtonElement>(null)
  const resetRef = useRef<HTMLButtonElement>(null)

  const kindStep: Step = {
    ...KIND_STEP,
    choices: kinds.map((k) => KIND_CHOICES.find((c) => c.value === k)!),
  }
  const steps: Step[] = [kindStep, ...(kind ? STEPS[kind] : [])]
  const step = steps[index]

  const focusCurrent = useCallback(() => {
    const el = inputRef.current ?? choiceRef.current
    el?.focus({ preventScroll: true })
  }, [])

  // Keep the newest line in view and move focus before paint, so no keystroke is lost
  // between prompts. Never steal focus on first page load.
  useLayoutEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
    if (touched.current) {
      if (phase === 'review') reviewRef.current?.focus({ preventScroll: true })
      else if (phase === 'done') resetRef.current?.focus({ preventScroll: true })
      else focusCurrent()
    }
  }, [index, phase, focusCurrent])

  const start = useCallback(
    (k: IntakeKind, prefill: Record<string, string> = {}) => {
      touched.current = true
      setKind(k)
      setAnswers({ ...prefill, kind: k })
      setIndex(1)
      setDraft(prefill[STEPS[k][0].key] ?? '')
      setCursor(0)
      setError('')
      setPhase('asking')
    },
    [],
  )

  useEffect(() => {
    function onIntent(e: Event) {
      const { kind: k, prefill } = ((e as CustomEvent).detail ?? {}) as { kind?: unknown; prefill?: Record<string, string> }
      if (isKind(k)) start(k, prefill)
      else {
        touched.current = true
        focusCurrent()
      }
    }
    window.addEventListener('stackd:intent', onIntent)
    return () => window.removeEventListener('stackd:intent', onIntent)
  }, [start, focusCurrent])

  function advance(value: string) {
    touched.current = true
    setError('')
    if (step.key === 'kind') {
      if (isKind(value)) start(value)
      return
    }
    const v = value.trim()
    if (!v && !step.optional) return setError('This one is required.')
    if (v.length > step.max) return setError(`Keep it under ${step.max} characters.`)
    if (v && step.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return setError('That email does not look right.')
    if (v && step.type === 'url' && !/^https?:\/\/\S+\.\S+/i.test(v)) return setError('Use a full link starting with https://')
    const next = { ...answers, [step.key]: v }
    setAnswers(next)
    const nextStep = steps[index + 1]
    setDraft(nextStep ? next[nextStep.key] ?? '' : '')
    setCursor(0)
    if (index + 1 >= steps.length) setPhase('review')
    else setIndex(index + 1)
  }

  function back() {
    setError('')
    if (phase === 'review') {
      setPhase('asking')
      setDraft(answers[step.key] ?? '')
      return
    }
    if (index === 0) return
    const prev = steps[index - 1]
    setIndex(index - 1)
    setDraft(prev.key === 'kind' ? '' : answers[prev.key] ?? '')
    if (prev.key === 'kind') setKind(null)
  }

  async function send() {
    setPhase('sending')
    setError('')
    const res = await submitIntake({ ...answers, ...guard.fields() })
    if (res.ok) {
      setRef(res.ref)
      setPhase('done')
    } else {
      setError(res.error)
      setPhase('review')
    }
  }

  function reset() {
    guard.reset()
    setKind(null)
    setIndex(0)
    setAnswers({})
    setDraft('')
    setPhase('asking')
    setRef('')
  }

  function onChoiceKey(e: KeyboardEvent<HTMLDivElement>) {
    const list = step.choices ?? []
    const n = Number(e.key)
    if (n >= 1 && n <= list.length) {
      e.preventDefault()
      advance(list[n - 1].value)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % list.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + list.length) % list.length)
    } else if (e.key === 'Home' || e.key === 'End') {
      e.preventDefault()
      setCursor(e.key === 'Home' ? 0 : list.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      advance(list[cursor].value)
    } else if (e.key === 'Escape') back()
  }

  function onInputKey(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.key === 'Escape') return back()
    if (e.key !== 'Enter') return
    if (step.type === 'long' && !(e.metaKey || e.ctrlKey)) return
    e.preventDefault()
    advance(draft)
  }

  const answered = phase === 'asking' ? steps.slice(0, index) : steps
  const total = steps.length

  return (
    <div className="rounded-xl border border-[var(--t-line-hi)] bg-[#0A0C10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,216,77,0.06)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 px-4 h-10 border-b border-[var(--t-line)] bg-[var(--t-surface)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#2A303B]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--t-neon)]" />
        </div>
        <span className="font-mono-t text-[11px] tracking-[0.12em] text-[var(--t-dim)] truncate">{title}</span>
        <span className="font-mono-t text-[10px] uppercase tracking-[0.14em] text-[var(--t-muted)] shrink-0">
          {phase === 'done' ? 'sent' : kind ? `${Math.min(index + 1, total)}/${total}` : 'ready'}
        </span>
      </div>

      {/* Progress */}
      <div className="h-[2px] bg-[var(--t-line)]">
        <div
          className="h-full bg-[var(--t-neon)] shadow-[0_0_8px_var(--t-neon-glow)] transition-all duration-300"
          style={{ width: phase === 'done' ? '100%' : kind ? `${(Math.min(index, total) / total) * 100}%` : '0%' }}
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="font-mono-t text-[13px] leading-[1.7]"
        aria-label="Contact form"
      >
        <HoneypotField value={guard.hp} onChange={guard.setHp} />

        <div ref={bodyRef} className="p-4 sm:p-5 h-[440px] overflow-y-auto">
          <p className="text-[var(--t-dim)] mb-3">
            {intro} <span className="hidden sm:inline">Esc goes back.</span>
          </p>

          {/* History */}
          {answered.map((s) => (
            <div key={s.key} className="mb-1.5">
              <span className="text-[var(--t-cyan)]">? </span>
              <span className="text-[var(--t-muted)]">{s.prompt}</span>
              <span className="text-[var(--t-dim)]"> &rsaquo; </span>
              <span className={`break-words ${answers[s.key] ? 'text-[var(--t-text)]' : 'text-[var(--t-dim)]'}`}>
                {s.key === 'kind' ? KIND_CHOICES.find((c) => c.value === answers.kind)?.label : display(s, answers[s.key] ?? '')}
              </span>
            </div>
          ))}

          {/* Current prompt */}
          {phase === 'asking' && step && (
            <div className="mt-3">
              <label id={`intake-label-${step.key}`} htmlFor={`intake-${step.key}`} className="block mb-2">
                <span className="text-[var(--t-neon)]">? </span>
                <span className="text-[var(--t-text)] font-bold">{step.prompt}</span>
                {step.optional && <span className="text-[var(--t-dim)]"> (optional, Enter to skip)</span>}
              </label>

              {step.type === 'choice' ? (
                <div
                  ref={choiceRef}
                  id={`intake-${step.key}`}
                  role="listbox"
                  aria-labelledby={`intake-label-${step.key}`}
                  tabIndex={0}
                  onKeyDown={onChoiceKey}
                  aria-activedescendant={`opt-${step.key}-${cursor}`}
                  className="flex flex-col gap-0.5 outline-none rounded focus-visible:ring-1 focus-visible:ring-[var(--t-line-hi)]"
                >
                  {step.choices!.map((c, i) => (
                    <button
                      key={c.value}
                      id={`opt-${step.key}-${i}`}
                      type="button"
                      role="option"
                      aria-selected={i === cursor}
                      tabIndex={-1}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => advance(c.value)}
                      className={`text-left px-2 py-1 rounded transition-colors ${
                        i === cursor ? 'bg-[var(--t-raised)] text-[var(--t-neon)]' : 'text-[var(--t-muted)] hover:text-[var(--t-text)]'
                      }`}
                    >
                      <span className={i === cursor ? 'text-[var(--t-neon)]' : 'text-[var(--t-dim)]'}>{i === cursor ? '>' : ' '} [{i + 1}]</span> {c.label}
                    </button>
                  ))}
                </div>
              ) : step.type === 'long' ? (
                <textarea
                  ref={inputRef}
                  id={`intake-${step.key}`}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'intake-error' : undefined}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onInputKey}
                  maxLength={step.max}
                  rows={4}
                  placeholder={step.placeholder}
                  className="w-full bg-transparent border-l-2 border-[var(--t-neon)] pl-3 text-[var(--t-text)] placeholder:text-[var(--t-dim)] resize-none outline-none !shadow-none"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-[var(--t-neon)]" aria-hidden="true">&gt;</span>
                  <input
                    ref={inputRef}
                    id={`intake-${step.key}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'intake-error' : undefined}
                    type={step.type === 'email' ? 'email' : step.type === 'url' ? 'url' : 'text'}
                    autoComplete={step.key === 'name' ? 'name' : step.key === 'email' ? 'email' : 'off'}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={onInputKey}
                    maxLength={step.max}
                    placeholder={step.placeholder}
                    className="flex-1 min-w-0 bg-transparent text-[var(--t-text)] placeholder:text-[var(--t-dim)] caret-[var(--t-neon)] outline-none !shadow-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* Review */}
          {(phase === 'review' || phase === 'sending') && (
            <div className="mt-4 border-t border-dashed border-[var(--t-line-hi)] pt-4">
              <p className="text-[var(--t-neon)]">Ready to send to {kind ? ROUTE[kind] : 'Stackd'}.</p>
              <p className="text-[var(--t-dim)]">Check the answers above, then run it.</p>
            </div>
          )}

          {phase === 'sending' && <p className="mt-3 text-[var(--t-muted)]">sending<span className="t-cursor">...</span></p>}

          {/* Done */}
          {phase === 'done' && kind && (
            <div className="mt-4 border-t border-dashed border-[var(--t-line-hi)] pt-4">
              <p className="text-[var(--t-cyan)]">PASS  request packaged</p>
              <p className="text-[var(--t-cyan)]">PASS  routed to {ROUTE[kind]}</p>
              <p className="text-[var(--t-text)] mt-2">
                ref <span className="neon-text font-bold">{ref}</span>
              </p>
              <p className="text-[var(--t-muted)] mt-2 font-[family-name:var(--font-instrument-sans)] text-[15px]">
                Got it, {answers.name?.split(' ')[0]}. A real person reads every one of these, and we reply within one
                business day.
              </p>
            </div>
          )}

          <p id="intake-error" role="alert" aria-live="assertive" className="mt-3 text-[var(--t-red)] min-h-[1.5em]">
            {error && `ERR  ${error}`}
          </p>
        </div>

        {/* Controls (also the touch path) */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-[var(--t-line)] bg-[var(--t-surface)]">
          <button
            ref={resetRef}
            type="button"
            onClick={phase === 'done' ? reset : back}
            disabled={phase === 'sending' || (phase === 'asking' && index === 0)}
            className="text-[12px] uppercase tracking-[0.12em] text-[var(--t-muted)] hover:text-[var(--t-text)] disabled:opacity-30 px-2 py-2"
          >
            {phase === 'done' ? 'New request' : 'Back'}
          </button>
          <span className="hidden sm:block text-[11px] text-[var(--t-dim)]">
            {phase === 'asking' && step?.type === 'long' ? 'Ctrl + Enter to continue' : phase === 'asking' ? 'Enter to continue' : ''}
          </span>
          {phase === 'asking' && step?.type !== 'choice' && (
            <button
              type="button"
              onClick={() => advance(draft)}
              className="text-[12px] font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-4 py-2 rounded-md hover:shadow-[0_0_20px_rgba(255,216,77,0.5)]"
            >
              {step?.optional && !draft.trim() ? 'Skip' : 'Continue'}
            </button>
          )}
          {(phase === 'review' || phase === 'sending') && (
            <button
              ref={reviewRef}
              type="button"
              onClick={send}
              disabled={phase === 'sending'}
              className="text-[12px] font-bold uppercase tracking-[0.1em] bg-[var(--t-neon)] text-[#07080A] px-4 py-2 rounded-md hover:shadow-[0_0_20px_rgba(255,216,77,0.5)] disabled:opacity-60"
            >
              $ run
            </button>
          )}
          {phase === 'asking' && step?.type === 'choice' && <span className="w-[1px]" aria-hidden="true" />}
          {phase === 'done' && <span className="w-[1px]" aria-hidden="true" />}
        </div>
      </form>
    </div>
  )
}
