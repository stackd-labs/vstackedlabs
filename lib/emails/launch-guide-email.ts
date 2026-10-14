import { Resend } from 'resend'
import { DISCORD_URL } from '@/components/tech/data'

const FROM = 'Stackd Studios AI <chanel@stackdstudiosai.com>'
// Dark version of the signature logo (white S top and letters, yellow chevrons) so it sits on the
// dark email instead of a white box. Always the live site's copy: email clients need a public URL.
const SIGNATURE_LOGO = 'https://www.stackdstudiosai.com/logo.png'

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.stackdstudiosai.com').replace(/\/$/, '')
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

/** Thank-you email with the guide link. Throws if Resend is not configured or rejects the send. */
export async function sendLaunchGuideEmail({ email, name, token }: { email: string; name: string; token: string }) {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')

  const site = siteUrl()
  const link = `${site}/api/launch-guide?t=${encodeURIComponent(token)}`
  const first = name.split(/\s+/)[0] || 'there'

  const text = [
    `Hi ${first},`,
    '',
    'Thanks for your interest in Stackd and in our free Before You Launch guide. It is a security and readiness checklist for apps built with Claude Code, Cursor, Lovable, Bolt, and similar AI tools.',
    '',
    `Download your guide: ${link}`,
    '',
    'Only have ten minutes? Start with the Top 5 checks on page 2.',
    '',
    `Stuck on something? Come build with us in the Stackd Discord: ${DISCORD_URL}`,
    'Post in #help-desk with what you are building, the tool you used, and what you have tried.',
    '',
    'Want us to look at your app? Request a Rescue review: https://dash.stackdstudiosai.com/forms/rescue',
    '',
    'Chanel Hicks-Gray',
    'AI Educator | Founder, Stackd Studios AI',
    'Training · Consulting · Implementation',
    'STACKD STUDIOS AI',
    '',
    `You are getting this because you asked for the guide at ${site}. We may send occasional updates and offers, never spam. Reply "unsubscribe" any time and we will take you off the list.`,
  ].join('\n')

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Your Before You Launch guide</title></head>
<body style="margin:0;padding:0;background:#07080A;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#ECEAE4;">
<span style="display:none!important;opacity:0;max-height:0;overflow:hidden;">Your free security and readiness checklist is ready to download.</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#07080A;padding:40px 16px;"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="padding:0 0 22px;font-family:'Courier New',monospace;font-size:15px;font-weight:700;letter-spacing:0.2em;color:#ECEAE4;">STACK<span style="color:#FFD84D;">D</span> <span style="color:#9A988F;">STUDIOS</span> <span style="color:#FFD84D;">AI</span></td></tr>
<tr><td style="background:#0E1014;border:1px solid #23262D;border-radius:12px;padding:32px;">
<p style="margin:0 0 10px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#FFD84D;">Free guide</p>
<h1 style="margin:0 0 18px;font-size:30px;line-height:1.1;font-weight:800;color:#ECEAE4;">Before you launch.</h1>
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:#ECEAE4;">Hi ${esc(first)},</p>
<p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#C9C7BF;">Thanks for your interest in Stackd and in our free Before You Launch guide. It is a security and readiness checklist for apps built with Claude Code, Cursor, Lovable, Bolt, and similar AI tools. Only have ten minutes? Start with the Top 5 checks on page 2.</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#FFD84D;border-radius:6px;">
<a href="${esc(link)}" style="display:inline-block;padding:15px 26px;font-family:'Courier New',monospace;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#07080A;text-decoration:none;">Download the guide (PDF)</a>
</td></tr></table>
<div style="margin:28px 0 0;padding:20px;border:1px solid #23262D;border-radius:10px;">
<p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#FFD84D;">Community</p>
<p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#C9C7BF;">Stuck on something? Come build with us in the Stackd Discord. Post in #help-desk with what you are building, the tool you used, and what you have tried.</p>
<a href="${esc(DISCORD_URL)}" style="font-family:'Courier New',monospace;font-size:14px;font-weight:700;color:#FFD84D;">Join the Discord &rarr;</a>
</div>
<p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#9A988F;">Want us to look at your app? <a href="https://dash.stackdstudiosai.com/forms/rescue" style="color:#ECEAE4;">Request a Rescue review</a>.</p>
</td></tr>
<tr><td style="padding:26px 4px 0;font-size:14px;line-height:1.5;color:#C9C7BF;">
<strong style="color:#ECEAE4;">Chanel Hicks-Gray</strong><br />AI Educator | Founder, Stackd Studios AI<br />Training · Consulting · Implementation<br />STACKD STUDIOS AI<br />
<img src="${SIGNATURE_LOGO}" width="96" height="96" alt="Stackd Studios AI" style="margin-top:10px;display:block;border:0;" />
</td></tr>
<tr><td style="padding:24px 4px 0;font-size:12px;line-height:1.6;color:#6F6D66;">You are getting this because you asked for the guide at <a href="${site}" style="color:#9A988F;">stackdstudiosai.com</a>. We may send occasional updates and offers, never spam. Reply "unsubscribe" any time and we will take you off the list.</td></tr>
</table></td></tr></table></body></html>`

  const { error } = await new Resend(key).emails.send({
    from: FROM,
    to: email,
    replyTo: 'chanel@stackdstudiosai.com',
    subject: 'Your Before You Launch guide from Stackd',
    html,
    text,
  })
  if (error) throw new Error(`Resend: ${error.message}`)
}
