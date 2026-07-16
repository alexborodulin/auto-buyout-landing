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

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'icon', type: 'image/png', sizes: '120x120', href: '/favicon-120x120.png' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '120x120' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
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