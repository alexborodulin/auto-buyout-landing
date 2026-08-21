const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const NAME_REGEX = /^[а-яА-ЯёЁa-zA-Z\s-]+$/

export interface ContactPayload {
  name?: string
  phone: string
  car?: string
  formId: string
  consentVersion: string
  consentAcceptedAt: string
  consentPersonalData: true
  consentPrivacy: true
  _hp?: string
}

export function validateContact(body: unknown): { ok: true; data: ContactPayload } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Некорректные данные' }
  }

  const {
    name,
    phone,
    car,
    _hp,
    formId,
    consentVersion,
    consentAcceptedAt,
    consentPersonalData,
    consentPrivacy,
  } = body as Record<string, unknown>

  if (typeof _hp === 'string' && _hp.trim()) {
    return { ok: false, message: 'spam' }
  }

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  if (trimmedName) {
    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return { ok: false, message: 'Имя — от 2 до 50 символов' }
    }
    if (!NAME_REGEX.test(trimmedName)) {
      return { ok: false, message: 'Имя может содержать только буквы' }
    }
  }

  if (typeof phone !== 'string' || !PHONE_REGEX.test(phone)) {
    return { ok: false, message: 'Введите полный номер телефона' }
  }

  if (car !== undefined && car !== null && car !== '') {
    if (typeof car !== 'string' || car.length > 80) {
      return { ok: false, message: 'Название автомобиля слишком длинное' }
    }
  }

  if (consentPersonalData !== true) {
    return { ok: false, message: 'Нужно согласие на обработку персональных данных' }
  }

  if (consentPrivacy !== true) {
    return { ok: false, message: 'Нужно подтвердить ознакомление с политикой конфиденциальности' }
  }

  if (typeof formId !== 'string' || !formId.trim()) {
    return { ok: false, message: 'Некорректная форма' }
  }

  if (typeof consentVersion !== 'string' || !consentVersion.trim()) {
    return { ok: false, message: 'Не указана версия согласия' }
  }

  if (typeof consentAcceptedAt !== 'string' || Number.isNaN(Date.parse(consentAcceptedAt))) {
    return { ok: false, message: 'Некорректная дата согласия' }
  }

  return {
    ok: true,
    data: {
      name: trimmedName || undefined,
      phone,
      car: typeof car === 'string' && car.trim() ? car.trim() : undefined,
      formId: formId.trim(),
      consentVersion: consentVersion.trim(),
      consentAcceptedAt,
      consentPersonalData: true,
      consentPrivacy: true,
    },
  }
}
