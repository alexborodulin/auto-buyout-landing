export default defineNuxtPlugin(() => {
  const counterId = 110802910

  // Official Yandex.Metrika snippet (client-only)
  ;(function (m, e, t, r, i) {
    // @ts-expect-error Metrika queue bootstrap
    m[i] =
      // @ts-expect-error Metrika queue bootstrap
      m[i] ||
      function () {
        // @ts-expect-error Metrika queue bootstrap
        ;(m[i].a = m[i].a || []).push(arguments)
      }
    // @ts-expect-error Metrika queue bootstrap
    m[i].l = 1 * new Date()
    for (let j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j]?.src === r) return
    }
    const k = e.createElement(t)
    const a = e.getElementsByTagName(t)[0]
    k.async = true
    k.src = r
    a?.parentNode?.insertBefore(k, a)
  })(window, document, 'script', `https://mc.yandex.ru/metrika/tag.js?id=${counterId}`, 'ym')

  // @ts-expect-error ym is injected by Metrika snippet
  window.ym(counterId, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  })
})
