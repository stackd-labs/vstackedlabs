'use server'

import { logSpam, overLength, spamReason } from '@/lib/spam-guard'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitApplication(formData: FormData) {
  const fields = Object.fromEntries(formData)
  const tooLong = overLength(fields, { name: 120, email: 200, role: 120, portfolio: 500, message: 5000 })
  if (tooLong) return { success: false as const, error: `That ${tooLong} is too long.` }
  const spam = spamReason(fields, { email: 'email', names: ['name'], messages: ['message'] })
  if (spam) {
    logSpam('careers', spam)
    return { success: true as const }
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const role = formData.get('role') as string
  const portfolio = formData.get('portfolio') as string
  const message = formData.get('message') as string

  if (!name || !email || !role || !message) {
    return { success: false, error: 'Please fill in all required fields.' }
  }

  try {
    await resend.emails.send({
      from: 'Stackd Studios AI <chanel@stackdstudiosai.com>',
      to: 'Chanel@stackdstudiosai.com',
      replyTo: email,
      subject: `New Application: ${role} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0C0C0C;">New Job Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Name</td><td style="padding: 8px 0; font-size: 13px;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Role</td><td style="padding: 8px 0; font-size: 13px; font-weight: bold;">${role}</td></tr>
            ${portfolio ? `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Portfolio / LinkedIn</td><td style="padding: 8px 0; font-size: 13px;"><a href="${portfolio}">${portfolio}</a></td></tr>` : ''}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <h3 style="color: #0C0C0C; font-size: 14px;">Why this role</h3>
          <p style="color: #444; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
