'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Role = 'user' | 'assistant'
type Message = {
  id: string
  role: Role
  text: string
  isTyping?: boolean
  escalate?: boolean
}

type Status =
  | { kind: 'chat' }
  | { kind: 'escalating' }
  | { kind: 'escalation_sent' }

const STORAGE_KEY = 'stackd_chat_history_v1'
const TYPE_CHAR_MS = 8
const MAX_HISTORY = 20

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const GREETING =
  "Hey — I'm the Stackd assistant. Ask me anything about Stackd Studios AI: services, pricing, how we work, industries, the lab. If I can't help, I'll grab a real person."

const ROUTE_CHIPS: Array<{ match: RegExp; label: string; chips: string[] }> = [
  {
    match: /^\/pricing/,
    label: 'On pricing',
    chips: [
      'How much does a Build Sprint cost?',
      "What's included in the Systems Audit?",
      'Do you offer a monthly retainer?',
    ],
  },
  {
    match: /^\/services/,
    label: 'On services',
    chips: [
      "What's your fastest service?",
      'Do you offer team training?',
      'Whats the difference between Quick Setup and the Retainer?',
    ],
  },
  {
    match: /^\/industries/,
    label: 'On industries',
    chips: [
      'Do you work with behavioral health practices?',
      'What can AI do for a dance studio?',
      'My industry isnt listed — can you help?',
    ],
  },
  {
    match: /^\/business-brain/,
    label: 'On Business Brain',
    chips: [
      'How does Business Brain work?',
      'What does the Pro tier include?',
      'Can I use this for a restaurant?',
    ],
  },
  {
    match: /^\/about/,
    label: 'On about',
    chips: [
      "Who's behind Stackd Studios AI?",
      'What tech stack do you use?',
      'Why Claude over ChatGPT?',
    ],
  },
  {
    match: /^\/lab/,
    label: 'On the Demo Lab',
    chips: [
      'Whats inside the Demo Lab?',
      'How do I get access?',
      'Can you build something like the Smart Intake demo for me?',
    ],
  },
  {
    match: /^\/careers/,
    label: 'On careers',
    chips: [
      'What roles are open?',
      'Are roles remote?',
      'How do I apply?',
    ],
  },
]

const DEFAULT_CHIPS = [
  'What does Stackd Studios AI do?',
  'How much do you charge?',
  'How do I get started?',
]

function getChipsForPath(pathname: string): { label: string; chips: string[] } {
  for (const route of ROUTE_CHIPS) {
    if (route.match.test(pathname)) return { label: route.label, chips: route.chips }
  }
  return { label: 'Try one', chips: DEFAULT_CHIPS }
}

export default function GlobalChatbot() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const [hasNewBadge, setHasNewBadge] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', role: 'assistant', text: GREETING },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'chat' })
  const [escalationName, setEscalationName] = useState('')
  const [escalationEmail, setEscalationEmail] = useState('')
  const [escalationMessage, setEscalationMessage] = useState('')
  const [escalationError, setEscalationError] = useState('')
  const [escalationSubmitting, setEscalationSubmitting] = useState(false)
  const generationRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Load persisted conversation on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Message[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(parsed)
      }
    } catch {
      // ignore corrupted storage
    }
  }, [])

  // Persist on every change
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)))
    } catch {
      // ignore quota errors
    }
  }, [messages])

  // Scroll to bottom on new message or typing tick
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const { label: chipLabel, chips } = getChipsForPath(pathname)
  const hasUserMessages = messages.some((m) => m.role === 'user')

  function handleOpen() {
    setOpen(true)
    setHasNewBadge(false)
  }

  function handleClose() {
    setOpen(false)
    generationRef.current += 1
    setBusy(false)
  }

  function handleResetConversation() {
    generationRef.current += 1
    setBusy(false)
    setMessages([{ id: 'greeting', role: 'assistant', text: GREETING }])
    setStatus({ kind: 'chat' })
    setEscalationName('')
    setEscalationEmail('')
    setEscalationMessage('')
    setEscalationError('')
    if (typeof window !== 'undefined') sessionStorage.removeItem(STORAGE_KEY)
  }

  async function sendMessage(text: string) {
    if (busy) return
    const trimmed = text.trim()
    if (!trimmed) return

    const userId = `user-${Date.now()}`
    const userMessage: Message = { id: userId, role: 'user', text: trimmed }
    const conversationForApi: Array<{ role: Role; content: string }> = [
      ...messages
        .filter((m) => m.id !== 'greeting' && !m.isTyping)
        .map((m) => ({ role: m.role, content: m.text })),
      { role: 'user', content: trimmed },
    ]

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setBusy(true)

    const botId = `bot-${Date.now()}`
    setMessages((prev) => [...prev, { id: botId, role: 'assistant', text: '', isTyping: true }])

    const myGen = ++generationRef.current

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationForApi, page: pathname }),
      })
      const data = await res.json().catch(() => ({}))

      if (generationRef.current !== myGen) return

      const replyText: string = typeof data?.message === 'string' ? data.message : ''
      const escalate: boolean = Boolean(data?.escalate)

      if (!res.ok && !replyText) {
        await typeBotReply(
          botId,
          myGen,
          data?.error ?? 'Something went wrong. Try again or use the form below.',
          true
        )
        setEscalationMessage(trimmed)
        setStatus({ kind: 'escalating' })
        return
      }

      await typeBotReply(botId, myGen, replyText || "Let me grab a team member for you.", escalate)

      if (escalate) {
        setEscalationMessage(trimmed)
        setStatus({ kind: 'escalating' })
      }
    } catch {
      if (generationRef.current !== myGen) return
      await typeBotReply(
        botId,
        myGen,
        "I couldn't reach the network. Drop your details below and we'll follow up.",
        true
      )
      setEscalationMessage(trimmed)
      setStatus({ kind: 'escalating' })
    }
  }

  async function typeBotReply(
    botId: string,
    myGen: number,
    fullText: string,
    escalate: boolean
  ): Promise<void> {
    for (let i = 1; i <= fullText.length; i++) {
      if (generationRef.current !== myGen) return
      setMessages((prev) =>
        prev.map((m) => (m.id === botId ? { ...m, text: fullText.slice(0, i) } : m))
      )
      await delay(TYPE_CHAR_MS)
    }
    if (generationRef.current !== myGen) return
    setMessages((prev) =>
      prev.map((m) => (m.id === botId ? { ...m, isTyping: false, escalate } : m))
    )
    setBusy(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await sendMessage(input)
  }

  async function handleEscalationSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (escalationSubmitting) return
    setEscalationError('')

    const name = escalationName.trim()
    const email = escalationEmail.trim()
    const message = escalationMessage.trim()

    if (!name) return setEscalationError('Please enter your name.')
    if (!EMAIL_RE.test(email)) return setEscalationError('Please enter a valid email.')
    if (!message) return setEscalationError('Please enter a message.')

    setEscalationSubmitting(true)
    try {
      const conversation = messages
        .filter((m) => m.id !== 'greeting' && !m.isTyping)
        .map((m) => ({ role: m.role, content: m.text }))

      const res = await fetch('/api/chat/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, page: pathname, conversation }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setEscalationError(data?.error ?? 'Something went wrong. Try again.')
        setEscalationSubmitting(false)
        return
      }

      setStatus({ kind: 'escalation_sent' })
      setEscalationSubmitting(false)
    } catch {
      setEscalationError('Network error. Try again.')
      setEscalationSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating bubble */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open Stackd assistant"
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-2.5 transition-all duration-300 ${
          open ? 'pointer-events-none opacity-0 scale-90' : 'opacity-100 scale-100'
        }`}
      >
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-white border border-[#E2DED8] text-[#0C0C0C] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm group-hover:border-[#0C0C0C] transition-colors">
          Ask the Stackd assistant
        </span>
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0C0C0C] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group-hover:bg-[#FFD84D] group-hover:text-[#0C0C0C] transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {hasNewBadge && (
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-[#FFD84D] border-2 border-[#0C0C0C]" aria-hidden="true" />
          )}
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed inset-x-0 bottom-0 sm:inset-auto sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Stackd assistant"
        aria-hidden={!open}
      >
        <div className="mx-auto sm:mx-0 w-full sm:w-[400px] max-h-[85vh] sm:max-h-[640px] flex flex-col bg-white border border-[#0C0C0C] sm:rounded-2xl rounded-t-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0C0C0C] text-white">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FFD84D] text-[#0C0C0C] shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#0C0C0C]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight truncate">Stackd assistant</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/55 leading-tight">
                  {chipLabel}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {hasUserMessages && (
                <button
                  type="button"
                  onClick={handleResetConversation}
                  aria-label="Start a new conversation"
                  title="New conversation"
                  className="text-white/55 hover:text-white p-1 -m-1 rounded transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 10a7 7 0 0 1 12-4.95M17 10a7 7 0 0 1-12 4.95M15 2v4h-4M5 18v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close assistant"
                className="text-white/60 hover:text-white p-1 -m-1 rounded transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 bg-[#FAF8F2] flex flex-col gap-3"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>

          {/* Inline escalation form */}
          {status.kind === 'escalating' && (
            <form
              onSubmit={handleEscalationSubmit}
              className="px-4 py-3 border-t border-[#E2DED8] bg-white flex flex-col gap-2.5"
              aria-label="Contact form"
            >
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#888580] font-semibold">
                Connect with a real person
              </p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={escalationName}
                  onChange={(e) => setEscalationName(e.target.value)}
                  autoComplete="given-name"
                  className="bg-[#F6F4EF] border border-[#E2DED8] rounded-lg px-3 py-2 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={escalationEmail}
                  onChange={(e) => setEscalationEmail(e.target.value)}
                  autoComplete="email"
                  className="bg-[#F6F4EF] border border-[#E2DED8] rounded-lg px-3 py-2 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors"
                />
              </div>
              <textarea
                required
                rows={3}
                value={escalationMessage}
                onChange={(e) => setEscalationMessage(e.target.value)}
                placeholder="What can we help with?"
                className="bg-[#F6F4EF] border border-[#E2DED8] rounded-lg px-3 py-2 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors resize-y min-h-[64px]"
              />
              {escalationError && (
                <p role="alert" className="text-[#B91C1C] text-xs m-0">
                  {escalationError}
                </p>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={escalationSubmitting}
                  className="flex-1 inline-flex items-center justify-center bg-[#0C0C0C] hover:bg-[#FFD84D] hover:text-[#0C0C0C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  {escalationSubmitting ? 'Sending…' : 'Send to the team →'}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus({ kind: 'chat' })}
                  className="text-xs text-[#888580] hover:text-[#0C0C0C] underline-offset-4 hover:underline"
                >
                  Keep chatting
                </button>
              </div>
            </form>
          )}

          {/* Escalation success */}
          {status.kind === 'escalation_sent' && (
            <div className="px-4 py-4 border-t border-[#E2DED8] bg-[#FFF8DD]">
              <p className="text-sm font-semibold text-[#0C0C0C] mb-1">
                Got it — we&apos;ll be in touch within 24 hours.
              </p>
              <p className="text-xs text-[#3F3F3F]">
                Reply to the email when it lands and we&apos;ll take it from there.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleResetConversation()
                  setStatus({ kind: 'chat' })
                }}
                className="mt-3 text-xs font-semibold text-[#0C0C0C] underline underline-offset-4 hover:text-[#888580]"
              >
                Start a new conversation
              </button>
            </div>
          )}

          {/* Chips + input */}
          {status.kind === 'chat' && (
            <>
              {!hasUserMessages && !busy && (
                <div className="px-4 pt-3 pb-2 border-t border-[#E2DED8] bg-white">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#888580] font-semibold mb-2">
                    Try one
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {chips.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="text-left text-[13px] text-[#0C0C0C] bg-[#F6F4EF] hover:bg-[#FFD84D] border border-[#E2DED8] hover:border-[#0C0C0C] px-3 py-2 rounded-lg transition-colors leading-snug"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[#E2DED8] bg-white flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={busy}
                  placeholder={busy ? 'Thinking…' : 'Ask anything…'}
                  aria-label="Your message"
                  className="flex-1 bg-[#F6F4EF] border border-[#E2DED8] rounded-full px-4 py-2.5 text-sm text-[#0C0C0C] placeholder:text-[#888580] outline-none focus:border-[#0C0C0C] focus:bg-white transition-colors disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send message"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0C0C0C] hover:bg-[#FFD84D] hover:text-[#0C0C0C] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </>
          )}

          <p className="text-[10px] text-[#888580] text-center px-4 pb-2 leading-snug">
            Answers grounded in our website only · for anything beyond, we&apos;ll connect you with the team
          </p>
        </div>
      </div>
    </>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isBot = message.role === 'assistant'
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
          isBot
            ? 'bg-white border border-[#E2DED8] text-[#0C0C0C]'
            : 'bg-[#0C0C0C] text-white'
        }`}
      >
        <p className="whitespace-pre-wrap m-0">
          {message.text}
          {message.isTyping && message.text.length === 0 && <TypingDots />}
          {message.isTyping && message.text.length > 0 && (
            <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-[#0C0C0C] animate-pulse align-middle" aria-hidden="true" />
          )}
        </p>
        {isBot && message.escalate && !message.isTyping && (
          <p className="mt-2 text-[11px] text-[#888580] italic m-0">
            Use the form below or email{' '}
            <Link href="/contact" className="underline hover:text-[#0C0C0C] not-italic font-medium">
              chanel@stackdstudiosai.com
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Assistant typing">
      <span className="w-1.5 h-1.5 rounded-full bg-[#888580] animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-[#888580] animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-[#888580] animate-bounce" style={{ animationDelay: '300ms' }} />
    </span>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
