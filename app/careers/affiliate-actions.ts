'use server'

import { logSpam, overLength, spamReason } from '@/lib/spam-guard'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitAffiliateApplication(formData: FormData) {
  const fields = Object.fromEntries(formData)
  const tooLong = overLength(fields, { name: 120, email: 200, platforms: 500, audience: 500, links: 2000, why: 5000 })
  if (tooLong) return { success: false as const, error: `That ${tooLong} is too long.` }
  const spam = spamReason(fields, { email: 'email', names: ['name'], messages: ['why'] })
  if (spam) {
    logSpam('affiliate', spam)
    return { success: true as const }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const platforms = formData.get('platforms') as string
  const audience = formData.get('audience') as string
  const links = formData.get('links') as string
  const why = formData.get('why') as string

  if (!name || !email || !platforms || !why) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  try {
    await resend.emails.send({
      from: 'Stackd Studios AI <chanel@stackdstudiosai.com>',
      to: 'Chanel@stackdstudiosai.com',
      replyTo: email,
      subject: `Affiliate Application — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C0C0C;">New Affiliate Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Platforms</td><td style="padding: 8px 0; font-size: 13px;">${platforms}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Audience Size</td><td style="padding: 8px 0; font-size: 13px;">${audience || 'Not provided'}</td></tr>
            ${links ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Links</td><td style="padding: 8px 0; font-size: 13px;">${links}</td></tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #0C0C0C; font-size: 14px;">Why they want to be an affiliate</h3>
          <p style="color: #444; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${why}</p>
        </div>
      `,
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
