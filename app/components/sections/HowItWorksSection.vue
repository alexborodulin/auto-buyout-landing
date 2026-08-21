<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: 'Заявка',
    description: 'Оставьте заявку или позвоните — уточним марку, год и состояние.',
  },
  {
    step: '02',
    title: 'Оценка',
    description: 'Приедем на осмотр или назовём цену по фото.',
  },
  {
    step: '03',
    title: 'Сделка',
    description: 'Подпишем договор и выплатим деньги сразу.',
  },
]
</script>

<template>
  <section id="how-it-works" class="section py-6 md:py-16 lg:py-24">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">
          {{ nbsp('Как мы работаем') }}
        </h2>
        <p class="section-subtitle mt-2 sm:mt-4">
          {{ nbsp('Три шага от заявки до денег.') }}
        </p>
      </div>

      <ol class="mt-4 grid gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-6">
        <li
          v-for="item in steps"
          :key="item.step"
          class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-surface-card p-3 sm:flex-col sm:items-start sm:p-6"
        >
          <span class="step-number shrink-0 text-2xl sm:text-4xl">{{ item.step }}</span>
          <div>
            <h3 class="text-base font-semibold text-slate-900 sm:text-xl">
              {{ nbsp(item.title) }}
            </h3>
            <p class="mt-0.5 text-base leading-snug text-slate-600 sm:mt-2 sm:leading-relaxed">
              {{ nbsp(item.description) }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
