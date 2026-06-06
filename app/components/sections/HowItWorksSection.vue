<script setup lang="ts">
const steps = [
  {
    step: '01',
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните — уточним марку, год и состояние авто.',
  },
  {
    step: '02',
    title: 'Оценка',
    description: 'Специалист приедет на осмотр или даст предварительную цену по фото.',
  },
  {
    step: '03',
    title: 'Сделка',
    description: 'Согласуем финальную сумму, подпишем договор и выплатим деньги сразу.',
  },
]
</script>

<template>
  <section id="how-it-works" class="section">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">
          Как мы работаем
        </h2>
        <p class="section-subtitle">
          Три простых шага от заявки до денег на вашем счёте.
        </p>
      </div>

      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <article
          v-for="item in steps"
          :key="item.step"
          class="card-lg relative"
        >
          <span class="step-number">{{ item.step }}</span>
          <h3 class="mt-4 text-xl font-semibold text-slate-900">
            {{ item.title }}
          </h3>
          <p class="mt-2 text-base leading-relaxed text-slate-600">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
