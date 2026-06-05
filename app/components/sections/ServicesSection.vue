<script setup lang="ts">
const services = [
  {
    title: 'Срочный выкуп',
    description: 'Нужны деньги сегодня? Приедем в течение 2 часов и закроем сделку в день обращения.',
  },
  {
    title: 'Выкуп битых авто',
    description: 'Покупаем автомобили после ДТП, с повреждениями кузова и не на ходу.',
  },
  {
    title: 'Выкуп кредитных авто',
    description: 'Поможем закрыть кредит и оформить продажу — вы получите разницу на руки.',
  },
  {
    title: 'Trade-in',
    description: 'Примем ваш автомобиль в зачёт при покупке другого — быстро и выгодно.',
  },
  {
    title: 'Выкуп коммерческого транспорта',
    description: 'Работаем с легковыми, внедорожниками, микроавтобусами и лёгким коммерческим транспортом.',
  },
  {
    title: 'Оценка онлайн',
    description: 'Отправьте фото и VIN — предварительную цену назовём за 15 минут.',
  },
]
</script>

<template>
  <section id="services" class="section bg-surface-card">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">
          Наши услуги
        </h2>
        <p class="section-subtitle">
          Полный спектр услуг по выкупу автомобилей — подберём формат под вашу ситуацию.
        </p>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="card-interactive"
        >
          <h3 class="text-lg font-semibold text-slate-900">
            {{ service.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ service.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
