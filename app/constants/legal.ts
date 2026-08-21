export const legalPaths = {
  privacy: '/privacy',
  consent: '/consent',
  cookies: '/privacy#cookies',
} as const

/** Версия текста согласия — менять при правке формулировок. */
export const CONSENT_VERSION = 'pd-1.0'

/** Технический идентификатор формы оценки. */
export const CONTACT_FORM_ID = 'contact-evaluate-v1'

export const dataOperator = {
  name: '1Выкуп (АвтоВыкуп)',
  city: 'Пенза',
  region: 'Пензенская область',
  email: 'info@1выкуп.рф',
  phoneDisplay: '+7 (902) 203-90-58',
  phoneTel: '+79022039058',
  site: 'https://1выкуп.рф',
} as const
