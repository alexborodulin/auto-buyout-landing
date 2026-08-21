/** Счётчик Яндекс Метрики. */
export const METRIKA_ID = 111716444

/** Идентификаторы целей — JavaScript-события в Метрике. */
export const metrikaGoals = {
  formLead: 'form_lead',
  phoneClick: 'phone_click',
} as const

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
  }
}

export function reachGoal(goal: string, params?: Record<string, string | number | boolean>) {
  if (!import.meta.client) return
  if (params) {
    window.ym?.(METRIKA_ID, 'reachGoal', goal, params)
    return
  }
  window.ym?.(METRIKA_ID, 'reachGoal', goal)
}
