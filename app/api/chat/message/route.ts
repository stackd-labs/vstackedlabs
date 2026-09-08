import Anthropic from '@anthropic-ai/sdk'
import { ESCALATE_TOKEN, SYSTEM_PROMPT } from '@/lib/chatbot/system-prompt'
import { checkAndIncrementRateLimit, getClientIp } from '@/lib/chatbot/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ClientMessage = { role: 'user' | 'assistant'; content: string }

const MAX_HISTORY_MESSAGES = 20
const MAX_USER_MESSAGE_LENGTH = 2000

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

export async function POST(request: Request) {
  if (!anthropic) {
    return Response.json(
      { error: 'Chat is not configured. Set ANTHROPIC_API_KEY.' },
      { status: 503 }
    )
  }

  let body: { messages?: unknown; page?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return Response.json({ error: 'No messages provided.' }, { status: 400 })
  }

  const messages = sanitizeHistory(body.messages)
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'Last message must be from the user.' }, { status: 400 })
  }
  const lastUser = messages[messages.length - 1]
  if (lastUser.content.length > MAX_USER_MESSAGE_LENGTH) {
    return Response.json(
      { error: `Message too long (max ${MAX_USER_MESSAGE_LENGTH} chars).` },
      { status: 400 }
    )
  }

  const ip = getClientIp(request)
  const limit = await checkAndIncrementRateLimit(ip)
  if (!limit.ok) {
    if (limit.reason === 'config_error') {
      // The rate-limit backend is unavailable (e.g. the chat_rate_limits table
      // hasn't been created, or Supabase is misconfigured). Don't take the
      // whole chatbot offline over it — fail OPEN and answer anyway. Per-call
      // cost is bounded (Haiku, 800 max tokens). Apply docs/chat-supabase-schema.sql
      // to restore real rate limiting.
      console.warn(
        '[chat/message] rate limiter unavailable (config_error) — proceeding without limit'
      )
    } else {
      // ip_exceeded or global_exceeded → trigger escalation form on the client.
      return Response.json(
        {
          message:
            "We've reached our daily chat capacity. Drop your details below and we'll follow up directly.",
          escalate: true,
          reason: limit.reason,
        },
        { status: 200 }
      )
    }
  }

  // Inject page context into the latest user message (NOT the system prompt
  // — keeps the cached prefix identical across all pages).
  const page = typeof body.page === 'string' ? body.page.slice(0, 200) : ''
  const apiMessages = messages.map((m, idx) => {
    if (idx === messages.length - 1 && m.role === 'user' && page) {
      return {
        role: 'user' as const,
        content: `[Visitor is currently on: ${page}]\n\n${m.content}`,
      }
    }
    return { role: m.role, content: m.content }
  })

  try {
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 800,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: apiMessages,
    })

    const rawText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim()

    const escalate = rawText.includes(ESCALATE_TOKEN)
    const cleanText = escalate
      ? rawText.replace(new RegExp(escapeRegex(ESCALATE_TOKEN), 'g'), '').trim()
      : rawText

    return Response.json({
      message: cleanText || (escalate ? "Let me grab a team member for you." : ''),
      escalate,
    })
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) {
      return Response.json(
        { message: "I'm catching my breath — try again in a moment.", escalate: false },
        { status: 200 }
      )
    }
    if (e instanceof Anthropic.APIError) {
      console.error('[chat/message] anthropic error', e.status, e.message)
      return Response.json(
        {
          message:
            "I hit a snag answering that. Drop your details below and we'll follow up directly.",
          escalate: true,
        },
        { status: 200 }
      )
    }
    console.error('[chat/message] unexpected error', e)
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

function sanitizeHistory(raw: unknown[]): ClientMessage[] {
  const out: ClientMessage[] = []
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue
    const role = (m as { role?: unknown }).role
    const content = (m as { content?: unknown }).content
    if ((role === 'user' || role === 'assistant') && typeof content === 'string') {
      const trimmed = content.trim()
      if (trimmed.length > 0) {
        out.push({ role, content: trimmed.slice(0, MAX_USER_MESSAGE_LENGTH) })
      }
    }
  }
  // Keep only the most recent N (preserves the ordering, drops oldest)
  return out.slice(-MAX_HISTORY_MESSAGES)
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
