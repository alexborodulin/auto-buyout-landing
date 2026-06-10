const HANGING_WORDS = [
  'в',
  'во',
  'на',
  'с',
  'со',
  'к',
  'ко',
  'у',
  'о',
  'об',
  'обо',
  'от',
  'до',
  'по',
  'за',
  'из',
  'изо',
  'при',
  'для',
  'без',
  'под',
  'над',
  'про',
  'и',
  'а',
  'но',
  'или',
  'ли',
  'же',
  'бы',
  'не',
  'ни',
] as const

const pattern = new RegExp(`(^|[\\s(—–-])(${HANGING_WORDS.join('|')}) `, 'gi')

/** Переносит короткие предлоги и союзы на следующую строку (неразрывный пробел). */
export function nbsp(text: string): string {
  return text.replace(pattern, (_, before, word) => `${before}${word}\u00A0`)
}
