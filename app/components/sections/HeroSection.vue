<script setup lang="ts">
import carMain from '~/assets/images/car-main.webp'

const { isMobileMenuOpen } = useMobileMenu()

const heroTags = [
  {
    label: 'Безопасно',
    position: 'left-[78%] top-[16%] -rotate-6',
    mobilePosition: 'left-[59%] top-[60%] -rotate-3',
    color: 'border-brand-muted bg-brand-muted/90 text-brand-dark',
    mobileColor: 'border-brand-muted/50 bg-brand-muted/45 text-brand-dark',
  },
  {
    label: 'Оценка онлайн',
    position: 'left-[64%] top-[30%] rotate-3',
    mobilePosition: 'left-[59%] top-[65%] rotate-3',
    color: 'border-sky-200 bg-sky-50/95 text-sky-700',
    mobileColor: 'border-sky-200/50 bg-sky-50/45 text-sky-700',
  },
  {
    label: 'Деньги сразу',
    position: 'left-[76%] top-[39%] rotate-6',
    mobilePosition: 'left-[59%] top-[24%] -rotate-4',
    color: 'border-amber-200 bg-amber-50/95 text-amber-800',
    mobileColor: 'border-amber-200/50 bg-amber-50/45 text-amber-800',
  },
  {
    label: 'Любые авто',
    position: 'left-[58%] top-[46%] -rotate-3',
    mobilePosition: 'left-[71%] top-[74%] -rotate-3',
    color: 'border-violet-200 bg-violet-50/95 text-violet-700',
    mobileColor: 'border-violet-200/50 bg-violet-50/45 text-violet-700',
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
      class="pointer-events-none absolute -top-20 right-0 z-[75] h-36 w-auto max-w-[55%] object-contain object-right sm:-top-24 sm:h-40 md:hidden"
    />

    <div
      class="absolute inset-y-0 right-0 z-[2] hidden w-1/2 max-w-xl bg-contain bg-right bg-no-repeat md:block"
      :style="{ backgroundImage: `url(${carMain})` }"
      aria-hidden="true"
    />

    <div class="pointer-events-none absolute inset-0 z-[4] hidden md:block">
      <span
        v-for="tag in heroTags"
        :key="tag.label"
        class="hero-tag absolute"
        :class="[tag.position, tag.color]"
      >
        {{ tag.label }}
      </span>
    </div>

    <div v-show="!isMobileMenuOpen" class="pointer-events-none absolute inset-0 z-[3] md:hidden">
      <span
        v-for="tag in heroTags"
        :key="`mobile-${tag.label}`"
        class="hero-tag hero-tag-mobile absolute"
        :class="[tag.mobilePosition, tag.mobileColor]"
      >
        {{ tag.label }}
      </span>
    </div>

    <div class="container-content relative z-[5] py-12 sm:py-20 lg:py-28">
      <div class="max-w-2xl">
        <p class="badge">Быстрый выкуп автомобилей</p>
        <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Продайте авто — честно и без лишних хлопот
        </h1>
        <p class="mt-6 text-xl text-slate-600">
          Выкупаем автомобили в любом состоянии. Бесплатная оценка, моментальный расчёт и оформление
          документов на месте.
        </p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="#contact" class="btn-primary">Получить оценку</a>
          <a href="#how-it-works" class="btn-outline">Как это работает</a>
        </div>
      </div>
    </div>
  </section>
</template>
