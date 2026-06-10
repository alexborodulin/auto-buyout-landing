import { validateContact } from '../utils/validate-contact'
import { isNotifyConfigured, notifyContact } from '../utils/notify'

const rateLimit = new Map<string, number>()
const RATE_LIMIT_MS = 60_000

export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const last = rateLimit.get(ip)

  if (last && now - last < RATE_LIMIT_MS) {
    throw createError({ statusCode: 429, message: 'Слишком много запросов. Попробуйте через минуту.' })
  }

  const body = await readBody(event)
  const result = validateContact(body)

  if (!result.ok) {
    if (result.message === 'spam') {
      return { ok: true }
    }
    throw createError({ statusCode: 400, message: result.message })
  }

  const config = useRuntimeConfig()

  const notifyConfig = {
    telegramBotToken: config.telegramBotToken,
    telegramChatId: config.telegramChatId,
    smtpHost: config.smtpHost,
    smtpPort: config.smtpPort,
    smtpUser: config.smtpUser,
    smtpPass: config.smtpPass,
    contactTo: config.contactTo,
    siteUrl: config.public.siteUrl,
  }

  if (!isNotifyConfigured(notifyConfig)) {
    throw createError({ statusCode: 503, message: 'Отправка заявок временно недоступна' })
  }

  await notifyContact(result.data, notifyConfig)
  rateLimit.set(ip, now)

  return { ok: true }
})
