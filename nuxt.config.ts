// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  site: {
    url: 'https://1выкуп.рф',
    name: '1Выкуп',
  },

  runtimeConfig: {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
    telegramChatId: process.env.TELEGRAM_CHAT_ID || '',
    smtpHost: process.env.SMTP_HOST || 'smtp.yandex.ru',
    smtpPort: Number(process.env.SMTP_PORT || 465),
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    contactTo: process.env.CONTACT_TO || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://1выкуп.рф',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL || 'info@1выкуп.рф',
    },
  },

  sitemap: {
    autoLastmod: true,
    zeroRuntime: true,
  },

  // Главная почти статическая — отдаём с CDN, API остаётся серверным
  routeRules: {
    '/': { prerender: true },
    '/api/**': { cache: false },
  },

  nitro: {
    vercel: {
      functions: {
        regions: ['fra1'],
        maxDuration: 15,
      },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        // v=2 — cache-bust after branded favicon replace
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '120x120', href: '/favicon-120x120.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=2' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=2' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=2' },
      ],
      script: [
        {
          key: 'yandex-metrika',
          type: 'text/javascript',
          innerHTML: `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110802910', 'ym');
ym(110802910, 'init', {ssr:true, webvisor:false, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
`.replace(/\n/g, ''),
        },
      ],
      noscript: [
        {
          children:
            '<div><img src="https://mc.yandex.ru/watch/110802910" style="position:absolute; left:-9999px;" alt="" /></div>',
        },
      ],
    },
  },
})