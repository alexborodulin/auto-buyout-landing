<script setup lang="ts">
import carMain from '~/assets/images/car-main.webp'

const { isMobileMenuOpen } = useMobileMenu()

const heroTags = [
  {
    label: 'Безопасно',
    position: 'left-[78%] top-[16%] -rotate-6',
    color: 'border-brand-muted bg-brand-muted/90 text-brand-dark',
  },
  {
    label: 'Оценка онлайн',
    position: 'left-[64%] top-[30%] rotate-3',
    color: 'border-sky-200 bg-sky-50/95 text-sky-700',
  },
  {
    label: 'Деньги сразу',
    position: 'left-[76%] top-[39%] rotate-6',
    color: 'border-amber-200 bg-amber-50/95 text-amber-800',
  },
  {
    label: 'Любые авто',
    position: 'left-[58%] top-[46%] -rotate-3',
    color: 'border-violet-200 bg-violet-50/95 text-violet-700',
  },
]
</script>

<template>
  <section id="hero" class="hero-bg overflow-visible">
    <img
      v-show="!isMobileMenuOpen"
      :src="carMain"
      alt=""
      aria-hidden="true"
      fetchpriority="high"
      class="pointer-events-none absolute -top-20 right-0 z-[75] h-36 w-auto max-w-[55%] object-contain object-right sm:-top-24 sm:h-40 md:h-48 md:max-w-[50%] lg:hidden"
    />

    <div
      class="absolute inset-y-0 right-0 z-[2] hidden w-1/2 max-w-xl bg-contain bg-right bg-no-repeat lg:block"
      :style="{ backgroundImage: `url(${carMain})` }"
      aria-hidden="true"
    />

    <div class="pointer-events-none absolute inset-0 z-[4] hidden lg:block">
      <span
        v-for="tag in heroTags"
        :key="tag.label"
        class="hero-tag absolute"
        :class="[tag.position, tag.color]"
      >
        {{ tag.label }}
      </span>
    </div>

    <div class="container-content relative z-[5] py-16 md:py-20 lg:py-28">
      <div class="max-w-2xl md:max-w-xl lg:max-w-2xl">
        <p class="badge">{{ nbsp('Выкуп автомобилей в Пензе') }}</p>
        <h1
          class="text-4xl font-bold leading-[1.15] sm:text-5xl sm:leading-tight md:text-4xl md:leading-tight lg:text-6xl"
        >
          {{ nbsp('Продайте авто в Пензе — честно и без лишних хлопот') }}
        </h1>
        <p class="mt-6 text-lg text-slate-600 md:text-xl">
          {{ nbsp('Срочный выкуп автомобилей в любом состоянии по Пензе и Пензенской области. Бесплатная оценка, деньги в день сделки, выезд в течение 2 часов.') }}
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="#contact" class="btn-primary">{{ nbsp('Получить оценку') }}</a>
          <a href="#how-it-works" class="btn-outline">{{ nbsp('Как это работает') }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
