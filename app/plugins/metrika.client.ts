import { METRIKA_ID } from '~/utils/metrika'

let metrikaInitialized = false
let lastHitPath: string | null = null

function currentPath() {
  return window.location.pathname + window.location.search + window.location.hash
}

function loadMetrika() {
  if (typeof window === 'undefined' || metrikaInitialized) return

  const src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`
  for (let i = 0; i < document.scripts.length; i++) {
    if (document.scripts[i]?.src === src) {
      metrikaInitialized = true
      lastHitPath = currentPath()
      return
    }
  }

  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      const ym = window.ym as { a?: unknown[][]; l?: number }
      ym.a = ym.a || []
      ym.a.push(args)
    }
  ;(window.ym as { l?: number }).l = Date.now()

  const script = document.createElement('script')
  script.async = true
  script.src = src
  const firstScript = document.getElementsByTagName('script')[0]
  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript)
  } else {
    document.head.appendChild(script)
  }

  window.ym(METRIKA_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })

  metrikaInitialized = true
  lastHitPath = currentPath()
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  loadMetrika()

  router.afterEach((to) => {
    if (!metrikaInitialized) return
    if (lastHitPath === to.fullPath) return
    lastHitPath = to.fullPath
    window.ym?.(METRIKA_ID, 'hit', to.fullPath)
  })
})
