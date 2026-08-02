/** Счётчик Яндекс Метрики (совпадает с nuxt.config). */
export const METRIKA_ID = 110802910

/** Идентификаторы целей — заведи такие же в Метрике (JavaScript-событие). */
export const metrikaGoals = {
  contactFormSubmit: 'contact_form_submit',
  phoneClick: 'phone_click',
} as const

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

export function reachGoal(goal: string) {
  if (!import.meta.client) return
  window.ym?.(METRIKA_ID, 'reachGoal', goal)
}
