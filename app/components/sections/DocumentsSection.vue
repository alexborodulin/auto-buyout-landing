<script setup lang="ts">
const requiredDocuments = [
  {
    title: 'Паспорт владельца',
    description: 'Действующий паспорт гражданина РФ — для оформления договора купли-продажи.',
    icon: 'passport' as const,
  },
  {
    title: 'ПТС',
    description: 'Паспорт транспортного средства — бумажный или электронный.',
    icon: 'pts' as const,
  },
  {
    title: 'СТС',
    description: 'Свидетельство о регистрации автомобиля.',
    icon: 'sts' as const,
  },
  {
    title: 'Все комплекты ключей',
    description: 'Основной и запасной ключ, брелок сигнализации — если есть.',
    icon: 'keys' as const,
  },
]

const optionalDocuments = [
  {
    title: 'Доверенность',
    description:
      'Если автомобиль продаёт не собственник, а представитель по нотариальной доверенности.',
    icon: 'power-of-attorney' as const,
  },
  {
    title: 'Справка из банка',
    description: 'Для кредитных авто — остаток задолженности и реквизиты для погашения.',
    icon: 'bank' as const,
  },
  {
    title: 'Сервисная книжка и чеки',
    description: 'Не обязательны, но помогают подтвердить историю обслуживания.',
    icon: 'service' as const,
  },
  {
    title: 'ДКП от предыдущего владельца',
    description: 'Желательно иметь, если вы не первый собственник.',
    icon: 'contract' as const,
  },
]
</script>

<template>
  <section id="documents" class="section bg-white">
    <div class="container-content">
      <div class="section-header">
        <h2 class="section-title">Какие документы нужны для выкупа авто</h2>
        <p class="section-subtitle">
          Подготовьте базовый пакет — остальное подскажем при оценке. Помогаем с оформлением и
          проверкой документов.
        </p>
      </div>

      <div class="mt-12">
        <h3 class="text-sm font-semibold uppercase tracking-widest text-brand">
          Обязательные документы
        </h3>
        <div class="mt-6 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <article v-for="doc in requiredDocuments" :key="doc.title" class="card">
            <div class="service-icon">
              <DocumentIcon :name="doc.icon" />
            </div>
            <h4 class="text-base font-semibold text-slate-900">
              {{ doc.title }}
            </h4>
            <p class="mt-2 text-base leading-relaxed text-slate-600">
              {{ doc.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="mt-12">
        <h3 class="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Дополнительно — при необходимости
        </h3>
        <div class="mt-6 grid gap-6 sm:grid-cols-2">
          <article
            v-for="doc in optionalDocuments"
            :key="doc.title"
            class="rounded-card border border-dashed border-slate-200 p-6"
          >
            <div class="document-icon-muted">
              <DocumentIcon :name="doc.icon" />
            </div>
            <h4 class="text-base font-semibold text-slate-900">
              {{ doc.title }}
            </h4>
            <p class="mt-2 text-base leading-relaxed text-slate-600">
              {{ doc.description }}
            </p>
          </article>
        </div>
      </div>

      <div class="mt-10 rounded-card border border-brand-muted bg-brand-muted/40 p-6 sm:p-8">
        <p class="text-base leading-relaxed text-slate-700 sm:text-lg">
          <span class="font-semibold text-slate-900">Нет полного комплекта документов?</span>
          <br />
          Свяжитесь с нами — разберём вашу ситуацию индивидуально. Выкупаем авто в кредите, после
          ДТП и с неполным пакетом документов.
        </p>
        <a href="#contact" class="btn-primary-sm mt-4 inline-flex"> Уточнить по моему случаю </a>
      </div>
    </div>
  </section>
</template>
