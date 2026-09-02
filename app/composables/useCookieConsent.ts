const STORAGE_KEY = 'cookie-consent-v1'

export type CookieChoice = 'all' | 'necessary'

export function readCookieChoice(): CookieChoice | null {
  if (!import.meta.client) return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'all' || raw === 'necessary') return raw
  } catch {
    /* ignore */
  }
  return null
}

export function writeCookieChoice(choice: CookieChoice) {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, choice)
}

export function useCookieConsent() {
  const choice = useState<CookieChoice | null>('cookie-choice', () => null)
  const ready = useState('cookie-ready', () => false)
  const settingsOpen = useState('cookie-settings-open', () => false)

  const analyticsAllowed = computed(() => choice.value === 'all')
  const showBanner = computed(() => ready.value && (choice.value === null || settingsOpen.value))

  function hydrate() {
    if (!import.meta.client) return
    choice.value = readCookieChoice()
    ready.value = true
  }

  function setChoice(next: CookieChoice) {
    choice.value = next
    writeCookieChoice(next)
    settingsOpen.value = false
  }

  function openSettings() {
    settingsOpen.value = true
  }

  function closeSettings() {
    if (choice.value !== null) settingsOpen.value = false
  }

  return {
    choice,
    ready,
    settingsOpen,
    showBanner,
    analyticsAllowed,
    hydrate,
    setChoice,
    openSettings,
    closeSettings,
  }
}
