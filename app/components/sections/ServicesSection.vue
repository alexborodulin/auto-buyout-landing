<script setup lang="ts">
const services = [
  {
    title: 'Срочный выкуп',
    description: 'Нужны деньги сегодня? Приедем в течение 2 часов и закроем сделку в день обращения.',
    cta: 'Срочно продать',
    icon: 'clock' as const,
  },
  {
    title: 'Выкуп битых авто',
    description: 'Покупаем автомобили после ДТП, с повреждениями кузова и не на ходу.',
    cta: 'Оценить битое авто',
    icon: 'crash' as const,
  },
  {
    title: 'Выкуп кредитных авто',
    description: 'Поможем закрыть кредит и оформить продажу — вы получите разницу на руки.',
    cta: 'Продать в кредите',
    icon: 'credit' as const,
  },
  {
    title: 'Выкуп мото',
    description: 'Покупаем мотоциклы и скутеры в любом состоянии — быстро оценим и оформим сделку.',
    cta: 'Продать мото',
    icon: 'moto' as const,
  },
  {
    title: 'Выкуп коммерческого транспорта',
    description: 'Работаем с легковыми, внедорожниками, микроавтобусами и лёгким коммерческим транспортом.',
    cta: 'Оценить транспорт',
    icon: 'truck' as const,
  },
  {
    title: 'Оценка онлайн',
    description: 'Отправьте фото — предварительную цену назовём за 15 минут.',
    cta: 'Оценить авто',
    icon: 'camera' as const,
  },
]

const {
  viewport,
  currentIndex,
  slides,
  dots,
  goTo,
  next,
  prev,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClickCapture,
  onKeydown,
} = useCarousel(() => services)

</script>

<template>
  <section id="services" class="section bg-surface-card">
    <div class="container-content">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div class="section-header">
          <h2 class="section-title">{{ nbsp('Наши услуги') }}</h2>
          <p class="section-subtitle">
            {{ nbsp('Полный спектр услуг по выкупу автомобилей — подберём формат под вашу ситуацию.') }}
          </p>
        </div>

        <div class="flex gap-2 self-start sm:self-auto">
          <button
            type="button"
            class="slider-btn"
            aria-label="Предыдущий слайд"
            @click="prev"
          >
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            class="slider-btn"
            aria-label="Следующий слайд"
            @click="next"
          >
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref="viewport"
        class="slider-viewport mt-6 sm:mt-10"
        tabindex="0"
        role="region"
        aria-roledescription="carousel"
        aria-label="Наши услуги"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerCancel"
        @click.capture="onClickCapture"
        @keydown="onKeydown"
      >
        <div class="flex">
          <article
            v-for="slide in slides"
            :key="slide.key"
            data-slide
            class="slider-slide"
            :aria-hidden="slide.clone"
          >
            <div class="card-interactive flex h-full flex-col">
              <div class="service-icon">
                <ServiceIcon :name="slide.item.icon" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900">
                {{ nbsp(slide.item.title) }}
              </h3>
              <p class="mt-2 flex-1 text-base leading-relaxed text-slate-600">
                {{ nbsp(slide.item.description) }}
              </p>
              <a href="#contact" class="btn-primary-sm mt-6 inline-flex self-start">
                {{ nbsp(slide.item.cta) }}
              </a>
            </div>
          </article>
        </div>
      </div>

      <div class="mt-6 flex justify-center gap-2">
        <button
          v-for="dot in dots"
          :key="dot"
          type="button"
          class="slider-dot"
          :class="{ 'slider-dot-active': dot === currentIndex }"
          :aria-label="`Перейти к слайду ${dot + 1}`"
          @click="goTo(dot)"
        />
      </div>
    </div>
  </section>
</template>
