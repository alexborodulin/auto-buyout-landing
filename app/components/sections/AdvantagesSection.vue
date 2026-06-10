<script setup lang="ts">
const advantages = [
  {
    title: 'Деньги сразу',
    description: 'Выплачиваем наличными или переводом в день сделки — без ожидания и отложенных платежей.',
  },
  {
    title: 'Любое состояние',
    description: 'Берём авто после ДТП, с пробегом, в кредите или без документов — найдём решение.',
  },
  {
    title: 'Бесплатная оценка',
    description: 'Специалист приедет к вам и назовёт финальную цену до подписания договора.',
  },
  {
    title: 'Юридическая чистота',
    description: 'Берём оформление на себя: договор купли-продажи, снятие с учёта, все документы.',
  },
]
</script>

<template>
  <section id="advantages" class="section">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">
          {{ nbsp('Почему выбирают нас') }}
        </h2>
        <p class="section-subtitle">
          {{ nbsp('Простой и прозрачный процесс продажи автомобиля без скрытых комиссий.') }}
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="item in advantages"
          :key="item.title"
          class="card"
        >
          <h3 class="text-lg font-semibold text-slate-900">
            {{ nbsp(item.title) }}
          </h3>
          <p class="mt-2 text-base leading-relaxed text-slate-600">
            {{ nbsp(item.description) }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
