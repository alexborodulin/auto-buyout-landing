<script setup lang="ts">
import carMain from '~/assets/images/car-main.webp'
import { contactPhones } from '~/constants/contact'
import { metrikaGoals, reachGoal } from '~/utils/metrika'

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

function onPhoneClick() {
  reachGoal(metrikaGoals.phoneClick)
}
</script>

<template>
  <section id="hero" class="hero-bg overflow-visible">
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

    <div class="container-content relative z-[5] pb-8 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] md:pb-20 md:pt-[calc(7rem+env(safe-area-inset-top,0px))] lg:pb-28 lg:pt-[calc(8rem+env(safe-area-inset-top,0px))]">
      <div class="relative max-w-2xl md:max-w-xl lg:max-w-2xl">
        <img
          :src="carMain"
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          class="pointer-events-none absolute -right-4 top-0 z-[1] h-32 w-auto max-w-[46%] object-contain object-right sm:-right-6 sm:h-44 md:h-52 md:max-w-[48%] lg:hidden"
        />
        <p class="badge">
          <span class="sm:hidden">Выкуп авто в Пензе</span>
          <span class="hidden sm:inline">{{ nbsp('Выкуп автомобилей в Пензе') }}</span>
        </p>
        <h1
          class="pr-[32%] text-2xl font-bold leading-tight sm:text-5xl sm:leading-tight md:text-4xl md:leading-tight lg:pr-0 lg:text-6xl"
        >
          {{ nbsp('Продайте авто в Пензе — честно и без лишних хлопот') }}
        </h1>
        <p class="mt-4 text-base text-slate-600 sm:mt-6 sm:text-lg md:text-xl">
          {{ nbsp('Срочный выкуп автомобилей в любом состоянии по Пензе и Пензенской области. Бесплатная оценка, деньги в день сделки, выезд в течение 2 часов.') }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
          <a href="#contact" class="btn-primary">{{ nbsp('Оценить авто') }}</a>
          <a
            :href="`tel:${contactPhones.full.tel}`"
            class="btn-outline"
            :aria-label="`Позвонить ${contactPhones.full.display}`"
            @click="onPhoneClick"
          >
            {{ nbsp('Позвонить') }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
