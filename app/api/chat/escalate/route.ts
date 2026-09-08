import { createServerClient } from '@/lib/supabase-server'
import { sendNewChatLeadEmail } from '@/lib/emails/chat-emails'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type ConversationMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(request: Request) {
  let body: { name?: unknown; email?: unknown; message?: unknown; page?: unknown; conversation?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const page = typeof body.page === 'string' ? body.page.trim().slice(0, 200) : ''
  const conversation = sanitizeConversation(body.conversation)

  if (!name || name.length > 80) {
    return Response.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: 'Please enter a valid email.' }, { status: 400 })
  }
  if (!message || message.length > 4000) {
    return Response.json({ error: 'Please enter a message (max 4000 chars).' }, { status: 400 })
  }

  // Try to persist the lead, but don't let a missing/misconfigured DB lose it —
  // the email below is the real delivery guarantee. Apply docs/chat-supabase-schema.sql
  // to enable persistence (the chat_leads table).
  let savedToDb = false
  const supabase = createServerClient()
  if (supabase) {
    const { error: insertError } = await supabase.from('chat_leads').insert({
      name,
      email,
      message,
      page,
      conversation,
    })
    if (insertError) {
      console.error('[chat/escalate] insert error (will still try email)', insertError)
    } else {
      savedToDb = true
    }
  } else {
    console.warn('[chat/escalate] supabase not configured — relying on email delivery')
  }

  let emailed = false
  try {
    await sendNewChatLeadEmail({ name, email, message, page, conversation })
    emailed = true
  } catch (e) {
    console.error('[chat/escalate] email failed', e)
  }

  // Only fail if the lead reached neither the database nor the inbox.
  if (!savedToDb && !emailed) {
    return Response.json({ error: 'Could not save your message. Please try again.' }, { status: 500 })
  }

  return Response.json({
    status: savedToDb ? 'sent' : 'emailed',
    message: "Got it — we'll be in touch within 24 hours.",
  })
}

function sanitizeConversation(raw: unknown): ConversationMessage[] {
  if (!Array.isArray(raw)) return []
  const out: ConversationMessage[] = []
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue
    const role = (m as { role?: unknown }).role
    const content = (m as { content?: unknown }).content
    if ((role === 'user' || role === 'assistant') && typeof content === 'string') {
      out.push({ role, content: content.slice(0, 4000) })
    }
  }
  return out.slice(-30)
}
