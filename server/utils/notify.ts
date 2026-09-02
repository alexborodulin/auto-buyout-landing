import nodemailer from 'nodemailer'
import type { ContactPayload } from './validate-contact'

interface NotifyConfig {
  telegramBotToken: string
  telegramChatId: string
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPass: string
  contactTo: string
  siteUrl: string
}

function formatMessage(data: ContactPayload, siteUrl: string): string {
  const lines = [
    '🚗 Новая заявка с сайта',
    `Сайт: ${siteUrl}`,
    `Имя: ${data.name || 'не указано'}`,
    `Телефон: ${data.phone}`,
  ]
  if (data.car) lines.push(`Авто: ${data.car}`)
  lines.push(
    `Форма: ${data.formId}`,
    `Согласие ПД: да (версия ${data.consentVersion})`,
    `Политика конфиденциальности: ознакомлен`,
    `Дата согласия: ${data.consentAcceptedAt}`,
  )
  return lines.join('\n')
}

export async function sendTelegram(data: ContactPayload, config: NotifyConfig): Promise<void> {
  const { telegramBotToken, telegramChatId, siteUrl } = config
  if (!telegramBotToken || !telegramChatId) return

  const res = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: formatMessage(data, siteUrl),
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Telegram: ${err}`)
  }
}

export async function sendEmail(data: ContactPayload, config: NotifyConfig): Promise<void> {
  const { smtpHost, smtpPort, smtpUser, smtpPass, contactTo, siteUrl } = config
  if (!smtpUser || !smtpPass || !contactTo) return

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  })

  const carLine = data.car ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b">Авто</td><td>${escapeHtml(data.car)}</td></tr>` : ''

  await transporter.sendMail({
    from: `"1Выкуп" <${smtpUser}>`,
    to: contactTo,
    subject: `Заявка с ${siteUrl} — ${data.name || data.phone}`,
    text: formatMessage(data, siteUrl),
    html: `
      <h2 style="font-family:sans-serif">Новая заявка</h2>
      <table style="font-family:sans-serif;font-size:15px">
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Имя</td><td>${escapeHtml(data.name || 'не указано')}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Телефон</td><td><a href="tel:${data.phone.replace(/\D/g, '')}">${escapeHtml(data.phone)}</a></td></tr>
        ${carLine}
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Форма</td><td>${escapeHtml(data.formId)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Согласие ПД</td><td>да, версия ${escapeHtml(data.consentVersion)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Политика</td><td>ознакомлен</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#64748b">Дата согласия</td><td>${escapeHtml(data.consentAcceptedAt)}</td></tr>
      </table>
    `,
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function isNotifyConfigured(config: NotifyConfig): boolean {
  const hasTelegram = Boolean(config.telegramBotToken && config.telegramChatId)
  const hasEmail = Boolean(config.smtpUser && config.smtpPass && config.contactTo)
  return hasTelegram || hasEmail
}

export async function notifyContact(data: ContactPayload, config: NotifyConfig): Promise<void> {
  const results = await Promise.allSettled([sendTelegram(data, config), sendEmail(data, config)])

  const errors = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map((r) => r.reason?.message ?? String(r.reason))

  if (errors.length) {
    console.error('[notify]', errors.join('; '))
  }

  const telegramConfigured = Boolean(config.telegramBotToken && config.telegramChatId)
  const emailConfigured = Boolean(config.smtpUser && config.smtpPass && config.contactTo)

  const telegramDelivered = telegramConfigured && results[0]?.status === 'fulfilled'
  const emailDelivered = emailConfigured && results[1]?.status === 'fulfilled'

  if (!telegramDelivered && !emailDelivered) {
    throw new Error(errors.join('; ') || 'Не удалось отправить заявку')
  }
}
