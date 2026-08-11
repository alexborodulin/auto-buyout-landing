<script setup lang="ts">
import { SITE_URL } from '~/constants/site'

useSeoMeta({
  title: 'Срочный выкуп авто в Пензе — оценка за 15 минут | 1Выкуп',
  description:
    'Оставьте заявку или позвоните: бесплатная оценка, выезд за 2 часа, деньги в день сделки. Выкуп авто в любом состоянии по Пензе и области.',
  ogTitle: 'Срочный выкуп авто в Пензе — 1Выкуп',
  ogDescription:
    'Бесплатная оценка за 15 минут. Выезд специалиста, деньги сразу.',
  ogType: 'website',
  ogUrl: `${SITE_URL}/promo`,
  ogLocale: 'ru_RU',
  robots: 'noindex, follow',
})

useHead({
  link: [{ rel: 'canonical', href: `${SITE_URL}/promo` }],
})
</script>

<template>
  <div>
    <section class="hero-bg">
      <div class="container-content py-12 md:py-16">
        <p class="badge">{{ nbsp('Выкуп автомобилей в Пензе') }}</p>
        <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {{ nbsp('Срочный выкуп авто — оценка бесплатно, деньги в день сделки') }}
        </h1>
        <p class="mt-4 max-w-2xl text-lg text-slate-600 md:text-xl">
          {{
            nbsp(
              'Выкупаем в любом состоянии. Перезвоним за 15 минут, выезд специалиста в течение 2 часов по Пензе и области.',
            )
          }}
        </p>
        <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base font-medium text-slate-700">
          <li>{{ nbsp('Бесплатная оценка') }}</li>
          <li>{{ nbsp('Деньги сразу') }}</li>
          <li>{{ nbsp('Битые и кредитные') }}</li>
        </ul>
      </div>
    </section>

    <ContactSection />
  </div>
</template>
