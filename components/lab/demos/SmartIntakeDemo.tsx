'use client'

import Icon from '@/components/Icon'
import { useEffect, useRef, useState } from 'react'
import DemoFrame from '@/components/lab/DemoFrame'
import {
  fallbackParse,
  findSampleByText,
  samplePrompts,
  type ParsedFields,
} from '@/lib/demos/smart-intake-data'

type FieldKey = keyof ParsedFields

const FIELD_ORDER: FieldKey[] = ['contactName', 'intent', 'urgency', 'details', 'nextStep']

const FIELD_META: Record<FieldKey, { label: string; icon: React.ReactNode }> = {
  contactName: { label: 'Contact', icon: <UserIcon /> },
  intent: { label: 'What they need', icon: <TargetIcon /> },
  urgency: { label: 'Timeline', icon: <ClockIcon /> },
  details: { label: 'Key details', icon: <NotesIcon /> },
  nextStep: { label: 'Suggested next step', icon: <SparkleIcon /> },
}

const EMPTY_FIELDS: ParsedFields = {
  contactName: '',
  intent: '',
  urgency: '',
  details: '',
  nextStep: '',
}

const CHAR_DELAY_MS = 14
const FIELD_GAP_MS = 180
const THINKING_MS = 700

export default function SmartIntakeDemo() {
  const [text, setText] = useState('')
  const [fields, setFields] = useState<ParsedFields>(EMPTY_FIELDS)
  const [parsing, setParsing] = useState(false)
  const [activeField, setActiveField] = useState<FieldKey | null>(null)
  const [completed, setCompleted] = useState(false)
  const [elapsedMs, setElapsedMs] = useState<number | null>(null)
  // Generation counter — every parse run bumps this; in-flight typing aborts
  // if it sees a different generation, so reset/re-parse mid-typing is clean.
  const generationRef = useRef(0)

  function handleSelectSample(text: string) {
    if (parsing) return
    setText(text)
    setFields(EMPTY_FIELDS)
    setCompleted(false)
    setElapsedMs(null)
  }

  function handleReset() {
    generationRef.current += 1
    setParsing(false)
    setActiveField(null)
    setText('')
    setFields(EMPTY_FIELDS)
    setCompleted(false)
    setElapsedMs(null)
  }

  async function handleParse() {
    if (!text.trim() || parsing) return

    const myGeneration = ++generationRef.current
    setParsing(true)
    setCompleted(false)
    setElapsedMs(null)
    setFields(EMPTY_FIELDS)

    const sample = findSampleByText(text)
    const parsed = sample ? sample.parsed : fallbackParse(text)
    const startedAt = performance.now()

    // Brief "thinking" pause so the user feels the AI process
    await delay(THINKING_MS)
    if (generationRef.current !== myGeneration) return

    for (const key of FIELD_ORDER) {
      if (generationRef.current !== myGeneration) return
      setActiveField(key)
      await typeIntoField(key, parsed[key], () => generationRef.current === myGeneration, (val) =>
        setFields((prev) => ({ ...prev, [key]: val }))
      )
      if (generationRef.current !== myGeneration) return
      await delay(FIELD_GAP_MS)
    }

    setActiveField(null)
    setParsing(false)
    setCompleted(true)
    setElapsedMs(Math.round(performance.now() - startedAt))
  }

  // Reset on unmount so any in-flight typing aborts cleanly
  useEffect(() => {
    return () => {
      generationRef.current += 1
    }
  }, [])

  return (
    <DemoFrame label="lab.stackdstudiosai.com/smart-intake">
      <div className="grid lg:grid-cols-2">
        {/* Left — input */}
        <div className="p-5 sm:p-6 lg:border-r border-[#E2DED8] bg-white">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-[family-name:var(--font-anton)] text-lg uppercase text-[#0C0C0C]">
              Customer message
            </h3>
            {text && !parsing && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#888580] hover:text-[#0C0C0C] underline-offset-4 hover:underline transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sample chips */}
          <div className="mb-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#888580] font-semibold mb-2">
              Try a sample
            </p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={parsing}
                  onClick={() => handleSelectSample(s.text)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-[#E2DED8] bg-[#F6F4EF] text-[#0C0C0C] hover:bg-[#FFD84D] hover:border-[#0C0C0C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Icon name={s.icon} size={15} strokeWidth={1.9} />
                  {s.chipLabel}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              if (parsing) return
              setText(e.target.value)
              if (completed) {
                setCompleted(false)
                setFields(EMPTY_FIELDS)
                setElapsedMs(null)
              }
            }}
            disabled={parsing}
            rows={8}
            placeholder="Or paste your own — try a customer email, a voicemail transcript, a contact form submission…"
            className="w-full bg-[#F6F4EF] border border-[#E2DED8] rounded-xl px-4 py-3 text-[#0C0C0C] placeholder:text-[#888580] text-[15px] leading-relaxed outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors resize-y min-h-[180px] disabled:opacity-70 disabled:cursor-not-allowed"
          />

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={handleParse}
              disabled={!text.trim() || parsing}
              className="inline-flex items-center gap-2 bg-[#0C0C0C] hover:bg-[#FFD84D] hover:text-[#0C0C0C] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
            >
              {parsing ? (
                <>
                  <Spinner /> Parsing…
                </>
              ) : completed ? (
                <>Re-parse</>
              ) : (
                <>Parse with AI →</>
              )}
            </button>
            <span className="text-xs text-[#888580]">
              {text.length > 0 ? `${text.length} chars` : 'Mock AI · Zero API calls'}
            </span>
          </div>
        </div>

        {/* Right — output */}
        <div className="p-5 sm:p-6 bg-[#FAF8F2]">
          <div className="flex items-baseline justify-between mb-5">
            <h3 className="font-[family-name:var(--font-anton)] text-lg uppercase text-[#0C0C0C]">
              Structured output
            </h3>
            {elapsedMs !== null && (
              <span className="text-[11px] text-[#888580] font-mono">
                Parsed in {(elapsedMs / 1000).toFixed(1)}s
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {FIELD_ORDER.map((key) => (
              <FieldRow
                key={key}
                label={FIELD_META[key].label}
                icon={FIELD_META[key].icon}
                value={fields[key]}
                isActive={activeField === key}
                isFilled={fields[key].length > 0 && activeField !== key}
              />
            ))}
          </div>

          {!parsing && !completed && (
            <p className="mt-5 text-xs text-[#888580] italic">
              Pick a sample (or paste your own) and hit{' '}
              <span className="font-semibold not-italic text-[#0C0C0C]">Parse with AI</span> to
              watch fields populate.
            </p>
          )}
        </div>
      </div>
    </DemoFrame>
  )
}

function FieldRow({
  label,
  icon,
  value,
  isActive,
  isFilled,
}: {
  label: string
  icon: React.ReactNode
  value: string
  isActive: boolean
  isFilled: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 transition-colors ${
        isActive
          ? 'border-[#FFD84D] bg-white shadow-[0_0_0_3px_rgba(255,216,77,0.15)]'
          : isFilled
            ? 'border-[#E2DED8] bg-white'
            : 'border-[#E2DED8] bg-white/60'
      }`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-4 h-4 text-[#888580]" aria-hidden="true">
          {icon}
        </span>
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#888580] font-semibold">
          {label}
        </span>
        {isFilled && (
          <span className="ml-auto inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#0C0C0C]" aria-label="Filled">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5L10 17.5L19 7.5" stroke="#FFD84D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
      <p
        className={`text-[14px] leading-snug ${
          value ? 'text-[#0C0C0C]' : 'text-[#C4C0BA] italic'
        }`}
      >
        {value || 'Waiting…'}
        {isActive && <span className="inline-block w-0.5 h-4 ml-0.5 bg-[#0C0C0C] animate-pulse align-middle" aria-hidden="true" />}
      </p>
    </div>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function typeIntoField(
  _key: FieldKey,
  target: string,
  isAlive: () => boolean,
  setValue: (v: string) => void
): Promise<void> {
  for (let i = 1; i <= target.length; i++) {
    if (!isAlive()) return
    setValue(target.slice(0, i))
    await delay(CHAR_DELAY_MS)
  }
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
    </svg>
  )
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}
function NotesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h14v16H5z" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  )
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="M19 17l.6 1.7L21 19.5l-1.4.8L19 22l-.6-1.7L17 19.5l1.4-.8L19 17z" />
    </svg>
  )
}
