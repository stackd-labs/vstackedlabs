'use client'

import Icon from '@/components/Icon'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DemoFrame from '@/components/lab/DemoFrame'
import {
  categories,
  getPromptsByCategory,
  prompts,
  type AssistantCategory,
  type AssistantPrompt,
} from '@/lib/demos/ai-assistant-data'

type ChatTurn = {
  id: string
  role: 'user' | 'assistant'
  text: string
  isTyping?: boolean
}

const TYPE_CHAR_MS = 6
const THINK_MS = 500

export default function AiAssistantDemo() {
  const [activeCategory, setActiveCategory] = useState<AssistantCategory>('marketing')
  const [usedPromptIds, setUsedPromptIds] = useState<Set<string>>(new Set())
  const [turns, setTurns] = useState<ChatTurn[]>([])
  const [busy, setBusy] = useState(false)
  const generationRef = useRef(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const currentPrompts = getPromptsByCategory(activeCategory)

  // Scroll chat to bottom on new turn / typing tick
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [turns])

  async function handlePromptClick(prompt: AssistantPrompt) {
    if (busy) return

    setUsedPromptIds((prev) => new Set(prev).add(prompt.id))

    // 1. User turn
    const userTurn: ChatTurn = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: prompt.fullPrompt,
    }
    setTurns((prev) => [...prev, userTurn])

    // 2. Assistant typewriter
    const botId = `a-${Date.now()}`
    setTurns((prev) => [...prev, { id: botId, role: 'assistant', text: '', isTyping: true }])
    setBusy(true)

    const myGen = ++generationRef.current
    await delay(THINK_MS)
    if (generationRef.current !== myGen) return

    for (let i = 1; i <= prompt.response.length; i++) {
      if (generationRef.current !== myGen) return
      setTurns((prev) =>
        prev.map((t) => (t.id === botId ? { ...t, text: prompt.response.slice(0, i) } : t))
      )
      await delay(TYPE_CHAR_MS)
    }

    if (generationRef.current !== myGen) return
    setTurns((prev) => prev.map((t) => (t.id === botId ? { ...t, isTyping: false } : t)))
    setBusy(false)
  }

  function handleReset() {
    generationRef.current += 1
    setBusy(false)
    setTurns([])
    setUsedPromptIds(new Set())
  }

  return (
    <DemoFrame label="lab.stackdstudiosai.com/ai-assistant">
      <div className="grid lg:grid-cols-[280px_1fr] min-h-[600px]">
        {/* Sidebar — categories + prompts */}
        <aside className="border-b lg:border-b-0 lg:border-r border-[#E2DED8] bg-[#FAF8F2] flex flex-col">
          <div className="px-4 py-4 border-b border-[#E2DED8]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#888580] font-semibold">
              Prompt library
            </p>
            <p className="text-xs text-[#3A3A38] mt-1">{prompts.length} pre-built prompts · click any</p>
          </div>

          {/* Category tabs */}
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-px bg-[#E2DED8] border-b border-[#E2DED8]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#0C0C0C] text-white'
                    : 'bg-white text-[#0C0C0C] hover:bg-[#FFF8DD]'
                }`}
              >
                <Icon name={cat.icon} size={15} strokeWidth={1.9} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Prompts for active category */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 max-h-[280px] lg:max-h-none">
            {currentPrompts.map((prompt) => {
              const used = usedPromptIds.has(prompt.id)
              return (
                <button
                  key={prompt.id}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  disabled={busy}
                  className={`text-left text-[13px] leading-snug px-3 py-2.5 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    used
                      ? 'bg-white border-[#E2DED8] text-[#888580]'
                      : 'bg-white border-[#E2DED8] text-[#0C0C0C] hover:bg-[#FFD84D] hover:border-[#0C0C0C]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {used ? (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#0C0C0C] shrink-0 mt-0.5" aria-label="Used">
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12.5L10 17.5L19 7.5" stroke="#FFD84D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#E2DED8] shrink-0 mt-0.5" aria-hidden="true">
                        <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <span>{prompt.label}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {turns.length > 0 && (
            <div className="px-3 py-3 border-t border-[#E2DED8] bg-white">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#888580] hover:text-[#0C0C0C] underline-offset-4 hover:underline transition-colors"
              >
                ↻ Clear conversation
              </button>
            </div>
          )}
        </aside>

        {/* Chat panel */}
        <div className="bg-white flex flex-col">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2DED8] bg-[#FAF8F2]">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#0C0C0C] text-[#FFD84D] text-xs font-[family-name:var(--font-anton)]">
              S
            </span>
            <div>
              <p className="text-sm font-semibold text-[#0C0C0C] leading-tight">Stackd Assistant</p>
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#888580] leading-tight">
                Demo · canned outputs
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 max-h-[480px] lg:max-h-[540px]">
            {turns.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-4">
                <AnimatePresence initial={false}>
                  {turns.map((turn) => (
                    <motion.div
                      key={turn.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <ChatBubble turn={turn} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-[#E2DED8] bg-[#FAF8F2] text-center">
            <p className="text-[11px] text-[#888580]">
              Mock AI · zero API calls · in production these run on Claude Haiku in &lt; 2 sec
            </p>
          </div>
        </div>
      </div>
    </DemoFrame>
  )
}

function EmptyState() {
  return (
    <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center px-6">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFD84D] text-[#0C0C0C] text-2xl mb-4" aria-hidden="true">
        ←
      </div>
      <p className="font-[family-name:var(--font-anton)] text-2xl text-[#0C0C0C] uppercase mb-2">
        Pick a prompt
      </p>
      <p className="text-sm text-[#888580] max-w-sm leading-relaxed">
        Click any prompt from the sidebar to see the assistant draft it for you. Try a few — they
        stack into a conversation.
      </p>
    </div>
  )
}

function ChatBubble({ turn }: { turn: ChatTurn }) {
  const isUser = turn.role === 'user'
  return (
    <div
      className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
        isUser
          ? 'bg-[#0C0C0C] text-white'
          : 'bg-[#FAF8F2] border border-[#E2DED8] text-[#0C0C0C]'
      }`}
    >
      <p className="whitespace-pre-wrap m-0">
        {turn.text}
        {turn.isTyping && turn.text.length === 0 && <TypingDots />}
        {turn.isTyping && turn.text.length > 0 && (
          <span className="inline-block w-0.5 h-3.5 ml-0.5 bg-[#0C0C0C] animate-pulse align-middle" aria-hidden="true" />
        )}
      </p>
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
