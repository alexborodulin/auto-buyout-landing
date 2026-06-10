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
    cta: 'Получить оценку',
    icon: 'camera' as const,
  },
]

const currentIndex = ref(0)
const slidesPerView = ref(1)

function updateSlidesPerView() {
  const width = window.innerWidth
  if (width >= 1024) slidesPerView.value = 3
  else if (width >= 768) slidesPerView.value = 2
  else slidesPerView.value = 1
}

const maxIndex = computed(() => Math.max(0, services.length - slidesPerView.value))

const slideStep = computed(() => 100 / slidesPerView.value)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideStep.value}%)`,
}))

const dots = computed(() => Array.from({ length: maxIndex.value + 1 }, (_, i) => i))

function goTo(index: number) {
  currentIndex.value = Math.min(Math.max(index, 0), maxIndex.value)
}

function next() {
  goTo(currentIndex.value + 1)
}

function prev() {
  goTo(currentIndex.value - 1)
}

watch(slidesPerView, () => {
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value
  }
})

onMounted(() => {
  updateSlidesPerView()
  window.addEventListener('resize', updateSlidesPerView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSlidesPerView)
})
</script>

<template>
  <section id="services" class="section bg-surface-card">
    <div class="container-content">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div class="section-header">
          <h2 class="section-title">Наши услуги</h2>
          <p class="section-subtitle">
            Полный спектр услуг по выкупу автомобилей — подберём формат под вашу ситуацию.
          </p>
        </div>

        <div class="flex gap-2 self-start sm:self-auto">
          <button
            type="button"
            class="slider-btn"
            aria-label="Предыдущий слайд"
            :disabled="currentIndex === 0"
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
            :disabled="currentIndex >= maxIndex"
            @click="next"
          >
            <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mt-10 overflow-hidden">
        <div
          class="flex transition-transform duration-300 ease-out"
          :style="trackStyle"
        >
          <article
            v-for="service in services"
            :key="service.title"
            class="w-full shrink-0 px-2 md:w-1/2 lg:w-1/3"
          >
            <div class="card-interactive flex h-full flex-col">
              <div class="service-icon">
                <ServiceIcon :name="service.icon" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900">
                {{ service.title }}
              </h3>
              <p class="mt-2 flex-1 text-base leading-relaxed text-slate-600">
                {{ service.description }}
              </p>
              <a href="#contact" class="btn-primary-sm mt-6 inline-flex self-start">
                {{ service.cta }}
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
