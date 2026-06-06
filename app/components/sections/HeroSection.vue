<script setup lang="ts">
import carMain from '~/assets/images/car-main.webp'

const heroTags = [
  {
    label: 'Безопасно',
    position: 'left-[78%] top-[16%] -rotate-6',
    mobilePosition: '',
    color: 'border-brand-muted bg-brand-muted/90 text-brand-dark',
  },
  {
    label: 'Оценка онлайн',
    position: 'left-[64%] top-[30%] rotate-3',
    mobilePosition: '',
    color: 'border-sky-200 bg-sky-50/95 text-sky-700',
  },
  {
    label: 'Деньги сразу',
    position: 'left-[76%] top-[39%] rotate-6',
    mobilePosition: '',
    color: 'border-amber-200 bg-amber-50/95 text-amber-800',
  },
  {
    label: 'Любые авто',
    position: 'left-[58%] top-[46%] -rotate-3',
    mobilePosition: '',
    color: 'border-violet-200 bg-violet-50/95 text-violet-700',
  },
]
</script>

<template>
  <section id="hero" class="hero-bg overflow-visible">
    <img
      :src="carMain"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -top-20 right-0 z-[65] h-36 w-auto max-w-[55%] object-contain object-right sm:-top-24 sm:h-40 md:hidden"
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

    <div class="pointer-events-none absolute inset-0 z-[66] md:hidden">
      <span
        v-for="tag in heroTags"
        :key="`mobile-${tag.label}`"
        class="hero-tag absolute"
        :class="[tag.mobilePosition, tag.color]"
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
