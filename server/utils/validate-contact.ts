const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const NAME_REGEX = /^[а-яА-ЯёЁa-zA-Z\s-]+$/

export interface ContactPayload {
  name: string
  phone: string
  car?: string
  _hp?: string
}

export function validateContact(body: unknown): { ok: true; data: ContactPayload } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Некорректные данные' }
  }

  const { name, phone, car, _hp } = body as Record<string, unknown>

  if (typeof _hp === 'string' && _hp.trim()) {
    return { ok: false, message: 'spam' }
  }

  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
    return { ok: false, message: 'Введите имя (от 2 до 50 символов)' }
  }

  if (!NAME_REGEX.test(name.trim())) {
    return { ok: false, message: 'Имя может содержать только буквы' }
  }

  if (typeof phone !== 'string' || !PHONE_REGEX.test(phone)) {
    return { ok: false, message: 'Введите полный номер телефона' }
  }

  if (car !== undefined && car !== null && car !== '') {
    if (typeof car !== 'string' || car.length > 80) {
      return { ok: false, message: 'Название автомобиля слишком длинное' }
    }
  }

  return {
    ok: true,
    data: {
      name: name.trim(),
      phone,
      car: typeof car === 'string' ? car.trim() : undefined,
    },
  }
}
