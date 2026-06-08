<script setup lang="ts">
import car01 from '~/assets/images/cars-processed/car-01.webp'
import car02 from '~/assets/images/cars-processed/car-02.webp'
import car03 from '~/assets/images/cars-processed/car-03.webp'
import car04 from '~/assets/images/cars-processed/car-04.webp'
import car05 from '~/assets/images/cars-processed/car-05.webp'
import car06 from '~/assets/images/cars-processed/car-06.webp'
import car07 from '~/assets/images/cars-processed/car-07.webp'
import car08 from '~/assets/images/cars-processed/car-08.webp'
import car09 from '~/assets/images/cars-processed/car-09.webp'
import car10 from '~/assets/images/cars-processed/car-10.webp'
import car11 from '~/assets/images/cars-processed/car-11.webp'
import car12 from '~/assets/images/cars-processed/car-12.webp'
import car13 from '~/assets/images/cars-processed/car-13.webp'
import car14 from '~/assets/images/cars-processed/car-14.webp'
import car15 from '~/assets/images/cars-processed/car-15.webp'
import car16 from '~/assets/images/cars-processed/car-16.webp'
import car17 from '~/assets/images/cars-processed/car-17.webp'
import car18 from '~/assets/images/cars-processed/car-18.webp'
import car19 from '~/assets/images/cars-processed/car-19.webp'
import car20 from '~/assets/images/cars-processed/car-20.webp'

/** Заполните марку и год. Сначала вертикальные фото, затем горизонтальные */
const cars = [
  // Вертикальные
  { image: car01, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car02, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car03, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car07, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car08, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car10, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car11, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car12, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car14, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car15, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car16, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  { image: car20, make: 'Марка', year: 'Год', orientation: 'portrait' as const },
  // Горизонтальные
  { image: car04, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car05, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car06, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car09, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car13, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car17, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car18, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
  { image: car19, make: 'Марка', year: 'Год', orientation: 'landscape' as const },
]

const currentIndex = ref(0)
const slidesPerView = ref(1)

function updateSlidesPerView() {
  const width = window.innerWidth
  if (width >= 1024) slidesPerView.value = 3
  else if (width >= 768) slidesPerView.value = 2
  else slidesPerView.value = 1
}

const maxIndex = computed(() => Math.max(0, cars.length - slidesPerView.value))

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
  <section id="cars" class="section">
    <div class="container-content">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div class="section-header">
          <h2 class="section-title">Недавно выкупленные авто</h2>
          <p class="section-subtitle">
            Реальные автомобили, которые мы уже выкупили у владельцев.
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
        <div class="flex transition-transform duration-300 ease-out" :style="trackStyle">
          <article
            v-for="(car, index) in cars"
            :key="index"
            class="w-full shrink-0 px-2 md:w-1/2 lg:w-1/3"
          >
            <div class="car-slide-card">
              <div
                class="car-slide-media"
                :class="{ 'car-slide-media-landscape': car.orientation === 'landscape' }"
              >
                <img
                  :src="car.image"
                  :alt="`${car.make} ${car.year}`"
                  class="car-slide-image"
                  :class="{ 'car-slide-image-landscape': car.orientation === 'landscape' }"
                  loading="lazy"
                />
              </div>
              <p class="car-slide-caption">
                {{ car.make }}<span v-if="car.year">, {{ car.year }}</span>
              </p>
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
